---
title: "hybrid_search() | Python | ORM"
slug: /python/python/Collection-hybrid_search
sidebar_label: "hybrid_search()"
beta: NEAR DEPRECATE
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作在集合上执行多向量搜索，并在重新排序后返回搜索结果。| Python | ORM"
type: docx
token: QqOSdTDaLoOKGRxiKEtcuuiAnrf
sidebar_position: 17
keywords: 
  - milvus vector db
  - Zilliz Cloud
  - 什么是 milvus
  - milvus database
  - zilliz
  - zilliz cloud
  - cloud
  - hybrid_search()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# hybrid_search()

此操作在集合上执行多向量搜索，并在重新排序后返回搜索结果。

## 请求语法\{#request-syntax}

```python
hybrid_search(
    reqs: List,
    rerank: BaseRanker,
    limit: int,
    partition_names: Optional[List[str]] = None,
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    round_decimal: int = -1,
)
```

**参数：**

- **reqs** (*List[AnnSearchRequest]*) -

    搜索请求列表，其中每个请求都是一个 **ANNSearchRequest** 对象。每个请求对应不同的向量字段和不同的搜索参数集。

    - **ANNSearchRequest**：表示 ANN 搜索请求的类。

        ```python
        ├── AnnSearchRequest
        │   └── data  
        │   └── anns_field
        │   └── param 
        │   └── limit 
        │   └── expr
        ```

        - **data** (*List*)：请求中用于搜索的查询向量。此参数接受包含一个元素的列表。

        - **anns_field** (*str*)：请求中要使用的向量字段。

        - **param** (*dict*)：请求的搜索参数字典。有关详细信息，请参阅[搜索参数](https://milvus.io/docs/single-vector-search#search-parameters)。

        - **limit** (*int*)：请求中要返回的最大结果数。使用多个 ANN 搜索请求执行混合搜索时，每个请求中由 **limit** 定义的排名靠前的结果会在返回最终搜索结果之前被合并并重新排序。

        - **expr** (*str*)：（可选）用于过滤结果的表达式。

- **rerank** (*BaseRanker*) -

    用于混合搜索的重新排序策略。有效值：`WeightedRanker` 和 `RRFRanker`。

    - `WeightedRanker`：Average Weighted Scoring 重新排序策略，该策略根据相关性优先排序向量，并对其重要性进行平均。

    - `RRFRanker`：RRF 重新排序策略，该策略合并来自多个搜索的结果，优先考虑持续出现的条目。

- **limit** (*int*) -

    要返回的实体总数。

    你可以将此参数与 **param** 中的 `offset` 结合使用以启用分页。

    此值与 **param** 中 `offset` 的总和应小于 16,384。

- **partition_names** (*List[str]*) -

    分区名称列表。

    该值默认为 **None**。如果指定，则只有指定的分区会参与查询。

- **output_fields** (*List[str]*) -

    返回结果中每个实体要包含的字段名称列表。

    该值默认为 **None**。如果未指定，则仅包含主字段。

- **timeout** (*float*) -

    此操作的超时时长。将其设置为 **None** 表示当任何响应到达或发生任何错误时，此操作超时。

- **round_decimal** (int) -

    Milvus 将计算出的距离四舍五入到的小数位数。

    该值默认为 **-1**，表示 Milvus 跳过对计算距离的四舍五入并返回原始值。

- **group_by_field** (*str*)

    按指定字段对搜索结果进行分组，以确保多样性并避免返回来自同一组的多个结果。有关详细信息，请参阅[分组搜索](https://milvus.io/docs/grouping-search.md#Grouping-Search)。

- **group_size** (*int*)

    分组搜索中每个组内要返回的目标实体数。有关详细信息，请参阅[分组搜索](https://milvus.io/docs/grouping-search.md#Grouping-Search)。

- **strict_group_size** (*bool*)

    控制是否应严格执行 **group_size**。有关详细信息，请参阅[分组搜索](https://milvus.io/docs/grouping-search.md#Grouping-Search)。

**返回类型：**

*SearchResult*

**返回：**

一个包含 **Hits** 对象列表的 **SearchResult** 对象。

- 响应结构

    <Admonition type="info" icon="📘" title="Notes">

    **SearchResult** 对象包含 **Hits** 对象列表，每个对象对应搜索请求中的一个查询向量。
    
    **Hits** 对象包含 **Hit** 对象列表，每个对象对应一个被搜索命中的实体。

    </Admonition>

    ```plaintext
    ├── SearchResult
    │   └── Hits  
    │       ├── ids
    │       ├── distances
    │       └── Hit
    │           ├── id
    │           ├── distance
    │           ├── score
    │           ├── vector
    │           └── get()
    ```

- 属性和方法

    - **Hits** 对象具有以下字段：

        - **ids** (*list[int]* | *list[str]*)

            包含命中实体 ID 的列表。

        - **distances** (list[float]) 

            从命中实体的向量字段到查询向量的距离列表。

    - **Hit** 对象具有以下字段：

        - **id** (*int* | *str*)

            命中实体的 ID。

        - **distance** (*float*)

            从命中实体的向量字段到查询向量的距离。

        - **score** (*float*)

            **distance** 的别名。

        - **vector** (*list[float]*)   

            命中实体的向量字段。

        - **get(*field_name: str*)**

            用于获取命中实体中指定字段值的函数。

**异常：**

- **MilvusException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
collection = Collection(name='{your_collection_name}') # Replace with the actual name of your collection

res = collection.hybrid_search(
    reqs=[
        AnnSearchRequest(
            data=[['{your_text_query_vector}']],  # Replace with your text vector data
            anns_field='{text_vector_field_name}',  # Textual data vector field
            param={"metric_type": "IP", "params": {"nprobe": 10}}, # Search parameters
            limit=2
        ),
        AnnSearchRequest(
            data=[['{your_image_query_vector}']],  # Replace with your image vector data
            anns_field='{image_vector_field_name}',  # Image data vector field
            param={"metric_type": "IP", "params": {"nprobe": 10}}, # Search parameters
            limit=2
        )
    ],
    # Use WeightedRanker to combine results with specified weights
    rerank=WeightedRanker(0.8, 0.2), # Assign weights of 0.8 to text search and 0.2 to image search
    # Alternatively, use RRFRanker for reciprocal rank fusion reranking
    # rerank=RRFRanker(),
    limit=2
)
```
