---
displayed_sidebar: cliSidebar
sidebar_label: 概述
slug: /cli/overview
beta: FALSE
notebook: FALSE
sidebar_position: 0
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Zilliz CLI 参考

Zilliz Command Line Interface () 提供了一个命令行工具，用于管理你的 Zilliz Cloud 资源并执行数据操作。

## 功能

- **云管理** - 管理集群、项目、卷和备份
- **配置** - 配置身份验证、告警和 CLI 设置
- **数据操作** - 管理集合、数据库、索引，并执行向量搜索

## 快速开始

### 安装

<Tabs groupId="cli-install" defaultValue='linux' values={[{"label":"macOS / Linux","value":"linux"},{"label":"Windows","value":"windows"}]}>
<TabItem value="linux">

```bash
curl -fsSL https://raw.githubusercontent.com/zilliztech/zilliz-cli/master/install.sh | bash
```

</TabItem>
<TabItem value="windows">

```bash
irm https://raw.githubusercontent.com/zilliztech/zilliz-cli/master/install.ps1 | iex
```

</TabItem>
</Tabs>

### 身份验证

```bash
zilliz login
```

### 创建集群

```bash
zilliz cluster create --name my-cluster --type serverless
```

## 命令类别

### 云管理
- [Backup](/reference/cli/CloudManagement-Backup) - 创建、恢复和管理备份
- [Cluster](/reference/cli/CloudManagement-Cluster) - 创建、暂停、恢复和删除集群
- [Import](/reference/cli/CloudManagement-Import) - 导入数据
- [Job](/reference/cli/CloudManagement-Job) - 管理作业
- [Project](/reference/cli/CloudManagement-Project) - 管理项目
- [Volume](/reference/cli/CloudManagement-Volume) - 管理存储卷

### 配置
- [Auth](/reference/cli/Configuration-Auth) - 登录、登出和切换账户
- [Configure](/reference/cli/Configuration-Configure) - 设置和获取配置值
- [Context](/reference/cli/Configuration-Context) - 管理 CLI 上下文
- [Alert](/reference/cli/Configuration-Alert) - 创建和管理告警
- [Completion](/reference/cli/Configuration-Completion) - Shell 补全设置

### 数据操作
- [Collection](/reference/cli/DataOperations-Collection) - 创建、描述和管理集合
- [Database](/reference/cli/DataOperations-Database) - 管理数据库
- [Index](/reference/cli/DataOperations-Index) - 创建和管理索引
- [Partition](/reference/cli/DataOperations-Partition) - 创建和管理分区
- [Role](/reference/cli/DataOperations-Role)
- [User](/reference/cli/DataOperations-User) - 管理用户
- [Vector](/reference/cli/DataOperations-Vector) - 插入、搜索和查询向量



## 开始使用

- [身份验证](/reference/cli/cli/Auth-login)
- [创建集群](/reference/cli/cli/Cluster-create)
- [创建集合](/reference/cli/cli/Collection-create)
