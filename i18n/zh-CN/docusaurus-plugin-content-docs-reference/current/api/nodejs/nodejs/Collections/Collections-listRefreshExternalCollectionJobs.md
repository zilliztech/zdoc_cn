---
title: "listRefreshExternalCollectionJobs() | Node.js"
slug: /node/node/Collections-listRefreshExternalCollectionJobs
sidebar_label: "listRefreshExternalCollectionJobs()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作列出外部集合的所有刷新任务。你可以按集合名称和数据库名称进行筛选。 | Node.js"
type: docx
token: AG5zdQCpXoy11MxWgD0ciYBRnJb
sidebar_position: 30
keywords: 
  - AI Agent
  - 语义搜索
  - 异常检测
  - sentence transformers
  - zilliz
  - zilliz cloud
  - cloud
  - listRefreshExternalCollectionJobs()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listRefreshExternalCollectionJobs()

此操作列出外部集合的所有刷新任务。你可以按集合名称和数据库名称进行筛选。

```typescript
await milvusClient.listRefreshExternalCollectionJobs(data?: ListRefreshExternalCollectionJobsReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.listRefreshExternalCollectionJobs({
    collection_name?: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **collection_name** (*string*) -
可选，按集合名称筛选。

- **db_name** (*string*) -
可选，按数据库名称筛选。

- **timeout** (*number*) -
可选的时间长度，单位为毫秒，用于允许 RPC 执行。如果设置为 undefined，客户端会一直等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的跟踪 ID。可选。

**返回** *Promise&lt;ListRefreshExternalCollectionJobsResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **ListRefreshExternalCollectionJobsResponse** 对象。

```typescript
{
    jobs: RefreshExternalCollectionJobInfo[],
    status:  ResStatus
}
```

**参数：**

- **jobs** (*RefreshExternalCollectionJobInfo[]*) -
与请求的数据库和集合筛选条件匹配的刷新任务列表。有关完整的 **RefreshExternalCollectionJobInfo** 字段参考，请参阅 `getRefreshExternalCollectionProgress()` 文档。

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

const res = await client.listRefreshExternalCollectionJobs({
    collection_name: 'my_external_collection',
});
```
