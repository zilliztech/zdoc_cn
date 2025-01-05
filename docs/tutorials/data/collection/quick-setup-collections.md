---
title: "快速创建 Collection | Cloud"
slug: /quick-setup-collections
sidebar_label: "快速创建 Collection"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持通过仅指定 Collection 名称和向量列维度的方式快速完成 Collection 的创建。通过这种方式创建的 Collection 在创建完成时，Zilliz Cloud 已为其向量列创建索引并加载 Collection 到内存。 | Cloud"
type: origin
token: KQc2we5MciKqtVkDxVkcnQTCnZg
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理
  - create collection
  - 创建 collection
  - quick-setup
  - 快速创建

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 快速创建 Collection

Zilliz Cloud 支持通过仅指定 Collection 名称和向量列维度的方式快速完成 Collection 的创建。通过这种方式创建的 Collection 在创建完成时，Zilliz Cloud 已为其向量列创建索引并加载 Collection 到内存。

## 概述{#overview}

Collection 是一张二维数据表，包含固定列数和可变行数。Collection 数据表中的每 1 列对应 1 个字段，每 1 行表示 1 个 Entity。为了实现这种结构化的数据管理方式，我们需要为 Collection 指定 Schema，并在插入 Entity 时，确保每个插入的 Entity 都符合 Schema 的要求。

在 AIGC 应用中，通常会使用向量数据库做为知识库来管理用户和大语言模型（LLM）交互过程中产生的数据。这类知识库的数据结构大体相似。为了便于向量数据库在此类应用中落地，Zilliz Cloud 基于现有的 Collection 设计，为用户提供了仅需指定 Collection 名称和向量列维度就可以快速创建 Collection 的方法。

简单来说，快速建表流程使用了默认的索引类型和相似度类型为向量字段创建了索引，并在 Collection 完成创建后，立即将 Collection 的索引加载到内存。具体完成的操作如下：

- 使用默认名称（即 **id** 和 **vector**）创建了一个主键字段和一个向量字段；

- 默认主键字段 **id** 仅接收 **Int64** 类型的数据，且不会随着数据插入自动递增（即关闭 **AutoId**）；

- 默认向量字段 **vector** 仅接收 **FLOAT_VECTOR** 类型的数据，

- 默认在 Collection 创建完毕后为向量字段创建索引类型为 **AUTOINDEX** 的索引文件。

- 默认采用 **COSINE** 相似度类型度量向量间的相似性；

- 默认开启名为 **$meta** 的 **Dynamic Field** ，以键值对的方式存储未在 **Schema** 中定义的其他字段和字段值。

- 默认在为向量字段创建索引后自动加载索引文件到内存；

如果您对上述列表中出现的术语存在疑问，可以查看[了解 Collection](./manage-collections)中的相关描述。如上所述，快速创建 Collection 并不适用于所有场景，熟悉[创建 Collection](./manage-collections-sdks)的通用流程会让您更好地了解 Zilliz Cloud 的各项能力。

## 最简方式{#quick-setup}

在此方式中，您仅需提供 Collection 名称和向量列维度就可以创建一个 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
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
String TOKEN = "YOUR_CLUSTER_TOKEN";

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
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

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

<TabItem value='go'>

```go
import "github.com/milvus-io/milvus/client/v2/milvusclient"

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

collectionName := `quick_setup`

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    // handle err
}

err = cli.CreateCollection(ctx, milvusclient.SimpleCreateCollectionOptions(collectionName, 5))
if err != nil {
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "quick_setup",
    "dimension": 5
}'

# {
#     "code": 0,
#     "data": {}
# }
```

</TabItem>
</Tabs>

## 快速自定义{#quick-setup-with-custom-fields}

如果通过最简方式在字段命名、字段数据类型和 Collection 使用的相似度类型方面无法满足需求，你还可以通过快速自定义的方式调整这些设置。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
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
    collection_name="custom_quick_setup",
    dimension=5,
    primary_field_name="my_id",
    id_type="string",
    vector_field_name="my_vector",
    metric_type="L2",
    auto_id=True,
    max_length=512
)

res = client.get_load_state(
    collection_name="custom_quick_setup"
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
String TOKEN = "YOUR_CLUSTER_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq customQuickSetupReq = CreateCollectionReq.builder()
        .collectionName("custom_quick_setup")
        .dimension(5)
        .primaryFieldName("my_id")
        .idType(DataType.VarChar)
        .maxLength(512)
        .vectorFieldName("my_vector")
        .metricType("L2")
        .autoID(true)
        .build();

client.createCollection(customQuickSetupReq);

GetLoadStateReq customQuickSetupLoadStateReq = GetLoadStateReq.builder()
        .collectionName("custom_quick_setup")
        .build();

Boolean res = client.getLoadState(customQuickSetupLoadStateReq);
System.out.println(res);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 1. Set up a Milvus Client
const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

// 2. Create a collection in quick setup mode
let res = await client.createCollection({
    collection_name: "custom_quick_setup",
    dimension: 5,
    primary_field_name: "my_id",
    id_type: "Varchar",
    max_length: 512,
    vector_field_name: "my_vector",
    metric_type: "L2",
    auto_id: true
});  

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "custom_quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

</TabItem>

<TabItem value='go'>

```go
// Go 缺失
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "custom_quick_setup",
    "dimension": 5,
    "primaryFieldName": "my_id",
    "idType": "VarChar",
    "vectorFieldName": "my_vector",
    "metricType": "L2",
    "autoId": true,
    "params": {
        "max_length": "512"
    }
}'
```

</TabItem>
</Tabs>

如果上述两种方式均无法满足您的需求，可以参考[自定义创建 Collection](./manage-collections-sdks)一节来自定义您的 Collection。