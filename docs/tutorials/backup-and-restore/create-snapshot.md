---
slug: /create-snapshot
beta: FALSE
notebook: FALSE
token: GFFswc3z1iQtjQkpmyScL00dnSx
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 创建备份快照

快照是为某个集群在指定时间点创建的备份。您可以基于快照创建新的集群或将快照用作集群数据备份。

<Admonition type="info" icon="📘" title="说明">

快照功能目前仅对企业版用户开放。如果您是免费版用户，请先将您的 Serverless 集群[迁移](./migrate-between-clusters#serverless-dedicated)至企业版 Dedicated 集群。更多集群类型详情，请见 [Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)。

</Admonition>

## 创建快照{#create-snapshot}{#create-snapshot}

快照创建是异步操作，创建所需时间取决于集群大小和集群使用的 CU 大小。例如，如果某集群包含 4 CU 和一个 Collection，Collection 中包含了超过 1.2 亿个 128 维向量记录，则为该 Collection 创建一个快照大约耗时 5 分钟。

您可以参考以下截图为集群创建快照。创建快照时，您的集群仍处于运行状态。

![create_snapshot](/img/create_snapshot.png)

## 调整快照保留天数{#adjust-snapshot-retention-period}{#adjust-snapshot-retention-period}

您可以通过设置保留天数（以天为单位）来调整 Zilliz Cloud 保留快照的时间。当前默认保留天数为 7 天，最长为 30 天。

<Admonition type="info" icon="📘" title="说明">

用于创建快照的数据传输单独收费，收费标准为￥0.5 / GB。例如，一个 20 GB 的快照将产生一次性的数据传输费用为￥0.5 x 20 = ￥10。

</Admonition>

## 相关文档{#related-topics}{#related-topics}

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

- [删除备份快照](./delete-snapshot)

