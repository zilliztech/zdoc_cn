---
title: "FAQ：Collection | CLOUD"
slug: /faq-collection
sidebar_label: "FAQ：Collection"
beta: FALSE
notebook: FALSE
description: " | CLOUD"
type: origin
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 3

---

# FAQ：Collection

本文列举了在使用 Zilliz Cloud Collection 时可能遇到的常见问题及对应解决方法。

## 目录

- [1 个集群中最多可创建多少个 Collection？](#how-many-collections-are-allowed-in-a-single-cluster)
- [如何确认我的 Collection 是否开启了动态 Schema？](#how-can-i-know-if-dynamic-schema-is-enabled-for-my-collection)
- [如果创建 Collection 时未开启动态 Schema，Collection 创建成功后是否还能开启动态 Schema？](#if-dynamic-schema-was-disabled-when-the-collection-was-created-can-i-enable-it-later)
- [Zilliz Cloud 支持哪些相似度类型？](#what-are-the-indexing-metric-types-supported-by-zilliz-cloud)
- [Collection 加载为何失败，如何解决？](#why-do-i-fail-to-load-collections-what-can-i-do)
- [Collection 加载请求的并发是多少？如何增加并发请求的数量？](#what-is-the-concurrency-for-collection-loading-requests-how-can-i-increase-the-number-of-concurrent-requests)
- [如何为创建的 Collection 设置存留时间（TTL）属性？](#how-to-set-the-ttl-time-to-live-property-of-a-created-collection)
- [1 个 Collection 中最多可以添加多少个字段？](#is-there-any-limit-to-the-number-of-fields-i-can-add-in-a-collection)

## 问答




### 1 个集群中最多可创建多少个 Collection？ \{#how-many-collections-are-allowed-in-a-single-cluster}

集群可创建的 Collection 数量受集群的类型和 CU 数量影响：

<table>
   <tr>
     <th><p><strong>类型</strong></p></th>
     <th><p><strong>最大数量</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>Free 版集群</p></td>
     <td><p>5</p></td>
     <td><p>在 Free 版集群中，最多可创建 5 个 Collection。</p></td>
   </tr>
   <tr>
     <td><p>Serverless 版集群</p></td>
     <td><p>100</p></td>
     <td><p>在 Serverless 版集群中，最多可创建 100 个 Collection。</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群</p></td>
     <td><p>每 CU：&lt;= 64</p><p>每集群：&lt;= 4096</p></td>
     <td><p>在 Dedicated 版集群中，每个计算单元（CU）可创建最多 64 个 Collection，并且集群中的 Collection 总数不能超过 4096。</p></td>
   </tr>
</table>

更多详情，请参加[使用限制](./limits#collections)。

如达到集群可创建 Collection 数量上限，请尝试以下方法：

1. 为集群[扩容](./manage-cluster)。

1. [删除](./drop-collection)未使用的 Collection。

1. [使用 Partition Key](./use-partition-key) 创建 Partition。

### 如何确认我的 Collection 是否开启了动态 Schema？ \{#how-can-i-know-if-dynamic-schema-is-enabled-for-my-collection}

您可以前往 Zilliz Cloud 界面查看 Collection 是否开启动态 Schema。操作步骤为：

1. 选择你想查看的 Collection。

1. 点击 Schema 标签页。

1. 在页面右上角查看动态 Schema 是否已开启。

更多详情，请阅读 [Dynamic Field](./enable-dynamic-field)。

![faq_dynamic_schema_enable](/img/faq_dynamic_schema_enable.png)

### 如果创建 Collection 时未开启动态 Schema，Collection 创建成功后是否还能开启动态 Schema？ \{#if-dynamic-schema-was-disabled-when-the-collection-was-created-can-i-enable-it-later}

不能。在创建 Collection 时一旦确认开启或者关闭动态 Schema，Collection 创建成功后不可以修改动态 Schema 状态。更多详情，请阅读 [Dynamic Field](./enable-dynamic-field)。

### Zilliz Cloud 支持哪些相似度类型？ \{#what-are-the-indexing-metric-types-supported-by-zilliz-cloud}

Zilliz Cloud支持以下几种相似度类型。

1. 欧氏距离（Euclidean / L2）计算两条向量间的欧式距离。计算结果越小，两个向量越相似。

1. 内积（Inner Product / IP）将两条向量相乘。计算结果为正数，两个向量越相似。

1. 余弦距离（Cosine）计算计算两个向量之间的余弦夹角大小。计算结果在 [-1, 1] 的区间内，结果越大，向量越相似。

1. 杰卡德距离（Jaccard）衡量 2 个集合差异性的指标，是 Jaccard 相似系数（similarity coefficient）的补集，被定义为 1 减去 Jaccard 相似系数。

1. 汉明距离（Hamming）测量两个字符串对应位置的不同字符的个数。

更多详情，请参考[相似度类型](./search-metrics-explained)。

### Collection 加载为何失败，如何解决？ \{#why-do-i-fail-to-load-collections-what-can-i-do}

Collection 加载失败由集群内存不足引起。我们建议您扩展集群 CU 大小。

### Collection 加载请求的并发是多少？如何增加并发请求的数量？ \{#what-is-the-concurrency-for-collection-loading-requests-how-can-i-increase-the-number-of-concurrent-requests}

当前，Zilliz Cloud 加载 Collection 请求的速率限制为每秒 1 个。该建议数值仅针对 1 CU 的集群。如需增加并发请求的数量，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

### 如何为创建的 Collection 设置存留时间（TTL）属性？ \{#how-to-set-the-ttl-time-to-live-property-of-a-created-collection}

您可以使用我们的PyMilvus SDK通过提供参数collection.ttl.seconds的值来设置集合的TTL。

以下示例将TTL设置为1800秒。

```python
collection.set_properties(properties={"collection.ttl.seconds": 1800})
```

### 1 个 Collection 中最多可以添加多少个字段？ \{#is-there-any-limit-to-the-number-of-fields-i-can-add-in-a-collection}

1 个 Collection 中最多可以添加 64 个字段。
