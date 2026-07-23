---
title: "rename | Cloud"
slug: /cli/cli/Collection-rename
sidebar_label: "rename"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于重命名一个 collection。 | Cloud"
type: docx
token: N1uadJS98ojQhixbOQacLOwknke
sidebar_position: 13
keywords: 
  - Vector search
  - KNN 算法
  - HNSW
  - 什么是非结构化数据
  - zilliz
  - Zilliz Cloud
  - cloud
  - rename
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# rename

此操作用于重命名一个 collection。

## 概要\{#synopsis}

```bash
zilliz collection rename
--name <value>
--new-name <value>
[--database <value>]
[--new-database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

**选项：**

- **--name** (*string*) -

    **[必需]**

    指示当前 collection 名称。

- **--new-name** (*string*) -

    **[必需]**

    指示新的 collection 名称。

    该值应为最多 255 个字符的字母数字字符串，并以下划线 (_) 或字母开头。

- **--database** (*string*) -

    指示当前数据库名称。

- **--new-database** (*string*) -

    指示目标数据库名称（用于跨数据库重命名）。

- **--output, -o** (*string*) -

    指示输出格式。可选值：`json`、`table`、`text`、`yaml`、`csv`。

- **--no-header** (*boolean*) -

    指示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    指示用于过滤输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz collection rename --name old_collection --new-name new_collection
```
