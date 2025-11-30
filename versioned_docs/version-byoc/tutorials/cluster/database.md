---
title: "Database | BYOC"
slug: /database
sidebar_label: "Database"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Zilliz Cloud 在集群和 Collection 之间引入了一层 Database，可帮助您更高效地组织和管理数据，同时满足您的多租需求。 | BYOC"
type: origin
token: VhSHwx56YiKY8VkRCHZcXspznbh
sidebar_position: 7
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 管理
  - database

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Database

Zilliz Cloud 在集群和 Collection 之间引入了一层 **Database**，可帮助您更高效地组织和管理数据，同时满足您的多租需求。

## 什么是 Database\{#what-is-a-database}

在 Zilliz Cloud 中，Database 是用于组织和管理数据的逻辑单元。为了增强数据安全并实现多租，您可以创建多个 Database，从逻辑上将不同应用和不同租户的数据隔离开来。例如，您可以针对两名不同用户的数据创建不同的 Database。

下图展示了 Zilliz Cloud 资源层级的架构。

![S5U6wtYJ3hqBoabccIQcPXdVnsd](/img/S5U6wtYJ3hqBoabccIQcPXdVnsd.png)

## 创建 Database\{#create-database}

仅 Dedicated 集群支持创建 Database。在您创建 Dedicated 集群的同时，Zilliz Cloud 会为您在集群下自动创建一个 Default Database。

每个 Dedicated 集群中最多可创建 1024 个 Database。您可以选择通过控制台或编程的方式创建 Database。

### 在控制台中创建 Database\{#create-a-database-on-the-console}

您可以按照如下图所示的方式创建 Database。

![create-database-cn](/img/create-database-cn.png)

您也可以将创建好的 Collection 从一个 Database 移动到另一个 Database 中。更多详情，请参考[管理 Collection (控制台)](./manage-collections-console)。

### 使用 SDK 创建 Database\{#create-a-database-programmatically}

您可以使用 RESTful API 或 SDK 创建 Database。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

client.create_database(
    db_name="my_database_1"
)
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.service.database.request.*;

ConnectConfig config = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

CreateDatabaseReq createDatabaseReq = CreateDatabaseReq.builder()
        .databaseName("my_database_1")
        .build();
client.createDatabase(createDatabaseReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
import {MilvusClient} from '@zilliz/milvus2-sdk-node';
const client = new MilvusClient({ 
    address: "YOUR_CLUSTER_ENDPOINT",
    token: 'YOUR_CLUSTER_TOKEN' 
});

await client.createDatabase({
    db_name: "my_database_1"
 });
```

</TabItem>

<TabItem value='go'>

```go
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    Username: "Milvus",
    Password: "root",
})
if err != nil {
    // handle err
}

err = cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("my_database_1"))
if err != nil {
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database_1"
}'
```

</TabItem>
</Tabs>

您还可以在创建 Database 时为其指定相应属性。如下示例中演示了如何在创建 Database 时设置副本数量。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.create_database(
    db_name="my_database_2",
    properties={
        "database.replica.number": 3
    }
)
```

</TabItem>

<TabItem value='java'>

```java
Map<String, String> properties = new HashMap<>();
properties.put("database.replica.number", "3");
CreateDatabaseReq createDatabaseReq = CreateDatabaseReq.builder()
        .databaseName("my_database_2")
        .properties(properties)
        .build();
client.createDatabase(createDatabaseReq);
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.createDatabase({
    db_name: "my_database_2",
    properties: {
        "database.replica.number": 3
    }
});
```

</TabItem>

<TabItem value='go'>

```go
err := cli.CreateDatabase(ctx, milvusclient.NewCreateDatabaseOption("my_database_2").WithProperty("database.replica.number", 3))
if err != nil {
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database_2",
    "properties": {
        "database.replica.number": 3
    }
}'
```

</TabItem>
</Tabs>

## 查看 Database\{#view-databases}

您可以使用 RESTful API 或 SDK 查看所有已创建的 Database 及其详情。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# List all existing databases
client.list_databases()

# Output
# ['default', 'my_database_1', 'my_database_2']

# Check database details
client.describe_database(
    db_name="default"
)

# Output
# {"name": "default"}
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.v2.service.database.response.*;

ListDatabasesResp listDatabasesResp = client.listDatabases();

