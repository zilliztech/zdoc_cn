---
title: "dropIndex() | Node.js"
slug: /node/node/Management-dropIndex
sidebar_label: "dropIndex()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会从指定 collection 中删除 index。| Node.js"
type: docx
token: UBbndftiQo2HdOxUNtocIISnnVh
sidebar_position: 5
keywords: 
  - vector 数据库如何工作
  - vector db 对比
  - openai vector db
  - 自然语言处理数据库
  - zilliz
  - zilliz cloud
  - cloud
  - dropIndex()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# dropIndex()

此操作会从指定 collection 中删除 index。

```javascript
await milvusClient.dropIndex(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.dropPartition({
    db_name: string,
    collection_name: string,
    field_name?: string,
    index_name?: string,
    timeout?: number
 });
```

**参数：**

- **db_name** (*string*) -

    持有目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **field_name** (*string*) -

    collection 中现有 field 的名称。

- **index_name** (string) -

    要删除的 index 的名称。

- **timeout** (*number*) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

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

    表示已发生错误的错误码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const dropIndexReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.dropIndex(dropIndexReq);
console.log(res);
```

