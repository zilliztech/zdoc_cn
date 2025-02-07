---
title: "Cnalphanumonly | Cloud"
slug: /cnalphanumonly-filter
sidebar_label: "Cnalphanumonly"
beta: PUBLIC
notebook: FALSE
description: "`cnalphanumonly` 过滤器删除包含除汉字、英文字母或数字以外的任何字符的词项。 | Cloud"
type: origin
token: S20fwoua2ifNgPkAY9mcihIGnxc
sidebar_position: 4
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

# Cnalphanumonly

`cnalphanumonly` 过滤器删除包含除汉字、英文字母或数字以外的任何字符的词项。

## 配置{#configuration}

`cnalphanumonly` 过滤器内置于 Zilliz Cloud。要使用它，只需在 `analyzer_params` 的过滤器部分指定其名称。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "standard",
    "filter": ["cnalphanumonly"],
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "standard");
analyzerParams.put("filter", Collections.singletonList("cnalphanumonly"));
```

</TabItem>
</Tabs>

`cnalphanumonly` 过滤器作用于分词器生成的词项，因此必须与分词器结合使用。有关 Zilliz Cloud 中可用的分词器列表，请参阅[分词器参考](./analyzer-tokenizers)。

定义 `analyzer_params` 后，您可以在定义 Collection Schema 时将其应用于 VARCHAR 字段。这使得 Zilliz Cloud 能够使用指定的分析器处理该字段中的文本，以实现高效的分词和过滤。更多信息，请参阅 [Analyzer 概述](./analyzer-overview)。  

## 示例输出{#example-output}

以下是 `cnalphanumonly` 过滤器处理文本的示例：  

**原始文本**：  

```python
"Milvus 是 LF AI & Data Foundation 下的一个开源项目，以 Apache 2.0 许可发布。"
```

**预期输出**：  

```python
["Milvus", "是", "LF", "AI", "Data", "Foundation", "下", "的", "一个", "开源", "项目", "以", "Apache", "2.0", "许可", "发布"]
```

