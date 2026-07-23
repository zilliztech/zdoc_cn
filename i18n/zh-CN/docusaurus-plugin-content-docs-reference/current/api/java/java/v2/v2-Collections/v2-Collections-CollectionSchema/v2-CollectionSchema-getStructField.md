---
title: "getStructField() | Java | v2"
slug: /java/java/v2-CollectionSchema-getStructField
sidebar_label: "getStructField()"
beta: false
added_since: v2.6.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此 getter 会按名称从 collection schema 中返回 struct field schema。| Java | v2"
type: docx
token: KJSvdrks9o6WOsxr0rZcPXe5ngn
sidebar_position: 7
keywords: 
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - zilliz
  - zilliz cloud
  - cloud
  - getStructField()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getStructField()

此 getter 会按名称从 collection schema 中返回 struct field schema。

```java
public CreateCollectionReq.StructFieldSchema getStructField(String fieldName)
```

**参数：**

- **fieldName** (*String*) -

    struct field 的名称。

**返回值：**

*CreateCollectionReq.StructFieldSchema*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#example}

```java
CollectionSchema schema = CollectionSchema.builder().build();
CreateCollectionReq.StructFieldSchema structField = schema.getStructField("metadata");
```
