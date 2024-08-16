---
slug: /restore-from-snapshot
beta: FALSE
notebook: FALSE
type: origin
token: NtkswF6UEi3kB0k8XSEcOKkhnld
sidebar_position: 4
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 恢复

---

import Admonition from '@theme/Admonition';


# 恢复备份

本文介绍如何从备份中恢复 Zilliz Cloud 集群或 Collection。您只能使用状态为“创建完成”的备份文件进行集群或 Collection 恢复。

## 前提条件{#before-you-start}

开始前，请确保：

- 您是目标组织中的[组织管理员](./user-roles#organization-roles)或[项目管理员](./user-roles#project-roles)。

- 您的集群为 Dedicated 版本。

## 恢复集群{#restore-a-cluster}

点击左侧导航栏中的**备份**。找到需要恢复的备份文件。如需恢复集群，请选择备份类型为“集群”的备份文件。单击**操作列**中的**...**按钮，然后选择**恢复集群**。

然后根据提示设置恢复后集群的属性。

![restore_cluster](/img/restore_cluster.png)

设置属性时，需注意以下几点：

- 您可以通过备份文件将集群恢复到不同的项目中，但恢复后的集群不能和源集群位于不同的云服务提供商和地域。

- 您可以选择是否保留集群 Collection 的加载状态。

- 您可以重命名目标集群并重置集群大小和用户名密码。但不可以更改集群的 CU 类型。

在单击**恢复**后，Zilliz Cloud 会使用指定的属性创建目标集群，然后将快照中的 Collection 还原到目标集群中。

Zilliz Cloud 将生成一条恢复任务。您可前往[任务中心](./job-center)查看任务状态和进度。如果任务状态从**进行中**变更为**成功**，则代表集群恢复成功。

## 恢复 Collection{#restore-a-collection}

点击左侧导航栏中的**备份**。找到需要恢复的备份文件。如需恢复 Collection，请选择备份类型为“Collection”的备份文件。单击**操作列**中的**...**按钮，然后选择**恢复 Collection**。

然后根据提示设置恢复后 Collection 的属性。

![restore_collection](/img/restore_collection.png)

设置属性时，需注意以下几点：

- 您可以通过备份文件将 Collection 恢复到不同的项目和不同的集群中。但目标集群的状态必须为“运行中”。

- 您可以选择是否加载恢复后的 Collection。

- 您可以重命名目标 Collection。

在单击**恢复**后，Zilliz Cloud 会使用指定的属性创建目标 Collection。

Zilliz Cloud 将生成一条恢复任务。您可前往[任务中心](./job-center)查看任务状态和进度。如果任务状态从**进行中**变更为**成功**，则代表 Collection 恢复成功。

## 相关文档{#related-topics}

- [创建备份快照](./create-snapshot)

- [创建自动备份](./schedule-automatic-backups)

- [查看备份快照](./view-snapshot-details)

- [删除备份快照](./delete-snapshot)

