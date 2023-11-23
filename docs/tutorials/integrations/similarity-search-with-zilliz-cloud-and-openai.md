---
slug: /docs/similarity-search-with-zilliz-cloud-and-openai
beta: FALSE
notebook: 80_integrations_openai.ipynb
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 与 OpenAI 集成搭建相似性搜索系统

本文将讨论如何使用 OpenAI 的 Embedding API 与 Zilliz Cloud 搭建相似性搜索系统。

在本篇中你将看到如何使用 OpenAI 的 Embedding API 和 Zilliz Cloud 完成图书检索。当前，很多的图书检索方案，包括公共图书馆里使用的那些方案，都是使用关键词匹配的方式获取检索结果，并没有真正理解书名的含义。本文搭建的相似性搜索系统实现了基于语义的搜索能力。该方案将使用一个预训练模型来获取输入数据的向量化表示并根据这个表示进行相似性搜索来获取与输入数据在语义层面相似的结果。该方案可用于一系列基于文字的使用场景，包括匿名检测及文档搜索。

## 准备工作{#get-started}

首先，我们需要从 Open AI 网站获取一个 API 密钥。另外，如果你还没有一个向量数据库，可前往 Zilliz Cloud 创建一个免费的 Serverless Cluster 来完成本文中的示例。

你可以单击此处下载我们将在示例代码中使用的数据集。数据集的格式为 **CSV** ，我们可以使用如下代码加载该数据集。

```python
import csv
import json
import random
import openai
import time
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility

# Extract the book titles
def csv_load(file):
    with open(file, newline='') as f:
        reader=csv.reader(f, delimiter=',')
        for row in reader:
            yield row[1]
```

有了数据集，接下来我们就可以为其中的数据生成向量表征了。

## 检索图书{#searching-book-titles}

在这里，我们定义了一些示例中将要使用的主要参数。你需要根据实际情况和参数旁的注释填上相应的内容。

```python
FILE = '/content/books.csv'  # 可以从这里下载数据集 https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks and save it in the folder that holds your script.
COLLECTION_NAME = 'title_db'  # Collection 名称
DIMENSION = 1536  # 向量表示的维度
COUNT = 100  # 将插入的记录数量
URI='https://replace-this-with-the-public-endpoint-of-your-cluster-on-zilliz-cloud'  # 从 Zilliz Cloud 上获取的 Cluster 的公共端点
USER='replace-this-with-the-cluster-user-name'  # 在创建 Cluster 时指定的用户名
PASSWORD='replace-this-with-the-cluster-password'  # 在创建 Cluster 时指定的密码
OPENAI_ENGINE = 'text-embedding-ada-002'  # 待使用的预训练模型名称
openai.api_key = ''  # Open API 的 API 密钥
```

<Admonition type="info" icon="📘" title="Notes">

使用免费的 OpenAI 账号获取指定文字的向量化表征比较耗时。为此，我们在示例中使用了数据集的一个较小的子集，试图在脚本执行时间和检索精度间找到一个平衡点。你可以根据需要调整上述参数中的 **COUNT** 常量来改变子集的大小。

</Admonition>

接下来，我们将连接在 Zilliz Cloud 上创建好的 Serverless Cluster，在其中创建一个 Collection ，并为其创建索引文件。关于如何设置和使用 Zilliz Cloud, 可以参考[此文](./)。

```python
# 连接到 Zilliz Cloud
connections.connect(uri=URI, user=USER, password=PASSWORD, secure=True)

# 如果 Collection 已存在，先删除该 Collection
if utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

# 创建一个包含 id, title 和 embedding 三个字段的 Collection
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, descrition='Ids', is_primary=True, auto_id=False),
    FieldSchema(name='title', dtype=DataType.VARCHAR, description='Title texts', max_length=200),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, description='Embedding vectors', dim=DIMENSION)
]
schema = CollectionSchema(fields=fields, description='Title collection')
collection = Collection(name=COLLECTION_NAME, schema=schema)

# 为 Collection 创建索引文件
index_params = {
    'index_type': 'AUTOINDEX',
    'metric_type': 'L2',
    'params': {}
}
collection.create_index(field_name="embedding", index_params=index_params)
```

在完成上述任务后，我们可以开始向 Collection 中插入数据。插入数据包含三个步骤：读取数据，获取数据的向量化表示，将其插入已连接的 Cluster 的指定 Collection 中。

```python
# 使用 Open AI 获取指定文字的向量化表示
def embed(text):
    return openai.Embedding.create(
        input=text, 
        engine=OPENAI_ENGINE)["data"][0]["embedding"]

# 向 Collection 中插入图书标题及其向量化表示
for idx, text in enumerate(random.sample(sorted(csv_load(FILE)), k=COUNT)):  # Load COUNT amount of random values from dataset
    ins=[[idx], [(text[:198] + '..') if len(text) > 200 else text], [embed(text)]]  # Insert the title id, the title text, and the title embedding vector
    collection.insert(ins)
    time.sleep(3)  # Free OpenAI account limited to 60 RPM

# 加载数据到内存中以便开始搜索
collection.load()

# 根据输入的关键词进行相似性搜索
def search(text):
    # 设置检索参数
    search_params={
        "metric_type": "L2"
    }

    results=collection.search(
        data=[embed(text)],  # 获取输入关键词的向量化表示
        anns_field="embedding",  # 在 embedding 列进行搜索
        param=search_params,
        limit=5,  # 将输出结果数量限制为 5 个
        output_fields=['title']  # 要求输出结果中包含 title 列
    )

    ret=[]
    for hit in results[0]:
        row=[]
        row.extend([hit.id, hit.score, hit.entity.get('title')])  # 获取匹配结果的 id，距离和 title 字段
        ret.append(row)
    return ret

search_terms=['self-improvement', 'landscape']

for x in search_terms:
    print('Search term:', x)
    for result in search(x):
        print(result)
    print()
```

根据你设置的数量集的大小，搜索结果可能会有差异。

```python
Search term: self-improvement
[70, 0.34909766912460327, 'Life Management for Busy Woman: Growth and Study Guide']
[18, 0.4245884120464325, 'From Socrates to Sartre: The Philosophic Quest']
[63, 0.4264194667339325, 'Love']
[88, 0.44693559408187866, "The Innovator's Dilemma: The Revolutionary Book that Will Change the Way You Do Business"]
[29, 0.4684774875640869, 'The Thousandfold Thought (The Prince of Nothing  #3)']

Search term: landscape
[63, 0.34171175956726074, 'Love']
[48, 0.4100739061832428, 'Outlander']
[67, 0.41952890157699585, 'Ice Castles']
[98, 0.42765650153160095, 'The Long Walk']
[24, 0.43053609132766724, 'Notes from a Small Island']
```
