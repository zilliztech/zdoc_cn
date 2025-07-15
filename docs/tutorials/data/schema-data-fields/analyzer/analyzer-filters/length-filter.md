---
title: "Length | Cloud"
slug: /length-filter
sidebar_label: "Length"
beta: FALSE
notebook: FALSE
description: "`length` 过滤器删除不符合指定长度要求的词项，使您能够控制在文本处理过程中保留的词项长度。 | Cloud"
type: origin
token: C1J1w3XqqiSMH9kTTcTcBjVZnOh
sidebar_position: 6
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

# Length

`length` 过滤器删除不符合指定长度要求的词项，使您能够控制在文本处理过程中保留的词项长度。

## 配置{#configuration}

`length` 过滤器是 Zilliz Cloud 中的自定义过滤器，通过在过滤器配置中设置 `"type": "length"` 来指定。您可以将其配置为分析器参数中的字典，以定义长度限制。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter":[{
        "type": "length", # Specifies the filter type as length
        "max": 10, # Sets the maximum token length to 10 characters
    }],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter",
    Collections.singletonList(new HashMap<String, Object>() {{
        put("type", "length");
        put("max", 10);
}}));
```

</TabItem>
</Tabs>

`length` 过滤器接受以下可选参数。

<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><code>max</code></p></td>
     <td><p>设置词元的最大长度。长度大于 <code>max</code> 的词元将会被移除，不会出现在分词结果中。</p></td>
   </tr>
</table>

`length` 过滤器作用于分词器生成的词项，因此必须与分词器结合使用。有关 Zilliz Cloud 中可用的分词器列表，请参阅[分词器参考](./analyzer-tokenizers)。

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅[使用示例](./analyzer-overview#example-use)。  

## 示例输出{#example-output}

以下是 `length` 过滤器处理文本的示例：  

**原始文本**：  

```python
"The length filter allows control over token length requirements for text processing."
```

**预期输出**（`max: 10`）：  

```python
["length", "filter", "allows", "control", "over", "token", "length", "for", "text"]
```

