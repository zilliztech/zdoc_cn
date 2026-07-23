---
title: "list_privilege_groups() | Python | MilvusClient"
slug: /python/python/Authentication-list_privilege_groups
sidebar_label: "list_privilege_groups()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有现有的权限组。| Python | MilvusClient"
type: docx
token: N6kjdex5Ao0lRqxPXBhcxq4AnNh
sidebar_position: 13
keywords: 
  - hnsw 算法
  - vector 相似性搜索
  - 近似最近邻搜索
  - DiskANN
  - zilliz
  - Zilliz Cloud
  - cloud
  - list_privilege_groups()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_privilege_groups()

此操作列出所有现有的权限组。

## 请求语法\{#request-syntax}

```python
list_privilege_groups(
    self,
    timeout: Optional[float] = None,
    **kwargs,
) -> List[Dict[str, str]]
```

**参数：**

- **timeout** (*Optional[float]*) - 

    此操作的超时时长。

    将其设置为 None 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*List[Dict[str, str]]*

**返回：**

权限组名称列表。

**异常：**

- **MilvusException**

    当此操作过程中发生任何错误时，尤其是指定的 alias 不存在时，将引发此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

res = client.list_privilege_groups()

# ['my_privilege_group']
```

