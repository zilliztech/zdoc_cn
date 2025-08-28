---
title: "稀疏向量 | Cloud"
slug: /use-sparse-vector
sidebar_label: "稀疏向量"
beta: FALSE
notebook: FALSE
description: "稀疏向量（Sparse Vector）是信息检索和自然语言处理中的一种重要数据表示方法。虽然稠密向量（Dense Vector）因其出色的语义理解能力而广受欢迎，但在需要精确匹配关键词或短语的应用中，稀疏向量往往能够提供更为准确的结果。 | Cloud"
type: origin
token: EoJuwLBJEiIeoUktXbRcDXlFnxi
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 向量字段
  - vector field
  - sparse vector
  - 稀疏向量

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 稀疏向量

稀疏向量（Sparse Vector）是信息检索和自然语言处理中的一种重要数据表示方法。虽然[稠密向量](./use-dense-vector)（Dense Vector）因其出色的语义理解能力而广受欢迎，但在需要精确匹配关键词或短语的应用中，稀疏向量往往能够提供更为准确的结果。

## 概述{#overview}

稀疏向量是一种高维向量的特殊表示方法，其大多数元素为零，只有少数维度上有非零值。如下图所示，稠密向量通常以连续数组的形式表示，每个位置都有一个值（如 `[0.3, 0.8, 0.2, 0.3, 0.1]`）。相比之下，稀疏向量仅存储非零元素及其索引位置，通常表示为键值对列表（如 `[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]`）。

![XSFJwXDGGhJGoob8UaMcvpCrnOb](/img/XSFJwXDGGhJGoob8UaMcvpCrnOb.png)

这种表示方法大大减少了存储空间，并提高了计算效率，特别是在处理超高维度（如 10000 维）的数据时。这种特性使得稀疏向量在处理大规模、高维度但数据稀疏的场景中特别有效。常见的应用有:

- **文本分析**：将文档表示为词袋向量，每个维度对应一个词，只有文档中出现的词维度取非零值；

- **推荐系统**：User-Item 交互矩阵，每个维度表示用户对某个物品的评分，大多数用户只与少数物品交互；

- **图像处理**：局部特征表示，只描述图像中的关键点，生成高维稀疏向量。

稀疏向量可以通过多种方法生成，常见的包括文本处理中的 [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)（词频-逆文档频率）和 [BM25](https://en.wikipedia.org/wiki/Okapi_BM25) 算法，或一些支持从文本中学习稀疏向量表示的中立模型。此外，Zilliz Cloud 还支持使用 BM25 算法进行全文检索，自动化地将文本转换成对应的稀疏向量表示。

数据在向量化后，可以存储在 Zilliz Cloud 中进行管理和向量检索。下图展示了基本流程。

![AAIowWHINh4lYhbAmPlcJ5yQnUn](/img/AAIowWHINh4lYhbAmPlcJ5yQnUn.png)

<Admonition type="info" icon="📘" title="说明">

<p>除了稀疏向量，Zilliz Cloud 还支持稠密向量和 Binary 向量。稠密向量适用于捕捉深层次的语义关联，而 Binary 向量则在快速相似性比较和内容去重等场景中表现出色。有关更多信息，请参考<a href="./use-dense-vector">稠密向量</a>和 <a href="./use-binary-vector">Binary 向量</a>。</p>

</Admonition>

## 数据格式{#data-formats}

Zilliz Cloud 支持用以下任意格式表示稀疏向量：

- 稀疏矩阵（使用 scipy.sparse 类）

    ```python
    from scipy.sparse import csr_matrix
    
    row = [0, 0, 1, 2, 2, 2]
    col = [0, 2, 2, 0, 1, 2]
    data = [1, 2, 3, 4, 5, 6]
    sparse_matrix = csr_matrix((data, (row, col)), shape=(3, 3))
    
    sparse_vector = sparse_matrix.getrow(0)
    ```

- 字典列表（格式为 `{dimension_index: value, ...}`）

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
    <TabItem value='python'>

    ```python
    sparse_vector = [{1: 0.5, 100: 0.3, 500: 0.8, 1024: 0.2, 5000: 0.6}]
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    SortedMap<Long, Float> sparseVector = new TreeMap<>();
    sparseVector.put(1L, 0.5f);
    sparseVector.put(100L, 0.3f);
    sparseVector.put(500L, 0.8f);
    sparseVector.put(1024L, 0.2f);
    sparseVector.put(5000L, 0.6f);
    ```

    </TabItem>
    </Tabs>

- 元组迭代器列表（格式为 `[(dimension_index, value)]`）

    ```python
    sparse_vector = [[(1, 0.5), (100, 0.3), (500, 0.8), (1024, 0.2), (5000, 0.6)]]
    ```

## 定义 Collection Schema{#define-collection-schema}

在创建 Collection 之前，需要定义 Collection Schema。这包括添加字段和定义将文本转换成对应稀疏向量表示的派生方法。

### 添加字段{#add-fields}

要在 Zilliz Cloud 中使用稀疏向量，首先需要在创建 Collection 时定义用于存储稀疏向量的字段。这个过程包括：

1. 设置 `datatype` 为支持的稀疏向量数据类型，即 `SPARSE_FLOAT_VECTOR`。

1. 不需要指定维度。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=1000, enable_analyzer=True)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build());
        
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);
schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.VarChar)
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(100)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("sparse_vector")
        .dataType(DataType.SparseFloatVector)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .enableAnalyzer(true)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

