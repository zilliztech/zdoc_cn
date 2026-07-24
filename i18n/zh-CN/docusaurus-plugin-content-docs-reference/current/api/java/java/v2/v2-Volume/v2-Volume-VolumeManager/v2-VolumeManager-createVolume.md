---
title: "createVolume() | Java | v2"
slug: /java/java/v2-VolumeManager-createVolume
sidebar_label: "createVolume()"
beta: false
added_since: false
last_modified: false
deprecate_since: false
notebook: false
description: "创建由指定存储集成和路径支持的卷。 | Java | v2"
type: docx
token: ZQwMd6bo5otETvxWWHDcUpTMn8g
sidebar_position: 1
keywords: 
  - 托管式 vector database
  - Pinecone vector database
  - 音频搜索
  - 什么是语义搜索
  - zilliz
  - zilliz cloud
  - cloud
  - createVolume()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# createVolume()

创建由指定存储集成和路径支持的卷。

```java
public void createVolume(CreateVolumeRequest request)
```

## 请求语法\{#request-syntax}

```java
CreateVolumeRequest.builder()
    .projectId(projectId)
    .regionId(regionId)
    .volumeName(volumeName)
    .type(type)
    .storageIntegrationId(storageIntegrationId)
    .path(path)
    .build();
```

**构建器方法：**

- `projectId(String projectId)`

    Zilliz Cloud 项目的 ID。

- `regionId(String regionId)`

    云区域的 ID。

- `volumeName(String volumeName)`

    卷的名称。

- `type(String type)`

    卷类型：`MANAGED` 或 `EXTERNAL`。默认值为 `MANAGED`。

- `storageIntegrationId(String storageIntegrationId)`

    外部卷使用的存储集成的 ID。

- `path(String path)`

    外部卷的存储路径。如果设置，该路径必须以 `/` 结尾；否则将使用存储集成根路径。

**异常：**

- **MilvusClientExceptions**

    当此操作期间发生任何错误时抛出。请检查异常消息以了解确切的失败原因。

## 示例\{#example}

创建由指定存储集成和路径支持的卷。

```java
volumeManager.createVolume(CreateVolumeRequest.builder()
    .projectId(PROJECT_ID)
    .regionId(REGION_ID)
    .volumeName("bulk-data")
    .type("S3")
    .storageIntegrationId(STORAGE_INTEGRATION_ID)
    .path("s3://bucket/prefix")
    .build());
```
