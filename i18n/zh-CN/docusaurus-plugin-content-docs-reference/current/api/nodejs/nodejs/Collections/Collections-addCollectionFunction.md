---
title: "addCollectionFunction() | Node.js"
slug: /node/node/Collections-addCollectionFunction
sidebar_label: "addCollectionFunction()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会向现有集合添加自定义函数。 | Node.js"
type: docx
token: SmI4dGF4qoAjbKxamfhcndjxnCc
sidebar_position: 21
keywords: 
  - Zilliz database
  - 非结构化数据
  - vector database
  - IVF
  - zilliz
  - zilliz cloud
  - cloud
  - addCollectionFunction()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# addCollectionFunction()

此操作会向现有集合添加自定义函数。

```typescript
await milvusClient.addCollectionFunction(data: AddCollectionFunctionReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.addCollectionFunction({
    collection_name: string,
    function: FunctionObject,
    db_name?: string,
    timeout?: number,
})
```

**参数：**

- **collection_name** (*string*) -

    **[必需]**

    要添加函数的集合的名称。

- **function** (*FunctionObject*) -

    **[必需]**

    要添加到集合的函数。完整字段参考，请参见下方的 FunctionObject 部分。

- **db_name** (*string*) -

    集合所在的数据库名称。

- **timeout** (*number*) -

    此操作的超时时长，单位为毫秒。

**返回：**

*Promise\<ResStatus\>*

**异常：**

- **MilvusError**

    当此操作期间发生任何错误时，将抛出此异常。

## FunctionObject\{#functionobject}

**FunctionObject** 定义了一个服务端函数，可在插入和搜索期间自动将数据转换为向量嵌入。

**参数：**

- **name** (*string*) -

    **[必需]**

    函数的名称。用于在查询和集合中引用该函数。

- **type** (*FunctionType*) -

    **[必需]**

    函数类型。可选值：`FunctionType.BM25`（使用 BM25 从文本生成稀疏嵌入）、`FunctionType.TEXTEMBEDDING`（从文本生成稠密嵌入）、`FunctionType.RERANK`（重排序函数）。

- **input_field_names** (*string[]*) -

    **[必需]**

    包含要转换的原始数据的字段名称。对于 `FunctionType.BM25`，需要且仅需要一个字段名称。

- **output_field_names** (*string[]*) -

    用于存储生成的嵌入的字段名称。对于 `FunctionType.BM25`，需要且仅需要一个字段名称。

- **params** (*object*) -

    以键值对形式提供的其他函数参数。

- **description** (*string*) -

    函数用途的简要描述。默认为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient, FunctionType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});

const resStatus = await milvusClient.addCollectionFunction({
    collection_name: 'my_collection',
    function: {
        name: 'my_bm25_function',
        description: 'BM25 sparse embedding function',
        type: FunctionType.BM25,
        input_field_names: ['text'],
        output_field_names: ['sparse_vector'],
        params: {},
    },
});
```

