---
displayed_sidebar: restfulSidebar
sidebar_position: 63
slug: /restful/revoke-privilege-from-role-v2
title: 从角色撤销权限
---

import RestHeader from '@site/src/components/RestHeader';

此操作撤销授予当前角色的权限。

> 注意
> - 要完成此操作，您需要在您的 Milvus 实例上启用身份验证。有关详细信息，请参阅[用户访问认证](https://milvus.io/docs/authenticate.md)。
> - 要了解更多关于权限和角色对象的信息，请参阅[用户和角色](https://milvus.io/docs/users_and_roles.md)

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/roles/revoke_privilege" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/roles/revoke_privilege" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "objectType": "Collection",
    "objectName": "*",
    "privilege": "Search",
    "roleName": "readOnly"
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
将其设置为 None 表示此操作在任何响应到达或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "roleName": "string",
    "objectType": "string",
    "objectName": "string",
    "privilege": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __roleName__ | __string__  <br/>角色的名称。  |
| __objectType__ | __string__  <br/>权限所属对象的类型。  |
| __objectName__ | __string__  <br/>被授予指定权限的角色所对应的对象的名称。  |
| __privilege__ | __string__  <br/>授予角色的权限。  |

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
