---
title: "deleteUser() | Node.js"
slug: /node/node/Authentication-deleteUser
sidebar_label: "deleteUser()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会删除用户。 | Node.js"
type: docx
token: Cl5PdhU5jouHnrxyYXLcOQAZneb
sidebar_position: 8
keywords: 
  - AI 幻觉
  - AI Agent
  - 语义搜索
  - 异常检测
  - zilliz
  - Zilliz Cloud
  - 云
  - deleteUser()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# deleteUser()

此操作会删除用户。

```javascript
await milvusClient.deleteUser(data)
```

## 请求语法\{#request-syntax}

此方法有以下替代用法。

```javascript
await milvusClient.deleteUser({
    username: string,
    timeout?: number
})
```

**参数：**

- **username** (*string*) -

    **[必需]**

    要删除的用户名称。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回值** *Promise\<ResStatus>*

此方法返回一个解析为 **ResStatus** 对象的 promise。

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**参数：**

- **code** (*number*) -

    表示操作结果的代码。如果此操作成功，则保持为 **0**。

- **error_code** (*string* | *number*) -

    表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
await milvusClient.deleteUser({
    username: 'exampleUser'
})
```

