---
slug: /manage-api-keys
beta: FALSE
notebook: FALSE
token: UGzNwB4TmiqTozkJvarceRdenif
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 管理 API 密钥

在 Zilliz Cloud 上，每个项目都有自己的 API 密钥集，这些密钥用作身份验证令牌，对于调用 RESTful API 或 SDK 至关重要。无论是为项目创建新的 API 密钥，还是使用 Zilliz Cloud 提供的默认密钥，您都能通过该密钥访问并管理项目内的所有集群及其关联资源。

为了确保安全，只有组织或项目[管理员](./a-panorama-view)才有权限创建和管理 API 密钥。有关更多信息，请参见[用户和角色](https://docs.zilliz.com.cn/docs/users-roles)。

## API 密钥 vs. 集群用户名和密码对{#comparative-overview-api-keys-vs-username-and-password-pairs}

下表比较了 API 密钥和集群用户名及密码对，展示了它们在使用范围、易用性、创建方式和资源管理等方面的异同。

|  特性                |  API 密钥                                          |  用户名和密码对                                                                          |
| ------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------- |
|  使用范围              |  - 项目级别资源<br/> <br/>  - 管理项目中的所有集群和关联资源<br/> <br/>   |  - 集群级别资源<br/> <br/>  - 管理集群中的 Collection 和关联资源。<br/> <br/>                           |
|  认证                |  用于验证 RESTful API 或 SDK 调用                       |  用于验证 RESTful API 或 SDK 调用                                                        |
|  易用性               |  - 用户友好，学习曲线较低<br/> <br/>  - 无需管理 SDK 版本<br/> <br/>  |  - 适用于集群高级特性，如 RBAC 权限管理等<br/> <br/>  - 需要管理 SDK 版本<br/> <br/>                        |
|  创建方式              |  在项目页面上创建 API 密钥                                 |  在集群管理页面上添加集群用户                                                                   |
|  Collection / 资源管理 |  - 创建、删除 Collection<br/> <br/>  - 管理索引<br/> <br/>    |  - 创建、删除 Collection<br/> <br/>  - 管理索引<br/> <br/>  - 适用于 Collection 相关的高级特性<br/> <br/>  |

## 创建 API 密钥{#create-an-api-key}

要创建 API 密钥，您必须是[组织管理员](./a-panorama-view#organization-roles)或[项目管理员](./a-panorama-view#project-roles)。

![create-api-key-cn](/img/create-api-key-cn.png)

持有项目的 API 密钥后，您可以连接到项目中的任何集群。有关更多信息，请参阅[连接集群](./connect-to-cluster)。

## 查看 API 密钥{#view-api-keys}

要查看 API 密钥，您必须是[组织管理员](./a-panorama-view#organization-roles)或[项目管理员](./a-panorama-view#project-roles)。

<Admonition type="info" icon="📘" title="说明">

 请务必保证您的 API 密钥安全。为防止出现未经授权的访问，请不要随意与他人分享您的 API 密钥。如您怀疑 API 密钥已被泄漏，请立即删除并重新创建新的 API 密钥。

</Admonition>

![view-api-keys-cn](/img/view-api-keys-cn.png)

## 删除 API 密钥{#delete-an-api-key}

如果 API 密钥不再需要，您可以将其删除。

要删除 API 密钥，您必须是[组织管理员](./a-panorama-view#organization-roles)或[项目管理员](./a-panorama-view#project-roles)。

<Admonition type="caution" icon="🚧" title="警告">

删除 API 密钥时请务必小心。删除 API 密钥后，使用该密钥访问资源的权限将被立即撤销。在删前，请务必确保不再需要使用该 API 密钥。

</Admonition>

![delete-api-key-cn](/img/delete-api-key-cn.png)

## 文档推荐{#related-topics}

- [连接集群](./connect-to-cluster)

- [管理身份凭证](./manage-cluster-credentials-console) 

- [设置白名单](./set-up-whitelist) 

- [管理 MFA](./multi-factor-authentication) 

