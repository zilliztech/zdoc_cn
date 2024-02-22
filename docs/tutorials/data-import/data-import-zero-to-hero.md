---
slug: /data-import-zero-to-hero
beta: FALSE
notebook: FALSE
token: FXGWwcjyViaQm8kvJgScITzBnr3
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 用户指南：数据导入从入门到精通

本小节为一个快速引导教程，旨在帮助您在 Zilliz Cloud 上快速开始包含数据准备、建立 Collection 到开始导入数据等子任务在内的全流程数据导入任务。通过本节，你将掌握：

- 如何定义 Schema 及创建导入任务的目标 Collection

- 如何使用 **BulkWriter** 准备源数据并将其写入远程对象存储桶

- 如果调用批量导入 API 将准备好的源数据导入目标 Collection

## 开始之前{#before-you-start}

为了保证整个数据导入流程的连续性，请在开始本教程前完成如下准备工作：

### 在 Zilliz Cloud 上创建集群{#set-up-your-zilliz-cloud-cluster}

- 如果您还未创建任何集群，参考[此处创建一个集群](./create-cluster)。

- 收集如下信息：集群 Endpoint、API 密钥、集群 ID 和 集群所在云地域。您可以在 [Zilliz Cloud 控制台](./on-zilliz-cloud-console)上找到这些信息。

### 安装依赖{#install-dependencies}

在终端中运行以下命令安装 **pymilvus** 和 **minio** 或将它们升级到最新的版本。

```shell
python3 -m pip install --upgrade pymilvus minio
```

### 配置远程对象存储桶{#configure-your-remote-storage-bucket}

- 在您的阿里云控制台上创建一个对象存储桶。请确保该存储桶所属云地域与上述 Zilliz Cloud 集群的云地域一致。

- 记录下访问该对象存储桶的 Access Key、Secret Key 以及 桶名称。您可以在阿里云控制台中找到这些信息。

为了更好地利用本教程中的示例代码，建议您使用收集到的信息设置如下变量：

```python
# Zilliz Cloud 集群配置
CLUSTER_ENDPOINT=""
API_KEY=""
TOKEN=""
CLUSTER_ID=""
CLOUD_REGION=""
CLOUD_API_ENDPOINT="controller.api.{0}.cloud.zilliz.com.cn".format(CLOUD_REGION)
COLLECTION_NAME=""

# 远程对象存储桶访问参数
ACCESS_KEY=""
SECRET_KEY=""
BUCKET_NAME="" 
```

## 下载示例数据{#download-example-dataset}

在终端中运行如下命令下载格式为 CSV 的示例数据集。

```shell
curl https://assets.zilliz.com/doc-assets/medium_articles_partial_a13e0f2a.csv \
        --output medium_articles_partial.csv 
```

