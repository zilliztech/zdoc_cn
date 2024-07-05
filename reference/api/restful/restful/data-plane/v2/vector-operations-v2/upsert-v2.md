---
displayed_sidebar: restfulSidebar
sidebar_position: 35
slug: /restful/upsert-v2
title: 插入或更新
---

import RestHeader from '@site/src/components/RestHeader';

此操作将新记录插入数据库或更新现有记录。

> 注意
> upsert端点不适用于已启用autoId的 Collection。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" />

---

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="说明">

本 API 尚未正式发布，仅供参考。

</Admonition>

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "data": [
        //  Entity 数据列表
    ],
    "collectionName": "quick_setup"
}'
```
可能的响应类似于以下内容：
```json
{
    "code": 0,
    "data": {
        "upsertCount": 10,
        "upsertIds": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ]
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
    | __Request-Timeout__  | **integer**<br/>此操作的超时持续时间。
将其设置为None表示此操作在收到任何响应或发生任何错误时超时。|
    | __Authorization__  | **string**<br/>认证令牌。|

### 请求体

```json
{
    "dbName": "string",
    "collectionName": "string",
    "partitionName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __dbName__ | __string__  <br/>数据库的名称。  |
| __collectionName__ | __string__  <br/>要插入数据的 Collection 的名称。  |
| __data__ | __object__ \| __array__<br/>要插入当前 Collection 的数据。<br/>要插入的数据应该是一个与当前 Collection 的模式匹配的字典，或这样的字典列表。 |
| __data[opt_1]__ | __object__<br/> |
| __data[][opt_2]__ | __array__<br/> |
| __data[][opt_2][]__ | __object__<br/> |
| __partitionName__ | __string__  <br/>当前 Collection 中的一个 Partition 的名称。<br/>如果指定，数据将被插入到指定的 Partition 中。  |

## 响应

MutationResult对象。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "upsertCount": "integer",
        "upsertIds": [
            {}
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.upsertCount__ | __integer__  <br/>插入 Entity 的数量。  |
| __data[].upsertIds__ | __array__<br/>插入 Entity 的ID数组。 |
| __data[].upsertIds[]__ | __string__  <br/>  |

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
