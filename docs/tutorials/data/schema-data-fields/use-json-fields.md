---
title: "JSON 类型 | Cloud"
slug: /use-json-fields
sidebar_label: "JSON 类型"
beta: FALSE
notebook: FALSE
description: "JSON 字段是一个标量字段，它以键值对的形式存储附加信息以及向量嵌入。以下是如何以 JSON 格式存储数据的示例： | Cloud"
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

[JSON](https://en.wikipedia.org/wiki/JSON) 字段是一个标量字段，它以键值对的形式存储附加信息以及向量嵌入。以下是如何以 JSON 格式存储数据的示例：

```json
{
  "metadata": {
    "product_info": {
      "category": "electronics",
      "brand": "BrandA"
    },
    "price": 99.99,
    "in_stock": true,
    "tags": ["summer_sale", "clearance"]
  }
}
```

## 使用限制{#limits}

- **字段长度**： JSON 字段的最大长度为 65,536 个字节。

- **嵌入字典处理**：JSON 字段内嵌入的字典会被当做纯文本进行存储。

- **默认值和 Null 值**：JSON 字段不支持设置默认值。但是，您可以将其 `nullable` 属性设置为 `True` 以允许 JSON 字段为空。具体情况可以参考 [Nullable 和默认值](./nullable-and-default)。

- **数据类型匹配**：如果 JSON 字段中某个键的值为整数或浮点数，在使用该键值进行标量过滤时，只支持和另一个值为整数或浮点的键进行比较。

- **命名限制**：在命名 JSON 键时，建议只使用字母、数字字符和下划线，因为其他字符可能会在过滤或搜索时造成问题。

- **字符串值处理**：对于字符串值（`VARCHAR`），Zilliz Cloud clusters 会按原样存储 JSON 字段中的字符串值，不进行语义转换。例如：`'a"b'`、`"a'b"`、`'a\'b'` 和 `"a\"b"` 将按原样保存；而 `'a'b'` 和 `"a"b"` 将被视为无效值。

- **为 JSON 创建索引**：在为 JSON 字段创建索引时，您可以指定该字段中的一条或若干条 JSON 路径来加速标量过滤。每增加一条 JSON 路径都会增加索引开销，请仔细规划您的索引策略。关于在为 JSON 字段创建索引时的注意事项，可以参考为 JSON 字段创建索引的[注意事项](./use-json-fields#considerations-on-json-indexing)。

## 添加 JSON 字段{#add-json-field}

要将文章开头的示例数据中的 `metadata` 作为一个字段添加到 Collection 中，请将其数据类型设置为 DataType. JSON。下面的示例定义了一个名为 `metadata` 且允许空值的 JSON 字段：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Import necessary libraries
from pymilvus import MilvusClient, DataType

# Define server address
SERVER_ADDR = "YOUR_CLUSTER_ENDPOINT"

# Create a MilvusClient instance
client = MilvusClient(uri=SERVER_ADDR)

# Define the collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_fields=True,
)

# Add a JSON field that supports null values
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)
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
        .isNullable(true)
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

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeInt64).
    WithIsAutoID(true),
).WithField(entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(3),
).WithField(entity.NewField().
    WithName("metadata").
    WithDataType(entity.FieldTypeJSON),
)
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
    \"enableDynamicField\": true,
    \"fields\": [
        $jsonField,
        $pkField,
        $vectorField
    ]
}"
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>如果您插入的数据中可能包含未在 Schema 中定义的字段，请将 Collection 的 <code>enable_dynamic_field</code> 属性设置为 <code>True</code>。</p></li>
<li><p>如果您插入的数据中 <code>metadata</code> 字段可能为空，请将该字段的 <code>nullable</code> 属性设置为 <code>True</code>。</p></li>
</ul>

</Admonition>

## 设置索引参数{#set-index-params}

索引可以帮助 Zilliz Cloud 在大规模数据中进行快速过滤或检索。在 Zilliz Cloud 中，

- 您必须为向量字段创建索引，从而让相似性搜索满足您的效率要求。

- 您也可以选择为 JSON 字段创建索引来加速在某条 JSON 路径上的标量过滤。

