---
slug: /introduction-to-vector-similarity-search
sidebar_position: 2
---

# 什么是向量相似性搜索？

欢迎回到向量数据库 101 系列教程。

之前的教程中，我们介绍了非结构化数据、向量数据库和 Milvus——全球最受欢迎的开源向量数据库。我们还简单介绍了 Embedding 的相关概念，它代表高维向量，可以用作非结构化数据的语义表示，彼此临近的的 Embedding 代表语义上是相似的。

本教程中，我们将在这些知识的基础上，通过单词 Embedding 的例子，看看语义相似的非结构化数据是如何相邻的，而不相似的非结构化数据是如何相互“远离”的。这属于近邻搜索的高层次概述，是一个计算问题，涉及到根据统一的距离度量来寻找与查询向量最接近的向量。我们将讨论一些主流的近邻搜索方法（包括我最喜欢的 ANNOY），以及常用的距离度量。

我们开始吧。

## 比较 Embedding {#compare-embedding}

我们来看下几个词的 Embedding 向量的示例。下面例子中，我们将使用 `**word2vec**`，它这是一个古老的模型，使用了基于 **skipgrams** 的训练方法。虽然 BERT 和其他基于转换器的现代模型将能够提供更多的语境化词汇 Embedding，但为了简单起见，我们还是使用 `**word2vec**`。如果您想了解更多信息，Jay Alammar 提供了一篇关于 `**word2vec**` 的[超酷的教程](https://jalammar.github.io/illustrated-word2vec/)。

### 准备工作 {#preparations}

开始前，我们需要安装 `**gensim**` 库。

```bash
pip install gensim --disable-pip-version-check
wget <https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz>
gunzip GoogleNews-vectors-negative300.bin
```

然后，按如下方式加载 `**word2vec**` 模型。

```python
from gensim.models import KeyedVectors
model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)
```

### 示例 0：Marlon Brando {#example-0-marlon-brando}

让我们看看 `**word2vec**` 如何将著名演员 Marlon Brando 转换为向量。

```python
print(model.most_similar(positive=['Marlon_Brando']))
```

其对应的向量表示如下：

```python
[('Brando', 0.757453978061676), ('Humphrey_Bogart', 0.6143958568572998), ('actor_Marlon_Brando', 0.6016287207603455), ('Al_Pacino', 0.5675410032272339), ('Elia_Kazan', 0.5594002604484558), ('Steve_McQueen', 0.5539456605911255), ('Marilyn_Monroe', 0.5512186884880066), ('Jack_Nicholson', 0.5440199375152588), ('Shelley_Winters', 0.5432392954826355), ('Apocalypse_Now', 0.5306933522224426)]
```

Marlon Brando 曾与 Al Pacino 一起出演《教父》，与 Elia Kazan 一起出演《欲望号街车》。他还主演了《现代启示录》。

### 示例 1：国王与**王后** {#example-1-the-king-and-the-queen}

向量可以相互加减，以演示潜在的语义变化。

```python
print(model.most_similar(positive=['king', 'woman'], negative=['man'], topn=1))
```

从下方输出可以看出，`queen`在语义上应该是`king`减去`men`的结果。

```python
[('queen', 0.7118193507194519)]
```

谁说工程师不能在闲暇时享受舞蹈和流行音乐呢？

### 示例 2：Apple，水果还是公司 {#example-2-apple-fruit-or-company}

“Apple” 一词既可以指公司，也可以指美味的红色水果。

```python
print(model.most_similar(positive=['samsung', 'iphone'], negative=['apple'], topn=1))
print(model.most_similar(positive=['fruit'], topn=10)[9:])
```

在上面这个例子中，我们可以看到 Word2Vec 保留了两个含义。

```python
[('droid_x', 0.6324754953384399)]
[('apple', 0.6410146951675415)]
```

“Droid” 指的是三星首款 4G LTE 智能手机（“Samsung” + “iPhone” - “Apple” = “Droid”），而 “apple” 是与 “fruit” 相似度最高的第十个单词。

## 向量搜索策略 {#vector-search-policy}

既然我们已经看到了 Embedding 的强大，下面我们简要地看一下实现最近邻搜索的方法。这不是全面的清单，我们只是简要地介绍一些常见的方法，以说明如何大规模进行向量搜索。其中一些方法并不相互排斥，比如，可能将量化与空间划分结合起来使用。

我们还会在未来的教程中详细介绍这些方法，请持续关注。

### 线性搜索 {#linear-search}

最简单的最近邻搜索算法是老式线性搜索：计算指定查询向量与向量数据库中其他向量的距离。

显而易见，当我们试图将向量数据库扩展到数千万或数亿个向量时，老式搜索是行不通的。但是，当数据库中的元素较少时，这实际上是执行向量搜索的最有效方式，因为不需要为索引建立单独的数据结构，插入和删除操作也都可以容易地实现。

由于老式搜索缺乏空间复杂性以及与之相关的常数空间开销，即使进行适当数量的向量查询时，该方法的性能也好过分区。

### 分区 {#zoning}

分区不是单个算法，而是一组使用相同概念的算法。

K 维树（kd-trees）可能是这个系列中最有名的，它的工作原理是以类似于二进制搜索树的方式不断地将搜索空间一分为二（将向量分成“左”和“右”两桶）。

倒置文件索引（IVF）也是一种分区形式，它的工作原理是将每个向量分配给其最近的中心点，然后通过首先确定查询向量的最近中心点并围绕该中心点进行搜索，这样就大大减少了需要搜索的向量数。IVF 是一种相当流行的索引策略，通常与其他索引算法相结合以提高性能。

### 量化 {#quantisation}

量化是一种通过减少向量的精度来减少数据总量的技术。

例如，标量量化通过将高精度浮点向量与标量值相乘，然后将结果向量的元素转换为最接近的整数。这不仅减少了整个数据库的有效大小（例如，从 `**float64_t**` 转换为 `**int8_t**`），而且还有另一个作用，即加速向量间的距离计算。

乘积量化是另一种量化技术，类似于字典压缩。在乘积量化中，所有向量都被分成等大小的子向量，然后每个子向量被一个中心点替换。

### HNSW {#hnsw}

Hierarchical Navigable Small Worlds（HNSW)）是一种基于图的索引和检索算法。

