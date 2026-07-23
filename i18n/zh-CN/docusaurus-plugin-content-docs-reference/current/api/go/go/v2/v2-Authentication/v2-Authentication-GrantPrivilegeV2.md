---
title: "GrantPrivilegeV2() | Go | v2"
slug: /go/go/v2-Authentication-GrantPrivilegeV2
sidebar_label: "GrantPrivilegeV2()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作使用参数简化的 v2 API 向角色授予权限。| Go | v2"
type: docx
token: ZO8adFZzAotVzfxEko2cKjHvnfb
sidebar_position: 12
keywords: 
  - Vector search
  - knn algorithm
  - HNSW
  - 什么是非结构化数据
  - zilliz
  - Zilliz Cloud
  - cloud
  - GrantPrivilegeV2()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# GrantPrivilegeV2()

此操作使用参数简化的 v2 API 向角色授予权限。

```go
func (c *Client) GrantPrivilegeV2(ctx context.Context, option GrantPrivilegeV2Option, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewGrantPrivilegeV2Option(roleName, privilegeName, collectionName).
    WithDbName(dbName)

err := client.GrantPrivilegeV2(ctx, option)
```

**参数：**

- **roleName** (*string*)

    角色名称。

- **privilegeName** (*string*)

    权限名称。

- **collectionName** (*string*)

    目标 collection 的名称。

**选项方法：**

- `WithDbName(dbName string)`

    指定该操作使用的数据库。

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
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

err = cli.GrantPrivilegeV2(ctx, milvusclient.NewGrantPrivilegeV2Option("my_role", "Search", "quick_setup"))
if err != nil {
	// handle error
}
```
