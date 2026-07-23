---
title: "DropSnapshot() | Go | v2"
slug: /go/go/v2-Snapshot-DropSnapshot
sidebar_label: "DropSnapshot()"
beta: false
added_since: v3.0.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会永久删除 snapshot。一旦删除，snapshot 数据将无法恢复。 | Go | v2"
type: docx
token: YP0vdMHw9oDlrcxjvg0cihgSnJb
sidebar_position: 3
keywords: 
  - DiskANN
  - Sparse vector
  - Vector 维度
  - ANN Search
  - zilliz
  - zilliz cloud
  - cloud
  - DropSnapshot()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# DropSnapshot()

此操作会永久删除 snapshot。一旦删除，snapshot 数据将无法恢复。

```go
func (c *Client) DropSnapshot(ctx context.Context, opt DropSnapshotOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := client.NewDropSnapshotOption(snapshotName, collectionName).
    WithDbName(dbName string)

err := client.DropSnapshot(option)
```

**参数：**

- **snapshotName** (*string*) - 

    要删除的 snapshot 的名称。

- **collectionName** (*string*) - 

    该 snapshot 所属的 collection 名称。

**构建器方法：**

- `WithDbName(dbName string)`

    设置指定 collection 所属数据库的名称。

**返回类型：**

*error*

**返回值：**

成功时返回 nil。如果 snapshot 不存在或操作失败，则返回错误。

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

option := milvusclient.NewDropSnapshotOption("backup_20260401", "my_collection")

err = cli.DropSnapshot(ctx, option)
if err != nil {
	// handle error
}

fmt.Println("Snapshot dropped successfully")
```
