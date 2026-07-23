---
title: "createDatabase() | Node.js"
slug: /node/node/Database-createDatabase
sidebar_label: "createDatabase()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作会创建一个数据库。| Node.js"
type: docx
token: UouKd4h01oL9Rqx73jjcHM3enSh
sidebar_position: 2
keywords: 
  - Milvus 数据库
  - Milvus Lite
  - Milvus benchmark
  - managed Milvus
  - Zilliz
  - Zilliz Cloud
  - cloud
  - createDatabase()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# createDatabase()

此操作会创建一个数据库。

```javascript
await milvusClient.createDatabase(data)
```

<Admonition type="info" icon="📘" title="说明">

此方法仅适用于专用集群。

</Admonition>

## 请求语法\{#request-syntax}

```javascript
await milvusClient.createDatabase({
    db_name: string,
    properties?: Object
    timeout?: number
})
```

**参数：**

- **db_name** (*string*) -

    要创建的数据库名称。

    不应存在具有指定名称的数据库。否则，将会发生异常。

- **properties** (*Object*) -

    在创建数据库时一同设置的属性。可能的数据库属性如下：

    - **database.replica.number** (*int*) -

        数据库的副本数量。

    - **database.resource_groups** (*[]str*) -

        专用于数据库的资源组。

    - **database.diskQuota.mb** (*int*) -

        分配给数据库的磁盘配额，单位为兆字节（**MB**）。

    - **database.max.collections** (*int*) -

        数据库中允许的最大集合数量。

    - **database.force.deny.writing** (*bool*) -

        是否拒绝数据库中的所有写操作。

    - **database.force.deny.reading** (*bool*) -

        是否拒绝数据库中的所有读操作。

- **timeout** (*number*) -

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise |&lt;ResStatus&gt;*

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

    表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const resStatus = await milvusClient.createDatabase({
    db_name: 'new_db',
    properties: { 'database.resource_groups': 'rg1' },
});
```
