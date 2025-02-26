---
title: "ASCII folding | Cloud"
slug: /ascii-folding-filter
sidebar_label: "ASCII folding"
beta: PUBLIC
notebook: FALSE
description: "`asciifolding` 过滤器将基本拉丁Unicode块（前127个ASCII字符）之外的字符转换为其ASCII等效字符。例如，它将字符如 í 转换为 i，使得文本处理更加简单和一致，特别是对于多语言内容。 | Cloud"
type: origin
token: AzqdwhBW5ixVLMk1IRecqHCvnfa
sidebar_position: 2
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

# ASCII folding

`asciifolding` 过滤器将[基本拉丁Unicode块](https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block))（前127个ASCII字符）之外的字符转换为其ASCII等效字符。例如，它将字符如 í 转换为 i，使得文本处理更加简单和一致，特别是对于多语言内容。

## 配置{#configuration}

`asciifolding` 过滤器内置于 Zilliz Cloud。要使用它，只需在 `analyzer_params` 的过滤器部分指定其名称。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["asciifolding"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("asciifolding"));
```

</TabItem>
</Tabs>

`asciifolding` 过滤器作用于分词器生成的词项，因此必须与分词器结合使用。有关 Zilliz Cloud 中可用的分词器列表，请参阅[分词器参考](./analyzer-tokenizers)。

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅[使用示例](./analyzer-overview#example-use)。  

## 示例输出{#example-output}

以下是 `asciifolding` 过滤器处理文本的示例：  

**原始文本**：  

```python
"Café Möller serves crème brûlée and piñatas."
```

**预期输出**：  

```python
["Cafe", "Moller", "serves", "creme", "brulee", "and", "pinatas"]
```

