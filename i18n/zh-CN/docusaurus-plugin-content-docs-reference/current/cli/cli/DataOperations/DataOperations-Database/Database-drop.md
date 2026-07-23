---
title: "drop | Cloud"
slug: /cli/cli/Database-drop
sidebar_label: "drop"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个数据库。（仅限 Dedicated 集群）| Cloud"
type: docx
token: WjbrdMFuXoR2etxfpMdcmIebnCh
sidebar_position: 3
keywords: 
  - 词法搜索
  - 最近邻搜索
  - Agentic RAG
  - rag llm 架构
  - zilliz
  - zilliz cloud
  - cloud
  - drop
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# drop

此操作会删除一个数据库。（仅限 Dedicated 集群）

<Admonition type="info" icon="📘" title="Notes">

此命令适用于 Dedicated 集群。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz database drop
--name <value>
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--name** (*string*) -

    **[REQUIRED]**

    表示要删除的数据库名称。

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

- **--yes, -y** (*boolean*) -

    表示是否跳过确认提示。

## 示例\{#example}

```bash
zilliz database drop --name my_database
```
