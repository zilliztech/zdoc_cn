---
title: "listSnapshots() | Node.js"
slug: /node/node/Snapshot-listSnapshots
sidebar_label: "listSnapshots()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会列出 collection 的所有 snapshot。| Node.js"
type: docx
token: VjhTds7NPoyPjBxk4PNc5pe0nw6
sidebar_position: 6
keywords: 
  - AI 幻觉
  - AI Agent
  - 语义搜索
  - 异常检测
  - zilliz
  - zilliz cloud
  - cloud
  - listSnapshots()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listSnapshots()

此操作会列出 collection 的所有 snapshot。

```typescript
await milvusClient.listSnapshots(data: ListSnapshotsReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.listSnapshots({
    collection_name: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **collection_name** (*string*) -
**[必需]**
collection 的名称。

- **db_name** (*string*) -
database 的名称。可选。

- **timeout** (*number*) -
一个可选的时长，单位为毫秒，用于允许 RPC 执行。如果设置为 undefined，客户端会一直等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的 trace ID。可选。

**返回** *Promise&lt;ListSnapshotsResponse&gt;*

此方法返回一个 promise，其解析结果为 **ListSnapshotsResponse** 对象。

```typescript
{
    snapshots: string[],
    status:  ResStatus
}
```

**参数：**

- **snapshots** (*string[]*) -
当前请求的 collection 中已存在的 snapshot 名称列表。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const res = await client.listSnapshots({
    collection_name: 'my_collection',
});
```
