---
displayed_sidebar: restfulSidebar
sidebar_position: 84
slug: /restful/query-cluster-metrics-v2
title: 查看集群指标
---

import RestHeader from '@site/src/components/RestHeader';

Query the metrics of a specific cluster.

<RestHeader method="post" endpoint="https://api.cloud.zilliz.com.cn/v2/clusters/{clusterId}/metrics/query" />

---

## 示例



import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""

curl --request POST \
     --url https://api.cloud.zilliz.com.cn/v2/clusters/inxx-xxxxxxxxxxxxxxx/metrics/query \
     --header 'Authorization: Bearer ${API_KEY}' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data-raw '{
       "start": "2024-06-30T16:09:53Z",
       "end": "2024-07-01T16:09:53Z",
       "granularity": "PT6H",
       "metricQueries": [
           {
               "name": "CU_COMPUTATION",
               "stat": "AVG"    
           }
       ]
    }'
```

Possible response is similar to the following.

```json
{
   "code": 0,
   "data":{
      "results":[
         {
            "name":"CU_COMPUTATION",
            "stat":"AVG",
            "unit":"percent",
            "values":[
               {
                  "timestamp":"2024-06-30T16:09:53Z",
                  "value":null
               },
               {
                  "timestamp":"2024-06-30T22:09:53Z",
                  "value":"1.00"
               },
               {
                  "timestamp":"2024-07-01T04:09:53Z",
                  "value":"1.00"
               },
               {
                  "timestamp":"2024-07-01T10:09:53Z",
                  "value":"1.00"
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

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `clusterId`  | **string**（必选）<br/>ID of the target cluster.|

- 无请求头参数

### 请求体

```json
{
    "start": "string",
    "end": "string",
    "period": "string",
    "granularity": "string",
    "metricQueries": [
        {
            "metricName": "string",
            "stat": "string"
        }
    ]
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __start__ | __string__  <br/>The starting date and time for the metric reporting period, expressed in ISO 8601 timestamp format in UTC. Include this parameter and `end` when the `period` parameter is not set.  |
| __end__ | __string__  <br/>The ending date and time for the metric reporting period, expressed in ISO 8601 timestamp format in UTC. Include this parameter and `start` when the `period` parameter is not set.  |
| __period__ | __string__  <br/>The duration over which Milvus reports the metrics, expressed in ISO 8601 duration format in UTC. Include this parameter when both `start` and `end` parameters are not set.  |
| __granularity__ | __string__  <br/>The time interval at which Milvus reports the metrics, expressed in ISO 8601 duration format in UTC. The minimum granularity is PT30S.  |
| __metricQueries__ | __array__<br/>List of **MetricQuery** objects. |
| __metricQueries[]__ | __object__<br/>A **MetricQuery** object. |
| __metricQueries[].metricName__ | __string__  <br/>Name of a metric. <br/>For details on these metrics, refer to [Metrics & Alerts Reference](/docs/metrics-alerts-reference).<br/>Possible values: "**CU_COMPUTATION**", "**CU_CAPACITY**", "**STORAGE_USE**", "**REQ_INSERT_COUNT**", "**REQ_BULK_INSERT_COUNT**", "**REQ_UPSERT_COUNT**", "**REQ_DELETE_COUNT**", "**REQ_SEARCH_COUNT**", "**REQ_QUERY_COUNT**", "**VECTOR_REQ_INSERT_COUNT**", "**VECTOR_REQ_UPSERT_COUNT**", "**VECTOR_REQ_SEARCH_COUNT**", "**REQ_INSERT_LATENCY**", "**REQ_BULK_INSERT_LATENCY**", "**REQ_UPSERT_LATENCY**", "**REQ_DELETE_LATENCY**", "**REQ_SEARCH_LATENCY**", "**REQ_QUERY_LATENCY**", "**REQ_SUCCESS_RATE**", "**REQ_FAIL_RATE**", "**REQ_FAIL_RATE_INSERT**", "**REQ_FAIL_RATE_BULK_INSERT**", "**REQ_FAIL_RATE_UPSERT**", "**REQ_FAIL_RATE_DELETE**", "**REQ_FAIL_RATE_SEARCH**", "**REQ_FAIL_RATE_QUERY**", "**ENTITIES_LOADED**", "**ENTITIES_INSERT_RATE**", "**COLLECTIONS_COUNT**", "**ENTITIES_COUNT**"  |
| __metricQueries[].stat__ | __string__  <br/>The statistical method to apply to the metric. Valid values include **AVG** (average) and **P99** (99th percentile) for latency metrics. **AVG** is available for all other metrics.<br/>Possible values: "**AVG**", "**P99**"  |

## 响应

Return the collected statistics on the specified metric in detail.

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
| __data__ | __object__<br/>Response payload. |
| __data[].results__ | __array__<br/>List of collected statistics on the specified metric. |
| __data[].results[]__ | __object__<br/>A set of collected statistics. |
| __data[].results[].name__ | __string__  <br/>A metric name.  |
| __data[].results[].stat__ | __string__  <br/>Statistical method applied.  |
| __data[].results[].unit__ | __string__  <br/>Unit of the value in the statistics.  |
| __data[].results[][].values__ | __array__<br/>List of collected statistics at an interval. |
| __data[].results[][].values[]__ | __object__<br/>Statistics collected within an interval period. |
| __data[].results[][].values[].timestamp__ | __string__  <br/>The timestamp for the data point in ISO 8601 format.  |
| __data[].results[][].values[].value__ | __string__  <br/>The value of the metric at the given timestamp.  |

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
