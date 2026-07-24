---
title: "getRefreshExternalCollectionProgress() | Java | v2"
slug: /java/java/v2-Management-getRefreshExternalCollectionProgress
sidebar_label: "getRefreshExternalCollectionProgress()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作返回先前启动的外部 collection 刷新作业的进度和当前状态。 | Java | v2"
type: docx
token: FzEydqTwRoajhnxZOftcKxKpndg
sidebar_position: 29
keywords: 
  - 词法搜索
  - 最近邻搜索
  - Agentic RAG
  - rag llm 架构
  - zilliz
  - Zilliz Cloud
  - cloud
  - getRefreshExternalCollectionProgress()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getRefreshExternalCollectionProgress()

此操作返回先前启动的外部 collection 刷新作业的进度和当前状态。

```java
public GetRefreshExternalCollectionProgressResp getRefreshExternalCollectionProgress(GetRefreshExternalCollectionProgressReq request)
```

## 请求语法\{#request-syntax}

```java
getRefreshExternalCollectionProgress(GetRefreshExternalCollectionProgressReq.builder()
    .jobId(long jobId)
    .build()
);
```

**构建器方法：**

- `jobId(long jobId)` -

    **[必需]**

    由 `refreshExternalCollection()` 返回的作业 ID。

**返回：**

*GetRefreshExternalCollectionProgressResp*

响应封装了一个可通过 `getJobInfo()` 访问的 `RefreshExternalCollectionJobInfo`。作业信息中的字段如下：

- `jobId` (*long*) - 作业标识符。

- `collectionName` (*String*) - 目标 collection 名称。

- `state` (*String*) - 当前作业状态（例如，`"PENDING"`、`"RUNNING"`、`"SUCCEEDED"`、`"FAILED"`）。

- `progress` (*int*) - 完成百分比 (0–100)。

- `reason` (*String*) - 如果 `state` 为 `"FAILED"`，则为失败原因；否则为空。

- `externalSource` (*String*) - 作业使用的外部源。

- `startTime` (*long*) - 作业开始时间戳（epoch 毫秒）。

- `endTime` (*long*) - 作业结束时间戳（epoch 毫秒）；如果仍在运行，则为 0。

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.utility.request.GetRefreshExternalCollectionProgressReq;
import io.milvus.v2.service.utility.response.GetRefreshExternalCollectionProgressResp;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;

GetRefreshExternalCollectionProgressResp resp = client.getRefreshExternalCollectionProgress(
    GetRefreshExternalCollectionProgressReq.builder()
        .jobId(jobId)
        .build()
);
RefreshExternalCollectionJobInfo info = resp.getJobInfo();
System.out.println(info.getState() + " " + info.getProgress() + "%");
```
