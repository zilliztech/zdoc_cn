---
title: "FAQ：Pipelines | CLOUD"
slug: /faq-pipelines
sidebar_label: "FAQ：Pipelines"
beta: FALSE
notebook: FALSE
description: " | CLOUD"
type: origin
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 5

---

# FAQ：Pipelines

本文列举了在使用 Zilliz Cloud Pipelines 时可能遇到的常见问题及对应解决方法。

## 目录

- [Zilliz Cloud Pipelines 如何提升语义搜索能力？](#how-can-zilliz-cloud-pipelines-enhance-my-semantic-search-capabilities)
- [哪些 Zilliz Cloud 版本提供 Pipelines 功能？](#which-zilliz-cloud-product-tiers-are-pipelines-available-in)
- [Zilliz Cloud Pipelines 使用哪些 Embedding 模型？](#which-embedding-model-does-zilliz-cloud-pipelines-use)
- [Zilliz Cloud Pipelines 如何收费？](#how-is-zilliz-cloud-pipelines-charged)
- [Zilliz Cloud Pipelines 能否独立于 Zilliz Cloud 使用？](#can-i-use-zilliz-cloud-pipelines-standalone)
- [Ingestion Pipeline 支持哪些数据来源？](#what-data-sources-are-supported-by-ingestion-pipelines)
- [Pipelines 支持哪些文档文件类型？](#what-document-file-formats-are-supported-by-pipelines)

## 问答




### Zilliz Cloud Pipelines 如何提升语义搜索能力？ \{#how-can-zilliz-cloud-pipelines-enhance-my-semantic-search-capabilities}

Pipelines 可以将非结构化数据转化为高质量的 Embedding 向量，从而有效提升语义搜索结果的相关性。

### 哪些 Zilliz Cloud 版本提供 Pipelines 功能？ \{#which-zilliz-cloud-product-tiers-are-pipelines-available-in}

所有 Zilliz Cloud 版本均提供 Pipelines 功能。但是，您只可在部署于阿里云（杭州）的集群中创建和运行 Pipelines。

### Zilliz Cloud Pipelines 使用哪些 Embedding 模型？ \{#which-embedding-model-does-zilliz-cloud-pipelines-use}

针对文本和文档，Ingestion 和 Search Pipeline 提供 2 种 Embedding 模型选择。

- **zilliz/bge-base-en-v1.5**（针对英语文档）：智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。

- **zilliz/bge-base-zh-v1.5**（针对中文文档）：智源研究院（BAAI）发布的开源 Embedding 向量模型。该模型与向量数据库共同托管于 Zilliz Cloud 上，具备出色的性能，可大幅降低延时。

针对图像数据，Ingestion 和 Search Pipeline 提供以下Embedding 模型选择。

- **zilliz/vit-base-patch16-224**：Google 开源的 Vision Transformer (ViT) encoder 模型（类似于 BERT），在大量图像数据上进行预训练，可用于将图像的内容语义转化为向量空间中的 Embedding 向量。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。

- **zilliz/clip-vit-base-patch32**：OpenAI 发布的多模态模型。视觉模型和文本模型共同将图像和文本转换为同一向量空间中的 Embedding 向量，实现数据和文案信息两种模态信息的语义搜索。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。

- **zilliz/clip-vit-base-patch32-multilingual-v1**：OpenAI 发布的 CLIP-ViT-B32 模型的多语言版本。与 CLIP-ViT-B32 的视觉模型配套使用时，可处理 50 多种语言的文本。该模型托管于 Zilliz Cloud 之上，可大幅降低延时。

### Zilliz Cloud Pipelines 如何收费？ \{#how-is-zilliz-cloud-pipelines-charged}

目前，Zilliz Cloud Pipelines 提供免费 Quota。定价详情，请见 https://zilliz.com.cn/pricing。

### Zilliz Cloud Pipelines 能否独立于 Zilliz Cloud 使用？ \{#can-i-use-zilliz-cloud-pipelines-standalone}

不可以。如需使用 Zilliz Cloud Pipelines，您必须先注册 Zilliz Cloud 账号。

### Ingestion Pipeline 支持哪些数据来源？ \{#what-data-sources-are-supported-by-ingestion-pipelines}

目前 Ingestion Pipeline 支持本地文件和存储在[阿里云对象存储 OSS ](https://www.alibabacloud.com/zh/product/object-storage-service)中的数据。后续会支持更广泛的数据来源。

### Pipelines 支持哪些文档文件类型？ \{#what-document-file-formats-are-supported-by-pipelines}
Pipelines 支持以下文件类型的文档：`.txt`、`.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt` 和 `.pptx`。

[运行 Ingestion Pipelines](./undefined#run-doc-ingestion-pipeline) 时，您可以上传本地文件或使用阿里云对象存储 OSS 签名 URL。
