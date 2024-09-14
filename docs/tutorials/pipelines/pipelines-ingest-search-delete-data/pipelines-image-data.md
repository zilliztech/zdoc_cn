---
title: "图像数据 | Cloud"
slug: /pipelines-image-data
sidebar_label: "图像数据"
beta: FALSE
notebook: FALSE
description: "您可以通过 Web 控制台或 RESTful API 创建、运行和管理 Pipelines。Web 控制台操作更简单直观，但 RESTful API 可提供更多灵活性。 | Cloud"
type: origin
token: DrzYwLGpqiIeL6km4jlcPVp0n9b
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - pipeline
  - 图像

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 图像数据

您可以通过 Web 控制台或 RESTful API 创建、运行和管理 Pipelines。Web 控制台操作更简单直观，但 RESTful API 可提供更多灵活性。

本文将介绍如何创建图像 Pipeline、进行以图搜图并删除 Pipeline。

## 前提条件与限制{#prerequisites-and-limitations}

- 请确保您创建部署在阿里云（杭州）的集群。

- 同一项目下，您可最多创建 100 个同一类型的 Pipelines。更多详情，请参考[使用限制](./limits#number-of-pipelines)。

## 摄取图像数据{#ingest-image-data}

摄取图像数据包含两个步骤：创建 Ingestion Pipeline 和运行 Ingestion Pipeline。

### 创建图像 Ingestion Pipeline{#create-image-ingestion-pipeline}

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

    1. 选择 **INDEX_IMAGE** Function。该 Function 可以将 URL 中的图像转换为 Embedding 向量。

    1. 选择用于生成向量的 Embedding 模型。目前 Zilliz Cloud Pipelines 共提供两种 Embedding 模型：**zilliz/vit-base-patch16-224** 和 **zilliz/clip-vit-base-patch32**。

        <table>
           <tr>
             <th><p><strong>Embedding 模型</strong></p></th>
             <th><p><strong>说明</strong></p></th>
           </tr>
           <tr>
             <td><p>zilliz/vit-base-patch16-224</p></td>
             <td><p>Google 开源的 Vision Transformer (ViT) encoder 模型（类似于 BERT），在大量图像数据上进行预训练，可用于将图像的内容语义转化为向量空间中的 Embedding 向量。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。</p></td>
           </tr>
           <tr>
             <td><p>zilliz/clip-vit-base-patch32</p></td>
             <td><p>OpenAI 发布的多模态模型。视觉模型和文本模型共同将图像和文本转换为同一向量空间中的 Embedding 向量，实现数据和文案信息两种模态信息的语义搜索。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。</p></td>
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

以下示例代码创建了 1 个名称为 `my_image_ingestion_pipeline` 的 Ingestion Pipeline，并添加了 1 个 **INDEX_IMAGE** Function 和 1 个 **PRESERVE** Function。 

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "name": "my_image_ingestion_pipeline",
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
        "projectId": "proj-xxxx"，
        "collectionName": "my_collection",
        "description": "A pipeline that converts an image into vector embeddings and store in efficient index for search.",
        "type": "INGESTION",  
        "functions": [
            { 
                "name": "index_my_image",
                "action": "INDEX_IMAGE", 
                "embedding": "zilliz/vit-base-patch16-224"
            },
            {
                "name": "keep_image_tag",
                "action": "PRESERVE", 
                "inputField": "image_title", 
                "outputField": "image_title",
                "fieldType": "VarChar" 
            }
        ]   
    }'
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

    - `language`: 文档语言。可选择的语言包括 `ENGLISH`（英语） 和 `CHINESE`（中文）。*(仅 `INDEX_TEXT` 和 `INDEX_DOC`Function 中包含此参数。）*

    - `embedding` : 用于生成向量的 Embedding 模型。 *(仅 `INDEX` Function 中包含此参数。）*

        <table>
           <tr>
             <th><p><strong>Embedding 模型</strong></p></th>
             <th><p><strong>说明</strong></p></th>
           </tr>
           <tr>
             <td><p>zilliz/vit-base-patch16-224</p></td>
             <td><p>Google 开源的 Vision Transformer (ViT) encoder 模型（类似于 BERT），在大量图像数据上进行预训练，可用于将图像的内容语义转化为向量空间中的 Embedding 向量。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。</p></td>
           </tr>
           <tr>
             <td><p>zilliz/clip-vit-base-patch32</p></td>
             <td><p>OpenAI 发布的多模态模型。视觉模型和文本模型共同将图像和文本转换为同一向量空间中的 Embedding 向量，实现数据和文案信息两种模态信息的语义搜索。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。</p></td>
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
    "name": "my_image_ingestion_pipeline",
    "type": "INGESTION",
    "createTimestamp": 1721187300000,
    "clusterId": "in03-***************",
    "collectionName": "my_collection"
    "description": "A pipeline that converts an image into vector embeddings and store in efficient index for search.",
    "status": "SERVING",
    "totalUsage": {
      "embedding": 0
    },
    "functions": [
      {
        "action": "INDEX_IMAGE",
        "name": "index_my_image",
        "inputFields": ["image_url", "image_id"],
        "embedding": "zilliz/vit-base-patch16-224"
      },
      {
        "action": "PRESERVE",
        "name": "keep_image_tag",
        "inputField": "image_title",
        "outputField": "image_title",
        "fieldType": "VarChar"
      }
    ]
  }
}
```

<Admonition type="info" icon="📘" title="说明">

<p>总用量 <code>totalUsage</code> 非实时更新，数据统计可能会有几小时延迟。</p>

</Admonition>

Ingestion Pipeline 创建成功后，Zilliz Cloud 将进行重名检查。如果集群中没有该名称的 Collection，将自动创建名称为 `my_collection` 的新 Collection。如果已存在同名的 Collection，Zilliz Cloud Pipelines 会继续检查该已有 Collection 的 Schema 是否与 Pipeline 中定义的一致。

该 Collection 中包含 3 个字段：2 个 **INDEX_IMAGE** function 的输出字段和 1 个 **PRESERVE** function 的输出字段。Collection Schema 如下所示：

<table>
    <tr>
        <th><p>image_id<br/>(数据类型：Int64)</p></th>
        <th><p>embedding<br/>(数据类型：FLOAT_VECTOR)</p></th>
        <th><p>image_title<br/>(数据类型：VarChar)</p></th>
    </tr>
</table>

</TabItem>

</Tabs>

### 运行图像 Ingestion Pipeline{#run-image-ingestion-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Ingestion Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 在 `image_id` 和 `image_url` 字段中输入需要摄取的图像信息。如您添加了 PRESERVE Function，请在该 Function 定义的字段中输入需要保留的元数据信息。点击**运行**。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

以下示例代码用于运行 Ingestion pipeline `my_image_ingestion_pipeline`。

```python
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
        "data": {
            "image_id": "my-img-123456",
            "image_url": "xxx",
            "image_title": "A cute yellow cat"
        }
    }'
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `image_id`: 存储在 OSS 中的图像 ID。

