---
title: "GetImportProgressOption | Go | v2"
slug: /go/go/v2-DataImport-GetImportProgressOption
sidebar_label: "GetImportProgressOption"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此类型用于配置通过 RESTful API 检索单个批量导入作业进度的请求。对于自托管 Milvus，可使用 `NewGetImportProgressOption()` 构造；对于 Zilliz Cloud，可使用 `NewCloudGetImportProgressOption()` 构造。链式调用 `WithAPIKey()` 以添加授权令牌。 | Go | v2"
type: docx
token: Whyodunisox4GwxOciucHVT7nNh
sidebar_position: 5
keywords: 
  - 知识库
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - zilliz
  - zilliz cloud
  - cloud
  - GetImportProgressOption
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# GetImportProgressOption

此类型用于配置通过 RESTful API 检索单个批量导入作业进度的请求。对于自托管 Milvus，可使用 `NewGetImportProgressOption()` 构造；对于 Zilliz Cloud，可使用 `NewCloudGetImportProgressOption()` 构造。链式调用 `WithAPIKey()` 以添加授权令牌。

```go
type GetImportProgressOption struct {
    URL       string
    JobID     string
    ClusterID string
    APIKey    string
}
```

**字段：**

- **URL** (*string*) -
Milvus 或 Zilliz Cloud 集群的基础 URL。不要包含路径；该函数会自动追加 `/v2/vectordb/jobs/import/describe`。

- **JobID** (*string*) -
要检查的导入作业的唯一标识符。传入 `BulkImport()` 返回的值。必填。

- **ClusterID** (*string*) -
Zilliz Cloud 集群 ID。可选；仅用于云端导入。

- **APIKey** (*string*) -
作为 `Bearer` 标头发送的授权令牌。可选；当服务器强制使用基于令牌的身份验证时必填。

**构建器方法：**

- `WithAPIKey(key string)`

    此方法设置作为 `Bearer` 标头发送的授权令牌。

**构造函数：**

- `NewGetImportProgressOption(uri string, jobID string)`
此方法为自托管 Milvus 集群创建 GetImportProgressOption。

- `NewCloudGetImportProgressOption(uri string, jobID string, apiKey string, clusterID string)`
此方法为 Zilliz Cloud 集群创建 GetImportProgressOption，并预填充 `APIKey` 和 `ClusterID`。

