---
title: "dropCollectionProperties() | Java | v2"
slug: /java/java/v2-Collections-dropCollectionProperties
sidebar_label: "dropCollectionProperties()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会将指定 collection 的属性重置为其默认值。 | Java | v2"
type: docx
token: OPPHd2AabonMIzxzfupcyNS9n1a
sidebar_position: 15
keywords: 
  - 深度学习
  - 知识库
  - 自然语言处理
  - AI 聊天机器人
  - Zilliz
  - Zilliz Cloud
  - 云
  - dropCollectionProperties()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# dropCollectionProperties()

此操作会将指定 collection 的属性重置为其默认值。

```java
public Void dropCollectionProperties(DropCollectionPropertiesReq request)
```

## 请求语法\{#request-syntax}

```java
dropCollectionProperties(DropCollectionPropertiesReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .propertyKeys(List<String> propertyKeys)
    .build()
)
```

**构建器方法：**

- `databaseName(String databaseName)`

    保存目标 collection 的 database 名称。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `propertyKeys(List<String> propertyKeys)`

    要重置为默认值的属性。可能的属性如下：

    - **collection.ttl.seconds** -

        collection 的生存时间（TTL），以秒为单位。

    - **mmap.enabled** -

        是否为 collection 中所有字段的原始数据和 index 启用 mmap。

**返回：**

*void*

**异常：**

- **MilvusClientExceptions**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.DropCollectionPropertiesReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop the `collection.ttl.seconds` property
List<String> propertyKeys = new ArrayList<>()
propertyKeys.add("collection.ttl.seconds")

DropCollectionPropertiesReq dropCollectionPropertiesReq = DropCollectionPropertiesReq.builder()
        .collectionName("test")
        .propertyKeys(propertyKeys)
        .build();
        
client.dropCollectionProperties(dropCollectionPropertiesReq)
```

