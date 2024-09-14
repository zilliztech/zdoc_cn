---
title: "Reranking | Cloud"
slug: /reranking
sidebar_label: "Reranking"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 通过 hybridsearch() API，实现了 hybrid search 功能，结合了复杂的 reranking 策略，以优化多个 `AnnSearchRequest` 对象的搜索结果。本文将详细介绍 reranking 机制，阐述其重要性以及在 Milvus 中实施不同 reranking 策略的方法。 | Cloud"
type: origin
token: TzePwbkScic5e9kCF0FcljQEngc
sidebar_position: 8
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking

---

import Admonition from '@theme/Admonition';


# Reranking

Zilliz Cloud 通过 [hybrid_search()](/reference/python/python/Collection-hybrid_search) API，实现了 hybrid search 功能，结合了复杂的 reranking 策略，以优化多个 `AnnSearchRequest` 对象的搜索结果。本文将详细介绍 reranking 机制，阐述其重要性以及在 Milvus 中实施不同 reranking 策略的方法。

## 概述{#overview}

下图展示了 Zilliz Cloud 中 hybrid search 的执行过程，并突出了 reranking 在该过程中的作用。

![VVQEbaTKko6NlHxAl61cpiObnvf](/img/VVQEbaTKko6NlHxAl61cpiObnvf.png)

Reranking 是 hybrid search 中的一个关键步骤，它整合了基于多个向量字段的检索结果，确保最终输出结果的相关性和准确性。目前，Zilliz Cloud 支持以下 reranking 策略：

- `WeightedRanker`：该方法通过计算基于不同向量字段搜索的得分（或向量距离）的加权平均来合并结果。它根据每个向量字段的重要性分配权重。

- `RRFRanker`：此策略根据不同向量列的排名来组合结果。

## WeightedRanker{#weighted-scoring-weightedranker}

WeightedRanker 分数加权平均算法的核心思想是对多个召回路的输出结果的分数进行加权平均计算，以得到一个综合的结果，其中不同召回路的贡献可由预设的权重来决定。例如，在多模态搜索中，文本描述可能被认为比图像中的颜色分布更重要。

WeightedRanker 的基本步骤如下：

1. **召回阶段收集分数**：收集来自不同路召回的结果及其分数。

1. **分数归一化**：将各路的分数做归一化，使其值落在 [0,1] 之间，越接近 1 代表越相关。这是由于不同 Metric Type 的 Score 分布范围是不一样的，譬如 IP 的 distance 是 [-∞,+∞]，而 L2 的 distance 是 [0,+∞]。Milvus 在这里通过 arctan 函数做归一化，最终通过数学变换将取值范围控制在 [0,1] 之间，为不同 metric type 相互关联建立基础。

![W7vEbCRcdoWwqix3Y5YcY6t6nxe](/img/W7vEbCRcdoWwqix3Y5YcY6t6nxe.png)

1. **权重分配**：为每一路分配一个权重 w𝑖，这些权重根据数据源的可靠性、准确性或其他相关指标来确定，由用户指定，各路权重的取值范围也在 [0,1] 之间。

1. **分数融合**：采用加权平均的方式对归一化后的 Score 进行计算，获得最终得分，根据分值结果由大到小生成最终的排序结果。

![Jp1WbnUjIoLLDQxpBAcc3Gx5nYb](/img/Jp1WbnUjIoLLDQxpBAcc3Gx5nYb.png)

要使用此策略，创建一个 `WeightedRanker` 实例并传入多个数值参数来设置权重值。

```python
from pymilvus import WeightedRanker

# Use WeightedRanker to combine results with specified weights
rerank = WeightedRanker(0.8, 0.8, 0.7) 
```

注意：

- 每个权重值的范围从 0（最不重要）到 1（最重要），影响最终的聚合得分。

- 在 `WeightedRanker` 中提供的权重值个数应等于之前创建的 `AnnSearchRequest` 实例数量。

- 由于不同度量类型的差异，我们将召回结果的距离标准化到 [0,1] 区间，其中 0 表示不同，1 表示相似。最终得分是权重值和距离的总和。

## RRFRanker{#reciprocal-rank-fusion-rrfranker}

RRF（Ranked Retrieval Fusion，排序检索融合）是一种常见的检索融合算法，此方法侧重于使用排名信息，将每个系统的排名结果加权并合并，以提高整体检索的相关性和效果。当希望对所有向量字段给予平等考虑，或当字段的相对重要性不确定时，通常采用此策略。

RRF 的基本步骤如下：

1. **召回阶段收集排名**：多个检索器（各路召回）对其查询分别生成排序结果。

1. **排名融合**：使用简单的评分函数（如倒数和）将各检索器的排名位置加权融合，公式如下：

    ![YVXabsOBMo9PbmxNyWVc74UdnHh](/img/YVXabsOBMo9PbmxNyWVc74UdnHh.png)

    其中，𝑁 代表不同检索路线的数量，𝑟𝑎𝑛𝑘𝑖(𝑑) 是第 𝑖 个检索器检索到的文档 𝑑 的排名位置，𝑘 是平滑参数，通常设置为 60。

1. **综合排序**：根据融合后的评分对文档重新排序，生成最终结果。

要使用此策略，创建一个 `RRFRanker` 实例。

```python
from pymilvus import RRFRanker

# Default k value is 60
ranker = RRFRanker()

# Or specify k value
ranker = RRFRanker(k=100)
```

RRF 允许在不指定明确权重的情况下平衡各字段的影响。多个字段的一致最佳匹配将在最终排名中优先考虑。