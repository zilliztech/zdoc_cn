---
title: "Cohere Ranker | BYOC"
slug: /cohere-model-ranker
sidebar_label: "Cohere Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Cohere Ranker 利用 Cohere 的强大重排模型，通过语义重排来提高搜索相关性。它提供企业级重排功能，具备强大的 API 基础设施，并针对生产环境进行了性能优化。 | BYOC"
type: origin
token: Myupw06YXiShNgkqs2BcxEScnSg
sidebar_position: 4
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - 模型
  - cohere

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cohere Ranker

Cohere Ranker 利用 [Cohere](https://cohere.com/) 的强大重排模型，通过语义重排来提高搜索相关性。它提供企业级重排功能，具备强大的 API 基础设施，并针对生产环境进行了性能优化。

Cohere Ranker 对于需要以下功能的应用程序特别有价值：

- 借助最先进的重排模型实现高质量语义理解

- 企业级可靠性和可扩展性，适用于生产工作负载

- 跨多种内容类型的多语言重排序功能

- 通过内置的速率限制和错误处理实现一致的 API 性能

## 前提条件{#prerequisites}

在 Zilliz Cloud 中实现 Cohere Ranker 之前，请确保您具备以下条件：

- 一个 Zilliz Cloud Collection，包含一个 `VARCHAR` 字段，该字段包含待重排序的文本

- 一个可访问重排序模型的有效 Cohere API 密钥。在 [Cohere平台](https://dashboard.cohere.com/) 注册以获取您的API凭证。您可以选择以下方式之一：

    - 设置 `COHERE_API_KEY` 环境变量，或者

    - 直接在 [Ranker 配置](./cohere-model-ranker#create-a-cohere-ranker-function)中配置 `credential` 参数。

## 创建一个Cohere Ranker 函数{#create-a-cohere-ranker-function}

要在你的 Zilliz Cloud 应用程序中使用Cohere Ranker，请创建一个 Function（函数）对象，该对象指定重排序应如何操作。此函数将被传递给 Zilliz Cloud 搜索操作，以增强结果排序。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"  # Replace with your Milvus server URI
)

# Configure Cohere Ranker
cohere_ranker = Function(
    name="cohere_semantic_ranker",          # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "cohere",               # Specifies Cohere as the service provider
        "model_name": "rerank-english-v3.0", # Cohere rerank model to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "max_tokens_per_doc": 4096,         # Optional: max tokens per document (default: 4096)
        # "credential": "your-cohere-api-key" # Optional: authentication credential for Cohere API
    }
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

### Cohere Ranker 特有参数{#cohere-ranker-specific-parameters}

以下参数是 Cohere Ranker 特有的：

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
     <td><p><code>"cohere"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>是</p></td>
     <td><p>要使用的 Cohere 重排序模型，该模型来自 Cohere 平台上支持的模型。</p><p>如需了解可用的重排模型列表，请参考<a href="https://docs.cohere.com/docs/rerank">Cohere 文档</a>。</p></td>
     <td><p><code>"rerank-english-v3.0"</code>, <code>"rerank-multilingual-v3.0"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重排模型用于计算相关性得分的查询字符串列表。查询字符串的数量必须与搜索操作中的查询数量完全匹配（即使使用查询向量而非文本），否则将报错。</p></td>
     <td><p><em>&#91;"search query"&#93;</em></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>由于模型服务可能无法一次性处理所有数据，因此这设置了在多个请求中访问模型服务的批量大小。</p></td>
     <td><p><code>128</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>max_tokens_per_doc</code></p></td>
     <td><p>否</p></td>
     <td><p>每个文档的最大令牌数。长文档将自动截断为指定的令牌数。</p></td>
     <td><p><code>4096</code> (default)</p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>否</p></td>
     <td><p>用于访问Cohere API服务的认证凭证。如果未指定，系统将查找<code>COHERE_API_KEY</code> 环境变量。</p></td>
     <td><p><em>"your-cohere-api-key"</em></p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="注释">

<p>对于所有 Model Ranker 共享的通用参数（例如，<code>provider</code>、<code>queries</code>），请参考<a href="./model-ranker-overview#create-a-model-ranker">创建 Model Ranker</a>。</p>

</Admonition>

## 在标准向量搜索中使用{#apply-to-standard-vector-search}

要将 Cohere Ranker 应用于标准向量搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Execute search with Cohere reranking
results = client.search(
    collection_name="your_collection",
    data=["AI Research Progress", "What is AI"],  # Search queries
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=cohere_ranker,                       # Apply Cohere reranking
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

Cohere Ranker 也可与混合搜索结合使用，以融合稠密和稀疏向量搜索：

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

# Execute hybrid search with Cohere reranking
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=cohere_ranker,                      # Apply Cohere reranking to combined results
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

