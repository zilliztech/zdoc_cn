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

当您设置集群时，Zilliz Cloud 会创建名为 `db_admin` 的集群默认集群用户，并授予其 **Admin** 角色，使其具有完整的集群访问权限。默认用户的密码仅会在集群创建时展示一次，请及时保存密码。

除了默认的用户 `db_admin` 外，您可以[创建](./cluster-users)更多用户。

## 重置用户密码{#reset-the-password-of-a-cluster-user}

要重置集群用户的密码，请前往集群详情页面，并点击**用户**选项卡。

<Admonition type="info" icon="📘" title="说明">

<p>密码将不会再次显示，请务必记下并妥善保存在安全的地方。</p>

</Admonition>

![reset-cluster-user-password-zh](/img/reset-cluster-user-password-zh.png)

