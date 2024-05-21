---
slug: /run-ingestion-pipelines
beta: FALSE
notebook: FALSE
type: origin
token: HAXiw8277i0mBXk8L1Gcrei7nle
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 运行 Ingestion Pipelines

创建后，您可以运行 Ingestion Pipeline，将非结构化数据转化为可搜索的 Embedding 向量，并存储在 Zilliz Cloud 向量数据库中。

## 通过 Web 控制台{#via-web-console} 

1. 点击 Ingestion Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 摄取文件。Zilliz Cloud 提供两种摄取数据的方式。

    - 导入对象存储中的文件。在 `doc_url` 字段中输入阿里云[签名 URL](https://help.aliyun.com/zh/oss/user-guide/authorize-third-party-users-to-download-objects?spm=a2c4g.11186623.0.0.e2d634eet2N34s#section-fnd-m6v-bff)。

    - 上传本地文件。点击**添加附件**。 在对话框中上传本地文件。文件大小不得超过 10 MB。支持文档文件类型包括 `.txt`、`.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。如 Ingestion Pipeline 中添加了 PRESERVE function，您还需要额外配置 `data` 字段。

1. 查看运行结果。

## 通过 RESTful API{#via-restful-api}

您可以选择在运行 Ingestion Pipelines 时通过对象存储服务上传文件或直接上传本地文件。

### 通过对象存储服务上传文件{#run-ingestion-pipeline-with-a-file-in-an-object-storage}

1. 在运行前，先将文档上传至对象存储服务（例如：[阿里云对象存储](https://help.aliyun.com/zh/oss/?spm=a2c4g.11186623.0.0.811c26e4LNfowb)）。支持文档文件类型包括 `.txt`、 `.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。

1. 文档成功上传至 OSS 后，获取[预签名 URL](https://www.alibabacloud.com/help/zh/oss/user-guide/authorize-third-party-users-to-download-objects?spm=a2c63.p38356.0.0.590c2cb74gHqev#section-fnd-m6v-bff)。

1. 以下示例代码用于运行 Ingestion pipeline `my_doc_ingestion_pipeline`。该 Pipeline 的 `pipelineId` 是 `pipe-6ca5dd1b4672659d3c3487`。`publish_year` 是需要保留的元数据字段。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
    --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
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

### 上传本地文件{#run-ingestion-pipeline-with-a-local-file}

通过以下示例直接上传本地文件。

```python
curl --request POST \
     --header "Content-Type: multipart/form-data" \
     --header "Authorization: Bearer ${YOUR_CLUSTER_TOKEN}" \
     --url "https://controller.api.{cloud-region}.zillizcloud.com/v1/pipelines/${YOUR_PIPELINE_ID}/run_ingestion_with_file" \
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

## 相关文档{#related-topics}

- [管理 Pipelines](./manage-pipelines)

- [估算 Pipelines 用量](./estimate-pipelines-usage)

- [使用限制](./limits#pipelines)

