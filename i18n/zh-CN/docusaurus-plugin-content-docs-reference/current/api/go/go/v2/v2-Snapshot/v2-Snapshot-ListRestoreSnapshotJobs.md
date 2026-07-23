---
title: "ListRestoreSnapshotJobs() | Go | v2"
slug: /go/go/v2-Snapshot-ListRestoreSnapshotJobs
sidebar_label: "ListRestoreSnapshotJobs()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出所有恢复快照任务。可选择按 collection 名称或数据库名称进行筛选。 | Go | v2"
type: docx
token: QrOmdt65AooKEkxVmNuc7qunnmf
sidebar_position: 5
keywords: 
  - Zilliz
  - Milvus vector database
  - Milvus db
  - Milvus vector db
  - Zilliz
  - Zilliz Cloud
  - cloud
  - ListRestoreSnapshotJobs()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# ListRestoreSnapshotJobs()

此操作列出所有恢复快照任务。可选择按 collection 名称或数据库名称进行筛选。

```go
func (c *Client) ListRestoreSnapshotJobs(ctx context.Context, opt ListRestoreSnapshotJobsOption, callOptions ...grpc.CallOption) ([]*milvuspb.RestoreSnapshotInfo, error)
```

## 请求语法\{#request-syntax}

```go
option := client.NewListRestoreSnapshotJobsOption().
    WithCollectionName(collectionName string).
    WithDbName(dbName string)

result, err := client.ListRestoreSnapshotJobs(option)
```

**构建器方法：**

- `WithCollectionName(collectionName string)`

    此方法按目标 collection 名称筛选恢复任务。如果未设置，则列出所有恢复任务。

- `WithDbName(dbName string)`

    此方法指定数据库名称。如果未设置，则使用默认数据库。

**返回类型：**

*[]&ast;milvuspb.RestoreSnapshotInfo*, *error*

**返回：**

RestoreSnapshotInfo 对象列表，每个对象记录一个恢复快照任务的详细信息。

```go
type RestoreSnapshotInfo struct {
    JobId          int64
    SnapshotName   string
    DbName         string
    CollectionName string
    State          RestoreSnapshotState
    Progress       int64
    Reason         string
    StartTime      int64
    TimeCost       int64
}
```

**参数：**

- **JobId** (*int64*) -

    恢复任务 ID。

- **SnapshotName** (*string*) -

    正在恢复的快照名称。

- **DbName** (*string*) -

    目标数据库名称。

- **CollectionName** (*string*) -

    目标 collection 名称。

- **State** (*RestoreSnapshotState*) -

    当前状态。可能的值：*RestoreSnapshotNone*、*RestoreSnapshotPending*、*RestoreSnapshotExecuting*、*RestoreSnapshotCompleted*、*RestoreSnapshotFailed*。

- **Progress** (*int64*) -

    进度百分比 (0-100)。

- **Reason** (*string*) -

    如果任务失败，则为错误原因。

- **StartTime** (*int64*) -

    开始时间戳，单位为毫秒。

- **TimeCost** (*int64*) -

    耗时，单位为毫秒。

**异常：**

- **error**

    检查 err != nil 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "YOUR_CLUSTER_ENDPOINT"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal(err)
}

defer cli.Close(ctx)

option := milvusclient.NewListRestoreSnapshotJobsOption()

jobs, err := cli.ListRestoreSnapshotJobs(ctx, option)
if err != nil {
	// handle error
}

for _, job := range jobs {
	fmt.Printf("Job %d: %s -> %s (%s)\n", job.GetJobId(), job.GetSnapshotName(), job.GetCollectionName(), job.GetState())
}
```
