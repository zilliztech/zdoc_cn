---
title: "ConnectConfig | Java | v2"
slug: /java/java/v2-Client-ConnectConfig
sidebar_label: "ConnectConfig"
beta: false
added_since: v2.6.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "ConnectConfig builder 保存创建 `MilvusClientV2` 实例时使用的连接配置。使用 builder 模式配置所有连接参数，包括身份验证、TLS、超时和 keepalive 设置。 | Java | v2"
type: docx
token: ErNidktYPodbDxxow0xcV5qHnof
sidebar_position: 5
keywords: 
  - Pinecone vector 数据库
  - 音频搜索
  - 什么是语义搜索
  - Embedding 模型
  - zilliz
  - Zilliz Cloud
  - cloud
  - ConnectConfig
  - javaV230
displayed_sidebar: javaSidebar

displayed_sidbar: javaSidebar
---

import Admonition from '@theme/Admonition';


# ConnectConfig

ConnectConfig builder 保存创建 `MilvusClientV2` 实例时使用的连接配置。使用 builder 模式配置所有连接参数，包括身份验证、TLS、超时和 keepalive 设置。

```java
ConnectConfig.builder()
    .uri(String uri)
    .token(String token)
    .username(String username)
    .password(String password)
    .dbName(String dbName)
    .connectTimeoutMs(long connectTimeoutMs)
    .keepAliveTimeMs(long keepAliveTimeMs)
    .keepAliveTimeoutMs(long keepAliveTimeoutMs)
    .keepAliveWithoutCalls(boolean keepAliveWithoutCalls)
    .rpcDeadlineMs(long rpcDeadlineMs)
    .secure(Boolean secure)
    .enablePrecheck(boolean enablePrecheck)
    .idleTimeoutMs(long idleTimeoutMs)
    .clientKeyPath(String clientKeyPath)
    .clientPemPath(String clientPemPath)
    .caPemPath(String caPemPath)
    .serverPemPath(String serverPemPath)
    .serverName(String serverName)
    .proxyAddress(String proxyAddress)
    .option(Map<String, String> option)
    .build()
```

**BUILDER 方法：**

- `uri(String uri)` -

    **[必需]**

    服务器端点 URI。接受用于本地 Milvus 实例的 `http://host:port`，或用于 Zilliz Cloud 的 HTTPS URL。

- `token(String token)` -

    用于身份验证的 API key 或 `"username:password"` 字符串。将其用于 Zilliz Cloud API key，或作为用户名/密码身份验证的简写。默认值：`null`。

- `username(String username)` -

    用于身份验证的用户名。与 `password()` 一起使用。如果设置了 `token()`，则会被忽略。默认值：`null`。

- `password(String password)` -

    用于身份验证的密码。与 `username()` 一起使用。默认值：`null`。

- `dbName(String dbName)` -

    连接后要使用的默认数据库名称。默认值：`null`（使用服务器默认值）。

- `connectTimeoutMs(long connectTimeoutMs)` -

    连接期间等待 gRPC channel 达到 READY 状态的超时时间（以毫秒为单位）。默认值：`10000`。

- `keepAliveTimeMs(long keepAliveTimeMs)` -

    发送到服务器的 keepalive ping 之间的间隔（以毫秒为单位）。默认值：`10000`。

- `keepAliveTimeoutMs(long keepAliveTimeoutMs)` -

    在关闭连接之前等待 keepalive ping 确认的超时时间（以毫秒为单位）。默认值：`5000`。

- `keepAliveWithoutCalls(boolean keepAliveWithoutCalls)` -

    当为 `true` 时，即使没有活动 RPC，也会发送 keepalive ping。默认值：`true`。

- `rpcDeadlineMs(long rpcDeadlineMs)` -

    单个 RPC 调用允许的最大持续时间（以毫秒为单位）。值为 `0` 时禁用 deadline。默认值：`0`。

- `secure(Boolean secure)` -

    启用 TLS 加密。当 URI 以 `https` 开头时，无论此设置如何，始终启用 TLS。默认值：`false`。

- `enablePrecheck(boolean enablePrecheck)` -

    当为 `true` 时，在返回 client 之前执行连接检查。默认值：`false`。

- `idleTimeoutMs(long idleTimeoutMs)` -

    空闲连接在多长时间后关闭（以毫秒为单位）。默认值：`86400000`（24 小时）。

- `clientKeyPath(String clientKeyPath)` -

    用于双向 TLS (mTLS) 的 client 私钥文件路径。默认值：`null`。

- `clientPemPath(String clientPemPath)` -

    用于双向 TLS (mTLS) 的 client 证书文件路径。默认值：`null`。

- `caPemPath(String caPemPath)` -

    用于 TLS 验证的 CA 证书文件路径。默认值：`null`。

- `serverPemPath(String serverPemPath)` -

    用于单向 TLS 的服务器证书文件路径。默认值：`null`。

- `serverName(String serverName)` -

    用于 TLS 证书验证的服务器名称覆盖值。默认值：`null`。

- `proxyAddress(String proxyAddress)` -

    gRPC 连接的 HTTP 代理地址。默认值：`null`。

- `option(Map<String, String> option)` -

    在连接时转发到服务器 `ClientInfo.reserved` 字段的任意键值对。适用于传递服务器能够理解的 client 端元数据或功能标志。默认值为空 map。

## 示例\{#example}

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

// Connect to a local Milvus instance
ConnectConfig config = ConnectConfig.builder()
    .uri("YOUR_CLUSTER_ENDPOINT")
    .build();

// Connect to Zilliz Cloud with an API key
// ConnectConfig config = ConnectConfig.builder()
//     .uri("https://your-instance.zilliz.com")
//     .token("your-api-key")
//     .build();

MilvusClientV2 client = new MilvusClientV2(config);
```
