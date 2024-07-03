---
slug: /enable-dynamic-field
beta: FALSE
notebook: FALSE
type: origin
token: EpHowtn3miepTyk2pNlcLwDonyD
sidebar_position: 16

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 开启动态字段

本小节将介绍如何使用 Collection 中预留的动态字段灵活存取数据。

## 概述{#overview}

在 Zilliz Cloud 上，您可以通过设置 Collection 各字段的名称及数据类型来创建 Collection 的 Schema。在完成字段创建后，您还可以为各字段创建索引来提升检索效率。

当您在 Schema 中增加一个字段后，您应该确保待插入数据里包含该字段。如果您的数据集各条记录包含的字段不一致，您可能就会用到预留的动态字段。

动态字段是一个名为 **$meta** 的预留 JavaScript Object Notation (JSON) 字段。待插入数据中的所有未在 Schema 中定义的字段都会以键值对的方式存放在这个预留的 JSON 字段里。对于开启了动态字段的 Collection 而言，您可以轻松完成针对任何字段的标量查询，无论该字段是 Schema 中定义了的静态字段还是 **$meta** 中存放的动态字段。

## 开启动态字段{#enable-dynamic-field}

如需开启动态字段，需要在定义 Schema 时将 `enable_dynamic_field` 设置为 `True`。开启动态字段后，待插入数据中的所有未定义字段将以键值对的形式存入预留的动态字段中。

如下代码使用快速建表方式创建了一个包含两个静态字段的 Collection，并开启了动态字段。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
import random, time
from pymilvus import connections, MilvusClient, DataType

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
schema = MilvusClient.create_schema(
    auto_id=False,
    # highlight-next-line
    enable_dynamic_field=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)

index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="id",
    index_type="STL_SORT"
)

index_params.add_index(
    field_name="vector",
    index_type="IVF_FLAT",
    metric_type="L2",
    params={"nlist": 1024}
)

client.create_collection(
    collection_name="test_collection",
    schema=schema,
    index_params=index_params
)

res = client.get_load_state(
    collection_name="test_collection"
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
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_CLUSTER_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in customized setup mode

// 2.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// 2.2 Add fields to schema
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(true).autoID(false).build());
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(5).build());

// 2.3 Prepare index parameters
IndexParam indexParamForIdField = IndexParam.builder()
    .fieldName("id")
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("vector")
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.IP)
    .extraParams(Map.of("nlist", 1024))
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);

// 2.4 Create a collection with schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
    .collectionName("customized_setup")
    .collectionSchema(schema)
    .indexParams(indexParams)
    // highlight-next-line
    .enableDynamicField(true)
    .build();

client.createCollection(customizedSetupReq);

Thread.sleep(5000);

// 2.5 Get load state of the collection
GetLoadStateReq customSetupLoadStateReq1 = GetLoadStateReq.builder()
    .collectionName("customized_setup")
    .build();

boolean res = client.getLoadState(customSetupLoadStateReq1);

System.out.println(res);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient, DataType, sleep } = require("@zilliz/milvus2-sdk-node")

const address = "YOUR_CLUSTER_ENDPOINT"
const token = "YOUR_CLUSTER_TOKEN"

async function main() {
// 1. Set up a Milvus Client
client = new MilvusClient({address, token}); 

// 2. Create a collection
// 2.1 Define fields
const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
]

// 2.2 Prepare index parameters
const index_params = [{
    field_name: "id",
    index_type: "STL_SORT"
},{
    field_name: "vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]

// 2.3 Create a collection with fields and index parameters
res = await client.createCollection({
    collection_name: "test_collection",
    fields: fields, 
    index_params: index_params,
    // highlight-next-line
    enable_dynamic_field: true
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "test_collection",
})  

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

</TabItem>
</Tabs>

## 动态插入数据{#insert-dynamic-data}

Collection 创建完成后，您就可以向该 Collection 中插入 Schema 中未定义的字段了。

### 准备数据{#prepare-data}

在如下代码中，我们准备了一些随机生成的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    current_tag = random.randint(1000, 9999)
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "tag": current_tag,
        "color_tag": f"{current_color}_{str(current_tag)}"
    })

print(data[0])
```

</TabItem>

<TabItem value='java'>

```java
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JSONObject> data = new ArrayList<>();

for (int i=0; i<1000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    int current_tag = rand.nextInt(8999) + 1000;
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("tag", current_tag);
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}

