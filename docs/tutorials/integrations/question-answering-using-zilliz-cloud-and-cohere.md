---
slug: /question-answering-using-zilliz-cloud-and-cohere
beta: FALSE
notebook: FALSE
type: origin
token: N7KvwFAe8i7XWZk5aEGchRsynJA
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 与 Cohere 集成搭建智能问答系统

本文将演示如何使用 Zilliz Cloud 和 Cohere 搭建基于 [SQuAD 数据集](https://rajpurkar.github.io/SQuAD-explorer/) 的问答系统。其中，Zilliz Cloud 负责提供向量数据库，Cohere 负责提供获取指定文字向量表示的接口。

## 准备工作{#before-you-start}

本示例中的脚本需要安装 __pymilvus__，__cohere__，__pandas__，__numpy__ 和 __tqdm__。其中，__pymilvus__ 是 Zilliz Cloud的 Python 客户端，如果你的系统中没有安装它们，可以使用如下命令完成安装。

```shell
pip install pymilvus cohere pandas numpy tqdm openai tiktoken
```

然后，你可以按照如下方式加载它们。

```python
from pymilvus import connections, DataType, CollectionSchema, FieldSchema, Collection, utility
import cohere
import pandas
import numpy as np
from tqdm import tqdm
import time, os, json
```

## 主要参数{#parameters}

在这里，我们定义了一些示例中将要使用的主要参数。你需要根据实际情况和参数旁的注释填写或替换成相应的内容。

```python
__# 1. Set the The SQuAD dataset url.__
FILE = 'https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v2.0.json' 

__# 2. Set up the name of the collection to be created.__
COLLECTION_NAME = 'question_answering_db'

__# 3. Set up the dimension of the embeddings.__
DIMENSION = 768

__# 4. Set the number of entities to create and the number of entities to insert at a time.__
COUNT = 5000
BATCH_SIZE = 96

__# 5. Set up the cohere api key__
COHERE_API_KEY = "YOUR_COHERE_API_KEY"

__# 6. Set up the connection parameters for your Zilliz Cloud cluster.__
URI = 'YOUR_CLUSTER_ENDPOINT'

__# 7. Set up the token for your Zilliz Cloud cluster.__
__# You can either use an API key or a set of cluster username and password joined by a colon.__
TOKEN = 'YOUR_CLUSTER_TOKEN'
```

关于本示例使用的模型和数据集，可以参考 [Cohere](https://cohere.ai/) 和 [SQuAD](https://rajpurkar.github.io/SQuAD-explorer/)。

## 准备数据{#prepare-dataset}

在本例中，我们将使用SQuAD数据集做为回答问题的信源。数据集的原始格式为JSON，我们会使用__pandas__加载该数据集。

```python
# Download the dataset
dataset = pandas.read_json(FILE)

# Clean up the dataset by grabbing all the question answer pairs
simplified_records = []
for x in dataset['data']:
    for y in x['paragraphs']:
        for z in y['qas']:
            if len(z['answers']) != 0:
                simplified_records.append({'question': z['question'], 'answer': z['answers'][0]['text']})

# Grab the amount of records based on COUNT
simplified_records = pandas.DataFrame.from_records(simplified_records)
simplified_records = simplified_records.sample(n=min(COUNT, len(simplified_records)), random_state = 42)

# Check if the length of the cleaned dataset matches COUNT
print(len(simplified_records))
```

上面这段代码的输出如下

```python
5000
```

## 创建 Collection{#create-a-collection}

我们需要事先在 Zilliz Cloud 上准备好一个 Cluster。在这一小节里，我们将演示如何在这个 Cluster 里创建一个 Collection 并为其创建索引。

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
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name='original_question', dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name='answer', dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name='original_question_embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]

schema = CollectionSchema(fields=fields)

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
    field_name='original_question_embedding', 
    index_params=index_params
)

collection.load()
```

## 插入数据{#insert-data}

向 Collection 中插入我们准备好的数据分为如下三步：

- 读取准备好的数据集。

- 获取数据集中原始问题对应的向量表示。

- 将数据插入之前创建的 Collection 中。

在本示例中，每一条数据都包含一个原始问题，该问题的向量表示及对应的回答。

```python
# Set up a Cohere client
cohere_client = cohere.Client(COHERE_API_KEY)

# Extract embeddings from questions using Cohere
def embed(texts, input_type):
    res = cohere_client.embed(texts, model='multilingual-22-12', input_type=input_type)
    return res.embeddings

# Insert each question, answer, and qustion embedding
total = pandas.DataFrame()
for batch in tqdm(np.array_split(simplified_records, (COUNT/BATCH_SIZE) + 1)):
    questions = batch['question'].tolist()
    embeddings = embed(questions, "search_document")
    
    data = [
        {
            'original_question': x,
            'answer': batch['answer'].tolist()[i],
            'original_question_embedding': embeddings[i]
        } for i, x in enumerate(questions)
    ]

    collection.insert(data=data)

time.sleep(10)
```

## 测试问答{#ask-questions}

在我们向 Collection 中插入所有的数据后，就可以开始向这个问答系统提问了。提问的过程也分为三步，分别是：

- 提出问题

- 使用 Cohere 获取该问题的向量表示

- 使用 Zilliz Cloud 对该向量表示进行相似性搜索

<Admonition type="info" icon="📘" title="说明">

<p>在数据插入后立即进行搜索可能会比较慢。因为在数据完成索引前，Zilliz Cloud 会使用暴力搜索的方式在这些数据中查找相似的结果。当所有数据均完成索引后，搜索速度会变快。</p>

</Admonition>

```python
# Search the cluster for an answer to a question text
def search(text, top_k = 5):

    # AUTOINDEX does not require any search params 
    search_params = {}

    results = collection.search(
        data = embed([text], "search_query"),  # Embeded the question
        anns_field='original_question_embedding',
        param=search_params,
        limit = top_k,  # Limit to top_k results per search
        output_fields=['original_question', 'answer']  # Include the original question and answer in the result
    )

    distances = results[0].distances
    entities = [ x.entity.to_dict()['entity'] for x in results[0] ]

    ret = [ {
        "answer": x[1]["answer"],
        "distance": x[0],
        "original_question": x[1]['original_question']
    } for x in zip(distances, entities)]

    return ret

# Ask these questions
search_questions = ['What kills bacteria?', 'What\'s the biggest dog?']

# Print out the results in order of [answer, similarity score, original question]

ret = [ { "question": x, "candidates": search(x) } for x in search_questions ]

print(ret)
```

本示例返回的搜索结果如下：

```python
# Output
#
# [
#     {
#         "question": "What kills bacteria?",
#         "candidates": [
#             {
#                 "answer": "farming",
#                 "distance": 25.10422134399414,
#                 "original_question": "What makes bacteria resistant to antibiotic treatment?"
#             },
#             {
#                 "answer": "converting nitrogen gas to nitrogenous compounds",
#                 "distance": 25.26958465576172,
#                 "original_question": "What do bacteria do in soil?"
#             },
#             {
#                 "answer": "slowing down the multiplication of bacteria or killing the bacteria",
#                 "distance": 26.225540161132812,
#                 "original_question": "How do antibiotics work?"
#             },
#             {
#                 "answer": "Phage therapy",
#                 "distance": 30.04580307006836,
#                 "original_question": "What has been talked about to treat resistant bacteria?"
#             },
#             {
#                 "answer": "antibiotic target",
#                 "distance": 32.077369689941406,
#                 "original_question": "What can be absent from the bacterial genome?"
#             }
#         ]
#     },
#     {
#         "question": "What's the biggest dog?",
#         "candidates": [
#             {
#                 "answer": "English Mastiff",
#                 "distance": 12.71607780456543,
#                 "original_question": "What breed was the largest dog known to have lived?"
#             },
#             {
#                 "answer": "part of the family",
#                 "distance": 27.21062469482422,
#                 "original_question": "Most people today describe their dogs as what?"
#             },
#             {
#                 "answer": "77.5 million",
#                 "distance": 28.54041290283203,
#                 "original_question": "How many people in the United States are said to own dog?"
#             },
#             {
#                 "answer": "Rico",
#                 "distance": 28.770610809326172,
#                 "original_question": "What is the name of the dog that could ID over 200 things?"
#             },
#             {
#                 "answer": "about six",
#                 "distance": 31.739566802978516,
#                 "original_question": "What is the average number of pups in a litter?"
#             }
#         ]
#     }
# ]
```
