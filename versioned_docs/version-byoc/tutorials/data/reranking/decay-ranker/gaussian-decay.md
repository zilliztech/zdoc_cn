---
title: "高斯衰减 | BYOC"
slug: /gaussian-decay
sidebar_label: "高斯衰减"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "高斯衰减，也称为正态衰减，能对搜索结果进行最自然的调整。就像人类的视觉会随着距离逐渐模糊一样，高斯衰减会创建一条平滑的钟形曲线，随着项目远离理想点，逐渐降低其相关性。当你希望实现一种平衡的衰减，既不会对刚好超出首选范围的项目进行大举罚分，又能显著降低远距离项目的相关性时，这种方法是理想之选。 | BYOC"
type: origin
token: Legxw7ksGi1G0Skd085ckWIznJh
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - 衰减
  - decay ranker
  - gauss
  - 高斯

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 高斯衰减

高斯衰减，也称为正态衰减，能对搜索结果进行最自然的调整。就像人类的视觉会随着距离逐渐模糊一样，高斯衰减会创建一条平滑的钟形曲线，随着项目远离理想点，逐渐降低其相关性。当你希望实现一种平衡的衰减，既不会对刚好超出首选范围的项目进行大举罚分，又能显著降低远距离项目的相关性时，这种方法是理想之选。

与其他 Decay Ranker 不同：

- 指数衰减起初下降迅速，产生更强的初始罚分

- 线性衰减以恒定速率下降直至归零，形成明确的截止点

高斯衰减提供了一种更加平衡、直观的方法，让用户感觉自然。

## 何时使用高斯衰减{#when-to-use-gaussian-decay}

高斯衰减在以下方面特别有效：

<table>
   <tr>
     <th><p>用例</p></th>
     <th><p>示例</p></th>
     <th><p>高斯衰减为何效果良好</p></th>
   </tr>
   <tr>
     <td><p>基于位置的搜索</p></td>
     <td><p>餐厅查找器、店铺定位器</p></td>
     <td><p>模拟人类对距离相关性的自然感知</p></td>
   </tr>
   <tr>
     <td><p>内容推荐</p></td>
     <td><p>基于发表日期的文章推荐</p></td>
     <td><p>随着内容老化，相关性逐渐下降</p></td>
   </tr>
   <tr>
     <td><p>产品列表</p></td>
     <td><p>价格接近目标的商品</p></td>
     <td><p>当价格偏离目标时，相关性平稳下降</p></td>
   </tr>
   <tr>
     <td><p>专业匹配</p></td>
     <td><p>寻找有相关经验的专业人士</p></td>
     <td><p>对经验相关性的平衡评估</p></td>
   </tr>
</table>

如果你的应用程序需要一种自然的相关性衰减感觉，而不采用严厉的惩罚或严格的截断，高斯衰减可能是你的最佳选择。

## 钟形曲线原理{#bell-curve-principle}

高斯衰减会产生一条平滑的钟形曲线，随着与理想点的距离增加，相关性逐渐降低。这种分布以数学家卡尔·弗里德里希·高斯的名字命名，在自然界和统计学中经常出现。这也说明了为什么它在人类的感知中如此直观。

![ZcNhbVbEMokVA0xRjX7cmKVInYc](/img/ZcNhbVbEMokVA0xRjX7cmKVInYc.png)

上图展示了高斯衰减如何影响移动搜索应用中的餐厅排名：

- `origin` (0公里)：又被称为原点，表示您当前的位置。此处相关性达到最大值(1.0)。

- `offset` (±300米)：又被称为偏移量，表示您周围的“完美得分区域”——300米范围内的所有餐厅均保持满分相关性得分(1.0)，确保非常近的选项不会因微小的距离差异而被不必要地扣分。

- `scale` (±2公里)：又被称为关注范围，表示相关性降至衰减值的距离——距离正好2公里的餐厅，其相关性得分减半(0.5)。

- `decay` (0.5)：又被称为衰减值，表示在关注范围边缘的得分——此参数本质上控制得分随距离衰减的速度。

从曲线中可以看出，距离超过2公里的餐厅的相关性持续下降，但永远不会完全降至零。即使是4 - 5公里外的餐厅也保留了一定的最低相关性，这使得优质但距离较远的餐厅仍能出现在你的搜索结果中（尽管排名较低）。

这种行为模仿了人们自然思考距离相关性的方式——人们倾向于选择附近的地方，但为了特别的选择，也愿意走得更远。

## 公式{#formula}

计算高斯衰减得分的数学公式为：

