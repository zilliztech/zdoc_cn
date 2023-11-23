---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /insert
title: 插入 Entity
---

import RestHeader from '@site/src/components/RestHeader';

在 Collection 中插入一条或多条 Entity。一次最多插入 100 条数据。如需插入大量数据，请使用 [Bulk Insert API](https://docs.zilliz.com.cn/docs/data-import)。

<RestHeader method="post" endpoint="https://{cluster_endpoint}/v1/vector/insert" />

---

## 示例

# RESTful API Examples


## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `public-endpoint`  | **string**（必选）<br/>目标集群的 Endpoint。|

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
| `collectionName`  | **string**（必选）<br/>待插入 Entity 的 Collection 名称。|
| `data`  | **object**（必选）<br/>Entity 对象。Entity 的键应该和 Collection 的 Schema 相匹配。|

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
| `collectionName`  | **string**（必选）<br/>待插入 Entity 的 Collection 名称。|
| `data`  | **array**（必选）<br/>以数组来表示的多个 Entity 对象。Entity 的键应该和 Collection 的 Schema 相匹配。|

## 响应

返回插入的 Entity 数量和 Entity ID。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "insertCount": "integer",
        "insertIds": [
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
| `data.insertCount`   | **integer**<br/>插入的 Entity 数量。 |
| `data.insertIds`   | **array**<br/>以数组来表示的插入的 Entity ID。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Invalid clusterId or you do not have permission to access that Cluster. |
| 80022 | Dedicated cluster not support this operation. |
| 90001 | The collection xxx does not exist. You can use ListCollections to view the list of existing collections. |
| 90010 | "The type of field xxx does not match |
| 90011 | Invalid CollectionName. Reason: Name contains only alphanumeric letters and underscores |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90107 | Can not assign primary field data when auto id enabled int64 |
| 90108 | Extraneous fields xxx in the json file need to be removed |
| 90109 | The max insert batch rows should below 100. |
| 90111 | The parameter value for 'level' should be between 1 and 3. |
| 90115 | The number of columns inserted does not match the defined number of columns in the set. |
| 90118 | "no data key field |
| 90119 | The value of the 'data' parameter should be in JSON format. |
| 90120 | The value of the 'data' parameter is empty. |
| 90121 | There is an empty object in the 'data' parameter. |
| 90131 | No insert content provided. |
| 90139 | "Type mismatch for field 'xxx'. expected type:xxx |

