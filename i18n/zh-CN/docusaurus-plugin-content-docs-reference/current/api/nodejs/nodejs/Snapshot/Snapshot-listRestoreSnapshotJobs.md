---
title: "listRestoreSnapshotJobs() | Node.js"
slug: /node/node/Snapshot-listRestoreSnapshotJobs
sidebar_label: "listRestoreSnapshotJobs()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作列出所有快照恢复任务。你可以按目标 Collection 名称和数据库名称进行筛选。 | Node.js"
type: docx
token: TIXDdW1BmoPA3FxX0ONczHFqnKf
sidebar_position: 5
keywords: 
  - 检索增强生成
  - 大语言模型
  - 向量化
  - k 近邻算法
  - zilliz
  - zilliz cloud
  - 云
  - listRestoreSnapshotJobs()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listRestoreSnapshotJobs()

此操作列出所有快照恢复任务。你可以按目标 Collection 名称和数据库名称进行筛选。

```typescript
await milvusClient.listRestoreSnapshotJobs(data?: ListRestoreSnapshotJobsReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.listRestoreSnapshotJobs({
    collection_name?: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **collection_name** (*string*) -
按目标 Collection 名称进行筛选（可选）。

- **db_name** (*string*) -
按数据库名称进行筛选（可选）。

- **timeout** (*number*) -
允许 RPC 执行的可选时长，单位为毫秒。如果设置为 undefined，客户端将持续等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的 trace ID。可选。

**返回值** *Promise&lt;ListRestoreSnapshotJobsResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **ListRestoreSnapshotJobsResponse** 对象。

```typescript
{
    jobs: RestoreSnapshotJobInfo[],
    status:  ResStatus
}
```

**参数：**

- **jobs** (*RestoreSnapshotJobInfo[]*) -
与请求的数据库和 Collection 筛选条件匹配的快照恢复任务列表。有关完整的 **RestoreSnapshotJobInfo** 字段参考，请参阅 `getRestoreSnapshotState()` 文档。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误的原因。如果此操作成功，则为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const res = await client.listRestoreSnapshotJobs({
    collection_name: 'restored_collection',
});
```
