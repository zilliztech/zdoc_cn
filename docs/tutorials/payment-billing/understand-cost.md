---
slug: /understand-cost
beta: FALSE
notebook: FALSE
type: origin
token: D9bww8M3WigQEekiljdcYKJCnqc
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 了解费用

## Serverless 集群

Serverless 集群可按需付费。轻便的方案可以满足追去高弹性的场景需求。

在计算 Serverless 集群的使用成本时，Zilliz Cloud 使用 vCU 来衡量读写操作消耗的资源。一百万个 vCU 的费用为 ¥21.00。此外，Zilliz Cloud 还将针对数据存储收取费用。

更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

### 读取费用

读取费用针对 [search 和 query](./search-query-get) 操作消耗的资源收费。Zilliz Cloud 根据处理请求时扫描的数据大小来计算费用。扫描数据量越小，费用越低。读取结果的大小也会影响 vCU 的用量。

为降低读取成本，建议您[使用 Partition key](./use-partition-key)来减少每个读取请求扫描的数据量。当您在 search 或 query 请求中使用 Paritition key 时，Zilliz Cloud 将过滤 Partition key，并根据过滤出的数据量来计算费用。

### 写入费用

写入费用针对  [insert、upsert 和 delete](./insert-update-delete) 操作消耗的资源收费。下表罗列了 Zilliz Cloud 如何计算这些操作的 vCU 用量。

<table>
   <tr>
     <th><p><strong>Insert</strong></p></th>
     <th><p>基于插入的数据大小计算 vCU 用量</p></th>
   </tr>
   <tr>
     <td><p><strong>Upsert</strong></p></td>
     <td><p>基于更新的数据大小和 Entity 数量计算 vCU 用量</p></td>
   </tr>
   <tr>
     <td><p><strong>Delete</strong></p></td>
     <td><p>基于删除的 Entity 数量计算 vCU 用量</p></td>
   </tr>
</table>

关于数据大小，Zilliz Cloud 考虑了多个因素，包括数据行数、向量字段的维度、标量字段的数量以及标量字段的数据类型。

### 存储费用

Serverless 集群存储原始数据，包括标量和向量字段，以及索引文件。这些索引文件用于优化搜索性能。Serverless 集群的数据存储定价与 Dedicated 集群不同。

更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

## Dedicated 集群

与 Serverless 集群不同，Dedicated 集群提供了高级配置选项。

Zilliz Cloud 使用 CU 来衡量 Dedicated 集群消耗的资源。此外，Zilliz Cloud 还将针对数据存储收取费用。

### CU 费用

CU 是用于并行处理数据的基本资源单位。Zilliz Cloud 提供两种类型的 CU，每种类型包含不同的 CPU、内存和存储资源组合。更多详情，请参考[选择合适的 CU 类型](./cu-types-explained)。

Zilliz Cloud 根据您订阅的版本、CU 规格以及集群运行时间来计算 CU 成本。

### 存储费用

Dedicated 集群存储原始数据，包括标量和向量字段，以及索引文件。这些索引文件用于优化搜索性能。Dedicated 集群的数据存储定价与 Serverless 集群不同。

更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。

## 增值服务

Zilliz Cloud 还提供更多增值服务，如数据备份和迁移。

### 备份费用

为 Zilliz Cloud 集群创建的每份快照都会产生一次性的费用。

以 AWS 托管的集群为例，一次性数据传输成本的价格为 ¥5.00/GB。例如，一个 20 GB 的快照将产生的一次性数据传输费用为 ¥5.00 × 20 = ¥100.00。

目前，Zilliz Cloud 支持免费保存快照 30 天。在此之后，快照将被自动删除。恢复快照不会产生任何费用。

### 迁移费用

Zilliz Cloud 允许您将外部来源的数据迁移至 Zilliz Cloud 或在 Zilliz Cloud 集群之间迁移数据。

在集群间的迁移将根据迁移的数据量收取费用。如果迁移来源和迁移目标集群部署在不同的云服务提供商和地域，Zilliz Cloud 将额外收取费用。

将数据从 Milvus、ElasticSearch 迁移至 Zilliz Cloud 不会产生任何费用。

