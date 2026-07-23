---
title: "get-stats | Cloud"
slug: /cli/cli/Collection-getstats
sidebar_label: "get-stats"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作获取 Collection 统计信息（行数等）。 | Cloud"
type: docx
token: XTHTd7x3soBmeTx9ftwc369PnCe
sidebar_position: 7
keywords: 
  - Vector index
  - vector database open source
  - open source vector db
  - vector database example
  - zilliz
  - zilliz cloud
  - cloud
  - get-stats
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# get-stats

此操作获取 Collection 统计信息（行数等）。

## 概要\{#synopsis}

```bash
zilliz collection get-stats
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

    表示 Collection 名称。

- **--database** (*string*) -

    表示数据库名称。

    如果已使用 `zilliz context set` 配置集群，则在未配置此选项时，将自动应用该集群所属的数据库。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时，是否省略标题行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz collection get-stats --name my_collection
```
