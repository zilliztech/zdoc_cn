---
title: "getImportProgress() | Java | v2"
slug: /java/java/v2-BulkImport-getImportProgress
sidebar_label: "getImportProgress()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "检索 Milvus 或 Zilliz Cloud 中批量导入作业的当前状态和进度。 | Java | v2"
type: docx
token: OFZ3dUGwmoarOBx6FHScZwwtn8f
sidebar_position: 3
keywords: 
  - 深度学习
  - 知识库
  - 自然语言处理
  - AI 聊天机器人
  - zilliz
  - zilliz cloud
  - cloud
  - getImportProgress()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getImportProgress()

检索 Milvus 或 Zilliz Cloud 中批量导入作业的当前状态和进度。

```java
public static String getImportProgress(String url, BaseDescribeImportRequest request)
```

## 请求语法\{#request-syntax}

将此请求用于在 Zilliz Cloud 中创建的导入作业。

```java
CloudDescribeImportRequest.builder()
    .apiKey(apiKey)
    .clusterId(clusterId)
    .projectId(projectId)
    .regionId(regionId)
    .jobId(jobId)
    .build();
```

**参数：**

- **apiKey** (*String*) -
身份验证凭据。对于 Zilliz Cloud 请求，请使用 Zilliz Cloud API 密钥；对于 Milvus 请求，请使用 `username:password`。

- **clusterId** (*String*) -
基于集群的部署的集群标识符。对于项目数据库部署，请改用 `projectId` 和 `regionId`。

- **projectId** (*String*) -
项目数据库部署的项目标识符。与 `regionId` 一起使用，而不是 `clusterId`。

- **regionId** (*String*) -
项目数据库部署的区域标识符。与 `projectId` 一起使用，而不是 `clusterId`。

- **jobId** (*String*) -
要检查的导入作业的标识符。

**返回：**

*String*

包含导入作业状态、进度和相关详细信息的 JSON 响应。

## 示例\{#example}

使用项目和区域标识符获取导入进度。

```java
CloudDescribeImportRequest request = CloudDescribeImportRequest.builder()
    .projectId(PROJECT_ID)
    .regionId(REGION_ID)
    .jobId(jobId)
    .apiKey(API_KEY)
    .build();
String response = BulkImportUtils.getImportProgress("https://api.cloud.zilliz.com", request);
```

