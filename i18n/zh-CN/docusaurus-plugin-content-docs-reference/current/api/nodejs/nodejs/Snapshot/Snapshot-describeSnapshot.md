---
title: "describeSnapshot() | Node.js"
slug: /node/node/Snapshot-describeSnapshot
sidebar_label: "describeSnapshot()"
beta: false
added_since: v3.0.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作用于检索特定快照的详细信息。 | Node.js"
type: docx
token: KNOwdbcYXoVwGEx8ysScLO1CnUd
sidebar_position: 2
keywords: 
  - 向量搜索算法
  - 问答系统
  - llm-as-a-judge
  - 混合向量搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - describeSnapshot()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# describeSnapshot()

此操作用于检索特定快照的详细信息。

```typescript
await milvusClient.describeSnapshot(data: DescribeSnapshotReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.describeSnapshot({
    collection_name: string,
    snapshot_name: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**参数：**

- **collection_name** (*string*) -
**[必填]**
快照所属集合的名称。

- **snapshot_name** (*string*) -
**[必填]**
要查询详情的快照名称。

- **db_name** (*string*) -
数据库名称。可选。

- **timeout** (*number*) -
允许 RPC 执行的可选时长，单位为毫秒。如果设置为 undefined，客户端将持续等待，直到服务器响应或发生错误。默认值为 undefined。

- **client_request_id** (*string*) -
用于请求跟踪的 trace ID。可选。

**返回值** *Promise&lt;DescribeSnapshotResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **DescribeSnapshotResponse** 对象。

```typescript
{
    name: string,
    description: string,
    collection_name: string,
    partition_names: string[],
    create_ts: string,
    s3_location: string,
    status:  ResStatus
}
```

**参数：**

- **name** (*string*) -
快照名称。

- **description** (*string*) -
创建快照时提供的描述；如果未提供，则为空字符串。

- **collection_name** (*string*) -
拥有该快照的集合。

- **partition_names** (*string[]*) -
快照捕获的分区名称。

- **create_ts** (*string*) -
创建快照时的混合时间戳。

- **s3_location** (*string*) -
持久化快照数据的对象存储 URI。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const res = await client.describeSnapshot({
    collection_name: 'my_collection',
    snapshot_name: 'snapshot_2024_01',
});
```
