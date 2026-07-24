---
title: "dropCollectionFunction() | Java | v2"
slug: /java/java/v2-Collections-dropCollectionFunction
sidebar_label: "dropCollectionFunction()"
beta: false
added_since: v2.6.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "从现有集合中移除函数定义，而不移除其输出字段。使用 `dropFunctionField()` 可同时移除两者。 | Java | v2"
type: docx
token: K0wedJ57uoHCyXxOFtNc673tnuA
sidebar_position: 33
keywords: 
  - milvus vector database
  - milvus db
  - milvus vector db
  - Zilliz Cloud
  - zilliz
  - zilliz cloud
  - cloud
  - dropCollectionFunction()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# dropCollectionFunction()

从现有集合中移除函数定义，而不移除其输出字段。使用 [`dropFunctionField()`](./v2-Collections-dropFunctionField) 可同时移除两者。

```java
public void dropCollectionFunction(DropCollectionFunctionReq request)
```

## 请求语法\{#request-syntax}

```java
DropCollectionFunctionReq.builder()
    .collectionName(collectionName)
    .databaseName(databaseName)
    .functionName(functionName)
    .build();
```

**构建器方法：**

- `collectionName(String collectionName)`

    目标集合的名称。

- `databaseName(String databaseName)`

    数据库的名称。省略时默认为当前数据库。

- `functionName(String functionName)`

    要移除的函数定义的名称。

**返回：**

*void*

此操作不返回任何值。

**异常：**

- **MilvusClientException**

    当请求验证、传输或服务器执行失败时抛出。请检查异常消息以了解确切的失败原因。

## 示例\{#example}

```java
client.dropCollectionFunction(DropCollectionFunctionReq.builder()
    .collectionName("books")
    .functionName("bm25")
    .build());
```
