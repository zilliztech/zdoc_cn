---
title: "Insert() | Go | v2"
slug: /go/go/v2-Vector-Insert
sidebar_label: "Insert()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将一个或多个实体插入到 collection 中。 | Go | v2"
type: docx
token: T6S4dcpZ7oeKD6xeTofc2mn9nrb
sidebar_position: 6
keywords: 
  - vector database 教程
  - vector database 如何工作
  - vector db 对比
  - openai vector db
  - zilliz
  - zilliz cloud
  - cloud
  - Insert()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# Insert()

此操作将一个或多个实体插入到 collection 中。

```go
func (c *Client) Insert(ctx context.Context, option InsertOption, callOptions ...grpc.CallOption) (InsertResult, error)
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewColumnBasedInsertOption(collName).
	WithInt64Column(colName, data).
	WithVarcharColumn(colName, data).
	WithFloatVectorColumn(colName, dim, data).
	WithBinaryVectorColumn(colName, dim, data).
	WithBoolColumn(colName, data).
	WithStructArrayColumn(colName, structSchema, rows).
	WithPartition(partitionName)

// Alternative (row-based):
// option := milvusclient.NewRowBasedInsertOption(collName, rows...)

result, err := client.Insert(ctx, option)
```

**参数：**

- **collName** (*string*)

目标 collection 的名称。

**选项方法：**

- `WithColumns(columns ...column.Column)`

    插入任意类型的列。

- `WithBoolColumn(colName string, data []bool)`

    插入一列布尔值。

- `WithInt8Column(colName string, data []int8)`

    插入一列 int8 值。

- `WithInt16Column(colName string, data []int16)`

    插入一列 int16 值。

- `WithInt32Column(colName string, data []int32)`

    插入一列 int32 值。

- `WithInt64Column(colName string, data []int64)`

    插入一列 int64 值。

- `WithVarcharColumn(colName string, data []string)`

    插入一列字符串值。

- `WithFloatVectorColumn(colName string, dim int, data [][]float32)`

    插入一列 float32 稠密向量。

- `WithFloat16VectorColumn(colName string, dim int, data [][]float32)`

    插入一列 float16 向量（由 float32 转换而来）。

- `WithBFloat16VectorColumn(colName string, dim int, data [][]float32)`

    插入一列 bfloat16 向量（由 float32 转换而来）。

- `WithBinaryVectorColumn(colName string, dim int, data [][]byte)`

    插入一列二进制向量。

- `WithInt8VectorColumn(colName string, dim int, data [][]int8)`

    插入一列 int8 向量。

- `WithPartition(partitionName string)`

    为插入操作指定目标分区。

- `WithStructArrayColumn(colName string, structSchema *entity.StructSchema, rows []map[string]any)`

    插入由逐行 map 构建的 struct-array 列。每个行 map 都以 struct 子字段名称作为键。标量子字段使用 []int32 或 []string 等切片，向量子字段使用 [][]float32、[][]byte 或 [][]int8 等嵌套切片。

**返回类型：**

*[InsertResult](./v2-Vector-InsertResult), error*

**返回：**

包含新插入实体 ID 的插入结果。如果操作失败，则返回错误。

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

resp, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
	WithInt64Column("id", []int64{1, 2, 3, 4, 5, 6, 7, 8, 9}).
	WithVarcharColumn("color", []string{"pink_8682", "red_7025", "orange_6781", "pink_9298", "red_4794", "yellow_4222", "red_9392", "grey_8510", "white_9381", "purple_4976"}).
	WithFloatVectorColumn("vector", 5, [][]float32{
		{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
		{0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
		{0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
		{0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345},
		{0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106},
		{0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955},
		{0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987},
		{-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052},
		{0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336},
		{0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608},
	}),
)
if err != nil {
	// handle err
}
fmt.Println(resp)
```
