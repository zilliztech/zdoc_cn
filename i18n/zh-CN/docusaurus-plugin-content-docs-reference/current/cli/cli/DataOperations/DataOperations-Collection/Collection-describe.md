---
title: "describe | Cloud"
slug: /cli/cli/Collection-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取 collection 的详细信息。 | Cloud"
type: docx
token: A2rOdHew3oMHWNx6ngFc4nAbnyg
sidebar_position: 3
keywords: 
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作用于获取 collection 的详细信息。

## 概要\{#synopsis}

```bash
zilliz collection describe
--name <value>
[--database <value>]
[--output <json | table | text | yaml | csv>]
[--no-header]
[--query <value>]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必需]**

    表示 collection 名称。

- **--database** (*string*) -

    表示 database 名称。

    如果已使用 `zilliz context set` 配置 cluster，则在未配置此选项时，会自动应用其所属的 database。

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
zilliz collection describe --name my_collection
```
