---
title: "CollectionSchema | Python | MilvusClient"
slug: /python/python/MilvusClient-CollectionSchema
sidebar_label: "CollectionSchema"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "CollectionSchema 实例表示 collection 的 schema。schema 勾勒出 collection 的结构。| Python | MilvusClient"
type: docx
token: SSiodq10FoH26hx2HlccfcAgnje
sidebar_position: 2
keywords: 
  - Chroma vector database
  - nlp search
  - hallucinations llm
  - Multimodal search
  - zilliz
  - zilliz cloud
  - cloud
  - CollectionSchema
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# CollectionSchema

**CollectionSchema** 实例表示 collection 的 schema。schema 勾勒出 collection 的结构。

```python
class pymilvus.CollectionSchema
```

## 构造函数\{#constructor}

通过定义字段、数据类型和其他参数来构造 collection 的 schema。

```python
CollectionSchema(
    fields: list,
    description: str
)
```

**参数：**

- **fields** (*list*) -

    **[必需]**

    一个 **[FieldSchema](./ORM-FieldSchema)** 对象列表，用于定义 collection schema 中的字段。

    <Admonition type="info" icon="📘" title="Note">

    什么是 field schema？
    
        field schema 表示并包含单个字段的元数据，而 **CollectionSchema** 将一组 FieldSchema 对象组合在一起，以定义完整的 schema。

    </Admonition>

- **description** (*string*) -

    schema 的描述。

    如果未提供描述，则会将其设置为空字符串。

- **external_source** (*str*) -

    外部源 URI，应为指向可访问外部卷的 `volume://` URI。例如，`volume://<volume-name>/path/to/folder/`..

- **external_spec** (*str*) -

    外部源规范，是一组次要参数：

    - **format** (*str*) - 

        目标源数据文件的格式。

        可能的值为 `parquet`、`vortex`、`lance-table` 和 `iceberg-table`。

    - **snapshot_id** (*str*) -

        Iceberg 表的 ID。仅当 `format` 为 `iceberg-table` 时适用。

- **kwargs** -

    - **auto_id** (*bool*) -

        是否允许主字段自动递增。

        将其设置为 **True** 会使主字段自动递增。在这种情况下，待插入的数据中不应包含主字段，以避免错误。

        此参数不适用于外部 collection。

    - **enable_dynamic_field** (*bool*) -

        如果插入到目标 collection 的数据包含未在 collection 的 schema 中定义的字段，是否允许 Zilliz Cloud 将这些未定义字段的值保存到 dynamic field 中。

        当你将其设置为 **True** 时，Zilliz Cloud 将创建一个名为 **&#36;meta** 的字段，用于存储插入数据中的任何未定义字段及其值。

        此参数不适用于外部 collection。

        <Admonition type="info" icon="📘" title="Note">

        什么是 dynamic field？
        
                如果插入到目标 collection 的数据包含未在 collection 的 schema 中定义的字段，这些字段将以键值对形式保存在 dynamic field 中。

        </Admonition>

    - **primary_field** (*str*) -

        主字段的名称。

        该值应为 **fields** 中列出的某个字段的名称。

        作为替代方案，你可以在创建 **[FieldSchema](./ORM-FieldSchema)** 对象时设置 **is_primary**。

        此参数不适用于外部 collection。

    - **partition_key_field** (*str*) -

        作为 partition key 的字段名称。

        该值应为 **fields** 中列出的某个字段的名称。

        设置此参数会使 Zilliz Cloud 管理当前 collection 中的所有 partition。

        作为替代方案，你可以在创建 **[FieldSchema](./ORM-FieldSchema)** 对象时设置 **is_partition_key**。

        此参数不适用于外部 collection。

        <Admonition type="info" icon="📘" title="Note">

        什么是 partition key？
        
                一旦某个字段被指定为 partition key，Zilliz Cloud 会自动为该字段中的每个唯一值创建一个 partition，并相应地将实体保存到这些 partition 中。
        
                这在基于特定键实现数据隔离时特别有用，例如面向 partition 的多租户。
        
                作为替代方案，你可以在创建 **CollectionSchema** 对象时设置 **partition_key_field**。

        </Admonition>

    - **partition_key_isolation** (*bool*) -

        是否启用 partition key isolation，以进一步提升在 partition key 上进行 scalar 过滤时的搜索性能。详情请参阅[使用 Partition Key Isolation](/docs/use-partition-key#use-partition-key-isolation)。

        此参数不适用于外部 collection。

**返回类型：**

*CollectionSchema*

**返回：**

一个 **CollectionSchema** 对象。

**异常：**

- **FieldsTypeException**: 

    当 **fields** 参数不是列表时，将引发此异常。

- **FieldTypeException**: 

    当 **fields** 列表中的某个字段不是 **[FieldSchema](./ORM-FieldSchema)** 对象时，将引发此异常。

- **PrimaryKeyException:**

    如果出现以下情况，将引发此异常：

    - 已设置 **primary_field** 参数，但其值不是字符串。

    - 已设置 **primary_field** 参数，但其值不是任何已列出字段的名称。

- **PartitionKeyException:**

    如果出现以下情况，将引发此异常：

    - 已设置 **partition_key_field** 参数，但其值不是字符串。

    - 已设置 **partition_key_field** 参数，但其值不是任何已列出字段的名称。

- **AutoIDException:**

    - 如果已设置 **auto_id** 参数但其值不是布尔值，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import CollectionSchema, FieldSchema, DataType

# Define fields in a schema
primary_key = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
)

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768
)

# Construct a schema with the predefined fields
schema = CollectionSchema(
    fields=[primary_key, vector],
    description="example_schema"
)
```

## 方法\{#methods}

以下是 `CollectionSchema` 类的方法：

