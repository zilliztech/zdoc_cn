---
slug: /data-security
beta: FALSE
notebook: FALSE
token: E7X4wc69bibTo4kFfNic5hBVnhb
sidebar_position: 7
---

import Admonition from '@theme/Admonition';


# 数据安全

数据安全是所有云平台的重中之重，Zilliz Cloud 也不例外。为了保障数据安全，Zilliz Cloud 在各个方面都提供了强大的措施，包括认证、访问控制、网络隔离、数据加密以及备份和恢复等。

本文介绍了 Zilliz Cloud 如何在各阶段实现数据安全保护。

## 注册账户{#registering-an-account-with-privacy-protection}

从账户注册开始，Zilliz Cloud 就把数据安全放在首位。

在 Web 控制台注册账户时，Zilliz Cloud 使用多种加密技术来保护用户数据。利用强大的加密算法，如 [SHA-256](https://zh.wikipedia.org/wiki/SHA-2) 和 [bcrypt](https://zh.wikipedia.org/wiki/Bcrypt) 等，对您的账户信息进行加密保护。

此外，Zilliz Cloud 坚持严格的政策，不在其系统中存储用户名和密码。这种方法可以确保即使发生安全漏洞的情况下，用户账密信息也能保持安全。

## 创建和运行集群{#starting-a-cluster-with-security}

一旦账户准备就绪，您便可以登录 Zilliz Cloud 控制台以创建和运行集群。

从架构设计上来看，Zilliz Cloud 平台包括两个平面：控制平面和内核平面。这两个平面位于单独的安全组中，拥有隔离网络，从而增强了数据的安全性。

此外，Zilliz Cloud 还支持其他安全设置，如访问控制、白名单等，以保障集群内外部通信的安全。

### 认证{#authentication}

Zilliz Cloud 使用 OAuth2 协议实现身份验证。当访问集群时，Zilliz Cloud 要求用户提供身份凭证（或令牌）以证明用户身份。身份认证通过后，用户才能访问或操作集群资源。身份凭证通常由用户名和密码对或 API 密钥组成。

有关详细信息，请参见[管理身份凭证](./manage-cluster-credentials-console)和[管理 API 密钥](./manage-api-keys)。

### 访问控制{#access-control}

在大多数情况下，仅对用户进行身份验证是远远不够的。实际应用场景需要更细粒度的权限控制，即定义用户可以访问或操作资源的权限范围。

为了满足这些需求，Zilliz Cloud 启用了访问控制。该特性允许您限制用户权限，授权用户仅访问指定资源的最小权限。通过此机制，集群管理员可以向用户授予一个或多个角色，并通过角色定义用户对集群资源的访问和操作权限。这有助于避免未授权的访问。

有关详细信息，请参见[角色与权限](./a-panorama-view)。

### 白名单{#whitelists}

为了公网访问的安全性，Zilliz Cloud 使用 HTTPS 协议，并提供白名单功能来实现 IP 地址过滤。

如果要限制可访问集群的 IP 地址范围，可以将指定的 CIDR 块添加到集群的白名单中。如果要完全禁止公网访问，您可以将 **127.0.0.1/32** 添加到集群的白名单中。

有关详细信息，请参见[设置白名单](./set-up-whitelist)。

## 私网连接{#private-links}

如果你不希望集群流量暴露在互联网上，Zilliz Cloud 支持您为您的集群添加私网连接。该功能为您 的集群提供了一层安全保障，保证只有您信任的虚拟私有网络（VPC）上的资源可以与您的集群通信。

有关详细信息，请参见[创建私网连接](./setup-a-private-link)。

## 数据存储和传输{#storing-and-transmitting-data-with-encryption}

针对正在运行的集群，Zilliz Cloud 会采取各种措施来保障数据的安全存储和传输。

Zilliz Cloud 集群中的向量数据存储在对象存储（如阿里云 OSS）中。对象存储已启用服务端加密，且不同租户的数据通过命名空间实现数据隔离。此外，Zilliz Cloud 利用 [JumpServer](https://zh.wikipedia.org/wiki/%E8%B7%B3%E6%9D%BF%E6%9C%BA) 记录所有集群访问相关的操作，例如登录、查询和修改等。收集的审计日志可用于跟踪和调查潜在的安全事故或数据泄漏风险。

## 备份和恢复{#backup-and-restoration}

为了保障数据完整性，Zilliz Cloud 提供可靠的数据备份和恢复机制。

Zilliz Cloud 平台提供回收站功能，回收站中的数据最长保留期为 30 天，允许您在此期间恢复意外删除的数据。此外，您可以创建自动备份，以确保意外发生时可以进行数据恢复。

有关详细信息，请参见[备份与恢复](./docs/backup-and-restore)。

## 总结{#summary}

为了保证数据的机密性、完整性和可用性，Zilliz Cloud 在各阶段都将数据安全置于首位，并采用加密技术、认证协议、访问控制、白名单、服务器端加密、审计日志和备份恢复等机制来保障数据安全。