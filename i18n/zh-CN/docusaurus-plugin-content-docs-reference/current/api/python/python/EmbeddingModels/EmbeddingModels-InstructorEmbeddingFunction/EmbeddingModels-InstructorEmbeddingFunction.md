---
title: "InstructorEmbeddingFunction | Python"
slug: /python/python/EmbeddingModels-InstructorEmbeddingFunction
sidebar_label: "InstructorEmbeddingFunction"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "InstructorEmbeddingFunction 是 pymilvus 中的一个类，它使用 Instructor embedding model 将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。 | Python"
type: docx
token: YmnmdEeHFoctZexccqNcr8xXn8c
sidebar_position: 3
keywords: 
  - 音频搜索
  - 什么是语义搜索
  - Embedding model
  - 图像相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - InstructorEmbeddingFunction
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# InstructorEmbeddingFunction

InstructorEmbeddingFunction 是 pymilvus 中的一个类，它使用 Instructor embedding model 将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。

```python
pymilvus.model.dense.InstructorEmbeddingFunction
```

## 构造函数\{#constructor}

构造一个 MistralAIEmbeddingFunction，用于常见使用场景。

```python
InstructorEmbeddingFunction(
    model_name: str = "hkunlp/instructor-xl",
    batch_size: int = 32,
    query_instruction: str = "Represent the question for retrieval:",
    doc_instruction: str = "Represent the document for retrieval:",
    device: str = "cpu",
    normalize_embeddings: bool = True,
    **kwargs
)
```

**参数：**

- **model_name** (*string*)

    要用于编码的 Mistral AI embedding model 名称。该值默认为 `hkunlp/instructor-xl`。更多信息，请参阅[模型列表](https://github.com/xlang-ai/instructor-embedding?tab=readme-ov-file#model-list)。

- **batch_size** (*int*)

    用于计算的批大小。它决定每个批次中一起处理的句子数量。

- **query_instruction** (*string*)

    特定于任务的指令，用于指导模型如何为查询或问题生成 embedding。

- **doc_instruction** (*string*)

    特定于任务的指令，用于指导模型为文档生成 embedding。

- **device** (*string*)

    指定用于计算的 torch.device。如果未指定，该函数将使用默认设备。

- **normalize_embeddings** (*bool*)

    如果设置为 `True`，返回的 vectors 长度将为 1，表示它们已归一化。在这种情况下，相似性搜索将使用更快的点积 (`util.dot_score`)，而不是余弦相似度。

- **kwargs**

    允许将额外的关键字参数传递给模型初始化。更多信息，请参阅 [instructor-embedding](https://github.com/xlang-ai/instructor-embedding?tab=readme-ov-file#the-encode-function)。

## 示例\{#examples}

```python
from pymilvus.model.dense import InstructorEmbeddingFunction

ef = InstructorEmbeddingFunction(
    model_name="hkunlp/instructor-xl", # Defaults to `hkunlp/instructor-xl`
    query_instruction="Represent the question for retrieval:",
    doc_instruction="Represent the document for retrieval:"
)
```
