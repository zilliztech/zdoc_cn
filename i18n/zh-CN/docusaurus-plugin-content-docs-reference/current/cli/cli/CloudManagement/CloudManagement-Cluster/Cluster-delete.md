---
title: "delete | Cloud"
slug: /cli/cli/Cluster-delete
sidebar_label: "delete"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个集群。此操作不可逆。| Cloud"
type: docx
token: S4Omd93kpoyuqtx4E7scLCoXnyB
sidebar_position: 2
keywords: 
  - knn
  - 图像搜索
  - LLMs
  - 机器学习
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

此操作会删除一个集群。此操作不可逆。

## 描述\{#description}

移除集群也会清除其中存储的数据。请谨慎操作。不带任何选项运行此命令会触发一组交互式提示。

## 语法\{#synopsis}

```bash
zilliz cluster delete
--cluster-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必需]**

    表示要删除的集群的 ID，类似于 `inxx-xxxxx`。

    如果已使用 `zilliz context set` 配置了集群，则在此选项未配置时会自动应用该集群。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

    - `json`，

    - `table`，

    - `text`，

    - `yaml`，

    - `csv`。

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时是否省略表头行。

- **--query, -q** (*string*) -

    表示用于过滤输出的 JMESPath 表达式。

- **--yes, -y** (*boolean*) -

    表示是否跳过确认提示。

## 示例\{#example}

```bash
zilliz cluster delete --cluster-id in01-xxxxxxxxxxxx

# Skip confirmation prompt
zilliz cluster delete --cluster-id in01-xxxxxxxxxxxx -y
```
