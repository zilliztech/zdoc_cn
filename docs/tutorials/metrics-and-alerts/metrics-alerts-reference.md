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
     <th><p>指标名称</p></th>
     <th><p>单位</p></th>
     <th><p>描述</p></th>
     <th><p>推荐操作</p></th>
   </tr>
   <tr>
     <td><p><strong>资源</strong></p></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Read vCUs</p></td>
     <td><p>%</p></td>
     <td><p>Search 和 Query 操作消耗的 vCU 用量。</p><p>该指标仅适用于 Serverless 集群。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>Write vCUs</p></td>
     <td><p>%</p></td>
     <td><p>Insert、Delete 和 Upsert 操作消耗的 vCU 用量。</p><p>该指标仅适用于 Serverless 集群。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>CU 计算资源</p></td>
     <td><p>%</p></td>
     <td><p>相对于 CU 总计算能力的已使用计算能力的度量。</p></td>
     <td><p><strong>70%-80%</strong>：检查服务状态并准备<a href="./manage-cluster">扩容</a>。 </p><p><strong>> 90%</strong>：立即<a href="./manage-cluster">扩容</a>，以避免服务中断。</p></td>
   </tr>
   <tr>
     <td><p>CU 加载容量</p></td>
     <td><p>%</p></td>
     <td><p>相对于 CU 总容量的已使用容量的度量。</p></td>
     <td><p><strong>70%-80%</strong>：检查服务状态并准备<a href="./manage-cluster">扩容</a>。 </p><p><strong>> 90%</strong>：立即<a href="./manage-cluster">扩容</a>，以避免服务中断。</p><p><strong>100%</strong>：当 CU 加载容量达到 100% 时，您将无法向集群写入数据。请立即<a href="./manage-cluster">扩容</a>，以避免服务中断。</p></td>
   </tr>
   <tr>
     <td><p>存储用量</p></td>
     <td><p>GB</p></td>
     <td><p>数据和索引消耗的持久存储总量。</p></td>
     <td><p><a href="./manage-project-alerts">配置监控告警</a>，以了解存储用量情况。</p></td>
   </tr>
   <tr>
     <td><p><strong>性能</strong></p></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p>读请求 QPS/VPS</p></td>
     <td><p>QPS/VPS</p></td>
     <td><p><strong>QPS</strong>：每秒读取请求（search 和 query）的数量。</p><p><strong>VPS</strong>：每秒向量读取请求（search）的数量。VPS 不适用于 query 请求，因为 query 操作不涉及向量。</p></td>
     <td><p>有关系统性能监控，请参阅<a href="https://zilliz.com.cn/vector-database-benchmark-tool?database=ZillizCloud,Milvus,PgVector,ElasticCloud,Pinecone,QdrantCloud,WeaviateCloud&dataset=medium&filter=none,low,high">向量数据库性能测试工具</a>。</p></td>
   </tr>
   <tr>
     <td><p>写请求 QPS/VPS</p></td>
     <td><p>QPS/VPS</p></td>
     <td><p><strong>QPS</strong>：每秒写入请求（insert、bulk insert、upsert 和 delete）的数量。</p><p><strong>VPS</strong>：每秒向量写入请求（insert、upsert 和 delete）的数量。</p></td>
     <td><p>有关系统性能监控，请参阅<a href="https://zilliz.com.cn/vector-database-benchmark-tool?database=ZillizCloud,Milvus,PgVector,ElasticCloud,Pinecone,QdrantCloud,WeaviateCloud&dataset=medium&filter=none,low,high">向量数据库性能测试工具</a>。</p></td>
   </tr>
   <tr>
     <td><p>读请求延时（Latency）</p></td>
     <td><p>ms</p></td>
     <td><p>客户端向服务器发起读请求（search 和 query）到客户端收到响应之间的时间差。</p><p>在右侧扩展的下拉菜单中选择<strong>平均值</strong>或 <strong>P99</strong> 将显示对应的平均延时或 P99 延时。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>写请求延时（Latency）</p></td>
     <td><p>ms</p></td>
     <td><p>客户端向服务器发起写请求（insert、upsert 和 delete）到客户端收到响应之间的时间差。</p><p>在右侧扩展的下拉菜单中选择<strong>平均值</strong>或 <strong>P99</strong> 将显示对应的平均延时或 P99 延时。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>读请求失败率</p></td>
     <td><p>%</p></td>
     <td><p>失败读请求（search 和 query）在每秒所有读请求中所占的百分比。</p></td>
     <td><p><a href="./manage-project-alerts">配置告警</a>以监控读请求失败率。</p></td>
   </tr>
   <tr>
     <td><p>写请求失败率</p></td>
     <td><p>%</p></td>
     <td><p>失败写请求（insert、bulk insert、upsert 和 delete）在每秒所有写请求中所占的百分比。</p></td>
     <td><p><a href="./manage-project-alerts">配置告警</a>以监控写请求失败率。</p></td>
   </tr>
   <tr>
     <td><p>慢查询数量</p></td>
     <td><p>个</p></td>
     <td><p>统计慢查询数量，包括 search 和 query 请求数。默认情况下，查询延时超过 5 秒的查询被视为慢查询。</p><p>该指标仅对 BYOC 集群和 Dedicated 集群可见。有关更多集群类型信息，请参阅<a href="./select-zilliz-cloud-service-plans">Zilliz Cloud 版本类型</a>。</p></td>
     <td><p>通过适当调整集群配置，可以识别存在问题的查询并优化性能。</p></td>
   </tr>
   <tr>
     <td><p><strong>数据</strong></p></td>
     <td></td>
     <td></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Collection 数量</p></td>
     <td><p>count</p></td>
     <td><p>集群中已创建的 Collection 数量。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>Entity 数量</p></td>
     <td><p>count</p></td>
     <td><p>集群中已插入的 Entity 总数。</p><p>在右侧扩展的下拉菜单中选择指定的 collection，将显示该 collection 中已插入的 entity 数量。</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p>已加载 Entity 数量</p></td>
     <td><p>count</p></td>
     <td><p>集群中已加载的 Entity 数量。</p><p>在右侧扩展的下拉菜单中选择指定的 collection，将显示该 collection 中已加载的 entity 数量。</p><p>该指标仅对 BYOC 集群和企业版集群可见。有关更多集群类型信息，请参阅<a href="./select-zilliz-cloud-service-plans">Zilliz Cloud 版本类型</a>。</p></td>
     <td><p>-</p></td>
   </tr>
