---
title: "create | Cloud"
slug: /cli/cli/Alert-create
sidebar_label: "create"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建新的告警规则。| Cloud"
type: docx
token: VSewdBpmioKEJ2xtGAHczoO5nWh
sidebar_position: 1
keywords: 
  - RAG
  - NLP
  - 神经网络
  - 深度学习
  - zilliz
  - Zilliz Cloud
  - cloud
  - create
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# create

此操作会创建新的告警规则。

## 描述\{#description}

Zilliz Cloud 允许你配置告警规则，以接收有关关注事件的通知。告警分为组织告警和项目告警。

组织告警用于监控整个 Zilliz Cloud 组织中的计费和账户相关指标。与专注于集群性能的项目告警不同，组织告警可帮助你跟踪信用余额、付款方式和使用模式，以确保服务不中断并防止意外计费问题。通过及时接收有关信用耗尽、付款失败和使用阈值的通知，及时了解账户健康状况并避免服务中断。

项目告警会在满足指定条件时发送通知，从而支持对 Zilliz Cloud 集群进行主动监控。你可以配置项目告警来监控集群指标，例如 CU 容量和查询性能，确保在出现需要关注的潜在问题时立即收到通知。

Zilliz Cloud 中的告警通知会让你及时了解集群内发生的事件。默认情况下，这些通知会发送到指定的用户邮箱地址。不过，你也可以使用 webhook 设置自定义通知渠道，以实现更集成、事件驱动的通知。

在不带任何选项的情况下运行此命令会触发一组交互式提示，帮助你完成设置。

## 概要\{#synopsis}

```bash
zilliz alert create
--project-id <value>
--metric-name <value>
--threshold <value>
--comparison <value>
[--rule-name <value>]
[--level <WARNING | CRITICAL>]
[--window-size <value>]
[--cluster-id <value>]
[--action <value>]
[--send-resolved]
[--repeat-interval <value>]
[--enabled]
[--output <json | table | text>]
```

## 选项\{#options}

- **--project-id** (*string*) -

    **[必需]**

    表示 Project ID，类似于 `proj-xxxxx`。

    如果已使用 `zilliz context set` 配置项目，并且此选项未配置，则会自动应用该项目。

- **--metric-name** (*string*) -

    **[必需]**

    表示要监控的指标。可能的值：

    - `CU_COMPUTATION`

    - `CU_CAPACITY`

    - `REQ_SEARCH_COUNT`

    - `REQ_QUERY_COUNT`

    - `REQ_SEARCH_LATENCY_P99`

    - `REQ_QUERY_LATENCY_P99`

    - `REQ_SEARCH_FAILURE_RATE`

    - `REQ_QUERY_FAILURE_RATE`

    - `TOTAL_ENTITIES`

    - `CREDIT_CARD_EXPIRATION`

    - `FREE_CREDITS_BALANCE`

    - `WALLET_BALANCE`

    - `DAILY_USAGE`

- **--threshold** (*string*) -

    **[必需]**

    表示所选指标的阈值。

- **--comparison** (*string*) -

    **[必需]**

    表示比较运算符。

    选项：`>`（或 `gt`）、`<`（或 `lt`）、`>=`（或 `gte`）、`<=`（或 `lte`）、`=`（或 `eq`）。

- **--rule-name** (*string*) -

    表示告警规则的显示名称。

- **--level** (*string*) -

    表示告警严重级别。该值默认为 `WARNING`。

    可能的值：`WARNING`、`CRITICAL`。

- **--window-size** (*string*) -

    表示监控窗口。例如，`5m`、`15m`、`1h` 等。

- **--cluster-id** (*array*) -

    表示目标集群 ID。

    你可以在同一命令中将此选项与不同的集群 ID 一起使用。如果已使用 `zilliz context set` 配置集群，并且此选项未配置，则会自动应用该集群。

- **--action** (*array*) -

    表示通知操作，格式为 `type:config`。例如，`email:user*@*example.com`。

    你可以在同一命令中将此选项与不同的集群 ID 一起使用。

- **--send-resolved** (*string*) -

    表示在告警解除时是否发送通知。

- **--repeat-interval** (*integer*) -

    表示发送通知的间隔，单位为秒。

- **--enabled** (*string*) -

    表示是否启用该规则。此选项默认为 true。

- **--output, -o** (*string*) -

    表示输出格式。可能的值：

    - `json`，

    - `table`，

    - `text`。

## 示例\{#example}

```bash
zilliz alert create --project-id porj-xxxx \
--metric-name WALLET_BALANCE \
--threshold 100 \
--comparison eq \
--rule-name wallet-watch \
--level warning \
--window-size 1d \
--cluster-id inx-xxxx \
--action email:john.doe@zilliz.com \
--send-resolved \
--repeat-interval 300 \
--enabled
```
