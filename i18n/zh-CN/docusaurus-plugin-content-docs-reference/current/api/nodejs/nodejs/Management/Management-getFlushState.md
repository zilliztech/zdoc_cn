---
title: "getFlushState() | Node.js"
slug: /node/node/Management-getFlushState
sidebar_label: "getFlushState()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作返回特定 segment 的 flush 状态。| Node.js"
type: docx
token: X8qWdMHg5oQQK6xZdBYcGNOnn3c
sidebar_position: 10
keywords: 
  - 神经网络
  - 深度学习
  - 知识库
  - 自然语言处理
  - zilliz
  - zilliz cloud
  - cloud
  - getFlushState()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getFlushState()

此操作返回特定 segment 的 flush 状态。

```javascript
await milvusClient.getFlushState(data)
```

<Admonition type="info" icon="📘" title="说明">

Milvus 会定期自动将数据 flush 到持久化存储中。建议你依赖此自动数据持久化机制。

</Admonition>

## 请求语法\{#request-syntax}

```javascript
await milvusClient.getFlushState({
    segment_ids: number[],
    timeout?: number
})
```

**参数：**

- **segment_ids** (*number[]*) -

    **[必需]**

    目标 segment ID 列表。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回值** *Promise&lt;GetFlushStateResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **GetFlushStateResponse** 对象。

```typescript
{
    flushed: boolean,
    status:  ResStatus
}
```

**参数：**

- **flushed** (*boolean*) -
所有目标 segment 是否已 flush 到持久化存储。当每个请求的 segment ID 都已 sealed 并持久化时，其值为 **true**，否则为 **false**。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const flushState = await milvusClient.getFlushState({
    segmentIDs: [1,2,3,4],
});
```

