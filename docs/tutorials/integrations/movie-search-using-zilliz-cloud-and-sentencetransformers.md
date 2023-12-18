---
slug: /movie-search-using-zilliz-cloud-and-sentencetransformers
beta: FALSE
notebook: 86_integrations_sentencetransformers.ipynb
token: QdD7w2k6ii7mKFkTJ2tcNhYznAf
sidebar_position: 7
---

import Admonition from '@theme/Admonition';


# 与 SentenceTransformers 集成搭建电影搜索系统

本文将演示使用 Zilliz Cloud 和 SentenceTransformers 对一篇 Wikipedia 文章进行搜索。示例中用到的数据集为 Wikipedia-Movie-Plots Dataset，你可以在 [Kaggle](https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots) 上找到该数据集。我们将该数据集重新托管到了一个公共的 Google Drive。

您需要在 Zilliz Cloud 上创建一个大小为 1 CU 的 Cluster。

## 准备工作{#before-you-start}{#before-you-start}

在本示例中，我们将使用 **pymilvus** 连接 Zilliz Cloud，使用 **sentencetransformers** 来生成向量，并使用 **gdown** 来下载示例数据集。

```python
pip install pymilvus sentence-transformers gdown
```

## 准备数据{#prepare-data}{#prepare-data}

首先，我们要使用 **gdown** 从公共 Google Drive 中下载数据集压缩包，然后使用 Python 自带的 **zipfile** 对该压缩包进行解压缩。

```python
import gdown
url = 'https://drive.google.com/uc?id=11ISS45aO2ubNCGaC3Lvd3D7NT8Y7MeO8'
output = './movies.zip'
gdown.download(url, output)

import zipfile

with zipfile.ZipFile("./movies.zip","r") as zip_ref:
    zip_ref.extractall("./movies")
```

## 主要参数{#parameters}{#parameters}

本示例中使用的主要公共参数都在此处定义。请根据需求修改参数值。

```python
# Zilliz Cloud 设置参数
COLLECTION_NAME = 'movies_db'  # Collection 名称
DIMENSION = 384  # 向量维度
URI = 'https://replace-this-with-your-zilliz-cloud-endpoint'  # Cluster 公共端点 URI, 可从 Zilliz Cloud 获取 
USER = 'replace-this-with-your-zilliz-cloud-database-user'  # 创建 Cluster 时指定的用户名
PASSWORD = 'replace-this-with-your-zilliz-cloud-database-password'  # 上述用户名对应的密码

# 推理参数
BATCH_SIZE = 128

# 搜索参数
TOP_K = 3
```

## 设置 Zilliz Cloud{#set-up-zilliz-cloud}{#zilliz-cloudset-up-zilliz-cloud}

在这一小节，我们将完成 Zilliz Cloud 的设置，涉及如下步骤：

1. 使用提供的端点 URI 连接 Zilliz Cloud cluster。

    ```python
    from pymilvus import connections
    
    # 连接 Cluster
    connections.connect(uri=URI, user=USER, password=PASSWORD, secure=True)
    ```

1. 如果需要创建的 Collection 已存在，删除该 Collection。

    ```python
    from pymilvus import utility
    
    # 删除已存在的同名 Collection
    if utility.has_collection(COLLECTION_NAME):
        utility.drop_collection(COLLECTION_NAME)
    ```

1. 创建一个 Collection 用于存储电影 ID，电影名称以及该名称的向量表示。

    ```python
    from pymilvus import FieldSchema, CollectionSchema, DataType, Collection
    
    # 创建一个 Collection，包含 id，title 和 embedding 三个字段
    fields = [
        FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name='title', dtype=DataType.VARCHAR, max_length=200),  # VARCHARS need a maximum length, so for this example they are set to 200 characters
        FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
    ]
    schema = CollectionSchema(fields=fields)
    collection = Collection(name=COLLECTION_NAME, schema=schema)
    ```

1. 为 Collection 创建索引文件，并将 Collection 加载到内存。

    ```python
    # 使用 AUTOINDEX 为 Collection 创建索引
    index_params = {
        'index_type': 'AUTOINDEX',
        'metric_type': 'L2',
        'params': {}
    }
    collection.create_index(field_name="image_embedding", index_params=index_params)
    collection.load()
    ```

在完成上述步骤后，我们就可以向 Collection 中插入数据了。在创建索引文件后插入的任何数据都会被自动索引并可被立即用于搜索。如果数据正在索引过程中，Zilliz Cloud 会使用暴力搜索模式，所以搜索过程可能会比较慢。

## 插入数据{#insert-data}{#insert-data}

在本示例中，我们将使用 SentenceTransformers 的 MiniLLM 模型为电影的情节文本生成对应的向量表示。该模型返回 384维的向量。

在接下来的步骤中，我们将

- 加载数据。

- 使用 SentenceTransformers 为电影的情节文本生成对应的向量表示。

- 将数据插入到 Zilliz Cloud。

```python
import csv
from sentence_transformers import SentenceTransformer

transformer = SentenceTransformer('all-MiniLM-L6-v2')

# 抽取电影标题
def csv_load(file):
    with open(file, newline='') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            if '' in (row[1], row[7]):
                continue
            yield (row[1], row[7])

# 使用 SentenceTransformer 生成对应的向量表示
def embed_insert(data):
    embeds = transformer.encode(data[1])
    ins = [
            data[0],
            [x for x in embeds]
    ]
    collection.insert(ins)

import time

data_batch = [[],[]]

for title, plot in csv_load('./movies/plots.csv'):
    data_batch[0].append(title)
    data_batch[1].append(plot)
    if len(data_batch[0]) % BATCH_SIZE == 0:
        embed_insert(data_batch)
        data_batch = [[],[]]

# 为剩余数据生成对应的向量表示并存入数据库。
if len(data_batch[0]) != 0:
    embed_insert(data_batch)

# 调用写入方法，让 Zilliz Cloud 自动索引数据。
collection.flush()
```

## 执行搜索{#perform-the-search}{#perform-the-search}

在向 Zilliz Cloud 插入所有数据后，我们就可以开始执行搜索了。在本示例中，我们将根据电影情节进行电影检索。由于代码中执行的是批量搜索，因此搜索时间是指完成同一批次中所有电影情节的相似性搜索的时间。

```python
# 搜索与关键词最相近的标题
search_terms = ['A movie about cars', 'A movie about monsters']

# 在数据库中对输入文本进行相似性搜索的函数
def embed_search(data):
    embeds = transformer.encode(data)
    return [x for x in embeds]

search_data = embed_search(search_terms)

start = time.time()
res = collection.search(
    data=search_data,  # 输入文本对应的向量表示
    anns_field="embedding",  # 在 embedding 字段中进行相似性搜索
    param={},
    limit = TOP_K,  # 每次搜索返回的结果数量
    output_fields=['title']  # 在返回的结果中需要包含 title 字段
)
end = time.time()

for hits_i, hits in enumerate(res):
    print('Title:', search_terms[hits_i])
    print('Search Time:', end-start)
    print('Results:')
    for hit in hits:
        print( hit.entity.get('title'), '----', hit.distance)
    print()
```

输出的结果与如下类似。

```python
Title: A movie about cars
Search Time: 0.04272913932800293
Results:
Red Line 7000 ---- 0.9104408621788025
The Mysterious Mr. Valentine ---- 0.9127437472343445
Tomboy ---- 0.9254708290100098

Title: A movie about monsters
Search Time: 0.04272913932800293
Results:
Monster Hunt ---- 0.8105474710464478
The Astro-Zombies ---- 0.8998500108718872
Wild Country ---- 0.9238440990447998
```
