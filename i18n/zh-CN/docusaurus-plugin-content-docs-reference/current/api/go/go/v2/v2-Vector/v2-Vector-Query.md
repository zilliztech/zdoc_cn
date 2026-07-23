---
title: "Query() | Go | v2"
slug: /go/go/v2-Vector-Query
sidebar_label: "Query()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作检索匹配布尔过滤表达式的实体。 | Go | v2"
type: docx
token: P84bd17ncosvh4xuahpcFGzoneb
sidebar_position: 8
keywords: 
  - 开源 vector db
  - vector database 示例
  - rag vector database
  - 什么是 vector db
  - zilliz
  - zilliz cloud
  - 云
  - Query()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# Query()

此操作检索匹配布尔过滤表达式的实体。

```go
func (c *Client) Query(ctx context.Context, option QueryOption, callOptions ...grpc.CallOption) (ResultSet, error)
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithTemplateParam(key, val).
    WithOffset(offset).
    WithLimit(limit).
    WithOutputFields(fieldNames).
    WithConsistencyLevel(consistencyLevel).
    WithPartitions(partitionNames).
    WithIDs(ids)

result, err := client.Query(ctx, option)
```

**参数：**

- **collectionName** (*string*)

    目标 collection 的名称。

**选项方法：**

- `WithFilter(expr string)`

    应用布尔过滤表达式以缩小结果范围。

- `WithTemplateParam(key string, val any)`

    设置用于表达式求值的模板参数。

- `WithOffset(offset int)`

    设置返回匹配项之前要跳过的结果数量。

- `WithLimit(limit int)`

    设置要返回的最大结果数量。

- `WithOutputFields(fieldNames ...string)`

    指定返回结果中要包含的字段。

- `WithConsistencyLevel(consistencyLevel [entity.ConsistencyLevel](./v2-Collection-ConsistencyLevel))`

    设置操作的一致性级别（Strong、Bounded、Session 或 Eventually）。

- `WithPartitions(partitionNames ...string)`

    将操作限制到指定的 partition。

- `WithIDs(ids column.Column)`

    设置操作的 i ds。

**返回类型：**

*[ResultSet](./v2-Vector-ResultSet), error*

**返回：**

包含匹配实体及其分数和字段的搜索或查询结果。如果操作失败，则返回错误。

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

rs, err := cli.Query(ctx, milvusclient.NewQueryOption("quick_setup").
	WithFilter("emb_type == 3").
	WithOutputFields("id", "emb_type"))
if err != nil {
	// handle error
}

fmt.Println(rs.GetColumn("id"))
```
