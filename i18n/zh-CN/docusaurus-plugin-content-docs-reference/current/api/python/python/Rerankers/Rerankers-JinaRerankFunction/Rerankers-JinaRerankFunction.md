---
title: "JinaRerankFunction | Python"
slug: /python/python/Rerankers-JinaRerankFunction
sidebar_label: "JinaRerankFunction"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "JinaRerankFunction 是 milvusmodel 中的一个类，它以 query 和 document 作为输入，并直接返回相似度分数而不是 embeddings。此功能使用底层的 Jina AI reranking model。 | Python"
type: docx
token: E3opdXwZCoY8igxMjQ1cwsTbnzh
sidebar_position: 1
keywords: 
  - LLM 评估
  - Sparse vs Dense
  - Dense vector
  - Hierarchical Navigable Small Worlds
  - zilliz
  - Zilliz Cloud
  - cloud
  - JinaRerankFunction
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# JinaRerankFunction

JinaRerankFunction 是 [milvus_model](https://github.com/milvus-io/milvus-model) 中的一个类，它以 query 和 document 作为输入，并直接返回相似度分数而不是 embeddings。此功能使用底层的 Jina AI reranking model。

```python
pymilvus.model.reranker.JinaRerankFunction
```

## 构造函数\{#constructor}

构造一个适用于常见用例的 JinaRerankFunction。

```python
JinaRerankFunction(
    model_name: str = "jina-reranker-v2-base-multilingual",
    api_key: Optional[str] = None
)
```

**参数：**

- **model_name** (*string*)

    用于编码的 Jina AI reranker model 的名称。如果不指定此参数，将使用 `jina-reranker-v2-base-multilingual`。有关可用模型列表，请参阅 [Jina AI Rerankers](https://jina.ai/reranker/)。

- **api_key** (*string*)

    用于访问 Jina AI API 的 API key。

## 示例\{#examples}

```python
from pymilvus.model.reranker import JinaRerankFunction

jina_rf = JinaRerankFunction(
    model_name="jina-reranker-v2-base-multilingual", # Defaults to `jina-reranker-v2-base-multilingual`
    api_key="YOUR_JINAAI_API_KEY"
)
```
