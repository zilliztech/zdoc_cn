---
title: "VolumeBulkWriter | Python"
slug: /python/python/DataImport-VolumeBulkWriter
sidebar_label: "VolumeBulkWriter"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "添加连接行为和本地输出路径行为。| Python"
type: docx
token: L9ozd33RroJ0NZxHUc0czKjpnbh
sidebar_position: 3
keywords: 
  - 稠密向量
  - 分层可导航小世界
  - 稠密嵌入
  - Faiss 向量数据库
  - zilliz
  - zilliz cloud
  - cloud
  - VolumeBulkWriter
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# VolumeBulkWriter

添加连接行为和本地输出路径行为。

## 请求语法\{#request-syntax}

```python
# include-start zilliz
VolumeBulkWriter(
    schema: CollectionSchema,
    remote_path: str,
    cloud_endpoint: str,
    api_key: str,
    volume_name: str,
    chunk_size: int = 1024 * MB,
    file_type: BulkFileType = BulkFileType.PARQUET,
    config: Optional[dict] = None,
    connect_type: ConnectType = ConnectType.AUTO,
    **kwargs,
)
# include-end
```

**参数：**

- **schema** (*CollectionSchema*) -
**[必需]**
用于验证行并生成 bulk 文件的 collection schema。

- **remote_path** (*str*) -
**[必需]**
目标 volume 中已提交文件上传到的目录。

- **cloud_endpoint** (*str*) -
**[必需]**
Zilliz Cloud API 服务器 endpoint，即 `https://api.cloud.zilliz.com`。

- **api_key** (*str*) -
**[必需]**
用于向 Zilliz Cloud 进行身份验证的 API key。

- **volume_name** (*str*) -
**[必需]**
目标 Zilliz Cloud volume 的名称。

- **chunk_size** (*int*) -
默认值：`1024 * MB`
writer 开始新文件之前允许的最大本地 chunk 大小（以字节为单位）。

- **file_type** ([BulkFileType](./DataImport-BulkFileType)) -
默认值：`BulkFileType.PARQUET`
writer 生成的 bulk-file 格式。

- **config** (*Optional[dict]*) -
默认值：`None`
可选的 writer 配置。

- **connect_type** (*ConnectType*) -
默认值：`ConnectType.AUTO`
用于 volume 操作的连接模式。

- **kwargs** (*Any*) -
转发给 `LocalBulkWriter` 的其他选项。

**返回类型：**

*VolumeBulkWriter*

**返回：**

一个 writer，用于在本地暂存 bulk 文件，并将已提交的文件上传到配置的 Zilliz Cloud volume。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

该示例演示了 VolumeBulkWriter 的用法。

```python
# include-start zilliz
from pymilvus.bulk_writer import VolumeFileManager, VolumeManager

manager = VolumeManager(cloud_endpoint="https://api.cloud.zilliz.com", api_key="YOUR_API_KEY")
manager.create_volume(project_id="proj-xxxx", region_id="aws-us-west-2", volume_name="book-volume", volume_type="EXTERNAL")
manager.describe_volume("book-volume")
manager.list_volumes(project_id="proj-xxxx", volume_type="EXTERNAL")

file_manager = VolumeFileManager(cloud_endpoint="https://api.cloud.zilliz.com", api_key="YOUR_API_KEY", volume_name="book-volume")
file_manager.upload_file_to_volume(source_file_path="./data/books.parquet", target_volume_path="datasets/books/books.parquet", upload_concurrency=4)
# include-end
```
