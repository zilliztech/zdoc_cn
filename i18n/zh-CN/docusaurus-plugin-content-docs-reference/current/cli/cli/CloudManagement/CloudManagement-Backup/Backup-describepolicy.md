---
title: "describe-policy | Cloud"
slug: /cli/cli/Backup-describepolicy
sidebar_label: "describe-policy"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作描述集群的备份策略。 | Cloud"
type: docx
token: WcQadTMuCo9voCxPT86cxFzFnkf
sidebar_position: 4
keywords: 
  - milvus vector database
  - milvus db
  - milvus vector db
  - Zilliz Cloud
  - zilliz
  - zilliz cloud
  - cloud
  - describe-policy
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe-policy

此操作描述集群的备份策略。

## 描述\{#description}

Zilliz Cloud 允许你为集群启用**自动备份**，帮助确保在出现意外问题时能够恢复数据。自动备份适用于**整个集群**——不支持自动备份单个 collection。

你可以运行此命令来了解应用于指定集群的当前自动备份策略的设置。

<Admonition type="info" icon="📘" title="说明">

此功能仅适用于 **Dedicated** 集群。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz backup describe-policy
--cluster-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[REQUIRED]**

    表示一个集群 ID，类似于 `inxx-xxxxx`。

    如果已使用 `zilliz context set` 配置了集群，则在未配置此选项时会自动应用该集群。

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

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz backup describe-policy --cluster-id in01-xxxxxxxxxxxx
```
