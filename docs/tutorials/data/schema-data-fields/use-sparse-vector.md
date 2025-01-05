---
title: "稀疏向量 | Cloud"
slug: /use-sparse-vector
sidebar_label: "稀疏向量"
beta: FALSE
notebook: FALSE
description: "稀疏向量（Sparse Vector）是信息检索和自然语言处理中的一种重要数据表示方法。虽然稠密向量（Dense Vector）因其出色的语义理解能力而广受欢迎，但在需要精确匹配关键词或短语的应用中，稀疏向量往往能够提供更为准确的结果。 | Cloud"
type: origin
token: EoJuwLBJEiIeoUktXbRcDXlFnxi
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 向量字段
  - vector field
  - sparse vector
  - 稀疏向量

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 稀疏向量

稀疏向量（Sparse Vector）是信息检索和自然语言处理中的一种重要数据表示方法。虽然[稠密向量](./use-dense-vector)（Dense Vector）因其出色的语义理解能力而广受欢迎，但在需要精确匹配关键词或短语的应用中，稀疏向量往往能够提供更为准确的结果。

## 概述

稀疏向量是一种高维向量的特殊表示方法，其大多数元素为零，只有少数维度上有非零值。这种特性使得稀疏向量在处理大规模、高维度但数据稀疏的场景中特别有效。常见的应用有:

- 文本分析：将文档表示为词袋向量，每个维度对应一个词，只有文档中出现的词维度取非零值；

- 推荐系统：User-Item 交互矩阵，每个维度表示用户对某个物品的评分，大多数用户只与少数物品交互；

- 图像处理：局部特征表示，只描述图像中的关键点，生成高维稀疏向量。

如下图所示，稠密向量通常以连续数组的形式表示，每个位置都有一个值（如 `[0.3, 0.8, 0.2, 0.3, 0.1]`）。相比之下，稀疏向量仅存储非零元素及其索引位置，通常表示为键值对列表（如 `[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]`）。这种表示方法大大减少了存储空间，并提高了计算效率，特别是在处理超高维度（如 10000 维）的数据时。

![XSFJwXDGGhJGoob8UaMcvpCrnOb](/img/XSFJwXDGGhJGoob8UaMcvpCrnOb.png)

稀疏向量可以通过多种方法生成，常见的包括文本处理中的 [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)（词频-逆文档频率）和 [BM25](https://en.wikipedia.org/wiki/Okapi_BM25) 算法。此外，Zilliz Cloud 提供了一些便捷的方法来帮助您生成和处理稀疏向量，具体可以参考 Embeddings。

数据在向量化后，可以存储在 Zilliz Cloud 中进行管理和向量检索。下图展示了基本流程。

![AAIowWHINh4lYhbAmPlcJ5yQnUn](/img/AAIowWHINh4lYhbAmPlcJ5yQnUn.png)

<Admonition type="info" icon="📘" title="说明">

<p>除了稀疏向量，Zilliz Cloud 还支持稠密向量和 Binary 向量。稠密向量适用于捕捉深层次的语义关联，而 Binary 向量则在快速相似性比较和内容去重等场景中表现出色。有关更多信息，请参考<a href="./use-dense-vector">稠密向量</a>和 <a href="./use-binary-vector">Binary 向量</a>。</p>

</Admonition>

## 在 Zilliz Cloud 中使用稀疏向量

Zilliz Cloud 支持用以下任意格式表示稀疏向量：

- 稀疏矩阵（使用 scipy.sparse 类）

    ```python
    from scipy.sparse import csr_matrix
    
    row = [0, 0, 1, 2, 2, 2]
    col = [0, 2, 2, 0, 1, 2]
    data = [1, 2, 3, 4, 5, 6]
    sparse_matrix = csr_matrix((data, (row, col)), shape=(3, 3))
    
    sparse_vector = sparse_matrix.getrow(0)
    ```

- 字典列表（格式为 `{dimension_index: value, ...}`）

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
    <TabItem value='python'>

    ```python
    sparse_vector = [{1: 0.5, 100: 0.3, 500: 0.8, 1024: 0.2, 5000: 0.6}]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    SortedMap<Long, Float> sparseVector = new TreeMap<>();
    sparseVector.put(1L, 0.5f);
    sparseVector.put(100L, 0.3f);
    sparseVector.put(500L, 0.8f);
    sparseVector.put(1024L, 0.2f);
    sparseVector.put(5000L, 0.6f);
    ```

    </TabItem>
    </Tabs>

- 元组迭代器列表（格式为 `[(dimension_index, value)]`）

    ```python
    sparse_vector = [[(1, 0.5), (100, 0.3), (500, 0.8), (1024, 0.2), (5000, 0.6)]]
    ```

### 添加稀疏向量字段

要在 Zilliz Cloud 中使用稀疏向量，首先需要在创建 Collection 时定义用于存储稀疏向量的字段。这个过程包括：

1. 设置 `datatype` 为支持的稀疏向量数据类型，即 `SPARSE_FLOAT_VECTOR`。

1. 不需要指定维度。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

client.drop_collection(collection_name="my_sparse_collection")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)
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
        .build());
        
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);
schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.VarChar)
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(100)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("sparse_vector")
        .dataType(DataType.SparseFloatVector)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

