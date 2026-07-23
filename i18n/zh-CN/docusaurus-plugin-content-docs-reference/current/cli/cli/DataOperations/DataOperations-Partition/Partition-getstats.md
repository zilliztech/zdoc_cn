---
title: "get-stats | Cloud"
slug: /cli/cli/Partition-getstats
sidebar_label: "get-stats"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作获取分区统计信息。 | Cloud"
type: docx
token: VEEzdJ5tyoaFVbxG6JvcDpULnMg
sidebar_position: 3
keywords: 
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - 什么是向量数据库
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

此操作获取分区统计信息。

## 描述\{#description}

该命令返回指定分区中的实体数量。

## 概要\{#synopsis}

```bash
zilliz partition get-stats
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

- **--database** (*string*) -

    表示数据库名称。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略标题行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz partition get-stats --collection my_collection --partition my_partition
```