const schema = [
  {
    name: "metadata",
    data_type: DataType.JSON,
  },
  {
    name: "pk",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "sparse_vector",
    data_type: DataType.SparseFloatVector,
  },
  {
    name: "text",
    data_type: "VarChar",
    enable_analyzer: true,
    enable_match: true,
    max_length: 1000,
  },
];

```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(true).
    WithIsPrimaryKey(true).
    WithMaxLength(100),
).WithField(entity.NewField().
    WithName("sparse_vector").
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName("text").
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(true).
    WithMaxLength(1000),
)
```

</TabItem>

<TabItem value='bash'>

```bash
export primaryField='{
    "fieldName": "pk",
    "dataType": "VarChar",
    "isPrimary": true,
    "elementTypeParams": {
        "max_length": 100
    }
}'

export vectorField='{
    "fieldName": "sparse_vector",
    "dataType": "SparseFloatVector"
}'

export textField='{
    "fieldName": "text",
    "dataType": "VarChar",
    "elementTypeParams": {
        "max_length": 1000,
        "enable_analyzer": true
    }
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField,
        $textField
    ]
}"
```

</TabItem>
</Tabs>

以上示例中，我们添加了三个名字段。它们分别为：

- `pk`: 该字段用于存放 VARCHAR 类型的主键，其值为最大长度不超过 100 字节的自动生成的文本。

- `sparse_vector`: 该字段用于存放 SPARSE_FLOAT_VECTOR 类型的向量字段，用于存储稀疏向量。

- `text`: 该字段用于存放 VARCHAR 类型的文本字符串，最大长度为 1000 字节。

### 添加派生方法{#add-functions}

<Admonition type="info" icon="📘" title="说明">

<p>该步骤仅当您希望在插入数据时由 Zilliz Cloud 根据指定文本字段的内容生成相关的稀疏向量字段的值时为必选步骤。如果您决定使用自己生成的向量数据，可以忽略该步骤。</p>

</Admonition>

为了使用 Zilliz Cloud 内置的由 BM25 驱动的全文检索能力，您还需要在 Schema 中定义用于根据指定文本字段的内容派生对应的稀疏向量的 `Function`。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import Function, FunctionType

