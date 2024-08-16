---
slug: /organization-users
beta: FALSE
notebook: FALSE
type: origin
token: WGqBwcKmViC7xJkEfPcchOVKnsd
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 组织
  - 成员
  - 管理

---

import Admonition from '@theme/Admonition';


# 组织成员管理

在 Zilliz Cloud 平台上，您可以邀请用户加入您的组织，并通过分配不同权限等级的角色来授予用户访问组织的权限。

本指南将详细介绍如何管理组织内的用户，包括如何邀请用户加入组织、撤销或重新发送邀请、编辑成员角色以及如何将成员从组织中移除。

## 邀请用户加入组织{#invite-a-user-to-join-your-organization}

要邀请用户加入组织，您可以是[组织管理员](./resource-hierarchy#organization-roles)或[普通组织成员](./resource-hierarchy#organization-roles)。

作为组织管理员，您可以将受邀用户设定为组织管理员或普通组织成员。如果您是普通组织成员，受邀用户则只能被设定为普通组织成员。

在**邀请用户**页面，输入您希望邀请的用户的电子邮箱地址。他们将收到邀请邮件，并需要在 48 小时内接受邀请以加入组织。在邀请被接受之前，您可以随时撤销或重新发送该邀请。

<Admonition type="info" icon="📘" title="说明">

<p>您可以同时邀请一个或多个用户加入组织，但他们的角色需相同。每个组织最多可拥有 1000 名成员。</p>

</Admonition>

![invite-user-to-org-zh](/img/invite-user-to-org-zh.png)

## 撤销或重发邀请{#revoke-or-resend-an-invitation}

在您邀请用户加入组织后，Zilliz Cloud 会向用户发送邀请邮件。在用户接受邀请之前，您可以选择撤销或重发邀请。

![revoke-or-resend-org-invitation-zh](/img/revoke-or-resend-org-invitation-zh.png)

## 编辑成员角色或移出成员{#edit-a-members-role-or-remove-a-member}

当用户接受邀请后，他们将成为组织成员。之后，您可以根据需求编辑他们的角色或从组织中移出他们。

要编辑成员角色或移出组织成员，你必须是[组织管理员](./resource-hierarchy#organization-roles)。

![edit-user-role-or-remove-org-user-zh](/img/edit-user-role-or-remove-org-user-zh.png)

## 文档推荐{#related-topics}

- [角色与权限](./resource-hierarchy)

- [添加项目成员](./projects)

- [删除组织](./delete-your-organization)

