---
title: "Boost Ranker | Cloud"
slug: /boost-ranker
sidebar_label: "Boost Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Boost Ranker 不单纯依赖基于向量距离计算的语义相似度，而是让你能够以有意义的方式影响搜索结果。它非常适合使用元数据过滤快速调整搜索结果的场景。 | Cloud"
type: origin
token: HUDPwedOIi1eqikLQUVcvACgnwg
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - boost ranker

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Boost Ranker

Boost Ranker 不单纯依赖基于向量距离计算的语义相似度，而是让你能够以有意义的方式影响搜索结果。它非常适合使用元数据过滤快速调整搜索结果的场景。

当搜索请求包含 Boost Ranker 函数时，Zilliz Cloud 使用该函数内的可选过滤条件在搜索结果候选集中查找匹配项，并通过应用指定的权重来提升这些匹配项的得分，从而在最终结果中提升或降低匹配实体的排名。

## 何时使用 Boost Ranker\{#when-to-use-boost-ranker}

与依赖交叉编码器模型或融合算法的其他 Ranker 不同，Boost Ranker 直接将可选的元数据驱动规则注入排序过程，这使其更适用于以下场景。

<table>
   <tr>
     <th><p>用例</p></th>
     <th><p>示例</p></th>
     <th><p>为什么Boost Ranker效果良好</p></th>
   </tr>
   <tr>
     <td><p>业务驱动的内容优先级排序</p></td>
     <td><ul><li><p>在电子商务搜索结果中突出展示优质产品</p></li><li><p>通过高用户参与度指标（如浏览量、点赞数和分享数）提高内容的可见性</p></li><li><p>在时效性搜索应用中提升近期内容的优先级</p></li><li><p>优先展示来自已验证或可信来源的内容</p></li><li><p>提升与精确短语或高相关性关键词匹配的结果</p></li></ul></td>
     <td rowspan="2"><p>无需重建索引或修改向量嵌入模型（这些操作可能很耗时），你可以通过实时应用可选的元数据过滤器，立即提升或降低搜索结果中特定项目的排名。这种机制实现了灵活、动态的搜索排名，能轻松适应不断变化的业务需求。</p></td>
   </tr>
   <tr>
     <td><p>战略性内容降权</p></td>
     <td><ul><li><p>在不完全移除低库存商品的情况下降低其突显程度</p></li><li><p>在不进行审查的情况下降低包含潜在令人反感词汇的内容的排名</p></li><li><p>在保留旧留档以供技术搜索访问的同时对其进行降级处理</p></li><li><p>在市场搜索中巧妙降低竞品的可见度</p></li><li><p>降低具有低质量迹象（如格式问题、篇幅较短等）的内容的相关性</p></li></ul></td>
   </tr>
</table>

您还可以组合多个 Boost Ranker，以实现更动态、更稳健的基于权重的排序策略。

## Boost Ranker 工作机制\{#mechanism-of-boost-ranker}

下图展示了Boost Ranker 的主要工作流程。

![KIAbw3sGWhM3prbchcrcPiMZnTh](/img/KIAbw3sGWhM3prbchcrcPiMZnTh.png)

当你插入数据时，Zilliz Cloud 会将它们分配到不同的 Segment 中。当你进行搜索时，每个 Segment 都会返回一组指定数量候选结果，Zilliz Cloud 会对所有 Segment 返回的候选结果进行排序，并将其归约为指定数量的最终结果。在接收到携带 Boost Ranker 的搜索请求时，Zilliz Cloud 会将 Boost Ranker 应用于每个 Segment 返回的候选搜索结果，以防止可能的精度损失并提高召回率。

在最终确定结果之前，Zilliz Cloud 会使用 Boost Ranker 对这些候选结果进行如下处理：

1. 应用在 Boost Ranker 中指定的可选过滤表达式，以识别与该表达式匹配的 Entity。

1. 应用 Boost Ranker 中指定的权重来提升已识别 Entity 的得分。

<Admonition type="info" icon="📘" title="说明">

<p>在多向量混合搜索中，您不能将 Boost Ranker 用于多路结果的重排。但是，您可以在其子请求（<code>AnnSearchRequest</code>）中使用。</p>

</Admonition>

## Boost Ranker 示例\{#examples-of-boost-ranker}

以下示例展示了在单向量搜索中使用 Boost Ranker 的情况，该搜索需要返回前五个最相关的实体，并为具有摘要文档类型的实体的得分添加权重。

