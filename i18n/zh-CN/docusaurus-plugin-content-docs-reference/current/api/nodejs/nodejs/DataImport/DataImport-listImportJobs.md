---
title: "listImportJobs() | Node.js"
slug: /node/node/DataImport-listImportJobs
sidebar_label: "listImportJobs()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作列出通过 HTTP 导入任务 API 提交的导入任务。使用它来查看任务 ID、集合名称、进度和状态。 | Node.js"
type: docx
token: CdK7dr8pyo36PZxpGFKcrZsjnEf
sidebar_position: 8
keywords: 
  - k 近邻算法
  - ANNS
  - Vector search
  - knn 算法
  - zilliz
  - Zilliz Cloud
  - cloud
  - listImportJobs()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listImportJobs()

此操作列出通过 HTTP 导入任务 API 提交的导入任务。使用它来查看任务 ID、集合名称、进度和状态。

```typescript
await milvusClient.listImportJobs(params: HttpBaseReq)
```

## 请求语法\{#request-syntax}

```typescript
await milvusClient.listImportJobs({
    dbName?: string,
})
```

**参数：**

- **dbName** (*string*) -

    指定数据库名称。

**返回：**

*Promise&lt;HttpImportListResponse&gt;*

## 示例\{#example}

```javascript
const jobs = await milvusClient.listImportJobs({
    dbName: 'default',
});
```
