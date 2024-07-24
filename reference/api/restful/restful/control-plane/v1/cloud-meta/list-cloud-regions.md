---
displayed_sidebar: restfulSidebar
sidebar_position: 10
slug: /restful/list-cloud-regions
title: 查看云服务区域
---

import RestHeader from '@site/src/components/RestHeader';

列出指定云服务提供商的所有可用云区域。

<RestHeader method="get" endpoint="https://controller.${CLOUD_REGION}.vectordb.cloud.zilliz.com.cn:19530/v1/regions" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/regions?cloudId=ali" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

您可以使用 `ListClouds` 接口获取 `cloudId`。

成功响应示例：

```shell
{
    "code": 200,
    "data": [
        {
            "cloudId": "ali",
            "domain": "*.*.api.ali-cn-hangzhou.cloud.zilliz.com.cn",
            "regionId": "ali-cn-hangzhou"
        }
    ]
}
```




## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `cloudId`  | **string**<br/>云服务提供商 ID。|

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|

### 请求体

No request body required

## 响应

返回指定云服务提供商的所有可用云区域。

### 响应体

```json
{
    "code": "integer",
    "data": [
        {
            "cloudId": "string",
            "regionId": "string",
            "domain": "string"
        }
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __object__<br/> |
| __data[].cloudId__ | __string__  <br/>云服务提供商的 ID。  |
| __data[].regionId__ | __string__  <br/>可用云区域的 ID。  |
| __data[].domain__ | __string__  <br/>Zilliz Cloud 开放 API 端点的基本 URL  |

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
