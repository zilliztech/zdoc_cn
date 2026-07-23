---
title: "alter_alias() | Python | ORM"
slug: /python/python/utility-alter_alias
sidebar_label: "alter_alias()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将一个 collection 的 alias 重新分配给另一个 collection。 | Python | ORM"
type: docx
token: MfTsdrbGcoO9JqxjgPtcMZTvncc
sidebar_position: 1
keywords: 
  - rag vector database
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 对比
  - zilliz
  - zilliz cloud
  - cloud
  - alter_alias()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# alter_alias()

此操作将一个 collection 的 alias 重新分配给另一个 collection。

## 请求语法\{#request-syntax}

```python
alter_alias(
    collection_name: str,
    alias: str,
    using: str,
    timeout: float | None
)
```

```python
from pymilvus import utility

# Alter collection alias
alter_alias(
    collection_name="string",
    alias="string",
    using="default"
)
```

**参数：**

- **collection_name** (*str*) -

    **[必填]**

    要重新分配 alias 的目标 collection 名称。

- **alias** (*str*) -

    **[必填]**

    collection 的 alias。请注意，该 alias 应预先存在。

    <Admonition type="info" icon="📘" title="Note">

    什么是[ collection](./ORM-Collection) alias？
    
        [ collection](./ORM-Collection) alias 是 collection 的附加名称。当你希望在不更改代码的情况下将应用程序切换到新的 collection 时，collection alias 非常有用。
    
        在  中，[ collection](./ORM-Collection) alias 是全局唯一标识符。一个 alias 只能分配给一个 collection。反过来，一个 collection 可以有多个 alias。
    
        下面是将一个 collection 的 alias 重新分配给另一个 collection 的示例：
    
        假设有两个 collection：`collection_1` 和 `collection_2`。还有一个名为 `bob` 的 collection alias，最初分配给了 `collection_1`：
    
        - `collection_1` 的 alias = ["bob"]
    
        - `collection_2` 的 alias = []
    
        调用 `alter_alias("collection_2", "bob")` 后：
    
        - `collection_1` 的 alias = []
    
        - `collection_2` 的 alias = ["bob"]

    </Admonition>

- **using** (*str*) - 

    所使用连接的 alias。

    默认值为 **default**，表示此操作使用默认连接。

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示当任何响应到达或发生任何错误时，此操作超时。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时将抛出此异常，尤其是在指定的 alias 不存在时。

## 示例\{#examples}

```python
from pymilvus import connections, Collection, utility

# Connection to YOUR_CLUSTER_ENDPOINT
connections.connect()

# Get two existing collections
collection_1 = Collection("collection_1")
collection_2 = Collection("collection_2")

# Create an alias for collection_1
utility.create_alias(collection_name="collection_1", alias="bob")

# List aliases for both collections
utility.list_aliases(collection_name="collection_1") # ['bob']
utility.list_aliases(collection_name="collection_2") # []
        
# Reassigns the alias to collection_2
utility.alter_alias(collection_name="test_collection_2", alias="bob")

# List aliases for both collections
utility.list_aliases(collection_name="collection_1") # []
utility.list_aliases(collection_name="collection_2") # ['bob']
```

## 相关操作\{#related-operations}

以下操作与 `alter_alias()` 相关：

- [create_alias()](./utility-create_alias)

- [drop_alias()](./utility-drop_alias)

- [list_aliases()](./utility-list_aliases)

