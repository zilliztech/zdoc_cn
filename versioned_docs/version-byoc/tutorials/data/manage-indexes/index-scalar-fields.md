---
title: "创建 Scalar Index | Cloud"
slug: /index-scalar-fields
sidebar_label: "创建 Scalar Index"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持对标量字段（非向量字段）建立索引，以显著加速过滤和搜索性能，特别是在大型数据集上。 | Cloud"
type: origin
token: AHv5wa2FiiWoyGkTIsHcfIcyngg
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 索引
  - index
  - AUTOINDEX
  - 标量索引

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 创建 Scalar Index

Zilliz Cloud 支持对标量字段（非向量字段）建立索引，以显著加速过滤和搜索性能，特别是在大型数据集上。

<Admonition type="info" icon="📘" title="说明">

<p>对标量字段建立索引是可选操作，推荐您对经常在过滤条件中使用的字段建立索引。</p>

</Admonition>

## 可以索引的内容{#what-you-can-index}

Zilliz Cloud 支持对以下字段类型使用 `AUTOINDEX`：

<table>
   <tr>
     <th><p>字段类型</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>字符串</p></td>
   </tr>
   <tr>
     <td><p><code>INT8</code>, <code>INT32</code>, <code>INT64</code></p></td>
     <td><p>整数</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT</code>, <code>DOUBLE</code></p></td>
     <td><p>浮点数</p></td>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p>布尔值</p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY</code></p></td>
     <td><p>标量值的同质数组</p></td>
   </tr>
   <tr>
     <td><p><code>JSON</code></p></td>
     <td><p>Schema 定义的或 dynamic field（具有特定路径目标）</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>不支持对整个 JSON 对象建立索引。您必须指定 JSON 字段内标量值的路径。更多信息请参考 <a href="./use-json-fields">JSON 类型</a>。</p>

</Admonition>

## 定义 collection schema{#define-a-collection-schema}

在创建索引之前，定义一个包含向量字段和标量字段的 collection。Zilliz Cloud 要求每个 collection 都有一个向量字段。

在此示例中，我们为产品目录定义一个 schema，包括标量字段、JSON 类型的 `metadata` 字段和必需的向量字段，并启用 dynamic field 功能：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT") # 替换为您的集群端点

# 定义支持 dynamic field 的 schema
schema = client.create_schema(
    auto_id=False,
    # highlight-next-line
    enable_dynamic_field=True # 启用 dynamic field
)

# 必需字段
schema.add_field(field_name="product_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# 标量字段和 JSON 字段
# highlight-start
schema.add_field(field_name="price", datatype=DataType.DOUBLE)
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)
# highlight-end

# 创建 collection
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
        .fieldName("price")
        .dataType(DataType.Double)
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

// 初始化客户端
const client = new MilvusClient({
  address: 'YOUR_CLUSTER_ENDPOINT', // 替换为您的集群端点
});

const collectionName = 'product_catalog';

// 定义 schema
const schema = [
  {
    name: 'product_id',
    description: 'Primary key',
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: false,
  },
  {
    name: 'vector',
    description: 'Embedding vector',
    data_type: DataType.FloatVector,
    type_params: {
      dim: '5',
    },
  },
  {
    name: 'price',
    description: 'Product price',
    data_type: DataType.Double,
  },
  {
    name: 'metadata',
    description: 'Additional metadata',
    data_type: DataType.JSON,
    is_nullable: true,
  },
];

// 创建 collection
const res = await client.createCollection({
    collection_name: collectionName,
    fields: schema,
    enable_dynamic_field: true,
});

console.log('Create collection result:', res);
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
    WithName("price").
    WithDataType(entity.FieldTypeDouble),
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

export productIdField='{
  "fieldName": "product_id",
  "dataType": "Int64",
  "isPrimary": true,
  "autoID": false
}'

export vectorField='{
  "fieldName": "vector",
  "dataType": "FloatVector",
  "elementTypeParams": {
    "dim": 5
  }
}'

export priceField='{
  "fieldName": "price",
  "dataType": "Double"
}'

export metadataField='{
  "fieldName": "metadata",
  "dataType": "JSON",
  "isNullable": true
}'

export schema="{
  \"autoID\": false,
  \"enableDynamicField\": true,
  \"fields\": [
    $productIdField,
    $vectorField,
    $priceField,
    $metadataField
  ]
}"

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

<p>有关如何使用 JSON 字段和 dynamic field 的更多信息，请参考 <a href="./enable-dynamic-field">Dynamic Field</a></p>

</Admonition>

## 为非 JSON 字段建立索引{#index-a-non-json-field}

您可以使用 `AUTOINDEX` 为任何非 JSON 标量字段创建索引。无需额外的索引参数。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params() # 准备一个空的 IndexParams 对象，无需指定任何索引参数

