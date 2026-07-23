---
title: "listPrivilegeGroups() | Node.js"
slug: /node/node/Authentication-listPrivilegeGroups
sidebar_label: "listPrivilegeGroups()"
beta: false
added_since: v2.4.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作列出所有权限组。| Node.js"
type: docx
token: HGpSdc7AOo7AV3xKCmOcWaIEnrd
sidebar_position: 19
keywords: 
  - 视频去重
  - 视频相似性搜索
  - 向量检索
  - 音频相似性搜索
  - zilliz
  - zilliz cloud
  - cloud
  - listPrivilegeGroups()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# listPrivilegeGroups()

此操作列出所有权限组。

```javascript
await milvusClient.listPrivilegeGroups(data?)
```

## 请求语法\{#request-syntax}

```javascript
 milvusClient.listPrivilegeGroups({
   timeout?: number
 })
```

**参数：**

- **timeout** (*number*)  

    此操作的超时时长。 

    将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise&lt;ListPrivilegeGroupsResponse&gt;*

此方法返回一个 promise，该 promise 解析为 **ListPrivilegeGroupsResponse** 对象。

```typescript
{
    privilege_groups: PrivelegeGroup[],
    status:  ResStatus
}
```

**参数：**

- **privilege_groups** (*PrivelegeGroup[]*) -
当前 Milvus 实例中定义的权限组列表。

    - **group_name** (*string*) -

        权限组的名称。

    - **privileges** (*PrivilegeEntity[]*) -

        组中包含的权限。

        - **name** (*string*) -

        权限名称（例如，**Insert**、**Search**、**CreateCollection**）。

        - **name** (*string*) -

            权限名称（例如，**Insert**、**Search**、**CreateCollection**）。

- **ResStatus**
一个 **ResStatus** 对象。

    - **code** (*number*) -

        表示操作结果的代码。如果此操作成功，则保持为 **0**。

    - **error_code** (*string* | *number*) -

        表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。

    - **reason** (*string*) -

        表示所报告错误的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
await milvusClient.listPrivilegeGroups();
```