- `image_url` : 存储在 OSS 中的图像 URL。URL 包含中文时，请勿使用编码后的 URL。您可以使用 UTF-8 编码的 URL。请确保 URL 有效期大于 1 小时。

- `image_title`：需要保留的元数据字段。

请求返回以下类似内容：

```bash
{
  "code": 200,
  "data": {
    "num_entities": 1,
    "usage": {
      "embedding": 1
    }
  }
}
```

</TabItem>

</Tabs>

## 搜索图像数据{#search-image-data}

搜索数据前，需要先创建并运行 Search Pipeline。与 Ingestion 和 Deletion Pipelines 不同，Search Pipeline 创建时是在 Function 级别定义集群和 Collection，而非在 Pipeline 层级。这是因为 Zilliz Cloud 支持同时从多个 Collection 搜索数据。

Zilliz Cloud 支持两种搜索图像数据的方式：[以图搜图](./pipelines-image-data#conduct-a-reverse-image-search)或[以文本搜图](./pipelines-image-data#search-image-by-text)。

### 以图搜图{#conduct-a-reverse-image-search}

#### 创建图像 Search Pipeline{#create-image-search-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

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

    1. **Function 类型**选择 **SEARCH_IMAGE_BY_IMAGE**。该 Function 可以将输入的查询图像转换为 Embedding 向量，并检索出与之最相关的 Top-K 个图像。

    1. 点击**添加**。

1. 点击**创建 Search Pipeline**。

</TabItem>

<TabItem value="Bash">

以下示例代码创建了 1 个名称为 `my_image_search_pipeline` 的 Search Pipeline，并添加了 1 个 **SEARCH_IMAGE_BY_IMAGE** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",       
        "name": "my_image_search_pipeline",
        "description": "A pipeline that searches image by image.",
        "type": "SEARCH",
        "functions": [
            {
                "name": "search_image_by_image",
                "action": "SEARCH_IMAGE_BY_IMAGE",
                "embedding": "zilliz/vit-base-patch16-224",
                "clusterId": "inxx-xxxxxxxxxxxxxxx",
                "collectionName": "my_collection"
            }
        ]
    }'
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

    - `action`: Function 类型。支持的类型包括：`SEARCH_DOC_CHUNK`、`SEARCH_TEXT`、`SEARCH_IMAGE_BY_IMAGE`、`SEARCH_IMAGE_BY_TEXT`。

    - `inputField`: 输入字段名称。您可以自由配置该字段的值。但是在运行 Pipeline 时，您需要使用现在定义的输入字段名称。

    - `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

    - `collectionName`: 创建 Pipeline 所属的 Collection 名称。

    - `embedding`：向量搜索时使用的 Embedding 模型。该模型需要与所选 Collection 中的 Embedding 模型保持一致。

如果请求返回以下类似内容，则表示 Search Pipeline 创建成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-xxxx",
    "name": "my_image_search_pipeline",
    "type": "SEARCH",
    "createTimestamp": 1721187300000,
    "description": "A pipeline that searches image by image.",
    "status": "SERVING",
    "totalUsage": {
      "embedding": 0
    },
    "functions": 
      {
        "action": "SEARCH_IMAGE_BY_IMAGE",
        "name": "search_image_by_image",
        "inputFields": ["query_image_url"],
        "clusterId": "in03-***************",
        "collectionName": "my_collection",
        "embedding": "zilliz/vit-base-patch16-224"
      }
  }
}
```

