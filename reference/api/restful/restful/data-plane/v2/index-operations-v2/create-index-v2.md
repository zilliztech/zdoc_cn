---
displayed_sidebar: restfulSidebar
sidebar_position: 52
slug: /restful/create-index-v2
title: 创建索引
---

import RestHeader from '@site/src/components/RestHeader';

这为目标字段创建了一个命名索引，可以是向量字段或标量字段。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "custom_setup_not_indexed",
    "indexParams": [
        {
            "metricType": "L2",
            "fieldName": "my_vector",
            "indexName": "my_vector",
            "indexConfig": {
                "index_type": "IVF_FLAT",
                "nlist": "1024"
            }
        }
    ]
}'
```
可能的响应类似于以下内容：
```json
{
    "code": 0,
    "data": {}
}
```



## 请求

### 参数

- 无查询参数。

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间。
将其设置为None表示此操作在收到任何响应或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "indexParams": [
        {
            "metricType": "string",
            "fieldName": "string",
            "indexName": "string",
            "params": {
                "index_type": "string"
            }
        }
    ]
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>Collection 所属的数据库名称。<br/>设置为不存在的数据库将导致错误。  |
| __collectionName__ | __string__  <br/>目标 Collection 的名称。<br/>设置为不存在的 Collection 将导致错误。  |
| __indexParams__ | __array__<br/>应用于索引构建过程的参数。 |
| __indexParams[]__ | __object__<br/> |
| __indexParams[].metricType__ | __string__  <br/>用于构建索引的相似性度量类型。<br/>The value defaults to COSINE  |
| __indexParams[].fieldName__ | __string__  <br/>要创建索引的目标字段名称。  |
| __indexParams[].indexName__ | __string__  <br/>要创建的索引的名称，该值默认为目标字段名称。  |
| __indexParams[].params__ | __object__<br/>索引类型及相关信息。详细信息，请参阅 [向量索引](https://milvus.io/docs/index.md)。 |
| __indexParams[].params.index_type__ | __string__  <br/>要创建的索引类型  |

## 响应

一个状态对象，指示此操作是否成功。

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
