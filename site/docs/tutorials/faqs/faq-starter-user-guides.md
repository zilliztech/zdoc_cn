---
slug: /faqs/starter-user-guides
sidebar_position: 0
---

# 快速入门

本文列举了快速上手 Zilliz Cloud 时可能遇到的常见问题及对应解决方法。

**1 个集群中最多可创建多少个 Collection？**

1 个集群中可创建的 Collection 数量取决于集群的 CU 大小。1 CU 的集群中可最多创建 32 个 Collection。

**免费试用结束后，我的数据是否会被删除？**

免费试用结束后，Zilliz Cloud 将自动备份您的数据并移至回收站，集群将被删除。回收站中的数据可免费保留30天。您可以通过 support@zilliz.com 联系我们以继续使用 Zilliz Cloud。

**如何查看订阅的 Zilliz Cloud 版本？**

如需查看版本，请先选择项目，再选择集群。在**集群详情**下，您可以查看订阅的版本。

![faq_plan_detail](/img/faq_plan_detail.png)

**如何确认我的 Collection 是否开启了动态 Schema？**

您可以前往 Zilliz Cloud 界面查看 Collection 是否开启动态 Schema。操作步骤为：

1. 选择你想查看的 Collection。

1. 点击 Schema 标签页。

1. 在页面右上角查看动态 Schema 是否已开启。

更多详情，请阅读 [开启动态 Schema](./enable-dynamic-schema)。

![faq_dynamic_schema_enable](/img/faq_dynamic_schema_enable.png)

**集群创建完成后，是否能够修改集群 CU 类型？**

不能。集群一旦创建完成，不可以修改其 CU 类型。如需修改集群 CU 类型，请使用以下替代方案。

1. 创建 1 个新集群。创建时选择你所需的 CU 类型。

1. 发送邮件至 [support@zilliz.com](mailto:support@zilliz.com) 联系我们将旧集群中的数据迁移至新集群中。请务必在邮件中注明源集群和目标集群的名称。

**如果创建 Collection 时未开启动态 Schema，Collection 创建成功后是否还能开启动态 Schema？**

不能。在创建 Collection 时一旦确认开启或者关闭动态 Schema，Collection 创建成功后不可以修改动态 Schema 状态。更多详情，请阅读 [开启动态 Schema](./enable-dynamic-schema)

**性能型 CU、容量型 CU 和经济型 CU 之间有什么区别？**

性能型 CU 适用于需要低延迟和高吞吐量的向量相似性检索场景。 容量型 CU 相比性能型 CU 能够存储多 5 倍的数据，但延迟可能会增加，因此适用于需要大量存储空间的场景。 经济型 CU 可支持的数据规模与容量型 CU 一致，但价格更低，性能略有下降，适用于追求高性价比或预算敏感的场景。

**我的数据需要使用多少 CU？**

单个性能型 CU 可容纳约 500 万个 128 维向量或 100 万个 768 维向量。

单个容量型 CU 可容纳约 2500 万个 128 维向量或 500 万个 768 维向量。

单个经济型 CU 可容纳约 2500 万个 128 维向量或 500 万个768 维向量。

由于您的 Collection Schema 可能与上述指南中的不同，我们建议您根据实际数据测试不同的 CU 类型。

**如何获取技术支持？**

如需技术支持，请发送邮件至 [support@zilliz.com](mailto:support@zilliz.com)。您将在 24 小时内收到回复。

**什么是计算单元（Compute Unit, CU）?**

计算单元（CU）是指用于提供向量检索、分析服务的一组硬件资源。可以将 CU 视为一个物理查询节点。

**Zilliz Cloud 支持哪些相似度类型？**

Zilliz Cloud支持 2 种相似度类型。

1. 欧氏距离（Euclidean / L2）计算两条向量间的欧式距离。计算结果越小，两个向量越相似。

1. 内积（Inner Product / IP）将两条向量相乘。计算结果为正数，两个向量越相似。

**集合加载为何失败，如何解决？**

集合加载失败由集群内存不足引起。我们建议您扩展集群 CU 大小。

**集合加载请求的并发是多少？如何增加并发请求的数量？**

当前，Zilliz Cloud 加载集合请求的速率限制为每秒 1 个。该建议数值仅针对 1 CU 的集群。如需增加并发请求的数量，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

**如何为集群缩容？**

如果您需要缩小集群 CU 大小，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。我们将在 8 小时以内为您的集群缩容。

**如何为创建的 Collection 设置存留时间（TTL）属性？**

您可以使用我们的PyMilvus SDK通过提供参数collection.ttl.seconds的值来设置集合的TTL。

以下示例将TTL设置为1800秒。

```python
collection.set_properties(properties={"collection.ttl.seconds": 1800})
```

**Zilliz Cloud 支持哪些索引类型？**

目前，Zilliz Cloud 仅支持 AUTOINDEX。AUTOINDEX 可以增强搜索性能。对于具有 100 万 768维向量的性能型集群，QPS 可达到几百，延迟低于 100 毫秒。对于相同数据量的容量型集群，QPS 可达到50，延迟超过 200 毫秒。有关更多详细信息，请参见[AUTOINDEX](./autoindex-explained) 。

如果您十分熟悉[此处](https://milvus.io/docs/index.md)罗列的索引类型并想要使用这些索引类型，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。

**Zilliz Cloud 搜索延迟是多少？**

通常，具有 500 万 768 维向量的容量型集群，其搜索延迟约为 100 毫秒。相同数据量和维数的性能型集群，搜索延迟约为 20 毫秒。但请注意，实际搜索延迟可能因您的工作负载和部署环境而有所不同。

**1 个 Collection 中最多可以添加多少个字段？**

1 个 Collection 中最多可以添加 64 个字段。

**Zilliz Cloud 如何处理不活跃集群？**

Zilliz Cloud 会自动挂起 7 天内不活跃集群，并发送邮件通知。您可随时按需恢复集群。
