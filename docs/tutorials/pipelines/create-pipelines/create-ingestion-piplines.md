---
slug: /create-ingestion-piplines
beta: FALSE
notebook: FALSE
token: QN9PwG3kpiSG46k2LYDc5yQCnVg
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 创建 Ingestion Pipelines

您可以通过 Web 控制台或 RESTful API 创建 Pipelines。Web 控制台操作更简单直观，但 RESTful API 可提供更多灵活性。

在创建 Search 和 Deletion Pipeline 前需要先创建 [Ingestion Pipeline](./understanding-pipelines#ingestion-pipelineingestion-pipelines)。只有在 Ingestion Pipeline 创建成功后，您才可以创建配套的 [Search](./understanding-pipelines#search-pipelinesearch-pipelines) 和 [Deletion Pipeline](./understanding-pipelines#deletion-pipelinedeletion-pipelines)。

在创建 Ingestion pipeline 后，Zilliz Cloud 会自动为其创建一个对应的 [Collection](./cluster-collection-and-entities#collectioncollection)。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>目前 Zilliz Cloud 仅支持在阿里云（杭州）的集群中创建 Pipelines。</p></li>
<li><p>同一项目下，您可最多创建 10 个同一类型的 Pipelines。</p></li>
</ul>

</Admonition>

## 通过 Web 控制台{#via-web-console}

1. 打开项目。

1. 点击左侧导航栏中的 **Pipelines。** 点击** + Pipeline**。

    ![create-pipeline-cn](/img/create-pipeline-cn.png)

1. 选择需要创建的 Pipeline 类型。点击 Ingestion Pipeline 一栏中的 **+ Pipeline **按钮。 

    <Admonition type="info" icon="📘" title="说明">

    <p>在创建 Search 和 Deletion Pipeline 前需要先创建 Ingestion Pipeline。</p>

    </Admonition>

    ![choose-pipeline-cn](/img/choose-pipeline-cn.png)

1. 配置 Ingestion Pipeline。

    |  **参数**        |  **说明**                                          |
    | -------------- | ------------------------------------------------ |
    |  目标集群<br/>  |  自动创建 Collection 所属的集群。目前仅支持部署在阿里云（杭州）的集群。       |
    |  Collection 名称 |  自动创建的 Collection 的名称。                           |
    |  Pipeline 名称   |  新创建的 Ingestion Pipeline 的名称。名称中只可包含小写字母、数字和下划线。 |
    |  描述 (可选)       |  对新创建的 Ingestion Pipeline 的描述。                   |

    ![configure-ingestion-pipeline-cn](/img/configure-ingestion-pipeline-cn.png)

1. 添加 Function。1 个 Ingestion pipeline 中只可添加 1 个 **INDEX_DOC **Function 和至多 5 个 **PRESERVE** Function。

    - 添加 **INDEX_DOC** Function。

         **INDEX_DOC** Function将文档切分为多个文档块，将文档块转换为 Embedding 向量并存储在 Collection 中。

        1. 输入 Function 名称。

        1. 选择用于生成向量的 Embedding 模型。根据所选的文档语言，您可以选择不同的 Embedding 模型。目前 Zilliz Cloud Pipelines 共提供两种 Embedding 模型：英语——**zilliz/bge-base-en-v1.5**，中文——**zilliz/bge-base-zh-v1.5**。

            |  **Embedding 模型 **        |  **说明**                                                                                           |
            | ------------------------- | ------------------------------------------------------------------------------------------------- |
            |  zilliz/bge-base-en-v1.5  |  智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。该模型为**英语**语言的默认模型。 |
            |  zilliz/bge-base-zh-v1.5  |  智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。该模型为**中文**语言的默认模型。 |

        1. (可选) 自定义切片大小。该 Function 将每个文档分割成更小的切片。默认情况下，每个切片包含不超过500 个 Token，但您可以根据自己的切片策略调整切片大小。此外，对于 Markdown 或 HTML 文件，该Function 会首先按标题划分文档，然后根据指定的切片大小进一步按较大的部分划分。

            下表罗列了 Embedding 模型与其可选切片大小范围。

            |  模型                      |  **切片大小范围 (Tokens)** |
            | ------------------------ | -------------------- |
            |  zilliz/bge-base-en-v1.5 |  20-500 Tokens       |
            |  zilliz/bge-base-zh-v1.5 |  20-500 Tokens       |

            ![customize-chunk-size-cn](/img/customize-chunk-size-cn.png)

        1. 点击**添加**。

    - 添加 **PRESERVE** Function。

        **PRESERVE** Function 在 Collection 中添加标量字段，用于保留文档元数据。

        1. 输入 Function 名称。

        1. 配置输入字段名称和数据类型。支持的数据字段类型包括** Bool、Int8、Int16、Int32、Int64、Float,、Double 和 VarChar**。

            <Admonition type="info" icon="📘" title="说明">

            <ul>
            <li><p>目前，输出字段名称必须与输入字段名称保持一致。在运行 Ingestion Pipeline 时，您将使用到输入字段名称。而输出字段名称用于自动生成的 Collection Schema 中作为保留的标量字段名称。</p></li>
            <li><p>字段类型为 <strong>VarChar</strong> 时，字符串最大长度为 100 个字符，且只可包含数字、字母。</p></li>
            <li><p>在标量字段中存储日期时，我们推荐使用 **Int16 **的数据类型。存储时间时，我们推荐使用 **Int32 **的数据类型。</p></li>
            </ul>

            </Admonition>

        1. 点击**添加**。

1. 点击 **创建 Ingestion Pipeline**。

1. 继续创建 Search pipeline 和 Deletion pipeline。创建的 Search 和 Deletion Pipeline 可适应配套刚才创建的Ingestion Pipeline。

    ![ingestion-pipeline-created-successfully-cn](/img/ingestion-pipeline-created-successfully-cn.png)

## 通过 RESTful API{#via-restful-api}

以下示例代码创建了 1 个名称为 `my_doc_ingestion_pipeline` 的 Ingestion Pipeline，并添加了 1 个 **INDEX_DOC** Function 和 1 个 **PRESERVE** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx"，
        "name": "my_doc_ingestion_pipeline",
        "description": "A pipeline that splits a text file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
        "type": "INGESTION",  
        "functions": [
            { 
                "name": "index_my_doc",
                "action": "INDEX_DOC", 
                "inputField": "doc_url", 
                "language": "ENGLISH",
                "chunkSize": 500,
                "embedding": "zilliz/bge-base-en-v1.5"
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
    }
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群所在云服务地域的 ID。目前仅支持 `ali-cn-hangzhou`。

- `projectId`: 创建 Pipeline 所属的项目 ID。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

- `name`: 创建的 Pipeline 名称。Pipeline 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

- `description` (可选): 创建的 Pipeline 描述。

- `type`: 创建的 Pipeline 类型。目前，可创建的 Pipeline 类型包括 `INGESTION`、 `SEARCH` 和 `DELETION`。

- `functions`: Pipeline 中添加的 Function。1 个 Ingestion pipeline 中只可添加 1 个 **INDEX_DOC **Function 和至多 5 个 **PRESERVE** Function。

    - `name`: Function 名称。Function 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

    - `action`: Function 类型。您可以在 Ingestion Pipeline 中添加的 Function 类型包括： `INDEX_DOC` 和 `PRESERVE`。

    - `inputField`: 输入字段名称。对于 `INDEX_DOC` Function，该字段的值应该为 `doc_url`。对于 `PRESERVE` Function，您可以自定义该字段的值，但应该与`outputField` 的值保持一致。

    - `language`: 文档语言。可选择的语言包括 `ENGLISH`（英语） 和 `CHINESE`（中文。*(仅 `INDEX_DOC` Function 中包含此参数。）*

    - `embedding` (可选): 用于生成文本向量的 Embedding 模型。默认情况下，**英语**文档使用 **zilliz/bge-base-en-v1.5** 模型，**中文**文档使用 **zilliz/bge-base-zh-v1.5** 模型。 *(仅 `INDEX_DOC` Function 中包含此参数。）*

        |  **Embedding 模型 **        |  **说明**                                                                                           |
        | ------------------------- | ------------------------------------------------------------------------------------------------- |
        |  zilliz/bge-base-en-v1.5  |  智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。该模型为**英语**语言的默认模型。 |
        |  zilliz/bge-base-zh-v1.5  |  智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。该模型为**中文**语言的默认模型。 |

    - `chunkSize` (可选): `INDEX_DOC` Function 将每个文档分割成更小的切片。默认情况下，每个切片包含不超过500 个 Token，但您可以根据自己的切片策略调整切片大小。此外，对于 Markdown 或 HTML 文件，该Function 会首先按标题划分文档，然后根据指定的切片大小进一步按较大的部分划分。*(仅 `INDEX_DOC` Function 中包含此参数。）*

        下表罗列了 Embedding 模型与其可选切片大小范围。

        |  模型                      |  **切片大小范围 (Tokens)** |
        | ------------------------ | -------------------- |
        |  zilliz/bge-base-en-v1.5 |  20-500 Tokens       |
        |  zilliz/bge-base-zh-v1.5 |  20-500 Tokens       |

    - `outputField`: 输出字段名称。该字段将的值将用于构成 Collection Schema。 `outputField` 字段值应该与 `inputField` 字段值保持一致。 *(仅 `PRESERVE` Function 中包含此参数。）*

    - `fieldType`: 输入和输出字段的字段类型。可选的值包括：`Bool`、`Int8`、`Int16`、`Int32`、`Int64`、`Float`、`Double` 和 `VarChar`。 *(仅 `PRESERVE` Function 中包含此参数。）*

        <Admonition type="info" icon="📘" title="说明">

        <ul>
        <li><p>在标量字段中存储日期时，我们推荐使用 **Int16 **的数据类型。存储时间时，我们推荐使用 **Int32 **的数据类型。</p></li>
        <li><p>对于 <code>VarChar</code> 字段类型而言，字段数据的最大长度<code>max_length</code>不得超过 4,000。</p></li>
        </ul>

        </Admonition>

    - `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

    - `newCollectionName`: 与 Pipeline 同步自动创建的 Collection 名称。

如果请求返回以下类似内容，则表示 Ingestion Pipeline 创建成功：

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

Ingestion Pipeline 创建成功后，Zilliz Cloud 将自动创建名称为 `my_new_collection` 的新 Collection。

该 Collection 中包含 6 个字段：1 个自动生成的 ID 字段、4 个 **INDEX_DOC** function 的输出字段和 1 个 **PRESERVE** function 的输出字段。Collection Schema 如下所示：

|  id<br/> (数据类型: Int64) |  doc_name<br/> (数据类型: VarChar) |  chunk_id<br/> (数据类型: Int64) |  chunk_text<br/> (数据类型: VarChar) |  embedding<br/> (数据类型: FLOAT_VECTOR) |  publish_year<br/> (数据类型: Int16) |
| ------------------------- | --------------------------------- | ------------------------------- | ----------------------------------- | --------------------------------------- | ----------------------------------- |

## 相关文档{#related-topics}

- [管理 Pipelines](./manage-pipelines)

- [运行 Ingestion Pipelines](./run-ingestion-pipelines)

- [估算 Pipelines 用量](./estimate-pipelines-usage)

- [使用限制](./limits#pipeline)

