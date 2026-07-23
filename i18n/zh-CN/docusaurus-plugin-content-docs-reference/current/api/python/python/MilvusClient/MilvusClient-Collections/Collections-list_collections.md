---
title: "list_collections() | Python | MilvusClient"
slug: /python/python/Collections-list_collections
sidebar_label: "list_collections()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有现有 collection。 | Python | MilvusClient"
type: docx
token: BHyidrVcyoPwxexHLrnceOSAnRe
sidebar_position: 17
keywords: 
  - AI 聊天机器人
  - 余弦距离
  - 什么是向量数据库
  - vectordb
  - zilliz
  - Zilliz Cloud
  - 云
  - list_collections()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_collections()

此操作列出所有现有 collection。

<Admonition type="info" icon="📘" title="Notes">

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
list_collections(**kwargs) -> Name
```

**参数：**

- **kwargs** -

    - **timeout** (*float* | *None*) -

        此操作的超时时长。 

        将其设置为 **None** 表示此操作在任何响应返回或发生错误时超时。

**返回类型：**

*list*

**返回：**

collection 名称列表。

**异常：**

- **MilvusException**

    在此操作过程中发生任何错误时将引发此异常。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. List collections
client.list_collections() 

# ['test_collection']
```

