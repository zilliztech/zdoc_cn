---
displayed_sidebar: restfulSidebar
sidebar_position: 20
slug: /restful/create-collection
title: 创建 Collection
---

import RestHeader from '@site/src/components/RestHeader';

在集群中创建 Collection。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v1/vector/collections/create" />

---

## 示例




:::info 说明

您可以使用以下任一方式完成鉴权：

- 拥有相应权限的 [API 密钥](/docs/manage-api-keys)。
- 目标集群的用户名和密码，中间用冒号分隔。例如，`username:p@ssw0rd`。

:::

```shell
curl --request POST \
     --url "${CLUSTER_ENDPOINT}/v1/vector/collections/create" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "dbName": "default",   
       "collectionName": "medium_articles",
       "dimension": 256,
       "metricType": "L2",
       "primaryField": "id",
       "vectorField": "vector"
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

- 无请求头参数

### 请求体

```json
{
    "collectionName": "string",
    "dimension": "integer",
    "metricType": "string",
    "primaryField": "string",
    "vectorField": "string",
    "description": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>待创建的 Collection 名称。 <zilliz>此参数仅适用于 Dedicated 集群。</zilliz>  |
| __dimension__ | __integer__  <br/>指定 Collection 的向量维度。<br/>The value ranges from 1 to 32768.  |
| __metricType__ | __string__  <br/>指定 Collection 的距离度量类型。<br/>The value defaults to L2  |
| __primaryField__ | __string__  <br/>主键字段。<br/>The value defaults to id  |
| __vectorField__ | __string__  <br/>向量字段。<br/>The value defaults to vector  |
| __description__ | __string__  <br/>Collection 描述信息。  |

## 响应

返回空对象。

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
