---
slug: /email-accounts
beta: FALSE
notebook: FALSE
type: origin
token: SVnkw5IkNiOfALkijr1cw91vn3L
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 邮箱
  - 账号

---

import Admonition from '@theme/Admonition';


# 邮箱账号

在 Zilliz Cloud 注册账户后，您可对账户信息进行管理。您可以编辑账号设置以及删除账号。

## 编辑账号个人信息{#modify-your-account-information}

1. 点击界面右上角人像图标，并选择**账号设置**。

1. 您可以编辑以下个人信息：

    - 姓名

    - 公司

![edit-account-settings](/img/edit-account-settings.png)

## 修改账号邮箱地址{#update-account-email-address}

<Admonition type="info" icon="📘" title="说明">

<p>修改账号邮箱地址不会影响账单信息和告警接收人。如有需要请自行进行手动更新。</p>

</Admonition>

## 修改手机号码{#update-mobile-phone-number}

<Admonition type="info" icon="📘" title="说明">

<p>修改完成后，旧手机号可用于注册新账号。</p>

</Admonition>

## 更改密码{#change-account-password}

## 开启或关闭 MFA{#enable-and-disable-mfa}

更多详情，请见[管理 MFA](./multi-factor-auth)。

## 关闭账号{#delete-your-account}

<Admonition type="caution" icon="🚧" title="警告">

<p>账号关闭后 30 天内，您将无法登录或注册 Zilliz Cloud。如需重开账号，请<a href="https://support.zilliz.com.cn/hc/zh-cn/signin">提交工单</a>。账号关闭账号 30 天后，所有账号数据将被清空。</p>

</Admonition>

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

- [查看事件](./view-activities_1) 

