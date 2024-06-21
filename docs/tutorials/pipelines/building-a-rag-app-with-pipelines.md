---
slug: /building-a-rag-app-with-pipelines
beta: FALSE
notebook: FALSE
type: origin
token: QXATw7TzSiW32Ok7ihRcXYOInKd
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 使用 Pipelines 搭建 RAG 应用

Zilliz Cloud Pipelines 可以将文档、文本片段和图像等非结构化数据转换成可搜索的向量并存储在 [Collection](./cluster-collection-and-entities#collection) 中。本文将介绍 Zilliz Cloud Pipelines 的三种主要类型并提供示例代码，展示如何使用 Pipelines 搭建 RAG 应用。

## 了解 Pipelines{#understanding-pipelines}

当今，语义搜索广泛运用于众多服务和应用中，包括搜索和查询语义上相匹配的文本快、相似的图片等。通常此类检索系统都会处理数据，将数据转化为 Embedding 向量。换言之，检索系统会将文本或图像以多维空间中的向量来表示。构建此类检索系统需要深厚的专业知识和工程技术。但是，使用 Zilliz Cloud Pipelines，您可以通过简单易用的界面构建检索系统。当前，Zilliz Cloud Pipelines 支持对文本文档进行语义搜索——这也是检索增强生成（RAG）应用的基石。后续 Zilliz Cloud Pipelines 将推出更多类型的 Pipelines，从而满足更多的语义搜索场景，例如图片搜索、视频搜索、多模态搜索等。

### Ingestion pipeline{#ingestion-pipelines}

Ingestion pipeline 能够将非结构化数据转化为可搜索的 Embedding 向量，并将向量存储在 Zilliz Cloud 向量数据库中。

1 个 Ingestion pipeline 中可创建多个 Function，用于将输入字段通过转换器处理，生成输出字段。例如，您可以将文档作为输入，Function 会将这些文档自动切块并转换为 Embedding 向量或保留文档的一些元数据信息，以便后续进行向量搜索时过滤搜索结果。

<Admonition type="info" icon="📘" title="说明">

<p>在Zilliz Cloud 中，1 个 Ingestion pipeline 只对应 <strong>1 个向量数据库 Collection</strong>。</p>

</Admonition>

### Search pipeline{#search-pipelines}

Search pipeline 将查询语句（字符串）转换为 Embedding 向量，并在向量数据库中进行向量相似性搜索，从而获取Top-k 相似向量、对应的文档块和文档元数据。您可以使用 Search pipeline 实现语义搜索。1 个 Search pipeline 中仅可添加 1 种 Function。

### Deletion pipeline{#deletion-pipelines}

Deletion pipeline 从 Collection 中删除指定文档的所有文档块。1 个 Deletion pipeline 中仅可添加 1 种 Function。

## 示例：使用 Pipelines 搭建 RAG 应用{#example-building-a-rag-application-with-pipelines}

This [tutorial](https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/zilliz_pipeline_rag.ipynb) will demonstrate how to use Zilliz Cloud Pipelines to build a simple yet scalable [Retrieval Augmented Generation (RAG)](https://zilliz.com/use-cases/llm-retrieval-augmented-generation) application in Python. By providing a unified set of APIs, Zilliz Cloud Pipelines simplify the process of building an RAG application. You can skip the hassle of DevOps and accomplish everything with a simple API call. The figure below illustrates the main components of a basic RAG application.

![rag-application](/img/rag-application.png)

### 前提条件{#before-you-start}

- 您已[创建](./create-cluster)部署在阿里云（杭州）的 Zilliz Cloud 集群。

### 设置 Zilliz Cloud Pipelines{#set-up-zilliz-cloud-pipelines}

#### 获取集群信息{#obtain-cluster-information}

获取集群 ID、集群地域、API 密钥、项目 ID 等相关[信息](./on-zilliz-cloud-console)。

```bash
import os

CLOUD_REGION = 'ali-cn-hangzhou'
CLUSTER_ID = 'your CLUSTER_ID'
API_KEY = 'your API_KEY'
PROJECT_ID = 'your PROJECT_ID'
```

#### 创建 Ingestion Pipeline {#create-an-ingestion-pipeline}

Ingestion Pipeline 可以将非结构化数据转换为可搜索的 Embedding 向量并将其存储在 Zilliz Cloud 向量数据库中。在 Ingestion Pipeline 中，您可以通过选择 Function 来定义需要处理的非结构化数据类型。 

目前，Ingestion pipeline 中支持添加以下几种 Function：

- `INDEX_TEXT`: 可用于将文本转换为 Embedding 向量。该 Function 会将输入字段 `text_list` 映射为输出字段 `text` 和 `embedding`。

- `INDEX_DOC`: 可用于将文档切分为切片并将切片转换为 Embedding 向量。该 Function 会将输入字段 `doc_url` 映射为输出字段 `doc_name`、`chunk_id`、 `chunk_text` 和 `embedding`。

- `INDEX_IMAGE`: 可用于将图像转换为 Embedding 向量。该 Function 会将输入字段 `image_url` 和 `image_id` 映射为输出字段 `image_id` 和 `embedding`。

- `PRESERVE`: 可用于将额外的元数据信息（例如文档发布信息、标签、出版日期等）存储为标量字段。

本教程中，我们将创建 1 个 Ingestion Pipeline 并在其中添加 1 个 `INDEX_TEXT` Function 和 1 个 `PRESERVE` Function。在创建 Ingestion Pipeline 时将一同自动创建 1 个名称为 `my_text_collection` 的 Collection。该 Collection 的 Schema 中将包含 5 个字段：

- `id`：自动生成的主键

- `text` 和 `embedding`：`INDEX_TEXT` Function 中定义的输出字段。

- `title` ：`PRESERVE` Function 中定义的输出字段。

```bash
import requests

headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

create_pipeline_url = f"https://controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn/v1/pipelines"

collection_name = 'my_text_collection'
embedding_service = "zilliz/bge-base-en-v1.5"

data = {
    "name": "my_ingestion_pipeline",
    "description": "A pipeline that generates text embeddings and stores title information.",
    "type": "INGESTION",
    "projectId": PROJECT_ID,
    "clusterId": CLUSTER_ID,
    "collectionName": collection_name,
    "functions": [
        {
            "name": "index_my_text",
            "action": "INDEX_TEXT",
            "language": "ENGLISH",
            "embedding": embedding_service
        },
        {
            "name": "title_info",
            "action": "PRESERVE",
            "inputField": "title",
            "outputField": "title",
            "fieldType": "VarChar"
        }
    ]
}

response = requests.post(create_pipeline_url, headers=headers, json=data)
print(response.json())
ingestion_pipe_id = response.json()["data"]["pipelineId"]
```

Ingestion Pipeline 创建成功后将返回 Pipeline ID。在后续运行时，我们将使用到 Pipeline ID 信息。

#### 创建 Search Pipeline{#create-a-search-pipeline}

Search Pipeline 可将查询文本转化为 Embedding 向量并在数据库中检索 Top-K 个最相似向量，从而实现语义搜索。

目前，Search Pipeline 支持添加以下几种类型的 Function：

- `SEARCH_DOC_CHUNK`: 将用户查询转换为 Embedding 向量，搜索并返回知识库中与之最相关的文档切片 Entities。

- `SEARCH_TEXT`: 将用户查询转换为 Embedding 向量，搜索并返回知识库中与之最相似的文本 Entities。

- `SEARCH_IMAGE`: 将查询图像 URL 转换为 Embedding 向量，并返回知识库中与之最相似的图像 Entities。

本教程中，我们将添加 `SEARCH_TEXT` Function，用于检索文本数据。

```bash
data = {
    "projectId": PROJECT_ID,
    "name": "my_search_pipeline",
    "description": "A pipeline that receives text and search for semantically similar texts.",
    "type": "SEARCH",
    "functions": [
        {
            "name": "search_text_and_title",
            "action": "SEARCH_TEXT",
            "embedding": embedding_service,
            "reranker": "zilliz/bge-reranker-base", # optional, this will rerank search results by the reranker service
            "clusterId": CLUSTER_ID,
            "collectionName": collection_name,
        }
    ]
}

response = requests.post(create_pipeline_url, headers=headers, json=data)

print(response.json())
search_pipe_id = response.json()["data"]["pipelineId"]
```

同样，在 Search Pipeline 创建成功会会返回 Pipeline ID。 后续运行时，将使用该 Pipeline ID 信息。

#### 运行 Ingestion Pipeline{#run-ingestion-pipeline}

本教程中，我们将以博客文章《[What Milvus version to start with](https://milvus.io/blog/what-milvus-version-to-start-with.md)》为例。现在，我们需要摄取这篇博客文章的内容。

```bash
run_pipeline_url = f"https://controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn/v1/pipelines/{ingestion_pipe_id}/run"

milvus_lite_data = {
    "data":
        {
            "text_list": [
                "As the name suggests, Milvus Lite is a lightweight version that integrates seamlessly with Google Colab and Jupyter Notebook. It is packaged as a single binary with no additional dependencies, making it easy to install and run on your machine or embed in Python applications. Additionally, Milvus Lite includes a CLI-based Milvus standalone server, providing flexibility for running it directly on your machine. Whether you embed it within your Python code or utilize it as a standalone server is entirely up to your preference and specific application requirements.",
                "Milvus Lite is ideal for rapid prototyping and local development, offering support for quick setup and experimentation with small-scale datasets on your machine. However, its limitations become apparent when transitioning to production environments with larger datasets and more demanding infrastructure requirements. As such, while Milvus Lite is an excellent tool for initial exploration and testing, it may not be suitable for deploying applications in high-volume or production-ready settings.",
                "Milvus Lite is perfect for prototyping on your laptop."
            ],
            "title": 'Milvus Lite'
        }
}

milvus_standalone_data = {
    "data":
        {
            "text_list": [
                "Milvus Standalone is a mode of operation for the Milvus vector database system where it operates independently as a single instance without any clustering or distributed setup. Milvus runs on a single server or machine in this mode, providing functionalities such as indexing and searching for vectors. It is suitable for situations where the data and traffic volume scale is relatively small and does not require the distributed capabilities provided by a clustered setup.",
                "Milvus Standalone offers high performance and flexibility for conducting vector searches on your datasets, making it suitable for smaller-scale deployments, CI/CD, and offline deployments when you have no Kubernetes support."
            ],
            "title": 'Milvus Standalone'
        }
}

milvus_cluster_data = {
    "data":
        {
            "text_list": [
                "Milvus Cluster is a mode of operation for the Milvus vector database system where it operates and is distributed across multiple nodes or servers. In this mode, Milvus instances are clustered together to form a unified system that can handle larger volumes of data and higher traffic loads compared to a standalone setup. Milvus Cluster offers scalability, fault tolerance, and load balancing features, making it suitable for scenarios that need to handle big data and serve many concurrent queries efficiently.",
                "Milvus Cluster provides unparalleled availability, scalability, and cost optimization for enterprise-grade workloads, making it the preferred choice for large-scale, highly available production environments."
            ],
            "title": 'Milvus Cluster'
        }
}

for data in [milvus_lite_data, milvus_standalone_data, milvus_cluster_data]:
    response = requests.post(run_pipeline_url, headers=headers, json=data)
    print(response.json())
```

现在我们已经成功将文本片段和对应标题、Embedding 向量摄取到向量数据库中了。您可以通过 [Zilliz Cloud web 控制台](https://cloud.zilliz.com.cn/)预览该 Collection （`my_text_collection`）下的数据。

### 搭建 RAG 应用{#build-a-rag-application}

#### 运行 Search Pipeline{#run-search-pipeline}

```bash
import pprint

def retrieval_with_pipeline(question, search_pipe_id, top_k=2, verbose=False):
    run_pipeline_url = f"https://controller.api.{CLOUD_REGION}.cloud.zilliz.com.cn/v1/pipelines/{search_pipe_id}/run"

    data = {
        "data": {
            "query_text": question
        },
        "params": {
            "limit": top_k,
            "offset": 0,
            "outputFields": [
                "text",
                "title"
            ],
        }
    }
    response = requests.post(run_pipeline_url, headers=headers, json=data)
    if verbose:
        pprint.pprint(response.json())
    results = response.json()["data"]["result"]
    retrieved_texts = [{'text': result['text'], 'title': result['title']} for result in results]
    return retrieved_texts

question = 'Which Milvus should I choose if I want to use in the jupyter notebook with a small scale of data?'
retrieval_with_pipeline(question, search_pipe_id, top_k=2, verbose=True)
```

以下为输出结果。

```bash
{'code': 200,
 'data': {'result': [{'distance': 0.8722565174102783,
                      'id': 449431798276845977,
                      'text': 'As the name suggests, Milvus Lite is a '
                              'lightweight version that integrates seamlessly '
                              'with Google Colab and Jupyter Notebook. It is '
                              'packaged as a single binary with no additional '
                              'dependencies, making it easy to install and run '
                              'on your machine or embed in Python '
                              'applications. Additionally, Milvus Lite '
                              'includes a CLI-based Milvus standalone server, '
                              'providing flexibility for running it directly '
                              'on your machine. Whether you embed it within '
                              'your Python code or utilize it as a standalone '
                              'server is entirely up to your preference and '
                              'specific application requirements.',
                      'title': 'Milvus Lite'},
                     {'distance': 0.3541138172149658,
                      'id': 449431798276845978,
                      'text': 'Milvus Lite is ideal for rapid prototyping and '
                              'local development, offering support for quick '
                              'setup and experimentation with small-scale '
                              'datasets on your machine. However, its '
                              'limitations become apparent when transitioning '
                              'to production environments with larger datasets '
                              'and more demanding infrastructure requirements. '
                              'As such, while Milvus Lite is an excellent tool '
                              'for initial exploration and testing, it may not '
                              'be suitable for deploying applications in '
                              'high-volume or production-ready settings.',
                      'title': 'Milvus Lite'}],
          'token_usage': 34}}
Out[7]:
[{'text': 'As the name suggests, Milvus Lite is a lightweight version that integrates seamlessly with Google Colab and Jupyter Notebook. It is packaged as a single binary with no additional dependencies, making it easy to install and run on your machine or embed in Python applications. Additionally, Milvus Lite includes a CLI-based Milvus standalone server, providing flexibility for running it directly on your machine. Whether you embed it within your Python code or utilize it as a standalone server is entirely up to your preference and specific application requirements.',
  'title': 'Milvus Lite'},
 {'text': 'Milvus Lite is ideal for rapid prototyping and local development, offering support for quick setup and experimentation with small-scale datasets on your machine. However, its limitations become apparent when transitioning to production environments with larger datasets and more demanding infrastructure requirements. As such, while Milvus Lite is an excellent tool for initial exploration and testing, it may not be suitable for deploying applications in high-volume or production-ready settings.',
  'title': 'Milvus Lite'}]
```

向问答机器人提问并运行 Search Pipeline 后，可以获得 top-K 个最相似的文本切片，这些内容将构成我们 RAG 应用的基础知识库。

#### 搭建 RAG 问答机器人{#build-a-chatbot-powered-by-rag}

通过 `retrieval_with_pipeline` Function，我们可以检索向量数据库中的内容，并以此为基础搭建我们的 RAG 问答机器人。本教程中，我们将使用 OpenAI 的 `gpt-3.5-turb` 大语言模型。请在以下示例代码中使用您自己的 OpenAI  API 密钥。

```bash
import os
from openai import OpenAI

client = OpenAI()
client.api_key = os.getenv('OPENAI_API_KEY')  # your OpenAI API key

class Chatbot:
    def __init__(self, search_pipe_id):
        self._search_pipe_id = search_pipe_id

    def retrieve(self, query: str) -> list:
        """
        Retrieve relevant text with Zilliz Cloud Pipelines.
        """
        results = retrieval_with_pipeline(query, self._search_pipe_id, top_k=2)
        return results

    def generate_answer(self, query: str, context_str: list) -> str:
        """
        Generate answer based on context, which is from the result of Search pipeline run.
        """
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            temperature=0,
            messages=
            [
                {"role": "user",
                 "content":
                     f"We have provided context information below. \n"
                     f"---------------------\n"
                     f"\{context_str}"
                     f"\n---------------------\n"
                     f"Given this information, please answer the question: {query}"
                 }
            ]
        ).choices[0].message.content
        return completion

    def chat_with_rag(self, query: str) -> str:
        context_str = self.retrieve(query)
        completion = self.generate_answer(query, context_str)
        return completion

    def chat_without_rag(self, query: str) -> str:
        return client.chat.completions.create(
            model="gpt-3.5-turbo",
            temperature=0,
            messages=
            [
                {"role": "user",
                 "content": query
                 }
            ]
        ).choices[0].message.content

chatbot = Chatbot(search_pipe_id)
```

现在，我们已经成功搭建了 1 个 RAG 问答机器人。

#### 向问答机器人提问{#ask-the-chatbot-a-question} 

向问答机器人提问：“如果数据量较小，应该在 Jupyter Notebook 中使用哪个版本的 Milvus？”

```bash
question = 'Which Milvus should I choose if I want to use in the jupyter notebook with a small scale of data?'chatbot.chat_with_rag(question)
```

答案如下：

```bash
Based on the context provided, you should choose Milvus Lite if you want to use it in a Jupyter Notebook with a small scale of data. Milvus Lite is specifically designed for rapid prototyping and local development, offering support for quick setup and experimentation with small-scale datasets on your machine. It is lightweight, easy to install, and integrates seamlessly with Google Colab and Jupyter Notebook.
```

知识库中的原文如下：

```bash
As the name suggests, Milvus Lite is a lightweight version that integrates seamlessly with Google Colab and Jupyter Notebook. It is packaged as a single binary with no additional dependencies, making it easy to install and run on your machine or embed in Python applications. Additionally, Milvus Lite includes a CLI-based Milvus standalone server, providing flexibility for running it directly on your machine. Whether you embed it within your Python code or utilize it as a standalone server is entirely up to your preference and specific application requirements.
```

对比答案和原文，可以发现 RAG 问答机器人提供了十分准确的回答。

让我们再次提出同一个问题，但此次不使用 RAG 能力。

```bash
chatbot.chat_without_rag(question)
```

答案如下：

```bash
If you are working with a small scale of data in a Jupyter notebook, you may want to consider using Milvus CE (Community Edition). Milvus CE is a free and open-source vector database that is suitable for small-scale projects and experimentation. It is easy to set up and use in a Jupyter notebook environment, making it a good choice for beginners or those working with limited data. Additionally, Milvus CE offers a range of features and functionalities that can help you efficiently store and query your data in a vectorized format.
```

通过答案不难发现，如果不使用 RAG 能力，问答机器人旧会产生[幻觉](https://zilliz.com.cn/glossary/ai-%E5%B9%BB%E8%A7%89)。

### 总结{#conclusion} 

我们在本教程示例中成功搭建了一个 RAG 问答机器人。我们通过使用 Pipelines 为问答机器人注入了领域知识（domain knowledge），最终生成了准确的回答。

