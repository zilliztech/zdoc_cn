---
title: "dropIndexProperties() | Node.js"
slug: /node/node/Management-dropIndexProperties
sidebar_label: "dropIndexProperties()"
beta: false
added_since: v2.4.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会将 index properties 重置为其默认值。 | Node.js"
type: docx
token: Acvxd7t9poXj6nxb0vMco0wsngh
sidebar_position: 6
keywords: 
  - hybrid vector search
  - 视频去重
  - 视频相似性搜索
  - Vector 检索
  - zilliz
  - zilliz cloud
  - cloud
  - dropIndexProperties()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# dropIndexProperties()

此操作会将 index properties 重置为其默认值。

```javascript
await milvusClient.dropIndexProperties(data)
```

## 请求语法\{#request-syntax}

```javascript
await milvusClient.dropIndexProperties({
     db_name?: string,
     collection_name: string,
     index_name: string,
     properties: string[],
     timeout?: number
});
```

**参数：**

- **db_name** (*string*) -

    持有目标 collection 的数据库名称。

- **collection_name** (*string*) -

    **[必需]**

    现有 collection 的名称。

- **index_name** (*string*) -

    **[必需]**

    目标 index 的名称。

- **properties** (*string[]*) -

    **[必需]**

    要重置的 index properties 名称。可能的属性如下：

    - **mmap.enabled** -

        是否为指定的 index 启用 mmap。将其设置为 `True` 会将指定的 index 卸载到磁盘。详情请参阅[使用 mmap](/docs/use-mmap)

- **timeout** (number) -

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

此方法返回一个 promise，其解析结果为 **ResStatus** 对象。

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

    表示所报告错误原因的说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient(MILUVS_ADDRESS);
const dropIndexPropertiesReq = {
    collection_name: 'my_collection',
    index_name: 'my_index',
    properties: ['mmap.enabled'],
};
const res = await milvusClient.dropIndexProperties(dropIndexPropertiesReq);
console.log(res);
```

