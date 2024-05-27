---
displayed_sidebar: restfulSidebar
sidebar_position: 14
slug: /restful/describe-pipeline
title: 查看 Pipeline 详情
---

import RestHeader from '@site/src/components/RestHeader';

通过 Pipeline ID 获取详情。

<RestHeader method="get" endpoint="https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/{PIPELINE_ID}" />

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
        "totalTokenUsage": 0,
        "functions": [
            {
                "action": "INDEX_DOC",
                "name": "index_my_doc",
                "inputField": "doc_url",
                "language": "ENGLISH",
                "chunkSize": 500
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
    | `PIPELINE_ID`  | **string**（必选）<br/>合法的 Pipeline ID。您可以通过调用 [查看 Pipeline 列表](https://docs.zilliz.com.cn/reference/list-pipelines) 接口或参考 [Zilliz Cloud 控制台](https://docs.zilliz.com.cn/docs/on-zilliz-cloud-console)获取。|

### 请求体

无请求体。

## 响应

返回 Pipeline 详情。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "oneOf": [
            {
                "pipelineId": "integer",
                "name": "string",
                "type": "string",
                "description": "string",
                "status": "string",
                "clusterID": "string",
                "collectionName": "string"
            },
            {
                "pipelineId": "integer",
                "name": "string",
                "type": "string",
                "description": "string",
                "status": "string",
                "functions": [
                    {
                        "name": "string",
                        "action": "string",
                        "inputField": "string",
                        "clusterID": "string",
                        "collectionName": "string"
                    }
                ]
            },
            {
                "pipelineId": "integer",
                "name": "string",
                "type": "string",
                "description": "string",
                "status": "string",
                "functions": [
                    {
                        "name": "string",
                        "action": "string",
                        "inputField": "string"
                    }
                ],
                "clusterID": "string",
                "collectionName": "string"
            }
        ]
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
| __code__ | integer  <br/>  |
| __data__ | object | object | object<br/> |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 10041 | (Possible pipeline errors are all under this error code.) |

