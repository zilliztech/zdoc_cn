---
slug: /manage-orgs-and-members
beta: FALSE
notebook: FALSE
token: I9ktwIylxiDTKik4ckUctIOvnjm
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 管理组织与成员

在[组织和项目](./a-panorama-view)的层次结构中，您可以通过以下操作来管理您的组织与成员：

- [查看系统设置](./manage-orgs-and-members#view-system-settings)

- [编辑组织名称](./manage-orgs-and-members#edit-organization-name)

- [邀请用户加入组织](./manage-orgs-and-members#invite-a-user-to-join-your-organization)

- [撤销或重发邀请](./manage-orgs-and-members#revoke-or-resend-an-invitation)

- [编辑成员角色或移出成员](./manage-orgs-and-members#edit-a-members-role-or-remove-a-member)

- [离开组织](./manage-orgs-and-members#leave-an-organization)

## 查看系统设置{#view-system-settings}

加入组织后，您成为组织成员，并有权限查看系统设置。

有关组织设置的更多详细信息，请参见[组织设置](./organization-settings)。

![view-organization-zh](/img/view-organization-zh.png)

## 编辑组织名称{#edit-organization-name}

要编辑组织名称，您必须是[组织管理员](./a-panorama-view#organization-roles)。

![edit-organization-name-zh](/img/edit-organization-name-zh.png)

## 邀请用户加入组织{#invite-a-user-to-join-your-organization}

要邀请用户加入组织，您可以是[组织管理员](./a-panorama-view#organization-roles)或[普通组织成员](./a-panorama-view#organization-roles)。

作为组织管理员，您可以将受邀用户设定为组织管理员或普通组织成员。但是，如果您是普通组织成员，受邀用户则只能被设定为普通组织成员。

<Admonition type="info" icon="📘" title="说明">

每次您可以以相同角色邀请一个或多个用户加入组织。每个组织最多可拥有 1000 名成员。

</Admonition>

![invite-user-to-org-zh](/img/invite-user-to-org-zh.png)

## 撤销或重发邀请{#revoke-or-resend-an-invitation}

在您邀请用户加入组织后，Zilliz Cloud 会向用户发送邀请邮件。在用户接受邀请之前，您可以选择撤销或重发邀请。

![revoke-or-resend-org-invitation-zh](/img/revoke-or-resend-org-invitation-zh.png)

## 编辑成员角色或移出成员{#edit-a-members-role-or-remove-a-member}

当用户接受邀请后，他们将成为组织成员。之后，您可以根据需求编辑他们的角色或从组织中移出他们。

要编辑成员角色或移出组织成员，你必须是[组织管理员](./a-panorama-view#organization-roles)。

![edit-user-role-or-remove-org-user-zh](/img/edit-user-role-or-remove-org-user-zh.png)

## 离开组织{#leave-an-organization}

当您不再属于某个组织时，您可以选择离开组织。

注意，如果您是组织的唯一管理员，您将无法离开该组织，因为每个组织必须始终至少有一个组织管理员。

<Admonition type="caution" icon="🚧" title="警告">

一旦您离开组织，您对该组织及其相关资源的访问权限将被取消。

</Admonition>

![leave-organization-zh](/img/leave-organization-zh.png)

## 文档推荐{#related-topics}

- [角色与权限](./a-panorama-view) 

- [添加项目成员](./manage-projects-and-collaborator) 

- [删除组织](./delete-your-org)

