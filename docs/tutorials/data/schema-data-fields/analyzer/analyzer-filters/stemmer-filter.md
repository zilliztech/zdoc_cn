---
title: "Stemmer | Cloud"
slug: /stemmer-filter
sidebar_label: "Stemmer"
beta: PUBLIC
notebook: FALSE
description: "`stemmer` 过滤器将单词简化为其基本或根形式（称为词干提取），使得匹配不同变化形式中具有相似意义的单词变得更加容易。`stemmer` 过滤器支持多种语言，允许在各种语言环境中有效地进行搜索和索引。 | Cloud"
type: origin
token: DNLUwvDBWibe0hkIBE2cOixJn7c
sidebar_position: 9
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

# Stemmer

`stemmer` 过滤器将单词简化为其基本或根形式（称为词干提取），使得匹配不同变化形式中具有相似意义的单词变得更加容易。`stemmer` 过滤器支持多种语言，允许在各种语言环境中有效地进行搜索和索引。

## 配置{#configuration}

`stemmer` 过滤器是 Zilliz Cloud 中的自定义过滤器，通过在过滤器配置中设置 `"type": "stemmer"` 并将 `language` 参数设置为您需要的值的方式来指定。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter":[{
        "type": "stemmer", # Specifies the filter type as stemmer
        "language": "english", # Sets the language for stemming to English
    }],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
        Collections.singletonList(
                new HashMap<String, Object>() {{
                    put("type", "stemmer");
                    put("language", "english");
                }}
        )
);
```

</TabItem>
</Tabs>

`stemmer` 过滤器接受以下可选参数。

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>language</code></p></td>
     <td><p>指定词干提取过程的语言。支持的语言包括：<code>"arabic"</code>, <code>"danish"</code>, <code>"dutch"</code>, <code>"english"</code>, <code>"finnish"</code>, <code>"french"</code>, <code>"german"</code>, <code>"greek"</code>, <code>"hungarian"</code>, <code>"italian"</code>, <code>"norwegian"</code>, <code>"portuguese"</code>, <code>"romanian"</code>, <code>"russian"</code>, <code>"spanish"</code>, <code>"swedish"</code>, <code>"tamil"</code>, <code>"turkish"</code></p></td>
   </tr>
</table>

`stemmer` 过滤器作用于分词器生成的词项，因此必须与分词器结合使用。有关 Zilliz Cloud 中可用的分词器列表，请参阅[分词器参考](./analyzer-tokenizers)。

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅[使用示例](./analyzer-overview#example-use)。  

## 示例输出{#example-output}

以下是 `stemmer` 过滤器处理文本的示例：  

**原始文本**：  

```python
"running runs looked ran runner"
```

**预期输出**（`language: "english"`）：  

```python
["run", "run", "look", "ran", "runner"]
```

