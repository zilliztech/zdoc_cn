---
title: "list_persistent_segments() | Python | MilvusClient"
slug: /python/python/Management-list_persistent_segments
sidebar_label: "list_persistent_segments()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出 collection 的所有持久化（已 flushed）segment，包括行数、排序状态和存储级别等信息。 | Python | MilvusClient"
type: docx
token: QsGNdp1t3oHaunxgIZGc3PdSnof
sidebar_position: 25
keywords: 
  - vector 数据库对比
  - Faiss
  - 视频搜索
  - AI 幻觉
  - zilliz
  - Zilliz Cloud
  - cloud
  - list_persistent_segments()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_persistent_segments()

此操作列出 collection 的所有持久化（已 flushed）segment，包括行数、排序状态和存储级别等信息。

<Admonition type="info" icon="📘" title="Notes">

这仅适用于托管的 collection。

</Admonition>

## 请求语法\{#request-syntax}

```python
client.list_persistent_segments(
    collection_name: str,
    timeout: float = None
) -> List[SegmentInfo]
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    collection 的名称。

- **timeout** (*float* | *None*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*List[SegmentInfo]*

**返回：**

持久化 segment 信息对象列表，包含 segment_id、collection_id、collection_name、num_rows、is_sorted、state、level 和 storage_version。

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

segments = client.list_persistent_segments(collection_name="my_collection")
for seg in segments:
    print(f"Segment {seg.segment_id}: {seg.num_rows} rows, level={seg.level}")
```
