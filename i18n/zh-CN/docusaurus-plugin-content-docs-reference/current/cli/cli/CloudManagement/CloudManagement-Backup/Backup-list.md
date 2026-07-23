---
title: "list | Cloud"
slug: /cli/cli/Backup-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有备份。 | Cloud"
type: docx
token: VHhWdygYaoyAmQxRpP6cvmIYndc
sidebar_position: 6
keywords: 
  - 最近邻搜索
  - Agentic RAG
  - rag llm 架构
  - 私有 llms
  - zilliz
  - zilliz cloud
  - cloud
  - list
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# list

此操作列出所有备份。

## 描述\{#description}

在 Zilliz Cloud 中，备份是数据的副本，可让你在数据丢失或系统故障时恢复整个集群或特定 Collection。

当你在不带任何选项的情况下运行此命令时，系统会询问是否设置其他选项。提示默认值为 yes，并会引导你完成选项设置。如果你在提示中输入 N，该命令将检索所有备份。

<Admonition type="info" icon="📘" title="说明">

此功能仅适用于 **Dedicated** 集群。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz backup list
[--project-id <value>]
[--cluster-id <value>]
[--creation-method <manual | auto>]
[--backup-type <CLUSTER | COLLECTION>]
[--page-size <value>]
[--page <value>]
[--output <value>]
[--query <value>]
[--no-header]
[--all]
```

## 选项\{#options}

- **--project-id** (*string*) -

    表示作为过滤条件的项目 ID，类似于 `proj-xxxxx`。

- **--cluster-id** (*string*) -

    表示作为过滤条件的集群 ID，类似于 `inxx-xxxxx`。

    如果已使用 `zilliz context set` 配置集群，则在未配置此选项时会自动应用该集群。

- **--creation-method** (*string*) -

    表示作为过滤条件的创建方法。

    可选值为：`manual` 和 `auto`。

- **--backup-type** (*string*) -

    表示作为过滤条件的备份类型。

    可选值为 `CLUSTER` 和 `COLLECTION`。

- **--page-size** (*integer*) -

    表示每页的项目数。该值默认为 **10**。

- **--page** (*integer*) -

    表示页码。该值默认为 **1**。

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

    表示用于过滤输出的 JMESPath 表达式。

- **--all, -a** (*boolean*) -

    表示是否获取所有页面。

## 示例\{#example}

```bash
# List all backups
zilliz backup list

# List backups for a specific cluster
zilliz backup list --cluster-id in01-xxxxxxxxxxxx
```
