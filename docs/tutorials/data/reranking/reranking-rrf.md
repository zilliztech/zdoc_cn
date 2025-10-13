---
title: "RRF Ranker | Cloud"
slug: /reranking-rrf
sidebar_label: "RRF Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "RRF (互反排名融合) Ranker 是 Zilliz Cloud 混合搜索的一种重排序策略，它根据多个向量搜索路径的排名位置而非原始相似度得分来平衡结果。就像体育锦标赛会考虑选手的排名而非个人统计数据一样，RRF Ranker 根据每个项目在不同搜索路径中的排名高低来合并搜索结果，从而生成一个公平且平衡的最终排名。 | Cloud"
type: origin
token: UhaWwxDY6ik0mXkFqc3cIi2rn1e
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - rrf

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# RRF Ranker

RRF (互反排名融合) Ranker 是 Zilliz Cloud 混合搜索的一种重排序策略，它根据多个向量搜索路径的排名位置而非原始相似度得分来平衡结果。就像体育锦标赛会考虑选手的排名而非个人统计数据一样，RRF Ranker 根据每个项目在不同搜索路径中的排名高低来合并搜索结果，从而生成一个公平且平衡的最终排名。

## 何时使用 RRF Ranker{#when-to-use-rrf-ranker}

RRF Ranker 专为混合搜索场景而设计，在这些场景中，你可以平衡来自多个向量搜索路径的结果，而无需分配明确的重要性权重。它在以下方面特别有效：

<table>
   <tr>
     <th><p>用例</p></th>
     <th><p>示例</p></th>
     <th><p>为什么RRF Ranker 效果良好</p></th>
   </tr>
   <tr>
     <td><p>同等重要性的多模态搜索</p></td>
     <td><p>图像文本搜索，两种模态同等重要</p></td>
     <td><p>平衡结果，无需进行任意权重分配</p></td>
   </tr>
   <tr>
     <td><p>集成向量搜索</p></td>
     <td><p>结合不同嵌入模型的结果</p></td>
     <td><p>民主地合并排名，不偏袒任何特定模型的评分分布</p></td>
   </tr>
   <tr>
     <td><p>跨语言搜索</p></td>
     <td><p>跨多种语言查找文档</p></td>
     <td><p>公平地对结果进行排名，而不考虑特定语言的嵌入特征</p></td>
   </tr>
   <tr>
     <td><p>专家建议</p></td>
     <td><p>整合多个专家系统的建议</p></td>
     <td><p>当不同系统使用不可比的评分方法时，创建共识排名</p></td>
   </tr>
</table>

如果您的混合搜索应用程序需要在不分配明确权重的情况下民主地平衡多个搜索路径，RRF Ranker 是您的理想选择。

## RRF Ranker 工作机制{#mechanism-of-rrf-ranker}

RRF Ranker 策略的主要工作流程如下：

1. **收集搜索排名**：收集向量搜索各路径结果的排名（rank_1、rank_2）。

1. **合并排名**：根据公式转换每条路径的排名（rank_rrf_1、rank_rrf_2）。

    计算公式涉及 *N*，表示检索次数。*ranki*(*d*)是由*第 i* 个检索器生成的文档 *d* 的排名位置。*k* 是一个平滑参数，通常设置为 60。

1. **聚合排名**：根据组合排名对搜索结果进行重新排序，以生成最终结果。

![EcHYw1ZDYhANJObodP2cnElGnXK](/img/EcHYw1ZDYhANJObodP2cnElGnXK.png)

## RRF Ranker 示例{#example-of-rrf-ranker}

此示例展示了在稀疏-密集向量上进行的混合搜索（topK=5），并说明了 RRF Ranker 策略如何对两次近似最近邻（ANN）搜索的结果进行重排序。

- 文本稀疏向量的 ANN 搜索结果（topK=5）：

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>排名（稀疏）</strong></p></th>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>1</p></td>
       </tr>
       <tr>
         <td><p>203</p></td>
         <td><p>2</p></td>
       </tr>
       <tr>
         <td><p>150</p></td>
         <td><p>3</p></td>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>4</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>5</p></td>
       </tr>
    </table>

- 文本密集向量的 ANN 搜索结果（topK=5）：

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>排名（密集）</strong></p></th>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>1</p></td>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>2</p></td>
       </tr>
       <tr>
         <td><p>110</p></td>
         <td><p>3</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>4</p></td>
       </tr>
       <tr>
         <td><p>250</p></td>
         <td><p>5</p></td>
       </tr>
    </table>

