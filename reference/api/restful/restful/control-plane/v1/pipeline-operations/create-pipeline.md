---
displayed_sidebar: restfulSidebar
sidebar_position: 12
slug: /restful/create-pipeline
title: 创建 Pipeline
---

import RestHeader from '@site/src/components/RestHeader';

创建一个 Pipeline

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/pipelines" />

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

- 无请求头参数

### 请求体

#### 选项 1: 

```json
{
    "name": "string",
    "type": "string",
    "description": "string",
    "functions": [
        {
            "name": "string",
            "action": "string",
            "inputField": "string",
            "outputField": "string",
            "fieldType": "string"
        }
    ],
    "clusterId": "string",
    "collectionName": "string",
    "projectId": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __name__ | __string__  <br/>要创建的 Pipeline 的名称。  |
| __type__ | __string__  <br/>要创建的 Pipeline 的类型。对于 Ingestion Pipeline，值应该是 `INGESTION`。  |
| __description__ | __string__  <br/>要创建的 Pipeline 的描述。  |
| __functions__ | __array__<br/>在创建 Pipeline 中要执行的操作。对于Ingestion Pipeline，您只能添加一个文档索引函数和多个 `PRESERVE` 函数。 |
| __functions[]__ | __object__ \| __object__ \| __object__ \| __object__<br/> |
| __functions[][opt_1]__ | __object__<br/> |
| __functions[][opt_1].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[][opt_1].action__ | __string__  <br/>要创建的函数的类型。对于 Ingestion Pipeline，可能的值包括 `INDEX_DOC`, `INDEX_TEXT`, `INDEX_IMAGE` 和 `PRESERVE`。  |
| __functions[][opt_1].embedding__ | __string__  <br/>用于将文本转换为向量嵌入的嵌入模型的名称。可能的值，请参考 [Ingest, Search, and Delete Data](/docs/pipelines-ingest-search-delete-data)。  |
| __functions[][opt_1].language__ | __string__  <br/>您的文档的语言。可能的值是 `ENGLISH` 和 `CHINESE`。  |
| __functions[][opt_2]__ | __object__<br/> |
| __functions[][opt_2].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[][opt_2].action__ | __string__  <br/>要创建的函数的类型。对于 Ingestion Pipeline，可能的值包括 `INDEX_DOC`, `INDEX_TEXT`, `INDEX_IMAGE` 和 `PRESERVE`。  |
| __functions[][opt_2].embedding__ | __string__  <br/>用于将文本转换为向量嵌入的嵌入模型的名称。可能的值，请参考 [Ingest, Search, and Delete Data](/docs/pipelines-ingest-search-delete-data)。  |
| __functions[][opt_2].language__ | __string__  <br/>您的文档的语言。可能的值是 `ENGLISH` 和 `CHINESE`。  |
| __functions[][opt_2].chunkSize__ | __string__  <br/>分割文档段的最大大小。<br/>The value defaults to 500  |
| __functions[][opt_2][].splitBy__ | __array__<br/>Zilliz Cloud 用于将指定文档拆分成较小块的分割器。默认值是 `["\n\n", "\n", " ", ""]`。 |
| __functions[][opt_2][].splitBy[]__ | __string__  <br/>一个分割器。  |
| __functions[][opt_3]__ | __object__<br/> |
| __functions[][opt_3].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[][opt_3].action__ | __string__  <br/>要创建的函数类型。对于Ingestion Pipeline，可能的值是 `INDEX_DOC`, `INDEX_TEXT`, `INDEX_IMAGE` 和 `PRESERVE`。  |
| __functions[][opt_3].embedding__ | __string__  <br/>用于将文本转换为向量嵌入的嵌入模型名称。可能的值，请参考 [Ingest, Search, and Delete Data](/docs/pipelines-ingest-search-delete-data)。  |
| __functions[][opt_4]__ | __object__<br/> |
| __functions[][opt_4].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[][opt_4].action__ | __string__  <br/>要创建的函数类型。对于Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[][opt_4].inputField__ | __string__  <br/>根据需要命名字段。在Ingestion Pipeline的 `PRESERVE` 函数中，Zilliz Cloud 使用该值作为 Collection 中字段的名称。  |
| __functions[][opt_4].outputField__ | __string__  <br/>输出字段的名称。该值应与 `input_field` 相同。  |
| __functions[][opt_4].fieldType__ | __string__  <br/>在目标 Collection 中要创建的字段的数据类型。可能的值包括 `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE` 和 `VARCHAR`。  |
| __clusterId__ | __string__  <br/>目标集群的 ID。您可以在 Zilliz Cloud 控制台的集群详情中找到它。  |
| __collectionName__ | __string__  <br/>要在指定集群中创建的 Collection 的名称。Zilliz Cloud 会使用这个值创建一个新的 Collection 并命名。  |
| __projectId__ | __string__  <br/>目标集群所属的项目 ID。  |

#### 选项 2: 

```json
{
    "name": "string",
    "description": "string",
    "type": "string",
    "functions": [
        {
            "name": "string",
            "action": "string",
            "clusterId": "string",
            "collectionName": "string",
            "embedding": "string",
            "reranker": "string"
        }
    ],
    "projectId": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __name__ | __string__  <br/>要创建的 Pipeline 的名称。  |
| __description__ | __string__  <br/>要创建的 Pipeline 的描述。  |
| __type__ | __string__  <br/>要创建的 Pipeline 的类型。对于Search Pipeline，值应该是 `SEARCH`。  |
| __functions__ | __array__<br/>在创建Search Pipeline时需要执行的操作。您可以定义多个函数以从不同的 Collection 检索结果。 |
| __functions[]__ | __object__<br/> |
| __functions[].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[].action__ | __string__  <br/>要创建的函数类型。对于Search Pipeline，可能的值是 `SEARCH_TEXT`, `SEARCH_DOC_CHUNK` 和 `SEARCH_IMAGE_BY_IMAGE`。  |
| __functions[].clusterId__ | __string__  <br/>Zilliz Cloud 进行搜索的目标 Collection 的 ID。  |
| __functions[].collectionName__ | __string__  <br/>Zilliz Cloud 进行搜索的 Collection 的名称。  |
| __functions[].embedding__ | __string__  <br/>在向量搜索中使用的嵌入模型。模型应与兼容 Collection 中选择的模型一致。  |
| __functions[].reranker__ | __string__  <br/>如果您需要重新排序或对一组候选输出进行排名以提高搜索结果的质量，请将此参数设置为重新排序模型。此参数仅适用于文本和文档数据的 Pipeline。目前，只有 `zilliz/bge-reranker-base` 可作为参数值。  |
| __projectId__ | __string__  <br/>目标集群所属的项目 ID。  |

#### 选项 3: 

```json
{
    "name": "string",
    "description": "string",
    "type": "string",
    "functions": [
        {
            "name": "string",
            "action": "string"
        }
    ],
    "clusterId": "string",
    "collectionName": "string",
    "projectId": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __name__ | __string__  <br/>要创建的 Pipeline 的名称。  |
| __description__ | __string__  <br/>要创建的 Pipeline 的描述。  |
| __type__ | __string__  <br/>要创建的 Pipeline 的类型。对于Deletion Pipeline，值应该是 `DELETION`。  |
| __functions__ | __array__<br/>要在创建的 Pipeline 中执行的操作。 |
| __functions[]__ | __object__<br/> |
| __functions[].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[].action__ | __string__  <br/>要创建的函数类型。对于Deletion Pipeline，可能的值是 `PURGE_BY_EXPRESSION`, `PURGE_DOC_INDEX` 和 `PURGE_IMAGE_INDEX`。  |
| __clusterId__ | __string__  <br/>目标集群的ID。您可以在Zilliz Cloud控制台的集群详情中找到它。  |
| __collectionName__ | __string__  <br/>要在指定集群中创建的 Collection 的名称。Zilliz Cloud会使用此值创建并命名一个新的 Collection。  |
| __projectId__ | __string__  <br/>目标集群所属项目的ID。  |

## 响应

返回成功创建的 Pipeline 详情。

### 响应体

#### 选项 1: 

```json
{
    "code": "integer",
    "data": {
        "pipelineId": "integer",
        "name": "string",
        "type": "string",
        "description": "string",
        "status": "string",
        "functions": {
            "oneOf": [
                {
                    "name": "string",
                    "action": "string",
                    "inputFields": [
                        {}
                    ],
                    "langauge": "string",
                    "embedding": "string"
                },
                {
                    "name": "string",
                    "action": "string",
                    "inputField": "string",
                    "langauge": "string",
                    "chunkSize": "integer",
                    "embedding": "string",
                    "splitBy": "string"
                },
                {
                    "name": "string",
                    "action": "string",
                    "inputFields": [
                        {}
                    ],
                    "embedding": "string"
                },
                {
                    "name": "string",
                    "action": "string",
                    "inputField": "string",
                    "outputField": "string",
                    "fieldType": "string"
                }
            ]
        },
        "clusterID": "string",
        "collectionName": "string"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.pipelineId__ | __integer__  <br/>Pipeline 的ID。  |
| __data.name__ | __string__  <br/>Pipeline 的名称。  |
| __data.type__ | __string__  <br/>Pipeline 的类型。对于 Ingestion Pipeline，值应该是 `INGESTION`。  |
| __data.description__ | __string__  <br/>Pipeline 的描述。  |
| __data.status__ | __string__  <br/>Pipeline 的当前状态。如果值不是 `SERVING`，则 Pipeline 不工作。  |
| __functions__ | __object__ \| __object__ \| __object__ \| __object__<br/>Pipeline 中的函数。对于 Ingestion Pipeline，应该只有一个 `INDEX_DOC` 函数。 |
| __functions[opt_1]__ | __object__<br/> |
| __functions[opt_1].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[opt_1].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_1][].inputFields__ | __array__<br/>根据您的需求命名字段。在 Ingestion Pipeline 的 `INDEX_TEXT` 函数中，使用它们为用户提供文本。 |
| __functions[opt_1][].inputFields[]__ | __string__  <br/>一个输入字段。  |
| __functions[opt_1].langauge__ | __string__  <br/>您的文档使用的语言。可能的值是 `english` 或 `chinese`。该参数仅适用于 Ingestion Pipeline。  |
| __functions[opt_1].embedding__ | __string__  <br/>使用的嵌入模型的名称。  |
| __functions[opt_2]__ | __object__<br/> |
| __functions[opt_2].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[opt_2].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_2].inputField__ | __string__  <br/>根据您的需求命名字段。在 Ingestion Pipeline 的 `INDEX_DOC` 函数中，使用它为 GCS 或 AWS S3 存储桶中的预签名文档URL。  |
| __functions[opt_2].langauge__ | __string__  <br/>您的文档使用的语言。可能的值是 `english` 或 `chinese`。该参数仅适用于 Ingestion Pipeline。  |
| __functions[opt_2].chunkSize__ | __integer__  <br/>分割文档段的最大大小。  |
| __functions[opt_2].embedding__ | __string__  <br/>使用的嵌入模型的名称。  |
| __functions[opt_2].splitBy__ | __string__  <br/>Zilliz Cloud 用于分割指定文档的分割器。  |
| __functions[opt_3]__ | __object__<br/> |
| __functions[opt_3].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[opt_3].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_3][].inputFields__ | __array__<br/>根据您的需求命名字段。在 Ingestion Pipeline 的 `INDEX_IMAGE` 函数中：`image_url` 代表 GCS 或 AWS S3 存储桶中的预签名图像URL，`image_id` 代表图像ID。 |
| __functions[opt_3][].inputFields[]__ | __string__  <br/>一个输入字段。  |
| __functions[opt_3].embedding__ | __string__  <br/>使用的嵌入模型的名称。  |
| __functions[opt_4]__ | __object__<br/> |
| __functions[opt_4].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[opt_4].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_4].inputField__ | __string__  <br/>根据您的需求命名字段。在 Ingestion Pipeline 的 `PRESERVE` 函数中，Zilliz Cloud 使用该值作为 Collection 中字段的名称。  |
| __functions[opt_4].outputField__ | __string__  <br/>输出字段的名称。该值应与 `input_field` 相同。  |
| __functions[opt_4].fieldType__ | __string__  <br/>要在目标 Collection 中创建的字段的数据类型。可能的值包括 `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE` 和 `VARCHAR`。  |
| __data.clusterID__ | __string__  <br/>Pipeline 所应用的目标集群。  |
| __data.collectionName__ | __string__  <br/>Pipeline 所应用的目标 Collection。  |

