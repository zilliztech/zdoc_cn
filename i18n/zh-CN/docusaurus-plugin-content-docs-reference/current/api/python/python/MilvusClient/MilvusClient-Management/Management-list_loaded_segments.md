---
title: "list_loaded_segments() | Python | MilvusClient"
slug: /python/python/Management-list_loaded_segments
sidebar_label: "list_loaded_segments()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会列出 collection 当前所有已加载的 segments，包括行数、排序状态、存储级别和内存大小等信息。 | Python | MilvusClient"
type: docx
token: QWlfd7SO1ojpdHxM968coTYQnYg
sidebar_position: 24
keywords: 
  - DiskANN
  - Sparse vector
  - Vector 维度
  - ANN Search
  - zilliz
  - Zilliz Cloud
  - cloud
  - list_loaded_segments()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_loaded_segments()

此操作会列出 collection 当前所有已加载的 segments，包括行数、排序状态、存储级别和内存大小等信息。

<Admonition type="info" icon="📘" title="注意">

此操作仅适用于托管 collection。

</Admonition>

## 请求语法\{#request-syntax}

```python
client.list_loaded_segments(
    collection_name: str,
    timeout: float = None
) -> List[LoadedSegmentInfo]
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    collection 的名称。

- **timeout** (*float* | *None*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在任何响应到达或发生任何错误时超时。

**返回类型：**

*List[LoadedSegmentInfo]*

**返回：**

已加载 segment 信息对象的列表，包含 segment_id、collection_id、collection_name、num_rows、is_sorted、state、level、storage_version 和 mem_size。

**异常：**

- **MilvusException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

segments = client.list_loaded_segments(collection_name="my_collection")
for seg in segments:
    print(f"Segment {seg.segment_id}: {seg.num_rows} rows, mem={seg.mem_size}")
```
