---
title: "FlushEvent | Node.js"
slug: /node/node/DataImport-FlushEvent
sidebar_label: "FlushEvent"
beta: false
added_since: v2.6.12
last_modified: false
deprecate_since: false
notebook: false
description: "此接口描述了 `BulkWriter` flush 事件。它报告为某个 chunk 生成的文件、该 chunk 中的行数以及 chunk 索引。| Node.js"
type: docx
token: RC5YdaKIhoRU0ZxU48OcJxn7nS2
sidebar_position: 13
keywords: 
  - 托管式 milvus
  - Serverless vector database
  - milvus 开源
  - milvus 如何工作
  - zilliz
  - zilliz cloud
  - cloud
  - FlushEvent
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# FlushEvent

此接口描述了 `BulkWriter` flush 事件。它报告为某个 chunk 生成的文件、该 chunk 中的行数以及 chunk 索引。

```typescript
interface FlushEvent
```

**字段：**

- **files** (*string[]*) -

    **[必需]**

    列出为已 flush 的 chunk 生成的文件。

- **rowCount** (*number*) -

    **[必需]**

    指定已 flush 的行数。

- **chunkIndex** (*number*) -

    **[必需]**

    指定从零开始的 chunk 索引。

## 示例\{#example}

```javascript
const event = {
    files: ['/tmp/chunk_0/data.parquet'],
    rowCount: 10000,
    chunkIndex: 0,
};
```
