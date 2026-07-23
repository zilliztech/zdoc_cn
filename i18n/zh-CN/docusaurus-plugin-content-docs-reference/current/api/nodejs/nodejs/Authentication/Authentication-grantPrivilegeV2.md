---
title: "grantPrivilegeV2() | Node.js"
slug: /node/node/Authentication-grantPrivilegeV2
sidebar_label: "grantPrivilegeV2()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作将权限或权限组分配给角色。 | Node.js"
type: docx
token: R618dfeMYo9GdmxMwe9cQLclncs
sidebar_position: 15
keywords: 
  - AI 幻觉
  - AI Agent
  - 语义搜索
  - 异常检测
  - zilliz
  - zilliz cloud
  - cloud
  - grantPrivilegeV2()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# grantPrivilegeV2()

此操作将权限或权限组分配给角色。

```javascript
await milvusClient.grantPrivilegeV2(data)
```

## 请求语法\{#request-syntax}

```javascript
 milvusClient.grantPrivilegeV2({
   role: string,
   privilege: string,
   db_name: string,
   collection_name: string,
   timeout?: number
 })
```

**参数：**

- **role** (*string*) -

    **[必需]**

    要向其分配权限的角色名称。

- **privilege** (*string*) -

    **[必需]**

    要分配的权限或权限组的名称。

    有关详细信息，请参阅 [用户和角色](https://milvus.io/docs/users_and_roles.md)。

- **db_name** (*string*) -

    **[必需]**

    此操作的目标数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    此操作的目标 collection 名称。

- **timeout** (*number*)  

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

    表示操作结果的代码。如果此操作成功，则保持为 **0**。

- **error_code** (*string* | *number*) -

    表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

- **reason** (*string*) - 

    表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
await milvusClient.grantPrivilegeV2({
    role: 'exampleRole',
    privilege: 'CreateCollection',
    db_name: 'exampleDB',
    collection_name: 'exampleCollection',
});
```

