---
title: "regions | Cloud"
slug: /cli/cli/Cluster-regions
sidebar_label: "regions"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出云提供商的所有可用 region。 | Cloud"
type: docx
token: YHtudYo81oBKruxujL5cw0yZnxd
sidebar_position: 8
keywords: 
  - DiskANN
  - Sparse vector
  - Vector Dimension
  - ANN Search
  - zilliz
  - zilliz cloud
  - cloud
  - regions
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# regions

此操作列出云提供商的所有可用 region。

## 概要\{#synopsis}

```bash
zilliz cluster regions
--cloud-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

**选项：**

- **--cloud-id** (*string*) -

    指定一个云提供商。可能的值为：`aws`、`gcp` 和 `azure`。

- **--output, -o** (*string*) -

    指定输出格式。可能的值：

    - `json`，

    - `table`，

    - `text`，

    - `yaml`，

    - `csv`。

- **--no-header** (*boolean*) -

    指定当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    指定用于过滤输出的 JMESPath 表达式。

## 示例\{#example}

```bash
# List all regions
zilliz cluster regions

# List AWS regions only
zilliz cluster regions --cloud-id aws
```
