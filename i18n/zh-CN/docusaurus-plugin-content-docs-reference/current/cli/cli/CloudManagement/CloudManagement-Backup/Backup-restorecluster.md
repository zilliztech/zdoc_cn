---
title: "restore-cluster | Cloud"
slug: /cli/cli/Backup-restorecluster
sidebar_label: "restore-cluster"
beta: false
added_since: v0.1.x
last_modified: v1.4.x
deprecate_since: false
notebook: false
description: "此操作会将备份恢复到新的集群。 | Cloud"
type: docx
token: XAhudiqXqoHS1zxSDqgcNY9anxb
sidebar_position: 7
keywords: 
  - 检索增强生成
  - 大语言模型
  - 向量化
  - k 近邻算法
  - zilliz
  - zilliz cloud
  - cloud
  - restore-cluster
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# restore-cluster

此操作会将备份恢复到新的集群。

## 描述\{#description}

在 Zilliz Cloud 中，备份是数据的副本，可让你在发生数据丢失或系统故障时恢复整个集群或特定集合。

恢复集群会创建一个新的集群，并将所有已备份的集合复制到其中。不带选项运行此命令将触发一组交互式提示。

<Admonition type="info" icon="📘" title="Notes">

此功能仅适用于 **Dedicated** 集群。

</Admonition>

## 概要\{#synopsis}

```bash
zilliz backup restore-cluster
--cluster-id <value>
--backup-id <value>
--project-id <value>
--name <value>
--cu-size <value>
--collection-status <KEEP | RELEASE>
--restore-version-policy <LATEST | ORIGINAL>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[REQUIRED]**

    表示源集群 ID，类似于 `inxx-xxxxx`。

    如果使用 `zilliz context set` 配置了集群，则在未配置此选项时会自动应用该集群。

- **--backup-id** (*string*) -

    **[REQUIRED]**

    表示要恢复的备份 ID，类似于 `backupx-xxxxx`。

- **--project-id** (*string*) -

    **[REQUIRED]**

    表示目标项目 ID，类似于 `proj-xxxxx`

- **--name** (*string*) -

    **[REQUIRED]**

    表示新的集群名称。

- **--cu-size** (*integer*) -

    **[REQUIRED]**

    表示新集群的计算单元 (CU) 数量。

    CU 是用于并行处理数据的计算资源基本单位，不同 CU 类型由不同的 CPU、内存和存储组合构成。CU 概念仅适用于 **Dedicated** 集群。

    - 对于 **Standard** 项目中的 **Dedicated** 集群，其 CU 大小与副本数量的乘积必须小于或等于 32。

    - 对于 **Enterprise** 项目中的 **Dedicated** 集群，其 CU 大小与副本数量的乘积必须小于或等于 1,024。

- **--collection-status** (*string*) -

    **[REQUIRED]**

    表示恢复后的集合状态。

    可能的值：`KEEP` 和 `RELEASE`。

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

    表示用于筛选输出的 JMESPath 表达式。

- **--restore-version-policy** (*string*) -

    指定 DB 版本恢复策略。可能的值：`LATEST` 和 `ORIGINAL`。

## 示例\{#example}

```bash
# Restore with collections loaded
zilliz backup restore-cluster --cluster-id in01-xxxx \
--backup-id backup-xxxx \
--project-id proj-xxxx \
--name restored \
--cu-size 1 \
--collection-status KEEP \
--restore-version-policy LATEST
```
