---
title: "addCollectionFunction() | Java | v2"
slug: /java/java/v2-Collections-addCollectionFunction
sidebar_label: "addCollectionFunction()"
beta: false
added_since: v2.6.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作向集合添加一个函数。函数允许你定义自定义处理逻辑，例如 BM25 评分或嵌入生成。 | Java | v2"
type: docx
token: AIRDdrhZloIQCrxCfc8cvxe4nmh
sidebar_position: 30
keywords: 
  - sentence transformers
  - 推荐系统
  - 信息检索
  - 降维
  - zilliz
  - zilliz cloud
  - cloud
  - addCollectionFunction()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# addCollectionFunction()

此操作向集合添加一个函数。函数允许你定义自定义处理逻辑，例如 BM25 评分或嵌入生成。

```java
public void addCollectionFunction(AddCollectionFunctionReq request)
```

## 请求语法\{#request-syntax}

```java
addCollectionFunction(AddCollectionFunctionReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .function(CreateCollectionReq.Function function)
    .build()
);
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

    **[必需]**

    集合的名称。

- `databaseName(String databaseName)` -

    数据库的名称。如果未指定，则默认为当前数据库。

- `function(CreateCollectionReq.Function function)` -

    **[必需]**

    要添加的函数。使用 `CreateCollectionReq.Function.builder()` 通过 name、description、functionType、inputFieldNames、outputFieldNames 和 params 来构造它。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.collection.request.AddCollectionFunctionReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.common.clientenum.FunctionType;

CreateCollectionReq.Function bm25Func = CreateCollectionReq.Function.builder()
    .name("bm25")
    .functionType(FunctionType.BM25)
    .inputFieldNames(Arrays.asList("text"))
    .outputFieldNames(Arrays.asList("sparse_vector"))
    .build();

client.addCollectionFunction(AddCollectionFunctionReq.builder()
    .collectionName("my_collection")
    .function(bm25Func)
    .build());
```
