---
title: "getCollectionStats() | Java | v2"
slug: /java/java/v2-Collections-getCollectionStats
sidebar_label: "getCollectionStats()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "除实体数量外，还返回完整的 collection 统计信息映射。| Java | v2"
type: docx
token: RSNDdgCQ2oRIMWxeVafcNf8LnAc
sidebar_position: 17
keywords: 
  - 稠密 embedding
  - Faiss vector database
  - Chroma vector database
  - nlp 搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - getCollectionStats()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getCollectionStats()

除实体数量外，还返回完整的 collection 统计信息映射。

```java
public GetCollectionStatsResp getCollectionStats(GetCollectionStatsReq request)
```

## 请求语法\{#request-syntax}

```java
GetCollectionStatsReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .build();
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    数据库名称。省略时默认为当前数据库。

- `collectionName(String collectionName)`

    目标 collection 的名称。

**返回：**

*GetCollectionStatsResp*

包含 numOfEntities 以及 Milvus 返回的完整 stats 映射。

**异常：**

- **MilvusClientException**

    当请求验证、传输或服务器执行失败时抛出。请查看异常消息以了解确切的失败原因。

## 示例\{#example}

```java
GetCollectionStatsResp response = client.getCollectionStats(GetCollectionStatsReq.builder()
    .collectionName("books")
    .build());
Map<String, String> stats = response.getStats();
```
