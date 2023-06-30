---
sidebar_position: 3
---

# 向量索引概览与 IVF 索引

在之前的教程中，我们简单介绍了单词的 Embedding 示例，更好地理解了 Embedding 的强大，以及在向量数据库中如何进行向量存储和索引。此外，我们也简单介绍了最近邻搜索算法，这个问题涉及根据所选距离度量找到距离查询向量最接近的向量。

然后，我们还简要地讨论了几个主要的向量搜索方法。向量搜索是向量数据库的重要组成部分，它与计算密切有关；向量数据库是非常复杂的，涉及许多移动组件和抽象层。

在本教程中，我们将分析现代索引器的组成部分，然后再介绍两种最简单和最基本的索引策略——平面索引和倒置文件（IVF）索引。这两种索引类型，对我们之后的几个教程是至关重要的。

## Milvus **中的向量索引**

Milvus 使用 [Facebook AI Similarity Search（FAISS）](https://github.com/facebookresearch/faiss)作为关键的索引构建库之一，除此之外还使用了 [Hnswlib](https://github.com/nmslib/hnswlib) 和[Annoy](https://github.com/spotify/annoy)。正如前面的教程中提到的，Milvus 是在这些库的基础上，提供一个完整的数据库，具有所有常见的数据库功能和一致的用户级 API。

如果你已经熟悉了 FAISS，那么你对接下来几个教程要介绍的一些概念可能就不会太陌生。

## **索引概览**

广义上说，目前有四种不同类型的向量搜索算法：

- 哈希索引（位置敏感型）

- 树索引（如 ANNOY）

- 聚类索引（如乘积量化）

- 图形索引（如 HNSW）

不同类型的算法对不同类型的向量数据有更好的效果，但所有这些算法都有助于加快向量搜索过程，不过可能会牺牲一些准确性。

向量搜索中容易被忽视的一个重要细节是将许多向量搜索算法结合在一起的能力。向量数据库中，一个完整的向量索引通常由三个不同的部分组成：

1. （可选）索引前减少或优化向量

1. （必选）选择索引的核心算法

1. （可选）对向量进行量化或哈希计算以进一步提高搜索速度

让我们把这些问题一点点地分解。

第一步只是为索引和搜索准备向量，而没有实际建立任何数据结构。这里使用的算法通常取决于应用和上游的向量生成方法，但一些常用的算法包括二级归一化、降维和零填充。大多数向量数据库跳过这一步，将预处理工作完全留给应用层的用户来完成。

初级算法是唯一的必要组成部分，构成了索引的核心。这一步的输出应该是一个数据结构，它包含高效向量搜索所需的所有信息。这里通常使用基于树和基于图的数据结构，但量化算法，如乘积量化或位置敏感的哈希也可以实现。

第二步是通过将数据集中的所有浮点值映射为较低精度的整数值，即 **float64** -> **int8** 或 **float32** -> **int8**，以减少索引的总大小。这种方式既可以减少索引的大小，也可以提高搜索速度，但通常会牺牲一些精度。有几种不同的方法可以做到这一点，我们会在未来的教程中进一步讨论量化和哈希问题。

## 平面索引

在深入研究更复杂的向量搜索算法之前，我们有必要简单了解一下线性搜索，也被称为平面索引。

平面索引大体上是最基本的索引策略，但也可以说是最容易被忽视的。通过平面索引，我们将一个查询向量与数据库中的其他所有向量进行比较。代码示例如下：

```python
>>> query = np.random.normal(size=(128,))
>>> dataset = np.random.normal(size=(1000, 128))
>>> nearest = np.argmin(np.linalg.norm(dataset - query, axis=1))
>>> nearest
333
```

注意，索引只是一个扁平的数据结构，其大小正好是数据集的大小，不多也不少。

前两行代码在 1000 个元素的向量数据集之外创建了一个随机的查询向量。第三行是计算数据集中所有元素与查询向量之间的距离（**np.linalg.norm**），然后提取最小距离的索引（**np.argmin**）。这就给了我们与查询向量最近的邻居的数组索引，然后我们可以使用 **dataset[nearest,:]** 来提取。

这显然是执行向量搜索的最简单粗暴的方式，对于小数据集来说，它的效果出奇的好，特别是如果你有一个加速器，如 GPU 或 FPGA 来并行处理搜索请求。例如，上面的循环在英特尔 i7-9750H CPU 上的运行时间不到 0.5 毫秒，这意味着我们可以在一个六核的笔记本上通过平面索引实现超过 2000 的 QPS。

向量数量为 1 万时， QPS 会下降到 160 左右；为 10 万时，下降到 16。从 1000 个向量到 1 万个向量的 > 10 倍系数下降可能是由于 CPU 缓存大小的限制。不过这些结果还是很不错的。对于所有运行时的复杂性和横向扩展的问题，记住适用于小型应用和原型设计的 [KISS 原则](https://zh.wikipedia.org/wiki/KISS%E5%8E%9F%E5%88%99)，简约即真理。

## IVF

平面索引很不错，但它无法扩展。这就是向量搜索的数据结构发挥作用的地方。通过牺牲准确性来换取更好的运行时间，我们可以显著提高查询速度和吞吐量。现在有很多索引策略，但其中最常用的是倒置文件索引（IVF）。

抛开花哨的名字，IVF 实际上是相当简单的。IVF 通过将整个数据集按分区排列以减少整个搜索范围。所有分区都与一个中心点相关联，数据集中的每个向量都被分配到与其最近的中心点对应的分区。

![DBYybxvbMoyqJAxD3oicIsfwnng](/img/DBYybxvbMoyqJAxD3oicIsfwnng.png)

如果熟悉 [FAISS](https://github.com/facebookresearch/faiss)，你可能对上图不会陌生。这是 Voronoi 图，直观地从两个维度展示了聚类分配。总共有 20 个单元（聚类），每个聚类的中心点显示为一个黑点。数据集中的所有点都将落入这 20 个区域中的一个。

聚类中心点通常用一种叫做 K-means 的聚类算法来确定。K-means 是一种交互式算法，其工作原理是首先随机选择 K 个点作为一组聚类。在每次迭代中，向量数据集中的所有点都被分配到其最近的中心点，然后所有中心点被更新为每个单元的平均值。这个过程一直持续到所有点聚合——对于熟悉统计学的人来说，这个过程被称为期望最大化。

有了这些知识，让我们用 K-means 来自动确定 IVF 的中心点。我们将使用 **scipy** 的 **kmeans2** 来实现：

```python
>>> import numpy as np
>>> from scipy.cluster.vq import kmeans2
>>> num_part = 16  # number of IVF partitions
>>> dataset = np.random.normal(size=(1000, 128))
>>> (centroids, assignments) = kmeans2(dataset, num_part, iter=32)
>>> centroids.shape
(16, 128)
>>> indexes.shape
(1000,)
```

**centroids** 现在包含了我们数据集的所有 **num_part**（在 FAISS 中，这个参数被称为 **nlist**）中心点，而 **assignments** 包含了与每个向量最接近的中心点的 ID。我们可以通过以下方式来验证这一点：

```python
>>> test = [np.argmin(np.linalg.norm(vec - centroids, axis=1)) for vec in dataset]
>>> np.all(test == assignments)
True
```

我们现在需要通过将每个中心点与聚类的向量列表相关联来创建倒置索引：

```python
>>> index = [[] for _ in range(num_part)]
>>> for n, k in enumerate(assignments):
...     index[k].append(n)  # 将第 n 个向量添加到第 k 个聚类
...
```

上面的代码首先创建了一个列表，最外层对应的是 IVF 分区的数量。然后 for 循环迭代出所有的值，即每个向量属于哪个分区，并填充索引。

有了索引，我们现在可以通过只搜索最近的单元来限制整个搜索空间：

```python
>>> query = np.random.normal(size=(128,))
>>> c = np.argmin(np.linalg.norm(centroids - query, axis=1))  # find the nearest partition
>>> nearest = np.argmin(np.linalg.norm(dataset[index[c]] - query, axis=1))  # find nearest neighbor
>>> nearest
333
```

当 **num_part** 为16，数据集大小为 100K 的情况下，我们使用与之前相同的硬件（英特尔 i7-9750H CPU）得到了大约 150 QPS。将 **num_part** 提高到 64，我们得到了高达 650 QPS。

注意，将我们的搜索范围扩大到最近的聚类之外是可行的，特别是对高维数据来说（对熟悉 FAISS 的人来说，这里对应于创建 IVF 索引时的 **nprobe** 参数）。和二维或三维之类的数据相比，这主要是受维度的影响，每个分区的边的数量明显增多。至于如何设置 **nprobe**，目前还没有一个好的经验法则。可以先用你的数据进行实验，看看速度与准确性/召回的权衡，是比较有效的。

这就是关于 IVF 的全部。还可以吧？

## 总结

在本教程中，我们看了向量索引的三个单独组成部分，以及两种最常用的方法——平面索引和倒置文件索引。这是两种最基本的策略，我们后面会以此为基础再进一步深入研究更复杂的索引类型。

下一个教程中，我们将继续深入研究标量量化和乘积量化的索引策略，这是 Milvus 受欢迎的两种量化策略。我们下次见！

本教程的所有代码可在 GitHub 上免费获取：[https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search)。

## 相关文档

- [什么是非结构化数据？](https://zilliverse.feishu.cn/wiki/VQahwGgRFiBoIikc07CcrwT6nRh)

- [什么是向量数据库？](https://zilliverse.feishu.cn/wiki/BodywFcPyi7ml6kGuUOcfj0Pnjg)

- [什么是向量相似性搜索？](https://zilliverse.feishu.cn/wiki/MGttwQkrFiwR5HkkokAcXp8inph)

- [标量量化与乘积量化](https://zilliverse.feishu.cn/wiki/If7NwjuzkiLMtZkks3eczCBQnOe)

- [HNSW](https://zilliverse.feishu.cn/wiki/LmbYwqEJQinfLMkkKr5cZxjZnFb)
