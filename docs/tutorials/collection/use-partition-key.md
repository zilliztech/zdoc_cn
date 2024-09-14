---
title: "使用 Partition Key | Cloud"
slug: /use-partition-key
sidebar_label: "使用 Partition Key"
beta: PUBLIC
notebook: FALSE
description: "本指南将指导您使用 Partition Key 来加快从 Collection 中检索数据的速度。 | Cloud"
type: origin
token: DrXpwhU8pixYi9kqzSBcs5TgnFd
sidebar_position: 17
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - partition key

---

import Admonition from '@theme/Admonition';


# 使用 Partition Key

本指南将指导您使用 Partition Key 来加快从 Collection 中检索数据的速度。

## Partition Key{#partition-key}

您可以将 Collection 的特定字段设置为 Partition Key。这样，Zilliz Cloud 将根据此字段中各自值的哈希值，将传入r Entity 分配到不同的 Partition 中。

您可以在 Collection Schema 中设置 Partition Key 的名称。

```python
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
    # highlight-start
    partition_key_field="id", # An existing scalar field
    num_partitions=16 # Number of partitions. Defaults to 16.
    # highlight-end
)
```

也可以在向 Schema 中添加字段时设置 Partition Key。

```python
schema.add_field(
    field_name="id",
    datatype=DataType.VARCHAR,
    max_length=512,
    # highlight-next-line
    is_partition_key=True
)
```

在使用上述 Schema 创建了一个 Collection、为向量字段建立索引并加载了 Collection 后，就可以使用包含 Partition Key的过滤条件进行搜索。这样，Zilliz Cloud 就会将搜索范围缩小到只包含与过滤条件中的 Partition Key 值相匹配的 Entity 所在 Partition，从而避免扫描不相关的 Partition，提高搜索性能。

![MttsbAuxIoyxVbxO1EEc7WeAnnc](/img/MttsbAuxIoyxVbxO1EEc7WeAnnc.png)

您可以在过滤条件中包含一个或多个 Partition Key，如下所示：

```python
# Filter based on a single partition key value
filter='partition_key == "x" && <other conditions>'

# Filter based on multiple partition key values
filter='partition_key in ["x", "y", "z"] && <other conditions>'
```

## Partition-key Isolation{#partition-key-isolation}

<Admonition type="info" icon="📘" title="说明">

<p>目前，Partition-key Isolation 功能处于公测阶段，仅适用于性能性 Dedicated 集群。如果您有兴趣使用该功能，请<a href="https://support.zilliz.com/hc/en-us">联系我们</a>。</p>

</Admonition>

如果您使用的过滤条件只涉及 Partition Key，可以考虑启用 Partition-key Isolation 功能，从而进一步缩小搜索范围，提升搜索效率。具体来说，可以使用以下方法之一启用该功能。

```python
# Add properties while creating the collection
client.create_collection(
    collection_name="test_collection",
    schema=schema,
    index_params=index_params,
    # highlight-next-line
    properties={"partitionkey.isolation": "true"}
)

# Or modify the collection with the ORM set_properties API
# highlight-next-line
collection.set_properties({"partitionkey.isolation": "true"})
```

在上述创建或修改的 Collection 中启用此功能并在向量字段上创建索引后，Zilliz Cloud 将为每一组具有唯一 Partition Key 值的实体在向量字段上生成索引文件。

当收到带有涉及 Partition Key 的过滤条件的搜索请求时，Zilliz Cloud 会进一步将搜索范围缩小到包含过滤条件中指定的 Partition Key值的 Entity。

![ZnXxbljNUolBQLx1miwcCkYMn3f](/img/ZnXxbljNUolBQLx1miwcCkYMn3f.png)

需要注意的是，在 Collection 中启用 Partition-key Isolation 后，过滤条件中只能包含一个 Partition Key 值。

如果要使用 Partition Key 实现多租户能力，建议同时启用 Partition-key Isolation，原因如下：

- 缩短索引和加载时间

    使用 Partition-key Isolation，Zilliz Cloud 可创建和加载多个小索引文件，而不是一个大索引文件，从而缩短时间。

- 减少搜索延迟

    通过 Partition-key Isolation，Zilliz Cloud 可进一步将搜索范围缩小到某些实体，从而减少搜索延迟。

- 减少内存使用量

    由于索引文件较小，因此内存使用量减少。

<Admonition type="info" icon="📘" title="说明">

<p>如果 Collection 中唯一的 Partition Key 值的数量少于 Partition 的数量，上述优势可能不太明显。</p>

</Admonition>

有关所有可能的多租户策略，请参阅[多租户](https://milvus.io/docs/multi_tenancy.md)。