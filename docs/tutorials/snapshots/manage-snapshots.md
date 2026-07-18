---
title: "管理快照 | Cloud"
slug: /manage-snapshots
sidebar_key: manage-snapshots
sidebar_label: "管理快照"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: PRIVATE
notebook: FALSE
description: "本指南介绍如何创建和管理快照。 | Cloud"
type: origin
token: UnLgwifG3iaVMCkcDblcqFionF5
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照
  - 管理

---

import Admonition from '@theme/Admonition';


# 管理快照

本指南介绍如何创建和管理快照。

### 创建快照\{#create-snapshot}

创建快照前，建议您停止向目标 Collection 写入数据，并调用 `flush()`，以避免可能的数据丢失。

<Admonition type="info" icon="📘" title="说明">

调用 `flush()` 并非强制要求，但强烈建议执行，以避免数据丢失。如果跳过此步骤，快照只会包含已 Flush 的数据。

</Admonition>

为快照命名时，请使用清晰且有描述性的名称，例如 `"daily_backup_20240101"` 或 `"v2.1_production_release"`，避免使用 `"backup1"` 和 `"test"` 等通用名称。合理使用快照名称，以区分不同版本、环境和阶段的快照。

以下代码示例假设您已有一个名为 `my_collection` 的 Collection。

### 列出快照\{#list-snapshots}

您可以列出现有快照的名称。

### 查看快照详情\{#describe-snapshot}

您可以获取指定快照的详细信息。

### 固定/取消固定快照数据\{#pin-or-unpin-snapshot-data}

在恢复过程中，您可以固定快照，以临时保护其底层数据不被垃圾回收；也可以取消固定，以释放这些数据。

您还可以为固定操作设置存活时间（TTL）。当 TTL 到期后，被固定的数据将自动释放。

### 恢复快照\{#restore-snapshot}

您可以将快照恢复到新的 Collection。该操作为异步操作，并会返回一个任务 ID，用于跟踪恢复进度。

恢复过程使用 **Copy-segment** 机制，而不是数据导入，因此效率更高，原因如下：

- 直接从快照存储中复制 Segment 文件（Binlog、Deltalog 和索引文件）；

- 保留 Field ID 和索引 ID，确保与现有数据文件兼容；

- 避免数据重写和索引重建，从而显著缩短恢复时间；

- 与传统备份和恢复方法相比，可实现 10 到 100 倍的性能提升。

要恢复快照，请按如下方式操作：

### 删除快照\{#drop-snapshot}

如果不再需要某个快照，您可以将其删除。建议您定期删除旧快照以节省存储空间。

### 列出恢复任务\{#list-restoration-jobs}

您可以使用此 API 获取恢复任务列表。

### 获取恢复状态\{#get-restoration-state}

获得恢复任务 ID 后，您可以使用它查询恢复进度。

