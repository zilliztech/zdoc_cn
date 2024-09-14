---
title: "选择合适的 CU 类型 | Cloud"
slug: /cu-types-explained
sidebar_label: "选择合适的 CU 类型"
beta: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，为集群选择合适的计算单元（CU）是一个关键步骤。CU 提供了并行数据处理的基础计算资源，不同类型的 CU 结合了各异的 CPU、内存和存储配置。 | Cloud"
type: origin
token: DP6Fw8vkzi7pD7kAMB3cjunYn6g
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - cu 类型

---

import Admonition from '@theme/Admonition';


# 选择合适的 CU 类型

在 Zilliz Cloud 中，为集群选择合适的计算单元（CU）是一个关键步骤。CU 提供了并行数据处理的基础计算资源，不同类型的 CU 结合了各异的 CPU、内存和存储配置。

## 了解 CU 类型{#understand-cu-types}

Zilliz Cloud 提供以下 CU 类型：性能型 CU、容量型 CU。

<table>
   <tr>
     <th><p>CU 类型</p></th>
     <th><p>时延</p></th>
     <th><p>吞吐能力</p></th>
     <th><p>存储容量</p></th>
   </tr>
   <tr>
     <td><p>性能型</p></td>
     <td><p>低</p></td>
     <td><p>高</p></td>
     <td><p>低</p></td>
   </tr>
   <tr>
     <td><p>容量型</p></td>
     <td><p>中</p></td>
     <td><p>中</p></td>
     <td><p>高</p></td>
   </tr>
</table>

### 性能型 CU{#performance-optimized-cu}

- 专门为需要低时延和高吞吐的场景设计。

- 特别适用于实时应用场景，如生成型 AI、推荐系统、对话机器人等。

### 容量型 CU{#capacity-optimized-cu}

- 设计用于处理大量数据集，数据容量是性能型的五倍，但搜索效率相对较低。

- 特别适合大规模的非结构化数据检索、版权识别和身份验证。

## 选择最优的 CU 类型{#select-an-optimal-cu-type}

在选定 CU 类型时，应综合考虑数据体量、性能要求和预算因素。向量数据的大小，包括向量数量和维度，是决定集群资源配置的关键。

### 容量评估{#assess-capacity}

以下表格根据向量维度和总向量数，展示了各种 CU 类型的处理容量。

<table>
   <tr>
     <th><p>向量维度</p></th>
     <th><p>性能型 CU（每单元最大向量数）</p></th>
     <th><p>容量型 CU（每单元最大向量数）</p></th>
   </tr>
   <tr>
     <td><p>128</p></td>
     <td><p>750 万</p></td>
     <td><p>2500 万</p></td>
   </tr>
   <tr>
     <td><p>256</p></td>
     <td><p>450 万</p></td>
     <td><p>1500 万</p></td>
   </tr>
   <tr>
     <td><p>512</p></td>
     <td><p>225 万</p></td>
     <td><p>750 万</p></td>
   </tr>
   <tr>
     <td><p>768</p></td>
     <td><p>150 万</p></td>
     <td><p>500 万</p></td>
   </tr>
   <tr>
     <td><p>1024</p></td>
     <td><p>112.5 万</p></td>
     <td><p>375 万</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>上面的数据基于仅考虑主键和向量的测试。如果您的数据集包含其他标量字段（如 id、标签、关键词），实际的容量可能会有所不同。因此，建议进行个性化测试以获得更精确的评估。</p>

</Admonition>

### 性能评估{#evaluate-performance}

性能指标，尤其是时延和每秒查询数（QPS），非常关键。性能型 CU 在时延和吞吐量方面显著超越其他类型，特别是在标准的 top-k 值（10 至 250）范围内。

下表显示了每种 CU 类型在 QPS 方面的测试结果。

<table>
   <tr>
     <th><p>top_k 值</p></th>
     <th><p>性能型 CU 的 QPS（768 维度，100万向量）</p></th>
     <th><p>容量型 CU 的 QPS（768 维度，500 万向量）</p></th>
   </tr>
   <tr>
     <td><p>10</p></td>
     <td><p>520</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p>100</p></td>
     <td><p>440</p></td>
     <td><p>80</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>270</p></td>
     <td><p>60</p></td>
   </tr>
   <tr>
     <td><p>1000</p></td>
     <td><p>150</p></td>
     <td><p>40</p></td>
   </tr>
</table>

下表显示了每种 CU 类型在时延方面的测试结果。

<table>
   <tr>
     <th><p>top_k</p></th>
     <th><p>性能型 CU 的时延（768 维度，100万向量）</p></th>
     <th><p>容量型 CU 的时延（768 维度，500 万向量）</p></th>
   </tr>
   <tr>
     <td><p>10</p></td>
     <td><p>&lt; 10 ms</p></td>
     <td><p>&lt; 50 ms</p></td>
   </tr>
   <tr>
     <td><p>100</p></td>
     <td><p>&lt; 10 ms</p></td>
     <td><p>&lt; 50 ms</p></td>
   </tr>
   <tr>
     <td><p>250</p></td>
     <td><p>&lt; 10 ms</p></td>
     <td><p>&lt; 50 ms</p></td>
   </tr>
   <tr>
     <td><p>1000</p></td>
     <td><p>10 - 20 ms</p></td>
     <td><p>50 - 100 ms</p></td>
   </tr>
</table>

## 场景分析{#scenario-breakdown}

设想您正在开发一个含有 800 万张图片的图像推荐应用程序。图库中的每张图像均由一个 768 维 Embedding 向量代表。您的目标是能迅速处理每秒 1000 次的推荐请求，并在 30 毫秒内返回前 100 张推荐图片。

为了选出符合此需求的适宜 CU，请按以下步骤操作：

1. **时延评估**：性能型 CU 是唯一能满足 30 毫秒时延需求的类型。

1. **容量考量**：单个性能型 CU 能处理 150 万个 768 维向量。为容纳全部 800 万向量，您需配置至少 6 个此类 CU。

1. **吞吐量检验**：在 top-k 设置为100的情况下，性能型 CU 的每秒查询量（QPS）为 440。为维持 1000 QPS 的持续性能，需要将副本数量增加 3 倍。
综上所述，针对这一应用场景，选择性能型 CU 是最合适的。建议配置 3 套副本，每套包含 6 个 CU，以确保应用运行的完美性能。

## 相关文档{#related-topics}

- [Zilliz Cloud 版本类型](./select-zilliz-cloud-service-plans)

- [价格计算器](./pricing-calculator)