bm25_function = Function(
    name="text_bm25_emb",
    input_field_names=["text"],
    output_field_names=["sparse"],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

import java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25_emb")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("sparse"))
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import FunctionType from "@zilliz/milvus2-sdk-node";

const functions = [
    {
      name: 'text_bm25_emb',
      description: 'bm25 function',
      type: FunctionType.BM25,
      input_field_names: ['text'],
      output_field_names: ['sparse'],
      params: {},
    },
]；
```

</TabItem>

<TabItem value='go'>

```go
import "github.com/milvus-io/milvus/client/v2/entity"

function := entity.NewFunction().
    WithName("text_bm25_emb").
    WithInputFields("text").
    WithOutputFields("sparse").
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
```

</TabItem>

<TabItem value='bash'>

```bash
export bm25Function='{
    "name": "text_bm25_emb",
    "type": "BM25",
    "inputFieldNames": ["text"],
    "outputFieldNames": ["sparse"],
    "params": {}
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField,
        $textField
    ],
    \"functions\": [$bm25Function]
}"
```

</TabItem>
</Tabs>

更多内容，可参考[全文搜索](./full-text-search)。

## 为稀疏向量创建索引{#set-index-params-for-vector-field}

为稀疏向量创建索引的过程和[稠密向量](./use-dense-vector)类似，但指定的索引类型（`index_type`），距离度量类型（`metric_type`），和索引参数（`params`）有所差别。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="sparse_vector",
    index_name="sparse_auto_index",
    index_type="AUTOINDEX",
    metric_type="BM25" # or "IP" for custom sparse vectors
)

```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();

indexes.add(IndexParam.builder()
        .fieldName("sparse_vector")
        .indexName("sparse_auto_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25) // Or IndexParam.MetricType.IP for custom sparse vectors
        .build());

```

</TabItem>

<TabItem value='javascript'>

```javascript

const indexParams = await client.createIndex({
    field_name: 'sparse_vector',
    metric_type: MetricType.BM25, // or MetricType.IP for custom sparse vectors
    index_name: 'sparse_auto_index',
    index_type: IndexType.AUTOINDEX,
});

```

</TabItem>

<TabItem value='go'>

```go
idx := index.NewSparseInvertedIndex(entity.BM25, 0.2) // or entity.IP for custom sparse vectors
indexOption := milvusclient.NewCreateIndexOption("my_collection", "sparse_vector", idx)
```

</TabItem>

<TabItem value='bash'>

```bash

export indexParams='[
        {
            "fieldName": "sparse_vector",
            "metricType": "BM25", # or "IP" for custom sparse vectors
            "indexName": "sparse_auto_index",
            "indexType": "AUTOINDEX"
        }
    ]'

```

</TabItem>
</Tabs>

上述示例使用索引类型为 `SPARSE_INVERTED_INDEX`，度量类型为 `BM25`。更多详细内容，可以参考如下内容：

- [相似度类型](./search-metrics-explained)：不同类型的字段支持的度量类型。

- [全文搜索](./full-text-search)：全文检索功能的详细教程。

## 创建 Collection{#create-collection}

稀疏向量和索引定义完成后，我们便可以创建包含稀疏向量的 Collection。以下示例通过 `create_collection` 方法创建了一个名为 `my_sparse_collection` 的 Collection。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT'
});

await client.createCollection({
    collection_name: 'my_collection',
    schema: schema,
    index_params: indexParams
});
```

</TabItem>

<TabItem value='go'>

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

## 插入稀疏向量{#insert-data}

在插入数据时，您需要为所有在 Schema 中字义的字段提供相应的值，除了那些自动生成的字段（如因开启 AutoID 为自动生成的主键等）。如果您使用内置的 BM25 功能自动生成稀疏向量字段，在插入数据时，也不需要提供该字段的取值。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data = [
    {
        "text": "information retrieval is a field of study.",
        # "sparse_vector": {1: 0.5, 100: 0.3, 500: 0.8} # Do NOT provide sparse vectors if using built-in BM25
    },
    {
        "text": "information retrieval focuses on finding relevant information in large datasets.",
        # "sparse_vector": {10: 0.1, 200: 0.7, 1000: 0.9} # Do NOT provide sparse vectors if using built-in BM25
    },
]