index_params.add_index(
    field_name="price", # 要索引的标量字段名称
    # highlight-next-line
    index_type="AUTOINDEX", # 要创建的索引类型
    index_name="price_index" # 要创建的索引名称
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(IndexParam.builder()
        .fieldName("price")
        .indexName("price_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const indexParams = [{
    collection_name: collectionName,
    field_name: 'price',
    index_type: 'AUTOINDEX',
    index_name: 'price_index'
}];
```

</TabItem>

<TabItem value='go'>

```go
import (
    "github.com/milvus-io/milvus/client/v2/index"
)

indexOpt := client.NewCreateIndexOption("product_catalog", "price",
        index.NewInvertedIndex()
```

</TabItem>

<TabItem value='bash'>

```bash
export priceIndex='{
  "fieldName": "price",
  "indexName": "price_index",
  "params": {
    "index_type": "AUTOINDEX"
  }
}'
```

</TabItem>
</Tabs>

## 为 JSON 字段建立索引{#index-a-json-field}

Zilliz Cloud 支持使用 **JSON 路径索引**为 JSON 字段建立索引。这允许您按 JSON 对象内的键或嵌套值进行过滤，而无需扫描整个字段。

### 示例 JSON 字段{#example-json-field}

考虑一个在 schema 中定义的 `metadata` 字段：

```json
{
  "metadata": {
    "category": "electronics",
    "brand": "BrandA",
    "in_stock": true,
    "tags": ["clearance", "summer_sale"],
    "string_price": "99.99"
  }
}
```

您可以为以下路径创建索引：

- `metadata["category"]`

- `metadata["tags"]`

- `metadata["string_price"]` → 使用[转换函数](./index-scalar-fields#use-json-cast-functions-for-type-conversion)将字符串数字转换为 `double`

### JSON 路径索引语法{#json-path-indexing-syntax}

要创建 JSON 路径索引，请指定：

- **JSON 路径**（`json_path`）：您要索引的 JSON 对象内键或嵌套字段的路径。

    - 示例：`metadata["category"]`

        这定义了索引引擎在 JSON 结构内查找的位置。

- **JSON 转换类型**（`json_cast_type`）：Zilliz Cloud 在解释和索引指定路径处的值时应使用的数据类型。

    - 此类型必须与被索引字段的实际数据类型匹配。如果您想在索引期间将数据类型转换为另一种类型，请考虑[使用转换函数](./use-json-fields#use-json-cast-functions-for-type-conversion)。

    - 完整列表请参见[支持的 JSON 转换类型](./use-json-fields#supported-json-cast-types)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 将 category 字段作为字符串索引
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # 对于 JSON 路径索引必须设置为 AUTOINDEX
    index_name="category_index",
    # highlight-start
    params={
        "json_path": "metadata[\"category\"]",
        "json_cast_type": "varchar"
    }
    # highlight-end
)

# 将 tags 数组作为字符串数组索引
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # 对于 JSON 路径索引必须设置为 AUTOINDEX
    index_name="tags_array_index", 
    # highlight-start
    params={
        "json_path": "metadata[\"tags\"]",
        "json_cast_type": "array_varchar"
    }
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
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
indexParams.push({
    collection_name: collectionName,
    field_name: 'metadata',
    index_name: 'category_index',
    index_type: 'AUTOINDEX',
    params: {
      json_path: 'metadata["category"]',
      json_cast_type: 'varchar',
    },
  });
  
indexParams.push({
    collection_name: collectionName,
    field_name: 'metadata',
    index_name: 'tags_array_index',
    index_type: 'AUTOINDEX',
    params: {
      json_path: 'metadata["tags"]',
      json_cast_type: 'array_varchar',
    },
  });
```

</TabItem>

<TabItem value='go'>

```go
jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `metadata["category"]`)
    .WithIndexName("category_index")
jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, "array_varchar", `metadata["tags"]`)
    .WithIndexName("tags_array_index")

indexOpt1 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex1)
indexOpt2 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex2)
```

</TabItem>

<TabItem value='bash'>

```bash
export categoryIndex='{
  "fieldName": "metadata",
  "indexName": "category_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\"category\"]",
    "json_cast_type": "varchar"
  }
}'

export tagsArrayIndex='{
  "fieldName": "metadata",
  "indexName": "tags_array_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\"tags\"]",
    "json_cast_type": "array_varchar"
  }
}'
```

</TabItem>
</Tabs>

### 使用 JSON 转换函数进行类型转换{#use-json-cast-functions-for-type-conversion}

当您的 JSON 包含格式不正确的值（例如，以字符串形式存储的数字）时，您可以使用转换函数在索引期间转换值。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 将字符串数字转换为 double 用于索引
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX", # 对于 JSON 路径索引必须设置为 AUTOINDEX
    index_name="string_to_double_index",
    # highlight-start
    params={
        "json_path": "metadata[\"string_price\"]",
        "json_cast_type": "double", # 必须是转换函数的输出类型
        "json_cast_function": "STRING_TO_DOUBLE" # 不区分大小写
    }
    # highlight-end
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
    collection_name: collectionName,
    field_name: 'metadata',
    index_name: 'string_to_double_index',
    index_type: 'AUTOINDEX',
    params: {
      json_path: 'metadata["string_price"]',
      json_cast_type: 'double',                   
      json_cast_function: 'STRING_TO_DOUBLE',     
    },
});
```

</TabItem>

<TabItem value='go'>

```go
jsonIndex3 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `metadata["string_price"]`)
                    .WithIndexName("string_to_double_index")

