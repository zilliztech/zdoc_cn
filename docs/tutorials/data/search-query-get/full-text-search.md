---
title: "Full Text Search | Cloud"
slug: /full-text-search
sidebar_label: "Full Text Search"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "在  Zilliz Cloud 中，Full Text Search 是对基于稠密向量](./use-dense-vector)的语义搜索的补充。它能够在大规模文本集合中查找包含特定术语或短语的文本，弥补语义搜索的遗漏，从而提升整体搜索效果。它支持直接插入和使用原始文本数据进行相似性搜索，Milvus 会自动将文本转换为[稀疏向量](./use-sparse-vector)表示。Full Text Search 使用 [BM25 算法进行相关性评分，根据查询文本返回最相关的文档，从而提高文本搜索的整体精度。 | Cloud"
type: origin
token: TO6fwkZ2jiT6FSkkgbCcyHTvn0d
sidebar_position: 9
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - query
  - 查询
  - 全文搜索
  - full-text search
  - sparse vector
  - derivative function
  - bm25

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Full Text Search

在  Zilliz Cloud 中，Full Text Search 是对基于[稠密向量](./use-dense-vector)的语义搜索的补充。它能够在大规模文本集合中查找包含特定术语或短语的文本，弥补语义搜索的遗漏，从而提升整体搜索效果。它支持直接插入和使用原始文本数据进行相似性搜索，Milvus 会自动将文本转换为[稀疏向量](./use-sparse-vector)表示。Full Text Search 使用 [BM25](https://en.wikipedia.org/wiki/Okapi_BM25) 算法进行相关性评分，根据查询文本返回最相关的文档，从而提高文本搜索的整体精度。

该功能适用于需要精准术语匹配的相关性搜索场景，如电商中检索产品序列号、客户支持中的工单跟踪，以及法律或医学数据库中的特定术语查找。

<Admonition type="info" icon="📘" title="说明">

<p>将 Full Text Search 与基于语义的稠密向量搜索结合使用，可以提升搜索结果的准确性和相关性。更多信息请参考 <a href="./hybrid-search">Hybrid Search</a>。</p>

</Admonition>

Zilliz Cloud 支持通过代码或通过 Web 控制台开启 Full Text Search 功能。本文着重介绍如何通过代码开启 Full Text Search，如需了解 Web 控制台操作，请参考[管理 Collection (控制台)](./manage-collections-console#full-text-search)。

## 概述\{#overview}

Full Text Search 简化了基于文本数据的搜索流程，无需您提前将数据转换为向量。其工作流程如下：

1. **文本输入**：直接插入原始文本文档或提供查询文本，无需手动生成向量。

1. **分词**：Milvus 使用分词器（Tokenizer）将输入文本分割成独立的、可搜索的词语。

1. **Function 处理**：内置 Function 接收分词结果并将其转换为稀疏向量表示。

1. **Collection 存储**：Milvus 将这些稀疏向量存储在 Collection 中，以便高效检索。

1. **BM25 评分**：在搜索过程中，Milvus 使用 BM25 算法计算文档得分，并根据查询文本的相关性对匹配结果进行排序。

![G4iFwPgJhhEpm5bvReYcmATWnAc](/img/G4iFwPgJhhEpm5bvReYcmATWnAc.png)

要使用 Full Text Search，主要有以下几个步骤：

1. **创建 Collection**：设置包含必要字段的 Collection，并定义一个将原始文本转换为稀疏向量的 Function。

1. **插入数据**：将原始文本文档导入 Collection。

1. **执行搜索**：使用查询文本搜索 Collection，并获取相关结果。

## 创建 Collection\{#create-a-collection-for-full-text-search}

要启用 Full Text Search，需要创建一个包含特定 Schema 的 Collection。Schema 必须包含以下三个关键字段：

- **主键字段**：用于唯一标识 Collection 中的每个 Entity。

- **VARCHAR 字段**：用于存储原始文本文档，并设置 `enable_analyzer=True` 以使 Milvus 能够对文本进行分词处理。

- **SPARSE_FLOAT_VECTOR 字段**：用于存储稀疏向量，Milvus 会自动为 `VARCHAR` 字段生成这些向量。

### 定义 Collection Schema\{#define-the-collection-schema}

首先，创建 Schema 并添加必要字段：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType, Function, FunctionType

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

schema = client.create_schema()

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True, auto_id=True) # Primary field
# highlight-start
schema.add_field(field_name="text", datatype=DataType.VARCHAR, max_length=1000, enable_analyzer=True) # Text field
schema.add_field(field_name="sparse", datatype=DataType.SPARSE_FLOAT_VECTOR) # Sparse vector field; no dim required for sparse vectors
# highlight-end
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .enableAnalyzer(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("sparse")
        .dataType(DataType.SparseFloatVector)
        .build());
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
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true).
    WithIsAutoID(true),
).WithField(entity.NewField().
    WithName("text").
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(true).
    WithMaxLength(1000),
).WithField(entity.NewField().
    WithName("sparse").
    WithDataType(entity.FieldTypeSparseVector),
)
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});
const schema = [
  {
    name: "id",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "text",
    data_type: "VarChar",
    enable_analyzer: true,
    enable_match: true,
    max_length: 1000,
  },
  {
    name: "sparse",
    data_type: DataType.SparseFloatVector,
  },
];