<Admonition type="info" icon="📘" title="说明">

<p>总用量 <code>totalUsage</code> 非实时更新，数据统计可能会有几小时延迟。</p>

</Admonition>

</TabItem>

</Tabs>

#### 运行图像 Search Pipeline{#run-image-search-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Search Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 输入查询文本。点击**运行**。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

以下示例代码用于运行 Search pipeline `my_image_search_pipeline`。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
      "data": {
        "query_image_url": "xxx"
      },
      "params":{
          "limit": 1,
          "offset": 0,
          "outputFields": ["image_id", "image_title"],
          "filter": "id >= 0", 
      }
    }'
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `query_text`: 语义搜索的查询文本。

- `params`: 搜索相关参数。

    - `limit`: 返回的 Entity 数量。该参数值为 1-500 之间的整数。`limit` 和 `offset` 参数值总和应小于 **1024。**

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
        "id": "my-img-123456",
        "distance": 0.40448662638664246,
        "image_id": "my-img-123456",
        "image_title": "A cute yellow cat"
      }
    ],
    "usage": {
      "embedding": 1
    }
  }
}
```

</TabItem>

</Tabs>

### 以文本搜图{#search-image-by-text}

#### 创建图像 Search Pipeline{#create-image-search-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

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

        <Admonition type="info" icon="📘" title="说明">

        <p>仅当兼容的 Ingestion Pipeline 中使用了 <code>zilliz/clip-vit-base-patch32</code> embedding 模型时，才可选择 <strong>SEARCH<em>IMAGEBY</em>TEXT</strong> Function。</p>

        </Admonition>

    1. **Function 类型**选择 **SEARCH_IMAGE_BY_TEXT**。该 Function 可以将输入的查询文本转换为 Embedding 向量，并检索出与之最相关的 Top-K 个图像。选择 **SEARCH_IMAGE_BY_TEXT** Function 后，会自动应用 `zilliz/clip-vit-base-patch32-multilingual-v1` embedding 模型。

    1. 点击**添加**。

1. 点击**创建 Search Pipeline**。

</TabItem>

<TabItem value="Bash">

以下示例代码创建了 1 个名称为 `my_image_search_pipeline` 的 Search Pipeline，并添加了 1 个 **SEARCH_IMAGE_BY_IMAGE** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",       
        "name": "my_image_search_pipeline",
        "description": "A pipeline that searches image by text.",
        "type": "SEARCH",
        "functions": [
            {
                "name": "search_image_by_text",
                "action": "SEARCH_IMAGE_BY_TEXT",
                "embedding": "zilliz/clip-vit-base-patch32-multilingual-v1",
                "clusterId": "inxx-xxxxxxxxxxxxxxx",
                "collectionName": "my_collection"
            }
        ]
    }'
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

    - `action`: Function 类型。支持的类型包括：`SEARCH_DOC_CHUNK`、`SEARCH_TEXT`、`SEARCH_IMAGE_BY_IMAGE`、`SEARCH_IMAGE_BY_TEXT`。

    - `inputField`: 输入字段名称。您可以自由配置该字段的值。但是在运行 Pipeline 时，您需要使用现在定义的输入字段名称。

    - `clusterId`: 创建 Pipeline 所属的集群 ID。目前，仅支持部署在阿里云（杭州）的集群。了解[如何获取集群 ID](https://support.zilliz.com.cn/hc/zh-cn/articles/23088888943515-%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%9B%86%E7%BE%A4-ID-%E5%92%8C-%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%9C%B0%E5%9F%9F-ID)。

    - `collectionName`: 创建 Pipeline 所属的 Collection 名称。

    - `embedding`：向量搜索时使用的 Embedding 模型。如需进行以文本搜图，Embedding 模型必须为 `zilliz/clip-vit-base-patch32-multilingual-v1`。该模型是 OpenAI 发布的 CLIP-ViT-B32 模型的多语言版本。与 CLIP-ViT-B32 的视觉模型配套使用时，可处理 50 多种语言的文本。

如果请求返回以下类似内容，则表示 Search Pipeline 创建成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-xxxx",
    "name": "my_image_search_pipeline",
    "type": "SEARCH",
    "createTimestamp": 1721187300000,
    "description": "A pipeline that searches image by image.",
    "status": "SERVING",
    "totalUsage": {
      "embedding": 0
    },
    "functions": 
      {
        "action": "SEARCH_IMAGE_BY_TEXT",
        "name": "search_image_by_text",
        "inputFields": ["query_text"],
        "clusterId": "in03-***************",
        "collectionName": "my_collection",
        "embedding": "zilliz/clip-vit-base-patch32-multilingual-v1"
      }
  }
}
```

