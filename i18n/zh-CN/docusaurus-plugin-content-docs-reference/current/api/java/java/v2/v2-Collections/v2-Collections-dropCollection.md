---
title: "dropCollection() | Java | v2"
slug: /java/java/v2-Collections-dropCollection
sidebar_label: "dropCollection()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作会删除一个 collection。| Java | v2"
type: docx
token: SW6Cdt9QeoY1J1x9SYQcZrc6nbg
sidebar_position: 14
keywords: 
  - LLM 幻觉
  - 混合搜索
  - 词法搜索
  - 最近邻搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - dropCollection()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# dropCollection()

此操作会删除一个 collection。

```java
public void dropCollection(DropCollectionReq request)
```

## 请求语法\{#request-syntax}

```java
dropCollection(DropCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .async(Boolean async)
    .timeout(Long timeout)
    .build()
);
```

**构建器方法：**

- `databaseName(String databaseName)` -

    database 的名称。如果未指定，则默认为当前 database。

- `collectionName(String collectionName)` -

    目标 collection 的名称。

- `async(Boolean async)` -

    是否异步运行该操作。

- `timeout(Long timeout)` -

    超时时长，单位为毫秒。

**返回值：**

*void*

**异常：**

- **MilvusClientException**

    在此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.DropCollectionReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// drop a collection: test
DropCollectionReq dropCollectionReq = DropCollectionReq.builder()
        .collectionName("test")
        .build();
client.dropCollection(dropCollectionReq);
```
