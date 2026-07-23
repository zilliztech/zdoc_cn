---
title: "refreshExternalCollection() | Java | v2"
slug: /java/java/v2-Management-refreshExternalCollection
sidebar_label: "refreshExternalCollection()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会触发一个刷新作业，将数据从外部源拉取到 Milvus collection 中。返回一个作业 ID，可将其传递给 `getRefreshExternalCollectionProgress()` 以跟踪进度。| Java | v2"
type: docx
token: G8JydoIzPoKb2MxASemcW2spnbe
sidebar_position: 29
keywords: 
  - 视频去重
  - 视频相似性搜索
  - Vector 检索
  - 音频相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - refreshExternalCollection()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# refreshExternalCollection()

此操作会触发一个刷新作业，将数据从外部源拉取到 Milvus collection 中。返回一个作业 ID，可将其传递给 `getRefreshExternalCollectionProgress()` 以跟踪进度。

```java
public RefreshExternalCollectionResp refreshExternalCollection(RefreshExternalCollectionReq request)
```

## 请求语法\{#request-syntax}

```java
refreshExternalCollection(RefreshExternalCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .externalSource(String externalSource)
    .externalSpec(JsonObject externalSpec)
    .build()
);
```

**构建器方法：**

- `databaseName(String databaseName)` -

    数据库名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)` -

    **[必填]**

    要刷新的 collection 名称。

- `externalSource(String externalSource)` -

    外部数据源标识符（例如，`"s3"`、`"oss"`）。

- `externalSpec(JsonObject externalSpec)` -

    描述外部存储配置的 JSON 对象。字段取决于 `externalSource`（通常包括 `endpoint`、`bucket`、`path`、凭证）。

**返回值：**

*RefreshExternalCollectionResp*

响应包含一个字段：

- `jobId` (*long*) - 新启动的刷新作业的数字 ID。持久化此值，以便使用 `getRefreshExternalCollectionProgress()` 查询进度。

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import com.google.gson.JsonObject;
import io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

JsonObject spec = new JsonObject();
spec.addProperty("endpoint", "https://s3.amazonaws.com");
spec.addProperty("bucket", "my-bucket");
spec.addProperty("path", "data/snapshots/2026-05-01/");

RefreshExternalCollectionResp resp = client.refreshExternalCollection(
    RefreshExternalCollectionReq.builder()
        .collectionName("my_collection")
        .externalSource("s3")
        .externalSpec(spec)
        .build()
);
long jobId = resp.getJobId();
System.out.println("Started refresh job: " + jobId);
```
