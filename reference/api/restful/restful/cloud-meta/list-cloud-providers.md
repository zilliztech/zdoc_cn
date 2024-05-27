---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful/list-cloud-providers
title: 查看云服务提供商
---

import RestHeader from '@site/src/components/RestHeader';

列出 Zilliz Cloud 上所有可用的云服务提供商。

<RestHeader method="get" endpoint="https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/clouds" />

---

## 示例


:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clouds" \
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

### 请求体

无请求体。

## 响应

返回 Zilliz Cloud 上所有可用的云服务提供商。

### 响应体

- 处理请求成功后返回

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
| __data__ | array<br/> |
| __data[]__ | object<br/> |
| __data[].cloudId__ | string  <br/>云服务提供商的 ID。  |
| __data[].description__ | string  <br/>云服务提供商的描述信息。  |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80016 | CloudId not exists. |
| 90117 | Invalid domain name used |

