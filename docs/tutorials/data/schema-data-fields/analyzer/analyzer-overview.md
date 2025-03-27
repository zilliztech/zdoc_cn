---
title: "Analyzer 概述 | Cloud"
slug: /analyzer-overview
sidebar_label: "Analyzer 概述"
beta: PUBLIC
notebook: FALSE
description: "在文本处理中，Analyzer 是一个关键组件，用于将原始文本转换为结构化、可搜索的格式。每个 Analyzer 通常由两个核心元素组成：分词器（tokenizer）和过滤器（filter）。它们共同将输入文本转换为词元（token），并对这些词元进行优化，以便为高效的索引和检索做好准备。 | Cloud"
type: origin
token: XDNVwL0r1iSJgqk0XkkcVQK9nvh
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - 分析器
  - analyzer
  - tokenizer
  - filter

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Analyzer 概述

在文本处理中，Analyzer 是一个关键组件，用于将原始文本转换为结构化、可搜索的格式。每个 Analyzer 通常由两个核心元素组成：分词器（tokenizer）和过滤器（filter）。它们共同将输入文本转换为词元（token），并对这些词元进行优化，以便为高效的索引和检索做好准备。  

在Zilliz Cloud中， Analyzer 在创建 Collection 时为 Collection Schema 中的 `VARCHAR` 字段进行配置。 Analyzer 生成的词元可用于构建关键字匹配的索引，或转换为稀疏向量以支持全文搜索。更多信息，请参阅[精确文本匹配](./text-match)或[全文搜索](./full-text-search)。  

<Admonition type="info" icon="📘" title="说明">

<p>使用 Analyzer 可能会影响性能：  </p>
<ul>
<li><p><strong>全文搜索</strong>：对于全文搜索，DataNode 和 QueryNode 通道的数据消耗速度较慢，因为它们必须等待分词完成。因此，新摄入的数据需要更长时间才能被搜索到。</p></li>
<li><p><strong>关键字匹配</strong>：对于关键字匹配，索引创建速度也较慢，因为需要先完成分词才能构建索引。  </p></li>
</ul>

</Admonition>

## Analyzer 的组成{#anatomy-of-an-analyzer}

Zilliz Cloud中的 Analyzer 由一个分词器和零个或多个过滤器组成。  

- **分词器**：分词器将输入文本拆分为离散的词元。这些词元可以是单词或短语，具体取决于分词器的类型。

- **过滤器**：过滤器可应用于词元以进一步优化它们，例如将其转换为小写或移除常见词汇。

<Admonition type="info" icon="📘" title="说明">

<p>分词器仅支持 UTF-8 格式。未来版本将增加对其他格式的支持。  </p>

</Admonition>

以下工作流程展示了 Analyzer 如何处理文本。  

![FH9LwjBuphOJeRbwNWEcCS9Qn1c](/img/FH9LwjBuphOJeRbwNWEcCS9Qn1c.png)

## Analyzer 类型{#analyzer-types}

Zilliz Cloud提供两种类型的 Analyzer，以满足不同的文本处理需求：  

- **内置 Analyzer** ：这些是预定义的配置，覆盖常见的文本处理任务，设置简单。内置 Analyzer 非常适合通用搜索，因为它们不需要复杂的配置。

- **自定义 Analyzer** ：对于更高级的需求，自定义 Analyzer 允许您通过指定分词器和零个或多个过滤器来定义自己的配置。这种自定义级别特别适用于需要精确控制文本处理的专业场景。

<Admonition type="info" icon="📘" title="说明">

<p>如果在创建 Collection 时未指定 Analyzer 配置，Zilliz Cloud默认使用 Standard Analyzer 进行所有文本处理。</p>

</Admonition>

### 内置 Analyzer {#built-in-analyzer}

Zilliz Cloud 集群中的内置 Analyzer 预配置了特定的分词器和过滤器，您可以直接使用它们，而无需自行定义这些组件。每个内置 Analyzer 都作为一个模板，包含预设的分词器和过滤器，并提供可选的参数以供自定义。  

