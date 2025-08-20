---
title: "Reranking | Cloud"
slug: /reranking
sidebar_label: "Reranking"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud Hybrid Search 功能通过多路搜索单路召回实现更精准的搜索结果。多路搜索会返回多组结果，因此需要通过 Reranking 对多组搜索结果进行重新排序，最终合并成一组结果，实现单路召回。本节将介绍 Zilliz Cloud 中支持的 Reranking 策略并指导您挑选合适的 Reranking 策略。 | Cloud"
type: origin
token: COnowAdgTi2KA0kI6gncFG5rnbf
sidebar_position: 19
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - weighted reranker
  - reciprocal reranking fusion
  - rrf

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reranking

Zilliz Cloud Hybrid Search 功能通过多路搜索单路召回实现更精准的搜索结果。多路搜索会返回多组结果，因此需要通过 Reranking 对多组搜索结果进行重新排序，最终合并成一组结果，实现单路召回。本节将介绍 Zilliz Cloud 中支持的 Reranking 策略并指导您挑选合适的 Reranking 策略。

## 概述{#overview}

本小节将展示 Zilliz Cloud Hybrid Search 的主要流程。下图以双路搜索为例，一路基于文本进行基本 ANN 搜索，另一路基于图片进行基本 ANN 搜索。每一路搜索都会根据各自内部搜索的相似性 Score 对搜索结果排序，返回出一组搜索结果。两路搜索共返回两组结果 Limit 1 和 Limit 2。随后，采用 Reranking 策略，对两组结果的 Score 基于统一的标准进行折算和重新排序，将两组搜索结果合并，返回出一组最终的搜索结果 Limit（final）。

![JbUEbwe3UolIL1xU57bcoi1VnMh](/img/JbUEbwe3UolIL1xU57bcoi1VnMh.png)

在 Hybrid Search 中，Reranking 是一个关键步骤，能够整合多路向量搜索的结果，确保最终输出相关性最高的准确结果。目前，Zilliz Cloud 支持以下几种 Reranking 策略：

- **[WeightedRanker](./reranking#weightedranker)**: 通过计算不同向量搜索得分（score）或距离（distance）的加权平均值来合并结果。这种策略会根据每个向量字段的重要性分配权重。

- **[RRFRanker](./reranking#rrfranker)**: 基于排名来组合结果。

## WeightedRanker{#weightedranker}

WeightedRanker 策略根据每一路搜索的重要性，对每一路搜索的结果分配不同的权重。

### 实现机制{#mechanism-of-weightedranker}

WeightedRanker 策略的的重排基本流程如下：

1. **收集搜索得分**: 收集每一路搜索的结果和得分 （score_1、score_2）。

1. **得分归一化:** 每一路搜索可能使用不同的相似度类型，因此每一路搜索返回的结果 score 分布会有所不同。例如：使用 IP 作为相似度类型时，搜索结果的 score 范围在 &#91;-∞,+∞&#93;；使用 L2 作为相似度类型时，搜索结果的 score 范围在 &#91;0,+∞&#93;。由于两路搜索结果的 score 范围不同，无法直接进行排序，因此需要对每一路搜索的得分进行归一化，通过 `arctan` 函数转换范为围在 &#91;0,1&#93; 之间的得分（score_1_normalized、score_1_normalized）。转换后的得分值越接近 1， 表示对应搜索结果的相似性更高。

1. **分配权重**: 根据对不同列的侧重，为归一化后的得分（score_1_normalized、score_1_normalized）分配权重 **wi**。每一路的权重的范围在 &#91;0,1&#93; 之间。最终获得两组加权后的得分（score_1_weighted、score_2_weighted）。

1. **融合得分**: 根据加权后的得分（score_1_weighted、score_2_weighted）从高到低进行排名，得出一组最终得分（score_final）。

![WhzIwdR13h1Bvbbpu66cFtadn3o](/img/WhzIwdR13h1Bvbbpu66cFtadn3o.png)

### 示例{#example-of-weightedranker}

本示例以图像和文本的多模态 Hybrid Search (topK=5)为例，展示了 Hybrid Search 过程中，WeightedRanker 策略如何对两路 ANN Search 结果进行重排。

- 图像 ANN 搜索结果 （topK=5)：

<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (图像)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.8</p></td>
   </tr>
</table>

- 文本 ANN 搜索结果（topK=5)：