- 使用RRF重新排列两组搜索结果的排名。假设平滑参数`k`设置为60。

    <table>
       <tr>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>得分（稀疏）</strong></p></th>
         <th><p><strong>得分（密集）</strong></p></th>
         <th><p><strong>最终得分</strong></p></th>
       </tr>
       <tr>
         <td><p>101</p></td>
         <td><p>1</p></td>
         <td><p>2</p></td>
         <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
       </tr>
       <tr>
         <td><p>198</p></td>
         <td><p>4</p></td>
         <td><p>1</p></td>
         <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
       </tr>
       <tr>
         <td><p>175</p></td>
         <td><p>5</p></td>
         <td><p>4</p></td>
         <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
       </tr>
       <tr>
         <td><p>203</p></td>
         <td><p>2</p></td>
         <td><p>N/A</p></td>
         <td><p>1/(60+2) = 0.01613</p></td>
       </tr>
       <tr>
         <td><p>150</p></td>
         <td><p>3</p></td>
         <td><p>N/A</p></td>
         <td><p>1/(60+3) = 0.01587</p></td>
       </tr>
       <tr>
         <td><p>110</p></td>
         <td><p>N/A</p></td>
         <td><p>3</p></td>
         <td><p>1/(60+3) = 0.01587</p></td>
       </tr>
       <tr>
         <td><p>250</p></td>
         <td><p>N/A</p></td>
         <td><p>5</p></td>
         <td><p>1/(60+5) = 0.01554</p></td>
       </tr>
    </table>

- 重排序后的最终结果（topK=5）：

    <table>
       <tr>
         <th><p><strong>排名</strong></p></th>
         <th><p><strong>ID</strong></p></th>
         <th><p><strong>最终得分</strong></p></th>
       </tr>
       <tr>
         <td><p>1</p></td>
         <td><p>101</p></td>
         <td><p>0.01639</p></td>
       </tr>
       <tr>
         <td><p>2</p></td>
         <td><p>203</p></td>
         <td><p>0.01613</p></td>
       </tr>
       <tr>
         <td><p>3</p></td>
         <td><p>198</p></td>
         <td><p>0.01593</p></td>
       </tr>
       <tr>
         <td><p>4</p></td>
         <td><p>150</p></td>
         <td><p>0.01587</p></td>
       </tr>
       <tr>
         <td><p>5</p></td>
         <td><p>110</p></td>
         <td><p>0.01587</p></td>
       </tr>
    </table>

## 使用 RRF Ranker{#usage-of-rrf-ranker}

使用 RRF Ranker 策略时，需要配置参数 `k`。它是一个平滑参数，可以有效改变全文搜索与向量搜索的相对权重。该参数的默认值为 60，可在 (0, 16384) 范围内调整。取值应为浮点数，建议值在 &#91;10, 100&#93; 之间。虽然 `k=60` 是常见选择，但最优 `k` 值可能因具体应用和数据集而异。我们建议根据具体用例测试和调整此参数，以实现最佳性能。

### 创建一个 RRF Ranker

在您的集合设置了多个向量字段后，使用适当的平滑参数创建一个RRF排序器：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import RRFRanker

ranker = RRFRanker(100)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.ranker.RRFRanker;

RRFRanker ranker = new RRFRanker(100);
```

</TabItem>

<TabItem value='go'>

```go
ranker := milvusclient.NewRRFReranker().WithK(100)
```

</TabItem>

<TabItem value='javascript'>

```javascript
ranker: RRFRanker("100")
```

</TabItem>

<TabItem value='bash'>

```bash
"ranker": {
    "strategy": "rrf",
    "params": {
        "k": 100
    }
}
export ranker='{
        "strategy": "rrf",
        "params": {"k": 100}
    }'
```

</TabItem>
</Tabs>

### 在混合搜索中使用{#apply-to-hybrid-search}

RRF Ranker 专为结合多个向量字段的混合搜索操作而设计。以下是在混合搜索中使用它的方法：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, AnnSearchRequest

# Connect to Milvus server
milvus_client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# Assume you have a collection setup

# Define text vector search request
text_search = AnnSearchRequest(
    data=["modern dining table"],
    anns_field="text_vector",
    param={},
    limit=10
)

# Define image vector search request
image_search = AnnSearchRequest(
    data=[image_embedding],  # Image embedding vector
    anns_field="image_vector",
    param={},
    limit=10
)

# Apply RRF Ranker to product hybrid search
# The smoothing parameter k controls the balance
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [text_search, image_search],  # Multiple search requests
    # highlight-next-line
    ranker=ranker,  # Apply the RRF ranker
    limit=10,
    output_fields=["product_name", "price", "category"]
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

有关混合搜索的更多信息，请参阅[多向量混合搜索](./hybrid-search)。