---
title: "listSnapshots() | Java | v2"
slug: /java/java/v2-Snapshots-listSnapshots
sidebar_label: "listSnapshots()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会列出快照，可选择限定到某个数据库和 collection。 | Java | v2"
type: docx
token: ZhiOdVH0uoMI0axpcYMcfhQXnkf
sidebar_position: 6
keywords: 
  - 自然语言处理数据库
  - 廉价 vector 数据库
  - 托管 vector 数据库
  - Pinecone vector 数据库
  - zilliz
  - Zilliz Cloud
  - cloud
  - listSnapshots()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# listSnapshots()

此操作会列出快照，可选择限定到某个数据库和 collection。

```java
public ListSnapshotsResp listSnapshots(ListSnapshotsReq request)
```

## 请求语法\{#request-syntax}

```java
listSnapshots(ListSnapshotsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    包含该 collection 的数据库名称。如果省略，则使用当前数据库。

- `collectionName(String collectionName)`

    与快照操作关联的 collection 名称。

**返回：**

*ListSnapshotsResp*

包含与请求过滤条件匹配的快照名称的响应。

**异常：**

- **MilvusClientException**

    当缺少必需参数、数值参数超出范围，或服务器针对该操作返回错误时，会引发此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.snapshot.request.ListSnapshotsReq;
import io.milvus.v2.service.snapshot.response.ListSnapshotsResp;

ListSnapshotsReq request = ListSnapshotsReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .build();

ListSnapshotsResp response = client.listSnapshots(request);
```