上述命令会按如下方式打印下载进度。您也可以[单击此处](https://assets.zilliz.com/medium_articles_partial.csv)从浏览器下载此数据集。

```shell
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 5133k  100 5133k    0     0   430k      0  0:00:11  0:00:11 --:--:--  599k0
```

下表详细描述了该数据集的结构及第一行数据各列的取值。

|  **字段名称**     |  **字段类型**     |  **字段属性**        |  **样例取值**                                          |
| ------------- | ------------- | ---------------- | -------------------------------------------------- |
|  id           |  INT64        |  N/A             |  0                                                 |
|  title_vector |  FLOAT_VECTOR |  Dimension: 768  |  [0.041732933, 0.013779674, -0.027564144, -0.01... |
|  title        |  VARCHAR      |  Max length: 512 |  The Reported Mortality Rate of Coronavirus Is ... |
|  link         |  VARCHAR      |  Max length: 512 |  https://medium.com/swlh/the-reported-mortality... |
|  reading_time |  INT64        |  N/A             |  13                                                |
|  publication  |  VARCHAR      |  Max length: 512 |  The Startup                                       |
|  claps        |  INT64        |  N/A             |  1100                                              |
|  responses    |  INT64        |  N/A             |  18                                                |

示例数据集包含了 5,000 篇在 medium.com 发布的文章。关于该数据集更多信息，可参考[此 Kaggle 页面](https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset)。

## 创建目标 Collection{#set-up-target-collection}

我们可以根据上表的内容设计目标 Collection 的 Schema。

为了更好地演示 Collection 的能力，我们在目标 Collection 的 Schema 中包含了前 4 个字段，并将后 4 个字段做为动态字段使用。

```python
from pymilvus import FieldSchema, CollectionSchema, DataType

schema = CollectionSchema(
    fields=[
        FieldSchema(name='id', dtype=DataType.INT64, is_primary=True),
        FieldSchema(name='title_vector', dtype=DataType.FLOAT_VECTOR, dim=768),
        FieldSchema(name='title', dtype=DataType.VARCHAR, max_length=512),
        FieldSchema(name='link', dtype=DataType.VARCHAR, max_length=512),
    ],
    description="A series of articles from medium.com",
    auto_id=False,
    enable_dynamic_field=True
)
```

上述代码中的字段解释如下：

- `fields`:

    - `id` 是主键。

    - `title_vector` 用于存储 768 维的向量数据。

    - `title` 和 `link` 是两个标量字段。

- `auto_id=False`

    该参数默认值为 **False**，表示主键不会随数据插入自动增长。将其设置为 **True** 可阻止 **BulkWriter** 在生成的文件中包含主键。

- `enable_dynamic_field=True`

    该参数默认为 **False**，表示 Schema 中未定义的字段将会被忽略。将其设置为 **True** 将允许 **BulkWriter **将未在 Schema 中定义的字段以键值对的形式存储到一个名为** $meta** 的预留 JSON 字段中。

在创建 Schema 后，就可以继续创建目标 Collection 了。

```python
from pymilvus import connections, Collection

# 1. 建立连接
connections.connect(
        uri=CLUSTER_ENDPOINT,
        token=TOKEN
)
# 2. 创建 Collection
collection = Collection(name=COLLECTION_NAME, schema=schema)

# 3. 设置索引参数
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "IP",
    "params": {}
}

# 4. 创建索引
collection.create_index(
        field_name="title_vector",
        index_params=index_params,
)

# 5. 加载 Collection 数据到内存
collection.load()
```

## 准备源数据{#prepare-source-data}

**BulkWriter** 会将您提供的数据转换成 JSON、Parquet 或 NumPy 文件。在下面的示例中，我们将创建一个 **RemoteBulkWriter** 并使用该 **RemoteBulkWriter** 将您的数据转换成上述格式。

### 创建 RemoteBulkWriter{#create-remotebulkwriter}

当 Schema 准备好后，就可以使用该 Schema 创建 **RemoteBulkWriter** 了。由于 **RemoteBulkWriter** 需要访问您的远程对象存储桶。因此，您需要先设置好连接远程对象存储桶的 **ConnectParam** 对象并在创建 **RemoteBulkWriter** 时引用该参数。

```python
from pymilvus import RemoteBulkWriter, BulkFileType

# 远程对象存储桶连接参数
conn = RemoteBulkWriter.ConnectParam(
    endpoint="oss-cn-hangzhou.aliyuncs.com", # 替换成您的 oss endpoint。具体可参考 https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    bucket_name=BUCKET_NAME, # 替换成您的远程对象存储桶名称
    region="oss-cn-hangzhou", # 替换成您的桶所在地域。具体可参考 https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints
    secure=True
)
```

<Admonition type="info" icon="📘" title="说明">

<p>参数 <strong>endpoint</strong> 决定了生成文件的输出路径。请务必确保您的目标 Collection 所在地域与您的远程对象存储桶所在地域一致。</p>
<p>关于阿里云下 OSS Region 和 Endpoint 对照关系，可<a href="https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints">参考此文</a>。</p>

</Admonition>

然后，在创建 **RemoteBulkWriter** 时需要引用上述 **ConnectParam** 对象。

```python
writer = RemoteBulkWriter(
    schema=schema, # 目标 Collection 的 Schema
    remote_path="/", # 相对于远程对象存储桶根目录的输出路径
    segment_size=512*1024*1024, # 原始数据分段大小
    connect_param=conn, # 远程对象存储桶的连接参数
    file_type=BulkFileType.JSON_RB # 输出文件类型.
)

# 支持的输出文件类型:
# - BulkFileType.JSON_RB, 
# - BulkFileType.NPY, and 
# - BulkFileType.PARQUET
```

上述代码将生成 JSON 格式的文件并将其上传到指定桶的根目录下。

- `remote_path="/"`

    此参数决定了生成文件在远程对象存储桶中的输出路径。

    将其设置为 `"/"` 会使 **RemoteBulkWriter** 将生成的文件放入远程对象存储桶的根目录下。若需放入其它路径，请使用相对于桶根目录的相对路径。

- `file_type=BulkFileType.PARQUET`

    此参数决定了生成文件的文件类型。可选值如下：

    - **BulkFileType.JSON_RB**

    - **BulkFileType.PARQUET**

    - **BulkFileType.NPY**

- `segment_size=512*1024*1024`

    此参数决定了 **BulkWriter **如何对原始数据进行分段。该参数默认值为 512 MB (512 * 1024 * 1024)。如果您的数据集包含数据量较大时，可以考虑使用该参数对数据进行合理分段。

### 使用 Writer{#use-the-writer}

**Writer** 对象有两个方法：一个是将原始数据以行的形式添加到缓存中，另一个则是将缓存中的数据写入到远程对象存储桶中。

您可以参考如下代码将原始数据以行的形式添加到缓存中。

```python
import pandas as pd

df = pd.read_csv("path/to/medium_articles_partial.csv") # 请使用原始数据文件所在路径

for i in range(len(df)):
    row = df.iloc[i].to_dict()
    row["title_vector"] = [float(x) for x in row["title_vector"][1:-1].split(",")]
    writer.append_row(row)
```

如上述代码所示，**accept_row()** 方法接收一个字典。该字典以键值对的形式表示一条数据。

需要注意的是，该字典需要包含所有在 Schema 中定义了的字段。如果 Schema 中还开启了动态字段，该字典还允许携带 Schema 中未定义的字段。具体内容，可参考[使用 BulkWriter](./use-bulkwriter)。

您还需要调用 **commit()** 方法才能将缓存中的数据写入到远程对象存储桶中。

```python
writer.commit()
```

至此，BulkWriter 将原始数据按您的要求转换成 Zilliz Cloud 可识别的格式并将其存放到指定的远程对象存储桶中。您可以运行如下指令查看输入路径。

```python
print(writer.data_path)

# /5868ba87-743e-4d9e-8fa6-e07b39229425
```

<Admonition type="info" icon="📘" title="说明">

<p>**BulkWriter **生成一个 UUID，并使用该 UUID 在指定的输入路径下创建一个子路径，然后将生成的文件放在创建的子路径下。</p>

</Admonition>

更多内容，可参考[使用 BulkWriter](./use-bulkwriter)。

## 导入源数据{#import-prepared-data}

在此步骤之前，请再次确认源数据和您的 Zilliz Cloud 集群均托管在阿里云上。

### 创建批量导入任务{#start-importing}

您可以使用 bulk_import() 函数导入准备好的源数据。

```python
from pymilvus import bulk_import

# 远程对象存储桶中的源数据外网访问地址
object_url = "https://{0}.oss-cn-hangzhou.aliyuncs.com/{1}/".format(BUCKET_NAME, str(writer.data_path)[1:])

# 开始批量导入
res = bulk_import(
    # Zilliz Cloud 访问参数
    # highlight-next-line
    url=CLOUD_API_ENDPOINT,
    api_key=API_KEY,
    cluster_id=CLUSTER_ID,
    collection_name=COLLECTION_NAME,
    # 远程对象存储桶访问参数
    object_url=object_url,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,

)

print(res.json())

# {'code': 200, 'data': {'jobId': '0f7fe853-d93e-4681-99f2-4719c63585cc'}}
```

<Admonition type="info" icon="📘" title="说明">

<p>参数 <strong>object_url</strong> 需为远程对象存储桶中一个合法的文件或目录。在上述代码中，我们使用了 <strong>format()</strong> 方法将桶名称和 Writer 返回的路径拼接成一个合法的目录路径。</p>
<p>如需了解更多信息，可参考 <a href="https://help.aliyun.com/zh/oss/user-guide/oss-domain-names">OSS 访问域名使用规则</a>。</p>

</Admonition>

### 检查任务进度{#check-task-progress}

如下代码每 5 秒钟检查一次任务进度，并打印进度信息。

```python
import time
from pymilvus import get_import_progress

job_id = res.json()['data']['jobId']

res = get_import_progress(
    # highlight-next-line
    url=CLOUD_API_ENDPOINT,
    api_key=API_KEY,
    job_id=job_id,
    cluster_id=CLUSTER_ID
)

print(res.json()["data"]["readyPercentage"])

# 循环检查导入进度
while res.json()["data"]["readyPercentage"] < 1:
    time.sleep(5)

    res = get_import_progress(
        # highlight-next-line
        url=CLOUD_API_ENDPOINT,
        api_key=API_KEY,
        job_id=job_id,
        cluster_id=CLUSTER_ID
    )
    
    print(res.json()["data"]["readyPercentage"])

# 0.01   -- 导入进度 1%
# 0.5    -- 导入进度 50%
# 0.5
# 1      -- 导入完成
```

<Admonition type="info" icon="📘" title="说明">

<p>上述代码中，参数 **url **为 Zilliz Cloud RESTful API 的服务器路径，其取值须与目标 Collection 所在云地域保持一致。</p>

</Admonition>

您还可以列出所有批量导入任务。

```python
from pymilvus import list_import_jobs

res = list_import_jobs(
    # highlight-next-line
    url=CLOUD_API_ENDPOINT,
    api_key=API_KEY,
    cluster_id=CLUSTER_ID,
    page_size=10,
    current_page=1,
)

print(res.json())

# {
#    "code":200,
#    "data":{
#       "tasks":[
#          {
#             "collectionName":"medium_aritlces",
#             "jobId":"0f7fe853-d93e-4681-99f2-4719c63585cc",
#             "state":"ImportCompleted"
#          }
#       ],
#       "count":1,
#       "currentPage":1,
#       "pageSize":10
#    }
# }
```

## 小结{#recaps}

本教程涵盖了数据导入的全流程。下面是一些在进行数据导入时需要遵循的一些原则：

- 仔细分析您的原始数据，以便更好地完成目标 Collection 的 Schema 设计。

- 在导入数据前，请确保 Zilliz Cloud 集群和 BulkWriter 的输出路径所在对象存储桶由同一家云服务提供商托管。

- 在使用 **BulkWriter** 时，请注意：

    - 在 **append_row()** 中，务必确保参数字典中包含所有 Schema 中定义的字段。如果 Schema 还允许动态字段，您还可以在该字典中包含未在 Schema 中定义的字段。

    - 在将所有数据添加到缓存中后，还需要调用 **commit()** 方法才能将转换好的数据上传到指定的远程对象存储桶中。

- 在使用 **bulk_import()** 函数时，您需要将桶名称、桶中文件或目录的外部访问域名，以及 Writer 返回的路径拼接在一起合成一个合法的 **object_url**。

