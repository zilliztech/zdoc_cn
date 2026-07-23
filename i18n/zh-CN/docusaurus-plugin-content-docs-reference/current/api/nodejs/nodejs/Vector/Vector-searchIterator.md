---
title: "searchIterator() | Node.js"
slug: /node/node/Vector-searchIterator
sidebar_label: "searchIterator()"
beta: false
added_since: v2.5.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作以迭代方式执行 scalar 过滤查询，并按批次返回结果。当你需要增量处理大型结果集，或总结果数超过单次 query() 调用可返回的数量时，请使用此操作而不是单次 query() 调用。 | Node.js"
type: docx
token: K5APdBqphoQG7vxU4P2ccr5Wnig
sidebar_position: 9
keywords: 
  - 音频相似性搜索
  - 弹性 vector 数据库
  - Pinecone vs Milvus
  - Chroma vs Milvus
  - Zilliz
  - Zilliz Cloud
  - cloud
  - searchIterator()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# searchIterator()

此操作以迭代方式执行 scalar 过滤查询，并按批次返回结果。当你需要增量处理大型结果集，或总结果数超过单次 query() 调用可返回的数量时，请使用此操作而不是单次 query() 调用。

```javascript
await milvusClient.queryIterator(data: QueryIteratorReq)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.queryIterator({
    collection_name: string,
    batchSize: number,
    filter?: string,
    limit?: number,
    output_fields?: string[],
    partition_names?: string[],
    consistency_level?: ConsistencyLevelEnum,
    db_name?: string,
    timeout?: number,
})
```

**参数：**

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **batchSize** (*number*) -

    **[必需]**

    每次迭代返回的实体数量。不能超过 16,384。

- **filter** (*string*) -

    用于过滤匹配实体的 scalar 过滤条件。设置为空字符串可返回所有实体。要构建 scalar 过滤条件，请参阅布尔表达式规则。

- **limit** (*number*) -

    所有迭代中要返回的实体总数上限。默认值为匹配实体的总数（无限制）。

- **output_fields** (*string[]*) -

    要包含在每个返回实体中的字段名称列表。默认返回所有字段。

- **partition_names** (*string[]*) -

    要查询的 partition 的名称。

- **consistency_level** (*ConsistencyLevelEnum*) -

    此操作的一致性级别。选项：Strong (0)、Bounded (1)、Session (2)、Eventually (3)。默认使用创建 collection 时设置的一致性级别。

- **db_name** (*string*) -

    包含该 collection 的数据库名称。

- **timeout** (*number*) -

    此操作的超时时长，单位为毫秒。

- **order_by_fields** (*OrderByFields*) -

    用于对搜索结果排序的字段。可选。

**返回：**

*Promise\<AsyncIterable\<object[]\>\>*

返回一个异步可迭代对象。每次迭代都会生成该批次的实体数组。当总结果数达到 `limit` 或所有匹配实体都已耗尽时，迭代结束。

**异常：**

- **MilvusError**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const iterator = await milvusClient.queryIterator({
    collection_name: 'my_collection',
    filter: 'age > 30',
    batchSize: 100,
    limit: 500,
    output_fields: ['id', 'age', 'text'],
});

for await (const batch of iterator) {
    console.log(`Batch of ${batch.length} entities:`, batch);
}
```
