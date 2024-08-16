---
slug: /hybrid-search
beta: TRUE
notebook: FALSE
type: origin
token: Jd0iwlti6iNIEck1u0acOw8xnip
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - hybrid search

---

import Admonition from '@theme/Admonition';


# Hybrid Search

在 Zilliz Cloud 中，我们引入了多向量支持与 hybrid search 框架，支持在单一 collection 内整合多个向量字段。不同的向量字段能够承载不同维度或类型的 embedding 模型，或描述同一 entity 的多模态数据，极大地提升了信息的丰富性和多样性。多向量和 hybrid search 功能在综合搜索场景中尤为突出，例如，它能够基于图片、声音、指纹等多种属性，在向量库中精准定位到最相似的个体，为用户提供更全面、更精准的搜索体验。

Hybrid search 支持在多个向量字段上执行搜索请求，通过采用 reranking 策略，如互惠排序融合（Reciprocal Rank Fusion）和加权评分（Weighted Scoring），来整合和优化搜索结果。有关更多 reranking 策略，请参阅 [Reranking](./reranking)。

<Admonition type="info" icon="📘" title="说明">

<p>此功能目前仅适用于已升级到 Beta 版的 Zilliz Cloud 集群。</p>

</Admonition>

在本教程中，您将了解到：

- 为不同向量字段的相似性搜索创建多个 `AnnSearchRequest` 实例；

- 配置 reranking 策略以整合来自多个 `AnnSearchRequest` 的搜索结果；

- 调用 `hybrid search()` 方法执行 hybrid search。

<Admonition type="info" icon="📘" title="说明">

<p>本页面的代码示例采用 <a href="/reference/python/ORM">PyMilvus ORM</a> 模块与 Zilliz Cloud 进行交互。我们正积极开发使用新 <a href="/reference/python/MilvusClient">MilvusClient SDK</a> 的代码示例，敬请期待。</p>

</Admonition>

## 准备工作{#preparations}

在 hybrid search 之前，请确保您有一个包含多个向量字段的 collection。以下是创建一个名为 `test_collection` 的 collection 示例代码，该 collection 包含两个向量字段，`filmVector` 和 `posterVector`，并向其中插入随机 entity。

```python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
import random

CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" # Set your cluster endpoint
TOKEN="YOUR_CLUSTER_TOKEN" # Set your token

# Connect to cluster
connections.connect(
    uri=CLUSTER_ENDPOINT, 
    token=API_KEY
)

# Create schema
fields = [
    FieldSchema(name="film_id", dtype=DataType.INT64, is_primary=True),
    # Vector field for film vectors
    FieldSchema(name="filmVector", dtype=DataType.FLOAT_VECTOR, dim=5), 
    # Vector field for poster vectors
    FieldSchema(name="posterVector", dtype=DataType.FLOAT_VECTOR, dim=5)] 

schema = CollectionSchema(fields=fields,enable_dynamic_field=False)

# Create collection
collection = Collection(name="test_collection", schema=schema)

# Create index for each vector field
index_params = {
    "metric_type": "L2",
    "index_type": "AUTOINDEX",
    "params": {"nlist": 128},
}

collection.create_index("filmVector", index_params)
collection.create_index("posterVector", index_params)

# Generate random entities to insert
entities = []

for _ in range(1000):
    # generate random values for each field in the schema
    film_id = random.randint(1, 1000)
    film_vector = [ random.random() for _ in range(5) ]
    poster_vector = [ random.random() for _ in range(5) ]

    # creat a dictionary for each entity
    entity = {
        "film_id": film_id,
        "filmVector": film_vector,
        "posterVector": poster_vector
    }

    # add the entity to the list
    entities.append(entity)
    
collection.insert(entities)
```

## 步骤 1：创建多个 AnnSearchRequest 实例{#step-1-create-multiple-annsearchrequest-instances}

在 hybrid search 中，通过 `hybrid_search()` API 可以在一次调用中执行多个 ANN search 请求。每个 `AnnSearchRequest` 代表对指定向量字段的一次单独 search 请求。

以下示例创建了两个 `AnnSearchRequest` 实例，用于对两个不同的向量字段进行单独的相似性搜索。

```python
from pymilvus import AnnSearchRequest

# Create ANN search request 1 for filmVector
query_filmVector = [[0.8896863042430693, 0.370613100114602, 0.23779315077113428, 0.38227915951132996, 0.5997064603128835]]

search_param_1 = {
    "data": query_filmVector, # Query vector
    "anns_field": "filmVector", # Vector field name
    "param": {
        "metric_type": "L2", # This parameter value must be identical to the one used in the collection schema
        "params": {"nprobe": 10}
    },
    "limit": 2 # Number of search results to return in this AnnSearchRequest
}
request_1 = AnnSearchRequest(**search_param_1)

# Create ANN search request 2 for posterVector
query_posterVector = [[0.02550758562349764, 0.006085637357292062, 0.5325251250159071, 0.7676432650114147, 0.5521074424751443]]
search_param_2 = {
    "data": query_posterVector, # Query vector
    "anns_field": "posterVector", # Vector field name
    "param": {
        "metric_type": "L2", # This parameter value must be identical to the one used in the collection schema
        "params": {"nprobe": 10}
    },
    "limit": 2 # Number of search results to return in this AnnSearchRequest
}
request_2 = AnnSearchRequest(**search_param_2)

# Store these two requests as a list in `reqs`
reqs = [request_1, request_2]
```

参数：

