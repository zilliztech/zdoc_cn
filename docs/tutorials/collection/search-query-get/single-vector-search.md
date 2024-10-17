---
title: "Single-Vector Search | Cloud"
slug: /single-vector-search
sidebar_label: "Single-Vector Search"
beta: FALSE
notebook: FALSE
description: "数据插入后，接下来是发起 `search` 请求，寻找与查询向量相似的向量。Single-vector search 通过比较查询向量与 collection 中的其他向量，找出与之最相似的 entity，返回 entity ID 及相互间的距离。Single-vector search 也支持返回向量数据和元数据。 | Cloud"
type: origin
token: YZH0wx8TAinCZbkAHAScDK2tnae
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - single-vector
  - search

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Single-Vector Search

数据插入后，接下来是发起 `search` 请求，寻找与查询向量相似的向量。Single-vector search 通过比较查询向量与 collection 中的其他向量，找出与之最相似的 entity，返回 entity ID 及相互间的距离。Single-vector search 也支持返回向量数据和元数据。

## 概述{#overview}

为满足不同需求，Zilliz Cloud 提供了多种 search 类型：

- [基础搜索（basic search）](./single-vector-search#basic-search)：包括 single-vector search、bulk-vector search、partition search 以及使用 `output_fields` 进行 search。

- [Filtered search](./single-vector-search#filtered-search)：利用过滤标量字段来精细化搜索结果。

- [Range search](./single-vector-search#range-search)：查找距离查询向量一定范围内的向量。

- [Grouping search](./single-vector-search#grouping-search)：使用 `group_by_field` 参数，按特定字段对搜索结果进行分组，确保结果多样性。

## 开始前{#preparations}

以下示例代码用于连接到 Zilliz Cloud 集群，快速创建 collection 和两个 partition，并向其插入数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
    metric_type="IP"
)

# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "color_tag": f"{current_color}_{str(random.randint(1000, 9999))}"
    })

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

# 6.1 Create partitions 
client.create_partition(
    collection_name="quick_setup",
    partition_name="red"
)

client.create_partition(
    collection_name="quick_setup",
    partition_name="blue"
)

# 6.1 Insert data into partitions
red_data = [ {"id": i, "vector": [ random.uniform(-1, 1) for _ in range(5) ], "color": "red", "color_tag": f"red_{str(random.randint(1000, 9999))}" } for i in range(500) ]
blue_data = [ {"id": i, "vector": [ random.uniform(-1, 1) for _ in range(5) ], "color": "blue", "color_tag": f"blue_{str(random.randint(1000, 9999))}" } for i in range(500) ]

res = client.insert(
    collection_name="quick_setup",
    data=red_data,
    partition_name="red"
)

print(res)

# Output
#
# {
#     "insert_count": 500,
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
#         "(490 more items hidden)"
#     ]
# }

res = client.insert(
    collection_name="quick_setup",
    data=blue_data,
    partition_name="blue"
)

print(res)

# Output
#
# {
#     "insert_count": 500,
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
#         "(490 more items hidden)"
#     ]
# }
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

import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp; 

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

GetLoadStateReq loadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

boolean state = client.getLoadState(loadStateReq);

System.out.println(state);

// Output:
// true

// 3. Insert randomly generated vectors into the collection
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JSONObject> data = new ArrayList<>();

for (int i=0; i<1000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
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

// 6.1. Create a partition
CreatePartitionReq partitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("red")
    .build();

client.createPartition(partitionReq);

partitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("blue")
    .build();

client.createPartition(partitionReq);

// 6.2 Insert data into the partition
data = new ArrayList<>();

for (int i=1000; i<1500; i++) {
    Random rand = new Random();
    String current_color = "red";
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}     

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("red")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 500}

data = new ArrayList<>();

for (int i=1500; i<2000; i++) {
    Random rand = new Random();
    String current_color = "blue";
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("blue")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 500}
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
    metric_type: "IP"
});  

// 3. Insert randomly generated vectors
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for (let i = 0; i < 1000; i++) {
    current_color = colors[Math.floor(Math.random() * colors.length)]
    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: current_color,
        color_tag: `${current_color}_${Math.floor(Math.random() * 8999) + 1000}`
    })
}

var res = await client.insert({
    collection_name: "quick_setup",
    data: data
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "red"
})

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "blue"
})

// 6.1 Insert data into partitions
var red_data = []
var blue_data = []

for (let i = 1000; i < 1500; i++) {
    red_data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: "red",
        color_tag: `red_${Math.floor(Math.random() * 8999) + 1000}`
    })
}

