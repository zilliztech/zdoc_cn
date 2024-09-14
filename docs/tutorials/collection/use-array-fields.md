---
title: "使用 Array 类型字段 | Cloud"
slug: /use-array-fields
sidebar_label: "使用 Array 类型字段"
beta: FALSE
notebook: FALSE
description: "本节将帮助您了解如何使用 Array 类型的字段，包括插入数组，使用简单和高级操作符在数组字段中进行标量过滤等。 | Cloud"
type: origin
token: AOIown5u9iLVhCkzF0acjABNnvc
sidebar_position: 19
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - array 字段

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用 Array 类型字段

本节将帮助您了解如何使用 Array 类型的字段，包括插入数组，使用简单和高级操作符在数组字段中进行标量过滤等。

## 概述{#overview}

Zilliz Cloud 支持在 Collection 中使用 Array 类型的字段。如果需要在 Collection 中添加一个 Array 类型的字段，还需要设置该字段包含的元素类型和最大元素数量。这就意味着 Collection 中 Array 类型的字段中各元素的数据类型须保持一致。

如下代码随机生成一组数据，其中包含一个数组字段。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    current_tag = random.randint(1000, 9999)
    current_coord = [ random.randint(0, 40) for _ in range(random.randint(3, 5)) ]
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "color_tag": current_tag,
        "color_coord": current_coord,
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
    Long current_tag = rand.nextLong(8999L) + 1000L;

    // Generate an random-sized array
    Long capacity = rand.nextLong(5L) + 1L;
    List<Long> current_coord = new ArrayList<>();
    current_coord.add(rand.nextLong(40L) + 1L);
    current_coord.add(rand.nextLong(40L) + 1L);
    for (int j=3; j<capacity; j++) {
        current_coord.add(rand.nextLong(40L) + 1L);
    }

    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("color_tag", current_tag);
    row.put("color_coord", current_coord);
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
    const current_coord = Array(Math.floor(Math.random() * 5 + 1)).fill(0).map(() => Math.floor(Math.random() * 40))

    data.push({
        id: i,
        vector: Array(5).fill(0).map(() => Math.random()),
        color: current_color,
        color_tag: current_tag,
        color_coord: current_coord,
    })
}

