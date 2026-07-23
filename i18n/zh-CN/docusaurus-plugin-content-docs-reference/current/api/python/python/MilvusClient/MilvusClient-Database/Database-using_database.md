---
title: "using_database() | Python | MilvusClient"
slug: /python/python/Database-using_database
sidebar_label: "using_database()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会更改当前正在使用的数据库。 | Python | MilvusClient"
type: docx
token: OCfid8DdPo1ga1x24JZcV92xnwd
sidebar_position: 7
keywords: 
  - RAG
  - NLP
  - Neural Network
  - Deep Learning
  - zilliz
  - zilliz cloud
  - cloud
  - using_database()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# using_database()

此操作会更改当前正在使用的数据库。

<Admonition type="info" icon="📘" title="Notes">

此方法仅适用于专用服务集群和按需计算。 

- 对于专用服务集群中的数据库，请使用 cluster endpoint 创建 **[MilvusClient](./Client-MilvusClient)**。

    - **Free & Serverless**

        `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

    - **Dedicated**

        `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

- 对于按需计算的数据库，请使用 project endpoints 创建 **[MilvusClient](./Client-MilvusClient)**。

    `https://{project-id}.{region}.api.zillizcloud.com`

</Admonition>

## 请求语法\{#request-syntax}

```python
using_database(
    db_name: str, 
    **kwargs,
)
```

**参数：**

- **db_name** (*string*) -

    **[必需]**

    要使用的数据库名称。

**返回类型：**

*NoneType*

**返回：**

*None*

**异常：**

- `MilvusException` - 如果此操作过程中发生任何错误，则会引发该异常。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token) # db = "default" 

client.using_database("my_db")
```
