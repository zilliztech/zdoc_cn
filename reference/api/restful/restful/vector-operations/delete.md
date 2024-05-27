---
displayed_sidebar: restfulSidebar
sidebar_position: 23
slug: /restful/delete
title: 删除 Entity
---

import RestHeader from '@site/src/components/RestHeader';

从 Collection 中删除一个或多条数据。

<RestHeader method="post" endpoint="https://{cluster-endpoint}/v1/vector/delete" />

---

## 示例


:::info 说明

您可以使用以下任一方式完成鉴权：

- 拥有相应权限的 [API 密钥](/docs/manage-api-keys)。
- 目标集群的用户名和密码，中间用冒号分隔。例如，`username:p@ssw0rd`。

:::

- 删除一个 ID 为整数的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/delete" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "id": 1
     }'
```

- 删除一个 ID 为字符串的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/delete" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "id": "id1"
     }'
```

- 删除一组 ID 为整数的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/delete" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
        "collectionName": "medium_articles",
        "id": [1,2,3,4]
      }'
```

- 删除一组 ID 为字符串的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/delete" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
        "collectionName": "medium_articles",
        "id": ["id1", "id2", "id3","id4"]
      }'
```


## 请求

### 参数

- 无查询参数。

- 无路径参数。

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "id": "string"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | string  <br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。  |
| __collectionName__ | string  <br/>目标 Collection 名称。  |
| __id__ | string  <br/>目标 Entity ID。  |

```json
{
    "dbName": "string",
    "collectionName": "string",
    "id": []
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | string  <br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。  |
| __collectionName__ | string  <br/>目标 Collection 名称。  |
| __id__ | array<br/>一组 Entity ID。 |
| __id[]__ | string  <br/>  |

```json
{
    "dbName": "string",
    "collectionName": "string",
    "id": "integer"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | string  <br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。  |
| __collectionName__ | string  <br/>目标 Collection 名称。  |
| __id__ | integer  <br/>目标 Entity ID。  |

```json
{
    "dbName": "string",
    "collectionName": "string",
    "id": []
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | string  <br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。  |
| __collectionName__ | string  <br/>目标 Collection 名称。  |
| __id__ | array<br/>一组 Entity ID。 |
| __id[]__ | integer  <br/>  |

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
| __code__ | integer  <br/>  |
| __data__ | object<br/> |
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
| 90110 | No filter key field. |
| 90123 | The inputted ID value does not match the field xxx |
| 90124 | no id key field |
| 90127 | Please use xxx in (a |
| 90128 | Not contains data to filter |
| 90129 | Filter dataType not support |
| 90132 | No delete content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx |
| 90140 | The number of elements in parameter 'id' should not exceed 100. |

