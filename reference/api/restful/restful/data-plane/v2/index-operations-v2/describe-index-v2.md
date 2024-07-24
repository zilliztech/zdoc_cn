---
displayed_sidebar: restfulSidebar
sidebar_position: 22
slug: /restful/describe-index-v2
title: 查看索引详情
---

import RestHeader from '@site/src/components/RestHeader';

此操作描述当前索引。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/indexes/describe" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/indexes/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "indexName": "vector",
    "collectionName": "quick_setup"
}'
```
可能的响应类似于以下内容：
```json
{
    "code": 0,
    "data": [
        {
            "failReason": "",
            "fieldName": "vector",
            "indexName": "vector",
            "indexState": "Finished",
            "indexType": "AUTOINDEX",
            "indexedRows": 0,
            "metricType": "COSINE",
            "pendingRows": 0,
            "totalRows": 0
        }
    ]
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
    "collectionName": "string",
    "indexName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>索引所属的 Collection 名称。  |
| __indexName__ | __string__  <br/>要描述的索引的名称。  |

## 响应

包含当前索引详细描述的对象。

### 响应体

```json
{
    "code": "integer",
    "data": [
        {
            "fieldName": "string",
            "indexName": "string",
            "indexState": "string",
            "indexType": "string",
            "indexedRows": "integer",
            "metricType": "string",
            "pendingRows": "integer",
            "totalRows": "integer",
            "failReason": "string"
        }
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __object__<br/> |
| __data[].fieldName__ | __string__  <br/>目标字段的名称。  |
| __data[].indexName__ | __string__  <br/>索引的名称。  |
| __data[].indexState__ | __string__  <br/>索引进度的状态。  |
| __data[].indexType__ | __string__  <br/>此索引的类型。  |
| __data[].indexedRows__ | __integer__  <br/>已索引的行的总数。  |
| __data[].metricType__ | __string__  <br/>度量类型的类型。  |
| __data[].pendingRows__ | __integer__  <br/>等待被索引的行数。  |
| __data[].totalRows__ | __integer__  <br/>Entity /行的总数。  |
| __data[].failReason__ | __string__  <br/>构建索引失败的原因。  |

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
