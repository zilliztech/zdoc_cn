---
title: "管理 Partition | Cloud"
slug: /manage-partitions
sidebar_label: "管理 Partition"
beta: FALSE
notebook: FALSE
description: "本教程将介绍如何在 Collection 中创建和管理 Partition。 | Cloud"
type: origin
token: Sk3Zw36yEiL2oUkiA5xcin7InSd
sidebar_position: 13
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - partition

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 管理 Partition

本教程将介绍如何在 Collection 中创建和管理 Partition。

## 概述{#overview}

Partition 是从 Collection 中划分而来。支持将物理存储划分成若干部分，每一部分被称为一个 Partition。您可以使用 Partition 缩小查询范围，通过仅查询一小部分数据而非 Collection 中的所有数据来提升查询性能。

Collection 创建时会自动创建一个名称为 **_default** 的 Partition。1 个 Collection 中最多可创建 4096 个 Partition。

如需深入了解集群、Collection、索引、Parition、Entity 这些概念之间的关系，请参考 [集群、Collection 及 Entity](./cluster-collection-and-entities)。

<Admonition type="info" icon="📘" title="说明">

<p>还提供 <strong>Partition key</strong> 的功能。 开启 Partition key 功能后，具有相同键值的 Entity 就会被放到相同的 Partition 中。该特性通常用于多租场景，可有效提升搜索性能。更多详情，请参考<a href="./use-partition-key">使用 Partition Key</a>。</p>
<p>如果您的 Collection 开启了 <strong>Partition key</strong> 功能，会自动为您管理 Partition。</p>

</Admonition>

## 准备工作{#preparations}

以下代码基于已有代码重新连接至 Zilliz Cloud 集群并快速创建了 Collection 和索引。因此 Collection 创建完成后会被自动加载。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT";
String TOKEN = "YOUR_CLUSTER_TOKEN";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .token(TOKEN)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
    .collectionName("quick_setup")
    .dimension(5)
    .build();

client.createCollection(quickSetupReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
const address = "YOUR_CLUSTER_ENDPOINT"
const token = "YOUR_CLUSTER_TOKEN"

// 1. Set up a Milvus Client
client = new MilvusClient({address, token});

// 2. Create a collection in quick setup mode
await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
});  
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>上述代码在创建 Collection 的同时还创建了索引，因此 Collection 创建完成后会被自动加载。</p>

</Admonition>

## 查看 Partition{#list-partitions}

您可以通过以下命令查看 Collection 中所有 Partition。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 3. List partitions
res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default"]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.partition.request.ListPartitionsReq;

// 3. List all partitions in the collection
ListPartitionsReq listPartitionsReq = ListPartitionsReq.builder()
    .collectionName("quick_setup")
    .build();

List<String> partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

// Output:
// ["_default"]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 3. List partitions
res = await client.listPartitions({
    collection_name: "quick_setup"
})

console.log(res.partition_names)

// Output
// 
// [ '_default' ]
// 
```

</TabItem>
</Tabs>

上述代码的输出中将包含指定 Collection 中存在的所有 Partition 名称。

<Admonition type="info" icon="📘" title="说明">

<p>如果您在 Collection 中开启了 Partition key，会自动在该 Collection 中创建至少 <strong>64</strong> 个 Partition。这种情况下，指令返回结果可能和上述代码示例不同。</p>
<p>更多详情，请参考<a href="./use-partition-key">使用 Partition Key</a>。</p>

</Admonition>

## 创建 Partition{#create-partitions}

您可以在 Collection 中创建 Partition。1 个 Collection 中最多可创建 64 个 Partition。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 4. Create more partitions
client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionA"
)

client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionB"
)

res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default", "partitionA", "partitionB"]
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.partition.request.CreatePartitionReq;

// 4. Create more partitions
CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

client.createPartition(createPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName("quick_setup")
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

// Output:
// [
//     "_default",
//     "partitionA",
//     "partitionB"
// ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 4. Create more partitions
await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

res = await client.listPartitions({
    collection_name: "quick_setup"
})

console.log(res.partition_names)

// Output
// 
// [ '_default', 'partitionA', 'partitionB' ]
// 
```

