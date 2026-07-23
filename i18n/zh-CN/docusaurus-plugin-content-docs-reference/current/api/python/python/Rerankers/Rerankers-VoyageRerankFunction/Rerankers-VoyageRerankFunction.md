---
title: "VoyageRerankFunction | Python"
slug: /python/python/Rerankers-VoyageRerankFunction
sidebar_label: "VoyageRerankFunction"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "VoyageRerankFunction 是 milvusmodel 中的一个类，它以查询和文档作为输入，并直接返回相似度分数而不是 embeddings。此功能使用底层的 Voyage reranking model。 | Python"
type: docx
token: Smobd2lIho2yQPxtRhLcLcKznCf
sidebar_position: 1
keywords: 
  - llm 评估
  - Sparse 与 Dense
  - Dense vector
  - Hierarchical Navigable Small Worlds
  - zilliz
  - Zilliz Cloud
  - cloud
  - VoyageRerankFunction
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# VoyageRerankFunction

**VoyageRerankFunction** 是 [milvus_model](https://github.com/milvus-io/milvus-model) 中的一个类，它以查询和文档作为输入，并直接返回相似度分数而不是 embeddings。此功能使用底层的 Voyage reranking model。

```python
pymilvus.model.reranker.VoyageRerankFunction
```

## 构造函数\{#constructor}

构造一个适用于常见用例的 VoyageRerankFunction。

```python
VoyageRerankFunction(
    model_name: str = "rerank-lite-1",
    api_key: Optional[str] = None
)
```

**参数：**

- **model_name** (*string*)

    用于编码的 Voyage model 名称。你可以指定任意可用的 Voyage model 名称，例如 `voyage-law-2`、`voyage-code-2` 等。如果不指定此参数，将使用 `voyage-2`。有关可用 model 列表，请参阅 [Voyage 官方文档](https://docs.voyageai.com/docs/embeddings)。

- **api_key** (*string*)

    用于访问 Voyage API 的 API key。有关如何创建 API key 的信息，请参阅 [API Key 和 Python Client](https://docs.voyageai.com/docs/api-key-and-installation)。

## 示例\{#examples}

```python
from pymilvus.model.reranker import VoyageRerankFunction

# Define the rerank function
voyage_rf = VoyageRerankFunction(
    model_name="rerank-lite-1",  # Specify the model name. Defaults to `rerank-lite-1`.
    api_key=VOYAGE_API_KEY # Replace with your Voyage API key
)
```
