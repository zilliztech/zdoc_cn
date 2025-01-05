---
title: "了解费用 | Cloud"
slug: /understand-cost
sidebar_label: "了解费用"
beta: FALSE
notebook: FALSE
description: "本指南将指导您预估使用 Zilliz Cloud 的费用。如需获取精确的费用报价，推荐您通过免费试用进行实测。 | Cloud"
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

本指南将指导您预估使用 Zilliz Cloud 的费用。如需获取精确的费用报价，推荐您通过[免费试用](./free-trials)进行实测。 

如需了解如何解读您的账单，请参考[了解账单](./view-invoice)。

Zilliz Cloud 按组织收费。如果您的组织中有多个集群，将计算每个 Dedicated 和 Serverless 集群的费用总和，并加上备份和 Pipelines 等增值服务的费用。

## Dedicated 集群{#dedicated-clusters}

Dedicated 集群提供专属的资源和环境，适用于生产环境，支持高级配置。

Dedicated 集群提供两种计费方式：[按量计费和包年包月](./create-cluster#annual-subscription-vs-usage-based)。

本章节将介绍如何预估按量计费 Dedicated 集群的费用。如需了解包年包月集群费用，请参考[定价](https://zilliz.com.cn/pricing)或[联系销售](https://zilliz.com.cn/contact-sales)。

对于按量计费的 Dedicated 集群，Zilliz Cloud 使用 CU（Compute Unit）作为单位来衡量 Dedicated 集群消耗的资源。Dedicated 集群的总费用由 **CU 费用**和**存储费用**两部分组成。存储费用通常仅占总费用的 2%，如需更精确地计算存储费用，请使用[计算器](https://zilliz.com.cn/pricing#calculator)。本节将重点介绍如何预估 CU 费用。

#### 计算 CU 费用{#cu-cost-calculation}

```plaintext
CU 费用 = CU 单价 x CU 数量 x 运行时常
```

说明：集群处于“**创建中**”、“**挂起中**”、“**恢复运行中**”、“**已挂起**”的状态时不收取 CU 费用。

#### 示例{#example}

假设您的集群配置如下：

- **版本:** Dedicated

- **云服务提供商和地域:** 阿里云华东1（杭州）

- **CU 类型:** 性能型 CU

- **CU 规格:** 8 CU

- **Replica 数量:** 2

- **Cluster 运行时长:** 720 小时 (1 个月)

根据版本、云服务提供商和地域、CU 类型这三个信息，您可以在官网的[定价](https://zilliz.com.cn/pricing)页面查看 CU 单价为 ￥1.25/小时。

![find-cu-unit-price-cn](/img/find-cu-unit-price-cn.png)

根据 CU 规格和 Replica 数量两个信息，计算 CU 数量。CU 数量 = CU 规格 x Replica 数量 = 8 x 2 = 16。

示例 Dedicated 集群的总 CU 费用为 ¥1.25 x 16 x 720 = ¥14400。

## Serverless 集群{#serverless-clusters}

Serverless 集群可按需付费，适用于追求高弹性的场景需求。

Serverless 集群的总费用由**写入费用**、**读取费用**和**存储费用**组成。存储单价为 ¥1.20/GB/月。存储费用通常仅占总费用的 2%，如需更精确地计算存储费用，请使用[计算器](https://zilliz.com.cn/pricing#calculator)。本节将重点介绍如何预估写入和读取费用。

### 写入费用{#write-costs}

写入费用针对  [insert](./insert-entities)、[upsert](./upsert-entities) 和 [delete](./delete-entities) 操作消耗的资源收费。

Import 和 bulk insert 操作不产生写入费用。

#### 计算写入费用{#write-cost-calculation}

```bash
写入费用 = vCU 单价 x 写入 vCU 用量 
```

- **vCU 单价:** ¥21/一百万 vCU

- **写入 vCU 用量:** 根据写入的数量计算

#### 示例{#example}

下表能够帮助您快速计算写入不同规模数据所消耗的 vCU 用量和写入费用。

<table>
   <tr>
     <th><p><strong>数据量 (*)</strong></p></th>
     <th><p><strong>写入 vCU 用量 (百万)</strong></p></th>
     <th><p><strong>写入费用</strong></p></th>
   </tr>
   <tr>
     <td><p>100 万 128 维向量</p></td>
     <td><p>0.125</p></td>
     <td><p>¥2.625</p></td>
   </tr>
   <tr>
     <td><p>100 万 768 维向量</p></td>
     <td><p>0.75</p></td>
     <td><p>¥15.75</p></td>
   </tr>
   <tr>
     <td><p>100 万 1536 维向量</p></td>
     <td><p>1.5</p></td>
     <td><p>¥31.5</p></td>
   </tr>
   <tr>
     <td><p>100 万 2560 维向量</p></td>
     <td><p>2.5</p></td>
     <td><p>$52.5</p></td>
   </tr>
</table>

**上表中的数据量大小不含标量。如需包含标量，建议您通过免费试用实测所需费用。*

如需速算更大规模的数据量，您只需要做一个乘法。例如写入 1000 万 768 维向量大致消耗 0.75 x 10 = 7.5 百万个 vCU，写入费用大约为 ¥15.75 x 10 = ¥157.5。

您也可以根据数据量，参考下表精准计算写入 vCU 用量和费用

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>vCU 用量</strong></p></th>
   </tr>
   <tr>
     <td><p>Insert</p></td>
     <td><p>1 KB 插入数据 = 0.25 vCU</p></td>
   </tr>
   <tr>
     <td><p>Delete</p></td>
     <td><p>删除 1 个 Entity = 1 vCU</p><p>删除 1 个不存在的 Entity 也会消耗 1 vCU。</p></td>
   </tr>
   <tr>
     <td><p>Upsert</p></td>
     <td><p>根据更新的数据量和删除的 Entity 数量计算。</p><p>删除 1 个不存在的 Entity 也会消耗 1 vCU。</p></td>
   </tr>
</table>

假设您插入 3 GB (3,145,728 KB)  Entity 到 Serverless 集群中，随后又删除了 100,000 个 Entity。

- Insert 操作的 vCU 用量 = 3,145,728 x 0.25 = 78,643 vCU

- Delete 操作的 vCU 用量 = 100,000 x 1 = 100,000 vCU

- 总 vCU 用量 = 1,000 + 78,643 = 178,643 vCU

- 总写入费用 = 0.178643 x 21 = ¥3.75

### 读取费用{#read-costs}

读取费用针对 [search](./single-vector-search)、[hybrid search](./hybrid-search) 和 [query](./get-and-scalar-query) 操作消耗的资源收费。

#### 计算读取费用{#read-cost-calculation}

```bash
读取费用 = vCU 单价 x 读取 vCU 用量 
```

- **vCU 单价:** ¥21/一百万 vCU

- **读取 vCU 用量:** 根据处理请求时扫描的数据和返回的数据大小来计算费用。每次读取请求中，Zilliz Cloud 会扫描整个 Collection 中的数据。如果您在读取过程中[使用 Partition Key](./use-partition-key)，Zilliz Cloud 将根据 Partition key 过滤，仅扫描符合条件的数据，从而减少读取请求扫描的数据量和读取费用。

    <Admonition type="info" icon="📘" title="说明">

    <ol>
    <li><p>vCU 用量与扫描数据量不是成正比的关系。</p></li>
    <li><p>每次读取操作最低会消耗 6 vCU。</p></li>
    </ol>

    </Admonition>

#### 示例{#example}

下表能够帮助您快速计算针对不同规模数据做 100 万次读取操作所消耗的 vCU 用量和读取费用。

<table>
   <tr>
     <th><p><strong>数据量 (*)</strong></p></th>
     <th><p><strong>读取 vCU 用量 (百万)</strong></p></th>
     <th><p><strong>读取费用</strong></p></th>
   </tr>
   <tr>
     <td><p>100 万 128 维向量</p></td>
     <td><p>5</p></td>
     <td><p>¥105</p></td>
   </tr>
   <tr>
     <td><p>100 万 768 维向量</p></td>
     <td><p>15</p></td>
     <td><p>¥315</p></td>
   </tr>
   <tr>
     <td><p>500 万 768 维向量</p></td>
     <td><p>35</p></td>
     <td><p>¥735</p></td>
   </tr>
   <tr>
     <td><p>1000 万 768 维向量</p></td>
     <td><p>55</p></td>
     <td><p>¥1155</p></td>
   </tr>
   <tr>
     <td><p>100 万 1536 维向量</p></td>
     <td><p>25</p></td>
     <td><p>¥525</p></td>
   </tr>
   <tr>
     <td><p>1000 万 1536 维向量</p></td>
     <td><p>75</p></td>
     <td><p>¥1575</p></td>
   </tr>
   <tr>
     <td><p>1 亿 1536 维向量</p></td>
     <td><p>290</p></td>
     <td><p>¥6090</p></td>
   </tr>
   <tr>
     <td><p>100 亿 1536 维向量</p></td>
     <td><p>1495</p></td>
     <td><p>¥31395</p></td>
   </tr>
   <tr>
     <td><p>100 万 2560 维向量</p></td>
     <td><p>30</p></td>
     <td><p>¥630</p></td>
   </tr>
</table>

**上表中的数据量大小不含标量。如需包含标量，建议您通过免费试用实测所需费用。*

通过上述表格可以发现，同样向量维度的数据，当规模从 100 万增长到 1000 万，甚至到 1 亿时，vCU 用量并非以 10 倍的比例线性增长。我们建议您通过免费试用进行实测。

## 增值服务{#value-added-services}

Zilliz Cloud 还提供更多增值服务，如数据备份和 Pipelines。

### 备份费用{#backup-costs}

备份是指在特定时间保存的一份集群或 Collection 数据的拷贝。使用备份可以帮助您在发生数据意外丢失时及时恢复数据。

创建备份会产生费用，但恢复备份不会产生任何费用。

#### 计算备份费用{#backup-cost-calculation}

```plaintext
备份费用 = 备份单价 x 备份文件大小 x 备份保留时长
```

- **备份按月单价:** 根据云服务提供商有所不同，详情请见[定价](https://zilliz.com.cn/pricing)页面。

- **备份文件大小:** 所有备份文件的大小总和，单位为 GB。

- **备份保留时长:** 备份文件的保留的时长，单位为月。

<Admonition type="info" icon="📘" title="说明">

<p>备份按天计费。若备份文件保留时间不满 1 天，仍按 1 天收费。 </p>

</Admonition>

#### 示例{#example}

以阿里云集群为例，创建一个 20 GB 的备份，并保存 45 天（1.5 个月）将产生的费用为 ¥0.50 × 20 × 1.5 = ¥15.00。

恢复备份不会产生任何费用。

### Pipelines 费用{#pipelines-costs}

Zilliz Cloud Pipelines 的一站式 API 服务涵盖数据导入、向量化、检索和重排（Rerank）等多种功能，助力构建高效的搜索应用。Pipelines 费用由使用的模型类型和用量决定。更多详情，请参考[定价方案](https://zilliz.com.cn/pricing)。