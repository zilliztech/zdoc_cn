---
slug: /faq-monitors-and-metrics
beta: null
notebook: null
token: YVAzwqHdti7uHSkZL6icsY7hnpe
sidebar_position: 9
---

# FAQ：监控与指标

本文列举了在 Zilliz Cloud 使用监控与指标时可能遇到的常见问题及对应解决方法。

## 目录

- [集群内容达到上限后，无法插入数据。如何解决这个问题？](#what-can-i-do-if-my-cluster-memory-quota-has-been-exhausted-and-i-cannot-insert-data-as-a-result)
- [为什么删除 Collection 后，内存用量依旧保持不变？](#why-doesnt-the-memory-consumption-decrease-even-if-i-dropped-a-collection)

## 问答




### 集群内容达到上限后，无法插入数据。如何解决这个问题？{#what-can-i-do-if-my-cluster-memory-quota-has-been-exhausted-and-i-cannot-insert-data-as-a-result}

请尝试以下 2 种方法：

1. 为您的集群扩容，选择更大的 CU 大小。集群 CU 大小越大，集群可以处理的数据越多。

1. 释放一些已加载但不常用的 Collection。这能够帮助您节省内存用量。

### 为什么删除 Collection 后，内存用量依旧保持不变？{#why-doesnt-the-memory-consumption-decrease-even-if-i-dropped-a-collection}

删除的 Collection 数据将于 24 小时后被彻底清理。如果内存用量在 24 小时后仍未下降，请[提交工单](https://support.zilliz.com.cn/hc/zh-cn)。
