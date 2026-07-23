---
title: "listGrant() | Node.js"
slug: /node/node/Authentication-listGrant
sidebar_label: "listGrant()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会列出授予指定 role 的权限。 | Node.js"
type: docx
token: HSIDdxQGEoPdyaxkMDjcAWGQnpd
sidebar_position: 17
keywords: 
  - 什么是 vector 数据库
  - vector 数据库对比
  - Faiss
  - 视频搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - listGrant()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listGrant()

此操作会列出授予指定 role 的权限。

```javascript
await milvusClient.listGrant(data)
```

## 请求语法\{#request-syntax}

```javascript
 milvusClient.listGrants({
   roleName: 'roleName',
   object: 'Collection',
   objectName: '*'
 });
```

**参数：**

- **roleName** (*string*)  

    目标 role 名称

    将其设置为不存在的 role 名称可能会导致错误。

- **object** (*string*)

    有效权限对象组的名称。可选值为 **Global**、**Collection** 和 **User**。

- **objectName** (*string*)

    指定对象组中特定对象的名称。使用通配符 (*) 表示将授予指定组中的所有权限。

- **timeout** (*number*) 

    此操作的超时时长。

*返回 Promise\<SelectGrantResponse>*

此方法返回一个 promise，该 promise 解析为 **SelectGrantResponse** 对象。

```javascript
{
    "entities": [
        {
            db_name: string,
            grantor: { privilege: { name: string }, user: { name: string } },
            object: { name: string },
            object_name: string,
            role: { name: string }
        }
    ],
    "status": ResStatus
```

**参数：**

- **entities** (*GrantEntity[]*) -

    grant 实体列表，每个实体的结构如下：

    - **db_name** (*string*) -

        已授予权限的数据库名称。

    - **grantor** (*Grantor*) -

        一个 **Grantor** 对象，其结构如下：

        - **privilege** (*PrivilegeEntity*) -

            一个 **PrivilegeEntity** 对象，其结构如下：

            - **name** (*string*) - 

                已授予权限的名称。

        - **user** (*User*) - 

            一个 **User** 对象，其结构如下：

            - **name** (*string*) - 

                将上述权限授予该 role 的用户名称。 

    - **object** (*ObjectEntity*) -

        一个 **ObjectEntity** 对象，其结构如下：

        - **name** (*string*) - 

            对象实体的名称。

    - **object_name** (*string*) -

        上述对象实体中特定对象的名称。

    - **role** (*RoleEntity*) -   

        一个 **RoleEntity** 对象，其结构如下：

        - **name** (*string*) - 

            已被授予权限的 role 的名称。

- **status** (*ResStatus*) -

    一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，该值保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，该值保持为 **Success**。 

    - **reason** (*string*) - 

        表示所报告错误原因的原因说明。如果此操作成功，该值保持为空字符串。

## 示例\{#example}

```javascript
 milvusClient.listGrant({
   roleName: 'roleName',
   object: 'Collection',
   objectName: '*'
 });
```

