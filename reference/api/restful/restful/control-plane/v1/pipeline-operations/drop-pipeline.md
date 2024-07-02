---
displayed_sidebar: restfulSidebar
sidebar_position: 15
slug: /restful/drop-pipeline
title: 删除 Pipeline
---

import RestHeader from '@site/src/components/RestHeader';

删除一个指定的 Pipeline

<RestHeader method="delete" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/pipelines/{PIPELINE_ID}" />

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

- 无请求头参数

### 请求体

No request body required

## 响应

返回被删除的 Pipeline 详情。

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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data.name__ | __string__  <br/>Pipeline 名称。  |
| __data.type__ | __string__  <br/>Pipeline 类型。对于一个 Ingestion Pipeline 而言，其值应该为 `INGESTION`。  |
| __data.description__ | __string__  <br/>Pipeline 描述。  |
| __data.status__ | __string__  <br/>Pipeline 当前状态。仅当其值为 `SERVING` 时 Pipeline 处于工作状态。  |
| __functions__ | __object__ \| __object__ \| __object__<br/>Pipeline 中的函数。一个 Ingestion Pipeline 仅能包含一个 `INDEX_DOC` 函数。 |
| __functions[opt_1]__ | __object__<br/> |
| __functions[opt_1].name__ | __string__  <br/>函数名称  |
| __functions[opt_1].action__ | __string__  <br/>函数类型。对于一个 Ingestion Pipeline 而言，可选参数值为 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_1][].inputFields__ | __array__<br/>根据您的需要命名字段。在摄取管道的`INDEX_TEXT`函数中，将其用于用户提供的文本。 |
| __functions[opt_1][].inputFields[]__ | __string__  <br/>一个输入字段。  |
| __functions[opt_1].langauge__ | __string__  <br/>待采集文档语种。当前可选值为 `ENGLISH`（英文）或 `CHINESE` （中文）。  |
| __functions[opt_1].embedding__ | __string__  <br/>正在使用的嵌入模型的名称。  |
| __functions[opt_2]__ | __object__<br/> |
| __functions[opt_2].name__ | __string__  <br/>函数名称  |
| __functions[opt_2].action__ | __string__  <br/>函数类型。对于一个 Ingestion Pipeline 而言，可选参数值为 `INDEX_DOC` 和 `PRESERVE`。  |
| __functions[opt_2][].inputFields__ | __array__<br/>根据您的需要命名字段。在摄取管道的`INDEX_IMAGE`函数中：`image_url`代表 GCS 或 AWS S3 存储桶中的预签名图像 URL，`image_id`代表图像 ID。 |
| __functions[opt_2][].inputFields[]__ | __string__  <br/>一个输入字段。  |
| __functions[opt_2].embedding__ | __string__  <br/>正在使用的嵌入模型的名称。  |
| __functions[opt_3]__ | __object__<br/> |
| __functions[opt_3].name__ | __string__  <br/>要创建的函数的名称。  |
| __functions[opt_3].action__ | __string__  <br/>要创建的函数的类型。对于摄取管道，可能的值为`INDEX_DOC`和`PRESERVE`。  |
| __functions[opt_3].inputField__ | __string__  <br/>根据您的需要命名字段。在摄取管道的保留函数中，Zilliz Cloud 将该值用作要创建的集合中的字段名称。  |
| __functions[opt_3].outputField__ | __string__  <br/>输出字段的名称。该值应与`input_field`相同。  |
| __functions[opt_3].fieldType__ | __string__  <br/>要在目标集合中创建的字段的数据类型。可能的值为`BOOL`、`INT8`、`INT16`、`INT32`、`INT64`、`FLOAT`、`DOUBLE`和`VARCHAR`。  |
| __data.clusterID__ | __string__  <br/>应用当前 Pipeline 的目标集群。  |
| __data.collectionName__ | __string__  <br/>在目标集群中应用当前 Pipeline 的目标 Collection。  |

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
                "inputField": "string",
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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data.name__ | __string__  <br/>Pipeline 名称。  |
| __data.type__ | __string__  <br/>管道的类型。对于搜索管道，该值应为`SEARCH`。  |
| __data.description__ | __string__  <br/>Pipeline 描述。  |
| __data.status__ | __string__  <br/>Pipeline 当前状态。仅当其值为 `SERVING` 时 Pipeline 处于工作状态。  |
| __data[].functions__ | __array__<br/>管道中的函数。对于搜索管道，其每个成员函数针对不同的集合。 |
| __data[].functions[]__ | __object__<br/> |
| __data[].functions[].name__ | __string__  <br/>函数名称  |
| __data[].functions[].action__ | __string__  <br/>函数的类型。对于搜索函数，该值应为`SEARCH_DOC_CHUNKS`、`SEARCH_TEXT`和`SEARCH_IMAGE_BY_IMAGE`。  |
| __data[].functions[].inputField__ | __string__  <br/>输入字段名称。对于一个 Search Pipeline 而言，其值应该为查询文本。  |
| __data[].functions[].clusterID__ | __string__  <br/>此函数的目标集群。  |
| __data[].functions[].collectionName__ | __string__  <br/>当前函数在目标集群中指向的 Collection。  |
| __data[].functions[].reranker__ | __string__  <br/>如果您需要重新排序或对一组候选输出进行排名以提高搜索结果的质量，请将此参数设置为重新排序模型。此参数仅适用于文本和文档数据的管道。目前，仅`zilliz/bge-reranker-base`可用作参数值。  |

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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.pipelineId__ | __integer__  <br/>Pipeline ID。  |
| __data.name__ | __string__  <br/>Pipeline 名称。  |
| __data.type__ | __string__  <br/>管道的类型。对于删除管道，该值应为`DELETION`。  |
| __data.description__ | __string__  <br/>Pipeline 描述。  |
| __data.status__ | __string__  <br/>Pipeline 当前状态。仅当其值为 `SERVING` 时 Pipeline 处于工作状态。  |
| __data[].functions__ | __array__<br/>Pipeline 中的函数。一个 Deletion Pipeline 可包含多个成员函数，每个成员函数表示一个待删除文档。 |
| __data[].functions[]__ | __object__<br/> |
| __data[].functions[].name__ | __string__  <br/>函数名称  |
| __data[].functions[].action__ | __string__  <br/>函数的类型。对于删除管道，其成员函数应为`PURGE_BY_EXPRESSION`、`PURGE_DOC_INDEX`和`PURGE_IMAGE_BY_ID`。  |
| __data[].functions[].inputField__ | __string__  <br/>输入字段的名称。对于`PURGE_DOC_INDEX`函数，该值应为要删除的文档的名称。  |
| __data.clusterID__ | __string__  <br/>应用当前 Pipeline 的目标集群。  |
| __data.collectionName__ | __string__  <br/>在目标集群中应用当前 Pipeline 的目标 Collection.  |

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
