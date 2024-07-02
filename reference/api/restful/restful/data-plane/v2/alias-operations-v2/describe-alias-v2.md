---
displayed_sidebar: restfulSidebar
sidebar_position: 70
slug: /restful/describe-alias-v2
title: 查看 Alias 详情
---

import RestHeader from '@site/src/components/RestHeader';

此操作描述特定 Alias 的详细信息。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/aliases/describe" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/aliases/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw  '{
    "aliasName": "bob"
}'
```
可能的响应类似于以下内容
```shell
{
    "code": 0,
    "data": {
        "aliasName": "bob",
        "collectionName": "quick_setup",
        "dbName": "default"
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
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间（以秒为单位）。将其设置为无表示此操作在任何响应到达或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "aliasName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>Collection 所属的数据库的名称。  |
| __aliasName__ | __string__  <br/>要列出其详细信息的 Alias 的名称。  |

## 响应

包含 Alias 详细描述的 Alias 对象。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "dbName": "string",
        "collectionName": "string",
        "aliasName": "string"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.dbName__ | __string__  <br/>Collection 所属数据库的名称。  |
| __data.collectionName__ | __string__  <br/>Alias 所属的 Collection 的名称。  |
| __data.aliasName__ | __string__  <br/>Alias 的名称。  |

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
