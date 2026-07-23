---
title: "listAliases() | Java | v2"
slug: /java/java/v2-Collections-listAliases
sidebar_label: "listAliases()"
beta: false
added_since: v2.3.x
last_modified: v2.5.x
deprecate_since: false
notebook: false
description: "此操作会列出特定 collection 的所有现有别名。| Java | v2"
type: docx
token: X6JXdPN7IoRffJxnaZccBvRanIM
sidebar_position: 19
keywords: 
  - Milvus vector db
  - Zilliz Cloud
  - 什么是 Milvus
  - Milvus database
  - zilliz
  - zilliz cloud
  - 云
  - listAliases()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# listAliases()

此操作会列出特定 collection 的所有现有别名。

```java
public ListAliasResp listAliases()
```

## 请求语法\{#request-syntax}

```java
MilvusClientV2.listAliases(ListAliasesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build();
)
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    目标 collection 所属数据库的名称。

- `collectionName(String collectionName)`

    此操作的目标 collection 的名称。

**返回类型：**

*ListAliasResp*

**返回：**

一个 **ListAliasResp** 对象，其中包含指定 collection 的别名列表。如果该 collection 没有别名，则会返回一个空列表。

**参数：**

- **alias** (*List\<String\>*)

    包含别名的字符串列表。

- **collectionName** (*String*)

    collection 的名称。

**异常：**

- **MilvusClientExceptions**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.ListAliasesReq;
import io.milvus.v2.service.utility.response.ListAliasResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List aliases
ListAliasesReq listAliasesReq = ListAliasesReq.builder()
        .databaseName("my_database")
        .collectionName("my_collection")
        .build();
ListAliasResp listAliasResp = client.listAliases(listAliasesReq);
```
