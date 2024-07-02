---
displayed_sidebar: restfulSidebar
sidebar_position: 10
slug: /restful/list-projects
title: 查看项目列表
---

import RestHeader from '@site/src/components/RestHeader';

查看当前云地域中的所有项目。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/projects" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
    --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/projects" \
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
            "createTimeMilli": 1687859137000,
            "instanceCount": 1,
            "projectId": "proj-**********************",
            "projectName": "Default Project"
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

返回项目列表。

### 响应体

```json
{
    "code": "integer",
    "data": [
        {
            "instanceCount": "integer",
            "projectId": "string",
            "projectName": "string"
        }
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __object__<br/> |
| __data[].instanceCount__ | __integer__  <br/>  |
| __data[].projectId__ | __string__  <br/>  |
| __data[].projectName__ | __string__  <br/>  |

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
