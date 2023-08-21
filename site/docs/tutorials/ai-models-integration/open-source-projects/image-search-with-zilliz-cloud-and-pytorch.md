---
slug: /image-search-with-zilliz-cloud-and-pytorch
sidebar_position: 1
---

# 与 PyTorch 集成搭建图片搜索系统

在本文中，我们将演示如何使用 Zilliz Cloud 搭建一个简单的图片搜索系统。该系统使用的数据集是 [Kaggle](https://www.kaggle.com/datasets/delayedkarma/impressionist-classifier-data) 上提供的印象派大师分类器数据集（ Impressionist-Classifier Dataset ）。在本示例中，我们将该数据库重新托管到了一个公共的 Google Drive 中。

本示例需要使用一个 1 CU 的 Zilliz Cloud Cluster，并使用 PyTorch 的预训练 ResNet50 模型获取指定图片的向量表示。

现在，让我们开始吧！

## 准备工作 {#preparation-work}

本页中的脚本需要使用 **pymilvus** 连接 Zilliz Cloud，使用 **torch** 运行 Embedding 模型，使用 **torchvision** 调用模型并对图片进行预处理，使用 **gdown** 下载示例数据集，使用 tqdm 在命令行中显示进度条。我们可以运行如下命令安装这些依赖。

```shell
pip install pymilvus torch gdown torchvision tqdm
```

## 准备数据 {#prepare-data}

首先，我们需要使用 **gdown** 从公共 Google Drive 中获取压缩文件，并使用 Python 自带的 **zipfile** 包将其解压。

```python
import gdown
import zipfile

url = 'https://drive.google.com/uc?id=1OYDHLEy992qu5C4C8HV5uDIkOWRTAR1_'
output = './paintings.zip'
gdown.download(url, output)

with zipfile.ZipFile("./paintings.zip","r") as zip_ref:
    zip_ref.extractall("./paintings")
```

:::caution 注意

数据集大小为 2.35 GB , 下载耗时取决于您的网络状况。

:::

## 主要参数 {#main-parameter}

为了更好的管理脚本，我们将一些主要的公共参数提取出来列在下方。你可以根据需要修改这些参数。

```python
# Zilliz Cloud 相关参数
COLLECTION_NAME = 'image_search'  # Collection 名称
DIMENSION = 2048  # 向量维度
URI = 'https://replace-this-with-your-zilliz-cloud-endpoint'  # Cluster 公共端点，从 Zilliz Cloud 上获取
USER = 'replace-this-with-your-zilliz-cloud-database-user'  # 创建 Cluster 时指定的用户名
PASSWORD = 'replace-this-with-your-zilliz-cloud-database-password'  # 上述用户名对应的密码

# 推理参数
BATCH_SIZE = 128
TOP_K = 3
```

## 设置 Zilliz Cloud {#set-up-zilliz-cloud}

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

1. 创建一个 Collection 用于存储图片 ID，图片路径以及该图片的向量表示。
    ```python
    from pymilvus import FieldSchema, CollectionSchema, DataType, Collection
    
    # 创建一个 Collection，包含 id，filepath 和 image_embedding 三个字段
    fields = [
        FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name='filepath', dtype=DataType.VARCHAR, max_length=200),  # VARCHARS need a maximum length, so for this example they are set to 200 characters
        FieldSchema(name='image_embedding', dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
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

## 插入数据 {#insert-data}

在本示例中，我们将使用 **torch** 包中的 ResNet50 模型。为了获取指定图片的向量表示，我们将移除模型的最后一个分类层。这样一来，经过模型获取的向量维度均为2048。下列代码块中，我们使用了 torch 包中所有模型均会使用相同的预处理方法。

在下列步骤中，我们将会：

1. 加载数据。
    ```python
    import glob
    
    # 获取图片文件的路径。
    paths = glob.glob('./paintings/paintings/**/*.jpg', recursive=True)
    len(paths)
    ```

1. 预处理数据，将其分为不同的批次。
    ```python
    import torch
    
    # 加载 Embedding 模型，并移除模型的最后一层。
    model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet50', pretrained=True)
    model = torch.nn.Sequential(*(list(model.children())[:-1]))
    model.eval()
    ```

1. 获取数据的向量表示。
    ```python
    from torchvision import transforms
    
    # 对图片进行预处理。
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    ```

1. 向 Collection 插入数据。
    ```python
    from PIL import Image
    from tqdm import tqdm
    
    # 用于获取指定数据的向量表示并将其存入数据库的函数
    def embed(data):
        with torch.no_grad():
            output = model(torch.stack(data[0])).squeeze()
            collection.insert([data[1], output.tolist()])
    
    data_batch = [[],[]]
    
    # 批量读取图片，获取其向量表示并将其存入数据库。
    for path in tqdm(paths):
        im = Image.open(path).convert('RGB')
        data_batch[0].append(preprocess(im))
        data_batch[1].append(path)
        if len(data_batch[0]) % BATCH_SIZE == 0:
            embed(data_batch)
            data_batch = [[],[]]
    
    # 获取剩余图片的向量表示，并将其存入数据库。
    if len(data_batch[0]) != 0:
        embed(data_batch)
    
    # 调用写入方法，以便 Zilliz Cloud 自动为新增数据创建索引。
    collection.flush()
    ```

:::caution 注意

由于获取图片的向量表示耗时较长，本步骤相对比较耗时。可以喝点咖啡，稍事休息。
PyTorch 可能与 Python 3.9 及之前版本存在不兼容的问题。建议使用 Python 3.10 及之后版本。

:::

## 执行搜索 {#perform-search}

在向 Zilliz Cloud 插入所有数据后，我们就可以开始执行搜索了。在本示例中，我们将使用两张示例图片执行相似性搜索。由于代码中执行的是批量搜索，因此搜索时间是指完成同一批次中所有图片的相似性搜索的时间。

```python
import glob

# 获取待搜图片的文件路径。
search_paths = glob.glob('./paintings/test_paintings/**/*.jpg', recursive=True)
len(search_paths)

import time
from matplotlib import pyplot as plt

# 获取待搜图片的向量表示。
def embed(data):
    with torch.no_grad():
        ret = model(torch.stack(data))
        # 如果存在多个结果，使用 squeeze 方法将其转换成数组
        if len(ret) > 1:
            return ret.squeeze().tolist()
        # 对于单个结果而言，squeeze 方法会移除其批次信息，所以需要使用 flatten 方法
        else:
            return torch.flatten(ret, start_dim=1).tolist()

data_batch = [[],[]]

for path in search_paths:
    im = Image.open(path).convert('RGB')
    data_batch[0].append(preprocess(im))
    data_batch[1].append(path)

embeds = embed(data_batch[0])
start = time.time()
res = collection.search(embeds, anns_field='image_embedding', param={}, limit=TOP_K, output_fields=['filepath'])
finish = time.time()

# 展示搜索结果
f, axarr = plt.subplots(len(data_batch[1]), TOP_K + 1, figsize=(20, 10), squeeze=False)

for hits_i, hits in enumerate(res):
    axarr[hits_i][0].imshow(Image.open(data_batch[1][hits_i]))
    axarr[hits_i][0].set_axis_off()
    axarr[hits_i][0].set_title('Search Time: ' + str(finish - start))
    for hit_i, hit in enumerate(hits):
        axarr[hits_i][hit_i + 1].imshow(Image.open(hit.entity.get('filepath')))
        axarr[hits_i][hit_i + 1].set_axis_off()
        axarr[hits_i][hit_i + 1].set_title('Distance: ' + str(hit.distance))

# Save the search result in a separate image file alongside your script.
plt.savefig('search_result.png')
```

本示例的搜索结果如下。

![XMxqbJd9io3Vx3x8Qcocj7avn2f](/img/XMxqbJd9io3Vx3x8Qcocj7avn2f.png)

