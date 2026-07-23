---
title: "compact() | Java | v2"
slug: /java/java/v2-Management-compact
sidebar_label: "compact()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作通过将小 segment 合并为更大的 segment 来压缩 collection。建议在向 collection 插入大量数据后调用此操作。 | Java | v2"
type: docx
token: LDQsdzUJQotV2GxWGaqcFkDenuq
sidebar_position: 2
keywords: 
  - LLM 幻觉
  - 混合搜索
  - 词法搜索
  - 最近邻搜索
  - Zilliz
  - Zilliz Cloud
  - 云
  - compact()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# compact()

此操作通过将小 segment 合并为更大的 segment 来压缩 collection。建议在向 collection 插入大量数据后调用此操作。

```java
public CompactResp compact(CompactReq request)
```

## 请求语法\{#request-syntax}

```java
compact(CompactReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .isClustering(Boolean isClustering)
    .isL0(Boolean isL0)
    .build()
);
```

**构建器方法：**

- `databaseName(String databaseName)`

    database 的名称。如果未指定，则默认为当前 database。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `isClustering(Boolean isClustering)`

    是否执行 clustering compaction。默认为 `Boolean.FALSE`。

- `isL0(Boolean isL0)`

    是否请求 L0 compaction。默认为 `Boolean.FALSE`，并且独立于 clustering compaction。

**返回值：**

*CompactResp*

**CompactResp** 对象包含一个 compaction ID。

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.CompactReq;
import io.milvus.v2.service.utility.response.CompactResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Compact a collection
client.compact(CompactReq.builder()
    .collectionName("my_collection")
    .build();
);
```
