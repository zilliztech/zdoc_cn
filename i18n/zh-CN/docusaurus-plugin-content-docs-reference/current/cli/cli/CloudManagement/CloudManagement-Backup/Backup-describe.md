---
title: "describe | Cloud"
slug: /cli/cli/Backup-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取备份的详细信息。 | Cloud"
type: docx
token: OQIRdZ8iOoZxd1xNPHtcWPTBnye
sidebar_position: 3
keywords: 
  - 推荐系统
  - 信息检索
  - 降维
  - hnsw 算法
  - Zilliz
  - Zilliz Cloud
  - Cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作用于获取备份的详细信息。

## 描述\{#description}

在 Zilliz Cloud 中，备份是数据副本，可在数据丢失或系统故障时用于恢复整个集群或特定集合。

你可以运行此命令来获取备份的详细信息。

<Admonition type="info" icon="📘" title="注意">

此功能仅适用于 **Dedicated** 集群。

</Admonition>

## 概要\{#synposis}

```bash
zilliz backup describe
--cluster-id <value>
--backup-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必需]**

    表示集群 ID，类似于 `inxx-xxxxx`。

    如果使用 `zilliz context set` 配置了集群，则在此选项未配置时会自动应用该集群。

- **--backup-id** (*string*) -

    **[必需]**

    表示备份 ID，类似于 `backupx-xxxxx`。

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
zilliz backup describe \
--cluster-id in01-xxxx \
--backup-id backup-xxxx
```
