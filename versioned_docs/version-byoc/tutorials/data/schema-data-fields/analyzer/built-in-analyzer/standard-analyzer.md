---
title: "Standard | Cloud"
slug: /standard-analyzer
sidebar_label: "Standard"
beta: FALSE
notebook: FALSE
description: "Standard Analyzer 是 Zilliz Cloud 中的默认 Analyzer ，如果未指定 Analyzer ，它将自动应用于文本字段。它使用基于语法的分词，因此对大多数语言都有效。 | Cloud"
type: origin
token: ZdWIwmiQCiKcIlkAHAZc1tDSngs
sidebar_position: 1
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

# Standard

Standard Analyzer 是 Zilliz Cloud 中的默认 Analyzer ，如果未指定 Analyzer ，它将自动应用于文本字段。它使用基于语法的分词，因此对大多数语言都有效。  

## 定义{#definition}

Standard Analyzer由以下部分组成：  

- **分词器**：使用标准分词器根据语法规则将文本拆分为离散的单词单元。

- **过滤器**：使用小写过滤器将所有词元转换为小写，以实现不区分大小写的搜索。

Standard Analyzer 的功能等同于以下自定义 Analyzer 配置：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["lowercase"]
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");
analyzerParams.put("filter", Collections.singletonList("lowercase"));
```

</TabItem>
</Tabs>

## 配置{#configuration}

要将 Standard Analyzer 应用于字段，只需在 `analyzer_params` 中将 `type` 设置为 `standard`，并根据需要包含可选参数。  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "standard", # 指定Standard Analyzer类型
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "standard");
```

</TabItem>
</Tabs>

Standard Analyzer 接受以下可选参数：  

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>stop_words</code></p></td>
     <td><p>包含停用词列表的数组，这些词将在分词过程中被移除。默认为 <code>_english_</code>，即内置的常见英文停用词集合。</p></td>
   </tr>
</table>

自定义停用词的配置示例：  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "standard", # 指定Standard Analyzer类型
    "stop_words": ["of"] # 可选：分词过程中要排除的单词列表
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "standard");
analyzerParams.put("stop_words", Collections.singletonList("of"));
```

</TabItem>
</Tabs>

定义 `analyzer_params` 后，您可以在定义集合模式时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的 Analyzer 处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅[使用示例](./analyzer-overview#example-use)。  

## 示例输出{#example-output}

以下是 Standard Analyzer 处理文本的方式。  

**原始文本**：  

```python
"The Milvus vector database is built for scale!"
```

**预期输出**：  

```python
["the", "milvus", "vector", "database", "is", "built", "for", "scale"]
```
