---
slug: /migrate-between-clusters
beta: FALSE
notebook: FALSE
token: N6tlwTPPvi0FXvkj4fccCgtTnOg
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 集群间迁移

Zilliz Cloud 支持在同一个组织下，将一个集群中的数据迁移至另一个集群中。您可以将数据从一个 Serverless 集群迁移至一个 Dedicated 集群中，或者在两个 Dedicated 集群中迁移数据。

## 从 Serverless 集群迁移至 Dedicated 集群{#serverless-dedicated}

<Admonition type="info" icon="📘" title="说明">

</Admonition>

<Admonition type="info" icon="说明" title="undefined">

</Admonition>

进入需要迁移的 Serverless 集群，点击右上角**操作**，并从下拉菜单中选择**迁移至 Dedicated 集群**。在弹窗中设置迁移详情：

- 确认订阅版本并选择**目标集群**。

- 输入**集群名称**和密码。

- 选择**云服务提供商**和**地域**。

- 设置 **CU 类型**和** CU 大小**。

【Insert screenshot here】

设置完上述内容后，点击**迁移集群**。Zilliz Cloud 会开始按照您的配置创建 1 个全新 Dedicated 集群并将原 Serverless 集群中数据迁移至此新创建的 Dedicated 集群中。

在迁移过程中，新创建的 Dedicated 集群状态会从**创建中**变为**恢复中**，直至最终变为**运行中**（即代表迁移成功）。当 Dedicated 集群状态显示为运行中时，您可以[连接集群](./connect-to-cluster)。

## Dedicated 集群间迁移{#procedure}{#dedicated-procedure}

1. 点击并进入您的目标集群。在**集群详情**页的右上角，点击**操作**下的**迁移数据**，并选择**从 Dedicated 集群**。

1. 在**选择数据迁移来源**弹窗中，选择**源项目**、**源集群**、**源 Collection**。查看目标集群信息，确认无误后点击**确认**按钮。请注意，您只能选择状态为“运行中”的集群作为数据迁移来源。

1. 您可以在**迁移记录**页中查看生成的迁移任务记录。待状态从**迁移中**变为**成功**时，迁移完成。

    ![cross-cluster-migration-cn](/img/cross-cluster-migration-cn.png)

1. 迁移完成后，您可以查看某一条迁移任务中的已迁移 Collection 详情。

    ![view-collection-details-cn](/img/view-collection-details-cn.png)

