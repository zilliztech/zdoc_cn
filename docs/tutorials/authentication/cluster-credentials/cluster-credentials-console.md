---
title: "通过 Web UI 管理身份凭证 | Cloud"
slug: /cluster-credentials-console
sidebar_label: "通过 Web UI 管理身份凭证"
beta: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，身份凭证由一对用户名和密码组成，用于认证及授权您对集群的交互请求。 | Cloud"
type: origin
token: VNWiwtYwGi9m0Okhj3Zce8wAnte
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 凭证
  - ui

---

import Admonition from '@theme/Admonition';


# 通过 Web UI 管理身份凭证

在 Zilliz Cloud 中，身份凭证由一对用户名和密码组成，用于认证及授权您对集群的交互请求。

## 概述{#overview}

当您设置集群时，Zilliz Cloud 会创建名为 `db_admin` 的集群默认用户，并授予其管理员角色，使其具有完整的集群访问权限。

除了默认的 `db_admin` 用户外，您还可以添加和管理具有各种内置角色的其他集群用户，以实现访问控制：

- 管理员：拥有对整个集群及其关联资源的完全控制权限。

- 读写权限：具有在集群内读取、写入及管理 Collection 和索引的权限。

- 只读权限：拥有查看集群资源的权限，但无法进行创建、修改或删除等操作。

有关更多集群内置角色信息，请参考[集群内置角色](./user-roles)。

为方便您创建和管理身份凭证，Zilliz Cloud 提供了简洁直观的 Web 控制台。

## 添加集群用户{#add-a-cluster-user}

要添加集群用户，您必须是[组织管理员](./resource-hierarchy#organization-roles)或[项目管理员](./resource-hierarchy#project-roles)。

<Admonition type="info" icon="📘" title="说明">

<p>密码将不会再次显示，请务必记下并妥善保存在安全的地方。</p>

</Admonition>

![add-cluster-user-cn](/img/add-cluster-user-cn.png)

添加集群用户后，您可以使用该用户的用户名和密码连接到集群。请查看[连接集群](./connect-to-cluster)以了解更多详情。

## 重置用户密码{#reset-the-password-of-a-cluster-user}

要重置集群用户的密码，请前往集群详情页面，并点击**用户**选项卡。

<Admonition type="info" icon="📘" title="说明">

<p>密码将不会再次显示，请务必记下并妥善保存在安全的地方。</p>

</Admonition>

![reset-cluster-user-password-zh](/img/reset-cluster-user-password-zh.png)

## 删除集群用户{#drop-a-cluster-user}

要删除集群用户，您必须是[组织管理员](./resource-hierarchy#organization-roles)或[项目管理员](./resource-hierarchy#project-roles)。

<Admonition type="info" icon="📘" title="说明">

<p>集群默认用户 <strong>db_admin</strong> 不支持删除。</p>

</Admonition>

![drop-cluster-user-zh](/img/drop-cluster-user-zh.png)

## 文档推荐{#related-topics}

- [连接集群](./connect-to-cluster)

- [管理 API 密钥](./manage-api-keys)

- [设置白名单](./set-up-whitelist)

- [管理 MFA](./multi-factor-auth)

