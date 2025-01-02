---
title: "Zilliz Cloud 跨集群迁移 | Cloud"
slug: /migrate-between-clusters
sidebar_label: "跨集群迁移"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持组织内或组织间的集群迁移。这一功能确保了资源管理和扩展的灵活性。若要将数据迁移到不同组织的集群时，您需要提供适当的身份验证凭据，例如目标组织的 API 密钥或包含用户名和密码的集群凭证。 | Cloud"
type: origin
token: N6tlwTPPvi0FXvkj4fccCgtTnOg
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - 集群

---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 跨集群迁移

Zilliz Cloud 支持组织内或组织间的集群迁移。这一功能确保了资源管理和扩展的灵活性。若要将数据迁移到不同组织的集群时，您需要提供适当的身份验证凭据，例如目标组织的 API 密钥或包含用户名和密码的集群凭证。

## 注意事项{#considerations}

- 为了确保性能，Zilliz Cloud 不支持降级迁移。例如，您无法从 Dedicated 版集群迁移到 Serverless 版集群、从 Dedicated 版集群迁移到 Free 版集群，或从 Free 版集群迁移到 Free 版集群。

## 开始前{#before-you-start}

- 源 Zilliz Cloud 集群必须能够通过公网访问。

- 对于[组织间迁移](./migrate-between-clusters#migrate-data-across-organizations)，请确保您拥有目标 Zilliz Cloud 集群所需的连接信息，包括集群 Endpoint、API 密钥或集群的用户名和密码。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

## 组织内迁移{#migrate-data-within-the-same-organization}

![zh_cross_cluster_migration_1](/img/zh_cross_cluster_migration_1.png)

您可以将数据迁移到同一组织内的新集群或现有集群。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **当前组织**。

1. 在**选择迁移源和方式**对话框中，配置源集群和目标集群。请确保目标集群的版本类型不低于源集群（例如，不支持从 Dedicated 集群迁移到 Free 或 Serverless 集群）。有关集群版本的更多信息，请参阅[Zilliz Cloud 版本对比](./select-zilliz-cloud-service-plans)。

    <Admonition type="info" icon="📘" title="说明">

    <p>在迁移数据时，您可以选择在同一组织内创建新的目标集群或使用现有集群。源集群应从当前项目中可用的集群中选择。</p>

    </Admonition>

1. 点击**迁移**。

## 组织间迁移{#migrate-data-across-organizations}

![zh_cross_cluster_migration_2](/img/zh_cross_cluster_migration_2.png)

要跨组织迁移数据，您需要提供必要的连接凭证（源集群连接端点、API 密钥或用户名和密码）来访问不同组织中的源集群。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **外部组织**。

1. 在**连接至数据源**步骤中，填入源集群的连接端点和凭证，然后点击**下一步**。

1. 在**选择迁移来源和目标**步骤中，配置源集群和目标集群设置，然后点击**下一步**。

1. 在**配置 Schema** 步骤中：

    1. 预览并验证目标 collection 的 schema。

    1. （可选）在**高级设置**中配置**动态列**和 **Partition Key**。更多信息请参考[开启动态字段](./enable-dynamic-field)和[使用 Partition Key](./use-partition-key)。

    1. （可选）在**基础信息**中自定义目标 collection 名称和描述。collection 名称在每个集群中必须唯一。如果目标 collection 名称与现有 collection 重复，需要重命名目标 collection。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