1. **分阶段收集搜索结果候选对象。**

    下表假设 Milvus 将实体分配到两个段（**0001** 和 **0002**）中，每个段返回五个候选实体。

    <table>
       <tr>
         <th><p>ID</p></th>
         <th><p>文档类型</p></th>
         <th><p>得分</p></th>
         <th><p>排名</p></th>
         <th><p>段</p></th>
       </tr>
       <tr>
         <td><p>117</p></td>
         <td><p>摘要</p></td>
         <td><p>0.344</p></td>
         <td><p>1</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>89</p></td>
         <td><p>摘要</p></td>
         <td><p>0.456</p></td>
         <td><p>2</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>257</p></td>
         <td><p>正文</p></td>
         <td><p>0.578</p></td>
         <td><p>3</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>358</p></td>
         <td><p>标题</p></td>
         <td><p>0.788</p></td>
         <td><p>4</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>168</p></td>
         <td><p>正文</p></td>
         <td><p>0.899</p></td>
         <td><p>5</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>46</p></td>
         <td><p>正文</p></td>
         <td><p>0.189</p></td>
         <td><p>1</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p>48</p></td>
         <td><p>正文</p></td>
         <td><p>0265</p></td>
         <td><p>2</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p>561</p></td>
         <td><p>摘要</p></td>
         <td><p>0.366</p></td>
         <td><p>3</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p>344</p></td>
         <td><p>摘要</p></td>
         <td><p>0.444</p></td>
         <td><p>4</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p>276</p></td>
         <td><p>摘要</p></td>
         <td><p>0.845</p></td>
         <td><p>5</p></td>
         <td><p>0002</p></td>
       </tr>
    </table>

1. **应用在Boost Ranker中指定的过滤表达式**（`doctype='abstract'`）。

    如以下表格中的`DocType`字段所示，Milvus会将所有实体的`doctype`设置为`abstract`，以便进一步处理。

    <table>
       <tr>
         <th><p>ID</p></th>
         <th><p>文档类型</p></th>
         <th><p>得分</p></th>
         <th><p>排名</p></th>
         <th><p>段</p></th>
       </tr>
       <tr>
         <td><p><strong>117</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.344</strong></p></td>
         <td><p><strong>1</strong></p></td>
         <td><p><strong>0001</strong></p></td>
       </tr>
       <tr>
         <td><p><strong>89</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.456</strong></p></td>
         <td><p><strong>2</strong></p></td>
         <td><p><strong>0001</strong></p></td>
       </tr>
       <tr>
         <td><p>257</p></td>
         <td><p>正文</p></td>
         <td><p>0.578</p></td>
         <td><p>3</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>358</p></td>
         <td><p>标题</p></td>
         <td><p>0.788</p></td>
         <td><p>4</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>168</p></td>
         <td><p>正文</p></td>
         <td><p>0.899</p></td>
         <td><p>5</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>46</p></td>
         <td><p>正文</p></td>
         <td><p>0.189</p></td>
         <td><p>1</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p>48</p></td>
         <td><p>正文</p></td>
         <td><p>0265</p></td>
         <td><p>2</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p><strong>561</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.366</strong></p></td>
         <td><p><strong>3</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
       <tr>
         <td><p><strong>344</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.444</strong></p></td>
         <td><p><strong>4</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
       <tr>
         <td><p><strong>276</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.845</strong></p></td>
         <td><p><strong>5</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
    </table>

