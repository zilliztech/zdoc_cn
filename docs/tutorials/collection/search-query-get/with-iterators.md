---
slug: /with-iterators
beta: FALSE
notebook: FALSE
type: origin
token: Yu8BwnVbmi6NQ2k3Of1cw8tMnSg
sidebar_position: 4
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - iterators
  - 迭代器

---

import Admonition from '@theme/Admonition';


# 使用 Iterators

Zilliz Cloud 支持在 search 和 query 操作时使用 iterator，这适用于包含大量 entity 的 search 或 query 结果。使用 iterator 可以帮助您进行分页浏览。

## 概览{#overview}

Iterator 是一个强大的工具，通过使用主键值和布尔表达式，帮助您浏览大型数据集。这可以显著改进您从 Zilliz Cloud 中检索数据的方式。相比于传统的使用 `offset` 和 `limit` 参数的方法，这些参数可能会随着时间推移变得效率低下，而 iterator 则提供了一个更具可扩展性的解决方案。

使用 iterator 的好处包括：

- 提高检索效率：iterator 通过使用主键值和布尔表达式，可以更有效地过滤和浏览大量数据。

- 增强可扩展性：相比于使用 `offset` 和 `limit` 参数，iterator 提供了更好的可扩展性，能够更好地支持大规模数据集的检索。

- 改进用户体验：iterator 可以帮助用户更加容易地进行分页浏览，从而提供更好的用户体验。

<Admonition type="info" icon="📘" title="说明">

<p>此功能适用于与 Milvus 2.3.x 兼容的 Zilliz Cloud 集群。</p>

</Admonition>

## 开始前{#preparations}

以下示例代码用于连接到 Zilliz Cloud 集群，快速设置 collection，并将超过 10000 条随机生成的 entity 插入到 collection 中。

### 步骤 1：创建 collection{#step-1-create-a-collection}

```python
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

### 步骤 2：随机插入 entity{#step-2-insert-randomly-generated-entities}

```python
# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(10000):
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
#         -0.5705990742218152,
#         0.39844925120642083,
#         -0.8791287928610869,
#         0.024163154953680932,
#         0.6837669917169638
#     ],
#     "color": "purple",
#     "tag": 7774,
#     "color_tag": "purple_7774"
# }

res = client.insert(
    collection_name="quick_setup",
    data=data,
)

print(res)

# Output
#
# {
#     "insert_count": 10000,
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
#         "(9990 more items hidden)"
#     ]
# }
```

## Search 时使用 iterator{#search-with-iterator}

Iterator 使相似性搜索更具可扩展性。要使用 iterator 进行搜索，请按以下步骤操作：

1. 初始化搜索 iterator 以定义搜索参数和输出字段。

1. 在循环中使用 `next()` 方法来分页浏览搜索结果。

    - 如果该方法返回一个空数组，循环结束，没有更多页面可用。

    - 所有结果都携带指定的输出字段。

1. 查看完所有结果记录后，调用 `close()` 方法来关闭 iterator。

```python
from pymilvus import Collection

# 4. Search with iterator
connections.connect(uri=CLUSTER_ENDPOINT, token=TOKEN)
collection = Collection("quick_setup")

query_vectors = [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]
search_params = {
    "metric_type": "IP",
    "params": {"nprobe": 10}
}

iterator = collection.search_iterator(
    data=query_vectors,
    anns_field="vector",
    batch_size=10,
    param=search_params,
    output_fields=["color_tag"],
    limit=3
)

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break
    
    for hit in result:
        results.append(hit.to_dict())

print(results)

# Output
#
# [
#     {
#         "id": 1756,
#         "distance": 2.0642056465148926,
#         "entity": {
#             "color_tag": "black_9109"
#         }
#     },
#     {
#         "id": 6488,
#         "distance": 1.9437453746795654,
#         "entity": {
#             "color_tag": "purple_8164"
#         }
#     },
#     {
#         "id": 3338,
#         "distance": 1.9107104539871216,
#         "entity": {
#             "color_tag": "brown_8121"
#         }
#     }
# ]
```

## Query 时使用 iterator{#query-with-an-iterator}

```python
# 6. Query with iterator
iterator = collection.query_iterator(
    batch_size=10,
    expr="color_tag like \"brown_8%\"",
    output_fields=["color_tag"]
)

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break

    results += result

# 7. Check the results
print(f"There are {len(results)} entities found. The first 3 are as follows:")

# Output
#
# There are 99 entities found. The first 3 are as follows:

print(results[:3])

# Output
#
# [
#     {
#         "color_tag": "brown_8785",
#         "id": 94
#     },
#     {
#         "color_tag": "brown_8568",
#         "id": 176
#     },
#     {
#         "color_tag": "brown_8721",
#         "id": 289
#     }
# ]
```

