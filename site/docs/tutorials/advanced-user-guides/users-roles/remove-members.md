---
slug: /remove-members
sidebar_position: 3
---

# 移除组织成员

本教程介绍如何移除组织成员。

当您邀请用户加入组织时，Zilliz Cloud 会向用户发送邀请电子邮件。在接受邀请前，被邀请的用户处于**待接受邀请**状态。一旦接受邀请，用户会变为**已验证**状态，表示已经加入组织。因此，移除成员分为 2 种情况：

- [在用户接受邀请前撤销邀请](./remove-members#remove-invite)

- [移除已接受邀请的成员](./remove-members#remove-members-who-have-accepted-the-invitation)

## 前提条件 {#prerequisites}

开始前，请先确保：

- 您已注册 Zilliz Cloud。如未注册，请先阅读[注册账号](./register-with-zilliz-cloud) 并完成注册。

- 您是组织管理员。更多用户角色和权限详情，请阅读[角色与权限](./roles-privileges)。

## 撤销邀请 {#remove-invite}

在用户接受邀请前，您可以按照以下步骤撤销邀请：

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com/login)。

1. 进入想要移除成员的组织。

1. 在左侧导航栏中，点击**组织成员**。

1. 找到处于**待接受邀请**状态的目标用户，点击**操作**列中的**...**图标，然后选择**撤销邀请**。

1. 在弹出的对话框中，点击**是**以确认撤销邀请。

![remove-members-1](/img/remove-members-1.png)

## 删除已接受邀请的成员 {#remove-members-who-have-accepted-the-invitation}

如果用户已接受邀请，则可以按照以下步骤将用户从组织中删除：

1. 依照[撤销邀请](./remove-members#remove-invite)中的前 3 个步骤进行操作。

1. 找到处于**已验证**状态的目标用户，点击**操作**列中的**...**图标，然后从下拉列表中选择**移除**。

1. 在弹出的对话框中，点击**是**以确认移除成员。

![remove-members-2](/img/remove-members-2.png)

## 结果 {#g-id-bold-result-g}

在执行上述操作之后，Zilliz Cloud 会向已被删除的用户发送电子邮件通知。您可以在组织用户列表页验证结果。

## 文档推荐 {#recommended-documents}

- [组织与项目](./organizations-projects) 

- [角色与权限](./roles-privileges) 

- [添加组织成员](./add-organization-members) 

- [添加项目成员](./add-project-collaborators-2) 
