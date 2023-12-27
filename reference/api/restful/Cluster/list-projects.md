---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /list-projects
title: 查看项目
---

import RestHeader from '@site/src/components/RestHeader';

查看当前区域的所有项目。

<RestHeader method="get" endpoint="https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/projects" />

---

## 示例


:::note 说明

- 本接口需要使用 [API 密钥](/docs/manage-api-keys)作为鉴权凭据。

:::

```shell
curl --request GET \
    --url "https://controller.api.${cloud-region}.cloud.zilliz.com.cn/v1/projects" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json"
```

成功响应示例

```shell
{
    "code": 200,
    "data": [
       {
          "instanceCount": 1,
          "projectId": "proj-***************",
          "projectName": "test"
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

返回项目列表。

### 响应体

- 处理请求成功后返回

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
| `data`  | **array**<br/>表示响应中携带的 object 数组. |
| `data.instanceCount`   | **integer**<br/>Number of clusters in the current project. |
| `data.projectId`   | **string**<br/>ID of the current project |
| `data.projectName`   | **string**<br/>Name of the current project |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
|  | (to be added) |

