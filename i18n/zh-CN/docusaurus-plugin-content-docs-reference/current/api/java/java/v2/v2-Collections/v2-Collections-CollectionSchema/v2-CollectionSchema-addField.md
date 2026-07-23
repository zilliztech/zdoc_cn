---
title: "addField() | Java | v2"
slug: /java/java/v2-CollectionSchema-addField
sidebar_label: "addField()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作向 collection 的 schema 添加一个字段。 | Java | v2"
type: docx
token: XB9idvIRPo2fEix50dvcAsQHnCg
sidebar_position: 1
keywords: 
  - 图像搜索
  - LLMs
  - 机器学习
  - RAG
  - zilliz
  - zilliz cloud
  - cloud
  - addField()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# addField()

此操作向 collection 的 schema 添加一个字段。

```java
public void addField(AddFieldReq addFieldReq)
```

## 请求语法\{#request-syntax}

```java
CollectionSchema.addField(AddFieldReq.builder()
    .fieldName(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(Integer maxLength)
    .isPrimaryKey(Boolean isPrimaryKey)
    .isPartitionKey(Boolean isPartitionKey)
    .autoID(Boolean autoID)
    .dimension(int dimension)
    .elementType(DataType elementType)
    .maxCapacity(Integer maxCapacity)
    .isNullable(Boolean isNullable)
    .defaultValue(DataType dataType)
    .enableAnalyzer(Boolean enableAnalyzer)
    .enableMatch(Boolean enableMatch)
    .analyzerParams(Map<String, Object> analyzerParams)
    .typeParams(Map<String, String> typeParams)
    .multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)
    .structFields(List<CreateCollectionReq.FieldSchema> structFields)
    .externalField(String externalField)
    .build()
)
```

**BUILDER 方法：**

- `fieldName(String fieldName)` -

    字段的名称。

- `description(String description)` -

    字段的描述。

- `dataType(DataType dataType)` -

    字段的数据类型。

    为不同字段选择数据类型时，可以从以下选项中选择。

- `maxLength(Integer maxLength)` -

    值应包含的最大字符数。

    如果此字段的 **[dataType](./v2-Collections-DataType)** 设置为 **DataType.VarChar**，则此项为必填。

- `isPrimaryKey(Boolean isPrimaryKey)` -

    当前字段是否为主字段。

    将其设置为 **True** 会使当前字段成为主字段。

- `isPartitionKey(Boolean isPartitionKey)` -

    当前字段是否为 partitionKey 字段。

    将其设置为 **True** 会使当前字段成为 partition key。

- `autoID(Boolean autoID)` -

    是否允许主字段自动递增。

    将其设置为 **True** 会使主字段自动递增。在这种情况下，主字段不应包含在要插入的数据中，以避免错误。

    在 **isPrimaryKey** 设置为 **True** 的字段中设置此参数。

- `dimension(int dimension)` -

    vector 字段的维度。该值应大于 1，通常由所使用的 embedding model 决定。

    如果此字段的 **[dataType](./v2-Collections-DataType)** 设置为 **DataType.FloatVector**，则此项为必填。

- `elementType(DataType elementType)` -

    array 字段中元素的数据类型。

    如果此字段的 **[dataType](./v2-Collections-DataType)** 设置为 **DataType.Array**，则此项为必填。

- `maxCapacity(Integer maxCapacity)` -

    array 字段可包含的最大元素数量。

    如果此字段的 **[dataType](./v2-Collections-DataType)** 设置为 **DataType.Array**，则此项为必填。

- `isNullable(Boolean isNullable)` -

    一个 Boolean 参数，用于指定字段是否可以接受 null 值。

    更多信息，请参阅 Nullable & Default。

- `defaultValue(DataType dataType)` -

    在创建 collection schema 时为其中的特定字段设置默认值。当你希望某些字段即使在数据插入期间未显式提供值也具有初始值时，这尤其有用。

- `enableAnalyzer(Boolean enableAnalyzer)` -

    是否为指定的 `VARCHAR` 字段启用文本分析。设置为 `true` 时，它会指示 Milvus 使用文本分析器，对字段的文本内容进行分词和过滤。

- `enableMatch(Boolean enableMatch)` -

    是否为指定的 `VARCHAR` 字段启用关键词匹配。设置为 `true` 时，Milvus 会为该字段创建 inverted index，从而实现快速高效的关键词查找。`enableMatch` 与 `enableAnalyzer` 结合使用，以提供结构化的基于词项的文本搜索。

- `analyzerParams(Map<String, Object> analyzerParams)` -

    配置用于文本处理的 analyzer，专用于 `DataType.VarChar` 字段。此参数配置 tokenizer 和 filter 设置，尤其适用于关键词匹配或全文搜索中使用的文本字段。

- `typeParams(Map<String, String> typeParams)` -

    要添加的当前字段的数据类型特定参数。例如，你可以为 `VarChar` 字段设置 `maxLength`。一旦指定，它将覆盖上面指定的相应参数值。

- `multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)` -

    一个多语言 analyzer，允许你为文本字段配置多个 analyzer，并在该文本字段中存储多语言文档。

- `structFields(List<CreateCollectionReq.FieldSchema> structFields)` -

    Array of Structs 字段中的字段列表。

    如果此字段的 **[dataType](./v2-Collections-DataType)** 设置为 **DataType.Array**，并且此字段的 **elementType** 设置为 **DataType.Struct**，则此项为必填。

- `externalField(String externalField)` -

    此 Milvus 字段映射到的外部字段名称。与 `CollectionSchema` 上的 `externalSource` 和 `externalSpec` 一起使用，用于声明由外部数据源支持的 collection。外部字段的值会在刷新时拉取到此 Milvus 字段中。

**返回：**

*void*

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
// add two fields, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(128).build());
```
