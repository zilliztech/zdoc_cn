---
slug: /set-up-maintenance-window
beta: FALSE
notebook: FALSE
type: origin
token: Ah5HwOryHilTp4klJ6VcR4eJnvd
sidebar_position: 4
---

import Admonition from '@theme/Admonition';


# 设置运维窗口

Zilliz Cloud 允许用户为集群设置运维窗口，以减少运维对工作负载的影响，增加可预测性。

![maintenance-window](/img/maintenance-window.png)

## 概述{#overview}

目前，运维窗口设置为全局设置，应用于 Zilliz Cloud 上的所有集群。

为避免在业务高峰期进行运维导致业务中断，Zilliz Cloud 默认不会在当地时间每日凌晨 0 点到下午 2 点期间进行大规模更新。运维前，您会提前收到运维事件通知。运维日当天，Zilliz Cloud 会优先在您设置的运维窗口进行相关操作。

运维事件通常持续两个小时，期间可能会发生服务中断。默认的运维窗口为当地时间凌晨 2 点到凌晨 4 点之间。您可以在__维护时间设置__中选择合适的运维窗口。

运维事件完成后，您会收到完成通知。Zilliz Cloud 还会在__事件__中记录每次运维事件的开始和结束时间，以防您错过通知。

## 查看运维窗口{#view-current-window-hours}

要查看当前运维窗口，请从左侧导航栏中选择__系统设置__，并在__系统维护时间__区域的__偏好时间 (UTC) __下找到当前应用的运维窗口。

## 编辑运维窗口{#edit-current-window-hours}

要更改系统运维窗口，请单击__编辑__以打开__维护时间设置__对话框，并从__时间段 (UTC) __下拉列表中选择合适的运维窗口。

## 相关文档{#related-topics}

- [设置时区](./manage-timezone)

- [删除组织](./delete-your-organization)

- [使用回收站](./use-recycle-bin) 

