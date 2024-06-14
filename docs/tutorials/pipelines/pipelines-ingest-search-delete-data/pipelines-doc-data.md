---
slug: /pipelines-doc-data
beta: FALSE
notebook: FALSE
type: origin
token: Nfcswlzoyi5xckklF37csr0QnJh
sidebar_position: 2

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 文档数据

您可以通过 Web 控制台或 RESTful API 创建、运行和管理 Pipelines。Web 控制台操作更简单直观，但 RESTful API 可提供更多灵活性。

本文将介绍如何创建文档 Pipeline、进行语义搜索并删除 Pipeline。

## 前提条件与限制{#prerequisites-and-limitations}

- 请确保您创建部署在阿里云（杭州）的集群。

- 同一项目下，您可最多创建 10 个同一类型的 Pipelines。更多详情，请参考[使用限制](./limits#pipelines)。

## 摄取文档数据{#ingest-doc-data}

摄取文档数据包含两个步骤：创建 Ingestion Pipeline 和运行 Ingestion Pipeline。

### 创建文档 Ingestion Pipeline{#create-doc-ingestion-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 打开项目。

1. 点击左侧导航栏中的 **Pipelines**。 选中**概览**标签页，并切换到 **Pipelines**。点击 **+ Pipeline**。

    ![create-pipeline-cn](/img/create-pipeline-cn.png)

1. 选择需要创建的 Pipeline 类型。点击 Ingestion Pipeline 一栏中的 **+ Pipeline** 按钮。 

    ![choose-pipeline-cn](/img/choose-pipeline-cn.png)

1. 配置 Ingestion Pipeline。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>说明</strong></p></th>
       </tr>
       <tr>
         <td><p>目标集群</p></td>
         <td><p>自动创建 Collection 所属的集群。目前仅支持部署在阿里云（杭州）的集群。</p></td>
       </tr>
       <tr>
         <td><p>Collection 名称</p></td>
         <td><p>自动创建的 Collection 的名称。</p></td>
       </tr>
       <tr>
         <td><p>Pipeline 名称</p></td>
         <td><p>新创建的 Ingestion Pipeline 的名称。名称中只可包含小写字母、数字和下划线。</p></td>
       </tr>
       <tr>
         <td><p>描述 (可选)</p></td>
         <td><p>对新创建的 Ingestion Pipeline 的描述。</p></td>
       </tr>
    </table>

    ![configure-ingestion-pipeline-cn](/img/configure-ingestion-pipeline-cn.png)

1. 添加 Function。1 个 Ingestion pipeline 中只可添加 1 个 **INDEX** Function。

    1. 输入 Function 名称。

    1. 选择 **INDEX_DOC** Function。将对象存储（OSS）预签名 URL 中或本地上传的文档切分为文档块，并转换为 Embedding 向量。

    1. 选择用于生成向量的 Embedding 模型。根据所选的文档语言，您可以选择不同的 Embedding 模型。目前 Zilliz Cloud Pipelines 共提供两种 Embedding 模型：英语——**zilliz/bge-base-en-v1.5**，中文——**zilliz/bge-base-zh-v1.5**。

        <table>
           <tr>
             <th><p><strong>Embedding 模型</strong></p></th>
             <th><p><strong>说明</strong></p></th>
           </tr>
           <tr>
             <td><p>zilliz/bge-base-en-v1.5</p></td>
             <td><p>智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。</p></td>
           </tr>
           <tr>
             <td><p>zilliz/bge-base-zh-v1.5</p></td>
             <td><p>智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。</p></td>
           </tr>
        </table>

    1. 点击**添加**。

1. (可选) 添加 **PRESERVE** Function。**PRESERVE** Function 在 Collection 中添加标量字段，用于保留文档元数据。

    <Admonition type="info" icon="📘" title="说明">

    <p>每个 Ingestion Pipeline 中最多可添加 50 个 <strong>PRESERVE</strong> Function。</p>

    </Admonition>

    1. 点击 **+ Function**。

    1. 输入 Function 名称。

    1. 配置输入字段名称和数据类型。支持的数据字段类型包括 **Bool**、**Int8**、**Int16**、**Int32**、**Int64**、**Float**、**Double** 和 **VarChar**。

        <Admonition type="info" icon="📘" title="说明">

        <ul>
        <li><p>目前，输出字段名称必须与输入字段名称保持一致。在运行 Ingestion Pipeline 时，您将使用到输入字段名称。而输出字段名称用于自动生成的 Collection Schema 中作为保留的标量字段名称。</p></li>
        <li><p>字段类型为 <strong>VarChar</strong> 时，字符串最大长度为 <strong>4,000</strong> 个字符，且只可包含数字、字母。</p></li>
        <li><p>在标量字段中存储日期时，我们推荐使用 <strong>Int16</strong> 的数据类型。存储时间时，我们推荐使用 <strong>Int32</strong> 的数据类型。</p></li>
        </ul>

        </Admonition>

    1. 点击**添加**。

1. 点击**创建 Ingestion Pipeline**。

1. 继续创建 Search pipeline 和 Deletion pipeline。创建的 Search 和 Deletion Pipeline 可适应配套刚才创建的Ingestion Pipeline。

    <Admonition type="info" icon="📘" title="说明">

    <p>自动创建的 Search Pipeline 默认关闭 Reranker 功能，如需使用 Reranker，请手动<a href="./pipelines-text-data#create-text-search-pipeline">创建一个新的 Search Pipeline</a>。</p>

    </Admonition>

</TabItem>

<TabItem value="Bash">

以下示例代码创建了 1 个名称为 `my_doc_ingestion_pipeline` 的 Ingestion Pipeline，并添加了 1 个 **INDEX_DOC** Function 和 1 个 **PRESERVE** Function。 

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx"，
        "name": "my_doc_ingestion_pipeline",
        "description": "A pipeline that splits a doc file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
        "type": "INGESTION",  
        "functions": [
            { 
                "name": "index_my_doc",
                "action": "INDEX_DOC", 
                "language": "ENGLISH",
                "chunkSize": 500,
                "embedding": "zilliz/bge-base-en-v1.5",
                "splitBy": ["\n\n", "\n", " ", ""]
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
        "newCollectionName": "my_collection"
    }
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群所在云服务地域的 ID。目前仅支持 `ali-cn-hangzhou`。

- `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

- `projectId`: 创建 Pipeline 所属的项目 ID。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

- `collectionName`: 与 Pipeline 同步自动创建的 Collection 名称。或者，您也可以指定一个已有的 Collection。

- `name`: 创建的 Pipeline 名称。Pipeline 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

- `description` (可选): 创建的 Pipeline 描述。

- `type`: 创建的 Pipeline 类型。目前，可创建的 Pipeline 类型包括 `INGESTION`、 `SEARCH` 和 `DELETION`。

- `functions`: Pipeline 中添加的 Function。1 个 Ingestion pipeline 中只可添加 1 个 **INDEX** Function 和至多 50 个 **PRESERVE** Function。

    - `name`: Function 名称。Function 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

    - `action`: Function 类型。您可以在 Ingestion Pipeline 中添加的 Function 类型包括： `INDEX_DOC`、`INDEX_TEXT`、`INDEX_IMAGE` 和 `PRESERVE`。

    - `language`: 文档语言。可选择的语言包括 `ENGLISH`（英语） 和 `CHINESE`（中文）。*(仅 `INDEX_DOC` 和 `INDEX_TEXT`Function 中包含此参数。）*

    - `embedding` : 用于生成向量的 Embedding 模型。 *(仅 `INDEX` Function 中包含此参数。）*

        <table>
           <tr>
             <th><p><strong>Embedding 模型</strong></p></th>
             <th><p><strong>说明</strong></p></th>
           </tr>
           <tr>
             <td><p>zilliz/bge-base-en-v1.5</p></td>
             <td><p>智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。</p></td>
           </tr>
           <tr>
             <td><p>zilliz/bge-base-zh-v1.5</p></td>
             <td><p>智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。</p></td>
           </tr>
        </table>

    - `splitBy` (可选): Splitter 用于分割文本。选择或自定义 Splitter 后，Ingestion Pipeline 会根据定义的字符按顺序将文本分割成小片段。默认情况下，Zilliz Cloud Pipeline 使用 `"\n\n", "\n", " ", ""` 作为分隔符。*(仅 `INDEX_DOC` Function 中包含此参数。）*

    - `chunkSize` (可选): `INDEX_DOC` Function 将每个文档分割成更小的切片。默认情况下，每个切片包含不超过500 个 Token，但您可以根据自己的切片策略调整切片大小。此外，对于 Markdown 或 HTML 文件，该Function 会首先按标题划分文档，然后根据指定的切片大小进一步按较大的部分划分。*(仅 `INDEX_DOC` Function 中包含此参数。）*

        下表罗列了 Embedding 模型与其可选切片大小范围。

        <table>
           <tr>
             <th><p>模型</p></th>
             <th><p><strong>切片大小范围 (Tokens)</strong></p></th>
           </tr>
           <tr>
             <td><p>zilliz/bge-base-en-v1.5</p></td>
             <td><p>20-500 Tokens</p></td>
           </tr>
           <tr>
             <td><p>zilliz/bge-base-zh-v1.5</p></td>
             <td><p>20-500 Tokens</p></td>
           </tr>
        </table>

- `inputField`: 输入字段名称。 您可以自定义输入字段名称，但需要与 `outputField` 保持一致。*（仅 `PRESERVE` Function 中包含此参数。）*

- `outputField`: 输出字段名称。该字段将的值将用于构成 Collection Schema。 `outputField` 字段值应该与 `inputField` 字段值保持一致。 *(仅 `PRESERVE` Function 中包含此参数。）*

- `fieldType`: 输入和输出字段的字段类型。可选的值包括：`Bool`、`Int8`、`Int16`、`Int32`、`Int64`、`Float`、`Double` 和 `VarChar`。 *(仅 `PRESERVE` Function 中包含此参数。）*

    <Admonition type="info" icon="📘" title="说明">

    <ul>
    <li><p>在标量字段中存储日期时，我们推荐使用 <strong>Int16</strong> 的数据类型。存储时间时，我们推荐使用 <strong>Int32</strong> 的数据类型。</p></li>
    <li><p>对于 <code>VarChar</code> 字段类型而言，字段数据的最大长度<code>max_length</code>不得超过 <strong>4,000</strong>。</p></li>
    </ul>

    </Admonition>

如果请求返回以下类似内容，则表示 Ingestion Pipeline 创建成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-xxxx",
    "name": "my_doc_ingestion_pipeline",
    "type": "INGESTION",
    "description": "A pipeline that splits a doc file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
    "status": "SERVING",
    "totalTokenUsage": 0,
    "functions": [
      {
        "action": "INDEX_DOC",
        "name": "index_my_doc",
        "inputField": "doc_url",
        "language": "ENGLISH",
        "chunkSize": 500,
        "embedding": "zilliz/bge-base-en-v1.5"，
        "splitBy": ["\n\n", "\n", " ", ""]
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
    "newCollectionName": "my_collection"
  }
}
```

Ingestion Pipeline 创建成功后，Zilliz Cloud 将进行重名检查。如果集群中没有该名称的 Collection，将自动创建名称为 `my_collection` 的新 Collection。如果已存在同名的 Collection，Zilliz Cloud Pipelines 会继续检查该已有 Collection 的 Schema 是否与 Pipeline 中定义的一致。

该 Collection 中包含 6 个字段：1 个自动生成的 ID 字段、4 个 **INDEX_DOC** function 的输出字段和 1 个 **PRESERVE** function 的输出字段。Collection Schema 如下所示：

<table>
    <tr>
        <th><p>id<br/>(数据类型：Int64)</p></th>
        <th><p>doc_name<br/>(数据类型：VarChar)</p></th>
        <th><p>chunk_id<br/>(数据类型：Int64)</p></th>
        <th><p>chunk_text<br/>(数据类型：VarChar)</p></th>
        <th><p>embedding<br/>(数据类型：FLOAT_VECTOR)</p></th>
        <th><p>publish_year<br/>(数据类型：Int16)</p></th>
    </tr>
</table>

</TabItem>

</Tabs>

### 运行文档 Ingestion Pipeline{#run-doc-ingestion-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Ingestion Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 摄取文件。Zilliz Cloud 提供两种摄取数据的方式。

    - 导入对象存储中的文件。在 `doc_url` 字段中输入阿里云[签名 URL](https://help.aliyun.com/zh/oss/user-guide/authorize-third-party-users-to-download-objects?spm=a2c4g.11186623.0.0.e2d634eet2N34s#section-fnd-m6v-bff)。

    - 上传本地文件。点击**添加附件**。 在对话框中上传本地文件。文件大小不得超过 10 MB。支持文档文件类型包括 `.txt`、`.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。如 Ingestion Pipeline 中添加了 PRESERVE function，您还需要额外配置 `data` 字段。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

您可以选择在运行 Ingestion Pipelines 时通过对象存储服务上传文件或直接上传本地文件。

#### 通过对象存储服务上传文件{#run-ingestion-pipeline-with-a-file-in-an-object-storage}

1. 在运行前，先将文档上传至对象存储服务（例如：[阿里云对象存储](https://help.aliyun.com/zh/oss/?spm=a2c4g.11186623.0.0.811c26e4LNfowb)）。支持文档文件类型包括 `.txt`、 `.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。

1. 文档成功上传至 OSS 后，获取[预签名 URL](https://www.alibabacloud.com/help/zh/oss/user-guide/authorize-third-party-users-to-download-objects?spm=a2c63.p38356.0.0.590c2cb74gHqev#section-fnd-m6v-bff)。

1. 以下示例代码用于运行 Ingestion pipeline `my_doc_ingestion_pipeline`。`publish_year` 是需要保留的元数据字段。

    ```bash
    curl --request POST \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
        -d '{
            "data": {
                "doc_url": "https://storage.googleapis.com/example-bucket/zilliz_concept_doc.md?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=example%40example-project.iam.gserviceaccount.com%2F20181026%2Fus-central1%2Fstorage%2Fgoog4_request&X-Goog-Date=20181026T181309Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=247a2aa45f169edf4d187d54e7cc46e4731b1e6273242c4f4c39a1d2507a0e58706e25e3a85a7dbb891d62afa8496def8e260c1db863d9ace85ff0a184b894b117fe46d1225c82f2aa19efd52cf21d3e2022b3b868dcc1aca2741951ed5bf3bb25a34f5e9316a2841e8ff4c530b22ceaa1c5ce09c7cbb5732631510c20580e61723f5594de3aea497f195456a2ff2bdd0d13bad47289d8611b6f9cfeef0c46c91a455b94e90a66924f722292d21e24d31dcfb38ce0c0f353ffa5a9756fc2a9f2b40bc2113206a81e324fc4fd6823a29163fa845c8ae7eca1fcf6e5bb48b3200983c56c5ca81fffb151cca7402beddfc4a76b133447032ea7abedc098d2eb14a7", 
                "publish_year": 2023
            }
        }'
    ```

    以下为参数说明：

    - `YOUR_CLUSTER_TOKEN`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

    - `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

    - `YOUR_PIPELINE_ID`：需要运行的 Pipeline 的 ID。

    - `doc_url`: 对象存储中的文档 URL。文档 URL 包含中文时，请勿使用编码后的 URL。您可以使用 UTF-8 编码的 URL。请确保 URL 有效期大于 1 小时。

    - 元数据字段 (可选): 需要保留的元数据字段。输入字段名称必须与创建时的配置保持一致。

    请求返回以下类似内容：

    ```bash
    {
      "code": 200,
      "data": {
        "doc_name": "zilliz_concept_doc.md",
        "token_usage": 200,
        "num_chunks": 123
      }
    }
    
    ```

<Admonition type="info" icon="📘" title="说明">

<p>输出的 <code>doc_name</code> 字段十分重要。如果内容相同的文档被赋予了不同的 <code>doc_name</code>，且运行了两次 Ingestion pipeline，那么同样的文档内容将在向量数据库中存储两遍。 </p>

</Admonition>

#### 上传本地文件{#run-ingestion-pipeline-with-a-local-file}

通过以下示例直接上传本地文件。

```python
curl --request POST \
     --header "Content-Type: multipart/form-data" \
     --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
     --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run_ingestion_with_file" \
     --form 'data={"year": 2023}' \
     --form 'file=@path/to/local/file.ext'
```

以下为参数说明：

- `YOUR_CLUSTER_TOKEN`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `YOUR_PIPELINE_ID`：需要运行的 Pipeline 的 ID。

- `file`: 本地文件路径。支持文档文件类型包括 `.txt`、 `.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。

- `data`(可选): 需要保留的元数据字段。输入字段名称必须与创建时的配置保持一致。

请求返回以下类似内容：

```bash
{
  "code": 200,
  "data": {
    "doc_name": "zilliz_concept_doc.md",
    "token_usage": 200,
    "num_chunks": 123
  }
}

```

</TabItem>

</Tabs>

## 搜索文档数据{#search-doc-data}

搜索数据前，请先创建并运行 Search Pipeline。与 Ingestion 和 Deletion Pipelines 不同，Search Pipeline 创建时是在 Function 级别定义集群和 Collection，而非在 Pipeline 层级。这是因为 Zilliz Cloud 支持同时从多个 Collection 搜索数据。

### 创建文档 Search Pipeline{#create-doc-search-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1.

1. 打开项目。

1. 点击左侧导航栏中的 **Pipelines**。 选中**概览**标签页，并切换到 **Pipelines**。点击 **+ Pipeline**。

1. 选择需要创建的 Pipeline 类型。点击 Search Pipeline 一栏中的 **+ Pipeline** 按钮。 

    ![create-search-pipeline-cn](/img/create-search-pipeline-cn.png)

1. 配置 Search Pipeline。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>说明</strong></p></th>
       </tr>
       <tr>
         <td><p>Pipeline 名称</p></td>
         <td><p>新创建的 Ingestion Pipeline 的名称。名称中只可包含小写字母、数字和下划线。</p></td>
       </tr>
       <tr>
         <td><p>描述 (可选)</p></td>
         <td><p>对新创建的 Ingestion Pipeline 的描述。</p></td>
       </tr>
    </table>

    ![configure-search-pipeline-cn](/img/configure-search-pipeline-cn.png)

1. 点击 **+ Function** 添加 Function。 1 个 Search pipeline 中只可添加 1 个 Function。

    1. 输入函数名称。

    1. 选择**目标集群**和**目标 Collection**。目标集群必须为部署在阿里云（杭州）的活跃集群。目标 Collection 必须为创建 Ingestion pipeline 时自动创建的 Collection，否则创建的 Search Pipeline 将不兼容。

    1.  **Function 类型**选择 **SEARCH_DOC**。**SEARCH_DOC** Function 可以将对象存储（OSS）预签名 URL 中或本地上传的文档切分为文档块，并转换为 Embedding 向量。

    1. （可选） 如需对输出结果根据相关性进行重新排序、提高搜索结果质量，请开启 [Reranker](./reranker)。请注意，开启 Reranker 会增加使用成本和搜索延时。默认情况下，Reranker 功能关闭。开启后，您可以选择 Reranker 模型。目前仅支持 **zilliz/bge-reranker-base** 模型。

        <table>
           <tr>
             <th><p><strong>Reranker 模型</strong></p></th>
             <th><p><strong>描述</strong></p></th>
           </tr>
           <tr>
             <td><p>zilliz/bge-reranker-base</p></td>
             <td><p>智源研究院（BAAI）发布的开源重新排序（Reranker）模型。该模型采用交叉编码器架构，并托管于 Zilliz Cloud 上。</p></td>
           </tr>
        </table>

    1. 点击**添加**。

1. 点击**创建 Search Pipeline**。

</TabItem>

<TabItem value="Bash">

以下示例代码创建了 1 个名称为 `my_text_search_pipeline` 的 Search Pipeline，并添加了 1 个 **SEARCH_DOC_CHUNK** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",       
        "name": "my_text_search_pipeline",
        "description": "A pipeline that receives text and search for semantically similar doc chunks",
        "type": "SEARCH",
        "functions": [
            {
                "name": "search_chunk_text_and_title",
                "action": "SEARCH_DOC_CHUNK",
                "clusterId": "${CLUSTER_ID}",
                "collectionName": "my_collection",
                "embedding": "zilliz/bge-base-en-v1.5",
                "reranker": "zilliz/bge-reranker-base"
            }
        ]
    }
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群所在云服务地域的 ID。目前仅支持 `ali-cn-hangzhou`。

- `projectId`: 创建 Pipeline 所属的项目 ID。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

- `name`: 创建的 Pipeline 名称。Pipeline 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

- `description`（可选）：创建的 Pipeline 描述。

- `type`: 创建的 Pipeline 类型。目前，可创建的 Pipeline 类型包括 `INGESTION`、 `SEARCH` 和 `DELETION`。

- `functions`: Pipeline 中添加的 Function。**1 个 Search Pipeline 中仅可添加 1 个 Function。** 

    - `name`: Function 名称。Function 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

    - `action`: Function 类型。支持的类型包括：`SEARCH_DOC_CHUNK`、`SEARCH_TEXT`、`SEARCH_IMAGE_BY_IMAGE`。

    - `inputField`: 输入字段名称。您可以自由配置该字段的值。但是在运行 Pipeline 时，您需要使用现在定义的输入字段名称。

    - `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

    - `collectionName`: 创建 Pipeline 所属的 Collection 名称。

    - `reranker`（可选）: 使用 [Reranker](./reranker) 对输出结果进行重新排序，提高搜索结果质量。目前，仅支持 `zilliz/bge-reranker-base` 作为 Reranker 模型。

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
        "collectionName": "my_collection",
        "embedding": "zilliz/bge-base-en-v1.5",
        "reranker": "zilliz/bge-reranker-base"
      }
    ],
    "totalTokenUsage": 0
  }
}
```

</TabItem>

</Tabs>

### 运行文档 Search Pipeline{#run-doc-search-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Search Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 输入查询文本。点击**运行**。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

以下示例代码用于运行 Search pipeline `my_text_search_pipeline`。查询文本为“How many collections can a cluster with more than 8 CUs hold?”（1 个 8 CU 以上的集群最多可创建多少个 Collection）。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
      "data": {
        "query_text": "How many collections can a cluster with more than 8 CUs hold?"
      },
      "params":{
          "limit": 1,
          "offset": 0,
          "outputFields": [ "chunk_id", "doc_name" ],
          "filter": "id >= 0", 
      }
    }'

```

以下为参数说明：

- `YOUR_CLUSTER_TOKEN`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `query_text`: 语义搜索的查询文本。

- `params`: 搜索相关参数。

    - `limit`: 返回的 Entity 数量。该参数值为 1-100 之间的整数。`limit` 和 `offset` 参数值总和应小于 **1024。**

    - `offset`: 在搜索结果中跳过的 Entity 数量。最大值为 **1024**。`limit` 和 `offset` 参数值总和应小于 **1024。**

    - `outputFields`: 在搜索结果中一同返回的输出字段。`id`、`distance` 和 `chunk_text`为默认输出字段。

    - `filter`: 搜索时的[过滤](./get-and-scalar-query#reference-on-scalar-filters)条件。

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

</TabItem>

</Tabs>

## 删除文档数据{#delete-doc-data}

如需删除数据，请先创建并运行 Deletion Pipeline。

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 打开项目。

1. 点击左侧导航栏中的 **Pipelines**。 选中**概览**标签页，并切换到 **Pipelines**。点击 **+ Pipeline**。

1. 选择需要创建的 Pipeline 类型。点击 Deletion Pipeline 一栏中的 **+ Pipeline** 按钮。 

    ![create-deletion-pipeline-cn](/img/create-deletion-pipeline-cn.png)

1. 配置 Deletion Pipeline。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>说明</strong></p></th>
       </tr>
       <tr>
         <td><p>Pipeline 名称</p></td>
         <td><p>新创建的 Deleltion Pipeline 名称。名称中只可包含小写字母、数字和下划线。</p></td>
       </tr>
       <tr>
         <td><p>描述 (可选)</p></td>
         <td><p>对新创建的 Deletion Pipeline 的描述。</p></td>
       </tr>
    </table>

    ![configure-deletion-pipeline-cn](/img/configure-deletion-pipeline-cn.png)

1. 点击 **+ Function** 添加 Function。您只可添加 1 个 Function。

    1. 输入 Function名称。

    1. 从 **PURGE_DOC_INDEX** 或 **PURGE_BY_EXPRESSION** 中选择 1 个作为 **Function 类型**。 **PURGE_DOC_INDEX** Function 可以删除指定名称的文档中所有的文档切片。**PURGE_BY_EXPRESSION** Function 可以删除符合指定过滤条件的所有 Entity。

    1. 点击**添加**。

1. 点击**添加**。

</TabItem>

<TabItem value="Bash">

以下示例代码创建了 1 个名称为 `my_doc_deletion_pipeline` 的 Deletion Pipeline，并添加了 1 个 **PURGE_BY_EXPRESSION** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",
        "name": "my_doc_deletion_pipeline",
        "description": "A pipeline that deletes all info associated with a doc",
        "type": "DELETION",
        "functions": [
            {
                "name": "purge_chunks_by_doc_name",
                "action": "PURGE_DOC_INDEX"
            }
        ],
    
        "clusterId": "${CLUSTER_ID}",
        "collectionName": "my_collection"
    }'
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群所在云服务地域的 ID。目前仅支持 `ali-cn-hangzhou`。

- `projectId`: 创建 Pipeline 所属的项目 ID。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

- `name`: 创建的 Pipeline 名称。Pipeline 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

- `description` (可选): 创建的 Pipeline 描述。

- `type`: 创建的 Pipeline 类型。目前，可创建的 Pipeline 类型包括 `INGESTION`、 `SEARCH` 和 `DELETION`。

- `functions: Pipeline 中添加的 Function。1 个 Deletion Pipeline 中仅可添加 1 个 Function。`

    - `name`: Function 名称。Function 名称应该在 3-64 个字符内，且只可包含数字、字母和下划线。

    - `action`: Function 类型。可选择的 Function 类型包含：`PURGE_DOC_INDEX`、`PURGE_TEXT_INDEX`、`PURGE_BY_EXPRESSION` 和`PURGE_IMAGE_INDEX`。

- `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

- `collectionName`: 创建 Pipeline 所属的 Collection 名称。

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-ab2874d8138c8554375bb0",
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
    "collectionName": "my_collection"
  }
}
```

</TabItem>

</Tabs>

### 运行文档 Deletion Pipeline{#run-doc-deletion-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Deletion Pipeline 右侧的 "▶︎" 按钮。或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 输入过滤表达式，点击**运行**。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

以下示例代码用于运行 Deletion Pipeline `my_doc_deletion_pipeline`。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
        "data": {
            "doc_name": "zilliz_concept_doc.md",
        }
    }'
```

