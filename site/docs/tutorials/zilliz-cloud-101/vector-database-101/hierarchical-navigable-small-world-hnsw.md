---
slug: /hierarchical-navigable-small-world-hnsw
sidebar_position: 5
---

# HNSW

## 概览 {#overview}

上一个教程中，我们介绍了标量量化和乘积量化，这两种索引策略有助于减小数据总量大小且不降低搜索范围。为了更好地说明标量量化和乘积量化的工作原理，我们还用 Python 进行了简单实现。

本教程中，我们会利用这些知识，了解当今最常用和主流的算法——Hierarchical Navigable Small Worlds（HNSW）。HNSW 在速度和准确性方面表现非常出色，使其成为非常强大的向量搜索算法。虽然它很受欢迎，理解起来可能也会有些难过。不过不用担心，在接下来的几个部分中，我们将分解 HNSW，并开始我们自己的简单实现。

## HNSW 基础知识 {#hnsw-fundamentals}

回想一下，以前的教程中有四种向量搜索索引类型：哈希索引、树索引、聚类索引和图形索引。HNSW 属于后者，它结合了两个核心概念——跳表（skip list）和小世界网络（Navigable Small World，NSW）。讨论 HNSW 之前，让我们先单独了解这两个概念。

**跳表**

首先是跳表。回想一下，链接列表是知名的数据结构，每个元素都保留着指向下一个元素的指针。尽管链接列表对于实现后进先出和先进先出的数据结构（如堆栈和队列）非常有用，但它的一个主要缺点是随机访问的时间复杂度 O(n)。跳表旨在通过引入额外的层来解决这个问题，通过产生额外的内存，即 O(n log n) 空间复杂度，而不是普通链接列表的 O(n)，和一点插入和删除的运行时开销来实现 O(log n) 随机访问时间复杂度。

跳表是一个多级链表，其中上层维护长连接。随着层数的减少，连接越来越短，最底层是包含所有元素的“原始”链表。下面的图示说明了这一点：

![W6tTb7UBvozAwdxfDeUcPLh6n3C](/img/W6tTb7UBvozAwdxfDeUcPLh6n3C.png)

我们从最高层开始，在跳表中找到元素 i。一旦我们找到与列表中某个元素大于 i 的节点相对应的节点，我们就会回溯到前一个节点并移动到下一层。这样继续，直到找到我们要查找的元素。注意，跳表仅适用于排序列表，因为我们需要一种直接比较两个对象大小的方法。

插入的工作是概率性的。对于任何新元素，我们首先需要弄清楚该元素首次出现在哪一层。最高层的概率最低，随着层数的降低，概率逐渐增加。一般规则是，层中的任何元素将以一些预定义概率 p 出现在上面的层中。因此，如果元素首次出现在某层中（如 I 层），则它也会被添加到层 l-1、l-2 等层。

虽然有可能出现一个性能不比标准链表好的跳表，但这种情况发生的概率非常低。

**什么是 NSW**

了解了跳表之后，让我们花些时间来谈谈 NSW。这里的总体思路是先想象一个网络中的众多节点。每个节点都有与其他节点的短程、中程和远程连接。当进行搜索时，我们将从一些预先定义的入口点开始。从那里，我们将评估与其他节点的连接，并跳到与我们希望找到的节点最接近的那个节点。这个过程不断重复，直到我们找到最近的邻居。

这种搜索称为“贪心搜索”。该算法适用于数百或数千个节点的小型 NSW，但对于更大的 NSW，它往往会崩溃。我们可以通过增加每个节点的短程、中程和长程连接的平均数量来修复这个问题，但这会增加网络的总体复杂性并导致更长的搜索时间。在绝对的“最坏”情况下，如果数据集中的每个节点都与其他节点连接，NSW 的效果不比 naïve（线性）搜索好。

