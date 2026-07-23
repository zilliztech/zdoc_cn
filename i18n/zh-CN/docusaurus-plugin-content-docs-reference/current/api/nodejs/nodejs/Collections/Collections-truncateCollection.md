---
title: "truncateCollection() | Node.js"
slug: /node/node/Collections-truncateCollection
sidebar_label: "truncateCollection()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会移除 collection 中的所有数据，但保留 collection schema 和结构。 | Node.js"
type: docx
token: J0IBdbw3Voyqw9xnInUcn9EonTe
sidebar_position: 28
keywords: 
  - 低成本 vector database
  - 托管式 vector database
  - Pinecone vector database
  - 音频搜索
  - zilliz
  - zilliz cloud
  - cloud
  - truncateCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# truncateCollection()

此操作会移除 collection 中的所有数据，但保留 collection schema 和结构。

```javascript
await milvusClient.truncateCollection(data: TruncateCollectionRequest)
```

<Admonition type="info" icon="📘" title="注意">

- **不可逆操作**

    截断 collection 会永久移除所有数据。

- **保留 schema**

    collection 结构、字段、索引和属性保持不变。

</Admonition>

## 请求语法\{#request-syntax}

```javascript
truncateCollection({
    db_name?: string,
    collection_name: string,
    timeout?: number
})
```

**参数：**

- **db_name** (*string*) -

    包含该 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必填]**

    目标 collection 的名称。

- **timeout** (*number*) -

    RPC 超时时间，单位为毫秒。

**返回：**

*Promise\<ResStatus\>*

此方法返回一个 promise，该 promise 解析为 **ResStatus** 对象。

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**参数：**

- **code** (*number*) -

    表示操作结果的代码。如果此操作成功，则保持为 **0**。

- **error_code** (*string* | *number*) -

    表示发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

### 基本用法\{#basic-usage}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
  address: 'YOUR_CLUSTER_ENDPOINT',
  token: 'YOUR_CLUSTER_TOKEN',
});

// Truncate collection
const res = await milvusClient.truncateCollection({
  collection_name: 'my_collection',
});

console.log(res);
// Output: { error_code: 'Success', reason: '' }
```

### 指定数据库\{#with-database-specified}

```javascript
const res = await milvusClient.truncateCollection({
  db_name: 'my_database',
  collection_name: 'my_collection',
});
```
