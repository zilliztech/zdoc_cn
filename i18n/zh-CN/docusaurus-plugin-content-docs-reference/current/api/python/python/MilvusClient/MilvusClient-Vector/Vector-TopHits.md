---
title: "TopHits | Python | MilvusClient"
slug: /python/python/Vector-TopHits
sidebar_label: "TopHits"
beta: PRIVATE
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "`TopHits` 实例定义了在搜索聚合中从每个 bucket 返回的代表性命中。它指定每个 bucket 返回多少个命中，并且可选地指定如何在每个 bucket 内对命中进行排序。 | Python | MilvusClient"
type: docx
token: EgeGdZL4LoCuv2xVUfFc9eDAnkd
sidebar_position: 12
keywords: 
  - Milvus 开源
  - Milvus 如何工作
  - Zilliz vector database
  - Zilliz database
  - zilliz
  - zilliz cloud
  - cloud
  - TopHits
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# TopHits

`TopHits` 实例定义了在搜索聚合中从每个 bucket 返回的代表性命中。它指定每个 bucket 返回多少个命中，并且可选地指定如何在每个 bucket 内对命中进行排序。

此草稿基于 Search Aggregation API 设计输入。在发布前，请根据 PyMilvus 源码验证最终的构造函数签名、导入路径、验证规则和属性名称。

```python
class pymilvus.TopHits
```

## 构造函数\{#constructor}

构造一个 `TopHits` 对象，用于 `GroupBy` 对象中。

```python
TopHits(
    size: int,
    sort: list[dict[str, str]] | None = None,
)
```

**参数：**

- **size** (*int*) -

    **[必需]**

    从每个 bucket 返回的代表性命中数量。

    例如，`TopHits(size=3)` 会从每个 bucket 返回最多 3 个命中。

- **sort** (*list[dict[str, str]] | None*) -

    命中级别排序规则列表。

    每一项定义一个字段和一个排序方向：

    ```python
    sort=[{"field": "rating", "order": "desc"}]
    ```

    `field` 值必须是文档级字段或 `_score`。`order` 值必须是 `asc` 或 `desc`。

    `sort` 仅控制 bucket 内命中的顺序。它不会影响返回哪些 bucket、bucket 如何排序，或如何计算每个 bucket 的指标。

    如果省略 `sort`，命中将按向量相似度分数排序。

**返回类型：**

*TopHits*

**返回：**

一个 `TopHits` 对象。

**异常：**

- **ParamError**

    当 `TopHits` 规范无效时，可能会引发此异常。示例包括非正数 `size`、不支持的排序方向、不支持的排序字段，或在 `sort` 中使用 bucket 级指标别名。

    最终异常类型仍待 SDK 确认。

## 示例\{#examples}

```python
from pymilvus import GroupBy, TopHits

# Return the top 3 hits from each bucket by vector similarity score.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    top_hits=TopHits(size=3),
)

# Return the 3 highest-rated hits from each bucket.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    top_hits=TopHits(
        size=3,
        sort=[{"field": "rating", "order": "desc"}],
    ),
)

# Return only bucket keys and metrics by omitting TopHits.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    metrics={
        "item_count": {"count": "*"},
        "avg_price": {"avg": "price"},
    },
    order=[{"avg_price": "desc"}],
)
```
