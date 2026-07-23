---
title: "list | Cloud"
slug: /cli/cli/Role-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有角色。 | Cloud"
type: docx
token: BNH0dujcioUq4Px0EmncEqlOnVe
sidebar_position: 5
keywords: 
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 对比
  - Faiss
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

此操作列出所有角色。

<Admonition type="info" icon="📘" title="Notes">

此命令仅适用于 Dedicated 集群。您可以运行 `zilliz context set` 在不同集群之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz role list
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

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

- **--database** (*string*) -

    表示数据库名称。该值默认为 `default`。

## 示例\{#example}

```bash
zilliz role list
```
