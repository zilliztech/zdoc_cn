---
slug: /docs/install-sdks
beta: FALSE
notebook: FALSE
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 安装 SDK

本文介绍如何安装 Milvus SDK，以连接到 Zilliz Cloud 集群。

Zilliz Cloud 提供托管式 Milvus 向量数据库服务。您可以按需安装以下语言的 SDK 以连接到集群：[Python](./install-sdks#install-pymilvus-python-sdk)、[Java](./install-sdks#install-java-sdk)、[Go](./install-sdks#install-go-sdk) 或 [Node.js](./install-sdks#install-nodejs-sdk)。

<Admonition type="info" icon="📘" title="说明">

Zilliz Cloud 会定期将您的集群升级到可兼容的最新版本。更多信息，请参见[设置运维窗口](./set-up-maintenance-window)。升级后如果您无法使用最新版本的 SDK 连接到集群，请按照提示降级 SDK 到其他可兼容版本。运维完成后，我们会发送邮件通知，之后您便可以安全地升级 SDK。

</Admonition>

## 安装 PyMilvus：Python SDK**{#install-pymilvus-python-sdk}**

PyMilvus 是 Milvus 的 Python SDK。您可以在 [GitHub](https://github.com/milvus-io/pymilvus) 上找到相关源代码。

<Admonition type="info" icon="📘" title="说明">

安装前，请确保您的 **Python** 版本在 **3.7** 以上。

</Admonition>

执行以下命令，安装 PyMilvus：

```bash
# Install specific PyMilvus version
python -m pip install pymilvus==2.3.3

# Update PyMilvus to the newest version
python -m pip install --upgrade pymilvus

# Verify installation success
python -m pip list | grep pymilvus
```

## 安装 Node.js SDK**{#install-nodejs-sdk}**

要使用 Node.js SDK，建议您使用 `npm`（Node 包管理器）或 `yarn` 在项目中安装相关依赖。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-node) 上找到相关源代码。

<Admonition type="info" icon="📘" title="说明">

安装前，请确保您的 **Node.js** 版本在 **14** 以上。

</Admonition>

```bash
# Installing a specific version
npm install @zilliz/milvus2-sdk-node@2.3.4
# Alternatively,
yarn add @zilliz/milvus2-sdk-node@2.3.4

# Upgrade to the latest version
npm update @zilliz/milvus2-sdk-node
# Alternatively,
yarn upgrade @zilliz/milvus2-sdk-node

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

## 安装 Java SDK**{#install-java-sdk}**

您可以使用 Apache Maven 或 Gradle / Grails 下载 Java SDK。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-java) 找到相关源代码。

- Apache Maven
    只需将以下依赖项添加到 `pom.xml`：

    ```xml
    <dependency>
         <groupId>io.milvus</groupId>
         <artifactId>milvus-sdk-java</artifactId>
         <version>2.3.3</version>
     </dependency>
    ```

- Gradle / Grails
    在 Shell 中执行以下命令：

    ```bash
    compile 'io.milvus:milvus-sdk-java:2.3.3'
    ```

## 安装 Go SDK**{#install-go-sdk}**

您可以通过 `go get` 安装 Go SDK。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-go) 找到相关源代码。

```shell
go get -u github.com/milvus-io/milvus-sdk-go/v2@v2.3.3
```

## 相关文档

- [创建集群](./create-cluster)

- [创建 Collection](./create-collection)

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-query-and-get)

