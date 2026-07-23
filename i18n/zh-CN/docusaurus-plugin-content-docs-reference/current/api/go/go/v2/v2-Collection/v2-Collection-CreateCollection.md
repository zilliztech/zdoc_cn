---
title: "CreateCollection() | Go | v2"
slug: /go/go/v2-Collection-CreateCollection
sidebar_label: "CreateCollection()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作使用指定的 schema 和选项创建一个新的 collection。 | Go | v2"
type: docx
token: PP2kdYCHnoZQ96xJqWUcAW8enG9
sidebar_position: 9
keywords: 
  - 多模态 vector 数据库检索
  - 检索增强生成
  - 大语言模型
  - 向量化
  - zilliz
  - Zilliz Cloud
  - cloud
  - CreateCollection()
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# CreateCollection()

此操作使用指定的 schema 和选项创建一个新的 collection。

```go
func (c *Client) CreateCollection(ctx context.Context, option CreateCollectionOption, callOptions ...grpc.CallOption) error
```

## 请求语法\{#request-syntax}

```go
option := milvusclient.NewCreateCollectionOption(name, collectionSchema).
    WithAutoID(autoID).
    WithShardNum(shardNum).
    WithDynamicSchema(dynamicSchema).
    WithVarcharPK(varcharPK, maxLen).
    WithIndexOptions(indexOpts).
    WithProperty(key, value).
    WithConsistencyLevel(cl).
    WithMetricType(metricType).
    WithPKFieldName(name).
    WithVectorFieldName(name).
    WithNumPartitions(numPartitions)

// Alternative constructor(s):
// option := milvusclient.SimpleCreateCollectionOptions(name string, dim int64)

err := client.CreateCollection(ctx, option)
```

**参数：**

- **name** (*string*)

    目标 collection 的名称。

- **collectionSchema** (**[entity.Schema](./v2-Collection-Schema)*)

    定义 collection 字段及其数据类型的 schema。

**选项方法：**

- `WithAutoID(autoID bool)`

    设置是否为插入的实体自动生成 ID。

- `WithShardNum(shardNum int32)`

    设置用于在节点之间进行数据分布的 shard 数量。

- `WithDynamicSchema(dynamicSchema bool)`

    启用或禁用 dynamic schema 功能，以便灵活插入字段。

- `WithVarcharPK(varcharPK bool, maxLen int)`

    配置 collection 使用 varchar 作为主键类型，并指定最大长度。

- `WithIndexOptions(indexOpts ...[CreateIndexOption](./v2-Management-CreateIndex#request-syntax))`

    指定创建 collection 时要应用的 index 选项。

- `WithProperty(key string, value any)`

    在资源上设置自定义属性键值对。

- `WithConsistencyLevel(cl [entity.ConsistencyLevel](./v2-Collection-ConsistencyLevel))`

    设置操作的 consistency level（Strong、Bounded、Session 或 Eventually）。

- `WithMetricType(metricType [entity.MetricType](./v2-Management-MetricType))`

    设置用于 vector 相似性搜索的距离 metric type（例如 COSINE、L2、IP）。

- `WithPKFieldName(name string)`

    设置主键字段的名称。

- `WithVectorFieldName(name string)`

    设置 vector 字段的名称。

- `WithNumPartitions(numPartitions int64)`

    设置 collection 的 partition 数量。

## 校验\{#validation}

CreateCollection 会在发送请求之前校验提供的 schema。在 v2.6.5 中，会自动应用 struct-array 字段校验，并且无效的 struct 子字段定义会在请求发送前返回错误。

**返回类型：**

*error*

**返回：**

成功时返回 nil，或返回描述出错原因的错误。

**异常：**

- **error**

    检查 `err != nil` 以获取失败详情。

## 示例\{#example}

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

collectionName := `customized_setup_1`

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

indexOptions := []milvusclient.CreateIndexOption{
	milvusclient.NewCreateIndexOption(collectionName, "my_vector", index.NewAutoIndex(entity.COSINE)).WithIndexName("my_vector"),
	milvusclient.NewCreateIndexOption(collectionName, "my_id", index.NewSortedIndex()).WithIndexName("my_id"),
}

schema := entity.NewSchema().WithDynamicFieldEnabled(true).
	WithField(entity.NewField().WithName("my_id").WithIsAutoID(true).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
	WithField(entity.NewField().WithName("my_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(5)).
	WithField(entity.NewField().WithName("my_varchar").WithDataType(entity.FieldTypeVarChar).WithMaxLength(512))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
	WithIndexOptions(indexOptions...),
)
if err != nil {
	// handle error
}
```
