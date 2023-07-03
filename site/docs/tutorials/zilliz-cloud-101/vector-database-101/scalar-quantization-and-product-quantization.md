---
slug: /scalar-quantization-and-product-quantization
sidebar_position: 4
---

# 标量量化与乘积量化

上一个教程中，我们深入了解了两个最基本的索引算法——平面索引（Flat Indexing）和倒排文件（IVF）索引。平面索引是最简单的向量搜索策略，但在数据集较小（几千个向量）或使用 GPU 进行查询时，它仍然可以发挥出不错的效果；IVF 提供高扩展性，同时也可以与其他索引策略很好地配合使用。

本教程中，我们将深入探讨量化技术——具体来说是标量量化（也称整数量化）和乘积量化。我们将使用 Python 来实现标量量化和乘积量化。

## **量化技术** {#quantitative-technology}

如我们之前在向量相似性搜索的教程中提到的，量化是一种通过降低向量的总体精度来减少数据量大小的技术。注意，这与降维（PCA、LDA 等）不同，后者试图减少向量的长度：

```python
>>> vector.size  # 原始向量长度
128
>>> quantized_vector.size  # 量化后向量长度
128
>>> reduced_vector.size  # 减少后向量长度
16
```

PCA 等降维方法使用线性代数将输入数据投影到更低维度的空间中。这里不需要太深入地进行算术研究，只需要知道这些方法一般不会被用作主要的索引策略，因为它们对数据的分布有限制。例如，PCA 在那些可以被分隔成独立的、高斯分布的数据上效果最好。

相反，量化不对数据的分布做任何假设，而是单独查看每个维度（或一组维度），并尝试将每个值分到许多离散的桶中。我们可以不在所有原始向量上进行平面搜索，而是在量化后的向量上进行平面搜索，这可以减少内存消耗，并显著提高速度。例如，标量量化将浮点值变成低维整数：

```python
>>> vector.dtype  # 原始向量数据类型
dtype('float64')
>>> quantized_vector.dtype
dtype('int8')
>>> reduced_vector.dtype
dtype('float64')
```

从以上示例我们可以看到，标量量化将向量的总大小减少了整整 8 倍。

## **标量量化** {#scalar-quantization}

那标量量化到底是如何工作的呢？我们先来看看索引过程，也就是将浮点向量转换为整数向量的过程。对于每个向量维度，标量量化会从数据库中获取该维度对应的最大和最小值，并在整个范围内均匀地将该维度分割成多个区间。

让我们尝试用代码实现。首先，我们生成一个数据集，包含从多元分布中采样的一千个 128 维浮点向量。由于这只是一个示例，我将从高斯分布中进行采样；实际上，除非在训练模型时添加了约束（例如在变分自编码器中），否则 Embedding 向量很少具有高斯分布：

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

这个数据集用作我们在此标量量化实现中使用的虚拟数据。现在，让我们确定向量的每个维度的最大值和最小值，并将其存储在名为 `ranges` 的矩阵中：

```python
>>> ranges = np.vstack((np.min(dataset, axis=0), np.max(dataset, axis=0)))
```

你会注意到，在这个例子中，所有维度的 `mins` 和 `maxes` 都是相当统一的，因为输入数据是从均值为零、方差为单位的高斯分布中采样的。我们暂时不用担心这一点，因为这里的所有代码都可以转换为真实数据。现在，我们已经确定了整个数据集中每个向量维度的最小值和最大值。有了这个，我们现在可以确定每个维度的起始值和步长。起始值是简单的最小值，而步长是由我们使用的整数类型中的离散分仓的数量决定的。在这种情况下，我们将使用 8 位无符号整数 `uint8_t`，共计 256 个离散桶：

```python
>>> starts = ranges[0,:]
>>> steps = (ranges[1,:] - ranges[0,:]) / 255
```

这就是所需的所有设置。实际的量化是通过减去每个维度的所有起始值（`starts`）并将结果值除以步长（`steps`）来完成的：

```python
>>> dataset_quantized = np.uint8((dataset - starts) / steps)
>>> dataset_quantized
array([[136,  58, 156, ..., 153, 182,  30],
       [210,  66, 175, ...,  68, 146,  33],
       [100, 136, 148, ..., 142,  86, 108],
       ...,
       [133, 146, 146, ..., 137, 209, 144],
       [ 63, 131,  96, ..., 174, 174, 105],
       [159,  78, 204, ...,  95,  87, 146]], dtype=uint8)
```

