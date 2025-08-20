---
displayed_sidbar: javaSidebar
title: "getCollectionStats() | Java | v2"
slug: /java/java/v2-Collections-getCollectionStats
sidebar_label: "getCollectionStats()"
beta: false
notebook: false
description: "This operation lists the statistics collected on a specific collection. | Java | v2"
type: docx
token: XgfcdpBWCof3pfxhUudcRZajnPc
sidebar_position: 17
keywords: 
  - how do vector databases work
  - vector db comparison
  - openai vector db
  - natural language processing database
  - zilliz
  - zilliz cloud
  - cloud
  - getCollectionStats()
  - javaV225
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# getCollectionStats()

This operation lists the statistics collected on a specific collection.

```java
public GetCollectionStatsResp getCollectionStats(GetCollectionStatsReq request)
```

## Request Syntax

```java
getCollectionStats(GetCollectionStatsReq.builder()
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

**RETURN TYPE:**

*GetCollectionStatsResp*

**RETURNS:**

A **GetCollectionStatsResp** object containing collected statistics on the specified collection.

**PARAMETERS:**

- **numOfEntities** (*long*)

    The count of entities in the collection.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetCollectionStatsReq;
import io.milvus.v2.service.collection.response.GetCollectionStatsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get collection stats
GetCollectionStatsReq getCollectionStatsReq = GetCollectionStatsReq.builder()
        .collectionName("test")
        .build();
GetCollectionStatsResp getCollectionStatsResp = client.getCollectionStats(getCollectionStatsReq);
```

