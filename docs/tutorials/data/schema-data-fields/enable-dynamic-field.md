---
title: "Dynamic Field | Cloud"
slug: /enable-dynamic-field
sidebar_label: "Dynamic Field"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Zilliz Cloud 允许您通过 dynamic field 的特殊功能插入具有灵活、不断演进 schema 的 entity。此字段实现为名为 `#meta` 的隐藏 JSON 字段，它会自动存储数据中未在 collection schema 中明确定义的字段。 | Cloud"
type: origin
token: C6tVwPqeBiqNCwkbdCcc9dTpnYe
sidebar_position: 13
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - 动态字段
  - $meta
  - JSON 字段

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Field

Zilliz Cloud 允许您通过 **dynamic field** 的特殊功能插入具有灵活、不断演进 schema 的 entity。此字段实现为名为 `#meta` 的隐藏 JSON 字段，它会自动存储数据中**未在 collection schema 中明确定义**的字段。

## 工作原理\{#how-it-works}

当启用 dynamic field 时，Zilliz Cloud 会为每个 entity 添加一个隐藏的 `#meta` 字段。这个字段是 JSON 类型，意味着它可以存储任何与 JSON 兼容的数据结构，也可以通过 JSON 路径建立索引。

在数据插入过程中，任何未在 schema 中声明的字段都会自动作为键值对存储在这个 dynamic field 内。

您无需手动管理 `#meta`——Zilliz Cloud 会透明地处理它。

例如，如果您的 collection schema 只定义了 `id` 和 `vector`，而您插入以下 entity：

```json
{
  "id": 1,
  "vector": [0.1, 0.2, 0.3],
  "name": "Item A",    // 不在 schema 中
  "category": "books"  // 不在 schema 中
}
```

启用 dynamic field 功能后，Zilliz Cloud 会在内部存储为：

```json
{
  "id": 1,
  "vector": [0.1, 0.2, 0.3],
  // highlight-start
  "$meta": {
    "name": "Item A",
    "category": "books"
  }
  // highlight-end
}
```

这使您能够在不修改 schema 的情况下演进数据结构。

常见使用场景包括：

- 存储可选或不经常检索的字段

- 捕获因实体而异的元数据

- 通过特定 dynamic field 键的索引支持灵活过滤

## 支持的数据类型\{#supported-data-types}

Dynamic field 支持 Zilliz Cloud 提供的所有标量数据类型，包括简单和复杂值。这些数据类型适用于存储在 `#meta` 中的**键值**。

**支持的类型包括：**

- 字符串（`VARCHAR`）

- 整数（`INT8`、`INT32`、`INT64`）

- 浮点数（`FLOAT`、`DOUBLE`）

- 布尔值（`BOOL`）

- 标量值数组（`ARRAY`）

- JSON 对象（`JSON`）

**示例：**

```json
{
  "brand": "Acme",
  "price": 29.99,
  "in_stock": true,
  "tags": ["new", "hot"],
  "specs": {
    "weight": "1.2kg",
    "dimensions": { "width": 10, "height": 20 }
  }
}
```

上述每个键和值都将存储在 `#meta` 字段内。

## 启用 dynamic field\{#enable-dynamic-field}

要使用 dynamic field 功能，请在创建 collection schema 时设置 `enable_dynamic_field=True`：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

# 初始化客户端
client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# 创建启用 dynamic field 的 schema
schema = client.create_schema(
    auto_id=False,
    # highlight-next-line
    enable_dynamic_field=True,
)

