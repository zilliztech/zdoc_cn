---
title: "list | Cloud"
slug: /cli/cli/Cluster-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有集群。| Cloud"
type: docx
token: F2RtdzmQ0oQlWfxf7SYcT200nNf
sidebar_position: 4
keywords: 
  - milvus db
  - milvus vector db
  - Zilliz Cloud
  - 什么是 milvus
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

此操作列出所有集群。

## 描述\{#description}

此命令会为列出的每个集群返回以下字段：

- `clusterId`

- `clusterName`

- `description`

- `regionId`

- `cuType`

- `plan`

- `cuSize`

- `status`

## 概要\{#synopsis}

```bash
zilliz cluster list
[--page-size <value>]
[--page <value>]
[--output <value>]
[--query <value>]
[--no-header]
[--all]
```

## 选项\{#options}

- **--page-size** (*integer*) -

    表示每页的项目数。默认值为 **10**。

- **--page** (*integer*) -

    表示页码。默认值为 **1**。

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

- **--all, -a** (*boolean*) -

    表示是否获取所有页面。

## 示例\{#example}

```bash
# List all clusters
zilliz cluster list

# Fetch all pages
zilliz cluster list --all
```
