---
slug: /view-activities
beta: FALSE
notebook: FALSE
type: origin
token: WllVwhQakiUVLXkMm7ocRk5xnxh
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 查看事件

Zilliz Cloud **事件**页面记录了[组织](./resource-hierarchy#understand-organizations)中发生的事件，包括免费额度增减、集群状态变更、授予或撤销组织和项目权限等。

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

    |  **事件类型** |  **描述**                                                                        |
    | --------- | ------------------------------------------------------------------------------ |
    |  信息       |  集群、权限、账单等相关信息。<br/> 例如：集群 in01-xxxxxxxxxxxxxxx 已创建。                        |
    |  警告       |  资源状态更新等需要留意的信息。<br/> 例如：集群 in01-xxxxxxxxxxxxxxx 已删除。                       |
    |  错误       |  账单支付失败或系统出错等需要立刻注意或采取行动的信息。<br/> 例如：账单 invo-xxxxxxxxxxxxxxxxxxxxxxxx 支付失败。 |

    ![filter-by-activity-type-cn](/img/filter-by-activity-type-cn.png)

## 相关文档{#related-topics}

- [权限概览](./resource-hierarchy)

- [管理组织与成员](./organizations)

- [管理项目与成员](./projects) 

