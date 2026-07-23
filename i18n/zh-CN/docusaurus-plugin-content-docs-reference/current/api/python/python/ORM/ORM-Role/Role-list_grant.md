---
title: "list_grant() | Python | ORM"
slug: /python/python/Role-list_grant
sidebar_label: "list_grant()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出当前 role 与指定对象之间的关系。 | Python | ORM"
type: docx
token: JXNXdQuwhoYmZQxSohNcdxtwnzh
sidebar_position: 7
keywords: 
  - llm-as-a-judge
  - hybrid vector search
  - 视频去重
  - 视频相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - list_grant()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# list_grant()

此操作列出当前 role 与指定对象之间的关系。

## 请求语法\{#request-syntax}

```python
list_grant(
    object: str,
    object_name: str,
    db_name: str
)
```

**参数：**

- **object** (*str*)

    **[必需]**

    要授予权限的对象类型。

    该值区分大小写。有关详细信息，请参阅用户与角色。

- **object_name** (*str*)

    **[必需]**

    **object** 中指定类型的目标对象名称。

    它可以是 collection 名称、用户名称或通配符 (*)。

- **db_name** (*str*)

    对象所属数据库的名称。如果未指定，则使用默认数据库。

**返回类型：**

*GrantInfo*

**返回：**

一个包含 **GrantItem** 对象列表的 **GrantInfo** 对象。

```python
├── GrantInfo
│   └── groups  
│       └── GrantItem
│           ├── object
│           ├── object_name
│           ├── role_name
│           ├── grantor_name
│           ├── privilege
│           └── db_name
```

**GrantItem** 对象包含以下字段：

- **object** (*str*)

    权限所属对象的类型。

- **object_name** (*str*)

    被授予指定权限的 role 对应的对象名称。

- **role_name** (*str*)

    要检查的 role 名称。

- **grantor_name** (*str*）

    向用户授予特定 role 的用户名称。

- **privilege** (*str*)

    授予 role 的权限。

- **db_name** (str)

    执行此操作所在的数据库名称。

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import Role

# Get an existing role
role = Role(name="root")

# List the relationship between the current role and the specified object.
res = list_grant(
    object="Collection",
    object_name="test_collection",
    db_name="test_db"
)
```

## 相关操作\{#related-operations}

以下操作与 `get_replicas()` 相关：

- [add_user()](./Role-add_user)

- [get_users()](./Role-get_users)

- [is_exist()](./Role-is_exist)

- [list_grants()](./Role-list_grants)

- [remove_user()](./Role-remove_user)