console.log(res.results)
```

</TabItem>

<TabItem value='bash'>

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "text",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000,
                    "enable_analyzer": true
                }
            },
            {
                "fieldName": "sparse",
                "dataType": "SparseFloatVector"
            }
        ]
    }'
```

</TabItem>
</Tabs>

在此配置中：

- `id`：作为主键，并通过 `auto_id=True` 自动生成。

- `text`：用于存储原始文本数据以进行 Full Text Search 操作。数据类型必须为 `VARCHAR`，因为这是 Zilliz Cloud 的文本存储类型。设置 `enable_analyzer=True` 以允许 Zilliz Cloud 对文本进行分词。

    默认情况下，Milvus 使用 `default` Analyzer 进行分词。对于中文文本，可以考虑使用内置的 [Chinese](./chinese-analyzer) Analyzer。也可以根据需要配置[多语言 Analyzer](./multi-language-analyzers)。

    在使用非默认的 Analyzer 时，需要在创建字段时指定 `analyzer_params` 参数。以此处的 `text` 为例，可以参考如下示例使用内置的 Chinese Analayzer。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
    <TabItem value='python'>

    ```python
    analyzer_params = {
        "tokenizer": "jieba",
        "filter": ["cnalphanumonly"]
    }
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    Map<String, Object> analyzerParams = new HashMap<>();
    analyzerParams.put("tokenizer", "jieba");
    analyzerParams.put("filter", Collections.singletonList("cnalphanumonly"));
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    const analyzer_params = {
        "tokenizer": "jieba",
        "filter": ["cnalphanumonly"]
    };
    ```

    </TabItem>

    <TabItem value='go'>

    ```go
    analyzerParams = map[string]any{"tokenizer": "jieba", "filter": []any{"cnalphanumonly"}}
    ```

    </TabItem>

    <TabItem value='bash'>

    ```bash
    # restful
    analyzerParams='{
      "tokenizer": "jieba",
      "filter": [
        "cnalphanumonly"
      ]
    }'
    
    ```

    </TabItem>
    </Tabs>

    并在 `text` 字段的 Schema 中引用。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
    <TabItem value='python'>

    ```python
    schema.add_field(
        field_name="text", 
        datatype=DataType.VARCHAR, 
        max_length=1000, 
        analyzer_params=analyzer_params,
        enable_analyzer=True
    )
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    schema.addField(AddFieldReq.builder()
            .fieldName("text")
            .dataType(DataType.VarChar)
            .maxLength(1000)
            .analyzerParams(analyzerParams)
            .enableAnalyzer(true)
            .build());
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    const schema = [
      {
          ...
      },
      {
        name: "text",
        data_type: "VarChar",
        analyzer_params: analyzer_params,
        enable_analyzer: true,
        enable_match: true,
        max_length: 1000,
      },
      {
        ...
      }
    ]
    ```

    </TabItem>

    <TabItem value='go'>

    ```go
    schema := entity.NewSchema()
    schema.WithField(
        ...,
    ).WithField(entity.NewField().
        WithName("text").
        WithDataType(entity.FieldTypeVarChar).
        WithEnableAnalyzer(true).
        WithMaxLength(1000),
    ).WithField(
        ...,
    )
    ```

    </TabItem>

    <TabItem value='bash'>

    ```bash
    textField='{
      "fieldName": "text",
      "dataType": "VarChar",
      "elementTypeParams": {
        "max_length": 1000,
        "analyzer_params": '$analyzerParams',
        "enable_analyzer": true
      }
    }'
    ```

    </TabItem>
    </Tabs>

    针对多语言混用的文本及 Analyzer 的最佳实践，可以参考[最佳实践：如何选择合适的 Analyzer](./choose-the-right-analyzer-for-your-use-case)。

