---
slug: /release-notes-280
beta: FALSE
notebook: FALSE
type: origin
token: Nj7Hw23HBiVgc6kpfehc6r6bnIg
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 版本说明书（2024/05/30）

本次发布，Zilliz Cloud 带来了全新的 Serverless 订阅方案。该方案无须特殊配置，支持平滑扩容，适用于查询量变化较大的各类应用场景。当前，该方案处于 Beta 阶段，您可以在 **阿里云华东1（杭州）** 区域创建一个限时免费的 Serverless 集群。另外，本次发布还对监控指标、检索精度控制及数据导入做了相应的增强。

## Milvus 兼容性{#milvus-compatibility}

本次发布后创建的所有集群均兼容 Milvus v2.3.x。

## Serverless Beta{#serverless-beta}

全新的 Serverless 订阅方案是为查询规模变化较大的应用量身打造的，无须特殊配置和调优即可使用。Serverless 集群还支持平滑扩容，可以满足您的多种负载需求，保障快速验证时的易用性。

Serverless 集群当前处于 Beta 阶段，您可以在 **阿里云华东1（杭州）** 区域创建一个限时免费的 Serverless 集群，无须添加任何支付方式。

关于更多详情，可参考 [Serverless 版本](./free-trials#serverless-plan)的详细介绍。

## Pipelines{#pipelines}

- 文本 Pipeline

    用户当前可以创建用于摄取、检索和删除文本内容的 Pipeline 来处理您的文本内容，包括对纯文本内容建立索引以及进行语义检索。该功能为 RAG 和文本召回类应用提供了极大的灵活性。关于更多详情，可参考[文本数据](./pipelines-text-data)和[文档数据](./pipelines-doc-data)。

- 图片 Pipeline

    用户当前还可创建用于摄取、检索和删除图片内容的 Pipeline 来处理您的图片文件，包括为您的图片文件建立倒排索引和以图片 URL 为输入进行图片检索。关于更多详情，可参考[图像数据](./pipelines-image-data)。

- Pipeline 还提供一组 RESTful API，允许用户在创建 Pipeline 时使用 Schema 匹配的既有 Collection。关于更多详情，可参考 [Pipeline 参考文档](/reference/restful/pipeline-operations)。

## 其它增强{#other-enhancements}

本次发布还增强了如下功能。

- 更多的[集群监控指标](./metrics-alerts-reference)。

- [检索精度控制参数](./autoindex-explained#about-the-level-parameter)。通过在召回率和检索性能间进行取舍，提供五级精度控制能力。

- 单 Collection 支持最多 10 个正在运行或待运行的导出任务。

