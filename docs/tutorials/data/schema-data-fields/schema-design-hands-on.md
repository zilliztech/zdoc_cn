---
title: "Schema 设计指南 | Cloud"
slug: /schema-design-hands-on
sidebar_label: "设计指南"
beta: FALSE
notebook: FALSE
description: "信息检索系统 （IRS），也被称为搜索引擎，是各类 AI 应用的核心依赖，被广泛应用于检索增强生成（RAG）、图像搜索、产品推荐等场景中。开发一套 IRS 的第一步就是数据模型设计，涉及业务需求分析、确定信息组织方式以及为数据建立索引使其能够按语义进行查询。 | Cloud"
type: origin
token: AhYhwruK6impy5klHLdcs5Bfndh
sidebar_position: 15
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - schema design
  - schema 设计
  - hands-on
  - schema 设计指南

---

import Admonition from '@theme/Admonition';


# Schema 设计指南

信息检索系统 （IRS），也被称为搜索引擎，是各类 AI 应用的核心依赖，被广泛应用于检索增强生成（RAG）、图像搜索、产品推荐等场景中。开发一套 IRS 的第一步就是数据模型设计，涉及业务需求分析、确定信息组织方式以及为数据建立索引使其能够按语义进行查询。

Zilliz Cloud 支持通过 Collection 的 Schema 定义数据模型。Collection 是一个用于组织存放文本和图像等非结构化数据及其向量表示的容器，而各种精度的稠密和稀疏向量则常常用来进行语义查询。另外，Zilliz Cloud 还支持存放非向量数据，这些数据被统称为标量，具体的标量类型包括布尔值、数值（INT8、INT16、INT32、INT64、FLOAT、DOUBLE）、文本（VARCHAR）、JSON 以及数组（ARRAY）类等类型。

![UuB2bNwhJo3B0TxRxExcbm9anTI](/img/UuB2bNwhJo3B0TxRxExcbm9anTI.png)

搜索系统的数据模型设计通常涉及分析业务需求，并对相关信息进行抽象。举个例子，如果要对一段文本进行语义检索，首先需要对这段文本建立索引，并通过 Embedding 的方式将其转换成向量表示。除此之外，可能还需要把这段文本的诸如发表时间和作者这样的相关信息和这段文本及其向量表示存放在一起。这些信息通常被称为元数据，通过对元数据进行过滤的方式来优化向量检索的结果，比如希望在某个特定日期后或者来自某位作者的文本中进行语义搜索。您还可以根据业务需求，将这些字段包含在搜索结果中，提供给您的应用程序，以便为应用程序的用户呈现信息量更为丰富的内容。每段这样的文本还需要有个一个独一无二的标识，用来将一段文本和其它文本区别开来。上面提到的所有元素对于实现一个复杂的搜索逻辑来说是至关重要的。

通过对数据模型的抽象，好的 Schema 设计对于语义搜索来说十分重要，因为它决定了搜索结果是否能帮助业务达成目标。还需要注意的是，插入 Collection 的每条数据都要符合 Schema 的定义，这极大的保证了数据的一致性和长期质量。从技术角色来说，好的 Schema 设计会让您的数据以更加符合预期的方式存放，为这些数据创建的索引结构也会更加干净，从而提升搜索的效率和性能。

## 新闻搜索：一个例子{#an-example-news-search}

在本节中，我们会简单分析要打造一个新闻搜索应用需要做些什么。具体来说，我们需要创建了一个包含新闻文本、缩略图和其它元数据的语料库，并分析这些需要在搜索中使用的数据。假设您的需求是根据缩略图和内容概要来检索新闻，并在检索结果中包含诸如作者和发布时间等元数据，我们可以将这个需求分解成如下几个小需求：

- 如果要根据文本搜索图片，可以使用多模态嵌入模型将图片转换成对应的向量表示。这些模型可以将图片和文本映射到同一个嵌入空间中。

- 还需要使用文本嵌入模型将内容概要文本转换成对应的向量表示。

