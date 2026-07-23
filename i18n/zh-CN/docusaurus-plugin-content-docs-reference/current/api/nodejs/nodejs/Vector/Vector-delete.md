---
title: "delete() | Node.js"
slug: /node/node/Vector-delete
sidebar_label: "delete()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作通过实体 ID 或布尔表达式删除实体。| Node.js"
type: docx
token: KOZHdyeQvo4htOxhO8BcbEudnNd
sidebar_position: 2
keywords: 
  - 低成本向量数据库
  - 托管式向量数据库
  - Pinecone 向量数据库
  - 音频搜索
  - zilliz
  - zilliz cloud
  - 云
  - delete()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# delete()

此操作通过实体 ID 或布尔表达式删除实体。

```javascript
await milvusClient.delete(data)
```

## 请求语法\{#request-syntax}

此方法有以下几种调用方式。

### 使用 DeleteByIdsReq\{#with-deletebyidsreq}

```javascript
await milvusClient.delete({
   db_name: string,
   collection_name: string,
   partition_name?: string,
   ids: string[] | number[],
   consistency_level: string,
   timeout?: number
 })
```

**参数：**

- **db_name** (*string*) -

    保存目标集合的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有集合的名称。

- **partition_name** (*string*) -

    集合中现有分区的名称。

- **ids** (*string[]* | *number[]*) -

    **[必需]**

    特定实体 ID 或实体 ID 列表。

    该值默认为 **None**，表示应用标量过滤条件。

- **consistency_level** (*ConsistencyLevelEnum*) -

    目标集合的一致性级别。该值默认为 **Bounded**（**1**），可选项包括 **Strong**（**0**）、**Bounded**（**1**）、**Session**（**2**）和 **Eventually**（**3**）。

- **timeout** (*number*) -

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在任何响应到达或发生任何错误时超时。

**返回** *Promise&lt;MutationResult&gt;*

此方法返回一个 promise，该 promise 解析为 **MutationResult** 对象。

```typescript
{
    succ_index: number[],
    err_index: number[],
    acknowledged: boolean,
    insert_cnt: string,
    delete_cnt: string,
    upsert_cnt: string,
    timestamp: string,
    IDs: { int_id?: { data: number[] }, str_id?: { data: string[] }, id_field: 'int_id' | 'str_id' },
    status:  ResStatus
}
```

**参数：**

- **succ_index** (*number[]*) -
输入 ID 中匹配到某一行并被标记为已删除的从零开始的位置。

- **err_index** (*number[]*) -
输入 ID 中未匹配任何行的从零开始的位置。

- **acknowledged** (*boolean*) -
删除操作是否已被 Milvus 确认。

- **insert_cnt** (*string*) -
对于 `delete()` 始终为 **"0"**。

- **delete_cnt** (*string*) -
此操作逻辑删除的行数。

- **upsert_cnt** (*string*) -
对于 `delete()` 始终为 **"0"**。

- **timestamp** (*string*) -
删除变为可见时的混合时间戳。

- **IDs** (*StringArrayId* | *NumberArrayId*) -
此删除操作所针对的主键。如需完整字段参考，请参阅 `insert()` 文档。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
 const resStatus = await milvusClient.delete({
   collection_name: 'my_collection',
   ids: [1,2,3,4]
 });
```

</TabItem>

<TabItem value='java'>

```java
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

// Delete by IDs
const resStatus1 = await milvusClient.delete({
    collection_name: 'my_collection',
    ids: [1, 2, 3, 4],
});

// Delete by filter
const resStatus2 = await milvusClient.delete({
    collection_name: 'my_collection',
    filter: 'id in [5, 6, 7, 8]',
});
```

</TabItem>
</Tabs>
