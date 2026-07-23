---
title: "search() | Node.js"
slug: /node/node/Vector-search
sidebar_label: "search()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作执行向量相似度搜索，并可选使用标量过滤表达式。| Node.js"
type: docx
token: HYv3d0NiRoc09Bx4rz0cIhqknb5
sidebar_position: 7
keywords: 
  - 多模态 RAG
  - LLM 幻觉
  - hybrid search
  - lexical search
  - zilliz
  - Zilliz Cloud
  - cloud
  - search()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# search()

此操作执行向量相似度搜索，并可选使用标量过滤表达式。

```javascript
await milvusClient.search(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.search({
  db_name?: string,
  collection_name: string,
  partition_names?: string[];
  anns_field?: string; 
  data?: SearchDataType;
  output_fields?: string[];
  limit?: number;
  offset?: number;
  filter?: string;
  exprValues?: keyValueObj;
  params?: keyValueObj;
  consistency_level?: ConsistencyLevelEnum;
  ignore_growing?: boolean;
  group_by_field?: string;
  group_size?: number;
  strict_group_size?: boolean;
  hints?: string;
  round_decimal?: number;
  transformers?: OutputTransformers;
  rerank?: RankerObj | FunctionObject | FunctionScore;
})
```

**参数：**

- **db_name** (*string*) -

    目标 collection 所属的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    要搜索的 collection 名称

- **partition_names** (*string[]*) -

    要搜索的 partition 名称列表。

- **anns_field** (*string*) -

    此操作的目标向量字段名称。如果你在包含多个向量字段的 collection 中进行搜索，则此参数是必需的。

- **data** (*number[]* | *number[][]*) -

    向量嵌入列表。

    Zilliz Cloud 会搜索与指定向量嵌入最相似的向量嵌入。

- **output_fields** (*string[]*) -

    要包含在返回的每个实体中的字段名称列表。

    该值默认为 **None**。如果未指定，则仅包含主字段。

- **limit** (*number*) - 

    要返回的实体总数。

    你可以将此参数与 **param** 中的 **offset** 结合使用，以启用分页。

    此值与 **param** 中 **offset** 的总和应小于 16,384。 

    但是，在分组搜索中，`limit` 指定的是要返回的最大分组数，而不是单个实体数。每个分组都基于指定的 `group_by_field` 形成。

- **offset** (*number*) - 

    在搜索结果中要跳过的记录数。 

    你可以将此参数与 `limit` 结合使用，以启用分页。

    此值与 `limit` 的总和应小于 16,384。 

