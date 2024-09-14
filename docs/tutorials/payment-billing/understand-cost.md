---
title: "了解费用 | Cloud"
slug: /understand-cost
sidebar_label: "了解费用"
beta: FALSE
notebook: FALSE
description: "## Dedicated 集群{#dedicated-clusters} | Cloud"
type: origin
token: D9bww8M3WigQEekiljdcYKJCnqc
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 费用

---

import Admonition from '@theme/Admonition';


# 了解费用

## Dedicated 集群{#dedicated-clusters}

与 Serverless 集群不同，Dedicated 集群提供了高级配置选项。

Zilliz Cloud 使用 CU 来衡量 Dedicated 集群消耗的资源。此外，Zilliz Cloud 还将针对数据存储收取费用。

### CU 费用{#cu-costs}

CU 是用于并行处理数据的基本资源单位。Zilliz Cloud 提供两种类型的 CU，每种类型包含不同的 CPU、内存和存储资源组合。更多详情，请参考[选择合适的 CU 类型](./cu-types-explained)。

Zilliz Cloud 根据您订阅的版本、CU 规格、Replica 数量以及集群运行时间来计算 CU 成本。

### 存储费用{#storage}

Dedicated 集群存储原始数据，包括标量和向量字段，以及索引文件。这些索引文件用于优化搜索性能。Dedicated 集群的数据存储定价与 Serverless 集群不同。

更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

## Serverless 集群{#serverless-clusters}

Serverless 集群可按需付费。轻便的方案可以满足追去高弹性的场景需求。

在计算 Serverless 集群的使用成本时，Zilliz Cloud 使用 vCU 来衡量读写操作消耗的资源。一百万个 vCU 的费用为 ¥21.00。此外，Zilliz Cloud 还将针对数据存储收取费用。

更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

### 读取费用{#read-costs}

读取费用针对 [search 和 query](./search-query-get) 操作消耗的资源收费。Zilliz Cloud 根据处理请求时扫描的数据大小来计算费用。扫描数据量越小，费用越低。读取结果的大小也会影响 vCU 的用量。

为降低读取成本，建议您[使用 Partition key](./use-partition-key)来减少每个读取请求扫描的数据量。当您在 search 或 query 请求中使用 Paritition key 时，Zilliz Cloud 将过滤 Partition key，并根据过滤出的数据量来计算费用。

### 写入费用{#write-costs}

写入费用针对  [insert、upsert 和 delete](./insert-update-delete) 操作消耗的资源收费。下表罗列了 Zilliz Cloud 如何计算这些操作的 vCU 用量。

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>vCU 用量</strong></p></th>
   </tr>
   <tr>
     <td><p>Insert</p></td>
     <td><p>基于插入的数据大小计算 vCU 用量</p></td>
   </tr>
   <tr>
     <td><p>Upsert</p></td>
     <td><p>基于更新的数据大小和 Entity 数量计算 vCU 用量</p></td>
   </tr>
   <tr>
     <td><p>Delete</p></td>
     <td><p>基于删除的 Entity 数量计算 vCU 用量</p></td>
   </tr>
</table>

关于数据大小，Zilliz Cloud 考虑了多个因素，包括数据行数、向量字段的维度、标量字段的数量以及标量字段的数据类型。

### 存储费用{#storage}

Serverless 集群存储原始数据，包括标量和向量字段，以及索引文件。这些索引文件用于优化搜索性能。Serverless 集群的数据存储定价与 Dedicated 集群不同。

更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

## 增值服务{#value-added-services}

Zilliz Cloud 还提供更多增值服务，如数据备份。

### 备份费用{#backup-costs}

使用 Zilliz Cloud 备份仅需按量付费。Zilliz Cloud 将以 GB-月为单位，对备份进行计费。GB-月是一种基于备份保留时间计算备份所使用的存储用量的计量单位。1 GB-月代表备份大小为 1 GB，且占据存储 1 个月。

以阿里云集群为例，创建一个 20 GB 的备份，并保存 45 天将产生的费用为 ¥0.50 × 20 × 1.5 = ¥15.00。

恢复备份不会产生任何费用。

更多详情，请参阅 [Zilliz Cloud 定价](https://zilliz.com.cn/pricing)。

### Pipelines 费用{#pipelines-costs}

Zilliz Cloud Pipelines 的一站式 API 服务涵盖数据导入、向量化、检索和重排（Rerank）等多种功能，助力构建高效的搜索应用。Pipelines 费用由使用的模型类型和用量决定。更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

