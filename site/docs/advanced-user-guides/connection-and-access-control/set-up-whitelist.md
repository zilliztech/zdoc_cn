---
slug: /set-up-whitelist
sidebar_position: 2
---

# 设置白名单

在 Zilliz Cloud 中，白名单是针对项目的安全设置，适用于项目下的所有集群。设置白名单后，仅白名单中的 IP 地址可以访问您项目下的所有集群。白名单能够有效降低受到恶意攻击的风险

本教程将介绍如何设置白名单。

## 前提条件 {#prerequisites}

确保满足以下条件：

开始前，请先确保：

- 您已注册 Zilliz Cloud。如未注册，请先阅读[注册账号](./register-with-zilliz-cloud)并完成注册。

- 您是组织或项目管理员。更多用户角色和权限详情，请阅读[角色与权限](./roles-privileges) 。

## 操作步骤 {#procedure}

1. 登录 [Zilliz Cloud 界面](https://cloud.zilliz.com/login)。

1. 点击进入需要设置白名单的组织和项目。

1. 在左侧导航栏中，点击 **安全** > **+ ****添加IP地址**。

1. 在弹出的对话框中，输入 **IP地址（CIDR）和描述**。

1. 字段描述如下表所示。

  | **字段**     | **描述**                                                              |
  | ---------- | ------------------------------------------------------------------- |
  | IP地址（CIDR） | 您要添加到白名单中的 IP 地址或无类别域间路由（CIDR）。您可最多添加 20 个 CIDR。示例值：192.168.1.1/20。 |
  | 描述         | 白名单 IP 地址或 CIDR 的描述。                                                |

1. 点击 **添加** 完成操作。

:::caution

:::

![whitelist-ip-access](/img/whitelist-ip-access.png)

## 下一步 {#next}

- [管理 API 密钥](./manage-api-keys) 

- [管理身份凭证](./管理身份凭证) 