<Admonition type="info" icon="📘" title="说明">

<p>总用量 <code>totalUsage</code> 非实时更新，数据统计可能会有几小时延迟。</p>

</Admonition>

</TabItem>

</Tabs>

#### 运行图像 Search Pipeline{#run-image-search-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Search Pipeline 右侧的 "▶︎" 按钮。 或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 输入查询文本。点击**运行**。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

以下示例代码用于运行 Search pipeline `my_image_search_pipeline`。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
      "data": {
        "query_text": "Can you show me the image of a cat?",
      },
      "params":{
          "limit": 1,
          "offset": 0,
          "outputFields": ["image_id", "image_title"],
          "filter": "id >= 0"
      }
    }'
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

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
        "id": "my-img-123456",
        "distance": 0.40448662638664246,
        "image_id": "my-img-123456",
        "image_title": "A cute yellow cat"
      }
    ],
    "usage": {
      "embedding": 1
    }
  }
}
```

</TabItem>

</Tabs>

## 删除图像数据{#delete-image-data}

如需删除数据，请先创建并运行 Deletion Pipeline。

### 创建图像 Deletion Pipeline{#create-image-deletion-pipeline}

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

    1. 从 **PURGE_IMAGE_INDEX** 或 **PURGE_BY_EXPRESSION** 中选择 1 个作为 **Function 类型**。 PURGE_IMAGE_INDEX Function 可以删除指定 image_id 的所有图像。**PURGE_BY_EXPRESSION** Function 可以删除符合指定过滤条件的所有文本 Entity。

    1. 点击**添加**。

1. 点击**创建 Deletion Pipeline**。

</TabItem>

<TabItem value="Bash">

以下示例代码创建了 1 个名称为 `my_image_deletion_pipeline` 的 Deletion Pipeline，并添加了 1 个 **PURGE_IMAGE_INDEX** Function。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines" \
    -d '{
        "projectId": "proj-xxxx",
        "name": "my_image_deletion_pipeline",
        "description": "A pipeline that deletes image by id",
        "type": "DELETION",
        "functions": [
            {
                "name": "purge_image_by_id",
                "action": "PURGE_IMAGE_INDEX"
            }
        ], 
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
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

如果请求返回以下类似内容，则表示 Deletion Pipeline 创建成功：

```bash
{
    "code": 200,
    "data": {
        "id": 0,
        "name": "my_image_deletion_pipeline",
        "type": "DELETION",
        "createTimestamp": 1721187655000,
        "description": "A pipeline that deletes image by id",
        "status": "SERVING",
        "functions": [
            {
                "name": "purge_image_by_id",
                "action": "PURGE_IMAGE_INDEX",
                "inputFields": ["image_id"]
            }
        ],
        "clusterId": "in03-xxxx",
        "collectionName":" my_collection"
    }
}
```

</TabItem>

</Tabs>

### 运行图像 Deletion Pipeline{#run-image-deletion-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

1. 点击 Deletion Pipeline 右侧的 "▶︎" 按钮。或者您可以点击 **Playground** 选项卡。

    ![run-pipeline-cn](/img/run-pipeline-cn.png)

1. 输入过滤表达式，点击**运行**。

1. 查看运行结果。

</TabItem>

<TabItem value="Bash">

以下示例代码用于运行 Deletion Pipeline `my_image_deletion_pipeline`。

```bash
curl --request POST \
    --header "Content-Type: application/json" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}/run" \
    -d '{
        "data": {
            "image_id": "my-img-123456"
        }
    }'
