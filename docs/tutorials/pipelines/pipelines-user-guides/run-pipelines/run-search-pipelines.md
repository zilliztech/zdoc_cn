---
slug: /run-search-pipelines
beta: FALSE
notebook: FALSE
type: origin
token: PosvwF0iKig6eZkMDcNcmhtVn8d
sidebar_position: 2

---

import Admonition from '@theme/Admonition';


# 运行 Search Pipelines

创建后，您可以运行 Search Pipeline，进行语义搜索。

## 通过 Web 控制台{#via-web-console} 

1. 点击 Search Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 配置参数，点击**运行**。

1. 查看运行结果。

## 通过 RESTful API{#via-restful-api}

以下示例代码用于运行 Search pipeline `my_text_search_pipeline`。查询文本为“How many collections can a cluster with more than 8 CUs hold?”（1 个 8 CU 以上的集群最多可创建多少个 Collection）。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
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

以下为参数说明：

- `YOUR_CLUSTER_TOKEN`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `YOUR_PIPELINE_ID`：需要运行的 Pipeline 的 ID。

- 查询输入字段: 字段名称应该与添加添加 SEARCH_DOC_CHUNK Function 时的保持一致。该字段值为您想要查询的问题。

- `params`: 搜索相关参数。

    - `limit`: 返回的 Entity 数量。该参数值为 1-100 之间的整数。`limit` 和 `offset` 参数值总和应小于 **1024。**

    - `offset`: 在搜索结果中跳过的 Entity 数量。最大值为 **1024**。`limit` 和 `offset` 参数值总和应小于 **1024。**

    - `outputFields`: 在搜索结果中一同返回的输出字段。`id`、`distance` 和 `chunk_text`为默认输出字段。

    - `filter`: 搜索是的[过滤](/docs/search-query-and-get#search-with-filters)条件。

请求返回以下类似内容：

```bash
{
  "code": 200,
  "data": {
    "result": [
      {
        "id": "445951244000281783",
        "distance": 0.7270776033401489,
        "chunk_text": "After determining the CU type, you must also specify its size. Note that the\nnumber of collections a cluster can hold varies based on its CU size. A\ncluster with less than 8 CUs can hold no more than 32 collections, while a\ncluster with more than 8 CUs can hold as many as 256 collections.\n\nAll collections in a cluster share the CUs associated with the cluster. To\nsave CUs, you can unload some collections. When a collection is unloaded, its\ndata is moved to disk storage and its CUs are freed up for use by other\ncollections. You can load the collection back into memory when you need to\nquery it. Keep in mind that loading a collection requires some time, so you\nshould only do so when necessary.\n\n## Collection\n\nA collection collects data in a two-dimensional table with a fixed number of\ncolumns and a variable number of rows. In the table, each column corresponds\nto a field, and each row represents an entity.\n\nThe following figure shows a sample collection that comprises six entities and\neight fields.\n\n### Fields\n\nIn most cases, people describe an object in terms of its attributes, including\nsize, weight, position, etc. These attributes of the object are similar to the\nfields in a collection.\n\nAmong all the fields in a collection, the primary key is one of the most\nspecial, because the values stored in this field are unique throughout the\nentire collection. Each primary key maps to a different record in the\ncollection.",
        "chunk_id": 123,
        "doc_name": "zilliz_concept_doc.md",
      }
    ],
    "token_usage": 200
  }
}
```

## 相关文档{#related-topics}

- [管理 Pipelines](./manage-pipelines)

- [估算 Pipelines 用量](./estimate-pipelines-usage)

- [使用限制](./limits#pipelines)

