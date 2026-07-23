---
title: "VolumeManager | Python"
slug: /python/python/Volume-VolumeManager
sidebar_label: "VolumeManager"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "`VolumeManager` 实例维护与 Zilliz Cloud 的 Volume 服务的连接。在创建、列出或删除 volume 之前，你需要初始化一个 `VolumeManager` 实例。 | Python"
type: docx
token: G5c6dxWkno5FRAxeDMycR6AVntf
sidebar_position: 5
keywords: 
  - Vector search
  - knn algorithm
  - HNSW
  - 什么是非结构化数据
  - zilliz
  - zilliz cloud
  - cloud
  - VolumeManager
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# VolumeManager

`VolumeManager` 实例维护与 Zilliz Cloud 的 Volume 服务的连接。在创建、列出或删除 volume 之前，你需要初始化一个 `VolumeManager` 实例。

```python
class pymilvus.bulk_writer.volume_manager import VolumeManager
```

<Admonition type="info" icon="📘" title="说明">

volume 是一个中间存储位置，你可以在其中保存数据以便进一步处理，例如数据合并、迁移或导入。详情请参阅 [Volume](/docs/volume)。

</Admonition>

## 构造函数\{#constructor}

此构造函数初始化一个新的 `VolumeManager` 实例，用于维护与 Zilliz Cloud 的 Volume 服务的连接。

```python
VolumeManager(
    cloud_endpoint: str,
    api_key: str
)
```

**参数：**

- **cloud_endpoint** (*str*) -

    **[必需]**

    Zilliz Cloud endpoint，即 `https:*//*api.cloud.zilliz.com`。

- **api_key** (*str*) -

    **[必需]**

    你的 Zilliz Cloud API key，需具备在 Zilliz Cloud 的 Volume 服务上管理 volume 的足够权限。要获取 Zilliz Cloud API key，请按照 [API Keys](/docs/manage-api-keys) 中的步骤操作。

**返回类型：**

`VolumeManager`

**返回：**

一个 `VolumeManager` 实例。

## 示例\{#examples}

```python
from pymilvus.bulk_writer.volume_manager import VolumeManager

volume_manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY"
)
```

