---
title: "AddCollectionField() | Go | v2"
slug: /go/go/v2-Collection-AddCollectionField
sidebar_label: "AddCollectionField()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作向现有 collection schema 添加一个新字段。 | Go | v2"
type: docx
token: QupedlVukov8hsxbSyOcrcI9nAb
sidebar_position: 1
keywords: 
  - AI 聊天机器人
  - 余弦距离
  - 什么是 vector 数据库
  - vectordb
  - zilliz
  - Zilliz Cloud
  - 云
  - AddCollectionField()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# AddCollectionField()

此操作向现有 collection schema 添加一个新字段。

```go
func (c *Client) AddCollectionField(ctx context.Context, opt AddCollectionFieldOption, callOpts ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewAddCollectionFieldOption(collectionName, field)

err := client.AddCollectionField(ctx, option)
```

**参数：**

- **collectionName** (*string*)

    目标 collection 的名称。

- **[field](./v2-Collection-Field)** (**[entity.Field](./v2-Collection-Field)*)

    字段。

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
	"log"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "YOUR_CLUSTER_ENDPOINT",
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

// the field to add
// must be nullable for now
newField := entity.NewField().WithName("new_field").WithDataType(entity.FieldTypeInt64).WithNullable(true)

err = cli.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("customized_setup_2", newField))
if err != nil {
	// handle error
}
```
