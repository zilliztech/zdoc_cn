---
slug: /docs/multi-factor-authentication
beta: FALSE
notebook: FALSE
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 管理 MFA

本教程将介绍如何在 Zilliz Cloud 账号设置中管理多重身份认证（MFA）。目前，Zilliz Cloud 仅支持通过邮箱进行多重身份认证。

## 开启 MFA{#enable-mfa}

执行以下步骤以开启 MFA：

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com.cn/login)。

1. 点击界面右上角的人像符号。点击**账号设置**

1. 打开多重身份验证旁的开关，出现弹窗“开启 MFA”。

1. 输入您的账号密码，并点击**开启。**
    ![enable_mfa](/img/enable_mfa.png)

1. 请前往您的账号邮箱接收验证码，在“验证身份”弹窗的输入框中输入验证码并点击**确认**。
    <Admonition type="info" icon="📘" title="说明">    
    
    
    如未收到验证码或验证码过期，请点击重新发送验证码。

    </Admonition>

1. MFA 开启成功后，页面将自动跳转至登录页。

1. 请在登录页输入您的账号邮箱和密码，并点击**登录**按钮。

1. 请前往您的账号邮箱接收验证码，并在多重身份验证窗口的输入框中输入验证码。
    ![enable_mfa_login](/img/enable_mfa_login.png)

1. 通过验证后，您将自动登录并进入 Zilliz Cloud 操作界面。

## 关闭 MFA{#disable-mfa}

如过您已开启 MFA，请执行以下步骤以关闭 MFA：

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com.cn/login)。

1. 点击界面右上角的人像符号。点击**账号设置**

1. 关闭多重身份验证旁的开关，出现弹窗“关闭 MFA”。点击**关闭**按钮以确认关闭 MFA。
    ![disable_mfa](/img/disable_mfa.png)

1. 请前往您的账号邮箱接收验证码，在“关闭 MFA”弹窗的输入框中输入验证码并点击**关闭**。
    <Admonition type="info" icon="📘" title="说明">    
    
    
    如未收到验证码或验证码过期，请点击重新发送验证码。

    </Admonition>

1. MFA 关闭成功后，界面右上角弹出确认信息"关闭邮箱验证"。
    ![disable_mfa_success](/img/disable_mfa_success.png)

## 文档推荐

- [管理 API 密钥](./manage-api-keys) 

- [管理身份凭证](./manage-cluster-credentials) 

- [设置白名单](./set-up-whitelist) 
