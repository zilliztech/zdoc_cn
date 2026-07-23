---
title: "MilvusClient | Python | MilvusClient"
slug: /python/python/Client-MilvusClient
sidebar_label: "MilvusClient"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "MilvusClient 实例表示一个连接到特定 Zilliz Cloud 集群的 Python 客户端。 | Python | MilvusClient"
type: docx
token: SojTdgw1joOuA8xMzb5cMUFYnce
sidebar_position: 2
keywords: 
  - 词法搜索
  - 最近邻搜索
  - Agentic RAG
  - rag llm 架构
  - zilliz
  - zilliz cloud
  - cloud
  - MilvusClient
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# MilvusClient

**MilvusClient** 实例表示一个连接到特定 Zilliz Cloud 集群的 Python 客户端。

```python
pymilvus.MilvusClient
```

## 构造函数\{#constructor}

构造一个用于常见用例的客户端。

<Admonition type="info" icon="📘" title="说明">

此客户端可作为当前一组 API 的易用替代方案，用于处理 Zilliz Cloud 上的创建、读取、更新和删除（CRUD）操作。

</Admonition>

```python
MilvusClient(
    uri: str,
    user: str,
    password: str,
    db_name: str,
    token: str,
    timeout=None,
    **kwargs
)
```

**参数：**

- **uri** (*string*) -

    Zilliz Cloud 集群的 URI。例如：

    - **集群端点**

        - **Free & Serverless**

            `https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`

        - **Dedicated**

            `https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530`

    - **项目端点（On-demand）**

        `https://{project-id}.{region}.api.zillizcloud.com`

- **user** (*string*) -

    用于连接到指定 Zilliz Cloud 集群的有效用户名。

    这应与 **password** 一起使用。

- **password** (*string*) -

    用于连接到指定 Zilliz Cloud 集群的有效密码。

    这应与 **user** 一起使用。

- **db_name** (*string*) -

    目标 Milvus 实例所属数据库的名称。

- **token** (*string*) -

    用于访问指定 Zilliz Cloud 集群的有效访问令牌。 

    建议将其用作分别设置 **user** 和 **password** 的替代方式。

    设置此字段时，请注意：

    有效令牌应为以下任一项：

    - 具有足够权限的 [API](/docs/manage-api-keys)[ 密钥](/docs/manage-api-keys)，或

    - 用于访问目标集群的一组[用户名和密码](/docs/cluster-credentials)，用冒号 (:) 连接。例如，可以将其设置为 `username:p@ssw0rd`。这仅在使用集群端点时适用。

- **timeout** (*float* | *None*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

## 示例\{#examples}

```python
from pymilvus import MilvusClient

# Authentication enabled with a cluster user
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password", # replace this with your token,
    db_name="default"
)
```

<Admonition type="info" icon="📘" title="说明">

将 **uri** 设置为你的集群端点。**token** 参数可以是具有足够权限的 Zilliz Cloud API 密钥，也可以是格式为 `username:p@ssw0rd` 的集群用户凭据。

</Admonition>

