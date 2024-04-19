---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful/list-projects
title: 查看项目列表
---

import RestHeader from '@site/src/components/RestHeader';

查看当前云地域中的所有项目。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/projects" />

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
          "instanceCount": 1,
          "projectId": "proj-********************",
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
| `data.instanceCount`   | **integer**<br/>当前项目中的集群数量。 |
| `data.projectId`   | **string**<br/>当前项目 ID。 |
| `data.projectName`   | **string**<br/>当前项目名称。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
|  | (to be added) |

