---
title: "queryIterator() | Java | v2"
slug: /java/java/v2-Vector-queryIterator
sidebar_label: "queryIterator()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "(占位符) | Java | v2"
type: docx
token: HnxQdhvGQotpwfxgo4pcviKNn4g
sidebar_position: 6
keywords: 
  - 什么是 vector 数据库
  - vector 数据库比较
  - Faiss
  - 视频搜索
  - zilliz
  - zilliz cloud
  - cloud
  - queryIterator()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# queryIterator()

# queryIterator()\{#queryiterator}

此方法返回一个查询迭代器，用于迭代数据。

```java
public QueryIterator queryIterator(QueryIteratorReq request)
```

## 请求语法\{#request-syntax}

```java
queryIterator(QueryIteratorReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionNames(List<String> partitionNames)
    .outputFields(List<String> outputFields)
    .expr(String expr)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .offset(long offset)
    .limit(long limit)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .batchSize(long batchSize)
    .reduceStopForBest(boolean reduceStopForBest)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
);
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    数据库名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `clusterId(String clusterId)`

    此向量读取请求的目标 cluster ID。当多个请求应共享同一个 cluster ID 时，请使用 `session(String clusterId)`。

- `partitionNames(List<String> partitionNames)`

    要作为目标的分区名称列表。

- `outputFields(List<String> outputFields)`

    要包含在输出中的字段名称列表。

- `expr(String expr)`

    用于过滤结果的布尔表达式。

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    该操作的一致性级别。

- `offset(long offset)`

    返回结果之前要跳过的结果数量。

- `limit(long limit)`

    要返回的最大结果数量。

- `ignoreGrowing(boolean ignoreGrowing)`

    是否在操作期间忽略 growing segments。

- `timezone(String timezone)`

    用于时间相关过滤器的时区字符串。

- `batchSize(long batchSize)`

    迭代器操作的批量大小。

- `reduceStopForBest(boolean reduceStopForBest)`

    是否在找到最佳结果时停止迭代。

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    用于参数化过滤器的模板变量值映射。

**返回：**

*QueryIterator*

*QueryIterator*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将引发此异常。

## 示例\{#example}

```java
import io.milvus.orm.iterator.QueryIterator;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.v2.service.vector.request.QueryIteratorReq;
import io.milvus.v2.common.ConsistencyLevel;

import java.util.Arrays;
import java.util.List;

// Create a query iterator to retrieve results in batches
QueryIterator queryIterator = client.queryIterator(QueryIteratorReq.builder()
        .collectionName("my_collection")
        .expr("userID < 3000")
        .outputFields(Arrays.asList("userID", "userAge"))
        .batchSize(100)
        .offset(0)
        .limit(10000)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

// Iterate through all results
int counter = 0;
while (true) {
    List<QueryResultsWrapper.RowRecord> res = queryIterator.next();
    if (res.isEmpty()) {
        queryIterator.close();
        break;
    }
    for (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
        counter++;
    }
}
System.out.printf("%d query results returned%n", counter);
```