### 为 JSON 字段创建索引{#index-a-json-field}

默认情况下，JSON 字段没有索引。因此，在 JSON 字段上进行过滤时，需要进行全字段扫描。如果您希望提升 JSON 字段中的某条路径上的查询效率，可以考虑为 JSON 字段创建索引。

在如下示例中，我们为 JSON 字段 `metadata` 中的两条路径创建了索引。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

# Example 1: Index the 'category' key inside 'product_info' as a string
index_params.add_index(
    field_name="metadata", # JSON field name to index
    index_type="INVERTED", # Index type. Set to INVERTED
    index_name="json_index_1", # Index name
    params={
        "json_path": "metadata[\"product_info\"][\"category\"]", # Path in JSON field to index
        "json_cast_type": "varchar" # Data type that the extracted JSON values will be cast to
    }
)

# Example 2: Index 'price' as a numeric type (double)
index_params.add_index(
    field_name="metadata",
    index_type="INVERTED",
    index_name="json_index_2",
    params={
        "json_path": "metadata[\"price\"]",
        "json_cast_type": "double"
    }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

List<IndexParam> indexes = new ArrayList<>();

Map<String,Object> extraParams_1 = new HashMap<>();
extraParams_1.put("json_path", "metadata[\"product_info\"][\"category\"]");
extraParams_1.put("json_cast_type", "varchar");
indexes.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("json_index_1")
        .indexType(IndexParam.IndexType.INVERTED)
        .extraParams(extraParams_1)
        .build());

Map<String,Object> extraParams_2 = new HashMap<>();
extraParams_2.put("json_path", "metadata[\"price\"]");
extraParams_2.put("json_cast_type", "double");
indexes.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("json_index_2")
        .indexType(IndexParam.IndexType.INVERTED)
        .extraParams(extraParams_2)
        .build());
