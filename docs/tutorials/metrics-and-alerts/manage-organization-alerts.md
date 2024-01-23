---
slug: /manage-organization-alerts
beta: FALSE
notebook: FALSE
token: WpDVwYaHMizLWuklBJlcypTzn2d
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 管理组织告警

Zilliz Cloud 针对资源监控提供了两类告警：一是针对账单相关的组织告警，二是针对特定项目中集群性能的项目告警。更多详细信息，请参阅[指标与告警快速参考](./metrics-alerts-reference)。

本文将介绍如何查看及管理组织告警。

## 概览{#overview}

下表展示了各组织告警的默认配置。

当告警处于**开启**状态时，一旦满足告警条件，指定的接收者将收到告警通知。您可以编辑告警以更改其状态。

|  告警项             |  单位             |  告警等级                     |  默认告警条件                                                                    |  默认状态        |
| ---------------- | --------------- | ------------------------- | -------------------------------------------------------------------------- | ------------ |
|  信用卡有效期<br/>  |  天              |  **告警** / **紧急**<br/>  |  - **告警**：信用卡有效期小于 30 天时触发告警。<br/> - **紧急**：信用卡有效期小于 7 天时触发告警。<br/>  |  开启          |
|  免费额度（余额/有效期）    |  % / 天<br/>  |  **告警**                   |  免费额度余额小于 ¥10 或免费额度有效期小于 0 天时触发告警。                                         |  开启<br/>  |
|  现金余额            |  ¥              |  **紧急**                   |  现金余额小于 ¥100 时触发告警。                                                        |  开启          |
|  用量金额            |  ¥              |  **告警**                   |  用量金额大于 ¥100 时触发告警。                                                        |  关闭          |

**权限**：

- **查看和配置**：仅对组织管理员开放。

- **接收告警通知**：如果被管理员指定为接收人，任何组织成员都可以接收告警通知。

要了解用户角色的详细说明，请参阅[用户角色](./user-roles)。

## 查看组织告警{#view-organization-alerts}

在**组织告警**页面，查看各种账单相关的告警。

**告警的组成部分**：

- **告警项**：由 Zilliz Cloud 预设的触发条件和严重性。

- **告警等级**：根据告警严重情况，分为**告警**或**紧急**。

- **触发条件**：触发告警的条件。

- **状态**：显示告警是否处于**开启**状态。

- **Receiver**：接收通知的指定角色、电子邮箱地址或电话号码。

![zh-view-organization-alerts](/img/zh-view-organization-alerts.png)

## 编辑组织告警{#edit-organization-alerts}

- 自定义设置：修改告警触发条件、更新通知接收人以及更改告警状态。

- 限制：暂不支持修改告警项和告警等级。

<Admonition type="info" icon="📘" title="说明">

要快速开启或关闭一个告警，您可以在**操作**栏中选择**开启**或**关闭**。

</Admonition>

![zh-edit-organization-alert](/img/zh-edit-organization-alert.png)

## 开启或关闭组织告警{#turn-on-or-off-an-organization-alert}

要快速开启或关闭一个告警，在**操作**栏中选择**开启**或**关闭**。

<Admonition type="info" icon="📘" title="说明">

告警关闭后，您无法再接收到任何告警通知。

</Admonition>

![zh-turn-on-or-off-organization-alert](/img/zh-turn-on-or-off-organization-alert.png)

## 查看告警历史{#view-alert-history}

在**告警历史**页签，查看已触发的告警历史列表。您可以根据告警项、告警等级和告警时间范围筛选满足条件的告警。

![zh-view_alert_history](/img/zh-view_alert_history.png)

## 文档推荐{#related-topics}

- [查看集群性能指标](./view-cluster-metric-charts)

- [管理项目告警](./manage-project-alerts)

- [指标与告警快速参考](./metrics-alerts-reference)

