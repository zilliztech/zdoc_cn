---
title: "Whitespace | Cloud"
slug: /whitespace-tokenizer
sidebar_label: "Whitespace"
beta: PUBLIC
notebook: FALSE
description: "空格分词器在单词之间存在空格时，将文本划分为词项。 | Cloud"
type: origin
token: DUzAwFTRNidwUlkgWSicIeDKndb
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

# Whitespace

空格分词器在单词之间存在空格时，将文本划分为词项。

## 配置{#configuration}

要使用空格分词器配置分析器，请在 `analyzer_params` 中将 `tokenizer` 设置为 `whitespace`。 

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "whitespace",
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
```

</TabItem>
</Tabs>

空格分词器可以与一个或多个过滤器结合使用。例如，以下代码定义了一个使用空格分词器和小写过滤器的分析器：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "whitespace",
    "filter": ["lowercase"]
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "whitespace");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

</TabItem>
</Tabs>

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅 [Analyzer 概述](./analyzer-overview)。  

## 示例输出{#example-output}

以下是空格分词器处理文本的示例：  

**原始文本**：  

```python
"The Milvus vector database is built for scale!"
```

**预期输出**：  

```python
["The", "Milvus", "vector", "database", "is", "built", "for", "scale"]
```

