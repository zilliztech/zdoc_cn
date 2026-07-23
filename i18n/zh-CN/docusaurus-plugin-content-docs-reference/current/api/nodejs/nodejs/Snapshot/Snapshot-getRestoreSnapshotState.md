---
title: "getRestoreSnapshotState() | Node.js"
slug: /node/node/Snapshot-getRestoreSnapshotState
sidebar_label: "getRestoreSnapshotState()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作检查快照恢复作业的状态。使用 restoreSnapshot() 返回的 jobid。| Node.js"
type: docx
token: IHY0di5uzooBe8xOCJqci9vinNh
sidebar_position: 4
keywords: 
  - 上下文窗口
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - zilliz
  - Zilliz Cloud
  - cloud
  - getRestoreSnapshotState()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getRestoreSnapshotState()

此操作检查快照恢复作业的状态。使用 restoreSnapshot() 返回的 job_id。

```typescript
await milvusClient.getRestoreSnapshotState(data: GetRestoreSnapshotStateReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.getRestoreSnapshotState({
    job_id: number | string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **job_id** (*number | string*) -
**[必需]**
restoreSnapshot() 返回的恢复作业 ID。

- **timeout** (*number*) -
允许 RPC 执行的可选时长，单位为毫秒。如果设置为 undefined，客户端会持续等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的跟踪 ID。可选。

**返回** *Promise&lt;GetRestoreSnapshotStateResponse&gt;*

此方法返回一个 promise，解析为 **GetRestoreSnapshotStateResponse** 对象。

```typescript
{
    info: RestoreSnapshotJobInfo,
    status:  ResStatus
}
```

**参数：**

- **info** (*RestoreSnapshotJobInfo*) -
恢复作业的当前状态。

    - **job_id** (*string*) -

        作业标识符。

    - **snapshot_name** (*string*) -

        正在恢复的快照。

    - **db_name** (*string*) -

        目标数据库。

    - **collection_name** (*string*) -

        目标 collection 名称。

    - **state** (*RestoreSnapshotState*) -

        当前作业状态。可能的值为 **RestoreSnapshotNone**、**RestoreSnapshotPending**、**RestoreSnapshotExecuting**、**RestoreSnapshotCompleted** 和 **RestoreSnapshotFailed**。

    - **progress** (*number*) -

        完成百分比，取值为 **0** 到 **100** 之间的整数。

    - **reason** (*string*) -

        当 **state** 为 **RestoreSnapshotFailed** 时的失败原因，否则为空字符串。

    - **start_time** (*string*) -

        作业开始的时间。

    - **time_cost** (*string*) -

        自作业开始以来经过的总时间。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const res = await client.getRestoreSnapshotState({
    job_id: 'job_12345',
});
```
