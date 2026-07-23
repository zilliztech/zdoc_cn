---
title: "getRestoreSnapshotState() | Java | v2"
slug: /java/java/v2-Snapshots-getRestoreSnapshotState
sidebar_label: "getRestoreSnapshotState()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于获取恢复快照任务的状态和进度。| Java | v2"
type: docx
token: KXdUdGpt7oD3dkxHZcfcIAQBnNg
sidebar_position: 4
keywords: 
  - 图像搜索
  - LLMs
  - 机器学习
  - RAG
  - zilliz
  - zilliz cloud
  - cloud
  - getRestoreSnapshotState()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getRestoreSnapshotState()

此操作用于获取恢复快照任务的状态和进度。

```java
public GetRestoreSnapshotStateResp getRestoreSnapshotState(GetRestoreSnapshotStateReq request)
```

## 请求语法\{#request-syntax}

```java
getRestoreSnapshotState(GetRestoreSnapshotStateReq.builder()
    .jobId(Long jobId)
    .build()
)
```

**BUILDER METHODS:**

- `jobId(Long jobId)`

    由 `restoreSnapshot()` 返回的恢复快照任务 ID。

**返回：**

*GetRestoreSnapshotStateResp*

包含恢复任务状态、进度、原因、时间信息和 collection 元数据的响应。

**异常：**

- **MilvusClientException**

    当缺少必需参数、数值参数超出范围，或服务器针对此操作返回错误时，会抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.snapshot.request.GetRestoreSnapshotStateReq;
import io.milvus.v2.service.snapshot.response.GetRestoreSnapshotStateResp;

GetRestoreSnapshotStateReq request = GetRestoreSnapshotStateReq.builder()
    .jobId(123456789L)
    .build();

GetRestoreSnapshotStateResp response = client.getRestoreSnapshotState(request);
```
