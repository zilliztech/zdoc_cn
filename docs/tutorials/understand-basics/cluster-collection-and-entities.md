---
slug: /cluster-collection-and-entities
beta: FALSE
notebook: FALSE
type: origin
token: SxBKwEZyAiWvibkGNhLc8CjvnSg
sidebar_position: 2

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

Zilliz Cloud 支持以下数据类型：

- 布尔值（BOOLEAN）

- 双精度浮点数（DOUBLE）

- 单精度浮点数（FLOAT）

- 浮点向量（FLOAT_VECTOR）

- 8 位有符号整数（INT8）

- 32 位有符号整（INT32）

- 64 位有符号整（INT64）

- 可变长度字符串（VARCHAR）

- [JSON](./use-json-fields)

Zilliz Cloud 提供 3 种 CU 类型。不同 CU 类型适用于不同的场景，搜索性能也有所不同。

<Admonition type="info" icon="📘" title="说明">

<p>Zilliz Cloud 集群中仅 FLOAT_VECTOR 支持向量的数据类型。</p>

</Admonition>

### 索引{#index}

与 Milvus 实例不同，Zilliz Cloud 集群仅支持 **AUTOINDEX** 索引。该索引类型针对 Zilliz Cloud 提供的 3 种 CU 进行了优化。更多详情，请阅读 [AUTOINDEX](./autoindex-explained) 。

## Partition{#partitions}

Partition 是从 Collection 中划分而来。Zilliz Cloud 支持将物理存储划分成若干部分，每一部分被称为一个 Partition。每个 Partition 都可以包含多个 Segment。

通过将 Entity 分别存入不同的 Partition，Zilliz Cloud 实现了对 Entity 的隔离与分组。在按 Partition 进行检索时，由于无须关注 Collection 中其它 Partition 的数据，检索效率得到了较大的提升。

关于 Partition 的更多内容，可以查看[管理 Partition](./manage-partitions)。

## Entity{#entities}

Collection 中的 Entity 是指共享相同字段集的数据记录，如图书馆中的图书或基因组中的基因。存储在每个字段中的数据共同形成 1 个 Entity。

输入查询向量、选择相似性类型和过滤条件（可选）后，您可以对 Collection 中的 Entity 进行向量搜索。例如，如果您使用关键字 “Interesting Python demo” 进行搜索，Zilliz Cloud 会返回所有标题语义相似的的文章。在此过程中，搜索实际是在向量字段 **title_vector** 上执行的。更多向量搜索详情，请阅读[Search, Query 和 Get](./search-query-get)。

您可以向 Collection 中添加任意数量的 Entity。但是，随着 Entity 数量和维度增加，Entity占用的内存大小也会增加，影响 Collection 的搜索性能。请参考 Zilliz Cloud [数据模型](./schema-explained) 以合理规划您的 Collection。