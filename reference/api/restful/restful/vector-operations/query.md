---
displayed_sidebar: restfulSidebar
sidebar_position: 27
slug: /restful/query
title: 按条件查询
---

import RestHeader from '@site/src/components/RestHeader';

在 Collection 的指定标题列上按指定条件执行查询操作。

<RestHeader method="post" endpoint="https://{cluster-endpoint}/v1/vector/query" />

---

## 示例


:::info 说明

您可以使用以下任一方式完成鉴权：

- 拥有相应权限的 [API 密钥](/docs/manage-api-keys)。
- 目标集群的用户名和密码，中间用冒号分隔。例如，`username:p@ssw0rd`。

:::

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/query" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "collectionName": "medium_articles",
       "outputFields": ["id", "title", "link"],
       "filter": "id in [443300716234671427, 443300716234671426]",
       "limit": 100,
       "offset": 0
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
    "partitionNames": [],
    "filter": "string",
    "limit": "integer",
    "offset": "integer",
    "outputFields": []
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | string  <br/>当前操作的 Collection 所属的数据库名称。可选参数，默认值为**defalut**。  |
| __collectionName__ | string  <br/>目标 Collection 名称。  |
| __partitionNames__ | array<br/>当前操作的目标 Partition。可选参数，默认值为**default**。 |
| __partitionNames[]__ | string  <br/>PartitionName  |
| __filter__ | string  <br/>查询时使用的过滤条件。  |
| __limit__ | integer  <br/>要返回的最大 Entity 数。<br/>本参数值和 `offset` 参数值的和不能大于 **16384**。<br/>The value defaults to 100<br/>The value ranges from 1 to 100.  |
| __offset__ | integer  <br/>表示从第几个 Entity 开始返回搜索结果。<br/>本参数值和 `limit` 参数值的和不能大于 **16384**。<br/>The value is less than or equal to 16384.  |
| __outputFields__ | array<br/>返回字段，以数组形式表示。 |
| __outputFields[]__ | string  <br/>  |

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
| __code__ | integer  <br/>  |
| __data__ | array<br/> |
| __data[]__ | object<br/> |
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
| 90004 | The parameter value for 'limit' should be between 1 and 100. |
| 90005 | The parameter value for 'offset' should not be less than 0. |
| 90011 | Invalid CollectionName. Reason: Name contains only alphanumeric letters and underscores |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90110 | No filter key field. |
| 90134 | No query content provided. |
| 90139 | Type mismatch for field 'xxx'. expected type:xxx |