```

以下为参数说明：

- `YOUR_API_KEY`: 验证 API 请求的鉴权信息。了解如何[查看 API 密钥](./manage-api-keys)。

- `cloud-region`: 集群的云服务地域。目前仅支持 `ali-cn-hangzhou`。

- `image_id`: 需要删除的图像 ID。

请求返回以下类似内容：

```bash
{
  "code": 200,
  "data": {
    "num_deleted_entities": 1
  }
}
```

</TabItem>

</Tabs>

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
          "name": "my_text_ingestion_pipeline",
          "type": "INGESTION",
          "clusterId": "in03-***************",
          "collectionName": "my_collection"
          "description": "A pipeline that generates text embeddings and stores additional fields.",
          "status": "SERVING",
          "functions": [
            {
              "action": "INDEX_TEXT",
              "name": "index_my_text",
              "inputFields": ["text_list"],
              "language": "ENGLISH",
              "embedding": "zilliz/bge-base-en-v1.5"
            },
            {
              "action": "PRESERVE",
              "name": "keep_text_info",
              "inputField": "source",
              "outputField": "source",
              "fieldType": "VarChar"
            }
          ]
        },
        {
          "pipelineId": "pipe-xxxx",
          "name": "my_text_search_pipeline",
          "type": "SEARCH",
          "description": "A pipeline that receives text and search for semantically similar texts",
          "status": "SERVING",
          "functions": 
            {
              "action": "SEARCH_TEXT",
              "name": "search_text",
              "inputFields": "query_text",
              "clusterId": "in03-***************",
              "collectionName": "my_collection",
              "embedding": "zilliz/bge-base-en-v1.5",
              "reranker": "zilliz/bge-reranker-base"
            }
        },
        {
          "pipelineId": "pipe-xxxx",
          "name": "my_text_deletion_pipeline",
          "type": "DELETION",
          "description": "A pipeline that deletes entities by expression",
          "status": "SERVING",
          "functions": 
            {
            "action": "PURGE_BY_EXPRESSION",
            "name": "purge_data_by_expression",
            "inputFields": ["expression"]
            },
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
        "name": "my_text_ingestion_pipeline",
        "type": "INGESTION",
        "clusterId": "in03-***************",
        "collectionName": "my_collection"
        "description": "A pipeline that generates text embeddings and stores additional fields.",
        "status": "SERVING",
        "functions": [
          {
            "action": "INDEX_TEXT",
            "name": "index_my_text",
            "inputFields": ["text_list"],
            "language": "ENGLISH",
            "embedding": "zilliz/bge-base-en-v1.5"
          },
          {
            "action": "PRESERVE",
            "name": "keep_text_info",
            "inputField": "source",
            "outputField": "source",
            "fieldType": "VarChar"
          }
        ]
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
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
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
    "description": "A pipeline that splits a text file into chunks and generates embeddings. It also stores the publish_year with each chunk.",
    "status": "SERVING",
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

## 管理 Pipeline{#manage-pipeline}

以下操作可用于管理此前创建的 Pipeline。

### 查看 Pipeline{#view-pipeline}

<Tabs groupId="cluster" defaultValue="Cloud Console" values={[{"label":"Cloud Console","value":"Cloud Console"},{"label":"cURL","value":"Bash"}]}>

<TabItem value="Cloud Console">

点击左侧导航栏中的 **Pipelines**。选中 **Pipelines** 选项卡。您可以查看所有已创建的 Pipelines。

![view-pipelines-on-web-ui-cn](/img/view-pipelines-on-web-ui-cn.png)

点击特定 Pipeline 名称，还可以查看其详情，包括基本信息、总用量、Functions、关联的 Connectors 等。

![view-pipeline-details-cn](/img/view-pipeline-details-cn.png)

<Admonition type="info" icon="📘" title="说明">

<p>总用量非实时更新，数据统计可能会有几小时延迟。</p>

</Admonition>

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
          "name": "my_text_ingestion_pipeline",
          "type": "INGESTION",
          "createTimestamp": 1721187655000,
          "clusterId": "in03-***************",
          "collectionName": "my_collection"
          "description": "A pipeline that generates text embeddings and stores additional fields.",
          "status": "SERVING",
          "totalUsage": {
            "embedding": 0
            },
          "functions": [
            {
              "action": "INDEX_TEXT",
              "name": "index_my_text",
              "inputFields": ["text_list"],
              "language": "ENGLISH",
              "embedding": "zilliz/bge-base-en-v1.5"
            },
            {
              "action": "PRESERVE",
              "name": "keep_text_info",
              "inputField": "source",
              "outputField": "source",
              "fieldType": "VarChar"
            }
          ]
        },
        {
          "pipelineId": "pipe-xxxx",
          "name": "my_text_search_pipeline",
          "type": "SEARCH",
          "createTimestamp": 1721187655000,
          "description": "A pipeline that receives text and search for semantically similar texts",
          "status": "SERVING",
          "totalUsage": {
            "embedding": 0,
            "rerank": 0
            },
          "functions": 
            {
              "action": "SEARCH_TEXT",
              "name": "search_text",
              "inputFields": "query_text",
              "clusterId": "in03-***************",
              "collectionName": "my_collection",
              "embedding": "zilliz/bge-base-en-v1.5",
              "reranker": "zilliz/bge-reranker-base"
            }
        },
        {
          "pipelineId": "pipe-xxxx",
          "name": "my_text_deletion_pipeline",
          "type": "DELETION",
          "createTimestamp": 1721187655000,
          "description": "A pipeline that deletes entities by expression",
          "status": "SERVING",
          "functions": 
            {
            "action": "PURGE_BY_EXPRESSION",
            "name": "purge_data_by_expression",
            "inputFields": ["expression"]
            },
        "clusterId": "in03-***************",
        "collectionName": "my_collection"
        }
      ]
    }
    ```

    <Admonition type="info" icon="📘" title="说明">

    <p>总用量 <code>totalUsage</code> 非实时更新，数据统计可能会有几小时延迟。</p>

    </Admonition>

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
        "pipelineId": "pipe-xxx",
        "name": "my_text_ingestion_pipeline",
        "type": "INGESTION",
        "createTimestamp": 1721187300000,
        "description": "A pipeline that generates text embeddings and stores additional fields.",
        "status": "SERVING",
        "totalUsage": {
          "embedding": 0
        },
        "functions": [
          {
            "name": "index_my_text",
            "action": "INDEX_TEXT",
            "inputFields": ["text_list"],
            "language": "ENGLISH",
            "embedding": "zilliz/bge-base-en-v1.5"
          },
          {
            "name": "keep_text_info",
            "action": "PRESERVE",
            "inputField": "source",
            "outputField": "source",
            "fieldType": "VarChar"
          }
        ],
        "clusterId": "inxx-xxxx",
        "collectionName": "my_collection"
      }
    }
    ```

    <Admonition type="info" icon="📘" title="说明">

    <p>总用量 <code>totalUsage</code> 非实时更新，数据统计可能会有几小时延迟。</p>

    </Admonition>

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
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --url "https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/pipelines/${YOUR_PIPELINE_ID}"
```

如果请求返回以下类似内容，则表示操作成功：

```bash
{
  "code": 200,
  "data": {
    "pipelineId": "pipe-xxx",
    "name": "my_text_ingestion_pipeline",
    "type": "INGESTION",
    "createTimestamp": 1721187300000,
    "description": "A pipeline that generates text embeddings and stores additional fields.",
    "status": "SERVING",
    "totalUsage": {
      "embedding": 0
    },
    "functions": [
      {
        "name": "index_my_text",
        "action": "INDEX_TEXT",
        "inputFields": ["text_list"],
        "language": "ENGLISH",
        "embedding": "zilliz/bge-base-en-v1.5"
      },
      {
        "name": "keep_text_info",
        "action": "PRESERVE",
        "inputField": "source",
        "outputField": "source",
        "fieldType": "VarChar"
      }
    ],
    "clusterId": "inxx-xxxx",
    "collectionName": "my_collection"
  }
}
```

<Admonition type="info" icon="📘" title="说明">

<p>总用量 <code>totalUsage</code> 非实时更新，数据统计可能会有几小时延迟。</p>

</Admonition>

</TabItem>

</Tabs>