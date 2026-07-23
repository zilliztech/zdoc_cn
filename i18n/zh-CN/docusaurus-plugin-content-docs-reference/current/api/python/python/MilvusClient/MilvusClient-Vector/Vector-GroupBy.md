---
title: "GroupBy | Python | MilvusClient"
slug: /python/python/Vector-GroupBy
sidebar_label: "GroupBy"
beta: PRIVATE
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "`GroupBy` 实例定义搜索聚合中的一个 bucket 层级。它指定哪些字段构成 bucket key、返回多少个 bucket、为每个 bucket 计算哪些指标、如何对 bucket 排序、是否返回代表性命中，以及是否创建嵌套的子 bucket。 | Python | MilvusClient"
type: docx
token: CFS4dOq2LowXPSxB124cBwQsn0c
sidebar_position: 11
keywords: 
  - 检索增强生成
  - 大语言模型
  - 向量化
  - k 近邻算法
  - zilliz
  - zilliz cloud
  - cloud
  - GroupBy
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# GroupBy

`GroupBy` 实例定义搜索聚合中的一个 bucket 层级。它指定哪些字段构成 bucket key、返回多少个 bucket、为每个 bucket 计算哪些指标、如何对 bucket 排序、是否返回代表性命中，以及是否创建嵌套的子 bucket。

此草案基于 Search Aggregation API 设计输入。在发布前，请根据 PyMilvus 源码验证最终的构造函数签名、导入路径、验证规则和属性名称。

```python
class pymilvus.GroupBy
```

## 构造函数\{#constructor}

构造一个 `GroupBy` 对象，用于 `MilvusClient.search(group_by=...)`。

```python
GroupBy(
    fields: list[str],
    size: int,
    metrics: dict[str, dict] | None = None,
    order: list[dict[str, str]] | None = None,
    top_hits: TopHits | None = None,
    sub_group: GroupBy | None = None,
)
```

**参数：**

- **fields** (*list[str]*) -

    **[必需]**

    构成此聚合层级的 bucket key 的字段名称列表。

    单个字段会为每个字段值创建一个 bucket。多个字段会创建一个复合 bucket key。例如，`fields=["brand", "color"]` 会为每个 `(brand, color)` 组合创建一个 bucket。

- **size** (*int*) -

    **[必需]**

    在此聚合层级返回的最大 bucket 数量。

    对于根 `GroupBy`，此值控制顶层 bucket 的数量。对于嵌套的 `GroupBy`，此值控制每个父 bucket 下返回的子 bucket 数量。

- **metrics** (*dict[str, dict] | None*) -

    定义每个 bucket 指标的字典。

    字典键是指标别名。字典值定义一个指标操作及其输入字段。

    ```python
    metrics={
        "item_count": {"count": "*"},
        "avg_price": {"avg": "price"},
        "best_score": {"max": "_score"},
    }
    ```

    支持的 Phase 1 操作包括：

    - `count`

    - `sum`

    - `avg`

    - `min`

    - `max`

    特殊字段 `_score` 指 vector 相似度分数。在当前设计中，`_score` 可与 `avg`、`sum`、`min` 和 `max` 一起使用。

- **order** (*list[dict[str, str]] | None*) -

    bucket 排序规则列表。

    每一项包含一个排序键和一个方向。方向必须为 `asc` 或 `desc`。

    ```python
    order=[{"avg_price": "desc"}, {"_count": "desc"}]
    ```

    有效的排序键包括：

    - 在同一 `GroupBy` 层级的 `metrics` 中定义的指标别名。

    - `_count`，按 bucket 中 ANN 检索到的实体数量对 bucket 排序。

    - `_key`，按 bucket key 值对 bucket 排序。

    bucket 排序既控制哪些 bucket 出现在前 `size` 个结果中，也控制这些 bucket 的返回顺序。

    早期设计输入对 `order` 使用 `dict[str, str]`。当前工作假设是使用 `list[dict[str, str]]`，以保留显式的多条件排序。请根据最终 SDK 验证这一点。

- **top_hits** (*[TopHits](https://TopHits.md) | None*) -

    一个 `TopHits` 对象，定义要从此层级的每个 bucket 返回的代表性命中。

    如果省略此参数，则此层级仅返回 bucket key、指标和子分组。省略 `top_hits` 对纯聚合层级很有用。

- **sub_group** (*GroupBy | None*) -

    一个子 `GroupBy` 对象，定义此层级每个 bucket 下的嵌套分组。

    每个嵌套层级都有自己的 `fields`、`size`、`metrics`、`order` 和 `top_hits`。

**返回类型：**

*GroupBy*

**返回：**

一个 `GroupBy` 对象。

**异常：**

- **ParamError**

    当 `GroupBy` 规范无效时，可能会引发此异常。示例包括缺少必需字段、`size` 为非正数、`order` 键未引用指标别名或保留键、不支持的指标操作、不支持的字段类型，或嵌套深度过大。

    最终异常类型仍待 SDK 确认。

## 示例\{#examples}

```python
from pymilvus import GroupBy, TopHits

# Group by a single field and return representative hits.
group_by = GroupBy(
    fields=["brand"],
    size=10,
    top_hits=TopHits(size=3),
)

# Group by a composite key, compute metrics, and order buckets by a metric.
group_by = GroupBy(
    fields=["brand", "color"],
    size=10,
    metrics={
        "item_count": {"count": "*"},
        "avg_price": {"avg": "price"},
    },
    order=[{"avg_price": "desc"}, {"_count": "desc"}],
    top_hits=TopHits(
        size=3,
        sort=[{"field": "rating", "order": "desc"}],
    ),
)

# Create nested buckets.
group_by = GroupBy(
    fields=["category"],
    size=5,
    metrics={"total_revenue": {"sum": "price"}},
    order=[{"total_revenue": "desc"}],
    sub_group=GroupBy(
        fields=["brand"],
        size=3,
        metrics={"avg_rating": {"avg": "rating"}},
        order=[{"avg_rating": "desc"}],
        top_hits=TopHits(size=3),
    ),
)
```
