---
title: "离线迁移 | Cloud"
slug: /offline-migration
sidebar_label: "离线迁移"
beta: FALSE
notebook: FALSE
description: "离线迁移允许您在计划的停机时间内，将现有集群数据从源集群迁移到目标集群。此方法支持在同一组织内或不同组织之间进行迁移，适用于可以接受短暂停机的场景，例如计划维护或小规模数据库迁移。如果您的迁移需要保持读写不中断，请参考零停机迁移。 | Cloud"
type: origin
token: N6tlwTPPvi0FXvkj4fccCgtTnOg
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - 集群
  - 离线

---

import Admonition from '@theme/Admonition';


# 离线迁移

**离线迁移**允许您在计划的停机时间内，将现有集群数据从源集群迁移到目标集群。此方法支持在同一组织内或不同组织之间进行迁移，适用于可以接受短暂停机的场景，例如计划维护或小规模数据库迁移。如果您的迁移需要保持读写不中断，请参考[零停机迁移](./zero-downtime-migration)。

## 注意事项{#considerations}

下表展示了源集群和目标集群间的兼容性：

<table>
   <tr>
     <th rowspan="2"><p><strong>源集群</strong></p></th>
     <th colspan="3"><p><strong>目标集群</strong></p></th>
   </tr>
   <tr>
     <td><p>Free</p></td>
     <td><p>Serverless</p></td>
     <td><p>Dedicated</p></td>
   </tr>
   <tr>
     <td><p>Free</p></td>
     <td><p>不支持</p></td>
     <td><p>请参考<a href="./manage-cluster">管理集群</a></p></td>
     <td><p>请参考<a href="./manage-cluster">管理集群</a></p></td>
   </tr>
   <tr>
     <td><p>Serverless</p></td>
     <td><p>不支持</p></td>
     <td><p>不支持</p></td>
     <td><p>支持</p></td>
   </tr>
   <tr>
     <td><p>Dedicated</p></td>
     <td><p>不支持</p></td>
     <td><p>不支持</p></td>
     <td><p>支持</p></td>
   </tr>
</table>

## 开始前{#before-you-start}

- 源 Zilliz Cloud 集群必须能够通过公网访问。

- 对于[组织间迁移](./offline-migration#migrate-data-across-organizations)，请确保您拥有目标 Zilliz Cloud 集群所需的连接信息，包括集群 Endpoint、API 密钥或集群的用户名和密码。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

<Admonition type="info" icon="📘" title="说明">

<p>Zilliz Cloud 还提供 RESTful API 接口，支持以编程方式在集群之间迁移数据。详细信息请参考<a href="/reference/restful/migrate-to-existing-cluster-v2">迁移数据至现有集群</a>或<a href="/reference/restful/migrate-to-new-dedicated-cluster-v2">迁移数据至新集群</a>。</p>

</Admonition>

## 组织内迁移{#migrate-data-within-the-same-organization}

您可以将数据迁移到同一组织内的新集群或现有集群。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **当前组织**。

    ![RKg6bgDvJohYYlxESWwcgYRln9g](/img/RKg6bgDvJohYYlxESWwcgYRln9g.png)

1. 在弹出的对话框中，配置源集群、数据库及目标集群：

    - **源集群**：选择要迁移的源集群及其中的 Database。

    - **迁移到**：选择**现有集群**或**新集群**作为目标集群。

    - **迁移类型**：选择**离线迁移**。

1. 点击**下一步**继续：

    - 如果选择迁移到**现有集群**，系统将跳转至**迁移至现有集群** 页面，选择目标项目和目标集群。

    - 如果选择迁移到**新集群**，系统将跳转至集群创建页面，设置新的集群配置。

1. 点击**迁移**完成操作。

## 组织间迁移{#migrate-data-across-organizations}

要跨组织迁移数据，您需要提供必要的连接凭证（源集群连接端点、API 密钥或用户名和密码）来访问不同组织中的源集群。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **外部组织**。

    ![KsgnbWGvFom4a6xHJgxcZxRanMS](/img/KsgnbWGvFom4a6xHJgxcZxRanMS.png)

1. 在**连接至数据源**步骤中，填入源集群的连接端点和凭证，然后点击**下一步**。

    ![QA4bbCD7soTyDqxLTKkclx6wneb](/img/QA4bbCD7soTyDqxLTKkclx6wneb.png)

1. 在**选择迁移来源和目标**步骤中，配置源集群和目标集群设置，然后点击**下一步**。

1. 在**配置 Schema** 步骤中设，设置 Zilliz Cloud 集群之间的字段映射：

    1. **确认主键映射：**

        - 源 Collection 中的主键会自动映射为目标 Collection 的主键。

        - 您可以启用 Auto ID 功能以生成新的主键值；但这样操作后，源 Collection 中的原始主键值将会被舍弃。

    1. **处理标量字段：**

        对于标量字段，请配置以下属性：

        - **支持 Null 值：** 决定该字段是否可以包含 null 值，此功能默认启用。详情请参阅 [Nullable 和默认值](./nullable-and-default)。

        - **默认值：** 为该字段指定一个默认值。详情请参阅 [Nullable 和默认值](./nullable-and-default)。

        - **Partition key：** 可选择将 INT64 或 VARCHAR 字段指定为 Partition Key。注意：每个 Collection 仅支持一个 Partition Key，并且所选字段不能包含 null 值。详情请参阅[使用 Partition Key](./use-partition-key)。

    1. **启动 Dynamic Field：**

        - 默认情况下，Dynamic Field 处于启用状态，这允许您插入 Collection Schema 中未定义的任意标量字段。

        - 如果禁用该功能，则需要在插入数据前显式定义每个 Entity 包含的所有字段。更多信息请参阅 [Dynamic Field](./enable-dynamic-field)。

    1. **（可选）调整 Shard：**

        - 点击**高级设置**以配置目标 Collection 的 Shard 数量。

        - 对于大约 1 亿行数据来说，通常只需一个 Shard 即可。

        - 如果您的数据集超过 10 亿行，请[联系我们](https://zilliz.com.cn/contact-sales)以获取最佳 Shard 配置方案。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](./view-activities)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

![OWl9b7Nwxo1kWzxZcntcmp68nhU](/img/OWl9b7Nwxo1kWzxZcntcmp68nhU.png)

## 迁移后{#post-migration}

迁移任务完成后，请注意以下事项：

- **索引创建**：迁移过程中会自动为迁移的 Collection 创建 AUTOINDEX。

- **手动 Load Collection：**虽然索引已自动创建，但迁移后的 Collection 并不会立即支持搜索或查询操作。您必须手动 Load Collection，才能启用搜索和查询功能。详细信息请参阅 [Load 和 Release](./load-release-collections)。

<Admonition type="info" icon="📘" title="说明">

<p>完成 Load 后，请检查目标集群中的 Collection 数量及 Entity 数是否与数据源保持一致。如果发现不符，请删除 Collection 并重新进行迁移任务。</p>

</Admonition>

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

