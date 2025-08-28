---
title: "FAQ：资源规划 | CLOUD"
slug: /faq-resource-planning
sidebar_label: "FAQ：资源规划"
beta: FALSE
notebook: FALSE
description: " | CLOUD"
type: origin
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 7

---

# FAQ：资源规划

本文列举了在 Zilliz Cloud 规划资源和使用成本时可能遇到的常见问题及对应解决方法。

## 目录

- [什么是计算单元（Compute Unit, CU）?](#what-is-a-compute-unit-cu)
- [什么是 vCU？](#what-is-a-vCU-how-does-it-get-calculated)
- [如何查看订阅的 Zilliz Cloud 版本？](#how-can-i-know-which-plan-i-am-on)
- [我应该选择哪种 CU 类型？](#which-type-of-cu-should-i-pick)
- [我的数据需要使用多少 CU？](#how-many-cus-do-i-need-for-a-given-collection)
- [如何避免未使用的集群产生费用？](#how-can-i-avoid-expenses-on-unused-clusters)
- [如何估算使用 Zilliz Cloud 的成本？](#how-can-i-estimate-the-cost-of-using-zilliz-cloud)

## 问答




### 什么是计算单元（Compute Unit, CU）? \{#what-is-a-compute-unit-cu}

计算单元（CU）是指用于提供向量检索、分析服务的一组硬件资源。可以将 CU 视为一个物理查询节点。

### 什么是 vCU？ \{#what-is-a-vCU-how-does-it-get-calculated}

vCU 是用于衡量读取（如 search、query）和写入操作（如 insert、upsert、delete）所消耗资源的基本单位。读取和写入的数据量单位会由 GB 折算为 vCU。详情请参考[了解费用](./understand-cost#serverless-clusters)。

### 如何查看订阅的 Zilliz Cloud 版本？ \{#how-can-i-know-which-plan-i-am-on}

如需查看版本，请先选择项目，再选择集群。在**集群信息**下，您可以查看订阅的版本。

![faq_plan_detail](/img/faq_plan_detail.png)

### 我应该选择哪种 CU 类型？ \{#which-type-of-cu-should-i-pick}

- 如果您的应用需要低延迟和高吞吐量，建议选择性能型 CU。

- 如果您需要存储大量数据，但对吞吐量和延迟的要求较低，建议选择容量型 CU。

- 如果您需要存储海量数据且追求性价比、对延时要求较低，建议选择存储扩展型 CU。如需使用存储扩展型 CU，[请联系销售](https://zilliz.com.cn/contact-sales)。

### 我的数据需要使用多少 CU？ \{#how-many-cus-do-i-need-for-a-given-collection}

- 性能型 CU： 以 768 维向量为基准估计，可支持 150 万个向量（不包含标量字段）。

- 容量型 CU： 以 768 维向量为基准估计，可支持 500 万个向量（不包含标量字段）。

- 存储扩展型 CU： 以 768 维向量为基准估计，可支持 2000 万个向量（不包含标量字段）。

以上数据针对仅包含主键的向量数据。如果您的数据中含有其他标量字段，如 ID 或 label，可能需要使用更多 CU。我们建议进行测试以准确评估数据实际需要使用的 CU 规格。

### 如何避免未使用的集群产生费用？ \{#how-can-i-avoid-expenses-on-unused-clusters}

建议您挂起未使用的集群以节省成本。您可随时按需恢复集群。

### 如何估算使用 Zilliz Cloud 的成本？ \{#how-can-i-estimate-the-cost-of-using-zilliz-cloud}

请使用[价格计算器](https://zilliz.com.cn/pricing#calculator)估算使用成本。
