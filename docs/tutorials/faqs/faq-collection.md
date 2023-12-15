---
slug: /faq-collection
beta: null
notebook: null
sidebar_position: 3
---

# FAQ：Collection

**1 个集群中最多可创建多少个 Collection？{#how-many-collections-are-allowed-in-a-single-cluster}**

## Contents

- [1 个集群中最多可创建多少个 Collection？](#how-many-collections-are-allowed-in-a-single-cluster)
- [如何确认我的 Collection 是否开启了动态 Schema？](#how-can-i-know-if-dynamic-schema-is-enabled-for-my-collection)
- [如果创建 Collection 时未开启动态 Schema，Collection 创建成功后是否还能开启动态 Schema？](#if-dynamic-schema-was-disabled-when-the-collection-was-created-can-i-enable-it-later)
- [Zilliz Cloud 支持哪些相似度类型？](#what-are-the-indexing-metric-types-supported-by-zilliz-cloud)
- [Collection 加载为何失败，如何解决？](#why-do-i-fail-to-load-collections-what-can-i-do)
- [Collection 加载请求的并发是多少？如何增加并发请求的数量？](#what-is-the-concurrency-for-collection-loading-requests-how-can-i-increase-the-number-of-concurrent-requests)
- [如何为创建的 Collection 设置存留时间（TTL）属性？](#how-to-set-the-ttl-time-to-live-property-of-a-created-collection)
- [1 个 Collection 中最多可以添加多少个字段？](#is-there-any-limit-to-the-number-of-fields-i-can-add-in-a-collection)

## 常见问题


### 1 个集群中最多可创建多少个 Collection？{#how-many-collections-are-allowed-in-a-single-cluster}

1 个集群中可创建的 Collection 数量取决于集群的 CU 大小。1 CU 的集群中可最多创建 32 个 Collection。

### 如何确认我的 Collection 是否开启了动态 Schema？{#how-can-i-know-if-dynamic-schema-is-enabled-for-my-collection}

您可以前往 Zilliz Cloud 界面查看 Collection 是否开启动态 Schema。操作步骤为：

1. 选择你想查看的 Collection。

1. 点击 Schema 标签页。

1. 在页面右上角查看动态 Schema 是否已开启。

更多详情，请阅读 [开启动态 Schema](./enable-dynamic-schema)。

![faq_dynamic_schema_enable](/img/faq_dynamic_schema_enable.png)

### 如果创建 Collection 时未开启动态 Schema，Collection 创建成功后是否还能开启动态 Schema？{#if-dynamic-schema-was-disabled-when-the-collection-was-created-can-i-enable-it-later}

不能。在创建 Collection 时一旦确认开启或者关闭动态 Schema，Collection 创建成功后不可以修改动态 Schema 状态。更多详情，请阅读 [开启动态 Schema](./enable-dynamic-schema)

### Zilliz Cloud 支持哪些相似度类型？{#what-are-the-indexing-metric-types-supported-by-zilliz-cloud}

Zilliz Cloud支持 2 种相似度类型。

1. 欧氏距离（Euclidean / L2）计算两条向量间的欧式距离。计算结果越小，两个向量越相似。

1. 内积（Inner Product / IP）将两条向量相乘。计算结果为正数，两个向量越相似。

### Collection 加载为何失败，如何解决？{#why-do-i-fail-to-load-collections-what-can-i-do}

Collection 加载失败由集群内存不足引起。我们建议您扩展集群 CU 大小。

### Collection 加载请求的并发是多少？如何增加并发请求的数量？{#what-is-the-concurrency-for-collection-loading-requests-how-can-i-increase-the-number-of-concurrent-requests}

当前，Zilliz Cloud 加载 Collection 请求的速率限制为每秒 1 个。该建议数值仅针对 1 CU 的集群。如需增加并发请求的数量，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。

### 如何为创建的 Collection 设置存留时间（TTL）属性？{#how-to-set-the-ttl-time-to-live-property-of-a-created-collection}

您可以使用我们的PyMilvus SDK通过提供参数collection.ttl.seconds的值来设置集合的TTL。

以下示例将TTL设置为1800秒。

```python
collection.set_properties(properties={"collection.ttl.seconds": 1800})
```

### 1 个 Collection 中最多可以添加多少个字段？{#is-there-any-limit-to-the-number-of-fields-i-can-add-in-a-collection}

1 个 Collection 中最多可以添加 64 个字段。
