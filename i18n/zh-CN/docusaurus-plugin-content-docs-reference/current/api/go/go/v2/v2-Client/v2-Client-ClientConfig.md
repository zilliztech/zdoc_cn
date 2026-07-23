---
title: "ClientConfig | Go | v2"
slug: /go/go/v2-Client-ClientConfig
sidebar_label: "ClientConfig"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作提供用于建立与 Milvus 或 Zilliz Cloud 服务器连接的配置。调用 `New()` 时传入指向此结构体的指针。 | Go | v2"
type: docx
token: NNQmdw1DloRDi6xeO0acaMfdnib
sidebar_position: 1
keywords: 
  - 最近邻搜索
  - Agentic RAG
  - rag llm 架构
  - 私有 llms
  - zilliz
  - Zilliz Cloud
  - cloud
  - ClientConfig
  - gov230
displayed_sidebar: goSidebar

displayed_sidbar: goSidebar
---

import Admonition from '@theme/Admonition';


# ClientConfig

此操作提供用于建立与 Milvus 或 Zilliz Cloud 服务器连接的配置。调用 `New()` 时传入指向此结构体的指针。

```go
type ClientConfig struct {
    Address        string
    Username       string
    Password       string
    DBName         string
    EnableTLSAuth  bool
    APIKey         string
    DialOptions    []grpc.DialOption
    RetryRateLimit *RetryRateLimitOption
    DisableConn    bool
    ServerVersion  string
}
```

**参数：**

- **Address** (*string*) -
[必需] Milvus 服务器的地址，格式为 `host:port`（例如 `YOUR_CLUSTER_ENDPOINT`）。对于 Zilliz Cloud，请使用完整的 HTTPS endpoint。

- **Username** (*string*) -
用于基于密码的身份验证的用户名。

- **Password** (*string*) -
用于基于密码的身份验证的密码。

- **DBName** (*string*) -
要连接的数据库名称。如果未设置，则使用默认数据库。

- **EnableTLSAuth** (*bool*) -
是否为连接启用 TLS。如果地址使用 `https` scheme，则会自动设置为 `true`。

- **APIKey** (*string*) -
用于 Zilliz Cloud 或已启用身份验证的 Milvus 实例的 API key。对于云部署，优先于用户名/密码。

- **DialOptions** ([]*grpc.DialOption*) -
用于自定义连接的其他 gRPC dial options。如果提供，将与默认 options 合并。

- **RetryRateLimit** (*RetryRateLimitOption*) -
针对速率限制错误进行自动重试的配置。

- **DisableConn** (*bool*) -
如果为 `true`，client 将不会立即建立连接。适用于测试或延迟连接场景。

- **ServerVersion** (*string*) -
已连接服务器的版本字符串。连接后自动填充。

**构建器方法：**

- `WithTLSConfig(tlsConfig *tls.Config)`
这会为安全连接设置自定义 TLS 配置。

- `WithGrpcAuthority(authority string)`
这会为连接设置 gRPC authority header，在通过代理或负载均衡器连接时很有用。

**返回类型：**

*ClientConfig*

**返回：**

指向已更新 `ClientConfig` 的指针，用于方法链式调用。

## 示例\{#example}

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

// Connect with username/password
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address:  "YOUR_CLUSTER_ENDPOINT",
    Username: "root",
    Password: "Milvus",
    DBName:   "default",
})
if err != nil {
    log.Fatal("failed to create client:", err)
}
defer client.Close(ctx)

// Connect to Zilliz Cloud with API key
cloudClient, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "https://your-endpoint.api.gcp-us-west1.zillizcloud.com:443",
    APIKey:  "your-api-key",
})
if err != nil {
    log.Fatal("failed to create cloud client:", err)
}
```