- `sparse`：向量字段，用于存储 Milvus 为文本数据生成的稀疏向量表示。数据类型必须为 `SPARSE_FLOAT_VECTOR`。

然后，创建一个将文本转换为稀疏向量的 Function，并将其添加到 Schema 中：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
bm25_function = Function(
    name="text_bm25_emb", # Function name
    input_field_names=["text"], # Name of the VARCHAR field containing raw text data
    output_field_names=["sparse"], # Name of the SPARSE_FLOAT_VECTOR field reserved to store generated embeddings
    # highlight-next-line
    function_type=FunctionType.BM25, # Set to `BM25`
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

<TabItem value='go'>

```go
function := entity.NewFunction().
    WithName("text_bm25_emb").
    WithInputFields("text").
    WithOutputFields("sparse").
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
```

</TabItem>

<TabItem value='javascript'>

```javascript
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

<TabItem value='bash'>

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "text",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000,
                    "enable_analyzer": true
                }
            },
            {
                "fieldName": "sparse",
                "dataType": "SparseFloatVector"
            }
        ],
        "functions": [
            {
                "name": "text_bm25_emb",
                "type": "BM25",
                "inputFieldNames": ["text"],
                "outputFieldNames": ["sparse"],
                "params": {}
            }
        ]
    }'
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Function 的名称。该 Function 将 <code>text</code> 字段中的原始文本转换为可搜索的向量，存储在 <code>sparse</code> 字段中。</p></td>
   </tr>
   <tr>
     <td><p><code>input_field_names</code></p></td>
     <td><p>需要进行文本到稀疏向量转换的 <code>VARCHAR</code> 字段名称。</p></td>
   </tr>
   <tr>
     <td><p><code>output_field_names</code></p></td>
     <td><p>用于存储 Milvus 内部自动生成的稀疏向量的字段名称。</p></td>
   </tr>
   <tr>
     <td><p><code>function_type</code></p></td>
     <td><p>使用的 Function 类型。设置为 <code>FunctionType.BM25</code>。</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>对于包含多个需要进行文本到稀疏向量转换的 <code>VARCHAR</code> 字段的 Collection，请为 Schema 添加单独的 Function，并确保每个 Function 具有唯一的名称和 <code>output_field_names</code> 值。</p>

</Admonition>

### 配置索引参数\{#configure-the-index}

在定义包含必要字段和内置 Function 的 Schema 后，需要为 Collection 设置向量索引以加速查询。本例中使用 `AUTOINDEX` 作为 `index_type`，表示让 Zilliz Cloud 根据数据结构自动选择和配置最适合的索引类型。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="sparse",

    index_type="AUTOINDEX", 
    metric_type="BM25"

)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;

Map<String,Object> params = new HashMap<>();
params.put("inverted_index_algo", "DAAT_MAXSCORE");
params.put("bm25_k1", 1.2);
params.put("bm25_b", 0.75);

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("sparse")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(params)
        .build());    
```

</TabItem>

<TabItem value='go'>

```go
indexOption := milvusclient.NewCreateIndexOption("my_collection", "sparse",
    index.NewAutoIndex(entity.MetricType(entity.BM25)))
    .WithExtraParam("inverted_index_algo", "DAAT_MAXSCORE")
    .WithExtraParam("bm25_k1", 1.2)
    .WithExtraParam("bm25_b", 0.75)
```

</TabItem>

<TabItem value='javascript'>

```javascript
const index_params = [
  {
    field_name: "sparse",
    metric_type: "BM25",
    index_type: "SPARSE_INVERTED_INDEX",
    params: {
        "inverted_index_algo": "DAAT_MAXSCORE",
        "bm25_k1": 1.2,
        "bm25_b": 0.75
    }
  },
];
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "sparse",
            "metricType": "BM25",
            "indexType": "AUTOINDEX",
            "params":{
               "inverted_index_algo": "DAAT_MAXSCORE",
               "bm25_k1": 1.2,
               "bm25_b": 0.75
            }
        }
    ]'
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>field_name</code></p></td>
     <td><p>要索引的向量字段名称。对于 Full Text Search，应设置为存储稀疏向量的字段，在本例中为 <code>sparse</code>。</p></td>
   </tr>
   <tr>
     <td><p><code>index_type</code></p></td>
     <td><p>要创建的索引类型。<code>AUTOINDEX</code> 允许 Milvus 自动优化索引设置。如果需要更多控制，可以选择其他支持的索引类型。有关更多信息，请参考<a href="./manage-indexes">管理 Index</a>。</p></td>
   </tr>
   <tr>
     <td><p><code>metric_type</code></p></td>
     <td><p>设置为 <code>BM25</code> 以启用 Full Text Search 功能。</p></td>
   </tr>
   <tr>
     <td><p><code>params</code></p></td>
     <td><p>特定于索引的附加参数字典。</p></td>
   </tr>
   <tr>
     <td><p><code>params.inverted_index_algo</code></p></td>
     <td><p>用于构建和查询索引的算法。有效值：</p><ul><li><p><code>"DAAT_MAXSCORE"</code>（默认）：使用最大得分（MaxScore）算法的优化文档逐次处理（DAAT）查询处理。MaxScore 通过跳过可能影响极小的词条和文档，为高 k 值或包含多个词条的查询提供更好的性能。它通过根据词条的最大影响得分将词条划分为关键和非关键组，专注于能够对前 k 个结果有贡献的词条来实现这一点。</p></li><li><p><code>"DAAT_WAND"</code>: 使用WAND算法优化的DAAT查询处理。WAND通过利用最大影响得分跳过非竞争性文档来评估更少的命中文档，但每次命中的开销较高。这使得WAND在k值较小的查询或短查询中更有效，因为在这些情况下跳过操作更可行。</p></li><li><p><code>"TAAT_NAIVE"</code>：基本的逐词（TAAT）查询处理。虽然与 <code>DAAT_MAXSCORE</code> 和 <code>DAAT_WAND</code> 相比速度较慢，但 <code>TAAT_NAIVE</code> 具有独特优势。与 DAAT 算法不同，DAAT 算法使用缓存的最大影响分数，这些分数无论全局集合参数（avgdl）如何变化都保持不变，而 <code>TAAT_NAIVE</code> 会动态适应这些变化。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>params.bm25_k1</code></p></td>
     <td><p>控制词频饱和度。较高的值会增加词频在文档排名中的重要性。取值范围：[1.2, 2.0]。</p></td>
   </tr>
   <tr>
     <td><p><code>params.bm25_b</code></p></td>
     <td><p>控制文档长度归一化的程度。通常使用 0 到 1 之间的值，常见的默认值约为0.75。值为 1 表示不进行长度归一化，而值为 0 表示完全归一化。</p></td>
   </tr>
</table>

### 创建 Collection\{#create-the-collection}

使用定义的 Schema 和索引参数创建 Collection：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name='my_collection', 
    schema=schema, 
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
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

<TabItem value='javascript'>

```javascript
await client.create_collection(
    collection_name: 'my_collection', 
    schema: schema, 
    index_params: index_params,
    functions: functions
);
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

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

## 插入文本数据\{#insert-text-data}

在设置好 Collection 和索引后，即可插入文本数据。只需提供原始文本，之前定义的内置 Function 会自动为每条文本生成对应的稀疏向量。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.insert('my_collection', [
    {'text': 'information retrieval is a field of study.'},
    {'text': 'information retrieval focuses on finding relevant information in large datasets.'},
    {'text': 'data mining and information retrieval overlap in research.'},
])
```

</TabItem>

<TabItem value='java'>

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;

Gson gson = new Gson();
List<JsonObject> rows = Arrays.asList(
        gson.fromJson("{\"text\": \"information retrieval is a field of study.\"}", JsonObject.class),
        gson.fromJson("{\"text\": \"information retrieval focuses on finding relevant information in large datasets.\"}", JsonObject.class),
        gson.fromJson("{\"text\": \"data mining and information retrieval overlap in research.\"}", JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.insert({
collection_name: 'my_collection', 
data: [
    {'text': 'information retrieval is a field of study.'},
    {'text': 'information retrieval focuses on finding relevant information in large datasets.'},
    {'text': 'data mining and information retrieval overlap in research.'},
]);
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
        {"text": "information retrieval is a field of study."},
        {"text": "information retrieval focuses on finding relevant information in large datasets."},
        {"text": "data mining and information retrieval overlap in research."}       
    ],
    "collectionName": "my_collection"
}'

```

</TabItem>
</Tabs>

## 执行 Full Text Search\{#perform-full-text-search}

在向 Collection 插入数据后，可以使用原始查询文本执行 Full Text Search。Milvus 会自动将查询文本转换为稀疏向量，并使用 BM25 算法对匹配的搜索结果进行相关性排序。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"Go","value":"go"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
search_params = {
    'params': {'level': 10},
}

client.search(
    collection_name='my_collection', 
    # highlight-start
    data=['whats the focus of information retrieval?'],
    anns_field='sparse',
    output_fields=['text'], # Fields to return in search results; sparse field cannot be output
    # highlight-end
    limit=3,
    search_params=search_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> searchParams = new HashMap<>();
searchParams.put("level", 10);
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new EmbeddedText("whats the focus of information retrieval?")))
        .annsField("sparse")
        .topK(3)
        .searchParams(searchParams)
        .outputFields(Collections.singletonList("text"))
        .build());
