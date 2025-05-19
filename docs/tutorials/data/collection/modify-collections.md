---
title: "修改 Collection | Cloud"
slug: /modify-collections
sidebar_label: "修改 Collection"
beta: FALSE
notebook: FALSE
description: "在 Collection 创建完成后，您还可以对 Collection 的名称及相关设置进行修改。本文主要介绍如何修改 Collection 及进行修改操作时的注意事项。 | Cloud"
type: origin
token: QB61wPMzoik03uk2r3ScJdaEnNf
sidebar_position: 5
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

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 修改 Collection

在 Collection 创建完成后，您还可以对 Collection 的名称及相关设置进行修改。本文主要介绍如何修改 Collection 及进行修改操作时的注意事项。

## 重命名 Collection{#rename-collection}

如果您需要重命名 Collection，可以参考如下代码进行操作：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

client.rename_collection(
    old_name="my_collection",
    new_name="my_new_collection"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.RenameCollectionReq;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_CLUSTER_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();
    
MilvusClientV2 client = new MilvusClientV2(connectConfig);

RenameCollectionReq renameCollectionReq = RenameCollectionReq.builder()
        .collectionName("my_collection")
        .newCollectionName("my_new_collection")
        .build();

client.renameCollection(renameCollectionReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "YOUR_CLUSTER_ENDPOINT";
const token = "YOUR_CLUSTER_TOKEN";
const client = new MilvusClient({address, token});

const res = await client.renameCollection({
    oldName: "my_collection",
    newName: "my_new_collection"
});
```

</TabItem>

<TabItem value='go'>

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
token := "YOUR_CLUSTER_TOKEN"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

err = client.RenameCollection(ctx, milvusclient.NewRenameCollectionOption("my_collection", "my_new_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/rename" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "newCollectionName": "my_new_collection"
}'
```

</TabItem>
</Tabs>

## 设置 Collection 属性{#set-collection-properties}

如下代码演示了如何设置 Collection 的生存时间（TTL）。您可以参考这些代码片断设置 Collection 的其它属性。具体支持的属性可以参考代码下方的表格。

如果您需要 Zilliz Cloud 在 Collection 创建完成后的一段时间内自动销毁该 Collection。可以考虑为 Collection 设置 TTL。这样当 Collection 的生存时间超过指定时间（单位为秒）后，Zilliz Cloud 就会开始异步删除 Collection 中的数据。在数据完全删除前，您仍旧可以搜索到部分数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client.alter_collection_properties(
    collection_name="my_collection",
    properties={"collection.ttl.seconds": 60}
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.AlterCollectionReq;
import java.util.HashMap;
import java.util.Map;

Map<String, String> properties = new HashMap<>();
properties.put("collection.ttl.seconds", "60");

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
        "collection.ttl.seconds": 60
    }
})
```

</TabItem>

<TabItem value='go'>

```go
err = client.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption("my_collection").WithProperty(common.CollectionTTLConfigKey, 60))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/alter_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "test_collection",
    "properties": {
        "collection.ttl.seconds": 60
    }
}'
```

</TabItem>
</Tabs>

<table>
   <tr>
     <th><p>属性</p></th>
     <th><p>适用场景</p></th>
   </tr>
   <tr>
     <td><p><code>collection.ttl.seconds</code></p></td>
     <td><p>如果您需要 Zilliz Cloud 在 Collection 创建完成后的一段时间内自动删除该 Collection 中的所有数据。可以考虑为 Collection 设置 TTL。这样当 Collection 的生存时间超过指定时间（单位为秒）后，Zilliz Cloud 就会开始删除 Collection 中的数据。 由于删除操作是异步的，在数据完全删除前，您仍旧可以搜索到部分数据。 更多内容，可以参考<a href="./set-collection-ttl">设置 Collection 生存时间</a>。</p></td>
   </tr>
   <tr>
     <td><p><code>mmap.enabled</code></p></td>
     <td><p>Memory mapping 支持通过内存来访问存放在磁盘上的数据和文件，从而使得 Zilliz Cloud 即可以将索引和原始数据存放在内存中，也可以将它们存放在磁盘上。您可以根据访问频率优化数据存放策略，在扩大 Collection 容量的同时保证搜索性能。</p><p>Zilliz Cloud 为您的集群提供了<a href="./use-mmap#global-mmap-strategy">全局 mmap 策略</a>。您可以为某个具体字段或该字段上的索引设置不同的 mmap 策略。</p><p>更多内容，可以参考<a href="./use-mmap">使用 mmap</a>。</p></td>
   </tr>
   <tr>
     <td><p><code>partitionkey.isolation</code></p></td>
     <td><p>在开启 Partition Key 之后，Zilliz Cloud 会根据 Partition Key 的取值对 Collection 内的 Entity 进行分组并为每个组创建单独的索引。在收到搜索请求后，Zilliz Cloud 会根据搜索请求中的过滤条件里指定的 Partition Key 值定位到相应的索引，并将搜索范围限定在该索引对应的 Entity 中，从而避免在搜索过程中扫描与当前搜索请求不相关的 Entity，提升搜索效率。 更多内容，可以参考<a href="./use-partition-key#use-partition-key-isolation">使用 Partition Key Isolation</a>。</p></td>
   </tr>
</table>

## 删除 Collection 属性{#drop-collection-properties}

你还可以参考如下代码示例删除 Collection 相关属性。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.drop_collection_properties(
    collection_name="my_collection",
    property_keys=[
        "collection.ttl.seconds"
    ]
)
```

</TabItem>

<TabItem value='java'>

```java
client.dropCollectionProperties(DropCollectionPropertiesReq.builder()
        .collectionName("my_collection")
        .propertyKeys(Collections.singletonList("collection.ttl.seconds"))
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
client.dropCollectionProperties({
    collection_name:"my_collection",
    properties: ['collection.ttl.seconds'],
});
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
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop_properties" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "propertyKeys": [
        "collection.ttl.seconds"
    ]
}'
```

</TabItem>
</Tabs>

