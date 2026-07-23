---
title: "getVersion() | Node.js"
slug: /node/node/Client-getVersion
sidebar_label: "getVersion()"
beta: false
added_since: v2.6.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作返回 Milvus 服务器的版本信息。 | Node.js"
type: docx
token: WA81dokeYotwt9xAiKKcaaIpnxc
sidebar_position: 8
keywords: 
  - vector database 示例
  - rag vector database
  - 什么是 vector db
  - 什么是 vector database
  - zilliz
  - zilliz cloud
  - cloud
  - getVersion()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getVersion()

此操作返回 Milvus 服务器的版本信息。

```javascript
await milvusClient.getVersion()
```

**返回** *Promise&lt;GetVersionResponse&gt;*

此方法返回一个 promise，该 promise 会解析为 **GetVersionResponse** 对象。

```typescript
{
    version: string
}
```

**参数：**

- **version** (*string*) -

    Milvus 服务器的语义化版本（例如 **"v3.0.0"**）。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const res = await client.getVersion();
console.log(res.version); // "2.6.9"
```