<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (文本)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.91</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.87</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>0.85</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.82</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>0.78</p></td>
   </tr>
</table>

- 使用 Weighted Reranker 对两组搜索结果归一化、分配权重。假设图像 ANN 搜索权重为 0.6，文本搜索权重为 0.4。

<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (图像)</strong></p></th>
     <th><p><strong>Score (文本)</strong></p></th>
     <th><p><strong>最终加权后的 Score</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>0.92</p></td>
     <td><p>0.87</p></td>
     <td><p>0.6×0.92+0.4×0.87=0.90</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>0.88</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.88+0.4×0=0.528</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>0.85</p></td>
     <td><p>N/A</p></td>
     <td><p>0.6×0.85+0.4×0=0.51</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>0.83</p></td>
     <td><p>0.91</p></td>
     <td><p>0.6×0.83+0.4×0.91=0.86</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>0.80</p></td>
     <td><p>0.82</p></td>
     <td><p>0.6×0.80+0.4×0.82=0.81</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>Not in Image</p></td>
     <td><p>0.85</p></td>
     <td><p>0.6×0+0.4×0.85=0.34</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>Not in Image</p></td>
     <td><p>0.78</p></td>
     <td><p>0.6×0+0.4×0.78=0.312</p></td>
   </tr>
</table>

- 对分配权重的搜索结果进行重排后的最终结果（topK=5)：

<table>
   <tr>
     <th><p><strong>排名</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>最终 Score</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.90</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>198</p></td>
     <td><p>0.86</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>175</p></td>
     <td><p>0.81</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>203</p></td>
     <td><p>0.528</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>150</p></td>
     <td><p>0.51</p></td>
   </tr>
</table>

### 用法{#usage-of-weightedranker}

使用 WeightedRanker 策略时，需要在 `WeightedRanker` 中传入权重值。Hybrid search 中有几路搜索，就需要传入几个数值。传入的数值应当在 &#91;0,1&#93; 之间。权重值越接近 1 表示越重要。

假设 Hybrid Search 中有两路搜索：文本搜索和图片搜索。其中第一路文本搜索更为重要，需要分配更多的权重。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import WeightedRanker

rerank= WeightedRanker(0.8, 0.3) 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.ranker.WeightedRanker;

WeightedRanker rerank = new WeightedRanker(Arrays.asList(0.8f, 0.3f))
```

</TabItem>

<TabItem value='javascript'>

```javascript
rerank: WeightedRanker(0.8, 0.3)
```

</TabItem>

<TabItem value='bash'>

```bash
export rerank='{
        "strategy": "ws",
        "params": {"weights": [0.8,0.3]}
    }'
