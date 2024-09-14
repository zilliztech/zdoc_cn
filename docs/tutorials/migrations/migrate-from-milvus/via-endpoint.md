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

本文介绍如何通过服务器地址从 Milvus 进行数据迁移。有关如何上传备份文件的信息，请参阅[通过备份文件从 Milvus 迁移至 Zilliz Cloud](./migrate-from-milvus)。

## 使用限制{#limits}

- 每次迁移仅支持选择单个源数据库。如果您有多个源数据库中，可以创建多个迁移任务。

- 迁移过程中，Zilliz Cloud 将从源数据库复制 collection 的 schema。暂不支持为目标 collection 修改 schema。

## 开始前{#before-you-start}

- 源 Milvus 实例的版本为 2.x 或以上，且支持公网访问。

- 如果源 Milvus 启用了身份验证，请确保您已获得必要的连接凭证。有关详细信息，请参阅 [Authenticate User Access](https://milvus.io/docs/authenticate.md#Authenticate-User-Access)。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

## 从 Milvus 迁移至 Zilliz Cloud{#migrate-from-milvus-to-zilliz-cloud}

单次迁移任务支持从一个数据库中选择一个或多个 collection。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **从 Milvus 迁移** > **通过 Endpoint**。

1. 在**连接至数据源**步骤中，填入源 Milvus 数据库的连接地址。如果源 Milvus 已启用身份验证，请输入用户名和密码作为访问凭据。然后，单击**下一步**。

1. 在**选择迁移来源和目标**步骤中，配置源 Milvus 和目标 Zilliz Cloud 集群的设置。然后，单击**下一步**。

1. 在**配置 Schema** 步骤中：

    1. 预览并验证目标 collection 的 schema。

    1. （可选）在**高级设置**中配置**动态列**和 **Partition Key**。更多信息请参考[开启动态字段](./enable-dynamic-field)和[使用 Partition Key](./use-partition-key)。

    1. （可选）在**基础信息**中自定义目标 collection 名称和描述。collection 名称在每个集群中必须唯一。如果目标 collection 名称与现有 collection 重复，需要重命名目标 collection。

1. 点击**迁移**。

![zh_migrate_from_milvus_via_endpoint_1](/img/zh_migrate_from_milvus_via_endpoint_1.png)

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](/docs/job-center)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="Notes">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

