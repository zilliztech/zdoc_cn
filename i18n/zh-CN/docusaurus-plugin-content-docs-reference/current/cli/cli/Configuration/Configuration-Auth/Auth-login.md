---
title: "login | Cloud"
slug: /cli/cli/Auth-login
sidebar_label: "login"
beta: false
added_since: v0.1.x
last_modified: v1.4.x
deprecate_since: false
notebook: false
description: "此操作使用 Zilliz Cloud 对 CLI 进行身份验证，并保存登录状态以供后续命令使用。交互式本地使用时请使用浏览器登录，脚本或无头环境中请使用 API key 登录；登录 Zilliz Cloud 中国站点时，请将 `--cn` 与 `--api-key` 一起使用。 | Cloud"
type: docx
token: GaWqdekPvokCUtxBjRTcpNxInXg
sidebar_position: 1
keywords: 
  - 什么是 vector embeddings
  - vector database 教程
  - vector databases 如何工作
  - vector db 对比
  - zilliz
  - zilliz cloud
  - cloud
  - login
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# login

此操作使用 Zilliz Cloud 对 CLI 进行身份验证，并保存登录状态以供后续命令使用。交互式本地使用时请使用浏览器登录，脚本或无头环境中请使用 API key 登录；登录 Zilliz Cloud 中国站点时，请将 `--cn` 与 `--api-key` 一起使用。

## 描述\{#description}

使用 Zilliz Cloud 对 CLI 进行身份验证，并保存登录状态以供后续命令使用。交互式本地使用时请使用浏览器登录，脚本或无头环境中请使用 API key 登录。

## 概要\{#synopsis}

```bash
zilliz login
[--api-key <value>]
[--no-browser]
[--cn]
```

## 选项\{#options}

- **--api-key** (*string*) -

    使用 API key 进行身份验证，而不是浏览器 OAuth。如果提供该选项但未提供值，则会以交互方式提示输入。

- **--no-browser** (*boolean*) -

    使用设备代码流程，而不打开浏览器。

- **--cn** (*boolean*) -

    向 Zilliz Cloud 中国站点进行身份验证。中国站点使用 API key 登录，因此请将 `--cn` 与 `--api-key` 结合使用。

## 示例\{#example}

```bash
# Browser OAuth login
zilliz login

# Login with API key
zilliz login --api-key sk-xxxxxxxxxxxx

# Login to the Zilliz Cloud China site
zilliz login --cn --api-key sk-xxxxxxxxxxxx
```
