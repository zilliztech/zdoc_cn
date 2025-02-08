---
title: "使用 Partition Key | Cloud"
slug: /use-partition-key
sidebar_label: "使用 Partition Key"
beta: FALSE
notebook: FALSE
description: "Partition Key 是一种基于 Partition 的搜索优化方案。通过指定某个标量字段为 Partition Key 并在搜索时指定基于 Partition Key 的过滤条件表达式将搜索范围缩小到若干 Partition 中，从而提高搜索效率。本文将介绍如何使用 Partition key 及相关注意事项。 | Cloud"
type: origin
token: QT2Vw3FvJiuwzBkeZvicRBlsnae
sidebar_position: 13
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - partition key
  - 自动分配 entity
  - num partitions
  - 设置 partition 数量

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用 Partition Key

Partition Key 是一种基于 Partition 的搜索优化方案。通过指定某个标量字段为 Partition Key 并在搜索时指定基于 Partition Key 的过滤条件表达式将搜索范围缩小到若干 Partition 中，从而提高搜索效率。本文将介绍如何使用 Partition key 及相关注意事项。

## 概述{#overview}

在 Zilliz Cloud 中，您可以使用 Partition 来实现数据分组，并将搜索范围限制在若干 Partition 中来提升搜索效率。但是一个 Collection 中最多只能创建 1,024 个 Partition，使用 Partition 无法满足分组数量大于 1,024 的使用场景。

为了突破 Partition 的数量限制，Zilliz Cloud 推出了 Partition Key。在创建 Collection 时，您可以指定某个标量字段为 Partition Key。在 Collection 完成创建时，Zilliz Cloud 会在 Collection 中自动创建指定数量的 Partition。每个 Partition 对应 Parition Key 字段的某段取值范围。在插入 Entity 时，Zilliz Cloud 会根据该 Entity 在 Partition Key 字段上的取值将 Entity 存入对应的 Partition 中。

![QLq4wuGJrh216ybz3TrcawfBnyc](/img/QLq4wuGJrh216ybz3TrcawfBnyc.png)

下图描述了在 Collection 未使用 Partition Key 和使用了 Partition Key 两种情况下，Zilliz Cloud 处理 Search 请求的过程。在未使用 Partition Key 时，Zilliz Cloud 会遍历全表查找与查询向量相似的结果。在使用了 Partition Key 后，Zilliz Cloud 仅遍历与请求中携带的基于 Partition Key 的过滤条件表达式相匹配的若干 Partition，搜索范围显而易见的缩小了。

![GtTYwzWJDhvt3IbjTTUcZduVnCg](/img/GtTYwzWJDhvt3IbjTTUcZduVnCg.png)

## 使用 Partition Key{#use-partition-key}

如果您需要使用 Partition Key，需要完成如下设置：

