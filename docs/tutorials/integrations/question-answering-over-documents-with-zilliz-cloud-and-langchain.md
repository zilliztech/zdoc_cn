---
slug: /question-answering-over-documents-with-zilliz-cloud-and-langchain
beta: FALSE
notebook: FALSE
type: origin
token: Msbqwd1izicbFlkT56scmGlWnbb
sidebar_position: 4
---

import Admonition from '@theme/Admonition';


# 与 LangChain 集成搭建智能文档问答系统

本文将演示如何使用 Zilliz Cloud 和 LangChain 搭建基于大语言模型（LLM）的问答系统。在本例中，我们将使用一个 1 CU 的 Cluster，还将使用 OpenAI 的 Embedding API 来获取指定文本的向量表示。现在就让我们开始吧。

## 准备工作{#before-you-start}

运行本页中的脚本需要 **pymilvus** 和 **langchain**。另外，我们还需要使用 OpenAI 的 Embedding API 来获取指定文本的向量表示并将其存入向量数据库中，所以还需要安装 openai 和 tiktoken。如果你的系统中还没有安装这些依赖，可以运行如下命令。

```shell
python -m pip install --upgrade pymilvus langchain openai tiktoken
```

## 主要参数{#parameters}

在这一小节里，我们需要为本页中的脚本设置一些公共参数。请根据需要将它们的值修改成自己的。

```python
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.zilliz import Zilliz
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.schema.runnable import RunnablePassthrough
from langchain.prompts import PromptTemplate

import os

# 1. Set up the name of the collection to be created.
COLLECTION_NAME = 'doc_qa_db'

# 2. Set up the dimension of the embeddings.
DIMENSION = 768

# 3. Set up the cohere api key
OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# 4. Set up the connection parameters for your Zilliz Cloud cluster.
URI = 'YOUR_CLUSTER_ENDPOINT'

# 5. Set up the token for your Zilliz Cloud cluster.
# You can either use an API key or a set of cluster username and password joined by a colon.
TOKEN = 'YOUR_CLUSTER_TOKEN'
```

## 准备数据{#prepare-data}

在开始前，需要完成如下步骤

- 准备好需要让大语言模型在推理过程中参考的文档。

- 搭建好一个 Embedding 模型将该文档转换成对应的向量表示。

- 搭建好一个向量数据库来保存这些向量表示。

```python
# Use the WebBaseLoader to load specified web pages into documents
loader = WebBaseLoader([
    'https://milvus.io/docs/overview.md',
    'https://milvus.io/docs/release_notes.md',
    'https://milvus.io/docs/architecture_overview.md',
    'https://milvus.io/docs/four_layers.md',
    'https://milvus.io/docs/main_components.md',
    'https://milvus.io/docs/data_processing.md',
    'https://milvus.io/docs/bitset.md',
    'https://milvus.io/docs/boolean.md',
    'https://milvus.io/docs/consistency.md',
    'https://milvus.io/docs/coordinator_ha.md',
    'https://milvus.io/docs/replica.md',
    'https://milvus.io/docs/knowhere.md',
    'https://milvus.io/docs/schema.md',
    'https://milvus.io/docs/dynamic_schema.md',
    'https://milvus.io/docs/json_data_type.md',
    'https://milvus.io/docs/metric.md',
    'https://milvus.io/docs/partition_key.md',
    'https://milvus.io/docs/multi_tenancy.md',
    'https://milvus.io/docs/timestamp.md',
    'https://milvus.io/docs/users_and_roles.md',
    'https://milvus.io/docs/index.md',
    'https://milvus.io/docs/disk_index.md',
    'https://milvus.io/docs/scalar_index.md',
    'https://milvus.io/docs/performance_faq.md',
    'https://milvus.io/docs/product_faq.md',
    'https://milvus.io/docs/operational_faq.md',
    'https://milvus.io/docs/troubleshooting.md',
])

docs = loader.load()

# Split the documents into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=0)
all_splits = text_splitter.split_documents(docs)
```

在准备好数据后，下一步就是将它们转换成对应的向量表示，并将它们存储在指定的向量数据库中。

```python
embeddings = OpenAIEmbeddings()
connection_args = { 'uri': URI, 'token': TOKEN }

vector_store = Zilliz(
    embedding_function=embeddings, 
    connection_args=connection_args,
    collection_name=COLLECTION_NAME,
    drop_old=True,
).from_documents(
    all_splits,
    embedding=embeddings,
    collection_name=COLLECTION_NAME,
    connection_args=connection_args,
)
```

接下来，我们就可以使用如下代码进行相似性搜索了。搜索结果将会是文档中与提问最相关的文本内容。

```python
query = "What are the main components of Milvus?"
docs = vector_store.similarity_search(query)

print(len(docs))
```

返回的结果应与如下代码类似。

```shell
4
```

## 开始提问{#ask-your-question}

在准备好文档后，我们可以创建一条 Stuff 链将文档包含在一个提示词中并将该提示词喂给大语言模型。这样大语言模型就可以在回答我们的提问时参考文档中的内容。

下面的脚本会以OpenAI为目标大语言模型创建一条 RAG 链。该链将使用 OpenAI 为大语言模型，

```python
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0) 
retriever = vector_store.as_retriever()

template = """Use the following pieces of context to answer the question at the end. 
If you don't know the answer, just say that you don't know, don't try to make up an answer. 
Use three sentences maximum and keep the answer as concise as possible. 
Always say "thanks for asking!" at the end of the answer. 
{context}
Question: {question}
Helpful Answer:"""
rag_prompt = PromptTemplate.from_template(template)

rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | rag_prompt
    | llm
)

print(rag_chain.invoke("Explain IVF_FLAT in Milvus."))
```

返回的结果包含了中间步骤（ `intermediate_steps` ）和输出文本 ( `output_text` )两个部分。前者用于表明在搜索过程中参考的文档，后者则是对用户提问的回答。

```shell
**# Output**
**#**
**# content='IVF_FLAT is an index mechanism in Milvus that divides a vector space into clusters. It compares the distances between a target vector and the centers of all clusters to find the nearest clusters. Then, it compares the distances between the target vector and the vectors in the selected clusters to find the nearest vectors. IVF_FLAT demonstrates performance advantages when the number of vectors exceeds the value of nlist. Thanks for asking!'**
```

