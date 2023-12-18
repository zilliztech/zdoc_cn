---
slug: /search-metrics-explained
beta: TRUE
notebook: FALSE
token: Tpi2wvNHLiHaJmk4Y8BcwG84neh
sidebar_position: 5
---

import Admonition from '@theme/Admonition';


# 相似性度量

在度量向量相似性时，相似性指标发挥着关键作用。选择恰当的度量指标可以极大地提升分类与聚类的效果。

目前，Zilliz Cloud 提供三种主流的相似性指标：欧氏距离（L2）、内积（IP）和余弦相似度（COSINE）。

## 欧氏距离（L2）{#euclidean-distance-l2}{#l2euclidean-distance-l2}

欧氏距离主要是用来计算连接两点的线段的实际长度。

其计算公式如下：

![HhIdbxRd7oGoDrxCGh6cBIX9ncf](/img/HhIdbxRd7oGoDrxCGh6cBIX9ncf.png)

其中，**a = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** 和 **b = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)** 表示 *n* 维欧氏空间中的两个点。

L2 是最普遍的距离度量方法，在处理连续性数据时尤为有效。

<Admonition type="info" icon="📘" title="说明">

在选择 L2 作为度量标准时，Zilliz Cloud 仅计算平方根之前的数值。

</Admonition>

## 内积（IP）{#inner-product-ip}{#ipinner-product-ip}

两个 Embedding 向量间的 IP 距离可按以下方式定义：

![LXkCbWG6IoCXSux5uc9cZn28nnc](/img/LXkCbWG6IoCXSux5uc9cZn28nnc.png)

当处理非规范化数据或关注数据的大小和方向时，内积尤为重要。

<Admonition type="info" icon="📘" title="说明">

使用 IP 计算 Embedding 向量间的相似度时，须先对 Embedding 向量进行规范化。之后，内积即可等同于余弦相似度。

</Admonition>

例如，Embedding 向量 X 规范化为 X'：

![HPuWbyMjnouhtWxFp8Hc0ArQnsd](/img/HPuWbyMjnouhtWxFp8Hc0ArQnsd.png)

两个 Embedding 向量间的关联度如下所示：

![Mf0dbFurloqyz7xUkhtcquMMnkc](/img/Mf0dbFurloqyz7xUkhtcquMMnkc.png)

## 余弦相似度（COSINE）{#cosine-similarity}{#cosinecosine-similarity}

余弦相似度是通过计算两组向量之间的夹角余弦来衡量它们的相似度。可以把这两组向量想象为从同一起点（如 [0,0,...]）出发，但朝向不同的线段。

计算两组向量 **A = (a<sub>0</sub>, a<sub>1</sub>,..., a<sub>n-1</sub>)** 和 **B = (b<sub>0</sub>, b<sub>1</sub>,..., b<sub>n-1</sub>)** 之间的余弦相似度，可使用以下公式：

![M6C6b2W8toduLSxfV6ac3ZcDnQh](/img/M6C6b2W8toduLSxfV6ac3ZcDnQh.png)

余弦相似度的值总是介于 **[-1, 1]** 之间。比如，成比例的两个向量余弦相似度为 **1**，垂直的两个向量相似度为 **0**，相反方向的两个向量相似度为 **-1**。余弦值越大，表示两向量之间的夹角越小，意味着它们越相似。

通过 **1** 减去两向量间的余弦相似度，可以得到它们之间的余弦距离。

<Admonition type="info" icon="📘" title="说明">

该指标目前还在测试阶段。升级您的集群至 Beta 版即可体验 COSINE 相似度指标。

</Admonition>

