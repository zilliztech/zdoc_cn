---
title: "精确文本匹配 | Cloud"
slug: /text-match
sidebar_label: "精确文本匹配"
beta: PUBLIC
notebook: FALSE
description: "Milvus 中的精确文本匹配功能能够基于特定术语实现精确的文档检索。通过使用关键词预筛选文档，可以缩小向量搜索的范围，从而提升搜索效率。该功能还可以结合标量过滤，以进一步优化查询结果。 | Cloud"
type: origin
token: WWSZwJWLYiRBfckbN58cV85BnQb
sidebar_position: 10
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - query
  - 查询
  - filter
  - 过滤
  - 过滤表达式
  - text_match
  - bm25

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 精确文本匹配

Milvus 中的精确文本匹配功能能够基于特定术语实现精确的文档检索。通过使用关键词预筛选文档，可以缩小向量搜索的范围，从而提升搜索效率。该功能还可以结合标量过滤，以进一步优化查询结果。

无论是构建检索增强生成（RAG）系统，还是优化文本搜索性能，精确文本匹配都能提升信息检索的准确性和速度。

<Admonition type="info" icon="📘" title="说明">

<p>精确文本匹配关注的是查询词的精确匹配，而不对匹配文档的相关性进行评分。如果希望基于查询词的语义和重要性来检索最相关的文档，建议使用<a href="./full-text-search">全文搜索</a>。</p>

</Admonition>

## 概述{#overview}

Milvus 通过集成 [Tantivy](https://github.com/quickwit-oss/tantivy) 来实现精确文本匹配和关键词检索，以提升搜索速度和查询效率。对于每条文本记录，Zilliz Cloud 会按照以下步骤进行索引：

1. **Analyzer**：Analyzer 将输入文本分解为单个单词或标记，使得系统能够基于这些分词构建索引。

1. **倒排索引**：完成分词后，Zilliz Cloud 会创建一个倒排索引，将每个唯一分词映射到包含该分词的文档。

当用户执行精确文本搜索时，倒排索引能够快速检索到包含这些关键词的所有文档，这比逐行搜索文档的效率更高。

![Z3zbwD4FShz7i7buDEecl1qxnCf](/img/Z3zbwD4FShz7i7buDEecl1qxnCf.png)

## 开启精确文本匹配{#enable-text-match}

精确文本匹配适用于 VARCHAR 字段类型，即 Zilliz Cloud 中的字符数据类型。要启用精确文本匹配，您需要在定义 Collection Schema 时将 `enable_analyzer` 和 `enable_match` 参数都设置为 `True`，并可以选择配置 Analyzer。

### 设置 `enable_analyzer` 和 `enable_match`{#set-enableanalyzer-and-enablematch}

要为特定的 `VARCHAR` 字段启用精确文本匹配，在定义字段 Schema 时需将 `enable_analyzer` 和 `enable_match` 参数都设置为 `True`。这指示 Milvus 对文本进行分词，并为指定字段创建倒排索引，从而实现快速高效的精确文本匹配。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

schema = MilvusClient.create_schema(auto_id=True, enable_dynamic_field=False)

schema.add_field(
    field_name='text', 
    datatype=DataType.VARCHAR, 
    max_length=1000, 
    enable_analyzer=True, # Whether to enable text analysis for this field
    enable_match=True # Whether to enable text match
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(false)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .enableAnalyzer(true)
        .enableMatch(true)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
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
                    "enable_analyzer": true,
                    "enable_match": true
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

### 可选：配置 Analyzer{#optional-configure-an-analyzer}

精确文本匹配的性能和准确性依赖于所选的 Analyzer。不同的 Analyzer 对语言和文本结构的处理方式不同，因此选择适合您用例的 Analyzer 非常重要。

默认情况下，Milvus 使用 `standard` analyzer。该 Analyzer 基于空格和标点符号对文本进行分词，删除超过 40 个字符的分词，并将文本转换为小写。使用 `standard` analyzer 无需您指定任何参数。

对于非字母语言或特定场景，您可能需要配置自定义 Analyzer。Milvus 提供针对不同语言和场景优化的多种 Analyzer。

要配置自定义 Analyzer，可以使用 `analyzer_params` 参数。例如，使用 **Jieba** 分词器处理中文文本：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "english"
}
schema.add_field(
    field_name='text',
    datatype=DataType.VARCHAR,
    max_length=200,
    enable_analyzer=True,
    analyzer_params = analyzer_params,
    enable_match = True,
)
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(200)
        .enableAnalyzer(true)
        .analyzerParams(analyzerParams)
        .enableMatch(true)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
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
    analyzer_params: { type: 'english' },
  },
  {
    name: "sparse",
    data_type: DataType.SparseFloatVector,
  },
];
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
                    "max_length": 200,
                    "enable_analyzer": true,
                    "enable_match": true,
                    "analyzer_params": {"type": "english"}
                }
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            }
        ]
    }'
