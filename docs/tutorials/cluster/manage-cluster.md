---
title: "管理集群 | Cloud"
slug: /manage-cluster
sidebar_label: "管理集群"
beta: FALSE
notebook: FALSE
description: "本文介绍如了集群的生命周期，以便您能够充分利用 Zilliz Cloud 控制台来管理集群。 | Cloud"
type: origin
token: IRirwe30tilo1qkJlR7ca2MUnvn
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理

---

import Admonition from '@theme/Admonition';


# 管理集群

本文介绍如了集群的生命周期，以便您能够充分利用 Zilliz Cloud 控制台来管理集群。

## Free 集群{#free-cluster}

Free 集群创建完成后，您可以在控制台看到如下信息：

![free-cluster-lifecycle-cn](/img/free-cluster-lifecycle-cn.png)

<Admonition type="info" icon="📘" title="说明">

<p>您最多可以创建 1 个 Free 集群。每个 Free 集群中最多可创建 5 个 Collection。</p>

</Admonition>

### 连接集群{#connect-to-cluster}

在**连接信息**区域，您可以找到用于连接到集群的公共 Endpoint 和 Token。

更多相关信息，请参阅[连接集群](./connect-to-cluster)。

### 升级版本{#upgrade-plan}

升级 Free 版本集群后，您可以解锁更多企业级特性、处理更大的数据集、享受更高的性能。在升级前，请确保满足以下任意条件：

- 您的组织账号中有足够的优惠券

- 您已添加支付方式

- 您的组织账号有足够的现金余额

请跟随以下步骤，升级集群版本：

1. 在集群详情页，点击**集群类型**旁的**升级**按钮。

1. 选择**升级至 Serverless 集群**或**升级至新 Dedicated 集群**。

    - **升级至 Serverless 集群：**

        在对话框中查看版本信息和定价。点击**升级**按钮确认升级。升级完成后，原有 Free 集群将变为 Serverless 集群。

        <Admonition type="info" icon="📘" title="说明">

        <ul>
        <li><p>升级期间，禁止数据读取和写入操作。</p></li>
        <li><p>升级后，集群 Endpoint 会发生变化。因此请确保更新您的应用代码，使用正确的 Endpoint 信息。</p></li>
        </ul>

        </Admonition>

        ![upgrade-to-serverless-cn](/img/upgrade-to-serverless-cn.png)

    - **升级至新 Dedicated 集群：**

        在打开的页面中，完成以下设置：

        - 选择 Dedicated **版本**和**目标项目**

        - 输入**新集群名称**和**密码**

        - 选择**云服务提供商**和**地域**

        - 设置 **CU 规格**。

        在升级期间，原有的 Free 集群将被保留并处于运行中的状态。升级时会创建一个新的 Dedicated 集群，原有 Free 集群中的数据将自动迁移至新的 Dedicated 集群。

        <Admonition type="info" icon="📘" title="说明">

        <p>如需连接至新的 Dedicated 集群，请修改您的应用代码并使用新集群的 Endpoint 信息。</p>

        </Admonition>

        ![upgrade-to-dedicated-cn](/img/upgrade-to-dedicated-cn.png)

### 挂起 / 恢复集群{#suspend-and-resume-cluster}

在 Zilliz Cloud 上，连续 7 天不活跃的 Free 集群将被自动挂起。在 Free 集群被挂起前后，您都将收到邮件提醒。

要恢复挂起中的集群，请单击**操作**并从下拉列表中选择**恢复**。在**恢复集群**对话框中确认此操作后，集群的状态将从**挂起中**变为**恢复运行中**，然后再变为**运行中**。

此外，您还可以通过 RESTful API 挂起或恢复集群。有关更多接口信息，请参阅[挂起集群](/reference/restful/suspend-cluster)和[恢复集群](/reference/restful/resume-cluster)。

### 删除集群{#drop-cluster}

在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

除了通过 web 控制台，您还可以通过 API 删除集群。有关更多信息，请参阅[删除集群](/reference/restful/drop-cluster)。

