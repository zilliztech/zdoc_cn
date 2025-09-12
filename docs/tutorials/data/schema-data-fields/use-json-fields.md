---
title: "JSON 类型 | Cloud"
slug: /use-json-fields
sidebar_label: "JSON 类型"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 允许您使用 `JSON` 数据类型在单个字段中存储和索引结构化数据。这使得灵活的 schema 能够包含嵌套属性，同时仍然允许通过 JSON 路径索引进行高效过滤。 | Cloud"
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

Zilliz Cloud 允许您使用 `JSON` 数据类型在单个字段中存储和索引结构化数据。这使得灵活的 schema 能够包含嵌套属性，同时仍然允许通过 JSON 路径索引进行高效过滤。

## 什么是 JSON 字段？{#what-is-a-json-field}

JSON 字段是 Zilliz Cloud 中定义在 schema 中的字段，用于存储结构化的键值对数据。值可以包括字符串、数值、布尔值、数组或深度嵌套的对象。

以下是 JSON 字段的示例：

```json
{
  "metadata": {
    "category": "electronics",
    "brand": "BrandA",
    "in_stock": true,
    "price": 99.99,
    "string_price": "99.99",
    "tags": ["clearance", "summer_sale"],
    "supplier": {
      "name": "SupplierX",
      "country": "USA",
      "contact": {
        "email": "support@supplierx.com",
        "phone": "+1-800-555-0199"
      }
    }
  }
}
```

在这个示例中：

- `metadata` 是可以在 schema 中定义的 JSON 字段。

- 您可以存储扁平值（如 `category`、`in_stock`）、数组（`tags`）和嵌套对象（`supplier`）等。

## 在 schema 中定义 JSON 字段{#define-a-json-field-in-the-schema}

要使用 JSON 字段，需要在 collection schema 中明确定义它，将 `DataType` 指定为 `JSON`。

以下示例创建一个包含以下字段的 collection 及其 schema：

- 主键（`product_id`）

- `vector` 字段（每个 collection 必须有至少一个向量字段）

- `metadata` 字段，类型为 `JSON`，可以存储结构化数据，如扁平值、数组或嵌套对象

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

# 创建包含 JSON 字段的 schema
schema = client.create_schema(auto_id=False, enable_dynamic_field=True)

schema.add_field(field_name="product_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
# highlight-next-line
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)  # 允许空值的 JSON 字段

client.create_collection(
    collection_name="product_catalog",
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
        .fieldName("product_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("metadata")
        .dataType(DataType.JSON)
        .isNullable(true)
        .build());
        
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("product_catalog")
        .collectionSchema(schema)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'localhost:19530'
});

// Create collection
await client.createCollection({
collection_name: "product_catalog",
fields: [
  {
    name: "product_id",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: false
  },
  {
    name: "vector",
    data_type: DataType.FloatVector,
    dim: 5
  },
  {
    name: "metadata",
    data_type: DataType.JSON,
    nullable: true  // JSON field that allows null values
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
    WithName("product_id").pk
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
).WithField(entity.NewField().
    WithName("metadata").
    WithDataType(entity.FieldTypeJSON).
    WithNullable(true),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("product_catalog", schema))
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

# 字段定义
export productIdField='{
  "fieldName": "product_id",
  "dataType": "Int64",
  "isPrimary": true,
  "autoID": false
}'

export vectorField='{
  "fieldName": "vector",
  "dataType": "FloatVector",
  "typeParams": {
    "dim": 5
  }
}'

export metadataField='{
  "fieldName": "metadata",
  "dataType": "JSON",
  "isNullable": true
}'

# 构造 schema
export schema="{
  \"autoID\": false,
  \"enableDynamicField\": true,
  \"fields\": [
    $productIdField,
    $vectorField,
    $metadataField
  ]
}"

# 创建集合
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"product_catalog\",
  \"schema\": $schema
}"

