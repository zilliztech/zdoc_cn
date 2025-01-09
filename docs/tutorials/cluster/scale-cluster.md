---
title: "集群扩缩容 | Cloud"
slug: /scale-cluster
sidebar_label: "集群扩缩容"
beta: FALSE
notebook: FALSE
description: "随着数据增长，您可能会面临一些数据写入限制。例如，当数据量过大超出集群最大容量时，您虽然可以继续读区数据，但是数据写入操作（如插入数据、Upsert 等）将受到限制。 | Cloud"
type: origin
token: MeCPwj8n0i2x1BksjOHc3OKRn55
sidebar_position: 4
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理

---

import Admonition from '@theme/Admonition';


# 集群扩缩容

随着数据增长，您可能会面临一些数据写入限制。例如，当数据量过大超出集群最大容量时，您虽然可以继续读区数据，但是数据写入操作（如插入数据、Upsert 等）将受到限制。

为了解决这些问题，您可以进行集群扩缩容。集群扩缩是指调整 CU 规格，以满足不断变化的计算与存储需求。在 CPU 或内存使用率增大时，您可以通过增加 CU 规格来提高集群性能。同样，您也可以在业务需求较低的时候减少 CU 规格以节省开支。

本文介绍如何进行集群扩缩容。

<Admonition type="info" icon="📘" title="说明">

<p>此功能仅对 Dedicated 集群开放。Serverless 集群会根据工作负载自动伸缩，因此无需手动进行扩缩容。</p>

</Admonition>

## 按量计费集群扩缩容{#usage-based-cluster-scaling}

### 手动扩缩容{#manual-scaling}

您可以通过 Zilliz Cloud 控制台或者调用 API 命令来进行手动扩缩容。本文将介绍如何通过 Zilliz Cloud 控制台进行手动扩缩容。如需了解如何使用 RESTful API 进行扩缩容，请参考[修改集群配置](/reference/restful/modify-cluster)。

<Admonition type="caution" icon="🚧" title="警告">

<p>集群扩缩容过程中，服务可能会有短暂抖动。请谨慎操作。</p>

</Admonition>

### 手动扩容{#scale-up-a-cluster}

![manual-scale-entry-cn](/img/manual-scale-entry-cn.png)

