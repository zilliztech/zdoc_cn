---
title: "createSnapshot() | Java | v2"
slug: /java/java/v2-Snapshots-createSnapshot
sidebar_label: "createSnapshot()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作为集合创建快照。 | Java | v2"
type: docx
token: JhCEdppKrowJIqxFusBc2TXsnSg
sidebar_position: 1
keywords: 
  - HNSW 算法
  - 向量相似度搜索
  - 近似最近邻搜索
  - DiskANN
  - zilliz
  - Zilliz Cloud
  - cloud
  - createSnapshot()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# createSnapshot()

此操作为集合创建快照。

```java
public void createSnapshot(CreateSnapshotReq request)
```

## 请求语法\{#request-syntax}

```java
createSnapshot(CreateSnapshotReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .snapshotName(String snapshotName)
    .description(String description)
    .compactionProtectionSeconds(Long compactionProtectionSeconds)
    .build()
)
```

**构建器方法：**

- `databaseName(String databaseName)`

    包含该集合的数据库名称。如果省略，则使用当前数据库。

- `collectionName(String collectionName)`

    与快照操作关联的集合名称。

- `snapshotName(String snapshotName)`

    快照的名称。

- `description(String description)`

    快照的可读描述。

- `compactionProtectionSeconds(Long compactionProtectionSeconds)`

    保护快照免受压缩影响的秒数。不需要保护窗口时使用 `0L`。

**返回值：**

*void*

**异常：**

- **MilvusClientException**

    当必需参数缺失、数值参数超出范围，或服务器针对此操作返回错误时，会抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.snapshot.request.CreateSnapshotReq;

CreateSnapshotReq request = CreateSnapshotReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .snapshotName("book_chunks_backup")
    .description("Backup before schema migration")
    .compactionProtectionSeconds(3600L)
    .build();

client.createSnapshot(request);
```
