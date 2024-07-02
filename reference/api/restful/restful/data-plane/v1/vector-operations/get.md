---
displayed_sidebar: restfulSidebar
sidebar_position: 28
slug: /restful/get
title: 按 ID 查询
---

import RestHeader from '@site/src/components/RestHeader';

在 Collection 按指定 ID 返回对应的 Entity。根据实际情况不同，指定的 ID 可能为一个字符串、一个整数、一个字符串列表或一个整数列表等多种形式。具体可参见下方示例中罗列的四种情况。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v1/vector/get" />

---

## 示例




:::info 说明

您可以使用以下任一方式完成鉴权：

- 拥有相应权限的 [API 密钥](/docs/manage-api-keys)。
- 目标集群的用户名和密码，中间用冒号分隔。例如，`username:p@ssw0rd`。

:::

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

- 无路径参数。

- 无请求头参数

### 请求体

#### 选项 1: 

```json
{
    "collectionName": "string",
    "outputFields": [],
    "id": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __outputFields__ | __array__<br/>返回字段，以数组形式表示。 |
| __outputFields[]__ | __string__  <br/>  |
| __id__ | __string__  <br/>待查询的 Entity ID。  |

#### 选项 2: 

```json
{
    "collectionName": "string",
    "outputFields": [],
    "id": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __outputFields__ | __array__<br/>目标集群名称。 |
| __outputFields[]__ | __string__  <br/>  |
| __id__ | __array__<br/>一组待查询的 Entity ID。 |
| __id[]__ | __string__  <br/>每个 ID 都代表一个 Entity。  |

#### 选项 3: 

```json
{
    "collectionName": "string",
    "outputFields": [],
    "id": "integer"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __outputFields__ | __array__<br/>返回字段，以数组形式表示。 |
| __outputFields[]__ | __string__  <br/>  |
| __id__ | __integer__  <br/>待查询的 Entity ID。  |

#### 选项 4: 

```json
{
    "collectionName": "string",
    "outputFields": [],
    "id": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __outputFields__ | __array__<br/>返回字段，以数组形式表示。 |
| __outputFields[]__ | __string__  <br/>  |
| __id__ | __array__<br/>一组待查询的 Entity ID。 |
| __id[]__ | __integer__  <br/>  |

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
