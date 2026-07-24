---
title: "abortImport() | Java | v2"
slug: /java/java/v2-BulkImport-abortImport
sidebar_label: "abortImport()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "中止现有的批量导入作业。| Java | v2"
type: docx
token: RayydoBX1oNrb0xAiOtciVyen9c
sidebar_position: 5
keywords: 
  - ANN Search
  - 什么是 vector embeddings
  - vector database 教程
  - vector database 如何工作
  - zilliz
  - zilliz cloud
  - cloud
  - abortImport()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# abortImport()

中止现有的批量导入作业。

```java
public static String abortImport(String url, BaseDescribeImportRequest request)
```

## 请求语法\{#request-syntax}

```java
// include-start milvus
MilvusDescribeImportRequest.builder()
    .apiKey(apiKey)
    .jobId(jobId)
    .build();
// include-end
// include-start zilliz
CloudDescribeImportRequest.builder()
    .apiKey(apiKey)
    .clusterId(clusterId)
    .projectId(projectId)
    .regionId(regionId)
    .jobId(jobId)
    .build();
// include-end
```

### CloudDescribeImportRequest\{#clouddescribeimportrequest}

对于 Zilliz Cloud，使用 `CloudDescribeImportRequest`。设置 `clusterId`；如果是项目数据库部署，则同时设置 `projectId` 和 `regionId`。

**BUILDER 方法：**

- `apiKey(String apiKey)`

    身份验证凭据。对于 Milvus 使用 `userName:password`，或使用 Zilliz Cloud API key。

- `clusterId(String clusterId)`

    Zilliz Cloud 集群部署的集群 ID。

- `projectId(String projectId)`

    Zilliz Cloud 项目数据库部署的项目 ID。

- `regionId(String regionId)`

    Zilliz Cloud 项目数据库部署的地域 ID。

- `jobId(String jobId)`

    要中止的导入作业标识符。

**返回：**

*String*

导入端点返回的 JSON 响应正文。

**异常：**

- **Exception**

    当请求验证、传输或服务器执行失败时抛出。查看异常消息以获取确切的失败原因。

## 示例\{#example}

演示针对 Zilliz Cloud 使用 abortImport()。

```java
// include-start milvus
String response = BulkImportUtils.abortImport(MILVUS_URL,
    MilvusDescribeImportRequest.builder()
        .apiKey(MILVUS_CREDENTIALS)
        .jobId(JOB_ID)
        .build());
// include-end
// include-start zilliz
String response = BulkImportUtils.abortImport(CLOUD_URL,
    CloudDescribeImportRequest.builder()
        .apiKey(API_KEY)
        .clusterId(CLUSTER_ID)
        .jobId(JOB_ID)
        .build());
// include-end
```
