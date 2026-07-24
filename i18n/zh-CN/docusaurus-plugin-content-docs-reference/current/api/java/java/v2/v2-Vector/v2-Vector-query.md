---
title: "query() | Java | v2"
slug: /java/java/v2-Vector-query
sidebar_label: "query()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "通过主键或过滤器查询实体，并可通过 `orderByFields` 进行可选排序。| Java | v2"
type: docx
token: U7eQdBzB0opJOXxRUcncnRDInSf
sidebar_position: 5
keywords: 
  - Chroma vector database
  - nlp search
  - hallucinations llm
  - 多模态搜索
  - zilliz
  - zilliz cloud
  - cloud
  - query()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# query()

通过主键或过滤器查询实体，并可通过 `orderByFields` 进行可选排序。

```java
public QueryResp query(QueryReq request)
```

## 请求语法\{#request-syntax}

```java
// include-start milvus
QueryReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionNames(partitionNames)
    .outputFields(outputFields)
    .ids(ids)
    .filter(filter)
    .consistencyLevel(consistencyLevel)
    .offset(offset)
    .limit(limit)
    .ignoreGrowing(ignoreGrowing)
    .timezone(timezone)
    .orderByFields(orderByFields)
    .queryParams(queryParams)
    .filterTemplateValues(filterTemplateValues)
    .build();
// include-end
// include-start zilliz
QueryReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .clusterId(clusterId)
    .partitionNames(partitionNames)
    .outputFields(outputFields)
    .ids(ids)
    .filter(filter)
    .consistencyLevel(consistencyLevel)
    .offset(offset)
    .limit(limit)
    .ignoreGrowing(ignoreGrowing)
    .timezone(timezone)
    .orderByFields(orderByFields)
    .queryParams(queryParams)
    .filterTemplateValues(filterTemplateValues)
    .build();
// include-end
```

**BUILDER 方法：**

- `databaseName(String databaseName)`

    数据库名称。省略时默认为当前数据库。

- `collectionName(String collectionName)`

    目标 collection 的名称。

- `clusterId(String clusterId)`

    此请求的 Zilliz Cloud 集群 ID。

- `partitionNames(List<String> partitionNames)`

    要查询的 partition。

- `outputFields(List<String> outputFields)`

    每个返回行中要包含的字段。

- `ids(List<Object> ids)`

    要查询的主键值。

- `filter(String filter)`

    标量过滤表达式。

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    查询的一致性级别。

- `offset(long offset)`

    要跳过的匹配行数。

- `limit(long limit)`

    返回的最大行数。

- `ignoreGrowing(boolean ignoreGrowing)`

    是否忽略 Growing Segment。

- `timezone(String timezone)`

    用于解释时间表达式的时区。

- `orderByFields(List<OrderByField> orderByFields)`

    用于对匹配行进行排序的标量字段和方向。

- `queryParams(Map<String, Object> queryParams)`

    其他查询参数。

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    替换过滤表达式中占位符的值。

**返回：**

*QueryResp*

如果提供了 `orderByFields`，则包含按其排序的查询行。

**异常：**

- **MilvusClientException**

    当请求验证、传输或服务器执行失败时抛出。请查看异常消息以获取确切的失败原因。

## 示例\{#example}

演示如何对 Zilliz Cloud 集群执行 query()。

```java
// include-start milvus
QueryResp response = client.query(QueryReq.builder()
    .collectionName("books")
    .orderByFields(Collections.singletonList(OrderByField.builder()
        .fieldName("published_year")
        .direction(AggDirection.DESC)
        .build()))
    .limit(10)
    .build());
// include-end
// include-start zilliz
QueryResp response = client.query(QueryReq.builder()
    .collectionName("books")
    .clusterId(CLUSTER_ID)
    .orderByFields(Collections.singletonList(OrderByField.builder()
        .fieldName("published_year")
        .direction(AggDirection.DESC)
        .build()))
    .limit(10)
    .build());
// include-end
```