- 为了实现基于发布时间的过滤，还需要将这些数据存放到一个标量字段中，并对该标量字段建立索引，以提升检索效率。对于像数据结构比较复杂的 JSON 数据也可以存放在标量字段中并对其内容进行过滤和搜索。

- 为了方便在搜索结果展示页面上渲染缩略图，还需要有几个标量字段存放这些图片的 URL、文章的内容概要和文章的标题。如果有必要，您也可以为存放文章的原始文本和图片文件再创建几个标量字段。

- 为了提升对内容概要的搜索效果，Zilliz Cloud 还提供了混合搜索能力，能够对多路搜索结果进行混合重排。在本例中，您可以使用诸如 OpenAI 的 `text-embedding-3-large` 或开源的 `bge-large-en-v1.5` 这样的嵌入模型来为您的文本生成对应的稠密向量表示。然后再使用如 BM25 或 SPLADE 这样的嵌入模型为同样的数据生成对应的稀疏向量表示。

- 最后，我们还需要为每个新闻页面指定一个全局唯一的 ID ，称为主键。主键和上面提到的各类向量和标量字段共同组成一个 Entity，作为一条记录存放在 Collection 中。

<table>
   <tr>
     <th><p>字段名称</p></th>
     <th><p>article_id (主键)</p></th>
     <th><p>title</p></th>
     <th><p>author_info</p></th>
     <th><p>publish_ts</p></th>
     <th><p>image_url</p></th>
     <th><p>image_vector</p></th>
     <th><p>summary</p></th>
     <th><p>summary_dense_vector</p></th>
     <th><p>summary_sparse_vector</p></th>
   </tr>
   <tr>
     <td><p>字段类型</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
   </tr>
   <tr>
     <td><p>是否需要索引</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>

## 如何在 Milvus 中创建 Schema{#how-to-implement-the-example-schema}

通过上面的分析，我们初步完成了 Schema 的设计。在本节中，我们将在 Zilliz Cloud 中创建这个 Schema，并使用这个 Schema 创建一个 Collection。

### 创建 Schema{#create-schema}

首先，我们创建一个 Milvus Client 实例，用于连接 Zilliz Cloud 集群 并管理 Collection 及其中存放的数据。

要创建 Schema，需要调用 `create_schema()` 方法来创建一个 Schema 对象，然后使用 `add_field()` 方法向 Schema 对象中添加字段。

```python
from pymilvus import MilvusClient, DataType

collection_name = "my_collection"

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="TOKEN_OR_API_KEY"
)

schema = MilvusClient.create_schema(
    auto_id=False,
)

schema.add_field(field_name="article_id", datatype=DataType.INT64, is_primary=True, description="article id")
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=200, description="article title")
schema.add_field(field_name="author_info", datatype=DataType.JSON, description="author information")
schema.add_field(field_name="publish_ts", datatype=DataType.INT32, description="publish timestamp")
schema.add_field(field_name="image_url", datatype=DataType.VARCHAR,  max_length=500, description="image URL")
schema.add_field(field_name="image_vector", datatype=DataType.FLOAT_VECTOR, dim=768, description="image vector")
schema.add_field(field_name="summary", datatype=DataType.VARCHAR, max_length=1000, description="article summary")
schema.add_field(field_name="summary_dense_vector", datatype=DataType.FLOAT_VECTOR, dim=768, description="summary dense vector")
schema.add_field(field_name="summary_sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR, description="summary sparse vector")
```

您可能已经注意到声明 `MilvusClient` 实例中的 `uri` 参数。这个参数用于定义连接的 Zilliz Cloud 集群。您可以参考如下描述设置相关参数：

将 `uri` 设置为您的 Zilliz Cloud 集群的访问连接，将 `token` 设置为一个用半角冒号（:）连接的集群用户名和密码或者有相应集群访问权限的 API 密钥。

