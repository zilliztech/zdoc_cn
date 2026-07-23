---
title: "MilvusClientV2 | Java | v2"
slug: /java/java/v2-Client-MilvusClientV2
sidebar_label: "MilvusClientV2"
beta: false
added_since: v2.3.x
last_modified: v2.5.x
deprecate_since: false
notebook: false
description: "MilvusClientV2 实例表示一个连接到特定 Zilliz Cloud 集群的 Java 客户端。 | Java | v2"
type: docx
token: IeOWd0yR2onm5Ex6XyqcrGjKnpS
sidebar_position: 1
keywords: 
  - 向量数据库
  - IVF
  - knn
  - 图像搜索
  - zilliz
  - Zilliz Cloud
  - cloud
  - MilvusClientV2
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# MilvusClientV2

**MilvusClientV2** 实例表示一个连接到特定 Zilliz Cloud 集群的 Java 客户端。

```java
io.milvus.v2.client.MilvusClientV2
```

## 构造函数\{#constructor}

构造一个适用于常见用例的客户端。

<Admonition type="info" icon="📘" title="说明">

此客户端是当前一组 API 的易用替代方案，用于处理 Zilliz Cloud 上的创建、读取、更新和删除（CRUD）操作。

</Admonition>

```java
MilvusClientV2(ConnectConfig connectConfig);
```

## [ConnectConfig](./v2-Client-ConnectConfig)\{#connectconfigv2-client-connectconfig}

**[ConnectConfig](./v2-Client-ConnectConfig)** 允许你在一个位置配置连接属性，以便 **MilvusClientV2** 可以引用它来创建和管理连接池。

```java
// use either token or username/password
ConnectConfig.builder()
    .uri(String uri)
    .token(String token)
    .username(String userName)
    .password(String password)
    .dbName(String dbName)
    .connectTimeoutMs(long connectTimeoutMs)
    .keepAliveTimeMs(long keepAliveTimeMs)
    .keepAliveTimeoutMs(long keepAliveTimeoutMs)
    .keepAliveWithoutCalls(Boolean keeAliveWithoutCalls)
    .rpcDeadlineMs(long rpcDeadlineMs)
    .clientKeyPath(String clientKeyPath)
    .clientPemPath(String clientPemPath)
    .caPemPath(String caPemPath)
    .serverPemPath(String serverPemPath)
    .serverName(String serverName)
    .proxyAddress(String proxyAddress)
    .secure(Boolean secure)
    .idleTimeoutMs(long idleTimeoutMs)
    .sslContext(SSLContext sslContext)
    .clientRequestId(ThreadLocal<String> clientRequestId)
    .build();
```

**BUILDER 方法：**

- `uri(String uri)`

    Zilliz Cloud 集群的 URI。例如：

    ```plaintext
    https://inxx-xxxxxxxxxxxxxxxxx.aws-us-west-2.vectordb-uat3.zillizcloud.com:19540
    ```

- `token(String token)`

    用于访问指定 Zilliz Cloud 集群的有效访问令牌。 

    建议将其作为分别设置 **user** 和 **password** 的替代方案。

    设置此字段时，请注意：

    有效令牌应为以下任一项：

    - 具有足够权限的 [API 密钥](/docs/manage-api-keys)，或

    - 用于访问目标集群的一组[用户名和密码](/docs/cluster-credentials)，以冒号 (:) 连接。例如，你可以将其设置为 `username:p@ssw0rd`。

- `username(String userName)`

    用于连接到指定 Zilliz Cloud 集群的有效用户名。

    此项应与 **password** 一起使用。

- `password(String password)`

    用于连接到指定 Zilliz Cloud 集群的有效密码。

    此项应与 **user** 一起使用。

- `connectTimeoutMs(long connectTimeout)`

    此操作的超时时长，单位为毫秒。 

    默认值为 **10000**。

- `keepAliveTimeMs(long keepAliveTime)`

    客户端向服务器发送 keep-alive 探测之间的时间间隔，单位为毫秒。

    默认值为 **55000**。

- `keepAliveTimeoutMs(long keepAliveTimeout)`

    服务器响应客户端发送的 keep-alive 探测的超时时长，单位为毫秒。

    默认值为 **20000**。

- `keepAliveWithoutCalls(boolean enable)`

    是否在不发起请求的情况下发送 keep-alive 探测。

    默认值为 **false**。

- `rpcDeadlineMs(long rpcDeadline)`

    RPC 调用的 deadline（已禁用）。

    默认值为 **0**，表示禁用 deadline。

- `clientKeyPath(String clientKeyPath)`

    用于双向认证的客户端 key 文件路径。

- `clientPemPath(String clientPemPath)`

    用于双向认证的客户端 PEM 文件路径。

- `caPemPath(String caPemPath)`

    用于双向认证的 CA PEM 文件路径。

- `serverPemPath(String serverPemPath)`

    用于双向认证的服务器 PEM 文件路径。

- `serverName(String serverName)`

    服务器的预期名称。

- `proxyAddress(String proxyAddress)`

    用于建立连接的代理服务器地址。

- `secure(boolean enable)`

    是否对连接使用 TLS。

    默认值为 **true**。

- `idleTimeoutMs(long idleTimeout)`

    连接的空闲超时时间。

- `.clientRequestId(ThreadLocal<String> clientRequestId)`

    客户端请求的 ID。你可以使用此参数维护一个线程映射，其中每个线程映射到一个特定的请求 ID。 

    请求 ID 将被传递给服务器，以便你可以从访问日志中了解哪个客户端调用了此接口。

**PUBLIC 方法：**

- `getHost()`

    返回当前连接的 Milvus 实例的主机名。

- `getPort()`

    返回当前连接的 Milvus 实例所在的端口号。

- `getAuthorization()`

    返回用于建立当前连接的凭据。

- `getDbName()`

    返回当前正在使用的数据库名称。

- `isSecure()`

    返回当前连接是否通过 TLS。

- `getProxyAddress()`

    返回在 **[ConnectConfig](./v2-Client-ConnectConfig)** 中指定的代理服务器地址。

## 示例\{#examples}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("https://in01-******.aws-us-west-2.vectordb.zillizcloud.com:19531")
        .token("user:password") // replace this with your token
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);
```

<Admonition type="info" icon="📘" title="说明">

将 **uri** 设置为你的集群端点。**token** 参数可以是具有足够权限的 Zilliz Cloud API 密钥，或格式为 `username:p@ssw0rd` 的集群用户凭据。

</Admonition>

