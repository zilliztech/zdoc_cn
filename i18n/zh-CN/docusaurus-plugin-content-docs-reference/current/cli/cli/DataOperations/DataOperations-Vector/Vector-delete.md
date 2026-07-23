---
title: "delete | Cloud"
slug: /cli/cli/Vector-delete
sidebar_label: "delete"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作通过过滤表达式删除实体。 | Cloud"
type: docx
token: NtaUdIxZBoupfkxG52lco4oZnzf
sidebar_position: 1
keywords: 
  - 相似性搜索
  - 多模态 RAG
  - LLM 幻觉
  - 混合搜索
  - zilliz
  - zilliz cloud
  - cloud
  - delete
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# delete

此操作通过过滤表达式删除实体。

## 描述\{#description}

Zilliz Cloud 提供了一组实用的过滤运算符，帮助你构建满足需求的过滤表达式。有关详细信息，请参阅[过滤概述](/docs/filtering-overview)及相关页面。

## 概要\{#synopsis}

```bash
zilliz vector delete
--collection <value>
--filter <value>
[--partition <value>]
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
[--yes]
```

## 选项\{#options}

- **--collection** (*string*) -

    **[必需]**

    表示 collection 名称。

- **--filter** (*string*) -

    **[必需]**

    表示要删除实体的过滤表达式。

- **--partition** (*string*) -

    表示 partition 名称。

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

- **--yes, -y** (*boolean*) -

    表示是否跳过确认提示。

## 示例\{#example}

```bash
zilliz vector delete --collection my_col --filter 'id in [1, 2, 3]'
```
