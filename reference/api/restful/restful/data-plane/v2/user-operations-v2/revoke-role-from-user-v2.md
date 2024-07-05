---
displayed_sidebar: restfulSidebar
sidebar_position: 62
slug: /restful/revoke-role-from-user-v2
title: 从用户撤销角色
---

import RestHeader from '@site/src/components/RestHeader';

此操作撤销授予当前角色的权限。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/users/revoke_role" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/users/revoke_role" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "roleName": "admin",
    "userName": "milvusAdmin"
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
    | __Authorization__  | **string**<br/>然后认证令牌|

### 请求体

```json
{
    "userName": "string",
    "roleName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __userName__ | __string__  <br/>目标用户的名称。该值应以字母开头，并且只能包含下划线、字母和数字。  |
| __roleName__ | __string__  <br/>目标角色的名称。  |

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
