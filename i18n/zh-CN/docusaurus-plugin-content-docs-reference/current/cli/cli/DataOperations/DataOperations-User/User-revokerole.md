---
title: "revoke-role | Cloud"
slug: /cli/cli/User-revokerole
sidebar_label: "revoke-role"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于撤销用户的角色。| Cloud"
type: docx
token: W7NedO3aXoF3UdxWp51cPe0kn2b
sidebar_position: 6
keywords: 
  - vector 维度
  - ANN Search
  - 什么是 vector embeddings
  - vector database 教程
  - zilliz
  - Zilliz Cloud
  - cloud
  - revoke-role
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# revoke-role

此操作用于撤销用户的角色。

<Admonition type="info" icon="📘" title="说明">

此命令仅适用于 Dedicated 集群。您可以运行 `zilliz context set` 在集群之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz user revoke-role
--user <value>
--role <value>
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--user** (*string*) -

    **[REQUIRED]**

    表示用户名。

- **--role** (*string*) -

    **[REQUIRED]**

    表示要撤销的角色名称。

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
zilliz user revoke-role --user my_user --role admin
```
