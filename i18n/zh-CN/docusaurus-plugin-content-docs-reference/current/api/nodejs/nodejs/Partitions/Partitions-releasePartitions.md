---
title: "releasePartitions() | Node.js"
slug: /node/node/Partitions-releasePartitions
sidebar_label: "releasePartitions()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会从内存中释放指定 collection 中的 partition。| Node.js"
type: docx
token: Sqoed1lkwo8umixJJO1cvKIxnZc
sidebar_position: 8
keywords: 
  - AI Agent
  - 语义搜索
  - 异常检测
  - sentence transformers
  - zilliz
  - zilliz cloud
  - cloud
  - releasePartitions()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# releasePartitions()

此操作会从内存中释放指定 collection 中的 partition。

```javascript
await milvusClient.releasePartitions(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.releasePartitions({
    db_name: string,
    collection_name: string,
    partition_names: string[],
    timeout?: number
 })
```

**参数：**

- **db_name** (*string*) -

    保存目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **partition_names** (*string[]*) -

    **[必需]**

    要释放的 partition 名称列表。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

此方法返回一个 promise，该 promise 解析为 **ResStatus** 对象。

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**参数：**

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
}).releasePartitions({
    collection_name: 'my_collection',
    partition_names: ['my_partition'],
 });
```

