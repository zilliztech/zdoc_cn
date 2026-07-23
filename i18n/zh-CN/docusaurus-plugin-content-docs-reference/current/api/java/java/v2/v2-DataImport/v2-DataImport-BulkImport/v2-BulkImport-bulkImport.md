---
title: "bulkImport() | Java | v2"
slug: /java/java/v2-BulkImport-bulkImport
sidebar_label: "bulkImport()"
beta: false
added_since: v2.5.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将准备好的数据文件导入 Zilliz Cloud。要了解如何准备数据文件，请阅读 Prepare Data Import。 | Java | v2"
type: docx
token: S0ITdsnpYoDpH9xKv9fcBhe5nWA
sidebar_position: 2
keywords: 
  - 信息检索
  - 降维
  - hnsw 算法
  - 向量相似性搜索
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

此操作将准备好的数据文件导入 Zilliz Cloud。要了解如何准备数据文件，请阅读[准备数据导入](/docs/prepare-data-import)。

```java
public static String bulkImport(String url, BaseImportRequest request)
```

## 请求语法\{#request-syntax}

```java
bulkImport.bulkImport(
    url, 
    request
)
```

**参数：**

- **url** (*String*) -

    Zilliz Cloud 的控制平面 API 端点。端点 URL 应采用以下格式：

    ```python
    https://api.cloud.zilliz.com
    ```

- **request** (*[BaseImportRequest](./v2-BulkImport-bulkImport#baseimportrequest)*) -  

    一个 **BaseImportRequest** 实例。

**返回类型：**

*String*

**返回：**

已创建导入任务的 ID。

## BaseImportRequest\{#baseimportrequest}

**BaseImportRequest** 实例在 **CloudImportRequest** 中实现。

### CloudImportRequest\{#cloudimportrequest}

```java
CloudImportRequest.builder()
    .apiKey(String apiKey)
    .objectUrl(String objectUrl)
    .accessKey(String accessKey)
    .secrectKey(String secrectKey)
    .clusterId(String clusterId)
    .dbName(String dbName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
```

**构建器方法：**

- `apiKey(String apiKey)`

    一个具有足够权限来操作集群的有效 Zilliz Cloud API 密钥。

- `objectUrl(String objectUrl)`

    你的数据文件在某个块存储桶中的 URL。以下是一些知名块存储服务的示例：

    ```python
    # Google Cloud Storage
    gs://{bucket-name}/{object-path}/
    
    # AWS S3
    s3://{bucket-name}/{object-path}/
    ```

- `accessKey(String accessKey)`

    用于验证数据文件访问权限的访问密钥。

- `secrectKey(String secrectKey)`

    用于验证数据文件访问权限的密钥。

- `clusterId(String clusterId)`

    此操作的目标集群的实例 ID。

    你可以在 Zilliz Cloud 控制台的集群详情页面获取集群的实例 ID。

- `dbName(String dbName)`

    目标数据库的名称。此参数的值默认为 `default`。

- `collectionName(String collectionName)`

    此操作的目标集群中的集合名称。

- `partitionName(String partitionName)`

    此操作的目标集群中的分区名称。该值默认为 `default`。

## 示例\{#example}

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.bulkwriter.request.import_.MilvusImportRequest;
import io.milvus.bulkwriter.restful.BulkImportUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

CloudImportRequest cloudImportRequest = CloudImportRequest.builder()
        .objectUrl(objectUrl).accessKey(accessKey).secretKey(secretKey)
        .clusterId(clusterId).collectionName(collectionName)
        .apiKey(apiKey)
        .build();
String bulkImportResult = BulkImportUtils.bulkImport(url, cloudImportRequest);

Gson GSON_INSTANCE = new Gson();
JsonObject result = GSON_INSTANCE.fromJson(bulkImportResult, JsonObject.class);
String jobId = result.getAsJsonObject("data").get("jobId").getAsString();
System.out.println("Create a bulkInert task, job id: " + jobId);
```

