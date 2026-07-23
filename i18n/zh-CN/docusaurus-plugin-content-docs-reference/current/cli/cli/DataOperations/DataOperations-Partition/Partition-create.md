---
title: "create | Cloud"
slug: /cli/cli/Partition-create
sidebar_label: "create"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作在集合中创建分区。 | Cloud"
type: docx
token: JBRhd3cb5owndqxODOxcd08InRe
sidebar_position: 1
keywords: 
  - vector 数据库比较
  - Faiss
  - 视频搜索
  - AI 幻觉
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

此操作在集合中创建分区。

## 描述\{#description}

分区是集合的子集。每个分区与其父集合共享相同的数据结构，但仅包含集合中数据的一个子集。

创建集合时，Zilliz Cloud 还会在该集合中创建一个名为 **default** 的分区。如果你不打算添加任何其他分区，则插入到集合中的所有实体都会进入默认分区，所有搜索和查询也都在其中执行。

你可以添加更多分区，并根据特定条件将实体插入其中。然后，你可以将搜索和查询限制在特定分区内，从而提升搜索性能。

一个集合最多可以有 1,024 个分区。

## 概要\{#synopsis}

```bash
zilliz partition create
--collection <value>
--partition <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--collection** (*string*) -

    **[必需]**

    表示集合名称。

- **--partition** (*string*) -

    **[必需]**

    表示分区名称。

    该值应为不超过 **255** 个字符的字符串，并且以 **下划线 (_) 或字母** 开头。

- **--database** (*string*) -

    表示数据库名称。

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

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz partition create --collection my_collection --partition my_partition
```
