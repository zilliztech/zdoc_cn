---
title: "DropDatabase() | Go | v2"
slug: /go/go/v2-Database-DropDatabase
sidebar_label: "DropDatabase()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会永久删除一个 database 及其所有 collection。 | Go | v2"
type: docx
token: FfZ6dqEk2o9Cn3xFAgTckLhsnS6
sidebar_position: 5
keywords: 
  - milvus
  - Zilliz
  - milvus vector database
  - milvus db
  - zilliz
  - zilliz cloud
  - cloud
  - DropDatabase()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# DropDatabase()

此操作会永久删除一个 database 及其所有 collection。

```go
func (c *Client) DropDatabase(ctx context.Context, option DropDatabaseOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewDropDatabaseOption(dbName)

err := client.DropDatabase(ctx, option)
```

**参数：**

- **dbName** (*string*)

    database 的名称。

**返回类型：**

*error*

**返回：**

成功时返回 nil；否则返回描述错误原因的 error。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "YOUR_CLUSTER_ENDPOINT",
})
if err != nil {
	// handle err
}
defer cli.Close(ctx)

err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption("test_db"))
if err != nil {
	// handle err
}
```
