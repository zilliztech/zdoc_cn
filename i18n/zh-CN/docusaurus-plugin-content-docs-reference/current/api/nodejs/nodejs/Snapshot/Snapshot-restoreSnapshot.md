---
title: "restoreSnapshot() | Node.js"
slug: /node/node/Snapshot-restoreSnapshot
sidebar_label: "restoreSnapshot()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会从快照将集合恢复到新的或现有的集合。 | Node.js"
type: docx
token: PpuUdB9bLoL1UUxfIH4cxXkXnSb
sidebar_position: 8
keywords: 
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - 什么是向量数据库
  - zilliz
  - Zilliz Cloud
  - 云
  - restoreSnapshot()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# restoreSnapshot()

此操作会从快照将集合恢复到新的或现有的集合。

```typescript
await milvusClient.restoreSnapshot(data: RestoreSnapshotReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.restoreSnapshot({
    snapshot_name: string,
    source_collection_name: string,
    target_collection_name: string,
    source_db_name?: string,
    target_db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **snapshot_name** (*string*) -
**[必需]**
要从中恢复的快照的名称。

- **source_collection_name** (*string*) -
**[必需]**
源集合的名称。

- **target_collection_name** (*string*) -
**[必需]**
要恢复到的目标集合的名称。

- **source_db_name** (*string*) -
源数据库名称。可选。

- **target_db_name** (*string*) -
目标数据库名称。可选。

- **timeout** (*number*) -
允许 RPC 执行的可选时长，单位为毫秒。如果设置为 undefined，客户端会持续等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的 trace ID。可选。

**返回** *Promise&lt;RestoreSnapshotResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **RestoreSnapshotResponse** 对象。

```typescript
{
    job_id: string,
    status:  ResStatus
}
```

**参数：**

- **job_id** (*string*) -
异步恢复作业的标识符。将此值传递给 `getRestoreSnapshotState()` 以轮询完成状态。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const res = await client.restoreSnapshot({
    snapshot_name: 'snapshot_2024_01',
    source_collection_name: 'my_collection',
    target_collection_name: 'restored_collection',
});
```
