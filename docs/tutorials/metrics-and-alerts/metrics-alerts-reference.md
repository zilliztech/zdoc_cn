---
slug: /metrics-alerts-reference
beta: FALSE
notebook: FALSE
type: origin
token: Rca8w6kRRiy7a9kr6adczTcGnoh
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 指标与告警快速参考

在本手册中，您可以快速找到 Zilliz Cloud 集群监控指标的相关描述，并了解组织和项目级别的告警项。

## 集群指标{#cluster-metrics}

Zilliz Cloud 控制台中的**指标**页签展示了各类集群指标图表。

下表描述了各指标的具体含义以及当您的集群资源使用超过阈值时建议执行的操作。

<table>
   <tr>
     <th>指标名称</th>
     <th>单位</th>
     <th>描述</th>
     <th>推荐操作</th>
   </tr>
   <tr>
     <td><strong>资源</strong></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td>CU 计算资源<br/></td>
     <td>%</td>
     <td>相对于 CU 总计算能力的已使用计算能力的度量。</td>
     <td></td>
   </tr>
   <tr>
     <td>CU 加载容量</td>
     <td>%</td>
     <td>相对于 CU 总容量的已使用容量的度量。</td>
     <td></td>
   </tr>
   <tr>
     <td>存储用量</td>
     <td>GB</td>
     <td>数据和索引消耗的持久存储总量。<br/></td>
     <td><a href="./manage-project-alerts">配置监控告警</a>，以了解存储用量情况。</td>
   </tr>
   <tr>
     <td><strong>性能</strong></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td>读请求 QPS/VPS<br/></td>
     <td>QPS/VPS</td>
     <td><strong>QPS</strong>：每秒读取请求（search 和 query）的数量。<br/> <strong>VPS</strong>：每秒向量读取请求的数量。VPS 不适用于 query 请求，因为 query 操作不涉及向量。</td>
     <td>有关系统性能监控，请参阅<a href="https://zilliz.com.cn/vector-database-benchmark-tool?database=ZillizCloud,Milvus,PgVector,ElasticCloud,Pinecone,QdrantCloud,WeaviateCloud&dataset=medium&filter=none,low,high">向量数据库性能测试工具</a>。</td>
   </tr>
   <tr>
     <td>写请求 QPS/VPS</td>
     <td>QPS/VPS</td>
     <td><strong>QPS</strong>：每秒写入请求（insert、bulk insert、upsert 和 delete）的数量。<br/> <strong>VPS</strong>：每秒向量写入请求（insert、bulk insert、upsert 和 delete）的数量。</td>
     <td>有关系统性能监控，请参阅<a href="https://zilliz.com.cn/vector-database-benchmark-tool?database=ZillizCloud,Milvus,PgVector,ElasticCloud,Pinecone,QdrantCloud,WeaviateCloud&dataset=medium&filter=none,low,high">向量数据库性能测试工具</a>。</td>
   </tr>
   <tr>
     <td>读请求延时（Latency）</td>
     <td>ms</td>
     <td>从发起读请求（Search 和 Query 请求）到返回结果的耗时的平均值或 P99 值。</td>
     <td>-</td>
   </tr>
   <tr>
     <td>写请求延时（Latency）</td>
     <td>ms</td>
     <td>从发起写请求（数据 Insert 和 Upsert 请求）到返回结果的耗时的平均值或 P99 值。</td>
     <td>-</td>
   </tr>
   <tr>
     <td>读请求失败率</td>
     <td>%</td>
     <td>超时读请求（search 和 query）在每秒所有读请求中所占的百分比。</td>
     <td><a href="./manage-project-alerts">配置告警</a>以监控读请求失败率。</td>
   </tr>
   <tr>
     <td>写请求失败率</td>
     <td>%</td>
     <td>超时写请求（insert、bulk insert、upsert 和 delete）在每秒所有写请求中所占的百分比。</td>
     <td><a href="./manage-project-alerts">配置告警</a>以监控写请求失败率。</td>
   </tr>
   <tr>
     <td><strong>数据</strong></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td>Collection 数量</td>
     <td>count</td>
     <td>集群中已创建的 Collection 数量。</td>
     <td>-</td>
   </tr>
   <tr>
     <td>Entity 数量</td>
     <td>count</td>
     <td>集群中已插入的 Entity 总数。<br/></td>
     <td>-</td>
   </tr>
   <tr>
     <td>已加载 Entity 数量</td>
     <td>count</td>
     <td>集群中已加载的 Entity 数量。</td>
     <td>-</td>
   </tr>
</table>

## 组织告警{#organization-alerts}

组织告警用于提醒您账单相关的重要信息，如信用卡到期提醒、免费额度使用情况、现金余额警示以及用量金额相关的告警通知。

