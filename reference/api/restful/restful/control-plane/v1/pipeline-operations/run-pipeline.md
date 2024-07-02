---
displayed_sidebar: restfulSidebar
sidebar_position: 18
slug: /restful/run-pipeline
title: 执行 Pipeline
---

import RestHeader from '@site/src/components/RestHeader';

执行一个指定的 Pipeline。

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/pipeline/{PIPELINE_ID}/run" />

---

## 示例




:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

- 执行 Ingestion Pipeline.

    ```shell
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/pipe-6ca5dd1b4672659d3c3487/run" \
        -d '{
            "data": {
                "doc_url": "https://storage.googleapis.com/example-bucket/zilliz_concept_doc.md?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=example%40example-project.iam.gserviceaccount.com%2F20181026%2Fus-central1%2Fstorage%2Fgoog4_request&X-Goog-Date=20181026T181309Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=247a2aa45f169edf4d187d54e7cc46e4731b1e6273242c4f4c39a1d2507a0e58706e25e3a85a7dbb891d62afa8496def8e260c1db863d9ace85ff0a184b894b117fe46d1225c82f2aa19efd52cf21d3e2022b3b868dcc1aca2741951ed5bf3bb25a34f5e9316a2841e8ff4c530b22ceaa1c5ce09c7cbb5732631510c20580e61723f5594de3aea497f195456a2ff2bdd0d13bad47289d8611b6f9cfeef0c46c91a455b94e90a66924f722292d21e24d31dcfb38ce0c0f353ffa5a9756fc2a9f2b40bc2113206a81e324fc4fd6823a29163fa845c8ae7eca1fcf6e5bb48b3200983c56c5ca81fffb151cca7402beddfc4a76b133447032ea7abedc098d2eb14a7", 
                "publish_year": 2023
            }
        }'
    ```

    成功响应示例：

    ```shell
    {
        "code": 200,
        "data": {
            "doc_name": "zilliz_concept_doc.md",
            "num_chunks": 123,
            "token_usage": 200
        }
    }
    ```

- 执行 Search Pipeline.

    ```shell
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/pipe-26a18a66ffc8c0edfdb874/run" \
        -d '{
            "data": {
                "query_text": "How many collections can a cluster with more than 8 CUs hold?"
            },
            "params":{
                "limit": 1,
                "offset": 0,
                "outputFields": [ "chunk_text", "chunk_id", "doc_name" ],
                "filter": "chunk_id >= 0", 
            }
        }'
    ```

    成功响应示例：

    ```shell
    {
        "code": 200,
        "data": {
            "token_usage": 200,
            "result": [
                {
                    "id": "445951244000281783",
                    "distance": 0.7270776033401489,
                    "chunk_text": "After determining the CU type, you must also specify its size. Note that the\nnumber of collections a cluster can hold varies based on its CU size. A\ncluster with less than 8 CUs can hold no more than 32 collections, while a\ncluster with more than 8 CUs can hold as many as 256 collections.\n\nAll collections in a cluster share the CUs associated with the cluster. To\nsave CUs, you can unload some collections. When a collection is unloaded, its\ndata is moved to disk storage and its CUs are freed up for use by other\ncollections. You can load the collection back into memory when you need to\nquery it. Keep in mind that loading a collection requires some time, so you\nshould only do so when necessary.\n\n## Collection\n\nA collection collects data in a two-dimensional table with a fixed number of\ncolumns and a variable number of rows. In the table, each column corresponds\nto a field, and each row represents an entity.\n\nThe following figure shows a sample collection that comprises six entities and\neight fields.\n\n### Fields\n\nIn most cases, people describe an object in terms of its attributes, including\nsize, weight, position, etc. These attributes of the object are similar to the\nfields in a collection.\n\nAmong all the fields in a collection, the primary key is one of the most\nspecial, because the values stored in this field are unique throughout the\nentire collection. Each primary key maps to a different record in the\ncollection.",
                    "chunk_id": 123,
                    "doc_name": "zilliz_concept_doc.md"
                }
            ],
        }
    }
    ```

