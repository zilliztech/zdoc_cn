---
title: "Binary 向量 | BYOC"
slug: /use-binary-vector
sidebar_label: "Binary 向量"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Binary 向量是一种特殊的数据表示形式，通过将传统的高维浮点向量转换为仅包含 0 和 1 的二进制向量。这种转换不仅压缩了向量的大小，还能够在保留语义信息的同时，减少存储和计算成本。在非关键特征的精度要求较低的情况下，Binary 向量能够有效保留大部分原始浮点向量的完整性和实用性。 | BYOC"
type: origin
token: QaQRwXyZCiUV5IktNF9craq6nzh
sidebar_position: 4
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 向量字段
  - vector field
  - binary vector
  - binary 向量

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Binary 向量

Binary 向量是一种特殊的数据表示形式，通过将传统的高维浮点向量转换为仅包含 0 和 1 的二进制向量。这种转换不仅压缩了向量的大小，还能够在保留语义信息的同时，减少存储和计算成本。在非关键特征的精度要求较低的情况下，Binary 向量能够有效保留大部分原始浮点向量的完整性和实用性。

Binary 向量的应用场景非常广泛，尤其是在计算效率和存储优化至关重要的情况下。在大型 AI 系统中（如搜索引擎或推荐系统），实时处理海量数据是关键。通过减少向量的大小，Binary 向量能够在不显著牺牲准确性的情况下，帮助减少延迟和计算成本。此外，Binary 向量在资源受限的环境中也很有用，例如移动设备和嵌入式系统，这些场景中内存和处理能力有限。通过使用 Binary 向量，复杂的 AI 功能得以在这些限制条件下实现，同时保持较高的运行效率。

## 概述\{#overview}

Binary 向量是一种将复杂对象（如图像、文本或音频）编码为固定长度二进制串的向量表示方法。在 Zilliz Cloud 中，Binary 向量通常表示为位数组或字节数组。例如，一个 8 维的 Binary 向量可以表示为 `[1, 0, 1, 1, 0, 0, 1, 0]`。

下图展示了 Binary 向量如何表示文本内容中关键词的出现情况。本例中，我们使用一个 10 维的 Binary 向量来表示两个不同的文本（**文本 1** 和**文本 2**），其中每个维度对应词汇表中的一个词， 1 表示该词在文本中出现，0 表示未出现。

![JbS6wyQklhYAJobQlIncR12GnXf](/img/JbS6wyQklhYAJobQlIncR12GnXf.png)

Binary 向量表示法具有以下特点：

- **高效存储**：每个维度只需 1 bit 存储，大大节省了存储空间。

- **快速计算**：使用位运算（如 XOR）可以快速计算向量间的相似度。

- **固定长度**：无论原始文本长度如何，向量长度保持不变，便于索引和检索。

- **简单直观**：直接反映了关键词的出现情况，适合某些特定的检索任务。

Binary 向量可以通过多种方法生成。在文本处理中，可以使用预定义的词汇表，根据词语出现与否设置相应位。图像处理中，可以使用感知哈希算法（如 [pHash](https://en.wikipedia.org/wiki/Perceptual_hashing)）生成图像的 Binary 特征。在机器学习应用中，可以将模型输出二值化，得到 Binary 向量表示。

数据在向量化后，可以存储在 Zilliz Cloud 中进行管理和向量检索。下图展示了基本流程。

![Nt3TwvLqUhfiCjbZQ4WczNPqngf](/img/Nt3TwvLqUhfiCjbZQ4WczNPqngf.png)

<Admonition type="info" icon="📘" title="说明">

<p>尽管 Binary 向量在某些场景下表现出色，但它也存在表达能力有限的局限性，难以捕捉复杂的语义关系。因此，在实际应用中，Binary 向量常与其他向量类型结合使用，以平衡效率和表达能力。有关更多信息，请参考 <a href="./use-dense-vector">稠密向量</a> 和 <a href="./use-sparse-vector">稀疏向量</a>。</p>

</Admonition>

## 使用 Binary 向量\{#use-binary-vectors}

### 添加 Binary 向量字段\{#add-vector-field}

要在 Zilliz Cloud 中使用 Binary 向量，首先需要在[创建 Collection](./manage-collections-sdks) 时定义用于存储 Binary 向量的向量字段。这个过程包括：

1. 设置 `datatype` 为支持的 Binary 向量数据类型，即 `BINARY_VECTOR`。

1. 使用 `dim` 参数指定向量的维度。注意，`dim` 必须是 8 的倍数，因为 Binary 向量在插入时需要转换为 byte 数组。每 8 个布尔值（0 或 1）将被打包为 1 个 byte。例如，如果 `dim=128`，则插入时需要提供 16 个 byte 的数组。

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
schema.add_field(field_name="binary_vector", datatype=DataType.BINARY_VECTOR, dim=128)
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
        .fieldName("binary_vector")
        .dataType(DataType.BinaryVector)
        .dimension(128)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

schema.push({
  name: "binary vector",
  data_type: DataType.BinaryVector,
  dim: 128,
});
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
    WithName("binary_vector").
    WithDataType(entity.FieldTypeBinaryVector).
    WithDim(128),
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
    "fieldName": "binary_vector",
    "dataType": "BinaryVector",
    "elementTypeParams": {
        "dim": 128
    }
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField
    ],
    \"enableDynamicField\": true
}"