console.log(data[0])
```

</TabItem>
</Tabs>

您可以通过查看随机生成的数据中的第一条记录来了解随机生成的数据结构。

```json
{
    id: 0,
    vector: [
        0.0338537420906162,
        0.6844108238358322,
        0.28410588909961754,
        0.09752595400212116,
        0.22671013058761114
    ],
    color: 'orange',
    color_tag: 5677,
    color_coord: [ 3, 0, 18, 29 ]
}
```

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>数组字段中的元素数据类型（Data Type）须保持一致。</p></li>
<li><p>数组字段中包含的元素数量须小于定义该字段时指定的最大容量（Max Capacity）。</p></li>
</ul>

</Admonition>

## 定义 Array 字段{#define-array-field}

定义数组字段的过程与定义其他类型字段的过程相同。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
import random, time
from pymilvus import MilvusClient, DataType

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
    enable_dynamic_field=False,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="color", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="color_tag", datatype=DataType.INT64)
# highlight-next-line
schema.add_field(field_name="color_coord", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5)

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
schema.addField(AddFieldReq.builder()
    .fieldName("id")
    .dataType(DataType.Int64)
    .isPrimaryKey(true)
    .autoID(false)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName("vector")
    .dataType(DataType.FloatVector)
    .dimension(5)
    .build());
    
schema.addField(AddFieldReq.builder()
    .fieldName("color")
    .dataType(DataType.VarChar)
    .maxLength(512)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName("color_tag")
    .dataType(DataType.Int64)
    .build());

// highlight-start
schema.addField(AddFieldReq.builder()
    .fieldName("color_coord")
    .dataType(DataType.Array)
    .elementType(DataType.Int64)
    .maxCapacity(5)
    .build());
// highlight-end

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

IndexParam indexParamForColorField = IndexParam.builder()
    .fieldName("color")
    .indexType(IndexParam.IndexType.TRIE)
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
indexParams.add(indexParamForColorField);

// 2.4 Create a collection with schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
    .collectionName("test_collection")
    .collectionSchema(schema)
    .indexParams(indexParams)         
    .build();

client.createCollection(customizedSetupReq);

// 2.5 Check if the collection is loaded
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("test_collection")
    .build();

Boolean isLoaded = client.getLoadState(getLoadStateReq);

System.out.println(isLoaded);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient, DataType, sleep } = require("@zilliz/milvus2-sdk-node")

const address = "YOUR_CLUSTER_ENDPOINT"
const token = "YOUR_CLUSTER_TOKEN"

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
    {
        name: "color",
        data_type: DataType.VarChar,
        max_length: 512
    },
    {
        name: "color_tag",
        data_type: DataType.Int64,
    },
// highlight-start
    {
        name: "color_coord",
        data_type: DataType.Array,
        element_type: DataType.Int64,
        max_capacity: 5
    }
// highlight-end
]

// 2.2 Prepare index parameters
const index_params = [{
    field_name: "vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]

// 2.3 Create a collection with fields and index parameters
res = await client.createCollection({
    collection_name: "test_collection",
    fields: fields, 
    index_params: index_params
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

## 插入字段值{#insert-field-values}

Collection 创建完毕后，就可以向 Collection 中插入[概述](./use-array-fields#overview)中随机生成的数据了。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
res = client.insert(
    collection_name="test_collection",
    data=data
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
import com.alibaba.fastjson.JSONObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

// 3.1 Insert data into the collection
InsertReq insertReq = InsertReq.builder()
    .collectionName("test_collection")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}

Thread.sleep(5000);   // wait for a while to ensure the data is indexed
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

## 简单标量过滤{#basic-scalar-filtering}

在插入所有数据后，就可以像使用其它类型的标量字段一样使用数组中的元素进行检索和查询了。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Basic search with the array field
query_vectors = [ [ random.uniform(-1, 1) for _ in range(5) ]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter="color_coord[0] < 10",
    search_params={
        "metric_type": "L2",
        "params": {"nprobe": 16}
    },
    output_fields=["id", "color", "color_tag", "color_coord"],
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 993,
#             "distance": 0.1538649946451187,
#             "entity": {
#                 "color_coord": [
#                     5,
#                     37,
#                     39,
#                     18
#                 ],
#                 "id": 993,
#                 "color": "black",
#                 "color_tag": 6785
#             }
#         },
#         {
#             "id": 452,
#             "distance": 0.2353954315185547,
#             "entity": {
#                 "color_coord": [
#                     2,
#                     27,
#                     34,
#                     32,
#                     30
#                 ],
#                 "id": 452,
#                 "color": "brown",
#                 "color_tag": 2075
#             }
#         },
#         {
#             "id": 862,
#             "distance": 0.27913951873779297,
#             "entity": {
#                 "color_coord": [
#                     0,
#                     19,
#                     0,
#                     26
#                 ],
#                 "id": 862,
#                 "color": "brown",
#                 "color_tag": 1787
#             }
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='java'>

```java
// 4. Basic search with an Array field

QueryReq queryReq = QueryReq.builder()
    .collectionName("test_collection")
    .filter("color_coord[0] in [7, 8, 9]")
    .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
    .limit(3L)
    .build();

QueryResp queryResp = client.query(queryReq);

System.out.println(JSONObject.toJSON(queryResp));

// Output:
// {"queryResults": [
//     {"entity": {
//         "color": "orange",
//         "color_tag": 2464,
//         "id": 18,
//         "color_coord": [
//             9,
//             30
//         ]
//     }},
//     {"entity": {
//         "color": "pink",
//         "color_tag": 2602,
//         "id": 22,
//         "color_coord": [
//             8,
//             34,
//             16
//         ]
//     }},
//     {"entity": {
//         "color": "pink",
//         "color_tag": 1243,
//         "id": 42,
//         "color_coord": [
//             9,
//             20
//         ]
//     }}
// ]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Basic search with the array field
const query_vectors = [Array(5).fill(0).map(() => Math.random())]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "color_coord[0] < 10",
    output_fields: ["id", "color", "color_tag", "color_coord"],
    limit: 3
})

console.log(JSON.stringify(res.results, null, 4))

