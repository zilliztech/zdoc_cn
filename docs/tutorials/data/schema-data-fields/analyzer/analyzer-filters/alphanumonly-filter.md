---
title: "Alphanumonly | Cloud"
slug: /alphanumonly-filter
sidebar_label: "Alphanumonly"
beta: PUBLIC
notebook: FALSE
description: "`alphanumonly` 过滤器删除包含非ASCII字符的词项，仅保留字母数字词项。该过滤器在处理仅与基本字母和数字相关的文本时非常有用，排除任何特殊字符或符号。 | Cloud"
type: origin
token: FnxIwZq7wi8N8Kk2GbqcTeHXnsb
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - schema
  - 标量字段
  - 分析器
  - analyzer
  - tokenizer
  - filter

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Alphanumonly

`alphanumonly` 过滤器删除包含非ASCII字符的词项，仅保留字母数字词项。该过滤器在处理仅与基本字母和数字相关的文本时非常有用，排除任何特殊字符或符号。

## 配置{#configuration}

`alphanumonly` 过滤器内置于 Zilliz Cloud。要使用它，只需在 `analyzer_params` 的过滤器部分指定其名称。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["alphanumonly"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("alphanumonly"));
```

</TabItem>
</Tabs>

`alphanumonly` 过滤器作用于分词器生成的词项，因此必须与分词器结合使用。有关 Zilliz Cloud 中可用的分词器列表，请参阅[分词器参考](./analyzer-tokenizers)。

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅 [Analyzer 概述](./analyzer-overview)。  

## 示例输出{#example-output}

以下是 `alphanumonly` 过滤器处理文本的示例：  

**原始文本**：  

```python
"Milvus 2.0 @ Scale! #AI #Vector_Databasé"
```

**预期输出**：  

```python
["Milvus", "2", "0", "Scale", "AI", "Vector"]
```

