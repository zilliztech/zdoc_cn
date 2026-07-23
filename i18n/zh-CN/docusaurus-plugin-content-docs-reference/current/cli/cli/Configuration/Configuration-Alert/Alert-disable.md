---
title: "disable | Cloud"
slug: /cli/cli/Alert-disable
sidebar_label: "disable"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会禁用一条告警规则。 | Cloud"
type: docx
token: AVX3dxX68oYAc1x06uVc7bgcnx1
sidebar_position: 3
keywords: 
  - vector database 开源
  - 开源 vector db
  - vector database 示例
  - rag vector database
  - zilliz
  - zilliz cloud
  - cloud
  - disable
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# disable

此操作会禁用一条告警规则。

## 描述\{#description}

当暂时不需要指定的告警规则时，你可以运行此命令将其禁用。被禁用的告警规则仍然存在，你可以根据需要启用其中任何规则。

## 概要\{#synopsis}

```bash
zilliz alert disable
--id <value>
[--project-id <value>]
[--output <json | table | text>]
```

## 选项\{#options}

- **--id** (*string*) -

    **[REQUIRED]**

    表示要禁用的告警规则 ID，例如 `alert-xxxx`。要获取现有告警规则的完整列表，请运行 `zilliz alert list`。

- **--project-id** (*string*) -

    表示从列表中选择告警规则时使用的项目 ID。

    如果已使用 `zilliz context set` 配置了项目，则在此选项未配置时会自动应用该项目。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

    - `json`,

    - `table`,

    - `text`.

## 示例\{#example}

```bash
zilliz alert disable --id xxx
```
