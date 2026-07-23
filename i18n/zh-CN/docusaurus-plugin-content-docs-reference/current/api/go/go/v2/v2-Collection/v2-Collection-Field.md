---
title: "Field | Go | v2"
slug: /go/go/v2-Collection-Field
sidebar_label: "Field"
beta: false
added_since: v2.6.x
last_modified: v3.0.0
deprecate_since: false
notebook: false
description: "定义 collection schema 中的字段，包括其数据类型、约束和索引属性。 | Go | v2"
type: docx
token: DPcJdZceFoes0sxeRVKcKhaunq9
sidebar_position: 15
keywords: 
  - Agentic RAG
  - rag llm 架构
  - 私有 llms
  - nn 搜索
  - zilliz
  - zilliz cloud
  - cloud
  - Field
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# Field

定义 collection schema 中的字段，包括其数据类型、约束和索引属性。

```go
type Field struct {
    ID int64
    Name string
    PrimaryKey bool
    AutoID bool
    Description string
    DataType FieldType
    TypeParams map[string]string
    IndexParams map[string]string
    IsDynamic bool
    IsPartitionKey bool
    IsClusteringKey bool
    ElementType FieldType
    DefaultValue *schemapb.ValueField
    Nullable bool
    StructSchema *StructSchema
}
```

## 构造函数\{#constructor}

```go
entity.NewField().
    WithName(name).
    WithDescription(desc).
    WithDataType(dataType).
    WithIsPrimaryKey(isPrimaryKey).
    // ...
```

**构建器方法：**

- `WithName(name string)`

    设置字段名称。

- `WithDescription(desc string)`

    设置字段描述。

- `WithDataType(dataType [FieldType](./v2-Collection-FieldType))`

    设置字段的数据类型（例如，Int64、VarChar、FloatVector）。

- `WithIsPrimaryKey(isPrimaryKey bool)`

    设置此字段是否为主键。

- `WithIsAutoID(isAutoID bool)`

    为此字段启用自动 ID 生成。

- `WithIsDynamic(isDynamic bool)`

    将此字段标记为动态字段。

- `WithIsPartitionKey(isPartitionKey bool)`

    将此字段设置为用于数据路由的分区键。

- `WithIsClusteringKey(isClusteringKey bool)`

    将此字段设置为用于数据组织的聚类键。

- `WithNullable(nullable bool)`

    设置此字段是否允许 null 值。

- `WithDefaultValueBool(defaultValue bool)`

    设置字段的默认值。

- `WithDefaultValueInt(defaultValue int32)`

    设置字段的默认值。

- `WithDefaultValueLong(defaultValue int64)`

    设置字段的默认值。

- `WithDefaultValueFloat(defaultValue float32)`

    设置字段的默认值。

- `WithDefaultValueDouble(defaultValue float64)`

    设置字段的默认值。

- `WithDefaultValueTimestamptz(defaultValue int64)`

    设置字段的默认值。

- `WithDefaultValueString(defaultValue string)`

    设置字段的默认值。

- `WithTypeParams(key string, value string)`

    为字段设置一个类型参数键值对。

- `WithDim(dim int64)`

    设置此字段的 vector 维度。

- `WithMaxLength(maxLen int64)`

    设置 varchar 字段的最大字符长度。

- `WithElementType(eleType [FieldType](./v2-Collection-FieldType))`

    设置数组字段的元素类型。

- `WithMaxCapacity(maxCap int64)`

    设置数组字段的最大容量。

- `WithEnableAnalyzer(enable bool)`

    为此字段启用用于全文搜索的文本分析器。

- `WithAnalyzerParams(params map[string]any)`

    设置用于文本处理的分析器参数。

- `WithMultiAnalyzerParams(params map[string]any)`

    为字段设置多个分析器配置。

- `WithEnableMatch(enable bool)`

    为此字段启用文本匹配。

- `WithStructSchema(schema *StructSchema)`

    为 struct 类型字段设置 struct schema。

- `WithExternalField(externalField string)`

    设置外部数据文件中当前字段映射到的字段名称。

**方法：**

- `GetDim() int64, error`

    获取向量维度。

## 示例\{#example}

```go
import (
    "github.com/milvus-io/milvus/client/v2/entity"
)

// Primary key field
pkField := entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true)

// Vector field
vectorField := entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768)

// Scalar field with max length
varcharField := entity.NewField().
    WithName("category").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(256)
```
