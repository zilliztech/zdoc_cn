---
title: "Model Ranker 概述 | BYOC"
slug: /model-ranker-overview
sidebar_label: "Model Ranker 概述"
beta: PUBLIC
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "传统向量搜索仅依据数学相似度对结果进行排序，即向量在高维空间中的匹配程度。虽然这种方法效率高，但往往会忽略真正的语义相关性。以搜索\"数据库优化的最佳实践\"为例：你可能会收到向量相似度很高、频繁提及这些术语的文档，但实际上并没有提供可操作的优化策略。 | BYOC"
type: origin
token: Qg3TwiPvCiaXolk8ZDgc4y9YnPb
sidebar_position: 1
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
  - tei
  - cohere
  - voyage ai
  - siliconflow
  - 概述

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Model Ranker 概述

传统向量搜索仅依据数学相似度对结果进行排序，即向量在高维空间中的匹配程度。虽然这种方法效率高，但往往会忽略真正的语义相关性。以搜索**"数据库优化的最佳实践"**为例：你可能会收到向量相似度很高、频繁提及这些术语的文档，但实际上并没有提供可操作的优化策略。

Model Ranker 通过集成能够理解查询与文档之间语义关系的先进语言模型，优化 Zilliz Cloud 搜索体验。使其不仅仅依赖向量相似度，还会评估内容含义和上下文，以提供更智能、更相关的结果。

## 限制{#limits}

- Model Ranker 不能用于 Grouping Search。

- 用于模型重排序的字段必须为文本类型（`VARCHAR`）。

- 每个 Model Ranker 一次只能使用一个 `VARCHAR` 字段进行评估。

## 工作原理{#how-it-works}

Model Ranker 通过明确定义的工作流程将语言模型的理解能力集成到 Zilliz Cloud 搜索过程中：

![CvhBww1APhHuEPbs9qSck1j1n2b](/img/CvhBww1APhHuEPbs9qSck1j1n2b.png)

1. **初始查询**：您的应用程序向 Zilliz Cloud 发送查询

1. **向量搜索**：Zilliz Cloud 执行标准向量搜索以识别候选文档

1. **候选文档检索**：系统基于向量相似度识别初始候选文档集

1. **模型评估**：Model Ranker 函数处理查询-文档对：

    - 将原始查询和候选文档发送到外部模型服务

    - 语言模型评估查询与每个文档之间的语义相关性

    - 每个文档都会根据语义理解获得一个相关性得分

1. **智能重排序**：根据模型生成的相关性得分对文档进行重新排序

1. **增强结果**：您的应用程序接收到的结果是按语义相关性而非仅按向量相似度排序的

## 根据您的需求选择一个模型提供商{#choose-a-model-provider-for-your-needs}

Zilliz Cloud 支持以下用于重排序的模型服务提供商，每个提供商都有不同的特点：

<table>
   <tr>
     <th><p>vLLM</p></th>
     <th><p>最适合</p></th>
     <th><p>特性</p></th>
     <th><p>示例用例</p></th>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>需要深入语义理解和定制的复杂应用程序</p></td>
     <td><ul><li><p>支持多种大语言模型</p></li><li><p>灵活的部署选项</p></li><li><p>更高的计算要求</p></li><li><p>更大的定制潜力</p></li></ul></td>
     <td><p>法律研究平台，部署特定领域模型，以理解法律术语和判例法关系</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>快速实施且资源使用高效</p></td>
     <td><ul><li><p>专为文本操作优化的轻量级服务</p></li><li><p>更易于部署，资源需求更低</p></li><li><p>预优化重排序模型</p></li><li><p>最小的基础设施开销</p></li></ul></td>
     <td><p>内容管理系统需要具备高效的重排序能力，并满足标准要求</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>优先考虑可靠性和集成便利性的企业应用程序</p></td>
     <td><ul><li><p>企业级可靠性和可扩展性</p></li><li><p>无需基础设施维护的托管服务</p></li><li><p>多语言重排序功能</p></li><li><p>内置速率限制和错误处理</p></li></ul></td>
     <td><p>需要具备高可用性搜索、一致的 API 性能和多语言产品目录的电子商务平台</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>具有特定性能和上下文要求的RAG应用程序</p></td>
     <td><ul><li><p>专门为重排序任务训练的模型</p></li><li><p>针对不同文档长度的粒度截断控制</p></li><li><p>针对生产工作负载的优化推理</p></li><li><p>多种模型变体（rerank-2、rerank-lite等）</p></li></ul></td>
     <td><p>研究数据库，文档长度各异，需要微调性能控制和专业语义理解</p></td>
   </tr>
   <tr>
     <td><p>硅基流动</p></td>
     <td><p>以成本效益为优先处理长文档的应用程序</p></td>
     <td><ul><li><p>高级文档分块，重叠部分可配置</p></li><li><p>基于块的评分（得分最高的块代表文档）</p></li><li><p>支持多种重排序模型</p></li><li><p>具有标准和专业型号变体，性价比高</p></li></ul></td>
     <td><p>技术文档搜索系统处理冗长的手册和论文，需要智能分段和重叠控制</p></td>
   </tr>
