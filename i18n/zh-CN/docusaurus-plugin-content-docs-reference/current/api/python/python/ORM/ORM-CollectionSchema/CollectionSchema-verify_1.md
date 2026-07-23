---
title: "verify() | Python | ORM"
slug: /python/python/CollectionSchema-verify_1
sidebar_label: "verify()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作对 CollectionSchema 执行最终验证检查，以检测任何明显问题。| Python | ORM"
type: docx
token: KSECdBDcUoIkL7xI4KOc29Ukn1g
sidebar_position: 5
keywords: 
  - 多模态搜索
  - vector 搜索算法
  - 问答系统
  - llm-as-a-judge
  - zilliz
  - Zilliz Cloud
  - 云
  - verify()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# verify()

此操作对 CollectionSchema 执行最终验证检查，以检测任何明显问题。

## 请求语法\{#request-syntax}

```python
verify()
```

**参数：**

无

**返回类型：**

无

**返回：**

无

**异常：**

- **MilvusException**

    在此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import CollectionSchema, FieldSchema, DataType  

# Create field schemas
primary_key = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
)

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768,
)

# Create a CollectionSchema with field schemas

schema = CollectionSchema(
    fields = [primary_key, vector]
)

# Call verify() to validate the schema 
schema.verify()
```

