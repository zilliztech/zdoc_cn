---
title: "hybrid_search() | Python | MilvusClient"
slug: /python/python/Vector-hybrid_search
sidebar_label: "hybrid_search()"
beta: false
added_since: v2.5.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "更新嵌入的 AnnSearchRequest 参数文档和示例。异步变体共享同步参数约定。将 filter 记录为 expr 的别名，并记录互斥验证。内联记录只读 filter 属性；其访问方式为 request.filter，而不是 request.filter()。 | Python | MilvusClient"
type: docx
token: Iv1PdIVxYoDOMax47xDcLnbEnXb
sidebar_position: 9
keywords: 
  - HNSW
  - 什么是非结构化数据
  - Vector embeddings
  - Vector store
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

更新嵌入的 AnnSearchRequest 参数文档和示例。异步变体共享同步参数约定。将 filter 记录为 expr 的别名，并记录互斥验证。内联记录只读 filter 属性；其访问方式为 request.filter，而不是 request.filter()。

<Admonition type="info" icon="📘" title="Notes">

此方法仅适用于 dedicated serving clusters 和 on-demand compute。 

- 对于 serving cluster 的 collection 中的此操作，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于 on-demand compute 的 collection 中的此操作，请使用 project endpoints 创建 **[MilvusClient](./Client-MilvusClient)**，然后创建一个 session 以附加到 on-demand cluster 进行搜索。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
hybrid_search(
    collection_name: str,
    reqs: List[AnnSearchRequest],
    ranker: Union[BaseRanker, Function],
    limit: int = 10,
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    partition_names: Optional[List[str]] = None,
    **kwargs,
) -> SearchResult
```

**参数：**

- **collection_name** (*str*) -
**[必需]**
要搜索的 collection 名称。

- **reqs** (*List[AnnSearchRequest]*) -
**[必需]**
由 hybrid search 组合的 ANN 搜索请求。使用 `AnnSearchRequest(data, anns_field, param, limit, expr=None, expr_params=None, filter=None)` 构造每个请求。

    - **data** (*Union[List, SparseMatrixInputType]*) -
**[必需]**
用于此 ANN 搜索请求的查询 vector 或稀疏矩阵。

    - **anns_field** (*str*) -
**[必需]**
要搜索的 vector 字段名称。

    - **param** (*Dict*) -
**[必需]**
ANN 搜索参数，例如 metric type 和搜索特定设置。

    - **limit** (*int*) -
**[必需]**
此 ANN 搜索请求返回的最大匹配数。

    - **expr** (*Optional[str]*) -
默认值：`None`
在 ANN 搜索之前应用的布尔过滤表达式。不要同时提供 `expr` 和 `filter`。

    - **expr_params** (*Optional[dict]*) -
默认值：`None`
替换到表达式模板占位符中的值。

    - **filter** (*Optional[str]*) -
默认值：`None`
`expr` 的别名。不要同时提供这两个值。解析后的表达式可通过只读 `filter` 属性以 `request.filter` 的形式访问。

- **ranker** (*Union[BaseRanker, Function]*) -
**[必需]**
用于组合搜索请求结果并对其排序的 ranker。

- **limit** (*int*) -
默认值：`10`
要返回的最大记录数，也称为 `topk`。

- **output_fields** (*Optional[List[str]]*) -
默认值：`None`
要包含在每个搜索结果中的 scalar 字段。

- **timeout** (*Optional[float]*) -
默认值：`None`
等待 RPC 的最长时间（以秒为单位）。省略时，客户端会等待直到服务器响应或发生错误。

- **partition_names** (*Optional[List[str]]*) -
默认值：`None`
要搜索的 partition 名称。

- **kwargs** (*Any*) -
其他搜索选项，包括分页偏移量和一致性级别。

**返回类型：**

*SearchResult*

**返回：**

应用每个请求的表达式或 filter 后，组合 ANN 请求的搜索结果。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请检查服务器错误消息以获取确切的失败详细信息。

## 示例\{#examples}

该示例构造一个 ANN 请求并运行 hybrid search。

```python
from pymilvus import AnnSearchRequest, MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")
request = AnnSearchRequest(
    data=[[0.1, 0.2, 0.3]],
    anns_field="vector",
    param={"metric_type": "COSINE"},
    limit=10,
    filter='category == "paper"',
)
results = client.hybrid_search(
    collection_name="book_chunks",
    reqs=[request],
    ranker=None,
    limit=10,
)
print(request.filter)
print(results)
```
