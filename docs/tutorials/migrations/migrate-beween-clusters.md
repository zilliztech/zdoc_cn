---
slug: /docs/migrate-beween-clusters
beta: FALSE
notebook: FALSE
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 集群间迁移

Zilliz Cloud 支持在同一个组织下，将一个集群中的数据迁移至另一个集群中。

<Admonition type="info" icon="📘" title="说明">

此功能仅对绑定支付方式的企业用户开放。如需使用此功能，请先添加支付方式。

</Admonition>

## 操作步骤{#procedure}

1. 点击并进入您的目标集群。在**集群详情**页的右上角，点击**操作**下的**迁移数据**，并选择**从 Zilliz Cloud 集群**。

1. 在**选择数据迁移来源**弹窗中，选择**源项目**、**源集群**、**源 Collection**。查看目标集群信息，确认无误后点击**确认**按钮。请注意，您只能选择状态为“运行中”的集群作为数据迁移来源。

1. 您可以在**迁移记录**页中查看生成的迁移任务记录。待状态从**迁移中**变为**成功**时，迁移完成。
    ![cross-cluster-migration-cn](/img/cross-cluster-migration-cn.png)

1. 迁移完成后，您可以查看某一条迁移任务中的已迁移 Collection 详情。
    ![view-collection-details-cn](/img/view-collection-details-cn.png)

