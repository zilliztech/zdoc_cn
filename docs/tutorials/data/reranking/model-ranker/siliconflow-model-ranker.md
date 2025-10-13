---
title: "硅基流动 Ranker | Cloud"
slug: /siliconflow-model-ranker
sidebar_label: "硅基流动 Ranker"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "硅基流动 Ranker 利用硅基流动的综合重排序模型，通过语义重排序来提高搜索相关性。它提供灵活的文档分块功能，并支持来自不同供应商的各种专业重排序模型。 | Cloud"
type: origin
token: FRwPwoZN4ieZeQkEog7cO3EHnMb
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - reranking
  - 重排
  - 搜索结果重排
  - 模型
  - siliconflow
  - 硅基流动

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 硅基流动 Ranker

硅基流动 Ranker 利用[硅基流动](https://www.siliconflow.com/)的综合重排序模型，通过语义重排序来提高搜索相关性。它提供灵活的文档分块功能，并支持来自不同供应商的各种专业重排序模型。

硅基流动 Ranker对于需要以下条件的应用特别有价值：

- 高级文档分块，具备可配置的重叠部分，用于处理长文档

- 可访问多种重排序模型，包括BAAI/bge重排序器系列和其他专业模型

- 基于灵活分块的评分机制，其中得分最高的分块代表文档得分

- 具有成本效益的重排序，支持标准和专业模型变体

## 前提条件{#prerequisites}

在 Zilliz Cloud 中实施硅基流动 Ranker 之前，请确保您具备以下条件：

- 一个 Zilliz Cloud 集合，其中包含一个 `VARCHAR` 字段，该字段包含待重排序的文本

- 一个可访问重排序模型的有效硅基流动 API 密钥。在[硅基流动平台](https://www.siliconflow.com/)注册以获取您的 API 凭证。您可以选择以下任一方式：

    - 设置 `SILICONFLOW_API_KEY` 环境变量，或者

    - 在 Ranker 配置中直接指定 API 密钥

## 创建一个硅基流动 Ranker 函数{#create-a-siliconflow-ranker-function}

要在您的 Zilliz Cloud 应用程序中使用硅基流动 Ranker，请创建一个 Function（函数）对象，该对象指定重排序应如何操作。此函数将被传递给 Zilliz Cloud 搜索操作，以增强结果排序。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"  # Replace with your Milvus server URI
)

# Configure SiliconFlow Ranker
siliconflow_ranker = Function(
    name="siliconflow_semantic_ranker",     # Unique identifier for your ranker
    input_field_names=["document"],         # VARCHAR field containing text to rerank
    function_type=FunctionType.RERANK,      # Must be RERANK for reranking functions
    params={
        "reranker": "model",                # Enables model-based reranking
        "provider": "siliconflow",          # Specifies SiliconFlow as the service provider
        "model_name": "BAAI/bge-reranker-v2-m3", # SiliconFlow reranking model to use
        "queries": ["renewable energy developments"], # Query text for relevance evaluation
        "max_client_batch_size": 128,       # Optional: batch size for model service requests (default: 128)
        "max_chunks_per_doc": 5,            # Optional: max chunks per document for supported models
        "overlap_tokens": 50,               # Optional: token overlap between chunks for supported models
        # "credential": "your-siliconflow-api-key" # Optional: if not set, uses SILICONFLOW_API_KEY env var
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

### 硅基流动 Ranker 特有参数{#siliconflow-ranker-specific-parameters}

以下参数特定于硅基流动 Ranker：

<table>
   <tr>
     <th><p><strong>参数</strong></p></th>
     <th><p><strong>必选？</strong></p></th>
     <th><p><strong>描述</strong></p></th>
     <th><p><strong>值/示例</strong></p></th>
   </tr>
   <tr>
     <td><p><code>reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为 <code>"model"</code> 以启用模型重新排序。</p></td>
     <td><p><code>"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code>provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重新排名的模型服务提供商。</p></td>
     <td><p><code>"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code>model_name</code></p></td>
     <td><p>是</p></td>
     <td><p>硅基流动平台上支持的模型中使用的硅基流动重新排序模型。</p><p>有关可用的重新排序模型列表，请参阅<a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">硅基流动文档</a>。</p></td>
     <td><p><code>"BAAI/bge-reranker-v2-m3"</code></p></td>
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
     <td><p>由于模型服务可能无法一次性处理所有数据，因此这里设置了在多次请求中访问模型服务的批量大小。</p></td>
     <td><p><code>128</code> (默认)</p></td>
   </tr>
   <tr>
     <td><p><code>max_chunks_per_doc</code></p></td>
     <td><p>否</p></td>
     <td><p>文档内部生成的最大块数。长文档会被分割成多个块进行计算，取各块中的最高分数作为文档的分数。仅特定模型支持：<code>BAAI/bge-reranker-v2-m3</code>、<code>Pro/BAAI/bge-reranker-v2-m3</code> 和 <code>netease-youdao/bce-reranker-base_v1</code>。</p></td>
     <td><p><code>5</code>, <code>10</code></p></td>
   </tr>
   <tr>
     <td><p><code>overlap_tokens</code></p></td>
     <td><p>否</p></td>
     <td><p>文档分块时相邻块之间的标记重叠数量。这确保了跨块边界的连续性，以便更好地进行语义理解。仅特定模型支持：<code>BAAI/bge-reranker-v2-m3</code>、<code>Pro/BAAI/bge-reranker-v2-m3</code> 和 <code>netease-youdao/bce-reranker-base_v1</code>。</p></td>
     <td><p><code>50</code></p></td>
   </tr>
   <tr>
     <td><p><code>credential</code></p></td>
     <td><p>否</p></td>
     <td><p>用于访问SiliconFlow API服务的认证凭证。如果未指定，系统将查找<code>SILICONFLOW_API_KEY</code> 环境变量。</p></td>
     <td><p><em>"your-siliconflow-api-key"</em></p></td>
   </tr>
</table>

**特定模型的功能支持**：`max_chunks_per_doc` 和 `overlap_tokens` 参数仅由特定模型支持。使用其他模型时，这些参数将被忽略。

<Admonition type="info" icon="📘" title="注释">

<p>对于所有 Model Ranker 共享的通用参数（例如，<code>provider</code>、<code>queries</code>），请参考<a href="./model-ranker-overview#create-a-model-ranker">创建 Model Ranker</a>。</p>

</Admonition>

## 在标准向量搜索中使用{#apply-to-standard-vector}

要将硅基流动 Ranker 应用于标准向量搜索：

```python
# Execute search with SiliconFlow reranking
results = client.search(
    collection_name="your_collection",
    data=["AI Research Progress", "What is AI"],  # Search queries
    anns_field="dense_vector",                   # Vector field to search
    limit=5,                                     # Number of results to return
    output_fields=["document"],                  # Include text field for reranking
    #  highlight-next-line
    ranker=siliconflow_ranker,                  # Apply SiliconFlow reranking
    consistency_level="Bounded"
)
```

## 在混合搜索中使用{#apply-to-hybrid-search}

硅基流动 Ranker 也可与混合搜索结合使用，以融合稠密和稀疏向量搜索：

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

# Execute hybrid search with SiliconFlow reranking
hybrid_results = client.hybrid_search(
    collection_name="your_collection",
    [dense_search, sparse_search],              # Multiple search requests
    #  highlight-next-line
    ranker=siliconflow_ranker,                 # Apply SiliconFlow reranking to combined results
    limit=5,                                   # Final number of results
    output_fields=["document"]
)
```

