---
slug: /similarity-search-with-zilliz-cloud-and-openai
beta: FALSE
notebook: FALSE
type: origin
token: PMHbwHT0HiOnvDk8sUocOy34nPw
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 与 OpenAI 集成搭建相似性搜索系统

本文将讨论如何使用 OpenAI 的 Embedding API 与 Zilliz Cloud 搭建相似性搜索系统。

在本篇中你将看到如何使用 OpenAI 的 Embedding API 和 Zilliz Cloud 完成图书检索。当前，很多的图书检索方案，包括公共图书馆里使用的那些方案，都是使用关键词匹配的方式获取检索结果，并没有真正理解书名的含义。本文搭建的相似性搜索系统实现了基于语义的搜索能力。该方案将使用一个预训练模型来获取输入数据的向量化表示并根据这个表示进行相似性搜索来获取与输入数据在语义层面相似的结果。该方案可用于一系列基于文字的使用场景，包括匿名检测及文档搜索。

## 准备工作{#get-started}

首先，我们需要从 Open AI 网站获取一个 API 密钥。另外，如果你还没有一个向量数据库，可前往 Zilliz Cloud 使用您的免费额度创建一个免费的集群来完成本文中的示例。

你可以单击此处下载我们将在示例代码中使用的数据集。数据集的格式为 __CSV__ ，我们可以使用如下代码加载该数据集。

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
# 1. Go to https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks, download the dataset, and save it locally.
FILE = '../books.csv'

# 2. Set up the name of the collection to be created.
COLLECTION_NAME = 'title_db'

# 3. Set up the dimension of the embeddings.
DIMENSION = 1536

# 4. Set up the number of records to process.
COUNT = 100

# 5. Set up the connection parameters for your Zilliz Cloud cluster.
URI = 'YOUR_CLUSTER_ENDPOINT'
TOKEN = 'YOUR_CLUSTER_TOKEN'

# 6. Set up the OpenAI engine and API key to use.
OPENAI_ENGINE = 'text-embedding-ada-002'  # Which engine to use
openai.api_key = 'YOUR_OPENAI_API_KEY'  # Use your own Open AI API Key here
```

<Admonition type="info" icon="📘" title="Notes">

<p>使用免费的 OpenAI 账号获取指定文字的向量化表征比较耗时。为此，我们在示例中使用了数据集的一个较小的子集，试图在脚本执行时间和检索精度间找到一个平衡点。你可以根据需要调整上述参数中的 <strong>COUNT</strong> 常量来改变子集的大小。</p>

</Admonition>

接下来，我们将连接在 Zilliz Cloud 上创建好的集群，在其中创建一个 Collection ，并为其创建索引文件。关于如何设置和使用 Zilliz Cloud, 可以参考[此文](./quick-start)。

```python
# Connect to Zilliz Cloud and create a collection
connections.connect(
    alias='default',
    # Public endpoint obtained from Zilliz Cloud
    uri=URI,
    token=TOKEN
)

if COLLECTION_NAME in utility.list_collections():
    utility.drop_collection(COLLECTION_NAME)

fields = [
    FieldSchema(name='id', dtype=DataType.INT64, descrition='Ids', is_primary=True, auto_id=False),
    FieldSchema(name='title', dtype=DataType.VARCHAR, description='Title texts', max_length=200),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, description='Embedding vectors', dim=DIMENSION)
]

schema = CollectionSchema(fields=fields, description='Title collection')

collection = Collection(
    name=COLLECTION_NAME,
    schema=schema,
)

index_params = {
    'metric_type': 'L2',
    'index_type': 'AUTOINDEX',
    'params': {'nlist': 1024}
}

collection.create_index(
    field_name='embedding',
    index_params=index_params
)

collection.load()
```

在完成上述任务后，我们可以开始向 Collection 中插入数据。插入数据包含三个步骤：读取数据，获取数据的向量化表示，将其插入已连接的 Cluster 的指定 Collection 中。

```python
# Load the csv file and extract embeddings from the text
def csv_load(file):
    with open(file, newline='') as f:
        reader=csv.reader(f, delimiter=',')
        for row in reader:
            yield row[1]

def embed(text):
    return openai.Embedding.create(
        input=text, 
        engine=OPENAI_ENGINE)["data"][0]["embedding"]

# Insert each title and its embeddings

inserted = []

for idx, text in enumerate(random.sample(sorted(csv_load(FILE)), k=COUNT)):
    ins = {
        'id': idx,
        'title': (text[:198] + '..') if len(text) > 200 else text,
        'embedding': embed(text)
    }
    collection.insert(data=ins)
    time.sleep(3)
    inserted.append(ins)

# Search for similar titles
def search(text):
    res = collection.search(
        data=[embed(text)],
        anns_field='embedding',
        param={"metric_type": "L2", "params": {"nprobe": 10}},
        output_fields=['title'],
        limit=5,
    )

    ret = []

    for hits in res:
        for hit in hits:
            row = []
            row.extend([hit.id, hit.distance, hit.entity.get('title')])
            ret.append(row)

    return ret

search_terms = [
    'self-improvement',
    'landscape',
]

for x in search_terms:
    print('Search term: ', x)
    for x in search(x):
        print(x)
    print()
```

根据你设置的数量集的大小，搜索结果可能会有差异。

```python
# Output
#
# Search term:  self-improvement
# [9, 0.40222519636154175, 'Awakening Intuition: Using Your Mind-Body Network for Insight and Healing']
# [66, 0.40565189719200134, 'The War of Art: Break Through the Blocks & Win Your Inner Creative Battles']
# [73, 0.4130449891090393, 'The Organized Student: Teaching Children the Skills for Success in School and Beyond']
# [34, 0.41660943627357483, 'The Consolation of Philosophy']
# [61, 0.4331777095794678, 'Orientalism']

# Search term:  landscape
# [61, 0.3965946137905121, 'Orientalism']
# [24, 0.4071578085422516, 'Andreas Gursky']
# [1, 0.4108707904815674, 'The Art of Warfare']
# [45, 0.4112565815448761, 'Sunshine']
# [39, 0.41171979904174805, 'Wonderful Life: The Burgess Shale and the Nature of History']
```
