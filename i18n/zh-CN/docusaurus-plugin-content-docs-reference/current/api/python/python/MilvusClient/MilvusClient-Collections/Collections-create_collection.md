---
title: "create_collection() | Python | MilvusClient"
slug: /python/python/Collections-create_collection
sidebar_label: "create_collection()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作支持通过两种不同方式创建 collection：快速设置或自定义设置。 | Python | MilvusClient"
type: docx
token: NbYidGUPcokra9xJ6IAcUNLEn9f
sidebar_position: 5
keywords: 
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - create_collection()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_collection()

此操作支持通过两种不同方式创建 collection：快速设置或自定义设置。

<Admonition type="info" icon="📘" title="Notes">

此方法适用于 dedicated serving clusters 和 on-demand compute。 

- 对于 serving cluster 中的 collection，请使用集群 endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于 on-demand compute 中的 collection，请使用项目 endpoints 创建 **[MilvusClient](./Client-MilvusClient)**。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
create_collection(
    collection_name: str,
    dimension: int,
    primary_field_name: str = "id",
    id_type: str = DataType,
    vector_field_name: str = "vector",
    metric_type: str = "COSINE",
    auto_id: bool = False,
    timeout: Optional[float] = None,
    schema: Optional[CollectionSchema] = None, # Used for custom setup
    index_params: Optional[IndexParams] = None, # Used for custom setup
    **kwargs,
) -> None
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    要创建的 collection 的名称。

- **dimension** (*int*) -

    用于保存 vector embeddings 的 collection 字段的维度。

    该值通常由你用于生成 vector embeddings 的模型决定，并且应为大于 1 的整数。

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，并且 schema 中的某个字段已将其 **dim** 设置为正整数，则将忽略此参数。

- **primary_field_name** (*str*) -

    此 collection 中 primary 字段的名称。

    该值默认为 **id**。你可以使用任何你认为合适的其他名称。如果需要使用自定义 schema 设置 collection，请跳过此参数。

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，并且 schema 中的某个字段已将其 **is_primary** 设置为 **True**，则将忽略此参数。

- **id_type** (*[DataType](./Collections-DataType)*) -

    此 collection 中 primary 字段的数据类型。

    该值默认为 **DataType.INT64**。可能的值为 **DataType.INT64** 和 **DataType.VARCHAR**。 

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，则将忽略此参数。

- **vector_field_name** (*str*) -

    用于保存 vector embeddings 的 collection 字段的名称。

    该值默认为 **vector**。你可以使用任何你认为合适的其他名称。 

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，则将忽略此参数。

- **metric_type** (*str*) -

    此 collection 用于衡量 vector embeddings 之间相似度的算法。

    该值默认为 **COSINE**。可能的值为 **L2**、**IP** 和 **COSINE**。有关这些 metric types 的详细信息，请参阅[相似性指标说明](/docs/search-metrics-explained)。

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，则将忽略此参数。

- **auto_id** (*bool*) -

    在向此 collection 插入数据时，primary 字段是否自动递增。

    该值默认为 **False**。将其设置为 **True** 会使 primary 字段自动递增。在这种情况下，primary 字段不应包含在要插入的数据中，以避免错误。自动生成的 ID 长度固定，无法更改。

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，则将忽略此参数。

