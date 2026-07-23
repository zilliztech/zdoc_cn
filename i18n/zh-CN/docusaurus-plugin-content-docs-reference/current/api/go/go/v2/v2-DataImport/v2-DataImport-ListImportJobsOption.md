---
title: "ListImportJobsOption | Go | v2"
slug: /go/go/v2-DataImport-ListImportJobsOption
sidebar_label: "ListImportJobsOption"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此类型用于配置通过 RESTful API 列出 collection 的批量导入任务的请求。使用 `NewListImportJobsOption()` 构造它，默认值为 `CurrentPage 1, PageSize: 10`。链式调用 `With` 构建器方法可更改分页、添加 API key 或覆盖默认值。| Go | v2"
type: docx
token: KUFtdKbFpoTdtkxw4y3cYWhHnUe
sidebar_position: 8
keywords: 
  - Zilliz
  - Milvus vector database
  - Milvus db
  - Milvus vector db
  - Zilliz
  - Zilliz Cloud
  - cloud
  - ListImportJobsOption
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# ListImportJobsOption

此类型用于配置通过 RESTful API 列出 collection 的批量导入任务的请求。使用 `NewListImportJobsOption()` 构造它，默认值为 `CurrentPage: 1, PageSize: 10`。链式调用 `With*` 构建器方法可更改分页、添加 API key 或覆盖默认值。

```go
type ListImportJobsOption struct {
    URL            string
    CollectionName string
    ClusterID      string
    APIKey         string
    PageSize       int
    CurrentPage    int
}
```

**字段：**

- **URL** (*string*) -
Milvus 或 Zilliz Cloud cluster 的基础 URL。不要包含路径；该函数会自动追加 `/v2/vectordb/jobs/import/list`。

- **CollectionName** (*string*) -
应列出其导入任务的 collection 名称。必需。

- **ClusterID** (*string*) -
Zilliz Cloud cluster ID。可选；仅用于云端导入。

- **APIKey** (*string*) -
作为 `Bearer` header 发送的授权 token。可选；当服务器强制执行基于 token 的身份验证时必需。

- **PageSize** (*int*) -
每页返回的任务数量。默认值为 `10`。使用 `WithPageSize()` 覆盖。

- **CurrentPage** (*int*) -
页索引，从 `1` 开始。默认值为 `1`。使用 `WithCurrentPage()` 覆盖。

**构建器方法：**

- `WithAPIKey(key string)`
这会设置作为 `Bearer` header 发送的授权 token。

- `WithPageSize(pageSize int)`
这会设置每页返回的任务数量。

- `WithCurrentPage(currentPage int)`
这会设置页索引，从 `1` 开始。

**构造函数：**

- `NewListImportJobsOption(uri string, collectionName string)`

    这会创建一个带有合理默认值（`CurrentPage: 1, PageSize: 10`）的 ListImportJobsOption。