NSW 非常酷，但这与向量搜索有何关系？这里的想法是将数据集中的所有向量想象成 NSW 中的点，其中长程连接由彼此不同的向量定义，短程连接则相反。回想一下，向量相似度得分是使用相似度度量来测量的——通常是浮点向量的 L2 距离或内积，以及二进制向量的 Jaccard 距离或 Hamming 距离。

通过使用数据集向量作为顶点构建 NSW，我们可以通过贪心地遍历 NSW 向越来越接近查询向量的顶点，有效地执行最近邻搜索。

**HNSW 概念详解**

涉及到向量搜索时，我们通常有数亿甚至数十亿个向量的数据集大小。普通 NSW 在这个规模上不太有效，因此我们需要更高效的方式。

![JFA4bdN5JoIQSRx0phxcH3sUnRe](/img/JFA4bdN5JoIQSRx0phxcH3sUnRe.png)

HNSW 通过借用跳表的概念来扩展 NSW。与跳表类似，HNSW 维护多个层（因此术语为“分层导航小世界”），只是用 NSW 代替了链表。HNSW 图的最上层有很少的节点和最长的链接，而底部层具有所有节点和最短的链接。在搜索过程中，我们输入一个预定义点，向上层次移动并将自己路由到最接近查询向量的邻居。一旦我们到达最近的节点，我们就重复这个过程到第二层。这样一直持续到我们到达最近的邻居。

![E8gmbkKx9okai4xyLsfco3hXnjb](/img/E8gmbkKx9okai4xyLsfco3hXnjb.png)

插入的工作方式与跳表类似。对于任何新向量，我们首先遍历图的第一层，找到其最近的邻居，然后移动到它下面的层。之后，我们再次遍历图，以查找其在第二层中的最近邻居。这个过程直到我们到达最底层图形中的最近的邻居。

现在，我们必须确定要创建哪些链接（顶点之间的连接）。同样，我们有一个预定义参数 M，它确定我们可以添加的最大双向连接数量。这些链接通常设置为最接近目标向量的邻居，但还可以使用其他启发式方法。假设向量出现，则同样的过程会在上层中重复。

与跳表一样，查询向量将呈指数递减的概率出现在上层中。具体来说，HNSW 论文使用方程 **floor(-ln(rand(0, 1)))**，其中 **rand(0, 1)** 是从 **(0, 1]** 中均匀分布的随机数。注意，这不限制特定层中任意两个顶点/向量之间的最小距离。不过，这种情况发生的概率还是非常低的，特别是当我们扩大 HNSW 指数中的向量数量时。

## 实现 HNSW {#implement-hnsw}

HNSW 并不简单，因此我们只在此处进行最简单的实现。像之前一样，我们首先创建一组（128 维）向量的数据集：

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

第一步是构建 HNSW 索引。为此，我们需要将每个向量添加到我们的数据集中。我们首先创建一个数据结构来保存索引。在这个基本示例中，我们将使用列表的列表来表示索引，其中内部列表对应于每个层/图：

```python
>>> L = 5  # 5 层 HNSW
>>> index = [[] for _ in range(L)]
```

每个图中的每个元素都是一个 3 元组，其中包含向量、向量链接到的索引列表以及下面一层中对应节点的索引。对于底层，3 元组的第三个元素将设置为 `None`。

由于每次插入都需要在图中搜索最近的邻居，我们先来实现这一点。我们可以遍历索引中的任何子图：

```python
def _search_layer(graph, entry, query, ef=1):

    best = (np.linalg.norm(graph[entry][0] - query), entry)

    nns = [best]
    visit = set(best)  # 已访问节点的集合
    candid = [best]  # 要插入到最近邻居中的候选节点
    heapify(candid)

    # 查找前 k 个最近的邻居
    while candid:
        cv = heappop(candid)

        if nns[-1][0] > cv[0]:
            break

        # 循环遍历与候选向量相邻的所有最近邻居
        for e in graph[cv[1]][1]:
            d = np.linalg.norm(graph[e][0] - query)
            if (d, e) not in visit:
                visit.add((d, e))

                # 仅将符合条件的向量推送到候选堆中
                if d < nns[-1][0] or len(nns) < ef:
                    heappush(candid, (d, e))
                    insort(nns, (d, e))
                    if len(nns) > ef:
                        nns.pop()

    return nns
```

