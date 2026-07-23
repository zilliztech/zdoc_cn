---
title: "AlterCollectionProperties() | Go | v2"
slug: /go/go/v2-Collection-AlterCollectionProperties
sidebar_label: "AlterCollectionProperties()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于修改现有 collection 的属性。 | Go | v2"
type: docx
token: DumcdeKcuoSJybxv0V5ckFrFnyg
sidebar_position: 5
keywords: 
  - openai vector db
  - 自然语言处理数据库
  - 低成本 vector database
  - 托管 vector database
  - zilliz
  - Zilliz Cloud
  - cloud
  - AlterCollectionProperties()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# AlterCollectionProperties()

此操作用于修改现有 collection 的属性。

```go
func (c *Client) AlterCollectionProperties(ctx context.Context, option AlterCollectionPropertiesOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewAlterCollectionPropertiesOption(collection).
    WithProperty(key, value)

err := client.AlterCollectionProperties(ctx, option)
```

**参数：**

- **[collection](./v2-Collection)** (*string*)

    collection。

**选项方法：**

- `WithProperty(key string, value any)`

    在资源上设置自定义属性键值对。

**返回类型：**

*error*

**返回值：**

成功时返回 nil，或返回描述出错原因的 error。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
	"github.com/milvus-io/milvus/pkg/v2/common"
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

err = cli.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty(common.CollectionTTLConfigKey, 60))
if err != nil {
	// handle error
}
```
