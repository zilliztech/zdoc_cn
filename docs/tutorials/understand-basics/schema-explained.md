---
slug: /schema-explained
beta: FALSE
notebook: FALSE
type: origin
token: ZgcQw57PxiKaeSkuQmCchK8snP0
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# Schema

定义 Schema 是指为数据库中数据创建一个清晰有序的数据结构。Schema 可以揭示和解列数据之间的关系。因此，定义 Schema 是为了了解数据集中的所有数据，展示数据间联系，从而用最有效的方式表示数据关系。

## 定义 Schema{#defining-a-data-schema}

在 Zilliz Cloud 集群中，不同 Collection 的 Schema 可能不同。正确定义数据模型以表示数据集的结构十分重要。定义数据模型时，您需要考虑以下几个方面：

- **Entity**

    Collection 中的 Entity 类似于传统数据库表格中的行。Entity 的每个属性对应传统数据库表格中的列。向 Collection 插入数据前，请先观察 Entity 之间共享的属性。

    例如， 您可以将书可以作为 Collection 中的 Entity，书的属性可以包括标题、作者、ISBN 和语言。

- **数据类型**

    Entity 的每个属性都有自己的数据类型。设置合适的数据类型以定义属性。

    例如，标题的数据类型应为**可变长度字符串（VarChar）**。

- **Entity 属性值限制**

    不同的数据类型可能带有不同的限制。例如，向量字段对向量维数有限制、VarChar字段对字符的最大长度有限制。

您需要花费一些时间来定义 Collection 的数据模型。当需要定义的数据属性特别多时，你需要花费的时间可能更多。因此，Zilliz Cloud 集群提供了动态和静态数据模型以满足您的不同需求。

### 动态数据列{#dynamic-data-fields}

1 个 Collection 可拥有 1 个主键字段和 1 个向量字段。您可以在待插入数据中包含动态数据列，无需手动定义数据集中的 Entity 属性。简单来说，在创建 Collection 时输入 Collection 名称和向量维数，Zilliz Cloud 会自动根据后续插入的数据推断哪些数据将以键值对的形式存入名为 **$meta** 的保留字段中。

以下示例代码片段创建了 1 个名为 **medium_articles** 的 Collection，且为该 Collection 开启了动态数据列。

```python
# Connect using a MilvusClient object
from pymilvus import MilvusClient

CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" # Set your cluster endpoint
TOKEN="YOUR_CLUSTER_TOKEN" # Set your token

# Initialize a MilvusClient instance
# Replace uri and API key with your own
client = MilvusClient(
    uri=CLUSTER_ENDPOINT, # Cluster endpoint obtained from the console
    token=TOKEN # API key or a colon-separated cluster username and password
)

# Create a collection
client.create_collection(
    collection_name="medium_articles",
    dimension=768
)
```

当您将 Entity 插入 Collection 时，Zilliz Cloud 将自动解析数据并将 Schema 中未定义的字段（也就是除了** id** 和 **vector** 字段以外的其它字段）以键值对的形式存入一个名为 **$meta** 的保留字段。

```python
client.insert(
    collection_name="medium_articles",
    data: {
        "id": 0,
        "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
        "vector": [0.041732933, 0.013779674, ...., -0.013061441],
        "link": "<https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912>",
        "reading_time": 13,
        "publication": "The Startup",
        "claps": 1100,
        "responses": 18
    }
)
```

<Admonition type="info" icon="📘" title="说明">

<p>开启动态数据列可以帮助您灵活应对 Collection Schema 的变更诉求。建议您在创建 Collection 时，同步开启动态数据列。仅在如下情况下，不推荐使用动态数据列</p>
<ul>
<li><p>待插入数据各字段名称中包含特殊字符或转义字符。</p></li>
<li><p>追求极致的过滤效率。</p></li>
</ul>

</Admonition>

### 静态数据列{#fixed-data-modeling}

使用静态数据列可以确保数据准确，提高搜索结果可靠性。您可以执行以下操作以使用静态数据模型创建 Collection Schema：

```python
from pymilvus import FieldSchema, CollectionSchema, DataType, Collection

fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
    FieldSchema(name="link", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="reading_time", dtype=DataType.INT64),
    FieldSchema(name="publication", dtype=DataType.VARCHAR, max_length=512),
    FieldSchema(name="claps", dtype=DataType.INT64),
    FieldSchema(name="responses", dtype=DataType.INT64)
]

# 创建 Schema
schema = CollectionSchema(
    fields,
    description="Schema of Medium articles"
)

collection = Collection(
    name="medium_articles",
    description="Medium articles published between Jan and August in 2020 in prominent publications",
    schema=schema
)
```

## 数据类型{#data-types}

Zilliz Cloud 支持以下数据类型：

- 布尔值（BOOLEAN）

- 双精度浮点数（DOUBLE）

- 单精度浮点数（FLOAT）

- 浮点向量（FLOAT_VECTOR）

- 8 位有符号整数（INT8）

- 32 位有符号整（INT32）

- 64 位有符号整（INT64）

- 可变长度字符串（VARCHAR）

- [JSON](./javascript-object-notation-json)

## 文档推荐{#whats-next}

- [开启动态 Schema](./enable-dynamic-schema)

- [JSON](./javascript-object-notation-json) 

