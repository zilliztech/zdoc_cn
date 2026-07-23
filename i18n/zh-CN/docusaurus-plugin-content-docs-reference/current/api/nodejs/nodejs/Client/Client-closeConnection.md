---
title: "closeConnection() | Node.js"
slug: /node/node/Client-closeConnection
sidebar_label: "closeConnection()"
beta: false
added_since: v2.3.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作会关闭当前与 Milvus server 的连接。| Node.js"
type: docx
token: HtOGdjTpOoG0RcxpGv1cCBcEnAh
sidebar_position: 3
keywords: 
  - 神经网络
  - 深度学习
  - 知识库
  - 自然语言处理
  - zilliz
  - zilliz cloud
  - cloud
  - closeConnection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# closeConnection()

此操作会关闭当前与 Milvus server 的连接。

```javascript
await milvusClient.closeConnection()
```

## 请求语法\{#request-syntax}

```javascript
milvusClient.closeConnection()
```

**返回类型：**

*Promise*\<*CONNECT_STATUS*>

**返回：**

一个 promise，其解析结果为当前与 Milvus server 连接的最终状态，该状态应为 `SHUTDOWN`。

## 示例\{#example}

```javascript
milvusClient.closeConnection()
```
