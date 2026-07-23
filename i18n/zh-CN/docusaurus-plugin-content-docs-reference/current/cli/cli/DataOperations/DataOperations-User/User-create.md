---
title: "create | Cloud"
slug: /cli/cli/User-create
sidebar_label: "create"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建新的数据库用户。 | Cloud"
type: docx
token: UJuOdGGu3okE0Sx1jARc45lMnGb
sidebar_position: 1
keywords: 
  - 相似性搜索
  - 多模态 RAG
  - llm 幻觉
  - 混合搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - create
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# create

此操作会创建新的数据库用户。

## 描述\{#description}

在 Zilliz Cloud 中，你可以创建集群用户并为其分配集群角色以定义权限，从而实现数据安全。

创建集群时，系统会自动创建一个名为 `db_admin` 的默认用户。此用户无法被删除。除该默认用户外，你还可以创建更多集群用户，以实现细粒度访问控制。

要管理集群用户，你必须是 **Organization Owner** 或 **Project Admin**，或拥有具备 **Cluster_Admin** 权限的角色。

<Admonition type="info" icon="📘" title="Notes">

此命令仅适用于 Dedicated 集群。你可以运行 `zilliz context set` 在集群之间切换。

</Admonition>

## 语法\{#synopsis}

```bash
zilliz user create
--user <value>
--password <value>
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--user** (*string*) -

    **[必需]**

    表示用户名。

    该值应为不超过 **32** 个字符的字符串，并且以**下划线 (_) 或字母**开头。

- **--password** (*string*) -

    **[必需]**

    表示密码。 

    密码应为至少 **8** 个字符的字符串，并且包含以下选项中的 **2** 种类型：

    - 大写字母 (A-Z)

    - 小写字母 (a-z)

    - 数字 (0-9)

    - 特殊字符（`!`、`@`、`#` 等）

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时，是否省略表头行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz user create --user my_user --password my_password
```
