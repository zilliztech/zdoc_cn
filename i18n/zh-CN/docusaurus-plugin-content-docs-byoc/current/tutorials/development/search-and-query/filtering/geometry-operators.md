---
title: "Geometry 操作符 | BYOC"
slug: /geometry-operators
sidebar_label: "Geometry 操作符"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "支持一组用于在 `GEOMETRY` 字段上进行过滤的操作符，这些操作符对于管理和分析几何数据至关重要。借助这些操作符，您可以执行高效的空间查询，并根据对象之间的几何关系检索实体。 | BYOC"
type: origin
token: U0i0wkfowidG7xkkyercDwvKnMf
sidebar_position: 9
displayed_sidebar: default

---

import Admonition from '@theme/Admonition';


# Geometry 操作符

 支持一组用于在 `GEOMETRY` 字段上进行过滤的操作符，这些操作符对于管理和分析几何数据至关重要。借助这些操作符，您可以执行高效的空间查询，并根据对象之间的几何关系检索实体。

所有 Geometry 操作符都通过两个几何参数运行：collection 中定义的 `GEOMETRY` 字段名称，以及以 [Well-known Text](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)（WKT）格式表示的目标几何对象。

要了解更多关于  中 `GEOMETRY` 字段的信息，请参阅 [Geometry 类型](./use-geometry-field)。

## 可用的 Geometry 操作符\{#}

下表总结了  中可用的 Geometry 操作符。在**示例**列中，`geo_field` 表示在您的 collection schema 中定义的 `GEOMETRY` 字段名称。

<Admonition type="info" icon="📘" title="注释">

操作符名称必须**全部大写**或**全部小写**。不要在同一个操作符名称中混用大小写。

</Admonition>

| 操作符 | 描述 | 示例 |
| --- | --- | --- |
| `ST_EQUALS` / `st_equals` | 如果两个几何对象在位置和形状上完全相同，则返回 TRUE。 | `ST_EQUALS(geo_field, 'POINT(10 20)')` |
| `ST_TOUCHES` / `st_touches` | 如果两个几何对象的边界接触，但内部不重叠，则返回 TRUE。 | `ST_TOUCHES(geo_field, 'LINESTRING(0 0, 1 1)')` |
| `ST_OVERLAPS` / `st_overlaps` | 如果两个相同维度的几何对象部分重叠，共享部分但不是全部空间，并且彼此都不完全包含对方或与对方相同，则返回 TRUE。 | `ST_OVERLAPS(geo_field, 'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))')` |
| `ST_CROSSES` / `st_crosses` | 如果两个几何对象的交集产生的几何图形维度低于两个原始对象（例如，两条线在一个点处相交），则返回 TRUE。 | `ST_CROSSES(geo_field, 'LINESTRING(5 0, 5 10)')` |
| `ST_CONTAINS` / `st_contains` | 如果第一个几何图形完全包含第二个几何图形（包括其边界和内部），则返回 TRUE。 | `ST_CONTAINS(geo_field, 'POINT(112 40)')` |
| `ST_INTERSECTS` / `st_intersects` | 如果两个几何图形的边界或内部的任何部分重叠，则返回 TRUE。 | `ST_INTERSECTS(geo_field, 'POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))')` |
| `ST_WITHIN` / `st_within` | 如果第一个几何图形完全位于第二个几何图形内部或边界上，则返回 TRUE。 | `ST_WITHIN(geo_field, 'POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))')` |

## ST_EQUALS / st_equals\{#stequals-stequals}

如果两个几何图形在空间上完全相同，即它们具有完全相同的位置和维度集合，则 `ST_EQUALS` 操作符返回 `TRUE`。

**示例**

您有一组预定义的兴趣点（例如地标），并且希望通过精确坐标快速找到特定地标。

```python
# The filter expression to find geometries identical to a specific point.
filter = "ST_EQUALS(geo_field, 'POINT (10 20)')"
```

## ST_TOUCHES / st_touches\{#sttouches-sttouches}

如果两个几何图形的边界接触但内部不相交，则 `ST_TOUCHES` 操作符返回 `TRUE`。这对于检测邻接关系很有用。

**示例**

如果您有一张地块地图，并且希望找出所有与公共公园直接相邻且没有任何重叠的地块。

```python
# The filter expression to find geometries that only touch a line string at their boundaries.
filter = "ST_TOUCHES(geo_field, 'LINESTRING(0 0, 1 1)')"
```

## ST_OVERLAPS / st_overlaps\{#stoverlaps-stoverlaps}

如果两个相同维度的几何图形部分相交，且相交部分的维度与原始几何图形相同，但不等于其中任何一个，则 `ST_OVERLAPS` 操作符返回 `TRUE`。

**示例**

您有一组重叠的销售区域，并且希望找出所有与新提议的销售区域部分重叠的区域。

```python
# The filter expression to find geometries that partially overlap with a polygon.
filter = "ST_OVERLAPS(geo_field, 'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))')"
```

## ST_CROSSES / st_crosses\{#stcrosses-stcrosses}

如果两个几何图形的交集形成的几何图形维度低于原始几何图形，则 `ST_CROSSES` 操作符返回 `TRUE`。这通常适用于一条线穿过一个多边形或另一条线的情况。

**示例**

您希望查找所有与特定边界线（另一条线串）相交或进入保护区（多边形）的徒步小径（线串）。

```python
# The filter expression to find geometries that cross a line string.
filter = "ST_CROSSES(geo_field, 'LINESTRING(5 0, 5 10)')"
```

## ST_CONTAINS / st_contains\{#stcontains-stcontains}

当第一个几何图形完全包含第二个几何图形时，`ST_CONTAINS` 操作符返回 `TRUE`。这对于查找多边形内的点，或较大多边形内的较小多边形很有用。

**示例**

假设您有一系列城市街区，并且希望找到一个特定的兴趣点，比如一家餐厅，它位于给定街区的范围内。

```python
# The filter expression to find geometries completely within a specific polygon.
filter = "ST_CONTAINS(geo_field, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')"
```

## ST_INTERSECTS / st_intersects\{#stintersects-stintersects}

当两个几何图形的边界或内部有任何公共点时，`ST_INTERSECTS` 操作符返回 `TRUE`。这是一个用于检测任何形式空间重叠的通用操作符。

**示例**

如果您有一组道路，并且希望找出所有与表示拟建新道路的特定线串相交或接触的道路，可以使用 `ST_INTERSECTS`。

```python
# The filter expression to find geometries that intersect with a specific line string.
filter = "ST_INTERSECTS(geo_field, 'LINESTRING (1 1, 2 2)')"
```

## ST_WITHIN / st_within\{#stwithin-stwithin}

如果第一个几何图形完全位于第二个几何图形的内部或边界上，则 `ST_WITHIN` 操作符返回 `TRUE`。它是 `ST_CONTAINS` 的逆操作。

**示例**

您希望找到所有完全位于一个指定大型公园区域内的小型居民区。

```python
# The filter expression to find geometries that are completely within a larger polygon.
filter = "ST_WITHIN(geo_field, 'POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))')"
```

有关如何使用 `GEOMETRY` 字段的更多信息，请参阅 [Geometry 类型](./use-geometry-field)。
