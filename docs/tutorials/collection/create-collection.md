---
slug: /create-collection
beta: FALSE
notebook: FALSE
type: origin
token: MNcZwAfV6iZxbckfKBlcmCzanti
sidebar_position: 1
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 创建 Collection

本文介绍如何在 Zilliz Cloud 集群中创建 Collection。您可以在[集群、Collection 及 Entity](./cluster-collection-and-entities) 一文中找到关于  Collection 相关概念的说明。

## 操作步骤{#procedure}

如果您倾向于在不事先定义每个字段的情况下直接着手创建，那么 Starter API 将非常适合您。它提供了一种更为直接和简化的设置方式，您只需指定集合的名称和向量字段的维度数量。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"NodeJS","value":"javascript"},{"label":"Java","value":"java"},{"label":"Bash","value":"bash"}]}>
<TabItem value='python'>

<Tabs groupId="python" defaultValue='python' values={[{"label":"Starter API","value":"python"},{"label":"Advanced API","value":"python_1"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" # Set your cluster endpoint
TOKEN="YOUR_CLUSTER_TOKEN" # Set your token
COLLECTION_NAME="medium_articles_2020" # Set your collection name
DATASET_PATH="../medium_articles_2020_dpr.json" # Set your dataset path

# Initialize a MilvusClient instance
# Replace uri and API key with your own
client = MilvusClient(
    uri=CLUSTER_ENDPOINT, # Cluster endpoint obtained from the console
    token=TOKEN # API key or a colon-separated cluster username and password
)

# Create a collection
client.create_collection(
    collection_name=COLLECTION_NAME,
    dimension=768
)

res = client.describe_collection(
    collection_name=COLLECTION_NAME
)

print(res)

# Output
#
# {
#     "collection_name": "medium_articles_2020",
#     "auto_id": false,
#     "num_shards": 1,
#     "description": "",
#     "fields": [
#         {
#             "field_id": 100,
#             "name": "id",
#             "description": "",
#             "type": 5,
#             "params": {},
#             "is_primary": true
#         },
#         {
#             "field_id": 101,
#             "name": "vector",
#             "description": "",
#             "type": 101,
#             "params": {
#                 "dim": 768
#             }
#         }
#     ],
#     "aliases": [],
#     "collection_id": 443943328732839733,
#     "consistency_level": 2,
#     "properties": [],
#     "num_partitions": 1,
#     "enable_dynamic_field": true
# }

```

</TabItem>
<TabItem value='python_1'>

```python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility

CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" _# Set your cluster endpoint_
TOKEN="YOUR_CLUSTER_TOKEN" _# Set your token_
COLLECTION_NAME="medium_articles_2020" _# Set your collection name_
DATASET_PATH="../medium_articles_2020_dpr.json" _# Set your dataset path_

connections.connect(
  alias='default', 
  _#  Public endpoint obtained from Zilliz Cloud_
  uri=CLUSTER_ENDPOINT,
  _# API key or a colon-separated cluster username and password_
  token=TOKEN, 
)

_# 1. Define fields_
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

_# 2. Build the schema_
schema = CollectionSchema(
    fields,
    description="Schema of Medium articles",
    enable_dynamic_field=False
)

_# 3. Create collection_
collection = Collection(
    name=COLLECTION_NAME, 
    description="Medium articles published between Jan and August in 2020 in prominent publications",
    schema=schema
)
```

</TabItem>
</Tabs>
</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient } = require("@zilliz/milvus2-sdk-node")

const address = "YOUR_CLUSTER_ENDPOINT"
const token = "YOUR_CLUSTER_TOKEN"
const collectionName = "medium_articles_2020"
const data_file = `./medium_articles_2020_dpr.json`

async function main() {

    // Connect to the cluster
    const client = new MilvusClient({address, token})

    // Create a collection
    let res = await client.createCollection({
        collection_name: collectionName,
        dimension: 768,
    });

    console.log(res)

    // Output
    // 
    // { error_code: 'Success', reason: '', code: 0 }
    //

    // Describe the created collection
    res = await client.describeCollection({
        collection_name: collectionName
    });
   
    console.log(res)

    // Output
    // 
    // {
    //   virtual_channel_names: [ 'by-dev-rootcoord-dml_0_445337000187266398v0' ],
    //   physical_channel_names: [ 'by-dev-rootcoord-dml_0' ],
    //   aliases: [],
    //   start_positions: [],
    //   properties: [],
    //   status: { error_code: 'Success', reason: '', code: 0 },
    //   schema: {
    //     fields: [ [Object], [Object] ],
    //     name: 'medium_articles_2020',
    //     description: '',
    //     autoID: false,
    //     enable_dynamic_field: true
    //   },
    //   collectionID: '445337000187266398',
    //   created_timestamp: '445337085300965381',
    //   created_utc_timestamp: '1698826161579',
    //   shards_num: 1,
    //   consistency_level: 'Bounded',
    //   collection_name: 'medium_articles_2020',
    //   db_name: 'default',
    //   num_partitions: '1'
    // }
    // 
}
```

</TabItem>

<TabItem value='java'>

```java
public final class QuickStartDemo {

    public static void main(String[] args) {
    
        String clusterEndpoint = "YOUR_CLUSTER_ENDPOINT";
        String token = "YOUR_CLUSTER_TOKEN";
        String collectionName = "medium_articles";
        String data_file = System.getProperty("user.dir") + "/medium_articles_2020_dpr.json";

        // 1. Connect to Zilliz Cloud

        ConnectParam connectParam = ConnectParam.newBuilder()
            .withUri(clusterEndpoint)
            .withToken(token)
            .build();   
            
        MilvusServiceClient client = new MilvusServiceClient(connectParam);

        System.out.println("Connected to Zilliz Cloud!");

        // Output:
        // Connected to Zilliz Cloud!
    
        // 2. Create collection

        CreateSimpleCollectionParam createCollectionParam = CreateSimpleCollectionParam.newBuilder()
            .withCollectionName(collectionName)
            .withDimension(768)
            .build();

        R<RpcStatus> createCollection = client.createCollection(createCollectionParam);

        if (createCollection.getException() != null) {
            System.err.println("Failed to create collection: " + createCollection.getException().getMessage());
            return;            
        }

        // 3. Describe collection

        DescribeCollectionParam describeCollectionParam = DescribeCollectionParam.newBuilder()
            .withCollectionName(collectionName)
            .build();

        R<DescribeCollectionResponse> collectionInfo = client.describeCollection(describeCollectionParam);

        if (collectionInfo.getException() != null) {
            System.err.println("Failed to describe collection: " + collectionInfo.getException().getMessage());
            return;            
        }

        DescCollResponseWrapper descCollResponseWrapper = new DescCollResponseWrapper(collectionInfo.getData());

        System.out.println(descCollResponseWrapper);

        // Output:
        // Collection Description{name:'medium_articles', description:'', id:445337000188271120, shardNumber:1, createdUtcTimestamp:1698906291178, aliases:[], fields:[FieldType{name='id', type='Int64', elementType='None', primaryKey=true, partitionKey=false, autoID=false, params={}}, FieldType{name='vector', type='FloatVector', elementType='None', primaryKey=false, partitionKey=false, autoID=false, params={dim=768}}], isDynamicFieldEnabled:true}
    }
    
}
    
```

</TabItem>

<TabItem value='bash'>

```bash
# token="username:password" or token="your-api-key"
curl --location --request POST "${PUBLIC_ENDPOINT}/v1/vector/collections/create" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    --header "Accept: */*" \
    --data '{
        "collectionName": "medium_articles_2020",
        "dimension": 768
    }'

# Output:
# {"code":200,"data":{}}
```

</TabItem>
</Tabs>

执行上述代码后，您将授权 Zilliz Cloud 管理某些默认设置：

- 主键
Zilliz Cloud 将自动创建一个称为 `id` 的主键。

- 向量字段

    Zilliz Cloud 将初始化一个名为 `vector` 的默认向量字段。

    此外，以这种方式建立的集合将自动启用动态 Schema 功能。当此功能启用时，Zilliz Cloud 能够在数据插入过程中，自动将所有未定义的字段作为动态字段保存。

## 数据类型{#supported-data-types}

Zilliz Cloud 目前支持以下类型的数据：

- 布尔值：BOOLEAN

- 浮点数：DOUBLE（8 字节）和 FLOAT（4 字节）

- 整数：INT8（8 位）、INT32（32 位）和 INT64（64 位）

- 浮点向量：FLOAT_VECTOR

- 字符：VARCHAR

- 结构化数据类型：[JSON](./javascript-object-notation-json)

这些数据类型可作为 Collection 的 Schema 的基本元素。

## 使用限制{#limits}

|  __类型__         |  __最大数量__                         |  __描述__                                                                 |
| --------------- | --------------------------------- | ----------------------------------------------------------------------- |
|  企业版集群<br/>  |  每 CU：\<= 64<br/> 每集群：\<= 4096 |  在企业版集群中，每个计算单元（CU）可创建最多 64 个 Collection，并且集群中的 Collection 总数不能超过 4096。 |

有关更多信息，请参阅[使用限制](./limits)。

## 相关文档{#related-topics}

- [删除 Collection](./drop-collection)

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-query-and-get)

- [开启动态 Schema](./enable-dynamic-schema)

- [JSON](./javascript-object-notation-json)

