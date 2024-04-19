---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful/query-metrics
title: 查看集群指标
---

import RestHeader from '@site/src/components/RestHeader';

查看指定集群的指标统计数据。

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/{CLUSTER_ID}/metrics/query" />

---

## 示例


:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

```shell
curl --location --request POST "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/inxx-xxxxxxxxxxxxxxx/metrics/query" \
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
| `start`  | **string**<br/>度量报告期的起始日期和时间，以 ISO 8601 时间戳格式（UTC）表示。未设置 `period` 参数时，请包含此参数。|
| `end`  | **string**<br/>度量报告期的结束日期和时间，以 ISO 8601 时间戳格式（UTC）表示。未设置 `period` 参数时，请包含此参数。|
| `period`  | **string**<br/>度量报告期的持续时间，以 ISO 8601 时间戳格式（UTC）表示。未设置 `start` 和 `end` 参数时，请包含此参数。|
| `granularity`  | **string**（必选）<br/>报告度量的最小时间间隔，以 ISO 8601 时间戳格式（UTC）表示。最小粒度为 PT30S。|
| `metricQueries`  | **array**（必选）<br/>一个 MetricQuery 对象列表。|

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
| `data`    | **object**<br/>表示响应中携带的数据对象。 |
| `data.results`   | **array**<br/>一个查询结果对象列表。 |
| `data.results[].name`   | **string**<br/>指标名称。 |
| `data.results[].stat`   | **string**<br/>当前指标应用的统计方法。 |
| `data.results[].unit`   | **string**<br/>测量当前指标的单位，如百分比。 |
| `data.results[].values`   | **array**<br/>一个数据点列表。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
|  | (to be added) |

