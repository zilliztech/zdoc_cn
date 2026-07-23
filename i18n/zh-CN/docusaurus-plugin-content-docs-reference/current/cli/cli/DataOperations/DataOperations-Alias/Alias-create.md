---
title: "create | Cloud"
slug: /cli/cli/Alias-create
sidebar_label: "create"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建一个指向 collection 的 alias。| Cloud"
type: docx
token: WxTjdBaBqoNhRex5kR0cfekqnOc
sidebar_position: 2
keywords: 
  - DiskANN
  - Sparse vector
  - Vector Dimension
  - ANN Search
  - zilliz
  - Zilliz Cloud
  - cloud
  - create
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# create

此操作会创建一个指向 collection 的 alias。

## Description\{#description}

你可以为 collection 分配一个 alias，并针对该 alias 执行搜索/查询，从而由关联的 collection 进行响应。使用此命令可更改与指定 alias 关联的 collection。

在没有任何提示的情况下运行此命令会触发一组交互式提示，以帮助完成设置。

## Synopsis\{#synopsis}

```bash
zilliz alias create
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

    表示目标 collection 名称。

- **--alias** (*string*) -

    **[REQUIRED]**

    表示 alias 名称。

    该值应为最多 **255** 个字符的字母数字字符串，并以下划线 (_) 或字母开头。

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

    表示当输出设置为 `table` 或 `csv` 时，是否省略标题行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

## Example\{#example}

```bash
zilliz alias create --collection my_collection --alias my_alias
```
