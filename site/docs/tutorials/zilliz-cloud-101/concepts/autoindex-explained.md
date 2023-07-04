---
slug: /autoindex-explained
sidebar_position: 0
---

# AUTOINDEX

为满足用户不同需求，Zilliz Cloud 提供 3 种类型的集群 CU——性能型、容量型和经济型。但是，为不同类型 CU 集群中的 Collection 创建索引时，通常需要根据所选择的 CU 类型调整索引参数。为了方便您创建索引，免去调节参数的麻烦，Zilliz Cloud 使用 **AUTOINDEX** 的索引类型。

**AUTOINDEX** 是Zilliz Cloud 独有的索引类型，可以帮助您获取最佳搜索性能。当您在 Zilliz Cloud 上为 Collection 中的向量字段创建索引时，会自动应用 **AUTOINDEX** 索引。

## 创建索引和向量搜索 {#create-indexes-and-vector-searches}

创建索引是指将 Collection 中的 Entity 按照特定顺序进行排序，以提高搜索效率。

在 Zilliz Cloud 上为向量字段创建索引十分简单。您只需将索引类型设置为 `AUTOINDEX`，然后选择相似度类型即可。Zilliz Cloud 将自动为您选择最合适配置。因此，您只需要考虑相似度类型，选择如何测量向量间距离。

在 Milvus 和 Zilliz Cloud 上创建索引和向量搜索时的参数设置区别如下所示：

```plaintext
# 创建索引
# 在 Milvus 中创建索引
index_params = {
    # 还有另一种相似度类型（IP）可选
    "metric_type": "L2",
    # 还有其他 6 种索引类型可选
    "index_type": "IVF_FLAT",
    # 以下参数根据选择的索引类型会发生变化
    "params": {
        # 选择 IVF_FLAT 索引类型时所需的参数
        "nlist": 1024
    }
}

# 在 Zilliz Cloud 中创建索引
index_params = {
    # 请始终将以下参数值设置为 AUTOINDEX
    "index_type": "AUTOINDEX",
    # 还有另一种相似度类型（IP）可选
    "metric_type": "L2",
    # 以下参数值保持空白以确保 AUTOINDEX 能够正常运作
    "params": {}
}

# 向量搜索
# 在 Milvus 中搜索向量
search_params = {
    # 与构建索引时选择的相似度类型保持一致
    "metric_type": "L2",
    # 以下参数根据选择的索引类型会发生变化
    "params": {
        "nprobe": 10
    }
}

# 在 Zilliz Cloud 中搜索向量
search_params = {
    # 与构建索引时选择的相似度类型保持一致
    "metric_type": "L2"
}
```

## 总结 {#conclusion}

希望您能通过阅读本教程，了解什么是 **AUTOINDEX**，以及如何使用 **AUTOINDEX** 简化在 Zilliz Cloud 上创建索引和搜索向量的流程。选择 **AUTOINDEX** 后，您无需根据集群 CU 类型考虑选择何种索引类型。Zilliz Cloud 为自动为您选择最优的搜索和索引配置，帮助您节省时间和精力。如对 **AUTOINDEX** 有任何疑问，欢迎通过 [support@zilliz.com](mailto:support@zilliz.com) 联系我们。