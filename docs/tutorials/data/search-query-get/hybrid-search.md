---
title: "Hybrid Search | Cloud"
slug: /hybrid-search
sidebar_label: "Hybrid Search"
beta: FALSE
notebook: FALSE
description: "Hybrid Search 是指同时进行多路搜索，对多路搜索的结果进行重排，最终返还单路结果的搜索方式。使用 Hybrid Search 能够提升搜索结果的准确性。 | Cloud"
type: origin
token: SU1DwjEeii0p2ik3odJcQ55Unbf
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - search
  - 搜索
  - anns_field
  - filter
  - output fields
  - distance
  - score
  - hybrid search
  - sparse vector
  - dense vector
  - rerank
  - 重排

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Hybrid Search

Hybrid Search 是指同时进行多路搜索，对多路搜索的结果进行重排，最终返还单路结果的搜索方式。使用 Hybrid Search 能够提升搜索结果的准确性。

Zilliz Cloud 的 Hybrid Search 功能支持针对多个向量列进行搜索，适用于稀疏-稠密向量搜索和多模态搜索。在 AI 应用中，通常会使用 Hybrid Search 功能搜索稀疏-稠密向量，提升搜索准确性。

本节将展示如何使用 Zilliz Cloud 进行 Hybrid Search 及相关的注意事项。

## 适用场景{#scenarios}

Hybrid Search 适用于以下两种场景。

### 稀疏-稠密向量搜索{#sparse-dense-vector-search}

不同类型的向量可以代表不同的信息，采用多种 Embedding 模型可以更全面地表示数据的特征。例如，分别使用不同的 Embedding 模型针对同一句句子分别生成一个稠密向量用于表示句子的语义和一个稀疏向量用于表示句子中的词频。

**稀疏向量：**稀疏向量维度很高，但包含的非零值较少，因此适用于传统的信息检索场景。绝大多数情况下，维度代表语言中的不同 Token，每个 Token 都使用一个维度来代表，可以反应该 Token 在文档中的相对重要性。这种布局特别适用于需要进行关键词匹配的任务。

**稠密向量：**稠密向量是来自神经网络的 Embedding 向量，当它们以有序数组组合在一起时，便可以表示输入文本的语义。稠密向量也会用于计算机视觉领域，用于表示视觉数据的语义。这些稠密向量通常由文本 Embedding 模型生成，其特点是大部分或所有元素都是非零的。因此，稠密向量适用于语义搜索场景，因为可以根据向量距离返回最相似的结果。稠密向量不太适用于精确匹配的场景。

更多有关稀疏和稠密向量的介绍，请参考[稀疏向量](./use-sparse-vector)和[稠密向量](./use-dense-vector)。

### 多模态搜索{#multi-modal-search}

多模态搜索是指跨多种模态（如图像、视频、音频、文本）对非结构化数据进行相似性搜索。例如，可以使用多种模态的数据来表示一个人：指纹、声纹、脸部特征。Hybrid Search 支持同时针对这几个模态进行多路召回来搜索相似的人。

## Hybrid Search 流程{#workflow}

通过 Zilliz Cloud 进行 Hybrid Search 的主要步骤如下：

1. 通过 Embedding 模型（如 [BERT](https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT) 和 [Transformers](https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI) 等）生成稠密向量。

1. 通过 Embedding 模型（如 [BM25](https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus)、[BGE-M3、](https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3)[SPLADE](https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE) 等）生成稀疏向量。

1. 在 Zilliz Cloud 中创建 Collection 并定义 Schema，Schema 中需要设置稠密和稀疏向量列。

1. 将包含稀疏-稠密向量的 Entity 插入到上一步创建的 Zilliz Cloud Collection 中。

1. 进行 Hybrid Search：基于稠密向量的 ANN Search 将返回 TopK 个结果，基于稀疏向量的精准文本匹配同样将返回 TopK 个结果。

1. 将两组 TopK 个结果的 Score 进行归一化（Normalization），即将 Score 折算为 &#91;0,1&#93; 之间。

