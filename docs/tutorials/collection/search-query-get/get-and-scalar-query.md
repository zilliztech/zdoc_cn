---
slug: /get-and-scalar-query
beta: FALSE
notebook: FALSE
type: origin
token: TOQ7wYcWsiLDCmk24frcH1WhnKe
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - get
  - scalar query

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get 和 Scalar Query

本指南介绍如何通过 ID 获取（get） entity 并执行标量查询（scalar query）。Scalar query 是指可以根据指定的过滤条件筛选匹配的 entity。

## 概览{#overview}

Scalar query 使用布尔表达式按标量条件过滤 collection 内的 entity。查询结果将返回符合条件的 entity。与基于距离进行向量搜索（search）不同，scalar query 依据特定标准筛选 entity。

在 Zilliz Cloud 上，过滤器（filter）是由字段名称和运算符组成的字符串。本指南包含多个 filter 示例，详细运算符信息请参阅[运算符快速参考](./get-and-scalar-query#reference-on-scalar-filters)。

## 开始前{#preparations}

以下代码示例展示如何连接到 Zilliz Cloud 集群，快速创建collection，并向其中插入 1000 条随机生成的 entity。

### 步骤 1：创建 collection{#step-1-create-a-collection}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
import random, time
from pymilvus import MilvusClient

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
)
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

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
    .collectionName("quick_setup")
    .dimension(5)
    .metricType("IP")
    .build();

client.createCollection(quickSetupReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const { MilvusClient, DataType, sleep } = require("@zilliz/milvus2-sdk-node")

const address = "YOUR_CLUSTER_ENDPOINT"
const token = "YOUR_CLUSTER_TOKEN"

// 1. Set up a Milvus Client
client = new MilvusClient({address, token}); 

// 2. Create a collection in quick setup mode
await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
}); 
```

</TabItem>
</Tabs>

### 步骤 2：随机插入 entity{#step-2-insert-randomly-generated-entities}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 3. Insert randomly generated vectors 
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

# Output
#
# {
#     "id": 0,
#     "vector": [
#         0.7371107800002366,
#         -0.7290389773227746,
#         0.38367002049157417,
#         0.36996000494220627,
#         -0.3641898951462792
#     ],
#     "color": "yellow",
#     "tag": 6781,
#     "color_tag": "yellow_6781"
# }

res = client.insert(
    collection_name="quick_setup",
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
// 3. Insert randomly generated vectors into the collection
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
    row.put("color_tag", current_color + '_' + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}

InsertReq insertReq = InsertReq.builder()
    .collectionName("quick_setup")
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
    current_color = colors[Math.floor(Math.random() * colors.length)]
    current_tag = Math.floor(Math.random() * 8999 + 1000)
    data.push({
        "id": i,
        "vector": [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        "color": current_color,
        "tag": current_tag,
        "color_tag": `${current_color}_${current_tag}`
    })
}

console.log(data[0])

// Output
// 
// {
//   id: 0,
//   vector: [
//     0.16022394821966035,
//     0.6514875214491056,
//     0.18294484964044666,
//     0.30227694168725394,
//     0.47553087493572255
//   ],
//   color: 'blue',
//   tag: 8907,
//   color_tag: 'blue_8907'
// }
// 

res = await client.insert({
    collection_name: "quick_setup",
    data: data
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 
```

</TabItem>
</Tabs>

### 步骤 3：创建 partition 并插入更多 entity{#step-3-create-partitions-and-insert-more-entities}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Create partitions and insert more entities
client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionA"
)

client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionB"
)

data = []

for i in range(1000, 1500):
    current_color = random.choice(colors)
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "tag": current_tag,
        "color_tag": f"{current_color}_{str(current_tag)}"
    })

res = client.insert(
    collection_name="quick_setup",
    data=data,
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "insert_count": 500,
#     "ids": [
#         1000,
#         1001,
#         1002,
#         1003,
#         1004,
#         1005,
#         1006,
#         1007,
#         1008,
#         1009,
#         "(490 more items hidden)"
#     ]
# }

data = []

for i in range(1500, 2000):
    current_color = random.choice(colors)
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "tag": current_tag,
        "color_tag": f"{current_color}_{str(current_tag)}"
    })

res = client.insert(
    collection_name="quick_setup",
    data=data,
    partition_name="partitionB"
)

print(res)

