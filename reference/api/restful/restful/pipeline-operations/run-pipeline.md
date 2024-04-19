---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /run-pipeline
title: 执行 Pipeline
---

import RestHeader from '@site/src/components/RestHeader';

执行一个指定的 Pipeline。

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/pipeline/{PIPELINE_ID}/run" />

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

### 请求体

```json

```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|

## 响应

返回 Pipeline 执行结果。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "num_chunks": "integer",
        "doc_name": "string",
        "token_usage": "integer"
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
| `data.num_chunks`   | **integer**<br/>生成的文档分段数量。 |
| `data.doc_name`   | **string**<br/>被分段的文档名称及扩展名。 |
| `data.token_usage`   | **integer**<br/>当前操作消费的标识符数量。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 10041 | (Possible pipeline errors are all under this error code.) |

