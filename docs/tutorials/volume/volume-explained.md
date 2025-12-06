---
title: "了解 Volume | Cloud"
slug: /volume-explained
sidebar_label: "了解 Volume"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Volume 是一种对象存储，用于保存结构化数据表或非结构化数据文件，为访问、存储、治理和组织这些数据资产提供一个统一入口。您需要先将本地文件系统或云对象存储中的结构化与非结构化数据上传到 Zilliz Cloud Volume 中，然后您可以将结构化数据直接导入或迁移到 Collection 中，或通过 ETL 流水线将非结构化数据转换为 Embedding 向量，随后再将这些向量数据加载到 Collection 中。 | Cloud"
type: origin
token: Ah7JwvIfEiFo9qknck9coJ7qnQg
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - Volume

---

import Admonition from '@theme/Admonition';


# 了解 Volume

Volume 是一种对象存储，用于保存结构化数据表或非结构化数据文件，为访问、存储、治理和组织这些数据资产提供一个统一入口。您需要先将本地文件系统或云对象存储中的结构化与非结构化数据上传到 Zilliz Cloud Volume 中，然后您可以将结构化数据直接导入或迁移到 Collection 中，或通过 ETL 流水线将非结构化数据转换为 Embedding 向量，随后再将这些向量数据加载到 Collection 中。

![WekfwpXHRhvM9LbI8oucsoc9nQf](/img/WekfwpXHRhvM9LbI8oucsoc9nQf.png)

Volume 从属于项目，而不是属于某个单独的集群。同一项目下的任意集群在满足[项目角色](./project-users#project-roles)权限的前提下，都可以对 Volume 进行读写操作。

```bash
组织
└─ 项目
   ├─ 集群
   │   └─ Database
   │       └─ Collection
   └─ Volume
       └─ 数据文件
```

## Volume 的适用场景\{#use-cases-for-volumes}

您可以使用 Volume 来简化数据处理。下图展示了 Zilliz Cloud Volume 的主要应用场景。

![E6wqwWTydhCDAGbCy7jcHflbnAG](/img/E6wqwWTydhCDAGbCy7jcHflbnAG.png)

您可以在数据导入、数据迁移与数据合并中使用 Volume。这些场景都要求您从外部数据源上传数据到 Volume，但是却对上传到 Volume 中数据进行不同的处理。

- 数据导入

    在数据导入过程中，您可能将准备好的数据集上传到 Volume，然后再将 Volume 中的数据导入到一个 Zilliz Cloud Collection 中。更多内容，可以参考[通过 RESTful API 导入](./import-data-via-restful-api)和[通过 SDK 导入](./import-data-via-sdks)。

- 数据合并

    您可以将本地文件中上传到 Volume，并将文件中的数据与指定 Collection 合并，从而创建一个包含两种数据来源的新 Collection。更多内容，可以参考[合并数据](./merge-data)。

- 数据迁移

    在数据迁移中，您也可以将从 Milvus 导出的备份数据上传到 Volume 中，然后再使用 Volume 中的数据将其恢复成一个 Zilliz Cloud 集群。更多内容，可以参考[通过备份工具从 Milvus 迁移至 Zilliz Cloud](./via-stage)。

## 计费\{#billing}

创建 Volume 时，您可以选择**免费试用 Volume** 或**按量计费 Volume**。下表比较了它们的典型使用场景和限制。

<table>
   <tr>
     <th></th>
     <th><p>免费试用</p></th>
     <th><p>按量计费</p></th>
   </tr>
   <tr>
     <td><p>使用场景</p></td>
     <td><p>仅适用于测试环境。</p></td>
     <td><p>适用于生产环境。</p></td>
   </tr>
   <tr>
     <td><p>容量</p></td>
     <td><p>5 GB</p></td>
     <td><p>无限制</p></td>
   </tr>
   <tr>
     <td><p>单次上传的文件大小和数量</p></td>
     <td><p>每次上传最多 1 GB 且不可超过 1,000 个文件</p></td>
     <td><p>每次上传最多 100 GB 且文件数量不限</p></td>
   </tr>
   <tr>
     <td><p>最多可创建的数量</p></td>
     <td><p>1 个</p></td>
     <td><p>100 个</p></td>
   </tr>
</table>

### 免费试用 Volume\{#free-trial}

- 无需绑定支付方式。

- 每个组织中只能创建 1 个免费试用 Volume。

- 免费试用 Volume 最多保留 30 天，过期会被自动删除。

### 按量计费 Volume\{#pay-as-you-go}

- 需要绑定支付方式。

- 使用按量计费 Volume 会产生相关费用。

    - 如需查询列表价，请参见[定价详情](https://zilliz.com.cn/pricing/pricing-guide)。

    - 如需了解 Volume 费用的计算方式，请参见[存储费用](./storage-cost)。

### 常见问题\{#faqs}

1. **如果我的组织因为账单逾期被冻结，是否影响 Volume ？**

    如果组织被冻结，该组织下的所有 Volume（包括免费试用和按量计费 Volume）以及其中存储的所有文件都会被删除且无法恢复。

    如需继续使用 Volume，请先结清所有未支付账单，然后重新创建 Volume 并重新上传文件。

1. **为什么我在 Web 控制台中看不到免费试用 Volume 的选项？**

    如果您的组织中已经创建过免费试用 Volume，该选项会从控制台中隐藏。每个组织只能创建一个免费试用 Volume。