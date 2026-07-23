---
title: "create | Cloud"
slug: /cli/cli/Project-create
sidebar_label: "create"
beta: false
added_since: v0.1.x
last_modified: v1.4.x
deprecate_since: false
notebook: false
description: "此操作会创建一个新项目。 | Cloud"
type: docx
token: GXhEdTZt9or6nix81GtcENu9n0f
sidebar_position: 1
keywords: 
  - milvus
  - Zilliz
  - milvus vector database
  - milvus db
  - zilliz
  - zilliz cloud
  - cloud
  - 创建
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# create

此操作会创建一个新项目。

## 描述\{#description}

创建一个新的 Zilliz Cloud 项目。如需在创建项目时绑定一个或多个区域，请一次或多次使用 `--region`。

## 概要\{#synopsis}

```bash
zilliz project create
--name <value>
--plan <value>
[--region <value>]
[--api-key <value>]
```

## 选项\{#options}

- **--name** (*string*) -

    **[必需]**

    指定项目名称。

- **--plan** (*string*) -

    **[必需]**

    指定订阅计划。可选值：`Standard`、`Enterprise`、`BusinessCritical`。

- **--region** (*array*) -

    指定要绑定的区域 ID（可重复，例如 `--region aws-us-east-1 --region gcp-us-west1`）。

- **--api-key** (string) -

    指定此命令使用的 API 密钥。此值会覆盖环境变量或已配置的 API 密钥。

## 示例\{#example}

```bash
# Create a project without regions
zilliz project create --name my-project --plan Standard

# Create a project with multiple regions
zilliz project create --name my-project --plan Standard --region aws-us-east-1 --region gcp-us-west1
```
