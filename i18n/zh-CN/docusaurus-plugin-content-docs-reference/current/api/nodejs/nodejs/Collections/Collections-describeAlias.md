---
title: "describeAlias() | Node.js"
slug: /node/node/Collections-describeAlias
sidebar_label: "describeAlias()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于描述指定的别名。| Node.js"
type: docx
token: YCzNdg5yWoeZVrxj7jGcb1UXnBd
sidebar_position: 7
keywords: 
  - k 近邻算法
  - ANNS
  - 向量搜索
  - knn 算法
  - zilliz
  - zilliz cloud
  - 云
  - describeAlias()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# describeAlias()

此操作用于描述指定的别名。

```javascript
await milvusClient.describeAlias(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.describeAlias({
    db_name: string,
    alias: string,
    collection_name: string
})
```

**参数：**

- **db_name** (*str*) -

    持有目标 collection 的数据库名称。

- **alias** (*str*) -

    **[必需]**

    collection 的别名。请注意，该别名应事先存在。

    <Admonition type="info" icon="📘" title="Note">

    什么是 collection 别名？
    
        collection 别名是 collection 的附加名称。当你希望在不更改代码的情况下将应用程序切换到新的 collection 时，collection 别名非常有用。
    
        在 Zilliz Cloud 上，collection 别名是全局唯一标识符。一个别名只能分配给且仅分配给一个 collection。反过来，一个 collection 可以有多个别名。
    
        以下是将一个 collection 的别名重新分配给另一个 collection 的示例：
    
        假设有两个 collection：`collection_1` 和 `collection_2`。还有一个名为 `bob` 的 collection 别名，它最初分配给了 `collection_1`：
    
        - `collection_1` 的别名 = ["bob"]
    
        - `collection_2` 的别名 = []
    
        调用 `alter_alias("collection_2", "bob")` 后：
    
        - `collection_1` 的别名 = []
    
        - `collection_2` 的别名 = ["bob"]

    </Admonition>

- **collection_name** (*str*) -

    **[必需]**

    具有指定别名的 collection 的名称。

**返回值** *Promise&lt;DescribeAliasResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **DescribeAliasResponse** 对象。

```typescript
{
    db_name: string,
    alias: string,
    collection: string,
    status:  ResStatus
}
```

**参数：**

- **db_name** (*string*) -
拥有该别名的数据库。

- **alias** (*string*) -
别名名称。

- **collection** (*string*) -
该别名当前指向的 collection 名称。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const res = await milvusClient.describeAlias({
   alias: 'my_collection_alias',
   collection_name: 'my_collection',
});
```
