---
slug: /docs/manage-cluster-credentials
beta: FALSE
notebook: FALSE
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 管理身份凭证

在 Zilliz Cloud 中，身份凭证由一对用户名和密码组成，用于认证及授权您对集群的交互请求。

创建集群时，Zilliz Cloud 会自动创建一个名为 **db_admin** 的默认用户，您需要为该默认用户输入一个初始密码。用户 **db_admin** 被授予 **admin** 权限，表示该用户有权访问集群级别的所有资源和执行所有操作。

与集群交互时，要注意区分集群用户和 Zilliz Cloud 账户用户。前者可以访问 Zilliz Cloud 集群，而后者可以访问 Zilliz Cloud 平台本身。

除了默认的 **db_admin** 用户外，Zilliz Cloud 允许您添加和管理更多的集群用户。

## 添加集群用户{#add-a-cluster-user}

要添加集群用户，您必须是[组织管理员](./a-panorama-view#organization-roles)或[项目管理员](./a-panorama-view#project-roles)。

<Admonition type="info" icon="📘" title="说明">

密码将不会再次显示，请务必记下并妥善保存在安全的地方。

</Admonition>

![create_user](/img/create_user.png)

添加集群用户后，您可以使用该用户的用户名和密码连接到集群。请查看[连接集群](./connect-to-cluster)以了解更多详情。

## 重置用户密码{#reset-the-password-of-a-cluster-user}

要重置集群用户的密码，请前往集群详情页面，并点击**用户**选项卡。

<Admonition type="info" icon="📘" title="说明">

密码将不会再次显示，请务必记下并妥善保存在安全的地方。

</Admonition>

![reset-cluster-user-password-zh](/img/reset-cluster-user-password-zh.png)

## 删除集群用户{#drop-a-cluster-user}

要删除集群用户，您必须是[组织管理员](./a-panorama-view#organization-roles)或[项目管理员](./a-panorama-view#project-roles)。

<Admonition type="info" icon="📘" title="说明">

集群默认用户 **db_admin** 不支持删除。

</Admonition>

![drop-cluster-user-zh](/img/drop-cluster-user-zh.png)

## 文档推荐{#related-topics}

- [连接集群](./connect-to-cluster)

- [管理 API 密钥](./manage-api-keys)

- [设置白名单](./set-up-whitelist) 

- [管理 MFA](./multi-factor-authentication) 

