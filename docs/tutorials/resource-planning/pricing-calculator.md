---
slug: /pricing-calculator
beta: FALSE
notebook: FALSE
type: origin
token: Jxqfwnd80i8ibIkRhEKcnkK6nzd
sidebar_position: 4
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 价格
  - 计算器

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

### Zilliz Cloud 版本{#pricing-plan}

- **Serverless 版**：适用于查询量不固定或不频繁的 Serverless 应用，无需进行复杂配置即可自动根据业务调整计算资源。

- **Dedicated 版**：适用于生产环境，提供企业级数据安全与合规、监控指标、技术支持 SLA 等，支持高级配置。

更多详情，请参见[Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)。

### CU 类型{#cu-type}

- 性能型：适用于性能关键场景，具有高吞吐量和低延迟。

- 容量型：适合大数据量，存储容量是性能优化 CU 的五倍。

更多详情，请参见[选择合适的 CU 类型](./cu-types-explained)。

### 云服务提供商{#cloud-provider}

- 阿里云

- 腾讯云

更多详情，请参见[云服务提供商和地域](./cloud-providers-and-regions)。

### 云服务地域{#cloud-region}

Zilliz Cloud 支持多个云服务地域以满足不同的需求。

更多详情，请参见[云服务提供商和地域](./cloud-providers-and-regions)。

## 计价单位{#pricing-unit}

Serverless 版集群根据 vCU 用量进行计费。vCU 是用于衡量读取（如 search、query）和写入操作（如 insert、upsert、delete）所消耗资源的基本单位。Zilliz Cloud 将写入或读取的数据量（单位：GB）转换为 vCU。  

Dedicated 版集群根据 CU 用量进行计费。CU 是指用于提供向量检索、分析服务的一组硬件资源。可以将 CU 视为一个物理查询节点。

### 注意事项{#considerations}

对于 Dedicated 版本，当 CU 规格小于 8 时，CU 增加梯度为 2 CU。换言之，CU 规格将按照 1、2、4、6、8 的序列递增。当 CU 规格大于 8 时，CU 增加梯度为 4 CU。CU 规格梯度为：8、12、16、20、24、28、32、...。 

计算器可预估的最大集群 CU 规格为 256。如果您的需求超过这个限制，请[联系](https://zilliz.com/contact-sales)我们获取定价明细。

## 文档推荐{#related-topics}

- [Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)

- [选择合适的 CU 类型](./cu-types-explained)

- [云服务提供商和地域](./cloud-providers-and-regions)

