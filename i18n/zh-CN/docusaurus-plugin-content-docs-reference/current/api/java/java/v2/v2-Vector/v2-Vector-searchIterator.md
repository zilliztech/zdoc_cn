---
title: "searchIterator() | Java | v2"
slug: /java/java/v2-Vector-searchIterator
sidebar_label: "searchIterator()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "（占位符） | Java | v2"
type: docx
token: X7Ybdk6yRoVRPZxeHklct1i2n8c
sidebar_position: 8
keywords: 
  - llm 评估
  - 稀疏 vs 稠密
  - 稠密 vector
  - Hierarchical Navigable Small Worlds
  - zilliz
  - Zilliz Cloud
  - cloud
  - searchIterator()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# searchIterator()

# searchIterator()\{#searchiterator}

此方法返回一个搜索迭代器，用于迭代搜索结果。

```java
public SearchIterator searchIterator(SearchIteratorReq request)
```

## 请求语法\{#request-syntax}

```java
searchIterator(SearchIteratorReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionNames(List<String> partitionNames)
    .vectorFieldName(String vectorFieldName)
    .topK(int topK)
    .limit(long limit)
    .expr(String expr)
    .outputFields(List<String> outputFields)
    .vectors(List<BaseVector> vectors)
    .roundDecimal(int roundDecimal)
    .params(String params)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .groupByFieldName(String groupByFieldName)
    .batchSize(long batchSize)
    .build()
);
```

**构建器方法：**

- `databaseName(String databaseName)`

    数据库名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `clusterId(String clusterId)`

    此 vector 读取请求的目标 cluster ID。当多个请求需要共享同一个 cluster ID 时，请使用 `session(String clusterId)`。

- `partitionNames(List<String> partitionNames)`

    要作为目标的 partition 名称列表。

- `vectorFieldName(String vectorFieldName)`

    vector 字段的名称。

- `topK(int topK)`

    要返回的最靠前结果数量。

- `limit(long limit)`

    要返回的最大结果数量。

- `expr(String expr)`

    用于过滤结果的布尔表达式。

- `outputFields(List<String> outputFields)`

    要包含在输出中的字段名称列表。

- `vectors(List<BaseVector> vectors)`

    用于搜索的 vector 列表。

- `roundDecimal(int roundDecimal)`

    距离/分数舍入的小数位数。

- `params(String params)`

    以 JSON 字符串形式提供的其他搜索参数。

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    操作的 consistency level。

- `ignoreGrowing(boolean ignoreGrowing)`

    操作期间是否忽略 growing segment。

- `groupByFieldName(String groupByFieldName)`

    用于对搜索结果进行分组的字段名称。

- `batchSize(long batchSize)`

    迭代器操作的批大小。

**返回：**

*SearchIterator*

一个用于迭代搜索结果的 *SearchIterator* 对象，提供以下方法：

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.orm.iterator.SearchIterator;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchIteratorReq;
import io.milvus.v2.service.vector.request.data.FloatVec;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Iterator search
List<Float> vector = generateFloatVector();
SearchIterator searchIterator = client.searchIterator(SearchIteratorReq.builder()
        .collectionName("test")
        .outputFields(Lists.newArrayList("vector"))
        .batchSize(50L)
        .vectorFieldName("vector")
        .vectors(Collections.singletonList(new FloatVec(vector)))
        .expr("id > 100")
        .params("{\"range_filter\": 15.0, \"radius\": 20.0}")
        .topK(300)
        .metricType(IndexParam.MetricType.L2)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

System.out.println("SearchIteratorV1 results:");
while (true) {
    List<QueryResultsWrapper.RowRecord> res = searchIterator.next();
    if (res.isEmpty()) {
        System.out.println("Search iteration finished, close");
        searchIterator.close();
        break;
    }

    for (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
    }
}
```
