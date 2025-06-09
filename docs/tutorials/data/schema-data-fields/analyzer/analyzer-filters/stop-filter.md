---
title: "Stop | Cloud"
slug: /stop-filter
sidebar_label: "Stop"
beta: FALSE
notebook: FALSE
description: "`stop` 过滤器删除分词文本中的指定停用词，帮助消除常见且意义不大的词。您可以使用 `stopwords` 参数配置停用词列表。 | Cloud"
type: origin
token: PcaswIdMjiPOrAkyA0uc5aXOn0b
sidebar_position: 7
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

# Stop

`stop` 过滤器删除分词文本中的指定停用词，帮助消除常见且意义不大的词。您可以使用 `stop_words` 参数配置停用词列表。

## 配置{#configuration}

`stop` 过滤器是 Zilliz Cloud 中的自定义过滤器，通过在过滤器配置中设置 `"type": "stop"` 来指定。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter":[{
        "type": "stop", # Specifies the filter type as stop
        "stop_words": ["of", "to", "_english_"], # Defines custom stop words and includes the English stop word list
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
                    put("type", "stop");
                    put("stop_words", Arrays.asList("of", "to", "_english_"));
                }}
        )
);
```

</TabItem>
</Tabs>

`stop` 过滤器接受以下可选参数。

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>stop_words</code></p></td>
     <td><p>要从分词中移除的单词列表。默认情况下，使用预定义的 <code>_english_</code> 列表，其中包含常见的英语停用词。有关 <code>_english_</code> 的详细信息，请查看<a href="https://github.com/milvus-io/milvus/blob/master/internal/core/thirdparty/tantivy/tantivy-binding/src/stop_words.rs">这里</a>。</p></td>
   </tr>
</table>

`stop` 过滤器作用于分词器生成的词项，因此必须与分词器结合使用。有关 Zilliz Cloud 中可用的分词器列表，请参阅[分词器参考](./analyzer-tokenizers)。

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅[使用示例](./analyzer-overview#example-use)。  

## 示例输出{#example-output}

以下是 `stop` 过滤器处理文本的示例：  

**原始文本**：  

```python
"The stop filter allows control over common stop words for text processing."
```

**预期输出**（`stop_words:["the","over","_english_"]`）：  

```python
["The", "stop", "filter", "allows", "control", "common", "stop", "words", "text", "processing"]
```

