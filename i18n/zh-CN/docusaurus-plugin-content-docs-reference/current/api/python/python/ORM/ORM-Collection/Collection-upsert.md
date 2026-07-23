---
title: "upsert() | Python | ORM"
slug: /python/python/Collection-upsert
sidebar_label: "upsert()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会向数据库插入新记录或更新现有记录。| Python | ORM"
type: docx
token: AQ1ydMXbOog5VJxITgUc4GFvnVe
sidebar_position: 28
keywords: 
  - 稀疏 vector
  - Vector 维度
  - ANN Search
  - 什么是 vector embeddings
  - zilliz
  - Zilliz Cloud
  - 云
  - upsert()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# upsert()

此操作会向数据库插入新记录或更新现有记录。  

<Admonition type="info" icon="📘" title="注意">

upsert 是一种数据级操作：如果指定字段已存在于 collection 中，则会覆盖现有 entity；如果指定值尚不存在，则会插入新的 entity。

</Admonition>

## 请求语法\{#request-syntax}

```python
upsert(
    data: List | pandas.DataFrame | Dict, 
    partition_name: str | None, 
    timeout: float, 
)
```

**参数：**

- **data** (*list* | *dict* | *pandas.DataFrame*) -

    **[必需]**

    要插入当前 collection 的数据。

    要插入的数据应与当前 collection 的 schema 匹配。你可以将数据组织为：

    - 列表形式的列

        每一列都是该列中所有 entity 的值列表。

        ```python
        data = [
            [0,1,2,3,4],                         # id
            [                                    # vector
                [0.1,0.2,-0.3,-0.4,0.5],
                [0.3,-0.1,-0.2,-0.6,0.7],
                [-0.6,-0.3,0.2,0.8,0.7],
                [0.6,0.2,-0.3,-0.8,0.5],
                [0.3,0.1,-0.2,-0.6,-0.7],
            ],
        ]
        ```

    - 一个 **pandas.DataFrame**

        你可以通过任意方式构造 data frame，如[此页面](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)的 **Example** 部分所示。

        ```python
        data = pd.DataFrame({
            "id": [5,6,7,8,9],
            "vector": [
                [0.1,0.2,-0.3,-0.4,0.5],
                [0.3,-0.1,-0.2,-0.6,0.7],
                [-0.6,-0.3,0.2,0.8,0.7],
                [0.6,0.2,-0.3,-0.8,0.5],
                [0.3,0.1,-0.2,-0.6,-0.7],
            ]
        })
        ```

    - 行列表或单行

        每一行都是一个表示 entity 的字典。

        ```python
        data = [
            {"id": 10, "vector": [0.1,0.2,-0.3,-0.4,0.5]},
            {"id": 11, "vector": [0.3,-0.1,-0.2,-0.6,0.7]},
            {"id": 12, "vector": [-0.6,-0.3,0.2,0.8,0.7]},
            {"id": 13, "vector": [0.6,0.2,-0.3,-0.8,0.5]},
            {"id": 14, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
        ]
        
        # or 
        
        data = {"id": 15, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
        ```

- **partition_name** (*string* | *None*) -

    当前 collection 中某个 partition 的名称。 

    如果指定，则数据将插入到指定 partition 中。

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示当任何响应到达或发生任何错误时，此操作即超时。

**返回类型：**

*MutationResult*

**返回：**

一个 **MutationResult** 对象，包含以下字段：

- **insert_count** (*int*)

    插入的 entity 数量。

- **delete_count** (*int*)

    删除的 entity 数量。

- **upsert_count** (*int*)

    upsert 的 entity 数量。

- **succ_count** (*int*)

    此操作期间成功执行的次数。

- **succ_index** (*list*)

    从 0 开始的索引编号列表，每个编号表示一次成功的操作。

- **err_count** (*int*)

    此操作期间执行失败的次数。

- **err_index** (*list*)

    从 0 开始的索引编号列表，每个编号表示一次失败的操作。

- **primary_keys** (*list*)

    已插入 entity 的 primary key 列表。

- **timestamp** (*int*)

    此操作完成时的时间戳。

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Upsert a list of columns
res = collection.upsert(
    data=[
        [0,1,2,3,4],                         # id
        [                                    # vector
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ],
    ]
)

# Upsert a data frame
import pandas as pd

res = collection.upsert(
    data=pd.DataFrame({
        "id": [5,6,7,8,9],
        "vector": [
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ]
    })
)

# Upsert a list of dictionaries
res = collection.upsert(
    data=[
        {"id": 10, "vector": [0.1,0.2,-0.3,-0.4,0.5]},
        {"id": 11, "vector": [0.3,-0.1,-0.2,-0.6,0.7]},
        {"id": 12, "vector": [-0.6,-0.3,0.2,0.8,0.7]},
        {"id": 13, "vector": [0.6,0.2,-0.3,-0.8,0.5]},
        {"id": 14, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
    ]
)

# Upsert a dictionary
res = collection.upsert(
    data={"id": 16, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
)
```

## 相关操作\{#related-operations}

以下操作与 `insert()` 相关：

- [delete()](./Collection-delete)

- [insert()](./Collection-insert)

- [search()](./Collection-search)

- [search_iterator()](./Collection-search_iterator)

- [query()](./Collection-query)

- [query_iterator()](./Collection-query_iterator)