# Output
#
# {
#     "insert_count": 500,
#     "ids": [
#         1500,
#         1501,
#         1502,
#         1503,
#         1504,
#         1505,
#         1506,
#         1507,
#         1508,
#         1509,
#         "(490 more items hidden)"
#     ]
# }
```

</TabItem>

<TabItem value='java'>

```java
// 4. Create partitions and insert some more data
CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

client.createPartition(createPartitionReq);

data.clear();

for (int i=1000; i<1500; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    int current_tag = rand.nextInt(8999) + 1000;
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("tag", current_tag);
    data.add(row);
}

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("partitionA")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 500}

data.clear();

for (int i=1500; i<2000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    int current_tag = rand.nextInt(8999) + 1000;
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("tag", current_tag);
    data.add(row);
}

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("partitionB")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 500}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Create partitions and insert more entities
await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

data = []

for (let i = 1000; i < 1500; i++) {
    current_color = colors[Math.floor(Math.random() * colors.length)]
    current_tag = Math.floor(Math.random() * 8999 + 1000)
    data.push({
        "id": i,
        "vector": [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        "color": current_color,
        "tag": current_tag,
        "color_tag": `${current_color}_${current_tag}`
    })
}

res = await client.insert({
    collection_name: "quick_setup",
    data: data,
    partition_name: "partitionA"
})

console.log(res.insert_cnt)

// Output
// 
// 500
// 

await sleep(5000)

data = []

for (let i = 1500; i < 2000; i++) {
    current_color = colors[Math.floor(Math.random() * colors.length)]
    current_tag = Math.floor(Math.random() * 8999 + 1000)
    data.push({
        "id": i,
        "vector": [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        "color": current_color,
        "tag": current_tag,
        "color_tag": `${current_color}_${current_tag}`
    })
}

res = await client.insert({
    collection_name: "quick_setup",
    data: data,
    partition_name: "partitionB"
})

console.log(res.insert_cnt)

// Output
// 
// 500
// 
```

</TabItem>
</Tabs>

## 按 ID 获取（get）entity{#get-entities-by-id}

如果您已知 entity ID，可以使用 `get()` 方法获取对应的 entity 信息：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 5. Get entities by ID
res = client.get(
    collection_name="quick_setup",
    ids=[0, 1, 2]
)

print(res)

# Output
#
# [
#     {
#         "id": 0,
#         "vector": [
#             0.7371108,
#             -0.72903895,
#             0.38367003,
#             0.36996,
#             -0.3641899
#         ],
#         "color": "yellow",
#         "tag": 6781,
#         "color_tag": "yellow_6781"
#     },
#     {
#         "id": 1,
#         "vector": [
#             -0.10924426,
#             -0.7659806,
#             0.8613359,
#             0.65219676,
#             -0.06385158
#         ],
#         "color": "pink",
#         "tag": 1023,
#         "color_tag": "pink_1023"
#     },
#     {
#         "id": 2,
#         "vector": [
#             0.402096,
#             -0.74742633,
#             -0.901683,
#             0.6292514,
#             0.77286446
#         ],
#         "color": "blue",
#         "tag": 3972,
#         "color_tag": "blue_3972"
#     }
# ]
```

</TabItem>

<TabItem value='java'>

```java
// 5. Get entities by ID
GetReq getReq = GetReq.builder()
    .collectionName("quick_setup")
    .ids(Arrays.asList(0L, 1L, 2L))
    .build();

GetResp entities = client.get(getReq);

System.out.println(JSONObject.toJSON(entities));

// Output:
// {"getResults": [
//     {"entity": {
//         "color": "white",
//         "color_tag": "white_4597",
//         "vector": [
//             0.09665024,
//             0.1163497,
//             0.0701347,
//             0.32577968,
//             0.40943468
//         ],
//         "tag": 8946,
//         "id": 0
//     }},
//     {"entity": {
//         "color": "green",
//         "color_tag": "green_3039",
//         "vector": [
//             0.90689456,
//             0.4377399,
//             0.75387514,
//             0.36454988,
//             0.8702918
//         ],
//         "tag": 2341,
//         "id": 1
//     }},
//     {"entity": {
//         "color": "white",
//         "color_tag": "white_8708",
//         "vector": [
//             0.9757728,
//             0.13974023,
//             0.8023141,
//             0.61947155,
//             0.8290197
//         ],
//         "tag": 9913,
//         "id": 2
//     }}
// ]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. Get entities by id
res = await client.get({
    collection_name: "quick_setup",
    ids: [0, 1, 2],
    output_fields: ["vector", "color_tag"]
})

console.log(res.data)

// Output
// 
// [
//   {
//     vector: [
//       0.16022394597530365,
//       0.6514875292778015,
//       0.18294484913349152,
//       0.30227693915367126,
//       0.47553086280822754
//     ],
//     '$meta': { color: 'blue', tag: 8907, color_tag: 'blue_8907' },
//     id: '0'
//   },
//   {
//     vector: [
//       0.2459285855293274,
//       0.4974019527435303,
//       0.2154673933982849,
//       0.03719571232795715,
//       0.8348019123077393
//     ],
//     '$meta': { color: 'grey', tag: 3710, color_tag: 'grey_3710' },
//     id: '1'
//   },
//   {
//     vector: [
//       0.9404329061508179,
//       0.49662265181541443,
//       0.8088793158531189,
//       0.9337621331214905,
//       0.8269071578979492
//     ],
//     '$meta': { color: 'blue', tag: 2993, color_tag: 'blue_2993' },
//     id: '2'
//   }
// ]
// 
```

</TabItem>
</Tabs>

## 从 partition 中获取（get） entity{#get-entities-from-partitions}

您也可以从指定的 partition 中获取 entity。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 5. Get entities from partitions
res = client.get(
    collection_name="quick_setup",
    ids=[1000, 1001, 1002],
    partition_names=["partitionA"]
)

print(res)

# Output
#
# [
#     {
#         "color": "green",
#         "tag": 1995,
#         "color_tag": "green_1995",
#         "id": 1000,
#         "vector": [
#             0.7807706,
#             0.8083741,
#             0.17276904,
#             -0.8580777,
#             0.024156934
#         ]
#     },
#     {
#         "color": "red",
#         "tag": 1995,
#         "color_tag": "red_1995",
#         "id": 1001,
#         "vector": [
#             0.065074645,
#             -0.44882354,
#             -0.29479212,
#             -0.19798489,
#             -0.77542555
#         ]
#     },
#     {
#         "color": "green",
#         "tag": 1995,
#         "color_tag": "green_1995",
#         "id": 1002,
#         "vector": [
#             0.027934508,
#             -0.44199976,
#             -0.40262738,
#             -0.041511405,
#             0.024782438
#         ]
#     }
# ]
```

</TabItem>

<TabItem value='java'>

```java
// 5. Get entities by ID in a partition
getReq = GetReq.builder()
    .collectionName("quick_setup")
    .ids(Arrays.asList(1001L, 1002L, 1003L))
    .partitionName("partitionA")
    .build();

entities = client.get(getReq);

System.out.println(JSONObject.toJSON(entities));

// Output:
// {"getResults": [
//     {"entity": {
//         "color": "yellow",
//         "vector": [
//             0.4300114,
//             0.599917,
//             0.799163,
//             0.75395125,
//             0.89947814
//         ],
//         "id": 1001,
//         "tag": 5803
//     }},
//     {"entity": {
//         "color": "blue",
//         "vector": [
//             0.009218454,
//             0.64637834,
//             0.19815737,
//             0.30519038,
//             0.8218663
//         ],
//         "id": 1002,
//         "tag": 7212
//     }},
//     {"entity": {
//         "color": "black",
//         "vector": [
//             0.76521933,
//             0.7818409,
//             0.16976339,
//             0.8719652,
//             0.1434964
//         ],
//         "id": 1003,
//         "tag": 1710
//     }}
// ]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5.1 Get entities by id in a partition
res = await client.get({
    collection_name: "quick_setup",
    ids: [1000, 1001, 1002],
    partition_names: ["partitionA"],
    output_fields: ["vector", "color_tag"]
})

console.log(res.data)

// Output
// 
// [
//   {
//     id: '1000',
//     vector: [
//       0.014254206791520119,
//       0.5817716121673584,
//       0.19793470203876495,
//       0.8064294457435608,
//       0.7745839357376099
//     ],
//     '$meta': { color: 'white', tag: 5996, color_tag: 'white_5996' }
//   },
//   {
//     id: '1001',
//     vector: [
//       0.6073881983757019,
//       0.05214758217334747,
//       0.730999231338501,
//       0.20900958776474,
//       0.03665429726243019
//     ],
//     '$meta': { color: 'grey', tag: 2834, color_tag: 'grey_2834' }
//   },
//   {
//     id: '1002',
//     vector: [
//       0.48877206444740295,
//       0.34028753638267517,
//       0.6527213454246521,
//       0.9763909578323364,
//       0.8031482100486755
//     ],
//     '$meta': { color: 'pink', tag: 9107, color_tag: 'pink_9107' }
//   }
// ]
// 
```

</TabItem>
</Tabs>

## 使用基本运算符{#use-basic-operators}

在本节中，您将找到如何在 scalar query 中使用基本运算符的示例。这些 filter 也可以应用于[向量搜索](./single-vector-search#filtered-search)和[数据删除](./insert-update-delete#delete-entities)。

- 筛选 `tag` 在 1000 到 1500 的 entity

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 6. Use basic operators
    
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter="1000 < tag < 1500",
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "id": 1,
    #         "color_tag": "pink_1023"
    #     },
    #     {
    #         "id": 41,
    #         "color_tag": "red_1483"
    #     },
    #     {
    #         "id": 44,
    #         "color_tag": "grey_1146"
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // 6. Use basic operators
    
    QueryReq queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("1000 < tag < 1500")
        .outputFields(Arrays.asList("color_tag"))
        .limit(3)
        .build();
    
    QueryResp queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color_tag": "white_7588",
    //         "id": 34
    //     }},
    //     {"entity": {
    //         "color_tag": "orange_4989",
    //         "id": 64
    //     }},
    //     {"entity": {
    //         "color_tag": "white_3415",
    //         "id": 73
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 6. Use basic operators
    res = await client.query({
        collection_name: "quick_setup",
        filter: "1000 < tag < 1500",
        output_fields: ["color_tag"],
        limit: 3
    })
    
    console.log(res.data)
    
    // Output
    // 
    // [
    //   {
    //     '$meta': { color: 'pink', tag: 1050, color_tag: 'pink_1050' },
    //     id: '6'
    //   },
    //   {
    //     '$meta': { color: 'purple', tag: 1174, color_tag: 'purple_1174' },
    //     id: '24'
    //   },
    //   {
    //     '$meta': { color: 'orange', tag: 1023, color_tag: 'orange_1023' },
    //     id: '40'
    //   }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 筛选 `color` 为 `brown` 的 entity

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='color == "brown"',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "color_tag": "brown_5343",
    #         "id": 15
    #     },
    #     {
    #         "color_tag": "brown_3167",
    #         "id": 27
    #     },
    #     {
    #         "color_tag": "brown_3100",
    #         "id": 30
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("color == \"brown\"")
        .outputFields(Arrays.asList("color_tag"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color_tag": "brown_7792",
    //         "id": 3
    //     }},
    //     {"entity": {
    //         "color_tag": "brown_9695",
    //         "id": 7
    //     }},
    //     {"entity": {
    //         "color_tag": "brown_2551",
    //         "id": 15
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.query({
        collection_name: "quick_setup",
        filter: 'color == "brown"',
        output_fields: ["color_tag"],
        limit: 3
    })
    
    console.log(res.data)
    
    // Output
    // 
    // [
    //   {
    //     '$meta': { color: 'brown', tag: 6839, color_tag: 'brown_6839' },
    //     id: '22'
    //   },
    //   {
    //     '$meta': { color: 'brown', tag: 7849, color_tag: 'brown_7849' },
    //     id: '32'
    //   },
    //   {
    //     '$meta': { color: 'brown', tag: 7855, color_tag: 'brown_7855' },
    //     id: '33'
    //   }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 筛选 `color` 不为 `green` 或 `purple` 的 entity

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='color not in ["green", "purple"]',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "color_tag": "yellow_6781",
    #         "id": 0
    #     },
    #     {
    #         "color_tag": "pink_1023",
    #         "id": 1
    #     },
    #     {
    #         "color_tag": "blue_3972",
    #         "id": 2
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("color not in [\"green\", \"purple\"]")
        .outputFields(Arrays.asList("color_tag"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));   
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color_tag": "white_4597",
    //         "id": 0
    //     }},
    //     {"entity": {
    //         "color_tag": "white_8708",
    //         "id": 2
    //     }},
    //     {"entity": {
    //         "color_tag": "brown_7792",
    //         "id": 3
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.query({
        collection_name: "quick_setup",
        filter: 'color not in ["green", "purple"]',
        output_fields: ["color_tag"],
        limit: 3
    })
    
    console.log(res.data)
    
    // Output
    // 
    // [
    //   {
    //     '$meta': { color: 'blue', tag: 8907, color_tag: 'blue_8907' },
    //     id: '0'
    //   },
    //   {
    //     '$meta': { color: 'grey', tag: 3710, color_tag: 'grey_3710' },
    //     id: '1'
    //   },
    //   {
    //     '$meta': { color: 'blue', tag: 2993, color_tag: 'blue_2993' },
    //     id: '2'
    //   }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 筛选 `color_tag` 以 `red` 开始的 entity

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='color_tag like "red%"',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "color_tag": "red_6443",
    #         "id": 17
    #     },
    #     {
    #         "color_tag": "red_1483",
    #         "id": 41
    #     },
    #     {
    #         "color_tag": "red_4348",
    #         "id": 47
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("color_tag like \"red%\"")
        .outputFields(Arrays.asList("color_tag"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));  
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color_tag": "red_4929",
    //         "id": 9
    //     }},
    //     {"entity": {
    //         "color_tag": "red_8284",
    //         "id": 13
    //     }},
    //     {"entity": {
    //         "color_tag": "red_3021",
    //         "id": 44
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.query({
        collection_name: "quick_setup",
        filter: 'color_tag like "red%"',
        output_fields: ["color_tag"],
        limit: 3
    })
    
    console.log(res.data)
    
    // Output
    // 
    // [
    //   {
    //     '$meta': { color: 'red', tag: 8773, color_tag: 'red_8773' },
    //     id: '17'
    //   },
    //   {
    //     '$meta': { color: 'red', tag: 9197, color_tag: 'red_9197' },
    //     id: '34'
    //   },
    //   {
    //     '$meta': { color: 'red', tag: 7914, color_tag: 'red_7914' },
    //     id: '46'
    //   }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

- 筛选 `color` 为 `red`且 `tag` 值在 1000 到 1500 的 entity

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='(color == "red") and (1000 < tag < 1500)',
        output_fields=["color_tag"],
        # highlight-end
        limit=3
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "color_tag": "red_1483",
    #         "id": 41
    #     },
    #     {
    #         "color_tag": "red_1100",
    #         "id": 94
    #     },
    #     {
    #         "color_tag": "red_1343",
    #         "id": 526
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("(color == \"red\") and (1000 < tag < 1500)")
        .outputFields(Arrays.asList("color_tag"))
        .limit(3)
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));  
    
    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color_tag": "red_8124",
    //         "id": 83
    //     }},
    //     {"entity": {
    //         "color_tag": "red_5358",
    //         "id": 501
    //     }},
    //     {"entity": {
    //         "color_tag": "red_3564",
    //         "id": 638
    //     }}
    // ]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    res = await client.query({
        collection_name: "quick_setup",
        filter: '(color == "red") and (1000 < tag < 1500)',
        output_fields: ["color_tag"],
        limit: 3
    })
    
    console.log(res.data)
    
    // Output
    // 
    // [
    //   {
    //     '$meta': { color: 'red', tag: 1436, color_tag: 'red_1436' },
    //     id: '67'
    //   },
    //   {
    //     '$meta': { color: 'red', tag: 1463, color_tag: 'red_1463' },
    //     id: '160'
    //   },
    //   {
    //     '$meta': { color: 'red', tag: 1073, color_tag: 'red_1073' },
    //     id: '291'
    //   }
    // ]
    // 
    ```

    </TabItem>
    </Tabs>

## 使用高级运算符{#use-advanced-operators}

在本节中，您将找到如何在 scalar query 中使用高级运算符的示例。这些 filter 也可以应用于[向量搜索](./single-vector-search#filtered-search)和[数据删除](./insert-update-delete#delete-entities)。

### 统计 entity 数量{#count-entities}

- 统计 collection 中所有的 entity 数量

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # 7. Use advanced operators
    
    # Count the total number of entities in a collection
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        output_fields=["count(*)"]
        # highlight-end
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "count(*)": 2000
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // 7. Use advanced operators
    // Count the total number of entities in the collection
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("")
        .outputFields(Arrays.asList("count(*)"))
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));
    
    // Output:
    // {"queryResults": [{"entity": {"count(*)": 2000}}]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // 7. Use advanced operators
    // Count the total number of entities in a collection
    res = await client.query({
        collection_name: "quick_setup",
        output_fields: ["count(*)"]
    })
    
    console.log(res.data)   
    
    // Output
    // 
    // [ { 'count(*)': '2000' } ]
    // 
    ```

    </TabItem>
    </Tabs>

- 统计 collection 中的某个 partition 下的 entity 数量

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # Count the number of entities in a partition
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        output_fields=["count(*)"],
        partition_names=["partitionA"]
        # highlight-end
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "count(*)": 500
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // Count the number of entities in a partition
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .partitionNames(Arrays.asList("partitionA"))
        .filter("")
        .outputFields(Arrays.asList("count(*)"))
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));
    
    // Output:
    // {"queryResults": [{"entity": {"count(*)": 500}}]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // Count the number of entities in a partition
    res = await client.query({
        collection_name: "quick_setup",
        output_fields: ["count(*)"],
        partition_names: ["partitionA"]
    })
    
    console.log(res.data)     
    
    // Output
    // 
    // [ { 'count(*)': '500' } ]
    // 
    ```

    </TabItem>
    </Tabs>

- 统计符合指定标量条件的 entity 数量

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
    <TabItem value='python'>

    ```python
    # Count the number of entities that match a specific filter
    res = client.query(
        collection_name="quick_setup",
        # highlight-start
        filter='(color == "red") and (1000 < tag < 1500)',
        output_fields=["count(*)"],
        # highlight-end
    )
    
    print(res)
    
    # Output
    #
    # [
    #     {
    #         "count(*)": 3
    #     }
    # ]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    // Count the number of entities that match a specific filter
    queryReq = QueryReq.builder()
        .collectionName("quick_setup")
        .filter("(color == \"red\") and (1000 < tag < 1500)")
        .outputFields(Arrays.asList("count(*)"))
        .build();
    
    queryResp = client.query(queryReq);
    
    System.out.println(JSONObject.toJSON(queryResp));
    
    // Output:
    // {"queryResults": [{"entity": {"count(*)": 7}}]}
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    // Count the number of entities that match a specific filter
    res = await client.query({
        collection_name: "quick_setup",
        filter: '(color == "red") and (1000 < tag < 1500)',
        output_fields: ["count(*)"]
    })
    
    console.log(res.data)   
    
    // Output
    // 
    // [ { 'count(*)': '10' } ]
    // 
    ```

    </TabItem>
    </Tabs>

## 运算符快速参考{#reference-on-scalar-filters}

### 基本运算符{#basic-operators}

在 Zilliz Cloud 中，布尔表达式是指由字段和运算符组成的字符串。下表列举了 Zilliz Cloud 支持的基本运算符。

<table>
   <tr>
  <th><p><strong>运算符</strong></p></th>
  <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
  <td><p><strong>and (&&)</strong></p></td>
  <td><p>当两个操作数都为真时返回真</p></td>
   </tr>
   <tr>
  <td><p><strong>or (||)</strong></p></td>
  <td><p>当任一操作数为真时返回真</p></td>
   </tr>
   <tr>
  <td><p><strong>+, -, *, /</strong></p></td>
  <td><p>加法、减法、乘法和除法</p></td>
   </tr>
   <tr>
  <td><p><strong>**</strong></p></td>
  <td><p>幂运算</p></td>
   </tr>
   <tr>
  <td><p><strong>%</strong></p></td>
  <td><p>取模</p></td>
   </tr>
   <tr>
  <td><p><strong>\<, ></strong></p></td>
  <td><p>小于、大于</p></td>
   </tr>
   <tr>
  <td><p><strong>==, !=</strong></p></td>
  <td><p>等于、不等于</p></td>
   </tr>
   <tr>
  <td><p><strong>\<=, >=</strong></p></td>
  <td><p>小于或等于、大于或等于</p></td>
   </tr>
   <tr>
  <td><p><strong>not</strong></p></td>
  <td><p>反转给定条件的结果</p></td>
   </tr>
   <tr>
  <td><p><strong>like</strong></p></td>
  <td><p>使用通配符运算符比较相似值。</p><p>例如，使用 <code>like "prefix%"</code> 匹配以 <code>"prefix"</code> 开头的字符串。</p></td>
   </tr>
   <tr>
  <td><p><strong>in</strong></p></td>
  <td><p>测试表达式是否匹配值列表中的任何值。</p></td>
   </tr>
</table>

### 高级运算符{#advanced-operators}

- `count(*)`

    统计 collection 中 entity 的数量。使用 `count(*)` 作为输出字段可以以获取 collection 或 partition 中 entity 的数量。

    <Admonition type="info" icon="📘" title="说明">

    <p><code>count(*)</code> 适用于已加载的 collection。如果要使用该运算符，应将其作为输出的唯一字段。</p>

    </Admonition>