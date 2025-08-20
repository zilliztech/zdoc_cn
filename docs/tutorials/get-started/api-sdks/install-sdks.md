---
title: "安装 SDK | Cloud"
slug: /install-sdks
sidebar_label: "安装 SDK"
beta: FALSE
notebook: FALSE
description: "本文介绍如何安装 Milvus SDK，以连接到 Zilliz Cloud 集群。 | Cloud"
type: origin
token: Jo4bwNi6zi4zlHkN2bWcewFYnDc
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - sdk

---

import Admonition from '@theme/Admonition';


# 安装 SDK

本文介绍如何安装 Milvus SDK，以连接到 Zilliz Cloud 集群。

Zilliz Cloud 提供托管式 Milvus 向量数据库服务。您可以按需安装以下语言的 SDK 以连接到集群：[Python](./install-sdks#install-pymilvus-python-sdk)、[Java](./install-sdks#install-java-sdk)、[Go](./install-sdks#install-go-sdk) 或 [Node.js](./install-sdks#install-nodejs-sdk)。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>Zilliz Cloud 会定期将您的集群升级到可兼容的最新版本。更多信息，请参见<a href="./organization-settings#set-up-maintenance-window">设置运维窗口</a>。升级后如果您无法使用最新版本的 SDK 连接到集群，请按照提示降级 SDK 到其他可兼容版本。运维完成后，我们会发送邮件通知，之后您便可以安全地升级 SDK。</p></li>
<li><p>下列所有 SDK 均提供了稳定版和 Beta 版，分别对应稳定版和 Beta 版集群。如果您将集群升级到了 Beta 版本，请同步升级您的 SDK 版本。</p></li>
</ul>

</Admonition>

## 安装 PyMilvus：Python SDK{#install-pymilvus-python-sdk}

PyMilvus 是 Milvus 的 Python SDK。您可以在 [GitHub](https://github.com/milvus-io/pymilvus) 上找到相关源代码。

<Admonition type="info" icon="📘" title="说明">

<p>安装前，请确保您的 <strong>Python</strong> 版本在 <strong>3.8</strong> 以上。</p>

</Admonition>

执行以下命令，安装 PyMilvus：

```bash
# Install specific PyMilvus version
python -m pip install pymilvus==2.5.14

# Update PyMilvus to the newest version
python -m pip install --upgrade pymilvus

# Verify installation success
python -m pip list | grep pymilvus
```

## 安装 Node.js SDK{#install-nodejs-sdk}

要使用 Node.js SDK，建议您使用 `npm`（Node 包管理器）或 `yarn` 在项目中安装相关依赖。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-node) 上找到相关源代码。

<Admonition type="info" icon="📘" title="说明">

<p>安装前，请确保您的 <strong>Node.js</strong> 版本在 <strong>14</strong> 以上。</p>

</Admonition>

```bash
# Installing a specific version for your clusters
npm install @zilliz/milvus2-sdk-node@2.5.12
# Alternatively,
yarn add @zilliz/milvus2-sdk-node@2.5.12

# Verify installation
npm list | grep @zilliz/milvus2-sdk-node
# or
yarn list | grep @zilliz/milvus2-sdk-node
```

您可以将 SDK 以 CommonJS 模块或 ES6 模块导入到项目中。一般而言，对于使用`npm init`创建的项目，可以将 SDK 以 CommonJS 模块导入；对于使用`npm init es6`创建的项目，可以将 SDK 以 ES6 模块导入。

```javascript
// 将 SDK 以 CommonJS 模块导入
const { MilvusClient } = require("@zilliz/milvus2-sdk-node")

// 将 SDK 以 ES6 模块导入
import { MilvusClient } from "@zilliz/milvus2-sdk-node"
```

## 安装 Java SDK{#install-java-sdk}

您可以使用 Apache Maven 或 Gradle / Grails 下载 Java SDK。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-java) 找到相关源代码。

- Apache Maven

    只需将以下依赖项添加到 `pom.xml`：

    ```xml
    <!-- Use this for your clusters -->
    <dependency>
         <groupId>io.milvus</groupId>
         <artifactId>milvus-sdk-java</artifactId>
         <version>2.5.12</version>
     </dependency>
    ```

- Gradle / Grails

    在 Shell 中执行以下命令：

    ```bash
    # Use this for your clusters
    compile 'io.milvus:milvus-sdk-java:2.5.12'
    ```

## 安装 Go SDK{#install-go-sdk}

您可以通过 `go get` 安装 Go SDK。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-go) 找到相关源代码。

```bash
# Run the following for your clusters
go get -u github.com/milvus-io/milvus-sdk-go/v2@v2.5.6
```

## 相关文档{#related-docs}

- [创建集群](./create-cluster-on-demand)

- [创建 Collection](./manage-collections-sdks)

- [插入与删除](./insert-update-delete)

- [搜索与重排](./search-query-get)