它与乘积量化不同。HNSW 从原始数据中创建多层图，上层仅包含“长连接”，而下层仅包含数据库中向量之间的“短连接”（可参见下一节，了解向量距离度量的概述）。单个图的连接是按照跳过列表的方式创建的。

有了这个结构，搜索变得非常简单——我们遍历最上层的图（具有最长的向量连接）以找到最接近查询向量的向量。然后，我们对第二层执行相同的操作，使用第一层搜索的结果作为起点。这样一直持续到我们完成最底层的搜索，最后的结果成为查询向量的最近邻向量。

![Ev3YbKgo0ofqljxp0gXc6woTn6g](/img/Ev3YbKgo0ofqljxp0gXc6woTn6g.png)

（来源：https://github.com/spotify/annoy）

### ANNOY {#annoy}

这可能是我最喜欢的 ANN 算法，仅仅是因为它俏皮而不直观的名字。Approximate Nearest Neighbors Oh Yeah（ANNOY）是一种基于树的算法，由 Spotify 推广（用于他们的音乐推荐系统）。尽管名字很怪，ANNOY 背后的基本概念实际上相当简单——二进制树。

ANNOY 的工作方式是，首先在数据库中随机选择两个向量，然后沿着分隔这两个向量的超平面将搜索空间一分为二。这样反复进行，直到每个节点的数量少于某个预定义的参数 `**NUM_MAX_ELEMS**`。由于得到的索引基本上是一棵二进制树，这使得我们可以在 O(log n) 复杂度上进行搜索。

![V1OrbTRKWoH2ecx6rYdcyFw8n6d](/img/V1OrbTRKWoH2ecx6rYdcyFw8n6d.png)

（来源：https://github.com/spotify/annoy）

## 常用的相似度度量 {#commonly-used-similarity-metrics}

如果没有相似度量——计算两个向量之间距离的方法，再好的向量数据库也没有用。因为存在许多度量，我们在这里只讨论最常用的子集。

### 浮点向量相似度度量 {#floating-point-vector-similarity-measure}

最常见的浮点向量相似度量，不分先后，有 L1 距离、L2 距离和余弦相似度。前两个值是距离度量，较低的值意味着更多的相似性，而较高的值则意味着较低的相似性；余弦相似度是一种相似度度量，较高的值意味着更多的相似性。

