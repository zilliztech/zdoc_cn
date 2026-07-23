---
title: "drop | Cloud"
slug: /cli/cli/Index-drop
sidebar_label: "drop"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个索引。| Cloud"
type: docx
token: EJO8dhKSYoWk3AxksTrcGCzdnxf
sidebar_position: 3
keywords: 
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 对比
  - Faiss
  - zilliz
  - zilliz cloud
  - cloud
  - drop
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# drop

此操作会删除一个索引。

## 概要\{#synopsis}

```bash
zilliz index drop
--collection <value>
--index-name <value>
[--database <value>]
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
[--yes]
```

## 选项\{#options}

- **--collection** (*string*) -

    **[必需]**

    表示 collection 名称。

- **--index-name** (*string*) -

    **[必需]**

    表示要删除的索引名称。

- **--database** (*string*) -

    表示 database 名称。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

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
zilliz index drop --collection my_collection --index-name my_index
```
