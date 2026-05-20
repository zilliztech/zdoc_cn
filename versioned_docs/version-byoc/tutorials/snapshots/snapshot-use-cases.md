---
title: "快照使用场景 | BYOC"
slug: /snapshot-use-cases
sidebar_key: snapshot-use-cases
sidebar_label: "快照使用场景"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: PRIVATE
notebook: FALSE
description: "本指南介绍快照的常见使用场景。 | BYOC"
type: origin
token: R4LUwJ8VkiKd7fke4BNcUSMMnpd
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 快照
  - 管理
  - 场景
  - 使用

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 快照使用场景

本指南介绍快照的常见使用场景。

## 数据备份和恢复\{#data-backup-and-restoration}

快照是数据在特定时间点的快速镜像，适合用于快速回滚或测试（数天到数周）。相比之下，备份是单独存储的独立完整副本，适合用于长期灾难恢复（数周到数年），并能更好地防范整个存储系统故障。

下表对比了快照和备份。

<table>
   <tr>
     <th></th>
     <th><p><strong>备份</strong></p></th>
     <th><p><strong>快照</strong></p></th>
   </tr>
   <tr>
     <td><p>创建方式</p></td>
     <td><p>复制所有数据文件（耗时较长）</p></td>
     <td><p>仅创建元数据（毫秒级）</p></td>
   </tr>
   <tr>
     <td><p>恢复方式</p></td>
     <td><p>导入数据并重建索引</p></td>
     <td><p>仅复制已有数据文件和索引文件</p></td>
   </tr>
   <tr>
     <td><p>性能</p></td>
     <td><p>较慢且资源消耗较高</p></td>
     <td><p>快速且轻量（数秒到数分钟）</p></td>
   </tr>
   <tr>
     <td><p>系统影响</p></td>
     <td><p>I/O 和 CPU 使用率较高</p></td>
     <td><p>影响极小</p></td>
   </tr>
</table>

创建快照通常只需毫秒级时间；恢复快照所需时间取决于数据量，通常为数秒到数分钟。

有关快照限制、约束及其系统影响的更多详细信息，请参阅[快照](./snapshots)。

### 创建快照\{#create-snapshots}

创建快照前，建议您停止向目标 Collection 写入数据，并调用 `flush()`，以避免可能的数据丢失。

调用 `flush()` 并非强制要求，但强烈建议执行，以避免数据丢失。如果跳过此步骤，快照只会包含已 Flush 的数据。

为快照命名时，请使用清晰且有描述性的名称，例如 `"daily_backup_20240101"` 或 `"v2.1_production_release"`，避免使用 `"backup1"` 和 `"test"` 等通用名称。合理使用快照名称，以区分不同版本、环境和阶段的快照。

以下代码示例假设您已有一个名为 `my_collection` 的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# Recommended: Flush data before creating snapshot to ensure all data is included
client.flush(collection_name="my_collection")

# Create snapshot for entire collection
client.create_snapshot(
    collection_name="my_collection",
    snapshot_name="backup_20240101",
    description="Daily backup for January 1st, 2024"
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

client, err := milvusclient.New(context.Background(), &milvusclient.ClientConfig{
    Address: "YOUR_CLUSTER_ENDPOINT",
    Token: "YOUR_CLUSTER_TOKEN",
})

// Recommended: Flush data before creating snapshot to ensure all data is included
err = client.Flush(context.Background(), milvusclient.NewFlushOption("my_collection"))
if err != nil {
    log.Fatal(err)
}

// Create snapshot
createOpt := milvusclient.NewCreateSnapshotOption("backup_20240101", "my_collection").
    WithDescription("Daily backup for January 1st, 2024")

err = client.CreateSnapshot(context.Background(), createOpt)
```

</TabItem>

<TabItem value='javascript'>

```javascript
// node.js
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

### 恢复快照\{#restore-snapshots}

您可以将快照恢复到新的 Collection。该操作为异步操作，并会返回一个任务 ID，用于跟踪恢复进度。

恢复过程使用 **Copy-segment** 机制，而不是数据导入，因此效率更高，原因如下：

- 直接从快照存储中复制 Segment 文件（Binlog、Deltalog 和索引文件）；

- 保留 Field ID 和索引 ID，确保与现有数据文件兼容；

- 避免数据重写和索引重建，从而显著缩短恢复时间；

- 与传统备份和恢复方法相比，可实现 10 到 100 倍的性能提升。

要恢复快照，请按如下方式操作：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Restore snapshot to new collection
job_id = client.restore_snapshot(
    snapshot_name="backup_20240101",
    collection_name="restored_collection",
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='go'>

```go
restoreOpt := milvusclient.NewRestoreSnapshotOption(
    "backup_20240101", 
    "restored_collection"
)

jobID, err := client.RestoreSnapshot(context.Background(), restoreOpt)
if err != nil {
    log.Fatal(err)
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// node.js
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

### 删除快照\{#drop-snapshots}

如果不再需要某个快照，您可以将其删除。建议您定期删除旧快照以节省存储空间。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.drop_snapshot(
    snapshot_name="backup_20240101"
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='go'>

```go
dropOpt := milvusclient.NewDropSnapshotOption("backup_20240101")
err := client.DropSnapshot(context.Background(), dropOpt)
```

</TabItem>

<TabItem value='javascript'>

```javascript
// node.js
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

