---
title: "标量数值类型 | Cloud"
slug: /use-number-field
sidebar_label: "标量数值类型"
beta: FALSE
notebook: FALSE
description: "标量数值类型用于存储 Zilliz Cloud clusters 中的非向量数值型数据。这些类型通常用于描述与向量数据相关的附加信息，例如年龄、价格等。通过使用这些数据，可以更好地描述向量，同时提高数据过滤和条件查询的效率。 | Cloud"
type: origin
token: Axmuw0uKmiIwdhk3pH9cGKThn5d
sidebar_position: 7
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - 数值字段
  - number field
  - int8
  - int16
  - int32
  - int64
  - float16
  - float32

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 标量数值类型

标量数值类型用于存储 Zilliz Cloud clusters 中的非向量数值型数据。这些类型通常用于描述与向量数据相关的附加信息，例如年龄、价格等。通过使用这些数据，可以更好地描述向量，同时提高数据过滤和条件查询的效率。

标量数值类型在许多场景中非常有用。例如，在电商推荐中，可以用价格字段进行筛选；在用户画像分析中，可以用年龄段进行过滤。结合向量数据，标量数值类型数据能够帮助系统在提供相似性检索的同时，更精确地满足用户的个性化需求。

## 支持的标量数值类型{#supported-number-field-types}

Zilliz Cloud clusters 支持多种标量数值类型，以满足不同的数据存储和查询需求：

<table>
   <tr>
     <th><p>数据类型</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p>布尔类型，用于存储 <code>true</code> 或 <code>false</code>，适合描述二元状态，例如是否有效、是否有库存等。</p></td>
   </tr>
   <tr>
     <td><p><code>INT8</code></p></td>
     <td><p>8 位整数，适用于存储小范围的整数数据。</p></td>
   </tr>
   <tr>
     <td><p><code>INT16</code></p></td>
     <td><p>16 位整数，适用于存储中等范围的整数数据。</p></td>
   </tr>
   <tr>
     <td><p><code>INT32</code></p></td>
     <td><p>32 位整数，适合一般整型数据存储，如商品数量或用户 ID。</p></td>
   </tr>
   <tr>
     <td><p><code>INT64</code></p></td>
     <td><p>64 位整数，适合存储较大范围的数据，例如时间戳或标识符。</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT</code></p></td>
     <td><p>32 位浮点数，适用于一般精度的数值数据，如评分或温度。</p></td>
   </tr>
   <tr>
     <td><p><code>DOUBLE</code></p></td>
     <td><p>64 位双精度浮点数，适用于需要高精度的数据，如金融数据或科学计算。</p></td>
   </tr>
</table>

## 添加标量数值字段{#add-number-field}

要在 Zilliz Cloud clusters 中使用标量数值字段，需要在定义 Collection Schema 时定义相关字段，并将 `datatype` 设置为支持的数值类型，如 `BOOL`、`INT8`。有关支持的标量数值类型列表，请参考[数据类型](./use-number-field)。

以下示例展示了如何定义包含标量字段 `age` 和 `price` 的 Schema：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

schema = client.create_schema(
    auto_id=False,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="age", datatype=DataType.INT64)
schema.add_field(field_name="price", datatype=DataType.FLOAT)
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
        .fieldName("age")
        .dataType(DataType.Int64)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("price")
        .dataType(DataType.Float)
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
    name: "age",
    data_type: DataType.Int64,
  },
  {
    name: "price",
    data_type: DataType.Float,
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
export int64Field='{
    "fieldName": "age",
    "dataType": "Int64"
}'

export floatField='{
    "fieldName": "price",
    "dataType": "Float"
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
        $int64Field,
        $floatField,
        $pkField,
        $vectorField
    ]
}"
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>主键字段和向量字段在创建 Collection 时是必须添加的，主键字段用于唯一标识每条数据，而向量字段是进行相似性搜索的核心。有关具体信息，请参考<a href="./primary-field-auto-id">主键与 AutoId</a>、<a href="./use-sparse-vector">稀疏向量</a>、<a href="./use-dense-vector">稠密向量</a>或 <a href="./use-binary-vector">Binary 向量</a>。</p>

