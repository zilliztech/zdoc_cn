---
title: "Nullable 属性 | BYOC"
slug: /nullable-fields
sidebar_key: nullable-fields
sidebar_label: "Nullable 属性"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持 `nullable` 属性。启用 `nullable` 属性后，字段值可以缺失，或显式设置为 `NULL`。该属性在 Schema 级别定义，并在数据写入、索引、搜索和查询操作中保持一致。 | BYOC"
type: origin
token: BdZswOSRyiVxWakbGbCceGminNC
sidebar_position: 14
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - nullable 字段

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nullable 属性

Zilliz Cloud 支持 `nullable` 属性。启用 `nullable` 属性后，字段值可以缺失，或显式设置为 `NULL`。该属性在 Schema 级别定义，并在数据写入、索引、搜索和查询操作中保持一致。

在以下场景中可以使用 `nullable` 属性：

- 从允许缺失值的外部系统写入数据。

- 某些元数据是可选的，或只适用于部分数据集。

- 向量嵌入异步生成，并在之后再写入。

## **限制\{#limits}**

- 允许 `NULL` 值的向量字段不支持 `IS NULL` 或 `IS NOT NULL` 过滤表达式。您不能根据向量字段值是否为 `NULL` 来显式过滤 Entity。

- Array of Structs 字段不支持 `NULL` 值。您不能为 Array of Structs 字段或其内部嵌套字段启用 `nullable` 属性。

- `nullable` 属性在创建字段时定义，之后不能修改。您不能为已有字段启用或禁用 `nullable` 属性。

- 启用 `nullable` 属性的字段不能用作 Partition Key。Partition Key 字段必须始终包含有效的非空值。

## **什么是Nullable 属性\{#nullable-attribute}**

在 Zilliz Cloud 中，字段是否允许存储 `NULL` 值由名为 `nullable` 的 Schema 级字段属性控制。

当字段定义为 `nullable=True` 时，Zilliz Cloud 允许在数据写入期间缺失该字段值。实际使用中，Zilliz Cloud 会将以下两种输入视为等价，并将字段值存储为 `NULL`：

- 输入 Entity 中省略该字段。

- 显式将该字段设置为 `NULL`（例如 Python 中的 `None`）。

如果字段未启用 `nullable` 属性（默认行为），则每个 Entity 都必须为该字段提供有效值。省略该字段或显式赋值为 `NULL` 会导致插入或导入操作失败。

Collection Schema 中的 **标量字段和向量字段** 都支持 `nullable` 属性。不过，Array of Structs 字段不支持 `nullable` 属性。

<Admonition type="info" icon="📘" title="说明">

`nullable` 属性决定字段值是否可以缺失；它不定义字段缺失时使用什么值。

- 如果启用 `nullable` 属性的字段未配置默认值，省略该字段会存储为 `NULL`。

- 如果配置了默认值，Zilliz Cloud 可能会改为存储默认值。详情请参见[默认值](./default-fields)。

</Admonition>

## **设置 nullable 属性\{#set-the-nullable-attribute}**

要使用 `nullable` 属性，您必须在定义 Collection Schema 时启用该属性。

在以下示例中，Collection Schema 定义了一个名为 `embedding` 的向量字段，并设置 `nullable=True`。这样，Collection 中的 Entity 就可以在数据写入期间省略该向量值，或显式将其设置为 `NULL`。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="YOUR_CLUSTER_ENDPOINT",
    token="YOUR_CLUSTER_TOKEN"
)

# Define schema fields
schema = client.create_schema()
schema.add_field("id", DataType.INT64, is_primary=True) # Primary field
schema.add_field(
    field_name="embedding",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
    # highlight-next-line
    nullable=True, # Enable the nullable attribute; defaults to False
)