以下为参数说明：

- `YOUR_CLUSTER_TOKEN`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `doc_name`: 需要删除的文档名称。如果输入的文档名称存在，该文档的所有文档切片都将被删除。如果文档名称不存在，该请求仍可执行，但是输出中的 `num_deleted_chunks` 值为 0。

请求返回以下类似内容：

```bash
{
  "code": 200,
  "data": {
    "num_deleted_chunks": 567
  }
}
```

</TabItem>

</Tabs>

## 管理 Pipeline{#manage-pipeline}

以下操作可用于管理此前创建的 Pipeline。

### 查看 Pipeline{#view-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

点击左侧导航栏中的 **Pipelines**。选中 **Pipelines** 选项卡。您可以查看所有已创建的 Pipelines 及其详情、用量等。

![view-pipelines-on-web-ui-cn](/img/view-pipelines-on-web-ui-cn.png)

您还可以查看所有 Pipelines 相关事件。

![view-pipelines-activities-on-web-ui-cn](/img/view-pipelines-activities-on-web-ui-cn.png)

</TabItem>

<TabItem value="Bash">

调用以下 API 查看所有 Pipelines 或查看某一特定 Pipeline 详情。

- **查看所有 Pipelines**

    根据以下示例并指定项目 ID `projectId`。了解[如何获取项目 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23085669594011-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE-ID)。

    ```bash
    curl --request GET \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${YOUR_API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines?projectId=proj-xxxx"
    ```

    如果请求返回以下类似内容，则表示操作成功：

    ```bash
    {
      "code": 200,
      "data": [
        {
          "pipelineId": "pipe-xxxx",
          "name": "my_doc_ingestion_pipeline",
          "type": "INGESTION",
          "description": "A pipeline that splits a doc file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
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
          "newCollectionName": "my_collection"
        },
        {
          "pipelineId": "pipe-xxxx",
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
              "collectionName": "my_collection",
              "embedding": "zilliz/bge-base-en-v1.5"
            }
          ]
        },
        {
          "pipelineId": "pipe-xxxx",
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
          "collectionName": "my_collection"
        }
      ]
    }
    ```

