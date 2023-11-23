---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /upsert
title: Upsert
---

import RestHeader from '@site/src/components/RestHeader';

插入和更新 Collection 中的记录。

<RestHeader method="post" endpoint="https://{cluster_endpoint}/v1/vector/upsert" />

---

## 示例

# RESTful API Examples


## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `public-endpoint`  | **string**（必选）<br/>|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "data": {}
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>插入操作的目标 Collection。|
| `data`  | **object**（必选）<br/>一个 Entity 对象。注意，每个键值对中的键必须严格对应 Collection 的 Schema。|

```json
{
    "dbName": "string",
    "collectionName": "string",
    "data": [
        {}
    ]
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>插入操作的目标 Collection。|
| `data`  | **array**（必选）<br/>一个以 Entity 对象为成员的列表。注意，对象里每个键值对中的键必须严格对应 Collection 的 Schema。|

## 响应

返回已经插入或更新的记录数量及这些记录的 ID 列表。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "upsertCount": "integer",
        "upsertIds": [
            {}
        ]
    }
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
| `data.upsertCount`   | **integer**<br/>已经插入或更新的记录数量。 |
| `data.upsertIds`   | **array**<br/>已经插入或更新的记录 ID 列表。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 90148 | undefined |
| 90149 | Type mismatch for field '%s'. expected type:%s |
| 90150 | no data key field |
| 90151 | The value of the 'data' parameter is empty. |
| 90152 | There is an empty object in the 'data' parameter. |

