---
title: "upgrade | Cloud"
slug: /cli/cli/Global-upgrade
sidebar_label: "upgrade"
beta: false
added_since: v1.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会通过检查最新的 GitHub release，并委托主机平台的官方安装脚本来自动更新 CLI。 | Cloud"
type: docx
token: ZCnedaDvloSUhwxvycSc4gwhnbf
sidebar_position: 3
keywords: 
  - Vector 检索
  - 音频相似性搜索
  - 弹性 vector database
  - Pinecone vs Milvus
  - zilliz
  - zilliz cloud
  - cloud
  - upgrade
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# upgrade

此操作会通过检查最新的 GitHub release，并委托主机平台的官方安装脚本来自动更新 CLI。

## 描述\{#description}

检查最新的 Zilliz CLI release，并在有可用升级时运行官方安装程序。使用 `--check` 可在不安装的情况下检查是否有可用升级。

## 概要\{#synopsis}

```bash
zilliz upgrade
[--check]
[--yes]
[--force]
```

## 选项\{#options}

- **--check** (*boolean*) -

    仅报告是否有更新版本可用。不会运行安装程序。

- **--yes** (*boolean*) -

    跳过确认提示。

- **--force** (*boolean*) -

    即使已是最新版本，也重新运行安装程序。

## 示例\{#example}

```bash
# Check for updates without installing
zilliz upgrade --check

# Upgrade with confirmation prompt
zilliz upgrade

# Upgrade without prompt
zilliz upgrade --yes

# Force re-install
zilliz upgrade --force --yes
```
