---
title: "appendRow() | Java | v2"
slug: /java/java/v2-VolumeBulkWriter-appendRow
sidebar_label: "appendRow()"
beta: false
added_since: v2.6.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "验证并向 writer 追加一行。当缓冲数据超过配置的 `chunkSize` 时，writer 会自动提交当前文件。 | Java | v2"
type: docx
token: IBAFdWOAKogmCIxHzVIc4NaDn4g
sidebar_position: 1
keywords: 
  - Vector index
  - 开源 vector database
  - 开源 vector db
  - vector database 示例
  - zilliz
  - Zilliz Cloud
  - cloud
  - appendRow()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# appendRow()

验证并向 writer 追加一行。当缓冲数据超过配置的 `chunkSize` 时，writer 会自动提交当前文件。

[`StructFieldSchema`](./v2-Collections-StructFieldSchema) 字段可以包含 binary、float16、bfloat16 和 int8 vector 值。

```java
public void appendRow(JsonObject rowData)
```

**返回：**

*void*

此操作不返回值。

**异常：**

- **Exception**

    当请求验证、传输或服务器执行失败时抛出。请查看异常消息以了解确切的失败原因。

## 示例\{#example}

```java
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.addProperty("title", "Dune");
writer.appendRow(row);
```
