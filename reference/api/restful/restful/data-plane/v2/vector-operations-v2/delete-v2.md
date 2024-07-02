---
displayed_sidebar: restfulSidebar
sidebar_position: 29
slug: /restful/delete-v2
title: 删除
---

import RestHeader from '@site/src/components/RestHeader';

此操作通过它们的ID或使用布尔表达式来删除 Entity 。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/delete" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup",
    "filter": "id in [0,1]"
}'
```

可能的响应类似于以下内容。
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
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间。
将其设置为None表示此操作在收到任何响应或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "filter": "string",
    "partitionName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>目标数据库的名称。  |
| __collectionName__ | __string__  <br/>现有 Collection 的名称。  |
| __filter__ | __string__  <br/>用于筛选匹配 Entity 的标量过滤条件。   该值默认为空字符串，表示不应用任何条件。同时设置**id**和**filter**会导致错误。<br/>您可以将此参数设置为空字符串以跳过标量过滤。构建标量过滤条件时，请参阅[布尔表达式规则](https://milvus.io/docs/boolean.md)。  |
| __partitionName__ | __string__  <br/>当前 Collection 中的一个 Partition 的名称。<br/>如果指定，数据将从指定的 Partition 中删除。  |

## 响应

包含已删除 Entity 数量的字典。

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
