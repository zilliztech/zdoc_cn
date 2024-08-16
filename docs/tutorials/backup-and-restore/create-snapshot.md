---
slug: /create-snapshot
beta: FALSE
notebook: FALSE
type: origin
token: GFFswc3z1iQtjQkpmyScL00dnSx
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照

---

import Admonition from '@theme/Admonition';


# 创建备份

Zilliz Cloud 备份是指在某特定时间保存的一份集群或 Collection 数据的拷贝。您可以基于备份创建新的集群或 Collection。

Zilliz Cloud 将永久保存手动创建的备份。换言之，手动创建的备份不会被自动删除。

## 前提条件{#before-you-start}

开始前，请确保：

- 您是目标组织中的[组织管理员](./user-roles#organization-roles)或[项目管理员](./user-roles#project-roles)。

- 您的集群为 Dedicated 版本。

<Admonition type="info" icon="📘" title="说明">

<p>备份功能目前仅对 Dedicated 集群开放。如果您创建的是 Serverless 集群，请先<a href="./migrate-between-clusters#from-serverless-to-dedicated-cluster">迁移</a>至 Dedicated 集群。</p>
<p>创建备份会产生一定费用。具体详情，请参阅<a href="./understand-cost#backup-costs">了解费用</a>。</p>

</Admonition>

## 创建备份{#create-backup}

您可以参考以下截图为集群或 Collection 创建备份。创建备份时，您的集群仍处于**运行中**的状态。

![create_snapshot_cn](/img/create_snapshot_cn.png)

Zilliz Cloud 将生成一条备份任务。您可前往[任务中心](./job-center)查看任务状态和进度。如果任务状态从**进行中**变更为**成功**，则代表备份创建成功。

<Admonition type="info" icon="📘" title="说明">

<p>同一集群下，同时最多可有一条进行中或等待中的手动创建备份任务。只有当进行中或等待中的手动创建备份任务完成时，您方可手动创建新备份。</p>

</Admonition>

创建备份是异步操作，创建所需时间取决于集群大小和集群的 CU 规格。例如，如果某集群大小为 4 CU 且该集群下有一个 Collection，Collection 中包含了超过 1.2 亿 128 维向量记录，则为该集群创建手动备份大约耗时 5 分钟。

## 相关文档{#related-topics}

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

- [删除备份快照](./delete-snapshot)

