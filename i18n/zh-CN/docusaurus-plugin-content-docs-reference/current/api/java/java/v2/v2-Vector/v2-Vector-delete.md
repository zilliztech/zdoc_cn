---
title: "delete() | Java | v2"
slug: /java/java/v2-Vector-delete
sidebar_label: "delete()"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作通过实体 ID 或布尔表达式删除实体。 | Java | v2"
type: docx
token: NTCHdGKwNo9kl2xFzgKcjo8wndg
sidebar_position: 1
keywords: 
  - 音频搜索
  - 什么是语义搜索
  - Embedding model
  - 图像相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - delete()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# delete()

此操作通过实体 ID 或布尔表达式删除实体。

```java
public DeleteResp delete(DeleteReq request)
```

## 请求语法\{#request-syntax}

```java
delete(DeleteReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .filter(String filter)
    .ids(List<Object> ids)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    数据库名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)` -

    目标 collection 的名称。

- `partitionName(String partitionName)` -

    目标 partition 的名称。

- `filter(String filter)` -

    用于过滤结果的布尔表达式。

- `ids(List<Object> ids)` -

    用于标识特定实体的主键值列表。

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    参数化过滤器的模板变量值映射。

**RETURNS:**

*DeleteResp*

一个 **DeleteResp** 对象包含已删除实体的数量。

**EXCEPTIONS:**

- **MilvusClientException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.DeleteReq;
import io.milvus.v2.service.vector.response.DeleteResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Delete entities with filter "id > 10"
DeleteReq deleteReq = DeleteReq.builder()
        .collectionName("test")
        .filter("id > 10")
        .build();
DeleteResp deleteResp = client.delete(deleteReq);
```
