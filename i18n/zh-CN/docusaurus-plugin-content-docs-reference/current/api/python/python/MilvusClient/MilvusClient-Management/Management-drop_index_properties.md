---
title: "drop_index_properties() | Python | MilvusClient"
slug: /python/python/Management-drop_index_properties
sidebar_label: "drop_index_properties()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除指定的 index 属性。 | Python | MilvusClient"
type: docx
token: M2kXd5zWSoMIOnxXWamcgCkznih
sidebar_position: 15
keywords: 
  - milvus benchmark
  - managed milvus
  - Serverless vector database
  - milvus open source
  - zilliz
  - zilliz cloud
  - cloud
  - drop_index_properties()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# drop_index_properties()

此操作会删除指定的 index 属性。

<Admonition type="info" icon="📘" title="说明">

此方法仅适用于 dedicated serving cluster 和 on-demand compute。 

- 若要在 serving cluster 的 collection 中执行此操作，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 若要在用于 on-demand compute 的 collection 中执行此操作，请使用 project endpoints 创建 **[MilvusClient](./Client-MilvusClient)**，然后创建一个 session 以附加到 on-demand cluster 进行搜索。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
drop_index_properties(
    self,
    collection_name: str,
    index_name: str,
    property_keys: List[str],
    timeout: Optional[float] = None,
    **kwargs,
)
```

**参数：**

- **collection_name** (*str*) -

    目标 collection 的名称。

- **index_name** (*str*) -

    要删除的 index 文件名称。

- **property_keys** (*List[str]*) -

    要删除的属性名称列表。可用属性如下：

    - `mmap.enabled`

- **timeout** (*Optional[float]*) - 

    此操作的超时时长。

    将其设置为 None 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

client.drop_index_properties(
    collection_name="collection_name",
    index_name="my_vector", 
    property_keys = ["mmap.enabled"]
)
```

