---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /drop-collection
title: 删除 Collection
---

import RestHeader from '@site/src/components/RestHeader';

删除 Collection。本操作会清除 Collection 数据，请谨慎执行此操作。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v1/vector/collections/drop" />

---

## 示例


:::info 说明

您可以使用以下任一方式完成鉴权：

- 拥有相应权限的 [API 密钥](/docs/manage-api-keys)。
- 目标集群的用户名和密码，中间用冒号分隔。例如，`username:p@ssw0rd`。

:::

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/collections/drop" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
        "collectionName": "medium_articles"
      }'
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {}
}
```


## 请求

### 参数

- 无查询参数。

- 无路径参数。

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|

## 响应

返回空对象。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {}
}
```

- 处理请求失败后返回

```json
{
    "code": integer,
    "message": string
}
```

### 属性

下表罗列了响应包含的所有属性。

| 属性名称  | 属性描述                                                                                                                               |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br/>表示请求是否成功。<br/><ul><li>`200`：请求成功。</li><li>其它：存在错误。</li></ul> |
| `data`    | **object**<br/>表示响应中携带的数据对象。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Cluster not exist or you don't have permission. |
| 80022 | Dedicated cluster not support this operation. |
| 90001 | The collection xxx does not exist. You can use ListCollections to view the list of existing collections. |
| 90011 | Invalid CollectionName. Reason: Name contains only alphanumeric letters and underscores |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90138 | No drop collection content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx |

