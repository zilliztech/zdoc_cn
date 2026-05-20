---
title: "快照 | BYOC"
slug: /snapshots
sidebar_key: snapshots
sidebar_label: "快照"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: PRIVATE
notebook: FALSE
description: "快照是 Zilliz Cloud Collection 在特定时间点的镜像，适合用于快速回滚、版本管理和测试。快照会捕获 Collection 在指定时间戳的状态，并且只存储元数据和 Manifest 文件，例如 Schema、索引和向量数据文件（Binlog），从而实现高效存储和恢复。 | BYOC"
type: origin
token: PtRvwvkKWidBP2kafahcObQYnWf
sidebar_position: 11
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


# 快照

快照是 Zilliz Cloud Collection 在特定时间点的镜像，适合用于快速回滚、版本管理和测试。快照会捕获 Collection 在指定时间戳的状态，并且只存储元数据和 Manifest 文件，例如 Schema、索引和向量数据文件（Binlog），从而实现高效存储和恢复。

<Admonition type="info" icon="📘" title="说明">

快照是数据在特定时间点的快速镜像，适合用于快速回滚或测试（**数天到数周**）。相比之下，备份是单独存储的独立完整副本，适合用于长期灾难恢复（**数周到数年**），并能更好地防范整个存储系统故障。

要创建备份，请参阅[备份与恢复](./backup-and-restore)。

</Admonition>

## 快照结构\{#snapshots-anatomy}

Zilliz Cloud 实现了基于 Manifest 的快照架构，无需复制实际向量数据，即可高效捕获、存储和恢复特定时间点的数据。该架构将元数据管理与物理数据存储分离，使轻量级快照可以引用对象存储中已有的 Segment 文件。

为 Collection 创建快照时，Zilliz Cloud 会收集以下信息：

- **快照元数据**

    提供创建快照所需的基本信息，包括快照名称和描述、目标 Collection ID，以及快照创建的时间点。

- **Collection 描述**

    包含目标 Collection 的描述，包括 Schema 定义、Partition 信息和属性。

- **索引信息**

    存储索引元数据以及索引文件路径。

- **Segment 数据**

    捕获向量数据文件（Binlog）、删除日志（Deltalog）和索引文件。

在上述信息中，Zilliz Cloud 会为每个 Segment 生成一个 Apache Avro Manifest 文件，并将快照元数据、Collection 描述、索引信息以及 Manifest 文件路径存储在一个 JSON 文件中。以下示例展示了快照文件夹结构。

```python
snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
```

创建快照通常只需毫秒级时间；恢复快照所需时间取决于数据量，通常为数秒到数分钟。

## 存储影响和注意事项\{#storage-impacts-and-considerations}

一旦 Zilliz Cloud 在快照中引用某个 Segment 或索引文件，除非您删除该快照，否则 Zilliz Cloud 不会对这些文件执行垃圾回收。快照消耗的存储空间与目标 Collection 的大小成正比，并且保留快照会产生对象存储成本。在极端情况下，单个快照甚至可能使对象存储成本翻倍。建议您：

- 定期删除旧快照以节省存储空间。

- 使用描述性名称和描述，便于后续引用。

- 始终验证快照创建和恢复结果。

- 跟踪快照创建时间戳、存储使用量和恢复任务 ID，以便监控和排查问题。

## 限制\{#limits-and-restrictions}

- 快照创建后不可变。

- 您只能将快照恢复到与原始 Collection 位于同一集群中的新 Collection。

- 恢复后的 Collection 会保留相同的 Schema、Shard 数量和 Partition 数量。

- 恢复的历史数据可能与 TTL 策略冲突。建议您在创建快照前禁用 TTL 或调整 TTL 设置。

## 更多内容\{#further-readings}

import DocCardList from '@theme/DocCardList';

<DocCardList />