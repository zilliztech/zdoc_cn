---
title: "RefreshExternalCollectionState | Go | v2"
slug: /go/go/v2-Collection-RefreshExternalCollectionState
sidebar_label: "RefreshExternalCollectionState"
beta: false
added_since: v3.0.0
last_modified: false
deprecate_since: false
notebook: false
description: "此类型表示刷新外部 collection 作业的状态。| Go | v2"
type: docx
token: Or8Gd2JEIo1swQxD3QTccFoBn9b
sidebar_position: 29
keywords: 
  - 向量搜索算法
  - 问答系统
  - llm-as-a-judge
  - 混合向量搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - RefreshExternalCollectionState
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# RefreshExternalCollectionState

此类型表示刷新外部 collection 作业的状态。

```go
type RefreshExternalCollectionState milvuspb.RefreshExternalCollectionState
```

**常量：**

- **RefreshStatePending** -
作业处于待处理状态，尚未开始。

- **RefreshStateInProgress** -
作业当前正在进行中。

- **RefreshStateCompleted** -
作业已成功完成。

