---
slug: /manage-api-keys
sidebar_position: 0
---

# 管理 API 密钥

API 密钥是唯一标识符。在您请求访问 Zilliz Cloud 资源时，API 密钥用于身份验证。如需管理您的 API 密钥，请先登录 Zilliz Cloud，随后点击 **API 密钥**。您可以在 API 密钥页创建、查看和删除 API 密钥。目前，API 密钥仅适用于 [Cloud Meta](https://docs.zilliz.com.cn/reference/cloud-meta)、[Cluster Operations](https://docs.zilliz.com.cn/reference/cluster-operations) 和 [Import Operations](https://docs.zilliz.com.cn/reference/import-operations) 的 RESTful 接口，不适用于 [Collection Operations](https://docs.zilliz.com.cn/reference/collection-operations) 和 [Vector Operations](https://docs.zilliz.com.cn/reference/vector-operations) 的 RESTful 接口。

本教程将介绍如何管理 API 密钥。

## 创建 API 密钥 {#create-api-key}

### 前提条件 {#before-you-start}

开始前，请先确保：

- 您已注册 Zilliz Cloud。如未注册，请先阅读[注册账号](./register-with-zilliz-cloud) 并完成注册。

- 您是组织或项目管理员。更多用户角色和权限详情，请阅读[角色与权限](./roles-privileges) 。

- 您所属的组织中已创建项目。

### 操作步骤 {#procedure}

执行以下步骤以创建 API 密钥：

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com.cn/login)。

1. 点击进入想要创建 API 密钥的组织和项目。

1. 在项目页的左侧导航栏中点击 **API 密钥**。

1. 在 API 密钥页上，点击 **+ API 密钥**。

1. 在弹出的对话框中，输入 **API 密钥名称**，然后点击**创建**。名称可包含小写字母、数字和连字符，最大长度为 64 个字符。

![create-api-key-cn](/img/create-api-key-cn.png)

## 查看 API 密钥 {#view-api-key}

加入项目后，您可以查看该项目中创建的 API 密钥。

请执行以下步骤以查看 API 密钥：

1. 在项目页的左侧导航栏中，点击 **API 密钥**。

1. 找到目标 API 密钥，点击**显示**或**复制**图标以查看或复制 API 密钥。

:::info 说明

 请务必保证您的 API 密钥安全。为防止出现未经授权的访问，请不要随意与他人分享您的 API 密钥。如您怀疑 API 密钥已被泄漏，请立即删除并重新创建新的 API 密钥。

:::

![view-api-keys-cn](/img/view-api-keys-cn.png)

## 删除 API 密钥 {#delete-api-key}

如果您是组织或项目管理员，您可以执行以下步骤删除不再需要的 API 密钥：

1. 在项目页的左侧导航栏中，点击 **API 密钥**。

1. 找到目标 API 密钥，在**操作**列中点击**…**图标，然后选择“删除”。

1. 在出现的对话框中，输入 API 密钥的名称以确认操作，然后单击“删除”。

:::caution 注意

删除 API 密钥时请务必小心。删除 API 密钥后，使用该密钥访问资源的权限将被立即撤销。在删前，请务必确保不再需要使用该 API 密钥。

:::

![delete-api-key-cn](/img/delete-api-key-cn.png)

## 文档推荐 {#related-documents}

- [管理身份凭证](./manage-cluster-credentials) 

- [设置白名单](./set-up-whitelist) 

- [管理 MFA](./manage-mfa) 
