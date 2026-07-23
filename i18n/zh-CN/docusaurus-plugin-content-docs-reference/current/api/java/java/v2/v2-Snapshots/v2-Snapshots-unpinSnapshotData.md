---
title: "unpinSnapshotData() | Java | v2"
slug: /java/java/v2-Snapshots-unpinSnapshotData
sidebar_label: "unpinSnapshotData()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会释放由 `pinSnapshotData()` 创建的快照数据 pin。| Java | v2"
type: docx
token: SachdJS5AopAZyxEfloceBnnnqg
sidebar_position: 9
keywords: 
  - 开源 vector db
  - vector database 示例
  - rag vector database
  - 什么是 vector db
  - zilliz
  - zilliz cloud
  - cloud
  - unpinSnapshotData()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# unpinSnapshotData()

此操作会释放由 `pinSnapshotData()` 创建的快照数据 pin。

```java
public void unpinSnapshotData(UnpinSnapshotDataReq request)
```

## 请求语法\{#request-syntax}

```java
unpinSnapshotData(UnpinSnapshotDataReq.builder()
    .pinId(Long pinId)
    .build()
)
```

**BUILDER 方法：**

- `pinId(Long pinId)`

    由 `pinSnapshotData()` 返回的 pin ID。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当缺少必需参数、数值参数超出范围，或服务器针对该操作返回错误时，会抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.snapshot.request.UnpinSnapshotDataReq;

UnpinSnapshotDataReq request = UnpinSnapshotDataReq.builder()
    .pinId(987654321L)
    .build();

client.unpinSnapshotData(request);
```
