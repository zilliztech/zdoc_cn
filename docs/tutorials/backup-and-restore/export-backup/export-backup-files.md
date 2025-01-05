---
title: "导出备份文件 | Cloud"
slug: /export-backup-files
sidebar_label: "导出备份文件"
beta: FALSE
notebook: FALSE
description: "您可以通过 Zilliz Cloud 控制台将备份文件导出至对象存储。 | Cloud"
type: origin
token: WXBjwo4sgiCDX8kZvBwcJrJCnyg
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 备份
  - 导出备份
  - export backup
  - export backup to bucket
  - 配置对象存储

---

import Admonition from '@theme/Admonition';


# 导出备份文件

您可以通过 Zilliz Cloud 控制台将备份文件导出至对象存储。

<Admonition type="info" icon="📘" title="说明">

<p>此功能目前仅对 <strong>Dedicated</strong> 集群提供<strong>内测</strong>（Private Preview）。如需启用此功能或了解相关费用，请联系 <a href="https://zilliz.com.cn/contact-sales">Zilliz Cloud 支持团队</a>。</p>

</Admonition>

## 开始前

- 您已完成对象存储的集成操作。有关具体信息，请参考[配置对象存储](./integrate-with-storage-bucket)。

- 您是目标组织中的**组织管理员**或**项目管理员**。

## 操作步骤

1. 登录 Zilliz Cloud 控制台。

1. 在左侧导航栏中，选择**备份**。

1. 在**备份**页面，找到目标备份文件，然后从**操作**列中选择**导出备份文件**。

    <Admonition type="info" icon="📘" title="说明">

    <p>只有处于<strong>创建完成</strong>状态的备份文件可以被导出。</p>

    </Admonition>

1. 在**导出备份文件**对话框中，配置备份相关设置：

    1. **备份文件集群云服务地域**：显示导出备份文件所在的云地域。

    1. **集成**：与 Zilliz Cloud 集成的对象存储提供商。目前支持阿里云对象存储服务（OSS）。

    1. **集成配置**：选择配置的存储空间，用于存储导出的备份文件。

    1. **导出路径**：指定存储空间中的文件路径。

1. 点击**导出**。

![export-backup-file-zh](/img/export-backup-file-zh.png)

## 查看导出进度

点击**导出**后，系统会自动生成一个导出任务：

1. 在左侧导航栏中进入**任务**页面。

1. 监控任务的**状态**：

    - **进行中**：文件正在导出中。

    - **成功**：备份文件已成功导出，您可以在指定的存储空间中访问该文件。

    - **失败**：任务失败。这可能是由于导出过程中使用的资源（例如角色 ARN 或备份文件）在任务执行期间被删除所导致。

## 取消导出任务

如果任务持续显示为**进行中**状态，但您决定终止操作，可以点击**操作**列中的**取消**按钮取消任务。

<Admonition type="info" icon="📘" title="说明">

<p>取消任务不会移除已上传至存储空间的数据。</p>

</Admonition>

