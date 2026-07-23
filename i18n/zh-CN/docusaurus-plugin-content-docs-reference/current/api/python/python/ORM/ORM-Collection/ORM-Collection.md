---
title: "Collection | Python | ORM"
slug: /python/python/ORM-Collection
sidebar_label: "Collection"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "Collection 实例表示一个 Milvus 集合。| Python | ORM"
type: docx
token: OSehdj15Ao3AUvxOIJucXzU8nWW
sidebar_position: 1
keywords: 
  - DiskANN
  - 稀疏向量
  - 向量维度
  - ANN 搜索
  - zilliz
  - zilliz cloud
  - cloud
  - Collection
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# Collection

**Collection** 实例表示一个 Milvus 集合。

```python
class pymilvus.Collection
```

## 构造函数\{#constructor}

通过名称、schema 和其他参数构造一个集合。

```python
Collection(
    name: str,
    schema: CollectionSchema,
    using: str
) 
```

**参数：**

- **name** (*string*) - 

    **[必需]**

    要创建的集合的名称。

- **schema** (*[CollectionSchema](./ORM-CollectionSchema)*) - 

    用于创建集合的 schema。 

    默认值为 **None**，表示使用默认 schema。

    <Admonition type="info" icon="📘" title="Note">

    什么是 schema？
    
        schema 负责组织目标集合中的数据。有效的 schema 应具有多个字段，其中必须包括一个主键、一个向量字段和若干标量字段。

    </Admonition>

- **using** (*string*) - 

    所使用连接的别名。

    默认值为 **default**，表示此操作使用默认连接。

- **num_shards** (*int*) -

    随此集合的创建而创建的分片数量。 

    该值默认为 **1**，表示随此集合一起创建一个分片。

    <Admonition type="info" icon="📘" title="Note">

    什么是分片机制？
    
        分片是指将写入操作分发到不同节点，以充分利用 Milvus 集群在写入数据时的并行计算潜力。
    
        默认情况下，一个集合包含一个分片。

    </Admonition>

- **consistency_level** (*int* | *str*)

    目标集合的一致性级别。

    该值默认为 **Bounded**（**1**），可选项包括 **Strong**（**0**）、**Bounded**（**1**）、**Session**（**2**）和 **Eventually**（**3**）。

    <Admonition type="info" icon="📘" title="Note">

    什么是一致性级别？
    
        分布式数据库中的一致性特指在给定时间写入或读取数据时，确保每个节点或副本都具有相同数据视图的属性。
    
        Zilliz Cloud 提供三种一致性级别：**Strong**、**Bounded Staleness** 和 **Eventually**，默认设置为 **Bounded Staleness**。
    
        在执行向量相似性搜索或查询时，你可以轻松调整一致性级别，使其最适合你的应用。

    </Admonition>

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*Collection*

**返回：**

一个集合对象。

**异常：**

- **SchemaNotReadyException**

    当提供的 schema 无效时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

# Create a collection using the user-defined schema
primary_key = FieldSchema(
    name="id",
    dtype=DataType.INT64,
    is_primary=True,
)

vector = FieldSchema(
    name="vector",
    dtype=DataType.FLOAT_VECTOR,
    dim=768,
)

schema = CollectionSchema(
    fields = [primary_key, vector]
)

collection = Collection(
    name="test_01",
    schema=schema,
    using="default"
)
```

## 成员\{#members}

以下是 `Collection` 类的成员：

