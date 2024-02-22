---
slug: /use-bulkwriter
beta: FALSE
notebook: FALSE
token: B9IdwtZhLi0tB8kb6czce8KXnvb
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 使用 BulkWriter

如果您的数据格式不满足[准备导入数据](./prepare-source-data)中列出的各项要求，您可以使用 PyMivus 自带的 **BulkWriter** 对您的数据进行转换。

## 概述{#overview}

在 PyMilvus 中，**BulkWriter** 用于将原始数据转换成可以批量导入到目标 Collection 的格式，并在 Zilliz Cloud 控制台、Milvus SDK 的 **BulkInsert** 接口，以及 RESTful API 的 Import 接口中使用。目前，有如下两种 **BulkWriter**。

- **LocalBulkWriter **读取指定数据集并将其转换为适用的格式。

- **RemoteBulkWriter** 完成 **LocalBulkWriter** 的所有工作，并将转换后的文件上传到指定的远程对象存储桶中。

## 使用步骤{#procedure}

### 安装 PyMilvus{#set-up-pymilvus}

在终端中运行如下命令，安装 PyMilvus 或将其升级到最新版本。

```python
python3 -m pip install --upgrade pymilvus
```

### 创建 Collection Schema{#set-up-a-collection-schema}

确定需要导入数据的目标 Collection 的 Schema。在此步骤中，您需要确定哪些字段需要被包含在 Schema 中。

下述代码创建了一个包含四个字段的 Schema。它们分别是 **id**、**vector**、**scalar_1** 和 **scalar_2**。第一个字段为主键，第二个字段为用于存储 768 维向量数据的向量字段。其它两个字段为标量字段。

另外，Schema 中还关闭了 **AutoID** 并开启了动态字段支持。

```python
from pymilvus import (
    FieldSchema,
    CollectionSchema,
    DataType
)

# You need to work out a collection schema out of your dataset.
schema = CollectionSchema(
    fields=[
        FieldSchema(name="id", dtype=DataType.INT64, is_priamry=True),
        FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=768),
        FieldSchema(name="scalar_1", dtype=DataType.VARCHAR, max_length=512),
        FieldSchema(name="scalar_2", dtype=DataType.INT64)
    ],
    auto_id=False,
    enable_dynamic_field=True,
)
```

### 创建 BulkWriter{#create-a-bulkwriter}

PyMilvus 中有两种 BulkWriter。在本小节中，我们将了解如何创建这两种 BulkWriter。

- **LocalBulkWriter**

    **LocalBulkWriter** 将原始数据按行添加到缓存中，然后将缓存中的数据存入一个指定格式的本地文件中。

    ```python
    from pymilvus import LocalBulkWriter, BulkFileType
    
    writer = LocalBulkWriter(
        schema=schema,
        local_path='./tmp',
        segment_size=1 * 1024 * 1024,
        file_type=BulkFileType.NPY
    )
    ```

    在创建 **LocalBulkWriter** 时，您应该：

    - 在 **schema** 参数中引用之前创建好的 CollectionSchema 对象。

    - 在 **local_path** 中指定本地输出路径。

    - 在 **file_type** 中指定输出文件格式。

    - 如果原始数据中包含大量的数据记录，可以考虑设置 **segment_size** 来调整原始数据分段大小。

    关于参数设置，可以参考 SDK Reference 中关于 **LocalBulkWriter** 的介绍。

    <Admonition type="info" icon="📘" title="说明">

    <p>使用 LocalBulkWriter 生成的 JSON 文件可以直接在 Zilliz Cloud 控制台上导入。</p>
    <p>如需导入其它格式的文件，需要先将它们上传到和集群同云的对象存储桶中。</p>

    </Admonition>

