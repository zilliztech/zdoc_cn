---
title: "Database | Cloud"
slug: /database
sidebar_label: "Database"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 在集群和 Collection 之间引入了一层 Database，可帮助您更高效地组织和管理数据，同时满足您的多租需求。 | Cloud"
type: origin
token: VhSHwx56YiKY8VkRCHZcXspznbh
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理
  - database

---

import Admonition from '@theme/Admonition';


# Database

Zilliz Cloud 在集群和 Collection 之间引入了一层 **Database**，可帮助您更高效地组织和管理数据，同时满足您的多租需求。

## 什么是 Database{#what-is-a-database}

在 Zilliz Cloud 中，Database 是用于组织和管理数据的逻辑单元。为了增强数据安全并实现多租，您可以创建多个 Database，从逻辑上将不同应用和不同租户的数据隔离开来。例如，您可以针对两名不同用户的数据创建不同的 Database。

下图展示了 Zilliz Cloud 资源层级的架构。

![HBJew3E05hLhtObS4jZcUV0Nnig](/img/HBJew3E05hLhtObS4jZcUV0Nnig.png)

通过上图可以看到，仅 Dedicated 集群下有 Database 层。 Serverless 和 Free 集群下无 Database 层。

## 前提条件{#prerequisites}

您需要具备**组织管理员**或**项目管理员**权限。

## 创建 Database{#create-database}

仅 Dedicated 集群支持创建 Database。在您创建 Dedicated 集群的同时，Zilliz Cloud 会为您在集群下自动创建一个 Default Database。

每个 Dedicated 集群中最多可创建 1024 个 Database。

![create-database-cn](/img/create-database-cn.png)

您也可以将创建好的 Collection 从一个 Database 移动到另一个 Database 中。更多详情，请参考[管理 Collection (控制台)](./manage-collections-console)。

## 删除 Database{#drop-database}

默认的 Default Databases 无法删除。

删除 Database 前需要先删除 Database 下的所有 Collection。

![drop-database-cn](/img/drop-database-cn.png)