```

</TabItem>
</Tabs>

## RRFRanker{#rrfranker}

RRF（Reciprocal Rank Fusion） 是一种数据融合方法，它基于排名的互反值来组合排名列表。这种重排策略能够有效平衡每一路向量搜索的重要性。

### 实现机制{#mechanism-of-rrfranker}

RRF 策略的的重排基本流程如下：

1. **收集搜索排名**: 收集每一路搜索的结果排名 （rank_1、rank_2）。

1. **融合排名**：根据公式折算每一路的排名 (rank_rrf_1、rank_rrf_2)。

    计算公式中，*N* 表示不同检索路径的数量，*ranki*(*d*) 是第 *i* 个检索器检索的文档 *d* 的排名位置，*k* 是平滑参数，通常设置为 60。

1. **综合排名**: 根据组合得分重新对检索结果进行排名，以产生最终结果。

![Vc2ZwgeHnhrPh7bjPd5cLBwSnvh](/img/Vc2ZwgeHnhrPh7bjPd5cLBwSnvh.png)

### 示例{#example-of-rrfranker}

本示例以文本稀疏-稠密向量的 Hybrid Search (topK=5) 为例，展示了 Hybrid Search 过程中，RRFRanker如何对两路 ANN Search 结果进行重排。

- 稀疏文本向量 ANN 搜索结果 （topK=5)：

<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rank (稀疏)</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
   </tr>
</table>

- 稠密文本向量 ANN 搜索结果（topK=5)：

<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Rank (稠密)</strong></p></th>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>1</p></td>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>2</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>3</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>4</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>5</p></td>
   </tr>
</table>

- 使用 RRF 对两组搜索结果排名进行折算。假设 RRF Reranking 的参数设置为 `k=60`。

<table>
   <tr>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>Score (稀疏)</strong></p></th>
     <th><p><strong>Score (稠密)</strong></p></th>
     <th><p><strong>最终 Score</strong></p></th>
   </tr>
   <tr>
     <td><p>101</p></td>
     <td><p>1</p></td>
     <td><p>2</p></td>
     <td><p>1/(60+1)+1/(60+2) = 0.01639</p></td>
   </tr>
   <tr>
     <td><p>198</p></td>
     <td><p>4</p></td>
     <td><p>1</p></td>
     <td><p>1/(60+4)+1/(60+1) = 0.01593</p></td>
   </tr>
   <tr>
     <td><p>175</p></td>
     <td><p>5</p></td>
     <td><p>4</p></td>
     <td><p>1/(60+5)+1/(60+4) = 0.01554</p></td>
   </tr>
   <tr>
     <td><p>203</p></td>
     <td><p>2</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+2) = 0.01613</p></td>
   </tr>
   <tr>
     <td><p>150</p></td>
     <td><p>3</p></td>
     <td><p>N/A</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>110</p></td>
     <td><p>N/A</p></td>
     <td><p>3</p></td>
     <td><p>1/(60+3) = 0.01587</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>N/A</p></td>
     <td><p>5</p></td>
     <td><p>1/(60+5) = 0.01554</p></td>
   </tr>
</table>

- 对搜索结果进行重排后的最终结果（topK=5)：

<table>
   <tr>
     <th><p><strong>排名</strong></p></th>
     <th><p><strong>ID</strong></p></th>
     <th><p><strong>最终 Score</strong></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>101</p></td>
     <td><p>0.01639</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>203</p></td>
     <td><p>0.01613</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>198</p></td>
     <td><p>0.01593</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>150</p></td>
     <td><p>0.01587</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>110</p></td>
     <td><p>0.01587</p></td>
   </tr>
</table>

### 用法{#usage-of-rrfranker}

使用 RRF 策略时，需要在 `RRFRanker` 中传入参数值 `k`。`k` 是平滑参数，可以有效地改变全文搜索和向量搜索的相对重要性权重。该参数的默认值为 `60`，可调参数值为(0, 16384) 之间的浮点数，建议设置在 &#91;10, 100&#93;。虽然 `k=60` 是较为常用的选择，但最佳的 k 值因具体应用和数据特性而有所差异。我们建议根据您的实际情况测试并调整该参数值以获取最佳性能。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import RRFRanker

ranker = RRFRanker(100)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.ranker.RRFRanker;

RRFRanker ranker = new RRFRanker(100);
```

</TabItem>

<TabItem value='javascript'>

```javascript
rerank: RRFRanker("100")
```

</TabItem>

<TabItem value='bash'>

```bash
"rerank": {
    "strategy": "rrf",
    "params": {
        "k": 100
    }
}
export rerank='{
        "strategy": "rrf",
        "params": {"k": 100}
    }'
```

</TabItem>
</Tabs>

## 选择合适的 Reranking 策略{#select-the right-reranking-strategy}

选择 Reranking 策略时，需要考虑是否对多路搜索中的某一或某几路搜索有所侧重。

如果希望结果能够更侧重某个向量字段，推荐使用 **WeightedRanker**。因为 **WeightedRanker** 允许您通过分配更高的权重来强调某些向量字段。例如，在多模态搜索中，文本描述可能被认为比图像中的颜色分布更重要。

如果没有明确的侧重时，推荐使用 **RFF**。因为 **RRF** 能够有效平衡每一路向量搜索的重要性。