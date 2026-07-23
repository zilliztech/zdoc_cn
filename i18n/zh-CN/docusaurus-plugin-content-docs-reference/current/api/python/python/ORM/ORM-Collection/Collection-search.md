---
title: "search() | Python | ORM"
slug: /python/python/Collection-search
sidebar_label: "search()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作执行向量相似性搜索，并可选择使用标量过滤表达式。 | Python | ORM"
type: docx
token: OaM5dkbPjohKhNxHvKNcfnYMnVb
sidebar_position: 25
keywords: 
  - 向量检索
  - 音频相似性搜索
  - 弹性向量数据库
  - Pinecone 与 Milvus 对比
  - zilliz
  - zilliz cloud
  - cloud
  - search()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# search()

此操作执行向量相似性搜索，并可选择使用标量过滤表达式。

## 请求语法\{#request-syntax}

```python
search(
    data: list[list[float]],
    anns_field: str,
    param: dict,
    limit: int
    expr: str | None,
    partition_names: list[str] | None,
    output_fields: list[str] | None,
    timeout: float | None,
    round_decimal: int,
    search_aggregation: Optional[SearchAggregation] = None
)
```

**参数：**

- **data** (*list[list[float]]*) - 

    **[必需]**

    向量嵌入列表。

    Zilliz Cloud 会搜索与指定向量嵌入最相似的向量嵌入。

- **anns_field** (str) -

    **[必需]**

    当前集合中向量字段的名称

- **param** (dict) -

    **[必需]**

    此操作特定的参数设置。

    - **metric_type** (*str*) -

        应用于此操作的度量类型。它应与为上面指定的向量字段创建索引时使用的度量类型相同。 

        可能的值为 **L2**、**IP** 和 **COSINE**。

    - **params** (dict) -

        其他参数

        - **offset** (int) -

            搜索结果中要跳过的记录数。 

            你可以将此参数与 `limit` 结合使用以启用分页。

            此值与 `limit` 的总和应小于 16,384。 

        - **radius** (float) -

            确定最低相似度阈值。当将 `metric_type` 设置为 `L2` 时，请确保此值大于 **range_filter** 的值。否则，此值应小于 **range_filter** 的值。 

        - **range_filter**  (float) -  

            将搜索细化到特定相似度范围内的向量。当将 `metric_type` 设置为 `IP` 或 `COSINE` 时，请确保此值大于 **radius** 的值。否则，此值应小于 **radius** 的值。

    有关其他适用搜索参数的详细信息，请阅读 [AUTOINDEX 详解](/docs/autoindex-explained) 了解更多。

- **limit** (*int*) -

    要返回的实体总数。

    你可以将此参数与 **param** 中的 `offset` 结合使用以启用分页。

    此值与 **param** 中 `offset` 的总和应小于 16,384。 

- **expr** (*str*) -

    用于过滤匹配实体的标量过滤条件。

    该值默认为 **None**，表示忽略标量过滤。要构建标量过滤条件，请参考 [布尔表达式规则](https://milvus.io/docs/boolean.md)。

- **output_fields** (*list*) -

    要包含在每个返回实体中的字段名称列表。

    该值默认为 **None**。如果未指定，则仅包含主键字段。

- **partition_names** (*list*) -

    分区名称列表。

    该值默认为 **None**。如果指定，则只有指定的分区会参与查询。

- **timeout** (*float*)  -

    此操作的超时时长。将其设置为 **None** 表示此操作会在任何响应到达或发生任何错误时超时。

- **round_decimal** (*int*) -

    Zilliz Cloud 对计算出的距离进行四舍五入时保留的小数位数。

    该值默认为 **-1**，表示 Zilliz Cloud 跳过对计算出的距离进行四舍五入，并返回原始值。

- **search_aggregation** (*Optional[SearchAggregation]*) -

    分层分桶聚合规范。与 **group_by_field** 互斥。设置后，将忽略 **limit**，并由根级 `SearchAggregation.size` 控制顶层分桶数量。

- **consistency_level** (*str*) -

    Milvus 在指定集合中搜索时使用的一致性级别。

    如果未指定此参数，则将使用创建集合时指定的一致性级别。指定此参数将覆盖创建集合时指定的一致性级别。

    可能的值为 **Strong**、**Bounded**、**Eventually**、**Session** 和 **Customized**。

- **page_retain_order** (*bool*) -

    当提供 `offset` 时，是否保留搜索结果的顺序。

- **guarantee_timestamp** (*int*) -

    Milvus 在搜索期间用作参考的时间戳。

    如果未指定此参数，Milvus 将在所有已刷新的实体中搜索。设置此值会使 Milvus 在指定时间戳之前已刷新的实体中搜索。

- **graceful_time** (*int*) -

    搜索的宽限期，单位为秒。

    设置此值会使 Milvus 在指定秒数之前已刷新的实体中搜索。

**返回类型：**

*SearchResult*

**返回：**

一个包含 **Hits** 对象列表的 **SearchResult** 对象。 

- 响应结构

    <Admonition type="info" icon="📘" title="Notes">

    一个 **SearchResult** 对象包含一个 **Hits** 对象列表，每个 **Hits** 对象对应搜索请求中的一个查询向量。 
    
    一个 **Hits** 对象包含一个 **Hit** 对象列表，每个 **Hit** 对象对应一个被搜索命中的实体。

    </Admonition>

    ```plaintext
    ├── SearchResult
    │   └── Hits  
    │       ├── ids
    │       ├── distances
    │       └── Hit
    │           ├── id
    │           ├── distance
    │           ├── score
    │           ├── vector
    │           └── get()
    ```

- 属性和方法

    - **Hits** 对象包含以下字段：

        - **ids** (*list[int]* | *list[str]*)

            包含命中实体 ID 的列表。

        - **distances** (list[float]) 

            命中实体的向量字段到查询向量的距离列表。

    - **Hit** 对象包含以下字段：

        - **id** (*int* | *str*)

            命中实体的 ID。

        - **distance** (*float*)

            命中实体的向量字段到查询向量的距离。

        - **score** (*float*)

            **distance** 的别名。

        - **vector** (*list[float]*)   

            命中实体的向量字段。

        - **get(*field_name: str*)**

            用于获取命中实体中指定字段值的函数。 

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将引发此异常。

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

# Insert a list of columns
res = collection.insert(
    data=[
        [0,1,2,3,4,5,6,7,8,9],               # id
        [                                    # vector
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ],
    ]
)

BATCH_SIZE = 2
LIMIT = 10

param = {
    "metric_type": "COSINE",
    "params": {
        "nprobe": 1024,
        "radius": 0.2,
        "range_filter": 1.0
    }
}

# Create a search request
res = collection.search(
    data=[[0.1,0.2,-0.3,-0.4,0.5]],
    anns_field="vector",
    param=param,
    batch_size=BATCH_SIZE,
    limit=LIMIT,
    expr="id > 3",
    output_fields=["id", "vector"]
)

for hits in res:
    # Get ids
    hits.ids
    
    # Get distances
    hits.distances
    
    for hit in hits:
        # Get id
        hit.id
        
        # Get distance
        hit.distance # hit.score
        
        # Get vector
        hit.vector
        
        # Get output field
        hit.get("vector")
        
```

## 相关操作\{#related-operations}

- [delete()](./Collection-delete)

- [insert()](./Collection-insert)

- [search_iterator()](./Collection-search_iterator)

- [query()](./Collection-query)

- [query_iterator()](./Collection-query_iterator)

- [upsert()](./Collection-upsert)