```

</TabItem>

<TabItem value='go'>

```go
annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam("drop_ratio_search", 0.2)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    3,               // limit
    []entity.Vector{entity.Text("whats the focus of information retrieval?")},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField("sparse").
    WithAnnParam(annSearchParams).
    WithOutputFields("text"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("text: ", resultSet.GetColumn("text").FieldData().GetScalars())
}
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.search(
    collection_name: 'my_collection', 
    data: ['whats the focus of information retrieval?'],
    anns_field: 'sparse',
    output_fields: ['text'],
    limit: 3,
    params: {'level': 10},
)
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "my_collection",
    "data": [
        "whats the focus of information retrieval?"
    ],
    "annsField": "sparse",
    "limit": 3,
    "outputFields": [
        "text"
    ],
    "searchParams":{
        "params":{
            "level":10
        }
    }
}'
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>search_params</code></p></td>
     <td><p>包含搜索参数的字典。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p>搜索时忽略低频词的比例。详细信息请参考<a href="./use-sparse-vector">稀疏向量</a>。</p></td>
   </tr>
   <tr>
     <td><p><code>params.level</code></p></td>
     <td><p>使用简化的调优手段控制搜索精度。更多详情，可参考<a href="./tune-recall-rate">召回调优</a></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>原文查询文本。Zilliz Cloud 使用 BM25 函数自动将查询请求中的文本转换成对应的稀疏向量。因此，请勿提供预算的向量。</p></td>
   </tr>
   <tr>
     <td><p><code>anns_field</code></p></td>
     <td><p>用于存储 Milvus 内部自动生成的稀疏向量的向量字段名称。</p></td>
   </tr>
   <tr>
     <td><p><code>output_fields</code></p></td>
     <td><p>搜索结果中要返回的字段名列表。支持<strong>除包含 BM25 生成嵌入的稀疏向量字段之外</strong>的所有字段。常见的输出字段包括主键字段（例如 id ）和原始文本字段（例如 text ）。更多信息请参考 <a href="./full-text-search#faqs">FAQ</a>。</p></td>
   </tr>
   <tr>
     <td><p><code>limit</code></p></td>
     <td><p>返回的匹配结果的最大数量。</p></td>
   </tr>
