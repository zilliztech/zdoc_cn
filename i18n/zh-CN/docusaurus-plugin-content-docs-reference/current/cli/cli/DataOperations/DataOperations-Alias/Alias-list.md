---
title: "list | Cloud"
slug: /cli/cli/Alias-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会列出所有别名。 | Cloud"
type: docx
token: L8PEdl4Dio11q5x4rPBc4OFZn8b
sidebar_position: 5
keywords: 
  - Vector 维度
  - ANN Search
  - 什么是 vector embeddings
  - vector database 教程
  - zilliz
  - Zilliz Cloud
  - cloud
  - list
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# list

此操作会列出所有别名。

## 概述\{#synopsis}

```bash
zilliz alias list [OPTIONS]
```

## 选项\{#options}

- **--database** (*string*) -

    **[必需]**

    表示数据库名称。

    如果使用 `zilliz context set` 配置了集群，并且未配置此选项，则会自动应用该集群所属的数据库。

- **--collection** (*string*) -

    表示按集合名称进行筛选。

- **--output, -o** (*string*) -

    表示输出格式。表示输出格式。可能的值：

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
zilliz alias list --database default
```
