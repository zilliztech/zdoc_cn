---
displayed_sidebar: restfulSidebar
sidebar_position: 22
slug: /restful/drop-collection
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

- 无请求头参数

### 请求体

```json
{
    "collectionName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |

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
