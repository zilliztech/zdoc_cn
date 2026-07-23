---
title: "getLoadStateV2() | Java | v2"
slug: /java/java/v2-Collections-getLoadStateV2
sidebar_label: "getLoadStateV2()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作获取 collection 或 partition 的详细加载状态信息。当你同时需要当前加载状态和加载进度时使用。 | Java | v2"
type: docx
token: JEgudTxxYocs2VxLjgccpB7SnOb
sidebar_position: 38
keywords: 
  - 开源 vector db
  - vector database 示例
  - rag vector database
  - 什么是 vector db
  - zilliz
  - zilliz cloud
  - cloud
  - getLoadStateV2()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# getLoadStateV2()

此操作获取 collection 或 partition 的详细加载状态信息。当你同时需要当前加载状态和加载进度时使用。

```java
public GetLoadStateResp getLoadStateV2(GetLoadStateReq request)
```

## 请求语法\{#request-syntax}

```java
getLoadStateV2(GetLoadStateReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build());
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    包含该 collection 的 database。

- `collectionName(String collectionName)`

    要检查加载状态的 collection。

- `partitionName(String partitionName)`

    可选的 partition 名称。省略它可检查 collection 级别的加载状态。

**返回：**

*GetLoadStateResp*

**异常：**

- **MilvusClientException**

    当验证失败或服务器针对此操作返回错误时，将引发此异常。

## 示例\{#example}

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("YOUR_CLUSTER_ENDPOINT")
    .token("YOUR_CLUSTER_TOKEN")
    .build());

GetLoadStateResp resp = client.getLoadStateV2(GetLoadStateReq.builder()
    .collectionName("book")
    .build());
System.out.println(resp.getState());
System.out.println(resp.getProgress());
```

{/* category: Collections; action: CREATE; addedSince: v3.0.x */}
