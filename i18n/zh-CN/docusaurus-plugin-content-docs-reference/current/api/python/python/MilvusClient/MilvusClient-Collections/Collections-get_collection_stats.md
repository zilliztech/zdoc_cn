---
title: "get_collection_stats() | Python | MilvusClient"
slug: /python/python/Collections-get_collection_stats
sidebar_label: "get_collection_stats()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作列出在特定 collection 上收集的统计信息。| Python | MilvusClient"
type: docx
token: VfaldXzLUocBrJxffw6cJHPinlh
sidebar_position: 13
keywords: 
  - vector databases comparison
  - Faiss
  - 视频搜索
  - AI 幻觉
  - zilliz
  - zilliz cloud
  - cloud
  - get_collection_stats()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# get_collection_stats()

此操作列出在特定 collection 上收集的统计信息。

<Admonition type="info" icon="📘" title="注意">

此方法适用于 dedicated serving clusters 和 on-demand compute。 

- 对于 serving cluster 中的 collection，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于 on-demand compute 中的 collection，请使用 project endpoints 创建 **[MilvusClient](./Client-MilvusClient)**。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
get_collection_stats(
    collection_name: str,
    timeout: Optional[float] = None,
    **kwargs,
) -> Dict
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    collection 的名称。

- **timeout** (*Optional[float]*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在任何响应返回或发生错误时超时。

- **\&ast;\&ast;kwargs** -

    用于未来扩展的其他关键字参数。

**返回类型：**

*dict*

**返回：**

包含指定 collection 上已收集统计信息的字典。

```python
{
    'row_count': 0
}
```

<Admonition type="info" icon="📘" title="说明">

为什么行数与插入的实体数量不匹配？

你插入的数据在最终保存之前会经过处理。最初，它会以数据流的形式到达。然后，它会作为实体存储在 segment 中。Milvus 会选择合适的 growing segment 来存储流中的数据，直到达到其上限并被 sealed。

但是，请注意，显示的行数可能与插入的记录数不匹配，因为流数据未包含在内。

</Admonition>

## 示例\{#examples}

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

stats = client.get_collection_stats(
    collection_name="my_collection"
)

print(stats)
# Output: {'row_count': 100}
```
