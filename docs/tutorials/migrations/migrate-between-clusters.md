---
slug: /migrate-between-clusters
beta: FALSE
notebook: FALSE
type: origin
token: N6tlwTPPvi0FXvkj4fccCgtTnOg
sidebar_position: 3
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

Zilliz Cloud 支持将一个集群中的数据迁移至另一个集群中。您可以在两个集群中迁移数据。

通过跨集群迁移，您可以轻松修改集群 CU 类型、部署地域或为集群缩容。集群迁移将不会影响您原有集群的状态。

<Admonition type="info" icon="📘" title="说明">

<p>如需使用此功能，请先添加<a href="./payment-billing">支付方式</a>。</p>
<p>在两个 Dedicated 集群间迁移数据会产生一定费用。具体收费详情，请参阅<a href="./understand-cost#migration-costs">了解费用</a>。</p>

</Admonition>

## 从 Serverless 集群迁移至 Dedicated 集群{#from-serverless-to-dedicated-cluster}

Dedicated 集群提供专有环境和资源，可处理更大数据量，性能更佳。此外，Dedicated 集群还支持众多高级功能，如：备份恢复、网络白名单、私网连接（Private Link）等。如需使用上述功能及专有资源，我们推荐您将 Serverless 集群迁移至 Dedicated 集群。

1. 进入需要迁移的 Serverless 集群，切换至集群**迁移**页签。在跨集群迁移卡片中，点击迁移并选择**迁移至新集群**。

    ![cross_cluster_migration_serverless_to_dedicated_cn](/img/cross_cluster_migration_serverless_to_dedicated_cn.png)

1. 在弹窗中设置迁移详情：

    1. 设置新 Dedicated 集群所属的项目、新集群名称、云服务提供商和地域、CU 设置等。

    1. 检查新集群的配置。

    1. 点击**迁移**。

1. Zilliz Cloud 将生成一条迁移任务。您可前往[任务中心](./job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

1. 点击迁移任务操作栏中的查看详情，您可以了解完成迁移的 Collection 信息。

## 从 Dedicated 集群迁移至另一个 Dedicated 集群{#from-dedicated-to-another-dedicated-cluster}

您可以将一个 Zilliz Cloud Dedicated 集群迁移至一个全新或现有的 Dedicated 集群。

如果选择将 Dedicated 集群迁移至一个全新的 Dedicated 集群，您可以轻松修改集群 CU 类型、部署地域或为集群缩容。集群迁移将不会影响您原有集群的状态。

如果选择将 Dedicated 集群迁移至现有 Dedicated 集群，您可以高效整合现有集群资源和数据。

<Admonition type="info" icon="📘" title="说明">

<p>此功能仅对 Dedicated 版集群开放。</p>

</Admonition>

### 从 Dedicated 集群迁移至新 Dedicated 集群{#from-a-dedicated-cluster-to-a-new-one}

1. 点击并进入 Dedicated 集群。切换至集群**迁移**页签。在跨集群迁移卡片中，点击**迁移 > 迁移至新集群**。

1. 在弹窗中，设置迁移详情：

    1. 设置新 Dedicated 集群所属的项目、新集群名称、云服务提供商和地域、CU 设置等。

    1. 检查新集群的配置。

    1. 点击**迁移**。

1. Zilliz Cloud 将生成一条迁移任务。您可前往[任务中心](./job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

    ![cross_cluster_migration_to_new_dedicated_cn](/img/cross_cluster_migration_to_new_dedicated_cn.png)

1. 点击迁移任务操作栏中的查看详情，您可以了解完成迁移的 Collection 信息。

    ![view_migration_progress_cn](/img/view_migration_progress_cn.png)

### 在两个现有 Dedicated 集群间迁移数据{#between-two-existing-dedicated-cluster}

<Admonition type="info" icon="📘" title="说明">

<p>迁移前，请先确保两个集群兼容的 Milvus 版本一致。</p>

</Admonition>

1. 点击并进入 Dedicated 集群。切换至集群**迁移**页签。在跨集群迁移卡片中，点击**迁移 > 迁移至现有集群**。

1. 在弹窗中，设置迁移详情：

    1. 选择当前集群中需要迁移的**源 Collection**。

    1. 选择**目标项目**和**目标集群**。

    1. 检查目标集群信息。

    1. 点击**迁移**。

1. Zilliz Cloud 将生成一条迁移任务。您可前往[任务中心](./job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

    ![cross_cluster_migration_to_existing_dedicated_cn](/img/cross_cluster_migration_to_existing_dedicated_cn.png)

1. 点击迁移任务操作栏中的查看详情，您可以了解完成迁移的 Collection 信息。

    ![view_migration_progress_cn](/img/view_migration_progress_cn.png)

    