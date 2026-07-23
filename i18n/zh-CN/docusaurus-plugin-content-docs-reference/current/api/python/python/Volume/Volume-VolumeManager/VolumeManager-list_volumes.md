---
title: "list_volumes() | Python"
slug: /python/python/VolumeManager-list_volumes
sidebar_label: "list_volumes()"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "添加 projectid 和 volumetype 过滤。 | Python"
type: docx
token: SyiHdehPHoO4l4x11tqcjzpOnLd
sidebar_position: 4
keywords: 
  - openai vector 数据库
  - 自然语言处理数据库
  - 廉价 vector 数据库
  - 托管 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - list_volumes()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_volumes()

添加 project_id 和 volume_type 过滤。

## 请求语法\{#request-syntax}

```python
# include-start zilliz
list_volumes(
    project_id: str,
    current_page: int = 1,
    page_size: int = 10,
    volume_type: Optional[str] = None,
) -> requests.Response
# include-end
```

**参数：**

- **project_id** (*str*) -
**[必需]**
要列出其 volumes 的 Zilliz Cloud project 的 ID。

- **current_page** (*int*) -
默认值：`1`
要返回的页码，从 1 开始。

- **page_size** (*int*) -
默认值：`10`
每页返回的 volumes 的最大数量。

- **volume_type** (*Optional[str]*) -
默认值：`None`
用于过滤结果的 volume 类型。支持的值为 `MANAGED` 和 `EXTERNAL`。

**返回类型：**

*requests.Response*

**返回：**

包含该 project 的一页 volumes 的 HTTP 响应。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请查看服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

该示例演示 list volumes 的用法。

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
