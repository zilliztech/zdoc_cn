---
title: "RefreshExternalCollectionJobInfo | Go | v2"
slug: /go/go/v2-Collection-RefreshExternalCollectionJobInfo
sidebar_label: "RefreshExternalCollectionJobInfo"
beta: false
added_since: v3.0.0
last_modified: false
deprecate_since: false
notebook: false
description: "此类型包含有关刷新外部 collection 任务的信息。 | Go | v2"
type: docx
token: TxIQdcx34oB2CUxHIRMcRGPNnic
sidebar_position: 28
keywords: 
  - vector db 比较
  - openai vector db
  - 自然语言处理数据库
  - 低成本 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - RefreshExternalCollectionJobInfo
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# RefreshExternalCollectionJobInfo

此类型包含有关刷新外部 collection 任务的信息。

```go
type RefreshExternalCollectionJobInfo struct {
    JobID          int64
    CollectionName string
    State          RefreshExternalCollectionState
    Progress       int64
    Reason         string
    ExternalSource string
    StartTime      int64
    EndTime        int64
}
```

**字段：**

- **JobID** (*int64*) -
刷新任务的唯一标识符。

- **CollectionName** (*string*) -
正在刷新的 collection 的名称。

- **State** (*[RefreshExternalCollectionState](./v2-Collection-RefreshExternalCollectionState)*) -
刷新任务的当前状态。

- **Progress** (*int64*) -
刷新任务的进度百分比。

- **Reason** (*string*) -
当前状态的附加信息或原因。

- **ExternalSource** (*string*) -
外部数据源标识符。

- **StartTime** (*int64*) -
任务开始时的 Unix 时间戳。

- **EndTime** (*int64*) -
任务完成时的 Unix 时间戳。

