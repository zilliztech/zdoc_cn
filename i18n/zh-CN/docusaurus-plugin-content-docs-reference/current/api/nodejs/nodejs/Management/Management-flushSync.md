---
title: "flushSync() | Node.js"
slug: /node/node/Management-flushSync
sidebar_label: "flushSync()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会手动封存 segment，并将数据持久化到磁盘。建议在所有数据都插入到 collection 后调用此操作。这是一个同步函数，可确保 flush 操作在函数返回前完成。 | Node.js"
type: docx
token: QsTwdUbgyoZPV1xzCBxchX8Fnid
sidebar_position: 8
keywords: 
  - 多模态 vector 数据库检索
  - Retrieval Augmented Generation
  - 大语言模型
  - 向量化
  - zilliz
  - zilliz cloud
  - cloud
  - flushSync()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# flushSync()

此操作会手动封存 segment，并将数据持久化到磁盘。建议在所有数据都插入到 collection 后调用此操作。这是一个同步函数，可确保 flush 操作在函数返回前完成。

```javascript
await milvusClient.flushSync(data)
```

<Admonition type="info" icon="📘" title="说明">

Milvus 会定期自动将数据 flush 到持久化存储中。建议你依赖此自动数据持久化机制。

</Admonition>

## 请求语法\{#request-syntax}

```javascript
await milvusClient.flushSync({
    db_name?: string,
    collection_names: string[],
    timeout?: number
})
```

**参数：**

- **db_name** (*string*) -

    目标 collection 所属的目标数据库名称。

- **collection_names** (*string[]*) -

    **[必需]**

    目标 collection 名称列表。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise&lt;GetFlushStateResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **GetFlushStateResponse** 对象。

```typescript
{
    flushed: boolean,
    status:  ResStatus
}
```

**参数：**

- **flushed** (*boolean*) -
是否所有目标 segment 都已 flush 到持久化存储。由于 `flushSync()` 会阻塞直到 flush 完成，因此成功时该值为 **true**。

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
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const flushSyncStatus = await milvusClient.flushSync({
    collection_names: ['my_collection'],
});
```