```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>您还可以启用 dynamic field 功能来灵活存储未声明的字段，但这不是 JSON 字段正常工作的必要条件。更多信息请参考 <a href="./enable-dynamic-field">Dynamic Field</a>。</p>

</Admonition>

## 插入带有 JSON 数据的 entity{#insert-entities-with-json-data}

创建 collection 后，插入在 `metadata` JSON 字段中包含结构化 JSON 对象的实体。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
entities = [
    {
        "product_id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        "metadata": {
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            }
        }
    }
]

client.insert(collection_name="product_catalog", data=entities)
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("product_id", 1);
row.add("vector", gson.toJsonTree(Arrays.asList(0.1, 0.2, 0.3, 0.4, 0.5)));

JsonObject metadata = new JsonObject();
metadata.addProperty("category", "electronics");
metadata.addProperty("brand", "BrandA");
metadata.addProperty("in_stock", true);
metadata.addProperty("price", 99.99);
metadata.addProperty("string_price", "99.99");
metadata.add("tags", gson.toJsonTree(Arrays.asList("clearance", "summer_sale")));

JsonObject supplier = new JsonObject();
supplier.addProperty("name", "SupplierX");
supplier.addProperty("country", "USA");

JsonObject contact = new JsonObject();
contact.addProperty("email", "support@supplierx.com");
contact.addProperty("phone", "+1-800-555-0199");

supplier.add("contact", contact);
metadata.add("supplier", supplier);
row.add("metadata", metadata);

client.insert(InsertReq.builder()
        .collectionName("product_catalog")
        .data(Collections.singletonList(row))
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const entities = [
    {
        "product_id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        "metadata": {
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            }
        }
    }
]

await client.insert({
    collection_name: "product_catalog", 
    data: entities
});
```

</TabItem>

<TabItem value='go'>

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("product_catalog").
    WithInt64Column("product_id", []int64{1}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
    }).WithColumns(
    column.NewColumnJSONBytes("metadata", [][]byte{
        []byte(`{
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            &#125;
        &#125;`),
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
export TOKEN="YOUR_CLUSTER_TOKEN"
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"

export entities='[
  {
    "product_id": 1,
    "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
    "metadata": {
      "category": "electronics",
      "brand": "BrandA",
      "in_stock": true,
      "price": 99.99,
      "string_price": "99.99",
      "tags": ["clearance", "summer_sale"],
      "supplier": {
        "name": "SupplierX",
        "country": "USA",
        "contact": {
          "email": "support@supplierx.com",
          "phone": "+1-800-555-0199"
        }
      }
    }
  }
]'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/product_catalog/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"data\": $entities
}"
```

</TabItem>
</Tabs>

## 为 JSON 字段内的值建立索引{#index-values-inside-the-json-field}

为了加速 JSON 字段的标量过滤，Zilliz Cloud 支持使用 **JSON 路径索引**为 JSON 字段建立索引。这允许您按 JSON 对象内的键或嵌套值进行过滤，而无需扫描整个字段。

<Admonition type="info" icon="📘" title="说明">

<p>为 JSON 字段建立索引是<strong>可选</strong>操作。您仍然可以在没有索引的情况下按 JSON 路径查询或过滤，但由于需要进行暴力搜索，性能可能会较慢。</p>

</Admonition>

### JSON 路径索引语法{#json-path-indexing-syntax}

要创建 JSON 路径索引，请指定：

- **JSON 路径**（`json_path`）：您要索引的 JSON 对象内键或嵌套字段的路径。

    - 示例：

        - 对于内键，`metadata["category"]`

        - 对于嵌套字段，`metadata["contact"]["email"]`

        这定义了索引引擎在 JSON 结构内查找的位置。

- **JSON 转换类型**（`json_cast_type`）：Zilliz Cloud 在解释和索引指定路径处的值时应使用的数据类型。

    - 此类型必须与被索引字段的实际数据类型匹配。如果您想在索引期间将数据类型转换为另一种类型，请考虑[使用转换函数](./use-json-fields#use-json-cast-functions-for-type-conversion)。

    - 完整列表请参见[下文](./use-json-fields#supported-json-cast-types)。

#### 支持的 JSON 转换类型{#supported-json-cast-types}

转换类型不区分大小写。支持以下类型：

<table>
   <tr>
     <th><p><strong>转换类型</strong></p></th>
     <th><p>描述</p></th>
     <th><p>示例 JSON 值</p></th>
   </tr>
   <tr>
     <td><p><code>bool</code></p></td>
     <td><p>布尔值</p></td>
     <td><p><code>true</code>，<code>false</code></p></td>
   </tr>
   <tr>
     <td><p><code>double</code></p></td>
     <td><p>数值（整数或浮点数）</p></td>
     <td><p><code>42</code>，<code>99.99</code>，<code>-15.5</code></p></td>
   </tr>
   <tr>
     <td><p><code>varchar</code></p></td>
     <td><p>字符串值</p></td>
     <td><p><code>"electronics"</code>，<code>"BrandA"</code></p></td>
   </tr>
   <tr>
     <td><p><code>array_bool</code></p></td>
     <td><p>布尔值数组</p></td>
     <td><p><code>&#91;true, false, true&#93;</code></p></td>
   </tr>
   <tr>
     <td><p><code>array_double</code></p></td>
     <td><p>数值数组</p></td>
     <td><p><code>&#91;1.2, 3.14, 42&#93;</code></p></td>
   </tr>
   <tr>
     <td><p><code>array_varchar</code></p></td>
     <td><p>字符串数组</p></td>
     <td><p><code>&#91;"tag1", "tag2", "tag3"&#93;</code></p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>为了优化索引，数组应包含相同类型的元素。更多信息请参考 <a href="./use-array-fields">Array 类型</a>。</p>

</Admonition>

#### 示例：创建 JSON 路径索引{#example-create-json-path-indexes}

使用我们介绍中的 `metadata` JSON 结构，以下是为不同 JSON 路径创建索引的示例：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 将 category 字段作为字符串索引
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # 对于 JSON 路径索引必须设置为 AUTOINDEX
    index_name="category_index",  # 唯一的索引名称
    # highlight-start
    params={
        "json_path": "metadata[\"category\"]", # 要索引的 JSON 键的路径
        "json_cast_type": "varchar" # 数据转换类型
    }
    # highlight-end
)

# 将 tags 数组作为字符串数组索引
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # 对于 JSON 路径索引必须设置为 AUTOINDEX
    index_name="tags_array_index", # 唯一的索引名称
    # highlight-start
    params={
        "json_path": "metadata[\"tags\"]", # 要索引的 JSON 键的路径
        "json_cast_type": "array_varchar" # 数据转换类型
    }
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

Map<String,Object> extraParams1 = new HashMap<>();
extraParams1.put("json_path", "metadata[\"category\"]");
extraParams1.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("category_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams1)
        .build());

Map<String,Object> extraParams2 = new HashMap<>();
extraParams2.put("json_path", "metadata[\"tags\"]");
extraParams2.put("json_cast_type", "array_varchar");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("tags_array_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams2)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = [
  {
    collection_name: "product_catalog",
    field_name: "metadata",
    index_name: "category_index",
    index_type: "AUTOINDEX", // Can also use "INVERTED" for JSON path indexing
    extra_params: {
      json_path: 'metadata["category"]',
      json_cast_type: "varchar",
    },
  },
  {
    collection_name: "product_catalog",
    field_name: "metadata",
    index_name: "tags_array_index",
    index_type: "AUTOINDEX", // Can also use "INVERTED" for JSON path indexing
    extra_params: {
      json_path: 'metadata["tags"]',
      json_cast_type: "array_varchar",
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

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `metadata&#91;"category"&#93;`)
    .WithIndexName("category_index")
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, "array_varchar", `metadata&#91;"tags"&#93;`)
    .WithIndexName("tags_array_index")

