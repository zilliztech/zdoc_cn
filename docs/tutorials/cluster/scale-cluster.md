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

为实现主动管理，您可以在监控页面查看 **CU 加载容量**，判断是否需要扩容。根据业务需求和访问模式，您可以上调 Query CU 数量以扩大集群容量，或在需求量减少时下调 Query CU 数量以降低成本。

本指南将介绍如何根据变化的工作负载调整集群 Query CU 数量。

<Admonition type="info" icon="📘" title="说明">

<p>对于 1-8 CU 的集群，请直接进行集群扩缩容。对于超过 8 CU 的集群，请增加 <a href="./manage-replica">Replica 数量</a>。</p>

</Admonition>

## 按量计费集群扩缩容{#usage-based-cluster-scaling}

### Zilliz Cloud 提供的扩缩容方式{#scaling-options-in-zilliz-cloud}

Zilliz Cloud 提供多种方式帮助您完成集群容量扩缩容：

- [手动](./scale-cluster#manual-scaling)：您可以即时完成 Query CU 数量的调整。适用于对工作负载模式有明确认知的场景。

    - 选择手动扩容方式后，您还可以进一步开启**定时扩缩容，**根据预设的时间调度计划按时调整 Query CU 数量。定时扩缩容适用于具有周期性规律的工作负载，例如工作日访问量高、周末访问量低的业务模式。

- [动态](./scale-cluster#dynamic-scaling)：系统会根据实时监控指标自动调整 Query CU 数量。适合负载波动较大、变化不可预测的场景，如一天中存在数据量高峰与低谷。

### 注意事项{#considerations}

- **集群版本**：仅 Dedicated 企业版集群支持此功能。

- **扩缩容过程中**：集群状态将变为“修改中”，在此期间无法执行任何操作。如触发多个扩缩容任务，将按触发时间顺序依次处理。扩缩容任务完成时间取决于数据量。

- **性能影响**：扩缩容过程中可能会出现轻微的服务抖动。

- **备份限制**：动态和定时扩缩容设置不会包含在备份中。恢复集群后需要重新手动配置。

### 手动扩缩容{#manual-scaling}

您可以通过 Zilliz Cloud 控制台或 RESTful API 手动扩展或缩减集群的 Query CU 数量。注意：定时扩缩容仅支持通过 Web 控制台设置。

以下是手动扩缩容的限制与注意事项：

- **扩容**

    - Dedicated 企业版集群：最多支持 256  Query CU

    - **Query CU 数量 × Replica 数量**的乘积不得超过 256。

    如需更大 Query CU 数量，请[联系销售](http://zilliz.com.cn/contact-sales)。

- **缩容**

    - 对于已设置多副本（Replica）的集群，Query CU 数量不得缩减到低于 8 CU。

    - 缩容请求仅在满足以下条件时才会成功：

        - 当前数据量 &lt; 缩容后 [CU 加载容量](./metrics-alerts-reference#cluster-metrics)的 80%。

        - 当前 Collection 和 Partition 数量小于新 Query CU 数量所支持的最大 Collection 和 Partition 数。

#### 通过 Web 控制台{#via-web-console}

以下 Demo 展示了如何在 Zilliz Cloud Web 控制台中手动扩容或缩容集群。

#### 通过 RESTful API{#via-restful-api}

以下示例将现有集群扩展为 2  CU。详情请见[修改集群配置](/reference/restful/modify-cluster-v2)。

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

### 动态扩缩容{#dynamic-scaling}

Zilliz Cloud 支持动态扩缩容。启用后，系统会基于实时 CU 加载容量指标自动调整 Query CU 资源，确保高效处理工作负载且不中断服务。

#### 触发条件{#trigger-conditions}

- **自动扩容**：CU 加载容量连续 5 分钟超过 85% 时触发。

- **自动缩容**：CU 加载容量连续 30 分钟低于 70% 时触发。

- 连续两次扩容事件之间的冷却时间为 10 分钟，连续两次缩容事件之间的冷却时间为 30 分钟。

#### 扩缩容目标值计算{#scaling-size-calculation}

以下公式说明了 Zilliz Cloud 在动态扩缩容事件中如何计算目标 Query CU 数量：

```plaintext
目标 Query CU 数量 = 当前 Query CU 数量 × (当前指标值 / 目标指标值)
```

<table>
    <tr>
        <th><p>变量名称</p></th>
        <th><p>描述</p></th>
    </tr>
    <tr>
        <td><p>目标 Query CU 数量</p></td>
        <td><p>系统计划将集群扩缩容至的新 CU 数量</p></td>
    </tr>
    <tr>
        <td><p>当前 Query CU 数量</p></td>
        <td><p>集群当前的 Query CU 数量</p></td>
    </tr>
    <tr>
        <td><p>当前指标值</p></td>
        <td><p>当前测得的 CU 加载容量指标值</p></td>
    </tr>
    <tr>
        <td><p>目标指标值</p></td>
        <td><p>扩缩容后期望达到的 CU 加载容量值，固定为 70</p></td>
    </tr>
</table>

**示例**
 假设已启用动态扩缩容，且满足以下条件：

- **当前 Query CU 数量**：2 CU

- **集群 CU 加载容量**：连续 5 分钟超过 90%

将触发动态扩容事件。目标 Query CU 数量计算如下：

```plaintext
2 × (90 / 70) ≈ 2.57 CU
```

该值向上取整到下一个 CU 数量，即扩容至 4 CU。

#### 操作步骤{#procedures}

以下 Demo 展示了如何在 Zilliz Cloud 控制台中配置动态扩缩容。

在设置动态扩缩容时，您可以配置以下参数：

- **最小 Query CU 数量**：默认为当前集群的 Query CU 数量，只能设置为小于或等于当前值的数值。

- **最大 Query CU 数量**：默认为当前集群的 Query CU 数量的 4 倍。

## 包年包月集群扩容{#annual-subscription-cluster-scaling}

包年包月集群仅支持手动扩容，不支持缩容及弹性伸缩。

目前，您只能通过 Zilliz Cloud Web 控制台进行集群扩容，暂时不支持通过 RESTful API 进行操作。

![VPQSwUkM7hVFtIbbahJcopfpngg](/img/VPQSwUkM7hVFtIbbahJcopfpngg.png)

上图展示了为包年包月集群扩容的主要流程和步骤。以下为具体操作说明。

### 步骤 1. 增加集群 CU 规格{#increase-cu-size}

1. 登录 Zilliz Cloud。前往目标集群的**集群详情**页。点击**扩容**。

    ![scale-annual-subscription-cluster-entrance-cn](/img/scale-annual-subscription-cluster-entrance-cn.png)

1. 选择集群 Query CU 数量。目前仅支持选择比当前更大的数值。

1. （可选）您可以选择是否在扩容的同时**延长集群有效期**。

1. 检查订单金额，点击**扩容**。如需了解集群升配与续订的费用计算规则，请参考[变更配置费用说明](./notice-on-config-changes)。

    ![scale-annual-subscription-cluster-cn](/img/scale-annual-subscription-cluster-cn.png)

1. 阅读并同意 [Zilliz Cloud 服务条款](https://zilliz.com.cn/cloud-service-terms)。

### 步骤 2. 支付订单{#pay-the-order}

完成步骤 1 后，Zilliz Cloud 将生成一份类型为**升配**的**待支付**订单。请检查订单内容并及时完成支付。

![pay-annual-subscription-scale-order-cn](/img/pay-annual-subscription-scale-order-cn.png)

<Admonition type="info" icon="📘" title="说明">

<p>如果您的组织现金余额不足，请先进行现金充值（对公转账）。详情请见<a href="./advance-pay">现金充值（对公转账）</a>。</p>
<p>充值成功后，您可以前往<strong>费用中心&gt;订单</strong>页支付订单。详情请见<a href="./manage-order">管理订单</a>。</p>
<p>订单生成后 7 天内未完成支付，系统将自动取消订单。如仍需为包年包月集群扩容，请重新完成步骤 1 的操作并支付新订单。</p>

</Admonition>

### 步骤 3. 等待集群完成扩容{#wait-for-scaling-complete}

订单支付成功后，Zilliz Cloud 会开始为您的包年包月集群进行扩容，您将看到以下界面。

![annual-subscription-cluster-is-being-scaled-cn](/img/annual-subscription-cluster-is-being-scaled-cn.png)

集群扩容的过程大约需要 10 分钟，请您耐心等待。当集群状态变为**运行中**时，代表包年包月集群扩容成功。

## 常见问题{#faq}

1. **我应该选择哪种扩缩容方式？**

    以下是帮助您快速选择合适扩缩容方式的建议：

![DIlKwYWaLhUfKRbeI93coBZTnmb](/img/DIlKwYWaLhUfKRbeI93coBZTnmb.png)

    - 如果您非常清楚工作负载模式，例如每天的峰值时间固定，**手动**扩缩容和**定时**扩缩容是最适合您的选择。

    - 如果您的工作负载不可预测，并且波动较大，推荐使用**动态**扩缩容。它会在您设定的范围内自动调整集群 Query CU，帮助在保持性能的同时优化成本。

1. **什么情况下应该调整 Replica 数量，什么时候应该进行集群 Query CU 扩缩容？**

    - 增加 Replica 数量适用于以下场景：

        - 需要处理高 QPS（每秒查询数）并保证高可用性。

        - 工作负载包含大量并发搜索或查询请求，希望提升吞吐量

        **提示**：每个 Replica 都是 Query CU 资源的独立拷贝，负责处理部分查询请求。

    - 增加 Query CU 适用于以下场景：

        - 需要处理大型数据集或支持更多 Collection。

        - CPU 或内存使用率较高。

        **提示**：增加 Query CU 可为每个 query node 提供更多计算资源和容量。

    - **建议**：对于 1-8 CU 的集群，请直接进行集群扩缩容。对于超过 8 CU 的集群，请增加 Replica 数量。

1. **集群缩容时有哪些限制？**

    - 启用了 Replica 的集群，缩容后 Query CU 数量不得少于 8。

    - 缩容请求仅在同时满足以下两个条件时才会成功：

        - 当前数据量小于新 Query CU 容量的 80%；

        - 当前的 Collection 和 Partition 数量在新 Query CU 所支持的上限范围内。

