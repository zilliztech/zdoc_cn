---
title: "RemoteBulkWriter | Python"
slug: /python/python/DataImport-RemoteBulkWriter
sidebar_label: "RemoteBulkWriter"
beta: false
added_since: v2.3.x
last_modified: v2.5.x
deprecate_since: false
notebook: false
description: "RemoteBulkWriter 实例会将您的原始数据以 Zilliz Cloud 可理解的格式写入与 AWS-S3 兼容的存储桶。 | Python"
type: docx
token: BDP4dew9to9tQoxNEMPcBR5xnZb
sidebar_position: 4
keywords: 
  - 近似最近邻搜索
  - DiskANN
  - Sparse vector
  - Vector Dimension
  - zilliz
  - zilliz cloud
  - cloud
  - RemoteBulkWriter
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# RemoteBulkWriter

**RemoteBulkWriter** 实例会将您的原始数据以 Zilliz Cloud 可理解的格式写入与 AWS-S3 兼容的存储桶。

```python
class pymilvus.RemoteBulkWriter
```

## 构造函数\{#constructor}

使用一组参数（例如 **schema**、**remote_path**、**connect_param** 等）构造一个 **RemoteBulkWriter** 对象。

<Admonition type="info" icon="📘" title="说明">

**RemoteBulkWriter** 对象旨在将您的原始数据以 Zilliz Cloud 可理解的格式重写到与 AWS-S3 兼容的存储桶中。

</Admonition>

```python
from pymilvus import CollectionSchema
from pymilvus.bulk_writer import RemoteBulkWriter, BulkFileType

writer = RemoteBulkWriter(
    schema=CollectionSchema(),
    remote_path="string",
    connect_param=RemoteBulkWriter.ConnectParam()
    chunk_size=512*1024*1024,
    file_type=BulkFileType.PARQUET
)
```

**参数：**

- **schema** (*[CollectionSchema](./ORM-CollectionSchema)*) -

    **[必填]**

    目标 collection 的 schema，重写后的数据将被导入到该 collection 中。

- **remote_path** (*str*) -

    **[必填]**

    用于存放重写后数据的目录路径。

- **connect_param** (*[ConnectParam](./RemoteBulkWriter-S3ConnectParam)*) -

    用于连接到远程存储桶的参数。

- **chunk_size** (*int*) -

    文件 segment 的最大大小。

    在重写您的原始数据时，Zilliz Cloud 会将原始数据拆分为 segments。

    该值默认为 536,870,912 字节，即 512 MB。

    <Admonition type="info" icon="📘" title="说明">

    BulkWriter 如何对我的数据进行 segment 划分？
    
        **BulkWriter** 对数据进行 segment 划分的方式会随目标文件类型而变化。
    
        如果生成的文件超过指定的 segment 大小，**BulkWriter** 会创建多个文件，并按序号命名，每个文件都不大于该 segment 大小。

    </Admonition>

- **file_type** (*[BulkFileType](./DataImport-BulkFileType)*) -

    输出文件的类型。

    该值默认为 **BulkFileType.PARQUET**。 

    可选项包括 **BulkFileType.JSON**、**BulkFileType.PARQUET**、**BulkFileType.CSV**。

- **config** (*dict*)

    用于指定处理 CSV 文件的可选配置的字典。仅当 **file_type** 设置为 **BulkFileType.CSV** 时，此参数可用。配置示例：

    ```python
    config={
        "sep": "\t",
        "nullkey": "NULL"
    }
    ```

    - **sep** (*string*)

        CSV 文件的分隔符。该值必须是长度为 1 的字符串，默认为 `","`。不允许使用以下字符串：`"\0"`、`"\n"`、`"\r"`、`"""`。

    - **nullkey** (*string*)

        表示 null 值的特殊字符串。该值默认为空字符串：`""`。

**返回类型：**

*RemoteBulkWriter*

**返回：**

一个 **RemoteBulkWriter** 对象。

**异常：**

- **SchemaNotReadyException**

    当提供的 schema 无效时，将抛出此异常。

## 属性\{#properties}

- **data_path** (*pathlib.PosixPath*) -

    输出目录的路径。

- **batch_files** (*str*) -

    生成的文件名列表。

## 类\{#classes}

以下是 `RemoteBulkWriter` 类包含的类：

- ConnectParam

## 方法\{#methods}

以下是 `RemoteBulkWriter` 类的方法：
