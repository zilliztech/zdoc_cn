---
title: "describe | Cloud"
slug: /cli/cli/Index-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取 index 的详细信息。| Cloud"
type: docx
token: T0VYdnnlIo0VwAxLaBjcryM1n7b
sidebar_position: 2
keywords: 
  - knn
  - 图像搜索
  - LLMs
  - 机器学习
  - zilliz
  - zilliz cloud
  - cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作用于获取 index 的详细信息。

## 概要\{#synopsis}

```bash
zilliz index describe
--collection <value>
--index-name <value>
[--database <value>]
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--collection** (*string*) -

    **[必填]**

    表示 collection 名称。

- **--index-name** (*string*) -

    **[必填]**

    表示 index 名称。

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

    表示当输出设置为 `table` 或 `csv` 时，是否省略表头行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz index describe --collection my_collection --index-name my_index
```
