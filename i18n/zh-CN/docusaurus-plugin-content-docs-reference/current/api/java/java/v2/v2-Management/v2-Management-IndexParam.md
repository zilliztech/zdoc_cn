---
title: "IndexParam | Java | v2"
slug: /java/java/v2-Management-IndexParam
sidebar_label: "IndexParam"
beta: false
added_since: v2.3.x
last_modified: v2.6.x
deprecate_since: false
notebook: false
description: "IndexParam 定义了用于在 Collection 字段上配置索引的参数。 | Java | v2"
type: docx
token: SXgodgq99ozZoHxfnakc0fpCnJh
sidebar_position: 10
keywords: 
  - milvus db
  - milvus vector db
  - Zilliz Cloud
  - 什么是 milvus
  - zilliz
  - zilliz cloud
  - cloud
  - IndexParam
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# IndexParam

IndexParam 定义了用于在 Collection 字段上配置索引的参数。

```java
IndexParam.builder()
    .fieldName(String fieldName)
    .indexType(IndexType indexType)
    .metricType(MetricType metricType)
    .extraParams(Map<String, Object> extraParams)
    .build()
```

**BUILDER 方法：**

- `fieldName(String fieldName)` -

    要创建索引的字段名称。

- `indexType(IndexType indexType)` -

    要在字段上构建的索引类型。有关可用的索引类型，请参阅 IndexType。

- `metricType(MetricType metricType)` -

    用于向量相似度计算的度量类型。有关可用的度量类型，请参阅 MetricType。

- `extraParams(Map<String, Object> extraParams)` -

    以键值对形式提供的其他索引专用参数。例如，HNSW 索引的 `{"M": 16, "efConstruction": 256}`。

**返回：**

*IndexParam*

**异常：**

*MilvusClientException*

当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.common.IndexParam;

IndexParam indexParam = IndexParam.builder()
    .fieldName("vector")
    .indexType(IndexParam.IndexType.HNSW)
    .metricType(IndexParam.MetricType.COSINE)
    .extraParams(Map.of("M", 16, "efConstruction", 256))
    .build();
```
