---
slug: /question-answering-using-zilliz-cloud-and-cohere
beta: FALSE
notebook: 82_integrations_cohere.ipynb
token: N7KvwFAe8i7XWZk5aEGchRsynJA
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 与 Cohere 集成搭建智能问答系统

本文将演示如何使用 Zilliz Cloud 和 Cohere 搭建基于 [SQuAD 数据集](https://rajpurkar.github.io/SQuAD-explorer/) 的问答系统。其中，Zilliz Cloud 负责提供向量数据库，Cohere 负责提供获取指定文字向量表示的接口。

## 准备工作{#before-you-start}{#before-you-start}

本示例中的脚本需要安装 **pymilvus**，**cohere**，**pandas**，**numpy** 和 **tqdm**。其中，**pymilvus** 是 Zilliz Cloud的 Python 客户端，如果你的系统中没有安装它们，可以使用如下命令完成安装。

```shell
pip install pymilvus cohere pandas numpy tqdm
```

然后，你可以按照如下方式加载它们。

```python
import cohere
import pandas
import numpy as np
from tqdm import tqdm
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
```

## 主要参数{#parameters}{#parameters}

在这里，我们定义了一些示例中将要使用的主要参数。你需要根据实际情况和参数旁的注释填写或替换成相应的内容。

```python
FILE = 'https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v2.0.json'  # SQuAD 数据集的 URL 地址
COLLECTION_NAME = 'question_answering_db'  # Collection 名称
DIMENSION = 768  # 向量维度，Cohere 大模型默认的向量维度是4096
COUNT = 5000  # 需要插入的问题数量
BATCH_SIZE = 96 # 单次插入的问题数量
URI = 'https://replace-this-with-the-public-endpoint-of-your-cluster-on-zilliz-clou'  # Zilliz Cloud 上获取的 Cluster 的公开端点
USER = 'replace-this-with-the-cluster-user-name'  # 创建 Cluster 时指定的用户名
PASSWORD = 'replace-this-with-the-cluster-password'  # 创建 Cluster 时指定的密码
COHERE_API_KEY = 'replace-this-with-the-cohere-api-key'  # 从 Cohere 上获取的 API 密钥
```

关于本示例使用的模型和数据集，可以参考 [Cohere](https://cohere.ai/) 和 [SQuAD](https://rajpurkar.github.io/SQuAD-explorer/)。

## 准备数据{#prepare-dataset}{#prepare-dataset}

在本例中，我们将使用SQuAD数据集做为回答问题的信源。数据集的原始格式为JSON，我们会使用**pandas**加载该数据集。

```python
# 下载数据集
dataset = pandas.read_json(FILE)

# 清理数据集，获取数据集中所有的问答对
simplified_records = []
for x in dataset['data']:
    for y in x['paragraphs']:
        for z in y['qas']:
            if len(z['answers']) != 0:
                simplified_records.append({'question': z['question'], 'answer': z['answers'][0]['text']})

# 按照 COUNT 参数从清理过的数据集中抽取指定数量的记录
simplified_records = pandas.DataFrame.from_records(simplified_records)
simplified_records = simplified_records.sample(n=min(COUNT, len(simplified_records)), random_state = 42)

# 检查获取的记录数量是否和 COUNT 参数的值一致
print(len(simplified_records))
```

上面这段代码的输出如下

```python
5000
```

## 创建 Collection{#create-a-collection}{#collectioncreate-a-collection}

我们需要事先在 Zilliz Cloud 上准备好一个 Cluster。在这一小节里，我们将演示如何在这个 Cluster 里创建一个 Collection 并为其创建索引。

```python
# 连接到 Zilliz Cloud cluster
connections.connect(uri=URI, user=USER, password=PASSWORD, secure=True)

# 如果要创建的 Collection 已存在，删除该 Collection
if utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)

# 创建一个 Collection，有如下4个字段：ID，问题，问题的向量表示及对应的答案
fields = [
    FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name='original_question', dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name='answer', dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name='original_question_embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)

# 创建一个类型为 AUTOINDEX 的索引
index_params = {
    'index_type': 'AUTOINDEX',
    'metric_type': 'IP'
    'params': {}
}
collection.create_index(field_name="original_question_embedding", index_params=index_params)
collection.load()
```

## 插入数据{#insert-data}{#insert-data}

向 Collection 中插入我们准备好的数据分为如下三步：

- 读取准备好的数据集。

- 获取数据集中原始问题对应的向量表示。

- 将数据插入之前创建的 Collection 中。

在本示例中，每一条数据都包含一个原始问题，该问题的向量表示及对应的回答。

```python
# 创建 Cohere 客户端
cohere_client = cohere.Client(COHERE_API_KEY)

# 使用 Cohere 客户端获取指定问题的向量表示
def embed(texts):
    res = cohere_client.embed(texts, model='multilingual-22-12')
    return res.embeddings

# 向 Colletion 中插入每个问题、该问题的向量表示及对应的回答。
total = pandas.DataFrame()
for batch in tqdm(np.array_split(simplified_records, (COUNT/BATCH_SIZE) + 1)):
    questions = batch['question'].tolist()
    
    data = [
        questions,
        batch['answer'].tolist(),
        embed(questions)      
    ]

    collection.insert(data)

# 在插入结束后，执行写入操作，确保所有记录均被索引。 
collection.flush()
```

## 测试问答{#ask-questions}{#ask-questions}

在我们向 Collection 中插入所有的数据后，就可以开始向这个问答系统提问了。提问的过程也分为三步，分别是：

- 提出问题

- 使用 Cohere 获取该问题的向量表示

- 使用 Zilliz Cloud 对该向量表示进行相似性搜索

<Admonition type="info" icon="📘" title="说明">

在数据插入后立即进行搜索可能会比较慢。因为在数据完成索引前，Zilliz Cloud 会使用暴力搜索的方式在这些数据中查找相似的结果。当所有数据均完成索引后，搜索速度会变快。

</Admonition>

```python
# 在数据集中查找指定提问对应的答案
def search(text, top_k = 5):

    # AUTOINDEX 无须提供搜索参数
    search_params = {}

    results = collection.search(
        data = embed([text]),  # 获取提问的向量表示
        anns_field="original_question_embedding",  # 在库中所有原始提问的向量表示中进行搜索
        param=search_params,
        limit = top_k,  # 指定每次搜索返回的结果数量
        output_fields=['original_question', 'answer']  # 要求返回的结果中包含原始提问和回答
    )

    ret = []
    for hit in results[0]:
        row = []
        row.extend([hit.entity.get('answer'), hit.score, hit.entity.get('original_question') ])  # 从返回的结果中获取答案，距离和原始提问
        ret.append(row)
    return ret

# 提出问题
search_questions = ['What kills bacteria?', 'Whats the biggest dog?']

# 按 答案、相似度得分及原始提问的顺序打印搜索结果
for question in search_questions:
    print('Question:', question)
    print('\nAnswer,', 'Distance,', 'Original Question')
    for result in search(question):
        print(result)
    print()

```

本示例返回的搜索结果如下：

```python
Question: What kills bacteria?

Answer, Distance, Original Question
['Phage therapy', 5976.171875, 'What has been talked about to treat resistant bacteria?']
['oral contraceptives', 7065.4130859375, 'In therapy, what does the antibacterial interact with?']
['farming', 7250.0791015625, 'What makes bacteria resistant to antibiotic treatment?']
['slowing down the multiplication of bacteria or killing the bacteria', 7291.306640625, 'How do antibiotics work?']
['converting nitrogen gas to nitrogenous compounds', 7310.67724609375, 'What do bacteria do in soil?']

Question: Whats the biggest dog?

Answer, Distance, Original Question
['English Mastiff', 4205.16064453125, 'What breed was the largest dog known to have lived?']
['Rico', 6108.88427734375, 'What is the name of the dog that could ID over 200 things?']
['part of the family', 7904.853515625, 'Most people today describe their dogs as what?']
['77.5 million', 8752.98828125, 'How many people in the United States are said to own dog?']
['Iditarod Trail Sled Dog Race', 9251.58984375, 'Which dog-sled race in Alaska is the most famous?']
```
