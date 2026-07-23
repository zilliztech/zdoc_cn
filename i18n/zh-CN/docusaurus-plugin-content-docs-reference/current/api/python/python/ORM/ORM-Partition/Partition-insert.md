---
title: "insert() | Python | ORM"
slug: /python/python/Partition-insert
sidebar_label: "insert()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将数据插入当前 partition。 | Python | ORM"
type: docx
token: QXDxdv36FoVgjcxDV1gcDwWXnsd
sidebar_position: 5
keywords: 
  - LLM 评测
  - Sparse vs Dense
  - Dense vector
  - 分层可导航小世界
  - zilliz
  - Zilliz Cloud
  - cloud
  - insert()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# insert()

此操作将数据插入当前 partition。

<Admonition type="info" icon="📘" title="说明">

在 **[Collection](./ORM-Collection)** 对象的 **insert()** 方法中使用 **partition_name** 参数，等同于使用 **[Partition](./ORM-Partition)** 对象的 **insert()** 方法。

</Admonition>

## 请求语法\{#request-syntax}

```python
insert(
    data: List | pandas.DataFrame | Dict, 
    timeout: float | None
)
```

**参数：**

- **data** (*list* | *dict* | *pandas.DataFrame*) -

    **[必需]**

    要插入当前 collection 的数据。

    要插入的数据应与当前 collection 的 schema 匹配。你可以将数据组织为：

    - 列列表

        每一列都是该列中各个实体值的列表。

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

        你可以通过任意方式构建数据帧，如[此页面](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)的 **Example** 部分所示。

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

        每一行都是表示一个实体的字典。

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

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*MutationResult*

**返回：**

一个包含以下字段的 **MutationResult** 对象：

- **insert_count** (*int*)

    已插入实体的数量。

- **primary_keys** (*list*)

    已插入实体的主键列表。

**异常：**

- 一个包含以下字段的 **MutationResult** 对象：

    - **insert_count** (*int*)

        已插入实体的数量。

    - **delete_count** (*int*)

        已删除实体的数量。

    - **upsert_count** (*int*)

        已 upsert 实体的数量。

    - **succ_count** (*int*)

        此操作期间成功执行的次数。

    - **succ_index** (*list*)

        从 0 开始的索引编号列表，每个编号表示一次成功的操作。

    - **err_count** (*int*)

        此操作期间执行失败的次数。

    - **err_index** (*list*)

        从 0 开始的索引编号列表，每个编号表示一次失败的操作。

    - **primary_keys** (*list*)

        已插入实体的主键列表。

    - **timestamp** (*int*)

        此操作完成时的时间戳。

## 示例\{#examples}

```python
from pymilvus import Collection, Partition, FieldSchema, CollectionSchema, DataType

# Define collection schema    
schema = CollectionSchema([
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
])

# Get an existing collection
collection = Collection("test_partition_insert", schema)

# Get an existing partition in the current collection
partition = Partition(collection, "comedy", "comedy films")

# Prepare the data to insert
data = [
    [i for i in range(10)],
    [[float(i) for i in range(2)] for _ in range(10)]
]

# Insert data
res = partition.insert(data)

# Return the count of inserted entities
res.insert_count
10
```

## 相关操作\{#related-operations}

以下操作与 `insert()` 相关：

- [delete()](./Partition-delete)

- [flush()](./Partition-flush)

- [query()](./Partition-query)

- [search()](./Partition-search)

- [upsert()](./Partition-upsert)