```

</TabItem>
</Tabs>

以上示例中，我们添加了一个名为 `binary_vector` 的向量字段，用于存储 Binary 向量。该字段的数据类型为 `BINARY_VECTOR`，向量维度为 `128`。

### 为 Binary 向量创建索引\{#set-index-params-for-vector-field}

为了加速搜索，我们需要为 Binary 向量字段创建索引。索引可以显著提高大规模向量数据的检索效率。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="binary_vector",
    index_name="binary_vector_index",
    index_type="AUTOINDEX",
    metric_type="HAMMING"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexParams = new ArrayList<>();
Map<String,Object> extraParams = new HashMap<>();

indexParams.add(IndexParam.builder()
        .fieldName("binary_vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.HAMMING)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MetricType, IndexType } from "@zilliz/milvus2-sdk-node";

const indexParams = {
  indexName: "binary_vector_index",
  field_name: "binary_vector",
  metric_type: MetricType.HAMMING,
  index_type: IndexType.AUTOINDEX
};
```

</TabItem>

<TabItem value='go'>

```go
idx := index.NewAutoIndex(entity.HAMMING)
indexOption := milvusclient.NewCreateIndexOption("my_collection", "binary_vector", idx)
```

</TabItem>

<TabItem value='bash'>

```bash
export indexParams='[
        {
            "fieldName": "binary_vector",
            "metricType": "HAMMING",
            "indexName": "binary_vector_index",
            "indexType": "AUTOINDEX"
        }
    ]'
```

</TabItem>
</Tabs>

以上示例中，我们为 `binary_vector` 字段创建了一个名为 `binary_vector_index` 的索引，索引类型为 `AUTOINDEX`。 `metric_type` 设置为 `HAMMING`，表示使用汉明（Hamming）距离作为相似性度量。

除了 `HAMMING` 相似度类型，Zilliz Cloud 还支持为 Binary 向量指定其他度量类型。具体请参考[相似度类型](./search-metrics-explained)。

### 创建 Collection\{#create-collection}

Binary 向量和索引定义完成后，我们便可以创建包含 Binary 向量的 Collection。以下示例通过 `create_collection` 方法创建了一个名为 `my_binary_collection` 的 Collection。

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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexParams)
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

### 插入 Binary 向量\{#insert-data}

创建 Collection 后，我们可以通过 `insert` 方法插入包含 Binary 向量的数据。注意，Binary 向量应当以 byte 数组形式提供，其中每个 byte 代表 8 个布尔值。

