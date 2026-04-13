---
title: "版本说明书（2026/04） | Cloud"
slug: /release-notes-2604
sidebar_label: "2026/04"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "版本说明书（2026/04） | Cloud"
type: origin
token: Ahgkw1upqiFne0kMJBaciMyEnac
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 版本说明书

---

import Admonition from '@theme/Admonition';


import Grid from '@site/src/components/Grid';

# 版本说明书（2026/04）

<Grid columnSize="2" widthRatios="20,80">

    <div>

        **2026 年 04 月 11 日**

    </div>

    <div>

        ## 全球集郡\{#global-cluster}

        全球集群现已支持云地域级别的灾备和故障切换能力，并加强了相关平台能力。

        - **强切**：您可以在主用集群不可用时手动触发强切。在完成强切后，Zilliz Cloud 会为您的全球集群自动创建新的备用集群。

        - **独立 Replica 设置**：主用和备用集群支持分别设置 Replica 数量，启用动态扩缩容及定时扩缩容等设置。

        - **快速转换**：Zilliz Cloud 支持您在全球集群和普通的 Dedicated 集群间进行无缝转换。

        - **审计日志**：全球集群拓扑的所有变化均会记录审计日志，包括创建、优雅切换、强切及备用集群管理等。

        更多详情，请参考 [全球集群概览](./global-cluster-explained) 及 [优雅切换和强切](./switchover-and-failover)。

        ## Collection 级别指标监控\{#collection-level-metrics}

        更多详情，请参考 [指标快速参考](./metrics-alerts-reference#resources)。

        ## 性能日志（访问日志） | PUBLIC \{#performance-logs-access-logs}

        Zilliz Cloud 现已支持访问日志。您可以通过这种新的可观测性指标来获取您集群中查询活动的详细情况。访问日志记录了所有 Search、Hybrid Search 及 Query 请求。

        与审计日志为所有操作提供完整的合规记录不同，访问日志的设计目的是可以为您的性能分析及业务洞察提供数据。通过异步、非阻塞式的日志系统，并提供可配置的采样率等指标，您可以在不影响业务延时的情况下方便地收集各种查询模式的相关数据。

        关键能力包括：

        - 可配置采样率：您可以通过调整采样率（如将其设置为 1%）来平衡统计准确度及高吞吐工作负载导致的存储成本。

        - 可定制输出字段：您可以通过调整每条日志记录中包含的字段来控制日志的详细程度及相关成本。

        - 热数据识别：您可以通过分析日志中记录的主键（`params.result_pks`）来发现哪些记录经常被访问，从而形成相应的数据缓存和分层访问策略。

        - 结构化 JSONL 格式：每条日志记录均为一个完整的 JSON 对象。您可以将其纳入到任何数据仓库及分析流水线。

        更多详情，请参考 [访问日志](./access-logs)。

        ## 运维窗口\{#maintenance-window}

        Zilliz Cloud 重新设计了运维窗口功能的用户体验，为您提供可预测的定时升级计划及主动通知能力。

        - 扩大可用范围：运维窗口设置现已向所有企业订阅组织开放。

        - 拉长窗口范围：运维窗口的最短时间已由原来的 2 小时拉长为 4 小时，避免了升级耗时超过运维窗口的情况。您仍旧可以像之前一样配置运维窗口的起始时间。

        - 升级通知系统：对于所有的主要升级，您都会在升级前  7  天、3 天、1 天接收到 Email 和控制台通知。您可以通过通知了解升级计划主配套 SDK 的推荐信息。

        - 主动推迟升级：您可以根据您的业务需求在集群详情页面选择推迟升级。当前支持最多推迟 7 天。

        更多详情，请参考[配置运维窗口](./organization-settings#set-up-preferred-maintenance-window)。

        ## Cluster Admin 角色\{#cluster-admin-role}

        Zilliz Cloud 提供了全新的 Cluster Admin 角色。您可以将其授予团队内的成员，从而使他们能够以项目管理员的所有权限访问部分或全部集群资源。

        - 集群操作：Cluster Admin 可以操作每日运维任务，包括扩缩容、挂起及恢复、备份和恢复以及数据库用户管理。

        - 按集群分配：此角色可以关联具体的集群，在您的各类环境和工作负载间提供细粒度的分工。

        - 注意：自定义 API Key 不支持绑定 Cluster Admin 角色。

        更多详情，可参考 [管理项目用户](./project-users#cluster-admin)。

        ## Zilliz Cloud BYOC 支持分层存储集群\{#zilliz-cloud-byoc-supports-tiered-storage-cluster}

        您现在可以在 BYOC 项目中创建分层存储集群。在此之前，您需要在部署 BYOC 项目时设置分层存储 Query Node 设置，从而允许您独立设置此类 Query Node 的实例数量、节点数量及针对分层存储 Query Node 的自动扩缩容。

        ## 更多增强\{#enhancements}

        - 您现在可以通过控制台在您的集群数据预览页面按主键、数值及其它标量列进行升序或降序排列。更多内容，可参考[管理 Collection (控制台)](./manage-collections-console)

    </div>

</Grid>

