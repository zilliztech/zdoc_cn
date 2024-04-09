---
slug: /reranker
beta: FALSE
notebook: FALSE
type: origin
token: W81AwLbUmieD4pklJTackrpCnUe
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# Reranker

在信息检索（Information retrieval）任务中，Reranker 可以获取粗排召回，如向量近似最近邻搜索（Approximate Nearest Neighbor，ANN）的搜索结果与查询的相关性评分，对搜索结构进行重新排序。这能够帮助提高搜索结果的整体质量，从而使大语言模型（LLM）在 RAG 流程中优先考虑与查询最相关的文档。使用 Reranker 是提高 RAG 应用程序答案质量的有效方法。需要注意的是，Reranker 的运算成本较高，因此会增加查询延迟造成更高的花费。

## Reranker 是什么？{#what-is-reranker}

![what-is-a-reranker](/img/what-is-a-reranker.png)

Reranker 是经过训练的机器学习模型，用于更准确地评估查询文本与特定文档之间的语义相关性。成熟的信息检索系统，如网页搜索或推荐系统通常由两个阶段组成：粗排召回和精排（Reranker）。粗排召回阶段通常利用向量近似最近邻（ANN）搜索，高效地筛选大量数据集以找到相关信息，例如从数百万个选项中检索出前 20 个候选项。获取了初始检索结果后，Reranker 就会进一步根据与查询文本的相关性对排名进行修正。然后，从 Rerank 过的列表中选择一部分，比如前 5 个，最终提供质量更高的搜索结果。

## Reranker 模型在 RAG 中的作用{#using-reranker-in-rag-application}

RAG pipeline 一般分为两个阶段。首先是召回阶段，负责检索与用户提问相关的知识片段。然后是生成阶段，LLM 利用这些召回的知识片段生成回答。前面的知识召回阶段对于提供给 LLM 的上下文质量非常重要。在召回阶段中，Reranker 十分关键，可以提升召回效果，从而提高 RAG 应用的回答效果。

下图展示了 Reranker 在 RAG pipeline 中的作用：

![reranker-in-rag-application](/img/reranker-in-rag-application.png)

## 什么情况下应该使用 Reranker？{#when-to-use-reranker}

这些粗排召回阶段是从海量的数据中进行召回，要求速度快，但可以允许一定误差。因此，在实际场景中，通常采用一些快速召回方法，例如基于近似最近邻的向量搜索算法（ANN），可以多召回一些候选结果，允许存在一定错误的候选项。这一阶段通常进行非常高效，也能够得到还算不错的结果。

相比之下，Rerank 阶段有时不是十分必要。然而，对质量标准有严格要求的应用程序而言，可以选择集成一个 Reranker 模型以增强搜索质量，尽管这会增加计算开销并导致更长的搜索延迟。使用 Reranker 模型通常会使搜索查询的延迟增加 100 毫秒至几秒，具体取决于 topK 的大小。在粗排召回结果包含不正确或不相关文档的情况下，使用 Reranker 可以有效地将它们过滤掉，从而提高最终得到的LLM答案的质量。

根据您所搭建的应用，您可以选择是否在 [Search pipeline](./create-search-pipelines) 中启用 Reranker。

![add-function-to-search-pipeline-cn](/img/add-function-to-search-pipeline-cn.png)

