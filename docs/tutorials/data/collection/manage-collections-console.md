---
title: "管理 Collection (控制台) | Cloud"
slug: /manage-collections-console
sidebar_label: "管理 Collection (控制台)"
beta: FALSE
notebook: FALSE
description: "Collection 是一张二维表格，用于存储 Embedding向量和元数据。一个 Collection 中的所有 Entity 共享相同的 Schema。您可以创建多个 Collection 来进行数据管理，或用于实现多租户（multi-tenancy）。 | Cloud"
type: origin
token: Cy4swPPaeiZgbmkN4wUc9wAdnwd
sidebar_position: 11
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 在控制台上管理 collection
  - manage collections on console

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# 管理 Collection (控制台)

Collection 是一张二维表格，用于存储 Embedding向量和元数据。一个 Collection 中的所有 Entity 共享相同的 Schema。您可以创建多个 Collection 来进行数据管理，或用于实现多租户（multi-tenancy）。

本指南将带您了解如何在 Web 控制台上创建和管理 Collection，适用于希望使用可视化界面的用户。如果您熟悉 SDK，也可以通过 SDK 创建和管理 Collection。详情请见 [创建 Collection](./manage-collections-sdks)。

<Admonition type="info" icon="📘" title="说明">

<p>如需租户间数据物理隔离，且租户数量较少，可以为每个租户创建一个独立的 Collection。
但是，根据您的集群版本，您最多可创建 16,384 个 Collection。因此，对于大规模多租户场景，建议根据具体情况，采用基于 Partition 或 Partition key 的多租户策略。详情请见<a href="./multi-tenancy">多租户策略</a>。</p>

</Admonition>

## 创建 Collection{#create-collection}

Zilliz Cloud 控制台提供三种创建 Collection 的方式，适用于不同的使用场景：

- **创建自定义 Collection**：可根据数据集和业务需求自定义 Schema 和索引参数，适合需要精细化控制 Schema 的用户。

- **创建示例 Collection**：快速创建一个带有预先定义 Schema 和示例数据集的 Collection，适用于探索 Zilliz Cloud 功能的新用户。

- **复制现有 Collection**：在同一个 Database 中复制现有 Collection。适用于测试环境到生产环境的复制场景，可同时复制 Schema 和数据。也可用于修改已创建 Collection 的 Shard 设置。

以下 Demo 将向您展示如何在 Web 界面上找到这些功能：

 <Supademo id="cmauu1hir01tfyj0iiut2x0mf" title="创建 Collection" isShowcase="true" />

在创建 Collection 过程中，您将接触到以下几个重要概念：

### Collection 基础信息{#collection-basic-information}

Collection 的元数据包含以下内容：

- Collection 名称

- （可选）Collection 描述

- Collection 所属的 Database。[Database](./database) 是介于 Cluster 与 Collection 之间的一层逻辑结构，用于组织和管理 Collection。你可以将相关的 Collection 分组归类到同一个 Database 下。

### Collection Schema{#collection-schema}

Schema 定义了 Collection 的数据结构，必须包含以下字段：

- 1 个 主键字段（PK）