这个代码片断涉及的内容较多，但通过一些解释会更容易理解。在这里，我们用一个堆来实现一个优先级队列，用它来排列图中的最近的邻居向量。就像之前所有的例子一样，我在这里使用的是 L2 距离，但这段代码也可以扩展到其他距离度量。我们首先将入口点填充到堆中。

以上我们所做的就是实现“贪心“搜索。每个迭代中，我们的目标是更新两个变量：近邻列表 `nns` 和候选点 `candid`。因此，我们先评估所有与 `candid` 中的“最佳”向量有关的近邻，将更接近查询向量的添加到近邻输出列表和候选点堆中，以便在下一次迭代中评估。这样反复进行，直到达到两个停止条件之一：所有的候选点都已评估，或者已确定找不到比现在更邻近的候选点了。

有了 top-k 图的搜索，我们现在可以实现顶层搜索功能来搜索整个 HNSW 索引：

```python
def search(index, query, ef=1):

    # 如果索引为空，则返回空列表
    if not index[0]:
        return []

    best_v = 0  # 设置初始最佳入口点
    for graph in index:
        best_d, best_v = _search_layer(graph, best_v, query, ef=1)[0]
        if graph[best_v][2]:
            best_v = graph[best_v][2]
        else:
            return _search_layer(graph, best_v, query, ef=ef)
```

我们首先从入口点（最上层图中的第 2 个元素）开始，然后在每个索引层中搜索最近的邻居，直到我们到达最底层。回顾一下，如果我们在最底层，3 元组的最后一个元素将解析为 `None`——就是最后的 `if` 语句的作用。一旦我们到达最底层，我们就用 `best_v` 作为入口来搜索图。

现在让我们回到 HNSW 的插入。我们首先需要弄清楚将我们的新向量插入哪一层。这是很直观的：

```python
def _get_insert_layer(L, mL):
    # ml 是用于标准化分布的乘法因子
    l = -int(np.log(np.random.random()) * mL)
    return min(l, L)
```

一切就绪后，我们现在可以实现插入功能：

```python
def insert(self, vec, efc=10):

    # 如果索引为空，则将向量插入到所有层中并返回
    if not index[0]:
        i = None
        for graph in index[::-1]:
            graph.append((vec, [], i))
            i = 0
        return

    l = _get_insert_layer(1/np.log(L))

    start_v = 0
    for n, graph in enumerate(index):

        # 仅对 [l, L) 执行插入
        if n < l:
            _, start_v = _search_layer(graph, start_v, vec, ef=1)[0]
        else:
            node = (vec, [], len(_index[n+1]) if n < L-1 else None)
            nns = _search_layer(graph, start_v, vec, ef=efc)
            for nn in nns:
                node[1].append(nn[1])  # outbound connections to NNs
                graph[nn[1]][1].append(len(graph))  # inbound connections to node
            graph.append(node)

        # 将起始点设置为下一层中最近的邻居
        start_v = graph[start_v][2]
```

如果索引是空的，我们将把 `vec` 插入所有层并立即返回。这样做是为了初始化索引，以便之后的插入操作。如果索引已经被填充，我们就可以开始插入。首先通过我们在上一步实现的 `get_insert_layer` 函数计算插入层，然后就可以在最上面的图中找到与该向量最近的邻居。这个过程对它下面的层继续进行，直到我们到达 `l` 层，即插入层。

