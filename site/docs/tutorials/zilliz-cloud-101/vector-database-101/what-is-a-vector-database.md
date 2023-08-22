---
slug: /what-is-a-vector-database
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 什么是向量数据库？

在这个数据量与日俱增的时代，大部分数据都可以归为半结构化数据和非结构化数据。近似最近邻（Approximate Nearest Neighbor，ANN）搜索是处理这类数据的有效方式。向量数据库是一种数据库管理系统，有助于处理不断增加的非结构化数据。

向量数据库提供了一种全托管数据管理解决方案，用于存储、索引和搜索大规模的非结构化数据集。向量数据库利用了机器学习模型的 Embedding 能力。

## 概览 {#overview}

你猜现在著名的 ImageNet 数据集需要多少个管理员来标记？有答案了吗？

需要 25000 个人（真的很多）。

通过图像、视频、文本、音频和其他形式的非结构化数据的内容而非人为生成的标签进行搜索，正是向量数据库要解决的问题。与强大的机器学习模型相结合时，Milvus 等向量数据库能够彻底改变电子商务、推荐系统、语义搜索、计算机安全、制药等行业。

我们从用户角度来考虑一下。如果没有强大的可用性和友好的 API，技术有什么用处呢？与基础技术相结合，多租户和易用性也是向量数据库非常重要的特性。下面我们来列出所有向量数据库必要的功能（其中许多功能会与针对结构化或半结构化数据的数据库相重叠）：

- **可扩展性和可调节性**：随着存储在向量数据库中的非结构化数据增长到数亿或数十亿，横向扩展到多个节点变得至关重要，因为每隔 3 个月就要手动把内存条插入到服务器机架中来扩展的体验并不友好。此外，数据插入率、查询率和底层硬件的差异可能会对应不同的应用需求，这使得可调节性成为向量数据库必须具备的特性之一。

- **多租户和数据隔离**：支持多用户是所有数据库系统的一个明显特征。然而，为每个新用户创建一个新的向量数据库可能不是明智的解决方案。与这个概念平行的是数据隔离，因为数据库中对任意 Collection 的插入、删除或查询操作都应该对系统中的其他部分不可见，除非 Collection 所有者明确希望共享此类信息。

- **完整的** API **套件**：没有完整的 API 和 SDK 的数据库，说实话，不是真正的数据库。Milvus 拥有 Python、Node、Go 和 Java SDK，方便用户进行数据库通信和管理。

- **直观的用户界面 / 管理控制台**：用户界面可以大大减少向量数据库的学习曲线。这些界面同时也应该支持新的向量数据库功能和工具。

总结一下，向量数据库应该具备以下特性：1）可扩展性和可调节性；2）多租户和数据隔离；3）完整的 API 套件和 4）直观的用户界面 / 管理控制台。在接下来的内容中，我们将通过比较向量数据库与向量搜索库和向量搜索插件来进一步论证这几点。

## 向量数据库与向量搜索库 {#vector-databases-versus-vector-search-libraries}

现在业界存在一个普遍的误解，即向量数据库只是 ANN 搜索算法的包装器。但实际上，它们有很大的区别！

**向量数据库的核心是提供一个完整的针对非结构化数据的解决方案**。如前面介绍的，用于结构化数据和半结构化数据的数据库管理系统本身应该具备多租户、可扩展性等功能，这些功能同时也应该是成熟的开源向量数据库的属性。

FAISS、Scalable Nearest Neighbors（ScaNN）和 Hierarchical Navigable Small World（HNSW）这些项目是轻量级的 ANN 库，而非数据托管解决方案。这些库有助于构建向量索引——一种用于加速多维向量最近邻搜索的数据结构。如果数据集较小，使用这些库对非结构化数据进行处理可能足够了。然而，随着数据集规模的增加和用户数量的增多，规模问题变得越来越难以解决。

下图展示了 Milvus 的架构图。可能看起来有点复杂，但没关系，我们会在下一个教程中逐个讨论每个组件。

![A7RhbjPHMoWjFexajlXcEPDbnXh](/img/A7RhbjPHMoWjFexajlXcEPDbnXh.png)

向量数据库和向量搜索库在完全不同的抽象层级中运行——向量数据库是一种成熟的服务，搜索库则是为了集成到应用程序中而设计的。从这个意义上来说，搜索库是建立在向量数据库之上的众多组件之一，类似于 Elasticsearch 是建立在 Apache Lucene 之上的一样。

下面我们来看看如何在向量数据库中插入新的非结构化数据元素。在 Milvus 中，这非常容易实现：

```python
from pymilvus import Collection
collection = Collection('book')
mr = collection.insert(data)
```

