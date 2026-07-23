---
title: "list_collections() | Python | ORM"
slug: /python/python/utility-list_collections
sidebar_label: "list_collections()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出当前连接所使用数据库中的所有 collection。 | Python | ORM"
type: docx
token: QgxEdfBMSodYo6xCg24cH3hInr4
sidebar_position: 24
keywords: 
  - knn 算法
  - HNSW
  - 什么是非结构化数据
  - Vector embeddings
  - zilliz
  - zilliz cloud
  - cloud
  - list_collections()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_collections()

此操作列出当前连接所使用数据库中的所有 collection。

## 请求语法\{#request-syntax}

```python
list_collections(
    timeout: float | None,
    using: str = "default",
)
```

**参数：**

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示当收到任何响应或发生任何错误时，此操作即超时。

- **using** (*str*) - 

    所使用连接的别名。

    默认值为 **default**，表示此操作使用默认连接。

**返回类型：**

*list*

**返回：**
collection 名称列表。

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常，尤其是在指定的别名不存在时。

## 示例\{#examples}

```python
from pymilvus import connections, utility

connections.connect()

utility.list_collections()
```

## 相关操作\{#related-operations}

以下操作与 `list_collections()` 相关：

- [drop_collection()](./utility-drop_collection)

- [flush_all()](./utility-flush_all)

- [has_collection()](./utility-has_collection)

- [has_partition()](./utility-has_partition)

- [rename_collection()](./utility-rename_collection)

