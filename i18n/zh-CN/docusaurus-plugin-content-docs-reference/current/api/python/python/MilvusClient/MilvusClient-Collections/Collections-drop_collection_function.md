---
title: "drop_collection_function() | Python | MilvusClient"
slug: /python/python/Collections-drop_collection_function
sidebar_label: "drop_collection_function()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会从 collection 中删除现有 function。 | Python | MilvusClient"
type: docx
token: F1mJdDLyzoMTrxxarPMcqPkqnqg
sidebar_position: 24
keywords: 
  - rag llm 架构
  - 私有 llms
  - nn 搜索
  - llm 评估
  - zilliz
  - zilliz cloud
  - cloud
  - drop_collection_function()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# drop_collection_function()

此操作会从 collection 中删除现有 function。

<Admonition type="info" icon="📘" title="说明">

这不适用于外部 collection。

</Admonition>

## 请求语法\{#request-syntax}

```python
client.drop_collection_function(
    collection_name: str,
    function_name: str,
    timeout: float = None,
    **kwargs
)
```

**参数：**

- **collection_name** (*str*) -

    **[必需]**

    collection 的名称。

- **function_name** (*str*) -

    **[必需]**

    要删除的 function 的名称。

- **timeout** (*float* | *None*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

- **kwargs** (*dict*) -

    可选的其他参数。

**返回类型：**

*NoneType*

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

client.drop_collection_function(
    collection_name="my_collection",
    function_name="bm25",
)
```
