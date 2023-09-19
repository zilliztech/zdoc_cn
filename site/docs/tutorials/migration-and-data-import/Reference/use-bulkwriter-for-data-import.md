---
slug: /use-bulkwriter-for-data-import
sidebar_position: 0
---

# 使用 BulkWriter 准备导入数据

本节将介绍如何使用 PyMilvus 中的 BulkWriter 来准备须导入 Zilliz Cloud 的数据。

## 简介 {#brief-introduction}

BulkWriter 是 PyMilvus 提供的用于将指定数据集转换成合适的格式，以便通过 Zilliz Cloud 提供的多种导入方式完成批量数据导入任务。当前，Zilliz Cloud允许您[通过 Web 控制台导入](./import-data-on-web-ui)，[通过 RESTful API 导入](./import-data-via-restful-api)，以及[通过 SDK 导入](./import-data-via-sdks)数据。

BulkWriter 提供了 LocalBulkWriter 和 RemoteBulkWriter 两个对象。LocalBulkWriter 读取指定数据集并将其转换成可以方便导入的格式，而 RemoteBulkWriter 则在完成上述任务后将转换后的数据集上传到指定的对象存储桶中。下表比较了二者的关键区别。

|          | LocalBulkWriter | RemoteBulkWriter |
| -------- | --------------- | ---------------- |
| 可接受的数据格式 | 字典列表            | 字典列表             |
| 可输出的数据格式 | 字典或 NumPy 文件    | NumPy 文件         |

## 具体步骤 {#specific-steps}

本节将使用示例数据集演示数据处理的基本流程。最终的目标是生成一个可供 BulkWriter 消费的字典列表。具体步骤如下：

