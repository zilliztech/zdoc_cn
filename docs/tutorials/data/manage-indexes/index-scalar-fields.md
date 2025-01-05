---
title: "创建 Scalar Index | Cloud"
slug: /index-scalar-fields
sidebar_label: "创建 Scalar Index"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持通过标量索引（Scalar index）加速非向量字段的元数据过滤。Scalar index 类似传统数据库中的索引。 | Cloud"
type: origin
token: AHv5wa2FiiWoyGkTIsHcfIcyngg
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 索引
  - index
  - AUTOINDEX
  - 标量索引

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 创建 Scalar Index

Zilliz Cloud 支持通过标量索引（Scalar index）加速非向量字段的元数据过滤。Scalar index 类似传统数据库中的索引。

本教程将介绍如何针对数据类型为整数、字符串等的标量字段创建和设置 Scalar index。

## 自动索引（Auto indexing）{#auto-indexing}

Milvus 能够根据标量字段类型推理索引类型。如需使用自动索引，请在创建索引时省略 **index_type** 参数。更多有关标量字段数据类型和默认索引算法的对应关系，请参考[标量字段索引算法](https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms)。 

以下为示例代码：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# Auto indexing
CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

index_params = client.prepare_index_params() # Prepare an empty IndexParams object, without having to specify any index parameters

index_params.add_index(
    field_name="scalar_1", # Name of the scalar field to be indexed
    # highlight-next-line
    index_type="", # Type of index to be created. For auto indexing, leave it empty or omit this parameter.
    index_name="default_index" # Name of the index to be created
)

client.create_index(
  collection_name="test_scalar_index", # Specify the collection name
  index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

IndexParam indexParamForScalarField = IndexParam.builder()
    .fieldName("scalar_1") // Name of the scalar field to be indexed
    .indexName("default_index") // Name of the index to be created
    // highlight-next-line
    .indexType("") // Type of index to be created. For auto indexing, leave it empty or omit this parameter.
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForVectorField);

CreateIndexReq createIndexReq = CreateIndexReq.builder()
    .collectionName("test_scalar_index") // Specify the collection name
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.createIndex({
    collection_name: "test_scalar_index", // Specify the collection name
    field_name: "scalar_1", // Name of the scalar field to be indexed
    index_name: "default_index", // Name of the index to be created
    // highlight-next-line
    index_type: "" // Type of index to be created. For auto indexing, leave it empty or omit this parameter.
})
```

</TabItem>
</Tabs>

