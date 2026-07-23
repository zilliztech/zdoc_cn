---
title: "BoostRanker | Java | v2"
slug: /java/java/v2-Function-BoostRanker
sidebar_label: "BoostRanker"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "BoostRanker 继承自 Function 类，并提供额外参数。| Java | v2"
type: docx
token: QO5ldltYOoo5uFxS4ZJc24JWnUh
sidebar_position: 1
keywords: 
  - 什么是 Milvus
  - Milvus 数据库
  - Milvus Lite
  - Milvus benchmark
  - zilliz
  - Zilliz Cloud
  - 云
  - BoostRanker
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# BoostRanker

BoostRanker 继承自 **Function** 类，并提供额外参数。

```java
public class BoostRanker extends CreateCollectionReq.Function
```

## 请求语法\{#request-syntax}

```java
BoostRanker.builder()
    .name(String name)
    .description(String description)
    .inputFieldNames(List<String> inputFieldNames)
    .params(Map<String, String> params)
    .filter(String filter)
    .weight(Float weight)
    .randomScoreSeed(Long randomScoreSeed)
    .randomScoreField(String randomScoreField)
    .build()
```

**BUILDER 方法：**

- `name(String name)`

    函数的名称。此标识符用于在查询和 collection 中引用该函数。

- `description(String description)`

    对函数用途的简要描述。这对于大型项目中的文档或清晰性很有用，默认值为空字符串。

- `inputFieldNames(List<String> inputFieldNames)`

    包含原始数据且需要转换为 vector 表示的字段名称。对于使用 `FunctionType.RERANK` 的函数，此参数仅接受一个字段名称。

- `params(Map<String, String> params)`

    一组用于配置函数属性的键值对。

- `filter(String filter)`

    将用于在搜索结果实体中匹配实体的过滤表达式。它可以是 [Filtering Explained](https://milvus.io/docs/boolean.md) 中提到的任何有效基本过滤表达式。

    <Admonition type="info" icon="📘" title="Notes">

    仅使用基本运算符，例如 `==`、`>` 或 `<`。使用高级运算符（例如 `text_match` 或 `phrase_match`）会降低搜索性能。

    </Admonition>

- `weight(Float weight)`

    将与原始搜索结果中任何匹配实体的分数相乘的权重。

    该值应为浮点数。

    - 若要强调匹配实体的重要性，请将其设置为能够提升分数的值。

    - 若要降低匹配实体的排序，请为此参数指定一个降低其分数的值。

- `randomScoreSeed(Long randomScoreSeed)`

    与 `randomScoreField(String randomScoreField)` 配合使用的随机函数，用于随机生成介于 `0` 和 `1` 之间的值。

    你应指定一个初始值来启动伪随机数生成器（PRNG）。

- `randomScoreField(String randomScoreField)`

    与 `randomScoreSeed(Long randomScoreSeed)` 配合使用的随机函数，用于随机生成介于 `0` 和 `1` 之间的值。

    你应指定一个字段名称，其值将用作生成随机数时的随机因子。具有唯一值的字段即可满足要求。

**返回类型：**

*BoostRanker*

**返回：**

一个 boost ranker 实例。

## 示例：\{#examples}

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.BoostRanker
import java.util.Collections;

// use the ModelRanker class
BoostRanker boost = BoostRanker.builder()
    .name("xxx_boost")
    .description("boost on xxx")
    .filter("xxx == 2")
    .weight(0.5)
    .randomScoreSeed(123)
    .randomScoreField("id")
    .build()
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function boost = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .name("xxx_boost")
    .description("boost on xxx")
    .param("reranker", "boost")
    .param("filter", "xxx == 2")
    .param("weight", "0.5")
    .param("random_score", "{\"seed\": 123, \"field\": \"id\"}")
    .build();
```