其实，只需要 3 行代码就可以完成。对于像 FAISS 或 ScaNN 这样的库，如果不手动在某些检查点上重新创建索引，就没有简单的方法可以做到这一点。即便可以，向量搜索库仍然缺乏可扩展性和多租户的特性，而这两个都是向量数据库最重要的特性。

## 传统数据库上的向量搜索插件 {#vector-search-plugins-for-traditional-databases}

很好，现在我们已经知道了向量搜索库和向量数据库之间的区别，下面让我们来看看向量数据库与向量搜索插件有何不同。

很多传统关系型数据库和搜索系统，如 ClickHouse 和 Elasticsearch，都包含内置的向量搜索插件。例如，Elasticsearch 8.0 包括可通过 RESTful API 端点调用向量插入和 ANN 搜索功能。向量搜索插件的问题应该显而易见——没有采用完整堆栈的 Embedding 向量管理和搜索。相反，这些插件仅仅是对现有架构的增强，它们未经优化并有使用限制。在传统数据库上开发非结构化数据应用程序就像试图将锂电池和电动机放入汽油动力汽车的框架中一样——并不是什么好主意。

我们再回忆一下之前介绍的向量数据库应有的功能。向量搜索插件缺少其中两个功能——可调节性和用户友好的 API / SDK。我们将继续使用 Elasticsearch 的 ANN 引擎作为示例，其他向量搜索插件的操作方式和它非常相似，所以我们不会进一步介绍。Elasticsearch 通过 `dense_vector` 字段支持向量存储，并允许通过 `knnsearch endpoint` 进行查询：

```bash
PUT index
{
 "mappings": {
   "properties": {
     "image-vector": {
       "type": "dense_vector",
       "dims": 128,
       "index": true,
       "similarity": "l2_norm"
     }
   }
 }
}

PUT index/_doc
{
 "image-vector": [0.12, 1.34, ...]
}
```

```bash
GET index/_knn_search
{
 "knn": {
   "field": "image-vector",
   "query_vector": [-0.5, 9.4, ...],
   "k": 10,
   "num_candidates": 100
 }
}
```

Elasticsearch 的 ANN 插件仅支持一种索引算法：HNSW。此外，仅支持 L2 / Euclidean 作为距离度量。这好像还不错，但如果我们把它和向量数据库 Milvus 进行比较（使用 **pymilvus**）：

```bash
field1 = FieldSchema(name='id', dtype=DataType.INT64, description='int64', is_primary=True)
field2 = FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, description='embedding', dim=128, is_primary=False)

schema = CollectionSchema(fields=[field1, field2], description='hello world collection')
collection = Collection(name='my_collection', data=None, schema=schema)

index_params = {
  'index_type': 'IVF_FLAT',
  'params': {'nlist': 1024},
  "metric_type": 'L2'
}
collection.create_index('embedding', index_params)
```

```bash
search_param = {
  'data': vector,
  'anns_field': 'embedding',
  'param': {'metric_type': 'L2', 'params': {'nprobe': 16}},
  'limit': 10,
  'expr': 'id_field > 0'
}

results = collection.search(**search_param)

```

虽然 Elasticsearch 和 Milvus 都有用于创建索引、插入 Embedding 向量和执行最近邻搜索的方法，但从这些示例中可以清楚地看出，Milvus 具有更直观的向量搜索 API（更友好的用户界面）、更多类型的向量索引和更丰富的距离度量支持（更好的可调节性）。另外，Milvus 未来还计划支持更多的向量索引，允许通过类似 SQL 的语句进行查询，进一步提高可调节性和易用性。

我们刚刚介绍了相当多的内容，现在来快速总结一下。Milvus 比向量搜索插件更强大，因为 Milvus 本身定位是一个向量数据库，具有更丰富的功能和更适合非结构化数据的架构。

## 技术挑战 {#technical-challenges}

在前面，我列出了向量数据库应该具有的理想功能，然后将向量数据库与向量搜索库和向量搜索插件进行比较。现在，让我们简单来了解一下向量数据库的技术挑战。未来的教程中，我们将介绍 Milvus 是如何解决这些问题的，以及这些技术是如何帮助 Milvus 在性能方面胜过其他开源向量数据库。

想象这里有一架飞机。飞机本身包含一些相互连接的机械、电气和嵌入式系统，所有这些系统都在和谐地工作，为我们提供平稳和愉悦的飞行体验。同样，向量数据库也是由一些不断迭代升级的软件和组件构成的。简单地说，这些组件可以分解为存储、索引和服务。尽管这三个组件是紧密结合的，但像 Snowflake 这样的公司已经向存储行业表明，“非共享型”的数据库架构是优于传统的“共享型”云数据库模型的。因此，与向量数据库相关的第一个技术挑战是如何设计一个灵活和可扩展的数据模型。

