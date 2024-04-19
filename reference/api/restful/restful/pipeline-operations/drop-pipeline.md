---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /drop-pipeline
title: 删除 Pipeline
---

import RestHeader from '@site/src/components/RestHeader';

删除一个指定的 Pipeline

<RestHeader method="delete" endpoint="https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/pipelines/{PIPELINE_ID}" />

---

## 示例


:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

```shell
curl --request GET \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/pipe-**********************"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
        "pipelineId": "pipe-**********************",
        "name": "my_doc_ingestion_pipeline",
        "type": "INGESTION",
        "description": "A pipeline that splits a text file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
        "status": "SERVING",
        "functions": [
            {
                "action": "INDEX_DOC",
                "name": "index_my_doc",
                "inputField": "doc_url",
                "language": "ENGLISH"
            },
            {
                "action": "PRESERVE",
                "name": "keep_doc_info",
                "inputField": "publish_year",
                "outputField": "publish_year",
                "fieldType": "Int16"
            }
        ],
        "clusterId": "in03-***************",
        "newCollectionName": "my_new_collection"
    }
}

```


## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `PIPELINE_ID`  | **string**（必选）<br/>|

### 请求体

无请求体。

## 响应

返回被删除的 Pipeline 详情。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "pipelineId": "integer",
        "name": "string",
        "type": "string",
        "description": "string",
        "status": "string",
        "totalTokenUsage": "integer",
        "clusterID": "string",
        "collectionName": "string"
    }
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
| `data`    | **object**<br/>表示响应中携带的数据对象。 |
| `data.pipelineId`   | **integer**<br/>Pipeline ID。 |
| `data.name`   | **string**<br/>Pipeline 名称。 |
| `data.type`   | **string**<br/>Pipeline 类型。对于一个 Ingestion Pipeline 而言，其值应该为 `INGESTION`。 |
| `data.description`   | **string**<br/>Pipeline 描述。 |
| `data.status`   | **string**<br/>Pipeline 当前状态。仅当其值为 `SERVING` 时 Pipeline 处于工作状态。 |
| `data.totalTokenUsage`   | **integer**<br/>当前操作消费的标识符数量。 |
| `data.functions`   | ****<br/>Pipeline 中的函数。一个 Ingestion Pipeline 仅能包含一个 `INDEX_DOC` 函数。 |
| `data.clusterID`   | **string**<br/>应用当前 Pipeline 的目标集群。 |
| `data.collectionName`   | **string**<br/>在目标集群中应用当前 Pipeline 的目标 Collection。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 10041 | (Possible pipeline errors are all under this error code.) |

