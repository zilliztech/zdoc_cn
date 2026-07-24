---
title: "uploadFiles() | Java | v2"
slug: /java/java/v2-VolumeFileManager-uploadFiles
sidebar_label: "uploadFiles()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "同步将文件或目录上传到 Zilliz Cloud volume，并支持重试、并发、分片和进度控制。 | Java | v2"
type: docx
token: FiyGdmoSHoDbrPxhSdncsMWbnhc
sidebar_position: 4
keywords: 
  - IVF
  - knn
  - 图像搜索
  - LLMs
  - zilliz
  - Zilliz Cloud
  - cloud
  - uploadFiles()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# uploadFiles()

同步将文件或目录上传到 Zilliz Cloud volume，并支持重试、并发、分片和进度控制。

```java
public UploadFilesResult uploadFiles(UploadFilesRequest request)
```

## 请求语法\{#request-syntax}

```java
UploadFilesRequest.builder()
    .sourceFilePath(sourceFilePath)
    .targetVolumePath(targetVolumePath)
    .uploadConcurrency(uploadConcurrency)
    .maxRetries(maxRetries)
    .retryIntervalMillis(retryIntervalMillis)
    .progressListener(progressListener)
    .partSizeBytes(partSizeBytes)
    .build();
```

**构建器方法：**

- `sourceFilePath(String sourceFilePath)`

    要上传的本地文件或目录。

- `targetVolumePath(String targetVolumePath)`

    volume 内的目标目录。

- `uploadConcurrency(int uploadConcurrency)`

    并发上传文件的最大数量。

- `maxRetries(int maxRetries)`

    每个文件的最大重试次数。

- `retryIntervalMillis(long retryIntervalMillis)`

    重试尝试之间的延迟时间，单位为毫秒。

- `progressListener(ProgressListener progressListener)`

    接收 UploadProgress 快照的回调。

- `partSizeBytes(long partSizeBytes)`

    分片上传的分片大小，单位为字节。非正值将启用自动大小设置。

**返回：**

*UploadFilesResult*

标识目标 volume 和已上传路径。

**异常：**

- **Exception**

    当请求验证、传输或服务器执行失败时抛出。请查看异常消息以了解确切的失败原因。

## 示例\{#example}

```java
UploadFilesResult result = manager.uploadFiles(UploadFilesRequest.builder()
    .sourceFilePath("./data")
    .targetVolumePath("imports/")
    .uploadConcurrency(5)
    .maxRetries(5)
    .progressListener(progress -> System.out.println(progress.getPercent()))
    .build());
```
