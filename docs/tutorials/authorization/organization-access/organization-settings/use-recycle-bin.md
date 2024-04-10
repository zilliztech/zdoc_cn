---
slug: /use-recycle-bin
beta: FALSE
notebook: FALSE
type: origin
token: XVQcw6qgxiC31ikfk06cOo1jnch
sidebar_position: 6
---

import Admonition from '@theme/Admonition';


# 使用回收站

为进一步保护您的数据，任何删除的集群都会在回收站种保留 30 天。这样一来不论是因为操作失误还是试用到期或欠费导致集群删除，您都可以在 30 天内安全恢复集群数据。

## 前提条件{#prerequisites}

如需还原回收站中集群，请先添加[支付方式](/docs/payment-billing)。

## 恢复回收站中集群{#restore-a-dropped-cluster-in-the-recycle-bin}

1. 进入已删除集群所属的组织。

1. 通过左侧导航栏或顶部导航栏中的垃圾箱图标进入回收站。

1. 在需要恢复的集群的操作栏中选择**恢复集群**。

1. 配置需要恢复的集群。

    1. 您可以将集群恢复到同一组织下的不同项目中，但是集群恢复不可跨地域。

    1. 您可以选择保留集群中集合的加载状态。

    1. 您可以重命名集群，重新选择集群 CU 大小，并重置集群连接密码。

1. 点击**恢复**。Zilliz Cloud 将开始根据您在上一步骤中的配置创建新集群，并将你的数据恢复到集群中。

<Admonition type="info" icon="📘" title="说明">

<p>集群恢复过程中，其状态将从<strong>创建中</strong>变为<strong>恢复中</strong>，最后变为<strong>运行中</strong>。集群状态变为<strong>运行中</strong>即代表所有被删除的数据已恢复。</p>

</Admonition>

## 文档推荐{#related-topics}

- [创建备份快照](./create-snapshot)

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

