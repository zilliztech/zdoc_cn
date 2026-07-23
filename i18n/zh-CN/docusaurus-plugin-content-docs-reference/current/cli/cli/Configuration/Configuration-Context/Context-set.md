---
title: "set | Cloud"
slug: /cli/cli/Context-set
sidebar_label: "set"
beta: false
added_since: v0.1.x
last_modified: v1.4.x
deprecate_since: false
notebook: false
description: "此操作用于选择后续数据平面命令使用的默认集群端点和数据库。在运行 collection、vector、index、partition、user、role 或 alias 命令之前，请设置上下文。| Cloud"
type: docx
token: WF1JdhGAgodzpExXO1hcPjADn8b
sidebar_position: 3
keywords: 
  - 音频搜索
  - 什么是语义搜索
  - Embedding model
  - 图像相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - set
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# set

此操作用于选择后续数据平面命令使用的默认集群端点和数据库。在运行 collection、vector、index、partition、user、role 或 alias 命令之前，请设置上下文。

## 描述\{#description}

设置后续数据平面命令使用的默认集群端点和数据库。在运行 collection、vector、index、partition、user、role 或 alias 命令之前，请设置上下文。

## 概要\{#synopsis}

```bash
zilliz context set
[--cluster-id <value>]
[--endpoint <value>]
[--database <value>]
[--on-demand]
```

## 选项\{#options}

- **--cluster-id** (*string*) -

    指定后续数据平面命令要使用的集群。如果省略 --endpoint，CLI 会根据此集群 ID 解析集群端点。

- **--endpoint** (*string*) -

    直接指定集群端点。当你已经知道端点，或不希望 CLI 根据集群 ID 解析它时，请使用此选项。

- **--database** (*string*) -

    指定当前上下文中后续数据平面命令的默认数据库。此操作不会创建数据库。

- **--on-demand** (*boolean*) -

    解析按需集群的详细信息。当集群 ID 属于按需集群时，请使用此选项。

## 示例\{#example}

```bash
# Set context to a standard cluster
zilliz context set --cluster-id in01-xxxxxxxxxxxx

# Set context to an on-demand cluster
zilliz context set --cluster-id in-xxxxxxxxxxxx --on-demand

# Update the database for the current context
zilliz context set --database my_db
```
