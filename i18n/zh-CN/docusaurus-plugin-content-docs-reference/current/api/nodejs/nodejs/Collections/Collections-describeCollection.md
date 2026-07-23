---
title: "describeCollection() | Node.js"
slug: /node/node/Collections-describeCollection
sidebar_label: "describeCollection()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作列出特定 collection 的详细信息。 | Node.js"
type: docx
token: IuTYdjSHHoznXNx5f7jcKqvYnhr
sidebar_position: 8
keywords: 
  - 自然语言搜索
  - 相似性搜索
  - 多模态 RAG
  - LLM 幻觉
  - Zilliz
  - Zilliz Cloud
  - 云
  - describeCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# describeCollection()

此操作列出特定 collection 的详细信息。

```javascript
await milvusClient.describeCollection(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.describeCollection({ 
    db_name: string,
    collection_name: string 
})
```

**参数：**

- **db_name** (*string*) -

    保存目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作在收到任何响应或发生任何错误时超时。

**返回** *Promise&lt;DescribeCollectionResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **DescribeCollectionResponse** 对象。

```typescript
{
    schema: CollectionSchema,
    collectionID: string,
    collection_name: string,
    consistency_level: string,
    aliases: string[],
    properties: KeyValuePair[],
    created_timestamp: string,
    created_utc_timestamp: string,
    shards_num: number,
    num_partitions: string,
    db_name: string,
    functions: FunctionObject[],
    external_source?: string,
    external_spec?: string,
    do_physical_backfill?: boolean,
    file_resource_ids?: string[],
    update_timestamp_str: string,
    update_timestamp: number,
    anns_fields: Record<string, FieldSchema>,
    scalar_fields: Record<string, FieldSchema>,
    function_fields: Record<string, FieldSchema>,
    status:  ResStatus
}
```

**参数：**

- **schema** (*CollectionSchema*) -
collection 的 schema。

    - **name** (*string*) -

        collection 名称。

    - **description** (*string*) -

        collection 的可选描述。

    - **enable_dynamic_field** (*boolean*) -

        是否启用 dynamic field。当为 **true** 时，schema 中未声明的字段会存储在隐藏的 `$meta` JSON 字段中。

    - **autoID** (*boolean*) -

        primary key 是否由 Milvus 自动生成。

    - **fields** (*FieldSchema[]*) -

        在 collection 上声明的所有 scalar 和 vector 字段。有关完整的 **FieldSchema** 字段参考，请参阅 `FieldSchema` 类文档。

    - **functions** (*FunctionObject[]*) -

        附加到 collection 的 doc-in / doc-out function（例如 BM25 sparse-vector function）。

- **collectionID** (*string*) -
Milvus 分配的内部 collection ID。

- **collection_name** (*string*) -
collection 名称。

- **consistency_level** (*string*) -
针对该 collection 执行查询时的默认一致性级别。可能的值包括 **Strong**、**Session**、**Bounded**、**Eventually** 和 **Customized**。

- **aliases** (*string[]*) -
指向此 collection 的 alias 列表。

- **properties** (*KeyValuePair[]*) -
collection 级别的属性（例如 **mmap.enabled**、**collection.ttl.seconds**），可在创建时声明或通过 `alterCollectionProperties()` 设置。

- **created_timestamp** (*string*) -
collection 创建时的 hybrid timestamp。

- **created_utc_timestamp** (*string*) -
collection 创建时的 UTC 时间戳，以毫秒为单位。

- **shards_num** (*number*) -
collection 上配置的 shard 数量。

- **num_partitions** (*string*) -
collection 上配置的 partition 数量。仅当声明了 partition key 字段时，此值才有意义。

- **db_name** (*string*) -
拥有此 collection 的数据库。

- **functions** (*FunctionObject[]*) -
附加到 collection 的 doc-in / doc-out function 的扁平化列表。

- **external_source** (*string*) -

    外部源路径。可选。

- **external_spec** (*string*) -

    外部 spec 配置。可选。

- **do_physical_backfill** (*boolean*) -

    是否对外部数据进行物理回填。可选。

- **file_resource_ids** (*Array&lt;number | string&gt;*) -

    外部文件资源 ID。可选。

- **update_timestamp_str** (*string*) -
collection 上次更新时的 hybrid timestamp，格式化为字符串。

- **update_timestamp** (*number*) -
上次更新时间戳的数值形式。

- **anns_fields** (*Record&lt;string, FieldSchema&gt;*) -
从 vector 字段名称到其 **FieldSchema** 的映射，涵盖 collection 上声明的所有 vector 字段。

- **scalar_fields** (*Record&lt;string, FieldSchema&gt;*) -
从 scalar 字段名称到其 **FieldSchema** 的映射，涵盖 collection 上声明的所有 scalar 字段。

- **function_fields** (*Record&lt;string, FieldSchema&gt;*) -
从 function 输出字段名称到其 **FieldSchema** 的映射。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
 const res = await milvusClient.describeCollection({ collection_name: 'my_collection' });
```

