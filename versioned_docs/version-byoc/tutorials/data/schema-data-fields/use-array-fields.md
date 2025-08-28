---
title: "Array 类型 | Cloud"
slug: /use-array-fields
sidebar_label: "Array 类型"
beta: FALSE
notebook: FALSE
description: "Array 类型的字段用于存放相同数据类型的一组元素。如下示例展示了如何使用 Array 类型的字段存放数据。 | Cloud"
type: origin
token: LKIuw8JSfice0ek9PvTc2GxXnZz
sidebar_position: 9
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - array 字段
  - array field
  - max_capacity
  - 最大容量
  - element_type
  - 元素类型

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Array 类型

Array 类型的字段用于存放相同数据类型的一组元素。如下示例展示了如何使用 Array 类型的字段存放数据。

```json
{
  "tags": ["pop", "rock", "classic"],
  "ratings": [5, 4, 3]
}
```

## 相关限制

- **默认值与空值**：Array 字段不支持设置默认值。但是您可以将 `nullable` 设置为 `True` 来允许元素为空值。具体可参考[Nullable 和默认值](./nullable-and-default)。

- **数据类型**：Array 字段内所有元素的数据类型必须相同。您可以通过设置 `element_type` 参数来指定元素的数据类型。如果您将 `element_type` 设置为 `VARCHAR`，您还需要为元素设置 `max_length` 参数来指定元素的最大长度。

- **Array 容量**：Array 字段中元素的数量需要小于或等于创建该字段时通过 `max_capacity` 定义的最大容量。该值的取值范围为 **1** 至 **4096**。

- **字符串处理**：当 Array 字段中的元素为字符串时，Milvus 会在搜索和查询时保持原样，不会进行转义操作。例如，`'a"b'`, `"a'b"`, `'a\'b'`, and `"a\"b"` 会原样存取，而 `'a'b'` and `"a"b"` 则会被当作非法字符串处理。

## 添加 Array 字段{#add-array-field}

要在 Zilliz Cloud clusters 中使用 Array 字段，需要在定义 Collection Schema 时定义相关字段类型。这个过程包括：

1. 设置 `datatype` 为支持的 Array 数据类型，即 `ARRAY`。

1. 通过 `element_type` 参数，指定数组中元素的数据类型。该值可以是 Zilliz Cloud clusters 支持的任意标量数据类型，例如 `VARCHAR`、`INT64` 等。同一个 Array 中的所有元素必须是相同的数据类型。

1. 通过 `max_capacity` 参数，设置数组的最大容量，即数组中可以包含的最大元素数量。

以下是如何定义包含 Array 字段的 Collection Schema：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

schema = client.create_schema(
    auto_id=False,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="tags", datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=10, max_length=100)
schema.add_field(field_name="ratings", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5)
schema.add_field(field_name="pk", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=3)
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
        .fieldName("tags")
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(10)
        .maxLength(100)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("ratings")
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(5)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(3)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";
const schema = [
  {
    name: "tags",
    data_type: DataType.Array,
    element_type: DataType.VarChar,
    max_capacity: 10,
    max_length: 100
  },
  {
    name: "rating",
    data_type: DataType.Array,
    element_type: DataType.Int64,
    max_capacity: 5,
  },
  {
    name: "pk",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "embedding",
    data_type: DataType.FloatVector,
    dim: 3,
  },
];
```

</TabItem>

<TabItem value='bash'>

```bash
export arrayField1='{
    "fieldName": "tags",
    "dataType": "Array",
    "elementDataType": "VarChar",
    "elementTypeParams": {
        "max_capacity": 10,
        "max_length": 100
    }
}'

export arrayField2='{
    "fieldName": "ratings",
    "dataType": "Array",
    "elementDataType": "Int64",
    "elementTypeParams": {
        "max_capacity": 5
    }
}'

export pkField='{
    "fieldName": "pk",
    "dataType": "Int64",
    "isPrimary": true
}'

export vectorField='{
    "fieldName": "embedding",
    "dataType": "FloatVector",
    "elementTypeParams": {
        "dim": 3
    }
}'

