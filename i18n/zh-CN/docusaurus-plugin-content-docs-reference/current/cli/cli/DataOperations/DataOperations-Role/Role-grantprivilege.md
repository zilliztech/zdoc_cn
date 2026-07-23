---
title: "grant-privilege | Cloud"
slug: /cli/cli/Role-grantprivilege
sidebar_label: "grant-privilege"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作授予角色一项权限。 | Cloud"
type: docx
token: U83ddOym4o7WgAx1ekac4nFHnzf
sidebar_position: 4
keywords: 
  - 向量化
  - k 近邻算法
  - ANNS
  - vector search
  - zilliz
  - Zilliz Cloud
  - 云
  - grant-privilege
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# grant-privilege

此操作授予角色一项权限。

## 描述\{#description}

**权限**是指对某些 Zilliz Cloud 资源（例如 cluster、database 和 collection）执行特定操作的许可。权限会分配给角色，然后角色再授予用户，从而定义用户可以对资源执行的操作。权限的一个示例可以是向名为 `collection_01` 的 collection 插入数据的许可。

**权限组**是多个单独权限的组合。你可以创建一个包含常用权限的权限组，以简化角色授予流程。为便于使用，Zilliz Cloud 在 collection、database 和 cluster 级别提供了 9 个内置权限组。

可能的权限列在[权限和权限组](/docs/cluster-privileges)中。

<Admonition type="info" icon="📘" title="Notes">

此命令仅适用于 Dedicated clusters。你可以运行 `zilliz context set` 在 clusters 之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz role grant-privilege
--role <value>
--object-type <Global | Collection | Database>
--object-name <value>
--privilege <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--role** (*string*) -

    **[必填]**

    表示角色名称。

- **--object-type** (*string*) -

    **[必填]**

    表示对象类型。可能的值：

    - `Global`，

    - `Collection`，

    - `Database`。

- **--object-name** (*string*) -

    **[必填]**

    表示对象名称。你可以使用 `'*'` 来包含指定类型的所有对象。

- **--privilege** (*string*) -

    **[必填]**

    表示权限名称。你可以使用 `'*'` 来包含所有权限。可能的权限列在[权限和权限组](/docs/cluster-privileges)中。

- **--database** (*string*) -

    表示 database 名称。

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
# Grant search on a specific collection
zilliz role grant-privilege --role my_role --object-type Collection --object-name my_col --privilege Search

# Grant all privileges on all collections
zilliz role grant-privilege --role my_role --object-type Collection --object-name '*' --privilege '*'
```
