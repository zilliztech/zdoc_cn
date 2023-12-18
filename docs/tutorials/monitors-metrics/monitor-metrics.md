---
slug: /monitor-metrics
beta: FALSE
notebook: FALSE
token: S3BswPJ4NiKl9okZDoycMvbunMb
sidebar_position: 6
---

import Admonition from '@theme/Admonition';


# 查看集群性能指标

为更好地了解集群性能，Zilliz Cloud 提供集群监控面板，您可以在其中查看特定集群的相关性能指标。

![view_system_metrics](/img/view_system_metrics.png)

## 指标说明{#understanding-metrics}{#understanding-metrics}

在**指标**页签下，您可以查看以下集群性能指标：

- CU 计算资源

    统计在指定时间范围内集群的 CPU 或内存使用率。单位：秒。

- 存储用量

    统计在指定时间范围内，占用的块存储大小。单位：千兆字节/秒。

- 每秒查询数 (QPS)

    统计在指定时间范围内平均每秒的查询数量变化情况。

- 查询延迟

    统计在指定时间范围内查询延时的变化情况。单位：毫秒。

## 调整统计频率{#modify-curve-window-size}{#modify-curve-window-size}

要调整统计频率，展开**所有监控指标**区域右侧的下拉菜单，选择合适的统计时间范围。可选项包括：

- 过去 10 分钟

- 过去 1 小时

- 过去 1 天

- 过去 1 周

- 过去 1 月

## 文档推荐{#related-topics}{#related-topics}

- [CU 资源监控](./cu-resource-monitor) 

- [QPS 资源监控](./qps-resource-monitor) 

- [查询时延监控](./query-latency-monitor) 

- [已使用容量监控](./load-capacity-resource-monitor) 

- [现金余额监控](./advance-pay-balance-monitor) 