const schema = [
  {
    name: "metadata",
    data_type: DataType.JSON,
  },
  {
    name: "pk",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "sparse_vector",
    data_type: DataType.SparseFloatVector,
  }
];

```

</TabItem>

<TabItem value='bash'>

```bash
export primaryField='{
    "fieldName": "pk",
    "dataType": "VarChar",
    "isPrimary": true,
    "elementTypeParams": {
        "max_length": 100
    }
}'

export vectorField='{
    "fieldName": "sparse_vector",
    "dataType": "SparseFloatVector"
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField
    ]
}"
```

</TabItem>
</Tabs>

以上示例中，我们添加了一个名为 `sparse_vector` 的向量字段，用于存储稀疏向量。该字段的数据类型为 `SPARSE_FLOAT_VECTOR`。

### 为稀疏向量创建索引

为稀疏向量创建索引的过程和[稠密向量](./use-dense-vector)类似，但指定的索引类型（`index_type`），距离度量类型（`metric_type`），和索引参数（`params`）有所差别。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="sparse_vector",
    index_name="sparse_inverted_index",
    index_type="AUTOINDEX",
    metric_type="IP"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();

indexes.add(IndexParam.builder()
        .fieldName("sparse_vector")
        .indexName("sparse_inverted_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = await client.createIndex({
    index_name: 'sparse_inverted_index',
    field_name: 'sparse_vector',
    metric_type: MetricType.IP,
    index_type: IndexType.AUTOINDEX
});
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "sparse_vector",
            "metricType": "IP",
            "indexName": "sparse_inverted_index",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

以上示例中：

- 为稀疏向量创建了 `AUTOINDEX` 类型的索引。

- 对于稀疏向量，`metric_type` 只支持 `IP`。`IP` 表示内积（Inner Product），用于衡量两个稀疏向量之间的相似度。有关更多相似度信息，请参考[相似度类型](./search-metrics-explained)。

### 创建 Collection

稀疏向量和索引定义完成后，我们便可以创建包含稀疏向量的 Collection。以下示例通过 `create_collection` 方法创建了一个名为 `my_sparse_collection` 的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_sparse_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build());
        
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_sparse_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT'
});

await client.createCollection({
    collection_name: 'my_sparse_collection',
    schema: schema,
    index_params: indexParams
});
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_sparse_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

### 插入稀疏向量

创建 Collection 后，您可以插入包含稀疏向量的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
sparse_vectors = [
    {"sparse_vector": {1: 0.5, 100: 0.3, 500: 0.8}},
    {"sparse_vector": {10: 0.1, 200: 0.7, 1000: 0.9}},
]

client.insert(
    collection_name="my_sparse_collection",
    data=sparse_vectors
)
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
{
    JsonObject row = new JsonObject();
    SortedMap<Long, Float> sparse = new TreeMap<>();
    sparse.put(1L, 0.5f);
    sparse.put(100L, 0.3f);
    sparse.put(500L, 0.8f);
    row.add("sparse_vector", gson.toJsonTree(sparse));
    rows.add(row);
}
{
    JsonObject row = new JsonObject();
    SortedMap<Long, Float> sparse = new TreeMap<>();
    sparse.put(10L, 0.1f);
    sparse.put(200L, 0.7f);
    sparse.put(1000L, 0.9f);
    row.add("sparse_vector", gson.toJsonTree(sparse));
    rows.add(row);
}

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_sparse_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
  { sparse_vector: { "1": 0.5, "100": 0.3, "500": 0.8 } },
  { sparse_vector: { "10": 0.1, "200": 0.7, "1000": 0.9 } },
];
client.insert({
  collection_name: "my_sparse_collection",
  data: data,
});

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
        {"sparse_vector": {"1": 0.5, "100": 0.3, "500": 0.8}},
        {"sparse_vector": {"10": 0.1, "200": 0.7, "1000": 0.9}}        
    ],
    "collectionName": "my_sparse_collection"
}'

## {"code":0,"cost":0,"data":{"insertCount":2,"insertIds":["453577185629572534","453577185629572535"]}}
```

