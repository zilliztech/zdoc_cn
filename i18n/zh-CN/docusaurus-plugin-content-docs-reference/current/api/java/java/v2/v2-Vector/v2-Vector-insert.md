---
title: "insert() | Java | v2"
slug: /java/java/v2-Vector-insert
sidebar_label: "insert()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "对 auto-ID 字段、函数输出字段、动态字段和 Struct 值的插入行验证逻辑保持一致。 | Java | v2"
type: docx
token: DKs7dzHI5oaJvlxezuAcuMVzn9c
sidebar_position: 4
keywords: 
  - Chroma 与 Milvus
  - Annoy vector 搜索
  - milvus
  - Zilliz
  - zilliz
  - Zilliz Cloud
  - cloud
  - insert()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# insert()

对 auto-ID 字段、函数输出字段、动态字段和 Struct 值的插入行验证逻辑保持一致。

```java
public InsertResp insert(InsertReq request)
```

## 请求语法\{#request-syntax}

```java
InsertReq.builder()
    .data(data)
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .build();
```

**构建器方法：**

- `data(List<JsonObject> data)`

    要插入的行。字段名称和值必须符合 collection schema。

- `databaseName(String databaseName)`

    database 的名称。省略时默认为当前 database。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `partitionName(String partitionName)`

    目标 partition 的名称。

**返回：**

*InsertResp*

包含已插入实体的数量以及适用时生成的主键。

**异常：**

- **MilvusClientException**

    当请求验证、传输或服务器执行失败时抛出。请查看异常消息以了解确切的失败原因。

## 示例\{#example}

演示如何使用经审核的 v3.0.x API 调用 insert()。

```java
InsertResp response = client.insert(InsertReq.builder()
    .collectionName("books")
    .data(rows)
    .build());
```
