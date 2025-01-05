---
title: "基本操作符 | Cloud"
slug: /basic-filtering-operators
sidebar_label: "基本操作符"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供了一套丰富的基本操作符，可帮助您高效地过滤和查询数据。通过这些操作符，您可以根据标量字段、数字计算、逻辑条件等细化搜索条件。了解如何使用这些操作符对于建立精确查询和最大限度地提高搜索效率至关重要。 | Cloud"
type: origin
token: OEw6wSUvXiKQKpkOLIAcYk6unbc
sidebar_position: 2
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
  - 基本操作符
  - basic operators

---

import Admonition from '@theme/Admonition';


# 基本操作符

Zilliz Cloud 提供了一套丰富的基本操作符，可帮助您高效地过滤和查询数据。通过这些操作符，您可以根据标量字段、数字计算、逻辑条件等细化搜索条件。了解如何使用这些操作符对于建立精确查询和最大限度地提高搜索效率至关重要。

## 比较操作符{#comparison-operators}

比较运算符用于根据相等、不等或大小过滤数据。它们适用于数字和文本字段。

### 支持的比较操作符{#supported-comparison-operators}

- `==`（等于）

- `!=`（不等于）

- `>`（大于）

- `<`（小于）

- `>=`（大于等于）

- `<=`（小于等于）

### 示例1：使用等于（`==`）操作符过滤{#example-1-filtering-with-equal-to}

假设有名为 `status` 的字段，需要过滤出 `status` 字段值为 `active` 的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'status == "active"'
```

### 示例2：使用不等于（`!=`）操作符过滤{#example-2-filtering-with-not-equal-to}

如果需要过滤出 `status` 字段值不为 `active` 的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'status != "inactive"'
```

### 示例3：使用大于（`>`）操作符过滤{#example-3-filtering-with-greater-than-greater}

如果需要过滤出 `age` 字段值大于 `30` 的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'age > 30'
```

### 示例4：使用小于（`\<`）操作符过滤{#example-4-filtering-with-less-than}

如果需要过滤出 `price` 字段小于 `100` 的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'price < 100'
```

### 示例5：使用大于等于（`>=`）操作符过滤{#example-5-filtering-with-greater-than-or-equal-to-greater}

如果需要过滤出 `rating` 字段大于等于 `4` 的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'rating >= 4'
```

### 示例6：使用小于等于（`\<=`）操作符过滤{#example-6-filtering-with-less-than-or-equal-to}

如果需要过滤出 `discount` 字段小于等于 `10%` 的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'discount <= 10'
```

## 范围操作符{#range-operators}

范围操作符可以根据特定的数值集或数值范围过滤数据。

### 支持的范围操作符{#supported-range-operators}

- `IN`：用于过滤出某字段的值在指定范围内的所有 Entity。

- `LIKE`：用于过滤出某字段的值匹配指定模式的所有 Entity。

### 示例1：使用 `IN`操作符匹配多个指定值{#example-1-using-in-to-match-multiple-values}

如果需要过滤出 `color` 字段中包含了 `red`、`green` 或 `blue` 的所有 Entity，可以使用如下表达式：

```python
filter = 'color in ["red", "green", "blue"]'
```

这对于希望检查某参数值是否在某个指定范围来说十分有用。

### 示例2：使用 `LIKE` 操作符进行模式匹配{#example-2-using-like-for-pattern-matching}

对于文本字段来说，可以使用 `LIKE` 操作符对其进行模式匹配。具体来说，您可以检查某个文本字段的值是否在前缀、后缀或中缀等指定位置上包含某个子字符串。在 `LIKE` 操作符中，您可以使用 `%` 作为通配符，用于匹配零个或多个字符。

### 前缀匹配{#prefix-match-starts-with}

如果需要进行前缀匹配，可以将 `%` 通配符放在需要匹配的子字符串的后面。如下面的例子所示，如果需要找出 `name` 字段值以 `Prod` 开头的所有 Entity，可以使用如下过滤表达式。

```python
filter = 'name LIKE "Prod%"'
```

This will match any product whose name starts with "Prod", such as "Product A", "Product B", etc.

该过滤表达式将匹配 `name` 字段值为 `ProductA`、`ProductB` 等以 `Prod` 开头的所有 Entity。

### 后缀匹配{#suffix-match-ends-with}

对于后缀匹配来说，可以将 `%` 通配符放在需要匹配的子字符串的前面。例如，需要找出 `name` 字段以 `XYZ` 结尾的所有 Entity，可以使用如下过滤表达式。

```python
filter = 'name LIKE "%XYZ"'
```

该过滤表达式将匹配 `name` 字段值为 `ProductXYZ`、`SampleXYZ` 等以 `XYZ` 结尾的所有 Entity。

### 中缀匹配{#infix-match-contains}

