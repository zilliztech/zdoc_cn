---
slug: /manage-cluster
beta: FALSE
notebook: FALSE
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

    ![manage-collections](/img/manage-collections.png)

    在 **Collection** 页签下，您可以管理集群中的 Collection。具体来说，您可以创建 Collection、将数据导入 Collection、加载或释放 Collection、重命名 Collection、复制 Collection Schema 及删除 Collection。

    有关数据导入的详细情况，可以参考[数据导入](/docs/data-import)。

- **备份**

    在**备份**页签下，可以选择**创建备份快照**。你可以在备份页签中找到所有已创建的备份快照。关于备份与恢复的详细情况，可参考[备份与恢复](/docs/backup-and-restore)。

- **数据迁移**

    在**迁移**页签下，可以选择**迁移数据**。有关数据迁移的详细情况，可以参考[数据迁移](/docs/migrations)。

### 用户与访问控制{#users-and-access-control}

在**用户**页签下，您可以添加用户、重置用户密码和删除用户。

有关更多信息，请参阅[通过 Web UI 管理身份凭证](./cluster-credentials-console)。

![manage-users](/img/manage-users.png)

<Admonition type="info" icon="📘" title="说明">

<p>不能删除 <strong>db_admin</strong> 用户。对于已添加到集群中的用户，Zilliz Cloud 会向其授予集群中所有 Collection 的访问权限。</p>

</Admonition>

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

    ![manage-collections](/img/manage-collections.png)

    在 **Collection** 页签下，您可以管理集群中的 Collection。具体来说，您可以创建 Collection、将数据导入 Collection、加载或释放 Collection、重命名 Collection、复制 Collection Schema 及删除 Collection。

    有关数据导入的详细情况，可以参考[数据导入](/docs/data-import)。

- **备份**

    在**备份**页签下，可以选择**创建备份快照**。你可以在备份页签中找到所有已创建的备份快照。关于备份与恢复的详细情况，可参考[备份与恢复](/docs/backup-and-restore)。

- **数据迁移**

    在**迁移**页签下，可以选择**迁移数据**。有关数据迁移的详细情况，可以参考[数据迁移](/docs/migrations)。

### 用户与访问控制{#users-and-access-control}

- **用户**

    在**用户**页签下，您可以添加用户、重置用户密码和删除用户。

    有关更多信息，请参阅[通过 Web UI 管理身份凭证](./cluster-credentials-console)。

    ![manage-users](/img/manage-users.png)

    <Admonition type="info" icon="📘" title="说明">

    <p>不能删除 <strong>db_admin</strong> 用户。对于已添加到集群中的用户，Zilliz Cloud 会向其授予集群中所有 Collection 的访问权限。</p>

    </Admonition>

- **IP 白名单**

    在**集群详情**页签的**集群信息**区域，单击 **IP 白名单**旁的**前往配置**可添加白名单地址。

    - 地址列表为空时，白名单不生效。任意地址均可访问当前项目中的集群。

    - 在添加任意一条非全零（0.0.0.0/0）的记录后，白名单生效。此时，Zilliz Cloud仅允许已添加网段中的IP地址访问当前项目中的集群。

    关于白名单的更多配置，请参阅[设置白名单](./set-up-whitelist)。

### 管理和设置集群{#manage-and-configure-clusters}

