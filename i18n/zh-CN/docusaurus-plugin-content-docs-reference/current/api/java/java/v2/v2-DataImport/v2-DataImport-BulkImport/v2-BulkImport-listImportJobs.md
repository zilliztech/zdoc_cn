---
title: "listImportJobs() | Java | v2"
slug: /java/java/v2-BulkImport-listImportJobs
sidebar_label: "listImportJobs()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出与指定 collection 相关的所有现有导入任务。 | Java | v2"
type: docx
token: CN9sdiCicoERZpx9GhmcLa4Wn7g
sidebar_position: 4
keywords: 
  - milvus vector db
  - Zilliz Cloud
  - 什么是 milvus
  - milvus database
  - zilliz
  - zilliz cloud
  - cloud
  - listImportJobs()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# listImportJobs()

此操作列出与指定 collection 相关的所有现有导入任务。

```java
public static String listImportJobs(String url, BaseListImportJobsRequest request)
```

## 请求语法\{#request-syntax}

```java
bulkImport.listImportJobs(
    url,
    request
)
```

**参数：**

- **url** (*String*) -

    Zilliz Cloud 的 Control Plane API endpoint。endpoint URL 应采用以下格式：

    ```python
    https://api.cloud.zilliz.com
    ```

- **request** (*[BaseListImportRequest](./v2-BulkImport-listImportJobs#baselistimportrequest)*) -  

    一个 **BaseImportRequest** 实例。

**返回类型：**

*String*

**返回：**

指定 collection 的导入任务 ID 列表。

## BaseListImportRequest\{#baselistimportrequest}

**BaseListImportRequest** 实例在 **CloudListImportRequest** 中实现。

### CloudListImportRequest\{#cloudlistimportrequest}

```java
CloudListImportRequest.builder()
    .apiKey(String apiKey)
    .collectionName(String collectionName)
    .build()
```

**构建器方法：**

- `apiKey(String apiKey)`

    一个有效的 Zilliz Cloud API key，且具有足够权限来操作 cluster。

- `collectionName(String collectionName)`

    此操作的目标 collection 名称。

## 示例\{#example}

```java

```

