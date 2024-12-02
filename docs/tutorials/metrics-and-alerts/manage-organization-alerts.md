---
title: "管理组织告警 | Cloud"
slug: /manage-organization-alerts
sidebar_label: "管理组织告警"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 针对资源监控提供了两类告警：一是针对账单相关的组织告警，二是针对特定项目中集群性能的项目告警。更多详细信息，请参阅指标与告警快速参考。 | Cloud"
type: origin
token: WpDVwYaHMizLWuklBJlcypTzn2d
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 组织
  - 告警

---

import Admonition from '@theme/Admonition';


# 管理组织告警

Zilliz Cloud 针对资源监控提供了两类告警：一是针对账单相关的组织告警，二是针对特定项目中集群性能的项目告警。更多详细信息，请参阅[指标与告警快速参考](./metrics-alerts-reference)。

本文将介绍如何查看及管理组织告警。

## 概览{#overview}

下表展示了各组织告警的默认配置。

当告警处于**开启**状态时，一旦满足告警条件，指定的接收者将收到告警通知。您可以编辑告警以更改其状态。

<table>
   <tr>
     <th><p>告警项</p></th>
     <th><p>单位</p></th>
     <th><p>描述</p></th>
     <th><p>推荐操作</p></th>
     <th><p>默认告警条件</p></th>
   </tr>
   <tr>
     <td><p>优惠券</p></td>
     <td><p>￥</p></td>
     <td><p>跟踪优惠券的余额，当额度低时提醒用户及时充值。</p></td>
     <td><p>充值以维持账户功能。</p></td>
     <td><p>优惠券余额小于 ¥10 时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>优惠券有效期</p></td>
     <td><p>天</p></td>
     <td><p>监控优惠券的剩余有效期，鼓励用户使用或延期。</p></td>
     <td><p>延长有效期或在额度过期前使用。</p></td>
     <td><p>优惠券有效期小于 0 天时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>现金余额</p></td>
     <td><p>¥</p></td>
     <td><p>监控预付款余额，当余额低时提醒用户以防服务中断。</p></td>
     <td><p>为预付款余额增加资金以避免服务中断。</p></td>
     <td><p>现金余额小于 ¥100 时触发<strong>紧急</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>用量金额</p></td>
     <td><p>¥</p></td>
     <td><p>跟踪使用金额，当超过设定阈值时通知用户，建议监控和管理。</p></td>
     <td><p>监控和管理使用以保持在预算限额内。</p></td>
     <td><p>用量金额大于 ¥100 时触发<strong>警告</strong>告警。</p></td>
   </tr>
</table>

**权限**：

- **查看和配置**：仅对组织管理员开放。

- **接收告警通知**：如果被管理员指定为接收人，任何组织成员都可以接收告警通知。

要了解用户角色的详细说明，请参阅[用户角色](./user-roles)。

## 查看组织告警{#view-organization-alerts}

在**组织告警**页面，查看各种账单相关的告警。

**告警的组成部分**：

- **告警项**：由 Zilliz Cloud 预设的触发条件和严重程度。

- **状态**：显示告警是否处于**开启**状态。

- **触发条件**：触发告警的条件。

- **告警等级**：根据告警严重情况，分为**警告**或**紧急**。

- **告警接收**：接收通知的指定角色、电子邮箱地址或电话号码。

![zh-view-organization-alerts](/img/zh-view-organization-alerts.png)

## 编辑组织告警{#edit-organization-alerts}

- 自定义设置：修改告警触发条件、更新通知接收人以及更改告警状态。

- 限制：暂不支持修改告警项和告警等级。

<Admonition type="info" icon="📘" title="说明">

<p>要快速开启或关闭一个告警，您可以在<strong>操作</strong>栏中选择<strong>开启</strong>或<strong>关闭</strong>。</p>

</Admonition>

## 开启或关闭组织告警{#turn-on-or-off-an-organization-alert}

要快速开启或关闭一个告警，在**操作**栏中选择**开启**或**关闭**。

<Admonition type="info" icon="📘" title="说明">

<p>告警关闭后，您无法再接收到任何告警通知。</p>

</Admonition>

## 查看告警历史{#view-alert-history}

在**告警历史**页签，查看已触发的告警历史列表。您可以根据告警项、告警等级和告警时间范围筛选满足条件的告警。

## 文档推荐{#related-topics}

- [查看集群性能指标](./view-cluster-metric-charts)

- [管理项目告警](./manage-project-alerts)

- [指标与告警快速参考](./metrics-alerts-reference)