export schema="{
    \"autoID\": false,
    \"fields\": [
        $arrayField1,
        $arrayField2,
        $pkField,
        $vectorField
    ]
}"
```

</TabItem>
</Tabs>

以上示例中：

- `tags` 字段是一个字符串数组，`element_type` 设置为 `VARCHAR`，表示数组中的元素类型必须为字符串；`max_capacity` 设置为 10，表示该数组最多可以包含 10 个元素。

- `ratings` 是一个整数数组，`element_type` 设置为 `INT64`，表示数组中的元素类型必须为整数；`max_capacity` 设置为 5，表示该数组最多可以包含 5 个评分。

同时我们也添加了主键字段 `pk` 和向量字段 `embedding`。

<Admonition type="info" icon="📘" title="说明">

<p>主键字段和向量字段在创建 Collection 时是必须添加的，主键字段用于唯一标识每条数据，而向量字段是进行相似性搜索的核心。有关具体信息，请参考<a href="./primary-field-auto-id">主键与 AutoId</a>、<a href="./use-sparse-vector">稀疏向量</a>、<a href="./use-dense-vector">稠密向量</a>或 <a href="./use-binary-vector">Binary 向量</a>。</p>

</Admonition>

## 设置索引参数{#set-index-params}

为 Array 字段设置索引参数是一个可选操作，可以显著提高查询效率。

以下示例中，我们为 `tags` 创建了 `AUTOINDEX` 索引类型，表示 Zilliz Cloud clusters 会自动根据数据类型创建合适的标量索引。有关更多信息，请参考 [AUTOINDEX](./autoindex-explained)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python

index_params = client.prepare_index_params()

index_params.add_index(
    field_name="tags",
    index_type="AUTOINDEX",
    index_name="inverted_index"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("tags")
        .indexName("inverted_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = [{
    index_name: 'inverted_index',
    field_name: 'tags',
    index_type: IndexType.AUTOINDEX,
)];
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "tags",
            "indexName": "inverted_index",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

除了 AUTOINDEX，您也可以指定其他标量索引类型，如 `INVERTED` 或 `BITMAP`。有关支持的索引类型，请参考[创建 Scalar Index](./index-scalar-fields)。

此外，在创建 Collection 前，您必须为向量字段创建索引。在本例中，我们使用 `AUTOINDEX` 来简化向量索引设置。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 添加向量索引
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",  # 使用自动索引方式，简化复杂的索引设置
    metric_type="COSINE"  # 指定相似度度量类型，可选择 L2、COSINE 或 IP
)
```

</TabItem>

<TabItem value='java'>

```java
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
 indexParams.push({
    index_name: 'embedding_index',
    field_name: 'embedding',
    index_type: IndexType.AUTOINDEX,
});
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "tags",
            "indexName": "inverted_index",
            "indexType": "AUTOINDEX"
        },
        {
            "fieldName": "embedding",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

## 创建 Collection{#create-collection}

使用定义好的 Schema 和索引参数来创建 Collection：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_array_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_array_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.create_collection({
    collection_name: "my_array_collection",
    schema: schema,
    index_params: indexParams
})
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_array_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 插入数据{#insert-data}

Collection 创建完成后，可以插入包含 Array 字段的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data = [
    {
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "tags": ["jazz", "blues"],
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    },
    {
        "tags": ["electronic", "dance"],
        "ratings": [3, 3, 4],
        "pk": 3,
        "embedding": [0.67, 0.45, 0.89]
    }
]

client.insert(
    collection_name="my_array_collection",
    data=data
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
rows.add(gson.fromJson("{\"tags\": [\"pop\", \"rock\", \"classic\"], \"ratings\": [5, 4, 3], \"pk\": 1, \"embedding\": [0.1, 0.2, 0.3]}", JsonObject.class));
rows.add(gson.fromJson("{\"tags\": [\"jazz\", \"blues\"], \"ratings\": [4, 5], \"pk\": 2, \"embedding\": [0.4, 0.5, 0.6]}", JsonObject.class));
rows.add(gson.fromJson("{\"tags\": [\"electronic\", \"dance\"], \"ratings\": [3, 3, 4], \"pk\": 3, \"embedding\": [0.7, 0.8, 0.9]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_array_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
    {
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "tags": ["jazz", "blues"],
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    },
    {
        "tags": ["electronic", "dance"],
        "ratings": [3, 3, 4],
        "pk": 3,
        "embedding": [0.67, 0.45, 0.89]
    }
];

client.insert({
  collection_name: "my_array_collection",
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
        {
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "tags": ["jazz", "blues"],
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    },
    {
        "tags": ["electronic", "dance"],
        "ratings": [3, 3, 4],
        "pk": 3,
        "embedding": [0.67, 0.45, 0.89]
    }       
    ],
    "collectionName": "my_array_collection"
}'
```

</TabItem>
</Tabs>

在以上示例中：

- 每条数据包含一个主键 (`pk`)，`tags` 和 `ratings` 字段是 Array 字段，用于存储标签和评分。

- `embedding` 是一个 3 维向量字段，用于向量相似性搜索。

## 使用 Array 字段进行过滤搜索和查询{#search-and-query}

