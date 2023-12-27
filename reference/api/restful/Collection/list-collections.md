---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /list-collections
title: 查看 Collection
---

import RestHeader from '@site/src/components/RestHeader';

列出集群中已创建的 Collection。

<RestHeader method="get" endpoint="https://{cluster-endpoint}/v1/vector/collections" />

---

## 示例


列出集群中已创建的 Collection。

```shell
curl --request GET \
     --url "${cluster-endpoint}/v1/vector/collections" \
     --header "Authorization: Bearer ${YOUR_TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
   code: 200,
   data: [
         "collection1",
         "collection2",
         ...
         "collectionN",
         ]
}
```


## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `dbName`  | **string**<br/>目标集群的 Endpoint。|

- 无路径参数。

### 请求体

无请求体。

## 响应

返回指定集群中已创建的 Collection。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": [
        {}
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
| `data`  | **array**<br/>表示响应中携带的 string 数组. |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80000 | Incorrect parameter: xxx |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Cluster not exist or you don't have permission. |
| 80022 | Dedicated cluster not support this operation. |
| 90011 | Invalid CollectionName. Reason: Name contains only alphanumeric letters and underscores |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |

