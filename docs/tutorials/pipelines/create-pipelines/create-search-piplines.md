---
slug: /create-search-piplines
beta: FALSE
notebook: FALSE
token: UvarwFhiJimKxfkduyVcTOqTndb
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 创建 Search Pipelines

您可以通过 Web 控制台或 RESTful API 创建 Pipelines。Web 控制台操作更简单直观，但 RESTful API 可提供更多灵活性。

与 Ingestion 和 Deletion Pipelines 不同，Search Pipeline 创建时是在 Function 级别定义集群和 Collection，而非在 Pipeline 层级。只是因为 Zilliz Cloud 支持同时从多个 Collection 搜索数据。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>目前 Zilliz Cloud 仅支持在阿里云（杭州）的集群中创建 Pipelines。</p></li>
<li><p>在创建 Search Pipeline 前，需要先<a href="./create-ingestion-piplines">创建 Ingestion Pipeline</a>。</p></li>
<li><p>同一项目下，您可最多创建 10 个同一类型的 Pipelines。</p></li>
</ul>

</Admonition>

## 通过 Web 控制台{#via-web-console}

1. 打开项目。

1. 点击左侧导航栏中的 **Pipelines。** 点击** + Pipeline**。

1. 选择需要创建的 Pipeline 类型。点击 Search Pipeline 一栏中的 **+ Pipeline **按钮。 

    ![create-search-pipeline-cn](/img/create-search-pipeline-cn.png)

1. 配置 Search Pipeline。

    |  **参数**      |  **说明**                                          |
    | ------------ | ------------------------------------------------ |
    |  Pipeline 名称 |  新创建的 Ingestion Pipeline 的名称。名称中只可包含小写字母、数字和下划线。 |
    |  描述 (可选)     |  对新创建的 Ingestion Pipeline 的描述。                   |

    ![configure-search-pipeline-cn](/img/configure-search-pipeline-cn.png)

1. 添加 Function。1 个 Search pipeline 中只可添加 1 个 **SEARCH_DOC_CHUNK **Function。

    <Admonition type="info" icon="📘" title="说明">

    <p>为了方便您使用，Web 控制台界面上的输入字段名称默认设置为 <code>query_text</code> 且不可修改。如需修改输入字段名称，请<a href="./create-search-piplines#restful-apivia-restful-api">通过 Restful API 创建 Search pipeline</a>。</p>

    </Admonition>

    1. 输入函数名称。

    1. 选择**目标集群**和**目标 Collection**。目标集群必须为部署在阿里云（杭州）的活跃集群。目标 Collection 必须为创建 Ingestion pipeline 时自动创建的 Collection，否则创建的 Search Pipeline 将不兼容。

    1. 点击**添加**。

1. 点击**创建 Search Pipeline**。

## 通过 RESTful API{#via-restful-api}

<Admonition type="info" icon="📘" title="说明">

<p>Search Pipeline 创建时是在 Function 级别定义集群和 Collection，而非在 Pipeline 层级。</p>

</Admonition>

以下示例代码创建了 1 个名称为 `my_text_search_pipeline` 的 Search Pipeline，并添加了 1 个 **SEARCH_DOC_CHUNK** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",       
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
    }
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群所在云服务地域的 ID。目前仅支持 `ali-cn-hangzhou`。

- `projectId`: 创建 Pipeline 所属的项目 ID。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

- `name`: 创建的 Pipeline 名称。Pipeline 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

- `type`: 创建的 Pipeline 类型。目前，可创建的 Pipeline 类型包括 `INGESTION`、 `SEARCH` 和 `DELETION`。

- `functions`: Pipeline 中添加的 Function。**1 个 Search Pipeline 中仅可添加 1 个 Function。** 

    - `name`: Function 名称。Function 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

    - `action`: Function 类型。您只可以在 Search Pipeline 中添加 1 个 `SEARCH_DOC_CHUNK` Function。

    - `inputField`: 输入字段名称。您可以自由配置该字段的值。但是在[运行 Pipeline](./run-search-pipelines) 时，您需要使用现在定义的输入字段名称。

    - `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

    - `collectionName`: 创建 Pipeline 所属的 Collection 名称。

如果请求返回以下类似内容，则表示 Search Pipeline 创建成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-84e6d9dba930e035150972",
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
    ],
    "totalTokenUsage": 0
  }
}
```

## 相关文档{#related-topics}

- [运行 Search Pipelines](./run-search-pipelines)

- [管理 Pipelines](./manage-pipelines)

- [估算 Pipelines 用量](./estimate-pipelines-usage)

- [使用限制](./limits#pipeline)

