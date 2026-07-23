---
title: "describe() | Python | ORM"
slug: /python/python/Collection-describe
sidebar_label: "describe()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于描述当前 collection。 | Python | ORM"
type: docx
token: EZwsd887JojFjLxbMByckhW0nxg
sidebar_position: 7
keywords: 
  - ANN 搜索
  - 什么是 vector embeddings
  - vector database 教程
  - vector database 如何工作
  - zilliz
  - zilliz cloud
  - cloud
  - describe()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# describe()

此操作用于描述当前 collection。

## 请求语法\{#request-syntax}

```python
describe(timeout: float | None)
```

**参数：**

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示当收到任何响应或发生任何错误时，此操作即超时。

**返回类型：**

*dict*

**返回：**

一个包含指定 collection 详细信息的字典。

```python
{
    'collection_name': 'test_01',
    'auto_id': False,
    'num_shards': 1,
    'description': '',
    'fields': [
          {
              'field_id': 100,
              'name': 'id',
              'description': '',
              'type': 5,
              'params': {},
              'element_type': 0,
              'is_primary': True
          },
          {
              'field_id': 101,
              'name': 'vector',
              'description': '',
              'type': 101,
              'params': {
                  'dim': 768
              },
              'element_type': 0
          }
     ],
     'aliases': [],
     'collection_id': 446738261026541332,
     'consistency_level': 2,
     'properties': {},
     'num_partitions': 1
}
```

**参数：**

- **collection_name** (*str*) -

    当前 collection 的名称。

- **auto_id** (*bool*) -

    Zilliz Cloud 是否为该 collection 自动生成主键。

- **num_shards** (*int*) -

    当前 collection 拥有的 shard 数量。

- **description** (*str*)

    当前 collection 的描述。

- **fields** (*list*)

    当前 collection 中的字段列表。

    - **field_id** (*int*)

        当前字段的 ID。

    - **name** (*str*)

        当前字段的名称。

    - **description** (*str*)

        当前字段的描述。

    - **type** (*int*)

        当前字段的类型。详情请参阅 DataType。

    - **params** (*dict*)

        当前字段的附加属性。

        - 对于 VARCHAR 字段，**max_length** (*int*) 是一个可能的属性，用于确定当前字段值中的字符数。

        - 对于 FLOAT_VECTOR 字段，**dim** (*int*) 是一个可能的属性，用于确定当前字段值中的 vector embeddings 数量。

    - **element_type** (*int*)

    - **is_primary** (*bool*)

        当前字段是否作为该 collection 的主键。

- **aliases** (*list*)      

    collection 别名列表。你可以使用列表中的任意别名来使用当前 collection。  

- **collection_id** (*int*)

    当前 collection 的 ID。Zilliz Cloud 在创建每个 collection 时都会为其分配一个 ID。

- **consistency_level** (*int*)

    当前 collection 的一致性级别。详情请参阅 ConsistencyLevel。

- **properties** (*dict*)

- **num_partitions** (*int*) 

    当前 collection 中的 partition 数量。

**异常：**

- **DescribeCollectionException**

    当此操作期间发生任何错误时，会引发此异常。

## 示例\{#example}

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

# Get detailed information about the collection
collection.describe()

# Output
# {
#     'collection_name': 'test_01',
#     'auto_id': False,
#     'num_shards': 1,
#     'description': '',
#     'fields': [
#           {
#               'field_id': 100,
#               'name': 'id',
#               'description': '',
#               'type': 5,
#               'params': {},
#               'element_type': 0,
#               'is_primary': True
#           },
#           {
#               'field_id': 101,
#               'name': 'vector',
#               'description': '',
#               'type': 101,
#               'params': {
#                   'dim': 768
#               },
#               'element_type': 0
#           }
#      ],
#      'aliases': [],
#      'collection_id': 446738261026541332,
#      'consistency_level': 2,
#      'properties': {},
#      'num_partitions': 1
# }
```

## 相关操作\{#related-operations}

- [drop()](./Collection-drop)

- [flush()](./Collection-flush)

- [get_replicas()](./Collection-get_replicas)

- [set_properties()](./Collection-set_properties)

