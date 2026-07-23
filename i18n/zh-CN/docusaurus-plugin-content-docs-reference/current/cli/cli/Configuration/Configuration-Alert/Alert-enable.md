---
title: "enable | Cloud"
slug: /cli/cli/Alert-enable
sidebar_label: "enable"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于启用告警规则。| Cloud"
type: docx
token: MLrJdT9TdojvcJxhauic8s9anBf
sidebar_position: 4
keywords: 
  - 开源 vector database
  - Vector index
  - vector database 开源
  - 开源 vector db
  - zilliz
  - zilliz cloud
  - cloud
  - enable
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# enable

此操作用于启用告警规则。

## 描述\{#description}

只有已启用的告警规则才会生效。你可以根据需要运行此命令来启用指定的告警规则。

## 概要\{#synopsis}

```bash
zilliz alert enable
--id <value>
[--project-id <value>]
[--output <json | table | text>]
```

## 选项\{#options}

- **--id** (*string*) -

    **[必填]**

    表示要启用的告警规则的 ID，例如 `alert-xxxxx`。要获取现有告警规则的完整列表，请运行 `zilliz alert list`。

- **--project-id** (*string*) -

    如果你希望从列表中选择告警规则，则表示项目 ID。

    如果已使用 `zilliz context set` 配置了项目，并且此选项未配置，则会自动应用该项目。

- **--output, -o** (*string*) -

    表示输出格式。可选值：

    - `json`，

    - `table`，

    - `text`。

## 示例\{#example}

```bash
zilliz alert enable --id xxxx
```