- 执行 Deletion Pipeline.

    ```shell
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/pipe-7227d0729d73e63002ed46/run" \
        -d '{
            "data": {
                "doc_name": "zilliz_concept_doc.md",
            }
        }'
    ```    

    成功响应示例：

    ```shell
    {
        "code": 200,
        "data": {
            "num_deleted_chunks": 567
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

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|
    | __Content-Type__  | **string**<br/>|

### 请求体

#### 选项 1: 数据摄取参数。

```json
{}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __data__ | __object__ \| __object__ \| __object__<br/>Ingestion 参数 |
| __data[opt_1]__ | __object__<br/> |
| __data[opt_1].doc_url__ | __string__  <br/>存储在对象存储上的文档的URL。您应该使用未编码或UTF-8编码的URL。确保URL至少在一个小时内有效。  |
| __data[opt_1].\{YOUR_PRESERVED_FIELD}__ | __string__  <br/>The metadata field to preserve. The input field name should be consistent with what you defined when creating the Ingestion pipeline and adding the PRESERVE function. The value of this field should also follow the predefined field type.  |
| __data[opt_2]__ | __object__<br/> |
| __data[opt_2].text_list__ | __string__  <br/>要摄取的文本或文本列表。  |
| __data[opt_2].source__ | __string__  <br/>要保留的元数据字段。输入字段名称应与创建 Ingestion Pipeline 并添加保留函数时所定义的名称一致。该字段的值也应遵循预定义的字段类型。  |
| __data[opt_3]__ | __object__<br/> |
| __data[opt_3].image_url__ | __string__  <br/>存储在对象存储上的图像的URL。您应该使用未编码或UTF-8编码的URL。确保URL至少在一个小时内有效。  |
| __data[opt_3].image_id__ | __string__  <br/>存储在对象存储上的图像的ID。  |
| __data[opt_3].image_title__ | __string__  <br/>图像的标题。  |

#### 选项 2: 

