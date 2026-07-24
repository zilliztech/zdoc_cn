---
title: "commitImport() | Java | v2"
slug: /java/java/v2-BulkImport-commitImport
sidebar_label: "commitImport()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "提交已准备好的 bulk-import 作业。| Java | v2"
type: docx
token: DFyndL57goJMr0xAcMEcVq5Lnhh
sidebar_position: 6
keywords: 
  - NLP
  - 神经网络
  - 深度学习
  - 知识库
  - zilliz
  - zilliz cloud
  - cloud
  - commitImport()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# commitImport()

提交已准备好的 bulk-import 作业。

```java
public static String commitImport(String url, BaseDescribeImportRequest request)
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

对于 Zilliz Cloud，使用 `CloudDescribeImportRequest`。可设置 `clusterId`；对于项目数据库部署，则同时设置 `projectId` 和 `regionId`。

**BUILDER 方法：**

- `apiKey(String apiKey)`

    身份验证凭证。对于 Milvus，使用 `userName:password`；对于 Zilliz Cloud，使用 API key。

- `clusterId(String clusterId)`

    Zilliz Cloud 集群部署的集群 ID。

- `projectId(String projectId)`

    Zilliz Cloud 项目数据库部署的项目 ID。

- `regionId(String regionId)`

    Zilliz Cloud 项目数据库部署的区域 ID。

- `jobId(String jobId)`

    要提交的导入作业标识符。

**返回：**

*String*

导入端点返回的 JSON 响应正文。

**异常：**

- **Exception**

    当请求验证、传输或服务器执行失败时抛出。请查看异常消息以了解确切的失败原因。

## 示例\{#example}

演示如何针对 Zilliz Cloud 使用 commitImport()。

```java
// include-start milvus
String response = BulkImportUtils.commitImport(MILVUS_URL,
    MilvusDescribeImportRequest.builder()
        .apiKey(MILVUS_CREDENTIALS)
        .jobId(JOB_ID)
        .build());
// include-end
// include-start zilliz
String response = BulkImportUtils.commitImport(CLOUD_URL,
    CloudDescribeImportRequest.builder()
        .apiKey(API_KEY)
        .clusterId(CLUSTER_ID)
        .jobId(JOB_ID)
        .build());
// include-end
```
