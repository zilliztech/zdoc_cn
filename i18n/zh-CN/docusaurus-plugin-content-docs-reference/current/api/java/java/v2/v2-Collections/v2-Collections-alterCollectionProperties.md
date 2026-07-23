---
title: "alterCollectionProperties() | Java | v2"
slug: /java/java/v2-Collections-alterCollectionProperties
sidebar_label: "alterCollectionProperties()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会修改指定 collection 的属性。 | Java | v2"
type: docx
token: JQ4QdTaadoIDSPxDJRZcSDu3n5g
sidebar_position: 3
keywords: 
  - Vector index
  - vector database 开源
  - 开源 vector db
  - vector database 示例
  - zilliz
  - zilliz cloud
  - cloud
  - alterCollectionProperties()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# alterCollectionProperties()

此操作会修改指定 collection 的属性。

```java
public Void alterCollectionProperties(AlterCollectionPropertiesReq request)
```

## 请求语法\{#request-syntax}

```java
alterCollectionProperties(AlterCollectionPropertiesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .properties(Map<String, String> properties)
    .build()
)
```

**构建器方法：**

- `databaseName(String databaseName)`

    持有目标 collection 的 database 名称。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `properties(Map<String, String> properties)`

    要修改的属性及其期望值。请注意，属性值应为字符串。可用的 database 属性如下：

    - **collection.ttl.seconds** -

        collection 的生存时间（TTL），以秒为单位。

    - **mmap.enabled** -

        是否为 collection 中所有字段的原始数据和 index 启用 mmap。

**返回：**

*void*

**异常：**

- **MilvusClientExceptions**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.AlterCollectionPropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter the `collection.ttl.seconds` property
Map<String, String> properties = new HashMap<>()
properties.put("collection.ttl.seconds", "86400")

AlterCollectionPropertiesReq alterCollectionFieldReq = AlterCollectionPropertiesReq.builder()
        .collectionName("test")
        .properties(properties)
        .build();
client.alterCollectionProperties(alterCollectionFieldReq)
```

