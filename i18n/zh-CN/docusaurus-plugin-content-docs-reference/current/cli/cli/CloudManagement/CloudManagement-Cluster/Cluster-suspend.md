---
title: "suspend | Cloud"
slug: /cli/cli/Cluster-suspend
sidebar_label: "suspend"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会暂停正在运行的集群。暂停会停止计算费用。| Cloud"
type: docx
token: RjlQdGJyzolWm0xZVyUc6yAdnyc
sidebar_position: 10
keywords: 
  - 音频相似性搜索
  - 弹性向量数据库
  - Pinecone vs Milvus
  - Chroma vs Milvus
  - zilliz
  - Zilliz Cloud
  - cloud
  - suspend
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# suspend

此操作会暂停正在运行的集群。暂停会停止计算费用。

## 概要\{#synopsis}

```bash
zilliz cluster suspend
--cluster-id <value>
[--output <value>]
[--query <value>]
[--no-header]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    **[必需]**

    表示要暂停的集群的 ID。

    如果使用 `zilliz context set` 配置了集群，则在此选项未配置时会自动应用该集群。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`,

    - `table`,

    - `text`,

    - `yaml`,

    - `csv`.

- **--no-header** (*boolean*) -

    表示当输出设置为 `table` 或 `csv` 时，是否省略表头行。

- **--query, -q** (*string*) -

    表示用于筛选输出的 JMESPath 表达式。

## 示例\{#example}

```bash
zilliz cluster suspend --cluster-id in01-xxxxxxxxxxxx
```
