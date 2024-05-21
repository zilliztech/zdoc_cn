---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /create-pipeline
title: 创建 Pipeline
---

import RestHeader from '@site/src/components/RestHeader';

创建一个 Pipeline

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/pipelines" />

---

## 示例


:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

- 创建 Ingestion Pipeline.

    ```shell
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
        -d '{
            "projectId": "proj-**********************",
            "name": "my_doc_ingestion_pipeline",
            "description": "A pipeline that splits a text file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
            "type": "INGESTION",  
            "functions": [
                { 
                    "name": "index_my_doc",
                    "action": "INDEX_DOC", 
                    "inputField": "doc_url", 
                    "language": "ENGLISH",
                    "chunkSize": 500
                },
                {
                    "name": "keep_doc_info",
                    "action": "PRESERVE", 
                    "inputField": "publish_year", 
                    "outputField": "publish_year",
                    "fieldType": "Int16" 
                }
            ],
            "clusterId": "${CLUSTER_ID}",
            "newCollectionName": "my_new_collection"
        }'
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

- 创建 Search Pipeline.

    ```shell
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
        -d '{
            "name": "my_text_search_pipeline",
            "description": "A pipeline that receives text and search for semantically similar doc chunks",
            "type": "SEARCH",
            "functions": [
                {
                    "name": "search_chunk_text_and_title",
                    "action": "SEARCH_DOC_CHUNK",
                    "inputField": "query_text",
                    "clusterId": "${CLUSTER_ID}",
                    "collectionName": "my_new_collection"
                }
            ]
        }'
    ```

    成功响应示例：

    ```shell
    {
        "code": 200,
        "data": {
            "pipelineId": "pipe-**********************",
            "name": "my_text_search_pipeline",
            "type": "SEARCH",
            "description": "A pipeline that receives text and search for semantically similar doc chunks",
            "status": "SERVING",
            "functions": [
                {
                    "action": "SEARCH_DOC_CHUNK",
                    "name": "search_chunk_text_and_title",
                    "inputField": "query_text",
                    "clusterId": "in03-***************",
                    "collectionName": "my_new_collection"
                }
            ]
        }
    }
    ```

- 创建 Deletion Pipeline.

    ```shell
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
        -d '{
            "name": "my_doc_deletion_pipeline",
            "description": "A pipeline that deletes all info associated with a doc",
            "type": "DELETION",
            "functions": [
                {
                    "name": "purge_chunks_by_doc_name",
                    "action": "PURGE_DOC_INDEX",
                    "inputField": "doc_name"
                }
            ],
        
            "clusterId": "${CLUSTER_ID}",
            "collectionName": "my_new_collection"
        }'
    ```

    成功响应示例：

    ```shell
    {
        "code": 200,
        "data": {
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
    }
    ```


## 请求

### 参数

- 无查询参数。

- 无路径参数。

### 请求体

```json

```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|

## 响应

返回成功创建的 Pipeline 详情。

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
| `data.type`   | **string**<br/>Pipeline 类型。对于一个 Ingestion Pipeline 而言，其 |
| `data.description`   | **string**<br/>Pipeline 描述。 |
| `data.status`   | **string**<br/>Pipeline 当前状态。仅当值为`SERVING`时 Pipeline 处于工作状态。 |
| `data.functions`   | ****<br/>Pipeline 中的函数。一个 Ingestion Pipeline 仅能包含一个 `INDEX_DOC` 函数。 |
| `data.clusterID`   | **string**<br/>应用当前 Pipeline 的目标集群。 |
| `data.collectionName`   | **string**<br/>在目标集群中应用当前 Pipeline 的目标 Collection。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 10041 | (Possible pipeline errors are all under this error code.) |

