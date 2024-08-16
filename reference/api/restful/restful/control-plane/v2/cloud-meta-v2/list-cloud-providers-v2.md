---
displayed_sidebar: restfulSidebar
sidebar_position: 23
slug: /restful/list-cloud-providers-v2
title: 查看云服务提供商
---

import RestHeader from '@site/src/components/RestHeader';

Lists all cloud providers available on Zilliz Cloud.

<RestHeader method="get" endpoint="https://api.cloud.zilliz.com.cn/v2/clouds" />

---

## 示例



import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""

curl --request GET \
    --url "https://api.cloud.zilliz.com.cn/v2/clouds" \
    --header "Authorization: Bearer ${API_KEY}"   \
    --header "accept: application/json"
```

Possible response is similar to the following

```json
{
    "code": 0,
    "data": [
        {
            "cloudId": "ali",
            "description": "Alibaba Cloud"
        },
        {
            "cloudId": "tc",
            "description": "Tencent Cloud"
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
    | __Authorization__  | **string**(required)<br/>The authorization token. You should always use an API key with appropriate permissions.|
    | __Accept__  | **string**<br/>Use `application/json`.|

### 请求体

No request body required

## 响应

Returns a list of cloud providers in detail.

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
| __data__ | __array__<br/>Response payload. |
| __data[]__ | __object__<br/>List of applicable cloud providers. |
| __data[].cloudId__ | __string__  <br/>ID of a cloud provider.  |
| __data[].description__ | __string__  <br/>Description of the cloud provider.  |

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
