---
title: "dropCollection() | Node.js"
slug: /node/node/Collections-dropCollection
sidebar_label: "dropCollection()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除一个 Collection。| Node.js"
type: docx
token: KLknda2VtocQSBx7PKVc6F9Nnug
sidebar_position: 10
keywords: 
  - 稀疏与密集
  - Dense vector
  - Hierarchical Navigable Small Worlds
  - Dense embedding
  - zilliz
  - zilliz cloud
  - cloud
  - dropCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# dropCollection()

此操作会删除一个 Collection。

```javascript
await milvusClient.dropCollection(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.dropCollection({ 
    db_name: string,
    collection_name: string,
    timeout?: number
})
```

**参数：**

- **db_name** (*string*) -

    包含目标 Collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 Collection 的名称。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

此方法返回一个 promise，该 promise 会解析为 **ResStatus** 对象。

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

    表示发生的错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
 const resStatus = await milvusClient.dropCollection({ collection_name: 'my_collection' });
```