for (let i = 1500; i < 2000; i++) {
    blue_data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: "blue",
        color_tag: `blue_${Math.floor(Math.random() * 8999) + 1000}`
    })
}

res = await client.insert({
    collection_name: "quick_setup",
    data: red_data,
    partition_name: "red"
})

console.log(res.insert_cnt)

// Output
// 
// 500
// 

res = await client.insert({
    collection_name: "quick_setup",
    data: blue_data,
    partition_name: "blue"
})

console.log(res.insert_cnt)

// Output
// 
// 500
// 
```

</TabItem>
</Tabs>

## 基础搜索（basic search）{#basic-search}

发送 search 请求时，您可以指定一个或多个查询向量和请求返回的最大结果数（`limit`）。

根据您的实际数据和查询向量，最终返回的结果可能少于指定的最大结果数（`limit`），因为满足匹配条件的向量数可能小于指定的最大结果数。

### Single-vector search{#single-vector-search}

Zilliz Cloud 中的 single-vector search 是最简单的 search 操作，此操作可以找出与指定查询向量最相似的向量。

进行 single-vector search 时，需指定 collection 名称、查询向量及期望返回的最大结果数（`limit`）。Single-vector search 将返回一个结果集，包含最相似的向量、entity ID 以及与查询向量的距离。

以下是 search 与指定查询向量最为相似的前 3 条 entity 的示例代码。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Single vector search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=3, # The number of results to return
    search_params={"metric_type": "IP"}
)

print(res)
```

</TabItem>

<TabItem value='java'>

```java
// 4. Single vector search
List<List<Float>> query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

SearchReq searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .topK(3) // The number of results to return
    .build();

SearchResp searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 3, // The number of results to return
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 206,
            "distance": 2.50616455078125,
            "entity": {}
        },
        {
            "id": 138,
            "distance": 2.500145435333252,
            "entity": {}
        },
        {
            "id": 224,
            "distance": 2.484044313430786,
            "entity": {}
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [[
    {
        "score": 1.263043,
        "fields": {
            "vector": [
                0.9533119,
                0.02538395,
                0.76714665,
                0.35481733,
                0.9845762
            ],
            "id": 740
        }
    },
    {
        "score": 1.2377806,
        "fields": {
            "vector": [
                0.7411156,
                0.08687937,
                0.8254139,
                0.08370924,
                0.99095553
            ],
            "id": 640
        }
    },
    {
        "score": 1.1869997,
        "fields": {
            "vector": [
                0.87928146,
                0.05324632,
                0.6312755,
                0.28005534,
                0.9542448
            ],
            "id": 455
        }
    }
]]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  { score: 1.7463608980178833, id: '854' },
  { score: 1.744946002960205, id: '425' },
  { score: 1.7258622646331787, id: '718' }
]
```

</TabItem>
</Tabs>

以上结果返回与查询向量最相近的 3 条 entity，包括 entity ID 和距离等信息。

### Bulk-vector search{#bulk-vector-search}