## Serverless 集群{#serverless-cluster}

Serverless 集群创建完成后，您可以在控制台看到如下信息：

![serverless-cluster-lifecycle-cn](/img/serverless-cluster-lifecycle-cn.png)

- **连接信息**：提供了与集群交互所需的详细信息，包括集群公共 Endpoint、Token、集群 ID、云服务地域等。

- **集群信息**：展示了集群的基本概况，包括集群类型、集群兼容的 Milvus 版本、创建者、创建日期和时间等。

### 连接集群{#connect-to-cluster}

在**连接信息**区域，您可以找到用于连接到集群的公共 Endpoint 和 Token。

更多相关信息，请参阅[连接集群](./connect-to-cluster)。

### 管理 Collection 和数据{#manage-collections-and-data}

- **Collection**

    在 **Collection** 页签下，您可以管理集群中的 Collection。具体来说，您可以创建 Collection、将数据导入 Collection、加载或释放 Collection、重命名 Collection、复制 Collection Schema 及删除 Collection。

    有关数据导入的详细情况，可以参考[数据导入](/docs/data-import)。

    ![manage-collections-serverless-cn](/img/manage-collections-serverless-cn.png)

- **备份**

    在**备份**页签下，可以选择**创建备份快照**。你可以在备份页签中找到所有已创建的备份快照。关于备份与恢复的详细情况，可参考[备份与恢复](/docs/backup-and-restore)。

- **数据迁移**

    在**迁移**页签下，可以选择**迁移数据**。有关数据迁移的详细情况，可以参考[数据迁移](/docs/migrations)。

### 迁移至 Dedicated 集群{#migrate-to-dedicated-cluster}

如需使用 Dedicated 集群的高级功能，请将 Serverless 集群迁移至 Dedicated 集群。更多详情，请参考[Zilliz Cloud 跨集群迁移](./offline-migration)。

### 用户与访问控制{#users-and-access-control}

每个 Serverless 集群会包含一个默认用户。您无法为 Serverless 集群增加或删除用户，但您可以为默认用户重置密码。

![manage-users-serverless-cn](/img/manage-users-serverless-cn.png)

### 删除集群{#drop-cluster}

在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

除了通过 web 控制台，您还可以通过 API 删除集群。有关更多信息，请参阅[删除集群](/reference/restful/drop-cluster)。

## Dedicated 集群{#dedicated-cluster}

Dedicated 集群创建完成后，您可以在控制台看到如下信息：

![dedicated-cluster-lifecycle](/img/dedicated-cluster-lifecycle.png)

- **连接信息**：提供了与集群交互所需的详细信息，包括集群公共 Endpoint、Token、集群 ID、云服务地域、私网连接（Private Link）、IP 白名单等。

- **集群信息**：展示了集群的基本概况，包括集群类型、CU 类型、CU 规格、集群兼容的 Milvus 版本、集群创建者、创建日期和时间等。

### 连接集群{#establish-connection}

- **连接集群**

    在**连接信息**区域，您可以找到用于连接到集群的公共 Endpoint 和 Token。集群 Token 可以是 [API 密钥](./manage-api-keys)或由用户名和密码对组成的[集群凭证](./cluster-credentials)。

    有关更多相关信息，请参阅[连接集群](./connect-to-cluster)。

- **私网连接**

    在**集群详情**页签的**连接信息**区域下方，单击 **+ 创建私网连接**，可创建私网连接。使用私网连接可以避免通过公网访问当前项目中的集群，确保数据安全。

    关于私网连接的更多配置，请参阅[创建私网连接](./setup-a-private-link)。

### 管理 Collection 和数据{#manage-collections-and-data}

- **Collection**

    在 **Collection** 页签下，您可以管理集群中的 Collection。具体来说，您可以创建 Collection、将数据导入 Collection、加载或释放 Collection、重命名 Collection、复制 Collection Schema 及删除 Collection。

    有关数据导入的详细情况，可以参考[数据导入](/docs/data-import)。

    ![manage-collections](/img/manage-collections.png)

