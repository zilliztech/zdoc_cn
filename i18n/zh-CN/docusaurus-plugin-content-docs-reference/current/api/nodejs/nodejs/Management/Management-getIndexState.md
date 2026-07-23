---
title: "getIndexState() | Node.js"
slug: /node/node/Management-getIndexState
sidebar_label: "getIndexState()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作获取指定索引的状态。| Node.js"
type: docx
token: HqE5d2jOroEuObxIjkZcHkX4nWX
sidebar_position: 12
keywords: 
  - k 最近邻算法
  - ANNS
  - 向量搜索
  - knn 算法
  - zilliz
  - Zilliz Cloud
  - cloud
  - getIndexState()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getIndexState()

此操作获取指定索引的状态。

```javascript
await milvusClient.getIndexState(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.getIndexState({
      db_name?: string,
      collection_name: string,
      field_name?: string,
      index_name?: string,
      timeout?: number
});
```

**参数：**

- **db_name** (*string*) -

    持有目标集合的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有集合的名称。

- **index_name** (*string*) -

    目标索引的名称。此参数与 `field_name` 互斥。

- **field_name** (*string*) -

    目标字段的名称。此参数与 `index_name` 互斥。使用此参数时，请确保已在指定字段上构建索引。

- **timeout** (number) -

    此操作的超时时长。将其设置为 **None** 表示当任何响应到达或发生任何错误时，此操作超时。

**返回** *Promise&lt;GetIndexStateResponse&gt;*

此方法返回一个 promise，其解析结果为 **GetIndexStateResponse** 对象。

```typescript
{
    state: IndexState,
    status:  ResStatus
}
```

**参数：**

- **state** (*IndexState*) -
索引的当前构建状态。可能的值为 **IndexStateNone**、**Unissued**、**InProgress**、**Finished** 和 **Failed**。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const getIndexStateReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.getIndexState(getIndexStateReq);
console.log(res);
```

