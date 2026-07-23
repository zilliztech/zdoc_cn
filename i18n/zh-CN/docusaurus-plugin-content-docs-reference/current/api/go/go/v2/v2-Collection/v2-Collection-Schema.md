---
title: "Schema | Go | v2"
slug: /go/go/v2-Collection-Schema
sidebar_label: "Schema"
beta: false
added_since: v2.6.x
last_modified: v3.0.0
deprecate_since: false
notebook: false
description: "表示 collection 的 schema，包括 field 定义、函数和动态 field 设置。| Go | v2"
type: docx
token: Du2ZdjCWIorDg4xdwercNnYgnJb
sidebar_position: 23
keywords: 
  - 密集嵌入
  - Faiss 向量数据库
  - Chroma 向量数据库
  - NLP 搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - Schema
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# Schema

表示 collection 的 schema，包括 field 定义、函数和动态 field 设置。

```go
type Schema struct {
    CollectionName string
    Description string
    AutoID bool
    Fields []*Field
    EnableDynamicField bool
    Functions []*Function
}
```

## 构造函数\{#constructor}

```go
entity.NewSchema().
    WithName(name).
    WithDescription(desc).
    WithAutoID(autoID).
    WithDynamicFieldEnabled(dynamicEnabled).
    // ...
```

**构建器方法：**

- `WithName(name string)`

    设置 schema 的名称值，并返回 schema 本身。

- `WithExternalSource(externalSource string)`

    设置源数据 URI，该 URI 应为可访问外部卷的名称。

- `WithExternalSpec(externalSpec string)`

    外部源规范，是一组次级参数：

    - **format** (*string*) - 

        目标源数据文件的格式。

        可能的值为 `parquet`、`vortex`、`lance-table` 和 `iceberg-table`。

- `WithDescription(desc string)`

    设置 schema 的描述值，并返回 schema 本身。

- `WithAutoID(autoID bool)`

    为 collection 启用或禁用自动 ID 生成。这不适用于外部 collections。

- `WithDynamicFieldEnabled(dynamicEnabled bool)`

    启用或禁用动态 field 支持，以便进行灵活的数据插入。

- `WithField(f *[Field](./v2-Collection-Field))`

    向 schema 添加一个 field，并返回 schema 本身。

- `WithFunction(f *[Function](./v2-Collection-Function))`

    向 schema 添加函数定义（例如 BM25、文本嵌入）。这不适用于外部 collections。

**方法：**

- `PKFieldName() string`

    PKFieldName 返回此 schemapb 的 pk field 名称。

- `PKField() *[Field`](./v2-Collection-Field)

    PKField 返回此 schema 的 PK Field schema。

## 示例\{#example}

```go
import (
    "github.com/milvus-io/milvus/client/v2/entity"
)

schema := entity.NewSchema().
    WithName("my_collection").
    WithField(entity.NewField().
        WithName("id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true)).
    WithField(entity.NewField().
        WithName("embedding").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(768))
```
