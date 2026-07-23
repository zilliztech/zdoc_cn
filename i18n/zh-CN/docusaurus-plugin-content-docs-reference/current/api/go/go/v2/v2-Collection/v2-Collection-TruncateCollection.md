---
title: "TruncateCollection() | Go | v2"
slug: /go/go/v2-Collection-TruncateCollection
sidebar_label: "TruncateCollection()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会从 collection 中移除所有数据，但保留 collection schema 和结构 | Go | v2"
type: docx
token: V7bwdcBPGosCFWxjYQfctDDInmb
sidebar_position: 24
keywords: 
  - vector database 示例
  - rag vector database
  - 什么是 vector db
  - 什么是 vector database
  - zilliz
  - Zilliz Cloud
  - cloud
  - TruncateCollection()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# TruncateCollection()

此操作会从 collection 中移除所有数据，但保留 collection schema 和结构

```go
func (c *Client) TruncateCollection(ctx context.Context, option TruncateCollectionOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
err := client.TruncateCollection(
    ctx, 
    milvusclient.NewTruncateCollectionOption("collection_name")
)
```

**参数：**

- **collectionName** (*string*)

    目标 collection 的名称。

**返回类型：**

*error*

**返回：**

成功时返回 nil，失败时返回描述错误原因的 error。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
package main

import (
    "context"
    "log"
    
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

func main() {
    ctx := context.Background()
    
    client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: "YOUR_CLUSTER_ENDPOINT",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    // Truncate collection
    err = client.TruncateCollection(ctx, milvusclient.NewTruncateCollectionOption("my_collection"))
    if err != nil {
        log.Printf("Failed to truncate collection: %v", err)
        return
    }
    
    log.Println("Collection truncated successfully")
}
```
