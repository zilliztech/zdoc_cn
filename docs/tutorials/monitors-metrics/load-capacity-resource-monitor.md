---
slug: /load-capacity-resource-monitor
beta: FALSE
notebook: FALSE
token: HayvwbjUtiAcqak1fDMcigc3nUc
sidebar_position: 4
---

import Admonition from '@theme/Admonition';


# 已使用容量监控

要跟踪 Collection 的负载容量，建议启用容量监控功能。该功能按百分比统计已加载数据所占用的内存大小。

## 设置告警条件{#set-alert-condition}{#set-alert-condition}

要在项目中设置内存告警条件，请执行以下步骤：

1. 在项目左侧导航栏中选择**监控**。

1. 打开**监控设置**页签。

1. 定位到**资源监控**区域下的最后一行条件。

    默认情况下，当负载容量超过 90% 且持续时间超过 10 分钟时，我们将向您发送告警通知。

1. 单击操作列的**更多**按钮，选择**编辑**。

    在提示的对话框中调整负载容量和持续时长，然后单击**保存**。

## 开启监控功能{#enable-the-monitor}{#enable-the-monitor}

要开启监控功能，需在**状态**列中打开开关。单击开关即可切换开启或关闭状态。请确保开关指示器在右侧，并且背景颜色变为蓝色。

![resource-monitors](/img/resource-monitors.png)

## 相关文档{#related-topics}{#related-topics}

- [CU 资源监控](./cu-resource-monitor)

- [QPS 资源监控](./qps-resource-monitor)

- [查询延时监控](./query-latency-monitor)

- [查看集群性能指标](./monitor-metrics)

- [现金余额监控](./advance-pay-balance-monitor) 

