---
displayed_sidbar: nodeSidebar
title: "getPkFieldType() | Node.js"
slug: /node/node/Collections-getPkFieldType
sidebar_label: "getPkFieldType()"
added_since: v2.6.x
last_modified: false
deprecate_since: false
beta: false
notebook: false
description: "This operation returns the primary key field's data type for a collection. This is a convenient method that describes the collection and extracts the primary key field type. | Node.js"
type: docx
token: AKpldMJPTo6MfuxxrpicBKRInCh
sidebar_position: 26
keywords: 
  - k nearest neighbor algorithm
  - ANNS
  - Vector search
  - knn algorithm
  - zilliz
  - zilliz cloud
  - cloud
  - getPkFieldType()
  - nodejs26
displayed_sidebar: nodeSidebar

---

import Admonition from '@theme/Admonition';


# getPkFieldType()

This operation returns the primary key field's data type for a collection. This is a convenient method that describes the collection and extracts the primary key field type.

```javascript
await milvusClient.getPkFieldType(data: DescribeCollectionReq)
```

## Request Syntax

```javascript
getPkFieldType({
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

*Promise\<keyof typeof DataType\>*

The data type of the primary key field (e.g., `"Int64"`, `"VarChar"`).

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'YOUR_CLUSTER_TOKEN',
});
const pkType = await client.getPkFieldType({
    collection_name: 'my_collection',
});
console.log(pkType); // e.g., "Int64"
```

