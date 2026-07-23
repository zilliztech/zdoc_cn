---
title: "ListRefreshExternalCollectionJobs() | Go | v2"
slug: /go/go/v2-Collection-ListRefreshExternalCollectionJobs
sidebar_label: "ListRefreshExternalCollectionJobs()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有或指定 collection 的外部 collection 刷新作业。 | Go | v2"
type: docx
token: KTeqdqUI2o3YO1xg3EXcJqGcnbe
sidebar_position: 26
keywords: 
  - vector 数据库如何工作
  - vector db 比较
  - openai vector db
  - 自然语言处理数据库
  - zilliz
  - zilliz cloud
  - cloud
  - ListRefreshExternalCollectionJobs()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# ListRefreshExternalCollectionJobs()

此操作列出所有或指定 collection 的外部 collection 刷新作业。

```go
func (c *Client) ListRefreshExternalCollectionJobs(ctx context.Context, option ListRefreshExternalCollectionJobsOption, callOptions ...grpc.CallOption) ([]*entity.RefreshExternalCollectionJobInfo, error) {
```

## 请求语法\{#request-syntax}

```go
option := client.NewListRefreshExternalCollectionJobsOption(collectionName)

result, err := client.ListRefreshExternalCollectionJobs(option)
```

**参数：**

- **collectionName** (*string*) -

    目标 collection 的名称。如果未指定此参数，则返回所有外部 collection 的刷新作业。

**返回类型：**

*[]&ast;entity.RefreshExternalCollectionJobInfo*

**返回：**

*entity.RefreshExternalCollectionJobInfo* 结构体列表，每个结构体记录一个外部 collection 刷新作业的详细信息。

```go
type RefreshExternalCollectionJobInfo struct {
    JobID          int64
    CollectionName string
    State          RefreshExternalCollectionState
    Progress       int64
    Reason         string
    ExternalSource string
    StartTime      int64
    EndTime        int64
}
```

参数：

**参数：**

- **JobID** (*int64*) -

    当前请求中指定的作业 ID。

- **CollectionName** (*string*) -

    在 `RefreshExternalCollection()` 中指定的外部 collection 的名称。

- **State** (*string*) -

    指定作业的当前状态。可能的值包括：

    - RefreshPending

    - RefreshInProgress

    - RefreshFailed

    - RefreshCompleted

- **Progress** (*int64*) -

    指定作业的当前进度。该值是范围从 0 到 100 的整数。

- **Reason** (*string*) -

    如果刷新操作失败，则为错误提示。在正常情况下为空字符串。

- **ExternalSource** (*string*) -

    在 `RefreshExternalCollection()` 中指定的外部源 URI。

- **StartTime** (*int64*) -

    指定作业开始时的时间戳，单位为毫秒。

- **EndTime** (*int64*) -  

    指定作业结束时的时间戳，单位为毫秒。

## 示例\{#example}

```go
// List refresh jobs of a specified collection
option := client.NewListRefreshExternalCollectionJobsOption("test_collection")

// List refresh jobs of all external collections
option = client.NewListRefreshExternalCollectionJobsOption()

result, err = client.ListRefreshExternalCollectionJobs(option)
```
