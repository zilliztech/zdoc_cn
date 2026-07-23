---
title: "describe_user() | Python | MilvusClient"
slug: /python/python/Authentication-describe_user
sidebar_label: "describe_user()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "返回与用户账户关联的 `roles` 和 `description`。当用户不存在时，返回空字典。 | Python | MilvusClient"
type: docx
token: TwTnduPOioywHDx8hPQc80tRnKg
sidebar_position: 6
keywords: 
  - 什么是 milvus
  - milvus 数据库
  - milvus lite
  - milvus benchmark
  - zilliz
  - zilliz cloud
  - cloud
  - describe_user()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# describe_user()

返回与用户账户关联的 `roles` 和 `description`。当用户不存在时，返回空字典。

## 请求语法\{#request-syntax}

```python
describe_user(
    user_name: str,
    timeout: Optional[float] = None,
    **kwargs
) -> dict
```

**参数：**

- **user_name** (*str*) -
**[必需]**
要描述的用户账户名称。

- **timeout** (*Optional[float]*) -
默认值：`None`
等待 RPC 完成的最长时间（以秒为单位）。

- **kwargs** (*Any*) -
其他请求上下文选项。

**返回类型：**

*dict*

**返回：**

包含 `user_name`、`roles` 和 `description` 的字典。当未找到用户时，返回空字典。

- **user_name** (*str*) -
所描述的用户账户名称。

- **roles** (*list[str]*) -
分配给该用户账户的角色。

- **description** (*str*) -
为该用户账户存储的描述。

**异常：**

- **MilvusException**
当服务器拒绝请求或 RPC 失败时抛出。请检查服务器错误消息以了解确切的失败详情。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="YOUR_CLUSTER_ENDPOINT", token="YOUR_CLUSTER_TOKEN")
user = client.describe_user("analyst")
print(user)
# {
#     "user_name": "analyst",
#     "roles": ["read_only"],
#     "description": "Analytics account",
# }
```
