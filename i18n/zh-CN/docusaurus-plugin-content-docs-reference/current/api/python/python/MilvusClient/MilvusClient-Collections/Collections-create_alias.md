---
title: "create_alias() | Python | MilvusClient"
slug: /python/python/Collections-create_alias
sidebar_label: "create_alias()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为现有 collection 创建别名。 | Python | MilvusClient"
type: docx
token: Kqlodu0AWoefKvxczcxc1c36nlf
sidebar_position: 4
keywords: 
  - 开源 vector database
  - 开源 vector db
  - vector database 示例
  - rag vector database
  - zilliz
  - zilliz cloud
  - cloud
  - create_alias()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_alias()

此操作为现有 collection 创建别名。

<Admonition type="info" icon="📘" title="说明">

此方法适用于 Dedicated 服务 cluster 和按需计算。 

- 对于服务 cluster 中的 collection，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于按需计算中的 collection，请使用 project endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
create_alias(
    collection_name: str,
    alias: str,
    timeout: float | None
) -> None
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    要为其创建别名的 collection 名称。

- **alias** (*str*) -

    **[必需]**

    collection 的别名。在此操作之前，请确保该别名尚不存在。如果已存在，将会发生异常。

    <Admonition type="info" icon="📘" title="说明">

    什么是 collection 别名？
    
        collection 别名是 collection 的附加名称。当你希望在不更改任何代码的情况下将应用程序切换到新的 collection 时，collection 别名非常有用。 
    
        在 Zilliz Cloud 上，collection 别名是全局唯一标识符。一个别名只能分配给一个 collection。反之，一个 collection 可以有多个别名。
    
        以下是将一个 collection 的别名重新分配给另一个 collection 的示例：
    
        假设有两个 collection：`collection_1` 和 `collection_2`。还有一个名为 `bob` 的 collection 别名，它最初分配给了 `collection_1`：
    
        - `collection_1` 的别名 = ["bob"]
    
        - `collection_2` 的别名 = []
    
        调用 `alter_alias("collection_2", "bob")` 后：
    
        - `collection_1` 的别名 = []
    
        - `collection_2` 的别名 = ["bob"]

    </Admonition>

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示当收到任何响应或发生任何错误时，此操作即超时。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，尤其是当你将 `alias` 设置为现有别名时，将引发此异常。

- **BaseException**

    当此操作失败时，将引发此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Create an alias for the collection
client.create_alias(collection_name="test_collection", alias="test")
```

## 相关方法\{#related-methods}

- [alter_alias()](./Collections-alter_alias)

- [describe_alias()](./Collections-describe_alias)

- [drop_alias()](./Collections-drop_alias)

- [list_aliases()](./Collections-list_aliases)

