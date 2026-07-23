---
title: "createUser() | Node.js"
slug: /node/node/Authentication-createUser
sidebar_label: "createUser()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作用于创建用户。 | Node.js"
type: docx
token: JNZxdKEX3ohBl2xud7Wckhq7nVh
sidebar_position: 7
keywords: 
  - 自然语言处理
  - AI 聊天机器人
  - 余弦距离
  - 什么是 vector database
  - zilliz
  - zilliz cloud
  - cloud
  - createUser()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# createUser()

此操作用于创建用户。

```javascript
await milvusClient.createUser(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.createUser({
   username: string,
   password: string,
   timeout?: number
 })
```

**参数：**

- **username** (*string*) -

    **[必填]**

    要创建的用户名称。

- **password** (*string*) -

    **[必填]**

    要创建的用户密码。

- **timeout** (*number*)  -

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

此方法返回一个 promise，该 promise 解析为 **ResStatus** 对象。

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**参数：**

- **code** (*number*) -

    表示操作结果的代码。如果此操作成功，则其保持为 **0**。

- **error_code** (*string* | *number*) -

    表示已发生错误的错误代码。如果此操作成功，则其保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因说明。如果此操作成功，则其保持为空字符串。

## 示例\{#example}

```java
await milvusClient.createUser({
   username: 'exampleUser',
   password: 'examplePassword',
 })
```