client.create_collection(
    collection_name="my_collection",
    schema=schema,
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// js
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

在此 Schema 中：

- `embedding` 字段被显式启用 `nullable` 属性。

- Entity 可以在插入期间省略 `embedding` 字段，或为其赋值 `NULL`。

- 是否允许 `NULL` 值的决定在 Collection 创建时固定。

为便于说明，以下示例重点介绍启用 `nullable` 属性的向量字段（`embedding`）。为标量字段启用 `nullable` 属性是可选的，并不是完成本指南后续步骤的前提。

<details>

<summary>可选：为标量字段启用 nullable 属性</summary>

标量字段也可以启用同一个 `nullable` 属性，并在写入期间遵循相同规则。例如：

```python
schema.add_field(
    field_name="age",
    datatype=DataType.INT64,
    # highlight-next-line
    nullable=True,
)
```

</details>

## **缺失值或 NULL 值的插入行为\{#insert-behavior-with-missing-or-null-values}**

字段在 Collection Schema 中启用 `nullable` 属性后，Zilliz Cloud 允许在数据写入期间缺失该字段值，或显式将其设置为 `NULL`。

以下示例向前面创建的 Collection 插入 3 个 Entity，展示不同输入情况：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data = [
    {
        "id": 1,
        "embedding": [0.1, 0.2, 0.3, 0.4],
    },
    {
        "id": 2,
        "embedding": None,   # Explicitly set to NULL
    },
    {
        "id": 3,             # Field omitted → stored as NULL
    },
]

client.insert(
    collection_name="my_collection",
    data=data,
)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// js
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

在此示例中：

- `id = 1` 的 Entity 提供了有效的向量值。

- `id = 2` 的 Entity 显式将 `embedding` 字段赋值为 `NULL`。

- `id = 3` 的 Entity 完全省略 `embedding` 字段；Zilliz Cloud 将其存储为 `NULL`。

## **索引行为\{#index-behavior}**

插入数据后，您可以像往常一样在启用 `nullable` 属性的字段上构建索引。区别在于 Zilliz Cloud 在索引构建期间如何处理 `NULL` 值：

- 只有非空值对应的 Entity 会加入索引。

- 具有 `NULL` 值的 Entity 会被跳过，不参与索引构建。

对于启用 `nullable` 属性的向量字段，这意味着只有包含有效向量的 Entity 才能通过向量相似度被搜索到。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Set index parameters
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

# Create index
client.create_index(
    collection_name="my_collection",
    index_params=index_params,
)

# Load collection for future search operations
client.load_collection(collection_name="my_collection")
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// js
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

此时：

- 具有有效 `embedding` 值的 Entity 已加入索引，并可用于搜索。

- `embedding` 为 `NULL` 的 Entity 仍保留在 Collection 中，但不会加入向量索引。

## **搜索行为\{#search-behavior}**

当您在启用 `nullable` 属性的字段上执行搜索操作时，Zilliz Cloud 只会评估搜索所用字段具有非空值的 Entity。向量字段值为 `NULL` 的 Entity 会自动跳过。

对于本示例中启用 `nullable` 属性的 `embedding` 向量字段：

- 只有包含有效向量值的 Entity 会被评估和排序。

- 包含 `NULL` 向量的 Entity 不会导致错误。

- 如果有效向量数量小于请求的 TopK（`limit`），Zilliz Cloud 返回的结果数量可能少于 `limit`。

以下示例在启用 `nullable` 属性的 `embedding` 向量字段上执行向量搜索：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.3, 0.4]],
    anns_field="embedding",
    limit=3,
    output_fields=["embedding"],
)

print(res)
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// js
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

在此搜索中：

- 只有 `embedding` 值非空的 Entity 会作为候选项参与搜索。

- `embedding` 值为 `NULL` 的 Entity 会从评估中排除。

- 返回结果数量取决于 Collection 中有效向量的数量。

## **查询与过滤影响\{#query-filtering-implications}**

前面的示例重点介绍向量字段。本节说明 **标量过滤表达式** 中 `NULL` 值的行为。

标量字段可以定义为 `nullable=True`，并遵循与向量字段相同的写入规则。不过，**NULL 标量值在过滤表达式中始终评估为 False**。

例如，给定一个启用 `nullable` 属性的标量字段 `age`，以下过滤表达式会选择 `age` 大于 `18` 的 Entity：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
expr = "age > 18"
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// js
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

`age` 为 `NULL` 的 Entity 会从结果中排除，因为 `NULL` 值不满足过滤条件。

同样，等值检查也不会匹配 `NULL` 值。例如：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
expr = "status == \"active\""
```

</TabItem>

<TabItem value='java'>

```java
// java
```

</TabItem>

<TabItem value='javascript'>

```javascript
// js
```

</TabItem>

<TabItem value='go'>

```go
// go
```

</TabItem>

<TabItem value='bash'>

```bash
# restful
```

</TabItem>
</Tabs>

`status` 为 `NULL` 的 Entity 会从结果中排除。

## **适用规则\{#applicable-rules}**

如果字段同时配置了 `nullable` 和 `default_value`，以下规则决定 Zilliz Cloud 在插入时如何处理 `NULL` 输入或缺失字段值。

<table>
   <tr>
     <th><p>Nullable</p></th>
     <th><p>Default Value</p></th>
     <th><p>用户输入</p></th>
     <th><p>结果</p></th>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>✅（非 <code>NULL</code>）</p></td>
     <td><p><code>NULL</code> 或省略</p></td>
     <td><p>使用默认值</p></td>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p><code>NULL</code> 或省略</p></td>
     <td><p>存储为 <code>NULL</code></p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅（非 <code>NULL</code>）</p></td>
     <td><p><code>NULL</code> 或省略</p></td>
     <td><p>使用默认值</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p><code>NULL</code> 或省略</p></td>
     <td><p>抛出错误</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅（<code>NULL</code>）</p></td>
     <td><p><code>NULL</code> 或省略</p></td>
     <td><p>抛出错误</p></td>
   </tr>
</table>

关键结论：

- 当字段具有非 `NULL` 默认值时，无论是否启用 `nullable`，都会使用该默认值。

- 当 `nullable=True` 但未设置默认值时，字段存储为 `NULL`。

- 当 `nullable=False` 且未设置默认值时，插入失败并报错。

- 在非可空字段上设置 `NULL` 默认值无效，并会导致错误。

