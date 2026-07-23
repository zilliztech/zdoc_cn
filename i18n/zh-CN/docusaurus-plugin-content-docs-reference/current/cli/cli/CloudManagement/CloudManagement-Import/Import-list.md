---
title: "list | Cloud"
slug: /cli/cli/Import-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出某个集群的导入作业。| Cloud"
type: docx
token: ObdhdVWTpogXQhx3A0YcdU2yntd
sidebar_position: 1
keywords: 
  - LLM 幻觉
  - 混合搜索
  - 词法搜索
  - 最近邻搜索
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

此操作列出某个集群的导入作业。

## 概要\{#synopsis}

```bash
zilliz import list
--cluster-id <value>
[--page-size <value>]
[--page <size>]
[--database <value>]
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必需]**

    表示集群 ID，类似于 `inxx-xxxxx`。

    如果已使用 `zilliz context set` 配置集群，则在未配置此选项时会自动应用该集群。

- **--page-size** (*integer*) -

    表示每页的项目数。该值默认为 **10**。

- **--page** (*integer*) -

    表示当前页码。该值默认为 **1**。

- **--database** (*string*) -

    表示指定集群中某个数据库的名称。

    如果已使用 `zilliz context set` 配置数据库，则在未配置此选项时会自动应用该数据库。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`，

    - `table`，

    - `text`，

    - `yaml`，

    - `csv`。

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz import list --cluster-id in01-xxxxxxxxxxxx
```
