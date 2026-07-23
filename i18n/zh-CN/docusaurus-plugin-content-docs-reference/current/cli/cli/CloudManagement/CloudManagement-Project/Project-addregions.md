---
title: "add-regions | Cloud"
slug: /cli/cli/Project-addregions
sidebar_label: "add-regions"
beta: false
added_since: v1.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将其他地域绑定到现有项目。 | Cloud"
type: docx
token: JP80dUdphoM5N9xsTFTccZeRnhp
sidebar_position: 5
keywords: 
  - AI 聊天机器人
  - 余弦距离
  - 什么是 vector database
  - vectordb
  - zilliz
  - zilliz cloud
  - cloud
  - add-regions
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# add-regions

此操作将其他地域绑定到现有项目。

## 描述\{#description}

将其他地域绑定到现有的 Zilliz Cloud 项目。重复使用 `--region` 可在一个命令中添加多个地域。

## 概要\{#synopsis}

```bash
zilliz project add-regions
--project-id <value>
--region <value>
[--api-key <value>]
```

## 选项\{#options}

- **--project-id** (*string*) -

    指定要绑定其他地域的项目 ID。

- **--region** (*array*) -

    **[REQUIRED]**

    要添加的地域 ID（可重复，例如 **--region aws-us-east-1 --region gcp-us-west1**）。

- **--api-key** (*string*) -

    指定此命令使用的 API key。此值会覆盖环境变量或已配置的 API key。

## 示例\{#example}

```bash
zilliz project add-regions --project-id proj-xxxx --region aws-us-east-1
zilliz project add-regions --project-id proj-xxxx --region aws-us-east-1 --region gcp-us-west1
```