例如，要使用标准内置 Analyzer ，只需将其名称 `standard` 指定为类型，并可选择包含特定于此 Analyzer 类型的额外配置，例如 `stop_words`。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "standard", # Uses the standard built-in analyzer
    "stop_words": ["a", "an", "for"] # Defines a list of common words (stop words) to exclude from tokenization
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "standard");
analyzerParams.put("stop_words", Arrays.asList("a", "an", "for"));
```

</TabItem>

<TabItem value='javascript'>

```javascript
const analyzer_params = {
    "type": "standard", // Uses the standard built-in analyzer
    "stop_words": ["a", "an", "for"] // Defines a list of common words (stop words) to exclude from tokenization
};
```

</TabItem>

<TabItem value='bash'>

```bash
export analyzerParams='{
       "type": "standard",
       "stop_words": ["a", "an", "for"]
    }'
```

</TabItem>
</Tabs>

上述 `standard` 内置 Analyzer 的配置相当于通过以下参数设置自定义 Analyzer ，其中明确定义了分词器和过滤器选项，以实现类似的功能：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": [
        "lowercase",
        {
            "type": "stop",
            "stop_words": ["a", "an", "for"]
        }
    ]
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
        Arrays.asList("lowercase",
                new HashMap<String, Object>() {{
                    put("type", "stop");
                    put("stop_words", Arrays.asList("a", "an", "for"));
                }}));
```

</TabItem>

<TabItem value='javascript'>

```javascript
const analyzer_params = {
    "tokenizer": "standard",
    "filter": [
        "lowercase",
        {
            "type": "stop",
            "stop_words": ["a", "an", "for"]
        }
    ]
};
```

</TabItem>

<TabItem value='bash'>

```bash
export analyzerParams='{
       "type": "standard",
       "filter":  [
       "lowercase",
       {
            "type": "stop",
            "stop_words": ["a", "an", "for"]
       }
   ]
}'
```

</TabItem>
</Tabs>

Zilliz Cloud 提供了以下内置 Analyzer ，每个 Analyzer 都针对特定的文本处理需求设计：  

- `standard`：适用于通用文本处理，应用标准分词和小写过滤。

- `english`：针对英文文本优化，支持英文停用词。

- `chinese`：专为中文文本处理设计，包括适应中文语言结构的分词。

有关内置 Analyzer 及其可自定义设置的列表，请参阅[内置 Analyzer](./built-in-analyzer)。  

### 自定义 Analyzer {#custom-analyzer}

对于更高级的文本处理，Zilliz Cloud 中的自定义 Analyzer 允许您通过指定分词器和过滤器来构建定制的文本处理管道。这种设置非常适合需要精确控制的专业场景。  

#### 分词器{#tokenizer}

分词器是自定义 Analyzer 的必备组件，它通过将输入文本拆分为离散的词元来启动 Analyzer 管道。分词遵循特定规则，例如根据空格或标点符号进行拆分，具体取决于分词器类型。此过程允许对每个单词或短语进行更精确和独立的处理。  

例如，分词器会将文本 `"Vector Database Built for Scale"` 转换为以下单独的词元：  

```plaintext
["Vector", "Database", "Built", "for", "Scale"]
```

指定分词器的示例：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "whitespace",
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
```

</TabItem>

<TabItem value='javascript'>

```javascript
const analyzer_params = {
    "tokenizer": "whitespace",
};
```

</TabItem>

<TabItem value='bash'>

```bash
export analyzerParams='{
       "type": "whitespace"
    }'
