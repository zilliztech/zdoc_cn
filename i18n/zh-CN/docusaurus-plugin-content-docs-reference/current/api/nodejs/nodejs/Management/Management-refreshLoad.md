---
title: "refreshLoad() | Node.js"
slug: /node/node/Management-refreshLoad
sidebar_label: "refreshLoad()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作刷新特定 Collection 的加载状态。| Node.js"
type: docx
token: Jc43d397doxCRkxal2XcQ1Wyn2g
sidebar_position: 19
keywords: 
  - Pinecone vs Milvus
  - Chroma vs Milvus
  - Annoy vector search
  - milvus
  - zilliz
  - Zilliz Cloud
  - cloud
  - refreshLoad()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# refreshLoad()

此操作刷新特定 Collection 的加载状态。

```javascript
await milvusClient.refreshLoad(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.refreshLoad({
   db_name?: string,
   collection_name: string,
   timeout?: number
 })
```

**参数：**

- **db_name** (*string*) -

    目标 Collection 所在的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    Collection 的名称。

- **timeout** (*number*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在返回任何响应或发生错误时超时。

**返回值** *Promise\<ResStatus>*

此方法返回一个 promise，其解析结果为 **ResStatus** 对象。

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

    表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const resStatus = await milvusClient.refreshLoad({ collection_name: 'my_collection' });
```

