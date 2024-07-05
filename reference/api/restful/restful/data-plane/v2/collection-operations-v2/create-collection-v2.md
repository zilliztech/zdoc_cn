---
displayed_sidebar: restfulSidebar
sidebar_position: 59
slug: /restful/create-collection-v2
title: 创建 Collection
---

import RestHeader from '@site/src/components/RestHeader';

此操作在指定的集群中创建一个 Collection。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



你可以在快速设置和自定义设置之间进行选择，如下所示：

### 快速设置

快速设置的 Collection 包含两个字段：主键和向量字段。它还允许在动态字段中以键值对的形式插入未定义的字段及其值。

```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "test_collection",
    "dimension": 5
}'
```
    
在上述设置中，

- 主键和向量字段使用它们的默认名称（__id__ 和 __vector__）。
- 度量类型也设置为其默认值（COSINE）。
- 主键字段接受整数且不会自动递增。
- 保留的 JSON 字段 __$meta__ 用于存储未在模式中定义的字段及其值。

你可以修改主键和向量字段的名称，并更改度量类型。此外，主键字段可以设置为自动递增。
    
```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_quick_setup",
    "dimension": 5,
    "primaryFieldName": "my_id",
    "idType": "VarChar",
    "vectorFieldName": "my_vector",
    "metric_type": "L2",
    "autoId": true,
    "params": {
        "max_length": "512"
    }
}'
```

在上述代码中， Collection 将被创建并自动加载到内存中。
    
### 自定义设置及索引参数

对于自定义设置，你需要在请求中包含 schema 对象。你还被建议包括索引参数，以便在创建 Collection 时进行索引。

```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_setup_indexed",
    "schema": {
        "autoId": false,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "my_id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            }
        ]
        
    },
    "indexParams": [
        {
            "fieldName": "my_vector",
            "metricType": "COSINE",
            "indexName": "my_vector",
            "params": {
                "index_type": "IVF_FLAT",
                "nlist": "1024"
            }
        },
        {
            "fieldName": "my_id",
            "indexName": "my_id",
            "params": {
                "index_type": "STL_SORT"
            }            
        }
    ]
}'
```

当然，你可以在请求中不指定索引参数，稍后为 Collection 创建索引。

```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_setup_not_indexed",
    "schema": {
        "autoId": false,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "my_id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            }
        ]
        
    }
}'
```
可能的响应类似于以下内容：

```json
{
    "code": 0,
    "data": {}
}
```



## 请求

### 参数