- **查看特定 Pipeline 详情**

    根据以下示例查看某一 Pipeline 详情。

    ```bash
    curl --request GET \
        --header "Content-Type: application/json" \
        --header "Authorization: Bearer ${YOUR_API_KEY}" \
        --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}"
    ```

    如果请求返回以下类似内容，则表示操作成功：

    ```bash
    {
      "code": 200,
      "data": {
        "pipelineId": "pipe-xxxx",
        "name": "my_doc_ingestion_pipeline",
        "type": "INGESTION",
        "description": "A pipeline that splits a doc file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
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
        "newCollectionName": "my_collection"
      }
    }
    ```

</TabItem>

</Tabs>

### 删除 Pipeline{#delete-pipeline}

您可以删除不再需要使用的 Pipelines。该操作仅删除 Pipeline，不会影响自动创建的 Collection。

<Admonition type="caution" icon="🚧" title="警告">

<ul>
<li><p>该操作仅删除 Pipeline，不会影响自动创建的 Collection。</p></li>
<li><p>Pipeline 一旦删除后不可恢复，请谨慎操作。</p></li>
<li><p>删除 Ingestion pipeline 时不会影响其相关联的 Collection。您的数据十分安全。</p></li>
</ul>

</Admonition>

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

如需删除不再使用的 Pipeline，请点击操作栏中的**“...”**按钮并选择**删除**。

![delete-pipeline-cn](/img/delete-pipeline-cn.png)

</TabItem>

<TabItem value="Bash">

根据以下示例删除 Pipelines。

```bash
curl --request GET \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}"
```

如果请求返回以下类似内容，则表示操作成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-6ca5dd1b4672659d3c3487",
    "name": "my_doc_ingestion_pipeline",
    "type": "INGESTION",
    "description": "A pipeline that splits a doc file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
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
    "newCollectionName": "my_collection"
  }
}
```

</TabItem>

</Tabs>