```

</TabItem>
</Tabs>

有关可供选择的分词器列表，请参阅[分词器](./analyzer-tokenizers)。  

#### 过滤器{#filter}

过滤器是可选的组件，用于对分词器生成的词元进行转换或优化。例如，对分词后的词元 `["Vector", "Database", "Built", "for", "Scale"]` 应用小写过滤器后，结果可能为：  

```sql
["vector", "database", "built", "for", "scale"]
```

自定义 Analyzer 中的过滤器可以是内置的，也可以是自定义的，具体取决于配置需求。  

- **内置过滤器**：由 Zilliz Cloud 预配置，设置简单。您可以通过指定名称直接使用这些过滤器。以下是可直接使用的内置过滤器：  

    - `lowercase`：将文本转换为小写，确保大小写不敏感匹配。

    - `asciifolding`：将非 ASCII 字符转换为 ASCII 等效字符，简化多语言文本处理。

    - `alphanumonly`：仅保留字母数字字符，移除其他字符。

    - `cnalphanumonly`：移除包含中文字符、英文字母或数字以外的字符的词元。

    - `cncharonly`：移除包含非中文字符的词元。

  使用内置过滤器的示例：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard", # 必填：指定分词器
    "filter": ["lowercase"], # 可选：内置过滤器，将文本转换为小写
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

</TabItem>

<TabItem value='javascript'>

```javascript
const analyzer_params = {
    "tokenizer": "standard", // 必填：指定分词器
    "filter": ["lowercase"], // 可选：内置过滤器，将文本转换为小写
};
```

</TabItem>

<TabItem value='bash'>

```bash
export analyzerParams='{
       "type": "standard",
       "filter":  ["lowercase"]
    }'
```

</TabItem>
</Tabs>

- **自定义过滤器**：自定义过滤器允许进行专门的配置。您可以通过选择有效的过滤器类型（`filter.type`）并为每种过滤器类型添加特定设置来定义自定义过滤器。支持自定义的过滤器类型示例：  

    - **stop**：通过设置停用词列表移除指定的常见词（例如 `"stop_words": ["of", "to"]`）。

    - **length**：根据长度标准排除词元，例如设置最大词元长度。

    - **stemmer**：将单词还原为其词根形式，以实现更灵活的匹配。

  配置自定义过滤器的示例：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard", # 必填：指定分词器
    "filter": [
        {
            "type": "stop", # 指定过滤器类型为 'stop'
            "stop_words": ["of", "to"], # 自定义该过滤器类型的停用词
        }
    ]
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
        Collections.singletonList(new HashMap<String, Object>() {{
            put("type", "stop");
            put("stop_words", Arrays.asList("a", "an", "for"));
        }}));
```

</TabItem>

<TabItem value='javascript'>

```javascript
const analyzer_params = {
    "tokenizer": "standard", // 必填：指定分词器
    "filter": [
        {
            "type": "stop", // 指定过滤器类型为 'stop'
            "stop_words": ["of", "to"], // 自定义该过滤器类型的停用词
        }
    ]
};
```

</TabItem>

<TabItem value='bash'>

```bash
export analyzerParams='{
       "type": "standard",
       "filter":  [
       {
            "type": "stop",
            "stop_words": ["a", "an", "for"]
       }
    ]
}'
```

</TabItem>
</Tabs>

有关可用过滤器类型及其特定参数的列表，请参阅[过滤器](./analyzer-filters)。  

## 使用示例{#example-use}

在本示例中，我们定义了一个集合模式，其中包含一个用于嵌入向量的向量字段和两个用于文本处理功能的 VARCHAR 字段。每个 VARCHAR 字段都配置了自己的 Analyzer 设置，以处理不同的文本处理需求。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

# Set up a Milvus client
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"
)

# Create schema
schema = client.create_schema(auto_id=True, enable_dynamic_field=False)

# Add fields to schema

# Use a built-in analyzer
analyzer_params_built_in = {
    "type": "english"
}

# Add VARCHAR field `title_en`
schema.add_field(
    field_name='title_en', 
    datatype=DataType.VARCHAR, 
    max_length=1000, 
    enable_analyzer=True，
    analyzer_params=analyzer_params_built_in,
    enable_match=True, 
)

# Configure a custom analyzer
analyzer_params_custom = {
    "tokenizer": "standard",
    "filter": [
        "lowercase", # Built-in filter
        {
            "type": "length", # Custom filter
            "max": 40
        },
        {
            "type": "stop", # Custom filter
            "stop_words": ["of", "to"]
        }
    ]
}

# Add VARCHAR field `title`
schema.add_field(
    field_name='title', 
    datatype=DataType.VARCHAR, 
    max_length=1000, 
    enable_analyzer=True，
    analyzer_params=analyzer_params_custom,
    enable_match=True, 
)

