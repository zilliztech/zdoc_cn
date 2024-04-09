---
slug: /movie-search-using-zilliz-cloud-and-sentencetransformers
beta: FALSE
notebook: FALSE
type: origin
token: QdD7w2k6ii7mKFkTJ2tcNhYznAf
sidebar_position: 7
---

import Admonition from '@theme/Admonition';


# 与 SentenceTransformers 集成搭建电影搜索系统

本文将演示使用 Zilliz Cloud 和 SentenceTransformers 对一篇 Wikipedia 文章进行搜索。示例中用到的数据集为 Wikipedia-Movie-Plots Dataset，你可以在 [Kaggle](https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots) 上找到该数据集。我们将该数据集重新托管到了一个公共的 Google Drive。

您需要在 Zilliz Cloud 上创建一个大小为 1 CU 的 Cluster。

## 准备工作{#before-you-start}

在本示例中，我们将使用 __pymilvus__ 连接 Zilliz Cloud，使用 __sentencetransformers__ 来生成向量，并使用 __gdown__ 来下载示例数据集。

```python
pip install pymilvus sentence-transformers gdown
```

## 准备数据{#prepare-data}

首先，我们要使用 __gdown__ 从公共 Google Drive 中下载数据集压缩包，然后使用 Python 自带的 __zipfile__ 对该压缩包进行解压缩。

```python
import gdown
url = 'https://drive.google.com/uc?id=11ISS45aO2ubNCGaC3Lvd3D7NT8Y7MeO8'
output = './movies.zip'
gdown.download(url, output)

import zipfile

with zipfile.ZipFile("./movies.zip","r") as zip_ref:
    zip_ref.extractall("./movies")
```

## 主要参数{#parameters}

本示例中使用的主要公共参数都在此处定义。请根据需求修改参数值。

```python
# Parameters for set up Zilliz Cloud
COLLECTION_NAME = 'movies_db'  # Collection name
DIMENSION = 384  # Embeddings size
URI = 'YOUR_CLUSTER_ENDPOINT'  # Endpoint URI obtained from Zilliz Cloud
TOKEN = 'YOUR_CLUSTER_TOKEN'  # API key or a colon-separated cluster username and password

# Inference Arguments
BATCH_SIZE = 128

# Search Arguments
TOP_K = 3
```

## 设置 Zilliz Cloud{#set-up-zilliz-cloud}

在这一小节，我们将完成 Zilliz Cloud 的设置，涉及如下步骤：

1. 使用提供的端点 URI 连接 Zilliz Cloud cluster。

    ```python
    from pymilvus import connections
    
    # Connect to Milvus Database
    connections.connect(
        uri=URI, 
        token=TOKEN
    )
    ```

1. 如果需要创建的 Collection 已存在，删除该 Collection。

    ```python
    from pymilvus import utility
    
    # Remove any previous collections with the same name
    if utility.has_collection(COLLECTION_NAME):
        utility.drop_collection(COLLECTION_NAME)
    ```

1. 创建一个 Collection 用于存储电影 ID，电影名称以及该名称的向量表示。

    ```python
    from pymilvus import FieldSchema, CollectionSchema, DataType, Collection
    
    # Create collection which includes the id, title, and embedding.
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
    # Create an IVF_FLAT index for collection.
    index_params = {
        'index_type': 'AUTOINDEX',
        'metric_type': 'L2',
        'params': {}
    }
    collection.create_index(field_name="embedding", index_params=index_params)
    collection.load()
    ```

在完成上述步骤后，我们就可以向 Collection 中插入数据了。在创建索引文件后插入的任何数据都会被自动索引并可被立即用于搜索。如果数据正在索引过程中，Zilliz Cloud 会使用暴力搜索模式，所以搜索过程可能会比较慢。

## 插入数据{#insert-data}

在本示例中，我们将使用 SentenceTransformers 的 MiniLLM 模型为电影的情节文本生成对应的向量表示。该模型返回 384维的向量。

在接下来的步骤中，我们将

- 加载数据。

- 使用 SentenceTransformers 为电影的情节文本生成对应的向量表示。

- 将数据插入到 Zilliz Cloud。

```python
import csv
from sentence_transformers import SentenceTransformer

transformer = SentenceTransformer('all-MiniLM-L6-v2')

# Extract the book titles
def csv_load(file):
    with open(file, newline='') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            if '' in (row[1], row[7]):
                continue
            yield (row[1], row[7])

# Extract embedding from text using OpenAI
def embed_insert(data):
    embeds = transformer.encode(data[1])
    ins = [
            data[0],
            [x for x in embeds]
    ]
    collection.insert(ins)

import time

data_batch = [[],[]]

with open('../movies/plots.csv') as f:
    total = len(f.readlines()) / BATCH_SIZE

for title, plot in tqdm(csv_load('{}/plots.csv'.format(output_folder)), total=total):
    data_batch[0].append(title)
    data_batch[1].append(plot)
    if len(data_batch[0]) % BATCH_SIZE == 0:
        embed_insert(data_batch)
        data_batch = [[],[]]

# Embed and insert the remainder
if len(data_batch[0]) != 0:
    embed_insert(data_batch)

# Call a flush to index any unsealed segments.
collection.flush()
```

## 执行搜索{#perform-the-search}

在向 Zilliz Cloud 插入所有数据后，我们就可以开始执行搜索了。在本示例中，我们将根据电影情节进行电影检索。由于代码中执行的是批量搜索，因此搜索时间是指完成同一批次中所有电影情节的相似性搜索的时间。

```python
# Search for titles that closest match these phrases.
search_terms = ['A movie about cars', 'A movie about monsters']

# Search the database based on input text
def embed_search(data):
    embeds = transformer.encode(data)
    return [x for x in embeds]

search_data = embed_search(search_terms)

start = time.time()
res = collection.search(
    data=search_data,  # Embeded search value
    anns_field="embedding",  # Search across embeddings
    param={},
    limit = TOP_K,  # Limit to top_k results per search
    output_fields=['title']  # Include title field in result
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
# Title: A movie about cars
# Search Time: 0.04272913932800293
# Results:
# Red Line 7000 ---- 0.9104408621788025
# The Mysterious Mr. Valentine ---- 0.9127437472343445
# Tomboy ---- 0.9254708290100098

# Title: A movie about monsters
# Search Time: 0.04272913932800293
# Results:
# Monster Hunt ---- 0.8105474710464478
# The Astro-Zombies ---- 0.8998500108718872
# Wild Country ---- 0.9238440990447998
```
