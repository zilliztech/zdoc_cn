---
slug: /manage-cluster
beta: FALSE
notebook: FALSE
token: IRirwe30tilo1qkJlR7ca2MUnvn
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 管理集群

本文介绍如何通过 Zilliz Cloud 控制台管理集群。

### 连接集群{#connect-to-cluster}

在**连接信息**区域，您可以找到用于连接到集群的公共 Endpoint 和 Token。

更多相关信息，请参阅[连接集群](./connect-to-cluster)。

### 删除集群{#drop-cluster}

在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

## Dedicated 集群{#dedicated-cluster}

集群创建完成后，您可以在控制台看到如下信息：

![cluster-lifecycle](/img/cluster-lifecycle.png)

### 连接集群{#establish-connection}

在**连接信息**区域，您可以找到用于连接到集群的公共 Endpoint 和 Token。

要连接到集群，您需要使用由冒号（:）连接的集群用户名和密码作为身份验证标记，如 **user:password**。有关更多相关信息，请参阅[连接集群](./connect-to-cluster)。

### 管理 Collection{#manage-collections-and-data}

![manage-collections](/img/manage-collections.png)

- Collection

    在 **Collection** 页签下，您可以管理集群中的 Collection。具体来说，您可以创建 Collection、将数据导入 Collection、加载或释放 Collection、重命名 Collection 及删除 Collection。

    有关数据导入的详细情况，可以参考[数据导入](https://docs.zilliz.com.cn/docs/data-import)。

- 备份

    在 Cluster 详情页右上角的**操作**下拉菜单中，可以选择**创建备份快照**。你可以在备份页签中找到所有已创建的备份快照。关于备份与恢复的详细情况，可参考[备份与恢复](https://docs.zilliz.com.cn/docs/backup-and-restore)。

- 数据迁移

    在 Cluster 详情页右上角的**操作**下拉菜单中，可以选择**迁移数据**。有关数据迁移的详细情况，可以参考[数据迁移](https://docs.zilliz.com.cn/docs/migrations)。

### 用户与访问控制{#users-and-access-control}

- 用户

    在**用户**页签下，您可以添加用户、重置用户密码和删除用户。

    ![manage-users](/img/manage-users.png)

    <Admonition type="info" icon="📘" title="说明">

    <p>不能删除 **db_admin **用户。对于已添加到集群中的用户，Zilliz Cloud 会向其授予集群中所有 Collection 的访问权限。</p>

    </Admonition>

- 私网连接

    在**集群详情**页签的**连接信息**区域下方，单击 **+ 创建私网连接**，可创建私网连接。使用私网连接可以避免通过公网访问当前项目中的集群，确保数据安全。

    关于私网连接的更多配置，请参阅[创建私网连接](./setup-a-private-link)。

- 白名单

    在**集群详情**页签的**集群信息**区域，单击** IP 白名单**旁的**前往配置**可添加白名单地址。

    - 地址列表为空时，白名单不生效。任意地址均可访问当前项目中的集群。

    - 在添加任意一条非全零（0.0.0.0/0）的记录后，白名单生效。此时，Zilliz Cloud仅允许已添加网段中的IP地址访问当前项目中的集群。

    关于白名单的更多配置，请参阅[设置白名单](./set-up-whitelist)。

### 管理和设置集群{#manage-and-configure-clusters}

#### 管理备份{#manage-backups}

在**操作**下拉列表中，您可以选择**创建备份快照**来为集群创建备份。您可以在**备份**页签下找到已创建的所有快照。有关备份和恢复的详细信息，请参阅[备份与恢复](https://docs.zilliz.com.cn/docs/backup-and-restore)。

#### 管理数据迁移{#manage-migrations}

在**操作**下拉列表中，您可以选择**迁移数据**来创建数据迁移任务，以从 Milvus 迁移数据到 Zilliz Cloud 集群。有关更多信息，请参阅[数据迁移](https://docs.zilliz.com.cn/docs/migrations)。

#### 扩容集群{#scale-up-cluster}

在**集群信息**区域，单击**大小**右侧的**扩容**，以打开**扩容集群**对话框。您可以为集群增加计算和存储资源。在对话框中，您最多可将集群资源扩展到 24 个 CU。如果您需要更大的 CU，请联系我们。

有关 CU 类型以及如何选择合适的 CU，请参阅[选择合适的 CU 类型](./cu-types-explained)。

<Admonition type="caution" icon="🚧" title="警告">

<p>扩容集群可能会导致几分钟的停机时间。请谨慎操作。</p>

</Admonition>

#### 缩容集群{#scale-down-cluster}

如果您需要缩小集群 CU 大小，请先创建一个新集群，并在创建时选择您需要的 CU 大小。随后，将原集群中的数据[迁移](./migrate-between-clusters#dedicated-procedure)至新集群中。如在迁移过程中遇到任何问题，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

<Admonition type="info" icon="📘" title="说明">

<p>为集群缩容前，请先使用 <a href="https://zilliz.com.cn/pricing#calculator">CU 计算器</a>估算您的数据需要使用的最小 CU 大小。否则，过小的 CU 将无法存储您的数据，最终导致数据迁移任务失败。</p>

</Admonition>

#### 设置 IP 白名单{#set-up-whitelist}

在**集群信息**区域，单击 **IP 白名单**右侧的**前往配置**，可将指定 IP 地址段添加到白名单。将 IP 地址段添加到白名单后，Zilliz Cloud 只允许白名单 IP 地址段内的 IP 地址访问集群。若添加 0.0.0.0/0，则表示允许所有 IP 地址访问集群。

有关如何设置白名单的详细信息，请参阅[设置白名单](./set-up-whitelist)。

#### 挂起 / 恢复集群{#suspend-resume-cluster}

在**操作**下拉列表中，选择**挂起**以中断集群运行。在**挂起集群**对话框中确认此操作后，集群状态将从**运行中**变为**挂起中**，在此期间，您无法对集群执行其他操作。

一旦集群状态变为**挂起中**，您将只需为集群支付对应的存储费用。按需挂起部分集群可以为您节省资源成本。

|  云厂商 |  存储费用          |
| ---- | -------------- |
|  阿里云 |  ¥0.5 / GB / 月 |

要恢复挂起中的集群，请单击**操作**并从下拉列表中选择**恢复**。在**恢复集群**对话框中确认此操作后，集群的状态将从**挂起中**变为**恢复运行中**，然后再变为**运行中**。此时将根据集群 CU 大小和集群类型产生费用。

此外，您还可以通过 RESTful API 挂起或恢复集群。有关更多接口信息，请参阅 [Suspend Cluster](https://docs.zilliz.com.cn/reference/suspend-cluster) 和 [Resume Cluster](https://docs.zilliz.com.cn/reference/resume-cluster)。

#### 删除集群{#delete-cluster}

在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

## 相关文档{#related-docs}

- [连接集群](./connect-to-cluster)

- [备份与恢复](./backup-and-restore)

- [数据迁移](https://docs.zilliz.com.cn/docs/migrations)

- [选择合适的 CU 类型](./cu-types-explained)

- [设置白名单](./set-up-whitelist)

