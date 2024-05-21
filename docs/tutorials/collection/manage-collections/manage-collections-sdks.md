---
slug: /manage-collections-sdks
sidebar_label: SDK
beta: FALSE
notebook: FALSE
type: origin
token: FoTwwqBYdi5fmlkUkMfcFF2gnNc
sidebar_position: 3

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 管理 Collection (SDK)

本指南将介绍如何通过各种语言的 SDK 创建和管理 Collection。操作更简单直观，但使用 SDK 可提供更多灵活性。

## 前提条件{#before-you-start}

## 概述{#overview}

，您通过 Collection 来存储 Embedding 向量。同一个 Collection 中的所有 Embedding 向量维度相同，且使用同样的相似性类型来计算向量距离和相似性。 

 Collection 支持动态列（即支持插入未在 Schema 中预先定义的字段数据） 和自动生成的主键列。 

为了满足不同的用户需求， 提供两种创建 Collection 的方式——快速创建 Collection 和自定义 Collection Schema 和索引参数。

此外，您还可以通过 SDK 查看、加载、释放、删除 Collection。

## 创建 Collection{#create-collection}

您可以通过以下任意一种方式创建 Collection：

- **快速创建**

    您只需要设置 Collection 名称和向量维度即可快速完成 Collection 创建。更多详情，请参考[快速创建](./manage-collections-sdks#quick-setup}**)。

- **定制化创建**

    您可以自定义 **Schema** 和**索引参数**。更多详情，请参考[定制化创建](./manage-collections-sdks#customized-setup)。

### **快速创建{#quick-setup}**

 提供快速创建 Collection 的方式。您只需定义以下三个参数：

- 创建的 Collection 的名称

- 向量数据的维度

- 用于计算向量距离的相似度类型

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection in quick setup mode
client.create_collection(
    collection_name="quick_setup",
    dimension=5
)

res = client.get_load_state(
    collection_name="quick_setup"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
    .collectionName("quick_setup")
    .dimension(5)
    .build();

client.createCollection(quickSetupReq);

// Thread.sleep(5000);

GetLoadStateReq quickSetupLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

Boolean res = client.getLoadState(quickSetupLoadStateReq);

System.out.println(res);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 1. Set up a Milvus Client
client = new MilvusClient({address, token});

// 2. Create a collection in quick setup mode
let res = await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
});  

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

</TabItem>
</Tabs>

上述代码生成的 Collection 仅包含 2 个字段：`id` (主键字段) 和 `vector` (向量字段)。`auto_id` 和 `enable_dynamic_field` 功能已默认开启。

- `auto_id` 

    开启后，系统会自动为插入数据分配自增主键。因此，您无需在插入数据时额外提供主键。

- `enable_dynamic_field`

    开启后，插入数据中除 `id` 和 `vector` 以外的字段都将被视作为动态列。这些字段将以键值对的形式存储在 `$meta` 字段中。动态列功能开启后，您可以在插入数据时包含未在 Schema 中预先定义的额外字段。

以上创建的 Collection 会自动创建索引和加载，可立即向 Collection 中插入数据。

### 定制化创建{#customized-setup}

除了使用快速创建以外，您还可以自定义 Collection 的 **Schema** 和**索引参数**。

#### 步骤 1: 设置 Schema

Schema 用于定义 Collection 结构。您可以在设置 Schema 时选择是否开启动态列 `enable_dynamic_field`、添加预定义的字段、设置每个字段的属性。如需了解 Schema 概念解释和数据类型，请参考 [Schema](./schema-explained)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 3. Create a collection in customized setup mode

# 3.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 3.2. Add fields to schema
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// 3. Create a collection in customized setup mode

// 3.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// 3.2 Add fields to schema
schema.addField(AddFieldReq.builder()
    .fieldName("my_id")
    .dataType(DataType.Int64).
    isPrimaryKey(true)
    .autoID(false)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName("my_vector")
    .dataType(DataType.FloatVector)
    .dimension(5)
    .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 3. Create a collection in customized setup mode
// 3.1 Define fields
const fields = [
    {
        name: "my_id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "my_vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
]
```

</TabItem>
</Tabs>

在上述代码中，`enable_dynamic_field` 设置为 `True`，主键列也开启了 `auto_id`。此外，上述代码还添加了一个维度为 768 的 `vector` 字段和 4 个标量字段。

#### 步骤 2: 设置索引参数

索引参数规定了 如何组织 Collection 中的数据。您可以通过调整 `metric_type` 和 `index_type` 这两个参数来选择合适的相似度类型和索引类型。在  中，我们使用推荐使用 `AUTOINDEX` 作为`index_type`。对于向量字段，您可以按需灵活选择 `COSINE`、 `L2`、 `IP` 作为 `metric_type`。更多关于索引类型详情，请参考 [AUTOINDEX](./autoindex-explained)。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 3.3. Prepare index parameters
index_params = client.prepare_index_params()

# 3.4. Add indexes
index_params.add_index(
    field_name="my_id",
    index_type="STL_SORT"
)

index_params.add_index(
    field_name="my_vector", 
    index_type="IVF_FLAT",
    metric_type="IP",
    params={ "nlist": 128 }
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

// 3.3 Prepare index parameters
IndexParam indexParamForIdField = IndexParam.builder()
    .fieldName("my_id")
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("my_vector")
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.L2)
    .extraParams(Map.of("nlist", 1024))
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 3.2 Prepare index parameters
const index_params = [{
    field_name: "my_id",
    index_type: "STL_SORT"
},{
    field_name: "my_vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]
```

</TabItem>
</Tabs>

上述代码展示了如何为向量字段和标量字段设置索引参数。向量字段需要同时设置 `index_type` 和 `metric_type`。标量字段仅需设置 `index_type`。我们建议您为向量字段和在过滤时常用的标量字段创建索引。

#### 步骤 3：创建 Collection

您可以选择分开创建 Collection 和索引文件，或在 Collection 创建的同时创建和加载索引文件。

- **创建 Collection 并同时加载索引**

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 3.5. Create a collection with the index loaded simultaneously
    client.create_collection(
        collection_name="customized_setup_1",
        schema=schema,
        index_params=index_params
    )
    
    time.sleep(5)
    
    res = client.get_load_state(
        collection_name="customized_setup_1"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "state": "<LoadState: Loaded>"
    # }
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    import io.milvus.v2.service.collection.request.CreateCollectionReq;
    import io.milvus.v2.service.collection.request.GetLoadStateReq;
    
    // 3.4 Create a collection with schema and index parameters
    CreateCollectionReq customizedSetupReq1 = CreateCollectionReq.builder()
        .collectionName("customized_setup_1")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();
    
    client.createCollection(customizedSetupReq1);
    
    // Thread.sleep(5000);
    
    // 3.5 Get load state of the collection
    GetLoadStateReq customSetupLoadStateReq1 = GetLoadStateReq.builder()
        .collectionName("customized_setup_1")
        .build();
    
    res = client.getLoadState(customSetupLoadStateReq1);
    
    System.out.println(res);
    
    // Output:
    // true
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 3.3 Create a collection with fields and index parameters
    res = await client.createCollection({
        collection_name: "customized_setup_1",
        fields: fields,
        index_params: index_params,
    })
    
    console.log(res.error_code)  
    
    // Output
    // 
    // Success
    // 
    
    res = await client.getLoadState({
        collection_name: "customized_setup_1"
    })
    
    console.log(res.state)
    
    // Output
    // 
    // LoadStateLoaded
    // 
    ```

    </TabItem>
    </Tabs>

    以上创建的 Collection 已自动加载。如需了解如何手动加载或释放 Collection，请参考[加载和释放 Collection](./manage-collections-sdks#load-and-release-collection)。

- **分开创建 Collection 和索引文件**

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 3.6. Create a collection and index it separately
    client.create_collection(
        collection_name="customized_setup_2",
        schema=schema,
    )
    
    res = client.get_load_state(
        collection_name="customized_setup_2"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "state": "<LoadState: NotLoad>"
    # }
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // 3.6 Create a collection and index it separately
    CreateCollectionReq customizedSetupReq2 = CreateCollectionReq.builder()
        .collectionName("customized_setup_2")
        .collectionSchema(schema)
        .build();
    
    client.createCollection(customizedSetupReq2);
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 3.4 Create a collection and index it seperately
    res = await client.createCollection({
        collection_name: "customized_setup_2",
        fields: fields,
    })
    
    console.log(res.error_code)
    
    // Output
    // 
    // Success
    // 
    
    res = await client.getLoadState({
        collection_name: "customized_setup_2"
    })
    
    console.log(res.state)
    
    // Output
    // 
    // LoadStateNotLoad
    // 
    ```

    </TabItem>
    </Tabs>

    以上创建的 Collection 未自动加载。您可以通过以下命令为上述 Collection 创建索引。分开创建的 Collection 和索引将不会自动加载。如需了解如何加载 Collection，请参考[加载和释放 Collection](./manage-collections-sdks#load-and-release-collection)。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 3.6 Create index
    client.create_index(
        collection_name="customized_setup_2",
        index_params=index_params
    )
    
    res = client.get_load_state(
        collection_name="customized_setup_2"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "state": "<LoadState: NotLoad>"
    # }
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    CreateIndexReq  createIndexReq = CreateIndexReq.builder()
        .collectionName("customized_setup_2")
        .indexParams(indexParams)
        .build();
    
    client.createIndex(createIndexReq);
    
    // Thread.sleep(1000);
    
    // 3.7 Get load state of the collection
    GetLoadStateReq customSetupLoadStateReq2 = GetLoadStateReq.builder()
        .collectionName("customized_setup_2")
        .build();
    
    res = client.getLoadState(customSetupLoadStateReq2);
    
    System.out.println(res);
    
    // Output:
    // false
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 3.5 Create index
    res = await client.createIndex({
        collection_name: "customized_setup_2",
        field_name: "my_vector",
        index_type: "IVF_FLAT",
        metric_type: "IP",
        params: { nlist: 1024}
    })
    
    res = await client.getLoadState({
        collection_name: "customized_setup_2"
    })
    
    console.log(res.state)
    
    // Output
    // 
    // LoadStateNotLoad
    // 
    ```

    </TabItem>
    </Tabs>

## 查看 Collection{#view-collections}

您可以通过以下命令查看现有 Collection 详情。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 5. View Collections
res = client.describe_collection(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "collection_name": "customized_setup_2",
#     "auto_id": false,
#     "num_shards": 1,
#     "description": "",
#     "fields": [
#         {
#             "field_id": 100,
#             "name": "my_id",
#             "description": "",
#             "type": 5,
#             "params": {},
#             "element_type": 0,
#             "is_primary": true
#         },
#         {
#             "field_id": 101,
#             "name": "my_vector",
#             "description": "",
#             "type": 101,
#             "params": {
#                 "dim": 5
#             },
#             "element_type": 0
#         }
#     ],
#     "aliases": [],
#     "collection_id": 448143479230158446,
#     "consistency_level": 2,
#     "properties": {},
#     "num_partitions": 1,
#     "enable_dynamic_field": true
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 4. View collections
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

DescribeCollectionResp describeCollectionRes = client.describeCollection(describeCollectionReq);

System.out.println(JSONObject.toJSON(describeCollectionRes));

// Output:
// {
//     "createTime": 449005822816026627,
//     "collectionSchema": {"fieldSchemaList": [
//         {
//             "autoID": false,
//             "dataType": "Int64",
//             "name": "my_id",
//             "description": "",
//             "isPrimaryKey": true,
//             "maxLength": 65535,
//             "isPartitionKey": false
//         },
//         {
//             "autoID": false,
//             "dataType": "FloatVector",
//             "name": "my_vector",
//             "description": "",
//             "isPrimaryKey": false,
//             "dimension": 5,
//             "maxLength": 65535,
//             "isPartitionKey": false
//         }
//     ]},
//     "vectorFieldName": ["my_vector"],
//     "autoID": false,
//     "fieldNames": [
//         "my_id",
//         "my_vector"
//     ],
//     "description": "",
//     "numOfPartitions": 1,
//     "primaryFieldName": "my_id",
//     "enableDynamicField": true,
//     "collectionName": "customized_setup_2"
// }
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. View Collections
res = await client.describeCollection({
    collection_name: "customized_setup_2"
})

console.log(res)

// Output
// 
// {
//   virtual_channel_names: [ 'by-dev-rootcoord-dml_13_449007919953017716v0' ],
//   physical_channel_names: [ 'by-dev-rootcoord-dml_13' ],
//   aliases: [],
//   start_positions: [],
//   properties: [],
//   status: {
//     extra_info: {},
//     error_code: 'Success',
//     reason: '',
//     code: 0,
//     retriable: false,
//     detail: ''
//   },
//   schema: {
//     fields: [ [Object], [Object] ],
//     properties: [],
//     name: 'customized_setup_2',
//     description: '',
//     autoID: false,
//     enable_dynamic_field: false
//   },
//   collectionID: '449007919953017716',
//   created_timestamp: '449024569603784707',
//   created_utc_timestamp: '1712892797866',
//   shards_num: 1,
//   consistency_level: 'Bounded',
//   collection_name: 'customized_setup_2',
//   db_name: 'default',
//   num_partitions: '1'
// }
// 
```

</TabItem>
</Tabs>

To list all existing collections, you can do as follows:

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 6. List all collection names
res = client.list_collections()

print(res)

# Output
#
# [
#     "customized_setup_2",
#     "quick_setup",
#     "customized_setup_1"
# ]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.response.ListCollectionsResp;

// 5. List all collection names
ListCollectionsResp listCollectionsRes = client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

// Output:
// [
//     "customized_setup_2",
//     "quick_setup",
//     "customized_setup_1"
// ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. List all collection names
ListCollectionsResp listCollectionsRes = client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

// Output:
// [
//     "customized_setup_1",
//     "quick_setup",
//     "customized_setup_2"
// ]
```

</TabItem>
</Tabs>

## 加载和释放 Collection{#load-and-release-collection}

Collection 加载过程中， 会将 Collection 的索引文件加载到内存中。反之，在 Collection 释放过程中，  会将 Collection 索引文件从内存中释放。在执行搜索前，请确保 Collection 处于已加载的状态。

### 加载 Collection{#load-a-collection}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 7. Load the collection
client.load_collection(
    collection_name="customized_setup_2"
)

res = client.get_load_state(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.LoadCollectionReq;

// 6. Load the collection
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

client.loadCollection(loadCollectionReq);

// Thread.sleep(5000);

// 7. Get load state of the collection
GetLoadStateReq loadStateReq = GetLoadStateReq.builder()
    .collectionName("customized_setup_2")
    .build();

res = client.getLoadState(loadStateReq);

System.out.println(res);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 7. Load the collection
res = await client.loadCollection({
    collection_name: "customized_setup_2"
})

console.log(res.error_code)

// Output
// 
// Success
// 

await sleep(3000)

res = await client.getLoadState({
    collection_name: "customized_setup_2"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

</TabItem>
</Tabs>

### 释放 Collection{#release-a-collection}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 8. Release the collection
client.release_collection(
    collection_name="customized_setup_2"
)

res = client.get_load_state(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.ReleaseCollectionReq;

// 8. Release the collection
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

client.releaseCollection(releaseCollectionReq);

// Thread.sleep(1000);

res = client.getLoadState(loadStateReq);

System.out.println(res);

// Output:
// false
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 8. Release the collection
res = await client.releaseCollection({
    collection_name: "customized_setup_2"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "customized_setup_2"
})

console.log(res.state)

// Output
// 
// LoadStateNotLoad
// 
```

</TabItem>
</Tabs>

## 设置 Collection 别名（Alias）{#set-up-aliases}

您可以按需设置 Collection 别名（Alias）。一个 Collection 可以有多个 Alias。但是多个 Collection 不可共享同一个 Alias。

### 创建 Alias{#create-aliases}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 9. Manage aliases
# 9.1. Create aliases
client.create_alias(
    collection_name="customized_setup_2",
    alias="bob"
)

client.create_alias(
    collection_name="customized_setup_2",
    alias="alice"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.utility.request.CreateAliasReq;

// 9. Manage aliases

// 9.1 Create alias
CreateAliasReq createAliasReq = CreateAliasReq.builder()
    .collectionName("customized_setup_2")
    .alias("bob")
    .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
    .collectionName("customized_setup_2")
    .alias("alice")
    .build();

client.createAlias(createAliasReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 9. Manage aliases
// 9.1 Create aliases
res = await client.createAlias({
    collection_name: "customized_setup_2",
    alias: "bob"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.createAlias({
    collection_name: "customized_setup_2",
    alias: "alice"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

</TabItem>
</Tabs>

### 查看现有 Alias{#list-aliases}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 9.2. List aliases
res = client.list_aliases(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "aliases": [
#         "bob",
#         "alice"
#     ],
#     "collection_name": "customized_setup_2",
#     "db_name": "default"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.utility.request.ListAliasesReq;
import io.milvus.v2.service.utility.response.ListAliasResp;

// 9.2 List alises
ListAliasesReq listAliasesReq = ListAliasesReq.builder()
    .collectionName("customized_setup_2")
    .build();

ListAliasResp listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

// Output:
// [
//     "bob",
//     "alice"
// ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 9.2 List aliases
res = await client.listAliases({
    collection_name: "customized_setup_2"
})

console.log(res.aliases)

// Output
// 
// [ 'bob', 'alice' ]
// 
```

</TabItem>
</Tabs>

### 查看 Alias 详情{#describe-aliases}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 9.3. Describe aliases
res = client.describe_alias(
    alias="bob"
)

print(res)

# Output
#
# {
#     "alias": "bob",
#     "collection_name": "customized_setup_2",
#     "db_name": "default"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.utility.request.DescribeAliasReq;
import io.milvus.v2.service.utility.response.DescribeAliasResp;

// 9.3 Describe alias
DescribeAliasReq describeAliasReq = DescribeAliasReq.builder()
    .alias("bob")
    .build();

DescribeAliasResp describeAliasRes = client.describeAlias(describeAliasReq);

System.out.println(JSONObject.toJSON(describeAliasRes));

// Output:
// {
//     "alias": "bob",
//     "collectionName": "customized_setup_2"
// }
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 9.3 Describe aliases
res = await client.describeAlias({
    collection_name: "customized_setup_2",
    alias: "bob"
})

console.log(res)

// Output
// 
// {
//   status: {
//     extra_info: {},
//     error_code: 'Success',
//     reason: '',
//     code: 0,
//     retriable: false,
//     detail: ''
//   },
//   db_name: 'default',
//   alias: 'bob',
//   collection: 'customized_setup_2'
// }
// 
```

</TabItem>
</Tabs>

### 重新分配 Alias{#reassign-aliases}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 9.4 Reassign aliases to other collections
client.alter_alias(
    collection_name="customized_setup_1",
    alias="alice"
)

res = client.list_aliases(
    collection_name="customized_setup_1"
)

print(res)

# Output
#
# {
#     "aliases": [
#         "alice"
#     ],
#     "collection_name": "customized_setup_1",
#     "db_name": "default"
# }

res = client.list_aliases(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "aliases": [
#         "bob"
#     ],
#     "collection_name": "customized_setup_2",
#     "db_name": "default"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.utility.request.AlterAliasReq;

// 9.4 Reassign alias to other collections
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
    .collectionName("customized_setup_1")
    .alias("alice")
    .build();

client.alterAlias(alterAliasReq);

listAliasesReq = ListAliasesReq.builder()
    .collectionName("customized_setup_1")
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

// Output:
// ["alice"]

listAliasesReq = ListAliasesReq.builder()
    .collectionName("customized_setup_2")
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

// Output:
// ["bob"]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 9.4 Reassign aliases to other collections
res = await client.alterAlias({
    collection_name: "customized_setup_1",
    alias: "alice"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.listAliases({
    collection_name: "customized_setup_1"
})

console.log(res.aliases)

// Output
// 
// [ 'alice' ]
// 

res = await client.listAliases({
    collection_name: "customized_setup_2"
})

console.log(res.aliases)

// Output
// 
// [ 'bob' ]
// 

```

</TabItem>
</Tabs>

### 删除 Alias{#drop-aliases}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 9.5 Drop aliases
client.drop_alias(
    alias="bob"
)

client.drop_alias(
    alias="alice"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.utility.request.DropAliasReq;

// 9.5 Drop alias
DropAliasReq dropAliasReq = DropAliasReq.builder()
    .alias("bob")
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias("alice")
    .build();

client.dropAlias(dropAliasReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 9.5 Drop aliases
res = await client.dropAlias({
    alias: "bob"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.dropAlias({
    alias: "alice"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

</TabItem>
</Tabs>

## 删除 Collection{#drop-a-collection}

您可以删除不再使用的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 10. Drop the collections
client.drop_collection(
    collection_name="quick_setup"
)

client.drop_collection(
    collection_name="customized_setup_1"
)

client.drop_collection(
    collection_name="customized_setup_2"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.DropCollectionReq;

// 10. Drop collections

DropCollectionReq dropQuickSetupParam = DropCollectionReq.builder()
    .collectionName("quick_setup")
    .build();

client.dropCollection(dropQuickSetupParam);

DropCollectionReq dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName("customized_setup_1")
    .build();

client.dropCollection(dropCustomizedSetupParam);

dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName("customized_setup_2")
    .build();

client.dropCollection(dropCustomizedSetupParam);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 10. Drop the collection
res = await client.dropCollection({
    collection_name: "customized_setup_2"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.dropCollection({
    collection_name: "customized_setup_1"
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.dropCollection({
    collection_name: "quick_setup"
})

console.log(res.error_code)

// Output
// 
// Success
// 
```

</TabItem>
</Tabs>

