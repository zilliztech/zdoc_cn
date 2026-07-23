---
title: "list | Cloud"
slug: /cli/cli/Project-list
sidebar_label: "list"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有项目。| Cloud"
type: docx
token: KZ5gdkIy0ojiWixSU0dc6C5KnEd
sidebar_position: 3
keywords: 
  - 视频去重
  - 视频相似性搜索
  - Vector 检索
  - 音频相似性搜索
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

此操作列出所有项目。

## 概要\{#synopsis}

```bash
zilliz project list
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--output, -o** (*string*) -

    指定输出格式。可能的值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    指定当输出设置为 `table` 或 `csv` 时是否省略标题行。

- **--query, -q** (*string*) -

    指定用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz project list
```
