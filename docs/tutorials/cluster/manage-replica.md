---
title: "管理 Replica | Cloud"
slug: /manage-replica
sidebar_label: "管理 Replica"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持针对集群创建 Replica。Replica 是对集群中数据和资源的拷贝。使用 Replica 可以提升查询吞吐量和系统稳定性。 | Cloud"
type: origin
token: A8MYw6Wj2ilF2akZeKYcwJGSnSY
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理

---

import Admonition from '@theme/Admonition';


# 管理 Replica

Zilliz Cloud 支持针对集群创建 Replica。Replica 是对集群中数据和资源的拷贝。使用 Replica 可以提升查询吞吐量和系统稳定性。

对于数据量较小但 QPS 出现瓶颈的用户而言，增加 Replica 数量能分布查询负载，从而整体提升查询吞吐量。但是，增加 Replica 数量并不会提升集群容量。影响集群数据容量的唯一因素是 CU 规格。如需提升集群数据容量，请参考[集群扩缩容](./scale-cluster)。

设置 Replica 的操作会影响集群每月的 CU 费用。存储费用不会受到影响。更多详情，请参考[了解费用](./understand-cost)。

本文介绍如何为 Zilliz Cloud 集群设置 Replica。

<Admonition type="info" icon="📘" title="说明">

<p>此功能仅适用于 Dedicated 集群。</p>

</Admonition>

## 设置 Replica{#configure-replicas}

在集群创建完成后，满足以下条件时，您可以设置 Replica：

- 集群 CU 规格大于等于 8 CU。

- 集群中的所有 Collection 已释放。

在设置 Replica 时，需要注意 CU 规格 x Replica 数量不得超过 256。

![configure-replica-cn](/img/configure-replica-cn.png)

如需了解如何使用 RESTful API 设置 Replica，请参考[修改集群配置](/reference/restful/modify-cluster)。