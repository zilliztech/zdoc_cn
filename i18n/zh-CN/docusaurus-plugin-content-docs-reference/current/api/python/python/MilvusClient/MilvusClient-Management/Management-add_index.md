---
title: "add_index() | Python | MilvusClient"
slug: /python/python/Management-add_index
sidebar_label: "add_index()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为 collection 中的特定字段添加 index 参数。 | Python | MilvusClient"
type: docx
token: SM7ld0ZsEoYLqaxVMZxcSH82n9f
sidebar_position: 1
keywords: 
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - add_index()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# add_index()

此操作为 collection 中的特定字段添加 index 参数。

<Admonition type="info" icon="📘" title="Notes">

此方法仅适用于 dedicated serving clusters 和 on-demand compute。

- 对于 serving cluster 的 collection 中的此操作，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于 on-demand compute 的 collection 中的此操作，请使用 project endpoints 创建 **[MilvusClient](./Client-MilvusClient)**，然后创建一个 session 以附加到 on-demand cluster 进行搜索。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
IndexParams.add_index(
    field_name: str,
    index_type: str,
    index_name: str,
    metric_type: str,
    params: dict
) -> None
```

**参数：**

- **field_name** (*str*) -

    要应用此对象的目标字段名称。

- **index_name** (*str*) -

    应用此对象后生成的 index 文件名称。

- **index_type** (*str*) -

    用于排列特定字段中数据的算法名称。在 Zilliz Cloud 上，index 类型始终为 **AUTOINDEX**。有关详细信息，请参阅 [AUTOINDEX](/docs/autoindex-explained) 说明。

- **metric_type** (*str*) -

    用于衡量 vector 之间相似性的算法。可能的值：`IP`、`L2`、`COSINE`、`HAMMING`、`JACCARD`、`BM25`（仅用于全文搜索）。有关更多信息，请参阅 [Metric Types](https://milvus.io/docs/metric.md)。

    仅当指定字段为 vector 字段时可用。

- **params** (*dict*) -

    指定 index 类型的微调参数。有关可能的键和值范围的详细信息，请参阅 [In-memory Index](https://milvus.io/docs/index.md)。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import MilvusClient, DataType

# 1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=False,
)

# 2. Add fields to schema
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)

# {
#     'auto_id': False, 
#     'description': '', 
#     'fields': [
#         {
#             'name': 'my_id', 
#             'description': '', 
#             'type': <DataType.INT64: 5>, 
#             'is_primary': True, 
#             'auto_id': False
#         }
#     ]
# }

schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# {
#     'auto_id': False, 
#     'description': '', 
#     'fields': [
#         {
#             'name': 'my_id', 
#             'description': '', 
#             'type': <DataType.INT64: 5>, 
#             'is_primary': True, 
#             'auto_id': False
#         }, 
#         {
#             'name': 'my_vector', 
#             'description': '', 
#             'type': <DataType.FLOAT_VECTOR: 101>, 
#             'params': {
#                 'dim': 5
#             }
#         }        
#     ]
# }

# 3. Create index parameters
index_params = client.prepare_index_params()

# 4. Add indexes
# - For a scalar field
index_params.add_index(
    field_name="my_id",
    index_type="STL_SORT"
)

# - For a vector field
index_params.add_index(
    field_name="my_vector", 
    index_type="AUTOINDEX",
    metric_type="L2",
    params={"nlist": 1024}
)
```

## 相关方法\{#related-methods}

- [create_index()](./Management-create_index)

- [describe_index()](./Management-describe_index)

- [drop_index()](./Management-drop_index)

- [list_indexes()](./Management-list_indexes)

- [prepare_index_params()](./Management-prepare_index_params)