# 添加明确定义的字段
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# 创建 collection
client.create_collection(
    collection_name="my_collection",
    schema=schema
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.*;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.AddFieldReq;

ConnectConfig config = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(true)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("my_vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType, CreateCollectionReq } from '@zilliz/milvus2-sdk-node';

// 初始化客户端
const client = new MilvusClient({ address: 'YOUR_CLUSTER_ENDPOINT' });

// 创建 collection
const res = await client.createCollection({
  collection_name: 'my_collection',
  schema:  [
      {
        name: 'my_id',
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: false,
      },
      {
        name: 'my_vector',
        data_type: DataType.FloatVector,
        type_params: {
          dim: '5',
      }
   ],
   enable_dynamic_field: true
});
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "YOUR_CLUSTER_ENDPOINT",
})
if err != nil {
    return err
}

schema := entity.NewSchema().WithDynamicFieldEnabled(true)
schema.WithField(entity.NewField().
    WithName("my_id").pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("my_vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema))
if err != nil {
    return err
}
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export TOKEN="YOUR_CLUSTER_TOKEN"
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"

export myIdField='{
  "fieldName": "my_id",
  "dataType": "Int64",
  "isPrimary": true,
  "autoID": false
}'

export myVectorField='{
  "fieldName": "my_vector",
  "dataType": "FloatVector",
  "elementTypeParams": {
    "dim": 5
  }
}'

export schema="{
  \"autoID\": false,
  \"enableDynamicField\": true,
  \"fields\": [
    $myIdField,
    $myVectorField
  ]
}"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"my_collection\",
  \"schema\": $schema
}"
```

</TabItem>
</Tabs>

## 向 collection 插入 entity\{#insert-entities-to-the-collection}

Dynamic field 允许您插入 schema 中未定义的额外字段。这些字段将自动存储在 `#meta` 中。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
entities = [
    {
        "my_id": 1, # 明确定义的主键字段
        "my_vector": [0.1, 0.2, 0.3, 0.4, 0.5], # 明确定义的向量字段
        "overview": "Great product",       # schema 中未定义的标量键
        "words": 150,                      # schema 中未定义的标量键
        "dynamic_json": {                  # schema 中未定义的 JSON 键
            "varchar": "some text",
            "nested": {
                "value": 42.5
            },
            "string_price": "99.99"        # 以字符串形式存储的数字
        }
    }
]

client.insert(collection_name="my_collection", data=entities)
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("my_id", 1);
row.add("my_vector", gson.toJsonTree(Arrays.asList(0.1, 0.2, 0.3, 0.4, 0.5)));
row.addProperty("overview", "Great product");
row.addProperty("words", 150);

JsonObject dynamic = new JsonObject();
dynamic.addProperty("varchar", "some text");
dynamic.addProperty("string_price", "99.99");

JsonObject nested = new JsonObject();
nested.addProperty("value", 42.5);

dynamic.add("nested", nested);
row.add("dynamic_json", dynamic);

client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript

const entities = [
  {
    my_id: 1,
    my_vector: [0.1, 0.2, 0.3, 0.4, 0.5],
    overview: 'Great product',
    words: 150,
    dynamic_json: {
      varchar: 'some text',
      nested: {
        value: 42.5,
      },
      string_price: '99.99',
    },
  },
];
const res = await client.insert({
    collection_name: 'my_collection',
    data: entities,
});
```

</TabItem>

<TabItem value='go'>

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("my_id", []int64{1}).
    WithFloatVectorColumn("my_vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
    }).WithColumns(
    column.NewColumnVarChar("overview", []string{"Great product"}),
    column.NewColumnInt32("words", []int32{150}),
    column.NewColumnJSONBytes("dynamic_json", [][]byte{
        []byte(`{
            varchar: 'some text',
            nested: {
                value: 42.5,
            },
            string_price: '99.99',
        }`),
    }),
))
if err != nil {
    return err
}
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data '{
  "data": [
    {
      "my_id": 1,
      "my_vector": [0.1, 0.2, 0.3, 0.4, 0.5],
      "overview": "Great product",
      "words": 150,
      "dynamic_json": {
        "varchar": "some text",
        "nested": {
          "value": 42.5
        },
        "string_price": "99.99"
      }
    }
  ],
  "collectionName": "my_collection"
}'
```

</TabItem>
</Tabs>

## 为 dynamic field 中的键建立索引\{#index-keys-in-the-dynamic-field}

Zilliz Cloud 允许您使用 **JSON 路径索引**为 dynamic field 内的特定键创建索引。这些可以是标量值或 JSON 对象中的嵌套值。

<Admonition type="info" icon="📘" title="说明">

<p>为 dynamic field 键建立索引是<strong>可选操作</strong>。您仍然可以在没有索引的情况下按 dynamic field 键查询或过滤，但由于需要进行暴力搜索，性能可能会较慢。</p>

</Admonition>

### JSON 路径索引语法\{#json-path-indexing-syntax}

要创建 JSON 路径索引，请指定：

- **JSON 路径**（`json_path`）：您要索引的 JSON 对象内键或嵌套字段的路径。

    - 示例：`metadata["category"]`

        这定义了索引引擎在 JSON 结构内查找的位置。

