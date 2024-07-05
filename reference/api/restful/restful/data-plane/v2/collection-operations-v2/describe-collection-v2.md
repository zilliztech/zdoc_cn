---
displayed_sidebar: restfulSidebar
sidebar_position: 67
slug: /restful/describe-collection-v2
title: 查看 Collection 详情
---

import RestHeader from '@site/src/components/RestHeader';

描述一个 Collection 的详细信息。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/describe" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default",
    "collectionName": "test_collection"
}'
```
可能的输出类似于以下内容:

```json
{
    "code": 0,
    "data": {
        "aliases": [],
        "autoId": false,
        "collectionID": 448707763883002014,
        "collectionName": "test_collection",
        "consistencyLevel": "Bounded",
        "description": "",
        "enableDynamicField": true,
        "fields": [
            {
                "autoId": false,
                "description": "",
                "id": 100,
                "name": "id",
                "partitionKey": false,
                "primaryKey": true,
                "type": "Int64"
            },
            {
                "autoId": false,
                "description": "",
                "id": 101,
                "name": "vector",
                "params": [
                    {
                        "key": "dim",
                        "value": "5"
                    }
                ],
                "partitionKey": false,
                "primaryKey": false,
                "type": "FloatVector"
            }
        ],
        "indexes": [
            {
                "fieldName": "vector",
                "indexName": "vector",
                "metricType": "COSINE"
            }
        ],
        "load": "LoadStateLoaded",
        "partitionsNum": 1,
        "properties": [],
        "shardsNum": 1
    }
}
```



## 请求

### 参数

- 无查询参数。

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间。将其设置为 None 表示此操作在任何响应返回或发生错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>数据库的名称。  |
| __collectionName__ | __string__  <br/>要描述的 Collection 的名称。  |

## 响应

详细返回指定的 Collection。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "aliases": [
            {}
        ],
        "autoID": "boolean",
        "collectionID": "integer",
        "collectionName": "string",
        "consistencyLevel": "string",
        "description": "string",
        "enableDynamicField": "boolean",
        "fields": [
            {
                "autoId": "boolean",
                "description": "string",
                "id": "integer",
                "name": "string",
                "params": [
                    {
                        "key": "string",
                        "value": "string"
                    }
                ],
                "partitionKey": "boolean",
                "primaryKey": "boolean",
                "type": "string"
            }
        ],
        "indexes": [
            {
                "fieldName": "string",
                "indexName": "string",
                "metricType": "string"
            }
        ],
        "load": "string",
        "partitionNum": "integer",
        "properties": [
            {
                "key": "string",
                "value": "string"
            }
        ],
        "shardsNum": "integer"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data[].aliases__ | __array__<br/>分配给 Collection 的 Alias 列表。 |
| __data[].aliases[]__ | __string__  <br/>Collection 的一个别名。  |
| __data.autoID__ | __boolean__  <br/>此 Collection 的主键是否自动递增。  |
| __data.collectionID__ | __integer__ (int64) <br/>创建时分配给 Collection 的 ID。  |
| __data.collectionName__ | __string__  <br/>当前 Collection 的名称。  |
| __data.consistencyLevel__ | __string__  <br/>当前 Collection 的一致性级别。  |
| __data.description__ | __string__  <br/>Collection 的描述。  |
| __data.enableDynamicField__ | __boolean__  <br/>是否启用名为 $meta 的保留动态字段，以保存非模式定义的字段及其值的键值对。  |
| __data[].fields__ | __array__<br/>数组中的 Collection 字段 |
| __data[].fields[]__ | __object__<br/>一个字段对象。 |
| __data[].fields[].autoId__ | __boolean__  <br/>此字段的值是否自动递增。  |
| __data[].fields[].description__ | __string__  <br/>字段的描述。  |
| __data[].fields[].id__ | __integer__  <br/>字段 ID。  |
| __data[].fields[].name__ | __string__  <br/>当前字段的名称。  |
| __data[].fields[][].params__ | __array__<br/>其他字段参数。 |
| __data[].fields[][].params[]__ | __object__<br/>键值对形式的字段参数 |
| __data[].fields[][].params[].key__ | __string__  <br/>字段参数名称。  |
| __data[].fields[][].params[].value__ | __string__  <br/>字段参数值。  |
| __data[].fields[].partitionKey__ | __boolean__  <br/>此字段是否作为 Partition 键。  |
| __data[].fields[].primaryKey__ | __boolean__  <br/>此字段是否作为主键。  |
| __data[].fields[].type__ | __string__  <br/>字段的数据类型。  |
| __data[].indexes__ | __array__<br/>数组形式的已创建索引 |
| __data[].indexes[]__ | __object__<br/>一个索引参数对象 |
| __data[].indexes[].fieldName__ | __string__  <br/>此索引的目标字段。  |
| __data[].indexes[].indexName__ | __string__  <br/>此索引的名称。  |
| __data[].indexes[].metricType__ | __string__  <br/>此索引的度量类型。  |
| __data.load__ | __string__  <br/>当前 Collection 的加载状态。  |
| __data.partitionNum__ | __integer__  <br/>Collection 中的 Partition 数量。  |
| __data[].properties__ | __array__<br/>数组形式的额外 Collection 属性。 |
| __data[].properties[]__ | __object__<br/>键值对中的 Collection 属性对象。 |
| __data[].properties[].key__ | __string__  <br/>属性名称  |
| __data[].properties[].value__ | __string__  <br/>属性值。  |
| __data.shardsNum__ | __integer__  <br/>与 Collection 一起创建的分片数量。  |

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
