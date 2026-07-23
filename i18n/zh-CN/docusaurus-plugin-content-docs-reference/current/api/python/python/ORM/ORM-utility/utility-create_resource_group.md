---
title: "create_resource_group() | Python | ORM"
slug: /python/python/utility-create_resource_group
sidebar_label: "create_resource_group()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建一个新的资源组。 | Python | ORM"
type: docx
token: X5qsdhFQ5oOhkcxOprzcOZq4nMc
sidebar_position: 4
keywords: 
  - 稠密嵌入
  - Faiss vector database
  - Chroma vector database
  - nlp 搜索
  - zilliz
  - zilliz cloud
  - cloud
  - create_resource_group()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# create_resource_group()

此操作会创建一个新的资源组。 

<Admonition type="info" icon="📘" title="Note">

什么是资源组？

一个资源组可以容纳 Zilliz Cloud 集群中的多个或全部查询节点。当你通过调用 load() 加载 Collection 时，Zilliz Cloud 会将该 Collection 的数据加载到特定的查询节点中。

每个 Zilliz Cloud 集群中都有一个名为 **__default_resource_group** 的默认资源组，用于容纳其所有查询节点。 

使用 **describe_resource_group()** 查看实际数量。如果有多个可用的查询节点，请考虑创建资源组，并在它们之间分配查询节点。

</Admonition>

## 请求语法\{#request-syntax}

```python
create_resource_group(
    name: str,
    using: str,
    timeout: float | None,
    **kwargs
)
```

**参数：**

- **name** (*str*) -

    **[必需]**

    要创建的资源组的名称。

    将其设置为现有资源组的名称会导致 **MilvusException**。

- **using** (*str*) - 

    所使用连接的别名。

    默认值为 **default**，表示此操作使用默认连接。

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

- **kwargs**

    可选参数。目前，你可以设置 **config** 来指定资源组的配置。

    - **config** (*ResourceGroupConfig*) -

        一个表示资源组配置的 ResourceGroupConfig 对象。

        ```python
        ├── ResourceGroupConfig
        │   ├── requests
        │   │   └── node_num
        │   └── limits
        │       └── node_num
        ```

        - **requests** (*dict*) -

            一个字典，用于指定资源组应容纳的查询节点数量。此键应包括：

            - **node_num** (*int*) - 资源组请求的查询节点数量。

        - **limits** (*dict*) -

            一个字典，用于指定资源组可容纳的最大查询节点数量。此键应包括：

            - **node_num** (*int*) - 资源组允许的最大查询节点数量。

**返回类型：**

*NoneType*

**返回：**

None

**异常：**

- **MilvusException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import connections, utility

# Connect to YOUR_CLUSTER_ENDPOINT
connections.connect()

# Create a resource group

name = "rg" # A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).
node_num = 1

config = utility.ResourceGroupConfig(
    requests={'node_num': node_num}, # The number of query nodes that the resource group should hold.
    limits={'node_num': node_num} # The maximum number of query nodes that the resource group can hold.
)

try:
    utility.create_resource_group(
        name, # The name of the resource group to be created.
        using='default', # The database to use.
        config=config, # The configuration of the resource group.
    )
    print(f'Succeeded in creating resource group {name}.')
except Exception:
    print(f'Failed to create resource group {name}.')
```

## 相关操作\{#related-operations}

以下操作与 `create_resource_group()` 相关：

- [describe_resource_group()](./utility-describe_resource_group)

- [drop_resource_group()](./utility-drop_resource_group)

- [list_resource_groups()](./utility-list_resource_groups)

- [transfer_node()](./utility-transfer_node)

- [transfer_replica()](./utility-transfer_replica)