Array 字段允许在搜索过程中进行标量过滤，从而增强 Zilliz Cloud clusters 的向量搜索功能。您可以在向量相似性搜索的基础上，根据 Array 字段的属性执行查询。

### 过滤查询{#filter-queries}

您可以基于 Array 字段的属性过滤数据，例如访问特定位置的元素或检查数组元素的值是否符合某个条件。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'ratings[0] < 4'

res = client.query(
    collection_name="my_array_collection",
    filter=filter,
    output_fields=["tags", "ratings", "embedding"]
)

print(res)

# Output
# data: ["{'pk': 3, 'tags': ['electronic', 'dance'], 'ratings': [3, 3, 4], 'embedding': [np.float32(0.67), np.float32(0.45), np.float32(0.89)]}"] 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "ratings[0] < 4";
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_array_collection")
        .filter(filter)
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={ratings=[3, 3, 4], pk=3, embedding=[0.7, 0.8, 0.9], tags=[electronic, dance]})]
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.query({
    collection_name: 'my_array_collection',
    filter: 'ratings[0] < 4',
    output_fields: ['tags', 'ratings', 'embedding']
});
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_array_collection",
    "filter": "ratings[0] < 4",
    "outputFields": ["tags", "ratings", "embedding"]
}'
# {"code":0,"cost":0,"data":[{"embedding":[0.67,0.45,0.89],"pk":3,"ratings":{"Data":{"LongData":{"data":[3,3,4]}}},"tags":{"Data":{"StringData":{"data":["electronic","dance"]}}}}]}
```

</TabItem>
</Tabs>

在以上查询中，Zilliz Cloud clusters 会筛选出 `ratings` 数组中第一个元素小于 `4` 的记录，满足条件的记录将包含在查询结果中。

### 向量搜索与 Array 过滤结合{#vector-search-with-array-filtering}

结合向量相似性与 Array 过滤，可以在找到语义上相似的数据的同时，确保这些数据满足特定的条件，从而使搜索结果更加精准和符合业务需求。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'tags[0] == "pop"'

res = client.search(
    collection_name="my_array_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["tags", "ratings", "embedding"],
    filter=filter
)

print(res)

# Output
# data: ["[{'id': 1, 'distance': 1.1276001930236816, 'entity': {'ratings': [5, 4, 3], 'embedding': [0.11999999731779099, 0.3400000035762787, 0.5600000023841858], 'tags': ['pop', 'rock', 'classic']}}]"]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

String filter = "tags[0] == \"pop\"";
SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_array_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={ratings=[5, 4, 3], embedding=[0.1, 0.2, 0.3], tags=[pop, rock, classic]}, score=-0.2364331, id=1)]]
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.search({
    collection_name: 'my_array_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['tags', 'ratings', 'embdding'],
    filter: 'tags[0] == "pop"'
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
    "collectionName": "my_array_collection",
    "data": [
        [0.3, -0.6, 0.1]
    ],
    "annsField": "embedding",
    "limit": 5,
    "filter": "tags[0] == \"pop\"",
    "outputFields": ["tags", "ratings", "embedding"]
}'

# {"code":0,"cost":0,"data":[{"distance":-0.24793813,"embedding":[0.12,0.34,0.56],"id":1,"ratings":{"Data":{"LongData":{"data":[5,4,3]}}},"tags":{"Data":{"StringData":{"data":["pop","rock","classic"]}}}}]}
```

</TabItem>
</Tabs>

在以上示例中，Zilliz Cloud clusters 将返回与查询向量最相似的前 5 个记录，且这些记录的 `tags` 数组第一个元素为 `"pop"`。

此外，Zilliz Cloud clusters 支持一些高级的 Array 过滤操作符，如 `ARRAY_CONTAINS`、`ARRAY_CONTAINS_ALL`、`ARRAY_CONTAINS_ANY` 和 `ARRAY_LENGTH` 等，可以进一步提升查询能力。有关更多信息，请参考[ARRAY 操作符](./array-filtering-operators)。

## 使用限制{#limits}

- **数据类型**：数组字段中的所有元素必须是相同的数据类型，这个数据类型由 `element_type` 指定。

- **数组容量限制**：数组字段中的元素数量必须小于或等于定义时指定的最大容量，这个最大容量由 `max_capacity` 指定。

- **字符串值处理**：在数组字段中，字符串值会按原样存储，不进行语义转义或转换。例如，`'a"b'`、`"a'b"`、`'a'b'` 和 `"a"b"` 会按原样保存，而 `'a'b'` 和 `"a"b"` 会被视为无效值。