// Output
// 
// [
//     {
//         "score": 2.015894889831543,
//         "id": "260",
//         "color": "green",
//         "color_tag": "5320",
//         "color_coord": [
//             "1",
//             "7",
//             "33",
//             "13",
//             "23"
//         ]
//     },
//     {
//         "score": 2.006500720977783,
//         "id": "720",
//         "color": "green",
//         "color_tag": "4939",
//         "color_coord": [
//             "0",
//             "19",
//             "5",
//             "30",
//             "15"
//         ]
//     },
//     {
//         "score": 1.9539016485214233,
//         "id": "243",
//         "color": "red",
//         "color_tag": "2403",
//         "color_coord": [
//             "4"
//         ]
//     }
// ]
// 
```

</TabItem>
</Tabs>

## 高级标量过滤{#advanced-scalar-filtering}

和 JSON 字段一样，Zilliz Cloud 也针对 Array 字段提供了一系列高级过滤器，包括`ARRAY_CONTAINS`、`ARRAY_CONTAINS_ALL`、`ARRAY_CONTAINS_ANY` 和 `ARRAY_LENGTH`。

- 过滤出所有色彩集标定包含 `10` 的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 5. Advanced search within the array field
    
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS(color_coord, 10)",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 21,
    #         "color": "white",
    #         "color_tag": 4202,
    #         "color_coord": [
    #             10,
    #             5,
    #             5
    #         ]
    #     },
    #     {
    #         "id": 31,
    #         "color": "grey",
    #         "color_tag": 7386,
    #         "color_coord": [
    #             8,
    #             10,
    #             23,
    #             7,
    #             31
    #         ]
    #     },
    #     {
    #         "id": 45,
    #         "color": "purple",
    #         "color_tag": 6126,
    #         "color_coord": [
    #             0,
    #             10,
    #             24
    #         ]
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // 5. Advanced search within an Array field
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS(color_coord, 10)")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "blue",
    //         "color_tag": 4337,
    //         "id": 17,
    //         "color_coord": [
    //             11,
    //             33,
    //             10,
    //             20
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "white",
    //         "color_tag": 5219,
    //         "id": 25,
    //         "color_coord": [
    //             10,
    //             15
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "red",
    //         "color_tag": 7120,
    //         "id": 35,
    //         "color_coord": [
    //             19,
    //             10,
    //             10,
    //             14
    //         ]
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 5. Advanced search within the array field
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS(color_coord, 10)",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })
    
    console.log(JSON.stringify(res.results, null, 4))
    
    // Output
    // 
    // [
    //     {
    //         "score": 1.7962548732757568,
    //         "id": "696",
    //         "color": "red",
    //         "color_tag": "1798",
    //         "color_coord": [
    //             "33",
    //             "10",
    //             "37"
    //         ]
    //     },
    //     {
    //         "score": 1.7126177549362183,
    //         "id": "770",
    //         "color": "red",
    //         "color_tag": "1962",
    //         "color_coord": [
    //             "21",
    //             "23",
    //             "10"
    //         ]
    //     },
    //     {
    //         "score": 1.6707111597061157,
    //         "id": "981",
    //         "color": "yellow",
    //         "color_tag": "3100",
    //         "color_coord": [
    //             "28",
    //             "39",
    //             "10",
    //             "6"
    //         ]
    //     }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 过滤出所有色彩集标定包含 `7` 和 `8` 的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS_ALL(color_coord, [7, 8])",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "color": "grey",
    #         "color_tag": 7386,
    #         "color_coord": [
    #             8,
    #             10,
    #             23,
    #             7,
    #             31
    #         ],
    #         "id": 31
    #     },
    #     {
    #         "color": "purple",
    #         "color_tag": 7823,
    #         "color_coord": [
    #             38,
    #             8,
    #             36,
    #             38,
    #             7
    #         ],
    #         "id": 258
    #     },
    #     {
    #         "color": "purple",
    #         "color_tag": 6356,
    #         "color_coord": [
    #             34,
    #             32,
    #             11,
    #             8,
    #             7
    #         ],
    #         "id": 348
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS_ALL(color_coord, [7, 8, 9])")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));     
    
    // Output:
    // {"queryResults": [{"entity": {
    //     "color": "red",
    //     "color_tag": 6986,
    //     "id": 423,
    //     "color_coord": [
    //         26,
    //         7,
    //         8,
    //         9
    //     ]
    // }}]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS_ALL(color_coord, [7, 8])",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })
    
    console.log(JSON.stringify(res.results, null, 4))
    
    // Output
    // 
    // [
    //     {
    //         "score": 0.8267516493797302,
    //         "id": "913",
    //         "color": "brown",
    //         "color_tag": "8897",
    //         "color_coord": [
    //             "39",
    //             "31",
    //             "8",
    //             "29",
    //             "7"
    //         ]
    //     },
    //     {
    //         "score": 0.6889009475708008,
    //         "id": "826",
    //         "color": "blue",
    //         "color_tag": "4903",
    //         "color_coord": [
    //             "7",
    //             "25",
    //             "5",
    //             "12",
    //             "8"
    //         ]
    //     },
    //     {
    //         "score": 0.5851659774780273,
    //         "id": "167",
    //         "color": "blue",
    //         "color_tag": "1550",
    //         "color_coord": [
    //             "8",
    //             "27",
    //             "7"
    //         ]
    //     }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 过滤出所有色彩集标定包含 `7`、`8` 或 `9` 的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 0,
    #         "color": "green",
    #         "color_tag": 9212,
    #         "color_coord": [
    #             37,
    #             36,
    #             36,
    #             7,
    #             9
    #         ]
    #     },
    #     {
    #         "id": 5,
    #         "color": "blue",
    #         "color_tag": 9643,
    #         "color_coord": [
    #             8,
    #             20,
    #             20,
    #             11
    #         ]
    #     },
    #     {
    #         "id": 12,
    #         "color": "blue",
    #         "color_tag": 3075,
    #         "color_coord": [
    #             29,
    #             7,
    #             17
    #         ]
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));   
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "orange",
    //         "color_tag": 2464,
    //         "id": 18,
    //         "color_coord": [
    //             9,
    //             30
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "pink",
    //         "color_tag": 2602,
    //         "id": 22,
    //         "color_coord": [
    //             8,
    //             34,
    //             16
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "pink",
    //         "color_tag": 1243,
    //         "id": 42,
    //         "color_coord": [
    //             9,
    //             20
    //         ]
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));   
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "orange",
    //         "color_tag": 2464,
    //         "id": 18,
    //         "color_coord": [
    //             9,
    //             30
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "pink",
    //         "color_tag": 2602,
    //         "id": 22,
    //         "color_coord": [
    //             8,
    //             34,
    //             16
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "pink",
    //         "color_tag": 1243,
    //         "id": 42,
    //         "color_coord": [
    //             9,
    //             20
    //         ]
    //     }}
    // ]}
    ```

    </TabItem>
    </Tabs>

