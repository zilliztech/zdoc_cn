---
title: "FieldType | Go | v2"
slug: /go/go/v2-Collection-FieldType
sidebar_label: "FieldType"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "枚举 collection 字段支持的数据类型。 | Go | v2"
type: docx
token: Xq9Ydn3OJoYrHmxMVOLcMn9onHc
sidebar_position: 16
keywords: 
  - IVF
  - knn
  - 图像搜索
  - LLMs
  - zilliz
  - zilliz cloud
  - cloud
  - FieldType
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# FieldType

枚举 collection 字段支持的数据类型。

```go
type FieldType int32
```

**值：**

- **FieldTypeNone** = 0

    未指定类型。

- **FieldTypeBool** = 1

    布尔类型。

- **FieldTypeInt8** = 2

    8 位整数类型。

- **FieldTypeInt16** = 3

    16 位整数类型。

- **FieldTypeInt32** = 4

    32 位整数类型。

- **FieldTypeInt64** = 5

    64 位整数类型。

- **FieldTypeFloat** = 10

    32 位浮点类型。

- **FieldTypeDouble** = 11

    64 位浮点类型。

- **FieldTypeTimestamptz** = 15

    支持时区的时间戳类型。

- **FieldTypeString** = 20

    字符串类型（VarChar 的别名）。

- **FieldTypeVarChar** = 21

    可变长度字符串类型。

- **FieldTypeArray** = 22

    具有固定元素类型的数组类型。

- **FieldTypeJSON** = 23

    JSON 文档类型。

- **FieldTypeGeometry** = 24

    几何空间类型。

- **FieldTypeBinaryVector** = 100

    二进制向量类型。

- **FieldTypeFloatVector** = 101

    32 位浮点向量类型。

- **FieldTypeFloat16Vector** = 102

    16 位浮点向量类型。

- **FieldTypeBFloat16Vector** = 103

    Brain Floating Point 16 位向量类型。

- **FieldTypeSparseVector** = 104

    稀疏向量类型。

- **FieldTypeInt8Vector** = 105

    8 位整数向量类型。

- **FieldTypeStruct** = 201

    具有嵌套字段的结构体类型。

## 示例\{#example}

```go
import (
    "github.com/milvus-io/milvus/client/v2/entity"
)

// Use FieldType when defining collection fields
vectorField := entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768)

pkField := entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true)

varcharField := entity.NewField().
    WithName("category").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(256)
```
