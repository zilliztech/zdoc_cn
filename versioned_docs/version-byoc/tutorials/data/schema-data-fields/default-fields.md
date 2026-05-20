---
title: "默认值 | BYOC"
slug: /default-fields
sidebar_key: default-fields
sidebar_label: "默认值"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持为标量字段（不包括主字段）设置默认值。字段配置默认值后，如果插入数据时未提供该字段的值，Zilliz Cloud 会自动使用配置的默认值。 | BYOC"
type: origin
token: PH1hwciixiXnF5kd0z2cVzxDnzh
sidebar_position: 15
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - default values for fields
  - 字段默认值

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 默认值

Zilliz Cloud 支持为标量字段（不包括主字段）设置默认值。字段配置默认值后，如果插入数据时未提供该字段的值，Zilliz Cloud 会自动使用配置的默认值。

默认值可以保留其他数据库系统中的既有默认值设置，从而简化数据迁移到 Zilliz Cloud 的过程。对于插入时暂时无法确定取值的字段，您也可以使用默认值。

## **限制\{#limits}**

- 只有标量字段支持默认值。主字段和向量字段不能配置默认值。

- `JSON` 和 `ARRAY` 字段不支持默认值。

- 默认值只能在创建 Collection 时配置，创建后不能修改。

## **设置默认值\{#set-default-values}**

创建 Collection 时，在 `add_field()` 中使用 `default_value` 参数为字段定义默认值。

以下示例创建一个 Collection，其中两个标量字段配置了默认值：`age` 的默认值为 `18`，`status` 的默认值为 `"active"`。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri='YOUR_CLUSTER_ENDPOINT')

# Define collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_schema=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
# highlight-start
schema.add_field(field_name="age", datatype=DataType.INT64, default_value=18)
schema.add_field(field_name="status", datatype=DataType.VARCHAR, default_value="active", max_length=10)
# highlight-end

# Set index params
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")

# Create collection
client.create_collection(collection_name="my_collection", schema=schema, index_params=index_params)
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

## **插入 Entity\{#insert-entities}**

插入数据时，如果省略已配置默认值的字段，或显式将该字段设为 `NULL`，Zilliz Cloud 会自动使用配置的默认值。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
data = [
    # All fields provided explicitly
    {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"},
    # age and status omitted → both use default values (18 and "active")
    {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]},
    # status set to None → uses default value "active"
    {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": None},
    # age set to None → uses default value 18
    {"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": None, "status": "inactive"}
]

client.insert(collection_name="my_collection", data=data)
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

## **使用默认值进行搜索和查询\{#search-and-query-with-default-values}**

包含默认值的 Entity 在向量搜索和标量过滤中的行为与其他 Entity 相同。您可以在搜索和查询操作中按默认值进行过滤。

以下示例搜索 `age` 等于默认值 `18` 的 Entity：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
res = client.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.4, 0.3, 0.5]],
    search_params={"params": {"nprobe": 16}},
    filter="age == 18",
    limit=10,
    output_fields=["id", "age", "status"]
)

print("Search results (age == 18):")
for hit in res[0]:
    print(f"  id: {hit['id']}, age: {hit['entity']['age']}, status: {hit['entity']['status']}")
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

<details>

<summary>预期输出</summary>

```plaintext
Output:
Search results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive
```

</details>

您也可以直接匹配默认值来查询 Entity：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"},{"label":"NodeJS","value":"javascript"},{"label":"Go","value":"go"},{"label":"cURL","value":"bash"}]}>
<TabItem value='python'>

```python
# Query entities where age equals the default value (18)
default_age_results = client.query(
    collection_name="my_collection",
    filter="age == 18",
    output_fields=["id", "age", "status"]
)

print("\nQuery results (age == 18):")
for r in default_age_results:
    print(f"  id: {r['id']}, age: {r['age']}, status: {r['status']}")

# Query entities where status equals the default value ("active")
default_status_results = client.query(
    collection_name="my_collection",
    filter='status == "active"',
    output_fields=["id", "age", "status"]
)

print("\nQuery results (status == 'active'):")
for r in default_status_results:
    print(f"  id: {r['id']}, age: {r['age']}, status: {r['status']}")
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

<details>

<summary>预期输出</summary>

```plaintext
Query results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive

Query results (status == 'active'):
  id: 2, age: 18, status: active
  id: 3, age: 25, status: active
```

</details>

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

