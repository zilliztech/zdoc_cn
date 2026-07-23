---
title: "loadCollection() | Node.js"
slug: /node/node/Management-loadCollection
sidebar_label: "loadCollection()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将特定 collection 的数据加载到内存中。 | Node.js"
type: docx
token: LoNvdRK80oWllFxV0H6co0HrnBe
sidebar_position: 17
keywords: 
  - nn 搜索
  - llm 评估
  - 稀疏与密集
  - Dense vector
  - zilliz
  - zilliz cloud
  - cloud
  - loadCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# loadCollection()

此操作将特定 collection 的数据加载到内存中。

```javascript
await milvusClient.loadCollection(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.loadCollection({ 
    db_name: string,
    collection_name: string,
    refresh?: boolean,
    replica_number?: number,
    resource_groups?: string[],
    timeout?: number
})
```

**参数：**

- **db_name** (*string*) -

    保存目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    collection 的名称。

- **refresh** (*boolean*) -

    是否刷新已加载 collection 的加载状态。

- **replica_number** (*number*) -

    要加载的 collection 的副本数量。

- **resource_groups** (*string[]*) -

    要加载的 collection 中的 resource group 数量。

- **timeout** (*number*) -

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在任何响应返回或发生错误时超时。

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

    表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
 const resStatus = await milvusClient.loadCollection({ collection_name: 'my_collection' });
```

