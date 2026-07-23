---
title: "CreateDatabase() | Go | v2"
slug: /go/go/v2-Database-CreateDatabase
sidebar_label: "CreateDatabase()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会创建一个新的数据库。 | Go | v2"
type: docx
token: BMlVd8UFLor42pxDtr3cnobPnxe
sidebar_position: 2
keywords: 
  - ANN Search
  - 什么是 vector embeddings
  - vector database 教程
  - vector database 如何工作
  - zilliz
  - zilliz cloud
  - cloud
  - CreateDatabase()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# CreateDatabase()

此操作会创建一个新的数据库。

```go
func (c *Client) CreateDatabase(ctx context.Context, option CreateDatabaseOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewCreateDatabaseOption(dbName).
    WithProperty(key, val)

err := client.CreateDatabase(ctx, option)
```

**参数：**

- **dbName** (*string*)

    数据库的名称。

**选项方法：**

- `WithProperty(key string, val any)`

    在资源上设置自定义属性键值对。

**返回类型：**

*error*

**返回：**

成功时返回 nil，或返回描述出错原因的错误。

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

dbName := `test_db`
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption(dbName))
if err != nil {
	// handle err
}
```