- `AnnSearchRequest` (*object*)

    执行单次 ANN search 请求的类。一次 hybrid search 操作可以包含 1 到 1024 个 `AnnSearchRequest` 对象。

- `data` (*list*)

    用于单次 `AnnSearchRequest` 的查询向量。目前，该参数只接受包含单个查询向量的列表，例如 `[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]`。该参数未来将扩展接受多个查询向量。

- `anns_field` (*string*)

    用于单次 `AnnSearchRequest` 的向量字段名称。

- `param` (*dict*)

    用于单次 `AnnSearchRequest` 的 search 参数。这些参数与 single-vector search 的参数相同。更多信息，请参考 [Search 参数](./single-vector-search#search-parameters)。

- `limit` (*int*)

    单次 `AnnSearchRequest` 返回的最大结果数。该参数仅影响单次 `AnnSearchRequest` 返回的结果数量，不直接影响 hybrid search 的最终返回结果数。在 hybrid search 中，最终结果是通过组合和 reranking 多个 `AnnSearchRequest` 实例的结果来确定的。

## 步骤 2：配置 reranking 策略{#step-2-configure-a-reranking-strategy}

在创建 `AnnSearchRequest` 实例后，配置 reranking 策略以综合并重排序各 `AnnSearchRequest` 的返回结果。目前支持以下 reranking 策略：

- 使用加权评分（Weighted Scoring）

    `WeightedRanker` 用于为基于各向量字段的 search 结果分配权重。如果基于某个向量字段的 search 结果比其他字段更重要，可以通过 `WeightedRanker(value1, value2, ..., valueN)` 在组合搜索结果中体现权重优先级。

    ```python
    from pymilvus import WeightedRanker
    # Use WeightedRanker to combine results with specified weights
    # Assign weights of 0.8 to text search and 0.2 to image search
    rerank = WeightedRanker(0.8, 0.2)  
    ```

    使用 `WeightedRanker` 时，请注意：

    - 每个权重值的范围为 0（最不重要）到 1（最重要），权重值将影响最终的聚合评分。

    - 在 `WeightedRanker` 中指定的权重值总数应等于您创建的 `AnnSearchRequest` 实例的数量。

- 使用互惠排序融合（Reciprocal Rank Fusion）

    ```python
    # Alternatively, use RRFRanker for reciprocal rank fusion reranking
    rerank = RRFRanker()
    ```

## 步骤 3：执行 hybrid search{#step-3-perform-a-hybrid-search}

在设置好 `AnnSearchRequest` 实例和 reranking 策略后，使用 `hybrid_search()` 方法执行 hybrid search。

```python
# Before conducting hybrid search, load the collection into memory.
collection.load()

res = collection.hybrid_search(
    reqs, # List of AnnSearchRequests created in step 1
    rerank, # Reranking strategy specified in step 2
    limit=2 # Number of final search results to return
)

print(res)
```

参数：

- `reqs` (*list*) 

    Search 请求的列表，每个请求都是一个 `AnnSearchRequest` 对象。每个 search 请求可以对应不同的向量字段和一组不同的 search 参数。

- `rerank` (*object*) 

    Reranking 策略。可选值包括：

    - `WeightedRanker(value1, value2, ..., valueN)`

    - `RRFRanker()`

- `limit` (*int*) 

    Hybrid search 最终返回的最大结果数量。

最终，将返回类似以下的 search 结果：

```python
["['id: 844, distance: 0.006047376897186041, entity: {}', 'id: 876, distance: 0.006422005593776703, entity: {}']"]
```

## 使用限制{#limits}

- 通常，每个 collection 默认最多可以包含 4 个向量字段。

- Hybrid search 时，若 collection 中的向量字段仅部分完成了索引构建或加载，搜索操作将触发错误提示。

- 目前，在 hybrid search 中，每个 `AnnSearchRequest` 只能包含一个查询向量。

## 常见问题{#faq}

- **Hybrid search 适用于哪些场景？**

    Hybrid search 适用于追求高精度的复杂场景，尤其是需要通过多维、多样的向量来表示单个 entity 的场景。这包括将同一数据（如一句话）通过不同 embedding 模型处理，或是将多模态信息（如个人图像、指纹和声纹）转换为多种向量格式的情况。通过为这些向量分配权重，它们的综合影响能够显著提升召回效果，增强搜索结果的有效性，为用户提供更全面、更精准的搜索体验。

- **加权排序器（weighted reranker）如何确保不同向量字段间的距离归一化？**

    加权排序器（weighted reranker）通过为每个向量字段分配特定权重，来实现距离归一化。它根据每个字段的权重计算其相对重要性，优先考虑权重较高的字段，确保权重更高的向量字段对整体排名产生更大影响。为了保持一致性，建议在所有 ANN search 请求中使用相同的度量类型，以确保排序的公正性和准确性。

- **是否支持使用 Cohere Ranker 或 BGE Ranker 等其他 reranker？**

    目前，hybrid search 仅支持系统提供的 reranker。我们正计划在未来的更新中加入额外的 reranker，以满足更多样化的排序需求。

- **是否支持同时执行多个 hybrid search 操作？**

    是的，系统支持同时进行多个 hybrid search 操作，为用户提供高效、灵活的搜索体验。

- **是否可以在多个 AnnSearchRequest 对象中使用相同的向量字段进行 hybrid search？**

    理论上，您可以在多个 `AnnSearchRequest` 对象中使用相同的向量字段进行 hybrid search。尽管进行 hybrid search 并不一定需要多个向量字段，但这一灵活性为用户提供了更多的操作空间，以适应不同的搜索策略和需求。