indexOpt1 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex2)
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export categoryIndex='{
  "fieldName": "metadata",
  "indexName": "category_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"category\\\"]",
    "json_cast_type": "varchar"
  }
}'

export tagsArrayIndex='{
  "fieldName": "metadata",
  "indexName": "tags_array_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"tags\\\"]",
    "json_cast_type": "array_varchar"
  }
}'
```

</TabItem>
</Tabs>

### 使用 JSON 转换函数进行类型转换{#use-json-cast-functions-for-type-conversion}

如果您的 JSON 字段键包含格式不正确的值（例如，以字符串形式存储的数字），您可以使用转换函数在索引期间转换值。

#### 支持的转换函数{#supported-cast-functions}

转换函数不区分大小写。支持以下类型：

<table>
   <tr>
     <th><p>转换函数</p></th>
     <th><p>转换类型</p></th>
     <th><p>使用场景</p></th>
   </tr>
   <tr>
     <td><p><code>"STRING_TO_DOUBLE"</code></p></td>
     <td><p>字符串 → 数值 (<code>double</code>)</p></td>
     <td><p>将 <code>"99.99"</code> 转换为 <code>99.99</code></p></td>
   </tr>
</table>

#### 示例：将字符串数字转换为 double{#example-cast-string-numbers-to-double}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 将字符串数字转换为 double 用于索引
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # 对于 JSON 路径索引必须设置为 AUTOINDEX
    index_name="string_to_double_index", # 唯一的索引名称
    params={
        "json_path": "metadata[\"string_price\"]", # 要索引的 JSON 键的路径
        "json_cast_type": "double", # 数据转换类型
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE" # 转换函数；不区分大小写
    }
)
```

</TabItem>

<TabItem value='java'>

```java
Map<String,Object> extraParams3 = new HashMap<>();
extraParams3.put("json_path", "metadata[\"string_price\"]");
extraParams3.put("json_cast_type", "double");
extraParams3.put("json_cast_function", "STRING_TO_DOUBLE");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("string_to_double_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams3)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
indexParams.push({
  collection_name: "product_catalog",
  field_name: "metadata",
  index_name: "string_to_double_index",
  index_type: "AUTOINDEX", // Can also use "INVERTED"
  extra_params: {
    json_path: 'metadata["string_price"]',
    json_cast_type: "double",
    json_cast_function: "STRING_TO_DOUBLE", // Case insensitive
  },
});
```

</TabItem>

<TabItem value='go'>

```go
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `metadata&#91;"string_price"&#93;`)
                    .WithIndexName("string_to_double_index")

indexOpt3 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex3)
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export stringToDoubleIndex='{
  "fieldName": "metadata",
  "indexName": "string_to_double_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"string_price\\\"]",
    "json_cast_type": "double",
    "json_cast_function": "STRING_TO_DOUBLE"
  }
}'
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p><code>json_cast_type</code> 参数是必需的，且必须与转换函数的输出类型相同。</p></li>
<li><p>如果转换失败（例如，非数字字符串），该值将被跳过并且不会被索引。</p></li>
</ul>

</Admonition>

### 将索引参数应用到 collection{#apply-indexes-to-the-collection}

