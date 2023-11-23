---
slug: /docs/pricing-calculator
beta: FALSE
notebook: FALSE
sidebar_position: 4
---

import Admonition from '@theme/Admonition';


# 价格计算器

[Zilliz Cloud 价格计算器](https://zilliz.com.cn/pricing)可以帮助您了解 Zilliz Cloud 定价策略，自助估算价格，挑选最适合的解决方案。本指南将介绍如何使用该计算器，以获得精准的成本估算。

## 数据组件{#data-components}

### 向量数量{#number-of-entities}

- 定义：存储在 Zilliz Cloud 集群中的可处理的数据对象。

- 调整范围：从 0 到 100,000,000。

- 测量：以 100 万个为单位进行计量，以确保准确性和有效管理。

### 向量维度{#vector-dimension}

- 功能：向量中所包含的元素个数，也就是向量的长度。

- 调整范围：从 32 到 32,768 维。

### 标量字段{#scalar-fields}

- 功能：添加数据的标量字段，以获得更精确的价格估算。

- 详情：为主键和其他字段选择数据类型。

## 定价变量{#pricing-variables}

### CU 类型{#cu-type}

- 性能型：适用于性能关键场景，具有高吞吐量和低延迟。

- 容量型：适合大数据量，存储容量是性能优化 CU 的五倍。

- 经济型：容量与容量优化 CU 相似，但更具成本效益，性能略有降低。

有关更多信息，请参见[选择合适的 CU 类型](./cu-types-explained)。

### 云服务提供商和地域{#cloud-provider}

目前，Zilliz Cloud 仅支持阿里云，部署地域仅支持华东1（杭州）。

有关更多信息，请参见[云服务提供商和地域](./cloud-providers-and-regions)。

### Zilliz Cloud 版本{#pricing-plan}

- **企业版**：适合大型企业或组织，是构建向量数据平台首选方案，提供高可用、数据安全、专家技术支持。

有关更多信息，请参见[Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)。

## 注意事项{#considerations}

如需了解专有部署定价，请[联系销售](https://zilliz.com.cn/contact-sales)。

## 文档推荐{#related-topics}

- [Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)

- [选择合适的 CU 类型](./cu-types-explained)

- [云服务提供商和地域](./cloud-providers-and-regions)

