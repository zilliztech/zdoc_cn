---
displayed_sidebar: restfulSidebar
sidebar_position: 20
slug: /restful/query-metrics
title: 查看指标
---

import RestHeader from '@site/src/components/RestHeader';

查看指标统计信息。

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/clusters/CLUSTER_ID/metrics/query" />

---

## 示例



```shell
export CLOUD_REGION="gcp-us-west1"
export API_KEY=""

curl --location --request POST "https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/clusters/inxx-xxxxxxxxxxxxxxx/metrics/query" \
--header "Authorization: Bearer ${API_KEY}" \
--data-raw '{
 "start": "",
 "end": "",
 "period": "PT99H",
 "granularity": "PT5H",
 "metricQueries": [
 {
 "name": "CU_CAPACITY",
 "stat": "AVG"
 }
 ]
}'
```
可能的响应类似于以下内容。
```json
{
 "code": 200,
 "data": {
 "results": [
 {
 "name": "CU_CAPACITY",
 "stat": "AVG",
 "unit": "percent",
 "values": [
 {
 "timestamp": "2024-03-28T04:58:06Z",
 "value": null
 },
 {
 "timestamp": "2024-03-28T09:58:06Z",
 "value": null
 },
 {
 "timestamp": "2024-03-28T14:58:06Z",
 "value": null
 }
 ]
 }
 ]
 }
}
```



## 请求

### 参数

- 无查询参数。

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**(required)<br/>|

### 请求体

```json
{
    "start": "string",
    "end": "string",
    "period": "string",
    "granularity": "string",
    "metricQueries": [
        {
            "name": "string",
            "stat": "string"
        }
    ]
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __start__ | __string__  <br/>指标报告周期的开始日期和时间，以 ISO 8601 时间戳格式（UTC）表示。当未设置period参数时包含此参数。  |
| __end__ | __string__  <br/>指标报告周期的结束日期和时间，以 ISO 8601 时间戳格式（UTC）表示。当未设置period参数时包含此参数。  |
| __period__ | __string__  <br/>Milvus 报告指标的持续时间，以 ISO 8601 持续时间格式（UTC）表示。当start和end参数均未设置时包含此参数。  |
| __granularity__ | __string__  <br/>Milvus 报告指标的时间间隔，以 ISO 8601 持续时间格式（UTC）表示。最小粒度为 PT30S。  |
| __metricQueries__ | __array__<br/>MetricQuery 对象的数组。 |
| __metricQueries[]__ | __object__<br/> |
| __metricQueries[].name__ | __string__  <br/>要查询的指标的名称。有效值包括 CU_COMPUTATION、CU_CAPACITY、STORAGE_USE、REQ_INSERT_COUNT、REQ_BULK_INSERT_COUNT、REQ_UPSERT_COUNT、REQ_DELETE_COUNT、REQ_SEARCH_COUNT、REQ_QUERY_COUNT、VECTOR_REQ_INSERT_COUNT、VECTOR_REQ_UPSERT_COUNT、VECTOR_REQ_SEARCH_COUNT、REQ_INSERT_LATENCY、REQ_BULK_INSERT_LATENCY、REQ_UPSERT_LATENCY、REQ_DELETE_LATENCY、REQ_SEARCH_LATENCY、REQ_QUERY_LATENCY、REQ_SUCCESS_RATE、REQ_FAIL_RATE、REQ_FAIL_RATE_INSERT、REQ_FAIL_RATE_BULK_INSERT、REQ_FAIL_RATE_UPSERT、REQ_FAIL_RATE_DELETE、REQ_FAIL_RATE_SEARCH、REQ_FAIL_RATE_QUERY、ENTITIES_LOADED、ENTITIES_INSERT_RATE、COLLECTIONS_COUNT、ENTITIES_COUNT。  |
| __metricQueries[].stat__ | __string__  <br/>应用于指标的统计方法。对于延迟指标，有效值包括AVG（平均值）和P99（第 99 百分位数）。对于所有其他指标，AVG 可用。  |

## 响应

成功

### 响应体

```json
{
    "code": "integer",
    "data": {
        "results": [
            {
                "name": "string",
                "stat": "string",
                "unit": "string",
                "values": [
                    {
                        "timestamp": "string",
                        "value": "string"
                    }
                ]
            }
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/>响应数据的容器。 |
| __data[].results__ | __array__<br/>结果对象的数组。 |
| __data[].results[]__ | __object__<br/> |
| __data[].results[].name__ | __string__  <br/>指标的名称。  |
| __data[].results[].stat__ | __string__  <br/>应用于指标的统计函数。  |
| __data[].results[].unit__ | __string__  <br/>指标的度量单位（例如，百分比）。  |
| __data[].results[][].values__ | __array__<br/>数据点的数组。 |
| __data[].results[][].values[]__ | __object__<br/> |
| __data[].results[][].values[].timestamp__ | __string__  <br/>以 ISO 8601 格式的数据点的时间戳。  |
| __data[].results[][].values[].value__ | __string__  <br/>在给定时间戳的指标值。  |

### 错误响应

```json
{
    "code": integer,
    "message": string
}
```

| 属性名称    | 属性描述                                                                                                                                    |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__    | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __message__ | **string**<br/>表示错误信息。                                                                        |
