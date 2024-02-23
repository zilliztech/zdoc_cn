---
slug: /estimate-pipelines-usage
beta: FALSE
notebook: FALSE
token: TNwlw4PRxiFoewkSQzhcU06BnyA
sidebar_position: 5
---

import Admonition from '@theme/Admonition';


# 估算 Pipelines 用量

运行 Pipelines 的成本以 Token 数作为度量单位。类似于使用 Token 作为基本单位的大型语言模型（LLM），Pipeline 通过将文本转化为向量并解析为一系列 Token 来处理文档和搜索查询。您可以使用我们的用量估算工具来计算文件或文本字符串的 Token 数量。

<Admonition type="info" icon="📘" title="说明">

<p>工具使用字节对编码（BPE）分词器，用量估算结果可能会根据不同的处理策略有 30% 的浮动。估算结果仅供参考。实际用量，请参考 <a href="./manage-pipelines#on-web-ui">Pipelines 列表</a>。</p>

</Admonition>

## 什么是 tokens？{#what-are-tokens}

Token 是自然语言处理（NLP）中的一个特殊概念。它可以被看作是一个子词。一些词本身就是一个 Token，而一些较长的词可能包含多个 Token。Token 长度也与语言有关。一般来说，

- 1 个 Token = 3~4 个英文字符

- 1 个 Token = 1.12 个中文字符

- 1 个英文单词包含 1.3 个 Token

## Pipelines 如何处理 Token？{#how-is-the-token-processed-by-pipelines}

[Ingestion Pipeline](./understanding-pipelines#ingestion-pipelines) 通过将文件解析为 Token，然后将 Token 序列拆分并转化为向量，从而完成处理文档。

[Search Pipeline](./understanding-pipelines#search-pipelines) 通过将 Token 序列转化为向量来处理查询。通过将 Token 传入深度学习模型（称为 Embedding 模型），文本的“本质含义”被转换为向量表示，这可以被存储并由向量数据库检索。借助这一过程，Pipelines 能够帮助 API 用户理解不同单词及其在句子或文本中的上下文的含义和语义。

[Deletion Pipeline](./understanding-pipelines#deletion-pipelines) 通常不涉及将文本作为 Token 处理。

## 估算 Pipeline 用量{#estimate-pipelines-usage}

为了帮助您轻松了解 Pipeline 运行的成本，我们提供了一个界面工具，可以估算文件或文本字符串的 Token 数量。您可以在运行 Pipeline 前使用此工具了解运行成本。

![estimate-piplines-usage-tool-entrance-cn](/img/estimate-piplines-usage-tool-entrance-cn.png)

1. 输入

    - Ingestion Pipeline 的输入为文件。您可以直接上传本地文件或导入对象存储中的文件。

        - 上传本地文件

            上传的本地文件大小不得超过 10 MB。支持的文件类型包括 `.txt`、`.pdf`、`.md`、`.html`、`.epub`、`.csv`、`.doc`、`.docx`、`.xls`、`.xlsx`、`.ppt`、`.pptx`。

        - 从对象存储中导入文件

            输入阿里云 OSS [签名 URL](https://www.alibabacloud.com/help/zh/oss/user-guide/authorize-third-party-users-to-download-objects?spm=a2c63.p38356.0.0.590c2cb74gHqev#section-fnd-m6v-bff)。每次只可输入 1 个 URL。

    - Search Pipeline 的输入为字符串。您可以直接在输入框中输入文本。

        <Admonition type="info" icon="📘" title="说明">

        <p>您可最多输入 100,000 个字符。</p>

        </Admonition>

1. 点击**计算**。

    ![estimate-piplines-usage-cn](/img/estimate-piplines-usage-cn.png)

1. 查看文件 Token 数量估算结果。

1. 点击**重置**重新上传其他本地文件。

## 相关文档{#related-topics}

- [运行 Pipelines](./run-pipelines)

- [使用限制](./limits#pipelines)

