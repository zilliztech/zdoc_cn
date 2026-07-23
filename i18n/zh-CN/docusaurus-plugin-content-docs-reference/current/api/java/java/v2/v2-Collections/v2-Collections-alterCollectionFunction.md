---
title: "alterCollectionFunction() | Java | v2"
slug: /java/java/v2-Collections-alterCollectionFunction
sidebar_label: "alterCollectionFunction()"
beta: false
added_since: v2.6.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作通过用新的 function 定义替换现有 function，来更改 collection 中的现有 function。 | Java | v2"
type: docx
token: A6Vld2dJToRXs8xhq0wcGdiRnDc
sidebar_position: 31
keywords: 
  - Embedding 模型
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - zilliz
  - zilliz cloud
  - cloud
  - alterCollectionFunction()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# alterCollectionFunction()

此操作通过用新的 function 定义替换现有 function，来更改 collection 中的现有 function。

```java
public void alterCollectionFunction(AlterCollectionFunctionReq request)
```

## 请求语法\{#request-syntax}

```java
alterCollectionFunction(AlterCollectionFunctionReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .function(CreateCollectionReq.Function function)
    .build()
);
```

**BUILDER 方法：**

- `collectionName(String collectionName)` -

    **[必需]**

    collection 的名称。

- `databaseName(String databaseName)` -

    database 的名称。如果未指定，则默认为当前 database。

- `function(CreateCollectionReq.Function function)` -

    **[必需]**

    用于替换现有 function 的新 function 定义。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.collection.request.AlterCollectionFunctionReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.common.clientenum.FunctionType;

CreateCollectionReq.Function updatedFunc = CreateCollectionReq.Function.builder()
    .name("bm25")
    .functionType(FunctionType.BM25)
    .inputFieldNames(Arrays.asList("text"))
    .outputFieldNames(Arrays.asList("sparse_vector"))
    .param("bm25_k1", "1.5")
    .param("bm25_b", "0.75")
    .build();

client.alterCollectionFunction(AlterCollectionFunctionReq.builder()
    .collectionName("my_collection")
    .function(updatedFunc)
    .build());
```
