---
title: "getPkFieldType() | Node.js"
slug: /node/node/Collections-getPkFieldType
sidebar_label: "getPkFieldType()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作返回集合的主键字段数据类型。这是一个便捷方法，用于描述集合并提取主键字段类型。 | Node.js"
type: docx
token: AKpldMJPTo6MfuxxrpicBKRInCh
sidebar_position: 27
keywords: 
  - 向量相似度搜索
  - approximate nearest neighbor search
  - DiskANN
  - 稀疏向量
  - zilliz
  - zilliz cloud
  - cloud
  - getPkFieldType()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getPkFieldType()

此操作返回集合的主键字段数据类型。这是一个便捷方法，用于描述集合并提取主键字段类型。

```javascript
await milvusClient.getPkFieldType(data: DescribeCollectionReq)
```

## 请求语法\{#request-syntax}

```javascript
getPkFieldType({
    collection_name: string,
    timeout: number
})
```

**参数：**

- **collection_name** (*string*) -

    **[必需]**

    集合的名称。

- **timeout** (*number*) -

    RPC 超时时间，单位为毫秒。可选。

**返回：**

*Promise\<keyof typeof DataType\>*

主键字段的数据类型（例如 `"Int64"`、`"VarChar"`）。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const pkType = await client.getPkFieldType({
    collection_name: 'my_collection',
});
console.log(pkType); // e.g., "Int64"
```