- **备份**

    在**备份**页签下，可以选择**创建备份快照**。你可以在备份页签中找到所有已创建的备份快照。关于备份与恢复的详细情况，可参考[备份与恢复](/docs/backup-and-restore)。

- **数据迁移**

    在**迁移**页签下，可以选择**迁移数据**。有关数据迁移的详细情况，可以参考[数据迁移](/docs/migrations)。

### 用户与访问控制{#users-and-access-control}

- **用户**

    在**用户**页签下，您可以添加用户、重置用户密码和删除用户。

    有关更多信息，请参阅[通过 Web UI 管理身份凭证](./cluster-credentials)。

    ![manage-users](/img/manage-users.png)

    <Admonition type="info" icon="📘" title="说明">

    <p>不能删除 <strong>db_admin</strong> 用户。对于已添加到集群中的用户，Zilliz Cloud 会向其授予集群中所有 Collection 的访问权限。</p>

    </Admonition>

- **IP 白名单**

    在**集群详情**页签的**集群信息**区域，单击 **IP 白名单**旁的**前往配置**可添加白名单地址。

    - 地址列表为空时，白名单不生效。任意地址均可访问当前项目中的集群。

    - 在添加任意一条非全零（0.0.0.0/0）的记录后，白名单生效。此时，Zilliz Cloud仅允许已添加网段中的IP地址访问当前项目中的集群。

    关于白名单的更多配置，请参阅[设置白名单](./setup-whitelist)。

### 挂起 / 恢复集群{#suspend-and-resume-cluster}

<Admonition type="info" icon="📘" title="说明">

<p>包年包月的 Dedicated 集群不支持挂起或恢复。</p>

</Admonition>

在**操作**下拉列表中，选择**挂起**以中断集群运行。在**挂起集群**对话框中确认此操作后，集群状态将从**运行中**变为**挂起中**，在此期间，您无法对集群执行其他操作。

一旦集群状态变为**挂起中**，您将只需为集群支付对应的存储费用。按需挂起部分集群可以为您节省资源成本。

<table>
   <tr>
     <th><p>云厂商</p></th>
     <th><p>存储费用</p></th>
   </tr>
   <tr>
     <td><p>阿里云</p></td>
     <td><p>¥0.5/GB/月</p></td>
   </tr>
   <tr>
     <td><p>腾讯云</p></td>
     <td><p>¥0.5/GB/月</p></td>
   </tr>
   <tr>
     <td><p>亚马逊云科技</p></td>
     <td><p>¥0.6/GB/月</p></td>
   </tr>
</table>

要恢复挂起中的集群，请单击**操作**并从下拉列表中选择**恢复**。在**恢复集群**对话框中确认此操作后，集群的状态将从**挂起中**变为**恢复运行中**，然后再变为**运行中**。此时将根据集群 CU 大小和集群类型产生费用。

此外，您还可以通过 RESTful API 挂起或恢复集群。有关更多接口信息，请参阅[挂起集群](/reference/restful/suspend-cluster)和[恢复集群](/reference/restful/resume-cluster)。

### 删除集群{#drop-cluster}

<Admonition type="info" icon="📘" title="说明">

<p>包年包月的 Dedicated 集群不支持删除。</p>

</Admonition>

在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

此外，您还可以通过 API 来删除集群。有关更多信息，请参阅[删除集群](/reference/restful/drop-cluster)。

### 升级集群兼容版本以试用公测版功能{#upgrade-cluster-for-preview-features}

如需试用公测版新功能，请升级 Dedicated 集群的兼容 Milvus 版本。

![upgrade-to-preview-version-cn](/img/upgrade-to-preview-version-cn.png)

## 相关文档{#related-docs}

- [连接集群](./connect-to-cluster)

- [选择合适的 CU 类型](./cu-types-explained)

- [设置白名单](./setup-whitelist)

