---
title: "describe | Cloud"
slug: /cli/cli/Database-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取数据库的详细信息。（仅 Dedicated）| Cloud"
type: docx
token: A8XSdcz0UoXHnyxHPcOcaLExn3o
sidebar_position: 2
keywords: 
  - 什么是 milvus
  - milvus 数据库
  - milvus lite
  - milvus benchmark
  - zilliz
  - zilliz cloud
  - cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作用于获取数据库的详细信息。（仅 Dedicated）

<Admonition type="info" icon="📘" title="Notes">

此命令适用于 Dedicated 集群。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz database describe
--name <value>
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必填]**

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

    表示用于过滤输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz database describe --name my_database
```
