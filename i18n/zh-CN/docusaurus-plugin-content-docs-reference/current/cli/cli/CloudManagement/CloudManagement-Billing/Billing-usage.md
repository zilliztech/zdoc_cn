---
title: "usage | Cloud"
slug: /cli/cli/Billing-usage
sidebar_label: "usage"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于查询某个时间范围内的使用成本。| Cloud"
type: docx
token: FpDzdA1nSo6sOHxYxAhcTPCLn5d
sidebar_position: 4
keywords: 
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - zilliz
  - zilliz cloud
  - cloud
  - usage
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# usage

此操作用于查询某个时间范围内的使用成本。

## 描述\{#description}

Zilliz Cloud 为你的组织提供详细的使用情况信息，使你能够从不同维度进行成本分析。要访问发票，你必须拥有 **Organization Owner** 或 **Billing Admin** 权限。

## 概要\{#synopsis}

```bash
zilliz billing usage
[--last <value>]
[--month <value>]
[--start <value>]
[--end <value>]
[--output <value>]
```

## 选项\{#options}

- **--last** (*string*) -

    表示相对时间范围。

    使用 `d` 表示天，使用 `m` 表示月。要检索过去 7 天内的使用统计信息，请将此选项设置为 `7d`。

- **--month** (*string*) -

    表示按月份查询的表达式。例如，你可以使用 `2026-01`、`last`、`this` 等

- **--start** (*string*) -

    表示时间范围的开始日期，格式为 `YYYY-MM-DD` 或有效的 `ISO-8601` 时间戳。

- **--end** (*string*) -

    表示时间范围的结束日期，格式为 `YYYY-MM-DD` 或有效的 `ISO-8601` 时间戳。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

    - `json`,

    - `table`,

    - `text`.

## 示例\{#example}

```bash
zilliz billing usage --last 7d
```
