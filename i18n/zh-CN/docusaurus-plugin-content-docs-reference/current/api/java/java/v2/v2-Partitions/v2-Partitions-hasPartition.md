---
title: "hasPartition() | Java | v2"
slug: /java/java/v2-Partitions-hasPartition
sidebar_label: "hasPartition()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作检查指定 collection 中是否存在指定 partition。 | Java | v2"
type: docx
token: KVSUdHV0ho7nnwxeQKMcEL47nKe
sidebar_position: 4
keywords: 
  - 弹性 vector database
  - Pinecone vs Milvus
  - Chroma vs Milvus
  - Annoy vector search
  - zilliz
  - Zilliz Cloud
  - 云
  - hasPartition()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# hasPartition()

此操作检查指定 collection 中是否存在指定 partition。

```java
public Boolean hasPartition(HasPartitionReq request)
```

## 请求语法\{#request-syntax}

```java
hasPartition(HasPartitionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    目标 collection 所属 database 的名称。

- `collectionName(String collectionName)`

    现有 collection 的名称。

- `partitionName(String partitionName)`

    要检查的 partition 的名称。

**RETURN TYPE:**

*Boolean*

**RETURNS:**

一个布尔值，表示指定 partition 是否存在。

**EXCEPTIONS:**

- **MilvusClientExceptions**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.partition.request.HasPartitionReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Check is partition "test_partition" exists in collection
HasPartitionReq hasPartitionReq = HasPartitionReq.builder()
        .collectionName("test")
        .partitionName("test_partition")
        .build();
Boolean res = client.hasPartition(hasPartitionReq);
```

