---
slug: /faq-resource-planning
beta: null
notebook: null
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 7
---

# FAQ：资源规划

本文列举了在 Zilliz Cloud 规划资源和使用成本时可能遇到的常见问题及对应解决方法。

## 目录

- [什么是计算单元（Compute Unit, CU）?](#what-is-a-compute-unit-cu)
- [如何查看订阅的 Zilliz Cloud 版本？](#how-can-i-know-which-plan-i-am-on)
- [性能型 CU、容量型 CU 和经济型 CU 之间有什么区别？](#whats-the-difference-between-performance-optimized-cu-capacity-optimized-cu-and-cost-optimized-cu)
- [我的数据需要使用多少 CU？](#how-many-cus-do-i-need-for-a-given-collection)
- [如何避免未使用的集群产生费用？](#how-can-i-avoid-expenses-on-unused-clusters)
- [如何估算使用 Zilliz Cloud 的成本？](#how-can-i-estimate-the-cost-of-using-zilliz-cloud)
- [预算有限的情况下，如何在使用 Zilliz Cloud 服务时节省成本？](#how-can-i-save-costs-on-using-zilliz-cloud-if-i-have-a-limited-budget)

## 问答




### 什么是计算单元（Compute Unit, CU）?{#what-is-a-compute-unit-cu}

计算单元（CU）是指用于提供向量检索、分析服务的一组硬件资源。可以将 CU 视为一个物理查询节点。

### 如何查看订阅的 Zilliz Cloud 版本？{#how-can-i-know-which-plan-i-am-on}

如需查看版本，请先选择项目，再选择集群。在**集群详情**下，您可以查看订阅的版本。

![faq_plan_detail](/img/faq_plan_detail.png)

### 性能型 CU、容量型 CU 和经济型 CU 之间有什么区别？{#whats-the-difference-between-performance-optimized-cu-capacity-optimized-cu-and-cost-optimized-cu}

性能型 CU 适用于需要低延迟和高吞吐量的向量相似性检索场景。 

容量型 CU 相比性能型 CU 能够存储多 5 倍的数据，适用于需要大量存储空间的场景。 

经济型 CU 可支持的数据规模与容量型 CU 一致，但价格更低，适用于追求高性价比或预算敏感的场景。

### 我的数据需要使用多少 CU？{#how-many-cus-do-i-need-for-a-given-collection}

单个性能型 CU 可容纳约 500 万个 128 维向量或 100 万个 768 维向量。

单个容量型 CU 可容纳约 2500 万个 128 维向量或 500 万个 768 维向量。

单个经济型 CU 可容纳约 2500 万个 128 维向量或 500 万个768 维向量。

由于您的 Collection Schema 可能与上述指南中的不同，我们建议您根据实际数据测试不同的 CU 类型。

### 如何避免未使用的集群产生费用？{#how-can-i-avoid-expenses-on-unused-clusters}

建议您挂起未使用的集群以节省成本。您可随时按需恢复集群。

### 如何估算使用 Zilliz Cloud 的成本？{#how-can-i-estimate-the-cost-of-using-zilliz-cloud}

请使用[价格计算器](https://zilliz.com.cn/pricing#calculator)估算使用成本。

### 预算有限的情况下，如何在使用 Zilliz Cloud 服务时节省成本？{#how-can-i-save-costs-on-using-zilliz-cloud-if-i-have-a-limited-budget}

如果您的预算有限，我们推荐使用经济型 CU。该类型的 CU 容量与容量型 CU 相同，但价格更低。更多详情，请阅读[选择合适的 CU 类型](./cu-types-explained) 。