1. 选择合适的 Reranking 策略，对两组 TopK 个结果进行重排序，最终返回 TopK 个结果。

![OrDFw4QqrhpScXbmluccHZPFn2w](/img/OrDFw4QqrhpScXbmluccHZPFn2w.png)

## 操作示例{#examples}

本节将结合具体示例介绍如何开展稀疏-稠密向量的 Hybrid Search，用于提升文本搜索的准确性。

### 创建包含多个向量列的 Collection{#step-1-create-a-collection-with-multiple-vector-fields}

创建 Collection 的流程共包含 3 个部分：定义 Collection Schema、创建索引参数、创建 Collection。

#### 定义 Schema{#define-schema}

本示例中，需要在 Collection Schema 中定义多个向量列。目前，默认状态下每个 Zilliz Cloud Collection 中可包含 4 个向量字段。您可以按需通过修改 [proxy.maxVectorFieldNum](https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum) 配置，在 Collection 中添加至多 10 个向量字段。

以下示例定义了 Collection Schema，其中 `dense` 和 `sparse` 是两个向量字段。

- `id`：该字段作为主键用于存储文本 ID。字段数据类型为 INT64。

- `text`：该字段用于存储文本内容。字段数据类型为 VARCHAR，最大长度为 1000 个字符。

- `dense`：该字段用于存储文本的稠密向量。字段数据类型为 FLOAT_VECTOR，向量维度为 768 维。

- `sparse`：该字段用于存储文本的稀疏向量。字段数据类型为 SPARSE_FLOAT_VECTOR。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Create a collection in customized setup mode
from pymilvus import (
    MilvusClient, DataType
)

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)
# Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=1000)
schema.add_field(field_name="sparse", datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(field_name="dense", datatype=DataType.FLOAT_VECTOR, dim=5)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());

CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("dense")
        .dataType(DataType.FloatVector)
        .dimension(768)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("sparse")
        .dataType(DataType.SparseFloatVector)
        .build());
```

</TabItem>

<TabItem value='go'>

```go
// WIP
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

// Create a collection in customized setup mode
// Define fields
const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "text",
        data_type: DataType.VarChar,
        max_length: 1000
    },
    {
        name: "sparse",
        data_type: DataType.SPARSE_FLOAT_VECTOR
    },
    {
        name: "dense",
        data_type: DataType.FloatVector,
        dim: 768
    }
]
```

</TabItem>

<TabItem value='bash'>

```bash
export schema='{
        "autoId": false,
        "enabledDynamicField": true,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "text",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000
                }
            },
            {
                "fieldName": "sparse",
                "dataType": "SparseFloatVector"
            },
            {
                "fieldName": "dense",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "768"
                }
            }
        ]
    }'
```

</TabItem>
</Tabs>

#### 创建索引参数{#create-index-params}

完成 Schema 定义后，需要设置向量索引和相似度类型。本例中，为稠密向量字段 `dense` 设置了 `IVF_FLAT` 索引，为稀疏向量字段 `sparse` 设置了 `SPARSE_INVERTED_INDEX` 索引。如需了解 Zilliz Cloud 支持的索引类型，请参考[管理 Index](./manage-indexes)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

# Prepare index parameters
index_params = client.prepare_index_params()

# Add indexes
index_params.add_index(
    field_name="dense",
    index_name="dense_index",
    index_type="IVF_FLAT",
    metric_type="IP",
    params={"nlist": 128},
)

index_params.add_index(
    field_name="sparse",
    index_name="sparse_index",
    index_type="SPARSE_INVERTED_INDEX",  # Index type for sparse vectors
    metric_type="IP",  # Currently, only IP (Inner Product) is supported for sparse vectors
    params={"drop_ratio_build": 0.2},  # The ratio of small vector values to be dropped during indexing
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

Map<String, Object> denseParams = new HashMap<>();
denseParams.put("nlist", 128);
IndexParam indexParamForDenseField = IndexParam.builder()
        .fieldName("dense")
        .indexName("dense_index")
        .indexType(IndexParam.IndexType.IVF_FLAT)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(denseParams)
        .build();

Map<String, Object> sparseParams = new HashMap<>();
sparseParams.put("drop_ratio_build", 0.2);
IndexParam indexParamForSparseField = IndexParam.builder()
        .fieldName("sparse")
        .indexName("sparse_index")
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(sparseParams)
        .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForDenseField);
indexParams.add(indexParamForSparseField);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const index_params = [{
    field_name: "dense",
    index_type: "IVF_FLAT",
    metric_type: "IP"
},{
    field_name: "sparse",
    index_type: "SPARSE_INVERTED_INDEX",
    metric_type: "IP"
}]
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "dense",
            "metricType": "IP",
            "indexName": "dense_index",
            "indexType":"IVF_FLAT",
            "params":{"nlist":128}
        },
        {
            "fieldName": "sparse",
            "metricType": "IP",
            "indexName": "sparse_index",
            "indexType": "SPARSE_INVERTED_INDEX"
        }
    ]'
```

