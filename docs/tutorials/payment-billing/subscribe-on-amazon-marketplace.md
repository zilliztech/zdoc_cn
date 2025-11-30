---
title: "订阅亚马逊云科技 Marketplace | Cloud"
slug: /subscribe-on-amazon-marketplace
sidebar_label: "订阅亚马逊云科技 Marketplace"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Zilliz Cloud 现已登录亚马逊云科技 Marketplace。本章主要介绍如何在亚马逊云科技 Marketplace上订阅 Zilliz Cloud。 | Cloud"
type: origin
token: LNxnwCaoeiwvxVkQqCTcWmMFn5g
sidebar_position: 5
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 阿里云
  - 云市场

---

import Admonition from '@theme/Admonition';


# 订阅亚马逊云科技 Marketplace

Zilliz Cloud 现已登录亚马逊云科技 Marketplace。本章主要介绍如何在亚马逊云科技 Marketplace上订阅 Zilliz Cloud。

<Admonition type="info" icon="📘" title="说明">

<p>订阅后，您可以通过亚马逊云科技 Marketplace 支付亚马逊云科技集群的用量。如果您在 Zilliz Cloud 使用了多云实例，也可通过亚马逊云科技 Marketplace 统一支付。</p>

</Admonition>

## 准备工作\{#before-you-start}

- 您已注册并登录您的亚马逊云科技帐号。

## 操作步骤\{#procedures}

