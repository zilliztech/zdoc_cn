---
title: "query() | Java | v2"
slug: /java/java/v2-Vector-query
sidebar_label: "query()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作使用指定的布尔表达式执行标量过滤。 | Java | v2"
type: docx
token: U7eQdBzB0opJOXxRUcncnRDInSf
sidebar_position: 5
keywords: 
  - Chroma 向量数据库
  - NLP 搜索
  - LLM 幻觉
  - 多模态搜索
  - zilliz
  - Zilliz Cloud
  - 云
  - query()
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# query()

此操作使用指定的布尔表达式执行标量过滤。

```java
public QueryResp query(QueryReq request)
```

## 请求语法\{#request-syntax}

```java
query(QueryReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionNames(List<String> partitionNames)
    .outputFields(List<String> outputFields)
    .ids(List<Object> ids)
    .filter(String filter)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .offset(long offset)
    .limit(long limit)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .queryParams(Map<String, Object> queryParams)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
);
```

**构建器方法：**

- `databaseName(String databaseName)`

    数据库的名称。如果未指定，则默认为当前数据库。

- `collectionName(String collectionName)`

    目标集合的名称。

- `clusterId(String clusterId)`

    此向量读取请求的目标集群 ID。当多个请求应共享同一个集群 ID 时，请使用 `session(String clusterId)`。

- `partitionNames(List<String> partitionNames)`

    要作为目标的分区名称列表。

- `outputFields(List<String> outputFields)`

    要包含在输出中的字段名称列表。

- `ids(List<Object> ids)`

    用于标识特定实体的主键值列表。

- `filter(String filter)`

    用于过滤结果的布尔表达式。

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    操作的一致性级别。

- `offset(long offset)`

    返回结果前要跳过的结果数量。

- `limit(long limit)`

    要返回的最大结果数量。

- `ignoreGrowing(boolean ignoreGrowing)`

    是否在操作期间忽略增长段。

- `timezone(String timezone)`

    用于时间相关过滤器的时区字符串。

- `queryParams(Map<String, Object> queryParams)`

    作为键值对的其他查询参数。默认值为 `new HashMap<>()`。

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    用于参数化过滤器的模板变量值映射。

**返回：**

*QueryResp*

一个 **QueryResp** 对象，表示包含指定输出字段的特定查询结果

**异常：**

- **MilvusClientException**

    当此操作期间发生任何错误时，将抛出此异常。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("YOUR_CLUSTER_ENDPOINT")
        .token("YOUR_CLUSTER_TOKEN")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Query by filter "id < 10"
QueryReq queryReq = QueryReq.builder()
        .collectionName("test")
        .filter("id < 10")
        .build();
QueryResp queryResp = client.query(queryReq);
for (QueryResp.QueryResult result : queryResp.getGetResults()) {
    System.out.println(result.getEntity());
}
```
