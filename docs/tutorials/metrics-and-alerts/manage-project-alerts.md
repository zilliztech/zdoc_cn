---
slug: /manage-project-alerts
beta: FALSE
notebook: FALSE
token: EUS8w4x9Ii0BmhkJBfQcsoFln5c
sidebar_position: 4
---

import Admonition from '@theme/Admonition';


# 管理项目告警

Zilliz Cloud 针对资源监控提供了两类告警：一是针对账单相关的组织告警，二是针对特定项目中集群性能的项目告警。更多详细信息，请参阅[指标与告警快速参考](./metrics-alerts-reference)。

本文将介绍如何查看及管理项目告警。

## 概览{#overview}

下表展示了各项目告警的默认配置。

当告警处于**开启**状态时，一旦满足告警条件，指定的接收者将收到告警通知。您可以编辑告警以更改其状态。

如需了解集群资源使用超过阈值时建议执行的操作，请参阅[集群指标](./metrics-alerts-reference#cluster-metrics)。

|  告警项              |  单位  |  默认告警条件                                                                                                    |
| ----------------- | ---- | ---------------------------------------------------------------------------------------------------------- |
|  CU 计算资源<br/>  |  %   |  - **警告**：CU 计算资源用量大于 70% 且持续时间超过 10 分钟时触发告警。<br/> - **紧急**：CU 计算资源用量大于 90% 且持续时间超过 10 分钟时触发告警。<br/> |
|  CU 加载容量          |  %   |  - **警告：**CU 加载容量大于 70% 且持续时间超过 10 分钟时触发告警。<br/> - **紧急：**CU 加载容量大于 90% 且持续时间超过 10 分钟时触发告警。<br/>     |
|  搜索 QPS           |  QPS |  搜索（search）类型请求数大于 50 QPS 且持续时间超过 10 分钟时触发**警告**告警。                                                        |
|  查询 QPS           |  QPS |  查询（query）类型请求数大于 50 QPS 且持续时间超过 10 分钟时触发**警告**告警。                                                         |
|  P99 搜索延时         |  ms  |  搜索（search）类型 P99 请求延时大于 1000 ms 且持续时间超过 10 分钟时触发**警告**告警。                                                 |
|  P99 查询延时         |  ms  |  查询（query）类型 P99 请求延时大于 1000 ms 且持续时间超过 10 分钟时触发**警告**告警。                                                  |

**权限**：

- **查看**：组织管理员、项目管理员或成员可以查看项目告警。

- **配置**：只有组织管理员或项目管理员可以配置集群告警。

- **接收告警通知**：如果被管理员指定，任何组织成员都可以接收告警通知。

要了解用户角色的详细说明，请参阅[用户角色](./user-roles)。

## 查看项目告警{#view-project-alerts}

在**项目告警**页面，查看各种集群相关的告警。

**告警的组成部分**：

- **告警项**：由 Zilliz Cloud 预设的触发条件和严重程度。

- **状态**：显示告警是否处于**开启**状态。

- **触发条件**：触发告警的条件。

- **告警等级**：分为**警告**或**紧急**。

- **告警接收**：接收通知的指定角色、电子邮箱地址或电话号码。

![zh-view-project-alert](/img/zh-view-project-alert.png)

## 创建项目告警{#create-project-alert}

除了默认告警外，您还可以点击 **+ 告警**来创建项目告警。您可以自定义告警项、严重级别、告警条件和告警通知接收人。

有关支持自定义的告警项，请参阅[指标与告警快速参考](./metrics-alerts-reference)。

![zh-create-project-alert](/img/zh-create-project-alert.png)

## 编辑项目告警{#edit-project-alert}

- 自定义设置：修改告警触发条件、更新通知接收人以及更改告警状态。

- 限制：暂不支持修改告警项和告警等级。

<Admonition type="info" icon="📘" title="说明">

<p>要快速开启或关闭一个告警，您可以在<strong>操作</strong>栏中选择<strong>开启</strong>或<strong>关闭</strong>。</p>

</Admonition>

![zh-edit-project-alert](/img/zh-edit-project-alert.png)

## 开启或关闭项目告警{#turn-on-or-off-a-project-alert}

要快速开启或关闭一个告警，在**操作**栏中选择**开启**或**关闭**。

<Admonition type="info" icon="📘" title="说明">

<p>告警关闭后，您无法再接收到任何告警通知。</p>

</Admonition>

![zh-turn-on-or-off-project-alert](/img/zh-turn-on-or-off-project-alert.png)

## 删除项目告警{#delete-a-project-alert}

您可以删除不需要的项目告警。

<Admonition type="info" icon="说明" title="undefined">

<p>告警删除后，您无法再接收到任何告警通知。</p>

</Admonition>

![zh-delete-project-alert](/img/zh-delete-project-alert.png)

## 查看告警历史{#view-alert-history}

在**告警历史**页签，查看已触发的告警历史列表。您可以根据告警项、告警等级和告警时间范围筛选满足条件的告警。

![zh-view-alert-history](/img/zh-view-alert-history.png)

## 文档推荐{#related-topics}

- [查看集群性能指标](./view-cluster-metric-charts)

- [管理组织告警](./manage-organization-alerts)

- [指标与告警快速参考](./metrics-alerts-reference)

