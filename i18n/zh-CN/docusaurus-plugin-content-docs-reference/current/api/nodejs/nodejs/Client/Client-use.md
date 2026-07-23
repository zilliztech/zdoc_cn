---
title: "use() | Node.js"
slug: /node/node/Client-use
sidebar_label: "use()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为 gRPC 客户端设置活动数据库。调用此方法后，所有后续操作都将以指定数据库为目标。 | Node.js"
type: docx
token: Dc3JdXF5dogLOLxqUPGclM6jn6f
sidebar_position: 9
keywords: 
  - milvus benchmark
  - 托管式 Milvus
  - Serverless vector database
  - Milvus 开源
  - zilliz
  - Zilliz Cloud
  - 云
  - use()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# use()

此操作为 gRPC 客户端设置活动数据库。调用此方法后，所有后续操作都将以指定数据库为目标。

```javascript
await milvusClient.use({ db_name: string })
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.use({
    db_name: string,
})
```

**参数：**

- **db_name** (*string*) -

    要使用的数据库名称。

**返回：**

*Promise\<ResStatus\>*

**异常：**

- **MilvusError**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
await client.use({ db_name: 'my_database' });
```
