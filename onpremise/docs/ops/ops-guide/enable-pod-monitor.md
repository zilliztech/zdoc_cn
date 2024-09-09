---
title: "配置监控告警 | On-Premise"
slug: /enable-pod-monitor
sidebar_label: "配置监控告警"
beta: FALSE
notebook: FALSE
description: "在部署 Milvus 集群时，可以对 Milvus 集群、Pulsar 和 etcd 等组件开启指标采集能力。本章介绍了如何为 Milvus 集群和 Pulsar、etcd 等三方组件配置指标采集能力，介绍各组件相关核心指标，并提供适用于各组件的 Grafana 模板，以便更好的了解 Milvus 集群的运行情况。 | On-Premise"
type: origin
token: IpeGwMrzdiB0WxkymsgcYHRKnLb
sidebar_position: 5
keywords: 
  - 向量数据库
  - 私有部署
  - milvus
  - 大模型向量数据库
  - 部署运维手册
  - 监控告警

---

<head>
  <meta name="robots" content="noindex" />
</head>


import Admonition from '@theme/Admonition';


# 配置监控告警

在部署 Milvus 集群时，可以对 Milvus 集群、Pulsar 和 etcd 等组件开启指标采集能力。本章介绍了如何为 Milvus 集群和 Pulsar、etcd 等三方组件配置指标采集能力，介绍各组件相关核心指标，并提供适用于各组件的 Grafana 模板，以便更好的了解 Milvus 集群的运行情况。

## 开启指标监控{#enable-pod-monitor}

可参考如下配置为 Milvus 集群、Pulsar 及 etcd 等三方组件配置指标采集能力。

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components: 
    disableMetric: false    # 开启milvus 组件metrics 采集，会在当前namespace 创建podMonitor
    metricsInterval: 30s    # 设置metrics 采集interval
  dependencies:
    etcd:
      inCluster:
        values:
          metrics:
            enabled: true
            podMonitor:
              enabled: true  # 开启metrics采集，默认会在monitoring namespace 创建podMonitor
              interval: 30s
    pulsar:
      inCluster:
        values:
          zookeeper:
            podMonitor: 
              enabled: true # 开启metrics 采集，在当前namespace 创建podMonitor
              interval: 30s
          bookkeeper:
            podMonitor:
              enabled: true # 开启metrics 采集，在当前namespace 创建podMonitor
              interval: 30s
          broker:
            podMonitor:
              enabled: true # 开启metrics 采集，在当前namespace 创建podMonitor
              interval: 30s
          proxy:
            podMonitor:
              enabled: true # 开启metrics 采集，在当前namespace 创建podMonitor
              interval: 30s
