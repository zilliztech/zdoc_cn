---
title: "dropAlias() | Node.js"
slug: /node/node/Collections-dropAlias
sidebar_label: "dropAlias()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除指定的集合别名。| Node.js"
type: docx
token: FubcdxJ0LoyQiJxmUMjcZnbjnbc
sidebar_position: 9
keywords: 
  - nlp 搜索
  - hallucinations llm
  - 多模态搜索
  - vector 搜索算法
  - zilliz
  - zilliz cloud
  - 云
  - dropAlias()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# dropAlias()

此操作会删除指定的集合别名。 

```javascript
await milvusClient.dropAlias(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.dropAlias({
   alias: string,
   db_name: string,
   collection_name: string,
   timeout?: number
 })
```

**参数：**

- **alias** (*string*) -

    **[必需]**

    集合的别名。 

    在执行此操作之前，请确保该别名存在。否则将发生异常。

- **db_name** (*string*) -

    包含指定集合的数据库名称。

- **collection_name** (*string*) -

    该别名绑定到的集合名称。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

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
const resStatus = await milvusClient.dropAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
});
```

