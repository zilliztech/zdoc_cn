---
slug: /advance-pay-balance-monitor
beta: FALSE
notebook: FALSE
sidebar_position: 5
---

import Admonition from '@theme/Admonition';


# 现金余额监控

Zilliz Cloud 提供现金余额监控功能。该监控默认关闭。如果您进行过现金充值，您可以打开此监控，从而在现金余额即将不足时收到预警提醒。

## 设置告警条件{#set-alert-condition}

要在项目中设置现金余额告警条件，请执行以下步骤：

1. 在项目左侧导航栏中选择**监控**。

1. 打开**监控设置**页签。

1. 定位到**账单监控**区域下的第一行条件。

1. 单击操作列的**更多**按钮，选择**编辑**。
    在提示的对话框中输入金额数，然后单击**保存**。当现金余额小于以下指定的数额时，系统会自动向所有组织管理员连续发送 3 次告警邮件，每封邮件的间隔时间为 1 小时。

![advance-pay-monitor-edit-cn](/img/advance-pay-monitor-edit-cn.png)

## 开启监控功能{#enable-advance-pay-balance-monitor}

要开启监控功能，需在**状态**列中打开开关。单击开关即可切换开启或关闭状态。请确保开关指示器在右侧，并且背景颜色变为蓝色。

![advance-pay-monitor-enable-cn](/img/advance-pay-monitor-enable-cn.png)

## 文档推荐{#related-topics}

- [CU 资源监控](./cu-resource-monitor) 

- [QPS 资源监控](./qps-resource-monitor) 

- [查询时延监控](./query-latency-monitor) 

- [已使用容量监控](./load-capacity-resource-monitor) 

- [查看集群性能指标](./monitor-metrics) 
