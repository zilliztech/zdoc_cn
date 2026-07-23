---
title: "connect() | Python | ORM"
slug: /python/python/Connections-connect
sidebar_label: "connect()"
beta: NEAR DEPRECATE
added_since: Inherit
last_modified: false
deprecate_since: false
notebook: false
description: "此操作使用提供的别名、地址和身份验证参数建立到 Zilliz Cloud 集群的连接。 | Python | ORM"
type: docx
token: KzCXdTVVSoOmkbxuFjsccDlXnff
sidebar_position: 2
keywords: 
  - 降维
  - hnsw 算法
  - vector 相似度搜索
  - 近似最近邻搜索
  - zilliz
  - zilliz cloud
  - cloud
  - connect()
  - pymilvus30
displayed_sidebar: pythonSidebar

displayed_sidbar: pythonSidebar
---

import Admonition from '@theme/Admonition';


# connect()

此操作使用提供的别名、地址和身份验证参数建立到 Zilliz Cloud 集群的连接。

## 请求语法\{#request-syntax}

```python
connect(
    alias: str,
    user: str | "",
    password: str | "",
    db_name: str | "default",
    token: str | "",
    **kwargs
)
```

**参数：**

- **alias** (*string*) -

    **[必需]**

    连接别名。

    <Admonition type="info" icon="📘" title="备注">

    - 如果指定的连接别名不存在，则会添加一个新别名，并将下面指定的参数添加为该连接别名的参数。
    
    - 如果指定的连接别名已通过调用 **add_connection()** 添加，则下面指定的参数会覆盖该连接别名的参数。

    </Admonition>

- **user** (*string*) -

    用于连接到指定 Zilliz Cloud 集群的有效用户名。

    应与 **password** 一起使用。

- **password** (*string*) -

    用于连接到指定 Zilliz Cloud 集群的有效密码。

    应与 **user** 一起使用。

- **db_name** (*string*) -

    目标 Milvus 实例所属数据库的名称。

- **token** (*string*) -

    用于访问指定 Zilliz Cloud 集群的有效访问令牌。它可作为分别设置 **user** 和 **password** 的替代方式。

    设置此字段时，请注意：

    有效的 token 应为以下任一项：

    - 具有足够权限的 API key，或

    - 用于访问目标集群的一组用户名和密码，并用冒号 (:) 连接。例如，你可以将其设置为 `username:p@ssw0rd`。

- **kwargs** (*dict*) -

    用于配置连接的关键字参数。支持以下键：

    - **address** (*string*) -

        要连接的实际地址。示例地址：**YOUR_CLUSTER_ENDPOINT**。

    - **uri** (*string*) -

        Zilliz Cloud 集群的 URI。例如：**`https://in01-&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;&ast;.aws-us-west-2.vectordb-uat3.zillizcloud.com:19540`**。

    - **host** (*string*) -

        Zilliz Cloud 集群的主机。默认值为 **localhost**，如果仅提供 **port**，PyMilvus 将填入默认 host。

    - **port** (*string | int*) -

        Zilliz Cloud 集群监听的端口。默认值为 **19530**，如果仅提供 **host**，PyMilvus 将填入默认 port。

    - **secure** (*bool*) -

        一个布尔值，表示连接中是否使用 TLS。

    - **client_key_path** (*string*) -

        客户端侧用于 TLS 证书验证的有效 **client.key** 文件路径。

        使用自签名 TLS 证书或由未知机构签名的证书时，需要此参数。

        如适用，此参数应与 **client_pem_path**、**ca_pem_path**、**server_pem_path** 和 **server_name** 配合使用。

    - **client_pem_path** (*string*) -

        客户端侧用于 TLS 证书验证的有效 **client.pem** 文件路径。

        使用自签名 TLS 证书或由未知机构签名的证书时，需要此参数。

        如适用，此参数应与 **client_key_path**、**ca_pem_path**、**server_pem_path** 和 **server_name** 配合使用。

    - **ca_pem_path** (*string*) -

        用于 TLS 证书验证的有效 **ca.pem** 文件路径。

        使用自签名 TLS 证书或由未知机构签名的证书时，需要此参数。

        如适用，此参数应与 **client_key_path**、**client_pem_path**、**server_pem_path** 和 **server_name** 配合使用。

    - **server_pem_path** (*string*) -

        服务端侧用于 TLS 证书验证的有效 **server.pem** 文件路径。

        使用自签名 TLS 证书或由未知机构签名的证书时，需要此参数。

        如适用，此参数应与 **client_key_path**、**client_pem_path**、**ca_pem_path** 和 **server_name** 配合使用。

    - **server_name** (*string*) -

        服务端侧用于 TLS 证书验证的有效服务器名称路径。

        使用自签名 TLS 证书或由未知机构签名的证书时，需要此参数。

        如适用，此参数应与 **client_key_path**、**client_pem_path**、**ca_pem_path** 和 **server_pem_path** 配合使用。

**返回类型：**

None

**返回：**

None

## 异常\{#exceptions}

- **NotImplementedError**:

    当 handler 参数值不是 GRPC 时，将引发此异常。

- **ParamError**: 

    当为 pool 参数传入不受支持的值时，将引发此异常。

- **Exception**: 

    当连接参数中指定的服务器不可达/未就绪且客户端无法连接到它时，将引发此异常。

## 示例\{#examples}

```python
from pymilvus import connections

# Use host and port
connections.connect(
  alias="default", 
  host='localhost', 
  port='19530'
)

# Use uri
uri="YOUR_CLUSTER_ENDPOINT"
connections.connect(uri=uri)

# Use environment variable
# The following assumes that you have already set an environment 
# variable using export MILVUS_URI=http://username:password@YOUR_CLUSTER_ENDPOINT
connections.connect()

# Use environment files
# A sample file at https://github.com/milvus-io/pymilvus/blob/master/.env.example
# Rename the file to .env so that pymilvus will automatically load it.
connections.connect()

# Connect to a specific database
# Ensure the specified database exists.
connections.connect(db_name="books")
```

## 相关操作\{#related-operations}

以下操作与 `connect()` 相关：

- [add_connection()](./Connections-add_connection)

- [disconnect()](./Connections-disconnect)

- [get_connection_addr()](./Connections-get_connection_addr)

- [has_connection()](./Connections-has_connection)

- [list_connections()](./Connections-list_connections)

- [remove_connection()](./Connections-remove_connection)