我们还可以检查量化数据集的 `mins` 和 `maxes`：

```python
>>> np.min(dataset_quantized, axis=0)
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], dtype=uint8)
>>> np.max(dataset_quantized, axis=1)
array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 254, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 254, 255, 255, 255, 255, 254, 255, 255, 254,
       254, 255, 255, 254, 255, 255, 255, 254, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 254, 255, 255, 255, 255, 255, 254, 255, 255,
       255, 254, 255, 255, 255, 255, 255, 254, 254, 255, 255, 255, 255,
       255, 255, 255, 254, 255, 255, 255, 255, 254, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], dtype=uint8)
```

注意，我们在每个维度上都使用了完整的 `uint8_t` 范围 `[0,255]`（一些最大值由于浮点不精确是 254 而不是 255）。

现在让我们把它们全部放在 `ScalarQuantizer` 类中：

```python
import numpy as np

class ScalarQuantizer:

    def __init__(self):
        self._dataset = None

    def create(self):
        """Calculates and stores SQ parameters based on the input dataset."""
        self._dtype = dataset.dtype  # original dtype
        self._starts = np.min(dataset, axis=1)
        self._steps = (np.max(dataset, axis=1) - self._starts) / 255

        # the internal dataset uses `uint8_t` quantization
        self._dataset = np.uint8((dataset - self._starts) / self._steps)

    def quantize(self, vector):
        """Quantizes the input vector based on SQ parameters"""
        return np.uint8((vector - self._starts) / self._steps)

    def restore(self, vector):
        """Restores the original vector using SQ parameters."""
        return (vector * self._steps) + self._starts

    @property
    def dataset(self):
        if self._dataset:
            return self._dataset
        raise ValueError("Call ScalarQuantizer.create() first")

>>> dataset = np.random.normal(size=(1000, 128))
>>> quantizer = ScalarQuantizer(dataset)
```

标量量化就做到这里！标量量化的转换函数可以更改为二次或指数函数，而非线性函数，但是一般思想仍然相同——将每个维度的整体空间分成离散桶，以减少向量数据的整体内存占用率。

## 乘积量化 {#product-quantization}

标量量化的一个主要缺点是它不考虑每个维度中值的分布。假设我们有一个数据集，其中包含以下二维向量：

```python
array([[ 9.19,  1.55],
       [ 0.12,  1.55],
       [ 0.40,  0.78],
       [-0.04,  0.31],
       [ 0.81, -2.07],
       [ 0.29,  0.82],
       [ 0.05,  0.96],
       [ 0.12, -1.10]])
```

如果我们决定将这些向量量化为 3 位整数（范围为 `[0,7]`），那么第 0 维的 6 个分仓将完全没有被用到！显然，我们需要一个更好的方法来进行量化，特别是在各维度值非均匀分布的时候。

现在让我们来一起来看看乘积量化——一种更为强大和灵活的量化向量的方式。乘积量化的主要思想是通过算法将一个高维向量分割成一个较低维度的子空间，子空间的维度对应于原始高维向量的多个维度。这种还原过程通常使用一种叫 Lloyd 的特殊算法来完成，这种量化实际上等同于 K-means 聚类算法。与标量量化一样，每个原始向量在量化后都会产生一个整数向量，每个整数都对应着一个特定的中心点。

这听起来可能很复杂，但如果我们从算法的角度将其分解，就会变得更容易理解。让我们首先来看看索引：

1. 给定一个共有 N 个向量的数据集，我们首先将每个向量分成 M 个子向量（也称为子空间）。这些子向量不一定要相同的长度，但在实践中它们几乎都是相同的。

1. 然后，我们将对数据集中的所有子向量使用 K-means 算法（或其他聚类算法），为每个子空间提供一个 K 个中心点的集合，每个中心点都将被分配到它自己的唯一 ID。

1. 在计算出所有中心点后，我们用最接近中心点的 ID 替换原始数据集中的所有子向量。

![EPCwbw9WSoWUT3xJvL6cHLtYnRb](/img/EPCwbw9WSoWUT3xJvL6cHLtYnRb.png)

乘积量化可以减少内存使用，并大大加快近邻搜索速度，但这可能会牺牲精度。权衡取决于所使用的参数——使用更多的中心点和子向量会提高搜索精度，但同时也会减少数据压缩和加速的效果。

