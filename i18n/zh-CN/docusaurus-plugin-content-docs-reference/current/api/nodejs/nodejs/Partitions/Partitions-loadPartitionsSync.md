---
title: "loadPartitionsSync() | Node.js"
slug: /node/node/Partitions-loadPartitionsSync
sidebar_label: "loadPartitionsSync()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将特定分区的数据加载到内存中。这是一个同步函数，有助于确保指定的分区已被加载。 | Node.js"
type: docx
token: VGofdSRi0o6EagxNkokc9Iinndf
sidebar_position: 7
keywords: 
  - Zilliz
  - Milvus vector database
  - Milvus db
  - Milvus vector db
  - Zilliz
  - Zilliz Cloud
  - 云
  - loadPartitionsSync()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# loadPartitionsSync()

此操作将特定分区的数据加载到内存中。这是一个同步函数，有助于确保指定的分区已被加载。

```javascript
await milvusClient.loadPartitionsSync(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.loadPartitionsSync({ 
    db_name: string,
    collection_name: string,
    refresh?: boolean,
    replica_number?: number,
    resource_groups?: string[],
    timeout?: number
})
```

**参数：**

- **db_name** (*string*) -

    持有目标集合的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有集合的名称。

- **partition_names** (string[]) -

    **[必需]**

    要加载的分区名称列表。

- **replica_number** (*number*) -

    分区的副本数量。

- **resource_groups** (*string[]*) -

    分区中的资源组列表。

- **timeout** (*number*)  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

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

    表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
}).loadPartitionsSync({
    collection_name: 'my_collection',
    partition_names: ['my_partition'],
 });
```