</table>

## 组织告警{#organization-alerts}

组织告警用于提醒您账单相关的重要信息，如信用卡到期提醒、免费额度使用情况、现金余额警示以及用量金额相关的告警通知。

<table>
   <tr>
     <th><p>告警项</p></th>
     <th><p>单位</p></th>
     <th><p>描述</p></th>
     <th><p>推荐操作</p></th>
     <th><p>默认告警条件</p></th>
   </tr>
   <tr>
     <td><p>免费额度</p></td>
     <td><p>￥</p></td>
     <td><p>跟踪免费额度的余额，当额度低时提醒用户及时充值。</p></td>
     <td><p>充值以维持账户功能。</p></td>
     <td><p>免费额度余额小于 ¥10 时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>免费额度有效期</p></td>
     <td><p>天</p></td>
     <td><p>监控免费额度的剩余有效期，鼓励用户使用或延期。</p></td>
     <td><p>延长有效期或在额度过期前使用。</p></td>
     <td><p>免费额度有效期小于 0 天时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>现金余额</p></td>
     <td><p>¥</p></td>
     <td><p>监控预付款余额，当余额低时提醒用户以防服务中断。</p></td>
     <td><p>为预付款余额增加资金以避免服务中断。</p></td>
     <td><p>现金余额小于 ¥100 时触发<strong>紧急</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>用量金额</p></td>
     <td><p>¥</p></td>
     <td><p>跟踪使用金额，当超过设定阈值时通知用户，建议监控和管理。</p></td>
     <td><p>监控和管理使用以保持在预算限额内。</p></td>
     <td><p>用量金额大于 ¥100 时触发<strong>警告</strong>告警。</p></td>
   </tr>
</table>

## 项目告警{#project-alerts}

项目告警主要关注您集群的性能方面，包括 CU 使用情况、QPS 阈值、延时问题以及请求异常等，确保您能够维持最佳的集群性能。

### 默认告警项{#default-alert-targets}

Zilliz Cloud 提供预定义的默认告警项，以帮助您快速识别关键问题并采取适当的解决方案。

