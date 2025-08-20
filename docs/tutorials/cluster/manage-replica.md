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

本文介绍如何为 Zilliz Cloud 集群设置 Replica。

<Admonition type="info" icon="📘" title="说明">

<p>此功能仅适用于 Dedicated 集群。</p>

</Admonition>

## 设置按量计费集群 Replica{#configure-replicas-for-usage-based-cluster}

设置 Replica 的操作会影响集群每月的 CU 费用。存储费用不会受到影响。更多详情，请参考[预估费用](./understand-cost_1)。

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

## 设置包年包月集群 Replica{#configure-replicas-for-annual-subsription-cluster}

当前包年包月集群仅支持增加 Replica 数量，不支持减少 Replica 数量。

![NT2Tw6vf0hXg6ebI541cOXx3ntd](/img/NT2Tw6vf0hXg6ebI541cOXx3ntd.png)

上图展示了增加包年包月集群 Replica 数量的主要流程和步骤。以下为具体操作说明。

### 步骤 1. 增加集群 Replica 数量

1. 登录 Zilliz Cloud。前往目标集群的**集群详情**页。点击 Replica 数量右侧的**增加**按钮。

    ![increase-replica-for-annual-subscription-cluster-entrance-cn](/img/increase-replica-for-annual-subscription-cluster-entrance-cn.png)

1. 选择集群 Replica 数量。目前仅支持选择比当前更大的 Replica 数量。

1. （可选）您可以选择是否需要同时**延长集群有效期**。

1. 检查订单金额，点击**增加**。如需了解集群升配与续订的费用计算规则，请参考[变更配置费用说明](./notice-on-config-changes)。

    ![increase-replica-for-annual-subscription-cluster-cn](/img/increase-replica-for-annual-subscription-cluster-cn.png)

1. 阅读并同意 [Zilliz Cloud 服务条款](https://zilliz.com.cn/cloud-service-terms)。

### 步骤 2. 支付订单

完成步骤 1 后，Zilliz Cloud 将生成一份类型为**升配**的**待支付**订单。请检查订单内容并及时完成支付。

![pay-annual-subscription-scale-order-cn](/img/pay-annual-subscription-scale-order-cn.png)

<Admonition type="info" icon="📘" title="说明">

<p>如果您的组织现金余额不足，请先进行现金充值（对公转账）。详情请见<a href="./advance-pay">现金充值（对公转账）</a>。</p>
<p>充值成功后，您可以前往<strong>费用中心&gt;订单</strong>页支付订单。详情请见<a href="./manage-order">管理订单</a>。</p>
<p>订单生成后 7 天内未完成支付，系统将自动取消订单。如仍需修改包年包月集群 Replica 数量，请重新完成步骤 1 的操作并支付新订单。</p>

</Admonition>

### 步骤 3. 等待集群完成升配

订单支付成功后，Zilliz Cloud 会开始为您的包年包月集群增加 Replica 数量，您将看到以下界面。

![annual-subscription-cluster-is-being-scaled-cn](/img/annual-subscription-cluster-is-being-scaled-cn.png)

集群升配的过程大约需要 10 分钟，请您耐心等待。当集群状态变为**运行中**时，代表包年包月集群 Replica 数量增加成功。