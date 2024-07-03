---
slug: /use-sparse-vector
beta: TRUE
notebook: FALSE
type: origin
token: Ry6jwMpU8iCJdLkj4bQcHEhInpd
sidebar_position: 20

---

import Admonition from '@theme/Admonition';


# 使用 Sparse Vector

稀疏向量 (sparse vector) 使用向量 embedding 来表示单词或短语，其中大部分元素为零，只有少数非零元素表示特定特征的存在。像 [SPLADEv2](https://arxiv.org/abs/2109.10086) 这样的 sparse vector 模型在域外知识搜索、关键词感知和可解释性方面优于 dense vector 模型。Sparse vector 在信息检索、自然语言处理和推荐系统中尤其有用，通过结合用于召回的 sparse vector 和用于排名的大语言模型，可以显著提高检索结果。

在 Milvus 和 Zilliz Cloud 中，sparse vector 的使用流程与 dense vector 类似。它包括创建一个带有 sparse vector 列的 collection、插入数据、创建索引以及进行相似性搜索和标量查询（query）。

在本教程中，您将了解到如何：

- 准备 sparse vector；

- 创建带有 sparse vector 字段的 collection；

- 插入带有 sparse vector 的 entity；

- 为 collection 创建索引，并对 sparse vector 执行 ANN search。

要了解 sparse vector 的实际应用，请参见 [hello_sparse](https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py)。

<Admonition type="info" icon="📘" title="说明">

<p></p>
<p></p>
<p>此功能目前仅适用于已升级到 Beta 版的 Zilliz Cloud 集群。</p>
<p></p>

</Admonition>

## 准备 sparse vector{#prepare-sparse-vector-embeddings}

要在 Zilliz Cloud 中高效利用 sparse vector，请按以下任一格式准备 sparse vector：

- **稀疏矩阵**：借助 [scipy.sparse](https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse) 模块，将您的 sparse vector 表示为稀疏矩阵。该方法适用于处理大规模、高维数据集。

- **字典列表**：按字典列表准备 sparse vector，其中每个字典的结构为 `{dimension_index: value, ...}`，键值对代表维度索引及其对应的非零值。

    示例：

    ```python
    {2: 0.33, 98: 0.72, ...}
    ```

- **元组列表**：与字典列表类似，但使用元组的可迭代对象 `[(dimension_index, value)]`，键值对代表维度索引及其对应的非零值。

    示例：

    ```python
    [(2, 0.33), (98, 0.72), ...]
    ```

以下示例代码将生成一个随机稀疏矩阵，为 10000 个 entity 准备 sparse vector，每个 entity 具有 10000 个维度，稀疏密度设定为 0.005。

```python
# Prepare entities with sparse vector representation
import numpy as np
import random

rng = np.random.default_rng()

num_entities, dim = 10000, 10000

# Generate random sparse rows with an average of 25 non-zero elements per row
entities = [
    {
        "scalar_field": rng.random(),
        # To represent a single sparse vector row, you can use:
        # - Any of the scipy.sparse sparse matrices class family with shape[0] == 1
        # - Dict[int, float]
        # - Iterable[Tuple[int, float]]
        "sparse_vector": {
            d: rng.random() for d in random.sample(range(dim), random.randint(20, 30))
        },
    }
    for _ in range(num_entities)
]

# print the first entity to check the representation
print(entities[0])

# Output:
# {
#     'scalar_field': 0.520821523849214,
#     'sparse_vector': {
#         5263: 0.2639375518635271,
#         3573: 0.34701499565746674,
#         9637: 0.30856525997853057,
#         4399: 0.19771651149001523,
#         6959: 0.31025067641541815,
#         1729: 0.8265339135915016,
#         1220: 0.15303302147479103,
#         7335: 0.9436728846033107,
#         6167: 0.19929870545596562,
#         5891: 0.8214617920371853,
#         2245: 0.7852255053773395,
#         2886: 0.8787982039149889,
#         8966: 0.9000606703940665,
#         4910: 0.3001170013981104,
#         17: 0.00875671667413136,
#         3279: 0.7003425473001098,
#         2622: 0.7571360018373428,
#         4962: 0.3901879090102064,
#         4698: 0.22589525720196246,
#         3290: 0.5510228492587324,
#         6185: 0.4508413201390492
#     }
# }
```

<Admonition type="info" icon="📘" title="说明">

<p>向量维度必须是 Python <code>int</code> 或 <code>numpy.integer</code> 类型，值必须是 Python <code>float</code> 或 <code>numpy.floating</code> 类型。</p>

</Admonition>

## 创建带有 sparse vector 的 collection{#create-a-collection-with-a-sparse-vector-field}

要在 Zilliz Cloud 中创建带有 sparse vector 的 collection，将 sparse vector 字段的数据类型设置为 `DataType.SPARSE_FLOAT_VECTOR`。与dense vector 不同，sparse vector 无需指定向量维度（`dim`）。

```python
CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT" # Set your cluster endpoint
TOKEN="YOUR_CLUSTER_TOKEN" # Set your token

from pymilvus import MilvusClient, DataType

# Create a MilvusClient instance
client = MilvusClient(uri=CLUSTER_ENDPOINT, token=API_KEY)

# Create a collection with a sparse vector field
schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="scalar_field", datatype=DataType.DOUBLE)
# For sparse vector, no need to specify dimension
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)

client.create_collection(collection_name="test_sparse_vector", schema=schema)
```

有关更多参数信息， 请参考 [create_collection()](/reference/python/python/Collections-create_collection).

## 插入带有 sparse vector 的 entity{#insert-entities-with-sparse-vector-embeddings}

要插入带有 sparse vector 的 entity，只需调用 [insert()](/reference/python/python/Vector-insert) 方法。

```python
# Insert entities
client.insert(collection_name="test_sparse_vector", data=entities)
```

## 为 collection 创建索引{#index-the-collection}

在执行相似性搜索之前，为 collection 创建索引。有关索引类型和参数的更多信息，请参见 [add_index()](/reference/python/python/Management-add_index) and [create_index()](/reference/python/python/Management-create_index)。

```python
# Index the collection# Prepare index params
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="sparse_vector",
    index_name="sparse_inverted_index",
    index_type="AUTOINDEX",
    metric_type="IP", # the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.
    params={"drop_ratio_build": 0.2}, # the ratio of small vector values to be dropped during indexing.
)

# Create index
client.create_index(collection_name="test_sparse_vector", index_params=index_params)
```

构建索引时，请注意以下几点：

- `index_type`：要构建的索引类型。`AUTOINDEX` 选项可以让您免于调整和微调索引参数。有关更多关于 `AUTOINDEX` 的信息，请参考[AUTOINDEX](./autoindex-explained)。

- `metric_type`：对于 sparse vector，只支持 `IP`（内积）距离度量。

- `params.drop_ratio_build`：sparse vector 特定的索引参数，用于控制在索引构建过程中排除掉的较小向量值的比例。通过在构建索引时忽略较小的值，可以在效率和准确性之间达到平衡。例如，如果 `drop_ratio_build = 0.3`，在索引构建过程中，系统会收集和排序所有 sparse vector 的值，并且最小的 30% 值将不会包括在索引中，从而减少搜索期间的计算开销。

## 执行 ANN search{#perform-ann-search}

在 collection 索引和加载到内存中后，使用 [search()](/reference/python/python/Vector-search) 方法检索相关文档。

```python
# Load the collection into memory
client.load_collection(collection_name="test_sparse_vector")

# Perform ANN search on sparse vectors

# for demo purpose we search for the last inserted vector
query_vector = entities[-1]["sparse_vector"]

search_params = {
    "metric_type": "IP",
    "params": {"drop_ratio_search": 0.2}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name="test_sparse_vector",
    data=[query_vector],
    limit=3,
    output_fields=["pk", "scalar_field"],
    search_params=search_params,
)

for hits in search_res:
    for hit in hits:
        print(f"hit: {hit}")
        
# Output:
# hit: {'id': '450273575275875686', 'distance': 7.750614643096924, 'entity': {'pk': '450273575275875686', 'scalar_field': 0.4480435927174723}}
# hit: {'id': '450273575275870571', 'distance': 1.1165071725845337, 'entity': {'pk': '450273575275870571', 'scalar_field': 0.4279938814482982}}
# hit: {'id': '450273575275870064', 'distance': 0.9200878739356995, 'entity': {'pk': '450273575275870064', 'scalar_field': 0.4212978190243173}}
```

配置搜索参数时，请注意：

- `params.drop_ratio_search`：sparse vector 特定的 search 参数。此选项允许通过指定查询向量中要忽略的最小值的比例来微调搜索过程。它有助于平衡搜索精度和性能。`drop_ratio_search` 设置的值越小，这些小值对最终得分的贡献就越小。通过忽略一些小值，可以在对准确性影响最小的情况下提高搜索性能。

## 执行标量查询（scalar query）{#perform-scalar-queries}

除了 ANN 搜索之外，Zilliz Cloud 还支持对 sparse vector 进行标量查询。标量查询允许您根据与 sparse vector 相关的标量值检索文档。有关参数的更多信息，请参见 [query()](https://docs.zilliz.com/reference/python/python/Vector-query)。

过滤 `scalar_field` 大于 0.999 的 entity：

```python
# Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name="test_sparse_vector",
    filter="scalar_field > 0.999",
)

print(filter_query_res[:2])

# Output:
# [{'pk': '450273575275867462', 'scalar_field': 0.999706489772776, 'sparse_vector': {651: 0.6896481513977051, 884: 0.037571314722299576, 1930: 0.11125790327787399, 2013: 0.9335554242134094, 2128: 0.10234206169843674, 2271: 0.17880432307720184, 2642: 0.7378848791122437, 3080: 0.3128625154495239, 4322: 0.18627822399139404, 4891: 0.24622178077697754, 4956: 0.5002409815788269, 5022: 0.008009751327335835, 5428: 0.7347196936607361, 5852: 0.5609562993049622, 6408: 0.6986650228500366, 6605: 0.5112012028694153, 6625: 0.09636110812425613, 6650: 0.18540434539318085, 7512: 0.969779908657074, 8328: 0.46709105372428894, 8822: 0.1417122334241867, 9142: 0.7508372068405151}}, {'pk': '450273575275867634', 'scalar_field': 0.9992726390858346, 'sparse_vector': {553: 0.3291417956352234, 922: 0.6224955916404724, 1266: 0.2872304320335388, 2287: 0.34055230021476746, 2668: 0.28824421763420105, 3759: 0.7466465830802917, 4037: 0.4526124596595764, 4237: 0.5066826939582825, 5285: 0.8228104114532471, 5509: 0.11998588591814041, 5733: 0.12240607291460037, 5765: 0.4611184298992157, 6236: 0.8464925289154053, 7400: 0.6218372583389282, 7533: 0.8130961656570435, 7775: 0.04926314577460289, 7905: 0.9843814969062805, 8389: 0.0985478013753891, 8689: 0.6625003218650818, 8889: 0.14608529210090637, 8951: 0.5812358260154724, 9457: 0.36155056953430176}}]
```

按主键值过滤 entity：

```python
# primary keys of entities that satisfy the filter
pks = [ret["pk"] for ret in filter_query_res]

# Perform a query by primary key
pk_query_res = client.query(
    collection_name="test_sparse_vector", filter=f"pk == '{pks[0]}'"
)

print(pk_query_res)

# Output:
# data: ["{'scalar_field': 0.999706489772776, 'sparse_vector': {651: 0.6896481513977051, 884: 0.037571314722299576, 1930: 0.11125790327787399, 2013: 0.9335554242134094, 2128: 0.10234206169843674, 2271: 0.17880432307720184, 2642: 0.7378848791122437, 3080: 0.3128625154495239, 4322: 0.18627822399139404, 4891: 0.24622178077697754, 4956: 0.5002409815788269, 5022: 0.008009751327335835, 5428: 0.7347196936607361, 5852: 0.5609562993049622, 6408: 0.6986650228500366, 6605: 0.5112012028694153, 6625: 0.09636110812425613, 6650: 0.18540434539318085, 7512: 0.969779908657074, 8328: 0.46709105372428894, 8822: 0.1417122334241867, 9142: 0.7508372068405151}, 'pk': '450273575275867462'}"] , extra_info: {'cost': 6}
```

## 使用限制{#limits}

使用 sparse vector 时，请考虑以下限制：

- 目前，sparse vector 仅支持 `IP` 距离度量。

- 目前，sparse vector 不支持 [range search](./single-vector-search#range-search)、[grouping search](./single-vector-search#grouping-search) 和 [search iterator](./with-iterators#search-with-iterator)。

## 常见问题{#faq}

- **Sparse vector 支持哪些距离度量？** 

    由于 sparse vector 的高维特性，不支持 L2 和 COSINE 距离，仅支持 `IP` (内积) 距离度量。

- **如何选择 `drop_ratio_build` 和 `drop_ratio_search` 参数？**

    `drop_ratio_build` 和 `drop_ratio_search` 的选择取决于您的数据特性以及您对搜索延迟/吞吐量和准确性的要求。

- **Sparse embedding 支持哪些数据类型？** 

    维度部分必须是 unsigned 的 32 位整数，值部分可以是非负的 32 位浮点数。

- **Sparse embedding 的维度可以是 uint32 空间内的任何离散值吗？**

    是的，但有一个例外。Sparse embedding 的维度可以是 `[0, maximum of uint32)` 范围内的任何值，这意味着不能使用 uint32 的最大值。

- **是否可以在一个 collection 中同时添加 sparse vector 和 dense vector 字段？** 

    可以，借助多向量类型支持，您可以创建同时包含 sparse vector 和 dense vector 列的 collection 并对其进行 hybrid search。

- **对于要插入或搜索的 sparse embedding，具体要满足哪些要求？** 

    Sparse embedding 必须至少有一个非零值，并且向量索引必须为非负。