1. **应用在Boost Ranker中指定的权重**（`权重=0.5`）。

    上一步中所有已识别的实体都将乘以提升排名器中指定的权重，从而导致其排名发生变化。

    <table>
       <tr>
         <th><p>ID</p></th>
         <th><p>文档类型</p></th>
         <th><p>得分</p></th>
         <th><p>加权分数</p><p>(=得分×权重)</p></th>
         <th><p>排名</p></th>
         <th><p>段</p></th>
       </tr>
       <tr>
         <td><p><strong>117</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.344</strong></p></td>
         <td><p><strong>0.172</strong></p></td>
         <td><p><strong>1</strong></p></td>
         <td><p><strong>0001</strong></p></td>
       </tr>
       <tr>
         <td><p><strong>89</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.456</strong></p></td>
         <td><p><strong>0.228</strong></p></td>
         <td><p><strong>2</strong></p></td>
         <td><p><strong>0001</strong></p></td>
       </tr>
       <tr>
         <td><p>257</p></td>
         <td><p>正文</p></td>
         <td><p>0.578</p></td>
         <td><p>0.578</p></td>
         <td><p>3</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>358</p></td>
         <td><p>标题</p></td>
         <td><p>0.788</p></td>
         <td><p>0.788</p></td>
         <td><p>4</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p>168</p></td>
         <td><p>正文</p></td>
         <td><p>0.899</p></td>
         <td><p>0.899</p></td>
         <td><p>5</p></td>
         <td><p>0001</p></td>
       </tr>
       <tr>
         <td><p><strong>561</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.366</strong></p></td>
         <td><p><strong>0.183</strong></p></td>
         <td><p><strong>1</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
       <tr>
         <td><p>46</p></td>
         <td><p>正文</p></td>
         <td><p>0.189</p></td>
         <td><p>0.189</p></td>
         <td><p>2</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p><strong>344</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.444</strong></p></td>
         <td><p><strong>0.222</strong></p></td>
         <td><p><strong>3</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
       <tr>
         <td><p>48</p></td>
         <td><p>正文</p></td>
         <td><p>0.265</p></td>
         <td><p>0.265</p></td>
         <td><p>4</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p><strong>276</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.845</strong></p></td>
         <td><p><strong>0.423</strong></p></td>
         <td><p><strong>5</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
    </table>

    <Admonition type="info" icon="📘" title="注释">

    <p>权重必须是你选择的一个浮点数。在像上述示例这样的情况下，分数越小表示相关性越高，使用小于<strong>1</strong>的权重。否则，使用大于<strong>1</strong>的权重。</p>

    </Admonition>

1. **根据加权分数汇总所有细分市场的候选人，以确定最终结果。**

    <table>
       <tr>
         <th><p>ID</p></th>
         <th><p>文档类型</p></th>
         <th><p>得分</p></th>
         <th><p>加权得分</p></th>
         <th><p>排名</p></th>
         <th><p>段</p></th>
       </tr>
       <tr>
         <td><p><strong>117</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.344</strong></p></td>
         <td><p><strong>0.172</strong></p></td>
         <td><p><strong>1</strong></p></td>
         <td><p><strong>0001</strong></p></td>
       </tr>
       <tr>
         <td><p><strong>561</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.366</strong></p></td>
         <td><p><strong>0.183</strong></p></td>
         <td><p><strong>2</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
       <tr>
         <td><p>46</p></td>
         <td><p>正文</p></td>
         <td><p>0.189</p></td>
         <td><p>0.189</p></td>
         <td><p>3</p></td>
         <td><p>0002</p></td>
       </tr>
       <tr>
         <td><p><strong>344</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.444</strong></p></td>
         <td><p><strong>0.222</strong></p></td>
         <td><p><strong>4</strong></p></td>
         <td><p><strong>0002</strong></p></td>
       </tr>
       <tr>
         <td><p><strong>89</strong></p></td>
         <td><p><strong>摘要</strong></p></td>
         <td><p><strong>0.456</strong></p></td>
         <td><p><strong>0.228</strong></p></td>
         <td><p><strong>5</strong></p></td>
         <td><p><strong>0001</strong></p></td>
       </tr>
    </table>

## 使用 Boost Ranker\{#usage-of-boost-ranker}

在本节中，您将看到如何使用Boost Ranker影响单向量搜索结果的示例。

### 创建一个 Boost Ranker\{#create-a-boost-ranker}

在将 Boost Ranker 作为搜索请求的重排器传递之前，您应该按照以下方式将 Boost Ranker 正确定义为重排函数：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import Function, FunctionType

