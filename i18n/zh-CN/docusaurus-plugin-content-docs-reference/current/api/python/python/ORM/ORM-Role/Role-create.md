---
title: "create() | Python | ORM"
slug: /python/python/Role-create
sidebar_label: "create()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建当前角色。 | Python | ORM"
type: docx
token: G3h4d3jx6oXFHBxFZlyc9jLKnTO
sidebar_position: 2
keywords: 
  - 余弦距离
  - 什么是 vector database
  - vectordb
  - 多模态 vector database 检索
  - zilliz
  - zilliz cloud
  - cloud
  - create()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create()

此操作会创建当前角色。

## 请求语法\{#request-syntax}

```python
create()
```

**参数：**

不适用

**返回类型：**

*NoneType*

**返回：**

*None*

**异常：**

- **MilvusException**

    当此操作过程中发生任何错误时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import Role, utility

# Get an existing role
role = Role(name="test")

# Create a new role
role.create()

# List all roles
roles = utility.list_roles(include_user_info=True)

# Output
# RoleInfo groups:
# - RoleItem: <role_name:admin>, <users:('admin',)>
# - RoleItem: <role_name:public>, <users:()>
# - RoleItem: <role_name:test>, <users:()>
```

## 相关操作\{#related-operations}

以下操作与 `create()` 相关：

- [add_user()](./Role-add_user)

- [drop()](./Role-drop)

- [get_users()](./Role-get_users)

- [grant()](./Role-grant)

- [is_exist()](./Role-is_exist)

- [list_grant()](./Role-list_grant)

- [list_grants()](./Role-list_grants)

- [remove_user()](./Role-remove_user)

- [revoke()](./Role-revoke)

