---
title: "describeUser() | Node.js"
slug: /node/node/Authentication-describeUser
sidebar_label: "describeUser()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "这是一个方法模板。| Node.js"
type: docx
token: Da9KdvvWroKX9cxOwsmcLRBxnVb
sidebar_position: 10
keywords: 
  - 弹性向量数据库
  - Pinecone 与 Milvus 对比
  - Chroma 与 Milvus 对比
  - Annoy 向量搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - describeUser()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# describeUser()

这是一个方法模板。

```javascript
await milvusClient.describeUser(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.describeUser({
    includeRoleInfo?: boolean,
    timeout?: number,
    username: string
})
```

**参数：**

- **username** (*string*) -

    **[必填]**

    要描述的用户名称。

- **includeRoleInfo** (*boolean*) -

    一个布尔值，表示是否包含角色信息。

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作在收到任何响应或发生任何错误时超时。

**返回** *Promise&lt;SelectUserResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **SelectUserResponse** 对象。

```typescript
{
    results: UserResult[],
    status:  ResStatus
}
```

**参数：**

- **results** (*UserResult[]*) -
**UserResult** 对象列表。对于 `describeUser()`，此列表包含一个描述所请求用户的条目。

    - **user** (*User*) -

        标识该用户的 **User** 对象。

        - **name** (*string*) -

        用户名。

        - **name** (*string*) -

            用户名。

    - **roles** (*RoleEntity[]*) -

        分配给此用户的角色列表。

        - **name** (*string*) -

        角色名称。

        - **name** (*string*) -

            角色名称。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
milvusClient.describeUser({username: 'name'})
```

