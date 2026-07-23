---
title: "drop | Cloud"
slug: /cli/cli/User-drop
sidebar_label: "drop"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个数据库用户。 | Cloud"
type: docx
token: Isx7dzFS9obGxyxEwgncxs67nXe
sidebar_position: 3
keywords: 
  - ANNS
  - 向量搜索
  - knn 算法
  - HNSW
  - zilliz
  - Zilliz Cloud
  - cloud
  - drop
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# drop

此操作会删除一个数据库用户。

<Admonition type="info" icon="📘" title="说明">

此命令仅适用于 Dedicated 集群。你可以运行 `zilliz context set` 在集群之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz user drop
--user <value>
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
[--yes]
```

## 选项\{#options}

- **--user** (*string*) -

    **[必需]**

    表示要删除的用户名。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时，是否省略表头行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

- **--yes, -y** (*boolean*) -

    表示是否跳过确认提示。

## 示例\{#example}

```bash
zilliz user drop --user my_user
```
