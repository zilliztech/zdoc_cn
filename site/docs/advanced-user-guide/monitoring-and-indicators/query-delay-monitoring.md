---
sidebar_position: 2
---

# 查询延时监控

为了及时调优 Zilliz Cloud 集群性能，建议启用查询延时监控。

## 设置告警条件

要在项目中设置集群的查询延时告警条件，请执行以下步骤：

1. 在项目左侧导航栏中选择**监控**。

1. 打开**监控设置**页签。

1. 定位到**资源监控**区域下的第三行条件。
  默认情况下，当查询延时超过 90 毫秒且持续时间超过 10 分钟时，我们将向您发送告警通知。

1. 单击操作列的**更多**按钮，选择**编辑**。
  在提示的对话框中调整延时和持续时长，然后单击**保存**。

## 开启监控功能

要开启监控功能，需在**状态**列中打开开关。单击开关即可切换开启或关闭状态。请确保开关指示器在右侧，并且背景颜色变为蓝色。

![resource-monitors](/img/resource-monitors.png)

## 相关文档

- [CU 资源监控](https://zilliverse.feishu.cn/wiki/J4YtwCZUbiHd5LkS3SdcQi9GnOg)

- [QPS 资源监控](https://zilliverse.feishu.cn/wiki/LL1Iw34rqikxZrkZZ5Ecakm8nJe)

- [已使用容量监控](https://zilliverse.feishu.cn/wiki/HayvwbjUtiAcqak1fDMcigc3nUc)

- [查看集群性能指标](https://zilliverse.feishu.cn/wiki/S3BswPJ4NiKl9okZDoycMvbunMb)
