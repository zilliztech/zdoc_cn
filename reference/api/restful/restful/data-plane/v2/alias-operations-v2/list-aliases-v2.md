---
displayed_sidebar: restfulSidebar
sidebar_position: 69
slug: /restful/list-aliases-v2
title: 查看 Alias
---

import RestHeader from '@site/src/components/RestHeader';

此操作列出指定数据库中所有现有的 Collection  Alias。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/aliases/list" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/aliases/list" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "dbName": "default"
}'
```
可能的响应类似于以下内容
```json
{
    "code": 0,
    "data": [
        "bob"
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
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间（以秒为单位）。将其设置为无表示此操作在任何响应到达或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>现有的数据库的名称。其值默认为 __default__。  |

## 响应

 Collection 别名的列表。 

### 响应体

```json
{
    "code": "integer",
    "data": [
        {}
    ]
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __string__  <br/>项目对象的列表。  |

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