indexOpt3 := milvusclient.NewCreateIndexOption("product_catalog", "metadata", jsonIndex3)
```

</TabItem>

<TabItem value='bash'>

```bash
export stringToDoubleIndex='{
  "fieldName": "metadata",
  "indexName": "string_to_double_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\"string_price\"]",
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
<li><p>有关转换函数参数的详细信息，请参考 <a href="./use-json-fields#use-json-cast-functions-for-type-conversion">JSON 类型</a>。</p></li>
</ul>

</Admonition>

## 为 dynamic field 中的键建立索引{#index-keys-in-the-dynamic-field}

如果您启用了 dynamic field，可以为未在 schema 中明确定义的特定标量键建立索引。这些键存储在隐藏的 JSON 字段中，在索引目的上被视为与其他标量字段相同。

<Admonition type="info" icon="📘" title="说明">

<p>有关 dynamic field 的详细信息，请参考 <a href="./enable-dynamic-field">Dynamic Field</a>。</p>

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# 为动态键建立索引（例如，已插入但未在 schema 中定义）
index_params.add_index(
    field_name="overview",  # dynamic field 中的键名
    index_type="AUTOINDEX",
    index_name="overview_index",
    # highlight-start
    params={
        "json_path": "overview", # dynamic field 中的键名
        "json_cast_type": "varchar" # Zilliz Cloud 在索引值时使用的数据类型
    }
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
Map<String,Object> extraParams4 = new HashMap<>();
extraParams4.put("json_path", "overview");
extraParams4.put("json_cast_type", "varchar");
indexParams.add(IndexParam.builder()
        .fieldName("overview")
        .indexName("overview_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams4)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
indexParams.push({
    collection_name: collectionName,
    field_name: 'overview', 
    index_name: 'overview_index',
    index_type: 'AUTOINDEX',
    params: {
      json_path: 'overview',
      json_cast_type: 'varchar',
    },
});
```

</TabItem>

<TabItem value='go'>

```go
jsonIndex4 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", "overview")
                    .WithIndexName("overview_index")

indexOpt4 := milvusclient.NewCreateIndexOption("product_catalog", "overview", jsonIndex4)
```

</TabItem>

<TabItem value='bash'>

```bash
export overviewIndex='{
  "fieldName": "overview",
  "indexName": "overview_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "overview",
    "json_cast_type": "varchar"
  }
}'
```

</TabItem>
</Tabs>

## 将索引参数应用到 collection{#apply-indexes-to-the-collection}

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
client.createIndex(indexParams)
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
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams="[
  $categoryIndex,
  $tagsArrayIndex,
  $stringToDoubleIndex,
  $overviewIndex
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

## 常见问题{#faq}

### 什么时候应该为标量字段创建索引？{#when-should-i-create-indexes-on-scalar-fields}

创建标量索引是**可选的**——但当字段经常在过滤条件中使用时强烈建议创建。没有索引时，Zilliz Cloud 在过滤期间会执行全 collection 扫描，这可能会显著影响大型数据集的性能。为这些字段建立索引可以使用标量索引实现更快的过滤。

### 我可以在同一个 JSON 字段上创建多个索引吗？{#can-i-create-multiple-indexes-on-the-same-json-field}

是的，您可以为同一个 JSON 字段内的不同路径建立索引，但每个唯一路径只允许一个索引。

### 为特定 JSON 路径建立索引时，如果某些行中不存在该 JSON 路径会怎样？{#when-indexing-a-specific-json-path-what-if-the-json-path-doesnt-exist-in-some-rows}

这些行在索引期间会被静默跳过。不会引发错误。

### 为 JSON 字段建立索引时，转换函数失败会发生什么？{#when-indexing-a-json-field-what-happens-when-cast-functions-fail}

Zilliz Cloud 会静默忽略无法转换的值，例如无法解析为数字的字符串。

### 我可以索引特定的数组元素吗？{#can-i-index-specific-array-elements}

是的，您可以索引特定的数组位置，如 `metadata["tags"][0]` 用于数组的第一个元素。

### 如果 JSON 字段中的某些值无法转换为索引类型会怎样？{#what-happens-if-some-values-in-a-json-field-cant-be-cast-to-the-index-type}

它们会在索引期间被静默跳过，并从依赖索引的查询结果中排除。如果您的数据有不一致的类型，这可能会导致部分结果。

### 我可以用不同类型多次索引同一个 JSON 字段路径吗？{#can-i-index-the-same-json-field-path-multiple-times-with-different-types}

不可以，单个 JSON 路径或 dynamic field 键一次只支持一个索引。您必须为索引选择一个 `json_cast_type`。

### 在哪里可以找到有关索引 JSON 字段或 dynamic field 的完整详细信息？{#where-can-i-find-full-details-about-indexing-json-fields-or-dynamic-fields}

请参考 [JSON 类型](./use-json-fields) 和 [Dynamic Field](./enable-dynamic-field) 章节获取更多信息。 