---
slug: /understanding-connectors
beta: FALSE
notebook: FALSE
type: origin
token: CuOUwg2tyijZoFkO3ItcLaiMnac
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 了解 Connector

Connector 可以轻松将各种数据源连接到向量数据库。本文将介绍什么是 Connector、Connector 的作用以及如何使用 Connector。

## Connector 是什么？{#what-is-a-connector}

Connector 用于将数据从各种数据源（包括对象存储、Kafka 等）导入到 Zilliz Cloud。以对象存储 Connector 为例，它可以监控对象存储桶中的目录，并将 PDF、HTML 等文件同步到 [Zilliz Cloud Pipelines](./understanding-pipelines)，以便后续将文件转换为向量并存储在向量数据库中用于搜索。通过 Ingestion 和 Deletion Pipelines，Zilliz Cloud 能够实时同步数据，并根据对象存储中添加或删除的文件即使更新向量数据库 Collection 中的数据。

![connector-overview-cn](/img/connector-overview-cn.png)

## Connector 的作用 {#why-use-a-connector}

- **实时数据导入**

    轻松实时导入数据并创建索引。确保最新内容立即可用于所有搜索查询。

- **灵活可扩展，可适应各种场景**

    轻松扩展您的数据 ingestion pipeline，免去繁琐的运维。Connector 可适应和无缝处理不断变化的流量负载，确保能够丝滑扩展。

- **与数据源保持同步的搜索索引**

    自动同步文档更新（添加和删除），实时更新搜索索引。此外，即将支持所有常见类型的数据源。

- **观测数据流**

    通过详细的日志获取数据流的洞察，确保透明度并检测可能出现的任何异常。

## 如何使用 Connector？{#how-does-the-connector-work}

Zilliz Cloud Connector 提供灵活的选项，支持轻松自定义自动扫描频率。设置自动扫描后，Zilliz Cloud Connector 将定期扫描您的数据源，并定期将数据导入到您的向量数据库中。以下截图展示了配置自动扫描的过程。

![configure-connector-simple-way-cn](/img/configure-connector-simple-way-cn.png)