</TabItem>
</Tabs>

### 基于稀疏向量执行相似性搜索

要基于稀疏向量进行相似性搜索，您需要先准备查询向量和搜索参数。

```python
search_params = {
    "params": {"drop_ratio_search": 0.2},
}

query_vector = [{1: 0.2, 50: 0.4, 1000: 0.7}]
```

以上示例中，`drop_ratio_search`是专用于稀疏向量的可选搜索参数，它允许在搜索过程中对查询向量中的小值进行微调。例如，如果 `{"drop_ratio_search": 0.2}`，在搜索过程中，查询向量中最小的 20% 的值将被忽略。

然后，通过 `search` 方法执行相似性搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="my_sparse_collection",
    data=query_vector,
    limit=3,
    output_fields=["pk"],
    search_params=search_params,
)

print(res)

# Output
# data: ["[{'id': '453718927992172266', 'distance': 0.6299999952316284, 'entity': {'pk': '453718927992172266'}}, {'id': '453718927992172265', 'distance': 0.10000000149011612, 'entity': {'pk': '453718927992172265'}}]"]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> searchParams = new HashMap<>();
searchParams.put("drop_ratio_search", 0.2);

SortedMap<Long, Float> sparse = new TreeMap<>();
sparse.put(10L, 0.1f);
sparse.put(200L, 0.7f);
sparse.put(1000L, 0.9f);

SparseFloatVec queryVector = new SparseFloatVec(sparse);

SearchResp searchR = client.search(SearchReq.builder()
        .collectionName("my_sparse_collection")
        .data(Collections.singletonList(queryVector))
        .annsField("sparse_vector")
        .searchParams(searchParams)
        .topK(3)
        .outputFields(Collections.singletonList("pk"))
        .build());
        
System.out.println(searchR.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={pk=453444327741536759}, score=1.31, id=453444327741536759), SearchResp.SearchResult(entity={pk=453444327741536756}, score=1.31, id=453444327741536756), SearchResp.SearchResult(entity={pk=453444327741536753}, score=1.31, id=453444327741536753)]]
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.search({
    collection_name: 'my_sparse_collection',
    data: {1: 0.2, 50: 0.4, 1000: 0.7},
    limit: 3,
    output_fields: ['pk'],
    params: {
        drop_ratio_search: 0.2
    }
});
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_sparse_collection",
    "data": [
        {"1": 0.2, "50": 0.4, "1000": 0.7}
    ],
    "annsField": "sparse_vector",
    "limit": 3,
    "searchParams":{
        "params":{"drop_ratio_search": 0.2}
    },
    "outputFields": ["pk"]
}'

## {"code":0,"cost":0,"data":[{"distance":0.63,"id":"453577185629572535","pk":"453577185629572535"},{"distance":0.1,"id":"453577185629572534","pk":"453577185629572534"}]}
```

</TabItem>
</Tabs>

有关更多搜索相关信息，请参考[基本 ANN Search](./single-vector-search)。