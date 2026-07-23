---
title: "DescribeCollection() | Go | v2"
slug: /go/go/v2-Collection-DescribeCollection
sidebar_label: "DescribeCollection()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作返回有关 collection 的详细信息，包括其 schema 和属性。 | Go | v2"
type: docx
token: SCP5dY88horVwExBCD2cuSChnZM
sidebar_position: 11
keywords: 
  - vector 相似度搜索
  - 近似最近邻搜索
  - DiskANN
  - Sparse vector
  - zilliz
  - Zilliz Cloud
  - 云
  - DescribeCollection()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# DescribeCollection()

此操作返回有关 collection 的详细信息，包括其 schema 和属性。

```go
func (c *Client) DescribeCollection(ctx context.Context, option DescribeCollectionOption, callOptions ...grpc.CallOption) (collection *entity.Collection, err error)
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewDescribeCollectionOption(name)

result, err := client.DescribeCollection(ctx, option)
```

**参数：**

- **name** (*string*)

    目标 collection 的名称。

**返回类型：**

*[collection* ](./v2-Collection)entity.Collection, err error*

**返回：**

collection 描述，包括 schema、fields 和属性。如果操作失败，则返回错误。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "YOUR_CLUSTER_ENDPOINT"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

collection, err := cli.DescribeCollection(ctx, milvusclient.NewDescribeCollectionOption("quick_setup"))
if err != nil {
	// handle error
}

fmt.Println(collection)
```