![GuW2bQe3Po3bDnxfZa9ckVjonxf](/img/GuW2bQe3Po3bDnxfZa9ckVjonxf.png)

L1 距离通常也被称为曼哈顿距离，因从曼哈顿的 A 点到 B 点需要沿两个垂直方向中的一个移动而被恰当地命名。第二个方程，即 L2 距离，只是两个向量在欧几里得空间中的距离。第三个也是最后一个等式是余弦距离，相当于两个向量之间角度的余弦。注意，余弦相似性的方程式是输入矢量 **a** 和 **b** 的归一化版本之间的点积。

通过一点数学运算，我们也可以论证，涉及到单位规范向量的相似性排名时，L2 距离和余弦相似性实际上是等同的：

![XkDkbhJWWowxV5xsxyZcE4bOnOx](/img/XkDkbhJWWowxV5xsxyZcE4bOnOx.png)

回顾一下，单位规范向量的大小为 1：

![Tt8fbOK9Po42uxxjgNDcVUjbnHc](/img/Tt8fbOK9Po42uxxjgNDcVUjbnHc.png)

有了这个，我们就可以得到：

![BL2cbp5Ivo29t3xpyyPch6GLnYd](/img/BL2cbp5Ivo29t3xpyyPch6GLnYd.png)

由于我们有单位规范的向量，余弦距离可以算作是 a 和 b 之间的点积（上面公式 3 的分母可以算作 1）：

![FgxpbKyLjoBDVLxyGAScvF9jnUh](/img/FgxpbKyLjoBDVLxyGAScvF9jnUh.png)

从本质上讲，对于单位规范向量来说，L2 距离和余弦相似性在功能上是等价的。一定要记住对 Embedding 进行标准化处理。

### 二进制向量相似度量 {#binary-vector-similarity-measure}

二进制向量，正如其名称所示，没有基于算术的度量，如浮点向量。二进制向量的相似性度量依赖于集合数学、位操作或两者的结合（没关系，我也讨厌离散数学）。下面是两个常用的二进制向量相似度量的公式：

![Z6bybRUmloWYd9x0prAckYpenWd](/img/Z6bybRUmloWYd9x0prAckYpenWd.png)

第一个方程称为 Tanimoto/Jaccard 距离，基本上是衡量两个二进制向量之间的重叠量。第二个等式是 Hamming 距离，是对 a 和 b 中彼此不同的向量元素数量的统计。

你可以忽略这些相似度量，因为大多数应用都使用余弦相似度，而不是浮点 Embedding。

## **总结** {#conclusion}

在本教程中，我们看了一下向量相似性搜索，以及一些常见的向量搜索算法和距离度量。这里有一些主要的收获：

- Embedding 向量是强大的语义表示技术，无论是在向量之间的距离方面还是在向量算术方面。通过将大量的向量代数应用于 Embedding，我们可以只用基本的数学运算符来进行可扩展的语义分析。

- 目前有各种各样的近似近邻搜索算法和索引类型可供选择。最常用的是 HNSW，但不同的索引算法应用场景可能不同，这取决于拥有的 Embedding 总数以及每个单独向量的长度。

- 目前使用的两个主要距离度量是 L2/Euclidean 距离和余弦距离。这两个度量，当用于归一化 Embedding 时，在功能上是等同的。

感谢参与我们的教程！向量搜索是 Milvus 的核心部分，未来的教程我们还会继续探讨这一话题。我们会对最常用的 ANNS 算法——HNSW 和 ScaNN 做一些深入的研究。

希望你喜欢这篇文章 ，也欢迎在 [Twitter](https://twitter.com/zilliz_universe) 和 [LinkedIn](https://www.linkedin.com/company/zilliz/) 上关注我们，获取更多内容。

## 相关文档 {#related-doc}

- [什么是非结构化数据？](./introduction-to-unstructured-data)

- [什么是向量数据库？](./what-is-a-vector-database)

- [向量索引概览与 IVF 索引](./vector-index-basics-and-the-inverted-file-index)

- [标量量化与乘积量化](./scalar-quantization-and-product-quantization)

- [HNSW](./hierarchical-navigable-small-world-hnsw)
