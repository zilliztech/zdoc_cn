---
title: "集群扩缩容 | Cloud"
slug: /scale-cluster
sidebar_label: "集群扩缩容"
beta: FALSE
notebook: FALSE
description: "随着工作负载增长和数据写入量的增加，集群可能会达到容量上限。在这种情况下，读取操作仍可正常进行，但新的写入请求可能会失败。 | Cloud"
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

随着工作负载增长和数据写入量的增加，集群可能会达到容量上限。在这种情况下，读取操作仍可正常进行，但新的写入请求可能会失败。

为实现主动管理，您可以在监控页面查看 **CU 加载容量**，判断是否需要扩容。根据业务需求和访问模式，您可以上调 CU 规格以扩大集群容量，或在需求量减少时下调 CU 规格以降低成本。

本指南将介绍如何根据变化的工作负载调整集群规格。

<Admonition type="info" icon="📘" title="说明">

<p>如果您的目标是提升查询性能（QPS）或提高可用性，请增加 <a href="./manage-replica">Replica 数量</a>，而非调整 CU 规格。CU 规格仅影响存储能力和数据写入能力。</p>

</Admonition>

### Zilliz Cloud 提供的扩缩容方式{#scaling-options-in-zilliz-cloud}

Zilliz Cloud 提供多种方式帮助您完成集群容量扩缩容：

- 手动扩缩容：您可以随时手动调整 CU 规格，实现完全自主控制。适用于对工作负载模式有明确认知的场景。

- 动态自动扩缩容：系统会根据实时监控指标自动调整 CU 规格。适合负载波动较大、变化不可预测的场景，如一天中存在数据量高峰与低谷。

- 定时自动扩缩容：根据预设的时间计划自动调整 CU 规格。适用于具有周期性规律的工作负载，例如工作日访问量高、周末访问量低的业务模式。

### 注意事项{#considerations}

- 扩缩容功能仅适用于 Dedicated 集群。

- 动态自动扩缩容暂不支持自动缩容。

- 扩缩容过程中可能会出现轻微的服务抖动，完成时间取决于数据量大小。

### 手动扩缩容{#manual-scaling}

您可以通过 Zilliz Cloud 控制台或 RESTful API 手动扩展或缩减集群的 CU 规格。

以下是手动扩缩容的限制与注意事项：

- **扩容**

    - Dedicated 企业版集群：最多支持 256  CU
 如需更大规格，请[联系销售](http://zilliz.com.cn/contact-sales)。

    - **CU 规格 × Replica 数量**的乘积不得超过 256。

- **缩容**

    - 对于已设置多副本（Replica）的集群，CU 规格不得缩减到低于 8 CU。

    - 缩容请求仅在满足以下条件时才会成功：

        - 当前数据量 < 缩容后 [CU 加载容量](./metrics-alerts-reference#cluster-metrics)的 80%。

        - 当前 Collection 数量小于新 CU 规格所支持的最大 Collection 数。

#### 通过 Web 控制台{#via-web-console}

以下 Demo 展示了如何在 Zilliz Cloud Web 控制台中手动扩容或缩容集群。

#### 通过 RESTful API{#via-restful-api}

以下示例将现有集群扩展为 2 个 CU。详情请见[修改集群配置](/reference/restful/modify-cluster-v2)。

```bash
export TOKEN="YOUR_API_KEY"
export CLUSTER_ID="inxx-xxxxxxxxxxxxxxx"

curl --request POST \
--url "${BASE_URL}/v2/clusters/${CLUSTER_ID}/modify" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
-d '{
    "cuSize": 2
}'
```

以下为示例返回结果：

```bash
{
    "code": 0,
    "data": {
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
        "prompt": "successfully submitted. Cluster is being upgraded, which is expected to take several minutes. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK."
    }
}
```

### 弹性伸缩{#auto-scaling}

为减少运维负担并避免服务中断，您可以在 Zilliz Cloud 控制台中启用弹性伸缩功能。Zilliz Cloud 支持两种弹性伸缩的模式：**动态扩缩容**和**定时扩缩容**，您可以选择启用其中一种或同时启用两种。

以下是弹性伸缩的限制与注意事项：

- 当前动态扩缩容暂不支持自动缩容。

- 任意两次自动扩缩容事件之间需间隔至少 **10 分钟**冷却时间。

#### 动态扩缩容{#dynamic-auto-scaling}

以下 Demo 展示了如何在 Zilliz Cloud 控制台中配置动态扩缩容。

**CU 加载容量阈值**：如果在过去 2 分钟内的所有采样点，CU 加载容量均超过该阈值（默认 70%）时，将触发自动扩容。

我们不推荐将 CU 加载容量阈值设置得过高（超过 90%）。这是因为当数据插入速率较高时，集群可能无法及时完成自动扩容，会导致禁写。

#### 定时扩缩容{#scheduled-auto-scaling}

以下 Demo 展示了如何在 Zilliz Cloud 控制台中配置定时扩缩容。

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