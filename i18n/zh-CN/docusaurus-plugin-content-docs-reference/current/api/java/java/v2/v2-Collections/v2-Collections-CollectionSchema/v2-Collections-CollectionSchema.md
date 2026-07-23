---
title: "CollectionSchema | Java | v2"
slug: /java/java/v2-Collections-CollectionSchema
sidebar_label: "CollectionSchema"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "CollectionSchema 实例表示 collection 的 schema。schema 描绘了 collection 的结构。| Java | v2"
type: docx
token: IXVHdXVncoEp64xD6vdcvUJwnlH
sidebar_position: 2
keywords: 
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - CollectionSchema
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# CollectionSchema

**CollectionSchema** 实例表示 collection 的 schema。schema 描绘了 collection 的结构。

```java
io.milvus.v2.service.collection.request.CreateCollectionReq.CollectionSchema
```

## 构造函数\{#constructor}

通过定义字段、数据类型和其他参数来构造 collection 的 schema。

```java
CreateCollectionReq.CollectionSchema.builder()
    .fieldSchemaList(List<CreateCollectionReq.FieldSchema> fieldSchemaList)
    .structFields(List<CreateCollectionReq.StructFieldSchema> structFields)
    .enableDynamicField(boolean enableDynamicField)
    .functionList(List<CreateCollectionReq.Function> functionList)
    .externalSource(String externalSource)
    .externalSpec(JsonObject externalSpec)
    .build();
```

**BUILDER 方法：**

- `fieldSchemaList(List<CreateCollectionReq.FieldSchema> fieldSchemaList)` -

    **[FieldSchema](./v2-Collections-FieldSchema)** 对象列表，用于定义 collection schema 中的字段。field schema 表示并包含单个字段的元数据，而 **CollectionSchema** 将一组 FieldSchema 对象组合在一起，以定义完整的 schema。

- `structFields(List<CreateCollectionReq.StructFieldSchema> structFields)` -

    schema 的 struct 字段（嵌套对象字段）列表。当 collection 包含其值本身为结构化记录的字段时使用此项。

- `enableDynamicField(boolean enableDynamicField)` -

    设置为 `true` 时，会启用隐藏的动态字段 (`$meta`)，以便插入操作可以携带声明的 schema 之外的任意键值属性。默认值：`false`。

- `functionList(List<CreateCollectionReq.Function> functionList)` -

    附加函数（例如 BM25、JSON-path 提取），这些函数在插入时从现有字段派生值。每个 `Function` 都声明其输入、输出和参数。

- `externalSource(String externalSource)` -

    标识绑定到此 collection 的外部源（例如 S3 bucket、Lakehouse 表）。与 `externalSpec` 搭配使用，以定义从 Milvus 外部刷新的外部 collection。

- `externalSpec(JsonObject externalSpec)` -

    外部源的规范 — 通常是描述连接详细信息和刷新策略的 JSON。与 `externalSource` 一起使用。

**返回类型：**

*CollectionSchema*

**返回：**

一个 **CollectionSchema** 对象。

**异常：**

- **MilvusClientExceptions**

    当此操作过程中发生任何错误时，将引发此异常。

## 示例\{#example}

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// define a Collection Schema
CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
// add two fields, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```

## 方法\{#methods}

以下是 `CollectionSchema` 类的方法：
