---
displayed_sidebar: restfulSidebar
sidebar_position: 31
slug: /restful/describe-role-v2
title: 查看角色详情
---

import RestHeader from '@site/src/components/RestHeader';

此操作描述指定角色的详细信息。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/roles/describe" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/roles/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "roleName": "readOnly"
}'
```
可能的响应类似于以下内容。
```json
{
    "code": 0,
    "data": [
        {
             "objectType": "Collection",
             "objectName": "*",
             "privilege": "Search",
             "roleName": "readOnly"
        }
    ]
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
    "roleName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __roleName__ | __string__  <br/>角色的名称。  |

## 响应

包含角色详细描述的对象。

### 响应体

```json
{
    "code": "integer",
    "data": [
        {
            "object_type": "string",
            "privilege": "string",
            "object_name": "string",
            "db_name": "string",
            "grantor": "string"
        }
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/>特权项列表。 |
| __data[]__ | __object__<br/> |
| __data[].object_type__ | __string__  <br/>特权所属对象的类型。  |
| __data[].privilege__ | __string__  <br/>授予角色的特权。  |
| __data[].object_name__ | __string__  <br/>授予角色指定特权的对象名称。  |
| __data[].db_name__ | __string__  <br/>已执行此操作的数据库的名称。  |
| __data[].grantor__ | __string__  <br/>授予用户特定角色的用户名称。  |

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
