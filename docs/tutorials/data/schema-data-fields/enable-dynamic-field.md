---
title: "Dynamic Field | Cloud"
slug: /enable-dynamic-field
sidebar_label: "Dynamic Field"
beta: FALSE
notebook: FALSE
description: "所有在 Schema 中定义的字段都需要包含在待插入的 Entity 中。如果希望部分字段为可选，可以考虑启用 Dynamic Field。本节将介绍如何启用及使用 Dynamic Field。 | Cloud"
type: origin
token: C6tVwPqeBiqNCwkbdCcc9dTpnYe
sidebar_position: 10
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - 动态字段
  - $meta
  - JSON 字段

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Field

所有在 Schema 中定义的字段都需要包含在待插入的 Entity 中。如果希望部分字段为可选，可以考虑启用 Dynamic Field。本节将介绍如何启用及使用 Dynamic Field。

## 概述{#overview}

在 Zilliz Cloud clusters 上，您可以通过设置 Collection 各字段的名称及数据类型来创建 Collection 的 Schema。当您在 Schema 中增加一个字段后，您应该确保待插入 Entity 里包含该字段。如果您希望部分字段为可选，启用预留的 Dynamic Field 是选项之一。

Dynamic Field 是一个名为 **$meta** 的预留 JavaScript Object Notation (JSON) 类型的字段。待插入 Entity 中的所有未在 Schema 中定义的字段都会以键值对的方式存放在这个预留的 JSON 字段里。

对于开启了 Dynamic Field 的 Collection 而言，在进行标量过滤时，您可以像使用 Schema 中定义的字段一样使用 Dynamic Field 中的键。

## 开启动态字段{#enable-dynamic-field}

使用快速建表的方式创建的 Collection 默认开启动态字段。您也可以在自定义创建 Collection 时手动开启动态字段。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client= MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

client.create_collection(
    collection_name="my_collection",
    dimension=5,
    # highlight-next-line
    enable_dynamic_field=True
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build());
        
CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
    .collectionName("my_collection")
    .dimension(5)
    // highlight-next-line
    .enableDynamicField(true)
    .build()
client.createCollection(createCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new Client({
    address: 'YOUR_CLUSTER_ENDPOINT'
});

await client.createCollection({
    collection_name: "customized_setup_2",
    schema: schema,
    // highlight-next-line
    enable_dynamic_field: true
});
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)  

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
defer client.Close(ctx)

err = client.CreateCollection(ctx, milvusclient.SimpleCreateCollectionOptions("my_collection", 5).
    WithAutoID(false).
    WithDynamicSchema(true))
if err != nil {
    fmt.Println(err.Error())
}
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "dimension": 5,
    "enableDynamicField": true
}'
```

</TabItem>
</Tabs>

## 使用动态字段{#use-dynamic-field}

当您的 Collection 中启用了动态字段后，待插入 Entity 中所有未在 Schema 中定义的字段及其值都会以键值对的形式存放在动态字段中。

假设您的 Collection Schema 中仅定义了名为 `id` 和 `vector` 的两个字段，并开启了 Dynamic Field。现在，您需要向该 Collection 插入如下数据集。

```json
[
    {id: 0, vector: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], color: "pink_8682"},
    {id: 1, vector: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], color: "red_7025"},
    {id: 2, vector: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], color: "orange_6781"},
    {id: 3, vector: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], color: "pink_9298"},
    {id: 4, vector: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], color: "red_4794"},
    {id: 5, vector: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], color: "yellow_4222"},
    {id: 6, vector: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], color: "red_9392"},
    {id: 7, vector: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], color: "grey_8510"},
    {id: 8, vector: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], color: "white_9381"},
    {id: 9, vector: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], color: "purple_4976"}        
]
```

通过观察可以发现，数据集中有 10 条记录，每条记录中都包含 `id`、`vector` 和 `color` 三个字段。其中，`color` 字段未在 Schema 中定义。在 Collection 开启了 Dynamic Field 的情况下，该字段将以键值对的方式存放于 Dynamic Field 中。

### 插入数据集{#insert-data}

如下代码演示了如何向 Collection 中插入该数据集。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data=[
    {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
    {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
    {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
    {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
    {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
    {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
    {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
    {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
    {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
    {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}
]

res = client.insert(
    collection_name="my_collection",
    data=data
)

print(res)

# Output
# {'insert_count': 10, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;
   
Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 0, \"vector\": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], \"color\": \"pink_8682\"}", JsonObject.class),
        gson.fromJson("{\"id\": 1, \"vector\": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], \"color\": \"red_7025\"}", JsonObject.class),
        gson.fromJson("{\"id\": 2, \"vector\": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], \"color\": \"orange_6781\"}", JsonObject.class),
        gson.fromJson("{\"id\": 3, \"vector\": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], \"color\": \"pink_9298\"}", JsonObject.class),
        gson.fromJson("{\"id\": 4, \"vector\": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], \"color\": \"red_4794\"}", JsonObject.class),
        gson.fromJson("{\"id\": 5, \"vector\": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], \"color\": \"yellow_4222\"}", JsonObject.class),
        gson.fromJson("{\"id\": 6, \"vector\": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], \"color\": \"red_9392\"}", JsonObject.class),
        gson.fromJson("{\"id\": 7, \"vector\": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], \"color\": \"grey_8510\"}", JsonObject.class),
        gson.fromJson("{\"id\": 8, \"vector\": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], \"color\": \"white_9381\"}", JsonObject.class),
        gson.fromJson("{\"id\": 9, \"vector\": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], \"color\": \"purple_4976\"}", JsonObject.class)
);

InsertReq insertReq = InsertReq.builder()
        .collectionName("my_collection")
        .data(data)
        .build();

InsertResp insertResp = client.insert(insertReq);
System.out.println(insertResp);

// Output:
//
// InsertResp(InsertCnt=10, primaryKeys=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { DataType } = require("@zilliz/milvus2-sdk-node")

// 3. Insert some data

const data = [
    {id: 0, vector: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], color: "pink_8682"},
    {id: 1, vector: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], color: "red_7025"},
    {id: 2, vector: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], color: "orange_6781"},
    {id: 3, vector: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], color: "pink_9298"},
    {id: 4, vector: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], color: "red_4794"},
    {id: 5, vector: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], color: "yellow_4222"},
    {id: 6, vector: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], color: "red_9392"},
    {id: 7, vector: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], color: "grey_8510"},
    {id: 8, vector: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], color: "white_9381"},
    {id: 9, vector: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], color: "purple_4976"}        
]

const res = await client.insert({
    collection_name: "quick_setup",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 10
// 
```

