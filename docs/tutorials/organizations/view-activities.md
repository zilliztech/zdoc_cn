---
title: "查看事件 | Cloud"
slug: /view-activities
sidebar_label: "查看事件"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 事件页面记录了组织中发生的事件，包括免费额度增减、集群状态变更、授予或撤销组织和项目权限等。 | Cloud"
type: origin
token: L7IZwws2oiiByGk53YWcJJ3ynFg
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 组织
  - organizations
  - 查看项目事件
  - view activities

---

import Admonition from '@theme/Admonition';


# 查看事件

Zilliz Cloud **事件**页面记录了[组织](./organizations)中发生的事件，包括免费额度增减、集群状态变更、授予或撤销组织和项目权限等。

## 查看事件{#view-activities}

您可以在 Zilliz Cloud 界面查看组织级别的事件。

1. 点击进入组织。

1. 在左侧导航栏中，点击**事件**。在**事件**页面，您可以查看事件内容、事件发生时间以及对应的操作人。

![view-activities-cn](/img/view-activities-cn.png)

## 筛选事件{#filter-activities}

您可以根据事件类型和事件发生的时段来筛选展示的事件记录。您可以组合这 2 个筛选条件。

- **根据时间筛选事件**

    如需查看特定时间段内发生的事件，请点击时间组件，选择起始日期和终止日期，点击**确认**。 

    <Admonition type="info" icon="📘" title="说明">

    <p>起始日期和终止日期之间应小于 30 天。</p>

    </Admonition>

    ![filter-by-time-range-cn](/img/filter-by-time-range-cn.png)

- **根据事件类型筛选**

    如需根据事件类型筛选，请点击事件类型下拉框并选择您想要查看的事件类型。Zilliz Cloud 中有 3 种事件类型：**信息**、**警告**和**错误**。

    <table>
       <tr>
         <th><p><strong>事件类型</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>信息</p></td>
         <td><p>集群、权限、账单等相关信息。 例如：集群 in01-xxxxxxxxxxxxxxx 已创建。</p></td>
       </tr>
       <tr>
         <td><p>警告</p></td>
         <td><p>资源状态更新等需要留意的信息。 例如：集群 in01-xxxxxxxxxxxxxxx 已删除。</p></td>
       </tr>
       <tr>
         <td><p>错误</p></td>
         <td><p>账单支付失败或系统出错等需要立刻注意或采取行动的信息。 例如：账单 invo-xxxxxxxxxxxxxxxxxxxxxxxx 支付失败。</p></td>
       </tr>
    </table>

    ![filter-by-activity-type-cn](/img/filter-by-activity-type-cn.png)

