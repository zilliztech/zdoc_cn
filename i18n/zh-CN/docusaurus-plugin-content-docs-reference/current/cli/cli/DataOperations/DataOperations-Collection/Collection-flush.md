---
title: "flush | Cloud"
slug: /cli/cli/Collection-flush
sidebar_label: "flush"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会将集合数据刷写到磁盘。 | Cloud"
type: docx
token: DIVvdqJlOoneFwxqs0xcG313nmg
sidebar_position: 5
keywords: 
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 对比
  - Faiss
  - zilliz
  - zilliz cloud
  - cloud
  - flush
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# flush

此操作会将集合数据刷写到磁盘。

## 描述\{#description}

运行此命令会封存当前正在增长的段，并将其保存到磁盘。手动运行此命令可能会产生大量小段，从而可能影响搜索性能。

建议你依赖 Zilliz Cloud 将数据刷写到磁盘，而不是手动运行此命令。

## 用法\{#usage}

```bash
zilliz collection flush
--name <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

**选项：**

- **--name** (*string*) -

    **[必填]**

    表示集合名称。

- **--database** (*string*) -

    表示数据库名称。

    如果使用 `zilliz context set` 配置了集群，则在未配置此选项时，会自动应用其所属的数据库。

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

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz collection flush --name my_collection
```
