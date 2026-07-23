---
title: "Connections | Python | ORM"
slug: /python/python/ORM-Connections
sidebar_label: "Connections"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "Connections 实例表示连接到你的 Zilliz Cloud 集群的连接池。 | Python | ORM"
type: docx
token: A96udk9seoF5x5xywQZcLasanIe
sidebar_position: 3
keywords: 
  - vector 相似性搜索
  - 近似最近邻搜索
  - DiskANN
  - Sparse vector
  - zilliz
  - zilliz cloud
  - cloud
  - Connections
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# Connections

**Connections** 实例表示连接到你的 Zilliz Cloud 集群的连接池。

```python
class pymilvus.Connections
```

## 构造函数\{#constructor}

构造一个单例实例来管理所有连接。 

<Admonition type="info" icon="📘" title="Notes">

不要自行创建此类的新实例，请按以下示例所示导入现有的单例实例。

</Admonition>

## 示例\{#examples}

```python
from pymilvus import connections    

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_TOKEN"

# Establish a connection
connections.connect(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN,
) 
```

<Admonition type="info" icon="📘" title="Note">

如何获取 cluster endpoint 和 token？

- **Cluster endpoint**

    你可以登录 [Zilliz Cloud](https://cloud.zilliz.com) 控制台，并在左侧导航窗格中点击 **Clusters**。在集群列表中，点击目标集群的名称，并在 **Connect** 区域复制其 endpoint。

- **Access token**

    要连接到 Zilliz Cloud 集群，你可以使用以下任一方式

    - API key

        你可以登录 [Zilliz Cloud](https://cloud.zilliz.com) 控制台，并在左侧导航窗格中点击 **API Keys**。

    - 用于访问集群的一组用户名和密码，以冒号（**:**）连接。

        你可以使用在 Zilliz Cloud 控制台创建集群时指定的集群凭据，或任何现有集群用户的凭据。

</Admonition>

## 方法\{#methods}

以下是 `connections` 单例实例的方法：
