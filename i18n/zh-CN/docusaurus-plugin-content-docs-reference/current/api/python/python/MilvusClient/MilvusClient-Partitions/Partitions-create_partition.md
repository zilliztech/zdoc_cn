---
title: "create_partition() | Python | MilvusClient"
slug: /python/python/Partitions-create_partition
sidebar_label: "create_partition()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会在目标 collection 中创建 partition。 | Python | MilvusClient"
type: docx
token: I6hvdlYUuoUaw3xWqSnce4Fin9g
sidebar_position: 1
keywords: 
  - openai vector db
  - 自然语言处理数据库
  - 低成本 vector database
  - 托管 vector database
  - zilliz
  - zilliz cloud
  - cloud
  - create_partition()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_partition()

此操作会在目标 collection 中创建 partition。

<Admonition type="info" icon="📘" title="说明">

这仅适用于托管 collection。

</Admonition>

## 请求语法\{#request-syntax}

```python
create_partition(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None
) -> None
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    现有 collection 的名称。

- **partition_name** (*string*)

    **[必需]**

    要创建的 partition 的名称。

- **timeout** (*float* | *None*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*[Partition](./ORM-Partition)*

**返回：**

一个 partition 对象。

**异常：**

- **MilvusException**

    在此操作期间发生任何错误时将抛出此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Create a partition
client.create_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
)
```

## 相关方法\{#related-methods}

- [drop_partition()](./Partitions-drop_partition)

- [get_partition_stats()](./Partitions-get_partition_stats)

- [has_partition()](./Partitions-has_partition)

- [list_partitions()](./Partitions-list_partitions)

- [load_partitions()](./Partitions-load_partitions)

- [release_partitions()](./Partitions-release_partitions)