- **JSON 转换类型**（`json_cast_type`）：Zilliz Cloud 在解释和索引指定路径处的值时应使用的数据类型。

    - 此类型必须与被索引字段的实际数据类型匹配。如果您想在索引期间将数据类型转换为另一种类型，请考虑[使用转换函数](./use-json-fields)。

    - 完整列表请参见[支持的 JSON 转换类型](./use-json-fields)。

### 通过 JSON 路径为 dynamic field 中的键建索引\{#use-json-path-to-index-dynamic-field-keys}

由于 dynamic field 是一个 JSON 字段，你可以使用 JSON 路径语法来索引其中的任意键。这适用于简单的标量值，也适用于复杂的嵌套结构。

JSON 路径示例：

- 对于简单键：`overview`，`words`

- 对于嵌套键：`dynamic['varchar']`，`dynamic['nested']['value']`

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

# 为一个简单的字符串键创建索引
index_params.add_index(
    field_name="overview",  # dynamic field 中的键名
    # highlight-next-line
    index_type="AUTOINDEX", # 必须设置为 AUTOINDEX 
    index_name="overview_index",  # 唯一的索引名称
    # highlight-start
    params={
        "json_cast_type": "varchar",   # 为该值创建索引时使用的数据类型
        "json_path": "overview"        # 指向该键的 JSON 路径
    }
    # highlight-end
)

# 为一个简单的数值键创建索引
index_params.add_index(
    field_name="words",  # dynamic field 中的键名
    # highlight-next-line
    index_type="AUTOINDEX", # 必须设置为 AUTOINDEX 
    index_name="words_index",  # 唯一的索引名称
    # highlight-start
    params={
        "json_cast_type": "double",  # 为该值创建索引时使用的数据类型
        "json_path": "words" # 指向该键的 JSON 路径
    }
    # highlight-end
)

# 为 JSON 对象中的嵌套键创建索引
index_params.add_index(
    field_name="dynamic_json", # dynamic field 中的 JSON 键名
    # highlight-next-line
    index_type="AUTOINDEX", # 必须设置为 AUTOINDEX 
    index_name="json_varchar_index", # 唯一的索引名称
    # highlight-start
    params={
        "json_cast_type": "varchar", # 为该值创建索引时使用的数据类型
        "json_path": "dynamic_json['varchar']" # 指向嵌套键的 JSON 路径
    }
    # highlight-end
)

# 为深层嵌套的键创建索引
index_params.add_index(
    field_name="dynamic_json",
    # highlight-next-line
    index_type="AUTOINDEX", # 必须设置为 AUTOINDEX 
    index_name="json_nested_index", # 唯一的索引名称
    # highlight-start
    params={
        "json_cast_type": "double",
        "json_path": "dynamic_json['nested']['value']"
    }
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

Map<String,Object> extraParams1 = new HashMap<>();
extraParams1.put("json_path", "overview");
extraParams1.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("overview")
        .indexName("overview_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map<String,Object> extraParams2 = new HashMap<>();
extraParams2.put("json_path", "words");
extraParams2.put("json_cast_type", "double");
indexParams.add(IndexParam.builder()
        .fieldName("words")
        .indexName("words_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());

Map<String,Object> extraParams3 = new HashMap<>();
extraParams3.put("json_path", "dynamic_json['varchar']");
extraParams3.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("dynamic_json")
        .indexName("json_varchar_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());

Map<String,Object> extraParams4 = new HashMap<>();
extraParams4.put("json_path", "dynamic_json['nested']['value']");
extraParams4.put("json_cast_type", "double");
indexParams.add(IndexParam.builder()
        .fieldName("dynamic_json")
        .indexName("json_nested_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams4)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = [
    {
      collection_name: 'my_collection',
      field_name: 'overview',
      index_name: 'overview_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_path: 'overview',
        json_cast_type: 'varchar',
      },
    },
    {
      collection_name: 'my_collection',
      field_name: 'words',
      index_name: 'words_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_path: 'words',
        json_cast_type: 'double',
      },
    },
    {
      collection_name: 'my_collection',
      field_name: 'dynamic_json',
      index_name: 'json_varchar_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_cast_type: 'varchar',
        json_path: "dynamic_json['varchar']",
      },
    },
    {
      collection_name: 'my_collection',
      field_name: 'dynamic_json',
      index_name: 'json_nested_index',
      index_type: 'AUTOINDEX',
      metric_type: 'NONE',
      params: {
        json_cast_type: 'double',
        json_path: "dynamic_json['nested']['value']",
      },
    },
  ];
```

</TabItem>

<TabItem value='go'>

```go
import (
    "github.com/milvus-io/milvus/client/v2/index"
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", "overview")
    .WithIndexName("overview_index")
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, "double", "words")
    .WithIndexName("words_index")
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `dynamic_json['varchar']`)
    .WithIndexName("json_varchar_index")
jsonIndex4 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `dynamic_json['nested']['value']`)
    .WithIndexName("json_nested_index")

indexOpt1 := milvusclient.NewCreateIndexOption("my_collection", "overview", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("my_collection", "words", jsonIndex2)
indexOpt3 := milvusclient.NewCreateIndexOption("my_collection", "dynamic_json", jsonIndex3)
indexOpt4 := milvusclient.NewCreateIndexOption("my_collection", "dynamic_json", jsonIndex4)
```

</TabItem>

<TabItem value='bash'>

```bash
export TOKEN="YOUR_CLUSTER_TOKEN"
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"

export overviewIndex='{
  "fieldName": "dynamic_json",
  "indexName": "overview_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_cast_type": "varchar",
    "json_path": "dynamic_json[\"overview\"]"
  }
}'