client.insert(
    collection_name="my_collection",
    data=data
)
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

Gson gson = new Gson();
List<JsonObject> rows = new ArrayList<>();

{
    JsonObject row = new JsonObject();
    row.addProperty("text", "information retrieval is a field of study.");
    SortedMap<Long, Float> sparse = new TreeMap<>();
    /* Do NOT provide sparse vectors if using the built-in BM25
    sparse.put(1L, 0.5f);
    sparse.put(100L, 0.3f);
    sparse.put(500L, 0.8f);
    row.add("sparse_vector", gson.toJsonTree(sparse));
    */
    rows.add(row);
}
{
    JsonObject row = new JsonObject();
    row.addProperty("text", "information retrieval focuses on finding relevant information in large datasets.");
    SortedMap<Long, Float> sparse = new TreeMap<>();
    /* Do NOT provide sparse vectors if using the built-in BM25
    sparse.put(10L, 0.1f);
    sparse.put(200L, 0.7f);
    sparse.put(1000L, 0.9f);
    row.add("sparse_vector", gson.toJsonTree(sparse));
    */
    rows.add(row);
}

InsertResp insertResp = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
    {
        text: 'information retrieval is a field of study.',
        // sparse_vector: {1: 0.5, 100: 0.3, 500: 0.8} // Do NOT provide sparse vectors if using built-in BM25
    },
    {
        text: 'information retrieval focuses on finding relevant information in large datasets.',
        // sparse_vector: {10: 0.1, 200: 0.7, 1000: 0.9} // Do NOT provide sparse vectors if using built-in BM25
    },
];

client.insert({
    collection_name: "my_collection",
    data: data
});
```

</TabItem>

<TabItem value='go'>

```go
texts := []string{
    "information retrieval is a field of study.",
    "information retrieval focuses on finding relevant information in large datasets.",
}
textColumn := entity.NewColumnVarChar("text", texts)

// Prepare sparse vectors (Do NOT provide sparse vectors if using the built-in BM25)
// sparseVectors := make([]entity.SparseEmbedding, 0, 2)
// sparseVector1, _ := entity.NewSliceSparseEmbedding([]uint32{1, 100, 500}, []float32{0.5, 0.3, 0.8})
// sparseVectors = append(sparseVectors, sparseVector1)
// sparseVector2, _ := entity.NewSliceSparseEmbedding([]uint32{10, 200, 1000}, []float32{0.1, 0.7, 0.9})
// sparseVectors = append(sparseVectors, sparseVector2)
// sparseVectorColumn := entity.NewColumnSparseVectors("sparse_vector", sparseVectors)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithColumns(
        textColumn,
        // sparseVectorColumn
    ))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"text": "information retrieval is a field of study.",
        {"text": "information retrieval focuses on finding relevant information in large datasets."       
    ],
    "collectionName": "my_collection"
}'
```

</TabItem>
</Tabs>

## 基于稀疏向量执行相似性搜索{#perform-similarity-search}

要基于稀疏向量进行相似性搜索，您需要先准备查询向量和搜索参数。如果您使用了内置的 BM25 功能，只需要在搜索请求中指定检索文本即可，无须再提供该文本对应的稀疏向量。

```python
search_params = {
    "params": {"drop_ratio_search": 0.2},
}