如果有了一个数据模型，接下来是什么？数据已经存储在向量数据库中，能够在这些数据中进行搜索、查询和索引，是下一个重要的话题。机器学习和多层神经网络的计算密集性使得 GPU、NPU / TPU、FPGA 和其他通用计算硬件快速发展。向量索引和查询也是依靠密集计算，在加速器上运行时可以达到最大的速度和效率。这种多样化的计算资源为第二个主要的技术挑战让路，即开发一个异构的计算架构。

最后一步就是确保应用程序能够从数据库中读取数据。这与前面提到的 API 和用户界面特性密切相关。虽然新的数据库类型需要一个新的架构，以便以最小的成本获得最大的性能，但大多数向量数据库用户仍然习惯于传统的 CRUD 操作（如 SQL 中的 `INSERT`、`SELECT`、`UPDATE` 和`DELETE` 操作）。因此，最后的挑战是开发一套 API 和 GUI，基于现有的用户界面，保持与底层架构的兼容性。

注意，这三个部分中的每一个都对应着一个主要的技术挑战。既然如此，就不存在一个放之四海而皆准的向量数据库架构。最好的向量数据库将通过专注于提供第一节中提到的功能来克服所有这些技术挑战。

## 向量数据库的优势 {#what-are-the-advantages-of-vector-databases}

与传统数据库相比，向量数据库在涉及相似性搜索、机器学习和人工智能应用的用例中具有许多优势。以下是向量数据库的一些优势：

- 高维度搜索：向量数据库可以有效地对高维向量进行相似性搜索，通常用于机器学习和人工智能应用，如图像识别、自然语言处理和推荐系统。

- 可扩展性：向量数据库可以横向扩展，有效地存储和检索大量的向量数据。对于需要实时搜索和检索大量数据的应用来说，可扩展性非常重要。

- 灵活性：向量数据库可以处理各种向量数据类型，包括稀疏和密集的向量。它们还可以处理多种数据类型，包括数字、文本和二进制。

- 性能：向量数据库能有效地进行相似性搜索，通常比传统数据库更快速。

- 可定制的索引：向量数据库允许为特定的使用情况和数据类型定制索引方案。

总的来说，向量数据库为涉及相似性搜索和机器学习的应用提供了巨大的优势，为高维向量数据提供快速有效的搜索和检索。

## 最快的向量数据库 {#what-is-the-fastest-vector-database}

[ANN-Benchmarks](http://ann-benchmarks.com/) 提供了一个基准环境，用于评估各种向量数据库和近邻搜索算法的性能。它的主要功能如下：

- 数据集和参数说明：该基准提供了各种不同大小和维度的数据集，以及每个数据集的一组参数，如搜索的邻居数量和使用的距离指标。

- 搜索召回率计算：该基准计算搜索召回率，即在返回的 *K* 个邻居中找到真正最近的邻居的查询比例。搜索召回率是评价近邻搜索算法准确性的一个指标。

- RPS 计算：该基准还计算了 RPS，即向量数据库或搜索算法处理查询的速度。这个指标对于评估系统的速度和可扩展性至关重要。

使用该基准，用户可以在一套标准化的条件下比较向量数据库和搜索算法的性能，从而选择最适合特定场景的解决方案。

## 总结 {#summary}

本教程中，我们对向量数据库进行了快速浏览。具体来说，我们了解了 1）成熟的向量数据库必备的功能，2）向量数据库与向量搜索库的区别，3）向量数据库与传统数据库或搜索系统中的向量搜索插件的区别，以及 4）建立向量数据库所面临的挑战。

本教程并不是要深入研究向量数据库，也不是要展示如何在应用中使用它。相反，我们的目标是提供一个概览。这是你的旅程真正开始的地方。

在下一个教程中，我们将介绍全球最受欢迎的开源向量数据库 Milvus：

- Milvus 发展历史，包括最重要的问题——名字是怎么来的

- Milvus 1.0 与 Milvus 2.0 的不同之处以及 Milvus 的未来规划

- Milvus 和其他向量数据库的区别

- 其他常见的向量数据库应用

## 相关文档 {#related-documents}

- [什么是非结构化数据？](./introduction-to-unstructured-data)

- [什么是向量相似性搜索？](./introduction-to-vector-similarity-search)

- [向量索引概览与 IVF 索引](./vector-index-basics-and-the-inverted-file-index)

- [标量量化与乘积量化](./scalar-quantization-and-product-quantization)

- [HNSW](./hierarchical-navigable-small-world-hnsw)
