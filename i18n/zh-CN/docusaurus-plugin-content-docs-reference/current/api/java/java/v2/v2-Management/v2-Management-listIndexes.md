---
title: "listIndexes() | Java | v2"
slug: /java/java/v2-Management-listIndexes
sidebar_label: "listIndexes()"
beta: false
added_since: v2.4.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作列出特定集合中某个字段的索引。 | Java | v2"
type: docx
token: LxwIdeFiGoYaRAxKS72cdjNkneh
sidebar_position: 12
keywords: 
  - AI 幻觉
  - AI Agent
  - 语义搜索
  - 异常检测
  - zilliz
  - Zilliz Cloud
  - cloud
  - listIndexes()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# listIndexes()

此操作列出特定集合中某个字段的索引。

```java
public List<String> listIndexes(ListIndexesReq request)
```

## 请求语法\{#request-syntax}

```java
listIndexes(ListIndexesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .build()
)
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    目标集合所属的数据库名称。

- `collectionName(String collectionName)`

    集合的名称。

- `fieldName(String fieldName)`

    目标字段的名称。

**返回：**

*List&lt;String&gt;*

**异常：**

- **MilvusClientExceptions**

    在此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.ListIndexesReq;

// 1. 设置客户端
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. 列出 `test` 集合中 `varchar` 字段上的索引
ListIndexesReq listIndexesReq = ListIndexesReq.builder()
        .collectionName("test")
        .fieldName("varchar")
        .build();
        
List<String> indexes = client.listIndexes(ListIndexesReq);
```

