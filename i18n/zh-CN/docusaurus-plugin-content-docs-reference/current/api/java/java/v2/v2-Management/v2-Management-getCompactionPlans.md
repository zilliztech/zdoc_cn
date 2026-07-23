---
title: "getCompactionPlans() | Java | v2"
slug: /java/java/v2-Management-getCompactionPlans
sidebar_label: "getCompactionPlans()"
beta: false
added_since: v2.6.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "此操作返回特定压缩任务的压缩计划，包括显示将合并哪些段的合并计划。 | Java | v2"
type: docx
token: BDNBdbEOioqnlKxRd3DcY7wRncg
sidebar_position: 22
keywords: 
  - 什么是 vector databases
  - vector databases 比较
  - Faiss
  - 视频搜索
  - zilliz
  - zilliz cloud
  - cloud
  - getCompactionPlans()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getCompactionPlans()

此操作返回特定压缩任务的压缩计划，包括显示将合并哪些段的合并计划。

```java
public GetCompactionPlansResp getCompactionPlans(GetCompactionPlansReq request)
```

## 请求语法\{#request-syntax}

```java
getCompactionPlans(GetCompactionPlansReq.builder()
    .compactionID(Long compactionID)
    .build()
);
```

**BUILDER 方法：**

- `compactionID(Long compactionID)` -

    **[必需]**

    `compact()` 返回的压缩任务 ID。

**返回：**

*GetCompactionPlansResp*

响应包含压缩状态和合并计划。

**异常：**

- **MilvusClientException**

    当此操作过程中发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.service.utility.request.GetCompactionPlansReq;
import io.milvus.v2.service.utility.response.GetCompactionPlansResp;

GetCompactionPlansResp plans = client.getCompactionPlans(
    GetCompactionPlansReq.builder()
        .compactionID(jobId)
        .build()
);
System.out.println(plans);
```
