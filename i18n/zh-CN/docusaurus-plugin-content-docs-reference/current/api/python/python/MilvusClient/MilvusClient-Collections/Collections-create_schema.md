---
title: "create_schema() | Python | MilvusClient"
slug: /python/python/Collections-create_schema
sidebar_label: "create_schema()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作创建一个 collection schema。 | Python | MilvusClient"
type: docx
token: Er8vdVepxoqhPFxVyZUcxSHMnqe
sidebar_position: 6
keywords: 
  - vector 数据库示例
  - rag vector 数据库
  - 什么是 vector db
  - 什么是 vector 数据库
  - zilliz
  - Zilliz Cloud
  - cloud
  - create_schema()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_schema()

此操作创建一个 collection schema。

## 请求语法\{#request-syntax}

```python
MilvusClient.create_schema(**kwargs) -> CollectionSchema
```

<Admonition type="info" icon="📘" title="Notes">

这是一个类方法。你应像这样调用此方法：`MilvusClient.create_schema()`。

</Admonition>

**参数：**

- **kwargs** -

    - **auto_id** (*bool*)

        是否允许主字段自动递增。

        将其设置为 **True** 会使主字段自动递增。在这种情况下，为避免错误，插入的数据中不应包含主字段。

    - **enable_dynamic_field** (*bool*)

        如果插入到目标 collection 的数据包含未在该 collection schema 中定义的字段，是否允许 Zilliz Cloud 将这些未定义字段的值保存在动态字段中。

        当你将其设置为 **True** 时，Zilliz Cloud 将创建一个名为 **&#36;meta** 的字段，用于存储插入数据中的任何未定义字段及其值。

        <Admonition type="info" icon="📘" title="Note">

        什么是动态字段？
        
                如果插入到目标 collection 的数据包含未在该 collection schema 中定义的字段，这些字段将作为键值对保存在名为 **&#36;meta** 的保留动态字段中。

        </Admonition>

    - **primary_field** (*str*)

        主字段的名称。

    - **partition_key_field** (*str*)

        用作 partition key 的字段名称。

        设置此项后，Zilliz Cloud 将管理当前 collection 中的所有 partition。

        <Admonition type="info" icon="📘" title="Note">

        什么是 partition key？
        
                一旦某个字段被指定为 partition key，Zilliz Cloud 就会根据每个插入实体的 partition key 值计算哈希，并相应地将实体保存到目标 collection 的 partition 中。
        
                当基于特定 key 实现数据隔离时（例如面向 partition 的多租户），这尤其有用。

        </Admonition>

- **external_source** (*str*) -

    外部源 URI，应为指向可访问外部 volume 的 `volume://` URI。例如，`volume://<volume-name>/path/to/folder/`..

- **external_spec** (*str*) -

    外部源规范，是一组辅助参数：

    - **format** (*str*) - 

        目标源数据文件的格式。

        可能的值为 `parquet`、`vortex`、`lance-table` 和 `iceberg-table`。

    - **snapshot_id** (*str*) -

        Iceberg table 的 ID。仅当 `format` 为 `iceberg-table` 时适用。

**返回类型：**

*[CollectionSchema](./MilvusClient-CollectionSchema)*

**返回：**

一个 **[CollectionSchema](./MilvusClient-CollectionSchema)** 对象。

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#examples}

- 托管 collection 的 schema

    ```python
    from pymilvus import MilvusClient, DataType
    
    # 1. Create a schema
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
    ```

- 外部 collection 的 schema

    ```python
    schema = MilvusClient.create_schema(
        external_source='volume://my_volume/path/to/a/folder/',
        external_spec='{"format": "parquet"}'
    )
    
    schema.add_field(
        field_name="product_id",
        datatype=DataType.INT64,
        # highlight-next
        external_field="id" # field name in the external data file
    )
    schema.add_field(
        field_name="product_name",
        datatype=DataType.VARCHAR,
        max_length=512,
        # highlight-next
        external_field="name"
    )
    schema.add_field(
        field_name="embedding",
        datatype=DataType.FLOAT_VECTOR,
        dim=768,
        # highlight-next
        external_field="vector"
    )
    ```

    
