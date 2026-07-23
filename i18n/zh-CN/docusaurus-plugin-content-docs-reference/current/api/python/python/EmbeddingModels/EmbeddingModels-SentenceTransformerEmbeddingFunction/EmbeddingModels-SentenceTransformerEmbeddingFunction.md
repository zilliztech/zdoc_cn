---
title: "SentenceTransformerEmbeddingFunction | Python"
slug: /python/python/EmbeddingModels-SentenceTransformerEmbeddingFunction
sidebar_label: "SentenceTransformerEmbeddingFunction"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "SentenceTransformerEmbeddingFunction 是 pymilvus 中的一个类，它使用 Sentence Transformer 模型将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。 | Python"
type: docx
token: JOFedA4h8otTjHxsYQ7cnjsunHd
sidebar_position: 3
keywords: 
  - 嵌入模型
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - zilliz
  - zilliz cloud
  - cloud
  - SentenceTransformerEmbeddingFunction
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# SentenceTransformerEmbeddingFunction

**SentenceTransformerEmbeddingFunction** 是 pymilvus 中的一个类，它使用 Sentence Transformer 模型将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。

```python
pymilvus.model.dense.SentenceTransformerEmbeddingFunction
```

## 构造函数\{#constructor}

构造一个适用于常见用例的 SentenceTransformerEmbeddingFunction。

```python
SentenceTransformerEmbeddingFunction(
    model_name: str = "all-MiniLM-L6-v2",
    batch_size: int = 32,
    query_instruction: str = "",
    doc_instruction: str = "",
    device: str = "cpu",
    normalize_embeddings: bool = True,
    **kwargs
)
```

**参数：**

- **model_name** (*string*) -

    用于编码的 Sentence Transformer 模型名称。默认值为 **all-MiniLM-L6-v2**。你可以使用 Sentence Transformers 的任何预训练模型。有关可用模型列表，请参阅 [预训练模型](https://www.sbert.net/docs/pretrained_models.html)。

- **batch_size** (*int*) -

    用于计算的批量大小。

- **query_instruction** (*string*) -

    在查询文本前添加上下文指令，以提升特定模型的 embedding 质量（例如，"Represent the Wikipedia question for retrieving supporting documents:"）。

- **doc_instruction** (*string*) -

    在文档文本前添加上下文指令，以提升特定模型的 embedding 质量（例如，"Represent the Wikipedia document for retrieval:"）。

- **device** (*string*) -

    要使用的设备，**cpu** 表示 CPU，**cuda:n** 表示第 n 个 GPU 设备。

- **normalize_embeddings** (*bool*)

    是否将返回的 vectors 归一化为长度 1。在这种情况下，可以使用更快的点积（util.dot_score）而不是余弦相似度。

- **&ast;&ast;kwargs**

    允许将其他关键字参数传递给模型初始化。有关更多信息，请参阅 [SentenceTransformer](https://github.com/UKPLab/sentence-transformers/blob/master/sentence_transformers/SentenceTransformer.py)。

## 示例\{#examples}

```python
from pymilvus import model

sentence_transformer_ef = model.dense.SentenceTransformerEmbeddingFunction(
    model_name='all-MiniLM-L6-v2', # Specify the model name
    device='cpu' # Specify the device to use, e.g., 'cpu' or 'cuda:0'
)
```
