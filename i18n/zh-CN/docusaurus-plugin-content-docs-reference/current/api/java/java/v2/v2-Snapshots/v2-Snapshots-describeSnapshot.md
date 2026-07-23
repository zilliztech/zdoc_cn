---
title: "describeSnapshot() | Java | v2"
slug: /java/java/v2-Snapshots-describeSnapshot
sidebar_label: "describeSnapshot()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于获取 snapshot 的详细元数据。| Java | v2"
type: docx
token: CJEzd0riyoJkcUxdYvjcKPoWn3c
sidebar_position: 2
keywords: 
  - 相似性搜索
  - 多模态 RAG
  - llm 幻觉
  - 混合搜索
  - zilliz
  - zilliz cloud
  - cloud
  - describeSnapshot()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# describeSnapshot()

此操作用于获取 snapshot 的详细元数据。

```java
public DescribeSnapshotResp describeSnapshot(DescribeSnapshotReq request)
```

## 请求语法\{#request-syntax}

```java
describeSnapshot(DescribeSnapshotReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .snapshotName(String snapshotName)
    .build()
)
```

**构建器方法：**

- `databaseName(String databaseName)`

    包含该 collection 的 database 名称。如果省略，则使用当前 database。

- `collectionName(String collectionName)`

    与 snapshot 操作关联的 collection 名称。

- `snapshotName(String snapshotName)`

    snapshot 的名称。

**返回：**

*DescribeSnapshotResp*

包含 snapshot 元数据的响应，包括 snapshot 名称、描述、collection 名称、partition 名称、创建时间戳以及存储位置。

**异常：**

- **MilvusClientException**

    当缺少必需参数、数值参数超出范围，或服务器针对该操作返回错误时，会抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.snapshot.request.DescribeSnapshotReq;
import io.milvus.v2.service.snapshot.response.DescribeSnapshotResp;

DescribeSnapshotReq request = DescribeSnapshotReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .snapshotName("book_chunks_backup")
    .build();

DescribeSnapshotResp response = client.describeSnapshot(request);
```
