---
sidebar_position: 0
---

# 与 LangChain 集成搭建智能文档问答系统

本文将演示如何使用 Zilliz Cloud 和 LangChain 搭建基于大语言模型（LLM）的问答系统。在本例中，我们将使用一个 1 CU 的 Cluster，还将使用 OpenAI 的 Embedding API 来获取指定文本的向量表示。现在就让我们开始吧。

## 准备工作

运行本页中的脚本需要 **pymilvus** 和 **langchain**。另外，我们还需要使用 OpenAI 的 Embedding API 来获取指定文本的向量表示并将其存入向量数据库中，所以还需要安装 openai 和 tiktoken。如果你的系统中还没有安装这些依赖，可以运行如下命令。

```shell
python3 -m pip install --upgrade pymilvus langchain openai tiktoken
```

## 主要参数

在这一小节里，我们需要为本页中的脚本设置一些公共参数。请根据需要将它们的值修改成自己的。

```python
from os import environ

ZILLIZ_ENDPOINT = "https://<instance-id>.<cloud-region-id>.vectordb.zillizcloud.com:19535" # example: "in01-17f69c292d4a50a.aws-us-west-2.vectordb.zillizcloud.com"
ZILLIZ_USER = "db_admin" # cluster 用户名
ZILLIZ_PASS = "******" # 上述用户名对应的密码
OPENAI_API_KEY = "sk-******" # OpenAI API 密钥, 示例: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

## Set up environment variables
environ["OPENAI_API_KEY"] = OPENAI_API_KEY
```

## 准备数据

在开始前，需要完成如下步骤

- 准备好需要让大语言模型在推理过程中参考的文档。

- 搭建好一个 Embedding 模型将该文档转换成对应的向量表示。

- 搭建好一个向量数据库来保存这些向量表示。

```python
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Zilliz Cloud
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import CharacterTextSplitter

# 使用 WebBaseLoader 加载指定的页面
loader = WebBaseLoader([
    "https://milvus.io/docs/overview.md",
])

docs = loader.load()

# 使用文本分割器将文档分割成指定大小的块
text_splitter = CharacterTextSplitter(chunk_size=1024, chunk_overlap=0)
docs = text_splitter.split_documents(docs)
```

如果最终分割的块大小大于指定大小，会输出如下指示：

```shell
Created a chunk of size 1745, which is longer than the specified 1024
Created a chunk of size 1278, which is longer than the specified 1024
```

在准备好数据后，下一步就是将它们转换成对应的向量表示，并将它们存储在指定的向量数据库中。

```python
# 指定用来将文档转换成对应向量表示的 Embedding 模型
embeddings = OpenAIEmbeddings(model="ada")

# 创建一个向量数据库来保存文档的向量表示。这里我们使用 Zilliz Cloud 来创建该数据库
vector_store = Zilliz.from_documents(
    docs,
    embedding=embeddings,
    connection_args={"uri": ZILLIZ_ENDPOINT, "user": ZILLIZ_USER, "password": ZILLIZ_PASS, "secure": True}
)
```

接下来，我们就可以使用如下代码进行相似性搜索了。搜索结果将会是文档中与提问最相关的文本内容。

```python
query = "What is milvus?"
docs = vector_store.similarity_search(query)

print(docs)
```

返回的结果应与如下代码类似。

```shell
[Document(page_content='Milvus workflow.', metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'}), Document(page_content="Installat...rved.", metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'}), Document(page_content='Introduction ... Milvus is able to analyze the correlation between two vectors by calculating their similarity distance. If the two embedding vectors are very similar, it means that the original data sources are similar as well.', metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'}), Document(page_content="Key concepts\n...search algorithms are used to accelerate the searching process. If the two embedding vectors are very similar, it means that the original data sources are similar as well.\nWhy Milvus?", metadata={'source': 'https://milvus.io/docs/overview.md', 'title': 'Introduction Milvus documentation', 'description': 'Milvus is an open-source vector database designed specifically for AI application development, embeddings similarity search, and MLOps v2.2.x.', 'language': 'en'})]
```

## 开始提问

在准备好文档后，我们可以创建一条 Stuff 链将文档包含在一个提示词中并将该提示词喂给大语言模型。这样大语言模型就可以在回答我们的提问时参考文档中的内容。

> 📘 注意
>
> LangChain 提供了四种用于搭建指定源问答的链，它们分别是 Stuff 链，MapReduce 链，Refine 链 和 MapRerank 链。
> 简单来说，Stuff 链会将整个文档包含在提示词中。因此，它只适用于文档规模较小的场景。大多数大语言模型对一条提示词可以包含的符号数量有数量限制，因此建议使用其它三种链。然后我们就可以使用创建好的链将文档分割成合适大小的块并通过不同的方式将它们喂给大语言模型。想了解更多，可以参考 LangChain 文档里关于[索引链](https://docs.langchain.com/docs/components/chains/index_related_chains)的相关描述。

下面的脚本会以OpenAI为目标大语言模型创建一条MapReduce类型的链。

```python
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.llms import OpenAI

chain = load_qa_with_sources_chain(OpenAI(temperature=0), chain_type="map_reduce", return_intermediate_steps=True)
query = "When was milvus created?"
chain({"input_documents": docs, "question": query}, return_only_outputs=True)
```

返回的结果包含了中间步骤（ `intermediate_steps` ）和输出文本 ( `output_text` )两个部分。前者用于表明在搜索过程中参考的文档，后者则是对用户提问的回答。

```shell
{'intermediate_steps': [' No relevant text.',
  ' Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.',
  ' Milvus. 2023 All rights reserved.',
  ' None'],
 'output_text': ' Milvus was created in 2019.\nSOURCES: https://milvus.io/docs/overview.md'}
```

