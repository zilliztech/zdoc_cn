---
title: "CreateUser() | Go | v2"
slug: /go/go/v2-Authentication-CreateUser
sidebar_label: "CreateUser()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作使用用户名和密码创建新用户。 | Go | v2"
type: docx
token: Liv8dqreJo6t26xf3UWcC8ePnpe
sidebar_position: 5
keywords: 
  - 神经网络
  - 深度学习
  - 知识库
  - 自然语言处理
  - zilliz
  - zilliz cloud
  - cloud
  - CreateUser()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# CreateUser()

此操作使用用户名和密码创建新用户。

```go
func (c *Client) CreateUser(ctx context.Context, opt CreateUserOption, callOpts ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewCreateUserOption(userName, password)

err := client.CreateUser(ctx, option)
```

**参数：**

- **userName** (*string*)

    用户的名称。

- **password** (*string*)

    用户的密码。

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "YOUR_CLUSTER_ENDPOINT",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.CreateUser(ctx, milvusclient.NewCreateUserOption("my_user", "P@ssw0rd"))
if err != nil {
	// handle error
}
```