</table>

## 常见问题\{#faqs}

### 在全文搜索中，我能否输出或访问由 BM25 函数生成的稀疏向量？

不行。BM25 函数生成的稀疏向量在全文搜索中无法直接访问或输出。详情如下：

- BM25 函数在内部生成稀疏向量，用于排序和检索

- 这些向量存储在稀疏字段中，但不能包含在输出字段中

- 你只能输出原始文本字段和元数据（如id、文本）

示例：

```python
# ❌ This throws an error - you cannot output the sparse field
client.search(
    collection_name='my_collection', 
    data=['query text'],
    anns_field='sparse',
    # highlight-next-line
    output_fields=['text', 'sparse']  # 'sparse' causes an error
    limit=3,
    search_params=search_params
)

# ✅ This works - output text fields only
client.search(
    collection_name='my_collection', 
    data=['query text'],
    anns_field='sparse',
    # highlight-next-line
    output_fields=['text']
    limit=3,
    search_params=search_params
)
```

### 如果无法访问，为何还要定义稀疏向量字段呢？

稀疏向量字段作为内部搜索索引，类似于用户不会直接与之交互的数据库索引。

**设计原理：**

- 关注点分离：你处理文本（输入/输出），Milvus处理矢量（内部处理）

- 性能：预计算的稀疏矢量可在查询期间实现快速的BM25排序

- 用户体验：将复杂的矢量运算抽象化，隐藏在简单的文本界面之后

**如果您需要访问向量：**

- 使用预计算的稀疏向量代替全文搜索

- 为自定义稀疏向量工作流创建单独的 Collection

详情请参考[稀疏向量](./use-sparse-vector)。