</TabItem>

<TabItem value='go'>

```go
dynamicColumn := column.NewColumnString("color", []string{
    "pink_8682", "red_7025", "orange_6781", "pink_9298", "red_4794", "yellow_4222", "red_9392", "grey_8510", "white_9381", "purple_4976",
})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("id", []int64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
        {0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345},
        {0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106},
        {0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955},
        {0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987},
        {-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052},
        {0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336},
        {0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608},
    }).
    WithColumns(dynamicColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
        {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
        {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
        {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
        {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
        {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
        {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
        {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}        
    ],
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": {
#         "insertCount": 10,
#         "insertIds": [
#             0,
#             1,
#             2,
#             3,
#             4,
#             5,
#             6,
#             7,
#             8,
#             9
#         ]
#     }
# }
```

</TabItem>
</Tabs>

### 为动态字段创建索引{#index-a-scalar-field-in-the-dynamic-field}

当您启用动态字段后，插入的数据中所有未在 Schema 中字义的字段都会以键值对的形式存入动态字段。Zilliz Cloud clusters 支持为这些 Schema 中未定义的字段创建索引，只需要您在创建索引时指定这些字段的 JSON 路径。您需要：

1. **在动态字段中选择需要创建索引的键名**。

    比如，您可以选择为上述示例中的 `color` 键创建索引。

1. **为所有在该键上的值指定强制转换类型**。

    在创建索引时，Zilliz Cloud clusters 会解析动态字段，抽取指定键值，并将其强制转换为指定的数值类型。

    - 支持的强制转换类型包括`bool`（或 `BOOL`）、`double`（或 `DOUBLE`）、以及 `varchar`（或 `VARCHAR`）。

    - 索引中不会饮食解析或强制转换失败（例如，尝试将字段串转换成双精度数值）的所有 Entity。

1. **使用** `json_path` **参数指定某个键所在路径。**

    因为动态字段本质就是一个预留的 JSON 字段。您既可以使用 `color` 作为索引路径，也可以在有嵌套结构时，使用更深的索引路径（如：`my_json["field"]["subfield"]`）。

1. **为指定路径创建 INVERTED 索引。**

    当前，仅支持使用 INVERTED 索引为指定的 JSON 路径创建索引。

关于参数或创建索引时的注意事项，可以参考[为 JSON 字段创建索引](./use-json-fields#index-a-json-field)。

如下示例演示了如何为 `color` 这个未在 Schema 中定义的字段创建索引。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Prepare index parameters
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="color",               # Name of the "column" you see in queries (the dynamic key).
    index_type="INVERTED",            # Currently only "INVERTED" is supported for indexing JSON fields.
    index_name="color_index",         # Assign a name to this index.
    params={
        "json_path": "color",         # JSON path to the key you want to index.
        "json_cast_type": "varchar"   # Type to which Milvus will cast the extracted values.
    }
)

