---
title: "load | Cloud"
slug: /cli/cli/Collection-load
sidebar_label: "load"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将 collection 加载到内存中以用于搜索。 | Cloud"
type: docx
token: SOaOdH3o6o7dsyx1VjPc4LPynqc
sidebar_position: 10
keywords: 
  - 推荐系统
  - 信息检索
  - 降维
  - hnsw 算法
  - zilliz
  - zilliz cloud
  - cloud
  - load
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# load

此操作将 collection 加载到内存中以用于搜索。

## 概要\{#synopsis}

```bash
zilliz collection load
--name <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必需]**

    表示 collection 名称。

- **--database** (*string*) -

    表示数据库名称。

    如果使用 `zilliz context set` 配置了集群，则在此选项未配置时，会自动应用其所属的数据库。

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

## 示例\{#example}

```bash
zilliz collection load --name my_collection
```
