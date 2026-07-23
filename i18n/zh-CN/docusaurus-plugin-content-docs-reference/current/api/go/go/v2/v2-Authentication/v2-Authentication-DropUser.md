---
title: "DropUser() | Go | v2"
slug: /go/go/v2-Authentication-DropUser
sidebar_label: "DropUser()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会从系统中删除用户。 | Go | v2"
type: docx
token: QM8QdP63jofHxkxwxSEcXVXZnKX
sidebar_position: 10
keywords: 
  - milvus 基准测试
  - 托管式 milvus
  - Serverless vector database
  - milvus 开源
  - zilliz
  - zilliz cloud
  - cloud
  - DropUser()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# DropUser()

此操作会从系统中删除用户。

```go
func (c *Client) DropUser(ctx context.Context, opt DropUserOption, callOpts ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewDropUserOption(userName)

err := client.DropUser(ctx, option)
```

**参数：**

- **userName** (*string*)

    用户名称。

**返回类型：**

*error*

**返回：**

成功时返回 nil，或返回描述问题的错误。

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
	// handle error
}
defer cli.Close(ctx)

err = cli.DropUser(ctx, milvusclient.NewDropUserOption("my_user"))
if err != nil {
	// handle error
}
```
