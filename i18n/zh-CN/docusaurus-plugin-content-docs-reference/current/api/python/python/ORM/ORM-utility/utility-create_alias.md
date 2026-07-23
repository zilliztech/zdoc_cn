---
title: "create_alias() | Python | ORM"
slug: /python/python/utility-create_alias
sidebar_label: "create_alias()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为现有 collection 创建别名。 | Python | ORM"
type: docx
token: DthMdlg8Lozw89xNz4TcBv1LnOe
sidebar_position: 3
keywords: 
  - 深度学习
  - 知识库
  - 自然语言处理
  - AI 聊天机器人
  - zilliz
  - Zilliz Cloud
  - cloud
  - create_alias()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_alias()

此操作为现有 collection 创建别名。

## 请求语法\{#request-syntax}

```python
create_alias(
    collection_name: str,
    alias: str,
    using: str,
    timeout: float | None
)
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    要为其创建别名的 collection 名称。

- **alias** (*str*) -

    **[必需]**

    collection 的别名。在执行此操作之前，请确保该别名尚不存在。如果已存在，将会发生异常。

    <Admonition type="info" icon="📘" title="Note">

    什么是 collection 别名？
    
        collection 别名是 collection 的附加名称。当你希望在不更改任何代码的情况下将应用程序切换到新的 collection 时，collection 别名非常有用。
    
        collection 别名是全局唯一标识符。一个别名只能分配给且仅分配给一个 collection。反过来，一个 collection 可以有多个别名。
    
        假设有一个 collection：`collection_1`。你可以通过调用 `create_alias("collection_1", "bob")` 和 `create_alias("collection_1", "tom")` 为此 collection 分配两个不同的别名（`bob` 和 `tom`）。

    </Admonition>

- **using** (*str*) - 

    所用连接的别名。

    默认值为 **default**，表示此操作使用默认连接。

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示此操作在收到任何响应或发生任何错误时超时。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，尤其是当你将 `alias` 设置为现有别名时，将引发此异常。

- **BaseException**

    当此操作失败时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import connections, Collection, utility

# Connection to YOUR_CLUSTER_ENDPOINT
connections.connect()

# Get an existing collection
collection_1 = Collection("collection_1")

# Create an alias for collection_1
utility.create_alias(collection_name="collection_1", alias="bob")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob']

# Create another alias for collection_1
utility.create_alias(collection_name="collection_1", alias="tom")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob', 'tom']
```

## 相关操作\{#related-operations}

以下操作与 `create_alias()` 相关：

- [alter_alias()](./utility-alter_alias)

- [drop_alias()](./utility-drop_alias)

- [list_aliases()](./utility-list_aliases)

