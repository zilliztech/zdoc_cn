---
title: "AlterAlias() | Go | v2"
slug: /go/go/v2-Collection-AlterAlias
sidebar_label: "AlterAlias()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会将现有别名重新分配给另一个 collection。 | Go | v2"
type: docx
token: GNQcdBgh2oMyS9xxJk0cvESGnfe
sidebar_position: 3
keywords: 
  - 低成本 vector database
  - 托管式 vector database
  - Pinecone vector database
  - 音频搜索
  - zilliz
  - zilliz cloud
  - cloud
  - AlterAlias()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# AlterAlias()

此操作会将现有别名重新分配给另一个 collection。

```go
func (c *Client) AlterAlias(ctx context.Context, option AlterAliasOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewAlterAliasOption(alias, collectionName)

err := client.AlterAlias(ctx, option)
```

**参数：**

- **[alias](./v2-Collection-Alias)** (*string*)

    要分配的别名。

- **collectionName** (*string*)

    目标 collection 的名称。

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
	// handle error
}

err = cli.AlterAlias(ctx, milvusclient.NewAlterAliasOption("alice", "customized_setup_1"))
if err != nil {
	// handle error
}

aliases, err := cli.ListAliases(ctx, milvusclient.NewListAliasesOption("customized_setup_1"))
if err != nil {
	// handle error
}
fmt.Println(aliases)

aliases, err = cli.ListAliases(ctx, milvusclient.NewListAliasesOption("customized_setup_2"))
if err != nil {
	// handle error
}
fmt.Println(aliases)
```
