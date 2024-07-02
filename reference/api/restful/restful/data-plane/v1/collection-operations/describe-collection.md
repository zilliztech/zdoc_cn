---
displayed_sidebar: restfulSidebar
sidebar_position: 21
slug: /restful/describe-collection
title: 查看 Collection 详情
---

import RestHeader from '@site/src/components/RestHeader';

描述 Collection 的详细信息。

<RestHeader method="get" endpoint="https://${CLUSTER_ENDPOINT}/v1/vector/collections/describe" />

---

## 示例




:::info 说明

您可以使用以下任一方式完成鉴权：

- 拥有相应权限的 [API 密钥](/docs/manage-api-keys)。
- 目标集群的用户名和密码，中间用冒号分隔。例如，`username:p@ssw0rd`。

:::

```shell
curl --request GET \
     --url "${CLUSTER_ENDPOINT}/v1/vector/collections/describe?collectionName=medium_articles" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
        "collectionName": "string",
        "description": "string",
        "fields": [
            {
                "autoId": true,
                "description": "string",
                "name": "string",
                "primaryKey": true,
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
        "shardsNum": 0,
        "enableDynamicField": true
    }
}
```




## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|

- 无路径参数。

- 无请求头参数

### 请求体

No request body required

## 响应

返回指定 Collection 的详细信息。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "collectionName": "string",
        "description": "string",
        "fields": [
            {
                "autoId": "boolean",
                "description": "string",
                "name": "string",
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
        "shardsNum": "integer",
        "enableDynamicField": "boolean"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.collectionName__ | __string__  <br/>Collection 名称。  |
| __data.description__ | __string__  <br/>（可选）Collection 描述信息。  |
| __data[].fields__ | __array__<br/>字段数组。 |
| __data[].fields[]__ | __object__<br/> |
| __data[].fields[].autoId__ | __boolean__  <br/>是否为主键启用自动 ID。  |
| __data[].fields[].description__ | __string__  <br/>（可选）字段描述。  |
| __data[].fields[].name__ | __string__  <br/>字段名称。  |
| __data[].fields[].primaryKey__ | __boolean__  <br/>是否为主键。  |
| __data[].fields[].type__ | __string__  <br/>该字段的数据类型。  |
| __data[].indexes__ | __array__<br/>索引数组。 |
| __data[].indexes[]__ | __object__<br/> |
| __data[].indexes[].fieldName__ | __string__  <br/>索引字段名称。  |
| __data[].indexes[].indexName__ | __string__  <br/>生成的索引文件名称。  |
| __data[].indexes[].metricType__ | __string__  <br/>索引类型。  |
| __data.load__ | __string__  <br/>Collection 的加载状态。有效值：**未加载**、**加载中**和**已加载**。  |
| __data.shardsNum__ | __integer__  <br/>Collection 的分片数量。  |
| __data.enableDynamicField__ | __boolean__  <br/>Collection 是否启用了动态 Schema。  |

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
