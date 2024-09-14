---
title: "集群、Collection 及 Entity | Cloud"
slug: /cluster-collection-and-entities
sidebar_label: "集群、Collection 及 Entity"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 集群由全托管 Milvus 实例及相关计算资源构成。您可以在 Zilliz Cloud 集群中创建 Collection，然后在 Collection 中插入 Entity。Zilliz Cloud 集群中的 Collection 类似于关系型数据库中的表。Collection 中的 Entity 类似于表中的记录。 | Cloud"
type: origin
token: SxBKwEZyAiWvibkGNhLc8CjvnSg
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 集群
  - collection

---

import Admonition from '@theme/Admonition';


# 集群、Collection 及 Entity

Zilliz Cloud 集群由全托管 Milvus 实例及相关计算资源构成。您可以在 Zilliz Cloud 集群中创建 Collection，然后在 Collection 中插入 Entity。Zilliz Cloud 集群中的 Collection 类似于关系型数据库中的表。Collection 中的 Entity 类似于表中的记录。

## 集群{#cluster}

在 Zilliz Cloud 上创建集群时，您需要选择集群 CU 类型。CU 类型有 2 种选项：性能型和容量型。不同 CU 类型的区别，请阅读[选择合适的 CU 类型](./cu-types-explained)。

确定 CU 类型后，您还需要选择 CU 大小。CU 大小决定了集群可容纳的 Collection 数量。在 Dedicated 集群中，每个计算单元（CU）可最多容纳 64 个 Collection，并且每个集群中的 Collection 总数不能超过 4096。有关限制的更多信息，请阅读[使用限制](./limits)。

集群中的所有 Collection 共享 CU 资源。为节省 CU 资源，我们推荐您将一些不再使用的 Collection 从 CU 中释放出来。Collection 被释放后，其中的数据被转移到磁盘存储，从而可以释放 CU 资源以供其他已加载的 Collection 使用。需要查询已被卸载的 Collection 时，您可以将其重新加载至内存中。请注意，Collection 加载需要等待一段时间，因此我们不推荐频繁卸载和加载 Collection。

## Collection{#collection}

Collection 是一张二维数据表，包含固定列数和可变行数。Collection 数据表中的每 1 列对应 1 个字段，每 1 行表示 1 个 Entity。

下图中的示例 Collection 包含 6 个 Entity 和 8 个字段。

![MVBWbzkuyonO5tx99TscU93Knfg](/img/MVBWbzkuyonO5tx99TscU93Knfg.png)

### 字段{#fields}

通常我们会根据属性（如大小、重量、位置等）描述对象。对象属性类似于 Collection 中的字段。

Collection 中，主键是最特殊的字段，每个主键字段的值唯一且不重复。每 1 个主键都可以对应 Collection 中的 1 条 Entity 记录。如上图所示， 示例 Collection 中的 **id** 字段是主键。第 1 个 ID **0** 对应标题为《The Mortality Rate of Coronavirus is Not Important》的文章。Collection 中的任何其他文章的 ID 都不会为 **0**。

### Schema{#schema}

每个字段都具有自己的属性——字段中数据类型和相关限制（如向量维度和相似性类型）。通过定义字段及顺序，您的 Collection 会有 1 个 Schema，也就是 1 个数据结构框架。Collection Schema 类似于传统数据表的结构。

关于 Schema 中支持使用的数据类型，可参考[Schema](./schema-explained)。

### 索引{#index}

与 Milvus 实例不同，Zilliz Cloud 集群仅支持 **AUTOINDEX** 索引。该索引类型针对 Zilliz Cloud 提供的 3 种 CU 进行了优化。更多详情，请阅读 [AUTOINDEX](./autoindex-explained) 。

## Entity{#entities}

Collection 中的 Entity 是指共享相同字段集的数据记录。存储在每个字段中的数据共同形成 1 个 Entity。

您可以向 Collection 中添加任意数量的 Entity。但是，随着 Entity 数量和维度增加，Entity占用的内存大小也会增加，影响 Collection 的搜索性能。

更多内容，可参考本手册 [Schema](./schema-explained) 一节以合理规划您的 Collection。

## Load 和 Release{#load-and-release}

对 Collection 执行 Load 操作是在 Collection 中进行 Search 和 Query 的前提条件。在加载 Collection 时，Zilliz Cloud 会将所有向量列的索引文件和所有标量列的数据加载到内存，从而快速响应搜索和查询请求。

由于 Search 和 Query 操作会占用较多的内存资源。为了减少资源消耗，您可以对暂时不需要使用的 Collection 执行 Release 操作，将相关数据从内存中释放出来。

## Search 与 Query{#search-and-query}

在为 Collection 创建索引并将其加载到内存后，您就可以通过输入查询向量、选择相似性类型的方式对 Collection 中的 Entity 进行相似性搜索。例如，您可以将文本 “Interesting Python demo” 对应的向量表示作为查询向量进行搜索，Zilliz Cloud 会在 Collection 中进行相似性查询并返回所有标题语义与查询向量相似的 Entity。

在 Search 和 Query 过程中，您也可以使用过滤条件对某些标量字段进行过滤，找到符合指定条件的所有 Entity。

更多搜索和查询详情，请阅读[Search, Query 和 Get](./search-query-get)。

## Partition{#partitions}

Partition 是从 Collection 中划分而来，和 Collection 保持相同的列数，只包含 Collection 的部分 Entity。

通过将 Entity 分别存入不同的 Partition，Milvus 商业版实现了对 Entity 的隔离与分组。在按 Partition 进行检索时，由于无须关注 Collection 中其它 Partition 的数据，检索效率得到了较大的提升。

关于 Partition 的更多内容，可以查看[管理 Partition](./manage-partitions)。