</TabItem>
</Tabs>

上述代码在 Collection 中创建了 1 个 Partition 并产看了 Collection 中存在的所有 Partition。

<Admonition type="info" icon="📘" title="说明">

<p>如果您在 Collection 中开启了 Partition key，会自动为您管理该 Collection 中的 Partition。因此，您在创建 Partition 过程中可能会收到报错提示。</p>
<p>更多详情，请参考<a href="./use-partition-key">使用 Partition Key</a>。</p>

</Admonition>

## 检查 Partition 是否存在{#check-for-a-specific-partition}

您可以通过以下命令检查指定 Partition 是否已存在。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 5. Check whether a partition exists
res = client.has_partition(
    collection_name="quick_setup",
    partition_name="partitionA"
)
print(res)

# Output
#
# True

res = client.has_partition(
    collection_name="quick_setup",
    partition_name="partitionC"
)
print(res)

# Output
#
# False
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.partition.request.HasPartitionReq;

// 5. Check whether a partition exists
HasPartitionReq hasPartitionReq = HasPartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

boolean exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

// Output:
// true

hasPartitionReq = HasPartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionC")
    .build();

exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

// Output:
// false
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 5. Check whether a partition exists
res = await client.hasPartition({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res.value)

// Output
// 
// true
// 

res = await client.hasPartition({
    collection_name: "quick_setup",
    partition_name: "partitionC"
})

console.log(res.value)

// Output
// 
// false
// 

```

</TabItem>
</Tabs>

上述代码用于检查 Collection 中是否存在 `partitionA` 和 `partitionC`。

## Load 和 Release Partition{#load-and-release-partitions}

您可以按需加载和释放指定的 Partition。Partition 加载后可用于搜索和查询。

### 查看 Load 状态{#get-load-status}

通过以下命令查看 Collection 及 Partition 加载状态。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 6. Load a partition independantly
client.release_collection(collection_name="quick_setup")

res = client.get_load_state(collection_name="quick_setup")
print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }

client.load_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA"]
)

res = client.get_load_state(collection_name="quick_setup")
print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }

res = client.get_load_state(collection_name="quick_setup", partition_name="partitionA")
print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }

res = client.get_load_state(collection_name="quick_setup", partition_name="partitionB")
print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.request.ReleaseCollectionReq;
import io.milvus.v2.service.partition.request.LoadPartitionsReq;
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

// 6. Load a partition independantly
// 6.1 Release the collection
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()
    .collectionName("quick_setup")
    .build();

client.releaseCollection(releaseCollectionReq);

// 6.2 Load partitionA
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA"))
    .build();

client.loadPartitions(loadPartitionsReq);

Thread.sleep(3000);

// 6.3 Check the load status of the collection and its partitions
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

boolean state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// false
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 6. Load a partition indenpendantly
await client.releaseCollection({
    collection_name: "quick_setup"
})

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateNotLoad
// 

await client.loadPartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA"]
})

await sleep(3000)

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

</TabItem>
</Tabs>

加载状态有以下几种类型。

<Admonition type="info" icon="📘" title="说明">

<p>Java SDK 返回的结果为布尔值，可以反映 Partition 是否已加载。</p>

</Admonition>

- **已加载**

    Collection 中只要有 1 个 Partition 已加载，Collection就会被标记为`Loaded`。

- **未加载**

    Collection 中所有 Partition 都未加载时，Collection 就会被标记为 `NotLoad`。

- **加载中**

    Collection 中只要有 1 个 Partition 在加载中，Collection就会被标记为`Loading`。

### Load Partition{#load-partitions}

如需加载 Collection 中的所有 Partition，您可以直接使用 `load_collection()` 命令。如只需加载 Collection 中某个 Partition，请调用以下命令。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
client.load_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA"]
)

res = client.get_load_state(collection_name="quick_setup")
print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

</TabItem>

<TabItem value='java'>

```java
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA"))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.loadPartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA"]
})

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res.state)