# Create the index
client.create_index(
    collection_name="my_collection",
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

List<IndexParam> indexes = new ArrayList<>();

Map<String,Object> extraParams = new HashMap<>();
extraParams.put("json_path", "color");
extraParams.put("json_cast_type", "varchar");
indexes.add(IndexParam.builder()
        .fieldName("color")
        .indexName("color_index")
        .indexType(IndexParam.IndexType.INVERTED)
        .extraParams(extraParams)
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName("my_collection")
        .indexParams(indexes)
        .build());
```

</TabItem>

<TabItem value='go'>

```go
indexTask, err := client.CreateIndex(ctx, milvusclient.NewCreateIndexOption("my_collection", "color",
    index.NewJSONPathIndex(index.Inverted, "varchar", "color")))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

err = indexTask.Await(ctx)
if err != nil {
    fmt.Println(err.Error())
    // handler err
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
const index_params = {
    field_name: "color",               // Name of the "column" you see in queries (the dynamic key).
    index_type: "INVERTED",            // Currently only "INVERTED" is supported for indexing JSON fields.
    index_name: "color_index",         // Assign a name to this index.
    params:{
        "json_path": "color",          // JSON path to the key you want to index.
        "json_cast_type": "varchar"   // Type to which Milvus will cast the extracted values.
    }
}

// Create the index
await client.create_index({
    collection_name: "my_collection",
    index_params: index_params
});
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "indexParams": [
        {
            "fieldName": "color",
            "indexName": "color_index",
            "indexType": "INVERTED",
            "params": {
                "json_path": "color",
                "json_cast_type": "varchar"
            }
        }
    ]
}'
```

</TabItem>
</Tabs>

### 使用动态字段进行查询和搜索{#query-search-with-dynamic-field}

Zilliz Cloud clusters 支持在查询和搜索时使用过滤条件表达式，并在查询和搜索的结果中指定需要包含的字段。如下示例将使用 Schema 中未定义的 `color` 字段为例演示如何使用动态字段进行查询和搜索。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    limit=5,
    # highlight-start
    filter='color like "red%"',
    output_fields=["color"]
    # highlight-end
)

print(res)

# Output
# data: ["[{'id': 1, 'distance': 0.6290165185928345, 'entity': {'color': 'red_7025'}}, {'id': 4, 'distance': 0.5975797176361084, 'entity': {'color': 'red_4794'}}, {'id': 6, 'distance': -0.24996188282966614, 'entity': {'color': 'red_9392'}}]"] 

```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});
SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("vector")
        .data(Collections.singletonList(queryVector))
        .outputFields(Collections.singletonList("color"))
        .filter("color like \"red%\"")
        .topK(5)
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [[
//    SearchResp.SearchResult(entity={color=red_7025}, score=0.6290165, id=1),
//    SearchResp.SearchResult(entity={color=red_4794}, score=0.5975797, id=4), 
//    SearchResp.SearchResult(entity={color=red_9392}, score=-0.24996188, id=6)
//]]

```

</TabItem>

<TabItem value='javascript'>

```javascript
const query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

const res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    // highlight-start
    filters: "color like \"red%\"",
    output_fields: ["color"]
    // highlight-end
});
```

</TabItem>

<TabItem value='go'>

```go
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,                       // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithFilter("color like \"red%\"").
    WithANNSField("vector").
    WithOutputFields("color"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("color: ", resultSet.GetColumn("color").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    "annsField": "vector",
    "filter": "color like \"red%\"",
    "limit": 3,
    "outputFields": ["color"]
}'
# {"code":0,"cost":0,"data":[{"color":"red_7025","distance":0.6290165,"id":1},{"color":"red_4794","distance":0.5975797,"id":4},{"color":"red_9392","distance":-0.24996185,"id":6}]}
```

</TabItem>
</Tabs>

在上述代码示例中使用的过滤条件表达式 `color like "red%" and likes > 50` 中包含了如下过滤条件，即 **color** 字段的值须以 **red** 开头。在示例数据中，符合此条件的数据只有两条，因此在满足 **topK** 小于等于 **3** 的情况下，这两条数据会全部返回。

```json
[
    {
        "id": 1, 
        "distance": 0.6290165,
        "entity": {
            "color": "red_7025"
        }
    },
    {
        "id": 4, 
        "distance": 0.5975797,
        "entity": {
            "color": "red_4794"
        }
    },
    {
        "id": 6, 
        "distance": -0.24996188，
        "entity": {
            "color": "red_9392"
        }
    },
]
```