# Add vector field
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=3)
# Add primary field
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)

# Set up index params for vector field
index_params = client.prepare_index_params()
index_params.add_index(field_name="embedding", metric_type="COSINE", index_type="AUTOINDEX")

# Create collection with defined schema
client.create_collection(
    collection_name="YOUR_COLLECTION_NAME",
    schema=schema,
    index_params=index_params
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// Set up a Milvus client
ConnectConfig config = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

// Create schema
CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(false)
        .build();

// Add fields to schema
// Use a built-in analyzer
Map<String, Object> analyzerParamsBuiltin = new HashMap<>();
analyzerParamsBuiltin.put("type", "english");
// Add VARCHAR field `title_en`
schema.addField(AddFieldReq.builder()
        .fieldName("title_en")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .enableAnalyzer(true)
        .analyzerParams(analyzerParamsBuiltin)
        .enableMatch(true)
        .build());

// Configure a custom analyzer
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
        Arrays.asList("lowercase",
                new HashMap<String, Object>() {{
                    put("type", "length");
                    put("max", 40);
                }},
                new HashMap<String, Object>() {{
                    put("type", "stop");
                    put("stop_words", Arrays.asList("a", "an", "for"));
                }}
        )
);
schema.addField(AddFieldReq.builder()
        .fieldName("title")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .enableAnalyzer(true)
        .analyzerParams(analyzerParams)
        .enableMatch(true) // must enable this if you use TextMatch
        .build());

// Add vector field
schema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(3)
        .build());
// Add primary field
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());

// Set up index params for vector field
List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

// Create collection with defined schema
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("YOUR_COLLECTION_NAME")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

// Set up a Milvus client
const client = new MilvusClient("YOUR_CLUSTER_ENDPOINT");
// Use a built-in analyzer for VARCHAR field `title_en`
const analyzerParamsBuiltIn = {
  type: "english",
};

// Configure a custom analyzer for VARCHAR field `title`
const analyzerParamsCustom = {
  tokenizer: "standard",
  filter: [
    "lowercase",
    {
      type: "length",
      max: 40,
    },
    {
      type: "stop",
      stop_words: ["of", "to"],
    },
  ],
};

// Create schema
const schema = {
  auto_id: true,
  fields: [
    {
      name: "id",
      type: DataType.INT64,
      is_primary: true,
    },
    {
      name: "title_en",
      data_type: DataType.VARCHAR,
      max_length: 1000,
      enable_analyzer: true,
      analyzer_params: analyzerParamsBuiltIn,
      enable_match: true,
    },
    {
      name: "title",
      data_type: DataType.VARCHAR,
      max_length: 1000,
      enable_analyzer: true,
      analyzer_params: analyzerParamsCustom,
      enable_match: true,
    },
    {
      name: "embedding",
      data_type: DataType.FLOAT_VECTOR,
      dim: 4,
    },
  ],
};

// Set up index params for vector field
const indexParams = [
  {
    name: "embedding",
    metric_type: "COSINE",
    index_type: "AUTOINDEX",
  },
];

// Create collection with defined schema
await client.createCollection({
  collection_name: "YOUR_COLLECTION_NAME",
  schema: schema,
  index_params: indexParams,
});

console.log("Collection created successfully!");

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
                "fieldName": "title_en",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000,
                    "enable_analyzer": true,
                    "enable_match": true,
                    "analyzer_params": {"type": "english"}
                }
            },
            {
                "fieldName": "title",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000,
                    "enable_analyzer": true,
                    "enable_match": true,
                    "analyzer_params": {
                        "tokenizer": "standard",
                        "filter":[
                            "lowercase",
                            {
                                "type":"length",
                                "max":40
                            },
                            {
                                "type":"stop",
                                "stop_words":["of","to"]
                            }
                        ]
                    }
                }
            },
            {
                "fieldName": "embedding",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim":3
                }
            }
        ]
    }'
    
export indexParams='[
        {
            "fieldName": "embedding",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'

export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"YOUR_COLLECTION_NAME\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

</TabItem>
</Tabs>