对于 `l` 层和它下面的所有层，我们首先找与 `vec` 最近的邻居，直到找到预先确定的数字 `ef`。然后我们创建从节点到其最近邻居的连接，反之亦然。请注意，一个适当的实现还应该有一个修剪技术，以防止早期的向量与其他向量有太多的连接，我就把这个小问题留给大家当做练习。

我们现在已经完成了搜索（查询）和插入功能。让我们把所有的东西合并到类中：

```python
from bisect import insort
from heapq import heapify, heappop, heappush

import numpy as np

from ._base import _BaseIndex

class HNSW(_BaseIndex):

    def __init__(self, L=5, mL=0.62, efc=10):
        self._L = L
        self._mL = mL
        self._efc = efc
        self._index = [[] for _ in range(L)]

    @staticmethod
    def _search_layer(graph, entry, query, ef=1):

        best = (np.linalg.norm(graph[entry][0] - query), entry)

        nns = [best]
        visit = set(best)  # 已访问节点的集合
        candid = [best]  # 要插入到最近邻居的候选节点
        heapify(candid)

        # 找到前 K 个最近邻居
        while candid:
            cv = heappop(candid)

            if nns[-1][0] > cv[0]:
                break

            # 循环遍历候选向量的所有最近邻居
            for e in graph[cv[1]][1]:
                d = np.linalg.norm(graph[e][0] - query)
                if (d, e) not in visit:
                    visit.add((d, e))

                    # 仅将“更好”的向量推入候选堆
                    if d < nns[-1][0] or len(nns) < ef:
                        heappush(candid, (d, e))
                        insort(nns, (d, e))
                        if len(nns) > ef:
                            nns.pop()

        return nns

    def create(self, dataset):
        for v in dataset:
            self.insert(v)

    def search(self, query, ef=1):

        # 如果索引为空，则返回空列表
        if not self._index[0]:
            return []

        best_v = 0  # 设置初始最佳入口点
        for graph in self._index:
            best_d, best_v = HNSW._search_layer(graph, best_v, query, ef=1)[0]
            if graph[best_v][2]:
                best_v = graph[best_v][2]
            else:
                return HNSW._search_layer(graph, best_v, query, ef=ef)

    def _get_insert_layer(self):
        # ml 是用于标准化分布的乘法因子
        l = -int(np.log(np.random.random()) * self._mL)
        return min(l, self._L-1)

    def insert(self, vec, efc=10):

        # 如果索引为空，则将向量插入到所有层中并返回
        if not self._index[0]:
            i = None
            for graph in self._index[::-1]:
                graph.append((vec, [], i))
                i = 0
            return

        l = self._get_insert_layer()

        start_v = 0
        for n, graph in enumerate(self._index):

            # 仅对 [l, L) 执行插入
            if n < l:
                _, start_v = self._search_layer(graph, start_v, vec, ef=1)[0]
            else:
                node = (vec, [], len(self._index[n+1]) if n < self._L-1 else None)
                nns = self._search_layer(graph, start_v, vec, ef=efc)
                for nn in nns:
                    node[1].append(nn[1])  # 外部连接到 NN
                    graph[nn[1]][1].append(len(graph))  # 内部连接到 node
                graph.append(node)

            # 将起始点设置为下一层中最近的邻居
            start_v = graph[start_v][2]
```

终于，完成了！

## 总结 {#summary}

这个教程中，我们深入研究了 HNSW——一种强大的基于图的向量搜索策略，涉及多层连接图。HNSW 是一个非常流行的算法，而且通常是 Milvus 用户寻求最大查询性能的首选。

## 相关文档 {#related-documents}

- [什么是非结构化数据？](./introduction-to-unstructured-data)

- [什么是向量数据库？](./what-is-a-vector-database)

- [什么是向量相似性搜索？](./introduction-to-vector-similarity-search)

- [向量索引概览与 IVF 索引](./vector-index-basics-and-the-inverted-file-index)

- [标量量化与乘积量化](./scalar-quantization-and-product-quantization)