#### 选项 2: 

```json
{
    "code": "integer",
    "data": {
        "pipelineId": "integer",
        "name": "string",
        "type": "string",
        "description": "string",
        "status": "string",
        "functions": [
            {
                "name": "string",
                "action": "string",
                "inputFields": [
                    {}
                ],
                "clusterID": "string",
                "collectionName": "string",
                "reranker": "string"
            }
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.pipelineId__ | __integer__  <br/>Pipeline 的ID。  |
| __data.name__ | __string__  <br/>Pipeline 的名称。  |
| __data.type__ | __string__  <br/>Pipeline 的类型。对于 Search Pipeline，值应该是 `SEARCH`。  |
| __data.description__ | __string__  <br/>Pipeline 的描述。  |
| __data.status__ | __string__  <br/>Pipeline 的当前状态。如果值不是 `SERVING`，则 Pipeline 不工作。  |
| __data[].functions__ | __array__<br/>Pipeline 中的函数。对于 Search Pipeline，其每个成员函数针对不同的 Collection。 |
| __data[].functions[]__ | __object__<br/> |
| __data[].functions[].name__ | __string__  <br/>函数的名称。  |
| __data[].functions[].action__ | __string__  <br/>函数的类型。对于搜索函数，值应该是 `SEARCH_DOC_CHUNKS`, `SEARCH_TEXT` 和 `SEARCH_IMAGE_BY_IMAGE`。  |
| __data[].functions[][].inputFields__ | __array__<br/>Name of the input fields. |
| __data[].functions[][].inputFields[]__ | __string__  <br/>For a `SEARCH_DOC_CHUNKS` or a `SEARCH_IMAGE_BY_TEXT` function, you should include `query_text` as the value.  |
| __data[].functions[].clusterID__ | __string__  <br/>此函数的目标集群。  |
| __data[].functions[].collectionName__ | __string__  <br/>此函数的目标 Collection。  |
| __data[].functions[].reranker__ | __string__  <br/>如果您需要重新排序或对一组候选输出进行排名以提高搜索结果的质量，请将此参数设置为重新排序模型。此参数仅适用于文本和文档数据的 Pipeline。目前，只有 `zilliz/bge-reranker-base` 可作为参数值。  |

#### 选项 3: 

```json
{
    "code": "integer",
    "data": {
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
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.pipelineId__ | __integer__  <br/>Pipeline 的ID。  |
| __data.name__ | __string__  <br/>Pipeline 的名称。  |
| __data.type__ | __string__  <br/>Pipeline 的类型。对于 Deletion Pipeline，值应该是 `DELETION`。  |
| __data.description__ | __string__  <br/>Pipeline 的描述。  |
| __data.status__ | __string__  <br/>Pipeline 的当前状态。如果值不是 `SERVING`，则 Pipeline 不工作。  |
| __data[].functions__ | __array__<br/>Pipeline 中的函数。对于 Deletion Pipeline，可以有多个成员函数，每个函数代表一个删除请求。 |
| __data[].functions[]__ | __object__<br/> |
| __data[].functions[].name__ | __string__  <br/>函数的名称。  |
| __data[].functions[].action__ | __string__  <br/>函数的类型。对于 Deletion Pipeline，其成员函数应该是 `PURGE_BY_EXPRESSION`、`PURGE_DOC_INDEX` 和 `PURGE_IMAGE_BY_ID`。  |
| __data[].functions[].inputField__ | __string__  <br/>输入字段的名称。对于 `PURGE_DOC_INDEX` 函数，值应该是要删除的文档的名称。  |
| __data.clusterID__ | __string__  <br/>Pipeline 的目标集群。  |
| __data.collectionName__ | __string__  <br/>Pipeline 的目标 Collection。  |

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