如需了解集群资源使用超过阈值时建议执行的操作，请参阅[集群指标](./metrics-alerts-reference#cluster-metrics)。

<table>
   <tr>
     <th><p>告警项</p></th>
     <th><p>单位</p></th>
     <th><p>默认告警条件</p></th>
   </tr>
   <tr>
     <td><p>CU 计算资源</p></td>
     <td><p>%</p></td>
     <td><p><strong>警告</strong>：CU 计算资源用量大于 70% 且持续时间超过 10 分钟时触发告警。</p><p><strong>紧急</strong>：CU 计算资源用量大于 90% 且持续时间超过 10 分钟时触发告警。</p></td>
   </tr>
   <tr>
     <td><p>CU 加载容量</p></td>
     <td><p>%</p></td>
     <td><p><strong>警告</strong>：CU 加载容量大于 70% 且持续时间超过 10 分钟时触发告警。</p><p><strong>紧急</strong>：CU 加载容量大于 90% 且持续时间超过 10 分钟时触发告警。</p></td>
   </tr>
   <tr>
     <td><p>Search（QPS）</p></td>
     <td><p>QPS</p></td>
     <td><p>Search 类型请求数大于 50 QPS 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>Query（QPS）</p></td>
     <td><p>QPS</p></td>
     <td><p>Query 类型请求数大于 50 QPS 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>Search 延时（P99）</p></td>
     <td><p>ms</p></td>
     <td><p>Search 类型 P99 请求延时大于 1000 ms 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</p></td>
   </tr>
   <tr>
     <td><p>Query 延时（P99）</p></td>
     <td><p>ms</p></td>
     <td><p>Query 类型 P99 请求延时大于 1000 ms 且持续时间超过 10 分钟时触发<strong>警告</strong>告警。</p></td>
   </tr>
</table>

### 自定义告警项{#custom-alert-targets}

除了预定义的默认项目告警项之外，您还可以根据需要配置自定义的告警项。

<table>
   <tr>
     <th><p>告警项</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><strong>资源</strong></p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>存储容量</p></td>
     <td><p>监控存储用量，并在用量超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p><strong>性能（读与写请求）</strong></p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Insert（VPS）</p></td>
     <td><p>监控向量 Insert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Insert (QPS）</p></td>
     <td><p>监控 Insert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Upsert（VPS）</p></td>
     <td><p>监控向量 Upsert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Bulk Insert（QPS）</p></td>
     <td><p>监控批量 Insert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Search（QPS）</p></td>
     <td><p>监控 Search 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Delete (QPS）</p></td>
     <td><p>监控删除操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Query（QPS）</p></td>
     <td><p>监控 Query 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Search (VPS）</p></td>
     <td><p>监控向量 Search 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Upsert (QPS）</p></td>
     <td><p>监控 Upsert 操作的速率，并在速率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p><strong>性能（延时）</strong></p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Query 延时（平均）</p></td>
     <td><p>监控 Query 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Upsert 延时（P99）</p></td>
     <td><p>监控 Upsert 请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Upsert 延时（平均）</p></td>
     <td><p>监控 Upsert 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Insert 延时（P99）</p></td>
     <td><p>监控 Insert 请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Insert 延时（平均）</p></td>
     <td><p>监控 Insert 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Delete 延时（平均）</p></td>
     <td><p>监控删除请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Delete 延时（P99）</p></td>
     <td><p>监控删除请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Search 延时（P99）</p></td>
     <td><p>监控 Search 请求的 P99 延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Search 延时（平均）</p></td>
     <td><p>监控 Search 请求的平均延时，并在延时超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p><strong>性能（请求失败率）</strong></p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>Search 请求失败率</p></td>
     <td><p>监控 Search 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Query 请求失败率</p></td>
     <td><p>监控 Query 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Upsert 请求失败率</p></td>
     <td><p>监控 Upsert 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Insert 请求失败率</p></td>
     <td><p>监控 Insert 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Bulk Insert 请求失败率</p></td>
     <td><p>监控批量 Insert 请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Delete 请求失败率</p></td>
     <td><p>监控删除请求的失败率，并在失败率超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p><strong>数据</strong></p></td>
     <td></td>
   </tr>
   <tr>
     <td><p>已加载 Entity 数量</p></td>
     <td><p>监控已加载的 Entity 数量，并在数量超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Entity 数量</p></td>
     <td><p>监控已插入的 Entity 总数，并在数量超过一定时间段的阈值后发送通知。</p></td>
   </tr>
   <tr>
     <td><p>Collection 数量</p></td>
     <td><p>监控已创建的 Collection 数量，并在数量超过一定时间段的阈值后发送通知。</p></td>
   </tr>
</table>

## 文档推荐{#related-topics}

- [查看集群性能指标](./view-cluster-metric-charts)

- [管理组织告警](./manage-organization-alerts)

- [管理项目告警](./manage-project-alerts)