- [指定 Partition Key](./use-partition-key#set-partition-key)。

- [设置 Partition 数量](./use-partition-key#set-partition-nums)。（可选）

- [创建基于 Partition Key 的过滤条件表达式](./use-partition-key#create-filtering-condition)。

### 指定 Partition Key{#set-partition-key}

您需要在 Collection Schema 中添加待充当 Partition Key 的字段时，将其指定为 Partition Key。具体操作可以参考如下代码。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import (
    MilvusClient, DataType
)

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

schema = client.create_schema()

# Add the partition key
schema.add_field(
    field_name="my_varchar", 
    datatype=DataType.VARCHAR, 
    max_length=512,
    # highlight-next-line
    is_partition_key=True,
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build());

// Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// Add the partition key
schema.addField(AddFieldReq.builder()
        .fieldName("my_varchar")
        .dataType(DataType.VarChar)
        .maxLength(512)
        // highlight-next-line
        .isPartitionKey(true)
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

// 3. Create a collection in customized setup mode
// 3.1 Define fields
const fields = [
    {
        name: "my_varchar",
        data_type: DataType.VarChar,
        max_length: 512,
        // highlight-next-line
        is_partition_key: true
    }
]
```

</TabItem>

<TabItem value='bash'>

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "my_id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            },
            {
                "fieldName": "my_varchar",
                "dataType": "VarChar",
                "isPartitionKey": true,
                "elementTypeParams": {
                    "max_length": 512
                }
            }
        ]
    }'
```

</TabItem>
</Tabs>

### 设置 Partition 数量{#set-partition-nums}

当您指定某个标量字段为 Partition Key 后，Zilliz Cloud 会在 Collection 中默认创建 16 个 Partition。您也可以根据该标量字段的取值范围决定创建 Partition 的数量，最多不超过 1,024 个。

需要注意的是，在插入 Entity 时，Zilliz Cloud 会计算该 Entity 在 Partition Key 上的取值所对应的 Hash 值，并根据该 Hash 值决定将该 Entity 存入哪个 Partition 中。如果 Partition Key 可能的所有取值的数量大于 Partition 的数量，部分或所有 Partition 中可能会存在多种在 Partition Key 上取值不同的 Entity。 

如果您需要，也可以参考如下代码在创建 Collection 时设置 Partition 的数量。注意，此设置仅在您参与上一步中的示例指定了 Partition Key 时有效。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-next-line
    num_partitions=1024
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
                .collectionName("my_collection")
                .collectionSchema(schema)
                .numPartitions(1024)
                .build();
        client.createCollection(createCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.create_collection({
    collection_name: "my_collection",
    schema: schema,
    num_partitions: 1024
})
```

</TabItem>

<TabItem value='bash'>

```bash
export params='{
    "partitionsNum": 1024
}'

export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"myCollection\",
    \"schema\": $schema,
    \"params\": $params
}"
```

</TabItem>
</Tabs>

### 创建基于 Partition Key 的过滤条件表达式{#create-filtering-condition}

在使用 Partition Key 进行搜索时， Search 请求中需要携带一个基于 Partition Key 的过滤条件表达式。在过滤条件表达式中，您既可以把搜索范围限定在某一个 Partition Key 值对应的 Partition 内，也可以将其限定在多个 Partition Key 值对应的 Partition 内。

执行删除操作时，建议包含指定单个 Partition Key 的过滤条件表达式，以实现更高效的删除。这种方法将删除操作限制在特定分区，减少压缩期间的写放大，并为压缩和索引节省资源。

如下代码演示了 Search 请求中需要携带的两种过滤条件表达式：一种是基于一个 Partition Key 值进行过滤，另一个是基于多个 Partition Key 值进行过滤。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Filter based on a single partition key value, or
filter='partition_key == "x" && <other conditions>'

# Filter based on multiple partition key values
filter='partition_key in ["x", "y", "z"] && <other conditions>'
```

</TabItem>

<TabItem value='java'>

```java
// Filter based on a single partition key value, or
String filter = "partition_key == 'x' && <other conditions>";

// Filter based on multiple partition key values
String filter = "partition_key in ['x', 'y', 'z'] && <other conditions>";
```

</TabItem>

<TabItem value='javascript'>

```javascript
// Filter based on a single partition key value, or
const filter = 'partition_key == "x" && <other conditions>'

// Filter based on multiple partition key values
const filter = 'partition_key in ["x", "y", "z"] && <other conditions>'
```

</TabItem>

<TabItem value='bash'>

```bash
# Filter based on a single partition key value, or
export filter='partition_key == "x" && <other conditions>'

# Filter based on multiple partition key values
export filter='partition_key in ["x", "y", "z"] && <other conditions>'
```

</TabItem>
</Tabs>

## 使用 Partition Key Isolation{#use-partition-key-isolation}

在诸如多租户的场景下，建议您将用于标识租户身份的字段设置为 Parition Key。这时，过滤条件表达式中一般只会基于某一个租户身份进行过滤。为了进一步缩小搜索范围，Zilliz Cloud 对 Partition Key 功能做了进一步增强，推出了 Partition Key Isolation 功能。

![OwQbwAjhlhyvZ5bwxi1cleurn6b](/img/OwQbwAjhlhyvZ5bwxi1cleurn6b.png)

如上图所示，当您在创建或修改 Collection 时打开了 Partition Key Isolation 功能后，Zilliz Cloud 会根据 Entity 中 Partition Key 的值为 Entity 分组，并为指定的向量字段在每组 Entity 中创建一个独立的索引。在收到 Search 请求后，Zilliz Cloud 会根据过滤条件表达式中指定的 Partition Key 值找到对应的索引文件，并在该索引文件覆盖的所有 Entity 中进行相似最近邻搜索（ANN Search）。这样一来，Zilliz Cloud 就真正避免了在执行 Search 请求时扫描无关记录，进一步缩小了搜索范围，提升了搜索效率。

值得注意的是，在开启了 Partition Key Isolation 后，您仅能基于一个确定的 Partition Key 值创建过滤表达式，从而让 Zilliz Cloud 将搜索范围控制在该值对应的索引文件所覆盖的所有 Entity 内。

### 开启 Partition Key Isolation{#enable-partition-key-isolation}

如果您需要使用  Partition Key Isolation 功能，可以参考如下代码在创建 Collection 时手动开启该功能。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-next-line
    properties={"partitionkey.isolation": True}
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

Map<String, String> properties = new HashMap<>();
properties.put("partitionkey.isolation", "true");

CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .numPartitions(1024)
        .properties(properties)
        .build();
client.createCollection(createCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.alterCollection({
    collection_name: "my_collection",
    properties: {
        "partitionkey.isolation": true
    }
})
```

</TabItem>

<TabItem value='bash'>

```bash
export params='{
    "partitionKeyIsolation": true
}'

export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"myCollection\",
    \"schema\": $schema,
    \"params\": $params
}"
```

</TabItem>
</Tabs>

在开启 Partition Key Isolation 后，您仍旧可以参考使用 Partition Key 一节中的描述指定 Partition Key 和设置 Partition 数量。但在创建基于 Partition Key 的过滤条件表达式时，您仅能基于一个确定的 Partition Key 值创建过滤表达式，从而让 Zilliz Cloud 将搜索范围控制在该值对应的索引文件所覆盖的所有 Entity 内。

