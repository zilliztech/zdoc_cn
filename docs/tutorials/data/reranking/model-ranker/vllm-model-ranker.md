---
title: "vLLM Ranker | Cloud"
slug: /vllm-model-ranker
sidebar_label: "vLLM Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "vLLM Ranker 利用 vLLM 推理框架，通过语义重排来提高搜索相关性。它代表了一种超越传统向量相似度的先进搜索结果排序方法。 | Cloud"
type: origin
token: DBAVwryV0iP9DekrpUHcAXbrnfe
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - 模型
  - vllm

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# vLLM Ranker

vLLM Ranker 利用 [vLLM](https://docs.vllm.ai/en/latest/index.html) 推理框架，通过语义重排来提高搜索相关性。它代表了一种超越传统向量相似度的先进搜索结果排序方法。

vLLM Ranker 在精度和上下文至关重要的应用场景中尤其有价值，例如：

- 技术文档搜索需要对概念有深入理解

- 语义关系比关键词匹配更重要的研究数据库

- 需要将用户问题与相关解决方案进行匹配的客户支持系统

- 必须理解产品属性和用户意图的电子商务搜索

## 前提条件{#prerequisites}

在 Zilliz Cloud 中实现 vLLM Ranker 之前，请确保您具备以下条件：

- 一个 Zilliz Cloud Collection，其中包含一个 `VARCHAR` 字段，该字段包含待重排序的文本

- 一个具备重排序功能的正在运行的 vLLM 服务。有关设置 vLLM 服务的详细说明，请参考 [vLLM 官方文档](https://docs.vllm.ai/en/latest/getting_started/installation.html)。要验证 vLLM 服务的可用性，可参考如下示例

    ```bash
    # Replace YOUR_VLLM_ENDPOINT_URL with the actual URL (e.g., http://<service-ip>:<port>/v1/rerank)
    # Replace 'BAAI/bge-reranker-base' if you deployed a different model
    
    curl -X 'POST' \
      'YOUR_VLLM_ENDPOINT_URL' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
      "model": "BAAI/bge-reranker-base",
      "query": "What is the capital of France?",
      "documents": [
        "The capital of Brazil is Brasilia.",
        "The capital of France is Paris.",
        "Horses and cows are both animals"
      ]
    }'
    ```

    成功的响应应返回按相关性分数排序的文档，类似于OpenAI重排API响应。

    有关更多服务器参数和选项，请参考 [vLLM OpenAI兼容服务器相关文档](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api)。

## 创建一个 vLLM Ranker 函数{#create-a-vllm-ranker-function}

要在您的 Zilliz Cloud 应用程序中使用 vLLM Ranker，请创建一个 Function（函数）对象，该对象指定重排序应如何操作。此函数将被传递给 Zilliz Cloud 搜索请求，以增强结果排序。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"  # Replace with your Milvus server URI
)

# Create a vLLM Ranker function
vllm_ranker = Function(
    name="vllm_semantic_ranker",    # Choose a descriptive name
    input_field_names=["document"],  # Field containing text to rerank
    function_type=FunctionType.RERANK,  # Must be RERANK
    params={
        "reranker": "model",        # Specifies model-based reranking
        "provider": "vllm",         # Specifies vLLM service
        "queries": ["renewable energy developments"],  # Query text
        "endpoint": "http://localhost:8080",  # vLLM service address
        "max_client_batch_size": 32,              # Optional: batch size
        "truncate_prompt_tokens": 256,  # Optional: Use last 256 tokens
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

### vLLM Ranker 特有参数{#vllm-ranker-specific-parameters}

以下参数是 vLLM Ranker 特有的：

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
     <td><p><code>"vllm"</code></p></td>
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
     <td><p>您的vLLM服务地址。</p></td>
     <td><p><code>"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>由于模型服务可能无法一次性处理所有数据，因此这里设置了在多次请求中访问模型服务的批量大小。</p></td>
     <td><p><code>32</code> (默认)</p></td>
   </tr>
   <tr>
     <td><p><code>truncate_prompt_tokens</code></p></td>
     <td><p>否</p></td>
     <td><p>如果设置为整数<em>k</em>，则仅使用提示中的最后<em>k</em>个词元（即左截断）。默认为None（即不进行截断）。</p></td>
     <td><p><code>256</code></p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="注释">

<p>对于所有 Model Ranker 共享的通用参数（例如，<code>provider</code>、<code>queries</code>），请参考<a href="./model-ranker-overview#create-a-model-ranker">创建 Model Ranker</a>。</p>

</Admonition>

## 在标准向量搜索中使用{#apply-to-standard-vector-search}

要将 vLLM Ranker 应用于标准向量搜索：

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
    ranker=vllm_ranker,                         # Apply vLLM reranking
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

## 应用于混合搜索{#apply-to-hybrid-search}

vLLM Ranker 也可与混合搜索结合使用，以融合稠密和稀疏搜索：

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
    ranker=vllm_ranker,                        # Apply vLLM reranking to combined results
    #  highlight-next-line
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