- 过滤出所有色彩集标定包含 4 个元素的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_LENGTH(color_coord) == 4",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 1,
    #         "color": "pink",
    #         "color_tag": 6708,
    #         "color_coord": [
    #             15,
    #             36,
    #             38,
    #             2
    #         ]
    #     },
    #     {
    #         "id": 4,
    #         "color": "green",
    #         "color_tag": 5386,
    #         "color_coord": [
    #             13,
    #             32,
    #             35,
    #             5
    #         ]
    #     },
    #     {
    #         "id": 5,
    #         "color": "blue",
    #         "color_tag": 9643,
    #         "color_coord": [
    #             8,
    #             20,
    #             20,
    #             11
    #         ]
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_LENGTH(color_coord) == 4")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));   
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "green",
    //         "color_tag": 2984,
    //         "id": 2,
    //         "color_coord": [
    //             27,
    //             31,
    //             23,
    //             29
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "black",
    //         "color_tag": 6867,
    //         "id": 4,
    //         "color_coord": [
    //             37,
    //             3,
    //             30,
    //             33
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "brown",
    //         "color_tag": 3464,
    //         "id": 10,
    //         "color_coord": [
    //             31,
    //             38,
    //             21,
    //             28
    //         ]
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "ARRAY_LENGTH(color_coord) == 4",
    output_fields: ["id", "color", "color_tag", "color_coord"],
    limit: 3
    })
    
    console.log(JSON.stringify(res.results, null, 4))
    
    // Output
    // 
    // [
    //     {
    //         "score": 2.0404388904571533,
    //         "id": "439",
    //         "color": "orange",
    //         "color_tag": "7096",
    //         "color_coord": [
    //             "27",
    //             "34",
    //             "26",
    //             "39"
    //         ]
    //     },
    //     {
    //         "score": 1.9059759378433228,
    //         "id": "918",
    //         "color": "purple",
    //         "color_tag": "2903",
    //         "color_coord": [
    //             "28",
    //             "19",
    //             "36",
    //             "35"
    //         ]
    //     },
    //     {
    //         "score": 1.8385567665100098,
    //         "id": "92",
    //         "color": "yellow",
    //         "color_tag": "4693",
    //         "color_coord": [
    //             "1",
    //             "23",
    //             "2",
    //             "3"
    //         ]
    //     }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

    