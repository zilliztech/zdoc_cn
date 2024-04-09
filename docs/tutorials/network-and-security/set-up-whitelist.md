---
slug: /set-up-whitelist
beta: FALSE
notebook: FALSE
type: origin
token: RwEzw2l4siJB5Ake7FOcVU4knre
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 设置白名单

在 Zilliz Cloud 中，白名单是针对项目的安全设置，适用于项目下的所有集群。设置白名单后，仅白名单中的 IP 地址可以访问您项目下的所有集群。白名单能够有效降低受到恶意攻击的风险

本教程将介绍如何设置白名单。

## 前提条件{#before-you-start}

确保满足以下条件：

开始前，请先确保：

- 您已注册 Zilliz Cloud。如未注册，请先阅读[注册账号](./register-with-zilliz-cloud)并完成注册。

- 您是组织或项目管理员。更多用户角色和权限详情，请阅读[角色与权限](./resource-hierarchy) 。

## 操作步骤{#procedure}

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com.cn/login)。

1. 点击进入需要设置白名单的组织和项目。

1. 在左侧导航栏中，点击 __安全__ > __+ IP 地址__。

1. 在弹出的对话框中，输入 __IP地址（CIDR）和描述__。

1. 字段描述如下表所示。

    |  __字段__     |  __描述__                                                              |
    | ----------- | -------------------------------------------------------------------- |
    |  IP地址（CIDR） |  您要添加到白名单中的 IP 地址或无类别域间路由（CIDR）。您可最多添加 20 个 CIDR。示例值：192.168.1.1/20。 |
    |  描述         |  白名单 IP 地址或 CIDR 的描述。                                                |

1. 点击 __添加__ 完成操作。

<Admonition type="info" icon="📘" title="说明">

<p>如果白名单中没有记录，Zilliz Cloud 将允许所有 IP 地址访问项目集群。一旦添加了 CIDR ，仅CIDR 中的 IP 地址可以访问该集群。添加 0.0.0.0/0 的效果等同于白名单中没有记录。</p>

</Admonition>

![whitelist-ip-access](/img/whitelist-ip-access.png)

## 相关文档{#related-topics}

- [管理 API 密钥](./manage-api-keys)

- [管理身份凭证](./manage-cluster-credentials-console)

- [管理 MFA](./multi-factor-auth) 

