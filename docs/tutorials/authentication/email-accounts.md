---
slug: /email-accounts
beta: FALSE
notebook: FALSE
type: origin
token: SVnkw5IkNiOfALkijr1cw91vn3L
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 邮箱账号

在 Zilliz Cloud 注册账户后，您可对账户信息进行管理。您可以编辑账号设置以及删除账号。

## 编辑账号信息{#modify-your-account-information}

1. 点击界面右上角人像图标，并选择**账号设置**。

1. 在**账号设置**弹窗中编辑或修改账号信息，包括：

- 邮箱地址

    修改邮箱地址后，您需要使用新的邮箱地址重新登录 Zilliz Cloud。

    邮箱地址修改不影响原有的账单信息和告警接收人。如有将账单和告警接收人同步更新，请前往[账单](./view-invoice#view-billing-information)和[告警](./manage-organization-alerts)页面手动更新。

- 手机号码

- 账号密码

- 个人信息

![edit-account-settings](/img/edit-account-settings.png)

## 删除账号{#delete-your-account}

### 前提条件{#before-you-start}

- 如果您是项目唯一的项目管理员且项目含有集群，请先[删除项目集群](./manage-cluster)。

- 如果您是组织唯一的组织管理员，请先[删除组织](./delete-your-organization)。

### 操作步骤{#procedures}

1. 点击界面右上角人像图标，并选择**账号设置**。

1. 在账号设置弹窗中，点击底部**删除账号**按钮。

1. 在**删除账号**弹窗中，再次输入您的账号。点击获取验证码，并输入发送至您邮箱中的验证码。阅读 3 条注意事项后并勾选。点击**下一步**。

1. 填写反馈问卷，点击按钮提交反馈并删除账号。

1. 账号成功删除后，您将收到邮件提醒。

<Admonition type="caution" icon="🚧" title="警告">

<p>删除账号的操作不可逆，请谨慎操作！</p>

</Admonition>

![delete-account-cn](/img/delete-account-cn.png)

## 相关文档{#related-topics}

- [管理组织与成员](./organizations)

- [删除组织](./delete-your-organization)

- [查看事件](./view-activities) 

