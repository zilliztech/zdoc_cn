---
title: "RunAnalyzer() | Go | v2"
slug: /go/go/v2-Vector-RunAnalyzer
sidebar_label: "RunAnalyzer()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作在输入文本上运行文本分析器，并返回分词后的输出。 | Go | v2"
type: docx
token: CnuHdninQoBoJXxWe2pczq7snGd
sidebar_position: 11
keywords: 
  - milvus vector db
  - Zilliz Cloud
  - 什么是 milvus
  - milvus database
  - zilliz
  - zilliz cloud
  - cloud
  - RunAnalyzer()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# RunAnalyzer()

此操作在输入文本上运行文本分析器，并返回分词后的输出。

```go
func (c *Client) RunAnalyzer(ctx context.Context, option RunAnalyzerOption, callOptions ...grpc.CallOption) ([]*entity.AnalyzerResult, error)
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewRunAnalyzerOption(text).
    WithAnalyzerParamsStr(params).
    WithAnalyzerParams(params).
    WithDetail().
    WithHash().
    WithField(collectionName, fieldName).
    WithAnalyzerName(names)

result, err := client.RunAnalyzer(ctx, option)
```

**参数：**

- **text** (*...string*)

    文本。

**选项方法：**

- `WithAnalyzerParamsStr(params string)`

    为此操作设置 analyzer params str。

- `WithAnalyzerParams(params map[string]any)`

    为此操作设置 analyzer params。

- `WithDetail()`

    为此操作设置 detail。

- `WithHash()`

    为此操作设置 hash。

- `WithField(collectionName, fieldName string)`

    为此操作设置 field。

- `WithAnalyzerName(names ...string)`

    为此操作设置 analyzer name。

**返回类型：**

*[]*entity.AnalyzerResult, error*

**返回：**

分析器输出，显示输入文本如何被分词。如果操作失败，则返回错误。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "YOUR_CLUSTER_ENDPOINT"
collectionName := "test_run_analyzer"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}
defer cli.Close(ctx)

schema := entity.NewSchema().
	WithField(entity.NewField().WithName("pk").WithIsPrimaryKey(true).WithIsAutoID(true).WithDataType(entity.FieldTypeInt64)).
	WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(255).WithEnableAnalyzer(true).WithAnalyzerParams(map[string]any{"tokenizer": "standard"})).
	WithField(entity.NewField().WithName("sparse").WithDataType(entity.FieldTypeSparseVector)).
	WithFunction(entity.NewFunction().WithInputFields("text").WithOutputFields("sparse").WithType(entity.FunctionTypeBM25).WithName("bm25")).
	WithAutoID(true)

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema))
if err != nil {
	log.Fatal("failed to connect to create test collection: ", err.Error())
}

cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(collectionName, "sparse", index.NewAutoIndex(entity.BM25)).WithIndexName("bm25"))
cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))

// Run analyzer with loaded collection field (Must be bm25 function input)
result, err := cli.RunAnalyzer(ctx, milvusclient.NewRunAnalyzerOption("test milvus").WithField(collectionName, "text"))
if err != nil {
	log.Fatal("failed to run analyzer with loaded collection field: ", err)
}

println("Run analyzer result with loaded collection field")
for _, token := range result[0].Tokens {
	println(token.Text)
}

params := map[string]any{
	"tokenizer": "standard",
	"filter": []any{map[string]any{
		"type":       "stop",
		"stop_words": []string{"test"}, // remove word "test"
	}},
}
// Run analyzer with new analyzer params
result, err = cli.RunAnalyzer(ctx, milvusclient.NewRunAnalyzerOption("test milvus").WithAnalyzerParams(params))
if err != nil {
	log.Fatal("failed to run analyzer with new analyzer params: ", err)
}

println("Run analyzer with new analyzer params")
for _, token := range result[0].Tokens {
	println(token.Text)
}
```
