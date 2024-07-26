---
displayed_sidebar: restfulSidebar
sidebar_position: 73
slug: /restful/get-v2
title: 获取
---

import RestHeader from '@site/src/components/RestHeader';

此操作通过它们的ID获取特定的 Entity。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/get" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/get" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup",
    "id": [
        1,3,5
    ],
    "outputFields": [
        "color"
    ]
}'
```
可能的响应类似于以下内容。
```json
{
    "code": 0,
    "data": [
        {
            "color": "red_7025",
            "id": 1
        },
        {
            "color": "pink_9298",
            "id": 3
        },
        {
            "color": "yellow_4222",
            "id": 5
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
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间。
将其设置为None表示此操作在收到任何响应或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "collectionName": "string",
    "outputFields": [],
    "partitionNames": []
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>此操作适用的 Collection 的名称。  |
| __id__ | __integer__ \| __string__ \| __array__ \| __array__<br/>特定的 Entity ID或 Entity ID列表。 |
| __id[opt_1]__ | __integer__  <br/>  |
| __id[opt_2]__ | __string__  <br/>  |
| __id[][opt_3]__ | __array__<br/> |
| __id[][opt_3][]__ | __integer__  <br/>  |
| __id[][opt_4]__ | __array__<br/> |
| __id[][opt_4][]__ | __string__  <br/>  |
| __outputFields__ | __array__<br/>与搜索结果一起返回的字段数组。 |
| __outputFields[]__ | __string__  <br/>  |
| __partitionNames__ | __array__<br/>此操作适用的 Partition 的名称。 |
| __partitionNames[]__ | __string__  <br/>Partition 名称  |

## 响应

每个字典代表一个被查询 Entity 的字典列表。

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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __array__<br/> |
| __data[]__ | __object__<br/> |

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
