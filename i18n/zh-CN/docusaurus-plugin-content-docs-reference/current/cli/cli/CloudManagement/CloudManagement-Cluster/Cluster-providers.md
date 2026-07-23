---
title: "providers | Cloud"
slug: /cli/cli/Cluster-providers
sidebar_label: "providers"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会列出所有适用的云服务提供商。| Cloud"
type: docx
token: Rhked7rPvopHixxQZe6czSUwnvf
sidebar_position: 7
keywords: 
  - knn
  - 图像搜索
  - LLMs
  - 机器学习
  - zilliz
  - Zilliz Cloud
  - cloud
  - providers
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# providers

此操作会列出所有适用的云服务提供商。

## 概要\{#synopsis}

```bash
zilliz cluster providers
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

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
zilliz cluster providers
```
