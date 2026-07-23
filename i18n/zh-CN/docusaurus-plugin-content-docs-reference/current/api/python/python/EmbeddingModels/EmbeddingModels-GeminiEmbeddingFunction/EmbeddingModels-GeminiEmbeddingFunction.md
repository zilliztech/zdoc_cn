---
title: "GeminiEmbeddingFunction | Python"
slug: /python/python/EmbeddingModels-GeminiEmbeddingFunction
sidebar_label: "GeminiEmbeddingFunction"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "Model2VecEmbeddingFunction 是 pymilvus 中的一个类，它使用 GeminiEmbeddingFunction 模块将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。 | Python"
type: docx
token: DhZRdYbfMoYIBtxrudGcwWjrngd
sidebar_position: 3
keywords: 
  - Faiss
  - 视频搜索
  - AI 幻觉
  - AI Agent
  - Zilliz
  - Zilliz Cloud
  - cloud
  - GeminiEmbeddingFunction
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# GeminiEmbeddingFunction

**[Model2VecEmbeddingFunction](./EmbeddingModels-Model2VecEmbeddingFunction)** 是 pymilvus 中的一个类，它使用 GeminiEmbeddingFunction 模块将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。

```python
pymilvus.model.dense.GeminiEmbeddingFunction
```

## 构造函数\{#constructor}

构造一个适用于常见用例的 GeminiEmbeddingFunction。

```python
GeminiEmbeddingFunction(
    model_name: str = "gemini-embedding-exp-03-07",
    api_key: Optional[str] = None,
    config: Optional['types.EmbedContentConfig']=None,
    **kwargs,
)
```

**参数：**

- **model_name (string) -**

    用于编码的 Gemini 模型名称。有效选项包括 **gemini-embedding-exp-03-07**（默认）、**models/embedding-001** 和 **models/text-embedding-004**。

- **api_key (*string*)-**

用于访问 Gemini API 的 API key。

- **config** **(*types.EmbedContentConfig*) -**

    embedding 模型的可选配置。

    - **output_dimensionality** 可指定为生成的输出 embeddings 的数量。

        | **模型名称** | **维度** |
        | --- | --- |
        | emini-embedding-exp-03-07 | 3072（*默认*）,1536,768 |
        | models/embedding-001 | 768 |
        | models/text-embedding-004 | 768 |

    - **task_type** 可指定用于为特定任务生成优化的 embeddings，从而节省时间和成本并提升性能。仅在 **gemini-embedding-exp-03-07** 模型中支持。

        | 任务类型 | 描述 |
        | --- | --- |
        | SEMANTIC_SIMILARITY | 用于生成经过优化、可评估文本相似度的 embeddings。 |
        | CLASSIFICATION | 用于生成经过优化、可根据预设标签对文本进行分类的 embeddings。 |
        | CLUSTERING | 用于生成经过优化、可基于文本相似性对文本进行聚类的 embeddings。 |
        | RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING, and FACT_VERIFICATION | 用于生成针对文档搜索或信息检索优化的 embeddings。 |
        | CODE_RETRIEVAL_QUERY | 用于根据自然语言查询检索代码块，例如对数组排序或反转链表。代码块的 embeddings 使用 RETRIEVAL_DOCUMENT 计算。 |

## 示例\{#examples}

```python
from pymilvus import model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name="gemini-embedding-exp-03-07",
    api_key="YOUR_API_KEY",
)
```

