---
title: "list | Cloud"
slug: /cli/cli/Volume-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出项目中的所有 volume。| Cloud"
type: docx
token: OShTd6lMhoaxK2xDlExcmzXTnLd
sidebar_position: 3
keywords: 
  - Annoy vector 搜索
  - milvus
  - Zilliz
  - milvus vector 数据库
  - zilliz
  - zilliz cloud
  - 云
  - list
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# list

此操作列出项目中的所有 volume。

## 概要\{#synopsis}

```bash
zilliz volume list
--project-id <value>
[--page-size <value>]
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--project-id** (*string*) -

    **[必需]**

    表示 project ID。

    如果已使用 `zilliz context set` 配置了 project，则在未配置此选项时会自动应用该 project。

- **--page-size** (*integer*) -

    表示每页的项目数。默认值为 **10**。

- **--page** (*integer*) -

    表示当前页码。默认值为 **1**。

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

## 示例\{#example}

```bash
zilliz volume list --project-id proj-xxxxxxxxxxxx
```
