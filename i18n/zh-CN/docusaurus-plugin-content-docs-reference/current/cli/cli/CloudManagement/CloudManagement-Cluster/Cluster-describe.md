---
title: "describe | Cloud"
slug: /cli/cli/Cluster-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于获取集群的详细信息。| Cloud"
type: docx
token: OgJTdgaTIoMPGGx0EmachVPKnHc
sidebar_position: 3
keywords: 
  - AI 聊天机器人
  - 余弦距离
  - 什么是 vector database
  - vectordb
  - zilliz
  - zilliz cloud
  - cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作用于获取集群的详细信息。

## 描述\{#description}

此命令返回集群的详细信息，包括：

- 集群显示名称 (`clusterName`)，

- 其所属项目的 ID (`projectId`)，

- 其所在的区域 (`regionId`)，

- 其使用的订阅计划 (`plan`)，

- 其当前状态 (`status`)，

- 其公共和私有连接端点（`connectAddress` 和 `privateLinkAddress`），

- 其创建时间 (`createTime`)，

- 其拥有的副本数 (`replica`)，

- 其 CU 大小（`cuSize`，对于免费集群和 Serverless 集群，该值始终为 0），

- 其存储大小 (`storageSize`) 和部署选项 (`deploymentOption`)，

- 已创建备份的数量（`snapshotNumber`，对于免费集群和 Serverless 集群，该值始终为 0），

- 为其配置的自动扩缩容策略 (`autoscaling`)。

## 概要\{#synopsis}

```bash
zilliz cluster describe
--cluster-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必需]**

    表示集群 ID。例如，`in01-xxxxxxxxxxxx`。

    如果使用 `zilliz context set` 配置了集群，则在此选项未配置时会自动应用该集群。

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

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz cluster describe --cluster-id in01-xxxxxxxxxxxx
```