</TabItem>
</Tabs>

#### 创建 Collection{#create-collection}

基于上述定义的 Schema 和索引参数创建了一个名称为 `demo` 的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client.create_collection(
    collection_name="hybrid_search_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
        .collectionName("hybrid_search_collection")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
client.createCollection(createCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.createCollection({
    collection_name: "hybrid_search_collection",
    fields: fields,
    index_params: index_params,
})
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"hybrid_search_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

### 插入数据{#step-2-insert-data}

将稀疏-稠密向量数据插入新创建的 Collection 中。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

data=[
    {"id": 0, "text": "Artificial intelligence was founded as an academic discipline in 1956.", "sparse":{9637: 0.30856525997853057, 4399: 0.19771651149001523, ...}, "dense": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},
    {"id": 1, "text": "Alan Turing was the first person to conduct substantial research in AI.", "sparse":{6959: 0.31025067641541815, 1729: 0.8265339135915016, ...}, "dense": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},
    {"id": 2, "text": "Born in Maida Vale, London, Turing was raised in southern England.", "sparse":{1220: 0.15303302147479103, 7335: 0.9436728846033107, ...}, "dense": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}

res = client.insert(
    collection_name="hybrid_search_collection",
    data=data
)

```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1);
row1.addProperty("text", "Artificial intelligence was founded as an academic discipline in 1956.");
row1.add("dense", gson.toJsonTree(dense1));
row1.add("sparse", gson.toJsonTree(sparse1));

JsonObject row2 = new JsonObject();
row2.addProperty("id", 2);
row2.addProperty("text", "Alan Turing was the first person to conduct substantial research in AI.");
row2.add("dense", gson.toJsonTree(dense2));
row2.add("sparse", gson.toJsonTree(sparse2));

JsonObject row3 = new JsonObject();
row3.addProperty("id", 3);
row3.addProperty("text", "Born in Maida Vale, London, Turing was raised in southern England.");
row3.add("dense", gson.toJsonTree(dense3));
row3.add("sparse", gson.toJsonTree(sparse3));

List<JsonObject> data = Arrays.asList(row1, row2, row3);
InsertReq insertReq = InsertReq.builder()
        .collectionName("hybrid_search_collection")
        .data(data)
        .build();

InsertResp insertResp = client.insert(insertReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

var data = [
    {id: 0, text: "Artificial intelligence was founded as an academic discipline in 1956.", sparse:[9637: 0.30856525997853057, 4399: 0.19771651149001523, ...] , dense: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]},
    {id: 1, text: "Alan Turing was the first person to conduct substantial research in AI.", sparse:[6959: 0.31025067641541815, 1729: 0.8265339135915016, ...] , dense: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]},
    {id: 2, text: "Born in Maida Vale, London, Turing was raised in southern England." , sparse:[1220: 0.15303302147479103, 7335: 0.9436728846033107, ...] , dense: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592]}       
]

var res = await client.insert({
    collection_name: "hybrid_search_collection",
    data: data,
})
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"id": 0, "text": "Artificial intelligence was founded as an academic discipline in 1956.", "sparse":{"9637": 0.30856525997853057, "4399": 0.19771651149001523}, "dense": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},
        {"id": 1, "text": "Alan Turing was the first person to conduct substantial research in AI.", "sparse":{"6959": 0.31025067641541815, "1729": 0.8265339135915016}, "dense": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},
        {"id": 2, "text": "Born in Maida Vale, London, Turing was raised in southern England.", "sparse":{"1220": 0.15303302147479103, "7335": 0.9436728846033107}, "dense": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}
    ],
    "collectionName": "hybrid_search_collection"
}'
```

</TabItem>
</Tabs>

### 创建多个 AnnSearchRequest 实例{#step-3-create-multiple-annsearchrequest-instances}

Hybrid Search 通过在 `hybrid_search()` 命令中的多个 `AnnSearchRequest` 来实现多路搜索。每个 `AnnSearchRequest` 代表一个针对特定向量字段的[基本 ANN 搜索](./single-vector-search)请求。进行 Hybrid Search 前需要创建与向量字段数量一致的 `AnnSearchRequest`。

通过在 `AnnSearchRequest` 中设置 `expr` 参数，您可以为特定某一路搜索设置过滤条件。请参考[Filtered Search](./filtered-search)与[过滤表达式概览](./filtering-overview)。

<Admonition type="info" icon="📘" title="说明">

<p>Hybrid Search 中，每个 <code>AnnSearchRequest</code> 仅支持 1 个查询向量。</p>

</Admonition>

将查询文本“Who started AI research?”转化为稀疏和稠密向量，并通过以下示例中分别针对 `sparse` 和 `dense` 向量字段创建了 2 个 `AnnSearchRequest` 搜索请求。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import AnnSearchRequest

query_dense_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

search_param_1 = {
    "data": [query_dense_vector],
    "anns_field": "dense",
    "param": {
        "metric_type": "IP",
        "params": {"nprobe": 10}
    },
    "limit": 2
}
request_1 = AnnSearchRequest(**search_param_1)

query_sparse_vector = {3573: 0.34701499565746674}, {5263: 0.2639375518635271}
search_param_2 = {
    "data": [query_sparse_vector],
    "anns_field": "sparse",
    "param": {
        "metric_type": "IP",
        "params": {"drop_ratio_build": 0.2}
    },
    "limit": 2
}
request_2 = AnnSearchRequest(**search_param_2)

reqs = [request_1, request_2]

```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.data.BaseVector;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;

float[] dense = new float[]{-0.0475336798f,  0.0521207601f,  0.0904406682f, ...};
SortedMap<Long, Float> sparse = new TreeMap<Long, Float>() {{
    put(3573L, 0.34701499f);
    put(5263L, 0.263937551f);
    ...
}};

List<BaseVector> queryDenseVectors = Collections.singletonList(new FloatVec(dense));
List<BaseVector> querySparseVectors = Collections.singletonList(new SparseFloatVec(sparse));

List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("dense")
        .vectors(queryDenseVectors)
        .metricType(IndexParam.MetricType.IP)
        .params("{\"nprobe\": 10}")
        .topK(2)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("sparse")
        .vectors(querySparseVectors)
        .metricType(IndexParam.MetricType.IP)
        .params("{\"drop_ratio_build\": 0.2}")
        .topK(2)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const search_param_1 = {
    "data": query_vector, 
    "anns_field": "dense", 
    "param": {
        "metric_type": "IP", // 参数值需要与 Collection Schema 中定义的保持一致
        "params": {"nprobe": 10}
    },
    "limit": 2 // AnnSearchRequest 返还的搜索结果数量
}

const search_param_2 = {
    "data": query_sparse_vector, 
    "anns_field": "sparse", 
    "param": {
        "metric_type": "IP", // 参数值需要与 Collection Schema 中定义的保持一致
        "params": {"drop_ratio_build": 0.2}
    },
    "limit": 2 // AnnSearchRequest 返还的搜索结果数量
}
```

</TabItem>

<TabItem value='bash'>

```bash
export req='[
    {
        "data": [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592,....]],
        "annsField": "dense",
        "params": {
            "params": {
                "nprobe": 10
             }
        },
        "limit": 2
    },
    {
        "data": [{"3573": 0.34701499565746674}, {"5263": 0.2639375518635271}],
        "annsField": "sparse",
        "params": {
            "params": {
                "drop_ratio_build": 0.2
             }
        },
        "limit": 2
    }
 ]'
```

</TabItem>
</Tabs>

可以看到，每个 AnnSearchRequest 返回 2 条搜索结果（limit=2）。本例创建了 2 个 AnnSearchRequest，因此搜索将返回共 4 条搜索结果。

### 选择 Reranking 策略{#step-4-configure-a-reranking-strategy}

上一步的示例中针对 2 个向量字段进行了 ANN 搜索，会返回两组搜索结果。为了将两组搜索结果合并为一组并进行重新排序，需要选择合适的 Reranking 策略。Milvus 支持两种 Reranking 策略：**WeightedRanker** 和 **RRFRanker**。选择 Reranking 策略时，需要考虑是否对多路搜索中的某一或某几路搜索有所侧重。

- 如果希望结果能够更侧重某个向量字段，推荐使用 **WeightedRanker**。因为 **WeightedRanker** 允许您通过分配更高的权重来强调某些向量字段。例如，在多模态搜索中，文本描述可能被认为比图像中的颜色分布更重要。

- 如果没有明确的侧重时，推荐使用 **RFF**。因为 **RRF** 能够有效平衡每一路向量搜索的重要性。

如需了解两种 Reranking 策略的具体机制请参见 [Reranking](./reranking)。

以下两个示例分别展示如何采用 **WeightedRanker** 和 **RRFRanker** 两种 Reranking 策略。

### 进行 Hybrid Search{#step-5-perform-a-hybrid-search}

进行 Hybrid Search 前需要先将 Collection 加载到内存中。如果 Collection 中有部分向量字段未创建索引或未加载，调用 Hybrid Search 命令时将报错。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

res = client.hybrid_search(
    collection_name="hybrid_search_collection",
    reqs=reqs,
    ranker=ranker,
    limit=2
)
for hits in res:
    print("TopK results:")
    for hit in hits:
        print(hit)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

HybridSearchReq hybridSearchReq = HybridSearchReq.builder()
        .collectionName("hybrid_search_collection")
        .searchRequests(searchRequests)
        .ranker(reranker)
        .topK(2)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

SearchResp searchResp = client.hybridSearch(hybridSearchReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

res = await client.loadCollection({
    collection_name: "hybrid_search_collection"
})

import { MilvusClient, RRFRanker, WeightedRanker } from '@zilliz/milvus2-sdk-node';

const search = await client.search({
  collection_name: "hybrid_search_collection",
  data: [search_param_1, search_param_2],
  limit: 2,
  rerank: RRFRanker(100)
});
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/advanced_search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"hybrid_search_collection\",
    \"search\": ${req},
    \"rerank\": {
        \"strategy\":\"rrf\",
        \"params\": {
            \"k\": 10
        }
    },
    \"limit\": 3,
    \"outputFields\": [
        \"user_id\",
        \"word_count\",
        \"book_describe\"
    ]
}"
```

</TabItem>
</Tabs>

返回结果如下所示：

```python
["['id: 844, distance: 0.006047376897186041, entity: {}', 'id: 876, distance: 0.006422005593776703, entity: {}']"]
```

由于在 Hybrid Search 中指定 limit=2，因此 Zilliz Cloud 将第 3 步中的 4 个搜索结果进行重排，最终仅返回 2 条搜索结果。

