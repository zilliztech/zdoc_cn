---
title: "RevokePrivilegeV2() | Go | v2"
slug: /go/go/v2-Authentication-RevokePrivilegeV2
sidebar_label: "RevokePrivilegeV2()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作使用 v2 API 从角色中撤销权限。| Go | v2"
type: docx
token: StUJd0OCho7PKcxWOU7cPNzhn0d
sidebar_position: 22
keywords: 
  - 音频相似性搜索
  - 弹性向量数据库
  - Pinecone 与 Milvus
  - Chroma 与 Milvus
  - zilliz
  - zilliz cloud
  - cloud
  - RevokePrivilegeV2()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# RevokePrivilegeV2()

此操作使用 v2 API 从角色中撤销权限。

```go
func (c *Client) RevokePrivilegeV2(ctx context.Context, option RevokePrivilegeV2Option, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewRevokePrivilegeV2Option(roleName, privilegeName, collectionName).
    WithDbName(dbName)

err := client.RevokePrivilegeV2(ctx, option)
```

**参数：**

- **roleName** (*string*)

    角色名称。

- **privilegeName** (*string*)

    权限名称。

- **collectionName** (*string*)

    目标集合的名称。

**选项方法：**

- `WithDbName(dbName string)`

    指定用于该操作的数据库。

**返回类型：**

*error*

**返回：**

成功时返回 nil，或返回描述出错原因的 error。

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

err = cli.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option("my_role", "Search", "quick_setup"))
if err != nil {
	// handle error
}
```
