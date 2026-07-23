---
title: "listPartitions() | Java | v2"
slug: /java/java/v2-Partitions-listPartitions
sidebar_label: "listPartitions()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作会列出指定 collection 中的 partition。 | Java | v2"
type: docx
token: Bjs5dej7ZoBKhXxZzMjclPCynmd
sidebar_position: 5
keywords: 
  - 矢量化
  - k 近邻算法
  - ANNS
  - Vector search
  - zilliz
  - Zilliz Cloud
  - cloud
  - listPartitions()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# listPartitions()

此操作会列出指定 collection 中的 partition。

```java
public List<String> listPartitions(ListPartitionsReq request)
```

## 请求语法\{#request-syntax}

```java
listPartitions(ListPartitionsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    目标 collection 所属数据库的名称。

- `collectionName(String collectionName)`

    现有 collection 的名称。

**返回类型：**

*List\<String\>*

**返回：**

partition 名称列表。

**异常：**

- **MilvusClientExceptions**

    当此操作过程中发生任何错误时，将引发此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.partition.request.ListPartitionsReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List partitions in collection
ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()
        .collectionName("test")
        .build();
List<String> res = client.listPartitions(listPartitionsReq);
```

