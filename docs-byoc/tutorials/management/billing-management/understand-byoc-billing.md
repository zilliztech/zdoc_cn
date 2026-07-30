---
title: "BYOC 计费模式 | BYOC"
slug: /understand-byoc-billing
sidebar_label: "BYOC 计费模式"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "本指南介绍 Zilliz Cloud 中 BYOC 账单的工作方式，包括合同中约定的 vCPU 用量、超出部分的按需 vCPU 用量、账单展示，以及超出 Committed 部分后的用量控制。 | BYOC"
type: origin
token: HnUxw64aKibN0RkFBEsceIi2noL
sidebar_position: 1
displayed_sidebar: default

---

import Admonition from '@theme/Admonition';


# 了解 BYOC 账单

本指南介绍 Zilliz Cloud 中 BYOC 账单的工作方式，包括合同中约定的 vCPU 用量、超出部分的按需 vCPU 用量、账单展示，以及超出 Committed 部分后的用量控制。

对于 BYOC 部署，Zilliz Cloud 采用基于合同的计费模式。您的组织会在合同中约定一个许可 vCPU 用量。如果启用了按需用量，超出合同约定用量的部分可以按 vCPU-hour 用量单独统计并计费。

## 计费模式\{#billing-model}

BYOC 计费由两部分组成：

| 计费组成 | 说明 |
| --- | --- |
| 合同约定的 vCPU （Committed vCPU） | 通过合同购买的 vCPU 用量。这是您的 BYOC 组织可使用的基准许可用量。 |
| 按需 vCPU （On-demand vCPU） | 超出承诺 vCPU 用量的用量。如果启用了按需用量，Zilliz Cloud 会以 vCPU-hour 为单位统计超出的部分，并按月展示费用。 |

一般而言：

```plaintext
BYOC 总费用 = Committed vCPU 费用 + On-demand vCPU 费用
```

<Admonition type="info" icon="📘" title="注意">

[账单](./view-invoice)用于汇总超出承诺部分的用量和预估费用。实际付款和结算条款可能取决于您的合同。如有任何问题，请联系您的客户经理团队。

</Admonition>

## Committed vCPU\{#committed-vcpu}

Committed vCPU 是 BYOC 合同中约定的 vCPU 用量。

Committed vCPU 的价格基于合同，可能采用阶梯定价。更高的 Committed vCPU用量可能对应更低的单价。

如需了解具体价格，请参考您的合同或联系您的客户经理团队。

## 按需 vCPU\{#on-demand-vcpu}

您可以联系客户经理团队，为 BYOC 部署启用按需用量。如果已启用按需用量，且您的实际 BYOC 用量超过了承诺 vCPU 用量，Zilliz Cloud 会将超出的部分记录为按需 vCPU 用量。

按需用量以 `vCPU-hour` 为单位计量。

以下公式说明如何计算按需小时单价：

```plaintext
按需小时单价 = 适用的承诺 vCPU 单价 / (365 x 24)
```

适用单价基于您的承诺 vCPU 用量所解锁的价格阶梯或合同条款。超出的用量会按计费周期累计并展示。

### 示例\{#example}

假设您适用的承诺 vCPU 单价为 `$900 / vCPU /年`。按需小时单价计算如下：

```plaintext
$900 / (365 x 24) ≈ $0.1027 / vCPU-hour
```

如果在一个计费周期内，您的用量比承诺用量超出 `100 vCPU-hours`，则按需 vCPU 用量的预估费用为：

```plaintext
100 x $0.1027 = $10.27
```

## 用量超出合同约定时\{#when-licensed-capacity-is-reached}

如果当前 BYOC 用量达到许可用量，且未启用按需用量，Zilliz Cloud 可能会阻止会进一步增加用量的操作。

| 操作 | 行为 |
| --- | --- |
| 创建集群 | 可能会阻止创建新集群。 |
| 扩容 Query CU | 可能会阻止增加 Query CU。<br/>也可能会阻止增加自动扩缩容的最小或最大 Query CU。 |
| 扩容副本数 | 可能会阻止增加副本数。<br/>也可能会阻止增加自动扩缩容的最小或最大副本数。 |

如需继续扩展资源，请联系客户经理团队，根据合同增加承诺用量或启用按需用量。

## 账单\{#invoices}

如果启用了按需用量，且您的 BYOC 用量超过了承诺用量，Zilliz Cloud 会针对超出用量展示月度账单记录。您可以通过[支持的付款方式](./payment-billing#payment-methods)支付账单。

对于 BYOC 按需用量，账期可能因合同条款而异。请参考您的合同，了解具体的账期和付款方式。

有关管理账单的详细信息，请参阅[了解账单](./view-invoice)。

<Admonition type="info" icon="📘" title="注意">

如果账单逾期，增加资源用量的操作可能会被阻止，包括创建集群、增加 Query CU 或副本数，以及启用或使用自动扩缩容。

</Admonition>

## 用量页面\{#usage-page}

**用量**页面可帮助您对照承诺用量查看 BYOC 用量。

启用按需用量后，该页面可以按 `vCPU-hour` 展示每日超额用量。承诺部分会显示为基准用量，只有超出承诺的用量才会计入按需用量。

您可以使用该页面了解超额用量发生的时间、哪些项目或区域产生了超额用量，以及超出承诺用量的用量规模。

有关详细信息，请参阅[分析成本](./analyze-cost)。

## 最佳实践\{#best-practices}

- 根据预期的基准生产用量选择承诺 vCPU 用量。

- 如果您的工作负载可能偶尔超过承诺用量，请启用按需用量。

- 定期查看用量页面，识别反复出现的超额用量模式。

- 如果超额用量变得频繁或可预测，请增加承诺用量。

- 在进行大规模扩容之前，确认您的许可用量和按需设置是否能够支持目标配置。

