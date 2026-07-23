---
title: "refreshLoad() | Java | v2"
slug: /java/java/v2-Management-refreshLoad
sidebar_label: "refreshLoad()"
beta: false
added_since: v2.4.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作主要在 bulkImport 请求生成新 segment 时使用，强制将新 segment 加载到内存中。 | Java | v2"
type: docx
token: TCw7d7brCovAUpxA5D8cjOIGn1b
sidebar_position: 15
keywords: 
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - 什么是 vector database
  - zilliz
  - zilliz cloud
  - cloud
  - refreshLoad()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# refreshLoad()

此操作主要在 bulkImport 请求生成新 segment 时使用，强制将新 segment 加载到内存中。

```java
public void refreshLoad(RefreshLoadReq request)
```

## 请求语法\{#request-syntax}

```java
refreshLoad(RefreshLoadReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .async(Boolean async)
    .sync(Boolean sync)
    .timeout(Long timeout)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    database 的名称。如果未指定，则默认为当前 database。

- `collectionName(String collectionName)` -

    目标 collection 的名称。

- `async(Boolean async)` -

    是否异步运行该操作。默认为 `Boolean.TRUE`。

- `sync(Boolean sync)` -

    是否同步等待，直到该操作完成。默认为 `Boolean.TRUE`。

- `timeout(Long timeout)` -

    超时时长，单位为毫秒。默认为 `60000L`。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.RefreshLoadReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Refresh the load status of the collection `test`
RefreshLoadReq refreshLoadReq = RefreshLoadReq.builder()
        .collectionName("test")
        .build();
client.refreshLoad(refreshLoadReq);
```