```json
{
    "data": {
        "query_text": "string",
        "query_image_url": "string"
    },
    "params": {
        "limit": "integer",
        "offset": "integer",
        "outputFields": [],
        "filter": "string"
    }
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __data__ | __object__<br/>搜索数据。 |
| __data.query_text__ | __string__  <br/>查询文本。Zilliz Cloud 将其嵌入并使用生成的向量嵌入在目标 Collection 中进行搜索。这适用于 SEARCH_TEXT 或 SEARCH_DOC_CHUNK 类型的 Pipeline。  |
| __data.query_image_url__ | __string__  <br/>查询图像的URL。这适用于 SEARCH_IMAGE_BY_IMAGE 类型的 Pipeline。  |
| __params__ | __object__<br/>搜索参数。 |
| __params.limit__ | __integer__  <br/>要返回的记录总数。  |
| __params.offset__ | __integer__  <br/>在搜索结果中要跳过的记录总数。  |
| __params[].outputFields__ | __array__<br/>搜索结果中每个匹配项要输出的字段列表。 |
| __params[].outputFields[]__ | __string__  <br/>一个有效的输出字段，应该是在保留函数中定义的字段。  |
| __params.filter__ | __string__  <br/>Zilliz Cloud 在实际搜索前用于过滤记录的布尔表达式。  |

#### 选项 3: 

```json
{
    "code": "string",
    "data": {
        "expression": "string",
        "doc_name": "string",
        "image_id": "string"
    }
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __data__ | __object__<br/>文档删除请求的有效载荷。 |
| __data.expression__ | __string__  <br/>一个过滤表达式。这适用于 INDEX_TEXT 类型的 Pipeline。  |
| __data.doc_name__ | __string__  <br/>要删除的文档的名称。注意，您可以通过其名称删除文档，并且文档的所有块都将被删除。这适用于 INDEX_DOC_CHUNK 类型的 Pipeline。  |
| __data.image_id__ | __string__  <br/>图像的ID。这适用于 INDEX_IMAGE 类型的 Pipeline。  |

## 响应

返回 Pipeline 执行结果。

### 响应体

#### 选项 1: 

```json
{
    "code": "integer",
    "data": {
        "oneOf": [
            {
                "num_entities": "integer",
                "ids": [
                    {}
                ],
                "usage": {
                    "embedding": "integer"
                }
            },
            {
                "num_chunks": "integer",
                "doc_name": "string",
                "usage": {
                    "embedding": "integer"
                }
            },
            {
                "num_entities": "integer",
                "usage": {
                    "embedding": "string"
                }
            }
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__ \| __object__ \| __object__<br/>响应的有效载荷。 |
| __data[opt_1]__ | __object__<br/> |
| __data[opt_1].num_entities__ | __integer__  <br/>添加到 Collection 的文本字符串的数量。  |
| __data[opt_1][].ids__ | __array__<br/>Collection 中返回的文本字符串的IDs。 |
| __data[opt_1][].ids[]__ | __integer__  <br/>  |
| __data[opt_1].usage__ | __object__<br/>Token使用统计。 |
| __data[opt_1].usage.embedding__ | __integer__  <br/>文本嵌入中使用的token数量。  |
| __data[opt_2]__ | __object__<br/>响应的有效载荷。 |
| __data[opt_2].num_chunks__ | __integer__  <br/>生成的块数。  |
| __data[opt_2].doc_name__ | __string__  <br/>带文件扩展名的分块文档的名称。  |
| __data[opt_2].usage__ | __object__<br/>Token使用统计。 |
| __data[opt_2].usage.embedding__ | __integer__  <br/>文本嵌入中使用的token数量。  |
| __data[opt_3]__ | __object__<br/> |
| __data[opt_3].num_entities__ | __integer__  <br/>添加的图像数量。  |
| __data[opt_3].usage__ | __object__<br/>Token使用统计。 |
| __data[opt_3].usage.embedding__ | __string__  <br/>图像嵌入中使用的token数量。  |

#### 选项 2: 

```json
{
    "code": "integer",
    "data": {
        "results": {
            "oneOf": [
                [
                    {
                        "id": "string",
                        "distance": "string",
                        "chuck_text": "string",
                        "chunk_id": "string",
                        "doc_name": "string"
                    }
                ],
                [
                    {
                        "id": "string",
                        "distance": "string",
                        "text": "string"
                    }
                ],
                [
                    {
                        "id": "string",
                        "distance": "string",
                        "image_id": "string",
                        "image_title": "string"
                    }
                ]
            ]
        },
        "usage": {
            "embedding": "integer"
        }
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/>响应的有效载荷。 |
| __results__ | __array__ \| __array__ \| __array__<br/> |
| __results[][opt_1]__ | __array__<br/>返回的搜索结果。它是一个对象数组。 |
| __results[][opt_1][]__ | __object__<br/> |
| __results[][opt_1][].id__ | __string__  <br/>命中 Entity 的ID，代表文档的一个块。  |
| __results[][opt_1][].distance__ | __string__  <br/>与指定查询字符串的向量嵌入的距离。  |
| __results[][opt_1][].chuck_text__ | __string__  <br/>一个搜索到的文档块。  |
| __results[][opt_1][].chunk_id__ | __string__  <br/>搜索到的块的ID。  |
| __results[][opt_1][].doc_name__ | __string__  <br/>被搜索块所属的文档的名称。  |
| __results[][opt_2]__ | __array__<br/> |
| __results[][opt_2][]__ | __object__<br/> |
| __results[][opt_2][].id__ | __string__  <br/>命中 Entity 的ID，代表文档的一个块。  |
| __results[][opt_2][].distance__ | __string__  <br/>与指定查询字符串的向量嵌入的距离。  |
| __results[][opt_2][].text__ | __string__  <br/>搜索到的文本。  |
| __results[][opt_3]__ | __array__<br/> |
| __results[][opt_3][]__ | __object__<br/> |
| __results[][opt_3][].id__ | __string__  <br/>命中 Entity 的ID，代表文档的一个块。  |
| __results[][opt_3][].distance__ | __string__  <br/>与指定查询字符串的向量嵌入的距离。  |
| __results[][opt_3][].image_id__ | __string__  <br/>在对象存储中搜索到的图像的ID。  |
| __results[][opt_3][].image_title__ | __string__  <br/>搜索到的图像的标题。  |
| __data.usage__ | __object__<br/>Token使用统计。 |
| __data.usage.embedding__ | __integer__  <br/>嵌入中使用的token数量。  |

#### 选项 3: 

```json
{
    "code": "string",
    "data": {
        "num_deleted_chunks": "integer"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.num_deleted_chunks__ | __integer__  <br/>已删除块的数量。请注意，如果 Deletion Pipeline 携带文档的名称，Zilliz Cloud 将删除该文档的所有块。  |

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
