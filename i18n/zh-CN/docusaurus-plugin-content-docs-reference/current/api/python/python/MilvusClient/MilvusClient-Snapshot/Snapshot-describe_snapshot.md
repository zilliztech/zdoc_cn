---
title: "describe_snapshot() | Python | MilvusClient"
slug: /python/python/Snapshot-describe_snapshot
sidebar_label: "describe_snapshot()"
beta: PRIVATE
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于检索特定 snapshot 的详细元数据，包括源 collection、partition 名称、创建时间戳和存储位置。 | Python | MilvusClient"
type: docx
token: GF0yd9S4RoImivxbIlPcicEynQb
sidebar_position: 2
keywords: 
  - Embedding model
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - zilliz
  - zilliz cloud
  - cloud
  - describe_snapshot()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# describe_snapshot()

此操作用于检索特定 snapshot 的详细元数据，包括源 collection、partition 名称、创建时间戳和存储位置。

## 请求语法\{#request-syntax}

```python
describe_snapshot(
    snapshot_name: str,
    timeout: Optional[float] = None,
    **kwargs
) -> SnapshotInfo
```

**参数：**

- **snapshot_name** (*str*) -
**[必需]**
要描述的 snapshot 的名称。

- **timeout** (*Optional[float]*) -
允许 RPC 执行的可选时长，单位为秒。

**返回类型：**

*SnapshotInfo*

**返回：**

一个包含 snapshot 元数据的 dataclass，字段如下：

```python
{
    'name': str,
    'description': str,
    'collection_name': str,
    'partition_names': List[str],
    'create_ts': int,
    's3_location': str
}
```

**参数：**

- **name** (*str*) - 

    snapshot 名称。

- **description** (*str*) - 

    snapshot 描述。

- **collection_name** (*str*) - 

    源 collection 名称。

- **partition_names** (*List[str]*) - 

    snapshot 中包含的 partition 名称列表。

- **create_ts** (*int*) - 

    创建时间戳，单位为毫秒。

- **s3_location** (*str*) - 

    snapshot 数据的 S3 存储位置。

**异常：**

- **MilvusException**

    如果 snapshot 不存在或操作失败。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

info = client.describe_snapshot(snapshot_name="backup_20260418")
print(f"Snapshot: {info.name}")
print(f"Collection: {info.collection_name}")
print(f"Partitions: {info.partition_names}")
print(f"Created at: {info.create_ts}")
print(f"S3 location: {info.s3_location}")
```