- **集群扩缩容**

    集群扩缩是指调整 CU 规格，以满足不断变化的计算与存储需求。在 CPU 或内存使用率增大时，您可以通过增加 CU 规格来提高集群性能。同样，您也可以在业务需求较低的时候减少 CU 规格以节省开支。

    您可以通过以下几种方式进行集群扩缩容：

    - **通过 Zilliz Cloud 控制台进行集群扩缩容**

        - **集群扩容**

            在 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/signup)中，找到**集群信息**区域，单击**规格**右侧的**扩缩容**。在对话框中，您可以增加 CU 规格，但无法调整 CU 类型和云服务地域。您最多可将集群资源扩展到 256 个 CU。如果您需要更大的 CU 规格，请[联系我们](https://support.zilliz.com.cn)。

            <Admonition type="caution" icon="🚧" title="警告">

            <p>集群扩缩容过程中，服务可能会有短暂抖动。请谨慎操作。</p>

            </Admonition>

            集群扩容所需时间取决于集群中的数据量大小。

        - **集群缩容**

            在 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/signup)中，找到**集群信息**区域，单击**规格**右侧的**扩缩容**。在对话框中，您可以减少 CU 规格，但无法调整 CU 类型和云服务地域。 点击**扩缩容**按钮后，Zilliz Cloud 会自动检查您的数据量和 Collection 数量。只有同时满足以下两个条件时才能成功触发缩容：

            - 当前数据量 < 缩容后 [CU 加载容量](./metrics-alerts-reference#cluster-metrics)的 80%。

            - 当前 Collection 数量 < 缩容后 CU 中可创建的 [Collection 数量上限](./limits#collections)。

            <Admonition type="caution" icon="🚧" title="警告">

            <p>集群扩缩容过程中，服务可能会有短暂抖动。请谨慎操作。</p>

            </Admonition>

            集群扩容所需时间取决于集群中的数据量大小。

    - **通过 API 进行集群扩缩容**

        您还可以通过 API 请求来进行集群扩缩容。更多信息，请参阅[修改集群配置](/reference/restful/modify-cluster)。

    - **【内测版】弹性伸缩**

        <Admonition type="info" icon="📘" title="说明">

        <p>弹性伸缩功能目前正在内测中，如需使用此功能，请<a href="https://zilliz.com.cn/contact-sales">联系我们</a>。</p>
        <p>仅 Dedicated 集群可使用此功能。</p>

        </Admonition>

        弹性伸缩适用于业务变化较快，且不希望集群规格导致用户写入受限的场景。弹性伸缩可以帮您免去运维压力，减少因集群规格导致的对业务的影响。

        您可以设置集群自动扩缩时的最大 CU 规格。目前，Zilliz Cloud 暂不支持自动缩容。

        启用此功能后，您可以在集群成功创建时设置弹性伸缩参数。

        ![configure_autoscaling_cn](/img/configure_autoscaling_cn.png)

        弹性伸缩主要基于**[CU 加载容量](./metrics-alerts-reference#cluster-metrics)**指标进行自动扩容。目前，阈值默认设置为 70% 且不可修改。Zilliz Cloud 会每隔 1 分钟检查 CU 加载容量指标。如果在过去 2 分钟内，每个指标采集点的值均超过 70% ，Zilliz Cloud 会自动进行扩容。自动扩容的步长，请参考[价格计算器](./pricing-calculator#considerations)。

        两次自动扩容之间有 10 分钟的冷却期。完成自动扩容所需时间取决于集群中的数据量。

        <Admonition type="caution" icon="🚧" title="警告">

        <p>自动扩容过程中，集群 CU 加载容量仍可达到 100%。到达时，会触发禁写。自动扩容过程中，集群服务可能会有分钟级短暂抖动。但自动扩容期间，如果 CU 加载容量未触达 100%，您仍可正常读取数据。</p>

        </Admonition>

- **挂起 / 恢复集群**

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
    </table>

    要恢复挂起中的集群，请单击**操作**并从下拉列表中选择**恢复**。在**恢复集群**对话框中确认此操作后，集群的状态将从**挂起中**变为**恢复运行中**，然后再变为**运行中**。此时将根据集群 CU 大小和集群类型产生费用。

    此外，您还可以通过 RESTful API 挂起或恢复集群。有关更多接口信息，请参阅[挂起集群](/reference/restful/suspend-cluster)和[恢复集群](/reference/restful/resume-cluster)。

- **删除集群**

    在**操作**下拉列表中，选择**删除**可删除集群及其相关数据。只有当您在**删除集群**对话框中确认删除操作后，Zilliz Cloud 才会该删除集群。

    此外，您还可以通过 API 来删除集群。有关更多信息，请参阅[删除集群](/reference/restful/drop-cluster)。

## 相关文档{#related-docs}

- [连接集群](./connect-to-cluster)

- [选择合适的 CU 类型](./cu-types-explained)

- [设置白名单](./set-up-whitelist)

