---
slug: /schedule-automatic-backups
beta: FALSE
notebook: FALSE
type: origin
token: TXyTwrfxCiStfek4hc7c2nKwnJc
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 自动

---

import Admonition from '@theme/Admonition';


# 创建自动备份

Zilliz Cloud 允许您为集群创建自动备份，确保意外发生时可以进行数据恢复。定期备份可以防止数据丢失，您也可以通过备份轻松将数据恢复到特定时间点。

## 前提条件{#before-you-start}

开始前，请确保：

- 您是目标组织中的[组织管理员](./user-roles#organization-roles)或[项目管理员](./user-roles#project-roles)。

- 您的集群为 Dedicated 版本。

## 创建自动备份{#create-backup-schedule}

如需创建自动备份，请完成以下步骤：

1. 进入目标集群的**备份**标签页，单击**自动备份**。

1. 在**编辑自动备份设置**对话框中，开启**自动备份**。

1. 设置**备份频率**、**备份保留天数**和**时间段 (UTC)**。

![create-snapshot-schedule](/img/create-snapshot-schedule.png)

<Admonition type="info" icon="📘" title="说明">

<p>更多备份费用详情，请参考 <a href="./understand-cost#backup-costs">了解费用</a>。</p>

</Admonition>

## 调整自动备份设置{#adjust-automated-backup-schedule}

您可以为集群调整自动备份设置。默认情况下自动备份处于关闭状态。由于创建备份会产生[费用](./understand-cost)，您可以自行决定何时以及如何创建自动备份。

自动备份开启后，Zilliz Cloud 默认每日上午 8 点到 10 点之间自动为您的集群创建备份，备份将保留 7 天。您可以按需更改设置。

<Admonition type="info" icon="📘" title="说明">

<p>自动创建的备份最多可保留 30 天。</p>

</Admonition>

## 删除自动备份{#delete-automatically-created-backup-file}

集群被删除的同时，所有为该集群自动创建的备份也将一同被删除。此外，自动创建的备份也将在超过保留期限时被自动删除。如需手动删除自动创建的备份，请参阅[删除备份文件](./delete-snapshot)。

## 相关文档{#related-topics}

- [创建备份快照](./create-snapshot)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

- [删除备份快照](./delete-snapshot)

