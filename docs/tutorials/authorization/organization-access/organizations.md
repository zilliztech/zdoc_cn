---
slug: /organizations
beta: FALSE
notebook: FALSE
token: I9ktwIylxiDTKik4ckUctIOvnjm
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 组织管理

在 Zilliz Cloud 平台上，每个组织下可以包含多个项目。注册 Zilliz Cloud 后，您会自动成为您所创建组织的管理员。您无法创建新的组织，但可以通过邀请加入其他已存在的组织。

本指南将引导您了解如何管理组织。

## 查看组织{#view-organizations}

当您登录到 Zilliz Cloud 控制台后，会进入组织列表页面。在这里，您可以查看已加入的组织。

要快速查看您加入的所有组织，点击左上角的**所有组织**。

![zh-view-organizations](/img/zh-view-organizations.png)

## 编辑组织名称{#edit-organization-name}

要编辑组织名称，您必须是[组织管理员](./resource-hierarchy#organization-roles)。

您可以通过以下任一种方式编辑组织名称：

- 在组织列表页面编辑组织名称。

    ![zh-rename-organization](/img/zh-rename-organization.png)

- 进入一个组织，在**系统设置**页面编辑组织名称。

![edit-organization-name-zh](/img/edit-organization-name-zh.png)

## 离开组织{#leave-an-organization}

当您不再属于某个组织时，您可以选择离开组织。

注意，如果您是组织的唯一管理员，您将无法离开该组织，因为每个组织必须始终至少有一个组织管理员。

<Admonition type="caution" icon="🚧" title="警告">

<p>一旦您离开组织，您对该组织及其相关资源的访问权限将被取消。</p>

</Admonition>

您可以通过以下任一种方式离开组织：

- 在组织列表页面离开组织。

    ![zh-leave-organization](/img/zh-leave-organization.png)

- 进入一个组织，在**组织用户**页面离开组织。

![leave-organization-zh](/img/leave-organization-zh.png)

## 文档推荐{#related-topics}

- [角色与权限](./resource-hierarchy)

- [添加项目成员](./projects)

- [删除组织](./delete-your-organization)

