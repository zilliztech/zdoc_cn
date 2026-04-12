---
displayed_sidbar: nodeSidebar
title: "getPkFieldName() | Node.js"
slug: /node/node/Collections-getPkFieldName
sidebar_label: "getPkFieldName()"
added_since: v2.6.x
last_modified: false
deprecate_since: false
beta: false
notebook: false
description: "This operation gets the primary key field name of a collection. This is a convenient method that describes the collection and extracts the primary key field name. | Node.js"
type: docx
token: WiVnd8VXooFQ9PxVgiyc7FkqnAg
sidebar_position: 25
keywords: 
  - Pinecone vector database
  - Audio search
  - what is semantic search
  - Embedding model
  - zilliz
  - zilliz cloud
  - cloud
  - getPkFieldName()
  - nodejs26
displayed_sidebar: nodeSidebar

---

import Admonition from '@theme/Admonition';


# getPkFieldName()

This operation gets the primary key field name of a collection. This is a convenient method that describes the collection and extracts the primary key field name.

```javascript
await milvusClient.getPkFieldName(data: DescribeCollectionReq)
```

## Request Syntax

```javascript
getPkFieldName({
    collection_name: string,
    timeout: number
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS:**

*Promise\<string\>*

The name of the primary key field.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'YOUR_CLUSTER_TOKEN',
});
const pkName = await client.getPkFieldName({
    collection_name: 'my_collection',
});
console.log(pkName); // e.g., "id"
```