export wordsIndex='{
  "fieldName": "dynamic_json",
  "indexName": "words_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_cast_type": "double",
    "json_path": "dynamic_json[\"words\"]"
  }
}'

export varcharIndex='{
  "fieldName": "dynamic_json",
  "indexName": "json_varchar_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_cast_type": "varchar",
    "json_path": "dynamic_json[\"varchar\"]"
  }
}'

export nestedIndex='{
  "fieldName": "dynamic_json",
  "indexName": "json_nested_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_cast_type": "double",
          "json_path": "dynamic_json[\"nested\"][\"value\"]"
    }
  }'
```

</TabItem>
</Tabs>

### 使用 JSON 转换函数进行类型转换\{#use-json-cast-functions-for-type-conversion}

如果 dynamic field 键包含格式不正确的值（例如，以字符串形式存储的数字），您可以使用转换函数进行转换：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 在索引前将字符串转换为 double
index_params.add_index(
    field_name="dynamic_json", # JSON 键名
    index_type="AUTOINDEX",
    index_name="json_string_price_index",
    params={
        "json_path": "dynamic_json['string_price']",
        "json_cast_type": "double", # 必须是转换函数的输出类型
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE" # 不区分大小写；将字符串转换为 double
    }
)
```

</TabItem>

<TabItem value='java'>

```java
Map<String,Object> extraParams5 = new HashMap<>();
extraParams5.put("json_path", "dynamic_json['string_price']");
extraParams5.put("json_cast_type", "double");
indexParams.add(IndexParam.builder()
        .fieldName("dynamic_json")
        .indexName("json_string_price_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams5)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
indexParams.push({
    collection_name: 'my_collection',
    field_name: 'dynamic_json',
    index_name: 'json_string_price_index',
    index_type: 'AUTOINDEX',
    metric_type: 'NONE',
    params: {
      json_path: "dynamic_json['string_price']",
      json_cast_type: 'double',
      json_cast_function: 'STRING_TO_DOUBLE',
    },
  });
```

</TabItem>

<TabItem value='go'>

```go
jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `dynamic_json['string_price']`)
    .WithIndexName("json_string_price_index")
indexOpt5 := milvusclient.NewCreateIndexOption("my_collection", "dynamic_json", jsonIndex5)
```

</TabItem>

<TabItem value='bash'>

```bash
export TOKEN="YOUR_CLUSTER_TOKEN"
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"

export stringPriceIndex='{
  "fieldName": "dynamic_json",
  "indexName": "json_string_price_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "dynamic_json[\"string_price\"]",
    "json_cast_type": "double",
    "json_cast_function": "STRING_TO_DOUBLE"
  }
}'
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>如果类型转换失败（例如值 <code>"not_a_number"</code> 无法转换为数字），该值将被跳过且不会被索引。</p></li>
<li><p>有关转换函数参数的详细信息，请参考 <a href="./use-json-fields">JSON 类型</a>。</p></li>
</ul>

</Admonition>

### 将索引参数应用到 collection\{#apply-indexes-to-the-collection}

定义索引参数后，您可以使用 `create_index()` 将它们应用到 collection：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_index(
    collection_name="my_collection",
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName("my_collection")
        .indexParams(indexParams)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
  await client.createIndex(indexParams);
```