$$
S(doc) = \exp\left( -\frac{\left( \max\left(0, \left|fieldvalue_{doc} - origin\right| - offset \right) \right)^2&#125;{2\sigma^2} \right)
$$

其中：

$$
\sigma^2 = -\frac{scale^2}{2 \cdot \ln(decay)}
$$

用通俗易懂的语言来解释就是：

1. 计算字段值离原点的距离：$|fieldvalue_{doc} - origin|$

1. 减去偏移量（如果有的话），但结果永远不能小于零：$\max(0, distance - offset)$

1. 将这个调整后的距离平方：$(adjusted\_distance)^2$

1. 除以$2\sigma^2$，它是根据您的缩放和衰减参数计算得出的

1. 取负指数，它会给出一个介于 0 和 1 之间的值：$\exp(-value)$

该 $\sigma^2$ 计算将您的不衰减范围和衰减参数转换为高斯分布的均方差平方。这就是该函数呈现其特征钟形的原因。

## 使用高斯衰减{#use-gaussian-decay}

高斯衰减可应用于 Zilliz Cloud 中的标准向量搜索和混合搜索操作。以下是实现此功能的关键代码片段。

<Admonition type="info" icon="📘" title="说明">

<p>在使用 Decay Ranker 之前，你必须首先创建一个包含适当数字类型字段（如时间戳、距离等）的集合，这些字段将用于衰减计算。有关包括 Collection 设置、 Schema 定义和数据插入的完整工作示例，请参考<a href="./tutorial-implement-time-based-ranking">教程：实现基于时间的搜索结果重排</a>。</p>

</Admonition>

### 创建一个 Decay Ranker{#create-a-decay-ranker}

在您的集合设置了一个数字字段（此处，以 `distance` 为例，单位为米）后，创建一个使用高斯衰减的 Decay Ranker：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import Function, FunctionType

# Create a Gaussian decay ranker for location-based restaurant search
ranker = Function(
    name="restaurant_distance_decay",     # Function identifier
    input_field_names=["distance"],       # Numeric field for distance in meters
    function_type=FunctionType.RERANK,    # Function type. Must be RERANK
    params={
        "reranker": "decay",              # Specify decay reranker
        "function": "gauss",              # Choose Gaussian decay
        "origin": 0,                      # Your current location (0 meters)
        "offset": 300,                    # 300m no-decay zone
        "decay": 0.5,                     # Half score at scale distance
        "scale": 2000                     # 2 km scale (2000 meters)
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.ranker.DecayRanker;

DecayRanker ranker = DecayRanker.builder()
        .name("restaurant_distance_decay")
        .inputFieldNames(Collections.singletonList("distance"))
        .function("gauss")
        .origin(0)
        .offset(300)
        .decay(0.5)
        .scale(2000)
        .build();
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { FunctionType } from "@zilliz/milvus2-sdk-node";

const ranker = {
  name: "restaurant_distance_decay",
  input_field_names: ["distance"],
  function_type: FunctionType.RERANK,
  params: {
    reranker: "decay",
    function: "gauss",
    origin: 0,
    offset: 300,
    decay: 0.5,
    scale: 2000,
  },
};

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

### 在标准向量搜索中使用{#apply-to-standard-vector-search}

定义 Decay Ranker 后，您可以在搜索请求中通过将其传递给 `ranker` 参数来应用它：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Apply decay ranker to restaurant vector search
result = milvus_client.search(
    collection_name,
    data=[your_query_vector],         # Replace with your query vector
    anns_field="dense",                   # Vector field to search
    limit=10,                             # Number of results
    output_fields=["name", "cuisine", "distance"],  # Fields to return
    #  highlight-next-line
    ranker=ranker,                        # Apply the decay ranker
    consistency_level="Strong"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("italian restaurants")))
        .annsField("vector_field")
        .limit(10)
        .outputFields(Arrays.asList("name", "cuisine", "distance"))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build();
SearchResp searchResp = client.search(searchReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const result = await milvusClient.search({
  collection_name: "collection_name",
  data: [your_query_vector], // Replace with your query vector
  anns_field: "dense",
  limit: 10,
  output_fields: ["name", "cuisine", "distance"],
  rerank: ranker,
  consistency_level: "Strong",
});
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

### 在混合搜索中使用{#apply-to-hybrid-search}

Decay Ranker 也可应用于结合多个向量字段的混合搜索操作：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import AnnSearchRequest

# Define dense vector search request
dense = AnnSearchRequest(
    data=[your_query_vector_1], # Replace with your query vector
    anns_field="dense",
    param={},
    limit=10
)

# Define sparse vector search request
sparse = AnnSearchRequest(
    data=[your_query_vector_2], # Replace with your query vector
    anns_field="sparse_vector",
    param={},
    limit=10
)

# Apply decay ranker to restaurant hybrid search
hybrid_results = milvus_client.hybrid_search(
    collection_name,
    [dense, sparse],                      # Multiple search requests
    #  highlight-next-line
    ranker=ranker,                        # Same decay ranker
    limit=10,
    output_fields=["name", "cuisine", "distance"]
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.data.FloatVec;
        
List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("dense_vector")
        .vectors(Collections.singletonList(new FloatVec(embedding)))
        .limit(10)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("sparse_vector")
        .vectors(Collections.singletonList(new EmbeddedText("italian restaurants")))
        .limit(10)
        .build());

HybridSearchReq hybridSearchReq = HybridSearchReq.builder()
                .collectionName(COLLECTION_NAME)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(10)
                .outputFields(Arrays.asList("name", "cuisine", "distance"))
                .build();
SearchResp searchResp = client.hybridSearch(hybridSearchReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const denseRequest = {
  data: [your_query_vector_1], // Replace with your query vector
  anns_field: "dense",
  param: {},
  limit: 10,
};

const sparseRequest = {
  data: [your_query_vector_2], // Replace with your query vector
  anns_field: "sparse_vector",
  param: {},
  limit: 10,
};

const hybridResults = await milvusClient.search({
  collection_name: "collection_name",
  data: [denseRequest, sparseRequest],
  rerank: ranker,
  limit: 10,
  output_fields: ["name", "cuisine", "distance"],
});

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

有关混合搜索操作的更多信息，请参阅[多向量混合搜索](./hybrid-search)。