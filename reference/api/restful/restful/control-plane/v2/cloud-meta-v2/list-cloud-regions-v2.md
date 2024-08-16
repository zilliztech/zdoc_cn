---
displayed_sidebar: restfulSidebar
sidebar_position: 41
slug: /restful/list-cloud-regions-v2
title: 查看云服务区域
---

import RestHeader from '@site/src/components/RestHeader';

Lists all available cloud regions. You may list only the applicable regions of a specific cloud provider.

<RestHeader method="get" endpoint="https://api.cloud.zilliz.com.cn/v2/regions" />

---

## 示例



import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""
export CLOUD_ID=""

# List all available cloud regions.
curl --request GET \
    --url "https://api.cloud.zilliz.com.cn/v2/regions" \
    --header "Authorization: Bearer ${API_KEY}"   \
    --header "accept: application/json"

# List all available cloud regions of a specific provider.
curl -i --request GET \
    --url "https://api.cloud.zilliz.com.cn/v2/regions?cloudId=${CLOUD_ID}" \
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
            "regionId": "ali-cn-hangzhou",
            "domain": "api.cloud.zilliz.com.cn"
        },
        {
            "cloudId": "tc",
            "regionId": "tc-ap-beijing",
            "domain": "api.cloud.zilliz.com.cn"
        }
    ]
}
```



## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `cloudId`  | **string**<br/>ID of a cloud provider. You can list applicable cloud providers using [List Cloud Providers](/reference/restful/list-cloud-providers-v2)|

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**(required)<br/>The authorization token. You should always use an API key with appropriate permissions.|
    | __Accept__  | **string**<br/>Use `application/json`.|

### 请求体

No request body required

## 响应

Return a list of cloud regions in detail.

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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/>Response payload. |
| __data[]__ | __object__<br/>List of applicable cloud regions. |
| __data[].cloudId__ | __string__  <br/>ID of the cloud provider that provides the region.  |
| __data[].regionId__ | __string__  <br/>ID of the cloud region.  |
| __data[].domain__ | __string__  <br/>Base URL of the V2 API server at the control plane.  |

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