进行中缀匹配，也就是匹配那些包含指定模式文本的字段值，可以在模式文本前后都加上一个 `%` 通配符。例如，需要找出 `name` 字段包含了 `Pro` 字样的所有 Entity，可以使用如下过滤表达式：

```python
filter = 'name LIKE "%Pro%"'
```

该过滤表达式将匹配 `name` 字段值为 `Product`、`ProLine` 或 `SuperPro` 等包含了 `Pro` 字符串的所有 Entity。

## 算术操作符{#arithmetic-operators}

您可以使用算术操作符根据涉及数值字段的算术计算式创建过滤条件。

### 支持的算术操作符{#supported-arithmetic-operators}

- `+`（加）

- `-`（减）

- `*`（乘）

- `/`（除）

- `%`（余）

- `**`（幂）

### 示例1：使用加（`+`）操作符{#example-1-using-addition}

假设总价为基准价格（`base_price`）和税款（`tax`）的总和（`total`)，可以使用如下过滤条件表达式找出 `total` 字段值为 `base_price` 字段和 `tax` 字段总和的所有 Entity。

```python
filter = 'total == base_price + tax'
```

### 示例2：使用减（`-`）操作符{#example-2-using-subtraction}

可以使用如下过滤表达式过滤出 `quantity` 字段的取值减去 `quantity_sold` 字段的取值的差大于 50 的所有 Entity。

```python
filter = 'quantity - quantity_sold > 50'
```

### 示例3：使用乘（`*`）操作符{#example-3-using-multiplication}

可以使用如下过滤表达式过滤出 `price` 字段值和 `quantity` 字段值的乘积大于 1000 的所有 Entity。

```python
filter = 'price * quantity > 1000'
```

### 示例4：使用除（`/`）操作符{#example-4-using-division}

可以使用如下过滤表达式过滤出 `total_price` 字段值和 `quantity` 字段值的商小于 50 的所有 Entity。

```python
filter = 'total_price / quantity < 50'
```

### 示例5：使用余（`%`）操作符{#example-5-using-modulus-percent}

可以使用如下过滤表达式找出 `id` 字段值为偶数的所有 Entity。

```python
filter = 'id % 2 == 0'
```

### 示例6：使用幂（`**`）操作符{#example-6-using-exponentiation}

可以使用如下过滤表达式找出所有 `price` 字段值的平方大于 1000 的所有 Entity。

```python
filter = 'price ** 2 > 1000'
```

## 逻辑操作符{#logical-operators}

逻辑操作符通常用来连接多个过滤条件以实现复杂的过滤条件，包括 `AND`、`OR` 和 `NOT`。

### 支持的逻辑操作符{#supported-logical-operators}

- `AND`：连接多个过滤条件，每个条件都为真时为真。

- `OR`：连接多个过滤条件，其中一个条件为真时为真。

- `NOT`：后接一个过滤条件，当该条件为假时为真。

### 示例 1：使用 `AND` 操作符连接多个条件{#example-1-using-and-to-combine-conditions}

可以使用如下过滤表达式找出 `price` 字段值大于 `100` 且 `stock` 字段值大于 `50` 的所有 Entity。

```python
filter = 'price > 100 AND stock > 50'
```

### 示例 2：使用 `OR` 操作符连接多个条件{#example-2-using-or-to-combine-conditions}

可以使用如下过滤表达式找出 `color` 字段值为 `red` 或 `blue` 的所有 Entity。

```python
filter = 'color == "red" OR color == "blue"'
```

### 示例 3：使用 `NOT` 操作符排除某个条件{#example-3-using-not-to-exclude-a-condition}

可以使用如下过滤表达式找出所有 `color` 字段值不为 `green` 的所有 Entity。

```python
filter = 'NOT color == "green"'
```

## 在针对 JSON 和 ARRAY 类型的字段进行过滤时使用基本操作符需要注意的问题{#tips-on-using-basic-operators-with-json-and-array-fields}

Zilliz Cloud 集群中的基本运算符用途广泛，可用于标量字段，但它们也可有效地用于 JSON 和 ARRAY 字段中的键和索引。

假设 `product` 字段中有多个键，其键名分别为 `price`、`model` 和 `tags`，您可以使用这些键名构建过滤条件表达式来实现针对这些键值的过滤。如下示例可以找出 `product` 字段中 `price` 键值大于 `1000` 的所有 Entity。

```python
filter = 'product["price"] > 1000'
```

您还可以使用如下过滤表达式找出 `history_temperatures` 中第一个记录大于 `30` 的所有 Entity。

```python
filter = 'history_temperatures[0] > 30'
```

## 小结{#conclusion}

Zilliz Cloud 提供了一系列基本运算符，可让您灵活地过滤和查询数据。通过结合比较、范围、算术和逻辑运算符，您可以创建功能强大的过滤表达式，以缩小搜索结果的范围并高效检索所需数据。