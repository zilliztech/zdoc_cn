---
slug: /docs/question-answering-using-zilliz-cloud-and-hugging-face
beta: FALSE
notebook: 81_integrations_huggingface.ipynb
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 与 HuggingFace 集成搭建问答系统

本文将演示如何使用 Zilliz Cloud 和 HuggingFace 搭建问答系统。其中，Zilliz Cloud 负责提供向量数据库，HuggingFace 负责提供获取指定文字向量表示的接口。

## 准备工作{#before-you-start}

本示例中的脚本需要安装 **pymilvus**，**transformers** 和 **datasets**。其中，**transformers** 和 **datasets** 是 HuggingFace 提供的用于创建流水线的开发包，**pymilvus** 是 Zilliz Cloud的 Python 客户端，如果你的系统中没有安装这些依赖，可以使用如下命令完成安装。

```shell
pip install transformers datasets pymilvus torch
```

然后，可以按如下方式加载这些依赖。

```python
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
from datasets import load_dataset_builder, load_dataset, Dataset
from transformers import AutoTokenizer, AutoModel
from torch import clamp, sum
```

## 主要参数{#parameters}

在这里，我们定义了一些示例中将要使用的主要参数。你需要根据实际情况和参数旁的注释填写或替换成相应的内容。

```python
DATASET = 'squad'  # 本示例使用的 HuggingFace 数据集
MODEL = 'bert-base-uncased'  # 获取指定文本的向量表示时使用的 Transformer 模型
TOKENIZATION_BATCH_SIZE = 1000  # 文本符号化操作的批次大小
INFERENCE_BATCH_SIZE = 64  # 提交给 Transformer 模型的批次大小
INSERT_RATIO = .001  # 指定需要插入的记录数量在数据集所有记录中的占比
COLLECTION_NAME = 'huggingface_db'  # 将要创建的 Colletion 名称
DIMENSION = 768  # 向量维度
LIMIT = 10  # 每次搜索返回的结果数量
URI='https://replace-this-with-the-public-endpoint-of-your-cluster-on-zilliz-cloud'  # Cluster 的公共端点，从 Zilliz Cloud 获取
USER='replace-this-with-the-cluster-user-name'  # 在创建 Cluster 时指定的用户名
PASSWORD='replace-this-with-the-cluster-password'  # 上述用户名对应的密码
```

