---
title: "CohereEmbeddingFunction | Python"
slug: /python/python/EmbeddingModels-CohereEmbeddingFunction
sidebar_label: "CohereEmbeddingFunction"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "CohereEmbeddingFunction 是 pymilvus 中的一个类，它使用 Cohere embedding models 将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。 | Python"
type: docx
token: JzDLdkv3QoCY8OxKpBjc5zsmnId
sidebar_position: 1
keywords: 
  - 什么是 milvus
  - milvus 数据库
  - milvus lite
  - milvus benchmark
  - zilliz
  - zilliz cloud
  - cloud
  - CohereEmbeddingFunction
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# CohereEmbeddingFunction

CohereEmbeddingFunction 是 pymilvus 中的一个类，它使用 Cohere embedding models 将文本编码为 embeddings，以支持 Milvus 中的 embedding 检索。

```python
pymilvus.model.dense.CohereEmbeddingFunction
```

## 构造函数\{#constructor}

构造一个用于常见使用场景的 CohereEmbeddingFunction。

```python
CohereEmbeddingFunction(
    model_name: str = "embed-english-light-v3.0",
    api_key: Optional[str] = None,
    input_type: str = "search_document",
    embedding_types: Optional[List[str]] = None,
    truncate: Optional[str] = None,
    **kwargs
)
```

**参数：**

- **model_name** (*string*)

    用于编码的 Cohere embedding model 的名称。你可以指定任何可用的 Cohere embedding model 名称，例如 `embed-english-v3.0`、`embed-multilingual-v3.0` 等。如果不指定此参数，将使用 `embed-english-light-v3.0`。有关可用模型列表，请参阅 [Embed](https://docs.cohere.com/docs/models#embed)。

- **api_key** (*string*)

    用于访问 Cohere API 的 API key。

- **input_type** (*string*)

    传递给模型的输入类型。对于 v3 及更高版本的 embedding models，此参数为必需。

    - `"search_document"`：用于存储在 vector 数据库中以支持搜索用例的 embeddings。

    - `"search_query"`：用于针对 vector DB 运行搜索查询以查找相关文档的搜索查询 embeddings。

    - `"classification"`：用于传递给文本分类器的 embeddings。

    - `"clustering"`：用于通过聚类算法运行的 embeddings。

- **embedding_types** (*List[str]*)

    你希望返回的 embeddings 类型。非必需，默认值为 None，会返回 Embed Floats 响应类型。目前，你只能为此参数指定单个值。可能的值：

    - `"float"`：当你想要返回默认的 float embeddings 时使用。对所有模型有效。

    - `"binary"`：当你想要返回有符号 binary embeddings 时使用。仅对 v3 模型有效。

    - `"ubinary"`：当你想要返回无符号 binary embeddings 时使用。仅对 v3 模型有效。

- **truncate** (*string*)

    `NONE`|`START`|`END` 之一，用于指定 API 如何处理超过最大 token 长度的输入。

    传入 `START` 将丢弃输入的开头。`END` 将丢弃输入的结尾。在这两种情况下，都会丢弃输入，直到剩余输入正好等于该模型的最大输入 token 长度。

    如果选择 `NONE`，当输入超过最大输入 token 长度时将返回错误。

    默认值：`END`

- **kwargs**

    允许将其他关键字参数传递给模型初始化。有关更多信息，请参阅 [Embed](https://docs.cohere.com/reference/embed)。

## 示例\{#examples}

```python
from pymilvus.model.dense import CohereEmbeddingFunction

cohere_ef = CohereEmbeddingFunction(
    model_name="embed-english-light-v3.0",
    api_key="YOUR_COHERE_API_KEY",
    input_type="search_document",
    embedding_types=["float"]
)
```
