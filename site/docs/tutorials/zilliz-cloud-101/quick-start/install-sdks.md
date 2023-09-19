---
slug: /install-sdks
sidebar_position: 3
---

# 安装 SDK

本文介绍如何安装 Milvus SDK，以连接到 Zilliz Cloud 集群。

Zilliz Cloud 提供托管式 Milvus 向量数据库服务。您可以按需安装以下语言的 SDK 以连接到集群：[Python](./install-sdks#install-pymilvus-python-sdk)、[Java](./install-sdks#installing-java-sdk)、[Go](./install-sdks#install-go-sdk) 或 [Node.js](./install-sdks#install-node-js-sdk)。

:::info 说明

Zilliz Cloud 会定期将您的集群升级到可兼容的最新版本。更多信息，请参见[设置运维窗口](./set-up-maintenance-window)。升级后如果您无法使用最新版本的 SDK 连接到集群，请按照提示降级 SDK 到其他可兼容版本。运维完成后，我们会发送邮件通知，之后您便可以安全地升级 SDK。

:::

## 安装 PyMilvus：Python SDK {#install-pymilvus-python-sdk}

PyMilvus 是 Milvus 的 Python SDK。您可以在 [GitHub](https://github.com/milvus-io/pymilvus) 上找到相关源代码。

:::info 说明

安装前，请确保您的 **Python** 版本在 **3.7** 以上。

:::

执行以下命令，安装 PyMilvus：

- 安装指定版本的 PyMilvus
    ```bash
    python -m pip install pymilvus==2.2.16
    ```

- 升级 PyMilvus 到最新版本
    ```bash
    python -m pip install --upgrade pymilvus
    ```

- 检查安装是否成功
    ```bash
    python -m pip list | grep pymilvus
    
    # 输出：
    # pymilvus        2.2.16
    ```

## 安装 Node.js SDK {#install-node-js-sdk}

要使用 Node.js SDK，建议您使用 `npm`（Node 包管理器）或 `yarn` 在项目中安装相关依赖。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-node) 上找到相关源代码。

:::info 说明

安装前，请确保您的 **Node.js** 版本在 **14** 以上。

:::

执行以下命令，安装 Node.js SDK：

- 安装指定版本的 Node.js SDK
    ```bash
    npm install @zilliz/milvus2-sdk-node@2.3.0
    # 或
    yarn add @zilliz/milvus2-sdk-node@2.3.0
    ```

- 升级 Node.js SDK 到最新版本
    ```bash
    npm update @zilliz/milvus2-sdk-node
    # 或
    yarn upgrade @zilliz/milvus2-sdk-node
    ```

- 检查安装是否成功
    ```bash
    npm list | grep @zilliz/milvus2-sdk-node
    # 或
    yarn list | grep @zilliz/milvus2-sdk-node
    
    # 输出
    # └── @zilliz/milvus2-sdk-node@2.3.0
    ```

您可以将 SDK 以 CommonJS 模块或 ES6 模块导入到项目中。如果您使用 `npm init` 初始化项目或者`package.json`中没有`"type"="module"`，建议将 SDK 以 CommonJS 模块导入；如果您使用 `npm init es6` 初始化项目或者`package.json`中存在`"type"="module"`，建议将 SDK 以 ES6 模块导入。

```javascript
// 将 SDK 以 CommonJS 模块导入
const { MilvusClient } = require("@zilliz/milvus2-sdk-node")

// 将 SDK 以 ES6 模块导入
import { MilvusClient } from "@zilliz/milvus2-sdk-node"
```

## 安装 Java SDK {#installing-java-sdk}

您可以使用 Apache Maven 或 Gradle / Grails 下载 Java SDK。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-java) 找到相关源代码。

- Apache Maven
    只需将以下依赖项添加到 `pom.xml`：

    ```xml
    <dependency>
         <groupId>io.milvus</groupId>
         <artifactId>milvus-sdk-java</artifactId>
         <version>2.3.0</version>
     </dependency>
    ```

- Gradle / Grails
    在 Shell 中执行以下命令：

    ```bash
    implementation 'io.milvus:milvus-sdk-java:2.3.0'
    ```

## 安装 Go SDK {#install-go-sdk}

您可以通过 `go get` 安装 Go SDK。您可以在 [GitHub](https://github.com/milvus-io/milvus-sdk-go) 找到相关源代码。

```shell
go get -u github.com/milvus-io/milvus-sdk-go/v2@v2.3.0
```

## 相关文档 {#related-documents}

- [创建集群](./create-cluster)

- [创建 Collection](./create-collection-2)

- [插入 Entity](./insert-entities)

- [向量搜索和查询](./search-and-query)

