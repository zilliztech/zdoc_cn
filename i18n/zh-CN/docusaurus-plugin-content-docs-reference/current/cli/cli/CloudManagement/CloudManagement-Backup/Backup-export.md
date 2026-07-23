---
title: "export | Cloud"
slug: /cli/cli/Backup-export
sidebar_label: "export"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将备份导出到外部存储。 | Cloud"
type: docx
token: MqCqdE8mqotzaXxk8nfcOvHinX0
sidebar_position: 5
keywords: 
  - 降维
  - hnsw 算法
  - 向量相似性搜索
  - 近似最近邻搜索
  - zilliz
  - Zilliz Cloud
  - Cloud
  - export
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# export

此操作将备份导出到外部存储。

## 描述\{#description}

在 Zilliz Cloud 中，备份是数据的副本，可让你在数据丢失或系统故障时恢复整个集群或特定集合。

你可以将备份文件导出到由其集成 ID 标识的集成存储服务。此操作是异步的，并将创建一个任务。你可以运行 [`zilliz job describe`](./Job-describe) 来获取任务的进度。

<Admonition type="info" icon="📘" title="Notes">

此功能仅适用于 **Dedicated** 集群。

</Admonition>

## 用法\{#usage}

```bash
zilliz backup export
--cluster-id <value>
--backup-id <value>
--integration-id <value>
[--directory <value>]
[--output <value>]
[--query <value>]
[--no-header]
```

**选项：**

- **--cluster-id** (*string*) -

    **[REQUIRED]**

    表示集群 ID，类似于 `inxx-xxxxx`。

    如果使用 `zilliz context set` 配置了集群，则在未配置此选项时会自动应用该集群。

- **--backup-id** (*string*) -

    **[REQUIRED]**

    表示备份 ID，类似于 `backupx-xxxxx`。

- **--integration-id** (*string*) -

    **[REQUIRED]**

    表示存储集成 ID，类似于 `integ-xxxxx`。

- **--directory** (*string*) -

    表示外部存储中的目标目录。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`，

    - `table`，

    - `text`，

    - `yaml`，

    - `csv`。

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz backup export --cluster-id in01-xxxx \
--backup-id backup-xxxx \
--integration-id integ-xxxx
```
