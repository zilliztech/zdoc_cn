---
title: "审计日志 | Cloud"
slug: /audit-logs
sidebar_label: "审计日志"
beta: PRIVATE
notebook: FALSE
description: "审计日志允许管理员跟踪和监控 Zilliz Cloud 集群上的用户驱动的操作和 API 调用。此功能提供了数据平面活动的详细记录，包括向量搜索、查询执行、索引管理和其他数据操作。它提供了对安全审查、合规性审计和问题解决如何访问和管理数据的可见性。 | Cloud"
type: origin
token: OcSgw7LJwiyuC2kdymbcWDV6nNg
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 审计
  - 日志

---

import Admonition from '@theme/Admonition';


# 审计日志

审计日志允许管理员跟踪和监控 Zilliz Cloud 集群上的用户驱动的操作和 API 调用。此功能提供了数据平面活动的详细记录，包括向量搜索、查询执行、索引管理和其他数据操作。它提供了对安全审查、合规性审计和问题解决如何访问和管理数据的可见性。

<Admonition type="info" icon="📘" title="说明">

<p>审计日志记录为<strong>内测版</strong>功能。如需使用此功能或了解相关费用，请<a href="https://zilliz.com.cn/contact-sales">联系销售</a>。</p>

</Admonition>

## 概述{#overview}

审计日志记录跟踪数据平面上的各种操作，包括：

- **搜索和查询操作**：向量搜索、混合搜索和查询操作。

- **数据管理**：索引创建、集合创建、分区管理以及插入、删除和更新等实体操作。

- **系统事件**：用户访问尝试、授权检查和其他预定义操作。

<Admonition type="info" icon="📘" title="说明">

<p>控制平台上的诸如迁移、备份和恢复等集群操作不会产生审计日志。您可前往组织事件页面查看相关操作记录。具体可参考<a href="./view-activities">查看事件</a>。</p>

</Admonition>

审计日志会定期以流式传输的方式直接存放到用户指定的对象存储桶。日志以结构化文件路径和命名格式存储，便于访问和管理：

- **文件路径**： `/<Cluster ID>/<Log type>/<Date>`

- **文件命名规则**：具体格式为 `\<File name><File name suffix>`。`\<File name>`的格式为 *HH:MM:SS-&#36;UUID*：*HH:MM:SS* 代表日志产生时的 UTC 时间戳；*&#36;UUID* 代表一个随机字符串，如 `09:16:53-jz5l7D8Q`。

以下是流式传输到存储桶的审计日志条目示例：

```json
{
    "date": "2025-01-21T08:45:56.556286Z",
    "action": "CreateAlias",
    "cluster_id": "in01-b5a7e190615ef9f",
    "database": "database2",
    "interface": "Restful",
    "log_type": "AUDIT",
    "params": {
        "collection": "collection1"
    },
    "status": "Receive",
    "time": 1737449156556,
    "trace_id": "b599063b9d0cfcf9d756ddbbef56ab5b",
    "user": "zcloud_apikey_admin"
}
```

有关审计日志支持的操作和对应的字段，请参阅[审计日志参考](./audit-logs-ref)。

## 启用审计日志流式传输{#enable-audit-log-streaming}

在 Zilliz Cloud 上，审计日志会直接流式传输到您的存储桶。

### 开始前{#before-you-start}

- 您的 Zilliz Cloud 集群版本为 **Dedicated** 及以上。如有需求，请[升级集群](./manage-cluster)。

- 您已经为 Zilliz Cloud 项目配置了对象存储集成，因为配置完成后审计日志将会流式传输到您的存储桶。有关详细步骤，请参阅[配置对象存储](./integrate-with-storage-bucket)。

- 您拥有该项目的**组织管理员**或**项目管理员**权限。如果您没有相应权限，请联系 Zilliz Cloud 管理员。

### 操作步骤{#procedure}

![zh-configure-auditing-1](/img/zh-configure-auditing-1.png)

1. 登录 [Zilliz Cloud 控制台](https://cloud.zilliz.com.cn/login)。

1. 在目标项目页面，选择**集群**。

1. 进入目标集群的详情页面，选择**审计日志**选项卡。当集群处于创建中、删除中或已删除状态时，该选项卡将不可用。

1. 在**流式传输审计日志**区域，点击**开启**。

1. 在弹出的对话框中，指定对象存储集成配置信息：

    - **集成**：显示托管您对象存储的云服务商。

    - **集成配置**：选择用于存储审计日志的存储桶。

        <Admonition type="info" icon="📘" title="说明">

        <p>只有与集群处于同一区域的存储桶才会显示在下拉列表中。</p>

        </Admonition>

    - **导出路径**：指定在存储桶中存放审计日志的目录路径。

1. 点击**开启**。当**流式传输审计日志**状态显示为**运行中**时，说明已成功启用。如果状态显示为异常，请参阅[常见问题](./audit-logs#faq)获取故障排查方法。

完成配置后，审计日志会以大约 5 分钟的间隔流式传输到您的存储桶。您可以随时访问存储桶来查看或管理所需日志。

要了解日志条目中的参数信息，请参阅[审计日志参考](./audit-logs-ref)。

## 管理审计日志流式传输{#manage-audit-log-streaming}

启用审计日志流式传输后，您可以根据需要编辑其配置或将其禁用。

![zh-configure-auditing-2](/img/zh-configure-auditing-2.png)

## 常见问题{#faq}

以下常见问题解答旨在帮助您解决在 Zilliz Cloud 上使用审计日志时可能遇到的问题。如需进一步帮助，请联系 [Zilliz Cloud 支持](https://zilliz.com.cn/contact-sales)。

- **为什么在集群详情页找不到审计日志选项卡？**

    目前，**审计日志**选项卡仅对在内测（Private Preview）白名单中的用户开放。如果您希望使用此功能，请联系 [Zilliz Cloud 支持](https://zilliz.com.cn/contact-sales)。

- **如果流式传输审计日志的状态为异常，该怎么办？**

    **流式传输审计日志**状态为异常表示日志流式传输出现问题。可通过以下步骤进行排查：

    - **检查网络连接**：确保网络连接稳定，并确认防火墙或 VPN 设置未阻止对 Zilliz Cloud 的访问。

    - **验证存储桶**：确认已正确配置存储桶，并且您拥有相应的访问权限。

    - **联系支持**：如果问题仍然存在，请联系 [Zilliz Cloud 支持](https://zilliz.com.cn/contact-sales)以获取进一步协助。

- **异常集群状态会影响审计日志流式传输服务吗？**

    集群状态异常意味着集群可能存在网络连接或 Zilliz Cloud 服务中断等问题。然而，这些问题并不会影响审计日志流式传输服务，该服务会继续正常运行并将日志流式传输到您的存储桶。如果您遇到持续性问题，请联系 [Zilliz Cloud 支持](https://zilliz.com.cn/contact-sales)。