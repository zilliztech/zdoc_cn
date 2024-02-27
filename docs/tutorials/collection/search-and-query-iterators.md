---
slug: /search-and-query-iterators
beta: FALSE
notebook: 09_search_query_iterators.ipynb
token: GPXpwOFduiAAwskVE5lcaUYznpe
sidebar_position: 9
---

import Admonition from '@theme/Admonition';


# 使用迭代器搜索和查询

本指南介绍如何利用迭代器（Iterator）的强大功能，在大型数据集中进行高效的搜索与查询。

## 概述{#overview}

迭代器是一种先进的工具，它通过处理主键值和布尔表达式，使您能够轻松浏览和查询大型数据集。相较于传统的 `offset` 和 `limit` 参数配置，迭代器能提供更高效、更具扩展性的搜索和查询解决方案。

### 迭代器的优势{#benefits-of-using-iterators}

- 简化操作：免去复杂的 `offset` 和 `limit` 参数设置。

- 提高效率：按需获取数据，享受更快速的数据检索体验。

- 一致性：通过布尔过滤确保每次迭代都能维持数据集的一致大小。

<Admonition type="info" icon="📘" title="说明">

<p>目前，迭代器功能处于 Beta 测试阶段。请注意，该功能及相关文档在 Beta 测试期间可能会有所更改。</p>

</Admonition>

## 开始前{#before-you-start}

在开始使用迭代器进行搜索或查询前，请确保以下几点：

- 您的集群已升级至 Beta 版本。

- 您已下载了示例数据集，更多详情参见[示例数据集](./example-dataset)。

## 准备数据集{#prepare-your-dataset}

环境设置步骤如下：

1. 创建一个与您数据集相匹配的 Collection：

    ```python
    # 0. Connect to cluster
    connections.connect(
        uri=CLUSTER_ENDPOINT, # Public endpoint obtained from Zilliz Cloud
        token=TOKEN, # API key or a colon-separated cluster username and password
    )
    
    # 1. Define fields
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
    
    # 2. Build the schema
    schema = CollectionSchema(
        fields,
        description="Schema of Medium articles",
        enable_dynamic_field=False
    )
    
    # 3. Create collection
    collection = Collection(
        name='medium_articles', 
        description="Medium articles published between Jan and August in 2020 in prominent publications",
        schema=schema
    )
    
    # 4. Index collection
    # 'index_type' defines the index algorithm to be used.
    #    AUTOINDEX is the only option.
    #
    # 'metric_type' defines the way to measure the distance 
    #    between vectors. Possible values are L2, IP, and Cosine,
    #    and defaults to Cosine.
    index_params = {
        "index_type": "AUTOINDEX",
        "metric_type": "L2",
        "params": {}
    }
    
    # To name the index, do as follows:
    collection.create_index(
        field_name="title_vector", 
        index_params=index_params,
    )
    
    # 5. Load collection
    collection.load()
    
    # Get loading progress
    progress = utility.loading_progress(COLLECTION_NAME)
    
    print(progress)
    
    # Output
    #
    # {
    #     "loading_progress": "100%"
    # }
    
    ```

1. 准备待插入的数据集：

    ```python
    # Prepare a list of rows
    with open('medium_articles_2020_dpr.json') as f:
        data = json.load(f)
        rows = data['rows']
    
    print(rows[:3])
    
    # Output
    #
    # [
    #     {
    #         "id": 0,
    #         "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
    #         "title_vector": [
    #             0.041732933,
    #             0.013779674,
    #             -0.027564144,
    #             -0.013061441,
    #             0.009748648,
    #             0.00082446384,
    #             -0.00071647146,
    #             0.048612226,
    #             -0.04836573,
    #             -0.04567751,
    #             "(758 more items hidden)"
    #         ],
    #         "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
    #         "reading_time": 13,
    #         "publication": "The Startup",
    #         "claps": 1100,
    #         "responses": 18
    #     },
    #     {
    #         "id": 1,
    #         "title": "Dashboards in Python: 3 Advanced Examples for Dash Beginners and Everyone Else",
    #         "title_vector": [
    #             0.0039737443,
    #             0.003020432,
    #             -0.0006188639,
    #             0.03913546,
    #             -0.00089768134,
    #             0.021238148,
    #             0.014454661,
    #             0.025742851,
    #             0.0022063442,
    #             -0.051130578,
    #             "(758 more items hidden)"
    #         ],
    #         "link": "https://medium.com/swlh/dashboards-in-python-3-advanced-examples-for-dash-beginners-and-everyone-else-b1daf4e2ec0a",
    #         "reading_time": 14,
    #         "publication": "The Startup",
    #         "claps": 726,
    #         "responses": 3
    #     },
    #     {
    #         "id": 2,
    #         "title": "How Can We Best Switch in Python?",
    #         "title_vector": [
    #             0.031961977,
    #             0.00047043373,
    #             -0.018263113,
    #             0.027324716,
    #             -0.0054595284,
    #             -0.014779159,
    #             0.017511465,
    #             0.030381083,
    #             -0.018930407,
    #             -0.03372473,
    #             "(758 more items hidden)"
    #         ],
    #         "link": "https://medium.com/swlh/how-can-we-best-switch-in-python-458fb33f7835",
    #         "reading_time": 6,
    #         "publication": "The Startup",
    #         "claps": 500,
    #         "responses": 7
    #     }
    # ]
    
    # Insert data
    results = collection.insert(rows)
    
    print(f"Data inserted successfully! inserted rows: {results.insert_count}")
    
    # Output
    #
    # Data inserted successfully! inserted rows: 5979
    
    time.sleep(10)
    ```

