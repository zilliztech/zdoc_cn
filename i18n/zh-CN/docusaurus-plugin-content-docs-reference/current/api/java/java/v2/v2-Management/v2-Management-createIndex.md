---
title: "createIndex() | Java | v2"
slug: /java/java/v2-Management-createIndex
sidebar_label: "createIndex()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作为指定 collection 创建 index。| Java | v2"
type: docx
token: JLCudD7MYoQdxQxLwlpcbBnpn8c
sidebar_position: 3
keywords: 
  - rag vector database
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 对比
  - zilliz
  - zilliz cloud
  - cloud
  - createIndex()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# createIndex()

此操作为指定 collection 创建 index。

```java
public void createIndex(CreateIndexReq request)
```

## 请求语法\{#request-syntax}

```java
createIndex(CreateIndexReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .indexParams(List<IndexParam> indexParams)
    .sync(Boolean sync)
    .timeout(Long timeout)
    .build()
);
```

**BUILDER 方法：**

- `databaseName(String databaseName)` -

    数据库名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)` -

    目标 collection 的名称。

- `indexParams(List<IndexParam> indexParams)` -

    定义 index 配置的 IndexParam 对象列表。

- `sync(Boolean sync)` -

    是否同步等待操作完成。默认为 `Boolean.TRUE`。

- `timeout(Long timeout)` -

    超时时长，单位为毫秒。默认为 `60000L`。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create an index for the field "vector"
IndexParam indexParam = IndexParam.builder()
        .metricType(IndexParam.MetricType.L2)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .fieldName("vector")
        .build();
CreateIndexReq createIndexReq = CreateIndexReq.builder()
        .collectionName("test")
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
```