- **filter** (*string*) -

    用于过滤匹配实体的标量过滤条件。 

    该值默认为空字符串，表示不应用任何条件。

    你可以将此参数设置为空字符串以跳过标量过滤。要构建标量过滤条件，请参阅 [Boolean Expression Rules](https://milvus.io/docs/boolean.md)。 

- **exprValues** (*keyValueObj*) -

    如果你选择在 `filter` 中使用 [Filtering Templating](/docs/filtering-templating) 中所述的占位符，则可以将这些占位符的实际值以键值对形式指定为此参数的值。

- **params** (*KeyValueObj*) -

    以键值对形式提供的其他搜索参数。

    - **radius** (*number*) -

        确定最低相似度的阈值。当将 `metric_type` 设置为 `L2` 时，请确保此值大于 **range_filter** 的值。否则，此值应小于 **range_filter** 的值。 

    - **range_filter**  (*number*) -  

        将搜索细化到特定相似度范围内的向量。当将 `metric_type` 设置为 `IP` 或 `COSINE` 时，请确保此值大于 **radius** 的值。否则，此值应小于 **radius** 的值。

    - **level** (*number*)

        Zilliz Cloud 使用统一参数来简化搜索参数调优，而不是让你处理各种索引算法所特有的一系列搜索参数。

        该值默认为 **1**，范围为 **1** 到 **5**。增大该值会提高召回率，但会降低搜索性能。

    - **page_retain_order** (*bool*) -

        当提供 `offset` 时，是否保留搜索结果的顺序。 

        此参数仅在你同时设置 `radius` 时适用。

- **consistency_level** (*ConsistencyLevelEnum*) -

    目标 collection 的一致性级别。该值默认为 **Bounded** (**1**)，可选项包括 **Strong** (**0**)、**Bounded** (**1**)、**Session** (**2**) 和 **Eventually** (**3**)。

- **ignore_growing** (*boolean*) -

    一个布尔值，表示是否跳过 growing segment 中的搜索。

- **group_by_field** (*string*) -

    按指定字段对搜索结果进行分组，以确保多样性并避免返回来自同一分组的多个结果。

- **group_size** (*number*) -

    分组搜索中每个分组内要返回的目标实体数。例如，设置 `group_size=2` 会指示系统在每个分组内最多返回 2 个最相似的实体（例如文档段落或向量表示）。如果未设置 `group_size`，系统默认每个分组仅返回 1 个实体。

- **strict_group_size** (*boolean*) -

    此布尔参数指示是否应严格执行 `group_size`。当 `group_size=true` 时，只要每个分组内存在足够的数据，系统就会尝试为每个分组填充恰好 `group_size` 个结果。如果某个分组中的实体数量不足，则仅返回可用实体，同时确保具有足够数据的分组满足指定的 `group_size`。

- **hints** (*string*) -

    用于提升搜索性能的 hints 字符串。

- **round_decimal** (*number*) -

    最终结果中保留的小数位数。

- **transformers** (*OutputTransformers*) -

    用于转换以下数据类型数据的自定义函数：

    - BFloat16Vector (`(bf16bytes: Uint8Array) => BFloat16Vector;`)

    - Float16Vector (`(f16: Uint8Array) => Float16Vector;`)

    - SparseFloatVector (`(sparse: SparseVectorDic) => SparseFloatVector;`)

- **rerank** (*RerankerObj* | *FunctionObject \ FunctionScore*) -

    带有自定义参数的重排策略。你可以使用 **RerankerObj**、**FunctionObject** 或 **FunctionScore**。

    **RerankerObj** 包含以下参数：

    - **strategy** (*string*) -

        重排序策略。可能的值包括：

        - **RRF** ("rrf")

            当没有特定侧重点时，推荐使用此策略。RRF 可以有效平衡每个向量字段的重要性。

        - **WEIGHTED** ("weighted")

            如果你需要结果侧重于某个特定的向量字段，推荐使用此策略。WeightedRanker 允许你为某些向量字段分配更高权重，从而更强调它们。例如，在多模态搜索中，图像的文本描述可能被认为比该图像中的颜色更重要。

    - **params** (*keyValueObj*) -

        这些参数特定于重排策略。

        - 使用 RRFRanker 策略时，你需要将参数值 `k` 输入到 RRFRanker 中。`k` 的默认值为 60。此参数有助于确定如何组合不同 ANN 搜索的排名，旨在平衡并融合所有搜索的重要性。

        - 使用 WeightedRanker 策略时，你需要将权重值输入到 `WeightedRanker` 函数中。混合搜索中基本 ANN 搜索的数量对应需要输入的值的数量。输入值应在 [0,1] 范围内，值越接近 1 表示重要性越高。

    **FunctionObject** 具有以下结构。

    - **name** (*string*)

        函数名称。此标识符用于在查询和 collection 中引用该函数。

    - **description** (*string*)

        对函数用途的简要描述。这可用于文档说明，或在较大型项目中提升清晰度，默认值为空字符串。

    - **type** (*[FunctionType](./Collections-FunctionType)*)

        用于处理原始数据的函数类型。此参数的可能值为 `FunctionType.RERANK`。

    - **input_field_names** (*string[]*)

        将此参数值保留为空数组。

    **FunctionScore** 具有以下结构。

    - **functions** (*FunctionObject[]*) -

        **FunctionObject** 对象列表。

    - **params** (*keyValueObj*) -  

        指定这些函数如何协同工作。其结构如下：

        - **boost_mode** (*string*) -

            指定所给权重如何影响任何匹配实体的得分。可能的值包括：

            - `Multiply`

                表示加权值等于匹配实体的原始得分乘以指定权重。

                这是默认值。

            - `Sum`

                表示加权值等于匹配实体的原始得分与指定权重之和

        - **function_mode** (*string*) -

            指定如何处理来自各个 Boost Ranker 的加权值。可能的值包括：

            - `Multiply`

                表示匹配实体的最终得分等于所有 Boost Ranker 加权值的乘积。

                这是默认值。

            - `Sum`

                表示匹配实体的最终得分等于所有 Boost Ranker 加权值之和。

- **order_by_fields** (*OrderByFields*) -

    用于对搜索结果排序的字段。可选。

**返回** *Promise&lt;SearchResults&lt;T&gt;&gt;*

此方法返回一个 promise，该 promise 解析为 **SearchResults&lt;T&gt;** 对象。

```typescript
{
    results: SearchResultData[] | SearchResultData[][],
    recalls: number[],
    session_ts: number,
    collection_name: string,
    all_search_count?: number,
    status:  ResStatus
}
```

**参数：**

- **results** (*SearchResultData[]* | *SearchResultData[][]*) -
为每个查询向量返回的命中结果。当提供单个查询向量时，这是一个扁平的 **SearchResultData[]**。当提供一批查询向量时，这是嵌套的 **SearchResultData[][]**，每个查询对应一个内部列表。

    - **id** (*string*) -

        匹配行的主键。

    - **score** (*number*) -

        相似度得分，根据配置的指标类型进行缩放。

    - **offset** (*number* | *string*) -

        此命中在其查询分组内从零开始的偏移量。

    - **group_by_field_values** (*Record&lt;string, FieldData&gt;*) -

        当提供了 **group_by_field** 时设置；携带该命中的分组字段值。

    - **highlight** (*HighlightResult*) -

        当请求中提供了 **highlighter** 时设置；携带匹配字段的高亮片段。

    - **&lt;output_field&gt;** (*FieldData*) -

        每个请求的 **output_fields** 条目都会作为命中结果上的一个键添加，携带来自匹配行的值。

- **recalls** (*number[]*) -
当搜索引擎生成召回分数时，表示每个查询的估计召回分数。

- **session_ts** (*number*) -
Milvus 用于评估搜索的会话时间戳。

- **collection_name** (*string*) -
执行搜索的 collection。

- **all_search_count** (*number*) -
可选。当搜索报告已检查的候选总数时设置。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const searchResults = await milvusClient.search({
   collection_name: 'my_collection',
   vector: [1, 2, 3, 4],
});
```

