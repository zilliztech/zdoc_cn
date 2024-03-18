---
slug: /setup-a-private-link-tencent-cloud
beta: FALSE
notebook: FALSE
token: Pzu4wpY64iWmO6kBsaYcNPmPnNf
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# 创建私网连接（腾讯云）

本小节主要介绍如何在您的腾讯云 VPC 和您托管在腾讯云上的 Zilliz Cloud 集群之间建立私网连接。

## 配置思路{#configuration-roadmap}

如需启用访问 Zilliz Cloud 集群的私网连接，您需要：

- 通过腾讯云控制台指定云服务地域开通私网连接，并在您的 VPC 中创建一个终端节点。

- 将上述信息提交给 Zilliz Cloud 以完成信息登记。

- 前往腾讯云控制台，使用该域名前缀创建一条私网解析记录。

## 前提条件{#before-you-start}

- 您已经注册了 Zilliz Cloud。

- 您已经创建了 Zilliz Cloud 腾讯云集群。

- 您在上述 Zilliz Cloud 腾讯云集群所在云服务地域有 [VPC](https://console.cloud.tencent.com/vpc/vpc)。

    该 VPC 中部署了需要访问上述 Zilliz Cloud 腾讯云集群的业务资源。如果您尚未创建 VPC，可前往腾讯云[私有网络](https://console.cloud.tencent.com/vpc/vpc)管理界面，完成创建。

## 配置步骤{#procedures}

本节将按照配置思路详细介绍如何为您的 Zilliz Cloud 腾讯云集群创建私网连接。

### 获取主帐号 ID

为您的 Zilliz Cloud 腾讯云集群创建私网连接，需要提供您的腾讯云主帐号 ID。您可以登录腾讯云控制台，前往[帐号信息](https://console.cloud.tencent.com/developer)页面获取。

![MKLlbEdCroYr8ixaijxcxXmTnFf](/img/MKLlbEdCroYr8ixaijxcxXmTnFf.png)

<Admonition type="info" icon="📘" title="说明">

<p>在截图中，界面右上角显示了当前登录帐号的帐号邮箱（<code>john.doe@zilliz.com</code>）和帐号类型（<code>主帐号</code>）。此时，您可以复制或记录<strong>基本信息</strong>中的<strong>帐号 ID</strong> 右侧显示的字符串。</p>
<p>如果界面右上角显示的帐号类型不是<code>主帐号</code>，请向您的组织查询。</p>

</Admonition>

复制或记录主帐号 ID 备用。

### 获取 Zilliz Cloud VPC 信息

前往您的 Zilliz Cloud 腾讯云集群管理页面。

1. 在**连接信息**区域，单击 **+ 私网连接**。

1. 在弹出的**创建私网连接**对话框的**主帐号 ID**中，填入上述复制或记录的腾讯云主帐号 ID，并单击**添加**。

1. 复制 **Zilliz Cloud 腾讯云帐号 ID (UIN)** 和 **Zilliz 终端节点服务 ID**。

    ![KI92b9ydtoEkELxhk1gcDVQ9nsc](/img/KI92b9ydtoEkELxhk1gcDVQ9nsc.png)

    <Admonition type="info" icon="📘" title="说明">

    <p>当前步骤尚未完成，请勿关闭当前页面。</p>
    <p>待终端节点实例创建完成后，需要填写创建好的终端节点实例 ID。</p>

    </Admonition>

### 创建终端节点实例

前往腾讯云[终端节点](https://console.cloud.tencent.com/vpc/vpce)管理界面，

1. 将左上角的云服务地域修改为您的 Zilliz Cloud 腾讯云集群所在地域（示例值为**南京**）。

1. 并在其右侧的下拉选项框中选择需要访问您的 Zilliz Cloud 腾讯云集群的业务资源所在 VPC（示例值为 **zilliz (10.0.0.0/16)**）。

1. 单击**新建**，在弹出的**新建终端节点**中填写必要的信息。

    ![BZfqb95ytogXYNxsvk5cuPA3nlg](/img/BZfqb95ytogXYNxsvk5cuPA3nlg.png)

    |  参数名称   |  参数说明                                                                                                          |
    | ------- | -------------------------------------------------------------------------------------------------------------- |
    |  名称     |  终端节点名称。<br/> 可根据需要自定义。                                                                                     |
    |  所在地域   |  终端节点所在云服务地域。                                                                                                  |
    |  所属网络   |  需要通过当前终端节点访问您的 Zilliz Cloud 腾讯云集群的业务资源所在 VPC。                                                                 |
    |  所属子网   |  已选择的 VPC 中的子网。                                                                                                |
    |  IP 地址  |  终端节点的 IP 地址。<br/> 可根据需要选择 **自动分配** 或 **手动填写**。                                                             |
    |  服务类型   |  通过当前终端节点连接的服务类型。<br/> 请选择 **私有服务**。                                                                        |
    |  对端帐号类型 |  Zilliz Cloud 帐户相关信息。<br/> 请选择 **其它账户**，并填写之前复制或记录的 **Zilliz Cloud 腾讯云帐号 ID (UIN)** 和 **Zilliz 终端节点服务 ID。** |

1. 单击**验证**并**确定**后，返回[终端节点](https://console.cloud.tencent.com/vpc/vpce)管理界面。复制 **ID/名称**列中的终端节点实例 ID。

    ![RHZcbNCTtoNwh7xCnhycf9HAnZc](/img/RHZcbNCTtoNwh7xCnhycf9HAnZc.png)

### 在 Zilliz Cloud 上接受连接请求

返回 Zilliz Cloud 控制台，将已创建的终端节点实例 ID 填入**创建私网连接**对话框中，并单击**创建**。

![IhusbW7bIo7UTMxSCWfcF87RnGg](/img/IhusbW7bIo7UTMxSCWfcF87RnGg.png)

稍等片刻，腾讯云控制台[终端节点](https://console.cloud.tencent.com/vpc/vpce)终端管理界面中终端节点的状态将由**待接受**变为**可用**。

![XuhcbZ4IZoDDDNxLJCQcRZrZnjd](/img/XuhcbZ4IZoDDDNxLJCQcRZrZnjd.png)

此时，您需要复制或记录

- 该终端节点的 **IP 地址**（示例值为 **10.0.0.5**）

- 您的 Zilliz Cloud 腾讯云集群私网连接地址 （示例值为 **in01-xxxxxxxxxxx-privatelink**）。

### 配置私有域解析

前往腾讯云[私有域解析](https://console.cloud.tencent.com/privatedns)管理页面。

1. 开通私有域解析服务。如已开通，可忽略此步骤。

    ![UX11bvnEJo9P6wxFHdicnVCIn6d](/img/UX11bvnEJo9P6wxFHdicnVCIn6d.png)

1. 进入**私有域列表**，单击**新建私有域**。

    ![O7iPbju0RoHKtnxHHjKcCarLnIh](/img/O7iPbju0RoHKtnxHHjKcCarLnIh.png)

1. 填写私有域解析相关信息。

    ![J25YbPFCYo8j5gxwk98cbjv0nkc](/img/J25YbPFCYo8j5gxwk98cbjv0nkc.png)

    |  参数名称   |  参数说明                                                                                                                           |
    | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
    |  域名     |  Zilliz Cloud 腾讯云集群域名。<br/> 请输入您的 Zilliz Cloud 腾讯云集群所在云服务地域的私有域地址。<br/> - `tc-ap-nanjing.cloud-uat.zilliz.cn`(南京)<br/> |
    |  关联 VPC |  选择关联上述私有域名的 VPC。<br/> 请选择待接入 Zilliz Cloud 腾讯云集群的业务资源所在 VPC。并将其移动到**已选择**列表框中。                                               |

    其它参数保持默认即可。

1. 单击**确定**，即可查看已创建的私有域记录。

    ![SWqlbdHYUoYgEGxwNeWc2dJ8nKf](/img/SWqlbdHYUoYgEGxwNeWc2dJ8nKf.png)

1. 单击刚才创建的私有域记录**操作**列中的**解析**，并在解析记录列表中添加解析记录。

    ![GaSsbRvhJooUcKxOCQqc8WHEnQf](/img/GaSsbRvhJooUcKxOCQqc8WHEnQf.png)

    |  参数名称 |  参数说明                                                                                                               |
    | ----- | ------------------------------------------------------------------------------------------------------------------- |
    |  主机记录 |  您的 Zilliz Cloud 腾讯云集群的私网连接域名前缀。<br/> 如果您的集群 ID 为 **in01-xxxxxxxxxxx**，则该域名前缀为 **in01-xxxxxxxxxxx-privatelink**。 |
    |  记录类型 |  当前解析记录的类型。<br/> 请选择创建 A 记录。                                                                                     |
    |  记录值  |  上述域名前缀完成解析后的 IP 地址。<br/> 请输入终端节点实例的 IP 地址。                                                                      |

    其它参数保持默认即可。添加完成后，单击**保存**。

    ## 后续操作{#next-steps}

    在私网连接创建完成后，可按照集群详情页面右上角的连接指南使用私网连接进行连通性验证。

