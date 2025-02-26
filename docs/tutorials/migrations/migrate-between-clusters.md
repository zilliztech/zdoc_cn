---
title: "集群间迁移 | Cloud"
slug: /migrate-between-clusters
sidebar_label: "集群间迁移"
beta: FALSE
notebook: FALSE
description: "集群间迁移允许您在计划的停机时间内，将现有集群数据从源集群迁移到目标集群。此方法支持在同一组织内或不同组织之间进行迁移，适用于可以接受短暂停机的场景，例如计划维护或小规模数据库迁移。 | Cloud"
type: origin
token: N6tlwTPPvi0FXvkj4fccCgtTnOg
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - 集群
  - 离线

---

import Admonition from '@theme/Admonition';


# 集群间迁移

**集群间迁移**允许您在计划的停机时间内，将现有集群数据从源集群迁移到目标集群。此方法支持在同一组织内或不同组织之间进行迁移，适用于可以接受短暂停机的场景，例如计划维护或小规模数据库迁移。

## 开始前{#before-you-start}

- 源 Zilliz Cloud 集群必须能够通过公网访问。

- 对于[组织间迁移](./migrate-between-clusters#migrate-data-across-organizations)，请确保您拥有目标 Zilliz Cloud 集群所需的连接信息，包括集群 Endpoint、API 密钥或集群的用户名和密码。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

<Admonition type="info" icon="📘" title="说明">

<p>Zilliz Cloud 还提供 RESTful API 接口，支持以编程方式在集群之间迁移数据。详细信息请参考<a href="/reference/restful/migrate-to-existing-cluster-v2">迁移数据至现有集群</a>或<a href="/reference/restful/migrate-to-new-dedicated-cluster-v2">迁移数据至新集群</a>。</p>

</Admonition>

## 组织内迁移{#migrate-data-within-the-same-organization}

您可以将数据迁移到同一组织内的新集群或现有集群。

![zh_cross_cluster_migration_1](/img/zh_cross_cluster_migration_1.png)

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **当前组织**。

1. 在弹出的对话框中，配置源集群、数据库及目标集群：

    - **源集群**：选择要迁移的源集群及其中的 Database。

    - **迁移到**：选择**现有集群**或**新集群**作为目标集群。

    - **迁移类型**：选择**离线迁移**。

1. 点击**下一步**继续：

    - 如果选择迁移到**现有集群**，系统将跳转至**迁移至现有集群** 页面，选择目标项目和目标集群。

    - 如果选择迁移到**新集群**，系统将跳转至集群创建页面，设置新的集群配置。

1. 点击**迁移**完成操作。

## 组织间迁移{#migrate-data-across-organizations}

要跨组织迁移数据，您需要提供必要的连接凭证（源集群连接端点、API 密钥或用户名和密码）来访问不同组织中的源集群。

![zh_cross_cluster_migration_2](/img/zh_cross_cluster_migration_2.png)

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **外部组织**。

1. 在**连接至数据源**步骤中，填入源集群的连接端点和凭证，然后点击**下一步**。

1. 在**选择迁移来源和目标**步骤中，配置源集群和目标集群设置，然后点击**下一步**。

1. 在**配置 Schema** 步骤中：

    1. 预览并验证目标 collection 的 schema。

    1. （可选）在**高级设置**中配置**动态列**和 **Partition Key**。更多信息请参考 [Dynamic Field](./enable-dynamic-field) 和[使用 Partition Key](./use-partition-key)。

    1. （可选）在**基础信息**中自定义目标 collection 名称和描述。collection 名称在每个集群中必须唯一。如果目标 collection 名称与现有 collection 重复，需要重命名目标 collection。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](./view-activities)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

