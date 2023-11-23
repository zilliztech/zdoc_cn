---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /search
title: 搜索
---

import RestHeader from '@site/src/components/RestHeader';

在 Collection 的向量列上执行相似性搜索。

<RestHeader method="post" endpoint="https://{cluster_endpoint}/v1/vector/search" />

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
    "filter": "string",
    "limit": "integer",
    "offset": "integer",
    "outputFields": [
        {}
    ],
    "vector": [
        {}
    ],
    "params": {
        "radius": "number",
        "range_filter": "number"
    }
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `dbName`  | **string**<br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。|
| `collectionName`  | **string**（必选）<br/>目标 Collection 名称。|
| `filter`  | **string**<br/>用于搜索的过滤条件。|
| `limit`  | **integer**<br/>要返回的最大 Entity 数。<br/>本参数值和 `offset` 参数值的和不能大于 **1024**。<br/>默认值为 **100**.<br/>参数取值在 **1** 和 **100** 之间.|
| `offset`  | **integer**<br/>表示从第几个 Entity 开始返回搜索结果。<br/>本参数值和 `limit` 参数值的和不能大于 **1024**。<br/>最大值为 **1024**.|
| `outputFields`  | **array**<br/>返回字段，以数组形式表示。|
| `vector`  | **array (number \[float32\])**（必选）<br/>浮点类型的查询向量。|
| `params`  | **object**<br/>查询参数|
| `params.radius`  | **number(float64)**<br/>最不相似近邻在向量空间中所处方位角度。通过指定该参数来指定检索范围。|
| `params.range_filter`  | **number(float64)**<br/>和`radius`参数一同使用来过滤出落指定查询向量在指定范围内的近邻。|

## 响应

返回相似性查询结果。

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
| 80020 | Invalid clusterId or you do not have permission to access that Cluster. |
| 80022 | Dedicated cluster not support this operation. |
| 90001 | The collection xxx does not exist. You can use ListCollections to view the list of existing collections. |
| 90002 | The return value property xxx does not exist on collection xxx. |
| 90004 | The parameter value for 'limit' should be between 1 and 100. |
| 90005 | The parameter value for 'offset' should not be less than 0. |
| 90006 | "The attribute xxx is not of vector type |
| 90007 | "The vector dimensions do not match on the field xxx. The input vector has a dimension of xxx |
| 90011 | Invalid CollectionName. Reason: Name contains only alphanumeric letters and underscores |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90110 | No filter key field. |
| 90111 | The parameter value for 'level' should be between 1 and 3. |
| 90115 | The number of columns inserted does not match the defined number of columns in the set. |
| 90125 | No vector key field. |
| 90126 | The sum of the 'offset' parameter value and the 'limit' parameter value should not exceed 16384. |
| 90135 | No search content provided. |
| 90139 | "Type mismatch for field 'xxx'. expected type:xxx |

