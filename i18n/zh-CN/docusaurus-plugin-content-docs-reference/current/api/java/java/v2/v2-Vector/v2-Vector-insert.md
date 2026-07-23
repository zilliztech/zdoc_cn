---
title: "insert() | Java | v2"
slug: /java/java/v2-Vector-insert
sidebar_label: "insert()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作将数据插入到特定 collection 中。 | Java | v2"
type: docx
token: Y0N1dL4bVoyUnXxfSu7cjrgRnlc
sidebar_position: 4
keywords: 
  - Chroma 与 Milvus 对比
  - Annoy vector 搜索
  - milvus
  - Zilliz
  - zilliz
  - Zilliz Cloud
  - cloud
  - insert()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# insert()

此操作将数据插入到特定 collection 中。

```java
public InsertResp insert(InsertReq request)
```

## 请求语法\{#request-syntax}

```java
insert(InsertReq.builder()
    .data(List<JsonObject> data)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
);
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)` -

    要作为 JSON 对象插入/upsert 的数据行列表。

- `databaseName(String databaseName)` -

    database 的名称。如果未指定，则默认为当前 database。

- `collectionName(String collectionName)` -

    目标 collection 的名称。

- `partitionName(String partitionName)` -

    目标 partition 的名称。

**返回：**

*InsertResp*

一个 **InsertResp** 对象，包含有关已插入实体数量的信息。

**异常：**

- **MilvusClientException**

    在此操作期间发生任何错误时，将引发此异常。

## 示例\{#example}

```java
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.InsertReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Add one row to the collection, the collection has an "id" field
// and a "vector" field with dimension 2
JsonObject row = new JsonObject();
List<Float> vectorList = new ArrayList<>();
vectorList.add(1.0f);
vectorList.add(2.0f);
row.add("vector", gson.toJsonTree(vectorList));
row.addProperty("id", 0L);

InsertReq insertReq = InsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build();
client.insert(insertReq);
```
