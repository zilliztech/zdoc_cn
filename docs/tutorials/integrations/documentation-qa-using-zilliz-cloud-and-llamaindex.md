---
slug: /documentation-qa-using-zilliz-cloud-and-llamaindex
beta: FALSE
notebook: FALSE
type: origin
token: BSKawjPvqiNAcgkGGIbct8L6nOd
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 相似性
  - llamaindex

---

import Admonition from '@theme/Admonition';


# 与 LlamaIndex 集成搭建文档问答系统

本文将演示如何与集成 LlamaIndex 从指定源获取信息。

在 ChatGPT 占领各大头条时，越来越多的企业在考虑如何在它们的产品中使用 ChatGPT。一个比较大的使用场景就是如何使用 ChatGPT 来改造产品文档孱弱的搜索能力。当前，如果用户希望了解如何使用一个产品，他们需要查看每个文档页面来找到他们需要的答案。如果使用 ChatGPT 来代替这个过程呢？如果 ChatGPT 可以帮助用户归纳所需的信息并回答用户可能会有的问题呢？这些都是让 LlamaIndex 可以和 Zilliz Cloud 集成的可能性。

简单来说，LlamaIndex 和 Zilliz Cloud 可以联手完成信息的提取与搜索。LlamaIndex 可以使用 OpenAI 的接口将不同的文档页面转换成对应的向量表示。之后，我们可以将这些向量表示及相关的文字和元数据存储到 Zilliz Cloud 上。如果用户希望提问，LlamaIndex 可以通过搜索存储在 Zilliz Cloud 上的数据获取最相近的答案，然后再使用 ChatGPT 对这些答案进行总结。

在本示例中，我们将使用 Milvus 的产品文档做为信息源来搭建一个文档问答系统。您需要在 Zilliz Cloud 上创建一个大小为 1 CU 的 Cluster。

现在让我们开始吧。

## 准备工作{#before-you-start}

在本例中，我们将使用 **pymilvus** 来连接 Zilliz Cloud，使用 **llama-index** 来处理数据及流水线相关的工作。同时，您还需要获取一个 OpenAI 的 API 密钥来生成向量。

```shell
pip install pymilvus llama-index
```

## 准备数据{#prepare-data}

我们将使用 **git** 来拉取 Milvus 的官方文档站。文档站中大部分的文档都是 markdown 格式的。

```shell
git clone https://github.com/milvus-io/milvus-docs
```

## 主要参数{#parameters}

本示例中使用的主要公共参数都在此处定义。请根据需求修改参数值。

```python
from os import environ

# 1. Set up the name of the collection to be created.
COLLECTION_NAME = 'document_qa_db'

# 2. Set up the dimension of the embeddings.
DIMENSION = 1536

# 3. Set the inference parameters
BATCH_SIZE = 128
TOP_K = 3

# 4. Set up the connection parameters for your Zilliz Cloud cluster.
URI = 'YOUR_CLUSTER_ENDPOINT'

TOKEN = 'YOUR_CLUSTER_TOKEN'

# OpenAI API key
environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"
environ["TOKENIZERS_PARALLELISM"] = "false"
```

## 处理数据{#consume-the-knowledge}

当我们完成数据下载后，就可以使用 LlamaIndex 来处理它们，并将处理后的数据上传到 Zilliz Cloud。具体来说，需要完成如下两步：

- 使用 Llama Hub 提供的 MarkdownReader 将所有 Markdown 页面转换成 LlamaIndex 文档对象。

    ```python
    from llama_index import download_loader
    from glob import glob
    
    # Load the markdown reader from the hub
    MarkdownReader = download_loader("MarkdownReader")
    markdownreader = MarkdownReader()
    
    # Grab all markdown files and convert them using the reader
    docs = []
    for file in glob("./milvus-docs/site/en/**/*.md", recursive=True):
        docs.extend(markdownreader.load_data(file=file))
    print(len(docs))
    ```

- 将这些文档对象存入 Zilliz Cloud。该步骤要求同时配置 Zilliz Cloud 和 OpenAI。

    ```python
    from llama_index import download_loader, VectorStoreIndex, ServiceContext
    from llama_index.vector_stores import MilvusVectorStore
    
    # Push all markdown files into Zilliz Cloud
    vector_store = MilvusVectorStore(
        uri=URI, 
        token=TOKEN, 
        collection_name=COLLECTION_NAME, 
        similarity_metric="L2",
        dim=DIMENSION,
    )
    
    embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L12-v2")
    service_context = ServiceContext.from_defaults(embed_model=embed_model)
    
    index = VectorStoreIndex.from_documents(
        documents=docs, 
        service_context=service_context,
        show_progress=True
    )
    ```

## 开始提问{#ask-question}

在把所有文档都存入 Zilliz Cloud 后，我们就可以开始提问了。所有提问都会触发在知识库范围内的相似性搜索，所有相关结果都会被用来生成问题的答案。

```python
query_engine = index.as_query_engine()
response = query_engine.query("What is IVF_FLAT?")
print(str(response))

# Output
#
# IVF_FLAT is an index used in Milvus that divides vector space into list clusters. It compares the distances between the target vector and the centroids of all the clusters to return the nearest clusters. Then, it compares the distances between the target vector and the vectors in the selected clusters to find the nearest vectors. IVF_FLAT has performance advantages over FLAT when the number of vectors exceeds a certain threshold.
```
