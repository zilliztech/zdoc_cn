---
title: "grant-role | Cloud"
slug: /cli/cli/User-grantrole
sidebar_label: "grant-role"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为用户授予角色。 | Cloud"
type: docx
token: SvpmdXjkYo3LYTxt2ipcKhLFnZg
sidebar_position: 4
keywords: 
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 对比
  - Faiss
  - zilliz
  - zilliz cloud
  - cloud
  - grant-role
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# grant-role

此操作为用户授予角色。

<Admonition type="info" icon="📘" title="Notes">

此命令仅适用于 Dedicated 集群。你可以运行 `zilliz context set` 在集群之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz user grant-role
--user <value>
--role <value>
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--user** (*string*) -

    **[必需]**

    表示用户名。

- **--role** (*string*) -

    **[必需]**

    表示要授予的角色名称。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

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
zilliz user grant-role --user my_user --role admin
```
