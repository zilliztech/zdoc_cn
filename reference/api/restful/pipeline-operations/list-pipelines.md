---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /list-pipelines
title: 查看 Pipeline 列表
---

import RestHeader from '@site/src/components/RestHeader';

列出指定项目中的所有 Pipeline。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/pipelines" />

---

## 示例


:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

当前，RESTful API 不支持 JSON 和 Array 类型的字段。

:::

```shell
curl --request GET \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${API_KEY}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines?projectId=proj-**********************"
```

成功响应示例：

```shell
{
  "code": 200,
  "data": [
    {
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
    },
    {
        "pipelineId": "pipe-**********************",
        "name": "my_text_search_pipeline",
        "type": "SEARCH",
        "description": "A pipeline that receives text and search for semantically similar doc chunks",
        "status": "SERVING",
        "functions": [
            {
                "action": "SEARCH_DOC_CHUNK",
                "name": "search_chunk_text_and_title",
                "inputField": null,
                "clusterId": "in03-***************",
                "collectionName": "my_new_collection"
            }
        ]
    },
    {
        "pipelineId": "pipe-**********************",
        "name": "my_doc_deletion_pipeline",
        "type": "DELETION",
        "description": "A pipeline that deletes all info associated with a doc",
        "status": "SERVING",
        "functions": [
            {
            "action": "PURGE_DOC_INDEX",
            "name": "purge_chunks_by_doc_name",
            "inputField": "doc_name"
            }
        ],
        "clusterId": "in03-***************",
        "collectionName": "my_new_collection"
    }
  ]
}
```


## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `projectId`  | **integer**（必选）<br/>当前操作的目标项目 ID。|

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|

### 请求体

无请求体。

## 响应

返回 Pipeline 列表。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "string",
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
| `data`  | **array**<br/>表示响应中携带的  数组. |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 10041 | (Possible pipeline errors are all under this error code.) |

