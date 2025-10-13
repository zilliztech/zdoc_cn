---
title: "TEI Ranker | Cloud"
slug: /tei-model-ranker
sidebar_label: "TEI Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "TEI Ranker 利用来自 Hugging Face 的文本嵌入推理（TEI）服务，通过语义重排序来提高搜索相关性。它代表了一种超越传统向量相似度的高级搜索结果排序方法。 | Cloud"
type: origin
token: FV51w0DPsi6q3lkLRwocz1Q6nAc
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - 模型
  - tei
  - hugging face
  - text embedding interface

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TEI Ranker

TEI Ranker 利用来自 Hugging Face 的[文本嵌入推理（TEI）](https://huggingface.co/docs/text-embeddings-inference/index)服务，通过语义重排序来提高搜索相关性。它代表了一种超越传统向量相似度的高级搜索结果排序方法。

## 前提条件{#prerequisites}

在 Zilliz Cloud 中实现 TEI Ranker 之前，请确保您具备以下条件：

- 一个 Zilliz Cloud Collection，包含一个 `VARCHAR` 字段，该字段包含待重排序的文本

- 具备重排序功能的正在运行的 TEI 服务。有关设置 TEI 服务的详细说明，请参阅 [TEI 官方文档](https://huggingface.co/docs/text-embeddings-inference/en/quick_tour)。

## 创建一个 TEI Ranker 函数{#create-a-tei-ranker-function}

要在您的 Zilliz Cloud 应用程序中使用 TEI Ranker，请创建一个 Function（函数）对象，该对象指定重排序应如何操作。此函数将被传递给 Zilliz Cloud 搜索操作，以增强结果排序。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"  # Replace with your Milvus server URI
)

# Configure TEI Ranker
tei_ranker = Function(
    name="tei_semantic_ranker",            # Unique identifier for your ranker
    input_field_names=["document"],        # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,     # Must be RERANK for reranking functions
    params={
        "reranker": "model",               # Enables model-based reranking
        "provider": "tei",                 # Specifies TEI as the service provider
        "queries": ["renewable energy developments"],  # Query text for relevance evaluation
        "endpoint": "http://localhost:8080",  # Your TEI service URL
        "max_client_batch_size": 32,                    # Optional: batch size for processing (default: 32)
        "truncate": True,                # Optional: Truncate the inputs that are longer than the maximum supported size
        "truncation_direction": "Right",    # Optional: Direction to truncate the inputs
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

### TEI Ranker 特有参数{#tei-ranker-specific-parameters}

以下参数是 TEI Ranker 特有的：

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必选？</p></th>
     <th><p>描述</p></th>
     <th><p>值 / 示例</p></th>
   </tr>
   <tr>
     <td><p><code>reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为<code>"model"</code>才能启用模型重排序。</p></td>
     <td><p><code>"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重排序的模型服务提供商。</p></td>
     <td><p><code>"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code>queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重排模型用于计算相关性得分的查询字符串列表。查询字符串的数量必须与搜索操作中的查询数量完全匹配（即使使用查询向量而非文本），否则将报错。</p></td>
     <td><p><em>&#91;"search query"&#93;</em></p></td>
   </tr>
   <tr>
     <td><p><code>endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>您的 TEI 服务URL。</p></td>
     <td><p><code>"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>由于模型服务可能无法一次性处理所有数据，因此这设置了在多个请求中访问模型服务的批量大小。</p></td>
     <td><p><code>32</code> (默认)</p></td>
   </tr>
   <tr>
     <td><p><code>truncate</code></p></td>
     <td><p>否</p></td>
     <td><p>是否截断超过最大序列长度的输入。如果为 <code>False</code>，长输入将引发错误。</p></td>
     <td><p><code>True</code> or <code>False</code></p></td>
   </tr>
   <tr>
     <td><p><code>truncation_direction</code></p></td>
     <td><p>否</p></td>
     <td><p>输入过长时的截断方向：</p><ul><li><p><code>"Right"</code>（默认）：从序列末尾移除标记，直到达到最大支持大小。</p></li><li><p><code>"Left"</code>：从序列开头移除标记。</p></li></ul></td>
     <td><p><code>"Right"</code> or <code>"Left"</code></p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="注释">

<p>对于所有 Model Ranker 共享的通用参数（例如，<code>provider</code>、<code>queries</code>），请参考<a href="./model-ranker-overview#create-a-model-ranker">创建 Model Ranker</a>。</p>

</Admonition>

## 在标准向量搜索中使用{#apply-to-standard-vector-search}

将 TEI Ranker 应用于标准向量搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Execute search with vLLM reranking
results = client.search(
    collection_name="your_collection",
    data=["AI Research Progress", "What is AI"],  # Search queries
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=tei_ranker,                         # Apply tei reranking
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

TEI Ranker 也可与混合搜索结合使用，以融合稠密和稀疏搜索：

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

# Execute hybrid search with vLLM reranking
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=tei_ranker,                        # Apply tei reranking to combined results
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

