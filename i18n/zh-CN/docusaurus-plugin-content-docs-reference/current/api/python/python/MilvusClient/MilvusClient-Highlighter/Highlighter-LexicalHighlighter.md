---
title: "LexicalHighlighter | Python | MilvusClient"
slug: /python/python/Highlighter-LexicalHighlighter
sidebar_label: "LexicalHighlighter"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "LexicalHighlighter 为搜索结果中的文本字段配置后处理术语高亮。高亮会使用可自定义的标签标注匹配的片段，并可返回片段式摘录，以提升可读性和 UI 渲染效果。它不会影响检索、过滤、排名或评分。 | Python | MilvusClient"
type: docx
token: DXTJdXSquo8NutxCqfBccO7pnWw
sidebar_position: 1
keywords: 
  - Sparse vector
  - Vector 维度
  - ANN Search
  - 什么是 vector embeddings
  - zilliz
  - Zilliz Cloud
  - cloud
  - LexicalHighlighter
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# LexicalHighlighter

**LexicalHighlighter** 为搜索结果中的文本字段配置后处理术语高亮。高亮会使用可自定义的标签标注匹配的片段，并可返回片段式摘录，以提升可读性和 UI 渲染效果。它不会影响检索、过滤、排名或评分。

```python
class pymilvus.LexicalHighlighter
```

## 构造函数\{#constructor}

初始化用于搜索和标量过滤的高亮配置。

```python
LexicalHighlighter(
    highlight_query: Optional[List] = None,
    highlight_search_text: Optional[bool] = None,
    pre_tags: Optional[List[str]] = None,
    post_tags: Optional[List[str]] = None,
    fragment_offset: Optional[int] = None,
    fragment_size: Optional[int] = None,
)
```

**参数**：

- **highlight_query** (*list[dict]*) -
定义从基于文本的过滤器中高亮哪些查询术语。每个条目都必须是一个 dict：

    ```python
    [
        {"type": "<QueryType>", "field": "<text field name>", "text": "<terms to highlight>"},
        {...},
    ]
    ```

    如果未设置，则不会高亮任何过滤术语。

    有关详细信息，请参阅 [Text Highlighter](https://milvus.io/docs/text-highlighter.md)。

- **highlight_search_text** (*bool*) -
是否高亮 BM25 全文搜索中使用的搜索术语。如果为 True，则将 BM25 查询术语用作高亮术语的来源。如果未设置，则不会高亮 BM25 搜索术语。

- **pre_tags** (*list[str]*) -
插入到返回的高亮结果中每个匹配术语之前的标签。支持纯字符串（例如 `{`）或 HTML 安全标记（例如 `<em>`、`<mark>`）。如果提供多个标签，标签会按匹配顺序轮换。

- **post_tags** (*list[str]*) -
插入到每个匹配术语之后的标签，与 `pre_tags` 配对。当提供多个标签时，轮换顺序与 pre_tags 相同。

- **fragment_offset** (*int*) -
返回基于片段的输出时，在第一个高亮匹配之前保留的前导上下文字符数。默认行为是不保留额外的前导上下文。

- **fragment_size** (*int*) -
每个返回片段的最大长度（以字符为单位）。高亮器会将片段长度大致限制在此大小以内。

- **num_of_fragments** (*int*) -
每个文本值返回的最大片段数。如果未设置，默认会返回多个片段（实现默认值；典型值请参见示例）。

**返回类型**：

*LexicalHighlighter*

**返回**：

一个 **LexicalHighlighter** 对象。

## 示例\{#examples}

在 BM25 全文搜索中高亮搜索术语：

```python
from pymilvus import MilvusClient, LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
)

results = client.search(
    collection_name="your_collection",
    data=["test"],                 # BM25 query term
    anns_field="sparse_vector",
    limit=10,
    search_params={"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}},
    output_fields=["text"],
    highlighter=highlighter,
)
```

在 Text Match 中高亮查询术语：

```python
from pymilvus import MilvusClient, LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["<mark>"],
    post_tags=["</mark>"],
    highlight_query=[{"type": "TextMatch", "field": "text", "text": "my doc"}],
)

results = client.search(
    collection_name="your_collection",
    data=["test"],                 # BM25 can be combined
    anns_field="sparse_vector",
    limit=10,
    search_params={"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}},
    output_fields=["text"],
    highlighter=highlighter,
)
```
