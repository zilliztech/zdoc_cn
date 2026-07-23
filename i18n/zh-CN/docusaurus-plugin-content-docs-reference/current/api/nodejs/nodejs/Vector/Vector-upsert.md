---
title: "upsert() | Node.js"
slug: /node/node/Vector-upsert
sidebar_label: "upsert()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作在指定 collection 中插入或更新数据。 | Node.js"
type: docx
token: LEptdqqfcoqdtCx0LO1c3yxvnBo
sidebar_position: 8
keywords: 
  - Vector embeddings
  - Vector store
  - 开源 vector 数据库
  - Vector index
  - zilliz
  - zilliz cloud
  - 云
  - upsert()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# upsert()

此操作在指定 collection 中插入或更新数据。

```typescript
await milvusClient.upsert(data)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.upsert({
    db_name?: string,
    collection_name: string,
    data: RowData[],
    hash_keys?: number[],
    partial_update?: boolean,
    partition_name?: string,
    timeout?: number,
})
```

**参数：**

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **data** (*RowData[]*) -

    **[必需]**

    要 upsert 的数据。每个元素都是一个普通 JavaScript 对象，其键与 collection schema 的字段名称匹配。主键与现有记录匹配的实体会被更新；否则会插入一个新实体。

- **db_name** (*string*) -

    保存目标 collection 的数据库名称。

- **hash_keys** (*number[]*) -

    保留供内部使用。除非明确要求，否则不要设置此参数。

- **partial_update** (*boolean*) -

    是否启用部分更新。设置为 `true` 时，你可以在 `data` 中仅包含需要更新的字段；未包含的字段会保留其现有值。

- **partition_name** (*string*) -

    当前 collection 中某个 partition 的名称。如果指定，数据将被 upsert 到该 partition 中。

- **timeout** (*number*) -

    此操作的超时时长。将其设置为 `None` 表示此操作会在收到任何响应或发生任何错误时超时。

- **field_ops** (*FieldPartialUpdateOp[]*) -

    array 字段的部分更新操作。可选。

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
输入数据中成功 upsert 的行的从零开始的位置。

- **err_index** (*number[]*) -
被拒绝的行的从零开始的位置。当所有行都成功时，此列表为空。

- **acknowledged** (*boolean*) -
写入是否已由 Milvus 确认。

- **insert_cnt** (*string*) -
此操作新插入的行数，格式为字符串。

- **delete_cnt** (*string*) -
为替换腾出空间而逻辑删除的行数。

- **upsert_cnt** (*string*) -
此操作 upsert 的总行数。

- **timestamp** (*string*) -
写入变为可见时的混合时间戳。

- **IDs** (*StringArrayId* | *NumberArrayId*) -
upsert 行中携带的主键。有关完整字段参考，请参阅 `insert()` 文档。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

// Upsert a single entity
const result = await milvusClient.upsert({
    collection_name: 'my_collection',
    data: {
        id: 0,
        vector: [0.62, 0.59, 0.85, 0.93, -0.42],
        color: 'grass-green',
    },
});

// Upsert multiple entities
const result2 = await milvusClient.upsert({
    collection_name: 'my_collection',
    data: [
        { id: 1, vector: [0.37, -0.94, 0.92, 0.50, -0.56], color: 'mud-brown' },
        { id: 2, vector: [0.47, -0.53, -0.83, 0.98, 0.63], color: 'violet-purple' },
    ],
});

console.log(result2.upsert_cnt);
```
