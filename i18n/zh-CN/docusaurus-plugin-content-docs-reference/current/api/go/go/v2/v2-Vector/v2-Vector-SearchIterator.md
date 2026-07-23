---
title: "SearchIterator() | Go | v2"
slug: /go/go/v2-Vector-SearchIterator
sidebar_label: "SearchIterator()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作创建一个迭代器，用于分页遍历大型搜索结果集。| Go | v2"
type: docx
token: K6obdWvXyoNLbMxNkggc9JyMnPd
sidebar_position: 13
keywords: 
  - Vector 检索
  - 音频相似性搜索
  - 弹性 vector 数据库
  - Pinecone 与 Milvus 对比
  - zilliz
  - Zilliz Cloud
  - cloud
  - SearchIterator()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# SearchIterator()

此操作创建一个迭代器，用于分页遍历大型搜索结果集。

```go
func (c *Client) SearchIterator(ctx context.Context, option SearchIteratorOption, callOptions ...grpc.CallOption) (SearchIterator, error)
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewSearchIteratorOption(collectionName, vector).
    WithBatchSize(batchSize).
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
    WithIteratorLimit(limit)

result, err := client.SearchIterator(ctx, option)
```

**参数：**

- **collectionName** (*string*)

    目标 collection 的名称。

- **[vector](./v2-Vector)** (*entity.Vector*)

    用于相似性搜索的查询 vector。

**选项方法：**

- `WithBatchSize(batchSize int)`

    设置每次迭代批次获取的实体数量。

- `WithPartitions(partitionNames ...string)`

    将操作限制在指定的 partition 中。

- `WithFilter(expr string)`

    应用布尔过滤表达式以缩小结果范围。

- `WithTemplateParam(key string, val any)`

    设置用于表达式求值的模板参数。

- `WithOffset(offset int)`

    设置返回匹配项之前要跳过的结果数量。

- `WithOutputFields(fieldNames ...string)`

    指定返回结果中要包含的字段。

- `WithConsistencyLevel(consistencyLevel [entity.ConsistencyLevel](./v2-Collection-ConsistencyLevel))`

    设置操作的一致性级别（Strong、Bounded、Session 或 Eventually）。

- `WithANNSField(annsField string)`

    指定要搜索的 vector 字段。

- `WithGroupByField(groupByField string)`

    按 scalar 字段值对搜索结果进行分组。

- `WithGroupSize(groupSize int)`

    设置每组返回的结果数量。

- `WithStrictGroupSize(strictGroupSize bool)`

    强制结果中每个组具有精确的组大小。

- `WithIgnoreGrowing(ignoreGrowing bool)`

    跳过在 growing segments 中搜索，以获得更快但可能不完整的结果。

- `WithAnnParam(ap [index.AnnParam](./v2-Vector-AnnParam))`

    设置近似最近邻搜索参数（例如 nprobe、ef）。

- `WithSearchParam(key, value string)`

    设置自定义搜索参数键值对。

- `WithIteratorLimit(limit int64)`

    WithIteratorLimit 设置要迭代的条目数量限制；如果 limit < 0，则将其设置为 Unlimited。

**返回类型：**

*[SearchIterator](./v2-Vector-SearchIterator), error*

**返回：**

用于分页遍历搜索结果的 SearchIterator。如果操作失败，则返回错误。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"
	"fmt"
	"io"

	"github.com/milvus-io/milvus/client/v2/entity"
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

defer cli.Close(ctx)

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

iter, err := cli.SearchIterator(ctx, milvusclient.NewSearchIteratorOption(
	"quick_setup",
	entity.FloatVector(queryVector),
).WithOutputFields("id", "color"))
if err != nil {
	// handle error
}

for {
	resultSet, err := iter.Next(ctx)
	if err == io.EOF {
		break
	}
	if err != nil {
		// handle error
	}
	for i := 0; i < resultSet.Len(); i++ {
		fmt.Println(resultSet.IDs, resultSet.Scores)
	}
}
```