1. 安装最新的 PyMilvus 并获取示例数据集。
    1. 安装最新版本的 PyMilvus 或将您的 PyMilvus 升级到最新版本，可参考 [安装 SDK](https://zilliverse.feishu.cn/docx/JmFnds3Sjokg5cxHSK1cbu4InSc#Q7sad4xmuokfjAxS3nOcpUXKnEc)。

    1. 下载[示例数据集](https://drive.google.com/file/d/12RkoDPAlk-sclXdjeXT6DMFVsQr4612w/view?usp=sharing)。关于该数据集的更多信息，请[阅读简介](https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset)。

1. 确定批量导入操作的目标 Collection 的 Schema。
    确定目标 Collection 的 Schema，也就是确定 Collection 中需要包含数据集中的哪些字段。

    ```python
    from pymilvus import FieldSchema, CollectionSchema
    
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
        FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),   
        FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=768),
        FieldSchema(name="link", dtype=DataType.VARCHAR, max_length=512),
        FieldSchema(name="reading_time", dtype=DataType.INT64),
        FieldSchema(name="publication", dtype=DataType.VARCHAR, max_length=512),
        FieldSchema(name="claps", dtype=DataType.INT64),
        FieldSchema(name="responses", dtype=DataType.INT64)
    ]
    
    schema = CollectionSchema(fields)
    ```

1. 以 Collection 的 Schema 为蓝本，对数据进行处理。
    您可以使用您觉得合适的方式对数据进行处理，最终的目标是生成一个可供 BulkWriter 消费的字典列表。该列表中的每个字典均代表一条数据记录。

    本示例使用 Pandas 库对示例数据集进行如下处理：

    1. 将示例数据库加载到一个 DataFrame 中。

    1. 按索引读取 DataFrame 中的数据，并将其转换为一个字典。

    1. 进一步处理向量字段，以便修正 Pandas 的 `to_dict()` 方法在转换数据时引入的错误。

    ```python
    import json
    import pandas as pd
    
    # 将数据集中的数据读取到一个 DataFrame 中
    dataset = pd.read_csv("New_Medium_data.csv")
    
    # 可循环使用如下语句读取数据集中指定行的记录
    row = dataset.iloc[0].to_dict()
    row["vector"] = json.loads(row["vector"])
    ```

1. 选择使用 LocalBulkWriter 或 RemoteBulkWriter。
    1. LocalBulkWriter 读取指定数据集并将其转换成JSON 或 NumPy 格式的文件。
        ```python
        # 使用 LocalBulkWriter
        import json
        from pymilvus import LocalBulkWriter, BulkFileType
        
        # 创建 LocalBulkWriter
        writer = LocalBulkWriter(
            schema=schema, # 目标 Collection 的 Schema
            local_path='/tmp/output', # 输出目录
            file_type=BulkFileType.JSON_RB # 输出文件类型
        )
        
        # 向 LocalBulkWriter 中传入数据。
        for i in range(len(dataset)):
            try:
                row = dataset.iloc[i].to_dict()
                row["vector"] = json.loads(row["vector"])
                writer.append_row(row)
            except Exception as e:
                print(e)
                break;
        
        writer.commit()
        print(writer.data_path)
        
        # 输出
        # /tmp/output/8f808cdc-ce4d-4aed-89b9-2f343d44b2e0
        ```

    1. RemoteBulkWriter 读取指定数据集，将其转换成 NumPy 格式的文件，并将这些文件上传到指定的对象存储桶中。
        RemoteBulkWriter 使用了 MinIO 的 Python Client。可以支持 MioIO，AWS S3 和 Google GCS 对象存储桶。方便您将转换后的数据上传到指定的存储桶中。

        ```python
        # 使用 RemoteBulkWriter
        import json
        from pymilvus import RemoteBulkWriter
        
        # 连接参数
        # 数据存储桶须兼容 MinIO Python Client.
        connect_param = RemoteBulkWriter.ConnectParam(
            endpoint=MINIO_ADDRESS,
            access_key=MINIO_ACCESS_KEY,
            secret_key=MINIO_SECRET_KEY,
            bucket_name=YOUR_BUCKET_NAME,
        )
        
        # 连接阿里云 OSS
        # 如须创建 RAM 用户及为其授权, 可参考 
        # https://help.aliyun.com/zh/ram/getting-started/create-a-ram-user-1
        # https://help.aliyun.com/zh/ram/getting-started/grant-permissions-to-a-ram-user#Using_CreateAccessKey
        #
        # connect_param = RemoteBulkWriter.ConnectParam(
        #     endpoint="oss-cn-hangzhou.aliyuncs.com",
        #     access_key=RAM_USER_ACCESS_KEY,
        #     secret_key=RAM_USER_SECRET_KEY,
        #     region="oss-cn-hangzhou",
        #     bucket_name=YOUR_BUCKET_NAME,
        # )
        
        # 创建 RemoteBulkWriter
        writer = RemoteBulkWriter(
            schema=schema, # 目标 Collection 的 Schema
            remote_path="bulk_data", # 当前操作的目标路径，RemoteBulkWriter会在指定存储桶中自动创建同名目录。
            connect_param=connect_param, # 存储桶连接参数
        )
        
        # Feed data rows to the writer
        for i in range(len(dataset)):
            try:
                row = dataset.iloc[i].to_dict()
                row["vector"] = json.loads(row["vector"])
                writer.append_row(row)
            except Exception as e:
                print(e)
                break;
        
        writer.commit()
        print(writer.data_path)
        
        # 输出结果
        # 在指定存储桶下生成的数据文件路径
        # /bulk_data/8f808cdc-ce4d-4aed-89b9-2f343d44b2e0
        ```

## 动态 Schema 支持 {#dynamic-schema-support}

如需为开启了动态 Schema 的 Collection 生成数据文件，可以在定义 Collection 的 Schema 时，将`enable_dynamic_schema` 设置为 `True`。

```python
from pymilvus import FieldSchema, CollectionSchema

fields = [
    ...
]

schema = CollectionSchema(fields, enable_dynamic_field=True)
```

## 检查结果 {#inspection-results}

- 使用 LocalBulkWriter 生成的结果，可使用 `writer.data_path` 获取文件存储路径。

- 使用 RemoteBulkWriter 生成的结果，可使用同样的方法获取文件存储路径。该路径是指定存储桶下的绝对路径。以 MinIO 为例，可使用如下命令检查生成的文件。
    ```shell
    > mc ls my-minio/a-bucket/bulk_data/8f808cdc-ce4d-4aed-89b9-2f343d44b2e0
    [2023-09-07 16:58:05 CST] 6.4KiB STANDARD claps.npy
    [2023-09-07 16:58:05 CST] 6.4KiB STANDARD id.npy
    [2023-09-07 16:58:05 CST] 441KiB STANDARD link.npy
    [2023-09-07 16:58:05 CST]  63KiB STANDARD publication.npy
    [2023-09-07 16:58:05 CST] 6.4KiB STANDARD reading_time.npy
    [2023-09-07 16:58:05 CST] 6.4KiB STANDARD responses.npy
    [2023-09-07 16:58:05 CST] 366KiB STANDARD title.npy
    [2023-09-07 16:58:05 CST] 4.7MiB STANDARD title_vector.npy
    ```

## 推荐阅读 {#recommended-reading}

- [通过 Web 控制台导入](./import-data-on-web-ui) 

- [通过 RESTful API 导入](./import-data-via-restful-api) 

- [通过 SDK 导入](./import-data-via-sdks) 
