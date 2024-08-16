---
slug: /delete-snapshot
beta: FALSE
notebook: FALSE
type: origin
token: FW37wt3qEiKvZzkzBducXgHZnIe
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照
  - 删除

---

import Admonition from '@theme/Admonition';


# 删除备份文件

Zilliz Cloud 支持手动或自动创建备份。

Zilliz Cloud 将永久保留手动创建的备份。即使删除集群，为该集群手动创建的备份也不会随集群一起删除。如果不再需要特定的手动备份，您可以将其删除。

自动创建的备份将在到达保留天数后被自动删除。删除集群时，该集群自动创建的备份也会一同被删除。

## 开始前{#before-you-start}

请先确保：

- 您是[组织管理员](./user-roles#organization-roles)或[项目管理员](./user-roles#project-roles)。

- 您的集群为 Dedicated 版集群。

## 操作步骤{#procedures}

![delete_snapshot](/img/delete_snapshot.png)

在执行删除操作之前，系统会提示您确认是否删除备份文件。

## 相关文档{#related-topics}

- [创建备份快照](./create-snapshot)

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [恢复备份](./restore-from-snapshot)

