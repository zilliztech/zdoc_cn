---
title: "describe | Cloud"
slug: /cli/cli/Job-describe
sidebar_label: "describe"
beta: false
added_since: v0.1.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作获取异步 job（backup、restore、migration、import 等）的状态。 | Cloud"
type: docx
token: HrwTdhnBeoZwoBxokBJcQZWznKh
sidebar_position: 1
keywords: 
  - 密集 embedding
  - Faiss vector database
  - Chroma vector database
  - nlp search
  - zilliz
  - zilliz cloud
  - cloud
  - describe
  - cliv14
displayed_sidebar: cliSidebar

displayed_sidbar: cliSidebar
---

import Admonition from '@theme/Admonition';


# describe

此操作获取异步 job（backup、restore、migration、import 等）的状态。

## 概要\{#synopsis}

```bash
zilliz job describe
--job-id <value>
[--wait]
[--timeout <value>]
[--interval <value>]
[--output <value>]
```

## 选项\{#options}

- **--job-id** (*string*) -

    **[必需]**

    表示 Job ID。例如，`job-xxxxxxxxxxxxxxxxxxxx`。

- **--wait** (*boolean*) -

    表示是否等待，直到 job 达到终止状态。

- **--timeout** (*integer*) -

    表示等待的最大秒数。该值默认为 `1800`。

- **--interval** (*integer*) -

    表示轮询间隔（以秒为单位）。该值默认为 5，表示 Zilliz Cloud 每 5 秒获取一次指定 job 的状态。

- **--output, -o** (*string*) -

    表示输出格式。可选值：`json`、`table`、`text`、`yaml`、`csv`。

## 示例\{#example}

```bash
zilliz job describe --job-id job-xxxxxx
```
