---
slug: /cu-resource-monitor
sidebar_position: 0
---

# CU 资源监控

Zilliz Cloud 提供 CU 资源监控功能，以帮助您及时扩展集群。该功能支持监控 CPU 和内存使用情况，并以百分比表示。当监控值超过任一指标阈值时，系统会发送告警通知。

## 设置告警条件 {#set-alarm-conditions}

要在项目中设置 CU 告警条件，请执行以下步骤：

1. 在项目左侧导航栏中选择**监控**。

1. 打开**监控设置**页签。

1. 定位到**资源监控**区域下的第一行条件。
    默认情况下，当 CU 使用率超过 90％ 且持续时间超过 10 分钟时，我们将向您发送告警通知。

1. 单击操作列的**更多**按钮，选择**编辑**。
    在提示的对话框中调整 CU 使用率和持续时长，然后单击**保存**。

## 开启监控功能 {#enable-monitoring-function}

要开启监控功能，需在**状态**列中打开开关。单击开关即可切换开启或关闭状态。请确保开关指示器在右侧，并且背景颜色变为蓝色。

![resource-monitors](/img/resource-monitors.png)

## 相关文档 {#related-documents}

- [QPS 资源监控](./qps-resource-monitor)

- [查询延时监控](./query-latency-monitor)

- [已使用容量监控](./load-capacity-resource-monitor)

- [查看集群性能指标](./view-cluster-metrics)
