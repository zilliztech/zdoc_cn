---
title: "Search() | Go | v2"
slug: /go/go/v2-Vector-Search
sidebar_label: "Search()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作在指定 collection 上执行近似最近邻 (ANN) 搜索。你可以使用 `NewSearchOption` 进行基于 vector 的搜索，或使用 `NewSearchByIDsOption` 按主键 ID 搜索。 | Go | v2"
type: docx
token: YKm9dpXcVoy277xHVT2cIymfnRj
sidebar_position: 12
keywords: 
  - Vector index
  - 开源 vector database
  - 开源 vector db
  - vector database 示例
  - zilliz
  - Zilliz Cloud
  - cloud
  - Search()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# Search()

此操作在指定 collection 上执行近似最近邻 (ANN) 搜索。你可以使用 `NewSearchOption` 进行基于 vector 的搜索，或使用 `NewSearchByIDsOption` 按主键 ID 搜索。

```go
func (c *Client) Search(ctx context.Context, option SearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
```

## 请求语法\{#request-syntax}

**Vector 搜索：**

```go
option := milvusclient.NewSearchOption(collectionName, limit, vectors).
    WithPartitions(partitionNames).
    WithFilter(expr).
    WithTemplateParam(key, val).
    WithOffset(offset).
    WithOutputFields(fieldNames).
    WithConsistencyLevel(consistencyLevel).
    WithANNSField(annsField).
    WithGroupByField(groupByField).
    WithGroupSize(groupSize).
    WithStrictGroupSize(strictGroupSize).
    WithIgnoreGrowing(ignoreGrowing).
    WithAnnParam(ap).
    WithSearchParam(key, value).
    WithFunctionReranker(fr)

resultSets, err := cli.Search(ctx, option)
```

**按主键 ID 搜索：**

```go
option := milvusclient.NewSearchByIDsOption(collectionName, limit, ids).
    WithPartitions(partitionNames).
    WithFilter(expr).
    WithOutputFields(fieldNames)

resultSets, err := cli.Search(ctx, option)
```

**参数：**

- **option** (*SearchOption*) -

    搜索选项。使用 `NewSearchOption` 进行 vector 搜索，或使用 `NewSearchByIDsOption` 进行基于 PK 的搜索。

**构建器方法：**

- `NewSearchOption(collectionName string, limit int, vectors []entity.Vector)`
这会创建一个用于基于 vector 的 ANN 搜索的搜索选项。

- `NewSearchByIDsOption(collectionName string, limit int, ids column.Column)`
这会创建一个搜索选项，用于按主键 ID 查找实体。

- `WithPartitions(partitionNames ...string)`
这会将搜索限制在指定的 partition 名称中。

- `WithFilter(expr string)`
这会将布尔表达式过滤器应用于搜索结果。

- `WithTemplateParam(key string, val any)`
这会设置用于表达式求值的模板参数。

- `WithOffset(offset int)`
这会设置在返回匹配项之前要跳过的结果数量。

- `WithOutputFields(fieldNames ...string)`
这会指定在结果集中返回哪些字段。

- `WithConsistencyLevel(consistencyLevel entity.ConsistencyLevel)`
这会设置搜索的一致性级别。

- `WithANNSField(annsField string)`
当 collection 有多个 vector 字段时，这会指定要搜索的 vector 字段。

- `WithGroupByField(groupByField string)`
这会按指定字段对搜索结果进行分组。

- `WithGroupSize(groupSize int)`
启用分组时，这会设置每个组返回的结果数量。

- `WithStrictGroupSize(strictGroupSize bool)`
这会强制执行严格的组大小限制。

- `WithIgnoreGrowing(ignoreGrowing bool)`
这会在搜索期间忽略 growing segments。

- `WithAnnParam(ap index.AnnParam)`
这会设置近似最近邻搜索参数（例如 nprobe、ef）。

- `WithSearchParam(key, value string)`
这会设置自定义搜索参数键值对。

- `WithFunctionReranker(fr *entity.Function)`
这会将基于函数的 reranker 应用于搜索结果。

**返回类型：**

*[]ResultSet, error*

**返回：**

包含匹配实体及其分数和字段的搜索或查询结果。如果操作失败，则返回错误。

**异常：**

- **error**

    检查 err != nil 以获取失败详情。

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

milvusAddr := "YOUR_CLUSTER_ENDPOINT"
token := "YOUR_CLUSTER_TOKEN"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
	APIKey:  token,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
	"quick_setup", // collectionName
	3,             // limit
	[]entity.Vector{entity.FloatVector(queryVector)},
))
if err != nil {
	log.Fatal("failed to perform basic ANN search collection: ", err.Error())
}

for _, resultSet := range resultSets {
	log.Println("IDs: ", resultSet.IDs)
	log.Println("Scores: ", resultSet.Scores)
}
```
