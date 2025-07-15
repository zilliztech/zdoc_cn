---
displayed_sidbar: javaSidebar
title: "dropAlias() | Java | v2"
slug: /java/java/v2-Collections-dropAlias
sidebar_label: "dropAlias()"
beta: false
notebook: false
description: "This operation drops a specified collection alias. | Java | v2"
type: docx
token: MBy3dDXFbo0buwxkh0IczwLInPf
sidebar_position: 13
keywords: 
  - Unstructured Data
  - vector database
  - IVF
  - knn
  - zilliz
  - zilliz cloud
  - cloud
  - dropAlias()
  - javaV225
displayed_sidebar: javaSidebar

---

import Admonition from '@theme/Admonition';


# dropAlias()

This operation drops a specified collection alias. 

```java
public void dropAlias(DropAliasReq request)
```

## Request Syntax

```java
dropAlias(DropAliasReq.builder()
    .alias(String alias)
    .build()
)
```

**BUILDER METHODS:**

- `alias(String alias)`

    The alias of a collection. 

    Before this operation, ensure that the alias exists. Otherwise, exceptions will occur.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.DropAliasReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop alias "test_alias"
DropAliasReq dropAliasReq = DropAliasReq.builder()
        .alias("test_alias")
        .build();
client.dropAlias(dropAliasReq);
```