</TabItem>

<TabItem value='go'>

```go
indexTask1, err := client.CreateIndex(ctx, indexOpt1)
if err != nil {
    return err
}
indexTask2, err := client.CreateIndex(ctx, indexOpt2)
if err != nil {
    return err
}
indexTask3, err := client.CreateIndex(ctx, indexOpt3)
if err != nil {
    return err
}
indexTask4, err := client.CreateIndex(ctx, indexOpt4)
if err != nil {
    return err
}
indexTask5, err := client.CreateIndex(ctx, indexOpt5)
if err != nil {
    return err
}
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export indexParams="[
  $varcharIndex,
  $nestedIndex,
  $overviewIndex,
  $wordsIndex,
  $stringPriceIndex
]"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"my_collection\",
  \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 按 dynamic field 键过滤\{#filter-by-dynamic-field-keys}

插入带有 dynamic field 键的 entity 后，您可以使用标准过滤表达式对它们进行过滤。

- 对于非 JSON 键（例如字符串、数字、布尔值），您可以直接通过键名引用它们。

- 对于存储 JSON 对象的键，使用 JSON 路径语法访问嵌套值。

基于前面的[示例 entity](./enable-dynamic-field#insert-entities-to-the-collection)，有效的过滤表达式包括：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'overview == "Great product"'                # 非 JSON 键
filter = 'words >= 100'                               # 非 JSON 键
filter = 'dynamic_json["nested"]["value"] < 50'       # JSON 对象键
```

</TabItem>

<TabItem value='java'>

```java
String filter = 'overview == "Great product"';
String filter = 'words >= 100';
String filter = 'dynamic_json["nested"]["value"] < 50';
```

</TabItem>

<TabItem value='javascript'>

```javascript
filter = 'overview == "Great product"'                // 非 JSON 键
filter = 'words >= 100'                               // 非 JSON 键
filter = 'dynamic_json["nested"]["value"] < 50'       // JSON 对象键
```

</TabItem>

<TabItem value='go'>

```go
filter := 'overview == "Great product"'
filter := 'words >= 100'
filter := 'dynamic_json["nested"]["value"] < 50'
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export filterOverview='overview == "Great product"'
export filterWords='words >= 100'
export filterNestedValue='dynamic_json["nested"]["value"] < 50'
```

</TabItem>
</Tabs>

**检索 dynamic field 中的键**：如果要在搜索或查询结果中返回 dynamic field 的键，必须在 `output_fields` 参数中显式指定这些键，使用与过滤时相同的 JSON 路径语法。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 示例：在搜索结果中包含 dynamic 字段的键
results = client.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],
    filter=filter,                         # 前面定义的过滤条件
    limit=10,
    # highlight-start
    output_fields=[
        "overview",                        # 简单的 dynamic field 键
        'dynamic_json["varchar"]'          # 嵌套的 JSON 键
    ]
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());

FloatVec queryVector = new FloatVec(new float[]{0.1, 0.2, 0.3, 0.4, 0.5});
SearchReq searchReq = SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .topK(5)
        .filter(filter)
        .outputFields(Arrays.asList("overview", "dynamic_json['varchar']"))
        .build();

