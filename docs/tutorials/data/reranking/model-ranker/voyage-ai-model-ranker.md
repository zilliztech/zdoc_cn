---
title: "Voyage AI Ranker | Cloud"
slug: /voyage-ai-model-ranker
sidebar_label: "Voyage AI Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Voyage AI Ranker 利用 Voyage AI 的专业 Reranker，通过语义重排来提高搜索相关性。它提供了针对检索增强生成（RAG）和搜索应用程序优化的高性能重排功能。 | Cloud"
type: origin
token: WWH5whhzEiuNgLk8xFNc2dObnOe
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - 模型
  - voyage ai

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Voyage AI Ranker

Voyage AI Ranker 利用[ Voyage AI](https://www.voyageai.com/) 的专业 Reranker，通过语义重排来提高搜索相关性。它提供了针对检索增强生成（RAG）和搜索应用程序优化的高性能重排功能。

Voyage AI Ranker 对于需要以下条件的应用程序特别有价值：

- 通过专门为重排序任务训练的模型实现高级语义理解

- 针对生产工作负载进行优化推理的高性能处理

- 灵活的截断控制，用于处理不同长度的文档

- 不同模型变体（rerank-2、rerank-lite等）的微调性能

## 前提条件{#prerequisites}

在 Zilliz Cloud 中实现 Voyage AI Ranker之前，请确保您具备以下条件：

- 一个 Zilliz Cloud Collection，其中包含一个 `VARCHAR` 字段，该字段包含待重排序的文本

- 一个有权限访问 Reranker 的有效 Voyage AI API 密钥。在 [Voyage AI平台](https://www.voyageai.com/)注册以获取您的 API 凭证。您可以选择以下方式之一：

    - 设置 `VOYAGE_API_KEY` 环境变量，或者

    - 直接在 Ranker 配置中指定 API 密钥

## 创建一个Voyage AI Ranker 函数{#create-a-voyage-ai-ranker-function}

要在您的 Zilliz Cloud 应用程序中使用 Voyage AI Ranker，请创建一个 Function（函数）对象，该对象指定重排序应如何操作。此函数将被传递给Zilliz Cloud 搜索操作，以增强结果排序。

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"  # Replace with your Milvus server URI
)

# Configure Voyage AI Ranker
voyageai_ranker = Function(
    name="voyageai_semantic_ranker",        # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "voyageai",             # Specifies Voyage AI as the service provider
        "model_name": "rerank-2.5",           # Voyage AI reranker to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "truncation": True,                 # Optional: enable input truncation (default: True)
        # "credential": "your-voyage-api-key" # Optional: if not set, uses VOYAGE_API_KEY env var
    }
)
```

### Voyage AI Ranker 特有参数{#voyage-ai-ranker-specific-parameters}

以下参数是 Voyage AI Ranker 特有的：

<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>必选？</strong></p></th>
     <th><p><strong>描述</strong></p></th>
     <th><p><strong>值 / 示例</strong></p></th>
   </tr>
   <tr>
     <td><p><code>reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为 <code>"model"</code> 才能启用模型重排序。</p></td>
     <td><p><code>"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重排序的模型服务提供商。</p></td>
     <td><p><code>"voyageai"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>是</p></td>
     <td><p>要使用的 Voyage AI Reranker，来自Voyage AI 平台上支持的模型。</p><p>如需查看可用的 Reranker 列表，请参考<a href="https://docs.voyageai.com/docs/reranker"> Voyage AI 文档</a>。</p></td>
     <td><p><code>"rerank-2.5"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重排序模型用来计算相关性得分的查询字符串列表。查询字符串的数量必须与搜索操作中的查询数量完全匹配（即使使用查询向量而非文本），否则将报错。</p></td>
     <td><p><em>&#91;"search query"&#93;</em></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>由于模型服务可能无法一次性处理所有数据，因此这里设置了在多次请求中访问模型服务的批量大小。</p></td>
     <td><p><code>128</code> (默认)</p></td>
   </tr>
   <tr>
     <td><p><code>truncation</code></p></td>
     <td><p>否</p></td>
     <td><p>是否截断输入以满足查询和文档的“上下文长度限制”。</p><ul><li><p>如果为 <code>True</code>，查询和文档将被截断以适应上下文长度限制，然后再由重排器模型进行处理。</p></li><li><p>如果为 <code>False</code>，当查询超过 <code>rerank-2.5</code> 和 <code>rerank-2.5-lite</code> 的 8000 个 Token、<code>rerank-2</code> 的 4000 个 Token、<code>rerank-2-lite</code> 和 <code>rerank-1</code>的 2000 个 Token、<code>rerank-lite-1</code> 的 1000 个 Token，或者查询中的标记数与任何单个文档中的标记数之和超过 <code>rerank-2</code> 的 16000 个 Token、<code>rerank-2-lite</code> 和 <code>rerank-1</code> 的 8000 个 Token、<code>rerank-lite-1</code> 的 4000 个 Token 时，将引发错误。</p></li></ul></td>
     <td><p><code>True</code> (默认) 或 <code>False</code></p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>否</p></td>
     <td><p>用于访问 Voyage AI API 服务的认证凭证。如果未指定，系统将查找 <code>VOYAGE_API_KEY</code> 环境变量。</p></td>
     <td><p><em>"your-voyage-api-key"</em></p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="注释">

<p>对于所有 Model Ranker 共享的通用参数（例如，<code>provider</code>、<code>queries</code>），请参考<a href="./model-ranker-overview#create-a-model-ranker">创建 Model Ranker</a>。</p>

</Admonition>

## 在标准向量搜索中使用{#apply-to-standard-vector-search}

要将 Voyage AI Ranker 应用于标准向量搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Execute search with Voyage AI reranker
results = client.search(
    collection_name="your_collection",
    data=["AI Research Progress", "What is AI"],  # Search queries
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=voyageai_ranker,                     # Apply Voyage AI reranker
    consistency_level="Bounded"
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

## 在混合搜索中使用{#apply-to-hybrid-search}

Voyage AI Ranker 也可与混合搜索结合使用，以融合稠密和稀疏向量搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import AnnSearchRequest

# Configure dense vector search
dense_search = AnnSearchRequest(
    data=["AI Research Progress", "What is AI"],
    anns_field="dense_vector",
    param={},
    limit=5
)

# Configure sparse vector search  
sparse_search = AnnSearchRequest(
    data=["AI Research Progress", "What is AI"],
    anns_field="sparse_vector", 
    param={},
    limit=5
)

# Execute hybrid search with Voyage AI reranker
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=voyageai_ranker,                    # Apply Voyage AI reranker to combined results
    limit=5,                                   # Final number of results
    output_fields=["document"]
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// nodejs
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

