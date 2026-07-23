---
title: "alter | Cloud"
slug: /cli/cli/Alias-alter
sidebar_label: "alter"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会将别名重新分配给另一个集合。 | Cloud"
type: docx
token: PLvbdUqI6onWmWxFPYKcgcFpnwb
sidebar_position: 1
keywords: 
  - 推荐系统
  - 信息检索
  - 降维
  - HNSW 算法
  - zilliz
  - zilliz cloud
  - 云
  - alter
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# alter

此操作会将别名重新分配给另一个集合。

## Description\{#description}

你可以为集合分配一个别名，并针对该别名执行搜索/查询，以便由关联的集合响应。使用此命令可更改与指定别名关联的集合。

不带任何选项运行此命令时，会触发一组交互式提示以帮助完成设置。

## Synopsis\{#synopsis}

```bash
zilliz alias alter
--collection <value>
--alias <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## Options\{#options}

- **--collection** (*string*) -

    **[REQUIRED]**

    表示新的目标集合。

- **--alias** (*string*) -

    **[REQUIRED]**

    表示要重新分配的别名名称。

- **--database** (*string*) -

    表示数据库名称。

    如果使用 `zilliz context set` 配置了集群，则在未配置此选项时，它所属的数据库会自动应用。

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

## Example\{#example}

```bash
zilliz alias alter --collection new_collection --alias my_alias
```
