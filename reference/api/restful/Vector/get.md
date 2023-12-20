---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /get
title: 按 ID 查询
---

import RestHeader from '@site/src/components/RestHeader';

在 Collection 按指定 ID 返回对应的 Entity。根据实际情况不同，指定的 ID 可能为一个字符串、一个整数、一个字符串列表或一个整数列表等多种形式。具体可参见下方示例中罗列的四种情况。

<RestHeader method="post" endpoint="https://{cluster_endpoint}/v1/vector/get" />

---

## 示例


- 获取一个 ID 为整数的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": 1
     }'
```

- 获取一个 ID 为字符串的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": "id1"
     }'
```

- 获取一组 ID 为整数的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": [1, 2]
     }'
```

- 获取一组 ID 为字符串的 Entity.

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/get" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d "{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "id": ["id1", "id2"]
     }"
```


## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "partitionNames": [
        {}
    ],
    "outputFields": [
        {}
    ],
    "id": "string"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|
| `partitionNames`  | **array**<br/>当前操作的目标 Partition。可选参数，默认值为**default**。|
| `outputFields`  | **array**<br/>返回字段，以数组形式表示。|
| `id`  | **string**（必选）<br/>待查询的 Entity ID。|

```json
{
    "dbName": "string",
    "collectionName": "string",
    "outputFields": [
        {}
    ],
    "id": [
        {}
    ]
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|
| `outputFields`  | **array**<br/>目标集群名称。|
| `id`  | **array**（必选）<br/>一组待查询的 Entity ID。|

```json
{
    "dbName": "string",
    "collectionName": "string",
    "outputFields": [
        {}
    ],
    "id": "integer"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|
| `outputFields`  | **array**<br/>返回字段，以数组形式表示。|
| `id`  | **integer**（必选）<br/>待查询的 Entity ID。|

```json
{
    "dbName": "string",
    "collectionName": "string",
    "outputFields": [
        {}
    ],
    "id": [
        {}
    ]
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|
| `outputFields`  | **array**<br/>返回字段，以数组形式表示。|
| `id`  | **array**（必选）<br/>一组待查询的 Entity ID。|

## 响应

返回查询结果。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": [
        {}
    ]
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
| `data`  | **array**<br/>表示响应中携带的 object 数组. |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Cluster not exist or you don't have permission. |
| 90001 | The collection xxx does not exist. You can use ListCollections to view the list of existing collections. |
| 90002 | The return value property xxx does not exist on collection xxx. |
| 90011 | Invalid CollectionName. Reason: Name contains only alphanumeric letters and underscores |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90110 | No filter key field. |
| 90133 | No get content provided. |
| 90139 | "Type mismatch for field 'xxx'. expected type:xxx |
| 90140 | The number of elements in parameter 'id' should not exceed 100. |

