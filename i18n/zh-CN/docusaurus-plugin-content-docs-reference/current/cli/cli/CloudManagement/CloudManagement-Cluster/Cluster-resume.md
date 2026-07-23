---
title: "resume | Cloud"
slug: /cli/cli/Cluster-resume
sidebar_label: "resume"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会恢复已暂停的集群。 | Cloud"
type: docx
token: EfaUd8o9LoguWnx6jndcyTJfnzd
sidebar_position: 9
keywords: 
  - Zilliz
  - milvus vector database
  - milvus db
  - milvus vector db
  - zilliz
  - zilliz cloud
  - cloud
  - resume
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# resume

此操作会恢复已暂停的集群。

## 概要\{#synopsis}

```bash
zilliz cluster resume
--cluster-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必需]**

    表示要恢复的集群的 ID。

    如果已使用 `zilliz context set` 配置了集群，则在未配置此选项时会自动应用该集群。

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
zilliz cluster resume --cluster-id in01-xxxxxxxxxxxx
```