DescribeDatabaseResp descDBResp = client.describeDatabase(DescribeDatabaseReq.builder()
        .databaseName("default")
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
await client.describeDatabase({ 
    db_name: 'default'
});
```

</TabItem>

<TabItem value='go'>

```go
// List all existing databases
databases, err := cli.ListDatabase(ctx, milvusclient.NewListDatabaseOption())
if err != nil {
    // handle err
}
log.Println(databases)

db, err := cli.DescribeDatabase(ctx, milvusclient.NewDescribeDatabaseOption("default"))
if err != nil {
    // handle err
}
log.Println(db)
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "default"
}'
```

</TabItem>
</Tabs>

## 管理 Database 属性\{#manage-database-properties}

每个 Database 都有若干属性供您设置。您可以选择在创建 Database 时设置这些属性或者修改已创建的 Database 的属性。

下表展示了当前支持设置的 Database 属性。

<table>
   <tr>
     <th><p>属性名称</p></th>
     <th><p>值类型</p></th>
     <th><p>属性描述</p></th>
   </tr>
   <tr>
     <td><p><code>database.replica.number</code></p></td>
     <td><p>integer</p></td>
     <td><p>指定 Database 的副本数量。</p></td>
   </tr>
   <tr>
     <td><p><code>database.max.collections</code></p></td>
     <td><p>integer</p></td>
     <td><p>指定 Database 中可以创建的 Collection 的最大数量。</p></td>
   </tr>
   <tr>
     <td><p><code>database.force.deny.writing</code></p></td>
     <td><p>boolean</p></td>
     <td><p>当前 Database 是否强制不可写。</p></td>
   </tr>
   <tr>
     <td><p><code>database.force.deny.reading</code></p></td>
     <td><p>boolean</p></td>
     <td><p>当前 Database 是否强制不可读。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p>string</p></td>
     <td></td>
   </tr>
</table>

### 修改 Database 属性\{#alter-database-properties}

您可以参考如下示例修改指定 Database 的上述属性。如下示例演示了如何限制指定 Database 中可以创建的 Collection 数量。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.alter_database_properties(
    db_name="my_database_1",
    properties={
        "database.max.collections": 10
    }
)
```

</TabItem>

<TabItem value='java'>

```java
client.alterDatabaseProperties(AlterDatabasePropertiesReq.builder()
        .databaseName("my_database_1")
        .property("database.max.collections", "10")
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
await milvusClient.alterDatabaseProperties({
  db_name: "my_database_1",
  properties: {"database.max.collections", "10" },
})
```

</TabItem>

<TabItem value='go'>

```go
err := cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption("my_database_1").
    WithProperty("database.max.collections", 1))
if err != nil {
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/alter" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database",
    "properties": {
        "database.max.collections": 10
    }
}'
```

</TabItem>
</Tabs>

### 重置 Database 属性\{#drop-database-properties}

您还可以参考如下示例重置 Database 某个属性的设置。如下示例演示了如何移除指定 Database 中可创建的 Collection 数量限制。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.drop_database_properties(
    db_name="my_database_1",
    property_keys=[
        "database.max.collections"
    ]
)
```

</TabItem>

<TabItem value='java'>

```java
client.dropDatabaseProperties(DropDatabasePropertiesReq.builder()
        .databaseName("my_database_1")
        .propertyKeys(Collections.singletonList("database.max.collections"))
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
await milvusClient.dropDatabaseProperties({
  db_name: my_database_1,
  properties: ["database.max.collections"],
});
```

</TabItem>

<TabItem value='go'>

```go
err := cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption("my_database_1", "database.max.collections"))
if err != nil {
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/alter" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database",
    "propertyKeys": [
        "database.max.collections"
    ]
}'
```

</TabItem>
</Tabs>

## 使用 Database\{#use-database}

您可以使用该操作在不断开连接的情况下切换当前使用的 Database。

<Admonition type="info" icon="📘" title="Notes">

<p>RESTful API 不支持该操作。</p>

</Admonition>

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.use_database(
    db_name="my_database_2"
)
```

</TabItem>

<TabItem value='java'>

```java
client.useDatabase("my_database_2");
```

</TabItem>

<TabItem value='javascript'>

```javascript
await milvusClient.useDatabase({
  db_name: "my_database_2",
});
```

</TabItem>

<TabItem value='go'>

```go
err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption("my_database_2"))
if err != nil {
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
# This operation is unsupported because RESTful does not provide a persistent connection.
# As a workaround, initiate the required request again with the target database.
```

</TabItem>
</Tabs>

## 删除 Database\{#drop-database}

当某个 Database 不再需要时，您可以选择删除该 Database。需要注意的是：

- 默认的 Database 无法删除。

- 在删除 Database 前，请删除 Database 中的所有 Collection。

### 在控制台中删除 Database\{#drop-a-database-on-the-console}

您可以参考下图中的步骤通过控制台删除 Database。

![drop-database-cn](/img/drop-database-cn.png)

### 使用 SDK 删除 Database\{#drop-a-database-programmatically}

您也可以使用 RESTful API 或 SDK 来删除 Database。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
client.drop_database(
    db_name="my_database_2"
)
```

</TabItem>

<TabItem value='java'>

```java
client.dropDatabase(DropDatabaseReq.builder()
        .databaseName("my_database_2")
        .build());
```

</TabItem>

<TabItem value='javascript'>

```javascript
await milvusClient.dropDatabase({
  db_name: "my_database_2",
});
```

</TabItem>

<TabItem value='go'>

```go
err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption("my_database_2"))
if err != nil {
    // handle err
}
```

</TabItem>

<TabItem value='bash'>

```bash
export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
export TOKEN="YOUR_CLUSTER_TOKEN"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/databases/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "dbName": "my_database"
}'
```

</TabItem>
</Tabs>