定义索引参数后，您可以使用 `create_index()` 将它们应用到 collection：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_index(
    collection_name="product_catalog",
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName("product_catalog")
        .indexParams(indexParams)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.createIndex(indexParams)
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
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export indexParams="[
  $categoryIndex,
  $tagsArrayIndex,
  $stringToDoubleIndex
]"
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"product_catalog\",
  \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 按 JSON 字段值过滤{#filter-by-json-field-values}

插入和索引 JSON 字段后，您可以使用标准过滤表达式和 JSON 路径语法对它们进行过滤。

例如：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = 'metadata["category"] == "electronics"'
filter = 'metadata["price"] > 50'
filter = 'json_contains(metadata["tags"], "featured")'
```

</TabItem>

<TabItem value='java'>

```java
String filter = 'metadata["category"] == "electronics"';
String filter = 'metadata["price"] > 50';
String filter = 'json_contains(metadata["tags"], "featured")';
```

</TabItem>

<TabItem value='javascript'>

```javascript
let filter = 'metadata["category"] == "electronics"'
let filter = 'metadata["price"] > 50'
let filter = 'json_contains(metadata["tags"], "featured")'
```

</TabItem>

<TabItem value='go'>

```go
filter := 'metadata["category"] == "electronics"'
filter := 'metadata["price"] > 50'
filter := 'json_contains(metadata["tags"], "featured")'
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
export filterCategory='metadata["category"] == "electronics"'
export filterPrice='metadata["price"] > 50'
export filterTags='json_contains(metadata["tags"], "featured")'
```

</TabItem>
</Tabs>

要在搜索或查询中使用这些表达式，请确保：

- 您已为每个向量字段创建了索引。

- collection 已加载到内存中。

有关支持的操作符和表达式的完整列表，请参考 [JSON 操作符](./json-filtering-operators)。

## 整体流程{#pull-it-all-together}

到目前为止，您已经学会了如何定义、插入和可选地为 JSON 字段内的结构化值建立索引。

要在实际应用中完成工作流程，您还需要：

- **为您的向量字段创建索引**（每个 collection 中的每个向量字段都必须）  

    参考 [创建 Vector Index](./index-vector-fields)

- **加载 collection**

    参考 [Load 和 Release](./load-release-collections)

- **使用 JSON 过滤表达式进行搜索或查询**  

    参考 [Filtered Search](./filtered-search) 和 [JSON 操作符](./json-filtering-operators)

## 常见问题{#faq}

### JSON 字段和 dynamic field 有什么区别？{#what-are-the-differences-between-a-json-field-and-the-dynamic-field}

- **JSON 字段**是 schema 定义的。您必须在 schema 中明确声明该字段。

- **Dynamic field**是一个隐藏的 JSON 对象（`$meta`），它自动存储任何未在 schema 中定义的字段。

两者都支持嵌套结构和 JSON 路径索引，但 dynamic field 更适合可选或不断变化的数据结构。

详情请参考 [Dynamic Field](./enable-dynamic-field)。

### JSON 字段的大小有限制吗？{#are-there-any-limitations-on-the-size-of-a-json-field}

有的。每个 JSON 字段限制为 65,536 字节。

### JSON 字段支持设置默认值吗？{#does-a-json-field-support-setting-a-default-value}

不支持，JSON 字段不支持默认值。但是，您可以在定义字段时设置 `nullable=True` 来允许空条目。

详情请参考 [Nullable 和默认值](./nullable-and-default)。

### JSON 字段键有命名规范吗？{#are-there-any-naming-conventions-for-json-field-keys}

有的。为了确保与查询和索引的兼容性：

- 在 JSON 键中只使用字母、数字和下划线。

- 避免使用特殊字符、空格或点（`.`、`/` 等）。

- 不兼容的键可能会在过滤表达式中导致解析问题。

### Zilliz Cloud 如何处理 JSON 字段中的字符串值？{#how-does-zilliz-cloud-handle-string-values-in-json-fields}

Zilliz Cloud 完全按照 JSON 输入中的字符串值存储——不进行语义转换。引号不当的字符串可能会在解析过程中导致错误。

**有效字符串示例**：

```plaintext
"a\"b", "a'b", "a\b"
```

**无效字符串示例**：

```plaintext
'a"b', 'a\'b'
```

### Zilliz Cloud 对索引的 JSON 路径使用什么过滤逻辑？{#what-filtering-logic-does-zilliz-cloud-use-for-indexed-json-paths}

- **数值索引**：

    如果使用 `json_cast_type="double"` 创建索引，只有数值过滤条件（例如 `>`、`<`、`== 42`）会利用索引。非数值条件将强制进行暴力扫描。

- **字符串索引**：

    如果索引使用 `json_cast_type="varchar"`，只有字符串过滤条件会受益于索引；其他类型将回退到暴力搜索。

- **布尔索引**：

    布尔索引的行为类似于字符串索引，只有条件严格匹配 true 或 false 时才会使用索引。

### Term 表达式如何与 JSON 字段索引配合使用？{#how-do-term-expressions-work-with-json-field-indexing}

您可以使用 term 表达式如 `json["field"] IN [value1, value2, …]` 来过滤 entity。

- 只有当目标值是标量时才会应用索引。

- 如果 `json["field"]` 是数组，查询将不会使用索引，将回退到暴力搜索。

### 索引 JSON 字段时的数值精度如何？{#what-about-numeric-precision-when-indexing-json-fields}

Zilliz Cloud 将所有索引的数值存储为 double。

如果数值超过 `2^53`，可能会失去精度。这种精度损失可能导致过滤查询无法精确匹配超出范围的值。

### Zilliz Cloud 如何处理 JSON 字段索引的数据完整性？{#how-does-zilliz-cloud-handle-data-integrity-for-json-field-indexing}

Zilliz Cloud 不会自动转换或规范化不一致的数据类型。

例如，如果某些行将 `"price": "99.99"` 存储为字符串，而其他行将 `"price": 99.99` 存储为数字，同时索引定义为 double，只有具有数值的行才会被索引。

不一致会导致受影响的行在索引期间被静默跳过。

### 索引 JSON 字段时类型转换失败会怎样？{#what-happens-if-type-casting-fails-when-indexing-a-json-field}

如果值无法转换为指定的 `json_cast_type`（例如，期望 `double` 时遇到非数字字符串），该值会被静默跳过并且**不包含在索引中**。因此，具有转换失败的实体将从依赖索引的过滤结果中**排除**。

为了避免意外的查询行为，请确保索引的 JSON 路径下的所有值都具有一致的类型。

### 我可以在同一个 JSON 路径上使用不同的转换类型创建多个索引吗？{#can-i-create-multiple-indexes-on-the-same-json-path-with-different-cast-types}

不可以，每个 JSON 路径只支持**一个索引**。您必须选择一个与您的数据匹配的 `json_cast_type`。不支持在同一路径上使用不同转换类型创建多个索引。

### 如果 JSON 路径上的值具有不一致的类型怎么办？{#what-if-values-at-a-json-path-have-inconsistent-types}

跨实体的不一致类型可能导致**部分索引**。例如，如果 `metadata["price"]` 既存储为数字（`99.99`）又存储为字符串（`"99.99"`），而索引定义为 `json_cast_type="double"`，只有数值会被索引。字符串形式的条目将被跳过，不会出现在过滤结果中。

### 我可以使用与索引转换类型不同的类型进行过滤吗？{#can-i-use-filters-with-a-different-type-than-the-indexed-cast-type}

如果您的过滤表达式使用的类型与索引的 `json_cast_type` 不同，系统将**不会使用索引**，并且可能会回退到更慢的暴力扫描——如果数据允许的话。为了获得最佳性能，请始终将过滤表达式与索引的转换类型保持一致。 