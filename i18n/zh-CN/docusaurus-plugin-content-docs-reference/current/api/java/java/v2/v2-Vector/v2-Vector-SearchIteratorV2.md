---
title: "SearchIteratorV2() | Java | v2"
slug: /java/java/v2-Vector-SearchIteratorV2
sidebar_label: "SearchIteratorV2()"
beta: false
added_since: v2.5.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作会创建一个迭代器，用于遍历搜索结果。当搜索结果包含大量数据时尤其有用。 | Java | v2"
type: docx
token: ZouQdklUsoSZEDxWkJvc90pvnmg
sidebar_position: 11
keywords: 
  - vector db 对比
  - openai vector db
  - 自然语言处理数据库
  - 低成本 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - SearchIteratorV2()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# SearchIteratorV2()

此操作会创建一个迭代器，用于遍历搜索结果。当搜索结果包含大量数据时尤其有用。

```java
public SearchIteratorV2 searchIteratorV2(SearchIteratorReqV2 request)
```

## 请求语法\{#request-syntax}

```java
searchIteratorV2(SearchIteratorReqV2.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionNames(List<String> partitionNames)
    .vectorFieldName(String vectorFieldName)
    .topK(int topK)
    .limit(long limit)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .vectors(List<BaseVector> vectors)
    .roundDecimal(int roundDecimal)
    .searchParams(Map<String, Object> searchParams)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .groupByFieldName(String groupByFieldName)
    .batchSize(long batchSize)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
);
```

**构建器方法：**

- `databaseName(String databaseName)`

    数据库名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `clusterId(String clusterId)`

    此 vector 读取请求的目标 cluster ID。当多个请求应共享同一个 cluster ID 时，请使用 `session(String clusterId)`。

- `partitionNames(List<String> partitionNames)`

    要作为目标的 partition 名称列表。

- `vectorFieldName(String vectorFieldName)`

    要搜索的 vector 字段名称。

- `topK(int topK)`

    要返回的顶部结果数量。

- `limit(long limit)`

    要返回的最大结果数量。

- `filter(String filter)`

    用于过滤结果的布尔表达式。

- `outputFields(List<String> outputFields)`

    要包含在输出中的字段名称列表。

- `vectors(List<BaseVector> vectors)`

    用于搜索的 vector 列表。

- `roundDecimal(int roundDecimal)`

    距离/分数四舍五入的小数位数。

- `searchParams(Map<String, Object> searchParams)`

    以键值对形式提供的其他搜索参数。

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    该操作的 consistency level。

- `ignoreGrowing(boolean ignoreGrowing)`

    是否在操作期间忽略 growing segments。

- `timezone(String timezone)`

    用于时间相关过滤器的时区字符串。

- `groupByFieldName(String groupByFieldName)`

    用于对搜索结果进行分组的字段名称。

- `batchSize(long batchSize)`

    迭代器操作的批大小。

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    参数化过滤器的模板变量值映射。

**返回：**

*SearchIteratorV2*

*SearchIteratorV2*

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.orm.iterator.SearchIteratorV2;
import io.milvus.v2.service.vector.request.SearchIteratorReqV2;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.IndexParam;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

// Create a SearchIteratorV2 for paginated vector search.
// V2 is recommended over V1: 20-30% faster with better recall.
SearchIteratorV2 searchIterator = client.searchIteratorV2(SearchIteratorReqV2.builder()
        .collectionName("my_collection")
        .outputFields(Arrays.asList("userAge"))
        .batchSize(50)
        .vectorFieldName("userFace")
        .vectors(Collections.singletonList(new FloatVec(queryVector)))
        .filter("userAge > 10 && userAge < 20")
        .searchParams(new HashMap<>())
        .limit(120)
        .metricType(IndexParam.MetricType.L2)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

// Iterate through search results
int counter = 0;
while (true) {
    List<SearchResp.SearchResult> res = searchIterator.next();
    if (res.isEmpty()) {
        searchIterator.close();
        break;
    }
    for (SearchResp.SearchResult result : res) {
        System.out.println(result);
        counter++;
    }
}
System.out.printf("%d search results returned%n", counter);
```