让我们看一个非常简单的乘积量化实现。和之前的标量量化示例一样，我们将使用 `M=16` 和 `K=256` 将向量还原成 8 位无符号整数（`uint8_t`），也就是说，每个 128 维的向量将被分割成 16 个大小为 8 的子向量，然后每个子向量被量化成 256 个桶中的一个。

```python
>>> (M, K) = (16, 256)
```

和标量量化一样，我们从生成一个示例数据集开始：

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

有了数据集，我们来拆分第一组子向量：

```python
>>> sublen = dataset.shape[1] // M
>>> subspace = dataset[:,0:sublen]  # this is the 0th subspace
>>> subspace.shape
(1000, 8)
```

与 IVF 一样，我们将使用 **scipy** 的 **kmeans2** 来确定中心点：

```python
>>> from scipy.cluster.vq import kmeans2
>>> (centroids, assignments) = kmeans2(subspace, K, iter=32)
```

K-means 以 `int32_t` 格式返回中心点，我们将其快速转换为 `uint8_t`：

```python
>>> quantized = np.uint8(assignments)
```

对每个子空间都重复此过程，直到我们把所有的向量都量化了。

和标量量化一样，我们也把这里的所有东西编译成一个类：

```python
import numpy as np
from scipy.cluster.vq import kmeans2

class ProductQuantizer:

    def __init__(self, M=16, K=256):
        self.M = 16
        self.K = 256
        self._dataset = None

    def create(self, dataset):
        """Fits PQ model based on the input dataset."""
        sublen = dataset.shape[1] // self.M
        self._centroids = np.empty((self.M, self.K, sublen), dtype=np.float64)
        self._dataset = np.empty((dataset.shape[0], self.M), dtype=np.uint8)
        for m in range(self.M):
            subspace = dataset[:,m*sublen:(m+1)*sublen]
            (centroids, assignments) = kmeans2(subspace, self.K, iter=32)
            self._centroids[m,:,:] = centroids
            self._dataset[:,m] = np.uint8(assignments)

    def quantize(self, vector):
        """Quantizes the input vector based on PQ parameters"""
        quantized = np.empty((self.M,), dtype=np.uint8)
        for m in range(self.M):
            centroids = self._centroids[m,:,:]
            distances = np.linalg.norm(vector - centroids, axis=1)
            quantized[m] = np.argmin(distances)
        return quantized

    def restore(self, vector):
        """Restores the original vector using PQ parameters."""
        return np.hstack([self._centroids[m,vector[m],:] for m in range(M)])

    @property
    def dataset(self):
        if self._dataset:
            return self._dataset
        raise ValueError("Call ProductQuantizer.create() first")

>>> dataset = np.random.normal(size=(1000, 128))
>>> quantizer = ProductQuantizer()
>>> quantizer.create(dataset)
```

这就是乘积量化！为了在搜索过程中实现真正地加速，我们可以花费一点额外的内存来计算子空间中所有中心点的距离表，就把这作为一个练习留给大家吧。

## **总结** {#conclusion}

本教程中，我们对标量量化和乘积量化进行了深入研究，并创建了我们自己的简单实现。标量量化是一个很好的工具，但是乘积量化要强大得多，而且无论我们的向量数据的如何分布，都可以使用乘积量化。请记住，虽然乘积量化可以帮助大大加快查询时间，同时也可以减少内存占用，但它在检索方面的作用可能不是那么大。我们将在未来的教程中对乘积量化和其他几种索引策略进行基准测试。

在下一个教程中，我们将继续介绍 Hierarchical Navigable Small Worlds （HNSW）索引策略——这是一种基于图的索引算法，可以说是当今最流行的向量索引方式（尽管它也有自己的缺点）。下一个教程中见吧！

本教程的所有代码都可以在 GitHub 上免费获取：[https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search%E3%80%82)[。](https://github.com/fzliu/vector-search%E3%80%82)

## 相关文档 {#related-doc}

- [什么是非结构化数据？](./introduction-to-unstructured-data)

- [什么是向量数据库？](./what-is-a-vector-database)

- [什么是向量相似性搜索？](./introduction-to-vector-similarity-search)

- [向量索引概览与 IVF 索引](./vector-index-basics-and-the-inverted-file-index)

- [HNSW](./hierarchical-navigable-small-world-hnsw)
