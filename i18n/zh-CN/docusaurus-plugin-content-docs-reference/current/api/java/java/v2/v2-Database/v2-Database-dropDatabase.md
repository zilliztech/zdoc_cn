---
title: "dropDatabase() | Java | v2"
slug: /java/java/v2-Database-dropDatabase
sidebar_label: "dropDatabase()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除具有指定名称的数据库。 | Java | v2"
type: docx
token: LwqSdN6s5oZBhAxzQsxcnXswnah
sidebar_position: 4
keywords: 
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - zilliz
  - zilliz cloud
  - cloud
  - dropDatabase()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# dropDatabase()

此操作会删除具有指定名称的数据库。

```java
public void dropDatabase(DropDatabaseReq request)
```

## 请求语法\{#request-syntax}

```java
dropDatabase(DropDatabaseReq.builder()
    .databaseName(String databaseName)
    .build()
)
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    要删除的数据库名称。

**返回：**

*void*

**异常：**

- **MilvusClientExceptions**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.database.request.DropDatabaseReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop a database
DropDatabaseReq dropDatabaseReq = DropDatabaseReq.builder()
        .databaseName(databaseName)
        .build();
client.dropDatabase(dropDatabaseReq);
```