您还可以在创建 Schema 时可以指定其它参数，比如 `auto_id`。AutoID 是主键字段的属性，用来控制是否允许在插入数据时自动为插入的 Entity 分配主键值。以当前示例为例，我们的主键字段为 `article_id` 并且希望使用我们自己提供的主键值。因此，我们需要将 `article_id` 主键字段的 `auto_id` 属性设置为 `False`。

在将所有字段添加到 Schema 对象中后，Schema 对象就和我们在之前的表格中的设计完全一致了。

### 创建索引{#define-index}

在 Schema 中定义了包括存储元数据和向量数据的各类字段后，下一步就是确定索引参数了。创建索引对于优化搜索和向量召回来说十分关键，因为它确保了查询操作的性能和效率。在接下来的步骤中，我们将定义为指定的向量字段和标量字段定义索引参数。

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="image_vector",
    index_type="AUTOINDEX",
    metric_type="IP",
)
index_params.add_index(
    field_name="summary_dense_vector",
    index_type="AUTOINDEX",
    metric_type="IP",
)
index_params.add_index(
    field_name="summary_sparse_vector",
    index_type="AUTOINDEX",
    metric_type="IP",
)
index_params.add_index(
    field_name="publish_ts",
    index_type="AUTOINDEX",
)
```

在您参考上述代码完成索引参数的设置后， Zilliz Cloud 集群就会以优化后的方式来处理复杂的向量和标量查询。索引强化了相似性搜索的性能和准确性，从而实现高效的基于图片向量和内容概述向量的新闻搜索。在对所有需要索引的向量设置了 `AUTOINDEX` 索引类型后，Zilliz Cloud 能够快速识别并返回与查询向量相关的结果，整体提升数据检索过程和用户体验。

Zilliz Cloud 使用 AUTOINDEX 作为唯一的索引类型，但提供多种相似度类型。更多信息，可以参考 [AUTOINDEX](./autoindex-explained) and [相似度类型](./search-metrics-explained).。

### 创建 Collection{#create-collection}

在有了 Schema 和索引之后，我们就可以使用这些参数来创建 Collection。Zilliz Cloud 集群中的 Collection 就像关系型数据库中的表一样。

```python
client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
```

在创建完成后，我们可以使用查看 Collection 详情的方式验证该 Collection。

```python
collection_desc = client.describe_collection(
    collection_name=collection_name
)
print(collection_desc)
```

## 其它需要考虑的问题{#other-considerations}

### 加载索引{#loading-index}

在 Zilliz Cloud 集群 中创建 Collection 时，您可以选择在完成 Collection 创建时立即加载索引或者将加载操作放到批量导入数据之后。基本上你无须对此做出明确的选择。就像我们在上述代码中展示的那样，索引会在您插入数据时自动构建，从而让这些刚插入的数据也参与查询。但是，如果在插入大批量数据后不需要立即对它们进行查询，您也可以通过在创建 Collection 时省略索引参数的方式将索引创建放到插入所有数据后再来完成。这对于一个用于存放大量数据的 Collection 来说更有效率。当前，在执行任何搜索前，您需要使用 `load()` 方法将 Collection 的索引加载到内存。

### 如何为多租户场景定义数据模型{#how-to-define-data-model-for-multi-tenancy}

所谓多租户，通常是指使用一套软件或服务为多个独立的用户或组织提供相互独立的工作环境。这在云计算、软件及服务（SaaS）应用及数据库系统中比较常见。举例来说，云存储服务可能会使用多租户系统允许不同的企业在同一套下层基础设施之上各自存放和管理它们的数据。这种方式在保证数据安全和各租户隐私的前提下将资源利用率和使用效率都最大化了。

区分各租户最简便的方式就是将各自的数据和资源与其它租户隔离开来。每个租户对某些资源有独占访问权限，并和其它租户共享 Zilliz Cloud 数据库、Collection 和 Partition 等对象的管理能力。您可以在不同的对象层面实现多租户方案，具体可以参考 [Milvus 多租户](https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies)这篇文章。