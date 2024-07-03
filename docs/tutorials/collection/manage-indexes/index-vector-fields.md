---
slug: /index-vector-fields
beta: FALSE
notebook: FALSE
type: origin
token: F33Ewd7beirE3nk6SIucXmXFnye
sidebar_position: 1

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 创建 Vector Index

本教程将介绍如何为 Collection 中的向量字段创建向量索引（Vector Index）并管理索引。

## 概述{#overview}

通过索引文件中存储的元数据， 能够以一种特殊的结构组织您的数据，从而加速数据搜索和查询的过程。

我们建议您为向量字段和常用于过滤的标量字段创建索引。

如果您的 collection 包含了多个向量字段，您可以为各向量字段分别创建索引。有关更多信息，请参阅[使用多向量字段](./manage-collections-sdks#with-multiple-vector-fields)。

## 准备工作{#preparations}

[管理 Collection (SDK)](./manage-collections-sdks)中已经说明了 会在以下几种情况下，随 Collection 自动创建索引并加载到内存中：

- 在创建 Collection 命令中设置了向量字段维度和相似度类型

- 在创建 Collection 命令中设置了 Schema 和索引参数

以下示例代码基于现有代码重新连接至  并创建 Collection。Collection 创建过程中并未设置索引参数，因此该 Collection 中未创建索引且未自动加载。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create schema
# 2.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 2.2. Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# 3. Create collection
client.create_collection(
    collection_name="customized_setup", 
    schema=schema, 
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection

// 2.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// 2.2 Add fields to schema
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(true).autoID(false).build());
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(5).build());

// 3 Create a collection without schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
.collectionName("customized_setup")
.collectionSchema(schema)
.build();

client.createCollection(customizedSetupReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 1. Set up a Milvus Client
client = new MilvusClient({address, token});

// 2. Define fields for the collection
const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
]

// 3. Create a collection
res = await client.createCollection({
    collection_name: "customized_setup",
    fields: fields,
})

console.log(res.error_code)  

// Output
// 
// Success
// 
```

</TabItem>
</Tabs>

## 创建索引{#index-a-collection}

如需为 Collection 创建索引，请调用 `create_index()` 命令并设置索引参数。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Set up index
# 4.1. Set up the index parameters
index_params = MilvusClient.prepare_index_params()

# 4.2. Add an index on the vector field.
index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type="AUTOINDEX",
    index_name="vector_index"
)

# 4.4. Create an index file
client.create_index(
    collection_name="customized_setup",
    index_params=index_params
)

# 5. Describe index
res = client.list_indexes(
    collection_name="customized_setup"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

// 4 Prepare index parameters

// 4.2 Add an index for the vector field "vector"
IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("vector")
    .indexName("vector_index")
    .indexType(IndexParam.IndexType.AUTOINDEX)
    .metricType(IndexParam.MetricType.COSINE)
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForVectorField);

// 4.3 Crate an index file
CreateIndexReq createIndexReq = CreateIndexReq.builder()
    .collectionName("customized_setup")
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Set up index for the collection
// 4.1. Set up the index parameters
res = await client.createIndex({
    collection_name: "customized_setup",
    field_name: "vector",
    index_type: "AUTOINDEX",
    metric_type: "COSINE",   
    index_name: "vector_index"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>目前，每个字段上仅可创建 1 个索引文件。</p>

</Admonition>

## 查看索引详情{#check-index-details}

索引创建成功后，您可以查看索引详情。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 5. Describe index
res = client.list_indexes(
    collection_name="customized_setup"
)

print(res)

# Output
#
# [
#     "vector_index"
# ]

res = client.describe_index(
    collection_name="customized_setup",
    index_name="vector_index"
)

print(res)

# Output
#
# {
#     "index_type": "AUTOINDEX",
#     "metric_type": "COSINE",
#     "field_name": "vector",
#     "index_name": "vector_index"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;

// 5. Describe index
// 5.1 List the index names
ListIndexesReq listIndexesReq = ListIndexesReq.builder()
    .collectionName("customized_setup")
    .build();

List<String> indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

// Output:
// [
//     "vector_index"
// ]

// 5.2 Describe an index
DescribeIndexReq describeIndexReq = DescribeIndexReq.builder()
    .collectionName("customized_setup")
    .indexName("vector_index")
    .build();

DescribeIndexResp describeIndexResp = client.describeIndex(describeIndexReq);

System.out.println(JSONObject.toJSON(describeIndexResp));

// Output:
// {
//     "metricType": "COSINE",
//     "indexType": "AUTOINDEX",
//     "fieldName": "vector",
//     "indexName": "vector_index"
// }
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. Describe the index
res = await client.describeIndex({
    collection_name: "customized_setup",
    index_name: "vector_index"
})

console.log(JSON.stringify(res.index_descriptions, null, 2))

// Output
// 
// [
//   {
//     "params": [
//       {
//         "key": "index_type",
//         "value": "AUTOINDEX"
//       },
//       {
//         "key": "metric_type",
//         "value": "COSINE"
//       }
//     ],
//     "index_name": "vector_index",
//     "indexID": "449007919953063141",
//     "field_name": "vector",
//     "indexed_rows": "0",
//     "total_rows": "0",
//     "state": "Finished",
//     "index_state_fail_reason": "",
//     "pending_index_rows": "0"
//   }
// ]
// 
```

</TabItem>
</Tabs>

您可以通过查看某一特定字段上的索引文件了解已创建索引的数据行数。

## 删除索引{#drop-an-index}

您可以删除不再使用的 Vector index 索引。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 6. Drop index
client.drop_index(
    collection_name="customized_setup",
    index_name="vector_index"
)
```

</TabItem>

<TabItem value='java'>

```java
// 6. Drop index

DropIndexReq dropIndexReq = DropIndexReq.builder()
    .collectionName("customized_setup")
    .indexName("vector_index")
    .build();

client.dropIndex(dropIndexReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 6. Drop the index
res = await client.dropIndex({
    collection_name: "customized_setup",
    index_name: "vector_index"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

</TabItem>
</Tabs>

