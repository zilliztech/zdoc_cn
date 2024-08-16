---
displayed_sidebar: restfulSidebar
sidebar_position: 28
slug: /restful/list-projects-v2
title: 查看项目列表
---

import RestHeader from '@site/src/components/RestHeader';

List all projects scoped to API-Key.

<RestHeader method="get" endpoint="https://api.cloud.zilliz.com.cn/v2/projects" />

---

## 示例



import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""

curl --request GET \
    --url "https://api.cloud.zilliz.com.cn/v2/projects" \
    --header "Authorization: Bearer ${API_KEY}"   \
    --header "accept: application/json"
```

Possible response is similar to the following

```json
{
    "code": 200,
    "data": [
        {
            "projectName": "Default Project",
            "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxxx",
            "instanceCount": 2,
            "createTime": "2023-08-16T07:34:06Z"
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

Return a list of projects in detail.

### 响应体

```json
{
    "code": "number",
    "data": [
        {
            "projectId": "string",
            "projectName": "string",
            "instanceCount": "string",
            "createTime": "string"
        }
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/>Response payload. |
| __data[]__ | __object__<br/>List of projects in detail. |
| __data[].projectId__ | __string__  <br/>ID of a project.  |
| __data[].projectName__ | __string__  <br/>Name of a project.  |
| __data[].instanceCount__ | __string__  <br/>Number of clusters in the projects.  |
| __data[].createTime__ | __string__  <br/>Time at which the project is created.  |

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
