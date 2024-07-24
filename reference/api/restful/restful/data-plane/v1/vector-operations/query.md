---
displayed_sidebar: restfulSidebar
sidebar_position: 55
slug: /restful/query
title: 按条件查询
---

import RestHeader from '@site/src/components/RestHeader';

在 Collection 的指定标题列上按指定条件执行查询操作。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v1/vector/query" />

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

- 无请求头参数

### 请求体

```json
{
    "collectionName": "string",
    "filter": "string",
    "limit": "integer",
    "offset": "integer",
    "outputFields": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __filter__ | __string__  <br/>查询时使用的过滤条件。  |
| __limit__ | __integer__  <br/>要返回的最大 Entity 数。<br/>本参数值和 `offset` 参数值的和不能大于 **16384**。<br/>The value defaults to 100<br/>The value ranges from 1 to 100.  |
| __offset__ | __integer__  <br/>表示从第几个 Entity 开始返回搜索结果。<br/>本参数值和 `limit` 参数值的和不能大于 **16384**。<br/>The value is less than or equal to 16384.  |
| __outputFields__ | __array__<br/>返回字段，以数组形式表示。 |
| __outputFields[]__ | __string__  <br/>  |

## 响应

返回查询结果。

### 响应体

```json
{
    "code": "integer",
    "data": [
        {}
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __object__<br/> |

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
