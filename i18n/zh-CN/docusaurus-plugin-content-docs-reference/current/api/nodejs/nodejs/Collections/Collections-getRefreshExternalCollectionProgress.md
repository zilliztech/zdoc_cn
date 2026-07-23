---
title: "getRefreshExternalCollectionProgress() | Node.js"
slug: /node/node/Collections-getRefreshExternalCollectionProgress
sidebar_label: "getRefreshExternalCollectionProgress()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于检查外部集合的刷新作业进度。使用 refreshExternalCollection() 返回的 jobid。 | Node.js"
type: docx
token: E7pZd2Yfzolgiyxcvz8cSFfKnoc
sidebar_position: 29
keywords: 
  - 异常检测
  - sentence transformers
  - 推荐系统
  - 信息检索
  - zilliz
  - zilliz cloud
  - cloud
  - getRefreshExternalCollectionProgress()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getRefreshExternalCollectionProgress()

此操作用于检查外部集合的刷新作业进度。使用 refreshExternalCollection() 返回的 job_id。

```typescript
await milvusClient.getRefreshExternalCollectionProgress(data: GetRefreshExternalCollectionProgressReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.getRefreshExternalCollectionProgress({
    job_id: number | string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **job_id** (*number | string*) -
**[必需]**
refreshExternalCollection() 返回的作业 ID。

- **timeout** (*number*) -
允许 RPC 执行的可选时长，单位为毫秒。如果设置为 undefined，客户端会持续等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的 trace ID。可选。

**返回值** *Promise&lt;GetRefreshExternalCollectionProgressResponse&gt;*

此方法返回一个 promise，解析为 **GetRefreshExternalCollectionProgressResponse** 对象。

```typescript
{
    job_info: RefreshExternalCollectionJobInfo,
    status:  ResStatus
}
```

**参数：**

- **job_info** (*RefreshExternalCollectionJobInfo*) -
刷新作业的当前状态。

    - **job_id** (*string*) -

        作业标识符。

    - **collection_name** (*string*) -

        正在刷新的外部集合。

    - **state** (*RefreshExternalCollectionState*) -

        当前作业状态。可能的值为 **RefreshPending**、**RefreshInProgress**、**RefreshCompleted** 和 **RefreshFailed**。

    - **progress** (*string*) -

        完成百分比，为 **"0"** 到 **"100"** 之间的整数。

    - **reason** (*string*) -

        当 **state** 为 **RefreshFailed** 时的失败原因，否则为空字符串。

    - **external_source** (*string*) -

        作业捕获的外部源路径。

    - **start_time** (*string*) -

        作业开始的时间。

    - **end_time** (*string*) -

        作业结束的时间；如果作业仍在运行，则为空字符串。

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

const progress = await client.getRefreshExternalCollectionProgress({
    job_id: 'job_12345',
});
```
