---
title: "delete | Cloud"
slug: /cli/cli/Volume-delete
sidebar_label: "delete"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个 volume。| Cloud"
type: docx
token: CgVKdrm2YoAiM8xBvFacmxpWnrb
sidebar_position: 2
keywords: 
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - delete
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# delete

此操作会删除一个 volume。

## 概要\{#synopsis}

```bash
zilliz volume delete
--name <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必填]**

    表示要删除的 volume 名称。

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
zilliz volume delete --name my-volume
```
