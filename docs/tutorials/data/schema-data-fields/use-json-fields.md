---
title: "JSON 类型 | Cloud"
slug: /use-json-fields
sidebar_label: "JSON 类型"
beta: FALSE
notebook: FALSE
description: "JSON（JavaScript 对象表示法）是一种轻量级的数据交换格式，提供了一种灵活的方式来存储和查询复杂的数据结构。在 Zilliz Cloud clusters 中，您可以将附加的结构化信息以 JSON 字段的形式与向量数据一起存储，从而可以通过结合向量相似性和结构化过滤来执行更高级的搜索和查询。 | Cloud"
type: origin
token: FI8pwZYA7iIbNWkYp4xcEu5Xnab
sidebar_position: 8
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - JSON 字段
  - JSON field

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JSON 类型

[JSON](https://en.wikipedia.org/wiki/JSON)（JavaScript 对象表示法）是一种轻量级的数据交换格式，提供了一种灵活的方式来存储和查询复杂的数据结构。在 Zilliz Cloud clusters 中，您可以将附加的结构化信息以 JSON 字段的形式与向量数据一起存储，从而可以通过结合向量相似性和结构化过滤来执行更高级的搜索和查询。

JSON 字段适用于需要附加元数据来优化检索结果的应用。例如，在电子商务中，产品向量可以通过类别、价格和品牌等属性来增强；在推荐系统中，用户向量可以与偏好和人口统计信息相结合。以下是一个典型的 JSON 字段示例：

```json
{
  "category": "electronics",
  "price": 99.99,
  "brand": "BrandA"
}
```

## 添加 JSON 字段

要在 Zilliz Cloud clusters 中使用 JSON 字段，需要在定义 Collection Schema 时定义相关字段类型，将 `datatype` 设置为支持的 JSON 数据类型，即 `JSON`。

以下是如何定义包含 JSON 字段的 Collection Schema：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

schema = client.create_schema(
    auto_id=False,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="metadata", datatype=DataType.JSON)
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
        .fieldName("metadata")
        .dataType(DataType.JSON)
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
    name: "metadata",
    data_type: DataType.JSON,
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
export jsonField='{
    "fieldName": "metadata",
    "dataType": "JSON"
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
        $jsonField,
        $pkField,
        $vectorField
    ]
}"
```

</TabItem>
</Tabs>

以上示例中，我们添加了 JSON 字段 `metadata`，用于存储与向量数据相关的附加元数据，如产品类别、价格和品牌信息。

## 创建 Collection

创建 Collection 时，必须为向量字段创建索引，以确保检索性能。在本例中，我们使用 `AUTOINDEX` 来简化索引设置。有关更多信息，请参考 [AUTOINDEX](./autoindex-explained)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python

index_params = client.prepare_index_params()

index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="COSINE"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = {
    index_name: 'embedding_index',
    field_name: 'embedding',
    metricType: MetricType.CONSINE,
    index_type: IndexType.AUTOINDEX,
);
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "embedding",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

使用定义好的 Schema 和索引参数来创建 Collection：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_json_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_json_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.create_collection({
    collection_name: "my_json_collection",
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
    \"collectionName\": \"my_json_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 插入数据

Collection 创建完成后，可以插入包含 JSON 字段的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python

data = [
  {
      "metadata": {"category": "electronics", "price": 99.99, "brand": "BrandA"},
      "pk": 1,
      "embedding": [0.12, 0.34, 0.56]
  },
  {
      "metadata": {"category": "home_appliances", "price": 249.99, "brand": "BrandB"},
      "pk": 2,
      "embedding": [0.56, 0.78, 0.90]
  },
  {
      "metadata": {"category": "furniture", "price": 399.99, "brand": "BrandC"},
      "pk": 3,
      "embedding": [0.91, 0.18, 0.23]
  }
]

client.insert(
    collection_name="my_json_collection",
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
rows.add(gson.fromJson("{\"metadata\": {\"category\": \"electronics\", \"price\": 99.99, \"brand\": \"BrandA\"}, \"pk\": 1, \"embedding\": [0.1, 0.2, 0.3]}", JsonObject.class));
rows.add(gson.fromJson("{\"metadata\": {\"category\": \"home_appliances\", \"price\": 249.99, \"brand\": \"BrandB\"}, \"pk\": 2, \"embedding\": [0.4, 0.5, 0.6]}", JsonObject.class));
rows.add(gson.fromJson("{\"metadata\": {\"category\": \"furniture\", \"price\": 399.99, \"brand\": \"BrandC\"}, \"pk\": 3, \"embedding\": [0.7, 0.8, 0.9]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_json_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
  {
      "metadata": {"category": "electronics", "price": 99.99, "brand": "BrandA"},
      "pk": 1,
      "embedding": [0.12, 0.34, 0.56]
  },
  {
      "metadata": {"category": "home_appliances", "price": 249.99, "brand": "BrandB"},
      "pk": 2,
      "embedding": [0.56, 0.78, 0.90]
  },
  {
      "metadata": {"category": "furniture", "price": 399.99, "brand": "BrandC"},
      "pk": 3,
      "embedding": [0.91, 0.18, 0.23]
  }
]

client.insert({
    collection_name: "my_json_collection",
    data: data
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
            "metadata": {"category": "electronics", "price": 99.99, "brand": "BrandA"},
            "pk": 1,
            "embedding": [0.12, 0.34, 0.56]
        },
        {
            "metadata": {"category": "home_appliances", "price": 249.99, "brand": "BrandB"},
            "pk": 2,
            "embedding": [0.56, 0.78, 0.90]
        },
        {
            "metadata": {"category": "furniture", "price": 399.99, "brand": "BrandC"},
            "pk": 3,
            "embedding": [0.91, 0.18, 0.23]
        }       
    ],
    "collectionName": "my_json_collection"
}'
```

