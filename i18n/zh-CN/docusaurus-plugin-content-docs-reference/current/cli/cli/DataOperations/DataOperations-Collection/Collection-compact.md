---
title: "compact | Cloud"
slug: /cli/cli/Collection-compact
sidebar_label: "compact"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会压缩 collection segment 以优化存储。 | Cloud"
type: docx
token: PgZ0dL39ho6wLbxJKANcm0jyn9b
sidebar_position: 1
keywords: 
  - 向量嵌入
  - 向量存储
  - 开源向量数据库
  - 向量 index
  - zilliz
  - zilliz cloud
  - cloud
  - compact
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# compact

此操作会压缩 collection segment 以优化存储。

## 描述\{#description}

Zilliz Cloud 会定期自动压缩 collection segment。在大多数情况下，你无需手动运行此命令，除非需要优化 collection 中的存储。

聚类压缩旨在提升大型 collection 中的搜索性能并降低成本。本指南将帮助你了解聚类压缩，以及此功能如何提升搜索性能。与普通压缩不同，聚类压缩会根据 scalar field 中的值在 collection 的 segment 内重新分布实体。

不带任何选项运行此命令会触发一组交互式提示，帮助你完成设置。

## 概要\{#synopsis}

```bash
zilliz collection compact
--name <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
[--clustering]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必填]**

    表示 collection 名称。你可以运行 `zilliz collection list` 获取所有现有 collection 的列表。

- **--database** (*string*) -

    表示 database 名称。

    如果使用 `zilliz context set` 配置了 cluster，则在未配置此选项时，会自动应用其所属的 database。

- **--output, -o** (*string*) -

    表示输出格式。可选值：`json`、`table`、`text`、`yaml`、`csv`。

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略标题行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

- **--clustering** (*boolean*) -

    表示是否执行聚类压缩。

## 示例\{#example}

```bash
zilliz collection compact --name my_collection
```
