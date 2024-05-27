---
displayed_sidebar: restfulSidebar
sidebar_position: 29
slug: /restful/query-metrics
title: 查看集群指标
---

import RestHeader from '@site/src/components/RestHeader';

查看指定集群的指标统计数据。

<RestHeader method="post" endpoint="https://{cluster-endpoint}/v1/clusters/{CLUSTER_ID}/metrics/query" />

---

## 示例


:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

```shell
export CLOUD_REGION="gcp-us-west1"
export API_KEY=""

curl --location --request POST "https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clusters/inxx-xxxxxxxxxxxxxxx/metrics/query" \
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

成功响应示例：

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

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `CLUSTER_ID`  | **string**（必选）<br/>|

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

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __start__ | string  <br/>度量报告期的起始日期和时间，以 ISO 8601 时间戳格式（UTC）表示。未设置 `period` 参数时，请包含此参数。  |
| __end__ | string  <br/>度量报告期的结束日期和时间，以 ISO 8601 时间戳格式（UTC）表示。未设置 `period` 参数时，请包含此参数。  |
| __period__ | string  <br/>度量报告期的持续时间，以 ISO 8601 时间戳格式（UTC）表示。未设置 `start` 和 `end` 参数时，请包含此参数。  |
| __granularity__ | string  <br/>报告度量的最小时间间隔，以 ISO 8601 时间戳格式（UTC）表示。最小粒度为 PT30S。  |
| __metricQueries__ | array<br/>一个 MetricQuery 对象列表。 |
| __metricQueries[]__ | object<br/> |
| __metricQueries[].name__ | string  <br/>待查询的指标名称。有效值包括 **CU_COMPUTATION**, **CU_CAPACITY**, **STORAGE_USE**, **REQ_INSERT_COUNT**, **REQ_BULK_INSERT_COUNT**, **REQ_UPSERT_COUNT**, **REQ_DELETE_COUNT**, **REQ_SEARCH_COUNT**, **REQ_QUERY_COUNT**, **VECTOR_REQ_INSERT_COUNT**, **VECTOR_REQ_UPSERT_COUNT**, **VECTOR_REQ_SEARCH_COUNT**, **REQ_INSERT_LATENCY**, **REQ_BULK_INSERT_LATENCY**, **REQ_UPSERT_LATENCY**, **REQ_DELETE_LATENCY**, **REQ_SEARCH_LATENCY**, **REQ_QUERY_LATENCY**, **REQ_SUCCESS_RATE**, **REQ_FAIL_RATE**, **REQ_FAIL_RATE_INSERT**, **REQ_FAIL_RATE_BULK_INSERT**, **REQ_FAIL_RATE_UPSERT**, **REQ_FAIL_RATE_DELETE**, **REQ_FAIL_RATE_SEARCH**, **REQ_FAIL_RATE_QUERY**, **ENTITIES_LOADED**, **ENTITIES_INSERT_RATE**, **COLLECTIONS_COUNT**, **ENTITIES_COUNT**.  |
| __metricQueries[].stat__ | string  <br/>当前指标应用的统计方法。有效值包括 **AVG**（平均值）和 **P99**（99百分位数）用于延迟指标。**AVG** 可用于所有其他指标。  |

## 响应

成功

### 响应体

- 处理请求成功后返回

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

- 处理请求失败后返回

```json
{
    "code": integer,
    "message": string
}
```

### 属性

下表罗列了响应包含的所有属性。

| 属性名称  | 属性描述                                                                                                                               |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br/>表示请求是否成功。<br/><ul><li>`200`：请求成功。</li><li>其它：存在错误。</li></ul> |
| __code__ | integer  <br/>  |
| __data__ | object<br/>响应数据容器。 |
| __data[].results__ | array<br/>一个查询结果对象列表。 |
| __data[].results[]__ | object<br/> |
| __data[].results[].name__ | string  <br/>指标名称。  |
| __data[].results[].stat__ | string  <br/>当前指标应用的统计方法。  |
| __data[].results[].unit__ | string  <br/>测量当前指标的单位，如百分比。  |
| __data[].results[][].values__ | array<br/>一个数据点列表。 |
| __data[].results[][].values[]__ | object<br/> |
| __data[].results[][].values[].timestamp__ | string  <br/>当前数据点的时间戳，以 ISO 8601 格式表示。  |
| __data[].results[][].values[].value__ | string  <br/>指定时间戳的指标值。  |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
|  | (to be added) |

