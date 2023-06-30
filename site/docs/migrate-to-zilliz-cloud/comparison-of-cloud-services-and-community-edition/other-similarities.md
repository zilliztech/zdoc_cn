---
sidebar_position: 3
---

# 其他异同

本文将介绍 Zilliz Cloud 和 Milvus 在数据类型、索引类型等方面的差异。

如果您计划从 Milvus 迁移到 Zilliz Cloud，可能需要对历史代码进行一些必要的修改。

## 数据类型

Zilliz Cloud 几乎完全兼容 Milvus 的所有数据类型，包括 JSON。但是，BinaryVector 目前还不可用。

有关 JSON 的更多信息，请参见[JSON](https://zilliverse.feishu.cn/wiki/UXBjwVpKmirzg9kgWgmcLixwnIe)。

## 索引类型

Zilliz Cloud 提供 **AUTOINDEX** 作为索引类型，免去在 Milvus 中进行索引选型时的复杂性。有关更多信息，请参见[AUTOINDEX](https://zilliverse.feishu.cn/wiki/YUETwzDssiTUs9kCSn4cgUYLnrd)。

## Zilliz Cloud 控制台

在控制台上创建 Collection 时，Zilliz Cloud 会自动为向量字段创建索引并将 Collection 加载到计算单元（CU）中，以方便您的使用。

有关 CU 的更多信息，请参见[CU 类型](https://zilliverse.feishu.cn/wiki/MidcwEyVviG9Tgkc6fjcL1xtnLc)。

## 相关文档

- [AUTOINDEX](https://zilliverse.feishu.cn/wiki/YUETwzDssiTUs9kCSn4cgUYLnrd)

- [CU 类型](https://zilliverse.feishu.cn/wiki/MidcwEyVviG9Tgkc6fjcL1xtnLc)

- [API 异同](https://zilliverse.feishu.cn/wiki/KOD2wN5jDimhSOk1GshcUbn2nJe)
