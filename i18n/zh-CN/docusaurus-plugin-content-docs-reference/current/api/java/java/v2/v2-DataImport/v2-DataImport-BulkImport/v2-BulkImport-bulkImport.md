---
title: "bulkImport() | Java | v2"
slug: /java/java/v2-BulkImport-bulkImport
sidebar_label: "bulkImport()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "从 Milvus 或 Zilliz Cloud 中准备好的数据文件创建批量导入作业。 | Java | v2"
type: docx
token: HlcKdFOnpouIUjxL5hLcUU1GnFb
sidebar_position: 2
keywords: 
  - 信息检索
  - 降维
  - hnsw 算法
  - vector 相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - bulkImport()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# bulkImport()

从 Milvus 或 Zilliz Cloud 中准备好的数据文件创建批量导入作业。

```java
public static String bulkImport(String url, BaseImportRequest request)
```

## 请求语法\{#request-syntax}

将存储桶数据导入 Zilliz Cloud 时使用此请求。

```java
CloudImportRequest.builder()
    .apiKey(apiKey)
    .clusterId(clusterId)
    .projectId(projectId)
    .regionId(regionId)
    .dbName(dbName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .objectUrls(objectUrls)
    .objectUrl(objectUrl)
    .accessKey(accessKey)
    .secretKey(secretKey)
    .token(token)
    .options(options)
    .build();
```

**参数：**

- **apiKey** (*String*) -
身份验证凭证。Cloud 请求使用 Zilliz Cloud API key，Milvus 请求使用 `username:password`。

- **clusterId** (*String*) -
基于集群的部署的集群标识符。对于项目数据库部署，请改用 `projectId` 和 `regionId`。

- **projectId** (*String*) -
项目数据库部署的项目标识符。与 `regionId` 搭配使用，而不是 `clusterId`。

- **regionId** (*String*) -
项目数据库部署的区域标识符。与 `projectId` 搭配使用，而不是 `clusterId`。

- **dbName** (*String*) -
默认值：`default`
Dedicated 部署的目标数据库名称。

- **collectionName** (*String*) -
目标 collection 名称。

- **partitionName** (*String*) -
默认值：`default`
当 collection 不使用 partition key 时的目标 partition 名称。

- **objectUrls** (*List&lt;List&lt;String&gt;&gt;*) -
要导入的存储桶文件夹或文件。支持多个路径和文件组。

- **objectUrl** (*String*) -
已弃用的单个存储桶文件夹或文件 URL。新的集成请使用 `objectUrls`。

- **accessKey** (*String*) -
存储访问密钥。与 `secretKey` 搭配使用；对于临时凭证，还需与 `token` 搭配使用。

- **secretKey** (*String*) -
存储密钥。与 `accessKey` 搭配使用；对于临时凭证，还需与 `token` 搭配使用。

- **token** (*String*) -
使用短期凭证时的临时存储凭证令牌。

- **options** (*Map&lt;String, Object&gt;*) -
传递给服务的其他导入选项。

**返回：**

*String*

一个 JSON 响应，其中 `data.jobId` 标识已创建的导入作业。

## 示例\{#example}

为 Zilliz Cloud 中的项目数据库创建导入作业。

```java
CloudImportRequest request = CloudImportRequest.builder()
    .projectId(PROJECT_ID)
    .regionId(REGION_ID)
    .collectionName("books")
    .objectUrls(List.of(List.of("s3://bucket/books.parquet")))
    .accessKey(ACCESS_KEY)
    .secretKey(SECRET_KEY)
    .apiKey(API_KEY)
    .build();
String response = BulkImportUtils.bulkImport("https://api.cloud.zilliz.com", request);
```

