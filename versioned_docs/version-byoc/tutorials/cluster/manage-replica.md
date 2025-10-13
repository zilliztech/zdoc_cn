---
title: "管理 Replica | BYOC"
slug: /manage-replica
sidebar_label: "管理 Replica"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持针对集群创建 Replica。Replica 是对集群中数据和资源的拷贝。使用 Replica 可以提升查询吞吐量和系统稳定性。 | BYOC"
type: origin
token: A8MYw6Wj2ilF2akZeKYcwJGSnSY
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# 管理 Replica

Zilliz Cloud 支持针对集群创建 Replica。Replica 是对集群中数据和资源的拷贝。使用 Replica 可以提升查询吞吐量和系统稳定性。

对于数据量较小但 QPS 出现瓶颈的用户而言，增加 Replica 数量能分布查询负载，从而整体提升查询吞吐量。但是，增加 Replica 数量并不会提升集群容量。影响集群数据容量的唯一因素是 CU 规格。如需提升集群数据容量，请参考[集群扩缩容](./scale-cluster)。

本文介绍如何为 Zilliz Cloud 集群设置 Replica。

<Admonition type="info" icon="📘" title="说明">

<p>此功能仅适用于 Dedicated 集群。</p>

</Admonition>

## 设置按量计费集群 Replica{#configure-replicas-for-usage-based-cluster}

设置 Replica 的操作会影响集群每月的 CU 费用。存储费用不会受到影响。更多详情，请参考[预估费用](./undefined)。

### 使用限制{#limits}

在集群创建完成后，满足以下条件时，您可以设置 Replica：

- 集群 CU 规格大于等于 8 CU。

- 集群中的所有 Collection 已释放。

在设置 Replica 时，需要注意 CU 规格 x Replica 数量不得超过 256。

<Admonition type="caution" icon="🚧" title="警告">

<p>修改 Replica 数量可能会短暂影响数据读取。请谨慎操作。</p>

</Admonition>

### 手动调整 Replica 数量{#configure-replicas-manually}

您可以选择通过控制台或 RESTful API 调整集群 Replica 数量。

#### 通过 Web 控制台{#via-web-console}

以下 Demo 展示了如何在 Zilliz Cloud 控制台中手动调整 Replica 数量。

<Supademo id="cmd2ub5ca38cxc4kjl4ua85dm" title=""  />

<Admonition type="info" icon="📘" title="说明">

<p>当您在 <strong>集群 Replica 扩缩容</strong>对话框中单击<strong>保存</strong>后，您将看到自动弹出的<strong>检查项目资源配额</strong>窗口。如果当前项目的资源充足，该窗口在检查完成后会自动消失。如果资源不足，您可以：</p>
<ul>
<li><p>单击<strong>前往项目资源设置</strong>按钮，以便编辑当前项目的资源设置，或者</p></li>
<li><p>单击<strong>返回上一步</strong>按钮，以便编辑当前集群的相关设置。</p></li>
</ul>
<p>操作期间会消耗少量额外资源，并在操作完成后释放。</p>

</Admonition>

#### 通过RESTful API{#via-restful-api}

您可以使用 RESTful API 设置 Replica。

`replica` 参数的取值应为 1 到 8 之间的整数。更多详情，请参考[修改集群 Replica](/reference/restful/modify-cluster-replica-v2)。

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export CLUSTER_ID="YOUR_CLUSTER_ID"
export TOKEN="YOUR_API_KEY"

curl --request POST \
     --url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modifyReplica" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Accept: application/json" \
     --header "Content-type: application/json" \
     --data-raw '{
        "replica": "2"
      }'
```

### 设置 Replica 弹性伸缩{#auto-scale-replicas}

目前，您仅可通过 Zilliz Cloud 控制台，根据预设的时间计划自动调整 Replica 数量。

以下 Demo 展示了如何启用 Replica 弹性伸缩功能。

<Supademo id="cmd2ujs5s38dlc4kjgbm3gkui" title=""  />

