---
title: "过滤表达式模板 | Cloud"
slug: /filtering-templating
sidebar_label: "过滤表达式模板"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，包含大量元素的复杂过滤表达式，尤其是涉及非 ASCII 字符（如 CJK 字符）的表达式，会显著影响查询性能。为解决这一问题，Zilliz Cloud 引入了一种过滤表达式模板机制，旨在通过减少解析复杂表达式所花费的时间来提高效率。本页介绍如何在搜索、查询和删除操作中使用过滤表达式模板。 | Cloud"
type: origin
token: V0Tkw5vEJit4TYkKcEGcAwwanwB
sidebar_position: 4
displayed_sidebar: default

---

import Admonition from '@theme/Admonition';


# 过滤表达式模板

在 Zilliz Cloud 中，包含大量元素的复杂过滤表达式，尤其是涉及非 ASCII 字符（如 CJK 字符）的表达式，会显著影响查询性能。为解决这一问题，Zilliz Cloud 引入了一种过滤表达式模板机制，旨在通过减少解析复杂表达式所花费的时间来提高效率。本页介绍如何在搜索、查询和删除操作中使用过滤表达式模板。

## 概述\{#overview}

过滤表达式模板化允许您创建带有占位符的过滤表达式，并在查询执行期间动态替换为具体值。使用模板化后，您可以避免将大型数组或复杂表达式直接嵌入过滤器中，从而减少解析时间并提升查询性能。

假设您有一个包含两个字段（年龄和城市）的过滤表达式，并且想要找到所有年龄大于 25 且居住在“北京”或“上海”的人。您可以使用模板来代替将值直接嵌入过滤表达式中：

```python
filter = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
```

在这里，`{age}` 和 `{city}` 是占位符，将在执行查询时替换为 `filter_params` 中的实际值。

在 Zilliz Cloud 中使用过滤表达式模板有以下几个关键优势：

- **减少解析时间**：通过用占位符替换大型或复杂的过滤表达式，系统在解析和处理过滤器上花费的时间更少。

- **提升查询性能**：减少解析开销，从而提升查询性能，实现更高的 QPS 和更快的响应时间。

- **可扩展性**：随着数据集增长、过滤表达式变得更加复杂，模板可确保性能保持高效且具备可扩展性。

## 搜索操作\{#search-operations}

对于 Zilliz Cloud 中的搜索操作，过滤表达式用于定义过滤条件，`filter_params` 参数用于指定占位符的值。`filter_params` 字典包含 Zilliz Cloud 将用于替换到过滤表达式中的动态值。

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.search(
    "hello_milvus",
    vectors[:nq],
    filter=expr,
    limit=10,
    output_fields=["age", "city"],
    search_params={"metric_type": "COSINE", "params": {"search_list": 100}},
    filter_params=filter_params,
)
```

在此示例中，Zilliz Cloud 会在执行搜索时动态地将 `{age}` 替换为 `25`，将 `{city}` 替换为 `["北京", "上海"]`。

## 查询操作\{#query-operations}

相同的模板机制也可以应用于 Zilliz Cloud 中的查询操作。在 Query 方法中，您可以定义过滤表达式，并使用 `filter_params` 指定要替换的值。

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.query(
    "hello_milvus",
    filter=expr,
    output_fields=["age", "city"],
    filter_params=filter_params
)
```

通过使用 `filter_params`，Zilliz Cloud 可以高效处理值的动态插入，从而提高查询执行速度。

## 删除操作\{#delete-operations}

您也可以在删除操作中使用过滤表达式模板。与搜索和查询类似，过滤表达式用于定义条件，`filter_params` 则为占位符提供动态值。

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.delete(
    "hello_milvus",
    filter=expr,
    filter_params=filter_params
)
```

这种方法可以提升删除操作的性能，尤其是在处理复杂过滤条件时。

## 小结\{#conclusion}

过滤表达式模板是 Zilliz Cloud 中用于优化查询性能的重要工具。通过使用占位符和 `filter_params` 字典，您可以显著减少解析复杂过滤表达式所花费的时间。这将带来更快的查询执行速度和更好的整体性能。