System.out.println(JSONObject.toJSON(data.get(0)));
```

</TabItem>

<TabItem value='javascript'>

```javascript
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
var data = []

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)]
    const current_tag = Math.floor(Math.random() * 8999 + 1000)
    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: current_color,
        tag: current_tag,
        color_tag: `${current_color}_${current_tag}`
    })
}

console.log(data[0])
```

</TabItem>
</Tabs>

您可以打印第一行数据查看随机生成的数据结构。

```json
{
    id: 0,
    vector: [
        0.1275656405044483,
        0.47417858592773277,
        0.13858264437643286,
        0.2390904907020377,
        0.8447862593689635
    ],
    color: 'blue',
    tag: 2064,
    color_tag: 'blue_2064'
}
```

### 插入数据{#insert-data}

数据准备完成后便可以开始插入数据了。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
res = client.insert(
    collection_name="test_collection",
    data=data,
)

print(res)

# Output
#
# {
#     "insert_count": 1000,
#     "ids": [
#         0,
#         1,
#         2,
#         3,
#         4,
#         5,
#         6,
#         7,
#         8,
#         9,
#         "(990 more items hidden)"
#     ]
# }

time.sleep(5)
```

</TabItem>

<TabItem value='java'>

```java
// 3.1 Insert data into the collection
InsertReq insertReq = InsertReq.builder()
    .collectionName("customized_setup")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}

Thread.sleep(5000);
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.insert({
    collection_name: "test_collection",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 

await sleep(5000)
```

</TabItem>
</Tabs>

## 使用动态字段进行搜索{#search-with-dynamic-fields}

如果前面的所有步骤都已完成，我们就可以在搜索或查询的表达式中使用动态字段。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Search with dynamic fields
query_vectors = [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter="color in [\"red\", \"green\"]",
    search_params={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 863,
#             "distance": 0.188413605093956,
#             "entity": {
#                 "id": 863,
#                 "color_tag": "red_2371"
#             }
#         },
#         {
#             "id": 799,
#             "distance": 0.29188022017478943,
#             "entity": {
#                 "id": 799,
#                 "color_tag": "red_2235"
#             }
#         },
#         {
#             "id": 564,
#             "distance": 0.3492690920829773,
#             "entity": {
#                 "id": 564,
#                 "color_tag": "red_9186"
#             }
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='java'>

```java
// 4. Search with non-schema-defined fields
List<List<Float>> queryVectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

SearchReq searchReq = SearchReq.builder()
    .collectionName("customized_setup")
    .data(queryVectors)
    .filter("$meta[\"color\"] in [\"red\", \"green\"]")
    .outputFields(List.of("id", "color_tag"))
    .topK(3)
    .build();

SearchResp searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));

// Output:
// {"searchResults": [[
//     {
//         "distance": 1.3159835,
//         "id": 979,
//         "entity": {
//             "color_tag": "red_7155",
//             "id": 979
//         }
//     },
//     {
//         "distance": 1.0744804,
//         "id": 44,
//         "entity": {
//             "color_tag": "green_8006",
//             "id": 44
//         }
//     },
//     {
//         "distance": 1.0060014,
//         "id": 617,
//         "entity": {
//             "color_tag": "red_4056",
//             "id": 617
//         }
//     }
// ]]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Search with non-schema-defined fields
const query_vectors = [[0.1, 0.2, 0.3, 0.4, 0.5]]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "color in [\"red\", \"green\"]",
    output_fields: ["color_tag"],
    limit: 3
})

console.log(res.results)

// Output
// 
// [
//   { score: 1.2284551858901978, id: '301', color_tag: 'red_1270' },
//   { score: 1.2195171117782593, id: '205', color_tag: 'red_2780' },
//   { score: 1.2055039405822754, id: '487', color_tag: 'red_6653' }
// ]
// 
```

</TabItem>
</Tabs>

## 小结{#Recaps}

值得注意的是，`color`， `tag` 和 `color_tag` 没有预先定义在 Schema 中，但这也并不影响在表达式和输出字段中使用它们。

如果动态字段包含了除数字、字母及下划线之外的诸如加号（+）、星号（*）或美元符号（$）等其它特殊字符，我们需要使用`$meta[]`关键字在表达式或输出字段中引入这些字段。

```python
... 
expr='$meta["$key"] in ["a", "b", "c"]', 
output_fields='$meta["$key"]'  
...
```

## 相关文档{#related-topics}

- [管理 Collection](./manage-collections)

- [使用 Partition Key](./use-partition-key)

- [使用 JSON 类型字段](./use-json-fields) 