ranker = Function(
    name="boost",
    input_field_names=[], # Must be an empty list
    function_type=FunctionType.RERANK,
    params={
        "reranker": "boost",
        "filter": "doctype == 'abstract'",
        "random_score": { 
            "seed": 126,
            "field": "id"
        },
        "weight": 0.5
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.ranker.BoostRanker;

BoostRanker ranker = BoostRanker.builder()
        .name("boost")
        .filter("doctype == \"abstract\"")
        .weight(5.0f)
        .randomScoreField("id")
        .randomScoreSeed(126)
        .build();
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='javascript'>

```javascript
import {FunctionType} from '@zilliz/milvus2-sdk-node';

const ranker = {
  name: "boost",
  input_field_names: [],
  type: FunctionType.RERANK,
  params: {
    reranker: "boost",
    filter: "doctype == 'abstract'",
    random_score: {
      seed: 126,
      field: "id",
    },
    weight: 0.5,
  },
};

```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必选？</p></th>
     <th><p>描述</p></th>
     <th><p>值/示例</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>是</p></td>
     <td><p>此函数的唯一标识符</p></td>
     <td><p><code>"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code>input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>要应用该函数的向量字段列表（对于RRF排序器必须为空）</p></td>
     <td><p><code>[]</code></p></td>
   </tr>
   <tr>
     <td><p><code>function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>要调用的函数类型；使用<code>RE</code>来指定重排序策略</p></td>
     <td><p><code>FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>指定重排器的类型。</p><p>必须设置为<code>boost</code>才能使用 Boost Ranker。</p></td>
     <td><p><code>"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.weight</code></p></td>
     <td><p>是</p></td>
     <td><p>指定将与原始搜索结果中任何匹配实体的得分相乘的权重。</p><p>该值应为浮点数。</p><ul><li><p>为强调匹配实体的重要性，将其设置为能提高分数的值。</p></li><li><p>若要降低匹配实体的排名，可将此参数赋值为能降低其得分的值。</p></li></ul></td>
     <td><p><code>1</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.filter</code></p></td>
     <td><p>否</p></td>
     <td><p>指定用于在搜索结果实体中匹配实体的筛选表达式。它可以是<a href="./filtering-overview">过滤表达式概览</a>中提到的任何有效基本筛选表达式。</p><p><strong>注意</strong>：仅使用基本运算符，例如<code>==</code>、<code>&gt;</code>或<code>&lt;</code>。使用高级运算符，例如<code>text_match</code>或<code>phrase_match</code>，将降低搜索性能。</p></td>
     <td><p><code>"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.random_score</code></p></td>
     <td><p>否</p></td>
     <td><p>指定一个随机函数，该函数会随机生成一个介于<code>0</code>和<code>1</code>之间的值。它有以下两个可选参数：</p><ul><li><p><code>种子</code>（数字）指定用于启动伪随机数生成器（PRNG）的初始值。</p></li><li><p><code>字段</code> （字符串）指定一个字段的名称，该字段的值将用作生成随机数的随机因子。具有唯一值的字段就足够了。</p><p>建议您同时设置<code>种子</code>和<code>字段</code>，以通过使用相同的种子和字段值来确保各代之间的一致性。</p></li></ul></td>
     <td><p><code>\{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>

### 使用单个 Boost Ranker 进行搜索\{#search-with-a-single-boost-ranker}

一旦Boost Ranker函数准备就绪，您就可以在搜索请求中引用它。以下示例假设您已经创建了一个包含以下字段的集合：**id**、**vector**和**doctype**。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

# Connect to the Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# Assume you have a collection set up

# Conduct a similarity search using the created ranker
client.search(
    collection_name="my_collection",
    data=[[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    anns_field="vector",
    params={},
    output_field=["doctype"],
    ranker=ranker
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.FloatVec;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());
        
SearchResp searchReq = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new FloatVec(new float[]{-0.619954f, 0.447943f, -0.174938f, -0.424803f, -0.864845f})))
        .annsField("vector")
        .outputFields(Collections.singletonList("doctype"))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build());
SearchResp searchResp = client.search(searchReq);
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

// Connect to the Milvus server
const client = new MilvusClient({
  address: 'localhost:19530',
  token: 'YOUR_CLUSTER_TOKEN'
});

// Assume you have a collection set up

// Conduct a similarity search
const searchResults = await client.search({
  collection_name: 'my_collection',
  data: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911],
  anns_field: 'vector',
  output_fields: ['doctype'],
  rerank: ranker,
});

console.log('Search results:', searchResults);
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

### 使用多个 Boost Ranker 进行搜索\{#search-with-multiple-boost-rankers}

您可以在单个搜索中组合多个 Boost Ranker，以影响搜索结果。为此，您可以创建多个 Boost Ranker，并在 **FunctionScore** 实例中引用它们，并将 **FunctionScore** 实例用作搜索请求中的 Ranker。

以下示例展示了如何通过应用介于 **0.8** 和 **1.2** 之间的权重来修改所有已识别实体的分数。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, Function, FunctionType, FunctionScore

# Create a Boost Ranker with a fixed weight
fix_weight_ranker = Function(
    name="boost",
    input_field_names=[], # Must be an empty list
    function_type=FunctionType.RERANK,
    params={
        "reranker": "boost",
        "weight": 0.8
    }
)

# Create a Boost Ranker with a randomly generated weight between 0 and 0.4
random_weight_ranker = Function(
    name="boost",
    input_field_names=[], # Must be an empty list
    function_type=FunctionType.RERANK,
    params={
        "reranker": "boost",
        "random_score": {
            "seed": 126,
        },
        "weight": 0.4
    }
)

# Create a Function Score
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params={
        "boost_mode": "Multiply",
        "function_mode": "Sum"
    }
)