例如，对于 128 维的 Binary 向量，需要提供 16 个 byte 的数组（因为 128 位 ÷ 8 位/byte = 16 byte）。以下是插入数据的代码示例：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
def convert_bool_list_to_bytes(bool_list):
    if len(bool_list) % 8 != 0:
        raise ValueError("The length of a boolean list must be a multiple of 8")

    byte_array = bytearray(len(bool_list) // 8)
    for i, bit in enumerate(bool_list):
        if bit == 1:
            index = i // 8
            shift = i % 8
            byte_array[index] |= (1 << shift)
    return bytes(byte_array)

bool_vectors = [
    [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112,
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1] + [0] * 112,
]

data = [{"binary_vector": convert_bool_list_to_bytes(bool_vector)} for bool_vector in bool_vectors]

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

private static byte[] convertBoolArrayToBytes(boolean[] booleanArray) {
    byte[] byteArray = new byte[booleanArray.length / Byte.SIZE];
    for (int i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i]) {
            int index = i / Byte.SIZE;
            int shift = i % Byte.SIZE;
            byteArray[index] |= (byte) (1 << shift);
        }
    }

    return byteArray;
}

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
{
    boolean[] boolArray = {true, false, false, true, true, false, true, true, false, true, false, false, true, true, false, true};
    JsonObject row = new JsonObject();
    row.add("binary_vector", gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}
{
    boolean[] boolArray = {false, true, false, true, false, true, false, false, true, true, false, false, true, true, false, true};
    JsonObject row = new JsonObject();
    row.add("binary_vector", gson.toJsonTree(convertBoolArrayToBytes(boolArray)));
    rows.add(row);
}

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
const data = [
  { binary_vector: [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1] },
  { binary_vector: [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1] },
];

client.insert({
  collection_name: "my_collection",
  data: data,
});
```

</TabItem>

<TabItem value='go'>

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithBinaryVectorColumn("binary_vector", 128, [][]byte{
        {0b10011011, 0b01010100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0b10011011, 0b01010101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
    }))
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
-d "{
    \"data\": $data,
    \"collectionName\": \"my_collection\"
}"
```

</TabItem>
</Tabs>

### 基于 Binary 向量执行相似性搜索\{#perform-similarity-search}

相似性搜索是 Zilliz Cloud 的核心功能之一，可以根据向量之间的距离快速找到与查询向量最相似的数据。要基于 Binary 向量进行相似性搜索，您需要准备查询向量和搜索参数，然后执行 `search` 方法。

在搜索时，Binary 向量同样需要以 byte 数组的形式提供。确保查询向量的维度与定义 `dim` 时一致，并按照 8 个布尔值转换为 1 个 byte。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
search_params = {
    "params": {"nprobe": 10}
}

query_bool_list = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112
query_vector = convert_bool_list_to_bytes(query_bool_list)

res = client.search(
    collection_name="my_collection",
    data=[query_vector],
    anns_field="binary_vector",
    search_params=search_params,
    limit=5,
    output_fields=["pk"]
)

print(res)

# Output
# data: ["[{'id': '453718927992172268', 'distance': 10.0, 'entity': {'pk': '453718927992172268'}}]"] 
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.BinaryVec;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> searchParams = new HashMap<>();
searchParams.put("nprobe",10);

boolean[] boolArray = {true, false, false, true, true, false, true, true, false, true, false, false, true, true, false, true};
BinaryVec queryVector = new BinaryVec(convertBoolArrayToBytes(boolArray));

SearchResp searchR = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .annsField("binary_vector")
        .searchParams(searchParams)
        .topK(5)
        .outputFields(Collections.singletonList("pk"))
        .build());
        
 System.out.println(searchR.getSearchResults());
 
 // Output
 //
 // [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]
```

</TabItem>

<TabItem value='javascript'>

```javascript
query_vector = [1,0,1,0,1,1,1,1,1,1,1,1];

client.search({
    collection_name: 'my_collection',
    data: query_vector,
    limit: 5,
    output_fields: ['pk'],
    params: {
        nprobe: 10
    }
});
```

</TabItem>

<TabItem value='go'>

```go
queryVector := []byte{0b10011011, 0b01010100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,                      // limit
    []entity.Vector{entity.BinaryVector(queryVector)},
).WithANNSField("binary_vector").
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
```

</TabItem>

<TabItem value='bash'>

```bash
export searchParams='{
        "params":{"nprobe":10}
    }'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"data\": $data,
    \"annsField\": \"binary_vector\",
    \"limit\": 5,
    \"searchParams\":$searchParams,
    \"outputFields\": [\"pk\"]
}"
```

</TabItem>
</Tabs>

有关更多搜索相关信息，请参考[基本 ANN Search](./single-vector-search)。