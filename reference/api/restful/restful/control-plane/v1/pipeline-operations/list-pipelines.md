---
displayed_sidebar: restfulSidebar
sidebar_position: 13
slug: /restful/list-pipelines
title: 查看 Pipeline 列表
---

import RestHeader from '@site/src/components/RestHeader';

列出指定项目中的所有 Pipeline。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/pipelines" />

---

## 示例




:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

```shell
curl --request GET \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines?projectId=proj-**********************"
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
    | `projectId`  | **string**<br/>The ID of the project to which this pipeline belongs.|

- 无路径参数。

- 无请求头参数

### 请求体

No request body required

## 响应

返回 Pipeline 列表。

### 响应体

```json
{
    "code": "string",
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
| __data[][opt_1]__ | __object__<br/> |
| __data[][opt_1].pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data[][opt_1].name__ | __string__  <br/>Pipeline 名称。  |
| __data[][opt_1].type__ | __string__  <br/>Pipeline 类型。对于一个 Ingestion Pipeline 而言，其  |
| __data[][opt_1].description__ | __string__  <br/>Pipeline 描述。  |
| __data[][opt_1].status__ | __string__  <br/>Pipeline 当前状态。仅当其值为 `SERVING` 时 Pipeline 处于工作状态。  |
| __data[][opt_1][].functions__ | __array__<br/>Pipeline 中的函数。一个 Ingestion Pipeline 仅能包含一个 `INDEX_DOC` 函数。 |
| __data[][opt_1][].functions[]__ | __object__ \| __object__ \| __object__ \| __object__<br/> |
| __data[][opt_1][].functions[].[opt_1]__ | __object__<br/> |
| __data[][opt_1][].functions[].[opt_1].name__ | __string__  <br/>要创建的函数的名称。  |
| __data[][opt_1][].functions[].[opt_1].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __data[][opt_1][].functions[].[opt_1][].inputFields__ | __array__<br/>根据您的需求命名字段。在 Ingestion Pipeline 的 `INDEX_TEXT` 函数中，使用它们为用户提供文本。 |
| __data[][opt_1][].functions[].[opt_1][].inputFields[]__ | __string__  <br/>一个输入字段。  |
| __data[][opt_1][].functions[].[opt_1].langauge__ | __string__  <br/>您的文档使用的语言。可能的值是 `english` 或 `chinese`。该参数仅适用于 Ingestion Pipeline。  |
| __data[][opt_1][].functions[].[opt_1].embedding__ | __string__  <br/>使用的嵌入模型的名称。  |
| __data[][opt_1][].functions[].[opt_2]__ | __object__<br/> |
| __data[][opt_1][].functions[].[opt_2].name__ | __string__  <br/>Name of the function to create.  |
| __data[][opt_1][].functions[].[opt_2].action__ | __string__  <br/>Type of the function to create. For an ingestion pipeline,  possible values are `INDEX_DOC` and `PRESERVE`.  |
| __data[][opt_1][].functions[].[opt_2].inputField__ | __string__  <br/>Name the field according to your needs. In an `INDEX_DOC` function of an ingestion pipeline, use it for pre-signed document URLs in GCS or AWS S3 buckets.  |
| __data[][opt_1][].functions[].[opt_2].langauge__ | __string__  <br/>Language that your document is in. Possible values are `english` or `chinese`. The parameter applies only to ingestion pipelines.  |
| __data[][opt_1][].functions[].[opt_2].chunkSize__ | __integer__  <br/>The maximum size of a splitted document segment.  |
| __data[][opt_1][].functions[].[opt_2].embedding__ | __string__  <br/>Name of the embedding model in use.  |
| __data[][opt_1][].functions[].[opt_2].splitBy__ | __string__  <br/>The splitters that Zilliz Cloud uses to split the specified docs.  |
| __data[][opt_1][].functions[].[opt_3]__ | __object__<br/> |
| __data[][opt_1][].functions[].[opt_3].name__ | __string__  <br/>要创建的函数的名称。  |
| __data[][opt_1][].functions[].[opt_3].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __data[][opt_1][].functions[].[opt_3][].inputFields__ | __array__<br/>根据您的需求命名字段。在 Ingestion Pipeline 的 `INDEX_IMAGE` 函数中：`image_url` 代表 GCS 或 AWS S3 存储桶中的预签名图像URL，`image_id` 代表图像ID。 |
| __data[][opt_1][].functions[].[opt_3][].inputFields[]__ | __string__  <br/>一个输入字段。  |
| __data[][opt_1][].functions[].[opt_3].embedding__ | __string__  <br/>使用的嵌入模型的名称。  |
| __data[][opt_1][].functions[].[opt_4]__ | __object__<br/> |
| __data[][opt_1][].functions[].[opt_4].name__ | __string__  <br/>要创建的函数的名称。  |
| __data[][opt_1][].functions[].[opt_4].action__ | __string__  <br/>要创建的函数类型。对于 Ingestion Pipeline，可能的值是 `INDEX_DOC` 和 `PRESERVE`。  |
| __data[][opt_1][].functions[].[opt_4].inputField__ | __string__  <br/>根据您需求命名字段。在 Ingestion Pipeline 的 `PRESERVE` 函数中，Zilliz Cloud 使用该值作为 Collection 中要创建的字段名称。  |
| __data[][opt_1][].functions[].[opt_4].outputField__ | __string__  <br/>输出字段的名称。该值应与 `input_field` 相同。  |
| __data[][opt_1][].functions[].[opt_4].fieldType__ | __string__  <br/>要在目标 Collection 中创建的字段的数据类型。可能的值包括 `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE` 和 `VARCHAR`。  |
| __data[][opt_1].clusterID__ | __string__  <br/>应用当前 Pipeline 的目标集群。  |
| __data[][opt_1].collectionName__ | __string__  <br/>在目标集群中应用当前 Pipeline 的目标 Collection。  |

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
