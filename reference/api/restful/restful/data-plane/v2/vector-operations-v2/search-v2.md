---
displayed_sidebar: restfulSidebar
sidebar_position: 37
slug: /restful/search-v2
title: 搜索
---

import RestHeader from '@site/src/components/RestHeader';

此操作执行向量相似性搜索，可选择使用标量过滤表达式。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "limit": 3,
    "outputFields": [
        "color"
    ]
}'
```
可能的响应类似于以下内容。
```json
{
    "code": 0,
    "data": [
        {
            "color": "pink_8682",
            "distance": 1,
            "id": 0
        },
        {
            "color": "red_7025",
            "distance": 0.6290165,
            "id": 1
        },
        {
            "color": "red_4794",
            "distance": 0.5975797,
            "id": 4
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
    "dbName": "string",
    "collectionName": "string",
    "data": [],
    "annsField": "string",
    "filter": "string",
    "limit": "integer",
    "offset": "integer",
    "groupingField": "string",
    "outputFields": [],
    "searchParams": {
        "metricType": "string",
        "params": {
            "radius": "integer",
            "range_filter": "integer"
        }
    },
    "partitionNames": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>数据库的名称。  |
| __collectionName__ | __string__  <br/>此操作适用的 Collection 的名称。  |
| __data__ | __array__<br/>向量嵌入的列表。<br/><include target="milvus">Milvus</include><include target="zilliz">Zilliz Cloud</include> 搜索与指定向量嵌入最相似的向量嵌入。 |
| __data[]__ | __number__ (float32) <br/>向量嵌入  |
| __annsField__ | __string__  <br/>向量字段的名称。  |
| __filter__ | __string__  <br/>用于查找搜索匹配项的过滤器。  |
| __limit__ | __integer__  <br/>要返回的 Entity 总数。<br/>您可以将此参数与 **offset** 结合使用以启用分页。
此值与 **param** 中的 **offset** 之和应小于16,384。  |
| __offset__ | __integer__  <br/>在搜索结果中要跳过的记录数。<br/>您可以将此参数与 limit 结合使用以启用分页。
此值与 limit 之和应小于16,384。  |
| __groupingField__ | __string__  <br/>作为聚合标准字段的名称。  |
| __outputFields__ | __array__<br/>与搜索结果一起返回的字段数组。 |
| __outputFields[]__ | __string__  <br/>字段名称  |
| __searchParams__ | __object__<br/>特定于此操作的参数设置。 |
| __searchParams.metricType__ | __string__  <br/>适用于当前搜索的度量类型名称。该值应与目标 Collection 的度量类型相同。<br/>The value defaults to COSINE  |
| __searchParams.params__ | __object__<br/>额外的搜索参数。 |
| __searchParams.params.radius__ | __integer__  <br/>确定最相似度的阈值。当将 metric_type 设置为 L2 时，确保此值大于 range_filter 的值。否则，此值应低于 range_filter 的值。  |
| __searchParams.params.range_filter__ | __integer__  <br/>将搜索细化到特定相似度范围内的向量。当将 metric_type 设置为 IP 或 COSINE 时，确保此值大于 radius 的值。否则，此值应低于 radius 的值。  |
| __partitionNames__ | __array__<br/>此操作适用的 Partition 的名称。 |
| __partitionNames[]__ | __string__  <br/>Partition 名称  |

## 响应

返回搜索结果。

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
