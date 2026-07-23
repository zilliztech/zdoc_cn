---
title: "alter_collection_field() | Python | MilvusClient"
slug: /python/python/Collections-alter_collection_field
sidebar_label: "alter_collection_field()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会更改指定 collection field 的参数。 | Python | MilvusClient"
type: docx
token: JdR3dVpCaoq6s2xSFmsc0e13nnh
sidebar_position: 2
keywords: 
  - 什么是 vector embeddings
  - vector database 教程
  - vector database 如何工作
  - vector db 对比
  - zilliz
  - Zilliz Cloud
  - cloud
  - alter_collection_field()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# alter_collection_field()

此操作会更改指定 collection field 的参数。

## 请求语法\{#request-syntax}

```python
alter_collection_field(
    collection_name: str, 
    field_name: str, 
    field_params: Dict,
    db_name="",
    timeout: Optional[float] = None,
    **kwargs,
)
```

**参数：**

- **collection_name** (*str*) -

    目标 collection 的名称。

- **field_name** (*str*) -

    目标 field 的名称。

- **field_params** (*dict*) -

    要更改的 field 参数。未提及的属性保持不变。可用参数因 field 类型而异。

    - **mmap_enabled** (*bool*) -

        Milvus 是否将 field 数据映射到内存中，而不是完全加载它。有关详细信息，请参阅启用 MMap 的数据存储。

- **timeout** (*Optional[float]*) - 

    此操作的超时时长。

    将其设置为 None 表示此操作在收到任何响应或发生任何错误时超时。

<Admonition type="info" icon="📘" title="注意">

必须在加载 collection 之前更改 field 设置。对已加载 collection 中的 field 进行更改会返回错误。若要更改已加载 collection 的设置，请先释放 collection，更改 field，然后重新加载。

</Admonition>

**返回类型：**

*NoneType*

**返回：**

*None*

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，尤其是指定 alias 不存在时，将引发此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# upsert properties
field_params = {"max_length": 1500}

client.alter_collection_field(
    collection_name="collection_name", 
    field_name="my_varchar",
    field_params=field_params
)
```

