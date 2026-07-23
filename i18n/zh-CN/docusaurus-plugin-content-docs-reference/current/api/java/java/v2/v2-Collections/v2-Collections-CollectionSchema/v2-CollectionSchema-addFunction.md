---
title: "addFunction() | Java | v2"
slug: /java/java/v2-CollectionSchema-addFunction
sidebar_label: "addFunction()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会添加一个函数，用于将原始数据转换为向量表示。 | Java | v2"
type: docx
token: WI76dwejQosQWcxuhkccHOl7nXf
sidebar_position: 4
keywords: 
  - IVF
  - knn
  - 图像搜索
  - LLMs
  - zilliz
  - Zilliz Cloud
  - cloud
  - addFunction()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# addFunction()

此操作会添加一个函数，用于将原始数据转换为向量表示。

```java
public CollectionSchema addFunction(Function function)
```

## 请求语法\{#request-syntax}

```java
addFunction(Function.builder()
        .functionType(FunctionType functionType)
        .name(String name)
        .inputFieldNames(List<String> inputFieldNames)
        .outputFieldNames(List<String> outputFieldNames)
        .description(String description)
        .build());
```

**BUILDER 方法：**

- `functionType(FunctionType functionType)`

    用于处理原始数据的函数类型。可选值：

    - `FunctionType.BM25`：使用 BM25 算法从 `VARCHAR` 字段生成稀疏嵌入。

- `name(String name)`

    函数的名称。此标识符用于在查询和 collection 中引用该函数。

- `inputFieldNames(List<String> inputFieldNames)`

    包含需要转换为向量表示的原始数据的字段名称。对于使用 `FunctionType.BM25` 的函数，此参数仅接受一个字段名称。

- `outputFieldNames(List<String> outputFieldNames)`

    用于存储生成的嵌入的字段名称。该字段应对应于 collection schema 中定义的向量字段。对于使用 `FunctionType.BM25` 的函数，此参数仅接受一个字段名称。

- `description(String description)`

    函数用途的简要描述。这对于大型项目中的文档或清晰说明很有用，默认值为空字符串。

**返回类型：**

*Function*

**返回：**

一个 `Function` 对象

**异常：**

- **MilvusClientExceptions**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

import java.util.Collections;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25_emb")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("vector"))
        .build());
```
