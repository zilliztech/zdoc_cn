---
title: "StructArray 操作符 | Cloud"
slug: /struct-array-operators
sidebar_key: struct-array-operators
sidebar_label: "StructArray 操作符"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: ONDEMAND
notebook: FALSE
description: "Entity 中的 Array of Structs，也称为 StructArray，用于存储一组有序的 Struct 元素。Array 中的每个 Struct 都共享同一个预定义 Schema，该 Schema 可包含多个向量字段和标量字段。当 Struct 中的标量子字段已创建索引时，您可以使用 Element Filter 和 Match 系列运算符 对其执行标量过滤。 | Cloud"
type: origin
token: EjCRwxStKi4e0xkFoo6c82HynMd
sidebar_position: 6
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - query
  - 查询
  - filter
  - 过滤
  - 过滤表达式
  - array 表达式
  - struct
  - array

---

import Admonition from '@theme/Admonition';


# StructArray 操作符

Entity 中的 Array of Structs，也称为 StructArray，用于存储一组有序的 Struct 元素。Array 中的每个 Struct 都共享同一个预定义 Schema，该 Schema 可包含多个向量字段和标量字段。当 Struct 中的标量子字段已创建索引时，您可以使用 **Element Filter** 和 **Match 系列运算符** 对其执行标量过滤。

Element Filter 会选择 StructArray 字段中至少有一个值匹配指定谓词的 Entity。相比之下，Match 系列运算符用于查找 StructArray 字段中有特定数量或特定比例的值匹配指定谓词的 Entity。

<Admonition type="info" icon="📘" title="说明">

针对 `$[subField]` 构建谓词时，如果您处理的是大规模数据集，请确保该子字段已创建索引，因为这些运算符需要遍历每个候选 Entity 中的 Array 元素。

</Admonition>

## Element Filter\{#element-filter}

当您需要检查某个 Entity 的 StructArray 字段中是否包含匹配特定谓词的值时，请使用 Element Filter。

```python
element_filter(chunks, $[text] LIKE "Red%")
```

如上述 Element Filter 表达式所示，该过滤条件会返回 `text` 子字段中至少有一个 Chunk 以 `"Red"` 开头的 Entity。第一个参数是 StructArray 字段的名称，第二个参数是应用于 Struct 子字段的谓词。

您可以使用比较、范围和算术运算符构建条件，并使用逻辑运算符连接多个条件，如 [基本操作符](./basic-filtering-operators) 所示。

但是，当您构建同时包含 Entity 级别谓词和 Element Filter 的过滤表达式时，应始终将 Element Filter 放在末尾，如以下示例所示。

```python
# correct
id > 0 && element_filter(chunks, $[x] > 1)

# incorrect, resulting errors
element_filter(chunks, $[x] > 1) && id > 0
```

## Match 系列运算符\{#match-family-operators}

Match 系列运算符也适用于 StructArray 字段。它们不只是检查是否存在满足条件的元素，还可以指定必须有多少个元素（或多大比例的元素）满足元素谓词。

- [`MATCH_ANY(identifier, predicate)`](./struct-array-operators#match-any)：返回 `text` 子字段中至少有一个 Chunk 以 `"Red"` 开头的 Entity；从语义上看，这等价于 `element_filter`。

- [`MATCH_ALL(identifier, predicate)`](./struct-array-operators#match-all)：返回所有 Chunk 的 `text` 子字段都以 `"Red"` 开头的 Entity。

- [`MATCH_LEAST(identifier, predicate, k)`](./struct-array-operators#match-least)：返回 `text` 子字段中至少有 `k` 个 Chunk 以 `"Red"` 开头的 Entity。

- [`MATCH_MOST(identifier, predicate, k)`](./struct-array-operators#match-most)：返回 `text` 子字段中至多有 `k` 个 Chunk 以 `"Red"` 开头的 Entity。

- [`MATCH_EXACT(identifier, predicate, k)`](./struct-array-operators#match-exact)：返回 `text` 子字段中恰好有 `k` 个 Chunk 以 `"Red"` 开头的 Entity。

### MATCH_ANY\{#match-any}

如果 Array 中**至少一个**元素满足谓词，则该运算符返回 `true`。这表示它在结构上等价于对所有 Array 元素执行逻辑 `OR`。

`MATCH_ANY` 运算符和 Element Filter 在语义上相同，您可以互换使用。当您需要表达 `count(matches) >= 1` 逻辑时，应使用它们。

**示例：**

以下示例返回文档中任意部分以 `"Red"` 开头的 Entity。

```python
MATCH_ANY(chunks, $[text] LIKE 'Red%')
```

### MATCH_ALL\{#match-all}

只有当 Array 中**每一个**元素都满足谓词时，该运算符才返回 `true`。

当您需要表达 `count(matches) == total elements` 逻辑时，请使用该运算符。

**示例：**

```python
MATCH_ALL(chunks, $[text] LIKE 'Red%')
```

### MATCH_LEAST\{#match-least}

这是一个定量过滤运算符。当满足谓词的元素数量**大于或等于**指定常量 $k$ 时，该运算符返回 `true`。

当您需要表达 `count(matches) >= k` 逻辑时，请使用该运算符。

**示例：**

```python
MATCH_LEAST(chunks, $[text] LIKE 'Red%', 3)
```

### MATCH_MOST\{#match-most}

这是一个定量过滤运算符。当满足谓词的元素数量**小于或等于**指定常量 $k$ 时，该运算符返回 `true`。

这对于过滤掉过度命中特定关键词的 Entity 特别有用，可用于降低噪声。

**示例：**

```python
MATCH_MOST(chunks, $[text] LIKE 'Red%', 3)
```

### MATCH_EXACT\{#match-exact}

这是该系列中限制最严格的定量运算符。当且仅当满足谓词的元素数量**恰好等于** $k$ 时，该运算符才返回 `true`。

**示例：**

```python
MATCH_EXACT(chunks, $[text] LIKE 'Red%', 3)
```

