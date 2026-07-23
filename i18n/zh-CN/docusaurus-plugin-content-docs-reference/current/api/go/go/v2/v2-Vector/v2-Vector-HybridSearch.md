---
title: "HybridSearch() | Go | v2"
slug: /go/go/v2-Vector-HybridSearch
sidebar_label: "HybridSearch()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作执行混合搜索，结合来自多个 ANN 请求的结果，每个请求都针对不同的向量字段或索引类型。使用重排序器合并并重新排序结果。 | Go | v2"
type: docx
token: VneHdph9ZoSf9wxQdKBc0046nBT
sidebar_position: 5
keywords: 
  - 音频搜索
  - 什么是语义搜索
  - Embedding 模型
  - 图像相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - HybridSearch()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# HybridSearch()

此操作执行混合搜索，结合来自多个 ANN 请求的结果，每个请求都针对不同的向量字段或索引类型。使用重排序器合并并重新排序结果。

```go
func (c *Client) HybridSearch(ctx context.Context, option HybridSearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewHybridSearchOption(collectionName, limit, annRequests).
    WithConsistencyLevel(cl).
    WithPartitions(partitions).
    WithOutputFields(outputFields).
    WithReranker(reranker).
    WithFunctionRerankers(functionReranker).
    WithOffset(offset)

resultSets, err := cli.HybridSearch(ctx, option)
```

**参数：**

- **option** (*HybridSearchOption*) -

    混合搜索选项。

**构建器方法：**

- `NewHybridSearchOption(collectionName string, limit int, annRequests ...*AnnRequest)`
这会创建一个包含一个或多个 ANN 请求的混合搜索选项。

- `NewAnnRequest(fieldName string, limit int, vector entity.Vector)`
这会为特定向量字段创建一个 ANN 请求。

- `WithIDs(ids column.Column)`
这会过滤 ANN 请求，使其仅搜索指定的主键 ID。

- `WithFilter(expr string)`
这会将布尔表达式过滤器应用于 ANN 请求。

- `WithOffset(offset int)`
这会设置 ANN 请求要跳过的结果数量。

- `WithGroupByField(groupByField string)`
这会按指定字段对 ANN 请求结果进行分组。

- `WithGroupSize(groupSize int)`
这会设置每个分组的结果数量。

- `WithStrictGroupSize(strictGroupSize bool)`
这会强制执行严格的分组大小限制。

- `WithIgnoreGrowing(ignoreGrowing bool)`
这会在 ANN 请求期间忽略 Growing Segment。

- `WithAnnParam(ap index.AnnParam)`
这会设置请求的 ANN 参数。

- `WithSearchParam(key, value string)`
这会为 ANN 请求设置自定义搜索参数。

- `WithFunctionReranker(fr *entity.Function)`
这会将函数重排序器应用于 ANN 请求。

- `WithConsistencyLevel(consistencyLevel entity.ConsistencyLevel)`
这会设置混合搜索的一致性级别。

- `WithPartitions(partitionNames ...string)`
这会将混合搜索限制在指定的分区中。

- `WithOutputFields(fieldNames ...string)`
这会指定在结果集中返回哪些字段。

- `WithReranker(reranker milvusclient.Reranker)`
这会设置重排序器，用于合并并重新排序来自多个 ANN 请求的结果。

- `WithFunctionRerankers(functionReranker ...*entity.Function)`
这会为混合搜索设置基于函数的重排序器。

- `WithOffset(offset int)`
这会设置返回匹配项之前要跳过的结果数量。

**返回类型：**

*[]ResultSet, error*

**返回：**

混合搜索结果，包含来自所有 ANN 请求的匹配实体及其分数和字段。如果操作失败，则返回错误。

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
sparseVector, _ := entity.NewSliceSparseEmbedding([]uint32{1, 21, 100}, []float32{0.1, 0.2, 0.3})

resultSets, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
	"quick_setup",
	3,
	milvusclient.NewAnnRequest("dense_vector", 10, entity.FloatVector(queryVector)),
	milvusclient.NewAnnRequest("sparse_vector", 10, sparseVector),
).WithReranker(milvusclient.NewRRFReranker()))
if err != nil {
	log.Fatal("failed to perform hybrid search: ", err.Error())
}

for _, resultSet := range resultSets {
	log.Println("IDs: ", resultSet.IDs)
	log.Println("Scores: ", resultSet.Scores)
}
```
