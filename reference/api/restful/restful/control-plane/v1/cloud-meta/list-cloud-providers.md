---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful/list-cloud-providers
title: 查看云服务提供商
---

import RestHeader from '@site/src/components/RestHeader';

列出 Zilliz Cloud 上所有可用的云服务提供商。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/clouds" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clouds" \
     --header "Authorization: Bearer ${API_KEY}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": [
        {
            "cloudId": "ali",
            "description": "alibaba cloud"
        },
        {
            "cloudId": "tc",
            "description": "tencent cloud"
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
    | __Authorization__  | **string**<br/>|

### 请求体

No request body required

## 响应

返回 Zilliz Cloud 上所有可用的云服务提供商。

### 响应体

```json
{
    "code": "integer",
    "data": [
        {
            "cloudId": "string",
            "description": "string"
        }
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __object__<br/> |
| __data[].cloudId__ | __string__  <br/>云服务提供商的 ID。  |
| __data[].description__ | __string__  <br/>云服务提供商的描述信息。  |

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
