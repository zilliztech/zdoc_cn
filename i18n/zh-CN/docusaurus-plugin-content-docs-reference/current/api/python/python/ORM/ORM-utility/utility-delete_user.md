---
title: "delete_user() | Python | ORM"
slug: /python/python/utility-delete_user
sidebar_label: "delete_user()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除现有用户。| Python | ORM"
type: docx
token: E7zOdU2JpoqaU5xNYXvcAjgPnNh
sidebar_position: 6
keywords: 
  - Vector index
  - vector database 开源
  - 开源 vector db
  - vector database 示例
  - zilliz
  - Zilliz Cloud
  - cloud
  - delete_user()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# delete_user()

此操作会删除现有用户。

## 请求语法\{#request-syntax}

```python
delete_user(
    user: str,
    password: str,
    using: str,
    timeout: float | None
)
```

**参数：**

- **user** (*string*) - 

    **[必需]**

    要删除的新用户的名称。

- **password** (*string*) - 

    **[必需]**

    要创建的新用户对应的密码。

    将此项设置为错误密码会导致 **MilvusException**。

- **using** (*string*) - 

    所使用连接的别名。

    默认值为 **default**，表示此操作使用默认连接。

- **timeout** (*float* | *None*)  

    此操作的超时时长。将此项设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import connections, utility

# Connection to YOUR_CLUSTER_ENDPOINT
connections.connect()

# Delete an existing user
user = utility.delete_user(user="admin", password="123456")
```

## 相关操作\{#related-operations}

以下操作与 `delete_user()` 相关

- [Role](./ORM-Role)

- [create_user()](./utility-create_user)

- [list_roles()](./utility-list_roles)

- [list_user()](./utility-list_user)

- [list_users()](./utility-list_users)

- [list_usernames()](./utility-list_usernames)

- [reset_password()](./utility-reset_password)

- [update_password()](./utility-update_password)

