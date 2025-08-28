---
title: "从 Milvus 迁移至 Zilliz Cloud | Cloud"
slug: /migrate-from-milvus
sidebar_label: "从 Milvus 迁移"
beta: FALSE
notebook: FALSE
description: "Milvus 是一个开源向量数据库，以高性能和易用性著称，广泛应用于管理大规模的向量数据。Zilliz Cloud 通过提供托管的 Milvus 服务，简化了部署和维护的过程，使您可以轻松地将现有的 Milvus 部署迁移到云端。您可以通过连接 Milvus 实例或上传备份文件，将向量数据迁移到 Zilliz Cloud。 | Cloud"
type: origin
token: Eao0wFMCxiFiiikrZgScLW3LnZe
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据迁移

---

import Admonition from '@theme/Admonition';


# 从 Milvus 迁移至 Zilliz Cloud

Milvus 是一个开源向量数据库，以高性能和易用性著称，广泛应用于管理大规模的向量数据。Zilliz Cloud 通过提供托管的 Milvus 服务，简化了部署和维护的过程，使您可以轻松地将现有的 Milvus 部署迁移到云端。您可以通过连接 Milvus 实例或上传备份文件，将向量数据迁移到 Zilliz Cloud。  

Zilliz Cloud 提供了两种主要方式来迁移您在 Milvus 中的数据：  

- [通过 Endpoint](./via-endpoint)：允许您一次迁移单个 Database。Milvus 中的 Database 按顺序单独迁移，非常适合需要仔细管理迁移过程的场景。

- [通过备份文件](./via-backup-files)：支持通过备份文件同时迁移多个 Database，使大规模迁移变得更加快速和高效。



import DocCardList from '@theme/DocCardList';

<DocCardList />