// Output
// 
// LoadStateLoaded
//
```

</TabItem>
</Tabs>

如需一次性加载多个 Partition，请调用以下命令。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
client.load_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA", "partitionB"]
)

res = client.get_load_status(
    collection_name="quick_setup",
    partition_name="partitionA"
)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }

res = client.get_load_status(
    collection_name="quick_setup",
    partition_name="partitionB"
)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

</TabItem>

<TabItem value='java'>

```java
LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA", "partitionB"))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// true
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.loadPartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA", "partitionB"]
})

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

console.log(res)

// Output
// 
// LoadStateLoaded
// 

res = await client.getLoadState({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

console.log(res)

// Output
// 
// LoadStateLoaded
// 
```

</TabItem>
</Tabs>

### Release Partition{#release-partitions}

如需释放 Collection 中的所有 Partition，您可以直接使用 `release_collection` 命令。如只需释放 Collection 中某个 Partition，请调用以下命令。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 7. Release a partition
client.release_partitions(
    collection_name="quick_setup",
    partition_names=["partitionA"]
)

res = client.get_load_state(collection_name="quick_setup", partition_name="partitionA")
print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }

```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

// 7. Release a partition
ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("partitionA"))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// false
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 7. Release a partition
await client.releasePartitions({
    collection_name: "quick_setup",
    partition_names: ["partitionA"]
})

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res.state)

// Output
// 
// LoadStateNotLoad
// 
```

</TabItem>
</Tabs>

通过以下命令一次性释放多个或所有 Partition。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
client.release_partitions(
    collection_name="quick_setup",
    partition_names=["_default", "partitionA", "partitionB"]
)

res = client.get_load_status(
    collection_name="quick_setup",
)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.partition.request.ReleasePartitionsReq;

ReleasePartitionsReq releasePartitionsReq = ReleasePartitionsReq.builder()
    .collectionName("quick_setup")
    .partitionNames(List.of("_default", "partitionA", "partitionB"))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

// Output:
// false
```

</TabItem>

<TabItem value='javascript'>

```javascript

await client.releasePartitions({
    collection_name: "quick_setup",
    partition_names: ["_default", "partitionA", "partitionB"]
})

res = await client.getLoadState({
    collection_name: "quick_setup"
})

console.log(res)

// Output
// 
// {
//   status: {
//     error_code: 'Success',
//     reason: '',
//     code: 0,
//     retriable: false,
//     detail: ''
//   },
//   state: 'LoadStateNotLoad'
// }
// 
```

</TabItem>
</Tabs>

## 删除 Partition{#drop-partitions}

您可以删除无需使用的 Partition。删除前，请先确保 Partition 已释放。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"}]}>
<TabItem value='python'>

```python
# 8. Drop a partition
client.drop_partition(
    collection_name="quick_setup",
    partition_name="partitionB"
)

res = client.list_partitions(collection_name="quick_setup")
print(res)

# Output
#
# ["_default", "partitionA"]
```

</TabItem>

<TabItem value='java'>

```java
// 8. Drop a partition
DropPartitionReq dropPartitionReq = DropPartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionB")
    .build();

client.dropPartition(dropPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName("quick_setup")
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

// Output:
// [
//     "_default",
//     "partitionA"
// ]
```

</TabItem>

<TabItem value='javascript'>

```javascript
// 8 Drop a partition
await client.dropPartition({
    collection_name: "quick_setup",
    partition_name: "partitionB"
})

res = await client.listPartitions({
    collection_name: "quick_setup"
})

console.log(res.partition_names)

// Output
// 
// [ '_default', 'partitionA' ]
// 
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>删除 Partition 前，请先从内存中释放 Partition。</p>

</Admonition>

