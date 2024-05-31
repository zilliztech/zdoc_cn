---
slug: /use-json-fields
beta: FALSE
notebook: FALSE
type: origin
token: UXBjwVpKmirzg9kgWgmcLixwnIe
sidebar_position: 18

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用 JSON 类型字段

JSON 全称为 JavaScript Object Notation，是一种轻量级且易于使用的文本数据格式。本节将帮助您了解如何使用 JSON 类型的字段，包括插入 JSON 值，使用简单和高级操作符在 JSON 字段中进行标量过滤等。

## 概述{#overview}

在 Collection 中，一个 JSON 字段由键值对组成，其中每个键是一个字符串，其相应的值可以是数字、字符串、布尔值、列表或数组。Zilliz Cloud 支持将字段以字典的形式插入到集群的 Collection 中。

以下示例代码展示如何随机生成键值对，并在每个键值对中包含一个名为 color 的字典：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    current_tag = random.randint(1000, 9999)
    current_coord = [ random.randint(0, 40) for _ in range(3) ]
    current_ref = [ [ random.choice(colors) for _ in range(3) ] for _ in range(3) ]
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": {
            "label": current_color,
            "tag": current_tag,
            "coord": current_coord,
            "ref": current_ref
        }
    })

print(data[0])
```

</TabItem>

<TabItem value='java'>

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.alibaba.fastjson.JSONObject;

// 3. Insert randomly generated vectors and JSON data into the collection
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JSONObject> data = new ArrayList<>();

for (int i=0; i<1000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    Integer current_tag = rand.nextInt(8999) + 1000;
    List<Integer> current_coord = Arrays.asList(rand.nextInt(40), rand.nextInt(40), rand.nextInt(40));
    List<List<String>> current_ref = Arrays.asList(
        Arrays.asList(colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1))),
        Arrays.asList(colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1))),
        Arrays.asList(colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)))
    );
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    JSONObject color = new JSONObject();
    color.put("label", current_color);
    color.put("tag", current_tag);
    color.put("coord", current_coord);
    color.put("ref", current_ref);
    row.put("color", color);
    data.add(row);
}

System.out.println(JSONObject.toJSON(data.get(0)));   
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 3. Insert randomly generated vectors 
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
var data = []

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)]
    const current_tag = Math.floor(Math.random() * 8999 + 1000)
    const current_coord = Array(3).fill(0).map(() => Math.floor(Math.random() * 40))
    const current_ref = [ Array(3).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)]) ]

    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: {
            label: current_color,
            tag: current_tag,
            coord: current_coord,
            ref: current_ref
        }
    })
}

console.log(data[0])
```

</TabItem>
</Tabs>

您可以查看随机生成的数据集中的第一条记录了解数据结构。

```json
{
    "id": 0,
    "vector": [
        -0.8017921296923975,
        0.550046715206634,
        0.764922589768134,
        0.6371433836123146,
        0.2705233937454232
    ],
    "color": {
        "label": "blue",
        "tag": 9927,
        "coord": [
            22,
            36,
            6
        ],
        "ref": [
            [
                "blue",
                "green",
                "white"
            ],
            [
                "black",
                "green",
                "pink"
            ],
            [
                "grey",
                "black",
                "brown"
            ]
        ]
    }
}
```

<Admonition type="info" icon="📘" title="说明">

<p>在一个 JSON 字段内的各键值对中，</p>
<ul>
<li><p>键名可包含字母、数字或下划线（_）。</p></li>
<li><p>如果值为列表或数组，其元素数据类型需保持一致。</p></li>
<li><p>如果值为 JSON，会被解析成字符串。</p></li>
</ul>

</Admonition>

## 定义 JSON 字段{#define-json-field}

定义 JSON 字段的过程与定义其他类型字段的过程相同。

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
    enable_dynamic_field=False,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
# highlight-next-line
schema.add_field(field_name="color", datatype=DataType.JSON)

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

