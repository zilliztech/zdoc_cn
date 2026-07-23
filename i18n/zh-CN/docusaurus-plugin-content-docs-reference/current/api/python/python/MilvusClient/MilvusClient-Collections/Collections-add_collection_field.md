---
title: "add_collection_field() | Python | MilvusClient"
slug: /python/python/Collections-add_collection_field
sidebar_label: "add_collection_field()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会向现有 collection 添加新的 scalar field，而无需重新创建该 collection。由于内部 schema 同步，该 field 几乎会立即可用，延迟极低。 | Python | MilvusClient"
type: docx
token: IquldHhyGo9s4IxF3cicOXGnnNf
sidebar_position: 20
keywords: 
  - 多模态 RAG
  - LLM 幻觉
  - 混合搜索
  - 词法搜索
  - zilliz
  - Zilliz Cloud
  - 云
  - add_collection_field()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# add_collection_field()

此操作会向现有 collection 添加新的 scalar field，而无需重新创建该 collection。由于内部 schema 同步，该 field 几乎会立即可用，延迟极低。

<Admonition type="info" icon="📘" title="Notes">

如果 collection 启用了 dynamic field，并且你添加了一个与现有 dynamic field 键同名的 static field，则该 static field 将屏蔽该 dynamic field 键。原始 dynamic 值仍可通过 `$meta['field_name']` 语法访问。

</Admonition>

<Admonition type="info" icon="📘" title="Notes">

这不适用于 external collections。

</Admonition>

## 请求语法\{#request-syntax}

```python
add_collection_field(
    collection_name: str,
    timeout: Optional[float] = None,
    **kwargs
)
```

**参数：**

- **collection_name** *(string)* –

    **[必需]**

    目标 collection 的名称。

- **field_name** *(string)* –

    **[必需]**

    新 field 的名称。

- **data_type** *(DataType)* –

    **[必需]**

    新 field 的数据类型。有关支持的类型，请参见 DataType。

- **desc** *(string, optional)* –

    field 的简要描述。

- **timeout** *(float)* –

    RPC 请求的超时时间（以秒为单位）。如果为 `None`，则调用将无限期等待。

- **kwargs** *(dict, optional)* –

    其他参数包括：

    - **nullable** *(bool)*:

        必须为动态添加的 field 设置为 `True`，以容纳没有该新 field 值的现有实体。

    - **default_value** *(DataType-specific)*:

        如果在数据插入期间未提供值，则用于该 field 的默认值。

    - **max_length** *(int)*:

        `DataType.VARCHAR` field 必需。设置字符串允许的最大字节长度（1 到 65,535）。

    - **element_type** *(DataType)*:

        `DataType.ARRAY` field 必需。指定数组内元素的数据类型。

    - **max_capacity** *(int)*:

        `DataType.ARRAY` field 必需。定义数组中的最大元素数量。

**返回类型：**

*None*

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#examples}

**示例 1：** 添加一个基本的 nullable field

```python
client.add_collection_field(
    collection_name="product_catalog",
    field_name="created_timestamp",
    data_type=DataType.INT64,
    nullable=True  # Required for added fields
)
```

**示例 2：** 添加一个带默认值的 field

```python
client.add_collection_field(
    collection_name="product_catalog",
    field_name="priority_level",
    data_type=DataType.VARCHAR,
    max_length=20,
    nullable=True,          # Required for added fields
    default_value="standard"  # Default value for existing entities
)
```
