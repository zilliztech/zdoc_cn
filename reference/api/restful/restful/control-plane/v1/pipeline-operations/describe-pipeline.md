---
displayed_sidebar: restfulSidebar
sidebar_position: 4
slug: /restful/describe-pipeline
title: 查看 Pipeline 详情
---

import RestHeader from '@site/src/components/RestHeader';

通过 Pipeline ID 获取详情。

<RestHeader method="get" endpoint="https://controller.${CLOUD_REGION}.vectordb.cloud.zilliz.com.cn:19530/v1/pipelines/{PIPELINE_ID}" />

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

- 无请求头参数

### 请求体

No request body required

## 响应

返回 Pipeline 详情。

### 响应体

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
                "functions": {
                    "oneOf": [
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
                            "inputField": "string",
                            "outputField": "string",
                            "fieldType": "string"
                        }
                    ]
                },
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
                ],
                "clusterId": "string",
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

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__ \| __object__ \| __object__<br/> |
| __data[opt_1]__ | __object__<br/> |
| __data[opt_1].pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data[opt_1].name__ | __string__  <br/>Pipeline 名称。  |
| __data[opt_1].type__ | __string__  <br/>Pipeline 类型。对于 Ingestion Pipeline来说，该值应为`INGESTION`。  |
| __data[opt_1].description__ | __string__  <br/>Pipeline 描述。  |
| __data[opt_1].status__ | __string__  <br/>Pipeline 当前状态。仅当值为`SERVING`时 Pipeline 处于工作状态。  |
| __functions__ | __object__ \| __object__<br/>Pipeline 中的函数。一个 Ingestion Pipeline仅能包含一个 `INDEX_DOC` 函数。 |
| __functions[opt_1]__ | __object__<br/> |
| __functions[opt_1].name__ | __string__  <br/>函数名称  |
| __functions[opt_1].action__ | __string__  <br/>函数类型。对于一个 Ingestion Pipeline 而言，可选参数值为 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_1].inputField__ | __string__  <br/>函数字段名称。对于 `INDEX_DOC` 函数而言，该字段用于存放预签名的 GCS 或 AWS S3 存储桶 URL。  |
| __functions[opt_1].langauge__ | __string__  <br/>待采集文档语种。当前可选值为 `english`（英文）或 `chinese`（中文）。  |
| __functions[opt_1].chunkSize__ | __integer__  <br/>分割文档段的最大大小。  |
| __functions[opt_1].embedding__ | __string__  <br/>使用的嵌入模型的名称。  |
| __functions[opt_1].splitBy__ | __string__  <br/>Zilliz Cloud 用于分割指定文档的分割器。  |
| __functions[opt_2]__ | __object__<br/> |
| __functions[opt_2].name__ | __string__  <br/>函数名称  |
| __functions[opt_2].action__ | __string__  <br/>函数类型。对于一个 Ingestion Pipeline 而言，可选参数值为 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_2].inputField__ | __string__  <br/>输入字段名称。对于 `PRESERVE` 函数而言，该字段用于命名 Pipeline 目标 Collection 中的一个标量字段。  |
| __functions[opt_2].outputField__ | __string__  <br/>输出字段名称。请保持与 `input_field` 相同。  |
| __functions[opt_2].fieldType__ | __string__  <br/>在 Pipeline 目标 Collection 中创建的字段类型。可选值为 `BOOL`、`INT8`、`INT16`、`INT32`、`INT64`、`FLOAT`、`DOUBLE` 和 `VARCHAR`。  |
| __data[opt_1].clusterID__ | __string__  <br/>应用当前Pipeline的目标集群。  |
| __data[opt_1].collectionName__ | __string__  <br/>在目标集群中应用当前Pipeline的目标 Collection。  |
| __data[opt_2]__ | __object__<br/> |
| __data[opt_2].pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data[opt_2].name__ | __string__  <br/>Pipeline 名称。  |
| __data[opt_2].type__ | __string__  <br/>Pipeline 类型。对于 Search Pipeline 而言，其值应该为 `SEARCH`。  |
| __data[opt_2].description__ | __string__  <br/>Pipeline 描述。  |
| __data[opt_2].status__ | __string__  <br/>Pipeline 当前状态。仅当其值为 `SERVING` 时Pipeline处于工作状态。  |
| __data[opt_2][].functions__ | __array__<br/>Pipeline 中的函数。一个 Search Pipeline 可包含多个成员函数，每个成员函数指向不同的 Collection。 |
| __data[opt_2][].functions[]__ | __object__<br/> |
| __data[opt_2][].functions[].name__ | __string__  <br/>函数名称  |
| __data[opt_2][].functions[].action__ | __string__  <br/>函数类型。对于一个 Search Pipeline 而言，其值应该为 `SEARCH_DOC_CHUNKS`。  |
| __data[opt_2][].functions[].inputField__ | __string__  <br/>输入字段名称。对于一个 Search Pipeline 而言，其值应该为查询文本。  |
| __data[opt_2][].functions[].clusterID__ | __string__  <br/>当前函数所指向的目标集群。  |
| __data[opt_2][].functions[].collectionName__ | __string__  <br/>当前函数在目标集群中指向的 Collection。  |
| __data[opt_2].clusterId__ | __string__  <br/>Pipeline 的目标集群。  |
| __data[opt_2].collectionName__ | __string__  <br/>Pipeline 的目标 Collection。  |
| __data[opt_3]__ | __object__<br/> |
| __data[opt_3].pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data[opt_3].name__ | __string__  <br/>Pipeline 名称。  |
| __data[opt_3].type__ | __string__  <br/>Pipeline 类型。对于 Deletion Pipeline 而言，其值应该为 `DELETION`。  |
| __data[opt_3].description__ | __string__  <br/>Pipeline 描述。  |
| __data[opt_3].status__ | __string__  <br/>Pipeline 当前状态。仅当其值为 `SERVING` 时Pipeline处于工作状态。  |
| __data[opt_3][].functions__ | __array__<br/>Pipeline 中的函数。一个 Deletion Pipeline 可包含多个成员函数，每个成员函数表示一个待删除文档。 |
| __data[opt_3][].functions[]__ | __object__<br/> |
| __data[opt_3][].functions[].name__ | __string__  <br/>函数名称  |
| __data[opt_3][].functions[].action__ | __string__  <br/>函数类型。对于一个 Deletion Pipeline 而言，其成员函数类型应该为 `PURGE_DOC_INDEX`。  |
| __data[opt_3][].functions[].inputField__ | __string__  <br/>输入字段名称。对于一个 Deletion Pipeline 而言，其成员函数的输入字段名称应该为待删除文档的名称。  |
| __data[opt_3].clusterID__ | __string__  <br/>应用当前 Pipeline 的目标集群。  |
| __data[opt_3].collectionName__ | __string__  <br/>在目标集群中应用当前 Pipeline 的目标 Collection.  |

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
