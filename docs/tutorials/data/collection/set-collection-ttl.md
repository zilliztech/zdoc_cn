---
title: "设置 Collection 生存时间 | Cloud"
slug: /set-collection-ttl
sidebar_label: "设置 Collection 生存时间"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "数据插入 Collection 后，默认情况下仍保留在该 Collection 中。但是，在某些情况下，您可能希望在一定期限后删除或清理数据。在这种情况下，您可以配置 Collection 的生存时间（TTL）属性，以便 Zilliz Cloud 在TTL到期后自动删除数据。 | Cloud"
type: origin
token: NYFIwLbc7iFeMbkP7T4cFfXJnLT
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理
  - 修改 collection
  - modify collection
  - rename collection
  - 重命名 collection
  - set collection properties
  - 设置 collection 属性
  - time-to-live
  - TTL

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 设置 Collection 生存时间

数据插入 Collection 后，默认情况下仍保留在该 Collection 中。但是，在某些情况下，您可能希望在一定期限后删除或清理数据。在这种情况下，您可以配置 Collection 的生存时间（TTL）属性，以便 Zilliz Cloud 在TTL到期后自动删除数据。

## 概述{#overview}

生存时间（TTL）通常用于如下场景：数据库中的数据在插入或修改后只能保持有效或可访问一段时间。然后，数据需要被自动删除。 

例如，如果您希望所有插入某个 Collection 的数据仅需要保留 14 天，您就可以通过为该 Collection 配置生存时间属性来要求 Zilliz Cloud 在数据插入 **14 x 24 x 3600 = 1209600** 秒后自动删除数据。这就保证了 Collection 中只保存最多 14 天的数据。

<Admonition type="info" icon="📘" title="说明">

<p>过期数据不会出现在搜索和查询结果中，并会在下一次数据压缩时删除。数据压缩间隔通常不会超过 24 小时。</p>

</Admonition>

在 Zilliz Cloud 中， TTL 的值是一个单位为秒的正整数。一旦设置了该参数，所有生存时间超过该参数值的数据都会被删除。

值得注意的是，数据删除操作是异步的。这就意味着当某些数据超期后并不会马上被删除。在数据被删除和数据不可查之间有一定的延迟。这是由垃圾回收（GC）机制和数据压缩耗时决定的。Zilliz Cloud 会不定期的触发这些操作。

## 设置 TTL{#set-ttl}

您可以在如下情况下设置 TTL

- [在创建 Collection 时](./set-collection-ttl#set-ttl-when-creating-a-collection)，或

- [需要修改指定 Collection 的 TTL 时](./set-collection-ttl#set-ttl-for-an-existing-collection)。

### 在创建 Collection 时设置 TTL{#set-ttl-when-creating-a-collection}

如下示例演示了如何在创建 Collection 时设置 TTL。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

# With TTL
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    # highlight-start
    properties={
        "collection.ttl.seconds": 1209600
    }
    # highlight-end
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.AlterCollectionReq;
import io.milvus.param.Constant;
import java.util.HashMap;
import java.util.Map;

// With TTL
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        // highlight-next-line
        .property(Constant.TTL_SECONDS, "1209600")
        .build();
client.createCollection(customizedSetupReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const createCollectionReq = {
    collection_name: "my_collection",
    schema: schema,
    // highlight-start
    properties: {
        "collection.ttl.seconds": 1209600
    }
    // highlight-end
}
```

</TabItem>

<TabItem value='go'>

```go
err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema).
    WithProperty(common.CollectionTTLConfigKey, 1209600)) //  TTL in seconds
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
export params='{
    "ttlSeconds": 1209600
}'

export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"params\": $params
}"
```

</TabItem>
</Tabs>

### 修改指定 Collection 的 TTL{#set-ttl-for-an-existing-collection}

如下示例演示了如何修改指定 Collection 的 TTL。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.alter_collection_properties(
    collection_name="my_collection",
    properties={"collection.ttl.seconds": 1209600}
)
```

</TabItem>

<TabItem value='java'>

```java
Map<String, String> properties = new HashMap<>();
properties.put("collection.ttl.seconds", "1209600");

AlterCollectionReq alterCollectionReq = AlterCollectionReq.builder()
        .collectionName("my_collection")
        .properties(properties)
        .build();

client.alterCollection(alterCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.alterCollection({
    collection_name: "my_collection",
    properties: {
        "collection.ttl.seconds": 1209600
    }
})
```

</TabItem>

<TabItem value='go'>

```go
err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").
    WithProperty(common.CollectionTTLConfigKey, 60))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"properties\": {
        \"collection.ttl.seconds\": 1209600
    }
}"
```

</TabItem>
</Tabs>

## 重置 TTL{#drop-ttl-setting}

如果您希望 Collection 中的数据能够永久保存，您可以通过重置 TTL 设置来实现这一点。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.drop_collection_properties(
    collection_name="my_collection",
    property_keys=["collection.ttl.seconds"]
)
```

</TabItem>

<TabItem value='java'>

```java
propertyKeys = new String[1]
propertyKeys[0] = "collection.ttl.second"

DropCollectionReq dropCollectionReq = DropCollectionReq.builder()
        .collectionName("my_collection")
        .propertyKeys(propertyKeys)
        .build();

client.dropCollection(dropCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
res = await client.dropCollectionProperties({
    collection_name: "my_collection",
    properties: ["collection.ttl.seconds"]
})
```

</TabItem>

<TabItem value='go'>

```go
err = client.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption("my_collection", common.CollectionTTLConfigKey))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \""my_collection"\",
    \"properties\": {
        \"collection.ttl.seconds\": 60
    }
}"
```

</TabItem>
</Tabs>