---
title: "drop_collection_properties() | Python | MilvusClient"
slug: /python/python/Collections-drop_collection_properties
sidebar_label: "drop_collection_properties()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会删除指定的 collection 属性。 | Python | MilvusClient"
type: docx
token: HTnvdQ8SbodURtxPEv5cURL0n5b
sidebar_position: 12
keywords: 
  - 多模态 vector database 检索
  - 检索增强生成
  - 大语言模型
  - Vectorization
  - zilliz
  - zilliz cloud
  - cloud
  - drop_collection_properties()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# drop_collection_properties()

此操作会删除指定的 collection 属性。

<Admonition type="info" icon="📘" title="Notes">

这不适用于外部 collection。

</Admonition>

## 请求语法\{#request-syntax}

```python
drop_collection_properties(
    self,
    collection_name: str,
    property_keys: List[str],
    timeout: Optional[float] = None,
    **kwargs,
)
```

**参数：**

- **collection_name** (*str*) -

    目标 collection 的名称。

- **property_keys** (*List[str]*) -

    要删除的属性名称列表。可能的取值如下：

    - `collection.ttl.seconds`

    - `ttl_field`

    - `mmap.enabled`

    - `partitionkey.isolation`

- **timeout** (*Optional[float]*) - 

    此操作的超时时长。

    将其设置为 None 表示此操作在收到任何响应或发生任何错误时超时。

**返回类型：**

*NoneType*

**返回：**

*None*

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，尤其是指定的别名不存在时，将引发此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# upsert properties
properties = {"collection.ttl.seconds": 500, "mmap.enabled": true}

client.drop_collection_properties(
    collection_name="collection_name", 
    property_keys=property_keys
)
```

