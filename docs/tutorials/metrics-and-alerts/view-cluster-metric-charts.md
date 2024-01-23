---
slug: /view-cluster-metric-charts
beta: FALSE
notebook: FALSE
token: S3BswPJ4NiKl9okZDoycMvbunMb
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 查看集群性能指标

为更好地了解集群性能，Zilliz Cloud 提供集群监控面板，您可以在其中查看特定集群的相关性能指标。

## 性能指标图表{#access-cluster-metric-charts}

在 Zilliz Cloud 控制台，找到目标集群，并点击**指标**选项卡。

![view_system_metrics](/img/view_system_metrics.png)

Zilliz Cloud 的性能指标图表展示了包括资源使用、每秒查询量（QPS）、请求结果及数据操作等方面的性能数据，提供了对特定时间段的详细分析。

关于每个性能指标图表的详细信息，请参阅[查看性能指标图表](./view-cluster-metric-charts#view-metric-charts)。

## 调整统计频率{#modify-curve-window-size}

**指标**选项卡提供两种类型的时间窗口设置。

- **相对范围**：您可以从一组预设的时间段中选择，这些时间段是相对于当前时间的。使用相对时间范围，您可以便捷地定期查看指标，无需手动设置具体的开始和结束时间。选项包括：

    - 过去 10 分钟

    - 过去 1 小时

    - 过去 1 天

    - 过去 1 周

    - 过去 1 月

- **绝对范围**：您可以精确设置想要查看的起始时间和结束时间。使用绝对时间范围，可以更精准地控制您想查看的指标数据。

    - 选择的起始时间和结束时间之间的差距应超过 10 分钟。

![zh-filter_metrics_by_time_period](/img/zh-filter_metrics_by_time_period.png)

## 查看性能指标图表{#view-metric-charts}

Zilliz Cloud 提供了多种指标图表，用于从不同角度监控集群性能。要快速浏览所有可用指标，请参见[指标与告警快速参考](./metrics-alerts-reference)。

### 资源监控{#resources}

要查看资源使用情况的指标图表，请在**指标**选项卡下找到**资源**部分。这些图表展示了集群的资源用量情况，涵盖了计算、容量和存储方面的数据。

- **CU 计算资源使用率**：显示计算能力使用量占总计算能力的比例。

    - 70%-80%：开始考虑扩容。

    - 90% 或以上：需要立即扩容，以防服务中断。

- **CU 中已加载容量使用率**：展示使用的容量占总容量的百分比。

    - 70%-80%：开始考虑扩容。

    - 90%-99%：需要立即扩容，以防服务中断。

    - 100%：当 CU 容量使用率达到 100% 时，Zilliz Cloud 会停止数据写入，并且 SDK 端将会报错。此时应立即对集群进行扩容以恢复正常功能。

- **存储用量**：展示在选定时间段内使用的总持久化存储量，按 GB/s 计算。

![zh-view_metric_charts_resources](/img/zh-view_metric_charts_resources.png)

### 性能监控{#performance}

要查看关于性能的指标图表，请在**指标**选项卡中找到**性能**部分。这些图表展示了集群的性能状况，包括每秒查询次数（QPS）、每秒向量搜索操作次数（VPS）和响应延迟。

- **QPS**：每秒进行的搜索、查询、批量插入和更新操作的数量。

- **VPS**：在多向量操作中每秒进行的向量搜索操作次数。计算公式为 VPS = QPS * N（N 代表多向量操作中涉及的向量数）。

- **查询延迟**：指客户端发送请求到服务器并收到响应所需的时间。这包括平均延迟和 P99 延迟（即最慢的 1% 请求的延迟）。

![zh-view_metric_charts_performance](/img/zh-view_metric_charts_performance.png)

### 请求率指标{#request-rate}

要查看有关请求的性能指标图表，请在**指标**选项卡中访问**请求比例**部分。这些图表展现了集群处理请求的性能，通过展示成功与失败请求的比例来提供性能快照。

- **请求成功率**：每秒内所有请求中成功处理的请求所占的百分比。

- **请求失败率**：每秒内所有请求中因超时而失败的请求所占的百分比。

![zh-view_metric_charts_request_rate](/img/zh-view_metric_charts_request_rate.png)

### Entity 指标{#entity}

若要查看关于 Entity 的性能指标图表，请在**指标**选项卡中定位到 **Entity** 部分。这些图表反映了集群中 Entity 数据的情况，包括当前的 Entity 总数以及新 Entity 数据的插入速率。

- 已加载 Entity：指在集群中已加载的 Entity 的总数。

- Entity 插入速率：指每秒钟插入集群的 Entity 数。

![zh-view_metric_charts_entity](/img/zh-view_metric_charts_entity.png)

## 文档推荐{#related-topics}

- [管理组织告警](./manage-organization-alerts)

- [管理项目告警](./manage-project-alerts)

- [指标与告警快速参考](./metrics-alerts-reference)

