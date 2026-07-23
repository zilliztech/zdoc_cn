---
title: "compact() | Python | MilvusClient"
slug: /python/python/Management-compact
sidebar_label: "compact()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "添加 targetsize/targetsizeunit 和正数大小验证。异步变体共享同步方法契约。| Python | MilvusClient"
type: docx
token: ZANCdUPeBoCis1xylRUcR90Pndb
sidebar_position: 2
keywords: 
  - 混合搜索
  - 词法搜索
  - 最近邻搜索
  - Agentic RAG
  - zilliz
  - Zilliz Cloud
  - cloud
  - compact()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# compact()

添加 target_size/target_size_unit 和正数大小验证。异步变体共享同步方法契约。

## 请求语法\{#request-syntax}

```python
compact(
    collection_name: str,
    is_clustering: Optional[bool] = False,
    is_l0: Optional[bool] = False,
    target_size: Optional[int] = None,
    target_size_unit: str = "mb",
    timeout: Optional[float] = None,
    **kwargs,
) -> int
```

**参数：**

- **collection_name** (*str*) -
**[必需]**
要压缩的 collection 名称。

- **is_clustering** (*Optional[bool]*) -
默认值：`False`
请求 clustering compaction 的标志。

- **is_l0** (*Optional[bool]*) -
默认值：`False`
请求 level-zero compaction 的标志。

- **target_size** (*Optional[int]*) -
默认值：`None`
压缩后的期望 segment 大小。该值必须为正整数；省略时使用服务器默认值。

- **target_size_unit** (*str*) -
默认值：`"mb"`
`target_size` 的单位。支持的值为 `b`、`kb`、`mb`、`gb`、`tb` 和 `pb`；默认值为 `mb`。

- **timeout** (*Optional[float]*) -
默认值：`None`
等待 RPC 的最长时间（以秒为单位）。省略时，客户端会等待直到服务器响应或发生错误。

- **kwargs** (*Any*) -
额外的请求上下文选项。

**返回类型：**

*int*

**返回：**

Milvus 返回的 compaction 作业标识符。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

演示 compact 用法。

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")
job_id = client.compact(collection_name="book_chunks", target_size=512, target_size_unit="mb")
print(job_id)
```