// highlight-start    
schema.addField(AddFieldReq.builder()
    .fieldName("color")
    .dataType(DataType.JSON)
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

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);

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
// highlight-start
    {
        name: "color",
        data_type: DataType.JSON,
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

Collection 创建完成后，就可以向 Collection 中插入[概述](./use-json-fields#overview)中随机生成的字典了。

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
```

</TabItem>

<TabItem value='java'>

```java
// 3.1 Insert data into the collection
InsertReq insertReq = InsertReq.builder()
    .collectionName("test_collection")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 3. Insert randomly generated vectors 
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
var data = []

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)]
    const current_tag = Math.floor(Math.random() * 8999 + 1000)
    const current_coord = Array(3).fill(0).map(() => Math.floor(Math.random() * 40))
    const current_ref = [ Array(3).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)]) ]

    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: {
            label: current_color,
            tag: current_tag,
            coord: current_coord,
            ref: current_ref
        }
    })
}

console.log(data[0])

// Output
// 
// {
//   id: 0,
//   vector: [
//     0.11455530974226114,
//     0.21704086958595314,
//     0.9430119822312437,
//     0.7802712923612023,
//     0.9106927960926137
//   ],
//   color: { label: 'grey', tag: 7393, coord: [ 22, 1, 22 ], ref: [ [Array] ] }
// }
// 

