---
title: "create | Cloud"
slug: /cli/cli/OnDemandCluster-create
sidebar_label: "create"
beta: false
added_since: v1.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会在 Zilliz Cloud 中创建一个按需集群。| Cloud"
type: docx
token: IqkTduvaBo7477xaW1Hc1wBTn9c
sidebar_position: 1
keywords: 
  - rag llm 架构
  - 私有 llms
  - nn 搜索
  - llm 评估
  - zilliz
  - zilliz cloud
  - cloud
  - create
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# create

此操作会在 Zilliz Cloud 中创建一个按需集群。

## Description\{#description}

在 Zilliz Cloud 中创建一个按需集群。按需集群可以在空闲时挂起，并在出现查询工作负载时恢复。

## Synopsis\{#synopsis}

```bash
zilliz on-demand-cluster create
--project-id <value>
--region-id <value>
--cu-size <value>
--cluster-name <value>
[--session-ttl <value>]
[--max-query-node-cu <value>]
[--max-query-node-replicas <value>]
```

## Options\{#options}

- **--project-id** (*string*) -

    **[REQUIRED]**

    指定项目 ID。

- **--region-id** (*string*) -

    **[REQUIRED]**

    指定云区域（例如 `aws-us-east-1`）。

- **--cu-size** (*integer*) -

    **[REQUIRED]**

    指定计算单元数量。最小值：`8`。

- **--cluster-name** (*string*) -

    **[REQUIRED]**

    指定集群显示名称。最多 64 个字符。允许的字符：字母、数字、空格、`_`、`-` 和中文字符。

- **--session-ttl** (*string*) -

    指定自动挂起 TTL。格式：`<number><s|m|h>`（例如 `30m`、`1h`、`90s`）。最小值：`60s`。默认值：`60s`。

- **--max-query-node-cu** (*integer*) -

    指定最大查询节点 CU。

- **--max-query-node-replicas** (*integer*) -

    指定最大查询节点副本数。

## Example\{#example}

```bash
# Create with minimum requirements
zilliz on-demand-cluster create --project-id proj-xxxx --region-id aws-us-east-1 --cu-size 8 --cluster-name my-on-demand

# Create with custom TTL and query node limits
zilliz on-demand-cluster create --project-id proj-xxxx --region-id aws-us-east-1 --cu-size 16 --cluster-name my-cluster --session-ttl 30m --max-query-node-cu 4 --max-query-node-replicas 2
```
