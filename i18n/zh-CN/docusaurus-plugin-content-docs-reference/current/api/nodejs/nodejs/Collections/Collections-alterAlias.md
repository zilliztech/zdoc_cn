---
title: "alterAlias() | Node.js"
slug: /node/node/Collections-alterAlias
sidebar_label: "alterAlias()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将一个 collection 的别名重新分配给另一个 collection。 | Node.js"
type: docx
token: DXTLdtFCso7fo6xJHShc7XLpngh
sidebar_position: 1
keywords: 
  - 知识库
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - zilliz
  - zilliz cloud
  - cloud
  - alterAlias()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# alterAlias()

此操作将一个 collection 的别名重新分配给另一个 collection。

```javascript
await milvusClient.alterAlias(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.alterAlias({
   alias: string,
   db_name: string
   collection_name: string,
   timeout?: number
 })
```

**参数：**

- **alias** (*str*) -

    **[必需]**

    collection 的别名。请注意，该别名应事先存在。

    <Admonition type="info" icon="📘" title="说明">

    什么是 collection 别名？
    
        collection 别名是 collection 的附加名称。当你希望在不更改任何代码的情况下将应用程序切换到新的 collection 时，collection 别名非常有用。
    
        在 Zilliz Cloud 上，collection 别名是全局唯一标识符。一个别名只能分配给一个 collection。反之，一个 collection 可以有多个别名。
    
        下面是将一个 collection 的别名重新分配给另一个 collection 的示例：
    
        假设有两个 collection：`collection_1` 和 `collection_2`。还有一个名为 `bob` 的 collection 别名，最初分配给了 `collection_1`：
    
        - `collection_1` 的别名 = ["bob"]
    
        - `collection_2` 的别名 = []
    
        调用 `alter_alias("collection_2", "bob")` 后：
    
        - `collection_1` 的别名 = []
    
        - `collection_2` 的别名 = ["bob"]

    </Admonition>

- **db_name** (*str*) -

    存放目标 collection 的数据库名称。

- **collection_name** (*str*) -

    **[必需]**

    要重新分配别名的目标 collection 的名称。

- **timeout** (*number*)  

    此操作的超时时长。

    将其设置为 **None** 表示当任何响应到达或发生任何错误时，此操作超时。

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

    表示操作结果的代码。如果此操作成功，则保持为 **0**。

- **error_code** (*string* | *number*) -

    表示发生错误的错误代码。如果此操作成功，则保持为 **Success**。

- **reason** (*string*) - 

    表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const resStatus = await milvusClient.alterAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
});
```

