---
title: "BulkImportOption | Go | v2"
slug: /go/go/v2-DataImport-BulkImportOption
sidebar_label: "BulkImportOption"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "BulkImportOption | Go | v2"
type: docx
token: ZG2ndWgIwogyOAxAzH5ciWY3nlb
sidebar_position: 2
keywords: 
  - DiskANN
  - Sparse vector
  - Vector Dimension
  - ANN Search
  - zilliz
  - zilliz cloud
  - cloud
  - BulkImportOption
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# BulkImportOption

BulkImportOption

此类型用于为 RESTful import API 配置批量导入请求。对于自托管 Milvus，使用 `NewBulkImportOption()` 构造；对于 Zilliz Cloud，使用 `NewCloudBulkImportOption()` 构造。构造后，可链式调用 `With*` 构建器方法来提供可选字段，例如分区名称、API key 和额外选项。

```go
type BulkImportOption struct {
    URL            string
    CollectionName string
    Files          [][]string
    PartitionName  string
    APIKey         string
    ObjectURL      string
    ClusterID      string
    AccessKey      string
    SecretKey      string
    Options        map[string]string
}
```

**字段：**

- **URL** (*string*) -
Milvus 或 Zilliz Cloud 集群的基础 URL。不要包含路径；该函数会自动追加 `/v2/vectordb/jobs/import/create`。

- **CollectionName** (*string*) -
目标集合的名称。必填。

- **Files** (*[][]string*) -
要导入的文件路径列表。每个内部切片表示一批将一起导入的文件。与 `NewBulkImportOption()` 一起使用。对于云导入是可选的。

- **PartitionName** (*string*) -
集合中的目标分区。可选；如果省略，数据将落入默认分区。

- **APIKey** (*string*) -
作为 `Bearer` header 发送的授权 token。可选；当服务器强制基于 token 的身份验证时必填。

- **ObjectURL** (*string*) -
用于云导入的 S3 或兼容对象 URL。与 `NewCloudBulkImportOption()` 一起使用。可选。

- **ClusterID** (*string*) -
Zilliz Cloud 集群 ID。与 `NewCloudBulkImportOption()` 一起使用。可选。

- **AccessKey** (*string*) -
对象存储的 access key。可选。

- **SecretKey** (*string*) -
对象存储的 secret key。可选。

- **Options** (*map[string]string*) -
转发到 import API 的额外键值参数。使用 `WithOption()` 添加条目。

**构建器方法：**

- `WithPartition(partitionName string)`
设置导入数据的目标分区。

- `WithAPIKey(key string)`
设置作为 `Bearer` header 发送的授权 token。

- `WithOption(key, value string)`
向请求 payload 添加一个额外的键值参数。可多次调用以添加更多条目。

**构造函数：**

- `NewBulkImportOption(uri string, collectionName string, files [][]string)`
为自托管 Milvus 集群创建 BulkImportOption。`files` 参数是批次列表，其中每个批次都是文件路径切片。

- `NewCloudBulkImportOption(uri string, collectionName string, apiKey string, objectURL string, clusterID string, accessKey string, secretKey string)`
为 Zilliz Cloud 集群创建 BulkImportOption。对于云对象存储，使用 `ObjectURL` 而不是 `Files`。