- **timeout** (*float* | *None*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在任何响应返回或发生错误时超时。

- **schema** (*[CollectionSchema](./MilvusClient-CollectionSchema)* | *None*)

    此 collection 的 schema。

    将其设置为 **None** 表示将以快速设置方式创建此 collection。 

    要使用自定义 schema 设置 collection，你需要创建一个 **[CollectionSchema](./MilvusClient-CollectionSchema)** 对象并在此处引用它。在这种情况下，Zilliz Cloud 会忽略请求中携带的所有其他与 schema 相关的设置。

- **index_params** (*IndexParams* | *None*)

    用于在此 collection 的 vector 字段上构建 index 的参数。要使用自定义 schema 设置 collection 并自动将 collection 加载到内存中，你需要创建一个 **IndexParams** 对象并在此处引用它。 

    你至少应为此 collection 中的 vector 字段添加一个 index。如果你更希望稍后再设置 index 参数，也可以跳过此参数。

- **kwargs** -

    - **enable_dynamic_field** (*bool*) -

        是否使用名为 **&#36;meta** 的保留 JSON 字段以键值对形式存储未定义字段及其值。

        该值默认为 **True**，表示使用 **&#36;meta** 字段。

        如果 **schema** 不是 **None**，则忽略此参数。

    - **num_shards** (*int*) -

        创建此 collection 时一同创建的 shard 数量。 

        该值默认为 **1**，表示会随此 collection 一同创建一个 shard。

        <Admonition type="info" icon="📘" title="Note">

        什么是 sharding？
        
                Sharding 是指将写入操作分配到不同节点，以充分利用 Milvus cluster 在写入数据时的并行计算潜力。
        
                默认情况下，一个 collection 包含一个 shard。

        </Admonition>

    - **partition_key_field** (*str*) -

        作为 partition key 的字段名称。每个 collection 可以有一个 partition key。

        如果 **schema** 不是 **None**，并且 schema 中的某个字段已将其 **is_parition_key** 设置为 **True**，则忽略此参数。

        <Admonition type="info" icon="📘" title="Note">

        什么是 partition key？
        
                为了支持面向 partition 的多租户，你可以将某个字段设置为 partition key 字段，以便 Zilliz Cloud 对字段值进行哈希，并相应地在指定数量的 partition 之间分配实体。
        
                检索实体时，请确保在布尔表达式中使用 partition key 字段，以过滤出特定字段值的实体。
        
                有关详细信息，请参阅[使用 Partition Key](/docs/use-partition-key) 和[多租户](https://milvus.io/docs/multi_tenancy.md)。

        </Admonition>

    - **partition_key_isolation** (*bool*) -

        是否启用 partition key isolation，以进一步提升基于 partition key 进行 scalar filtering 时的搜索性能。有关详细信息，请参阅[使用 Partition Key Isolation](/docs/use-partition-key#use-partition-key-isolation)。

    - **num_partitions** (*int*) -

        为 partition key 功能创建的 partition 数量。

        该值默认为 **64**，表示会随此 collection 一同创建 64 个 partition。当 **partition_key_field** 设置为某个字段名称时，此参数适用。

    - **consistency_level** (*int* | *str*)

        目标 collection 的一致性级别。

        该值默认为 **Bounded**（**2**），可选项包括 **Strong**（**0**）、**Session**（**1**）、**Bounded**（**2**）和 **Eventually**（**3**）。

        <Admonition type="info" icon="📘" title="Note">

        什么是一致性级别？
        
                分布式数据库中的一致性专指这样一种属性：在给定时间写入或读取数据时，确保每个节点或副本对数据具有相同视图。
        
                Zilliz Cloud 提供三种一致性级别：**Strong**、**Bounded Staleness** 和 **Eventually**，默认设置为 **Bounded Staleness**。
        
                在执行 vector 相似性搜索或查询时，你可以轻松调整一致性级别，使其最适合你的应用。

        </Admonition>

    - **properties** (*dict*) -

        以键值对形式表示的其他属性。

        - **collection.ttl.seconds** (*int*)

            collection 级别的生存时间（TTL），单位为秒。

        - **ttl_field** (*str*)

            用作 entity 级 TTL 过期逻辑时间戳的 `TIMESTAMPTZ` 字段名称。

        - **mmap.enabled** (*bool*) -

            是否为 collection 中所有字段的原始数据和 indexes 启用 mmap。

        - **partitionkey.isolation** (bool) -

            是否启用 partition key isolation。有关详细信息，请参阅[使用 Partition Key](/docs/use-partition-key)。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **PrimaryKeyException**

    如果 primary 字段的数据类型不是整数或字符串，将引发此异常。

- **MilvusException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#examples}

### 设置 Milvus client\{#set-up-a-milvus-client}

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)
```

### 创建 collection\{#create-a-collection}

你可以在快速设置或自定义设置之间进行选择，如下所示：

- **快速设置**

    快速设置的 collection 有两个必需字段：primary 字段和 vector 字段。它还允许在 dynamic field 中以键值对形式插入未定义字段及其值。

    ```python
    client.create_collection(
        collection_name="test_collection", 
        dimension=5
    )
    ```

    在上述设置中， 

    - primary 字段和 vector 字段使用其默认名称（**id** 和 **vector**）。

    - metric type 也设置为其默认值（**COSINE**）。

    - primary 字段接受整数，并且不会自动递增。

    - 名为 **&#36;meta** 的保留 JSON 字段用于存储非 schema 定义的字段及其值。

    你可以修改 primary 字段和 vector 字段的名称，并更改 metric type。此外，可以将 primary 字段设置为自动递增。

    ```python
    client.create_collection(
        collection_name="quick_setup",
        dimension=5,
        primary_field_name="my_id",
        id_type="string",
        vector_field_name="my_vector",
        metric_type="L2",
        auto_id=True,
        max_length=512
    )
    ```

    在上述代码中，collection 将被创建、建立 index，并加载到内存中。

- **带 index 参数的自定义设置**

    对于自定义设置，请预先创建 schema 和 index 参数。 

    ```python
    from pymilvus import MilvusClient, DataType
    
    # 1. Create schema
    schema = MilvusClient.create_schema(
        auto_id=False,
        enable_dynamic_field=False,
    )
    
    # 2. Add fields to schema
    schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
    schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
    
    # 3. Prepare index parameters
    index_params = client.prepare_index_params()
    
    # 4. Add indexes
    index_params.add_index(
        field_name="my_id",
        index_type="STL_SORT"
    )
    
    index_params.add_index(
        field_name="my_vector", 
        index_type="AUTOINDEX",
        metric_type="L2",
        params={"nlist": 1024}
    )
    
    # 5. Create a collection
    client.create_collection(
        collection_name="customized_setup",
        schema=schema,
        index_params=index_params
    )
    ```

    在上述代码中，collection 将被创建、建立 index，并加载到内存中。

- **不带 index 参数的自定义设置**

    ```python
    from pymilvus import MilvusClient, DataType
    
    # 1. Create schema
    schema = MilvusClient.create_schema(
        auto_id=False,
        enable_dynamic_field=False,
    )
    
    # 2. Add fields to schema
    schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
    schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
    
    # 3. Create a collection
    client.create_collection(
        collection_name="customized_setup",
        schema=schema
    )
    ```

    在上述代码中，collection 也会被创建。但是，如果没有 `index_param`，collection 中的数据将不会建立 index，也不会加载到内存中。

- **创建外部 collection**

    ```python
    from pymilvus import MilvusClient, DataType
    
    # connect the database
    client = MilvusClient(
        uri="https://{project-id}.{region}.api.zillizcloud.com",
        token="YOUR_API_KEY"
    )
    
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
    
    client.use_database(
        db_name="my_database"
    )
    # create the collection
    client.create_collection(
        collection_name="test_collection",
        schema=schema
    )
    
    index_params = client.prepare_index_params()
    # Add indexes
    index_params.add_index(
        field_name="embedding",
        index_type="AUTOINDEX",
        metric_type="COSINE"
    )
    index_params.add_index(
        field_name="product_name",
        index_type="AUTOINDEX"
    )
    client.create_index(
        db_name="my_database",
        collection_name="test_collection",
        index_params=index_params
    )
    
    job_id = client.refresh_external_collection(
        db_name="my_database",
        collection_name="test_collection"
    )
    while True:
        progress = client.get_refresh_external_collection_progress(job_id=job_id)
        print(f"  {progress.state}: {progress.progress}%")
        if progress.state == "RefreshCompleted":
            elapsed = progress.end_time - progress.start_time
            print(f"  Completed in {elapsed}ms")
            break
        elif progress.state == "RefreshFailed":
            print(f"  Failed: {progress.reason}")
            break
        time.sleep(2)
    ```