```

### 为 Milvus 集群配置指标采集能力{#enable-pod-monitor-for-milvus}

<table>
   <tr>
     <th><p>配置项</p></th>
     <th><p>说明</p></th>
     <th><p>取值范围</p></th>
   </tr>
   <tr>
     <td><p><code>spec.components.disableMetric</code></p></td>
     <td><p>是否为 Milvus 集群开启指标采集。</p><p>设置为 <code>true</code> 时，会在当前命名空间创建 podMonitor。</p></td>
     <td><ul><li><p><code>true</code></p></li><li><p><code>false</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>spec.components.metricsInterval</code></p></td>
     <td><p>Milvus 集群指标采集间隔。</p></td>
     <td><p>-</p></td>
   </tr>
</table>

### 为 etcd 配置指标采集能力{#enable-pod-monitor-for-etcd}

<table>
   <tr>
     <th><p>配置项</p></th>
     <th><p>说明</p></th>
     <th><p>取值范围</p></th>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.etcd.inCluster.values.metrics.podMonitor.enabled</code></p></td>
     <td><p>是否为 etcd 开启指标采集。</p><p>设置为 <code>true</code> 时，会在 monitoring 命名空间创建 podMonitor。</p></td>
     <td><ul><li><p><code>true</code></p></li><li><p><code>false</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.etcd.inCluster.values.metrics.podMonitor.interval</code></p></td>
     <td><p>etcd 指标采集间隔。</p></td>
     <td><p>-</p></td>
   </tr>
</table>

### 为 Pulsar 配置指标采集能力{#enable-pod-monitor-for-pulsar}

<table>
   <tr>
     <th><p>配置项</p></th>
     <th><p>说明</p></th>
     <th><p>取值范围</p></th>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.zookeeper.podMonitor.metrics.enabled</code></p></td>
     <td><p>是否为 Pulsar ZooKeeper 开启指标采集。</p><p>设置为 <code>true</code> 时，会在当前命名空间创建 podMonitor。</p></td>
     <td><ul><li><p><code>true</code></p></li><li><p><code>false</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.zookeeper.podMonitor.metrics.interval</code></p></td>
     <td><p>Pulsar ZooKeeper 指标采集间隔。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.bookkeeper.podMonitor.metrics.enabled</code></p></td>
     <td><p>是否为 Pulsar BookKeeper 开启指标采集。</p><p>设置为 <code>true</code> 时，会在当前命名空间创建 podMonitor。</p></td>
     <td><ul><li><p><code>true</code></p></li><li><p><code>false</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.bookkeeper.podMonitor.metrics.interval</code></p></td>
     <td><p>Pulsar BookKeeper 指标采集间隔。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.broker.podMonitor.metrics.enabled</code></p></td>
     <td><p>是否为 Pulsar Broker 开启指标采集。</p><p>设置为 <code>true</code> 时，会在当前命名空间创建 podMonitor。</p></td>
     <td><ul><li><p><code>true</code></p></li><li><p><code>false</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.broker.podMonitor.metrics.interval</code></p></td>
     <td><p>Pulsar Broker 指标采集间隔。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.proxy.podMonitor.metrics.enabled</code></p></td>
     <td><p>是否为 Pulsar Proxy 开启指标采集。</p><p>设置为 <code>true</code> 时，会在当前命名空间创建 podMonitor。</p></td>
     <td><ul><li><p><code>true</code></p></li><li><p><code>false</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>spec.dependencies.pulsar.inCluster.values.proxy.podMonitor.metrics.interval</code></p></td>
     <td><p>Pulsar Proxy 指标采集间隔。</p></td>
     <td><p>-</p></td>
   </tr>
</table>

## 核心指标介绍{#core-metrics}

### Milvus 集群核心指标{#core-milvus-metrics}

<table>
   <tr>
     <th><p>指标分类</p></th>
     <th><p>指标名称</p></th>
     <th><p>影响面</p></th>
     <th><p>是否告警</p></th>
     <th><p>告警阈值</p></th>
   </tr>
   <tr>
     <td><p>查询延迟</p></td>
     <td><pre><code class="json language-json"> milvus_proxy_sq_latency_bucket\{query_type="search"} // search latency (proxy) milvus_proxy_sq_latency_bucket\{query_type="query"}  // query latency (proxy)</code></pre></td>
     <td><p>影响查询服务</p></td>
     <td><p>Y</p></td>
     <td><p>根据业务场景设置</p></td>
   </tr>
   <tr>
     <td><ol><li>写入延迟</li></ol></td>
     <td><pre><code class="json language-json"> milvus_proxy_mutation_latency_bucket\{msg_type="insert"} // insert latency (proxy) milvus_proxy_mutation_latency_bucket\{msg_type="upsert"} // upsert latency (proxy) milvus_proxy_mutation_latency_bucket\{msg_type="delete"} // delete latency (proxy)</code></pre></td>
     <td><p>影响写入操作</p></td>
     <td><p>Y</p></td>
     <td><p>根据业务需求设置</p></td>
   </tr>
   <tr>
     <td><p>消息队列latency</p></td>
     <td><pre><code class="json language-json"> milvus_proxy_mutation_send_latency_bucket\{msg_type="insert|upsert|delete"} milvus_proxy_mutation_send_latency_bucket\{message_op_type="produce"} </code></pre></td>
     <td><p>影响数据写入操作，包含insert, upsert, delete</p></td>
     <td><p>Y</p></td>
     <td><p>1s</p></td>
   </tr>
   <tr>
     <td><p>Proxy 任务排队时间</p></td>
     <td><pre><code class="json language-json"> milvus_proxy_req_in_queue_latency_bucket </code></pre></td>
     <td><p>影响各种rpc 操作，proxy是按照task 来处理各种rpc</p></td>
     <td><p>Y</p></td>
     <td><p>200ms</p></td>
   </tr>
   <tr>
     <td><p>Channel cp lag</p></td>
     <td><pre><code class="json language-json"> milvus_datacoord_channel_checkpoint_unix_seconds</code></pre></td>
     <td><p>影响数据写入安全，之后太多可能会丢失数据</p></td>
     <td><p>Y</p></td>
     <td><p>当前时间减去metrics timestamp </p><p>3600</p></td>
   </tr>
   <tr>
     <td><p>限流请求</p></td>
     <td><pre><code class="json language-json"> milvus_proxy_rate_limit_req_count\{status="fail"}</code></pre></td>
     <td><p>因为限流导致的请求失败</p></td>
     <td></td>
     <td><p>根据业务场景决定是否开启限流</p></td>
   </tr>
   <tr>
     <td><p>禁写状态</p></td>
     <td><pre><code class="json language-json"> milvus_rootcoord_quota_states // collection level 禁写状态</code></pre></td>
     <td><p>因为禁写导致写入失败</p></td>
     <td></td>
     <td><p>根据业务场景决定是否开启禁写</p></td>
   </tr>
   <tr>
     <td><p>Querynode 延迟</p></td>
     <td><pre><code class="json language-json"> milvus_querynode_sq_req_latency_bucket // qn  request latency milvus_querynode_sq_queue_latency_bucket // qn request in queue milvus_querynode_sq_core_latency_bucket // qn segcore latency milvus_querynode_sq_wait_tsafe_latency_bucket // wait tsafe latency</code></pre></td>
     <td><p>具体了解qn 内部各个部分的延迟</p></td>
     <td></td>
     <td><p>根据业务需求设置延迟告警</p></td>
   </tr>
   <tr>
     <td><p>Data node 消费延迟</p></td>
     <td><pre><code class="json language-json"> milvus_datanode_consume_tt_lag_ms</code></pre></td>
     <td><p>容易造成tt lag, 触发禁写状态</p></td>
     <td><p>Y</p></td>
     <td><p>根据业务场景决定是否开启禁写</p></td>
   </tr>
   <tr>
     <td><p>Query Coordinator task</p></td>
     <td><pre><code class="json language-json"> milvus_querycoord_task_num // segment/channel task  milvus_querynode_stopping_balance_segment_num // 下线qn 上要迁移segment task 数量 (滚动升级重点关注) milvus_querynode_stopping_balance_channel_num // 下线qn 上要迁移channel task 数量( 滚动升级重点关注)</code></pre></td>
     <td><p>影响滚动更新进度</p></td>
     <td><p>N</p></td>
     <td></td>
   </tr>
</table>

### etcd 核心指标{#core-etcd-metrics}

<table>
   <tr>
     <th><p>指标分类</p></th>
     <th><p>指标名称</p></th>
     <th><p>影响面</p></th>
     <th><p>是否告警</p></th>
     <th><p>告警阈值</p></th>
   </tr>
   <tr>
     <td><p>Leader 检查</p></td>
     <td><pre><code class="json language-json"> etcd_server_has_leader</code></pre></td>
     <td><p>没有leader, etcd 没法正常提供写入和线性度服务</p></td>
     <td><p>Y</p></td>
     <td><p>&lt; 1</p></td>
   </tr>
   <tr>
     <td><p>磁盘sync延迟</p></td>
     <td><pre><code class="json language-json"> etcd_disk_wal_fsync_duration_seconds_bucket // wal fsync latency etcd_disk_backend_commit_duration_seconds_bucket // db fsync latency</code></pre></td>
     <td><p>Etcd db data 和wal 都需要fsync, 磁盘的延迟对于性能以及集群稳定性有决定性影响</p></td>
     <td><p>Y</p></td>
     <td><p>200ms</p></td>
   </tr>
   <tr>
     <td><ol><li>Failed RPC</li></ol></td>
     <td><pre><code class="json language-json"> grpc_server_handled_total\{grpc_type="unary",grpc_code!="OK"}</code></pre></td>
     <td><p>请求失败的RPC</p></td>
     <td></td>
     <td><p>根据需要决定是否开启</p></td>
   </tr>
</table>

### Pulsar 核心指标{#core-pulsar-metrics}

<table>
   <tr>
     <th><p>指标分类</p></th>
     <th><p>指标名称</p></th>
     <th><p>影响面</p></th>
     <th><p>是否告警</p></th>
     <th><p>告警阈值</p></th>
   </tr>
   <tr>
     <td><p>基础计数</p></td>
     <td><pre><code class="json language-json"> pulsar_topics_count pulsar_producers_count pulsar_subscriptions_count pulsar_consumers_count</code></pre></td>
     <td><p>了解整个集群基本状态</p></td>
     <td><p>N</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Backlog Size</p></td>
     <td><pre><code class="json language-json"> pulsar_msg_backlog</code></pre></td>
     <td><p>默认milvus 设置对于topic 的backlog 是8G, 超过写入失败</p></td>
     <td><p>Y</p></td>
     <td><p>6G</p></td>
   </tr>
   <tr>
     <td><p>生产和消费延迟bookie</p></td>
     <td><pre><code class="json language-json"> bookkeeper_server_ADD_ENTRY_REQUEST\{quantile="0.99"} bookkeeper_server_ADD_ENTRY_REQUEST\{quantile="0.5"} bookkeeper_server_READ_ENTRY_REQUEST\{quantile="0.99"} bookkeeper_server_READ_ENTRY_REQUEST\{quantile="0.5"}</code></pre></td>
     <td><p>关注bookie 写入延迟(add_entry), 以及消费数据读回延迟</p></td>
     <td><p>Y</p></td>
     <td><p>1s</p></td>
   </tr>
</table>

## Grafana 模板{#grafana-templates}

<table>
   <tr>
     <th><p>指标</p></th>
     <th><p>Grafana 模板</p></th>
   </tr>
   <tr>
     <td><p>Milvus 集群指标</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>etcd 指标</p></td>
     <td></td>
   </tr>
   <tr>
     <td colspan="2"><p>Pulsar 指标</p></td>
   </tr>
   <tr>
     <td><p>JVM-related 指标</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Broker-related 指标</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>BookKeeper-related 指标</p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Messaging-related 指标</p></td>
     <td></td>
   </tr>
</table>

