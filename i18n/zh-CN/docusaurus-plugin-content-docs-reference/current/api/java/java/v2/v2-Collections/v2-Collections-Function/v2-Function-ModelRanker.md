---
title: "ModelRanker | Java | v2"
slug: /java/java/v2-Function-ModelRanker
sidebar_label: "ModelRanker"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "ModelRanker 类继承自 Function 类，并提供额外参数。| Java | v2"
type: docx
token: IW5SdBOhUop0P8xBslCc6OHLnse
sidebar_position: 5
keywords: 
  - vector db 对比
  - openai vector db
  - 自然语言处理数据库
  - 低成本 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - ModelRanker
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# ModelRanker

**ModelRanker** 类继承自 **Function** 类，并提供额外参数。

```java
public class ModelRanker extends CreateCollectionReq.Function
```

## 请求语法\{#request-syntax}

```java
ModelRanker.builder()
    .name(String name)
    .description(String description)
    .inputFieldNames(List<String> inputFieldNames)
    .params(Map<String, String> params)
    .provider(String provider)
    .queries(List<String> queries)
    .endpoint(String endpoint)
    .build()
```

**构建器方法：**

- `name(String name)`

    函数的名称。此标识符用于在查询和 collection 中引用该函数。

- `description(String description)`

    对函数用途的简短描述。这对于大型项目中的文档或清晰性很有用，默认值为空字符串。

- `inputFieldNames(List<String> inputFieldNames)`

    包含需要转换为 vector 表示的原始数据的字段名称。对于使用 `FunctionType.RERANK` 的函数，此参数仅接受一个字段名称。

- `params(Map<String, String> params)`

    一组用于配置函数属性的键值对。

    - `max_client_batch_size`(int) -

        单个批次中要处理的最大文档数。较大的值会提高吞吐量，但需要更多内存。默认值为 `32`。

- `provider(String provider)`

    reranking 模型提供商的名称。有关可能的值，请参阅 。

- `queries(List<String> queries)`

    reranking 模型用于计算相关性分数的查询字符串列表。查询字符串的数量必须与搜索操作中的查询数量完全匹配（即使使用 query vector 而不是文本时也是如此）。否则，将报告错误。

- `endpoint(String endpoint)`

    模型服务的 URL。

**返回类型：**

*ModelRanker*

**返回：**

一个模型 ranker 实例。

## 示例：\{#examples}

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.vector.request.ranker.ModelRanker
import java.util.Collections;

// use the ModelRanker class
ModelRanker.builder()
    .function("tei")
    .name("TEI ranker")
    .inputFieldNames(Collections.singletonList("document"))
    .provider("tei")
    .queries("[\"machine learning for time series\"]")
    .endpoint("http://model-service:8080")
    .build());
    
// Instead, you can use the Function class as well
CreateCollectionReq.Function rr = CreateCollectionReq.Function.builder()
    .functionType(FunctionType.RERANK)
    .name("semantic_ranker")
    .description("semantic ranker")
    .inputFieldNames(Collections.singletonList("document"))
    .param("reranker", "model")
    .param("provider", "tei")
    .param("queries", "[\"machine learning for time series\"]")
    .param("endpoint", "http://model-service:8080")
    .build();
```

