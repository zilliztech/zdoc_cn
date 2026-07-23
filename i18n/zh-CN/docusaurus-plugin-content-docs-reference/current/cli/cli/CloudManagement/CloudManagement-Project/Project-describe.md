---
title: "describe | Cloud"
slug: /cli/cli/Project-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取项目的详细信息。| Cloud"
type: docx
token: OBDNd4bW2oCJqhxEPDSccggSnif
sidebar_position: 2
keywords: 
  - Chroma vector database
  - nlp 搜索
  - llm 幻觉
  - 多模态搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作用于获取项目的详细信息。

## Synopsis\{#synopsis}

```bash
zilliz project describe
--project-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## Options\{#options}

- **--project-id** (*string*) -

    **[REQUIRED]**

    表示项目 ID，类似于 `proj-xxxxx`。

- **--output, -o** (*string*) -

    表示输出格式。可取值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略标题行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

## Example\{#example}

```bash
zilliz project describe --project-id proj-xxxxxxxxxxxx
```
