---
title: "get-load-state | Cloud"
slug: /cli/cli/Collection-getloadstate
sidebar_label: "get-load-state"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取 collection 加载状态。| Cloud"
type: docx
token: ROPbdTU6doxFGRxxcfYcgyBPnqg
sidebar_position: 6
keywords: 
  - 什么是 vector db
  - 什么是 vector database
  - vector database 对比
  - Faiss
  - zilliz
  - Zilliz Cloud
  - cloud
  - get-load-state
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# get-load-state

此操作用于获取 collection 加载状态。

## 概要\{#synopsis}

```bash
zilliz collection get-load-state
--name <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
[--partition-names <value>]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必需]**

    表示 collection 名称。

- **--database** (*string*) -

    表示 database 名称。

    如果使用 `zilliz context set` 配置了 cluster，则在未配置此选项时，会自动应用其所属的 database。

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

    表示用于筛选输出的 JMESPath 表达式。

- **--partition-names** (*array*) -

    表示要检查其加载状态的 partition 名称。你可以使用不同的 partition 名称连续指定此选项。

## 示例\{#example}

```bash
zilliz collection get-load-state --name my_collection
```
