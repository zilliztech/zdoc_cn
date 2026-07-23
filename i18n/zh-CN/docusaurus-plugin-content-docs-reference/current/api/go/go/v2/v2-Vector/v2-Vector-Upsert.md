---
title: "Upsert() | Go | v2"
slug: /go/go/v2-Vector-Upsert
sidebar_label: "Upsert()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会根据主键值插入新实体或更新现有实体。| Go | v2"
type: docx
token: O1oidP1nEoZmlrxzGRRc30mjn5d
sidebar_position: 14
keywords: 
  - Milvus vector database
  - Milvus db
  - Milvus vector db
  - Zilliz Cloud
  - zilliz
  - Zilliz Cloud
  - 云
  - Upsert()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# Upsert()

此操作会根据主键值插入新实体或更新现有实体。

```go
func (c *Client) Upsert(ctx context.Context, option UpsertOption, callOptions ...grpc.CallOption) (UpsertResult, error)
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
	WithPartition(partitionName).
	WithPartialUpdate(partialUpdate).
	WithArrayAppend(arrayFieldName)

// Alternative (row-based):
// option := milvusclient.NewRowBasedInsertOption(collName, rows...)

result, err := client.Upsert(ctx, option)
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

    插入一列 float32 稠密 vector。

- `WithFloat16VectorColumn(colName string, dim int, data [][]float32)`

    插入一列 float16 vector（由 float32 转换而来）。

- `WithBFloat16VectorColumn(colName string, dim int, data [][]float32)`

    插入一列 bfloat16 vector（由 float32 转换而来）。

- `WithBinaryVectorColumn(colName string, dim int, data [][]byte)`

    插入一列 binary vector。

- `WithInt8VectorColumn(colName string, dim int, data [][]int8)`

    插入一列 int8 vector。

- `WithPartition(partitionName string)`

    指定 upsert 操作的目标 partition。

- `WithPartialUpdate(partialUpdate bool)`

    启用部分更新模式，因此只更新提供的字段（payload 中未包含的现有字段会被保留）。

- `WithStructArrayColumn(colName string, structSchema *entity.StructSchema, rows []map[string]any)`

    Upsert 一个由逐行 map 构建的 struct-array 列。每个行 map 以 struct 子字段名称作为键。Scalar 子字段使用诸如 []int32 或 []string 的切片，vector 子字段使用诸如 [][]float32、[][]byte 或 [][]int8 的嵌套切片。

- `WithArrayAppend(fieldName string)`

    在 Upsert 期间将 ARRAY_APPEND 语义应用于指定的数组字段。非 REPLACE 字段操作会自动启用部分更新模式。

- `WithArrayRemove(fieldName string)`

    在 Upsert 期间将 ARRAY_REMOVE 语义应用于指定的数组字段。非 REPLACE 字段操作会自动启用部分更新模式。

- `WithFieldPartialOp(fieldName string, op schemapb.FieldPartialUpdateOp_OpType)`

    附加显式的字段级部分更新操作。对于常见的数组追加和移除行为，请使用特定操作的辅助方法。传入 REPLACE 会清除该字段先前的任何指令。

**返回类型：**

*[UpsertResult](./v2-Vector-UpsertResult), error*

**返回：**

包含受影响实体 ID 的 upsert 结果。如果操作失败，则返回错误。

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

resp, err := cli.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
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