query_vector = [{1: 0.2, 50: 0.4, 1000: 0.7}]
```

以上示例中，`drop_ratio_search`是专用于稀疏向量的可选搜索参数，它允许在搜索过程中对查询向量中的小值进行微调。例如，如果 `{"drop_ratio_search": 0.2}`，在搜索过程中，查询向量中最小的 20% 的值将被忽略。

然后，通过 `search` 方法执行相似性搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Prepare search parameters
search_params = {
    "params": {"drop_ratio_search": 0.2},  # A tunable drop ratio parameter with a valid range between 0 and 1
}

# Query with text if search with the built-in BM25
query_data = ["What is information retrieval?"]

# Otherwise, query with the sparse vector
# query_data = [{1: 0.2, 50: 0.4, 1000: 0.7}]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;

// Prepare search parameters
Map<String,Object> searchParams = new HashMap<>();
searchParams.put("drop_ratio_search", 0.2);

// Query with text if search with the built-in BM25
EmbeddedText queryData = new EmbeddedText("What is information retrieval?");

// Otherwise, query with the sparse vector
// SortedMap<Long, Float> sparse = new TreeMap<>();
// sparse.put(1L, 0.2f);
// sparse.put(50L, 0.4f);
// sparse.put(1000L, 0.7f);
// SparseFloatVec queryData = new SparseFloatVec(sparse);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// Prepare search parameters
const searchParams = {drop_ratio_search: 0.2}

// Query with text if search with the built-in BM25
const queryData = ["What is information retrieval?"]

// Otherwise, query with the sparse vector
// const queryData = [{1: 0.2, 50: 0.4, 1000: 0.7}]
```

</TabItem>

<TabItem value='go'>

```go
// Prepare search parameters
annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam("drop_ratio_search", 0.2)

// Query with text if search with the built-in BM25
queryData := entity.Text({"What is information retrieval?"})

// Otherwise, query with the sparse vector
// queryData, _ := entity.NewSliceSparseEmbedding([]uint32{1, 50, 1000}, []float32{0.2, 0.4, 0.7})
```

</TabItem>

<TabItem value='bash'>

```bash
# Prepare search parameters
export queryData='["What is information retrieval?"]'

# Query with text if search with the built-in BM25
export searchParams='{"params":{"drop_ratio_search": 0.2}}'

# Otherwise, query with the sparse vector
# export queryData='[{1: 0.2, 50: 0.4, 1000: 0.7}]'
```

</TabItem>
</Tabs>

然后，就可以执行基于稀疏向量字段的相似性搜索了。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="my_collection",
    data=query_data,
    limit=3,
    output_fields=["pk"],
    search_params=search_params,
)

print(res)

# Output
# data: ["[{'id': '453718927992172266', 'distance': 0.6299999952316284, 'entity': {'pk': '453718927992172266'}}, {'id': '453718927992172265', 'distance': 0.10000000149011612, 'entity': {'pk': '453718927992172265'}}]"]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

SparseFloatVec queryVector = new SparseFloatVec(sparse);

SearchResp searchR = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryData))
        .annsField("sparse_vector")
        .searchParams(searchParams)
        .topK(3)
        .outputFields(Collections.singletonList("pk"))
        .build());
        
System.out.println(searchR.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={pk=457270974427187729}, score=0.63, id=457270974427187729), SearchResp.SearchResult(entity={pk=457270974427187728}, score=0.1, id=457270974427187728)]]
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.search({
    collection_name: 'my_collection',
    data: queryData,
    limit: 3,
    output_fields: ['pk'],
    params: searchParams
});
```

</TabItem>

<TabItem value='go'>

```go
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection",
    3, // limit
    []entity.Vector{queryData},
).WithANNSField("sparse_vector").
    WithOutputFields("pk").
    WithAnnParam(annSearchParams))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("Pks: ", resultSet.GetColumn("pk").FieldData().GetScalars())
}

// Results:
//   IDs:  string_data:{data:"457270974427187705"  data:"457270974427187704"}
//   Scores:  [0.63 0.1]
//   Pks:  string_data:{data:"457270974427187705"  data:"457270974427187704"}

```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": $queryData,
    "annsField": "sparse_vector",
    "limit": 3,
    "searchParams": $searchParams,
    "outputFields": ["pk"]
}'

## {"code":0,"cost":0,"data":[{"distance":0.63,"id":"453577185629572535","pk":"453577185629572535"},{"distance":0.1,"id":"453577185629572534","pk":"453577185629572534"}]}
```

</TabItem>
</Tabs>

有关更多搜索相关信息，请参考[基本 ANN Search](./single-vector-search)。