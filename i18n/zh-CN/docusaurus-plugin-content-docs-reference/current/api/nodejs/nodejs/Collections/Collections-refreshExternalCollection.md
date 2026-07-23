---
title: "refreshExternalCollection() | Node.js"
slug: /node/node/Collections-refreshExternalCollection
sidebar_label: "refreshExternalCollection()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会触发 external collection 的数据刷新。当外部数据源已更新并且你希望 Milvus 重新加载数据时，请使用此操作。 | Node.js"
type: docx
token: JoiWdRIFcojRI4xVXnCclEoVnh2
sidebar_position: 31
keywords: 
  - 音频相似性搜索
  - 弹性 vector database
  - Pinecone 与 Milvus
  - Chroma 与 Milvus
  - zilliz
  - Zilliz Cloud
  - cloud
  - refreshExternalCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# refreshExternalCollection()

此操作会触发 external collection 的数据刷新。当外部数据源已更新并且你希望 Milvus 重新加载数据时，请使用此操作。

```typescript
await milvusClient.refreshExternalCollection(data: RefreshExternalCollectionReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.refreshExternalCollection({
    collection_name: string,
    external_source?: string,
    external_spec?: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **collection_name** (*string*) -
**[必需]**
要刷新的 external collection 的名称。

- **external_source** (*string*) -
可选的新外部源路径。如果提供，collection 将从此新源刷新。

- **external_spec** (*string*) -
可选的新外部 spec 配置。如果提供，collection 将使用此新 spec。

- **db_name** (*string*) -
数据库名称。可选。

- **timeout** (*number*) -
允许 RPC 执行的可选时长，单位为毫秒。如果设置为 undefined，客户端会一直等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的 trace ID。可选。

**返回值** *Promise&lt;RefreshExternalCollectionResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **RefreshExternalCollectionResponse** 对象。

```typescript
{
    job_id: string,
    status:  ResStatus
}
```

**参数：**

- **job_id** (*string*) -
异步刷新作业的标识符。将此值传递给 `getRefreshExternalCollectionProgress()` 以轮询完成状态。

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

const res = await client.refreshExternalCollection({
    collection_name: 'my_external_collection',
    external_source: 's3://bucket/path',
});
```
