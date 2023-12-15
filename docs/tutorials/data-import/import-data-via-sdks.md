---
slug: /import-data-via-sdks
beta: FALSE
notebook: 05_use_local-bulk-writer.ipynb,06_use_remote-bulk-writer.ipynb,07_use_bulk_import.ipynb
sidebar_position: 4
---

import Admonition from '@theme/Admonition';


# 通过 SDK 导入

本节将帮助你了解如何使用 SDK 的 BulkWriter 和 BulkImport API 向 Collection 中导入数据。

## 准备工作{#before-you-start}

在执行本节操作前，请确认如下工作已经完成。

- 安装最新版本的 Python SDK。具体可参考 [安装 SDK](./install-sdks#install-pymilvus-python-sdk) 。
    当前，仅 PyMilvus 提供了 BulkWriter 和 BulkImport API。本节将使用 PyMilvus 演示批量导入数据的过程。

- 已在 Zilliz Cloud 上创建了一个 Cluster，并在该 Cluster 中创建了一个 Collection。具体可参考[创建集群](./create-cluster)和[创建 Collection](./create-collection)。

- 已下载格式为CSV的[示例数据集](https://drive.google.com/file/d/12RkoDPAlk-sclXdjeXT6DMFVsQr4612w/view?usp=sharing)。关于该数据集的更多信息，请[阅读简介](https://www.kaggle.com/datasets/shiyu22chen/cleaned-medium-articles-dataset)。

## 具体步骤{#procedure}

向 Zilliz Cloud 批量导入您 的数据，需要先使用 BulkWriter API 将您的数据转换成一个合适的格式，然后再使用 BulkImport API 将转换后的数据文件中的数据批量存入指定的 Collection 中。

### 转化数据{#converting-your-data}

1. 获取已创建的 Collection 的 Schema。
    按照示例数据集，该 Collection 的 Schema 中应包含两个主要字段，分别为 `id` 和 `vector`。其中，`id` 字段为开启了auto-id的主键，`vector` 字段的维度为 768。数据集中的其它字段均为动态字段。

    ```python
    from pymilvus import (
        connections,
        FieldSchema, CollectionSchema, DataType,
        Collection,
        utility,
        bulk_import,
        get_import_progress,
        list_import_jobs,
    )
    
    # set up your collection
    
    connections.connect(
      alias='default', 
      #  Public endpoint obtained from Zilliz Cloud
      uri=CLUSTER_ENDPOINT,
      # API key or a colon-separated cluster username and password
      token=TOKEN, 
    )
    
    # Get an existing collection
    collection = Collection("medium_articles_2020")
    
    # Get the schema of the collection
    schema = collection.schema
    ```

1. 使用 BulkWriter API 将您的数据转换为 Zilliz Cloud 可以消费的格式。
    示例数据集的格式为CSV。可以使用 Pandas 库对其进行处理。最终目标是生成一个在下一步中供 BulkWriter 消费的字典列表。

    ```python
    import json
    import pandas as pd
    
    # 将数据集中的数据读取到一个 DataFrame 中
    dataset = pd.read_csv("New_Medium_data.csv")
    
    # 可循环使用如下语句读取数据集中指定行的记录
    row = dataset.iloc[0].to_dict()
    row["vector"] = json.loads(row["vector"])
    ```

1. 创建一个 RemoteBulkWriter 对象。输入包括目标 Collection 的 Schema 及其它必要的参数。
    示例代码中指定了一个 AWS S3 桶。请使用与您的目标集群处于同一公有云的对象存储桶。

    ```python
    from pymilvus import RemoteBulkWriter
    
    # 连接阿里云 OSS
    # 关于如何创建 RAM 用户及对其进行授权，可参考 
    # https://help.aliyun.com/zh/ram/getting-started/create-a-ram-user-1
    # https://help.aliyun.com/zh/ram/getting-started/grant-permissions-to-a-ram-user
    
    connect_param = RemoteBulkWriter.ConnectParam(
        endpoint="oss-cn-hangzhou.aliyuncs.com",
        access_key="RAM_USER_ACCESS_KEY",
        secret_key="RAM_USER_SECRET_KEY",
        bucket_name="OBJECT_STORAGE_BUCKET_NAME",
        region="oss-cn-hangzhou",
        secure=True
    )
    
    # 创建 RemoteBulkWriter
    writer = RemoteBulkWriter(
        schema=schema, # 目标 Collection 的 Schema
        remote_path="bulk_data", # 当前操作的目标路径，RemoteBulkWriter会在指定存储桶中自动创建同名目录。
        connect_param=connect_param, # 存储桶连接参数
    )
    
    # 向 RemoteBulkWriter 对象传入数据。
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

1. 检查结果
    如下示例使用 MinIO 的 Python Client 检查指定存储桶中的文件。您可以使用其它您认为合适的方式对指定存储进行检查。

    ```python
    from minio import Minio
    
    minio_client = Minio(
        endpoint="oss-cn-hangzhou.aliyuncs.com",
        access_key="RAM_USER_ACCESS_KEY",
        secret_key="RAM_USER_SECRET_KEY",
        bucket_name="OBJECT_STORAGE_BUCKET_NAME",
        region="oss-cn-hangzhou",
        secure=True
    )
    
    found = minio_client.bucket_exists(OBJECT_STORAGE_BUCKET_NAME)
    
    if found:
        objects = minio_client.list_objects(OBJECT_STORAGE_BUCKET_NAME, prefix=str(remote_path)[1:], recursive=True)
        files = [ x.object_name for x in objects ]
    
    # Output
    # [
    #    'bulk_data/08a92d25-c703-4694-bfaa-5be4e8d0f6f9/1/vector.npy'
    #    'bulk_data/08a92d25-c703-4694-bfaa-5be4e8d0f6f9/1/$meta.npy'
    # ]
    ```

### 批量导入数据{#bulk-inserting-data}

为了方便用户在 Python 代码中调用 Zilliz Cloud 的 Import RESTful APIs，PyMilvus 对相关的 RESTful 接口进行了包括，提供了 BulkImport 接口。

1. 引入 PyMilvus 的 BulkImport 接口。
    ```python
    import time
    from pymilvus import (
        bulk_import,
        get_import_progress,
        list_import_jobs,
    )
    ```

1. 创建一个批量导入任务。
    该接口返回已创建的 BulkImport 任务ID。

    ```python
    # A valid object URL should be similar as follows:
    # https://<bucket-name>.<aliyun-region-id>.aliyuncs.com/<object-name>
    
    resp = bulk_import(
        url=CLOUD_PLATFORM_ENDPOINT, # Cluster endpoint
        api_key=API_KEY, # Your Zilliz Cloud API Key
        object_url=OBJECT_URL, # Your object storage url
        access_key=MINIO_ACCESS_KEY, # Your object storage access key
        secret_key=MINIO_SECRET_KEY, # Your object storage secret key
        cluster_id=CLUSTER_ID, # Your cluster ID
        collection_name=COLLECTION_NAME # Your collection name
    )
    
    print(resp.json())
    
    # Output
    # {
    #     'code': 200, 
    #     'data': {
    #         'jobId': '84e3f533-0c13-4823-a3f0-db4e62dac2a6'
    #      }
    # }
    ```

1. 获取 BulkImport 任务的进度信息。
    ```python
    job_id = resp.json()['data']['jobId']
    resp = get_import_progress(
        url=CLOUD_PLATFORM_ENDPOINT,
        api_key=API_KEY,
        job_id=JOB_ID,
        cluster_id=INSTANCE_ID
    )
    
    # Send request until the bulk-import progress ends.
    while resp.json()["data"]["readyPercentage"] < 1:
        time.sleep(5)
        print(resp.json())
    
        resp = get_import_progress(
            url=CLOUD_PLATFORM_ENDPOINT,
            api_key=API_KEY,
            job_id=JOB_ID,
            cluster_id=INSTANCE_ID
        )
    
    # Output
    # {
    #     'code': 200, 
    #     'data': {
    #         'collectionName': 'medium_articles', 
    #         'fileName': 'medium_articles/293dbffc-465e-4ce1-b25b-a692c9b77dd8/1/', 
    #         'fileSize': 28340716, 
    #         'readyPercentage': 0, # Watch this for the progress
    #         'completeTime': None, 
    #         'errorMessage': None, 
    #         'jobId': '84e3f533-0c13-4823-a3f0-db4e62dac2a6', 
    #         'details': [
    #              {
    #                  'fileName': 'medium_articles/293dbffc-465e-4ce1-b25b-a692c9b77dd8/1/', 
    #                  'fileSize': 28340716, 
    #                  'readyPercentage': 0, 
    #                  'completeTime': None, 
    #                  'errorMessage': None
    #              }
    #          ]
    #    }
    # }
    ```

您还可以调用 ListImportJobs API来了解其它批量导入任务的运行情况。

## 推荐阅读{#related-topics}

- [通过 Web 控制台导入](./import-data-on-web-ui) 

- [通过 RESTful API 导入](./import-data-via-restful-api) 

- [使用 BulkWriter 导入](./use-bulkwriter-for-data-import) 
