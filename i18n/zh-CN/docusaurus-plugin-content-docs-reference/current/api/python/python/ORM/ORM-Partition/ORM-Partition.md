---
title: "Partition | Python | ORM"
slug: /python/python/ORM-Partition
sidebar_label: "Partition"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "Partition 实例表示 collection 中的一个 partition。| Python | ORM"
type: docx
token: X9scdVMmxoBTuUxlKhecJXEunHd
sidebar_position: 7
keywords: 
  - 视频相似性搜索
  - Vector 检索
  - 音频相似性搜索
  - 弹性 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - Partition
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# Partition

**Partition** 实例表示 collection 中的一个 partition。

```python
class pymilvus.Partition
```

## 构造函数\{#constructor}

通过名称、描述和其他参数在 collection 中构造一个 partition。

<Admonition type="info" icon="📘" title="Notes">

使用 partition 时，请确保 collection schema 中的 **enable_partition_key** 未设置为 **True**。否则，将会发生错误。

</Admonition>

```python
Partition(
    collection=collection, 
    name="string",
    description="string",
)
```

**参数：**

- **[collection](./ORM-Collection)** (*[Collection](./ORM-Collection)* | *str*) - 

    **[必需]**

    要在其中创建 partition 的 collection。

    你可以引用一个 **[Collection](./ORM-Collection)** 对象或其名称。

    <Admonition type="info" icon="📘" title="Note">

    什么是 collection？
    
        collection 以二维表的形式收集数据，表具有固定数量的列和可变数量的行。在表中，每一列对应一个 field，每一行表示一个 entity。
    
        一个 collection 最多可支持 64 个 partition。

    </Admonition>

- **name** (*string*) - 

    **[必需]**

    要创建的 partition 的名称。

- **description** (*string*) - 

    要创建的 partition 的描述。

**返回类型：**

*Partition*

**返回：**

一个 **Partition** 对象。

**异常：**

- **MilvusException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#examples}

```python
from pymilvus import Collection, Partition

# Get an existing collection
collection = Collection("book")

# Create a partition object in the current collection
partition = Partition(collection, "novel", "")
```

## 成员\{#members}

以下是 `Partition` 类的成员：

