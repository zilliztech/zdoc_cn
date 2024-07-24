---
displayed_sidebar: restfulSidebar
sidebar_position: 24
slug: /restful/insert-v2
title: 插入
---

import RestHeader from '@site/src/components/RestHeader';

此操作将数据插入到特定 Collection 中。

> 注意
> 一次最多可以插入100个 Entity。要插入大量数据，请使用[批量插入API](https://docs.zilliz.com/docs/data-import)。

<RestHeader method="post" endpoint="https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" />

---

## 示例



```shell
export CLUSTER_ENDPOINT="https://inxx-xxxxxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com"
export  TOKEN="user:password"

curl --location --request POST "https://${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
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
        "insertCount": 10,
        "insertIds": [
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
    "collectionName": "string",
    "partitionName": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __collectionName__ | __string__  <br/>现有 Collection 的名称。  |
| __data__ | __object__ \| __array__<br/>要插入到当前 Collection 中的数据。<br/>要插入的数据应该是与当前 Collection 的模式匹配的字典，或此类字典的列表。 |
| __data[opt_1]__ | __object__<br/>一个 Entity |
| __data[][opt_2]__ | __array__<br/>Entity 列表 |
| __data[][opt_2][]__ | __object__<br/>一个 Entity |
| __partitionName__ | __string__  <br/>当前 Collection 中的一个 Partition 的名称。<br/>如果指定，数据将被插入到指定的 Partition 中。  |

## 响应

包含有关插入 Entity 数量的信息的字典。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "insertCount": "integer",
        "insertIds": [
            {}
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.insertCount__ | __integer__  <br/>插入 Entity 的数量。  |
| __data[].insertIds__ | __array__<br/>插入 Entity 的ID数组。 |
| __data[].insertIds[]__ | __string__  <br/>  |

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
