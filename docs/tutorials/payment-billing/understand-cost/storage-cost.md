---
title: "存储费用 | Cloud"
slug: /storage-cost
sidebar_label: "存储"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，无论集群是否运行，只要存储了数据或备份文件，就会产生存储费用。 | Cloud"
type: origin
token: Lv3Awu3uHiZ99AkGKXYc7D0JnCd
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 支付方式
  - 账单
  - 存储
  - 费用

---

import Admonition from '@theme/Admonition';


# 存储费用

在 Zilliz Cloud 中，无论集群是否运行，只要存储了数据或备份文件，就会产生存储费用。

## 存储费用来源{#sources-of-storage-costs}

在以下场景中，您会被收取存储费用：

- **集群数据存储**：存储在集群中的原始数据和 Index。

- **备份存储**：为数据容灾创建的[备份](./backup-and-restore)文件。

## 计算公式{#cost-calculation}

```plaintext
存储费用 = 存储单价 × 数据量 × 存储时长
```

- **存储单价**：由集群云地域和类型决定。详见 [Zilliz Cloud 定价](https://zilliz.com.cn/pricing)。

- **数据量**：存储的所有数据或备份文件的大小，以 GB 为单位。

- **存储时长**：数据或备份文件在 Zilliz Cloud 中存储的时间长度。

## 计费规则{#billing-rules}

集群存储与备份存储的计费规则略有不同：

- **集群数据 存储**：按小时计费。存储不满 1 小时，按 1 小时计费。

- **备份存储**：按天计费。存储不满 1 天，按 1 天计费。

## 计算示例{#examples}

以下几个计算示例旨在帮助您了解如何计算存储费用。

### 示例 1：集群存储费用{#example-1-cluster-storage-cost}

假设您的集群配置如下：

- **云服务提供商和地域**：阿里云华东1（杭州）

- **集群类型**：性能型

- **数据量**：500 GB

- **存储时长**：29 天 23 小时 30 分钟

根据云服务提供商和地域、集群类型这两个信息，您可以在官网的[定价](https://zilliz.com.cn/pricing)页面查看存储单价为每月 ¥0.50 GB。

根据[计费规则](./storage-cost#billing-rules)，由于数据存储不满 1 小时将仍旧按照 1 小时计费，因此存储时长将被计算为 30 天（1 个月）。

那么，`存储费用 = ¥0.50 × 500 × 1 = ¥250`。

### 示例 2：备份存储费用{#example-2-backup-storage-cost}

假设您的集群配置如下：

- **云服务提供商和地域**：阿里云华东1（杭州）

- **集群类型**：性能型

- **备份文件大小**：20 GB

- **备份文件保留时长**：44 天 6 小时

根据云服务提供商和地域、集群类型这两个信息，您可以在官网的[定价](https://zilliz.com.cn/pricing)页面查看存储单价为每月 ¥0.50 GB。

根据[计费规则](./storage-cost#billing-rules)，由于备份文件存储不满 1 天将仍旧按照 1 天计费，因此存储时长将被计算为 45 天（1.5个月）。

那么，`存储费用 = ¥0.50 × 20 × 1.5 = ¥15.00`。

## 常见问题

1. **集群挂起后是否仍会收取存储费用？**
 是的。只要您的集群数据、备份文件仍然保留，即使集群已暂停，仍会收取存储费用。

1. **存储费用是否有最低收费？**
 是的。

    - 集群数据存储：最低收取 1 小时费用。即集群数据如果存储不满 1 小时，按 1 小时计费。

    - 备份存储：最低收取 1 天费用。即备份如果存储不满 1 天，按 1 天计费。

