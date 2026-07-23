---
title: "alter_collection_function() | Python | MilvusClient"
slug: /python/python/Collections-alter_collection_function
sidebar_label: "alter_collection_function()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作通过使用新的 function schema 替换现有 function，来修改 collection 中的现有 function。 | Python | MilvusClient"
type: docx
token: N9d9df9IIojLZDxft1HcU0mkn0b
sidebar_position: 22
keywords: 
  - vector 数据库示例
  - rag vector 数据库
  - 什么是 vector db
  - 什么是 vector 数据库
  - zilliz
  - Zilliz Cloud
  - 云
  - alter_collection_function()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# alter_collection_function()

此操作通过使用新的 function schema 替换现有 function，来修改 collection 中的现有 function。

<Admonition type="info" icon="📘" title="说明">

这不适用于外部 collection。

</Admonition>

## 请求语法\{#request-syntax}

```python
client.alter_collection_function(
    collection_name: str,
    function_name: str,
    function: Function,
    timeout: float = None,
    **kwargs
)
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    collection 的名称。

- **function_name** (*str*) -

    **[必需]**

    要修改的 function 的名称。

- **[function](./MilvusClient-Function)** (*[Function](./MilvusClient-Function)*) -

    **[必需]**

    用于替换现有 function 的新 function schema。

- **timeout** (*float* | *None*) -

    此操作的超时时长。将其设置为 **None** 表示此操作在收到任何响应或发生任何错误时超时。

- **kwargs** (*dict*) -

    可选的其他参数。

**返回类型：**

*NoneType*

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient, Function, FunctionType

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

updated_function = Function(
    name="bm25",
    function_type=FunctionType.BM25,
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
    params={"bm25_k1": 1.5, "bm25_b": 0.75},
)

client.alter_collection_function(
    collection_name="my_collection",
    function_name="bm25",
    function=updated_function,
)
```
