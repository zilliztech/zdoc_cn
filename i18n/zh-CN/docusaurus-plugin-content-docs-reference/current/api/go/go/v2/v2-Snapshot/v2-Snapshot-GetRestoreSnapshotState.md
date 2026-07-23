---
title: "GetRestoreSnapshotState() | Go | v2"
slug: /go/go/v2-Snapshot-GetRestoreSnapshotState
sidebar_label: "GetRestoreSnapshotState()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于查询异步恢复快照作业的状态和进度。 | Go | v2"
type: docx
token: SxMgdp3ThoMYHaxkKtKc9EWvnZd
sidebar_position: 4
keywords: 
  - 什么是 vector db
  - 什么是 vector databases
  - vector databases 比较
  - Faiss
  - zilliz
  - zilliz cloud
  - cloud
  - GetRestoreSnapshotState()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# GetRestoreSnapshotState()

此操作用于查询异步恢复快照作业的状态和进度。

```go
func (c *Client) GetRestoreSnapshotState(ctx context.Context, opt GetRestoreSnapshotStateOption, callOptions ...grpc.CallOption) (*milvuspb.RestoreSnapshotInfo, error)
```

## 请求语法\{#request-syntax}

```go
option := client.NewGetRestoreSnapshotStateOption(jobID)

result, err := client.GetRestoreSnapshotState(option)
```

**参数：**

- **JobId** (*int64*) -

    `RestoreSnapshot()` 返回的作业 ID。

**返回类型：**

*milvuspb.RestoreSnapshotInfo, error*

**返回：**

一个 RestoreSnapshotInfo 对象，记录指定恢复快照作业的详细信息。

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

- **jobID** (*int64*)

    恢复作业 ID。

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

    如果作业失败，则为错误原因。

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

option := milvusclient.NewGetRestoreSnapshotStateOption(12345)

info, err := cli.GetRestoreSnapshotState(ctx, option)
if err != nil {
	// handle error
}

fmt.Println(info.GetState())
fmt.Println(info.GetProgress())
```