</table>

有关每个模型服务实施的详细信息，请参考专门的章节：

- [vLLM Ranker](./vllm-model-ranker)

- [TEI Ranker](./tei-model-ranker)

- [Cohere Ranker](./cohere-model-ranker)

- [Voyage AI Ranker](./voyage-ai-model-ranker)

- [硅基流动 Ranker](./siliconflow-model-ranker)

## 实施{#implementation}

在实施 Model Ranker 之前，请确保您已具备：

- 一个 Zilliz Cloud Collection，其中包含一个 `VARCHAR` 字段，该字段包含待重排序的文本

- 一个可被您的 Zilliz Cloud 集群 访问的正在运行的外部模型服务

- Zilliz Cloud 与您选择的模型服务之间的适当网络连接

Model Ranker 可与标准向量搜索和混合搜索操作无缝集成。实现过程包括创建一个定义重排序配置的函数对象，并将其传递给搜索操作。

### 创建 Model Ranker{#create-a-model-ranker}

要实现 Model Ranker，首先要使用适当的配置定义一个 Function（函数）对象。在这个例子中，我们使用 TEI 作为服务提供商：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, Function, FunctionType

# Connect to your Milvus server
client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT"  # Replace with your Milvus server URI
)

# Create a model ranker function
model_ranker = Function(
    name="semantic_ranker",  # Function identifier
    input_field_names=["document"],  # VARCHAR field to use for reranking
    function_type=FunctionType.RERANK,  # Must be set to RERANK
    params={
        "reranker": "model",  # Specify model reranker. Must be "model"
        "provider": "tei",  # Choose provider: "tei", "vllm", etc.
        "queries": ["machine learning for time series"],  # Query text
        "endpoint": "http://model-service:8080",  # Model service endpoint
        # "maxBatch": 32  # Optional: batch size for processing
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

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>必选？</p></th>
     <th><p>描述</p></th>
     <th><p>值 / 示例</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>是</p></td>
     <td><p>执行搜索时使用的函数标识符。</p></td>
     <td><p><code>"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code>input_field_names</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重新排序的文本字段名称。</p><p>必须是 <code>VARCHAR</code> 类型的字段。</p></td>
     <td><p><code>&#91;"document"&#93;</code></p></td>
   </tr>
   <tr>
     <td><p><code>function_type</code></p></td>
     <td><p>是</p></td>
     <td><p>指定当前创建的函数类型。</p><p>所有 Model Ranker 都必须设置为 <code>RERANK</code>。</p></td>
     <td><p><code>FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code>params</code></p></td>
     <td><p>是</p></td>
     <td><p>一个包含基于模型的重排序函数配置的字典。可用的参数（键）因服务提供商而异。</p></td>
     <td><p><code>&#123;...&#125;</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.reranker</code></p></td>
     <td><p>是</p></td>
     <td><p>必须设置为 <code>"model"</code> 才能启用模型重排序。</p></td>
     <td><p><code>"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.provider</code></p></td>
     <td><p>是</p></td>
     <td><p>用于重排序的模型服务提供商。</p></td>
     <td><p><code>"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.queries</code></p></td>
     <td><p>是</p></td>
     <td><p>重排序模型用于计算相关性得分的查询字符串列表。</p><p>查询字符串的数量必须与搜索操作中的查询数量完全匹配（即使使用查询向量而非文本），否则将报错。</p></td>
     <td><p><code>&#91;"search query"&#93;</code></p></td>
   </tr>
   <tr>
     <td><p><code>params.endpoint</code></p></td>
     <td><p>是</p></td>
     <td><p>模型服务的 URL。</p></td>
     <td><p><code>"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code>max_client_batch_size</code></p></td>
     <td><p>否</p></td>
     <td><p>单个批次中要处理的最大文档数。较大的值可提高吞吐量，但需要更多内存。</p></td>
     <td><p><code>32</code> (默认)</p></td>
   </tr>
</table>

### 在标准向量搜索中使用{#apply-to-standard-vector-search}

定义 Model Ranker 后，您可以在搜索请求中将其传递给 `ranker` 参数来应用它：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Use the model ranker in standard vector search
results = client.search(
    collection_name,
    data=["machine learning for time series"], # Number of queries must match that specified in model_ranker.params["queries"] 
    anns_field="vector_field",
    limit=10,
    output_fields=["document"],  # Include the text field in outputs
    #  highlight-next-line
    ranker=model_ranker,  # Apply the model ranker here
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

### 在混合搜索中使用{#apply-to-hybrid-search}

Model Ranker 也可应用于结合多个向量字段的混合搜索操作：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import AnnSearchRequest

# Define search requests for different vector fields
dense_request = AnnSearchRequest(
    data=["machine learning for time series"],
    anns_field="dense_vector",
    param={},
    limit=20
)

sparse_request = AnnSearchRequest(
    data=["machine learning for time series"],
    anns_field="sparse_vector",
    param={},
    limit=20
)

# Apply model ranker to hybrid search
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
    #  highlight-next-line
    ranker=model_ranker,  # Same model ranker works with hybrid search
    limit=10,
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

