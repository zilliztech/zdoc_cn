---
title: "getCompactionState() | Node.js"
slug: /node/node/Management-getCompactionState
sidebar_label: "getCompactionState()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作列出在特定 collection 上收集的统计信息。 | Node.js"
type: docx
token: CRFLdvgkhoeRikxMcMAcJk3qnIc
sidebar_position: 9
keywords: 
  - Milvus benchmark
  - 托管式 Milvus
  - Serverless vector database
  - Milvus 开源
  - Zilliz
  - Zilliz Cloud
  - 云
  - getCompactionState()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# getCompactionState()

此操作列出在特定 collection 上收集的统计信息。

```javascript
await milvusClient.getCompactionState(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.getCompactionState({ 
    compactionID: string | number,
    timeout?: number 
})
```

**参数：**

- **compactionID** (*string | number*) -

    **[必需]**

    由调用 [`compact()`](./Management-compact) 返回的 compaction 作业 ID。

- **timeout** (*number*) -

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在任意响应返回或发生错误时超时。

**返回** *Promise&lt;GetCompactionStateResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **GetCompactionStateResponse** 对象。

```typescript
{
    state: CompactionState,
    executingPlanNo: string,
    timeoutPlanNo: string,
    completedPlanNo: string,
    failedPlanNo: string,
    status:  ResStatus
}
```

**参数：**

- **state** (*CompactionState*) -
compaction 的聚合状态。可能的值为 **UndefiedState**、**Executing** 和 **Completed**。

- **executingPlanNo** (*string*) -
仍在执行的计划数量。

- **timeoutPlanNo** (*string*) -
超时的计划数量。

- **completedPlanNo** (*string*) -
成功完成的计划数量。

- **failedPlanNo** (*string*) -
失败的计划数量。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const resStatus = await milvusClient.getCompactionState({
    compactionID: 'your_compaction_id',
});
```

