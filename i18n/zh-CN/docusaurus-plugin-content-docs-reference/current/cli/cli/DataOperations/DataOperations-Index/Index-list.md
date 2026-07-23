---
title: "list | Cloud"
slug: /cli/cli/Index-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出集合上的索引。 | Cloud"
type: docx
token: Kw0KdCb7yom9alxtZRTcV3m7nCb
sidebar_position: 4
keywords: 
  - knn
  - 图像搜索
  - LLMs
  - 机器学习
  - zilliz
  - zilliz cloud
  - cloud
  - list
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# list

此操作列出集合上的索引。

## 用法\{#usage}

```bash
zilliz index list
--collection <value>
[--database <value>]
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
```

**选项：**

- **--collection** (*string*) -

    **[必填]**

    表示集合名称。

- **--database** (*string*) -

    表示数据库名称。

- **--output, -o** (*string*) -

    表示输出格式。可选值：`json`、`table`、`text`、`yaml`、`csv`。

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz index list --collection my_collection
```
