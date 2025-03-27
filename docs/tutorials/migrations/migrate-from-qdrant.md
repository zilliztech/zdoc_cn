---
title: "从 Qdrant 迁移至 Zilliz Cloud | Cloud"
slug: /migrate-from-qdrant
sidebar_label: "从 Qdrant 迁移"
beta: FALSE
notebook: FALSE
description: "Qdrant 是一款提供相似性搜索功能的向量数据库。将数据从 Qdrant 迁移到 Zilliz Cloud，用户可以在保持 Qdrant 支持的多向量结构兼容性的同时，利用 Zilliz Cloud 的高级搜索和分析功能。 | Cloud"
type: origin
token: Ii6EwCswKihb6LkI0MmcNVZZnIf
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据迁移
  - qdrant

---

import Admonition from '@theme/Admonition';


# 从 Qdrant 迁移至 Zilliz Cloud

[Qdrant](https://qdrant.tech/) 是一款提供相似性搜索功能的向量数据库。将数据从 Qdrant 迁移到 Zilliz Cloud，用户可以在保持 Qdrant 支持的多向量结构兼容性的同时，利用 Zilliz Cloud 的高级搜索和分析功能。

本指南将引导您完成整个迁移过程，包括连接 Qdrant、配置数据映射，以及排查潜在问题。

## 注意事项{#considerations}

- 从 Qdrant 迁移到 Zilliz Cloud 时，向量字段会直接迁移，而 Qdrant 的 payload 数据会以 JSON 格式存储在 Zilliz Cloud 的动态字段中。有关动态字段功能的详细信息，请参阅[Dynamic Field](./enable-dynamic-field)。

- 不支持迁移包含空值的 payload 数据。若有空值，请先移除相应字段。

- 每个迁移任务仅限一个源 Qdrant 集群。如有多个源集群数据，可启用多个迁移任务。

## 开始前{#before-you-start}

- 源 Qdrant 集群必须能够通过公网访问。

- 如果您的网络环境配置了白名单列表，请确保将 Zilliz Cloud 的 IP 地址添加到其中。要了解更多信息，请参考 [Zilliz Cloud IP](./zilliz-cloud-ips)。

- 已获取访问目标 Qdrant 集群所需的集群 Endpoint 和 API 密钥，并具有相应权限。

- 已在 Zilliz Cloud 中获得组织管理员或项目管理员权限。如果您没有相关权限，请联系您的 Zilliz Cloud 管理员。

## 从 Qdrant 迁移至 Zilliz Cloud{#migrate-from-qdrant-to-zilliz-cloud}

![zh_migrate_from_qdrant](/img/zh_migrate_from_qdrant.png)

您可以将源数据迁移到任何版本类型的 Zilliz Cloud 集群，只要其计算单元（CU）大小能够满足源数据的存储需求。

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 进入目标项目，选择**数据迁移** > **Qdrant**。

1. 在**连接数据源**步骤中，输入**集群 Endpoint** 和 **API Key**，然后点击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p><a href="https://qdrant.tech/documentation/cloud/authentication/?q=api+key">Database Authentication</a> 可以指导您如何获取所需的连接信息。</p>

    </Admonition>

1. 在**选择迁移来源和目标步骤**中，配置源 Qdrant 集群 和 Zilliz Cloud 集群设置，点击**下一步**。

    <Admonition type="info" icon="📘" title="说明">

    <p>每个从 Qdrant 集群迁移的源 Collection 必须包含一个或多个向量字段。</p>

    </Admonition>

1. 在**配置 Schema** 步骤中：

    1. 在 **Schema 预览**中，确认 Qdrant Collection 与 Zilliz Cloud Collection 之间的字段映射。

        <Admonition type="info" icon="📘" title="说明">

        <ul>
        <li><p>Auto ID 禁用且无法修改。</p></li>
        <li><p>您可以重命名字段，但不支持修改字段的数据类型。</p></li>
        </ul>

        </Admonition>

    1. 在**高级设置**中，确认**动态列**和 **Partition Key** 的设置：

        - **动态列**：默认启用且不可修改。它用于存储源 Collection 的 payload 数据。

        - **Partition Key**：默认禁用且不可修改。由于 Qdrant 的 payload 数据以 JSON 形式存储在动态列中，无法作为 Partition Key 使用。在 Zilliz Cloud 中，只有在 Schema 中明确定义的标量字段可用作 Partition Key。

    1. 在**目标 Collection 名称和描述**中，自定义目标 Collection 的名称和描述。Collection 名称在每个集群中必须唯一。如果名称与现有 Collection 重复，请重命名 Collection。

1. 点击**迁移**。

## 查看迁移进度{#monitor-the-migration-process}

生成迁移任务后，您可前往[任务中心](./view-activities)查看任务状态和进度。如果迁移任务的状态从**进行中**变更为**成功**，则代表迁移成功。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，请验证目标集群中的 collection 和 entity 数量是否与数据源一致。如果发现不一致，请删除缺失 entity 的 collection 并重新进行迁移。</p>

</Admonition>

![view_migration_progress_cn](/img/view_migration_progress_cn.png)

## 取消迁移任务{#cancel-migration-job}

如果迁移过程遇到任何问题，您可以采取以下步骤进行故障排除并恢复迁移：

1. 在**任务中心**页面，取消失败的迁移任务。

1. 在**操作**列点击**查看详情**以访问日志信息。

