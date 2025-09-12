---
title: "主键与 AutoID | Cloud"
slug: /primary-field-auto-id
sidebar_label: "主键与 AutoID"
beta: FALSE
notebook: FALSE
description: "主键唯一标识一个 Entity。本节将介绍如何添加两种类型的主键及如何开启自动分配主键值。 | Cloud"
type: origin
token: HpViwuoOai3L9Ok073tcihMGnIg
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 主键
  - autoid

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 主键与 AutoID

主键唯一标识一个 Entity。本节将介绍如何添加两种类型的主键及如何开启自动分配主键值。

## 概述{#overview}

在 Collection 中，每个 Entity 的主键全局唯一。当您在添加主键字段时，需要显式指定某个 **VARCHAR** 或 **INT64** 字段为主键字段。如果您选择使用 **INT64** 类型的主键，主键值应该类似 `12345` 这样的整数；如果您选择使用 **VARCHAR** 类型的主键，主键值应该类似于 `'my_entity_1234'` 这样的字符串。

您还可以通过开启 **AutoID** 的方式让 Zilliz Cloud 自动为插入的 Entity 分配主键值。当您选择让 Zilliz Cloud 自动为插入的 Entity 分配主键值时，待插入的 Entity 中无须包含主键值。

主键没有默认值，主键值也不能为 Null。

## 添加 INT64 类型的主键{#use-int64-primary-keys}

在添加 INT64 类型的主键时，需要设置 `datatype` 为 `DataType.INT64`，并同时设置 `is_primary` 为 `True`。如果您还需要让 Zilliz Cloud 为插入的 Entity 自动分配主键值，还可以将 `auto_id` 设置为 `True`。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name="my_id",
    datatype=DataType.INT64,
    # highlight-start
    is_primary=True,
    auto_id=True,
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq; 
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema schema = client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.Int64)
        // highlight-start
        .isPrimaryKey(true)
        .autoID(true)
        // highlight-end
        .build());
);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

const schema = [
  {
    name: "pk",
    description: "ID field",
    data_type: DataType.INT64,
    is_primary_key: true,
    max_length: 100,
  },
];
```

</TabItem>

<TabItem value='go'>

```go
import "github.com/milvus-io/milvus/client/v2/entity"

schema := entity.NewSchema()
schema.WithField(entity.NewField().WithName("my_id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true).
    WithIsAutoID(true),
)
```

</TabItem>

<TabItem value='bash'>

```bash
export primaryField='{
    "fieldName": "my_id",
    "dataType": "Int64",
    "isPrimary": true
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        &#36;primaryField
    ]
}"
```

</TabItem>
</Tabs>

## 添加 VARCHAR 类型的主键{#use-varchar-primary-keys}

在添加 VARCHAR 类型的主键时，除了将 `datatype` 的取值修改为 `DataType.VARCHAR` 之外，还需要增加设置该字段的最大宽度（max_length）。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
schema.add_field(
    field_name="my_id",
    datatype=DataType.VARCHAR,
    # highlight-start
    is_primary=True,
    auto_id=True,
    max_length=512,
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.VarChar)
        // highlight-start
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(512)
        // highlight-end
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
schema.push({
    name: "my_id",
    data_type: DataType.VarChar,
    // highlight-start
    is_primary_key: true,
    autoID: true,
    maxLength: 512
    // highlight-end
});
```

</TabItem>

<TabItem value='go'>

```go
schema := entity.NewSchema()
schema.WithField(entity.NewField().WithName("my_id").
    WithDataType(entity.FieldTypeVarChar).
    // highlight-start
    WithIsPrimaryKey(true).
    WithIsAutoID(true).
    WithMaxLength(512),
    // highlight-end
)
```

</TabItem>

<TabItem value='bash'>

```bash
export primaryField='{
    "fieldName": "my_id",
    "dataType": "VarChar",
    "isPrimary": true
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        &#36;primaryField
    ],
    \"params\": {
        \"max_length\": 512
    }
}"
```

</TabItem>
</Tabs>

