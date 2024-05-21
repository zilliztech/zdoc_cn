---
slug: /manage-connectors
beta: FALSE
notebook: FALSE
type: origin
token: ImJNwwoWkiEMOUk5FrAcnVLRnTe
sidebar_position: 3

---

import Admonition from '@theme/Admonition';


# 管理 Connector

您可以通过 Zilliz Cloud Web 控制台高效管理 Connector。本文介绍如何管理 Connector。

## 开启或关闭 Connector{#enable-or-disable-a-connector}

1. 找到目标 Connector。

1. 点击**操作栏**下的“**...**”。

1. 选择**开启**或**关闭** Connector。

<Admonition type="info" icon="📘" title="说明">

<p>开启 Connector 前，请确保已为其添加目标 Pipelines。更多详情，请参见<a href="./create-connectors">创建 Connector</a> 中的步骤 3。</p>

</Admonition>

![enable-connector-cn](/img/enable-connector-cn.png)

## 手动触发扫描{#trigger-a-manual-scan}

如未开启自动扫描功能，您可以按需手动触发扫描。

找到目标 Connector，点击**操作栏**中的“**...**”，随后点击**扫描**。

<Admonition type="info" icon="📘" title="说明">

<p>手动扫描前，请确保已开启 Connector。</p>

</Admonition>

## 编辑 Connector{#configure-a-connector}

创建 Connector 后，您可以编辑 Connector 配置。

- 修改对象存储服务密钥：

    - 阿里云对象存储 AccessKey ID 和 AccessKey Secret

- 自动扫描频率。更多详情，请参考[创建 Connector](./create-connectors) 中的步骤 4。

![configure-connector-cn](/img/configure-connector-cn.png)

## 删除 Connector{#drop-a-connector}

您可以删除不再使用的 Connector。

<Admonition type="info" icon="📘" title="说明">

<p>删除 Connector 前，请先关闭 Connector。</p>

</Admonition>

![drop-connector-cn](/img/drop-connector-cn.png)

## 查看 Connector 日志{#view-connector-logs}

您可以通过查看 Connector 日志来监控 Connector 活动并排除故障。

1. 通过 Connectors 事件页面查看日志。

    ![view-connector-logs-cn](/img/view-connector-logs-cn.png)

1. 如果 Connector 状态显示为`异常`，则代表 Connector 运行出错。点击状态旁的 “？”查看详细报错信息。

