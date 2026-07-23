---
title: "create_volume() | Python"
slug: /python/python/VolumeManager-create_volume
sidebar_label: "create_volume()"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "添加 project/region 和 external-volume 参数。| Python"
type: docx
token: GtNKdyeDCoPxQXxvohIcYQ47nee
sidebar_position: 1
keywords: 
  - vector 数据库
  - IVF
  - knn
  - 图像搜索
  - zilliz
  - Zilliz Cloud
  - 云
  - create_volume()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_volume()

添加 project/region 和 external-volume 参数。

## 请求语法\{#request-syntax}

```python
# include-start zilliz
create_volume(
    project_id: str,
    region_id: str,
    volume_name: str,
    volume_type: Optional[str] = None,
    storage_integration_id: Optional[str] = None,
    path: Optional[str] = None,
) -> requests.Response
# include-end
```

**参数：**

- **project_id** (*str*) -
**[必需]**
要在其中创建 volume 的 Zilliz Cloud project 的 ID。

- **region_id** (*str*) -
**[必需]**
要在其中创建 volume 的 Zilliz Cloud region 的 ID。

- **volume_name** (*str*) -
**[必需]**
要创建的 volume 的名称。

- **volume_type** (*Optional[str]*) -
默认值：`None`
volume 类型。支持的值为 `MANAGED` 和 `EXTERNAL`；默认值为 `MANAGED`。

- **storage_integration_id** (*Optional[str]*) -
默认值：`None`
`EXTERNAL` volume 所需的 storage integration ID。

- **path** (*Optional[str]*) -
默认值：`None`
`EXTERNAL` volume 的存储路径。省略时，将使用 storage integration 根路径；提供的路径必须以 `/` 结尾。

**返回类型：**

*requests.Response*

**返回：**

描述 volume 创建请求的 HTTP 响应。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请检查服务器错误消息以获取确切的失败详情。

## 示例\{#examples}

该示例演示了 create volume 的用法。

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