<table>
   <tr>
     <th>告警项</th>
     <th>单位</th>
     <th>描述</th>
     <th>推荐操作</th>
     <th>默认告警条件</th>
   </tr>
   <tr>
     <td>免费额度</td>
     <td>￥<br/></td>
     <td>跟踪免费额度的余额，当额度低时提醒用户及时充值。</td>
     <td>充值以维持账户功能。</td>
     <td>免费额度余额小于 ¥10 时触发<strong>警告</strong>告警。<br/></td>
   </tr>
   <tr>
     <td>免费额度有效期</td>
     <td>天</td>
     <td>监控免费额度的剩余有效期，鼓励用户使用或延期。</td>
     <td>延长有效期或在额度过期前使用。</td>
     <td>免费额度有效期小于 0 天时触发<strong>警告</strong>告警。</td>
   </tr>
   <tr>
     <td>现金余额</td>
     <td>¥</td>
     <td>监控预付款余额，当余额低时提醒用户以防服务中断。</td>
     <td>为预付款余额增加资金以避免服务中断。</td>
     <td>现金余额小于 ¥100 时触发<strong>紧急</strong>告警。</td>
   </tr>
   <tr>
     <td>用量金额</td>
     <td>¥</td>
     <td>跟踪使用金额，当超过设定阈值时通知用户，建议监控和管理。</td>
     <td>监控和管理使用以保持在预算限额内。</td>
     <td>用量金额大于 ¥100 时触发<strong>警告</strong>告警。<br/></td>
   </tr>
</table>

## 项目告警{#project-alerts}

项目告警主要关注您集群的性能方面，包括 CU 使用情况、QPS 阈值、延时问题以及请求异常等，确保您能够维持最佳的集群性能。

### 默认告警项{#default-alert-targets}

Zilliz Cloud 提供预定义的默认告警项，以帮助您快速识别关键问题并采取适当的解决方案。

如需了解集群资源使用超过阈值时建议执行的操作，请参阅[集群指标](./metrics-alerts-reference#cluster-metrics)。

<table>
   <tr>
     <th>告警项</th>
     <th>单位</th>
     <th>默认告警条件</th>
   </tr>
   <tr>
     <td>CU 计算资源<br/></td>
     <td>%</td>
     <td></td>
   </tr>
   <tr>
     <td>CU 加载容量</td>
     <td>%</td>
     <td></td>
   </tr>
   <tr>
     <td>Search（QPS）</td>
     <td>QPS</td>
     <td>Search 类型请求数大于 50 QPS 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</td>
   </tr>
   <tr>
     <td>Query（QPS）</td>
     <td>QPS</td>
     <td>Query 类型请求数大于 50 QPS 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</td>
   </tr>
   <tr>
     <td>Search 延时（P99）</td>
     <td>ms</td>
     <td>Search 类型 P99 请求延时大于 1000 ms 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</td>
   </tr>
   <tr>
     <td>Query 延时（P99）<br/></td>
     <td>ms</td>
     <td>Query 类型 P99 请求延时大于 1000 ms 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</td>
   </tr>
</table>

### 自定义告警项{#custom-alert-targets}

除了预定义的默认项目告警项之外，您还可以根据需要配置自定义的告警项。

<table>
   <tr>
     <th>告警项</th>
     <th>描述</th>
   </tr>
   <tr>
     <td><strong>资源</strong></td>
     <td></td>
   </tr>
   <tr>
     <td>存储容量</td>
     <td>监控存储用量，并在用量超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td><strong>性能（读与写请求）</strong></td>
     <td></td>
   </tr>
   <tr>
     <td>Insert（VPS）</td>
     <td>监控向量 Insert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Insert (QPS）<br/></td>
     <td>监控 Insert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Upsert（VPS）</td>
     <td>监控向量 Upsert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Bulk Insert（QPS）</td>
     <td>监控批量 Insert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Search（QPS）</td>
     <td>监控 Search 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Delete (QPS）<br/></td>
     <td>监控删除操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Query（QPS）</td>
     <td>监控 Query 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Search (VPS）<br/></td>
     <td>监控向量 Search 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Upsert (QPS）<br/></td>
     <td>监控 Upsert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td><strong>性能（延时）</strong></td>
     <td></td>
   </tr>
   <tr>
     <td>Query 延时（平均）</td>
     <td>监控 Query 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Upsert 延时（P99）<br/></td>
     <td>监控 Upsert 请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Upsert 延时（平均）</td>
     <td>监控 Upsert 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Insert 延时（P99）<br/></td>
     <td>监控 Insert 请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Insert 延时（平均）</td>
     <td>监控 Insert 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Delete 延时（平均）</td>
     <td>监控删除请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Delete 延时（P99）</td>
     <td>监控删除请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Search 延时（P99）</td>
     <td>监控 Search 请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Search 延时（平均）</td>
     <td>监控 Search 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td><strong>性能（请求失败率）</strong></td>
     <td></td>
   </tr>
   <tr>
     <td>Search 请求失败率<br/></td>
     <td>监控 Search 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Query 请求失败率</td>
     <td>监控 Query 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Upsert 请求失败率</td>
     <td>监控 Upsert 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Insert 请求失败率<br/></td>
     <td>监控 Insert 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Bulk Insert 请求失败率</td>
     <td>监控批量 Insert 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Delete 请求失败率</td>
     <td>监控删除请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td><strong>数据</strong></td>
     <td></td>
   </tr>
   <tr>
     <td>已加载 Entity 数量</td>
     <td>监控已加载的 Entity 数量，并在数量超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Entity 数量</td>
     <td>监控已插入的 Entity 总数，并在数量超过一定时间段的阈值后发送通知。</td>
   </tr>
   <tr>
     <td>Collection 数量<br/></td>
     <td>监控已创建的 Collection 数量，并在数量超过一定时间段的阈值后发送通知。</td>
   </tr>
</table>

## 文档推荐{#related-topics}

- [查看集群性能指标](./view-cluster-metric-charts)

- [管理组织告警](./manage-organization-alerts)

- [管理项目告警](./manage-project-alerts)

