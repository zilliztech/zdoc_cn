---
title: "get_replicas() | Python | ORM"
slug: /python/python/Partition-get_replicas
sidebar_label: "get_replicas()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作获取有关当前已加载副本的信息。 | Python | ORM"
type: docx
token: YKwldu59qosZBsxdRdSc0l9Hnoe
sidebar_position: 4
keywords: 
  - 私有 llms
  - nn search
  - llm eval
  - Sparse vs Dense
  - zilliz
  - Zilliz Cloud
  - cloud
  - get_replicas()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# get_replicas()

此操作获取有关当前已加载副本的信息。

## 请求语法\{#request-syntax}

```python
get_replicas(
    timeout: float | None
)
```

**参数：**

- **timeout** (*float* | *None*)  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回类型：**

*Replica*

**返回：**

一个包含以下字段的 **Replica** 对象：

- **groups** (*list*)

    副本组列表。每个 **Group** 对象包含以下字段：

    - **id** (*int*)

        组 ID。

    - **group_nodes** (*tuple*)

        一个包含相关查询节点 ID 的元组。

    - **resource_group** (*str*)

        上述查询节点所属资源组的名称。

    - **shards** (*list*)  

        一个包含以下字段的 **Shard** 对象列表：

        - **channel_name** (*str*)

        - **shard_leader** (*int*)

        - **shard_nodes** (*set*)

<Admonition type="info" icon="📘" title="说明">

什么是副本？

借助副本，Zilliz Cloud 可以在多个查询节点上加载相同的段。如果一个查询节点发生故障，或在另一个搜索请求到达时正忙于处理当前搜索请求，系统可以将新请求发送到拥有相同段副本的空闲查询节点。

副本以副本组的形式组织。每个副本组包含 [分片](https://milvus.io/docs/v2.1.x/glossary.md#Sharding) 副本。每个分片副本都有一个流式副本和一个历史副本，分别对应分片中的 growing 和 sealed [段](https://milvus.io/docs/v2.1.x/glossary.md#Segment)。

分片可视为用于在多个节点之间进行分布式数据写入操作的 DML 通道，以充分发挥 Zilliz Cloud 集群的并行计算潜力。

</Admonition>

**异常：**

None

## 示例\{#examples}

```python
from pymilvus import Collection, Partition

collection = Collection(name="test_collection")

# Get an existing partition
partition = Partition(collection, name="test_partition")

# Get the information about the current loaded replicas
partition.get_replicas()
```

## 相关操作\{#related-operations}

以下操作与 `get_replicas()` 相关：

- [drop()](./Partition-drop)

- [load()](./Partition-load)

- [release()](./Partition-release)

