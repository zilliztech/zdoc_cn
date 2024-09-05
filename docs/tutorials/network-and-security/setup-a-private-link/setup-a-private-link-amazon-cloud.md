---
slug: /setup-a-private-link-amazon-cloud
beta: FALSE
notebook: FALSE
type: origin
token: EAJywEPq2iGDmNkEDDxcJDYPnsg
sidebar_position: 0
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 私网
  - 腾讯云

---

import Admonition from '@theme/Admonition';


# 创建亚马逊云科技 PrivateLink

本小节主要介绍如何在您的亚马逊云科技 VPC 终端节点和您托管在亚马逊云科技云上的 Zilliz Cloud 集群之间建立私网连接（PrivateLink）。

此功能仅适用于 Dedicated 集群。

<Admonition type="info" icon="📘" title="提示">

<p>Zilliz Cloud 不会针对私网连接收费，但您的云服务提供商可能会<a href="https://www.amazonaws.cn/privatelink/pricing/">收取一定费用</a>。</p>

</Admonition>

## 前提条件{#before-you-start}

请先确保：

- 您已[创建](./create-cluster)了 1 个部署在亚马逊云科技上的 Dedicated 集群。

## 添加 PrivateLink{#add-a-private-link}

登录Zilliz Cloud，并在左侧导航栏顶部的下拉菜单中选择目标项目。

在项目左侧导航栏中选择**安全** > **私网连接**，并单击**创建私网连接**。

您还可以在**集群详情**页面中的**连接信息**区域中单击**创建私网连接**。

![zh-ali-create-private-link](/img/zh-ali-create-private-link.png)

在弹出的**创建私网连接**对话框中，您需要选择**云服务提供商**和**云服务地域**。

<Admonition type="info" icon="📘" title="说明">

<p>私网连接创建完成后，将适用于同一项目下所有部署在该云服务提供商的所有集群。如有正在进行扩缩容或维护升级的集群，在集群恢复运行中状态后将同样适用私网连接。</p>

</Admonition>

在选择完云服务提供商和云服务地域后，请复制或保存对应的**服务名称**信息。

![amazon-privatelink](/img/amazon-privatelink.png)

## 获取 VPC 终端节点{#obtain-a-vpc-endpoint}

1. 前往亚马逊云科技 [VPC 控制面](https://console.amazonaws.cn/vpc/)板，在左侧菜单中，选择**终端节点**。点击右上角按钮，**创建终端节点**。

    ![S0eDba5rKoyTq7xDzUNc86OonJh](/img/S0eDba5rKoyTq7xDzUNc86OonJh.png)

1. 在**创建终端节点**页面中的**服务类别**区域，选择**其他终端节点服务**。

1. 在**服务名称**输入框中，输入此前在 Zilliz Cloud 添加 Private Link 弹窗中获取到的**服务名称**信息。点击**验证服务**。

    ![AjYKbFAvNoL7KPxDaDZc2BTmnId](/img/AjYKbFAvNoL7KPxDaDZc2BTmnId.png)

1. 服务名称通过验证后，选择**VPC**、**子网**与**安全组**，并点击创建。

    ![CIesb2ANUosJF6xuJRrcg8hUn4y](/img/CIesb2ANUosJF6xuJRrcg8hUn4y.png)

1. 等待终端节点创建完成。复制 VPC 终端节点 ID。

    ![vpc-id](/img/vpc-id.png)

1. 返回 Zilliz Cloud 弹窗，输入 VPC 终端节点 ID 并点击创建。

![amazon-privatelink-enter-vpc-endpoint-id](/img/amazon-privatelink-enter-vpc-endpoint-id.png)

### 获取私网连接{#obtain-a-private-link}

在您创建 Zilliz Cloud VPC 终端节点后，Zilliz Cloud 会进行验证。验证通过后，Zilliz Cloud 会为该终端节点分配一个私网连接。您可以前往集群详情页查看该私网连接。

<Admonition type="info" icon="📘" title="说明">

<p>该 PrivateLink 适用于该项目下所有部署于该云服务和地域的 Dedicated 集群。如果在创建 PrivateLink 时，该项目下部分 Dedicated 集群正处于维护中或扩缩容过程中，在维护和扩缩容完成后，该 PrivateLink 会自动适用于这些 Dedicated 集群。</p>

</Admonition>

## 设置 DNS 服务{#set-up-a-dns-record}

在通过 Zilliz Cloud 分配的私网连接访问集群之前，您必须在您的 DNS 区域中创建一个 CNAME 记录，以将私网连接解析为您的 VPC 终端节点的 DNS 名称。

1. **使用 Amazon Route 53 创建一个托管区域**

    Amazon Route 53 是一个基于 Web 的 DNS 服务。你需要创建一个 DNS 托管区域，以便向其中添加 DNS 记录。

    ![HiFtbITqAoe1EuxxUMpcA03vnCb](/img/HiFtbITqAoe1EuxxUMpcA03vnCb.png)

    ![PeJsb8ukDo59iDxRhXpcrEGRnmy](/img/PeJsb8ukDo59iDxRhXpcrEGRnmy.png)

    1. 登录您的亚马逊云科技账号并前往[托管区域](https://cn-northwest-1.console.aws.amazon.cn/route53/v2/hostedzones#)。

    1. 点击创建托管区域。

    1. 在托管区域配置部分，设置以下参数。

        <table>
            <tr>
          <th><p>参数名称</p></th>
          <th><p>参数说明</p></th>
            </tr>
            <tr>
          <td><p>域名</p></td>
          <td><p>这是您要将流量路由到其中的域的名称。<br/>此处应填写Zilliz Cloud 为目标集群分配的私网连接。</p></td>
            </tr>
            <tr>
          <td><p>描述</p></td>
          <td><p>您可以使用此值来区分具有相同名称的托管区。</p></td>
            </tr>
            <tr>
          <td><p>类型</p></td>
          <td><p>类型说明了您希望通过互联网还是在 Amazon VPC 中路由流量。<br/>您应该选择私有托管区。</p></td>
            </tr>
        </table>

    1. 在要与托管区关联的 VPC 中，添加您的 VPC ID。

1.  **在托管区中创建别名记录**

    Amazon Route 53 别名记录为 DNS 功能提供特定于 Route 53 的扩展。别名记录允许您将流量路由到选定 Amazon 资源。它们还允许您将流量从托管区域中的一个记录路由到另一个记录。创建别名记录后，您就可以将 Zilliz Cloud 私网连接映射到您的 VPC 终端节点 DNS 名称。

    ![G7Thb5aBaoEVQWxadcvcuLkFnwd](/img/G7Thb5aBaoEVQWxadcvcuLkFnwd.png)

    1. 在已创建的托管区详情页上，点击创建记录。

    1. 在创建记录页上，切换至别名，并进行如下操作：

        1. 在第一个下拉菜单中选择  **VPC 终端节点别名**。

        1. 在第二个下拉菜单中选择云服务地域。

        1. 输入此前创建的终端节点名称。

    1. 点击创建记录。

