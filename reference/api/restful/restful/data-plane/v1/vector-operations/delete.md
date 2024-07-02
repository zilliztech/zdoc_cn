---
displayed_sidebar: restfulSidebar
sidebar_position: 23
slug: /restful/delete
title: 删除 Entity
---

import RestHeader from '@site/src/components/RestHeader';

从 Collection 中删除一个或多条数据。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v1/vector/delete" />

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

- 无请求头参数

### 请求体

#### 选项 1: 

```json
{
    "collectionName": "string",
    "id": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __id__ | __string__  <br/>目标 Entity ID。  |

#### 选项 2: 

```json
{
    "collectionName": "string",
    "id": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __id__ | __array__<br/>一组 Entity ID。 |
| __id[]__ | __string__  <br/>  |

#### 选项 3: 

```json
{
    "collectionName": "string",
    "id": "integer"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __id__ | __integer__  <br/>目标 Entity ID。  |

#### 选项 4: 

```json
{
    "collectionName": "string",
    "id": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __id__ | __array__<br/>一组 Entity ID。 |
| __id[]__ | __integer__  <br/>  |

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
