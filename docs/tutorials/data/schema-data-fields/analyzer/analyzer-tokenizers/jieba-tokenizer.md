---
title: "Jieba | Cloud"
slug: /jieba-tokenizer
sidebar_label: "Jieba"
beta: PUBLIC
notebook: FALSE
description: "Jieba 分词器通过将中文文本拆分为其组成的单词来处理文本。 | Cloud"
type: origin
token: Hfcrw0GogiQCGwkn9mlcKJVSnSh
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

# Jieba

Jieba 分词器通过将中文文本拆分为其组成的单词来处理文本。

## 配置{#configuration}

要使用 Jieba 分词器配置分析器，请在 `analyzer_params` 中将 `tokenizer` 设置为 `jieba`。 

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "jieba",
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
```

</TabItem>
</Tabs>

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅[使用示例](./analyzer-overview#example-use)。  

## 示例输出{#example-output}

以下是 Jieba 分词器处理文本的示例：  

**原始文本**：  

```python
"Milvus 是一个高性能、可扩展的向量数据库！"
```

**预期输出**：  

```python
["Milvus", " ", "是", "一个", "高性", "性能", "高性能", "、", "可", "扩展", "的", "向量", "数据", "据库", "数据库", "！"]
```

