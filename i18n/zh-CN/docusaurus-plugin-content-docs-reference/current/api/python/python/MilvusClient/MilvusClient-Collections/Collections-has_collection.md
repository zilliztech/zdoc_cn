---
title: "has_collection() | Python | MilvusClient"
slug: /python/python/Collections-has_collection
sidebar_label: "has_collection()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作检查特定 collection 是否存在。 | Python | MilvusClient"
type: docx
token: SSQ6dFGdxouy7hxRwCOcatnEn0e
sidebar_position: 14
keywords: 
  - Pinecone vector database
  - 音频搜索
  - 什么是语义搜索
  - Embedding model
  - zilliz
  - zilliz cloud
  - cloud
  - has_collection()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# has_collection()

此操作检查特定 collection 是否存在。

<Admonition type="info" icon="📘" title="说明">

此方法适用于 dedicated serving cluster 和 on-demand compute。

- 对于 serving cluster 中的 collection，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于 on-demand compute 中的 collection，请使用 project endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
has_collection(
    collection_name: str,
    timeout: Optional[float] = None
) -> Bool
```

**参数：**

- **collection_name** (*str*) -

    **[必填]**

    collection 的名称。

- **timeout** (*float* | *None*) -

    此操作的超时时长。

    将其设置为 **None** 表示此操作会在收到任何响应或发生错误时超时。

**返回类型：**

*bool*

**返回：**

一个布尔值，指示指定的 collection 是否存在。

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Check whether a collection named `test_collection` exists
client.has_collection(collection_name="test_collection") 

# True

# 4. Check whether a collection named `test_collection_2` exists
client.has_collection(collection_name="test_collection_2") 

# False
```

