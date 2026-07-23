---
title: "drop | Cloud"
slug: /cli/cli/Role-drop
sidebar_label: "drop"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个角色。 | Cloud"
type: docx
token: YzVadE24uorV0gx5Se3ceumqnDh
sidebar_position: 3
keywords: 
  - 图像相似性搜索
  - Context Window
  - 自然语言搜索
  - 相似性搜索
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

此操作会删除一个角色。

<Admonition type="info" icon="📘" title="Notes">

此命令仅适用于 Dedicated 集群。你可以运行 `zilliz context set` 在集群之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz role drop
--role <value>
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
[--database <value>]
[--yes]
```

## 选项\{#options}

- **--role** (*string*) -

    **[REQUIRED]**

    表示要删除的角色名称。

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

- **--database** (*string*) -

    表示数据库名称。该值默认为 `default`。

## 示例\{#example}

```bash
zilliz role drop --role my_role
```