SearchResp searchResp = client.search(searchReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

const query_vector = [0.1, 0.2, 0.3, 0.4, 0.5]

const res = await client.search({
    collection_name: "my_collection",
    data: [query_vector],
    limit: 5,
    filters: filter,
    output_fields: ["overview", "dynamic_json['varchar']"]
})
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "YOUR_CLUSTER_ENDPOINT"
token := "YOUR_CLUSTER_TOKEN"

client, err := client.New(ctx, &client.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

queryVector := []float32{0.1, 0.2, 0.3, 0.4, 0.5}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("my_vector").
    WithFilter(filter).
    WithOutputFields("overview", "dynamic_json['varchar']"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"
export FILTER='color like "red%" and likes > 50'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"my_collection\",
  \"data\": [
    [0.1, 0.2, 0.3, 0.4, 0.5]
  ],
  \"annsField\": \"my_vector\",
  \"filter\": \"${FILTER}\",
  \"limit\": 5,
  \"outputFields\": [\"overview\", \"dynamic_json.varchar\"]
}"
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>dynamic field 中的键默认不会包含在返回结果中，必须显式指定后才会返回。</p>

</Admonition>

有关支持的操作符和过滤表达式的完整列表，请参考 [Filtered Search](./filtered-search)。

## 整体流程\{#put-it-all-together}

到目前为止，您已经学会了如何使用 dynamic field 灵活存储和索引未在 schema 中定义的键。一旦插入了 dynamic field 键，您就可以像使用任何其他字段一样在过滤表达式中使用它——无需特殊语法。

要在实际应用中完成工作流程，您还需要：

- **为您的向量字段创建索引**（每个 collection 中的每个向量字段都必须）  

    参考 [创建 Vector Index](./index-vector-fields)

- **加载 collection**

    参考 [Load 和 Release](./load-release-collections)

- **使用 JSON 过滤表达式进行搜索或查询**  

    参考 [Filtered Search](./filtered-search) 和 [JSON 操作符](./json-filtering-operators)

## 常见问题\{#faq}

### 什么时候应该在 schema 中明确定义字段而不是使用 dynamic field 键？\{#when-should-i-define-a-field-explicitly-in-the-schema-instead-of-using-a-dynamic-field-key}

在以下情况下，您应该在 schema 中明确定义字段而不是使用 dynamic field 键：

- **字段经常包含在 output_fields 中**：只有明确定义的字段才能保证通过 `output_fields` 高效检索。Dynamic field 键没有针对高频检索进行优化，可能会产生性能开销。

- **字段经常被访问或过滤**：虽然为 dynamic field 键建立索引可以提供类似于固定 schema 字段的过滤性能，但明确定义的字段提供更清晰的结构和更好的可维护性。

- **您需要完全控制字段行为**：明确字段支持 schema 级别的约束、验证和更清晰的类型定义，这对于管理数据完整性和一致性很有用。

- **您希望避免索引不一致**：Dynamic field 键中的数据更容易出现类型或结构不一致。使用固定 schema 有助于确保数据质量，特别是如果您计划使用索引或转换。

### 我可以在同一个 dynamic field 键上使用不同的数据类型创建多个索引吗？\{#can-i-create-multiple-indexes-on-the-same-dynamic-field-key-with-different-data-types}

不可以，您**每个 JSON 路径只能创建一个索引**。即使 dynamic field 键包含混合类型值（例如，一些字符串和一些数字），在为该路径建立索引时也必须选择单个 `json_cast_type`。目前不支持在同一键上使用不同类型创建多个索引。

### 为 dynamic field 键建立索引时，如果数据转换失败会怎样？\{#when-indexing-a-dynamic-field-key-what-if-the-data-casting-fails}

如果您已为 dynamic field 键创建了索引，但数据转换失败——例如，要转换为 `double` 的值是像 `"abc"` 这样的非数字字符串——这些特定值将在**索引创建期间被静默跳过**。它们不会出现在索引中，因此**不会在依赖索引的基于过滤器的搜索或查询结果中返回**。

这有几个重要影响：

- **不会回退到全扫描**：如果大多数实体成功建立索引，过滤查询将完全依赖索引。转换失败的实体将从结果集中排除——即使它们在逻辑上匹配过滤条件。

- **搜索准确性风险**：在数据质量不一致的大型数据集中（特别是在 dynamic field 键中），这种行为可能导致意外的缺失结果。在索引之前确保一致和有效的数据格式至关重要。

- **谨慎使用转换函数**：如果您使用 `json_cast_function` 在索引期间将字符串转换为数字，请确保字符串值可以可靠地转换。`json_cast_type` 和实际转换类型之间的不匹配将导致错误或跳过的条目。

### 如果我的查询使用与索引转换类型不同的数据类型会怎样？\{#what-happens-if-my-query-uses-a-different-data-type-than-the-indexed-cast-type}

如果您的查询使用与索引中使用的**不同数据类型**比较 dynamic field 键（例如，当索引转换为 `double` 时使用字符串比较进行查询），系统将**不会使用索引**，并且只有在可能的情况下才会回退到全扫描。为了获得最佳性能和准确性，请确保您的查询类型与索引创建期间使用的 `json_cast_type` 匹配。 