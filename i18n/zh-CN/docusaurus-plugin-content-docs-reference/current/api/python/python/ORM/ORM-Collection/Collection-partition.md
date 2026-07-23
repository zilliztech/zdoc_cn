---
title: "partition() | Python | ORM"
slug: /python/python/Collection-partition
sidebar_label: "partition()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取当前 collection 中的指定 partition。| Python | ORM"
type: docx
token: SvCrdEJIdosGQYxQZhrc2OAXnpd
sidebar_position: 21
keywords: 
  - LLM 幻觉
  - 多模态搜索
  - vector 搜索算法
  - 问答系统
  - zilliz
  - Zilliz Cloud
  - 云
  - partition()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# partition()

此操作用于获取当前 collection 中的指定 partition。

## 请求语法\{#request-syntax}

```python
partition(
    partition_name: str
)
```

**参数：**

- **partition_name** (*str*) -

    **[必需]**

    要获取的 partition 的名称。

**返回类型：**

*Partition* | *NoneType*

**返回：**

一个 **Partition** 对象。如果当前 collection 中没有指定名称的 partition，则返回 **None**。

**异常：**

- **MilvusException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Create a partition
partition = collection.partition(partition_name="test_partition")
```

## 相关操作\{#related-operations}

以下操作与 `partition()` 相关：

- [Collection](./ORM-Collection)

- [Partition](./ORM-Partition)

- [create_partition()](./Collection-create_partition)

- [drop_partition()](./Collection-drop_partition)

- [has_partition()](./Collection-has_partition)

