---
slug: /manage-pipelines
beta: FALSE
notebook: FALSE
token: BCCjwd2xFivKqUkQrDXcbv0dn5f
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 管理 Pipelines

本文介绍如何管理已创建的 Pipelines

## 查看 Pipelines{#view-pipeline}

### 通过 Web 控制台查看 Pipelines{#on-web-ui}

点击左侧导航栏中的 **Pipelines**。选中 **Pipelines** 选项卡。您可以查看所有已创建的 Pipelines 及其详情、用量等。

![view-pipelines-on-web-ui-cn](/img/view-pipelines-on-web-ui-cn.png)

### 通过 RESTful API 查看 Pipelines{#via-restful-api}

调用以下 API 查看所有 Pipelines 或查看某一特定 Pipeline 详情。

- **查看所有 Pipelines**

    根据以下示例并指定项目 ID `projectId`。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

    ```bash
    curl --request GET \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${YOUR_API_KEY}" \
        --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines?projectId=proj-xxxx"
    ```

    如果请求返回以下类似内容，则表示操作成功：

    ```bash
    {
      "code": 200,
      "data": [
        {
          "pipelineId": "pipe-6ca5dd1b4672659d3c3487",
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
              "chunkSize": 500,
              "embedding": "zilliz/bge-base-en-v1.5"
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
          "pipelineId": "pipe-26a18a66ffc8c0edfdb874",
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
              "collectionName": "my_new_collection",
              "embedding": "zilliz/bge-base-en-v1.5"
            }
          ]
        },
        {
          "pipelineId": "pipe-7227d0729d73e63002ed46",
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

- **查看特定 Pipeline 详情**

    根据以下示例查看某一 Pipeline 详情。如下示例中使用的 `pipelineId` 为 `pipe-6ca5dd1b4672659d3c3487`。在调用 API 时，请确保将该字段的值替换为您的实际值。

    ```bash
    curl --request GET \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${YOUR_API_KEY}" \
        --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines/pipe-6ca5dd1b4672659d3c3487"
    ```

    如果请求返回以下类似内容，则表示操作成功：

    ```bash
    {
      "code": 200,
      "data": {
        "pipelineId": "pipe-6ca5dd1b4672659d3c3487",
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
            "chunkSize": 500,
            "embedding": "zilliz/bge-base-en-v1.5"
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

## 删除 Pipeline{#drop-pipeline}

您可以删除不再需要使用的 Pipelines。该操作仅删除 Pipeline，不会影响自动创建的 Collection。

<Admonition type="info" icon="说明" title="undefined">

<ul>
<li><p>Pipeline 一旦删除后不可恢复，请谨慎操作。</p></li>
<li><p>删除 Ingestion pipeline 时不会影响其相关联的 Collection。您的数据十分安全。</p></li>
</ul>

</Admonition>

### 通过 Web 控制台删除 Pipelines{#on-web-ui}

如需删除不再使用的 Pipeline，请点击操作栏中的**“...”**按钮并选择**删除**。

![delete-pipeline-cn](/img/delete-pipeline-cn.png)

### 通过 RESTful API 删除 Pipelines{#via-restful-api}

根据以下示例删除 Pipelines。如下示例中使用的 `pipelineId` 为 `pipe-6ca5dd1b4672659d3c3487`。在调用 API 时，请确保将该字段的值替换为您的实际值。

```bash
curl --request GET \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines/pipe-6ca5dd1b4672659d3c3487"
```

如果请求返回以下类似内容，则表示操作成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-6ca5dd1b4672659d3c3487",
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
        "chunkSize": 500,
        "embedding": "zilliz/bge-base-en-v1.5"
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

## 相关文档{#related-topics}

- [估算 Pipelines 用量](./estimate-pipelines-usage)

- [运行 Ingestion Pipelines](./run-ingestion-pipelines)

- [运行 Search Pipelines](./run-search-pipelines)

- [运行 Deletion Pipelines](./run-deletion-pipelines)

- [使用限制](./limits#pipelines)

