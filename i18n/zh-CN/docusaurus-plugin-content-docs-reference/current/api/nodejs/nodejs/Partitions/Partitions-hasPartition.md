---
title: "hasPartition() | Node.js"
slug: /node/node/Partitions-hasPartition
sidebar_label: "hasPartition()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于检查指定 collection 中是否存在指定 partition。 | Node.js"
type: docx
token: TVWPdTw2WoPAJYxsbGMc7MX6nEf
sidebar_position: 4
keywords: 
  - milvus 如何工作
  - Zilliz vector database
  - Zilliz database
  - 非结构化数据
  - zilliz
  - zilliz cloud
  - 云
  - hasPartition()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# hasPartition()

此操作用于检查指定 collection 中是否存在指定 partition。

```javascript
await milvusClient.hasPartition(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.hasPartition({
    db_name: string,
    collection_name: string,
    partition_name: string,
    timeout?: number
 })
```

**参数：**

- **db_name** (*string*) -

    持有目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **partition_name** (*string*)

    **[必需]**

    要检查的 partition 的名称。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise&lt;BoolResponse&gt;*

此方法返回一个 promise，该 promise 会解析为 **BoolResponse** 对象。

```typescript
{
    value: boolean,
    status:  ResStatus
}
```

**参数：**

- **value** (*boolean*) -
一个布尔值，表示请求的 partition 是否存在于 collection 中。当 partition 存在时为 **true**，不存在时为 **false**。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示所发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
}).hasPartition({
    collection_name: 'my_collection',
    partition_name: 'my_partition',
 });
```

