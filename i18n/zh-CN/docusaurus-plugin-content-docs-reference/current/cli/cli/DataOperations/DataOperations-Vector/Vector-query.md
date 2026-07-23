---
title: "query | Cloud"
slug: /cli/cli/Vector-query
sidebar_label: "query"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作通过标量过滤表达式查询实体。 | Cloud"
type: docx
token: VSRhdmsCvodJ7pxwGgqcuvZ3n7g
sidebar_position: 5
keywords: 
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - zilliz
  - zilliz cloud
  - cloud
  - query
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# query

此操作通过标量过滤表达式查询实体。

## 描述\{#description}

Zilliz Cloud 提供了一组实用的过滤运算符，帮助你构建满足需求的过滤表达式。详情请参阅[过滤概览](/docs/filtering-overview)及相关页面。

## 用法\{#synopsis}

```bash
zilliz vector query
--collection <value>
--filter <value>
[--limit <value>]
[--database <value>]
[--partition <value>]
[--offset <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--collection** (*string*) -

    **[必需]**

    表示 collection 名称。

- **--filter** (*string*) -

    **[必需]**

    表示标量过滤表达式。

- **--limit** (*integer*) -

    表示要返回的最大结果数。 

    该值默认为 **10**，并且它与 `offset` 的乘积应小于 **16,384**。

- **--output-fields** (*array*) -

    表示要以 JSON 数组形式返回的字段。

- **--database** (*string*) -

    表示 database 名称。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

- **--offset** (*integer*) -

    表示在返回匹配项之前要跳过的结果数量。与 `--limit` 一起用于分页。

    它与 `limit` 的乘积应小于 **16,384**。

- **--partition, -p** (*array*) -

    表示要查询的 partition 名称列表。如果未指定，则查询所有 partitions。

## 示例\{#example}

```bash
zilliz vector query --collection my_col --filter 'id > 100' --limit 10
```
