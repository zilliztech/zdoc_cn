---
title: "listRestoreSnapshotJobs() | Java | v2"
slug: /java/java/v2-Snapshots-listRestoreSnapshotJobs
sidebar_label: "listRestoreSnapshotJobs()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会列出恢复快照作业，可选择限定到某个数据库和 collection。 | Java | v2"
type: docx
token: I98vddTeco48kYxHEkOccG9ynYe
sidebar_position: 5
keywords: 
  - LLM 幻觉
  - hybrid search
  - lexical search
  - nearest neighbor search
  - zilliz
  - zilliz cloud
  - cloud
  - listRestoreSnapshotJobs()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# listRestoreSnapshotJobs()

此操作会列出恢复快照作业，可选择限定到某个数据库和 collection。

```java
public ListRestoreSnapshotJobsResp listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq request)
```

## 请求语法\{#request-syntax}

```java
listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**构建器方法：**

- `databaseName(String databaseName)`

    包含该 collection 的数据库名称。如果省略，则使用当前数据库。

- `collectionName(String collectionName)`

    与快照操作关联的 collection 名称。

**返回：**

*ListRestoreSnapshotJobsResp*

包含与请求过滤条件匹配的恢复快照作业的响应。

**异常：**

- **MilvusClientException**

    当缺少必需参数、数值参数超出范围，或服务器针对此操作返回错误时，会抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.snapshot.request.ListRestoreSnapshotJobsReq;
import io.milvus.v2.service.snapshot.response.ListRestoreSnapshotJobsResp;

ListRestoreSnapshotJobsReq request = ListRestoreSnapshotJobsReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .build();

ListRestoreSnapshotJobsResp response = client.listRestoreSnapshotJobs(request);
```
