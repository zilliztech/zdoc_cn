---
slug: /faqs-monitors-metrics
sidebar_position: 4
---

# 监控与指标

本文列举了 Zilliz Cloud 监控与指标相关的常见问题及对应解决方法。

**集群内容达到上限后，无法插入数据。如何解决这个问题？**

请尝试以下 2 种方法：

1. 为您的集群扩容，选择更大的 CU 大小。集群 CU 大小越大，集群可以处理的数据越多。

1. 释放一些已加载但不常用的 Collection。这能够帮助您节省内存用量。

**为什么删除 Collection 后，内存用量依旧保持不变？**

删除的 Collection 数据将于 24 小时后被彻底清理。如果内存用量在 24 小时后仍未下降，请通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。