```

</TabItem>

<TabItem value='go'>

```go
jsonIndex1 := index.NewJSONPathIndex(index.Inverted, "varchar", `metadata["product_info"]["category"]`)
jsonIndex2 := index.NewJSONPathIndex(index.Inverted, "double", `metadata["price"]`)
indexOpt1 := milvusclient.NewCreateIndexOption("my_collection", "metadata", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("my_collection", "metadata", jsonIndex2)
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = [
    {
        field_name: "metadata",
        index_type: "INVERTED",
        index_name: "json_index_1",
        params: {
            json_path: "metadata[\"product_info\"][\"category\"]",
            json_cast_type: "varchar"
        }
    },
    {
        field_name: "metadata",
        index_type: "INVERTED",
        index_name: "json_index_2",
        params: {
            json_path: "metadata[\"price\"]",
            json_cast_type: "double"
        }
    }
]

```

</TabItem>

<TabItem value='bash'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "indexParams": [
        {
            "fieldName": "metadata",
            "indexName": "json_index_1",
            "indexType": "INVERTED",
            "params": {
                "json_path": "metadata[\"product_info\"][\"category\"]",
                "json_cast_type": "varchar"
            }
        }
    ]
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "indexParams": [
        {
            "fieldName": "metadata",
            "indexName": "json_index_2",
            "indexType": "INVERTED",
            "params": {
                "json_path": "metadata[\"price\"]",
                "json_cast_type": "double"
            }
        }
    ]
}'
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>参数名称</p></th>
     <th><p>参数说明</p></th>
     <th><p>示例值</p></th>
   </tr>
   <tr>
     <td><p><code>field_name</code></p></td>
     <td><p>Schema 中字义的 JSON 字段的名称。</p></td>
     <td><p><code>"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code>index_type</code></p></td>
     <td><p>待创建的索引类型。当前，仅支持使用 <code>INVERTED</code> 类型的索引。</p></td>
     <td><p><code>"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code>index_name</code></p></td>
     <td><p>（可选）索引名称。如果您需要在同一个 JSON 字段上创建多个索引，可以使用不同的名称为这些索引命名。</p></td>
     <td><p><code>"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.json_path</code></p></td>
     <td><p>需要创建索引的 JSON 路径。您可以使用嵌入字段中的键名或嵌入列表中的位置索引值来标识一条 JSON 路径，如 <code>metadata["product_info"]["category"]</code> 或 <code>metadata["tags"][0]</code>。</p><p>如果某个 Entity 的 <code>metadata</code> 字段中不存在指定的路径，在创建索引时，该 Entity 会被忽略，不会抛出报错。</p></td>
     <td><p><code>"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.json_cast_type</code></p></td>
     <td><p>Zilliz Cloud 将抽取出来的值强制转换成的目标数据类型。合法取值如下：</p><ul><li><p><code>"bool"</code> 或 <code>"BOOL"</code></p></li><li><p><code>"double"</code> 或 <code>"DOUBLE"</code></p></li><li><p><code>"varchar"</code> 或 <code>"VARCHAR"</code></p><p>说明：对于整数类型的键值而言，Zilliz Cloud 会使用双精度整数创建索引。如果某个 Entity 因为其 JSON 字段中指定路径上的数值类型不匹配导致的强制转换失败，该 Entity 会被忽略，不会抛出报错。</p></li></ul></td>
     <td><p><code>"varchar"</code></p></td>
   </tr>
</table>

#### 注意事项{#considerations-on-json-indexing}

- **过滤逻辑**

    如果您将 `json_cast_type` 设置为 `double`，表明您希望将某条 JSON 路径的值强制转换为双精度整数。在使用过滤表达式时，您可以使用支持数值类型的操作符和表达式。如果您在过滤表达式中比较一个双精度整数和一个非数值类型的值，Zilliz Cloud 会使用暴力搜索完成过滤操作。

    如果您将 `json_cast_type` 设置为 `varchar`，表明您希望将某条 JSON 路径的值强制转换为字符串。在使用过滤表达式时，您可以使用支持字段串类型的操作符和表达式。在其它情况下，Zilliz Cloud 会使用暴力搜索完成过滤操作。

- **术语表达式**

    您可以使用 `json["field"] in [value1, value2, …]` 作为过滤表达式，只要 `json["field"]` 的数据类型和 `value1` 相同。如果`json["field"]` 的数据类型为列表，Zilliz Cloud 会使用暴力搜索完成过滤操作。

- **数值精度**

    在创建索引时，Zilliz Cloud 会将所有的数值强制转换成双精度数值。如果某个数值超过了 $2^{53}$，精度信息会丢失，导致该值可能因为不完全匹配而未出现在搜索结果中。

- **数据完整性**

    Zilliz Cloud 不会对未指定的数据类型进行解析或转换操作。如果在原始数据中，某个 Entity 中的 JSON 字段某条路径的值为字段串，而在其它 Entity 中该 JSON 路径的值为数值。在创建索引时，如果您将 `json_cast_type` 设置为 `varchar`，则指定路径为数值的所有 Entity 都会在创建索引时被忽略。

### 为向量字段创建索引{#index-a-vector-field}

如下示例在名为 `embedding` 的向量字段上使用 `AUTOINDEX` 创建了索引。Zilliz Cloud 会根据该字段具体的向量类型在创建索引时选择最合适的索引类型。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Set index params

index_params = client.prepare_index_params()

# Index `embedding` with AUTOINDEX and specify similarity metric type
index_params.add_index(
    field_name="embedding",
    index_name="vector_index",
    index_type="AUTOINDEX",  # Use automatic indexing to simplify complex index settings
    metric_type="COSINE"  # Specify similarity metric type, options include L2, COSINE, or IP
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
        .indexName("vector_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

</TabItem>

<TabItem value='go'>

```go
vectorIndex := index.NewAutoIndex(entity.COSINE)
indexOpt := milvusclient.NewCreateIndexOption("my_collection", "embedding", vectorIndex)
```

</TabItem>

<TabItem value='javascript'>

```javascript
indexParams.push({
    index_name: 'embedding_index',
    field_name: 'embedding',
    index_name: 'vector_index',
    metricType: MetricType.CONSINE,
    index_type: IndexType.AUTOINDEX,
));
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "embedding",
            "indexName": "vector_index",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

## 创建 Collection{#create-collection}

在定义了 Schema 和索引后，您就可以创建包含 JSON 字段的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='go'>

```go
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema).
    WithIndexOptions(indexOpt1, indexOpt2, indexOpt))
if err != nil {
    fmt.Println(err.Error())
    // handler err
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.create_collection({
    collection_name: "my_collection",
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
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 插入数据{#insert-data}

Collection 创建完成后，可以插入包含 JSON 字段的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Sample data
data = [
    {
        "metadata": {
            "product_info": {"category": "electronics", "brand": "BrandA"},
            "price": 99.99,
            "in_stock": True,
            "tags": ["summer_sale"]
        },
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "metadata": None,  # Entire JSON object is null
        "pk": 2,
        "embedding": [0.56, 0.78, 0.90]
    },
    {
        # JSON field is completely missing
        "pk": 3,
        "embedding": [0.91, 0.18, 0.23]
    },
    {
        # Some sub-keys are null
        "metadata": {
            "product_info": {"category": None, "brand": "BrandB"},
            "price": 59.99,
            "in_stock": None
        },
        "pk": 4,
        "embedding": [0.56, 0.38, 0.21]
    }
]

client.insert(
    collection_name="my_collection",
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
rows.add(gson.fromJson("{\"metadata\":{\"product_info\":{\"category\":\"electronics\",\"brand\":\"BrandA\"},\"price\":99.99,\"in_stock\":True,\"tags\":[\"summer_sale\"]},\"pk\":1,\"embedding\":[0.12,0.34,0.56]}", JsonObject.class));
rows.add(gson.fromJson("{\"metadata\":null,\"pk\":2,\"embedding\":[0.56,0.78,0.90]}", JsonObject.class));
rows.add(gson.fromJson("{\"pk\":3,\"embedding\":[0.91,0.18,0.23]}", JsonObject.class));
rows.add(gson.fromJson("{\"metadata\":{\"product_info\":{\"category\":null,\"brand\":\"BrandB\"},\"price\":59.99,\"in_stock\":null},\"pk\":4,\"embedding\":[0.56,0.38,0.21]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='go'>

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("pk", []int64{1, 2, 3, 4}).
    WithFloatVectorColumn("embedding", 3, [][]float32{
        {0.12, 0.34, 0.56},
        {0.56, 0.78, 0.90},
        {0.91, 0.18, 0.23},
        {0.56, 0.38, 0.21},
    }).WithColumns(
    column.NewColumnJSONBytes("metadata", [][]byte{
        []byte(`{
    "product_info": {"category": "electronics", "brand": "BrandA"},
    "price": 99.99,
    "in_stock": True,
    "tags": ["summer_sale"]
}`),
        []byte(`null`),
        []byte(`null`),
        []byte(`"metadata": {
    "product_info": {"category": None, "brand": "BrandB"},
    "price": 59.99,
    "in_stock": None
}`),
    }),
))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
    {
        "metadata": {
            "product_info": {"category": "electronics", "brand": "BrandA"},
            "price": 99.99,
            "in_stock": True,
            "tags": ["summer_sale"]
        },
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "metadata": None,  # Entire JSON object is null
        "pk": 2,
        "embedding": [0.56, 0.78, 0.90]
    },
    {
        # JSON field is completely missing
        "pk": 3,
        "embedding": [0.91, 0.18, 0.23]
    },
    {
        # Some sub-keys are null
        "metadata": {
            "product_info": {"category": None, "brand": "BrandB"},
            "price": 59.99,
            "in_stock": None
        },
        "pk": 4,
        "embedding": [0.56, 0.38, 0.21]
    }
];

await client.insert({
    collection_name: "my_collection",
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
--data '{
    "data": [
        {
             "metadata":  {
                   "product_info": {"category": "electronics", "brand": "BrandA"},
                  "price":  99.99,
                   "in_stock":  true,
                  "tags": ["summer_sale"]
              }, 
             "varchar_field2": "High quality product", 
             "pk": 1, 
             "embedding": [0.1, 0.2, 0.3]
          },
          {
              "metadata": null,
              "pk": 2,
              "embedding": [0.56, 0.78, 0.90]
          },
         {
               "pk": 3,
               "embedding": [0.91, 0.18, 0.23]
         },
        {
              "metadata": {
                     "product_info": {"category": null, "brand": "BrandB"},
                     "price": 59.99,
                     "in_stock": null
               },
              "pk": 4,
              "embedding": [0.56, 0.38, 0.21]
         }
    ],
    "collectionName": "my_collection"
}'
```

</TabItem>
</Tabs>

## 使用过滤表达式进行查询{#query-with-filter-expressions}

在插入数据后，您可以使用 `query` 方法获取匹配指定过滤表达式的 Entity。

<Admonition type="info" icon="📘" title="说明">

<p>JSON 字段支持为空。如果某个 Entity 中的 JSON 字段为空或设置为 <code>None</code>，则该字段会被当作 <code>null</code> 值处理。具体可参考 <a href="./basic-filtering-operators#json-fields-with-null-values">JSON 字段中的 Null 值</a>。</p>

</Admonition>

如下示例演示了如何获取 `metadata` 不为空的所有 Entity。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Query to filter out records with null metadata

filter = 'metadata is not null'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["metadata", "pk"]
)

