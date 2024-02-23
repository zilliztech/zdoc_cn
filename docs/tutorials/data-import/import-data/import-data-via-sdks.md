---
slug: /import-data-via-sdks
beta: FALSE
notebook: 05_use_local-bulk-writer.ipynb,06_use_remote-bulk-writer.ipynb,07_use_bulk_import.ipynb
token: Xv4awWJZpiKoJjkPTlic98Mindc
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 通过 SDK 导入

本节将帮助你了解如何使用 SDK 的 BulkWriter 和 BulkImport API 向 Collection 中导入数据。

另外，您还可以参考我们的[快速入门指南](./data-import-zero-to-hero)。其中包含了数据准备和数据导入两个部分的内容。

## 安装依赖{#install-denpendencies}

在命令行中运行如下命令安装 pymilvus 和 minio 或将它们升级到最新版本。

```shell
python3 -m pip install --upgrade pymilvus minio
```

### 检查已准备数据{#check-prepared-data}

在您[使用 BulkWriter](./use-bulkwriter) 完成数据准备工作后，你会获得一个路径，指向准备好的数据文件。您可以使用如下代码来检查这些数据文件。

```python
from minio import Minio

# Third-party constants
YOUR_ACCESS_KEY = "YOUR_ACCESS_KEY"
YOUR_SECRET_KEY = "YOUR_SECRET_KEY"
YOUR_BUCKET_NAME = "YOUR_BUCKET_NAME"
YOUR_REMOTE_PATH = "YOUR_REMOTE_PATH"

client = Minio(
    endpoint="storage.googleapis.com", # use 's3.amazonaws.com' for AWS S3
    access_key=YOUR_ACCESS_KEY,
    secret_key=YOUR_SECRET_KEY,
    secure=True
)

objects = client.list_objects(
    bucket_name=YOUR_BUCKET_NAME,
    prefix=YOUR_REMOTE_PATH,
    recursive=True
)

print([obj.object_name for obj in objects])

# Output
#
# [
#     "folder/1/claps.npy",
#     "folder/1/id.npy",
#     "folder/1/link.npy",
#     "folder/1/publication.npy",
#     "folder/1/reading_time.npy",
#     "folder/1/responses.npy",
#     "folder/1/title.npy",
#     "folder/1/vector.npy"
# ]

```

### 创建 Collection 并导入数据{#create-collection-and-import-data}

准备好数据文件后，您需要先连接到 Zilliz Cloud 集群，根据数据集的格式创建相应的 Collection，并从存储桶中导入数据文件。

对于如何在 Zilliz Cloud 控制台上获取相关信息，可以参考 [Zilliz Cloud 控制台](./on-zilliz-cloud-console)。

<Admonition type="info" icon="📘" title="说明">

<p>由于 Zilliz Cloud 目前不支持跨云数据传输，您的 Zilliz Cloud 集群和数据集需位于同一公共云平台上。</p>

</Admonition>

```python
from pymilvus import MilvusClient, DataType

# set up your collection

## Zilliz Cloud constants
CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
CLUSTER_TOKEN = "YOUR_CLUSTER_TOKEN"
COLLECTION_NAME = "medium_articles"
API_KEY = "YOUR_CLUSTER_TOKEN"
CLUSTER_ID = "YOUR_CLUSTER_ID"

## Third-party constants
YOUR_OBJECT_URL = "YOUR_OBJECT_URL"

# create a milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=CLUSTER_TOKEN
)

# prepare schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_schema=False
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="link", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="reading_time", datatype=DataType.INT64)
schema.add_field(field_name="publication", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="claps", datatype=DataType.INT64)
schema.add_field(field_name="responses", datatype=DataType.INT64)

# prepare index parameters
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    metric_type="L2"
)

client.create_collection(
    collection_name="customized_setup",
    schema=schema,
    index_params=index_params
)# }
```

## 导入数据{#import-data}

在待导入数据和 Collection 都准备就绪后，可以使用如下脚本将数据导入 Collection。

```python
from pymilvus import bulk_import

# Bulk-import your data from the prepared data files

res = bulk_import(
    url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
    api_key=API_KEY,
    object_url=OBJECT_URL,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    cluster_id=CLUSTER_ID,
    collection_name=COLLECTION_NAME
)

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a"
#     }
# }
```

### 查看批量导入进度{#check-import-progress}

可通过以下代码查看批量导入进度：

```python
from pymilvus import get_import_progress

job_id = res.json()['data']['jobId']
res = get_import_progress(
    url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
    api_key=API_KEY,
    job_id=job_id,
    cluster_id=CLUSTER_ID
)

# check the bulk-import progress

while res.json()["data"]["readyPercentage"] < 1:
    time.sleep(5)

    res = get_import_progress(
        url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
        api_key=API_KEY,
        job_id=job_id,
        cluster_id=CLUSTER_ID
    )

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "collectionName": "medium_articles",
#         "fileName": "folder/1/",
#         "fileSize": 26571700,
#         "readyPercentage": 1,
#         "completeTime": "2023-10-28T06:51:49Z",
#         "errorMessage": null,
#         "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
#         "details": [
#             {
#                 "fileName": "folder/1/",
#                 "fileSize": 26571700,
#                 "readyPercentage": 1,
#                 "completeTime": "2023-10-28T06:51:49Z",
#                 "errorMessage": null
#             }
#         ]
#     }
# }
```

### 列出所有批量导入任务{#list-all-import-jobs}

您还可以调用 ListImportJobs API 来了解其它批量导入任务的运行情况：

```python
from pymilvus import list_import_jobs

# list bulk-import jobs

res = list_import_jobs(
    url=f"controller.api.{CLOUD_REGION}.zillizcloud.com",
    api_key=API_KEY,
    cluster_id=CLUSTER_ID,
    page_size=10,
    current_page=1,
)

print(res.json())

# Output
#
# {
#     "code": 200,
#     "data": {
#         "tasks": [
#             {
#                 "collectionName": "medium_articles",
#                 "jobId": "9d0bc230-6b99-4739-a872-0b91cfe2515a",
#                 "state": "ImportCompleted"
#             },
#             {
#                 "collectionName": "medium_articles",
#                 "jobId": "53632e6c-c078-4476-b840-10c4793d9c08",
#                 "state": "ImportCompleted"
#             },
#         ],
#         "count": 2,
#         "currentPage": 1,
#         "pageSize": 10
#     }
# }
```

## 推荐阅读{#related-topics}

- [通过 Web 控制台导入](./import-data-on-web-ui)

- [通过 RESTful API 导入](./import-data-via-restful-api)

- [使用 BulkWriter 导入](./prepare-source-data) 