</Admonition>

## 设置索引参数{#set-index-params}

为标量数值字段设置索引参数是一个可选操作，可以显著提高查询效率。

以下示例中，我们为 `age` 标量数值字段创建了 `AUTOINDEX` 索引类型，表示 Milvus 会自动根据数据类型创建合适的索引。有关更多信息，请参考 [AUTOINDEX](./autoindex-explained)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="age",
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
        .fieldName("age")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());

```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = {
    index_name: 'inverted_index',
    field_name: 'age',
    index_type: IndexType.AUTOINDEX,
);
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "age",
            "indexName": "inverted_index",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

在本例中，我们使用 `AUTOINDEX` 为标量数值字段创建索引。

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
import { IndexType } from "@zilliz/milvus2-sdk-node";
const indexParams = [
  {
    field_name: "age",
    index_name: "inverted_index",
    index_type: IndexType.AUTOINDEX,
  },
  {
    field_name: "embedding",
    metric_type: "COSINE",
    index_type: IndexType.AUTOINDEX,
  },
];

```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "age",
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

定义好 Collection 的 Schema 和索引后，我们便可以创建包含标量字段的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_scalar_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_scalar_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.create_collection({
    collection_name: "my_scalar_collection",
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
    \"collectionName\": \"my_scalar_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 插入数据{#insert-data}

Collection 创建完成后，可以插入包含标量字段的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data = [
    {"age": 25, "price": 99.99, "pk": 1, "embedding": [0.1, 0.2, 0.3]},
    {"age": 30, "price": 149.50, "pk": 2, "embedding": [0.4, 0.5, 0.6]},
    {"age": 35, "price": 199.99, "pk": 3, "embedding": [0.7, 0.8, 0.9]},
]

client.insert(
    collection_name="my_scalar_collection",
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
rows.add(gson.fromJson("{\"age\": 25, \"price\": 99.99, \"pk\": 1, \"embedding\": [0.1, 0.2, 0.3]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": 30, \"price\": 149.50, \"pk\": 2, \"embedding\": [0.4, 0.5, 0.6]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": 35, \"price\": 199.99, \"pk\": 3, \"embedding\": [0.7, 0.8, 0.9]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_scalar_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
  { age: 25, price: 99.99, pk: 1, embedding: [0.1, 0.2, 0.3] },
  { age: 30, price: 149.5, pk: 2, embedding: [0.4, 0.5, 0.6] },
  { age: 35, price: 199.99, pk: 3, embedding: [0.7, 0.8, 0.9] },
  // 更多数据...
];

client.insert({
  collection_name: "my_scalar_collection",
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
        {"age": 25, "price": 99.99, "pk": 1, "embedding": [0.1, 0.2, 0.3]},
        {"age": 30, "price": 149.50, "pk": 2, "embedding": [0.4, 0.5, 0.6]},
        {"age": 35, "price": 199.99, "pk": 3, "embedding": [0.7, 0.8, 0.9]}       
    ],
    "collectionName": "my_scalar_collection"
}'
```

</TabItem>
</Tabs>

在这个例子中，我们插入了一些包含年龄（`age`）、价格（`price`）、主键（`pk`）以及向量表示（`embedding`）的数据。为了确保插入的数据与 Schema 中定义的字段匹配，建议提前检查数据类型，避免插入错误。

如果您在定义 Schema 时设置了 `enable_dynamic_fields=True`，Zilliz Cloud clusters 允许您插入未提前定义的标量字段，但应注意这可能增加查询和管理的复杂性，影响性能。有关更多信息，请参考 [Dynamic Field](./enable-dynamic-field)。

## 使用标量字段进行搜索和查询{#search-and-query}

添加标量字段后，您可以在搜索（Search）和查询（Query）中利用这些字段进行过滤，从而实现更精确的搜索结果。

### 过滤查询{#filter-queries}

添加标量字段后，您可以在 Query 中利用这些字段进行过滤。例如，您可以查询 `age` 在 30 到 40 之间的所有数据：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = "30 <= age <= 40"

res = client.query(
    collection_name="my_scalar_collection",
    filter=filter,
    output_fields=["age","price"]
)

print(res)

# Output
# data: ["{'age': 30, 'price': np.float32(149.5), 'pk': 2}", "{'age': 35, 'price': np.float32(199.99), 'pk': 3}"] 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "30 <= age <= 40";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_scalar_collection")
        .filter(filter)
        .outputFields(Arrays.asList("age", "price"))
        .build());
System.out.println(resp.getQueryResults());

// Output
//
// [QueryResp.QueryResult(entity={price=149.5, pk=2, age=30}), QueryResp.QueryResult(entity={price=199.99, pk=3, age=35})]
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.query({
    collection_name: 'my_scalar_collection',
    filter: '30 <= age <= 40',
    output_fields: ['age', 'price']
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
    "collectionName": "my_scalar_collection",
    "filter": "30 <= age <= 40",
    "outputFields": ["age","price"]
}'

## {"code":0,"cost":0,"data":[{"age":30,"pk":2,"price":149.5},{"age":35,"pk":3,"price":199.99}]}
```

</TabItem>
</Tabs>

此查询表达式将返回所有符合条件的数据，并输出其 `age` 和 `price` 字段。有关过滤查询的更多信息，请参考 [Query](./get-and-scalar-query) 和 [基本操作符](./basic-filtering-operators)。

### 向量搜索与标量过滤结合{#vector-search-with-number-filtering}

除了基本的标量字段过滤，您还可以将向量相似度搜索与标量字段过滤结合使用。例如，以下代码展示了如何在向量搜索中添加标量字段的过滤条件：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = "25 <= age <= 35"

res = client.search(
    collection_name="my_scalar_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["age","price"],
    filter=filter
)

print(res)

# Output
# data: ["[{'id': 1, 'distance': -0.06000000238418579, 'entity': {'age': 25, 'price': 99.98999786376953}}, {'id': 2, 'distance': -0.12000000476837158, 'entity': {'age': 30, 'price': 149.5}}, {'id': 3, 'distance': -0.18000000715255737, 'entity': {'age': 35, 'price': 199.99000549316406}}]"]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

String filter = "25 <= age <= 35";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_scalar_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Arrays.asList("age", "price"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={price=199.99, age=35}, score=-0.19054288, id=3), SearchResp.SearchResult(entity={price=149.5, age=30}, score=-0.20163085, id=2), SearchResp.SearchResult(entity={price=99.99, age=25}, score=-0.2364331, id=1)]]

```

</TabItem>

<TabItem value='javascript'>

```javascript
client.search({
    collection_name: 'my_scalar_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['age', 'price'],
    filter: '25 <= age <= 35'
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
    "collectionName": "my_scalar_collection",
    "data": [
        [0.3, -0.6, 0.1]
    ],
    "annsField": "embedding",
    "limit": 5,
    "outputFields": ["age", "price"]
}'

## {"code":0,"cost":0,"data":[{"age":35,"distance":-0.19054288,"id":3,"price":199.99},{"age":30,"distance":-0.20163085,"id":2,"price":149.5},{"age":25,"distance":-0.2364331,"id":1,"price":99.99}]}
```

</TabItem>
</Tabs>

在这个例子中，我们首先定义了查询向量，并在搜索时添加了过滤条件 `25 <= age <= 35`，这样可以确保搜索结果不仅与查询向量相似，还符合年龄范围的限制。有关更多信息，请参考 [Filtered Search](./filtered-search) 和 [基本操作符](./basic-filtering-operators)。

