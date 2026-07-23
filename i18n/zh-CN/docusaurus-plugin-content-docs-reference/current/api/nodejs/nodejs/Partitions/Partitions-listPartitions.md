---
title: "listPartitions() | Node.js"
slug: /node/node/Partitions-listPartitions
sidebar_label: "listPartitions()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会列出指定 collection 中的 partition。 | Node.js"
type: docx
token: IvnLd6nXooRR6NxM9jdcDxCHnhh
sidebar_position: 5
keywords: 
  - Serverless vector database
  - Milvus 开源
  - Milvus 如何工作
  - Zilliz vector database
  - zilliz
  - zilliz cloud
  - cloud
  - listPartitions()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listPartitions()

此操作会列出指定 collection 中的 partition。

```javascript
await milvusClient.listPartitions(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.listPartitions({
    db_name: string,
    collection_name: string,
    timeout?: number,
    type?: ShowPartitionsType
 })
```

**参数：**

- **db_name** (*string*) -

    持有目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **timeout** (*number*)  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

- **type** (*ShowPartitionsType*) - 

    决定是列出所有 partition，还是仅列出已加载的 partition。**ShowPartitionsType** 具有以下值：

    - **All** = 0

        表示将列出所有 partition。

    - **Loaded** = 1

        表示仅列出已加载的 partition。

**返回** *Promise&lt;ShowPartitionsResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **ShowPartitionsResponse** 对象。

```typescript
{
    partition_names: string[],
    partitionIDs: number[],
    data: PartitionData[],
    status:  ResStatus
}
```

**参数：**

- **partition_names** (*string[]*) -
在 collection 上定义的 partition 名称列表。

- **partitionIDs** (*number[]*) -
partition 的内部标识符，其顺序与 **partition_names** 相同。

- **data** (*PartitionData[]*) -
一个扁平化的按 partition 视图，其中包含名称、标识符、创建时间戳和加载百分比。

    - **name** (*string*) -

        partition 名称。

    - **id** (*string*) -

        partition 标识符。

    - **timestamp** (*string*) -

        partition 的创建时间戳。

    - **loadedPercentage** (*string*) -

        当前已加载到内存中的 partition 百分比。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
}).listPartitions({
    collection_name: 'my_collection',
 });
```

