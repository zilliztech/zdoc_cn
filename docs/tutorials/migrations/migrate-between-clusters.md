---
slug: /migrate-between-clusters
beta: FALSE
notebook: FALSE
type: origin
token: N6tlwTPPvi0FXvkj4fccCgtTnOg
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 集群间迁移

Zilliz Cloud 支持在同一个组织下，将一个集群中的数据迁移至另一个集群中。您可以在两个集群中迁移数据。

## 集群间迁移{#procedure}

通过集群间迁移，您可以轻松修改集群 CU 类型、部署地域或为集群缩容。集群迁移将不会影响您原有集群的状态。

1. 点击并进入您的目标集群。在__集群详情__页的右上角，点击__操作__下的__迁移数据__，并选择__从 Zilliz Cloud 集群__。

1. 在__选择数据迁移来源__弹窗中，选择__源项目__、__源集群__、__源 Collection__。查看目标集群信息，确认无误后点击__确认__按钮。请注意，您只能选择状态为“运行中”的集群作为数据迁移来源。

1. 您可以在__迁移记录__页中查看生成的迁移任务记录。待状态从__迁移中__变为__成功__时，迁移完成。

    ![cross-cluster-migration-cn](/img/cross-cluster-migration-cn.png)

1. 迁移完成后，您可以查看某一条迁移任务中的已迁移 Collection 详情。

    ![view-collection-details-cn](/img/view-collection-details-cn.png)