1. 前往[亚马逊云科技 Marketplace ](https://awsmarketplace.amazonaws.cn/marketplace/pp/prodview-qu54xpewqak6c?sr=0-1&ref_=beagle&applicationId=AWS-Marketplace-Console)开通 Zilliz Cloud 服务。

    1. 在 Zilliz Cloud 服务主页中单击**继续订阅**。

        ![subscribe-on-amazon-marketplace-cn](/img/subscribe-on-amazon-marketplace-cn.png)

    1. 在订阅页面顶部蓝色横幅中，单击**设置您的账户**。

        ![subscribe-on-amazon-marketplace-cn-manage-you-account](/img/subscribe-on-amazon-marketplace-cn-manage-you-account.png)

1. 为您的 Zilliz Cloud 组织绑定支付方式。

    1. 如果您已注册 Zilliz Cloud 但尚未授权使用亚马逊云科技 Marketplace 订阅为您的 Zilliz Cloud 组织缴纳费用，将在您登录后直接进入绑定流程。

    1. 如果您尚未注册 Zilliz Cloud。您可以单击“注册”。在完成注册流程后进入绑定流程。

    ![subscribe-on-amazon-marketplace-cn-authentication](/img/subscribe-on-amazon-marketplace-cn-authentication.png)

1. 在组织列表中选择需要绑定该支付方式的 Zilliz Cloud 组织，并单击“确认绑定”。列表中会罗列出所有您加入的组织。您仅能选择绑定您负责管理的一个组织。

    当列表中不存在可以绑定的组织时，“确认绑定”不可用。此时，您需要创建一个以您为管理员的组织后才能继续该操作。

    ![subscribe-on-amazon-marketplace-cn-link-org](/img/subscribe-on-amazon-marketplace-cn-link-org.png)

1. Zilliz Cloud 开始处理您的授权请求，并在处理完成后展示如下图所示内容。

    ![subscribe-on-amazon-marketplace-cn-link-success](/img/subscribe-on-amazon-marketplace-cn-link-success.png)

    此时，您可以前往 Zilliz Cloud **帐单概览**页面。如果右下角支付方式区域**已绑定**标签，并展示**亚马逊云科技 Marketplace 订阅**，恭喜您成功开通亚马逊云科技 Marketplace 扣费渠道。

    ![subscribe-on-amazon-marketplace-cn-complete-on-billing](/img/subscribe-on-amazon-marketplace-cn-complete-on-billing.png)

## 取消订阅\{#unsubscribe-amazon-marketplace}

1. 前往亚马逊云科技 Marketplace [管理订阅](https://console.amazonaws.cn/marketplace/home?region=cn-north-1#/subscriptions?Feedback=true)页面。

1. 在您的订阅中，找到 Zilliz Cloud，点击操作栏中的**管理**按钮。

    ![cancel-subscription-on-amazon-marketplace-cn-manage](/img/cancel-subscription-on-amazon-marketplace-cn-manage.png)

1. 在 Zilliz Cloud 订阅详情页面中，点击**操作>取消订阅**。

    ![cancel-subscription-on-amazon-marketplace-cn-cancel](/img/cancel-subscription-on-amazon-marketplace-cn-cancel.png)

1. 确认取消订阅。

    ![cancel-subscription-on-amazon-marketplace-cn-confirm](/img/cancel-subscription-on-amazon-marketplace-cn-confirm.png)

1. 取消订阅后，Zilliz Cloud 将从您的订阅列表中消失。

## 切换用于订阅的亚马逊云科技账号\{#update-amazon-marketplace-subscription}

如果您当前使用亚马逊云科技账号 A 在 Marketplace 订阅 Zilliz Cloud，但需要切换为使用亚马逊云科技账号 B 订阅，您可以：

1. 使用亚马逊云科技账号 A 登录亚马逊云科技，并在亚马逊云科技 Marketplace 中[取消订阅](./subscribe-on-aliyun-marketplace#unsubscribe-alibaba-marketplace) Zilliz Cloud。

1. 取消订阅成功后，登出亚马逊云科技账号 A，并使用亚马逊云科技账号 B 重新登录。

1. 使用亚马逊云科技账号 B 在 Marketplace 中[订阅](./subscribe-on-aliyun-marketplace#procedures) Zilliz Cloud。

订阅成功后，您可以前往 Zilliz Cloud 的账单页面，查看付款方式。点击亚马逊云科技 Marketplace 右侧的 ID 后可查看用于订阅的亚马逊云科技 Account ID，确认切换订阅账号是否成功。

<Admonition type="info" icon="📘" title="说明">

<p>我们建议您在一小时内容完成上述订阅账号切换操作，以免影响您服务。如遇到任何问题，请<a href="https://support.zilliz.com.cn/hc/zh-cn">提交工单</a>。</p>

</Admonition>

![view-amazon-subscription-id-cn](/img/view-amazon-subscription-id-cn.png)

## 常见问题\{#troubleshooting}

**在绑定云市场订阅和 Zilliz Cloud 组织过程中遇到无可用组织或组织不可用的问题该怎么办？**

造成无可用组织或组织不可用的原因可能如下：

1. **权限不足**

    组织旁将展示**“权限不足的”**标签，界面如下所示。

    ![insufficient-permission-subscription-cn](/img/insufficient-permission-subscription-cn.png)

    您的角色必须为**组织管理员**或**组织账单管理员**才可将云市场订阅绑定至 Zilliz Cloud 组织。如果您是组织成员，您不具备操作权限，请联系组织管理员。

1. **所有组织都已绑定云市场订阅**

    组织旁将展示**“已绑定云市场订阅”**标签，界面如下所示。

    ![marketplace-already-linked-subscription-cn](/img/marketplace-already-linked-subscription-cn.png)

    1. 如需更新组织已绑定的云市场订阅，请先[解绑](./subscribe-on-aliyun-marketplace#unsubscribe-alibaba-marketplace)订阅，再重新绑定新的云市场订阅。

    1. 如果您需要多个组织，每个分别绑定不同的云市场订阅，您可以：

        1. [注册](./register-with-zilliz-cloud)一个新的 Zilliz Cloud 账号并创建一个新组织。然后将您已有账号[邀请](./project-users#invite-a-user-to-a-project)进入新组织，并授予组织管理员的权限。这样一来，您将隶属于多个组织，并且可以为每个组织绑定不同的云市场订阅。

        1. [提交工单](http://support.zilliz.com.cn)，联系我们为您创建新组织。当前，Zilliz Cloud 暂不支持手动创建新组织。

1. **组织列表中无组织**

    如果您曾关闭过账号或退出所有组织，您的组织列表中会没有组织，界面如下所示。

    ![no-organization-during-subcription-cn](/img/no-organization-during-subcription-cn.png)

    这种情况下，您可以：

    1. 创建一个新组织。

    1. 等待其他用户向您[发送组织邀请](./project-users#invite-a-user-to-a-project)，并将您设置为组织管理员。

    1. [提交工单](http://support.zilliz.com.cn)，联系我们为您创建一个新组织。

## 后续操作\{#next-steps}

- 您可以前往 [Zilliz Cloud 文档站](https://docs.zilliz.com.cn)查看产品使用指南。

- 您可以直接前往 [Zilliz Cloud](https://cloud.zilliz.com.cn/login) 登录使用我们的服务。

- 您可以前往亚马逊云科技[申请开票](https://www.amazonaws.cn/support/fapiao/)。

