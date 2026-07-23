---
title: "createAlias() | Node.js"
slug: /node/node/Collections-createAlias
sidebar_label: "createAlias()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作为现有 collection 创建别名。| Node.js"
type: docx
token: MPuIdwujBoXM6rx7Okfc3lhZnUd
sidebar_position: 4
keywords: 
  - Annoy vector 搜索
  - milvus
  - Zilliz
  - milvus vector database
  - zilliz
  - zilliz cloud
  - cloud
  - createAlias()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# createAlias()

此操作为现有 collection 创建别名。

```javascript
await milvusClient.createAlias(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.createAlias({
   alias: string,
   db_name: string,
   collection_name: string,
   timeout?: number
 })
```

**参数：**

- **alias** (*str*) -

    **[必需]**

    collection 的别名。在执行此操作之前，请确保该别名尚不存在。如果已存在，将会发生异常。

    <Admonition type="info" icon="📘" title="Note">

    什么是 collection 别名？
    
        collection 别名是 collection 的附加名称。当你希望将应用程序切换到新的 collection，而无需对代码进行任何更改时，collection 别名非常有用。
    
        在 Zilliz Cloud 上，collection 别名是全局唯一标识符。一个别名只能分配给一个 collection。反之，一个 collection 可以有多个别名。
    
        以下是将一个 collection 的别名重新分配给另一个 collection 的示例：
    
        假设有两个 collection：`collection_1` 和 `collection_2`。还有一个名为 `bob` 的 collection 别名，它最初分配给了 `collection_1`：
    
        - `collection_1` 的别名 = ["bob"]
    
        - `collection_2` 的别名 = []
    
        调用 `alter_alias("collection_2", "bob")` 后：
    
        - `collection_1` 的别名 = []
    
        - `collection_2` 的别名 = ["bob"]

    </Admonition>

- **db_name** (*str*) -

    保存目标 collection 的数据库名称。

- **collection_name** (*str*) -

    **[必需]**

    要为其创建别名的 collection 名称。

- **timeout** (*number*)  

    此操作的超时时长。将其设置为 **None** 表示此操作在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

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

    表示操作结果的代码。如果此操作成功，则其保持为 **0**。

- **error_code** (*string* | *number*) -

    表示发生错误的错误代码。如果此操作成功，则其保持为 **Success**。

- **reason** (*string*) - 

    表示所报告错误原因的原因。如果此操作成功，则其保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
 const resStatus = await milvusClient.createAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
 });
```