```

</TabItem>
</Tabs>

有关可用分词器及其配置的更多信息，请参考 [Tokenizer](./analyzer)。

## 使用精确文本匹配{#use-text-match}

在 Collection Schema 中为 VARCHAR 字段启用精确文本匹配后，您可以使用 `TEXT_MATCH` 表达式执行文本匹配。

### `TEXT_MATCH` 表达式语法{#textmatch-expression-syntax}

`TEXT_MATCH` 表达式用于指定要搜索的字段和关键词，其语法如下：

```python
TEXT_MATCH(field_name, text)
```

- `field_name`：要搜索的 VARCHAR 字段的名称。

- `text`：要搜索的关键词。多个关键词可以用空格或根据语言和配置的分词器使用其他适当的分隔符进行分隔。

默认情况下，`TEXT_MATCH` 使用“OR”匹配逻辑，即会返回包含任意指定关键词的文档。例如，搜索 `docs` 字段中包含关键词 `"machine"` 或 `"deep"` 的文档，使用以下表达式：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
filter = "TEXT_MATCH(docs, 'machine deep')"
```

</TabItem>

<TabItem value='java'>

```java
String filter = "TEXT_MATCH(text, 'machine deep')";
```

</TabItem>

<TabItem value='javascript'>

```javascript
const filter = "TEXT_MATCH(text, 'machine deep')";
```

</TabItem>

<TabItem value='bash'>

```bash
export filter="\"TEXT_MATCH(text, 'machine deep')\""
```

</TabItem>
</Tabs>

您也可以使用逻辑运算符组合多个 `TEXT_MATCH` 表达式，以实现“AND”匹配。

- 例如，搜索 `text` 字段中同时包含 `"machine"` 和 `"deep"` 的文档，使用以下表达式：

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
    <TabItem value='python'>

    ```python
    filter = "TEXT_MATCH(docs, 'machine') and TEXT_MATCH(docs, 'deep')"
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    String filter = "TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'deep')";
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    const filter = "TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'deep')"
    ```

    </TabItem>

    <TabItem value='bash'>

    ```bash
    export filter="\"TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'deep')\""
    ```

    </TabItem>
    </Tabs>

- 搜索 `text` 字段中同时包含 `"machine"` 和 `"deep"` 但不包含 `"deep"` 的文档，使用以下表达式：

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
    <TabItem value='python'>

    ```python
    filter = "not TEXT_MATCH(text, 'deep') and TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'learning')"
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    String filter = "not TEXT_MATCH(text, 'deep') and TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'learning')";
    ```

    </TabItem>

    <TabItem value='javascript'>

    ```javascript
    const filter = "not TEXT_MATCH(text, 'deep') and TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'learning')";
    ```

    </TabItem>

    <TabItem value='bash'>

    ```bash
    export filter="\"not TEXT_MATCH(text, 'deep') and TEXT_MATCH(text, 'machine') and TEXT_MATCH(text, 'learning')\""
    ```

    </TabItem>
    </Tabs>

### 使用精确文本匹配进行搜索{#search-with-text-match}

精确文本匹配可以与向量相似度搜索结合使用，以缩小搜索范围并提升搜索性能。通过在进行向量相似度搜索前使用精确文本匹配筛选 Collection，可以减少需要搜索的文档数量，从而加快查询速度。

