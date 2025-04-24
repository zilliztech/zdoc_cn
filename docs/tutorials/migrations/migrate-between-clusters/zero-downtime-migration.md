---
title: "在线迁移 | Cloud"
slug: /zero-downtime-migration
sidebar_label: "在线迁移"
beta: PRIVATE
notebook: FALSE
description: "在线迁移（Zero Downtime Migration）确保数据库服务在整个迁移过程中保持正常运行，提供不中断的数据库访问。迁移过程包括以下阶段： | Cloud"
type: origin
token: Ih3LwgtTQihpKnkTEXoci6oun2e
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - 集群
  - 在线

---

import Admonition from '@theme/Admonition';


# 在线迁移

在线迁移（Zero Downtime Migration）确保数据库服务在整个迁移过程中保持正常运行，提供不中断的数据库访问。迁移过程包括以下阶段：

1. **初始化（Initialization）**：选择源集群并创建新的目标集群。

1. **迁移（Migration）**：迁移已有数据并同步增量数据。

1. **最终切换（Finalization）**：当数据同步延迟小于 10 秒时，停止同步并切换至目标集群。

![M7ndwY8wSh2VKWb0kORcVhCCnae](/img/M7ndwY8wSh2VKWb0kORcVhCCnae.png)

<Admonition type="info" icon="📘" title="说明">

<p>在线迁移目前处于<strong>公测</strong>（Public Preview）阶段。如需申请使用权限或了解相关费用，请联系 <a href="https://zilliz.com.cn/contact-sales">Zilliz Cloud 支持团队</a>。</p>

</Admonition>

## 注意事项{#considerations}

- 在线迁移仅支持同一组织内部的迁移。不支持跨组织的迁移。

- 迁移过程将全量迁移源集群中的所有 Database，不支持仅迁移部分 Database。

- 迁移时，不支持对源集群执行以下任一操作，否则迁移将失败：**AlterCollection**、**AlterCollectionField**、**CreateAlias**、**DropAlias**、**AlterAlias**、**RenameCollection**、**AlterDatabase**、**Import**。

- 此功能仅支持迁移到新的 Dedicated 集群。

- 不支持取消正在进行的在线迁移任务。此功能将在未来版本中提供。

- 在线迁移在数据同步停止和集群切换完成时需要约 10 秒的停机时间。

## 开始前{#before-you-start}

- 源集群可从公网访问。

- 您需要拥有组织管理员或项目管理员的角色。如果您没有相应的权限，请联系您的 Zilliz Cloud 管理员。

## 步骤一：初始化迁移{#step-1-initialize-migration}

![zh-zero-downtime-migration-1](/img/zh-zero-downtime-migration-1.png)

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 在目标项目页面，选择**数据迁移** > **当前组织**。

    ![BrnkbzbI5oLVBGxlmcwc317rnOh](/img/BrnkbzbI5oLVBGxlmcwc317rnOh.png)

1. 在弹出的对话框中，配置迁移设置：

    ![zh-zero-downtime-migration-1](/img/zh-zero-downtime-migration-1.png)

    - **源集群**：选择要迁移的集群，确保该集群无正在进行的批量导入操作。

    - **迁移到**：选择**新集群**。在线迁移必须创建新的 Dedicated 集群作为目标集群。

    - **迁移类型**：选择**在线迁移**。

1. 配置完成后，点击**下一步**。您将被导航至集群创建页面。

## 步骤二：配置新的 Dedicated 目标集群{#create-a-new-dedicated-cluster-as-target}

![zh-zero-downtime-migration-2](/img/zh-zero-downtime-migration-2.png)

1. 在 **迁移至新集群** 页面，设置目标集群：

    - **集群名称：** 输入新目标集群的名称（例如：`cluster01`）。

    - **云服务商设置：** 选择云服务提供商（阿里云、腾讯云等），并根据项目需求配置其他集群相关参数。

    有关更多集群配置信息，请参考[创建集群](./create-cluster)。

1. 点击**迁移**开始迁移任务。点击后：

    - 源集群将进入**已锁定**状态，在此期间无法删除源集群，也无法执行任何数据导入或批量导入操作。

    - 页面将跳转至目标 Dedicated 集群的详情页。

## 步骤三：监控迁移进度{#monitor-the-migration-job-in-progress}

![zh-zero-downtime-migration-3](/img/zh-zero-downtime-migration-3.png)

1. 在目标集群详情页，点击**查看进度**打开**迁移进度**对话框。

1. 在**迁移进度**对话框中，监控以下迁移阶段：

    **阶段 1：创建新集群并迁移存量数据**

    此阶段将现有数据从源集群迁移到目标集群。持续时间取决于传输的数据量，对于大型数据集可能需要数小时。

    <Admonition type="info" icon="📘" title="说明">

    <p>如果过程需要较长时间，您可以离开此页面并处理其他任务。之后您可以随时返回，继续监控增量数据同步的进度。</p>

    </Admonition>

    **阶段 2：同步增量数据**

    在此阶段，系统会持续同步插入到源集群中的新数据到目标集群。目标集群将显示**同步中**状态，表示不接受外部数据写入。在此阶段，请按照以下步骤操作：

    1. **监控数据同步延时**：

        - 您可以追踪**数据同步延时**（秒）。此指标表示在增量同步期间，源集群中最新数据与目标集群之间的时间差。

        - 当同步延时小于 10 秒时，我们会向您发送邮件通知，提示您可以停止数据同步。

        - **注意**：如果在合理等待时间后，数据同步延时始终未低于 10 秒，请联系 [Zilliz Cloud 支持团队](https://zilliz.com.cn/contact-sales)。

    1. **停止数据同步**

        - 在继续之前，请停止所有对源集群的写入，并计划约 10 秒的停机时间。

        - 当**数据同步延时**达到可接受阈值时，点击**停止数据同步**，并通过勾选复选框确认：**我确认已停止向源集群中写入数据**。

        <Admonition type="info" icon="📘" title="说明">

        <p>如果您没有手动停止数据同步，Zilliz Cloud 会继续同步最多 7 天。超过这一期限后，为避免资源浪费，系统会自动停止同步，从而导致迁移任务失败。</p>

        </Admonition>

## 切换连接至新集群{#switch-your-connection-to-the-target-cluster}

![zh-zero-downtime-migration-4](/img/zh-zero-downtime-migration-4.png)

数据同步停止后，请继续进行**切换到新集群**步骤：

1. 在迁移进度对话框中，点击**查看连接信息并关闭弹窗**。您将被导航到目标集群的详情页面。

1. 在集群详情页面上，验证目标集群的状态。如果显示为**运行中**，则迁移成功。

1. 更新客户端的连接配置，使用目标集群的连接信息，以确保服务能够无缝切换至新集群并正常运行。有关连接集群的详细说明，请参考[连接集群](./connect-to-cluster)。

<Admonition type="info" icon="📘" title="说明">

<p>迁移完成后，源集群<strong>不会自动删除</strong>。建议保留一段时间，验证数据一致性后再手动删除。</p>

</Admonition>