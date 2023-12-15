---
slug: /other-differences
beta: FALSE
notebook: FALSE
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 其他异同

本文将介绍 Zilliz Cloud 和 Milvus 在数据类型、索引类型等方面的差异。

如果您计划从 Milvus 迁移到 Zilliz Cloud，可能需要对历史代码进行一些必要的修改。

## 数据类型{#data-type}

Zilliz Cloud 几乎完全兼容 Milvus 的所有数据类型，包括 JSON。但是，目前 BinaryVector 还不可用。

有关 JSON 的更多信息，请参见 [JSON](./javascript-object-notation-json)。

## 索引类型{#index-type}

Zilliz Cloud 提供 **AUTOINDEX** 作为索引类型，免去在 Milvus 中进行索引选型时的复杂性。有关更多信息，请参见 [AUTOINDEX](./autoindex-explained)。

## Zilliz Cloud 控制台{#web-console}

在控制台上创建 Collection 时，Zilliz Cloud 会自动为向量字段创建索引并将 Collection 加载到计算单元（CU）中，以方便您的使用。

有关 CU 的更多信息，请参见[选择合适的 CU 类型](./cu-types-explained) 。

## 相关文档{#related-topics}

- [AUTOINDEX](./autoindex-explained)

- [选择合适的 CU 类型](./cu-types-explained) 

- [API 异同](./api-comparison)