Bulk-vector search 扩展了 [single-vector search](./single-vector-search#single-vector-search) 的功能特性，允许您在单次请求中基于多个查询向量进行搜索。这种搜索方式适用于需要同时为多个查询向量寻找相似向量的情况，可帮助您大幅节省时间和计算资源。

进行 bulk-vector search 时，可以在 `data` 字段中添加多个查询向量。搜索时，系统会并行处理这些向量，并为每个查询向量返回 collection 中最接近匹配的结果集。

以下示例展示了如何从两个查询向量中搜索两组最相似 entity。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 5. Batch-vector search
query_vectors = [
    [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
    [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
] # A list of two vectors

res = client.search(
    collection_name="quick_setup",
    data=query_vectors, 
    limit=2,
    search_params={"metric_type": "IP"}
)

print(res) # Two sets of results are to return
```

</TabItem>

<TabItem value='java'>

```java
// 5. Batch vector search
query_vectors = Arrays.asList(
    Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f),
    Arrays.asList(0.19886812562848388f, 0.06023560599112088f, 0.6976963061752597f, 0.2614474506242501f, 0.838729485096104f)
);

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .topK(2)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. Batch vector search
var query_vectors = [
    [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
    [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
]

res = await client.search({
    collection_name: "quick_setup",
    data: query_vectors,
    limit: 2,
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# Two sets of vectors are returned as expected

[
    [
        {
            "id": 81,
            "distance": 1.633650779724121,
            "entity": {}
        },
        {
            "id": 428,
            "distance": 1.6174099445343018,
            "entity": {}
        }
    ],
    [
        {
            "id": 972,
            "distance": 1.7308459281921387,
            "entity": {}
        },
        {
            "id": 545,
            "distance": 1.670518398284912,
            "entity": {}
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
// Two sets of vectors are returned as expected

{"searchResults": [
    [
        {
            "score": 1.263043,
            "fields": {
                "vector": [
                    0.9533119,
                    0.02538395,
                    0.76714665,
                    0.35481733,
                    0.9845762
                ],
                "id": 740
            }
        },
        {
            "score": 1.2377806,
            "fields": {
                "vector": [
                    0.7411156,
                    0.08687937,
                    0.8254139,
                    0.08370924,
                    0.99095553
                ],
                "id": 640
            }
        }
    ],
    [
        {
            "score": 1.8654699,
            "fields": {
                "vector": [
                    0.4671427,
                    0.8378432,
                    0.98844475,
                    0.82763994,
                    0.9729997
                ],
                "id": 638
            }
        },
        {
            "score": 1.8581753,
            "fields": {
                "vector": [
                    0.735541,
                    0.60140246,
                    0.86730254,
                    0.93152493,
                    0.98603314
                ],
                "id": 855
            }
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  [
    { score: 2.3590476512908936, id: '854' },
    { score: 2.2896690368652344, id: '59' }
  [
    { score: 2.664059638977051, id: '59' },
    { score: 2.59483003616333, id: '854' }
  ]
]

```

</TabItem>
</Tabs>

以上结果返回两组与查询向量最近邻的结果。

### Partition search{#partition-search}

Partition search 是指将搜索范围限定在 collection 中的一个或多个 partition，此类型适用于按逻辑或类型划分的数据集。通过减少扫描的数据量，可以显著提高搜索速度。

进行 partition search 时，只需在搜索请求中的 `partition_names` 字段添加目标 partition 的名称即可，这样搜索操作将仅在指定 partition 内寻找相似向量。

以下是在名为 `red` 的 partition 内搜索 entity 的代码示例。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 6.2 Search within a partition
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP"},
    partition_names=["red"]
)

print(res)
```

</TabItem>

<TabItem value='java'>

```java
// 6.3 Search within partitions
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .partitionNames(Arrays.asList("red"))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 6.2 Search within partitions
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    partition_names: ["red"],
    limit: 5,
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 320,
            "distance": 1.243729591369629,
            "entity": {}
        },
        {
            "id": 200,
            "distance": 1.2299367189407349,
            "entity": {}
        },
        {
            "id": 154,
            "distance": 1.1562182903289795,
            "entity": {}
        },
        {
            "id": 29,
            "distance": 1.1135238409042358,
            "entity": {}
        },
        {
            "id": 109,
            "distance": 1.0907914638519287,
            "entity": {}
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [
    [
        {
            "score": 1.1677284,
            "fields": {
                "vector": [
                    0.9986977,
                    0.17964739,
                    0.49086612,
                    0.23155272,
                    0.98438674
                ],
                "id": 1435
            }
        },
        {
            "score": 1.1476475,
            "fields": {
                "vector": [
                    0.6952647,
                    0.13417172,
                    0.91045254,
                    0.119336545,
                    0.9338931
                ],
                "id": 1291
            }
        },
        {
            "score": 1.0969629,
            "fields": {
                "vector": [
                    0.3363194,
                    0.028906643,
                    0.6675426,
                    0.030419827,
                    0.9735209
                ],
                "id": 1168
            }
        },
        {
            "score": 1.0741848,
            "fields": {
                "vector": [
                    0.9980543,
                    0.36063594,
                    0.66427994,
                    0.17359233,
                    0.94954175
                ],
                "id": 1164
            }
        },
        {
            "score": 1.0584627,
            "fields": {
                "vector": [
                    0.7187005,
                    0.12674773,
                    0.987718,
                    0.3110777,
                    0.86093885
                ],
                "id": 1085
            }
        }
    ],
    [
        {
            "score": 1.8030131,
            "fields": {
                "vector": [
                    0.59726167,
                    0.7054632,
                    0.9573117,
                    0.94529945,
                    0.8664103
                ],
                "id": 1203
            }
        },
        {
            "score": 1.7728865,
            "fields": {
                "vector": [
                    0.6672442,
                    0.60448086,
                    0.9325822,
                    0.80272985,
                    0.8861626
                ],
                "id": 1448
            }
        },
        {
            "score": 1.7536311,
            "fields": {
                "vector": [
                    0.59663296,
                    0.77831805,
                    0.8578314,
                    0.88818026,
                    0.9030075
                ],
                "id": 1010
            }
        },
        {
            "score": 1.7520742,
            "fields": {
                "vector": [
                    0.854198,
                    0.72294194,
                    0.9245805,
                    0.86126596,
                    0.7969224
                ],
                "id": 1219
            }
        },
        {
            "score": 1.7452049,
            "fields": {
                "vector": [
                    0.96419,
                    0.943535,
                    0.87611496,
                    0.8268136,
                    0.79786557
                ],
                "id": 1149
            }
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  { score: 3.0258803367614746, id: '1201' },
  { score: 3.004319190979004, id: '1458' },
  { score: 2.880324363708496, id: '1187' },
  { score: 2.8246407508850098, id: '1347' },
  { score: 2.797295093536377, id: '1406' }
]
```

</TabItem>
</Tabs>

在名为 `blue` 的 partition 中搜索 entity：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP"},
    partition_names=["blue"]
)

print(res)
```

</TabItem>

<TabItem value='java'>

```java
searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .partitionNames(Arrays.asList("blue"))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    partition_names: ["blue"],
    limit: 5,
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 59,
            "distance": 1.3296087980270386,
            "entity": {}
        },
        {
            "id": 139,
            "distance": 1.1872179508209229,
            "entity": {}
        },
        {
            "id": 201,
            "distance": 1.1474100351333618,
            "entity": {}
        },
        {
            "id": 298,
            "distance": 1.117565631866455,
            "entity": {}
        },
        {
            "id": 435,
            "distance": 1.0910152196884155,
            "entity": {}
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [
    [
        {
            "score": 1.1628494,
            "fields": {
                "vector": [
                    0.7442872,
                    0.046407282,
                    0.71031404,
                    0.3544345,
                    0.9819991
                ],
                "id": 1992
            }
        },
        {
            "score": 1.1470042,
            "fields": {
                "vector": [
                    0.5505825,
                    0.04367262,
                    0.9985836,
                    0.18922359,
                    0.93255126
                ],
                "id": 1977
            }
        },
        {
            "score": 1.1450152,
            "fields": {
                "vector": [
                    0.89994013,
                    0.052991092,
                    0.8645576,
                    0.6406729,
                    0.95679337
                ],
                "id": 1573
            }
        },
        {
            "score": 1.1439825,
            "fields": {
                "vector": [
                    0.9253267,
                    0.15890503,
                    0.7999555,
                    0.19126713,
                    0.898583
                ],
                "id": 1552
            }
        },
        {
            "score": 1.1029172,
            "fields": {
                "vector": [
                    0.95661926,
                    0.18777144,
                    0.38115507,
                    0.14323527,
                    0.93137646
                ],
                "id": 1823
            }
        }
    ],
    [
        {
            "score": 1.8005109,
            "fields": {
                "vector": [
                    0.5953582,
                    0.7794224,
                    0.9388869,
                    0.79825854,
                    0.9197286
                ],
                "id": 1888
            }
        },
        {
            "score": 1.7714822,
            "fields": {
                "vector": [
                    0.56805456,
                    0.89422905,
                    0.88187534,
                    0.914824,
                    0.8944365
                ],
                "id": 1648
            }
        },
        {
            "score": 1.7561421,
            "fields": {
                "vector": [
                    0.83421993,
                    0.39865613,
                    0.92319834,
                    0.42695504,
                    0.96633124
                ],
                "id": 1688
            }
        },
        {
            "score": 1.7553532,
            "fields": {
                "vector": [
                    0.89994013,
                    0.052991092,
                    0.8645576,
                    0.6406729,
                    0.95679337
                ],
                "id": 1573
            }
        },
        {
            "score": 1.7543385,
            "fields": {
                "vector": [
                    0.16542226,
                    0.38248396,
                    0.9888778,
                    0.80913955,
                    0.9501492
                ],
                "id": 1544
            }
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  { score: 2.8421106338500977, id: '1745' },
  { score: 2.838560104370117, id: '1782' },
  { score: 2.8134000301361084, id: '1511' },
  { score: 2.718268871307373, id: '1679' },
  { score: 2.7014894485473633, id: '1597' }
]
```

</TabItem>
</Tabs>

因为 `partition_1` 中的数据与 `partition_2` 中的不同，搜索结果将仅限于特定 partition，展示指定 partition 内的数据的独特性和分布情况。

### 使用 `output_fields`{#search-with-output-fields}

在 search 时使用 `output_fields` 允许您在搜索请求中选择特定的输出字段，系统会将这些字段的值返回给匹配的结果向量。

您可以在请求中指定 `output_fields`，以返回包含特定字段的结果。

以下是返回结果中包含 `color` 字段值的代码示例：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 7. Search with output fields
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP"},
    output_fields=["color"]
)

print(res)
```

</TabItem>

<TabItem value='java'>

```java
// 7. Search with output fields
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color"))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 7. Search with output fields
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    output_fields: ["color"],
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 29,
            "distance": 2.6317718029022217,
            "entity": {
                "color": "red"
            }
        },
        {
            "id": 405,
            "distance": 2.6302318572998047,
            "entity": {
                "color": "blue"
            }
        },
        {
            "id": 458,
            "distance": 2.3892529010772705,
            "entity": {
                "color": "green"
            }
        },
        {
            "id": 555,
            "distance": 2.350921154022217,
            "entity": {
                "color": "orange"
            }
        },
        {
            "id": 435,
            "distance": 2.29063081741333,
            "entity": {
                "color": "blue"
            }
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [
    [
        {
            "score": 1.263043,
            "fields": {}
        },
        {
            "score": 1.2377806,
            "fields": {}
        },
        {
            "score": 1.1869997,
            "fields": {}
        },
        {
            "score": 1.1748955,
            "fields": {}
        },
        {
            "score": 1.1720343,
            "fields": {}
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript

[
  { score: 3.036271572113037, id: '59', color: 'orange' },
  { score: 3.0267879962921143, id: '1745', color: 'blue' },
  { score: 3.0069446563720703, id: '854', color: 'black' },
  { score: 2.984386682510376, id: '718', color: 'black' },
  { score: 2.916019916534424, id: '425', color: 'purple' }
]

```

</TabItem>
</Tabs>

除了最相似的 entity 外，搜索结果还会包括指定的 `color` 字段，为每个匹配的向量提供更详细的信息。

## Filtered search{#filtered-search}

通过定义标量过滤条件，filtered search 可以精确调整向量搜索的结果。要了解更多关于过滤表达式的详细信息，请参阅[标量过滤规则](https://milvus.io/docs/boolean.md)和[Get 和 Scalar Query](./get-and-scalar-query)。

### 使用 `like` 操作符{#single-vector-search#use-the-like-operator}

`like` 操作符通过前缀、中缀和后缀匹配，显著提升了搜索特定字符串的灵活性与效率：

- **前缀匹配**：若需查找以特定前缀开头的字符串，使用语法 `'like "prefix%"'`。

- **中缀匹配**：若需查找含特定字符序列的字符串，使用语法 `'like "%infix%"'`。

- **后缀匹配**：若需查找以特定后缀结尾的字符串，使用语法 `'like "%suffix"'`。

对于单字符匹配，下划线 (`_`) 作为单个字符的占位符，例如 `'like "y_llow"'`，可匹配到 `"yellow"`。

### 匹配包含特殊字符的字符串{#special-characters-in-search-strings}

在匹配本身包含下划线 (`_`) 或百分号（`%`）这类特殊字符的字符串时，由于它们通常在搜索模式中担当通配符的角色（ `_` 代表匹配任意单个字符，`%` 代表匹配任意字符序列），因此需要对这些字符进行转义，确保它们被视作字面字符处理。使用反斜杠（`\`）来转义特殊字符，并需要转义反斜杠本身。例如：

- 若要搜索字面下划线（`\`），应使用  `\_`。

- 要搜索字面百分号（`%`），应使用 `\%`。

因此，如果需要搜索文本 `"_version_"`，过滤表达式应使用 `'like "\_version\_"'`，确保下划线被视为搜索词的一部分，而非通配符，从而准确匹配目标字符串。

如果要筛选以 `red` 开头的 `color`，可以使用 `'like "red%"'` 表达式。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 8. Filtered search
# 8.1 Filter with "like" operator and prefix wildcard
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP"},
    filter='color_tag like "red%"',
    output_fields=["color_tag"]
)

print(res)
```

</TabItem>

<TabItem value='java'>

```java
// 8. Filtered search
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color_tag"))
    .filter("color_tag like \"red%\"")
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 8. Filtered search
// 8.1 Filter with "like" operator and prefix wildcard
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    filters: "color_tag like \"red%\"",
    output_fields: ["color_tag"]
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 58,
            "distance": 1.4645483493804932,
            "entity": {
                "color_tag": "red_8218"
            }
        },
        {
            "id": 307,
            "distance": 1.4149816036224365,
            "entity": {
                "color_tag": "red_3923"
            }
        },
        {
            "id": 16,
            "distance": 1.3404488563537598,
            "entity": {
                "color_tag": "red_9524"
            }
        },
        {
            "id": 142,
            "distance": 1.31600022315979,
            "entity": {
                "color_tag": "red_4160"
            }
        },
        {
            "id": 438,
            "distance": 1.315270185470581,
            "entity": {
                "color_tag": "red_8131"
            }
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [
    [
        {
            "score": 1.1869997,
            "fields": {"color_tag": "red_3026"}
        },
        {
            "score": 1.1677284,
            "fields": {"color_tag": "red_9030"}
        },
        {
            "score": 1.1476475,
            "fields": {"color_tag": "red_3744"}
        },
        {
            "score": 1.0969629,
            "fields": {"color_tag": "red_4168"}
        },
        {
            "score": 1.0741848,
            "fields": {"color_tag": "red_9678"}
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  { score: 2.5080761909484863, id: '1201', color_tag: 'red_8904' },
  { score: 2.491129159927368, id: '425', color_tag: 'purple_8212' },
  { score: 2.4889798164367676, id: '1458', color_tag: 'red_6891' },
  { score: 2.42964243888855, id: '724', color_tag: 'black_9885' },
  { score: 2.4004223346710205, id: '854', color_tag: 'black_5990' }
]
```

</TabItem>
</Tabs>

若要筛选 `color` 字段值包含 `ll` 特定字符序列的字符串，可以参考如下示例：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# Infix match on color field
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="quick_setup", # Replace with the actual name of your collection
    data=[query_vector],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {"level": 1}}, # Search parameters
    output_fields=["color_tag"], # Output fields to return
    filter='color like "%ll%"' # Filter on color field, infix match on "ll"
)

result = json.dumps(res, indent=4)
print(result)
```

</TabItem>

<TabItem value='java'>

```java
// 8. Filtered search
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color_tag"))
    .filter("color like \"%ll%\"")
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 8. Filtered search
// 8.1 Filter with "like" operator and prefix wildcard
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    filters: "color_tag like \"%ll%\"",
    output_fields: ["color_tag"]
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 5,
            "distance": 0.7972343564033508,
            "entity": {
                "color": "yellow_4222"
            }
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [
    [
        {
            "score": 1.1869997,
            "fields": {"color_tag": "yellow_4222"}
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  { score: 2.5080761909484863, id: '1201', color_tag: 'yellow_4222' }
]
```

</TabItem>
</Tabs>

## Range search{#range-search}

Range search 能够帮助您找到距离查询向量在特定距离范围内的向量。

通过设置 `radius`，并选择性地指定 `range_filter`，您可以扩大搜索范围，将与查询向量相似度略有不同的向量也纳入搜索范围，以便更全面地查找可能的匹配项。

- `radius`：设定搜索空间的最远边界。只有距离查询向量在这个范围内的向量才会被视为潜在的匹配项。

- `range_filter`（可选）：`radius` 定义了搜索范围的最远边界，`range_filter` 则用来设定内部边界，形成一个必须在这个范围内的向量才会被视为匹配的距离区间。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# Conduct a range search
search_params = {
    "metric_type": "IP",
    "params": {
        "radius": 0.8, # Radius of the search circle
        "range_filter": 1.0 # Range filter to filter out vectors that are not within the search circle
    }
}

query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="quick_setup", # Replace with the actual name of your collection
    data=[query_vector],
    limit=3, # Max. number of search results to return
    search_params=search_params, # Search parameters
    output_fields=["color_tag"], # Output fields to return
)

result = json.dumps(res, indent=4)
print(result)
```

</TabItem>

<TabItem value='java'>

```java
// 9. Range search
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color_tag"))
    .searchParams(Map.of("radius", 0.1, "range", 1.0))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 9. Range search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    params: {
        radius: 0.1,
        range: 1.0
    },
    output_fields: ["color_tag"]
})

console.log(res.results)
```

</TabItem>
</Tabs>

示例返回结果如下：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
[
    [
        {
            "id": 136,
            "distance": 2.4410910606384277,
            "entity": {}
        },
        {
            "id": 897,
            "distance": 2.2852015495300293,
            "entity": {}
        },
        {
            "id": 336,
            "distance": 2.2819623947143555,
            "entity": {}
        },
        {
            "id": 50,
            "distance": 2.2552754878997803,
            "entity": {}
        },
        {
            "id": 462,
            "distance": 2.2343976497650146,
            "entity": {}
        }
    ]
]
```

</TabItem>

<TabItem value='java'>

```java
{"searchResults": [
    [
        {
            "score": 1.263043,
            "fields": {"color_tag": "green_2052"}
        },
        {
            "score": 1.2377806,
            "fields": {"color_tag": "purple_3709"}
        },
        {
            "score": 1.1869997,
            "fields": {"color_tag": "red_3026"}
        },
        {
            "score": 1.1748955,
            "fields": {"color_tag": "black_1646"}
        },
        {
            "score": 1.1720343,
            "fields": {"color_tag": "green_4853"}
        }
    ]
]}
```

</TabItem>

<TabItem value='javascript'>

```javascript
[
  { score: 2.3387961387634277, id: '718', color_tag: 'black_7154' },
  { score: 2.3352415561676025, id: '1745', color_tag: 'blue_8741' },
  { score: 2.290485382080078, id: '1408', color_tag: 'red_2324' },
  { score: 2.285870313644409, id: '854', color_tag: 'black_5990' },
  { score: 2.2593345642089844, id: '1309', color_tag: 'red_8458' }
]
```

</TabItem>
</Tabs>

`radius` 和 `range_filter` 的参数值设置会根据所用的度量类型而有所不同。

<table>
   <tr>
     <th><p><strong>度量类型</strong></p></th>
     <th><p><strong>特点</strong></p></th>
     <th><p><strong>Range search</strong></p></th>
   </tr>
   <tr>
     <td><p><code>L2</code></p></td>
     <td><p>较小的 L2 距离表示更高的相似性。</p></td>
     <td><p>要排除结果中最近的向量，请确保：</p><p><code>0</code> &lt;= <code>range_filter</code> &lt;= distance &lt; <code>radius</code> &lt; <code>∞</code></p></td>
   </tr>
   <tr>
     <td><p><code>IP</code></p></td>
     <td><p>较大的 IP 距离表示更高的相似性。</p></td>
     <td><p>要排除结果中最近的向量，请确保：</p><p><code>-1</code> &lt;= <code>radius</code> &lt; distance &lt;= <code>range_filter</code> &lt;= <code>1</code></p></td>
   </tr>
   <tr>
     <td><p><code>COSINE</code></p></td>
     <td><p>较大的 cosine 值表示更高的相似性。</p></td>
     <td><p>要排除结果中最近的向量，请确保：</p><p><code>-1</code> &lt;= <code>radius</code> &lt; distance &lt;= <code>range_filter</code> &lt;= <code>1</code></p></td>
   </tr>
   <tr>
     <td><p><code>JACCARD</code> <sup>(Beta)</sup></p></td>
     <td><p>较小的 Jaccard 距离表示更高的相似性。</p></td>
     <td><p>要排除结果中最近的向量，请确保：</p><p><code>0</code> &lt;= <code>range_filter</code> &lt;= distance &lt; <code>radius</code> &lt;= <code>1</code></p></td>
   </tr>
   <tr>
     <td><p><code>HAMMING</code> <sup>(Beta)</sup></p></td>
     <td><p>较小的 Hamming 距离表示更高的相似性。</p></td>
     <td><p>要排除结果中最近的向量，请确保：</p><p><code>0</code> &lt;= <code>range_filter</code> &lt;= distance &lt; <code>radius</code> &lt; <code>dim(vector)</code></p></td>
   </tr>
</table>

## Grouping search(Beta){#grouping-search}

在 Zilliz Cloud 中，通过特定字段的 grouping search 能够避免结果中同一字段项的重复出现，从而获取更加多样化的结果。

假设有一个包含多个文档的 collection，每个文档都被切分成若干段落，每段落由一个向量 embedding 表示，并属于某一文档。为了寻找相关文档而不是相似段落，您可以在 `search()` 操作中使用 `group_by_field` 参数，按文档 ID 对结果进行分组。这样有助于返回最相关且独立的文档，而不是同一文档的不同段落。

<Admonition type="info" icon="📘" title="说明">

<p>此功能目前仅适用于已升级到 Beta 版的 Zilliz Cloud 集群。</p>

</Admonition>

以下是一个按照指定字段执行 grouping search 的代码示例：

```python
# Load data into collection
client.load_collection("group_search") # Collection name

# Group search results
res = client.search(
    collection_name="group_search", # Collection name
    data=[[0.14529211512077012, 0.9147257273453546, 0.7965055218724449, 0.7009258593102812, 0.5605206522382088]], # Query vector
    search_params={"metric_type": "L2"}, # Search parameters
    limit=10, # Max. number of search results to return
    group_by_field="doc_id", # Group results by document ID
    output_fields=["doc_id", "passage_id"]
)

# Retrieve the values in the `doc_id` column
doc_ids = [result['entity']['doc_id'] for result in res[0]]

print(doc_ids)
```

示例返回结果如下：

```python
[5, 10, 1, 7, 9, 6, 3, 4, 8, 2]
```

在所给输出中，可以看到返回的 entity 中没有重复的 `doc_id` 值。

为了进行比较，我们注释掉 `group_by_field` 参数，然后执行一次常规搜索：

```python
# Load data into collection
client.load_collection("group_search") # Collection name

# Search without `group_by_field`
res = client.search(
    collection_name="group_search", # Collection name
    data=query_passage_vector, # Replace with your query vector
    search_params={"metric_type": "L2"}, # Search parameters
    limit=10, # Max. number of search results to return
    # group_by_field="doc_id", # Group results by document ID
    output_fields=["doc_id", "passage_id"]
)

# Retrieve the values in the `doc_id` column
doc_ids = [result['entity']['doc_id'] for result in res[0]]

print(doc_ids)
```

示例返回结果如下：

```python
[1, 10, 3, 10, 1, 9, 4, 4, 8, 6]
```

在以上的输出中，可以看到返回的 entity 存在重复 `doc_id` 值。

**使用限制**：

- **向量**：当前，grouping search 不支持 **BINARY_VECTOR** 类型的向量字段。关于数据类型的更多信息，请参阅 [Supported data types](https://milvus.io/docs/schema.md#Supported-data-types)。

- **字段**：当前，grouping search 仅支持单列。`group_by_field` 配置中不能指定多个字段名称。此外，grouping search 不支持 **JSON**、**FLOAT**、**DOUBLE**、**ARRAY** 或向量字段的数据类型。

- **性能**：Grouping search 的查询性能随查询向量数增加而降低。例如，在配备 2 CPU 核和 8 GB 内存的集群中，grouping search 的执行时间会随着输入查询向量数的增加而增长。

- **功能性**：Grouping search 不支持 [range search](./single-vector-search#range-search)、[使用 iterators](./with-iterators) 或 [hybrid search](./hybrid-search)。

## Search 参数{#search-parameters}

以上搜索类型中，除了 range search 和 grouping search，其他搜索采用标准的 search 参数。通常，无需手动设置这些参数。

```python
# In normal cases, you do not need to set search parameters manually
# Except for range searches.
search_parameters = {
    'metric_type': 'L2',
    'params': {
        'level': 1，
        'radius': 1.0
        'range_filter': 0.8
    }
}
```

下表列出了 search 相关参数的可能配置：

<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p><code>metric_type</code></p></td>
     <td><p>度量向量 embedding 间相似度的方法。</p><p>可选值为 <code>IP</code>、<code>L2</code>、<code>COSINE</code>。默认按已加载（load）的索引文件设定。</p></td>
   </tr>
   <tr>
     <td><p><code>params.level</code></p></td>
     <td><p>Search 的精度等级。</p><p>可选值为 <code>1</code>、<code>2</code>、<code>3</code>，默认为 <code>1</code>。较高的值能提高精确度，但会降低性能。</p></td>
   </tr>
   <tr>
     <td><p><code>params.radius</code></p></td>
     <td><p>查询向量与候选向量间的最小相似度。</p><p>其取值范围与当前使用的相似度类型有关。如果您使用了 L2 相似度类型，其取值范围为 [0, ∞)；如果您选择使用 COSINE 相似度类型，其取值范围为 [-1,1]。关于各相似度类型的取值范围可以参考<a href="./search-metrics-explained">相似度类型</a>。</p></td>
   </tr>
   <tr>
     <td><p><code>params.range_filter</code></p></td>
     <td><p>相似度范围，可细化搜索范围，只包括在此范围内的向量。</p><p>其取值范围与当前使用的相似度类型有关。如果您使用了 L2 相似度类型，其取值范围为 [0, ∞)；如果您选择使用 COSINE 相似度类型，其取值范围为 [-1,1]。关于各相似度类型的取值范围可以参考<a href="./search-metrics-explained">相似度类型</a>。</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>[1] 索引后的集群单位数。建立索引时，Zilliz Cloud 会根据索引设置将向量数据分为多个集群单位。</p>
<p>[2] Search 结果中的 entity 数量。</p>

</Admonition>