---
title: "DecayRanker | Java | v2"
slug: /java/java/v2-Function-DecayRanker
sidebar_label: "DecayRanker"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "DecayRanker 类继承自 Function 类，并提供额外参数。| Java | v2"
type: docx
token: QIpldgpB1oP5IYxNSSdcyRNcn1c
sidebar_position: 2
keywords: 
  - 稀疏向量
  - 向量维度
  - ANN 搜索
  - 什么是向量嵌入
  - zilliz
  - Zilliz Cloud
  - cloud
  - DecayRanker
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# DecayRanker

**DecayRanker** 类继承自 **Function** 类，并提供额外参数。

```java
public class DecayRanker extends CreateCollectionReq.Function
```

## 构造函数\{#constructor}

此构造函数初始化一个新的 `DecayRanker` 实例，用于创建衰减排序器实例。

```java
DecayRanker.builder()
    .name(String name)
    .description(String description)
    .functionType(FunctionType functionType)
    .inputFieldNames(List<String> inputFieldNames)
    .params(Map<String, String> params)
    .function(String function)
    .origin(Number origin)
    .scale(Number scale)
    .offset(Number offset)
    .decay(Number decay)
    .build();
```

**BUILDER 方法：**

- `name(String name)`

    函数名称。此标识符用于在查询和 Collection 中引用该函数。

- `description(String description)`

    函数用途的简要描述。这有助于在大型项目中进行文档说明或提高清晰度，默认值为空字符串。

- `functionType(FunctionType functionType)`

    用于处理原始数据的函数类型。对于 **DecayRanker**，请将其设置为 `FunctionType.RERANK`。

- `inputFieldNames(List<String> inputFieldNames)`

    包含需要转换为向量表示的原始数据的字段名称。对于使用 `FunctionType.RERANK` 的函数，此参数仅接受一个字段名称。

- `params(Map<String, String> params)`

    一组用于配置函数属性的键值对。

- `function(String function)`

    要创建的衰减排序器类型。可能的值为：`gauss`、`exp` 和 `linear`。

- `origin(Number origin)`

    用于计算衰减分数的参考点。处于该值的数据项将获得最高相关性分数。对于基于时间的衰减，时间单位必须与你的 Collection 数据匹配。

- `scale(Number scale)`

    相关性下降到 `decay` 值时的距离或时间。控制相关性下降的速度。对于基于时间的衰减，时间单位必须与你的 Collection 数据匹配。较大的值会使相关性下降更平缓；较小的值会使下降更陡峭。

- `offset(Number offset)`

    `origin` 周围的“无衰减区域”，在该区域内数据项保持满分（衰减分数 = 1.0）。

    对于基于时间的衰减，时间单位必须与你的 Collection 数据匹配。

    位于 `origin` 此范围内的数据项会保持最高相关性。

- `decay(Number decay)`

    在 `scale` 距离处的分数值，用于控制曲线陡峭程度。较低的值会产生更陡峭的下降曲线；较高的值会产生更平缓的下降曲线。

    必须介于 0 和 1 之间。

**返回类型：**

*DecayRanker*

**返回：**

一个衰减排序器实例。

## 示例：\{#examples}

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.DecayRanker
import java.util.Collections;

// use the DecayRanker class
DecayRanker.builder()
    .function("gauss")
    .name("time decay")
    .inputFieldNames(Collections.singletonList("timestamp"))
    .origin(1000)
    .scale(10000)
    .offset(24)
    .decay(0.5)
    .build());
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function rr = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .name("time_decay")
    .description("time decay")
    .inputFieldNames(Collections.singletonList("timestamp"))
    .param("reranker", "decay")
    .param("function", "gauss")
    .param("origin", "1000")
    .param("scale", "10000")
    .param("offset", "24")
    .param("decay", "0.5")
    .build();
```