# Expected result:
# Rows with pk=1 and pk=4 have valid, non-null metadata.
# Rows with pk=2 (metadata=None) and pk=3 (no metadata key) are excluded.

print(res)

# Output:
# data: [
#     "{'metadata': {'product_info': {'category': 'electronics', 'brand': 'BrandA'}, 'price': 99.99, 'in_stock': True, 'tags': ['summer_sale']}, 'pk': 1}",
#     "{'metadata': {'product_info': {'category': None, 'brand': 'BrandB'}, 'price': 59.99, 'in_stock': None}, 'pk': 4}"
# ]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "metadata is not null";
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("metadata", "pk"))
        .build());

System.out.println(resp.getQueryResults());

// Output
//
// [
//    QueryResp.QueryResult(entity={metadata={"product_info":{"category":"electronics","brand":"BrandA"},"price":99.99,"in_stock":true,"tags":["summer_sale"]}, pk=1}),
//    QueryResp.QueryResult(entity={metadata={"product_info":{"category":null,"brand":"BrandB"},"price":59.99,"in_stock":null}, pk=4})
// ]
```

</TabItem>

<TabItem value='go'>

```go
filter := "metadata is not null"
rs, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("metadata", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk").FieldData().GetScalars())
fmt.Println("metadata", rs.GetColumn("metadata").FieldData().GetScalars())
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.query({
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
    "collectionName": "my_collection",
    "filter": "metadata is not null",
    "outputFields": ["metadata", "pk"]
}'

#{"code":0,"cost":0,"data":[{"metadata":"{\"product_info\": {\"category\": \"electronics\", \"brand\": \"BrandA\"}, \"price\": 99.99, \"in_stock\": true, \"tags\": [\"summer_sale\"]}","pk":1},{"metadata":"","pk":2},{"metadata":"","pk":3},{"metadata":"{\"product_info\": {\"category\": null, \"brand\": \"BrandB\"}, \"price\": 59.99, \"in_stock\": null}","pk":4}]}
```

</TabItem>
</Tabs>

如下示例演示了如何获取 `metadata["product_info"]["category"]` 路径值为 `"electronics"` 的 Entity。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'metadata["product_info"]["category"] == "electronics"'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["metadata", "pk"]
)

# Expected result:
# - Only pk=1 has "category": "electronics".
# - pk=4 has "category": None, so it doesn't match.
# - pk=2 and pk=3 have no valid metadata.

print(res)

# Output:
# data: [
#     "{'pk': 1, 'metadata': {'product_info': {'category': 'electronics', 'brand': 'BrandA'}, 'price': 99.99, 'in_stock': True, 'tags': ['summer_sale']}}"
# ]
```

</TabItem>

<TabItem value='java'>

```java
String filter = "metadata[\"product_info\"][\"category\"] == \"electronics\"";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("metadata", "pk"))
        .build());

System.out.println(resp.getQueryResults());

// Output
// [QueryResp.QueryResult(entity={metadata={"product_info":{"category":"electronics","brand":"BrandA"},"price":99.99,"in_stock":true,"tags":["summer_sale"]}, pk=1})]
```

</TabItem>

<TabItem value='go'>

```go
filter = `metadata["product_info"]["category"] == "electronics"`
rs, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("metadata", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk").FieldData().GetScalars())
fmt.Println("metadata", rs.GetColumn("metadata").FieldData().GetScalars())
```

</TabItem>

<TabItem value='javascript'>

```javascript
const filter = 'metadata["category"] == "electronics"';
const res = await client.query({
    collection_name: "my_collection",
    filter: filter,
    output_fields: ["metadata", "pk"]
});

// Example output:
// {
//.  data: [
//      {'pk': 1, 'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}}
// ]
// }
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
  "collectionName": "my_collection",
  "filter": "metadata[\"product_info\"][\"category\"] == \"electronics\"",
  "outputFields": ["metadata", "pk"]
}'

#{"code":0,"cost":0,"data":[{"metadata":"{\"product_info\": {\"category\": \"electronics\", \"brand\": \"BrandA\"}, \"price\": 99.99, \"in_stock\": true, \"tags\": [\"summer_sale\"]}","pk":1}]}
```

</TabItem>
</Tabs>

## 向量搜索与 JSON 过滤结合{#vector-search-with-filtering-expression}

您还可以在标量过滤的基础上进行向量搜索。如下示例演示了如何在向量搜索中指定标量过滤表达式并在返回结果中包含指定标量字段。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'metadata["product_info"]["brand"] == "BrandA"'

res = client.search(
    collection_name="my_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["metadata"],
    filter=filter
)

# Expected result:
# - Only pk=1 has "brand": "BrandA" in metadata["product_info"].
# - pk=4 has "brand": "BrandB".
# - pk=2 and pk=3 have no valid metadata.
# Hence, only pk=1 matches the filter.

print(res)

# Output:
# data: [
#     "[{'id': 1, 'distance': -0.2479381263256073, 'entity': {'metadata': {'product_info': {'category': 'electronics', 'brand': 'BrandA'}, 'price': 99.99, 'in_stock': True, 'tags': ['summer_sale']}}}]"
# ]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

String filter = "metadata[\"product_info\"][\"brand\"] == \"BrandA\"";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Collections.singletonList("metadata"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [
//   [
//     SearchResp.SearchResult(entity={metadata={"product_info":{"category":"electronics","brand":"BrandA"},"price":99.99,"in_stock":true,"tags":["summer_sale"]}}, score=-0.24793813, id=1)
//   ]
// ]

```

</TabItem>

<TabItem value='go'>

```go
queryVector := []float32{0.3, -0.6, -0.1}
filter = "metadata[\"product_info\"][\"brand\"] == \"BrandA\""

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("embedding").
    WithFilter(filter).
    WithOutputFields("metadata").
    WithAnnParam(annParam))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("metadata", resultSet.GetColumn("metadata").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.search({
    collection_name: 'my_collection',
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
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
  "collectionName": "my_collection",
  "data": [
    [0.3, -0.6, 0.1]
  ],
  "annsField": "embedding",
  "limit": 5,
  "searchParams": {
    "params": {
      "nprobe": 10
    }
  },
  "outputFields": ["metadata"],
  "filter": "metadata[\"product_info\"][\"brand\"] == \"BrandA\""
}'

##{"code":0,"cost":0,"data":[{"metadata":"{\"product_info\": {\"category\": \"electronics\", \"brand\": \"BrandA\"}, \"price\": 99.99, \"in_stock\": true, \"tags\": [\"summer_sale\"]}","pk":1}]}
```

</TabItem>
</Tabs>

此外，Zilliz Cloud clusters 支持一些高级的 JSON 过滤操作符，如 `JSON_CONTAINS`、`JSON_CONTAINS_ALL` 和 `JSON_CONTAINS_ANY` 等，可以进一步提升查询能力。有关更多信息，请参考[JSON 操作符](./json-filtering-operators)。

