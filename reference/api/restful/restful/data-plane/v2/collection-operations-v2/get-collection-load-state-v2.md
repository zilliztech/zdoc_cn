---
displayed_sidebar: restfulSidebar
sidebar_position: 85
slug: /restful/get-collection-load-state-v2
title: 获取 Collection 加载状态
---

import RestHeader from '@site/src/components/RestHeader';

此操作返回特定 Collection 的加载状态。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" />

---

## 示例



```shell
curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup"
}'
```
可能的响应类似于以下内容:
```json
{
    "code": 0,
    "data": {
        "loadProgress": 100,
        "loadState": "LoadStateLoaded"
    }
}
```



## 请求

### 参数

- 无查询参数。

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间。将其设置为 None 表示此操作在任何响应返回或发生错误时超时。|
    | __Authorization__  | **string**<br/>|

### 请求体

```json
{
    "collectionName": "string",
    "partitionNames": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>Collection 的名称。  |
| __partitionNames__ | __string__  <br/>Partition 名称的列表。如果指定了任何 Partition 名称，释放其中任何 Partition 都会导致返回 NotLoad 状态。  |

## 响应

一个指示指定 Collection 加载状态的 LoadState 对象。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "loadState": "string",
        "loadProgress": "integer"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.loadState__ | __string__  <br/>一个指示指定 Collection 加载状态的对象。  |
| __data.loadProgress__ | __integer__  <br/>一个整数，指示指定 Collection 加载进度的百分比。  |

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
