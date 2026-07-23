---
title: "flushAll() | Java | v2"
slug: /java/java/v2-Management-flushAll
sidebar_label: "flushAll()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会刷新数据库中所有 collection 的插入缓冲区。在备份、验证或需要持久化所有最近写入的工作流之前使用它。 | Java | v2"
type: docx
token: KQqgduahOo13yOxiRMgcfXQxnxd
sidebar_position: 25
keywords: 
  - 近似最近邻搜索
  - DiskANN
  - Sparse vector
  - Vector Dimension
  - zilliz
  - zilliz cloud
  - cloud
  - flushAll()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# flushAll()

此操作会刷新数据库中所有 collection 的插入缓冲区。在备份、验证或需要持久化所有最近写入的工作流之前使用它。

```java
public FlushAllResp flushAll(FlushAllReq request)
```

## 请求语法\{#request-syntax}

```java
flushAll(FlushAllReq.builder()
    .databaseName(String databaseName)
    .waitFlushedTimeoutMs(Long waitFlushedTimeoutMs)
    .build());
```

**构建器方法：**

- `databaseName(String databaseName)`

    应刷新其 collection 的数据库。省略它将使用当前数据库上下文。

- `waitFlushedTimeoutMs(Long waitFlushedTimeoutMs)`

    等待 flush-all 操作完成的时长。大于零的值会启用同步等待。

**返回：**

*FlushAllResp*

**异常：**

- **MilvusClientException**

    当验证失败或服务器针对此操作返回错误时，将引发此异常。

## 示例\{#example}

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("YOUR_CLUSTER_ENDPOINT")
    .token("YOUR_CLUSTER_TOKEN")
    .build());

FlushAllResp resp = client.flushAll(FlushAllReq.builder()
    .databaseName("default")
    .waitFlushedTimeoutMs(60000L)
    .build());
System.out.println(resp.getFlushAllTs());
```

{/* category: Management; action: CREATE; addedSince: v3.0.x */}
