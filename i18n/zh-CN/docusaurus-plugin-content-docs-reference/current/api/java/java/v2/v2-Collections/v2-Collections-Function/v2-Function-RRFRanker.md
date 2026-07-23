---
title: "RRFRanker | Java | v2"
slug: /java/java/v2-Function-RRFRanker
sidebar_label: "RRFRanker"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "RRFRanker 类继承自 Function 类，并提供额外参数。| Java | v2"
type: docx
token: FuSTdeSCdojDu0xSBEmcYgv9n4g
sidebar_position: 6
keywords: 
  - milvus
  - Zilliz
  - milvus vector database
  - milvus db
  - zilliz
  - zilliz cloud
  - cloud
  - RRFRanker
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# RRFRanker

**RRFRanker** 类继承自 **Function** 类，并提供额外参数。

```java
public class RRFRanker extends CreateCollectionReq.Function
```

## 请求语法\{#request-syntax}

```java
RRFRanker.builder()
    .name(String name)
    .description(String description)
    .params(Map<String, String> params)
    .k(int k)
    .build()
```

**构建器方法：**

- `name(String name)`

    function 的名称。该标识符用于在查询和 collection 中引用该 function。

- `description(String description)`

    对 function 用途的简要描述。这有助于在较大的项目中进行文档说明或提高清晰度，默认值为空字符串。

- `params(Map<String, String> params)`

    用于配置 function 属性的一组键值对。

- `k(int k)`

    一个平滑参数，用于控制文档排名的影响；较高的 `k` 会降低对靠前排名的敏感度。取值范围为 `1` 到 `16383`，默认值为 `60`。 

**返回类型：**

*RRFRanker*

**返回：**

一个 RRF ranker 实例。

## 示例：\{#examples}

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.RRFRanker
import java.util.Collections;

// use the RRFRanker class
RRFRanker.builder()
    .k(60)
    .build());
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function rr = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .param("strategy", "rrf")
    .param("params", "{\"k\": 60}")
    .build();
```

