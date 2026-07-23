---
title: "hasRole() | Node.js"
slug: /node/node/Authentication-hasRole
sidebar_label: "hasRole()"
beta: false
added_since: v2.6.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作检查 Milvus 集群中是否存在某个角色。 | Node.js"
type: docx
token: Beq1d1hDUoTzIsxJ6WTcVtlpnah
sidebar_position: 29
keywords: 
  - Agentic RAG
  - rag llm 架构
  - 私有 llms
  - nn 搜索
  - zilliz
  - zilliz cloud
  - cloud
  - hasRole()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# hasRole()

此操作检查 Milvus 集群中是否存在某个角色。

```javascript
await milvusClient.hasRole(data: HasRoleReq)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.hasRole({
    roleName: string,
    timeout?: number,
})
```

**参数：**

- **roleName** (*string*) -

    **[必需]**

    要检查的角色名称。

- **timeout** (*number*) -

    RPC 超时时间（毫秒）。可选。

**返回值** *Promise&lt;HasRoleResponse&gt;*

此方法返回一个 promise，解析为 **HasRoleResponse** 对象。

```typescript
{
    hasRole: boolean,
    status:  ResStatus
}
```

**参数：**

- **hasRole** (*boolean*) -
一个布尔值，指示请求的角色是否存在。当角色存在时为 **true**，不存在时为 **false**。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        指示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        指示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        指示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
const res = await client.hasRole({ roleName: 'my_role' });
console.log(res.hasRole); // true or false
```