- **RemoteBulkWriter**

    和 **LocalBulkWriter** 不同的是，**RemoteBulkWriter** 将缓存中的数据写入一个远程对象存储桶中。因此，您需要先设置好用于连接该存储桶的 **ConnectParam** 对象，并在创建 RemoteBulkWriter 时引用该 **ConnectParam** 对象。

    ```python
     from pymilvus import RemoteBulkWriter, BulkFileType
    
    conn = RemoteBulkWriter.ConnectParam(
        endpoint="storage.googleapis.com",
        access_key="Your-Access-Key",
        secret_key="Your-Secret-key",
        bucket_name="Your-Bucket-Name",
        secure=True
    )
    
    writer = RemoteBulkWriter(
        schema=schema,
        remote_path="/",
        connect_param=conn,
        file_type=BulkFileType.NPY
    )
    ```

除了 **connect_param** 参数外，RemoteBulkWriter 的参数与 LocalBulkWriter 基本相同。更多关于参数设置的信息，可以参考 SDK Reference 中关于 **RemoteBulkWriter** 的介绍。

### 开始转换{#start-writing}

**BulkWriter** 对象提供两个方法：**append_row()** 将原始数据按行添加到缓存中，**commit()** 将缓存中的数据写入一个本地文件或远程对象存储桶中。

为了方便演示，下述代码向缓存中添加随机生成的数据。

```python
import random
import string

def generate_random_str(length=5):
    letters = string.ascii_uppercase
    digits = string.digits
    
    return ''.join(random.choices(letters + digits, k=length))

for i in range(10000):
    writer.append_row({
        "id": i, 
        "vector":[random.uniform(-1, 1) for _ in range(768)]
        "scalar_1": generate_random_str(random.randint(1, 20)),
        "scalar_2": random.randint(100),
    })
    
writer.commit()
```

## 动态字段支持{#dynamic-schema-support}

在上一节中，我们创建 **BulkWriter** 时引用了一个启用了动态字段的 Schema。因此，我们可以在使用 **BulkWriter** 向缓存中添加数据时携带 Schema 中未定义的字段。

为了方便演示，下述代码向缓存中添加随机生成的数据。

```python
import random
import string

def generate_random_string(length=5):
    letters = string.ascii_uppercase
    digits = string.digits
    
    return ''.join(random.choices(letters + digits, k=length))

for i in range(10000):
    writer.append_row({
        "id": i, 
        "vector":[random.uniform(-1, 1) for _ in range(768)],
        "scalar_1": generate_random_string(),
        "scalar_2": random.randint(100),
        "dynamic_field_1": random.choice([True, False]),
        "dynamic_field_2": random.randint(100)
    })
    
writer.commit()
```

## 验证结果{#verify-the-result}

您可以通过打印 **BulkWriter** 的 **data_path** 属性来获取实际输出路径。

```python
print(writer.data_path)

# LocalBulkWriter
# 'folder/45ae1139-1d87-4aff-85f5-0039111f9e6b'

# RemoteBulkWriter
# '/folder/5868ba87-743e-4d9e-8fa6-e07b39229425'
```

**BulkWriter **生成一个 UUID，并使用该 UUID 在指定的输入路径下创建一个子路径，然后将生成的文件放在创建的子路径下。您也可以[单击此处](https://assets.zilliz.com/bulk_writer.zip)下载根据上述部署生成的示例数据文件。

生成的数据目录结构如下所示：

- 如果待转换数据大小未超过创建 BulkWriter 时指定的分段大小。

    ```python
    # JSON
    ├── folder
    │   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
    │       └── 1.json 
    
    # Parquet
    ├── folder
    │   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
    │       └── 1.parquet 
    
    # Numpy
    ├── folder
    │   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
    │       ├── id.npy
    │       ├── vector.npy
    │       ├── scalar_1.npy
    │       ├── scalar_2.npy
    │       └── $meta.npy 
    ```

    则对应的导入文件路径如下：

    |  **文件类型**    |  合法的文件导入路径                                                                                                                                                                                                                        |
    | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |  **JSON**    |  - `https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/`<br/> - `https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/1.json`<br/>    |
    |  **Parquet** |  - `https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/`<br/> - `https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/1.parquet`<br/> |
    |  **NumPy**   |  - `https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/`<br/> - `https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/*.npy`<br/>     |

    