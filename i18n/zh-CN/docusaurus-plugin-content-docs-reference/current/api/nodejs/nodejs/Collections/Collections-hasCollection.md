---
title: "hasCollection() | Node.js"
slug: /node/node/Collections-hasCollection
sidebar_label: "hasCollection()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作检查特定 collection 是否存在。 | Node.js"
type: docx
token: FhbbdNrlNouBXJxHIdKctXVKnmf
sidebar_position: 13
keywords: 
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - llm 幻觉
  - zilliz
  - zilliz cloud
  - cloud
  - hasCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# hasCollection()

此操作检查特定 collection 是否存在。

```javascript
await milvusClient.hasCollection(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.hasCollection({ 
    db_name: string,
    collection_name: string,
    timeout?: number
})
```

**参数：**

- **db_name** (*str*) -

    持有目标 collection 的数据库名称。

- **collection_name** (*str*) -

    **[必需]**

    collection 的名称。

- **timeout** (*number*) -

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在任何响应返回或发生错误时超时。

**返回** *Promise&lt;BoolResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **BoolResponse** 对象。

```typescript
{
    value: boolean,
    status:  ResStatus
}
```

**参数：**

- **value** (*boolean*) -
一个布尔值，表示请求的 collection 是否存在。当 collection 存在时为 **true**，不存在时为 **false**。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示发生错误的错误码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const res = await milvusClient.hasCollection({ collection_name: 'my_collection' });
```

