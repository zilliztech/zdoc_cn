---
title: "add_field() | Python | MilvusClient"
slug: /python/python/StructFieldSchema-add_field
sidebar_label: "add_field()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作向 structs 数组字段中 struct 元素的 schema 添加字段。| Python | MilvusClient"
type: docx
token: Up73d8d78oPM2FxkvlIcuxeBn9g
sidebar_position: 1
keywords: 
  - 什么是 milvus
  - milvus 数据库
  - milvus lite
  - milvus benchmark
  - zilliz
  - zilliz cloud
  - cloud
  - add_field()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# add_field()

此操作向 structs 数组字段中 struct 元素的 schema 添加字段。

## 请求语法\{#request-syntax}

```python
add_field(
    field_name: str,
    datatype: DataType
)
```

**参数：**

- **field_name** (*string*) - 

    **[必需]**

    字段名称。

- **[datatype](./Collections-DataType)** (*[DataType](./Collections-DataType)*) - 

    **[必需]**

    字段的数据类型。

    为不同字段选择数据类型时，可以从以下选项中选择。有关详细信息，请参阅 [Struct 数组](/docs/use-array-of-structs)。

- **max_length** (*int*) -

    允许插入的字符串的最大字节长度。请注意，多字节字符（例如 Unicode 字符）每个可能占用多个字节，因此请确保插入字符串的字节长度不超过指定限制。取值范围：[1, 65,535]。

    对于 **DataType.VARCHAR** 字段，此参数为必需。

- **dim** (*int*) -

    vector embeddings 的维度。该值应为大于 1 的整数。

- **mmap_enabled** (*bool*) -

    Milvus 是否将字段数据映射到内存中，而不是完全加载它。有关详细设置，请参阅启用 MMap 的数据存储。

**返回类型：**

*[StructFieldSchema](./MilvusClient-StructFieldSchema)*

**返回：**

**[StructFieldSchema](./MilvusClient-StructFieldSchema)** 对象包含已添加到 schema 的字段。

**异常：**

- **MilvusException**

    在此操作过程中发生任何错误时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import DataType, FieldSchema, StructFieldSchema

schema = StructFieldSchema(
    name="struct_schema",
    fields=[vector, varchar]
)

# Add the vector field
schema.add_field(
    field_name="vector_02",
    datatype=DataType.FLOAT_VECTOR,
    dim=768
)

# Add a scalar field to the schema
schema.add_field(
    field_name="scalar_01",
    datatype=DataType.INT32
)
```
