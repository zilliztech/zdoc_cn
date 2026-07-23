---
title: "create | Cloud"
slug: /cli/cli/Role-create
sidebar_label: "create"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建一个新角色。 | Cloud"
type: docx
token: V9xIdjMEMowIh2xVJUUcvir6nUf
sidebar_position: 1
keywords: 
  - vector databases 比较
  - Faiss
  - 视频搜索
  - AI 幻觉
  - zilliz
  - zilliz cloud
  - cloud
  - create
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# create

此操作会创建一个新角色。

## 描述\{#description}

Zilliz Cloud 提供集群角色，供你在集群级别实现访问控制。有关详细信息，请阅读[访问控制说明](/docs/access-control-overview)。

<Admonition type="info" icon="📘" title="Notes">

此命令仅适用于 Dedicated 集群。你可以运行 `zilliz context set` 在集群之间切换。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz role create
--role <value>
[--output <json | table | text | yaml | csv]
[--no-header]
[--query <value>]
[--database <value>]
```

## 选项\{#options}

- **--role** (*string*) -

    **[必填]**

    表示角色名称。

    该值应为不超过 **255** 个字符的字符串，并且**以下划线 (_) 或字母开头**。

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

- **--database** (*string*) -

    表示数据库名称。该值默认为 `default`。

## 示例\{#example}

```bash
zilliz role create --role my_role
```