## 使用迭代器搜索{#search-with-an-iterator}

迭代器能够简化搜索与查询向量相似的 Entity 的过程。具体请按照以下步骤进行：

1. 初始化搜索迭代器，设定搜索参数和输出字段。

1. 在循环中使用 `next()` 方法分页检索搜索结果：

    - 若 `next()` 返回空数组，意味着没有更多页面，结束循环。

    - 如有搜索结果，将显示所设定的输出字段。

1. 数据检索完毕后，使用 `close()` 关闭迭代器。

```python
# 8. Search vectors

query_vector = rows[0]['title_vector']

# Define search parameters
search_params = {
    "metric_type": "L2",
    "params": {"nprobe": 10}
}

# Execute search
iterator = collection.search_iterator(
    data=[query_vector], 
    anns_field="title_vector",
    batch_size=10,
    limit=100, 
    param=search_params,
    output_fields=["title", "link", "publication"]
)

results = []

while True:
    result = iterator.next()
    if len(result) == 0:
        iterator.close()
        break;

    for x in range(len(result)):
        results.append(result[x])

results = [ { 
    "id": x.id,
    "distance": x.distance,
    "entity": {
        "title": x.entity.get("title"),
        "link": x.entity.get("link"),
        "publication": x.entity.get("publication")
        },
    } for x in results]

print(results[:3])

# Output
#
# [
#     {
#         "id": 0,
#         "distance": 0.0,
#         "entity": {
#             "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
#             "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
#             "publication": "The Startup"
#         }
#     },
#     {
#         "id": 3177,
#         "distance": 0.29999834299087524,
#         "entity": {
#             "title": "Following the Spread of Coronavirus",
#             "link": "https://towardsdatascience.com/following-the-spread-of-coronavirus-23626940c125",
#             "publication": "Towards Data Science"
#         }
#     },
#     {
#         "id": 5607,
#         "distance": 0.36103832721710205,
#         "entity": {
#             "title": "The Hidden Side Effect of the Coronavirus",
#             "link": "https://medium.com/swlh/the-hidden-side-effect-of-the-coronavirus-b6a7a5ee9586",
#             "publication": "The Startup"
#         }
#     }
# ]
```

## 使用迭代器查询{#query-with-an-iterator}

查询迭代器通过迭代主键表达式 (`expr`) 提供精确且可靠的分页方式。得益于查询的 `selectLowestPK` 简化原则，确保了分页的准确性。执行带有迭代器的查询的步骤如下：

1. 启动查询迭代器。

1. 使用 `expr` 对结果进行一致性过滤和分页。

```python
# 9. Query with iterators

iterator = collection.query_iterator(
    batch_size=10,
    limit=100,
    expr="claps > 1000",
    output_fields=["title", "link", "claps"]
)

results = []

while True:
    result = iterator.next()
    if len(result) == 0:
        iterator.close()
        break;

    for x in range(len(result)):
        results.append(result[x])

print(results[:3])

# Output
#
# [
#     {
#         "title": "The Reported Mortality Rate of Coronavirus Is Not Important",
#         "link": "https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912",
#         "claps": 1100,
#         "id": 0
#     },
#     {
#         "title": "What I Learned From Walking 3000 Miles to Work",
#         "link": "https://medium.com/swlh/what-i-learned-from-walking-3000-miles-to-work-5bf210ab18b3",
#         "claps": 1600,
#         "id": 34
#     },
#     {
#         "title": "How to Be Memorable in Social Settings",
#         "link": "https://medium.com/personal-growth/how-to-be-memorable-in-social-settings-9fabcf80d20d",
#         "claps": 8600,
#         "id": 66
#     }
# ]
```

## 相关文档{#related-topics}

- [创建 Collection](./create-collection)

- [使用 Partition Key](./use-partition-key)

- [插入并更新 Entity](./upsert-entities)

- [使用高级表达式搜索和查询](./search-and-query-advanced-expressions)

