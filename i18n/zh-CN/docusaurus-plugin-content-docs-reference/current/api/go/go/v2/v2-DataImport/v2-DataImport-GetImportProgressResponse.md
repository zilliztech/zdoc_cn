---
title: "GetImportProgressResponse | Go | v2"
slug: /go/go/v2-DataImport-GetImportProgressResponse
sidebar_label: "GetImportProgressResponse"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此类表示由 `GetImportProgress()` 包函数返回的响应。它嵌入了 `ResponseBase`，并通过 `ImportProgressData` 暴露详细的进度载荷，其中包含总体任务统计信息以及按文件划分的 `Details` 切片。 | Go | v2"
type: docx
token: ZasGdw9Szo9TQbxzHlYcLh1Rnyf
sidebar_position: 6
keywords: 
  - 低成本向量数据库
  - 托管式向量数据库
  - Pinecone 向量数据库
  - 音频搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - GetImportProgressResponse
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# GetImportProgressResponse

此类表示由 `GetImportProgress()` 包函数返回的响应。它嵌入了 `ResponseBase`，并通过 `ImportProgressData` 暴露详细的进度载荷，其中包含总体任务统计信息以及按文件划分的 `Details` 切片。

```go
type GetImportProgressResponse struct {
    ResponseBase
    Data *ImportProgressData `json:"data"`
}

type ImportProgressData struct {
    CollectionName string                  `json:"collectionName"`
    JobID          string                  `json:"jobId"`
    CompleteTime   string                  `json:"completeTime"`
    State          string                  `json:"state"`
    Progress       int64                   `json:"progress"`
    ImportedRows   int64                   `json:"importedRows"`
    TotalRows      int64                   `json:"totalRows"`
    Reason         string                  `json:"reason"`
    FileSize       int64                   `json:"fileSize"`
    Details        []*ImportProgressDetail `json:"details"`
}

type ImportProgressDetail struct {
    FileName     string `json:"fileName"`
    FileSize     int64  `json:"fileSize"`
    Progress     int64  `json:"progress"`
    CompleteTime string `json:"completeTime"`
    State        string `json:"state"`
    ImportedRows int64  `json:"importedRows"`
    TotalRows    int64  `json:"totalRows"`
}
```

**字段：**

- **Status** (*int*) -
继承自 `ResponseBase`。值为 `0` 表示成功。

- **Message** (*string*) -
继承自 `ResponseBase`。当 `Status` 非零时的错误描述。

- **Data** (*\*ImportProgressData*) -
所请求任务的进度载荷。

**ImportProgressData 字段：**

- **CollectionName** (*string*) -
任务的目标 Collection。

- **JobID** (*string*) -
导入任务的唯一标识符。

- **State** (*string*) -
当前任务状态。常见值包括 `Pending`、`Importing`、`Completed` 和 `Failed`。

- **Progress** (*int64*) -
总体完成百分比，范围为 `[0, 100]`。

- **ImportedRows** (*int64*) -
已导入到 Collection 中的行数。

- **TotalRows** (*int64*) -
所有源文件预期的总行数。

- **FileSize** (*int64*) -
所有源文件的总大小（以字节为单位）。

- **CompleteTime** (*string*) -
任务完成时间戳；在任务达到终止状态之前为空。

- **Reason** (*string*) -
当 `State == "Failed"` 时的失败原因；否则为空。

- **Details** (*[]\ImportProgressDetail*) -
按文件划分的进度条目，其结构与父级字段相同，但范围限定为单个源文件。

