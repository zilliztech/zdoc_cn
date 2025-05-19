---
title: "通过 Endpoint 从 Milvus 迁移至 Zilliz Cloud | Cloud"
slug: /via-endpoint
sidebar_label: "通过 Endpoint 迁移"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供基于 Milvus 的完全托管的向量数据库解决方案，适合希望使用 Milvus 向量数据库但不想自己管理基础设施的用户。为了实现顺利的数据迁移，您可以通过以下方式将数据从 Milvus 迁移到 Zilliz Cloud：通过 Milvus 服务器地址连接到源数据库或直接上传备份文件。 | Cloud"
type: origin
token: PtmRwn9bQi6WAKkurfXcEXKKn9b
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据迁移
  - endpoint

---

import Admonition from '@theme/Admonition';


# 通过 Endpoint 从 Milvus 迁移至 Zilliz Cloud

Zilliz Cloud 提供基于 Milvus 的完全托管的向量数据库解决方案，适合希望使用 Milvus 向量数据库但不想自己管理基础设施的用户。为了实现顺利的数据迁移，您可以通过以下方式将数据从 Milvus 迁移到 Zilliz Cloud：通过 Milvus 服务器地址连接到源数据库或直接上传备份文件。

本文介绍如何通过服务器地址从 Milvus 进行数据迁移。有关如何上传备份文件的信息，请参阅[通过备份文件从 Milvus 迁移至 Zilliz Cloud](./via-backup-files)。

## 开始前{#before-you-start}

- 源 Milvus 实例的版本为 2.3.6 或以上，且支持公网访问。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 如果源 Milvus 启用了身份验证，请确保您已获得必要的连接凭证。有关详细信息，请参阅 [Authenticate User Access](https://milvus.io/docs/authenticate.md#Authenticate-User-Access)。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

- 确保目标集群的 CU 容量足以容纳源数据。要估算所需的 CU 规格，请使用[计算器](https://zilliz.com.cn/pricing#calculator)。

## 从 Milvus 迁移至 Zilliz Cloud{#migrate-from-milvus-to-zilliz-cloud}

单次迁移任务支持从一个数据库中选择一个或多个 collection。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **Milvus** > **通过 Endpoint**。

1. 在**连接至数据源**步骤中，填入源 Milvus 数据库的连接地址。如果源 Milvus 已启用身份验证，请输入用户名和密码作为访问凭据。然后，单击**下一步**。

    ![Hy00bFwdKocRzmxwKAVcqUTNnOd](/img/Hy00bFwdKocRzmxwKAVcqUTNnOd.png)

1. 在**选择迁移来源和目标**步骤中，配置源 Milvus 和目标 Zilliz Cloud 集群的设置。然后，单击**下一步**。

    ![J9p8bPTWdofMdDxDhHOcEMB6nPe](/img/J9p8bPTWdofMdDxDhHOcEMB6nPe.png)

1. 在**配置 Schema** 步骤中，设置 Zilliz Cloud 与 Milvus 之间的字段映射：

    ![T23db1kj1oSkO1xeTytc8v1knpc](/img/T23db1kj1oSkO1xeTytc8v1knpc.png)

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

![FJJubvyTcohYZXx6K0JcDs6Vnad](/img/FJJubvyTcohYZXx6K0JcDs6Vnad.png)

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