# Conduct a similarity search using the created Function Score
client.search(
    collection_name="my_collection",
    data=[[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    anns_field="vector",
    params={},
    output_field=["doctype"],
    ranker=ranker
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.Function fixWeightRanker = CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name("boost")
                 .param("reranker", "boost")
                 .param("weight", "0.8")
                 .build();
                 
CreateCollectionReq.Function randomWeightRanker = CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name("boost")
                 .param("reranker", "boost")
                 .param("weight", "0.4")
                 .param("random_score", "{\"seed\": 126}")
                 .build();

Map<String, String> params = new HashMap<>();
params.put("boost_mode","Multiply");
params.put("function_mode","Sum");     
FunctionScore ranker = FunctionScore.builder()
                 .addFunction(fixWeightRanker)
                 .addFunction(randomWeightRanker)
                 .params(params)
                 .build()

SearchResp searchReq = client.search(SearchReq.builder()
                 .collectionName("my_collection")
                 .data(Collections.singletonList(new FloatVec(new float[]{-0.619954f, 0.447943f, -0.174938f, -0.424803f, -0.864845f})))
                 .annsField("vector")
                 .outputFields(Collections.singletonList("doctype"))
                 .addFunction(ranker)
                 .build());
SearchResp searchResp = client.search(searchReq);
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='javascript'>

```javascript
import {FunctionType} from '@zilliz/milvus2-sdk-node';

const fix_weight_ranker = {
  name: "boost",
  input_field_names: [],
  type: FunctionType.RERANK,
  params: {
    reranker: "boost",
    weight: 0.8,
  },
};

const random_weight_ranker = {
  name: "boost",
  input_field_names: [],
  type: FunctionType.RERANK,
  params: {
    reranker: "boost",
    random_score: {
      seed: 126,
    },
    weight: 0.4,
  },
};

const ranker = {
  functions: [fix_weight_ranker, random_weight_ranker],
  params: {
    boost_mode: "Multiply",
    function_mode: "Sum",
  },
};

await client.search({
  collection_name: "my_collection",
  data: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
  anns_field: "vector",
  params: {},
  output_field: ["doctype"],
  ranker: ranker
});

```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

具体来说，有两个 Boost Ranker：一个对所有找到的实体应用固定权重，而另一个则为它们分配随机权重。然后，我们在 **FunctionScore** 中引用这两个 Boost Ranker，该 Ranker 还定义了权重如何影响找到的实体的得分。

下表列出了创建 **FunctionScore** 实例所需的参数。

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必填项？</p></th>
     <th><p>描述</p></th>
     <th><p>值/示例</p></th>
   </tr>
   <tr>
     <td><p><code>functions</code></p></td>
     <td><p>是</p></td>
     <td><p>以列表形式指定目标 Ranker 的名称。</p></td>
     <td><p><code>["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.boost_mode</code></p></td>
     <td><p>否</p></td>
     <td><p>指定指定的权重如何影响任何匹配实体的得分。</p><p>可能的值为：</p><ul><li><p><code>Multiply</code></p><p>表示加权值等于匹配实体的原始得分乘以指定的权重。</p><p>这是默认值。</p></li><li><p><code>Sum</code></p><p>表示加权值等于匹配实体的原始分数与指定权重之和</p></li></ul></td>
     <td><p><code>"Multiply"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.function_mode</code></p></td>
     <td><p>否</p></td>
     <td><p>指定如何处理来自各种 Boost Ranker 的加权值。</p><p>可能的值为：</p><ul><li><p><code>Multiply</code></p><p>表示匹配实体的最终得分等于所有 Boost Ranker 的加权值的乘积。</p><p>这是默认值。</p></li><li><p><code>Sum</code></p><p>表示匹配实体的最终得分等于所有 Boost Ranker 的加权值之和。</p></li></ul></td>
     <td><p><code>"Multiply"</code></p></td>
   </tr>
</table>

