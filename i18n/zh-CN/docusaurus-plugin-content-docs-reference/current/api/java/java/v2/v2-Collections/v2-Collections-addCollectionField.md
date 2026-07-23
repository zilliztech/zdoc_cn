---
title: "addCollectionField() | Java | v2"
slug: /java/java/v2-Collections/v2-Collections-addCollectionField
sidebar_label: "addCollectionField()"
beta: false
added_since: v2.6.x
last_modified: v3.0.1
deprecate_since: false
notebook: false
description: "此操作会向现有 collection 添加新的 scalar 或 vector field，而无需重新创建 collection。现有行没有新 field 的值，因此添加的 vector field 必须可为 null。| Java | v2"
type: docx
token: LaHmdGNGZog0JbxA8amcblpsnDR
sidebar_position: 23
keywords: 
  - milvus 开源
  - milvus 如何工作
  - Zilliz vector database
  - Zilliz database
  - zilliz
  - zilliz cloud
  - cloud
  - addCollectionField()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# addCollectionField()

此操作会向现有 collection 添加新的 scalar 或 vector field，而无需重新创建 collection。现有行没有新 field 的值，因此添加的 vector field 必须可为 null。

```java
public void addCollectionField(AddCollectionFieldReq request)
```

## 请求语法\{#request-syntax}

```java
client.addCollectionField(AddCollectionFieldReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .fieldName(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(Integer maxLength)
    .dimension(Integer dimension)
    .elementType(DataType elementType)
    .maxCapacity(Integer maxCapacity)
    .isNullable(Boolean isNullable)
    .defaultValue(Object defaultValue)
    .enableAnalyzer(Boolean enableAnalyzer)
    .analyzerParams(Map<String, Object> analyzerParams)
    .enableMatch(Boolean enableMatch)
    .typeParams(Map<String, String> typeParams)
    .multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)
    .structFields(List<CreateCollectionReq.FieldSchema> structFields)
    .externalField(String externalField)
    .build()
);
```

**构建器方法：**

- `collectionName(String collectionName)` -

    目标 collection 的名称。

- `databaseName(String databaseName)` -

    database 的名称。如果未指定，则默认为当前 database。

- `fieldName(String fieldName)` -

    要添加的 field 的名称。

- `description(String description)` -

    field 的人类可读描述。

- `dataType(DataType dataType)` -

    field 的数据类型。Scalar、vector、array、JSON 以及 struct 相关的 field 类型遵循创建 collection 时使用的相同 `DataType` 值。

- `maxLength(Integer maxLength)` -

    `DataType.VarChar` field 的最大字符数。除非通过 `typeParams` 提供该值，否则 VarChar field 必须设置此项。

- `dimension(Integer dimension)` -

    vector 维度。对于固定维度的 vector field（例如 `DataType.FloatVector`），此项为必需。

- `elementType(DataType elementType)` -

    array field 的元素类型。

- `maxCapacity(Integer maxCapacity)` -

    array field 中允许的最大元素数。

- `isNullable(Boolean isNullable)` -

    添加的 field 是否接受 `null` 值。对于 v3.0.1 及更高版本，添加到现有 collection 的 vector field 必须将此项设置为 `true`；否则 SDK 会抛出 `MilvusClientException`。

- `defaultValue(Object defaultValue)` -

    添加的 field 的默认值。运行时类型必须与 `dataType` 匹配。

- `enableAnalyzer(Boolean enableAnalyzer)` -

    是否为 `DataType.VarChar` field 启用文本分析。

- `analyzerParams(Map<String, Object> analyzerParams)` -

    VarChar field 的分析器配置，例如分词器和过滤器设置。

- `enableMatch(Boolean enableMatch)` -

    是否为 VarChar field 启用关键词匹配。

- `typeParams(Map<String, String> typeParams)` -

    额外的 field 类型参数。专用构建器方法（例如 `dimension` 或 `maxLength`）会覆盖此 map 中的对应条目。

- `multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)` -

    文本 field 的多语言分析器配置。

- `structFields(List<CreateCollectionReq.FieldSchema> structFields)` -

    struct field 的嵌套 field schema。

- `externalField(String externalField)` -

    当 collection 由外部来源支持时，映射到此 Milvus field 的外部来源 field。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时会抛出此异常，包括添加 vector field 时使用 `isNullable(false)`，或未设置 `isNullable(true)`。

## 示例\{#example}

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddCollectionFieldReq;

// Add a nullable scalar field to an existing collection.
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(100)
        .isNullable(true)
        .build());

// Add a nullable vector field to an existing collection.
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("embedding_v2")
        .dataType(DataType.FloatVector)
        .dimension(128)
        .isNullable(true)
        .build());
```