在对话框中，您可以增加 CU 规格，但无法调整 CU 类型和云服务地域。您最多可将集群资源扩展到 256 个 CU。如果您需要更大的 CU 规格，请[提交工单](https://support.zilliz.com.cn)。

<Admonition type="info" icon="📘" title="说明">

<p>CU 规格 x <a href="./manage-replica">Replica</a> 数量不得超过 256。</p>

</Admonition>

### 手动缩容{#scale-down-a-cluster}

![manual-scale-entry-cn](/img/manual-scale-entry-cn.png)

在对话框中，您可以减少 CU 规格，但无法调整 CU 类型和云服务地域。 点击**扩缩容**按钮后，Zilliz Cloud 会自动检查您的数据量和 Collection 数量。只有同时满足以下两个条件时才能成功触发缩容：

- 当前数据量 < 缩容后 [CU 加载容量](./metrics-alerts-reference#cluster-metrics)的 80%。

- 当前 Collection 数量 < 缩容后 CU 中可创建的 [Collection 数量上限](./limits#collections)。

集群扩容所需时间取决于集群中的数据量大小。

<Admonition type="info" icon="📘" title="说明">

<p>如需将 CU 规格缩小至 8 CU 以下，请确保该集群 Replica 数量为 1。</p>

</Admonition>

### 弹性伸缩{#auto-scaling}

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>弹性伸缩功能仅适用于 Dedicated 集群。</p></li>
<li><p>Replica 数量超过 1 个集群不可使用弹性伸缩功能。</p></li>
</ul>

</Admonition>

弹性伸缩适用于业务变化较快，且不希望集群规格导致用户写入受限的场景。弹性伸缩可以帮您免去运维压力，减少因集群规格导致的对业务的影响。

启用此功能后，您可以在集群成功创建时设置弹性伸缩参数。

![configure_autoscaling_cn](/img/configure_autoscaling_cn.png)

在弹窗中，您可以设置：

- **最大 CU 规格**：集群自动扩缩时的最大 CU 规格。当 CU 规格小于 8 CU 时，CU 规格的增加步长为 2 CU，以 1、2、4、6、8 的顺序递增。当 CU 规格大于 8 CU 时，CU 规格的增加步长为 4 CU，以8、12、16、20、24、28、32... 的顺序递增。

    <Admonition type="info" icon="📘" title="说明">

    <p>目前，Zilliz Cloud 暂不支持自动缩容。</p>

    </Admonition>

- CU 加载容量阈值：Zilliz Cloud 会每隔 1 分钟检查[ CU 加载容量](./metrics-alerts-reference#cluster-metrics)指标。如果在过去 2 分钟内，每个指标采集点的值均超过设置的 CU 加载容量阈值（默认值为 70%） ，Zilliz Cloud 会自动进行扩容。

    <Admonition type="info" icon="📘" title="说明">

    <p>我们不推荐奖 CU 加载容量阈值设置得过高（超过 90%）。这是因为当数据插入速率较高时，集群可能无法及时完成自动扩容，会导致禁写。</p>

    </Admonition>

两次自动扩容之间有 10 分钟的冷却期。完成自动扩容所需时间取决于集群中的数据量。

<Admonition type="caution" icon="🚧" title="警告">

<p>自动扩容过程中，集群服务可能会有短暂抖动，但不会影响数据读写操作。但如果在自动扩容期间，CU 加载容量达到 100%，会触发禁写。</p>

</Admonition>

### 提升 QPS{#increase-qps}

如需提升 QPS 和系统可用性，请添加 Replica。更多详情，请参考[管理 Replica](./manage-replica)。

## 包年包月集群扩容{#annual-subscription-cluster-scaling}

包年包月集群仅支持手动扩容，不支持缩容及弹性伸缩。

目前，您只能通过 Zilliz Cloud Web 控制台进行集群扩容，暂时不支持通过 RESTful API 进行操作。

![VPQSwUkM7hVFtIbbahJcopfpngg](/img/VPQSwUkM7hVFtIbbahJcopfpngg.png)

上图展示了为包年包月集群扩容的主要流程和步骤。以下为具体操作说明。

### 步骤 1. 增加集群 CU 规格{#increase-cu-size}

1. 登录 Zilliz Cloud。前往目标集群的**集群详情**页。点击**扩容**。

    ![scale-annual-subscription-cluster-entrance-cn](/img/scale-annual-subscription-cluster-entrance-cn.png)

1. 选择集群 CU 规格。目前仅支持选择比当前更大的 CU 规格。

1. （可选）您可以选择是否在扩容的同时**延长集群有效期**。

1. 检查订单金额，点击**扩容**。如需了解集群升配与续订的费用计算规则，请参考[变更配置费用说明](./notice-on-config-changes)。

    ![scale-annual-subscription-cluster-cn](/img/scale-annual-subscription-cluster-cn.png)

1. 阅读并同意 [Zilliz Cloud 服务条款](https://zilliz.com.cn/cloud-service-terms)。

### 步骤 2. 支付订单{#pay-the-order}

完成步骤 1 后，Zilliz Cloud 将生成一份类型为**升配**的**待支付**订单。请检查订单内容并及时完成支付。

![pay-annual-subscription-scale-order-cn](/img/pay-annual-subscription-scale-order-cn.png)

<Admonition type="info" icon="📘" title="说明">

<p>如果您的组织现金余额不足，请先进行现金充值（对公转账）。详情请见<a href="./advance-pay">现金充值（对公转账）</a>。</p>
<p>充值成功后，您可以前往<strong>费用中心>订单</strong>页支付订单。详情请见<a href="./manage-order">管理订单</a>。</p>
<p>订单生成后 7 天内未完成支付，系统将自动取消订单。如仍需为包年包月集群扩容，请重新完成步骤 1 的操作并支付新订单。</p>

</Admonition>

### 步骤 3. 等待集群完成扩容{#wait-for-scaling-complete}

订单支付成功后，Zilliz Cloud 会开始为您的包年包月集群进行扩容，您将看到以下界面。

![annual-subscription-cluster-is-being-scaled-cn](/img/annual-subscription-cluster-is-being-scaled-cn.png)

集群扩容的过程大约需要 10 分钟，请您耐心等待。当集群状态变为**运行中**时，代表包年包月集群扩容成功。