res = await client.insert({
    collection_name: "test_collection",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 
```

</TabItem>
</Tabs>

## 简单标量过滤{#basic-scalar-filtering}

所有数据插入完成后，您可以使用 JSON 字段中的键进行搜索，搜索方法与基于标量字段搜索相同。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Basic search with a JSON field
query_vectors = [ [ random.uniform(-1, 1) for _ in range(5) ]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    # highlight-next-line
    filter='color["label"] in ["red"]',
    search_params={
        "metric_type": "L2",
        "params": {"nprobe": 16}
    },
    output_fields=["id", "color"],
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 460,
#             "distance": 0.4016231596469879,
#             "entity": {
#                 "id": 460,
#                 "color": {
#                     "label": "red",
#                     "tag": 5030,
#                     "coord": [14, 32, 40],
#                     "ref": [
#                         [ "pink", "green", "brown" ],
#                         [ "red", "grey", "black"],
#                         [ "red", "yellow", "orange"]
#                     ]
#                 }
#             }
#         },
#         {
#             "id": 785,
#             "distance": 0.451080858707428,
#             "entity": {
#                 "id": 785,
#                 "color": {
#                     "label": "red",
#                     "tag": 5290,
#                     "coord": [31, 13, 23],
#                     "ref": [
#                         ["yellow", "pink", "pink"],
#                         ["purple", "grey", "orange"],
#                         ["grey", "purple", "pink"]
#                     ]
#                 }
#             }
#         },
#         {
#             "id": 355,
#             "distance": 0.5839247703552246,
#             "entity": {
#                 "id": 355,
#                 "color": {
#                     "label": "red",
#                     "tag": 8725,
#                     "coord": [5, 10, 22],
#                     "ref": [
#                         ["white", "purple", "yellow"],
#                         ["white", "purple", "white"],
#                         ["orange", "white", "pink"]
#                     ]
#                 }
#             }
#         }
#     ]
# ]
```

</TabItem>

<TabItem value='java'>

```java
// 4. Basic search with a JSON field
List<List<Float>> query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

SearchReq searchReq = SearchReq.builder()
    .collectionName("test_collection")
    .data(query_vectors)
    // highlight-next-line
    .filter("color[\"label\"] in [\"red\"]")
    .outputFields(Arrays.asList("id", "color"))
    .topK(3)
    .build();

SearchResp searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));

// Output:
// {"searchResults": [[
//     {
//         "distance": 1.2636482,
//         "id": 290,
//         "entity": {
//             "color": {
//                 "coord": [32,37,32],
//                 "ref": [
//                     ["green", "blue", "yellow"],
//                     ["yellow", "pink", "pink"],
//                     ["purple", "red", "brown"]
//                 ],
//                 "label": "red",
//                 "tag": 8949
//             },
//             "id": 290
//         }
//     },
//     {
//         "distance": 1.002122,
//         "id": 629,
//         "entity": {
//             "color": {
//                 "coord": [23,5,35],
//                 "ref": [
//                     ["black", ""yellow", "black"],
//                     ["black", "purple", "white"],
//                     ["black", "brown", "orange"]
//                 ],
//                 "label": "red",
//                 "tag": 5072
//             },
//             "id": 629
//         }
//     },
//     {
//         "distance": 0.9542817,
//         "id": 279,
//         "entity": {
//             "color": {
//                 "coord": [20,33,33],
//                 "ref": [
//                     ["yellow", "white", "brown"],
//                     ["black", "white", "purple"],
//                     ["green", "brown", "blue"]
//                 ],
//                 "label": "red",
//                 "tag": 4704
//             },
//             "id": 279
//         }
//     }
// ]]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Basic search with a JSON field
query_vectors = [[0.6765405125697714, 0.759217474274025, 0.4122471841491111, 0.3346805565394215, 0.09679748345514638]]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    // highlight-next-line
    filter: 'color["label"] in ["red"]',
    output_fields: ["color", "id"],
    limit: 3
})

console.log(JSON.stringify(res.results, null, 4))

// Output
// 
// [
//     {
//         "score": 1.777988076210022,
//         "id": "595",
//         "color": {
//             "label": "red",
//             "tag": 7393,
//             "coord": [31,34,18],
//             "ref": [
//                 ["grey", "white", "orange"]
//             ]
//         }
//     },
//     {
//         "score": 1.7542595863342285,
//         "id": "82",
//         "color": {
//             "label": "red",
//             "tag": 8636,
//             "coord": [4,37,29],
//             "ref": [
//                 ["brown", "brown", "pink"]
//             ]
//         }
//     },
//     {
//         "score": 1.7537562847137451,
//         "id": "748",
//         "color": {
//             "label": "red",
//             "tag": 1626,
//             "coord": [31,4,25
//             ],
//             "ref": [
//                 ["grey", "green", "blue"]
//             ]
//         }
//     }
// ]
// 
```

</TabItem>
</Tabs>

## 高级标量过滤{#advanced-scalar-filtering}

针对 JSON 类型的字段，Zilliz Cloud 提供了一系列的高级过滤器，包括`JSON_CONTAINS`、`JSON_CONTAINS_ALL` 和 `JSON_CONTAINS_ANY`。

- 过滤出所有以 `["blue", "brown", "grey"]` 为参考色彩集的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 5. Advanced search within a JSON field
    
    res = client.query(
        collection_name="test_collection",
        data=query_vectors,
        filter='JSON_CONTAINS(color["ref"], ["blue", "brown", "grey"])',
        output_fields=["id", "color"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 79,
    #         "color": {
    #             "label": "orange",
    #             "tag": 8857,
    #             "coord": [
    #                 10,
    #                 14,
    #                 5
    #             ],
    #             "ref": [
    #                 [
    #                     "yellow",
    #                     "white",
    #                     "green"
    #                 ],
    #                 [
    #                     "blue",
    #                     "purple",
    #                     "purple"
    #                 ],
    #                 [
    #                     "blue",
    #                     "brown",
    #                     "grey"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 371,
    #         "color": {
    #             "label": "black",
    #             "tag": 1324,
    #             "coord": [
    #                 2,
    #                 18,
    #                 32
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "orange",
    #                     "brown"
    #                 ],
    #                 [
    #                     "blue",
    #                     "brown",
    #                     "grey"
    #                 ],
    #                 [
    #                     "purple",
    #                     "blue",
    #                     "blue"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 590,
    #         "color": {
    #             "label": "red",
    #             "tag": 3340,
    #             "coord": [
    #                 13,
    #                 21,
    #                 13
    #             ],
    #             "ref": [
    #                 [
    #                     "yellow",
    #                     "yellow",
    #                     "red"
    #                 ],
    #                 [
    #                     "blue",
    #                     "brown",
    #                     "grey"
    #                 ],
    #                 [
    #                     "pink",
    #                     "yellow",
    #                     "purple"
    #                 ]
    #             ]
    #         }
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // 5. Advanced search within a JSON field
    searchReq = SearchReq.builder()
        .collectionName("test_collection")
        .data(query_vectors)
        .filter("JSON_CONTAINS(color[\"ref\"], [\"purple\", \"pink\", \"orange\"])")
        .outputFields(Arrays.asList("id", "color"))
        .topK(3)
        .build();
    
    searchResp = client.search(searchReq);
    
    System.out.println(JSONObject.toJSON(searchResp));
    
    // Output:
    // {"searchResults": [[
    //     {
    //         "distance": 1.1811467,
    //         "id": 180,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     17,
    //                     26,
    //                     14
    //                 ],
    //                 "ref": [
    //                     [
    //                         "white",
    //                         "black",
    //                         "brown"
    //                     ],
    //                     [
    //                         "purple",
    //                         "pink",
    //                         "orange"
    //                     ],
    //                     [
    //                         "black",
    //                         "pink",
    //                         "red"
    //                     ]
    //                 ],
    //                 "label": "green",
    //                 "tag": 2470
    //             },
    //             "id": 180
    //         }
    //     },
    //     {
    //         "distance": 0.6487204,
    //         "id": 331,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     16,
    //                     32,
    //                     23
    //                 ],
    //                 "ref": [
    //                     [
    //                         "purple",
    //                         "pink",
    //                         "orange"
    //                     ],
    //                     [
    //                         "brown",
    //                         "red",
    //                         "orange"
    //                     ],
    //                     [
    //                         "red",
    //                         "yellow",
    //                         "brown"
    //                     ]
    //                 ],
    //                 "label": "white",
    //                 "tag": 1236
    //             },
    //             "id": 331
    //         }
    //     },
    //     {
    //         "distance": 0.59387654,
    //         "id": 483,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     8,
    //                     33,
    //                     2
    //                 ],
    //                 "ref": [
    //                     [
    //                         "red",
    //                         "orange",
    //                         "brown"
    //                     ],
    //                     [
    //                         "purple",
    //                         "pink",
    //                         "orange"
    //                     ],
    //                     [
    //                         "brown",
    //                         "blue",
    //                         "green"
    //                     ]
    //                 ],
    //                 "label": "pink",
    //                 "tag": 5686
    //             },
    //             "id": 483
    //         }
    //     }
    // ]]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 5. Advanced search within a JSON field
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: 'JSON_CONTAINS(color["ref"], ["blue", "brown", "grey"])',
        output_fields: ["color", "id"],
        limit: 3
    })
    
    console.log(JSON.stringify(res.results, null, 4))
    
    // Output
    // 
    // [
    //     {
    //         "id": 79,
    //         "color": {
    //             "label": "orange",
    //             "tag": 8857,
    //             "coord": [
    //                 10,
    //                 14,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "yellow",
    //                     "white",
    //                     "green"
    //                 ],
    //                 [
    //                     "blue",
    //                     "purple",
    //                     "purple"
    //                 ],
    //                 [
    //                     "blue",
    //                     "brown",
    //                     "grey"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "id": 371,
    //         "color": {
    //             "label": "black",
    //             "tag": 1324,
    //             "coord": [
    //                 2,
    //                 18,
    //                 32
    //             ],
    //             "ref": [
    //                 [
    //                     "purple",
    //                     "orange",
    //                     "brown"
    //                 ],
    //                 [
    //                     "blue",
    //                     "brown",
    //                     "grey"
    //                 ],
    //                 [
    //                     "purple",
    //                     "blue",
    //                     "blue"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "id": 590,
    //         "color": {
    //             "label": "red",
    //             "tag": 3340,
    //             "coord": [
    //                 13,
    //                 21,
    //                 13
    //             ],
    //             "ref": [
    //                 [
    //                     "yellow",
    //                     "yellow",
    //                     "red"
    //                 ],
    //                 [
    //                     "blue",
    //                     "brown",
    //                     "grey"
    //                 ],
    //                 [
    //                     "pink",
    //                     "yellow",
    //                     "purple"
    //                 ]
    //             ]
    //         }
    //     }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 过滤出所有色彩集标定包含 4 和 5 的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="test_collection",
        data=query_vectors,
        filter='JSON_CONTAINS_ALL(color["coord"], [4, 5])',
        output_fields=["id", "color"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 281,
    #         "color": {
    #             "label": "red",
    #             "tag": 3645,
    #             "coord": [
    #                 5,
    #                 33,
    #                 4
    #             ],
    #             "ref": [
    #                 [
    #                     "orange",
    #                     "blue",
    #                     "pink"
    #                 ],
    #                 [
    #                     "purple",
    #                     "blue",
    #                     "purple"
    #                 ],
    #                 [
    #                     "black",
    #                     "brown",
    #                     "yellow"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 464,
    #         "color": {
    #             "label": "brown",
    #             "tag": 6261,
    #             "coord": [
    #                 5,
    #                 9,
    #                 4
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "purple",
    #                     "brown"
    #                 ],
    #                 [
    #                     "black",
    #                     "pink",
    #                     "white"
    #                 ],
    #                 [
    #                     "brown",
    #                     "grey",
    #                     "brown"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 567,
    #         "color": {
    #             "label": "green",
    #             "tag": 4589,
    #             "coord": [
    #                 5,
    #                 39,
    #                 4
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "yellow",
    #                     "white"
    #                 ],
    #                 [
    #                     "yellow",
    #                     "yellow",
    #                     "brown"
    #                 ],
    #                 [
    #                     "blue",
    #                     "red",
    #                     "yellow"
    #                 ]
    #             ]
    #         }
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    searchReq = SearchReq.builder()
        .collectionName("test_collection")
        .data(query_vectors)
        .filter("JSON_CONTAINS_ALL(color[\"coord\"], [4, 5])")
        .outputFields(Arrays.asList("id", "color"))
        .topK(3)
        .build();
    
    searchResp = client.search(searchReq);
    
    System.out.println(JSONObject.toJSON(searchResp));     
    
    // Output:
    // {"searchResults": [[
    //     {
    //         "distance": 0.77485126,
    //         "id": 304,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     4,
    //                     5,
    //                     13
    //                 ],
    //                 "ref": [
    //                     [
    //                         "purple",
    //                         "pink",
    //                         "brown"
    //                     ],
    //                     [
    //                         "orange",
    //                         "red",
    //                         "blue"
    //                     ],
    //                     [
    //                         "yellow",
    //                         "blue",
    //                         "purple"
    //                     ]
    //                 ],
    //                 "label": "blue",
    //                 "tag": 7228
    //             },
    //             "id": 304
    //         }
    //     },
    //     {
    //         "distance": 0.68138736,
    //         "id": 253,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     5,
    //                     38,
    //                     4
    //                 ],
    //                 "ref": [
    //                     [
    //                         "black",
    //                         "pink",
    //                         "blue"
    //                     ],
    //                     [
    //                         "pink",
    //                         "brown",
    //                         "pink"
    //                     ],
    //                     [
    //                         "red",
    //                         "pink",
    //                         "orange"
    //                     ]
    //                 ],
    //                 "label": "blue",
    //                 "tag": 6935
    //             },
    //             "id": 253
    //         }
    //     },
    //     {
    //         "distance": 0.56997097,
    //         "id": 944,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     5,
    //                     6,
    //                     4
    //                 ],
    //                 "ref": [
    //                     [
    //                         "blue",
    //                         "yellow",
    //                         "orange"
    //                     ],
    //                     [
    //                         "orange",
    //                         "white",
    //                         "orange"
    //                     ],
    //                     [
    //                         "pink",
    //                         "brown",
    //                         "white"
    //                     ]
    //                 ],
    //                 "label": "pink",
    //                 "tag": 3325
    //             },
    //             "id": 944
    //         }
    //     }
    // ]]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: 'JSON_CONTAINS_ALL(color["coord"], [4, 5])',
        output_fields: ["color", "id"],
        limit: 3
    })
    
    console.log(JSON.stringify(res.results, null, 4))
    
    // Output
    // 
    // [
    //     {
    //         "score": 1.8944344520568848,
    //         "id": "792",
    //         "color": {
    //             "label": "purple",
    //             "tag": 8161,
    //             "coord": [
    //                 4,
    //                 38,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "red",
    //                     "white",
    //                     "grey"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.2801706790924072,
    //         "id": "489",
    //         "color": {
    //             "label": "red",
    //             "tag": 4358,
    //             "coord": [
    //                 5,
    //                 4,
    //                 1
    //             ],
    //             "ref": [
    //                 [
    //                     "blue",
    //                     "orange",
    //                     "orange"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.2097992897033691,
    //         "id": "656",
    //         "color": {
    //             "label": "red",
    //             "tag": 7856,
    //             "coord": [
    //                 5,
    //                 20,
    //                 4
    //             ],
    //             "ref": [
    //                 [
    //                     "black",
    //                     "orange",
    //                     "white"
    //                 ]
    //             ]
    //         }
    //     }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 过滤出所有色彩集标定包含 4 或 5 的 Entity。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="test_collection",
        data=query_vectors,
        filter='JSON_CONTAINS_ANY(color["coord"], [4, 5])',
        output_fields=["id", "color"],
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 0,
    #         "color": {
    #             "label": "yellow",
    #             "tag": 6340,
    #             "coord": [
    #                 40,
    #                 4,
    #                 40
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "yellow",
    #                     "orange"
    #                 ],
    #                 [
    #                     "green",
    #                     "grey",
    #                     "purple"
    #                 ],
    #                 [
    #                     "black",
    #                     "white",
    #                     "yellow"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 2,
    #         "color": {
    #             "label": "brown",
    #             "tag": 9359,
    #             "coord": [
    #                 38,
    #                 21,
    #                 5
    #             ],
    #             "ref": [
    #                 [
    #                     "red",
    #                     "brown",
    #                     "white"
    #                 ],
    #                 [
    #                     "purple",
    #                     "red",
    #                     "brown"
    #                 ],
    #                 [
    #                     "pink",
    #                     "grey",
    #                     "black"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 7,
    #         "color": {
    #             "label": "green",
    #             "tag": 3560,
    #             "coord": [
    #                 5,
    #                 9,
    #                 5
    #             ],
    #             "ref": [
    #                 [
    #                     "blue",
    #                     "orange",
    #                     "green"
    #                 ],
    #                 [
    #                     "blue",
    #                     "blue",
    #                     "black"
    #                 ],
    #                 [
    #                     "green",
    #                     "purple",
    #                     "green"
    #                 ]
    #             ]
    #         }
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: 'JSON_CONTAINS_ANY(color["coord"], [4, 5])',
        output_fields: ["color", "id"],
        limit: 3
    })
    
    console.log(JSON.stringify(res.results, null, 4))
    
    // Output
    // 
    // [
    //     {
    //         "score": 1.9083369970321655,
    //         "id": "453",
    //         "color": {
    //             "label": "brown",
    //             "tag": 8788,
    //             "coord": [
    //                 21,
    //                 18,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "pink",
    //                     "black",
    //                     "brown"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.8944344520568848,
    //         "id": "792",
    //         "color": {
    //             "label": "purple",
    //             "tag": 8161,
    //             "coord": [
    //                 4,
    //                 38,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "red",
    //                     "white",
    //                     "grey"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.8615753650665283,
    //         "id": "272",
    //         "color": {
    //             "label": "grey",
    //             "tag": 3400,
    //             "coord": [
    //                 5,
    //                 1,
    //                 32
    //             ],
    //             "ref": [
    //                 [
    //                     "purple",
    //                     "green",
    //                     "white"
    //                 ]
    //             ]
    //         }
    //     }
    // ]
    // 
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    searchReq = SearchReq.builder()
        .collectionName("test_collection")
        .data(query_vectors)
        .filter("JSON_CONTAINS_ANY(color[\"coord\"], [4, 5])")
        .outputFields(Arrays.asList("id", "color"))
        .topK(3)
        .build();
    
    searchResp = client.search(searchReq);
    
    System.out.println(JSONObject.toJSON(searchResp));   
    
    // Output:
    // {"searchResults": [[
    //     {
    //         "distance": 1.002122,
    //         "id": 629,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     23,
    //                     5,
    //                     35
    //                 ],
    //                 "ref": [
    //                     [
    //                         "black",
    //                         "yellow",
    //                         "black"
    //                     ],
    //                     [
    //                         "black",
    //                         "purple",
    //                         "white"
    //                     ],
    //                     [
    //                         "black",
    //                         "brown",
    //                         "orange"
    //                     ]
    //                 ],
    //                 "label": "red",
    //                 "tag": 5072
    //             },
    //             "id": 629
    //         }
    //     },
    //     {
    //         "distance": 0.85788506,
    //         "id": 108,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     25,
    //                     5,
    //                     38
    //                 ],
    //                 "ref": [
    //                     [
    //                         "green",
    //                         "brown",
    //                         "pink"
    //                     ],
    //                     [
    //                         "purple",
    //                         "green",
    //                         "green"
    //                     ],
    //                     [
    //                         "green",
    //                         "pink",
    //                         "black"
    //                     ]
    //                 ],
    //                 "label": "orange",
    //                 "tag": 8982
    //             },
    //             "id": 108
    //         }
    //     },
    //     {
    //         "distance": 0.80550396,
    //         "id": 120,
    //         "entity": {
    //             "color": {
    //                 "coord": [
    //                     25,
    //                     16,
    //                     4
    //                 ],
    //                 "ref": [
    //                     [
    //                         "red",
    //                         "green",
    //                         "orange"
    //                     ],
    //                     [
    //                         "blue",
    //                         "pink",
    //                         "blue"
    //                     ],
    //                     [
    //                         "brown",
    //                         "black",
    //                         "green"
    //                     ]
    //                 ],
    //                 "label": "purple",
    //                 "tag": 6711
    //             },
    //             "id": 120
    //         }
    //     }
    // ]]}
    
    ```

    </TabItem>
    </Tabs>

## 使用 JSON 字段作为过滤条件{#reference-on-json-filters}

在使用 JSON 字段时，你可以使用 JSON 字段本身或其包含的任意键值对进行标量过滤。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li>在存储 JSON 字段时，Zilliz Cloud 不会对其内容进行转义。</li>
</ul>
<p>例如，<code>'a"b'</code>、<code>"a'b"</code>、<code>'a\\'b'</code> 和 <code>"a\\"b"</code> 在存储时会保持原样，而  <code>'a'b'</code> 和 <code>"a"b"</code> 则会被认为是非法值。</p>
<ul>
<li><p>在使用 JSON 字段作为过滤条件时，可以使用该字段中的键名。</p></li>
<li><p>如果某键名对应的值为整数或浮点数时，可以将其与另一个整数或浮点数进行比较，也可以将其与一个类型为 INT32/64 或 FLOAT32/64 的字段值进行比较。</p></li>
<li><p>如果某键名对应的值为字符串时，可以将其与另一个字符串或类型为 VARCHAR 的字段进行比较。</p></li>
</ul>

</Admonition>

### 简单操作符{#basic-operators-in-json-fields}

假设 JSON 字段具有 `A` 键。使用 JSON 字段构建布尔表达式时，请参考以下表格。

<table>
   <tr>
     <th><p>操作符</p></th>
     <th><p>示例</p></th>
     <th><p>备注</p></th>
   </tr>
   <tr>
     <td><p><code>&lt;</code></p></td>
     <td><p><code>"A &lt; 3"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
   <tr>
     <td><p><code>&gt;</code></p></td>
     <td><p><code>"A &gt; 1"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
   <tr>
     <td><p><code>==</code></p></td>
     <td><p><code>"A == 1"</code>  或 <code>"A == 'abc'"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
   <tr>
     <td><p><code>!=</code></p></td>
     <td><p><code>"A != 1"</code> 或 <code>"A != 'abc'"</code></p></td>
     <td><p><code>A</code>  可以不存在</p></td>
   </tr>
   <tr>
     <td><p><code>&lt;=</code></p></td>
     <td><p><code>"A &lt;= 5"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
   <tr>
     <td><p><code>&gt;=</code></p></td>
     <td><p><code>"A &gt;= 1"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
   <tr>
     <td><p><code>not</code></p></td>
     <td><p><code>"not A == 1"</code> 或 <code>"not A != 'abc'"</code></p></td>
     <td><p><code>A</code>  可以不存在</p></td>
   </tr>
   <tr>
     <td><p><code>in</code></p></td>
     <td><p><code>"A in [1, 2, 3]"</code> 或 <code>"A in ['a', 'b', 'c']"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
   <tr>
     <td><p><code>add</code> (<code>&amp;&amp;</code>)</p></td>
     <td><p><code>"A &gt; 1 &amp;&amp; A &lt; 3"</code></p></td>
     <td><p><code>A</code>  是否必须存在取决于运算符两侧表达式的要求</p></td>
   </tr>
   <tr>
     <td><p><code>or</code> (<code>||</code>)</p></td>
     <td><p><code>"A &gt; 1 \|\| A &lt; 3"</code></p></td>
     <td><p><code>A</code>  是否必须存在取决于运算符两侧表达式的要求</p></td>
   </tr>
   <tr>
     <td><p><code>exist</code></p></td>
     <td><p><code>"exist A"</code></p></td>
     <td><p><code>A</code>  必须存在</p></td>
   </tr>
</table>

### 高级操作符{#advanced-operators}

针对 JSON 类型的字段，Zilliz Cloud 提供了一系列的高级过滤器，包括`JSON_CONTAINS`、`JSON_CONTAINS_ALL` 和 `JSON_CONTAINS_ANY`。

- `json_contains(identifier, jsonExpr)`

    该操作符可用于过滤包含指定表达式的 Entity。

    【例 1】`{"x": [1,2,3]}`

    ```python
    json_contains(x, 1) # => True (x 包含 1。)
    json_contains(x, "a") # => False (x 没有包含值为 "a" 的元素。)
    ```

    【例 2】 `{"x", [[1,2,3], [4,5,6], [7,8,9]]}`

    ```python
    json_contains(x, [1,2,3]) # => True (x 包含 [1,2,3]。)
    json_contains(x, [3,2,1]) # => False (x 没有包含值为 [3,2,1] 的元素。)
    ```

- `json_contains_all(identifier, jsonExpr)`

    该操作符可用于过滤包含指定表达式中所有元素的 Entity。

    【例】 `{"x": [1,2,3,4,5,7,8]}`

    ```python
    json_contains_all(x, [1,2,8]) # => True (x 包含 1、2 和 8。)
    json_contains_all(x, [4,5,6]) # => False (x 不包含 6。)
    ```

- `json_contains_any(identifier, jsonExpr)`

    该操作符可用于过滤包含指定表达式中任意元素的 Entity。

    【例】 `{"x": [1,2,3,4,5,7,8]}`

    ```python
    json_contains_any(x, [1,2,8]) # => True (x 包含 1、2 和 8。)
    json_contains_any(x, [4,5,6]) # => True (x 包含 4 和 5。)
    json_contains_any(x, [6,9]) # => False (x 不包含 6 或 9。)
    ```

## 相关文档{#related-topics}

- [管理 Collection](./manage-collections)

- [开启动态 Schema](./enable-dynamic-field)

- [使用 Partition Key](./use-partition-key) 