在以下示例中，`filter` 过滤了 Collection，只包括匹配指定关键词的文档。然后，在这个筛选后的文档子集中执行向量相似度搜索。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Match entities with `keyword1` or `keyword2`
filter = "TEXT_MATCH(text, 'keyword1 keyword2')"

# Assuming 'embeddings' is the vector field and 'text' is the VARCHAR field
result = client.search(
    collection_name="YOUR_COLLECTION_NAME", # Your collection name
    anns_field="embeddings", # Vector field name
    data=[query_vector], # Query vector
    filter=filter,
    search_params={"params": {"nprobe": 10}},
    limit=10, # Max. number of results to return
    output_fields=["id", "text"] # Fields to return
)
```

</TabItem>

<TabItem value='java'>

```java
String filter = "TEXT_MATCH(text, 'keyword1 keyword2')";

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("YOUR_COLLECTION_NAME")
        .annsField("embeddings")
        .data(Collections.singletonList(queryVector)))
        .filter(filter)
        .topK(10)
        .outputFields(Arrays.asList("id", "text"))
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
// Match entities with `keyword1` or `keyword2`
const filter = "TEXT_MATCH(text, 'keyword1 keyword2')";

// Assuming 'embeddings' is the vector field and 'text' is the VARCHAR field
const result = await client.search(
    collection_name: "YOUR_COLLECTION_NAME", // Your collection name
    anns_field: "embeddings", // Vector field name
    data: [query_vector], // Query vector
    filter: filter,
    params: {"nprobe": 10},
    limit: 10, // Max. number of results to return
    output_fields: ["id", "text"] //Fields to return
);
```

</TabItem>

<TabItem value='bash'>

```bash
export filter="\"TEXT_MATCH(text, 'keyword1 keyword2')\""

export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "demo2",
    "annsField": "my_vector",
    "data": [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    "filter": '"$filter"',
    "searchParams": {
        "params": {
            "nprobe": 10
        }
    },
    "limit": 3,
    "outputFields": ["text","id"]
}'
```

</TabItem>
</Tabs>

### 使用精确文本匹配进行查询{#query-with-text-match}

精确文本匹配还可以用于查询操作中的标量过滤。通过在 `query()` 方法的 `expr` 参数中指定 `TEXT_MATCH` 表达式，可以检索到匹配给定关键词的文档。

以下示例中，查询 `text` 字段中包含关键词 `"keyword1"` 和 `"keyword2"`的文档：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Match entities with both `keyword1` and `keyword2`
filter = "TEXT_MATCH(text, 'keyword1') and TEXT_MATCH(text, 'keyword2')"

result = client.query(
    collection_name="YOUR_COLLECTION_NAME",
    filter=filter, 
    output_fields=["id", "text"]
)
```

</TabItem>

<TabItem value='java'>

```java
String filter = "TEXT_MATCH(text, 'keyword1') and TEXT_MATCH(text, 'keyword2')";

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName("YOUR_COLLECTION_NAME")
        .filter(filter)
        .outputFields(Arrays.asList("id", "text"))
        .build()
);
```

</TabItem>

<TabItem value='javascript'>

```javascript
// Match entities with both `keyword1` and `keyword2`
const filter = "TEXT_MATCH(text, 'keyword1') and TEXT_MATCH(text, 'keyword2')";

const result = await client.query(
    collection_name: "YOUR_COLLECTION_NAME",
    filter: filter, 
    output_fields: ["id", "text"]
)
```

</TabItem>

<TabItem value='bash'>

```bash
export filter="\"TEXT_MATCH(text, 'keyword1') and TEXT_MATCH(text, 'keyword2')\""

export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "demo2",
    "filter": '"$filter"',
    "outputFields": ["id", "text"]
}'
```

</TabItem>
</Tabs>

## 注意事项{#considerations}

- 为字段启用精确文本匹配时，会创建倒排索引，这会占用存储资源。启用该功能时请考虑存储影响，因为这取决于文本大小、唯一分词数量以及使用的分词器。

- 一旦在 Schema 中定义了分词器配置，该配置就会固定在 Collection 上。如果您认为其他分词器更适合您的需求，可以考虑删除现有的 Collection 并创建一个包含所需分词器配置的新 Collection。

