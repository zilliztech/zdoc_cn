---
slug: /understanding-pipelines
beta: FALSE
notebook: FALSE
type: origin
token: WfbLwEnVviFQnzk4VFWcmC76ndd
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 了解 Pipelines

Zilliz Cloud Pipelines 可以将文档、文本片段和图像等非结构化数据转换成可搜索的向量并存储在 [Collection](./cluster-collection-and-entities#collection) 中。本文将介绍 Zilliz Cloud Pipelines 的三种主要类型及其 Function。

![MUJnbGxqRo60zGxoPn3cU0MpnQc](/img/MUJnbGxqRo60zGxoPn3cU0MpnQc.png)

## 概览{#overview}

当今，语义搜索广泛运用于众多服务和应用中，包括搜索和查询语义上相匹配的文本快、相似的图片等。通常此类检索系统都会处理数据，将数据转化为 Embedding 向量。换言之，检索系统会将文本或图像以多维空间中的向量来表示。构建此类检索系统需要深厚的专业知识和工程技术。但是，使用 Zilliz Cloud Pipelines，您可以通过简单易用的界面构建检索系统。当前，Zilliz Cloud Pipelines 支持对文本文档进行语义搜索——这也是检索增强生成（RAG）应用的基石。后续 Zilliz Cloud Pipelines 将推出更多类型的 Pipelines，从而满足更多的语义搜索场景，例如图片搜索、视频搜索、多模态搜索等。

## Ingestion pipeline{#ingestion-pipelines}

Ingestion pipeline 能够将非结构化数据转化为可搜索的 Embedding 向量，并将向量存储在 Zilliz Cloud 向量数据库中。

1 个 Ingestion pipeline 中可创建多个 Function，用于将输入字段通过转换器处理，生成输出字段。例如，您可以将文档作为输入，Function 会将这些文档自动切块并转换为 Embedding 向量或保留文档的一些元数据信息，以便后续进行向量搜索时过滤搜索结果。

在Zilliz Cloud 中，1 个 Ingestion pipeline 只对应 1 个 Collection。当您创建 Ingestion pipeline 时，Zilliz Cloud 会自动创建 1 个对应的 Collection，并根据您添加的 Pipeline Function 自动设置 Collection Schema。

### INDEX_DOC Function{#indexdoc-function}

INDEX_DOC Function 将输入文本文档拆分成块，并将文档块转换为 Embedding 向量。此 Function 将输入字段（`doc_url`）映射为四个输出字段（`doc_name`、`chunk_id`、`chunk_text` 和 `embedding`）。这四个字段构成 Zilliz Cloud 自动生成的 Collection 中的标量和向量字段。字段名称不可更改。

<Admonition type="info" icon="📘" title="说明">

<p>1 个 Ingestion pipeline 需要添加且只能添加 1 个 INDEX_DOC Function。</p>

</Admonition>

### PRESERVE Function{#preserve-function}

PRESERVE Function 将用户定义的输入字段存储为自动生成 Collection 中额外的标量字段，用于存储元数据。您可以使用 PRESERVE Function 来保留文档的元数据。一个 PRESERVE Function 仅保存一个标量字段，一个 Ingestion pipeline 中最多可添加 5 个 PRESERVE Function。

### 示例：创建知识库{#example-creating-a-knowledge-base}

使用 Ingestion pipeline，您基于已有的文档和相关元数据（如文档作者、发布日期等）轻松构建支持向量相似性搜索的知识库。文档块及其 Embedding 向量和元数据都存储于向量数据库中。

![GvCiblZjboBqfjxdMsEcEGpTnNh](/img/GvCiblZjboBqfjxdMsEcEGpTnNh.png)

## Search pipeline{#search-pipelines}

Search pipeline 将查询语句（字符串）转换为 Embedding 向量，并在向量数据库中进行向量相似性搜索，从而获取Top-k 相似向量、对应的文档块和文档元数据。您可以使用 Search pipeline 实现语义搜索。1 个 Search pipeline 中仅可添加 SEARCH_DOC_CHUNK 1 种 Function。

### SEARCH_DOC_CHUNK Function{#searchdocchunk-function}

此 Function 将查询文本转换为 Embedding 向量，并在向量数据库中检索与查询向量最相关的 Top-k 个文档块向量。

### 示例：检索最相关的 Entity{#example-retrieving-the-most-relevant-entities}

如果您已经创建了 1 个 Ingestion Pipeline，您可以在其对应的 Collection 中使用 Search pipeline 检索 Top-k 个相似文本块向量。

![Mrrpb0D3Po8kAFxYGZ5c6xPznBh](/img/Mrrpb0D3Po8kAFxYGZ5c6xPznBh.png)

## Deletion pipeline{#deletion-pipelines}

Deletion pipeline 从 Collection 中删除指定文档的所有文档块。1 个 Deletion pipeline 中仅可添加 PURGE_DOC_INDEX 1 种 Function。

### PURGE_DOC_INDEX Function{#purgedocindex-function}

此 Function 删除具有指定 `doc_name` 的所有文档块。您可以 PURGE_DOC_INDEX Function 从向量数据库中高效删除文档。

### 示例：高效删除文档数据{#example-easily-purge-all-data-of-a-document}

如果您已经创建了 1 个 Ingestion Pipeline，您可以在其对应的 Collection 中使用 Deletion pipeline 指定 `doc_name`轻松删除对应文档。

![QPn9b4bKCoy27ix7KPHc58iQnGf](/img/QPn9b4bKCoy27ix7KPHc58iQnGf.png)

## 相关文档{#related-topics}

- [创建 Ingestion Pipelines](./create-ingestion-pipelines)

- [创建 Search Pipelines](./create-search-pipelines)

- [创建 Deletion Pipelines](./create-deletion-pipelines)