如需进一步了解上述 Transformer 模型及数据集，可参考 [bert-base-uncased](https://huggingface.co/bert-base-uncased) 及 [squad](https://huggingface.co/datasets/squad)。

## 创建 Collection{#create-a-collection}

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

## 插入数据{#insert-data}

向 Collection 中插入我们准备好的数据分为如下三步：

- 对原始提问进行符号化处理。

- 获取完成符号化后的提问对应的向量表示。

- 将数据插入之前创建的 Collection 中。

在本示例中，一条数据包含一个原始提问、该提问的向量化表示及对应的答案。

```python
data_dataset = load_dataset(DATASET, split='all')
# 生成一个固定的数据子集。如需生成一个随机的数据子集，须移除 seed 参数。如需了解更多，可参考 <https://huggingface.co/docs/datasets/v2.9.0/en/package_reference/main_classes#datasets.Dataset.train_test_split.seed>
data_dataset = data_dataset.train_test_split(test_size=INSERT_RATIO, seed = 42)['test']
# 清理数据集的数据结构
data_dataset = data_dataset.map(lambda val: {'answer': val['answers']['text'][0]}, remove_columns=['answers'])

tokenizer = AutoTokenizer.from_pretrained(MODEL)

# 对提问进行符号化处理，以便满足 BERT 对数据的格式要求
def tokenize_question(batch):
    results = tokenizer(batch['question'], add_special_tokens = True, truncation = True, padding = "max_length", return_attention_mask = True, return_tensors = "pt")
    batch['input_ids'] = results['input_ids']
    batch['token_type_ids'] = results['token_type_ids']
    batch['attention_mask'] = results['attention_mask']
    return batch

# 为每个输入生成对应的符号
data_dataset = data_dataset.map(tokenize_question, batch_size=TOKENIZATION_BATCH_SIZE, batched=True)
# 将输出格式设置为 torch 以便可以提交给 Embedding 模型
data_dataset.set_format('torch', columns=['input_ids', 'token_type_ids', 'attention_mask'], output_all_columns=True)

model = AutoModel.from_pretrained(MODEL)
# 在某个提问完成符号化处理后，获取其对应的向量化表示，然后提取与隐藏层注意力掩码有关的平均池
def embed(batch):
    sentence_embs = model(
                input_ids=batch['input_ids'],
                token_type_ids=batch['token_type_ids'],
                attention_mask=batch['attention_mask']
                )[0]
    input_mask_expanded = batch['attention_mask'].unsqueeze(-1).expand(sentence_embs.size()).float()
    batch['question_embedding'] = sum(sentence_embs * input_mask_expanded, 1) / clamp(input_mask_expanded.sum(1), min=1e-9)
    return batch

data_dataset = data_dataset.map(embed, remove_columns=['input_ids', 'token_type_ids', 'attention_mask'], batched = True, batch_size=INFERENCE_BATCH_SIZE)

# 由于VARCHAR数据类型的约束，此处限制了问题的长度
def insert_function(batch):
    insertable = [
        batch['question'],
        [x[:995] + '...' if len(x) > 999 else x for x in batch['answer']],
        batch['question_embedding'].tolist()
    ]    
    collection.insert(insertable)

data_dataset.map(insert_function, batched=True, batch_size=64)
collection.flush()
```

## 测试问答{#ask-questions}

在我们向 Collection 中插入所有的数据后，就可以开始向这个问答系统提问并获取与我们的提问最相近的提问对应的答案了。

```python
questions = {'question':['When did the premier league start?', 'Where did people learn russian?']}
question_dataset = Dataset.from_dict(questions)

question_dataset = question_dataset.map(tokenize_question, batched = True, batch_size=TOKENIZATION_BATCH_SIZE)
question_dataset.set_format('torch', columns=['input_ids', 'token_type_ids', 'attention_mask'], output_all_columns=True)
question_dataset = question_dataset.map(embed, remove_columns=['input_ids', 'token_type_ids', 'attention_mask'], batched = True, batch_size=INFERENCE_BATCH_SIZE)

def search(batch):
    res = collection.search(batch['question_embedding'].tolist(), anns_field='original_question_embedding', param = {}, output_fields=['answer', 'original_question'], limit = LIMIT)
    overall_id = []
    overall_distance = []
    overall_answer = []
    overall_original_question = []
    for hits in res:
        ids = []
        distance = []
        answer = []
        original_question = []
        for hit in hits:
            ids.append(hit.id)
            distance.append(hit.distance)
            answer.append(hit.entity.get('answer'))
            original_question.append(hit.entity.get('original_question'))
        overall_id.append(ids)
        overall_distance.append(distance)
        overall_answer.append(answer)
        overall_original_question.append(original_question)
    return {
        'id': overall_id,
        'distance': overall_distance,
        'answer': overall_answer,
        'original_question': overall_original_question
    }
question_dataset = question_dataset.map(search, batched=True, batch_size = 1)
for x in question_dataset:
    print()
    print('Question:')
    print(x['question'])
    print('Answer, Distance, Original Question')
    for x in zip(x['answer'], x['distance'], x['original_question']):
        print(x)
```

如果未设置 `train_test_split()` 方法的 `seed` 参数，输出的结果可能会因你下载的数据子集的不同而与示例存在差异。

```python
Question:
When did the premier league start?
Answer, Distance, Original Question
('1992', tensor(19.1790), 'In what year was the Premier League created?')
('1787', tensor(35.1203), 'When was the Tower constructed?')
('until 1870', tensor(36.0302), 'When did the Papal States exist?')
('1981', tensor(36.0476), "When was ZE's Mutant Disco released?")
('Sunday Times University of the Year award', tensor(39.2945), 'What did Newcastle University win in 2000?')
('terrorism', tensor(39.7199), 'What issue did Spielberg address in his movie Munich?')
('2019', tensor(40.9740), 'When will Argo be launched?')
('October 1992', tensor(41.4449), 'When were free elections held?')
('Misrata', tensor(41.7602), 'Where did an ambulance take Gaddafi after he was murdered?')
('Poland, Bulgaria, the Czech Republic, Slovakia, Hungary, Albania, former East Germany and Cuba', tensor(42.0978), 'Where was Russian schooling mandatory in the 20th century?')

Question:
Where did people learn russian?
Answer, Distance, Original Question
('Poland, Bulgaria, the Czech Republic, Slovakia, Hungary, Albania, former East Germany and Cuba', tensor(31.6751), 'Where was Russian schooling mandatory in the 20th century?')
('accomplishments', tensor(34.7001), 'What did Czech historians emphasize about their countrymen?')
('until 1870', tensor(37.2057), 'When did the Papal States exist?')
('1787', tensor(38.3059), 'When was the Tower constructed?')
('October 1992', tensor(40.4033), 'When were free elections held?')
('salt and iron', tensor(41.3883), 'What natural resources did the Chinese government have a monopoly on?')
('1992', tensor(41.5846), 'In what year was the Premier League created?')
('6,000 years', tensor(41.7438), 'How old did biblical scholars think the Earth was?')
('traders', tensor(42.1737), 'Along with fishermen, what sort of Japanese people visited the Marshalls?')
('1981', tensor(44.3291), "When was ZE's Mutant Disco released?")
```
