---
title: "upload_file_to_volume() | Python"
slug: /python/python/VolumeFileManager-upload_file_to_volume
sidebar_label: "upload_file_to_volume()"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "添加并发、重试、分片大小、路径和进度回调控制。| Python"
type: docx
token: SAR6dnlmmohi30x0x2KcioyXnib
sidebar_position: 1
keywords: 
  - 图像相似性搜索
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - upload_file_to_volume()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# upload_file_to_volume()

添加并发、重试、分片大小、路径和进度回调控制。

<Admonition type="info" icon="📘" title="说明">

这仅适用于托管卷。外部卷为只读。

</Admonition>

## 请求语法\{#request-syntax}

```python
# include-start zilliz
upload_file_to_volume(
    source_file_path: str,
    target_volume_path: str,
    upload_concurrency: int = 5,
    max_retries: int = 5,
    retry_interval: float = 5.0,
    progress_callback: Callable[[UploadProgress], None] | None = None,
    part_size: int = 0,
) -> dict
# include-end
```

**参数：**

- **source_file_path** (*str*) -
**[必需]**
要上传的本地文件或目录路径。

- **target_volume_path** (*str*) -
**[必需]**
Zilliz Cloud 卷中的目标路径。

- **upload_concurrency** (*int*) -
默认值：`5`
可并发上传的最大文件数。

- **max_retries** (*int*) -
默认值：`5`
每个文件的最大上传尝试次数。

- **retry_interval** (*float*) -
默认值：`5.0`
上传尝试之间的延迟时间（秒）。

- **progress_callback** (*Callable[[UploadProgress], None] | None*) -
默认值：`None`
通过上传进度快照调用的回调函数。

- **part_size** (*int*) -
默认值：`0`
分片上传的分片大小（字节）。使用 `0` 可自动选择大小。

**返回类型：**

*dict*

**返回：**

包含 volumeName、volume_name 和已上传目标路径的字典。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

以下示例演示上传文件到卷的用法。

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
