---
title: "Chinese | Cloud"
slug: /chinese-analyzer
sidebar_label: "Chinese"
beta: FALSE
notebook: FALSE
description: "Chinese Analyzer 专门设计用于处理中文文本，提供有效的分段和分词。 | Cloud"
type: origin
token: UlMPwmPO5iJBn1kDTLzc5cJVnXO
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

# Chinese

Chinese Analyzer 专门设计用于处理中文文本，提供有效的分段和分词。

## 定义{#definition}

Chinese Analyzer 由以下部分组成：

- 分词器：使用 `jieba` 分词器根据词汇和上下文将中文文本分割成标记。

- 过滤器：使用 `cnalphanumonly` 过滤器去除包含任何非中文字符的标记。

Chinese Analyzer 的功能等同于以下自定义分析器配置：

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "tokenizer": "jieba",
    "filter": ["cnalphanumonly"]
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("tokenizer", "jieba");
analyzerParams.put("filter", Arrays.asList("cnalphanumonly"));
```

</TabItem>
</Tabs>

## 配置{#configuration}

要将 Chinese Analyzer 应用于字段，只需在 `analyzer_params` 中将 `type` 设置为 `chinese`，并根据需要包含可选参数。  

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
analyzer_params = {
    "type": "chinese",
}
```

</TabItem>

<TabItem value='java'>

```java
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "chinese");
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>Chinese Analyzer 不接受任何可选参数。</p>

</Admonition>

## 示例输出{#example-output}

以下是 Chinese Analyzer 处理文本的方式。  

**原始文本**：  

```python
"Milvus 是一个高性能、可扩展的向量数据库！"
```

**预期输出**：  

```python
["Milvus", "是", "一个", "高性", "性能", "高性能", "可", "扩展", "的", "向量", "数据", "据库", "数据库"]
```

