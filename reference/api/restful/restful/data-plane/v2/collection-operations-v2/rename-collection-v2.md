---
displayed_sidebar: restfulSidebar
sidebar_position: 33
slug: /restful/rename-collection-v2
title: 重命名 Collection
---

import RestHeader from '@site/src/components/RestHeader';

此操作重命名一个现有 Collection，并可选择将 Collection 移动到一个新的数据库中。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default",
    "collectionName": "test_collection",
    "newCollectionName": "quick_setup"
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
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间，单位为秒。将其设置为None表示此操作在收到任何响应或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "newDbName": "string",
    "newCollectionName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>Collection 所属的数据库名称。<br/>将其设置为一个不存在的数据库将导致错误。  |
| __collectionName__ | __string__  <br/>目标 Collection 的名称。<br/>将其设置为一个不存在的 Collection 将导致错误。  |
| __newDbName__ | __string__  <br/>此操作后 Collection 所属的数据库名称。<br/>该值默认为**default**。将其设置为一个数据库而不是 Collection 在此操作前所属的数据库将移动该 Collection 到指定的数据库。
将其设置为一个不存在的数据库将导致错误。  |
| __newCollectionName__ | __string__  <br/>此操作后目标 Collection 的名称。<br/>将其设置为**old_collection_name**的值将导致错误。  |

## 响应

无

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
