---
slug: /consistency-level
beta: FALSE
notebook: FALSE
type: origin
token: IBY6wlhm5iLJsEkZWaGc0356nYi
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 一致性

---

import Admonition from '@theme/Admonition';


# 一致性水平

在分布式数据库中，一致性水平确保在读写操作期间，每个节点或副本都能获取到相同的数据。Zilliz Cloud 提供 3 种一致性级别：Strong、Bounded 和 Eventually。Zilliz Cloud 默认采用的一致性水平为 Bounded。

## PACELC 定理：权衡一致性、可用性、时延{#understanding-the-balance-the-pacelc-theorem}

PACELC 定理是 CAP 定理的延伸，在分布式数据库中，用户需要在可用性和一致性之间做选择，否则，就在延迟和一致性之间做选择。虽然高一致性保证了数据的准确性，但其代价是更长的搜索延时。相反，低一致性保证了更快的搜索速度，但可能会牺牲数据准确性。因此，您需要根据具体的使用案例场景选择合适的一致性水平。

- **强一致性（Strong）**

    强一致性（Strong）是最严格的级别，确保用户始终读取最新版本的数据，提供最高的数据准确性。但是，采用 Strong 等级一致性可能导致搜索延迟增加。

    ![ETVBbtdQooUhB3xm9aScmWyinvd](/img/ETVBbtdQooUhB3xm9aScmWyinvd.png)

    Strong 一致性水平最适用于功能测试和在线金融系统等对于数据准确性有着极高要求的场景。

- **有限过期一致性（Bounded）**

    有限过期一致性（Bounded）顾名思义，允许数据在一小段时间内不一致，但整体而言数据还是一致的。Bounded 能够平衡延时和数据准确性。

    ![MIF3bSN8yoWbjhxnDL5cDeK4n1g](/img/MIF3bSN8yoWbjhxnDL5cDeK4n1g.png)

    Bounded 适用于视频推荐平台等系统，偶尔的数据不一致不会严重影响系统性能。

- **最终一致性（Eventually）**

    最终一致性（Eventually）是最宽松的级别，允许数据不一致，但最终随着时间推移收敛到数据一致的状态。Eventually 不会严格遵照数据读写顺序。

    ![NErQbWhpVotFHLxHpG2cDbuGnxe](/img/NErQbWhpVotFHLxHpG2cDbuGnxe.png)

    Eventually 通过牺牲即时一致性来提升搜索性能，因此用于追求搜索速度而非即时数据准确性的场景，如产品评论展示系统等。

## 利用保证时间戳实现一致性{#leveraging-guarantee-timestamp-for-consistency}

Zilliz Cloud 通过保证时间戳（GuaranteeTs）实现不同的一致性水平。保证时间戳主要用于控制查询节点，需要等到  GuaranteeTs 之前的所有都可查看后，才能开始执行搜索或查询。不同一致性级别，GuaranteeTs 值也不同：

- **强一致性（Strong）：**GuaranteeTs 设为系统最新时间戳，QueryNodes 需要等待 ServiceTime 推进到 当前最新时间戳才能执行该 Search 请求。

- **最终一致性（Eventually）：**GuaranteeTs 设为一个特别小的值（比如说设为 1），跳过一致性检查，立刻在当 前已有数据上执行 Search 查询。

- **有限过期一致性（Bounded）：**GuaranteeTs 是一个比系统最新时间稍旧的时间，在可容忍范围内可以立刻执行查询。

如需了解一致性和保证时间戳的实现机制，请阅读[本文](https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works-cn.md)。