- 至少 1 个向量字段。默认情况下最多可包含 4 个向量字段。您可以[联系我们](https://support.zilliz.com.cn/hc/zh-cn)将向量字段数量上限放开至 10 个。

- （可选）用于存储元数据的标量字段

- （可选）动态列。启用动态列可为 Collection Schema 提供更高的灵活性，允许在插入数据时动态添加字段，而无需修改已有的 Schema。当数据结构不固定时，建议启用动态列。对于经常用于查询或过滤的字段，建议提前在 Schema 中定义，而不是通过动态列添加，以确保查询性能最优。

<Supademo id="cmauvtthp4p17ho3rl1q9rlpg" title="Zilliz Cloud - 创建 Collection Schema" />

<Admonition type="info" icon="📘" title="说明">

<p>Collection 创建后，大多数 Schema 配置将无法修改。请在创建前仔细设计 Schema，确保其能够满足当前及未来的业务需求。最佳实践参考，请参见<a href="./schema-explained">了解 Schema</a>。</p>

</Admonition>

### Index{#index}

Index 是一种用于加速搜索与查询的数据结构。Zilliz Cloud 支持两种类型的 Index：

- **Vector Index**：系统会自动为向量字段创建 AUTOINDEX，以加速向量搜索。如果 Schema 中包含多个向量字段，您可以为每个向量字段分别创建独立的 Index。此外，您还可以修改用于计算向量间距离的相似度类型。

- **Scalar Index**：Zilliz Cloud 默认不会为标量字段自动创建 Index。但您可以手动为常用于过滤的标量字段创建 Index，以加快搜索与查询性能。

您可以在创建 Collection 时跳过 Index 配置，后续随时添加。详情请见[管理 Index](./manage-indexes)。

### Function 和 Analyzer{#function-analyzer}

Analyzer 用于在全文检索中对原始文本进行分词和规范化处理。它将输入文本拆分为可搜索的独立词项，并移除停用词、标点等无关元素，以提升检索精度。了解更多。

Function 用于全文检索中，将 Analyzer 分词后的术语转换为带相关性得分的稀疏向量。Function 使用 BM25 等评分算法，为索引和文档排序生成加权表示。

如需使用 Function，Schema 中需同时包含 SPARSE_FLOAT_VECTOR 字段和 VARCHAR 字段。详情请见[全文搜索](./full-text-search)。

### Partition 和 Partition key{#partition-partition-key}

**Partition:** Partition 是 Collection 物理上的子集，具有与其所属 Collection 相同的数据 Schema，但仅包含 Collection 中的一部分数据。每个 Collection 默认包含一个 Partition，你可以根据多租户或数据管理的需要手动添加更多 Partition。如果未创建额外的 Partition，插入的数据将全部写入默认 Partition。详情请见[管理 Partition](./manage-partitions)。

**Partition key:** Partition Key 是一种基于 Partition 的查询优化机制。当你将一个非 Primary Key 的 INT64 或 VARCHAR 字段指定为 Partition Key 时，Zilliz Cloud 会自动创建 16 个 Partition，并根据该字段的值将插入的 Entity 分布到这 16 个 Partition 中。一旦为 Collection 启用了 Partition Key，就无法再手动创建 Partition。详情请见[使用 Partition Key](./use-partition-key)。

<Admonition type="info" icon="📘" title="说明">

<p>在决定使用 Partition 还是 Partition Key 时，你可以根据以下因素进行权衡：</p>
<ul>
<li><p><strong>多租户策略</strong>：如果需要支持百万级租户，建议使用 Partition Key；如果需要在租户之间实现强物理隔离，建议使用 Partition。详情请见<a href="./multi-tenancy">多租户策略</a>。</p></li>
<li><p><strong>资源管理方式</strong>：如果希望自行创建和管理 Partition，可选择使用 Partition；如果希望系统自动创建和管理 Partition，建议使用 Partition Key。</p></li>
<li><p><strong>冷热数据管理</strong>：如果需要高效管理冷热数据，建议使用 Partition key。需要在 Dedicated 集群中使用 Parition key 进行冷热数据管理，请<a href="http://support.zilliz.com.cn">联系我们</a>。</p></li>
</ul>

</Admonition>

### mmap{#mmap}

内存映射（Mmap）是一种内存使用优化机制，可在不将大文件加载至内存的情况下，直接访问磁盘上的数据文件。启用 mmap 后，您可以在相同 CU 规格下存储更多数据。Zilliz Cloud 会根据您的集群 CU 类型和版本，默认配置推荐的 mmap 设置：

- Free、Serverless 以及存储扩展型 CU 的 Dedicated 集群：mmap 默认启用且不可更改，因此在创建 Collection 时你无法看到 Mmap 的配置选项。

- 性能型 CU 的 Dedicated 集群：mmap 默认关闭。

- 容量型 CU 的 Dedicated 集群：mmap 默认启用。

在创建 Collection 时，您可以根据实际需求，在 Collection 或字段级别配置 mmap 设置。较低级别的设置将覆盖较高级别的设置，优先级如下：字段 &gt; Collection &gt; 集群

- **Collection 级别 mmap：**针对 Collection 中的原始数据开启 mmap。该设置适用于整个 Collection，可后续修改。若需修改 Collection 级别的 mmap 设置，需先释放 Collection。

- **字段级别 mmap**：通过自定义设置针对选定字段的原始数据和 Index 开启 mmap。一般建议对数据量大、且不频繁用于查询或过滤的字段开启 mmap。该设置仅影响所选字段，可后续修改。若需修改字段级别的 mmap 设置，需先释放 Collection。

<Admonition type="info" icon="📘" title="说明">

<p>请谨慎调整 mmap 设置。修改默认配置可能导致性能下降，或因内存不足（OOM）而导致加载失败。最佳实践请见<a href="./use-mmap">使用 mmap</a>。</p>

</Admonition>

以下 Demo 展示如何设置 mmap 功能。

### Shard{#shard}

Shard 是 Collection 的水平切片，对应一个数据写入通道。每个 Collection 默认包含一个 Shard。您可以通过增加 Shard 数量来提升写入吞吐量。

一般情况下，建议为每 1 亿行数据配置 1 个 Shard。Shard 的最大数量取决于您的集群版本和 CU 规格。详情请见 [使用限制](./limits#shards)。

Collection 创建后，Shard 数量无法直接修改，但可以通过[复制 Collection](./manage-collections-console#create-collection) 的方式重新设置 Shard 数量。

### Full Text Search{#full-text-search}

Zilliz Cloud Web 控制台支持设置 Full Text Search 中使用的 Analyzer 和 Function。详情请见 [Full Text Search](./full-text-search)。

以下 Demo 展示如何通过 Zilliz Cloud Web 控制台设置 Full Text Search。

### Text Match{#text-match}

Zilliz Cloud Web 控制台支持设置 Text Match 中使用的字段和 Analyzer。详情请见 [Text Match](./text-match)。

以下 Demo 展示如何通过 Zilliz Cloud Web 控制台设置 Text Match。

## 管理 Collection{#manage-collection}

Zilliz Cloud 支持通过 Web 控制台对已创建的 Collection 执行以下管理操作：

<Supademo id="cmauvqbcp02ztyg0istpzcq9w" title="管理 Collection" isShowcase="true" />

- **重命名 Collection：**可以修改现有 Collection 的名称。

- **编辑 Collection 的 Schema 和配置：**目前 Zilliz Cloud 支持修改以下 Schema 和设置：

    - 可编辑现有 [VARCHAR](./use-string-field) 字段的 `max_length` 值。

    - 可编辑现有 [ARRAY](./use-array-fields) 字段的 `max_capacity` 值，若 ARRAY 类型为 VARCHAR，还可编辑其 `max_length` 值。

    - 若需修改 Shard 设置，请使用[复制 Collection](./manage-collections-console#create-collection) 的功能。

    - 若需修改 TTL、mmap 或 partition Key 设置，请使用 SDK，详情请见[修改 Collection](./modify-collections)。

    其他 Schema 设置暂不支持编辑。如仍需修改，建议创建一个新的 Collection，并重新导入数据。

- **加载 / 释放 Collection：**在 Zilliz Cloud Web 控制台上，Collection 创建后会自动加载至内存，可立即用于搜索和查询。如需释放内存空间，可将不常用的 Collection 手动释放。

- **移动 Collection 到其他 Database：**可以将相关的 Collection 分组到同一个 Database 中，并根据需要在不同 Database 之间移动 Collection。

- **管理 Collection 中的 Partition**：对于**开启了 Partition Key** 的 Collection，无需手动管理 Partition；对于**未开启Partition Key** 的 Collection，您可以手动进行以下操作：

    - **创建 Partition**：每个 Collection 最多可创建 1,024 个 Partition。详情请见[使用限制](./limits#collections)。

    - **删除 Partition**：默认 Partition 不可删除。删除 Partition 会永久删除其中的数据，且删除前需先释放该 Collection。

- **查看 Collection Alias**：您可以通过 Collection列表页查看特定集群下所有 Collection 的 Alias。

- **删除 Collection：**若某个 Collection 已不再使用，您可以将其删除以释放资源。删除 Collection 的操作会永久清除其中的所有数据，操作不可撤销。

