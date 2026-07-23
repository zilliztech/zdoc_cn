---
title: "pin_snapshot_data() | Python | MilvusClient"
slug: /python/python/Snapshot-pin_snapshot_data
sidebar_label: "pin_snapshot_data()"
beta: PRIVATE
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会在一段时间内固定快照数据，以便在您导出或备份文件时，垃圾回收不会将其移除。 | Python | MilvusClient"
type: docx
token: NqWDdRxKYoi6uTxHaYEcafx9nGc
sidebar_position: 7
keywords: 
  - milvus
  - Zilliz
  - Milvus vector database
  - Milvus db
  - zilliz
  - Zilliz Cloud
  - cloud
  - pin_snapshot_data()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# pin_snapshot_data()

此操作会在一段时间内固定快照数据，以便在您导出或备份文件时，垃圾回收不会将其移除。

## 请求语法\{#request-syntax}

```python
pin_snapshot_data(
    self,
    snapshot_name: str,
    collection_name: str,
    db_name: str = "",
    ttl_seconds: int = 0,
    timeout: Optional[float] = None,
    **kwargs,
) -> int
```

**参数：**

- **snapshot_name** (*str*) -

    要固定的快照名称。

- **collection_name** (*str*) -

    拥有该快照的 collection。

- **db_name** (*str*) -

    数据库名称。留空则使用当前活动数据库。

- **ttl_seconds** (*int*) -

    固定生命周期（以秒为单位）。`0` 使用服务器默认 TTL。

- **timeout** (*Optional[float]*) -

    此操作的超时时间（以秒为单位）。

- **kwargs** (*dict*) -

    传递给底层 RPC 的其他请求选项。

**返回类型：**

*int*

用于通过 `unpin_snapshot_data()` 释放此固定的 `pin_id`。

**异常：**

- **MilvusException**

    当无法固定快照或请求失败时抛出。

## 示例\{#example}

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT", token="YOUR_CLUSTER_TOKEN")

pin_id = client.pin_snapshot_data(
    snapshot_name="backup_20260509",
    collection_name="products",
    ttl_seconds=3600,
)

# Copy snapshot data to external storage here.

client.unpin_snapshot_data(pin_id=pin_id)
```
