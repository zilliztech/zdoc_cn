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
    --url "https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/projects" \
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
| __code__ | integer  <br/>  |
| __data__ | array<br/> |
| __data[]__ | object<br/> |
| __data[].instanceCount__ | integer  <br/>当前项目中的集群数量。  |
| __data[].projectId__ | string  <br/>当前项目 ID。  |
| __data[].projectName__ | string  <br/>当前项目名称。  |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
|  | (to be added) |

