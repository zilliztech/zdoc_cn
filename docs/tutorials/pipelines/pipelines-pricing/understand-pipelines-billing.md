---
title: "了解定价与账单 | Cloud"
slug: /understand-pipelines-billing
sidebar_label: "了解定价与账单"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud Pipelines 采用按量计费的定价模型。 您仅需根据 Ingestion 和 Search Pipeline 的模型用量付费。 | Cloud"
type: origin
token: Q2YawM0ZCiLhOpkYTczcwKUJnBh
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 定价
  - 账单

---

import Admonition from '@theme/Admonition';


# 了解定价与账单

Zilliz Cloud Pipelines 采用按量计费的[定价](https://zilliz.com.cn/pricing)模型。 您仅需根据 Ingestion 和 Search Pipeline 的模型用量付费。

<Admonition type="info" icon="📘" title="说明">

<p>Zilliz Cloud Pipelines 服务正处在逐步下线中，将于 2025 年第二季度末停止服务，被 “Data In, Data Out” 的新功能取代。该功能旨在简化 Milvus 和 Zilliz Cloud 中的向量化流程。自 2025 年 1 月 10 日起，Zilliz Cloud Pipelines 将不再接受新用户注册。现有用户可在每月 100 元人民币免费试用额度内继续使用服务直至下线日期。该服务不提供 SLA 支持。建议您使用模型提供商的Embedding API 或开源模型生成向量。</p>

</Admonition>

## Pipelines 定价{#pipelines-pricing}

如需了解使用每种 Embedding 和 Reranker 模型的具体费用，请参考[定价方案](https://zilliz.com.cn/pricing)。

目前，Zilliz Cloud Pipelines 提供免费 Quota。但同时，Zilliz Cloud Pipelines 对每个组织的用量做出了[限制](./limits#pipelines-usage)。每个组织每月可使用 ¥140 的 Pipelines 用量。如需提高额度，请[联系销售](https://zilliz.com.cn/contact-sales)或[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

## 查看账单{#view-costs}

Zilliz Cloud 向量数据库账单中整合了 Pipelines 账单信息。因此，如需了解使用 Pipelines 过程中产生的用量和费用，请点击 Zilliz Cloud 页面顶部或左侧导航栏中的**账单**。切换至**用量**后，您可以在**用量明细**中查看 Pipelines 使用情况和相关费用。

您也可以点击**历史账单**，了解每月 Pipelines 使用情况。

## 查看 Pipelines 费用和用量{#view-costs-and-usage}

您可以在 Zilliz Cloud 账单页面查看 Pipelines 费用和用量。更多详情，请参考[查看账单信息与支付方式](./view-invoice)。

- **查看费用**

    ![pipelines-cost-cn](/img/pipelines-cost-cn.png)

- **查看用量**

    ![pipelines-usage-cn](/img/pipelines-usage-cn.png)

