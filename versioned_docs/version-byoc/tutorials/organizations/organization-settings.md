---
title: "管理组织设置 | Cloud"
slug: /organization-settings
sidebar_label: "管理组织设置"
beta: FALSE
notebook: FALSE
description: "组织管理员具备管理组织设置的权限。 | Cloud"
type: origin
token: AkYpwsObJihszLkXBz6ca0XDnOc
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 组织
  - organizations
  - organization settings
  - 组织设置
  - 时区设置
  - 运维窗口
  - 删除组织

---

import Admonition from '@theme/Admonition';


# 管理组织设置

组织管理员具备管理组织设置的权限。

本文将介绍如何在 Zilliz Cloud 中管理组织设置。

## 查看组织{#view-organizations}

当您登录到 Zilliz Cloud 控制台后，会进入组织列表页面。在这里，您可以查看已加入的组织。

![zh-view-organizations](/img/zh-view-organizations.png)

要快速查看您加入的所有组织，点击顶部导航栏中的组织名，然后选择**查看所有组织**。

![zh-view-all-organizations](/img/zh-view-all-organizations.png)

## 编辑组织名称{#edit-organization-name}

要编辑组织名称，您必须是[组织管理员](./organization-users#organization-roles)。

您可以通过以下任一种方式编辑组织名称：

- 在组织列表页面编辑组织名称。

    ![zh-rename-organization](/img/zh-rename-organization.png)

- 进入一个组织，在**系统设置**页面编辑组织名称。

    ![edit-organization-name-zh](/img/edit-organization-name-zh.png)

## 设置时区{#manage-timezone}

默认情况下，系统时区的设置会与首次登录地保持一致，并会应用 Zilliz Cloud 中显示的所有时间字符串。

如需查看时区，您的角色可以是组织管理员或组织成员。更多有关组织角色详情，请参考[管理组织用户](./organization-users#organization-roles)。

![timezone-settings](/img/timezone-settings.png)

如需修改时区，您的角色必须为组织管理员。请单击**编辑**以打开**编辑系统时区**对话框，并从下拉列表中选择时区。您还可以输入时区名称以快速检索所需的时区。

## 设置运维窗口{#set-up-maintenance-window}

Zilliz Cloud 允许用户为集群设置运维窗口，以减少运维对工作负载的影响，增加可预测性。

目前，运维窗口设置为全局设置，应用于 Zilliz Cloud 上的所有集群。

为避免在业务高峰期进行运维导致业务中断，Zilliz Cloud 默认不会在当地时间每日凌晨 0 点到下午 2 点期间进行大规模更新。运维前，您会提前收到运维事件通知。运维日当天，Zilliz Cloud 会优先在您设置的运维窗口进行相关操作。

运维事件通常持续两个小时，期间可能会发生服务中断。默认的运维窗口为当地时间凌晨 2 点到凌晨 4 点之间。您可以在**维护时间设置**中选择合适的运维窗口。

运维事件完成后，您会收到完成通知。Zilliz Cloud 还会在**事件**中记录每次运维事件的开始和结束时间，以防您错过通知。

要查看当前运维窗口，请从左侧导航栏中选择**系统设置**，并在**系统维护时间**区域找到当前应用的运维窗口。

要更改系统运维窗口，请单击**编辑**以打开**编辑系统维护时间**对话框，并从**系统维护时间**下拉列表中选择合适的运维窗口。

![maintenance-window](/img/maintenance-window.png)

## 删除组织{#delete-organization}

开始前，请先确保：

- 当前组织下的[集群已全部删除](./manage-cluster)。

- 当前组织中的[账单](./view-invoice)已全部付清。

- 您的组织角色为组织管理员。

- 现金余额已全部退款

- 第三方云市场[订阅已取消](./subscribe-on-aliyun-marketplace#unsubscribe-alibaba-marketplace)。

以下为删除组织的操作步骤：

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com.cn/login)。

1. 进入需要删除的组织并点击左侧导航栏中的**系统设置**。

1. 在**系统设置**页面最下方的**删除组织**区域内，点击**删除组织**按钮。

1. 根据弹出的对话框完成相应操作，确认删除组织。

<Admonition type="caution" icon="🚧" title="警告">

<p>删除组织的操作不可逆，请谨慎操作！</p>

</Admonition>

![delete-organization-cn](/img/delete-organization-cn.png)

