---
title: "HttpImportListResponse | Node.js"
slug: /node/node/DataImport-HttpImportListResponse
sidebar_label: "HttpImportListResponse"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此接口描述了 `listImportJobs()` 返回的响应。| Node.js"
type: docx
token: L709dd1mWo6CFjxi2ygczQmpn9e
sidebar_position: 5
keywords: 
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - 什么是向量数据库
  - zilliz
  - zilliz cloud
  - cloud
  - HttpImportListResponse
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# HttpImportListResponse

此接口描述了 `listImportJobs()` 返回的响应。

```typescript
interface HttpImportListResponse
```

**字段：**

- **code** (*number*) -

    指定 HTTP API 响应代码。

- **data.records** (*ImportJobType[]*) -

    列出包含 collection 名称、作业 ID、进度和状态的导入作业。

- **message** (*string*) -

    指定响应消息。

## 示例\{#example}

```javascript
const records = response.data.records;
```
