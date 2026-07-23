---
title: "describeIndex() | Node.js"
slug: /node/node/Management-describeIndex
sidebar_label: "describeIndex()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于描述特定索引。| Node.js"
type: docx
token: PePIdiq9po6cplxAoF6ca5C2ntb
sidebar_position: 4
keywords: 
  - knn
  - 图像搜索
  - LLMs
  - 机器学习
  - zilliz
  - Zilliz Cloud
  - 云
  - describeIndex()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# describeIndex()

此操作用于描述特定索引。

```javascript
await milvusClient.describeIndex(data)
```

## 请求语法\{#request-syntax}

```javascript
 milvusClient.describeIndex({ 
     db_name: string,
     collection_name: string,
     field_name?: string,
     index_name?: string,
     timeout?: number
 })
```

**参数：**

- **db_name** (*string*) -

    包含目标集合的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有集合的名称。

- **field_name** (*string*) -

    集合中现有字段的名称。 

- **index_name** (*string*) -

    要描述的索引的名称。

- **timeout** (*number*)  

    此操作的超时时长。将其设置为 **None** 表示此操作在收到任何响应或发生任何错误时超时。

**返回** *Promise&lt;DescribeIndexResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **DescribeIndexResponse** 对象。

```typescript
{
    index_descriptions: IndexDescription[],
    status:  ResStatus
}
```

**参数：**

- **index_descriptions** (*IndexDescription[]*) -
所请求集合的索引描述列表。当提供 **field_name** 或 **index_name** 时，该列表仅包含匹配的条目。

    - **index_name** (*string*) -

        索引名称。

    - **indexID** (*number*) -

        内部索引标识符。

    - **params** (*KeyValuePair[]*) -

        创建时记录的索引参数（例如 **index_type**、**metric_type**、**params**）。

    - **field_name** (*string*) -

        构建索引的字段。

    - **indexed_rows** (*string*) -

        到目前为止已建立索引的行数。

    - **total_rows** (*string*) -

        索引覆盖的总行数。

    - **state** (*string*) -

        索引的构建状态。可能的值为 **IndexStateNone**、**Unissued**、**InProgress**、**Finished** 和 **Failed**。

    - **index_state_fail_reason** (*string*) -

        当 **state** 为 **Failed** 时的失败原因，否则为空字符串。

    - **pending_index_rows** (*string*) -

        仍在等待建立索引的行数。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const describeIndexReq = {
  collection_name: 'my_collection',
  index_name: 'my_index',
};
const res = await milvusClient.describeIndex(describeIndexReq);
console.log(res);
```