- 无查询参数。

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Request-Timeout__  | **integer**(required)<br/>此操作的超时持续时间。将其设置为None表示此操作在任何响应返回或发生错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "dimension": "integer",
    "metricType": "string",
    "idType": "string",
    "autoID": "string",
    "primaryFieldName": "string",
    "vectorFieldName": "string",
    "schema": {
        "autoID": "string",
        "enableDynamicField": "string",
        "fields": [
            {
                "fieldName": "string",
                "dataType": "string",
                "elementDataType": "string",
                "isPrimary": "boolean",
                "isPartitionKey": "boolean",
                "elementTypeParams": {
                    "max_length": "integer",
                    "dim": "integer",
                    "max_capacity": "integer"
                }
            }
        ]
    },
    "indexParams": [
        {
            "metricType": "string",
            "fieldName": "string",
            "indexName": "string",
            "params": {
                "index_type": "string"
            }
        }
    ],
    "params": {
        "max_length": "integer",
        "enableDynamicField": "boolean",
        "shardsNum": "integer",
        "consistencyLevel": "integer",
        "partitionsNum": "integer",
        "ttlSeconds": "integer"
    }
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>数据库的名称。<zilliz>此参数仅适用于专属集群。</zilliz>  |
| __collectionName__ | __string__  <br/>要创建的 Collection 的名称。  |
| __dimension__ | __integer__  <br/>向量值应具有的维度数。<br/>如果此字段的**dtype**设置为**DataType.FLOAT_VECTOR**，则此参数是必需的。  |
| __metricType__ | __string__  <br/>应用于此操作的度量类型。<br/>可能的值是**L2**, **IP**, 和 **COSINE**。<br/>The value defaults to COSINE  |
| __idType__ | __string__  <br/>主字段的数据类型。此参数设计用于 Collection 的快速设置，如果定义了__schema__，则会忽略此参数。  |
| __autoID__ | __string__  <br/>主字段是否自动递增。此参数设计用于 Collection 的快速设置，如果定义了__schema__，则会忽略此参数。<br/>The value defaults to false  |
| __primaryFieldName__ | __string__  <br/>主字段的名称。此参数设计用于 Collection 的快速设置，如果定义了__schema__，则会忽略此参数。  |
| __vectorFieldName__ | __string__  <br/>向量字段的名称。此参数设计用于 Collection 的快速设置，如果定义了__schema__，则会忽略此参数。  |
| __schema__ | __object__<br/>模式负责组织目标 Collection 中的数据。有效的模式应该有多个字段，必须包括主键、向量字段和若干标量字段。 |
| __schema.autoID__ | __string__  <br/>是否允许主字段自动递增。将其设置为True会使主字段自动递增。在这种情况下，主字段不应包含在要插入的数据中，以避免错误。请在将is_primary设置为True的字段中设置此参数。  |
| __schema.enableDynamicField__ | __string__  <br/>是否允许使用保留的__$meta__字段以键值对的形式保存非模式定义的字段。  |
| __schema[].fields__ | __array__<br/>字段对象的列表。 |
| __schema[].fields[]__ | __object__<br/>字段对象 |
| __schema[].fields[].fieldName__ | __string__  <br/>要在目标 Collection 中创建的字段的名称  |
| __schema[].fields[].dataType__ | __string__  <br/>字段值的数据类型。  |
| __schema[].fields[].elementDataType__ | __string__  <br/>数组字段中元素的数据类型。  |
| __schema[].fields[].isPrimary__ | __boolean__  <br/>当前字段是否是主字段。将其设置为True会使当前字段成为主字段。  |
| __schema[].fields[].isPartitionKey__ | __boolean__  <br/>当前字段是否作为 Partition 键。将其设置为True会使当前字段作为 Partition 键。在这种情况下，MilvusZilliz Cloud 会管理当前 Collection 中的所有 Partition。  |
| __schema[].fields[].elementTypeParams__ | __object__<br/>额外的字段参数。 |
| __schema[].fields[].elementTypeParams.max_length__ | __integer__  <br/>VarChar值的可选参数，确定当前字段中值的最大长度。  |
| __schema[].fields[].elementTypeParams.dim__ | __integer__  <br/>FloatVector或BinaryVector字段的可选参数，确定向量维度。  |
| __schema[].fields[].elementTypeParams.max_capacity__ | __integer__  <br/>数组字段值的可选参数，确定当前数组字段中元素的最大数量。  |
| __indexParams__ | __array__<br/>应用于索引构建过程的参数。 |
| __indexParams[]__ | __object__<br/> |
| __indexParams[].metricType__ | __string__  <br/>用于构建索引的相似性度量类型。<br/>The value defaults to COSINE  |
| __indexParams[].fieldName__ | __string__  <br/>要创建索引的目标字段的名称。  |
| __indexParams[].indexName__ | __string__  <br/>要创建的索引的名称，该值默认为目标字段名称。  |
| __indexParams[].params__ | __object__<br/>索引类型及相关设置。详细信息，请参阅[向量索引](https://milvus.io/docs/index.md)。 |
| __indexParams[].params.index_type__ | __string__  <br/>要创建的索引类型  |
| __params__ | __object__<br/>Collection 的额外参数。 |
| __params.max_length__ | __integer__  <br/>VarChar 字段中的最大字符数。当当前字段类型为 VarChar 时，此参数是必填的。  |
| __params.enableDynamicField__ | __boolean__  <br/>是否启用保留的动态字段。如果设置为 true，非模式定义的字段将作为键值对保存在保留的动态字段中。  |
| __params.shardsNum__ | __integer__  <br/>与当前 Collection 一起创建的分片数量。  |
| __params.consistencyLevel__ | __integer__  <br/>Collection 的一致性级别。可能的值是 __STRONG__、__BOUNDED__、__SESSION__ 和 __EVENTUALLY__。  |
| __params.partitionsNum__ | __integer__  <br/>与当前 Collection 一起创建的 Partition 数量。如果 Collection 的一个字段已被指定为 Partition 键，则此参数是必填的。  |
| __params.ttlSeconds__ | __integer__  <br/>Collection 的生存时间（TTL）周期。如果设置，一旦周期结束， Collection 将被删除。  |

## 响应

返回一个 Collection 对象。

### 响应体

```json
{
    "code": "integer",
    "data": {}
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |

### 错误响应

```json
{
    "code": integer,
    "message": string
}
```

| 属性名称    | 属性描述                                                                                                                                    |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__    | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __message__ | **string**<br/>表示错误信息。                                                                        |
