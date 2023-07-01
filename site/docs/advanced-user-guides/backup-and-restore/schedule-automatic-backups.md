---
slug: /schedule-automatic-backups
sidebar_position: 1
---

# 创建自动备份

Zilliz Cloud 允许您为集群创建自动备份，确保意外发生时可以进行数据恢复。定期备份可以防止数据丢失，您也可以通过快照轻松将数据恢复到特定时间点。

## 创建备份计划 {#create-a-backup-schedule}

要创建备份计划，请完成以下步骤：

1. 进入目标集群的**备份**标签页，然后单击**备份计划**。

1. 在**编辑备份计划**对话框中，开启**创建自动备份计划**。

1. 设置**备份频率**、**备份保留天数**和**时间段 (****UTC****)**。

![create-snapshot-schedule](/img/create-snapshot-schedule.png)

## 调整备份计划 {#adjust-backup-schedule}

您可以为集群调整备份计划。默认情况下自动备份处于关闭状态。由于存储快照需要成本，您可以自行决定何时以及如何创建快照。

自动备份开启后，Zilliz Cloud 默认每日上午 8 点到 10 点之间自动为您的集群创建快照，快照将保留 7 天。您可以按需更改设置。

## 相关文档 {#related-doc}

- [创建备份快照](./create-snapshot)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

- [删除备份快照](./delete-snapshot)
