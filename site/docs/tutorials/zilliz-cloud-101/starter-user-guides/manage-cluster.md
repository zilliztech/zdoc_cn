---
slug: /manage-cluster
sidebar_position: 7
---

# 管理集群

本文介绍如何通过 Zilliz Cloud 控制台管理集群。

## 连接集群 {#connect-to-cluster}

集群创建完成后，您可以在控制台看到如下信息：

![cluster-lifecycle](/img/cluster-lifecycle.png)

在**连接信息**区域，您可以找到用于连接到集群的公共 Endpoint 和 Token。

要连接到集群，您需要使用由冒号（:）连接的集群用户名和密码作为身份验证标记，如 **user:password**。有关更多相关信息，请参阅[连接集群](./connect-to-cluster)。

## 管理 Collection {#manage-collections}

在 **Collection** 页签下，您可以管理集群中的 Collection。您可以创建 Collection、将数据导入 Collection、加载或释放 Collection、重命名 Collection 和删除 Collection。

有关数据导入的详细信息，请参阅[批量导入数据](./bulk-insert-on-gui)。

![manage-collections](/img/manage-collections.png)

## 管理集群用户 {#manage-users}

在**用户**页签下，您可以添加用户、重置用户密码和删除用户。

![manage-users](/img/manage-users.png)

:::info 说明

不能删除 **db_admin **用户。对于已添加到集群中的用户，Zilliz Cloud 会向其授予集群中所有 Collection 的访问权限。

:::

## 管理备份 {#manage-backups}

在**操作**下拉列表中，您可以选择**创建备份快照**来为集群创建备份。您可以在**备份**页签下找到已创建的所有快照。有关备份和恢复的详细信息，请参阅[备份与恢复](./backup-and-restore)。

## 管理数据迁移 {#manage-data-migrations}

在**操作**下拉列表中，您可以选择**迁移数据**来创建数据迁移任务，以从 Milvus 迁移数据到 Zilliz Cloud 集群。有关更多信息，请参阅[迁移到 Zilliz Cloud](./migration-from-milvus)。

## 扩容集群 {#scale-up-cluster}

在**集群信息**区域，单击**大小**右侧的**扩容**，以打开**扩容集群**对话框。您可以为集群增加计算和存储资源。在对话框中，您最多可将集群资源扩展到 24 个 CU。如果您需要更大的 CU，请联系我们。

有关 CU 类型以及如何选择合适的 CU，请参阅 [CU 类型](./cu-types-explained-1)和[选择合适的 CU 类型](./choose-the-right-cu-type-and-size)。

:::caution 注意

扩容集群可能会导致几分钟的停机时间。请谨慎操作。

:::

## 设置 IP 白名单 {#set-up-whitelist}

在**集群信息**区域，单击 **IP 白名单**右侧的**前往配置**，可将指定 IP 地址段添加到白名单。将 IP 地址段添加到白名单后，Zilliz Cloud 只允许白名单 IP 地址段内的 IP 地址访问集群。若添加 0.0.0.0/0，则表示允许所有 IP 地址访问集群。

有关如何设置白名单的详细信息，请参阅[设置白名单](./set-up-whitelist)。

## 挂起 / 恢复集群 {#suspend-resume-cluster}

在**操作**下拉列表中，选择**挂起**以中断集群运行。在**挂起集群**对话框中确认此操作后，集群状态将从**运行中**变为**挂起中**，在此期间，您无法对集群执行其他操作。

一旦集群状态变为**挂起中**，您将只需为集群支付对应的存储费用。按需挂起部分集群可以为您节省资源成本。

| 云厂商 | 存储费用          |
| --- | ------------- |
| 阿里云 | ¥0.5 / GB / 月 |

要恢复挂起中的集群，请单击**操作**并从下拉列表中选择**恢复**。在**恢复集群**对话框中确认此操作后，集群的状态将从**挂起中**变为**恢复运行中**，然后再变为**运行中**。此时将根据集群 CU 大小和集群类型产生费用。

此外，您还可以通过 RESTful API 挂起或恢复集群。有关更多接口信息，请参阅 [Suspend Cluster](https://docs.zilliz.com.cn/reference/suspend-cluster) 和 [Resume Cluster](https://docs.zilliz.com.cn/reference/resume-cluster)。

## 删除集群 {#drop-cluster}

在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

## 相关文档 {#related-documents}

- [连接集群](./connect-to-cluster)

- [备份与恢复](./backup-and-restore)

- [迁移到 Zilliz Cloud](./migration-from-milvus)

- [CU 类型](./cu-types-explained-1)

- [选择合适的 CU 类型](./choose-the-right-cu-type-and-size)

- [设置白名单](./set-up-whitelist)