</TabItem>
</Tabs>

在以上示例中：

- 每条数据包含一个主键 (`pk`)、`metadata` 为 JSON 字段，用于存储产品的类别、价格和品牌等信息。

- `embedding` 是一个 3 维向量字段，用于向量相似性搜索。

## 使用 JSON 字段进行过滤搜索和查询

JSON 字段允许在搜索过程中进行标量过滤，从而增强 Zilliz Cloud clusters 的向量搜索功能。您可以在向量相似性搜索的基础上，根据 JSON 属性执行查询。

### 过滤查询

您可以基于 JSON 属性过滤数据，例如匹配特定值或检查某个数字是否在特定范围内。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'metadata["category"] == "electronics" and metadata["price"] < 150'

res = client.query(
    collection_name="my_json_collection",
    filter=filter,
    output_fields=["metadata"]
)

print(res)

# Output
# data: ["{'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}, 'pk': 1}"] 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "metadata[\"category\"] == \"electronics\" and metadata[\"price\"] < 150";
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_json_collection")
        .filter(filter)
        .outputFields(Collections.singletonList("metadata"))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={metadata={"category":"electronics","price":99.99,"brand":"BrandA"}, pk=1})]
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.query({
    collection_name: 'my_scalar_collection',
    filter: 'metadata["category"] == "electronics" and metadata["price"] < 150',
    output_fields: ['metadata']
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
    "collectionName": "my_json_collection",
    "filter": "metadata[\"category\"] == \"electronics\" and metadata[\"price\"] < 150",
    "outputFields": ["metadata"]
}'
{"code":0,"cost":0,"data":[{"metadata":"{\"category\": \"electronics\", \"price\": 99.99, \"brand\": \"BrandA\"}","pk":1}]}
```

</TabItem>
</Tabs>

在以上查询中，Zilliz Cloud clusters 会筛选出 `metadata` 字段中类别为 `"electronics"` 且价格低于 150 的记录，满足条件的记录将包含在查询结果中。

### 向量搜索与 JSON 过滤结合

结合向量相似性与 JSON 过滤，可以在找到语义上相似的数据的同时，确保这些数据满足业务的特定条件，从而使搜索结果更加精准和符合用户需求。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'metadata["brand"] == "BrandA"'

res = client.search(
    collection_name="my_json_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["metadata"],
    filter=filter
)

print(res)

# Output
# data: ["[{'id': 1, 'distance': -0.2479381263256073, 'entity': {'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}}}]"] 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

String filter = "metadata[\"brand\"] == \"BrandA\"";
SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_json_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Collections.singletonList("metadata"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={metadata={"category":"electronics","price":99.99,"brand":"BrandA"}}, score=-0.2364331, id=1)]]
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.search({
    collection_name: 'my_json_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['metadata'],
    filter: 'metadata["category"] == "electronics" and metadata["price"] < 150',
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
    "collectionName": "my_json_collection",
    "data": [
        [0.3, -0.6, 0.1]
    ],
    "annsField": "embedding",
    "limit": 5,
    "searchParams":{
        "params":{"nprobe":10}
    },
    "outputFields": ["metadata"],
    "filter": "metadata[\"brand\"] == \"BrandA\""
}'

## {"code":0,"cost":0,"data":[{"distance":-0.24793813,"id":1,"metadata":"{\"category\": \"electronics\", \"price\": 99.99, \"brand\": \"BrandA\"}"}]}
```

</TabItem>
</Tabs>

在以上示例中，Zilliz Cloud clusters 将返回与查询向量最相似的前 5 个记录，且这些记录的 `metadata` 字段中 `brand` 为 `"BrandA"`。

此外，Zilliz Cloud clusters 支持一些高级的 JSON 过滤操作符，如 `JSON_CONTAINS`、`JSON_CONTAINS_ALL` 和 `JSON_CONTAINS_ANY` 等，可以进一步提升查询能力。有关更多信息，请参考[JSON 操作符](./json-filtering-operators)。

## 使用限制

- **索引限制**：考虑到数据结构的复杂性，不支持为 JSON 字段创建索引。

- **数据类型匹配**：如果 JSON 字段中的键值是整数或浮点数，只能与另一个整数或浮点数键或 `INT32/64` 或 `FLOAT32/64` 字段进行比较。如果键值是字符串（`VARCHAR`），只能与另一个字符串键字段进行比较。

- **命名限制**：在命名 JSON 键时，建议只使用字母、数字字符和下划线，因为其他字符可能会在过滤或搜索时造成问题。

- **字符串值处理**：对于字符串值（`VARCHAR`），Zilliz Cloud clusters 会按原样存储 JSON 字段中的字符串值，不进行语义转换。例如：`'a"b'`、`"a'b"`、`'a\'b'` 和 `"a\"b"` 将按原样保存；而 `'a'b'` 和 `"a"b"` 将被视为无效值。

- **嵌套字典处理**：JSON 字段值中的任何嵌套字典都将被视为字符串。

