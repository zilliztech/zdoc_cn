---
slug: /setup-a-private-link-tencent-cloud
beta: FALSE
notebook: FALSE
type: origin
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

### 获取主帐号 ID{#obtain-main-account}

为您的 Zilliz Cloud 腾讯云集群创建私网连接，需要提供您的腾讯云主帐号 ID。您可以登录腾讯云控制台，前往[帐号信息](https://console.cloud.tencent.com/developer)页面获取。

![MKLlbEdCroYr8ixaijxcxXmTnFf](/img/MKLlbEdCroYr8ixaijxcxXmTnFf.png)

<Admonition type="info" icon="📘" title="说明">

<p>在截图中，界面右上角显示了当前登录帐号的帐号邮箱（<code>john.doe@zilliz.com</code>）和帐号类型（<code>主帐号</code>）。此时，您可以复制或记录<strong>基本信息</strong>中的<strong>帐号 ID</strong> 右侧显示的字符串。</p>
<p>如果界面右上角显示的帐号类型不是<code>主帐号</code>，请向您的组织查询。</p>

</Admonition>

复制或记录主帐号 ID 备用。

### 获取 Zilliz Cloud VPC 信息{#obtain-zilliz-cloud-vpc}

前往您的 Zilliz Cloud 腾讯云集群管理页面。

1. 在**连接信息**区域，单击 **+ 私网连接**。

    ![zh-ali-create-private-link](/img/zh-ali-create-private-link.png)

1. 在弹出的**创建私网连接**对话框的**主帐号 ID**中，填入上述复制或记录的腾讯云主帐号 ID。

    ![GGrZbPdvLoojPHxvt2jcicHqndg](/img/GGrZbPdvLoojPHxvt2jcicHqndg.png)

1. 单击**添加**完成主帐号 ID 验证。

    ![zh-ali-main-account-id-verified](/img/zh-ali-main-account-id-verified.png)

1. 复制 **Zilliz Cloud 腾讯云帐号 ID (UIN)** 和 **Zilliz 终端节点服务 ID**。

    <Admonition type="info" icon="📘" title="说明">

    <p>当前步骤尚未完成，请勿关闭当前页面。</p>
    <p>待终端节点实例创建完成后，需要填写创建好的终端节点实例 ID。</p>

    </Admonition>

### 创建终端节点实例{#obtain-vpc-endpoint}

前往腾讯云[终端节点](https://console.cloud.tencent.com/vpc/vpce)管理界面，

1. 将左上角的云服务地域修改为您的 Zilliz Cloud 腾讯云集群所在地域（示例值为**北京**）。

1. 并在其右侧的下拉选项框中选择需要访问您的 Zilliz Cloud 腾讯云集群的业务资源所在 VPC（示例值为 **Default-VPC (172.21.0.0/16)**）。

1. 单击**新建**，在弹出的**新建终端节点**中填写必要的信息。

    ![A8W1bDGpxo7fyMxiEdPcrRxjnKg](/img/A8W1bDGpxo7fyMxiEdPcrRxjnKg.png)

    <table>
       <tr>
         <th><p>参数名称</p></th>
         <th><p>参数说明</p></th>
       </tr>
       <tr>
         <td><p>名称</p></td>
         <td><p>终端节点名称。</p><p>可根据需要自定义。</p></td>
       </tr>
       <tr>
         <td><p>所在地域</p></td>
         <td><p>终端节点所在云服务地域。</p></td>
       </tr>
       <tr>
         <td><p>所属网络</p></td>
         <td><p>需要通过当前终端节点访问您的 Zilliz Cloud 腾讯云集群的业务资源所在 VPC。</p></td>
       </tr>
       <tr>
         <td><p>所属子网</p></td>
         <td><p>已选择的 VPC 中的子网。</p></td>
       </tr>
       <tr>
         <td><p>IP 地址</p></td>
         <td><p>终端节点的 IP 地址。</p><p>可根据需要选择 <strong>自动分配</strong> 或 <strong>手动填写</strong>。</p></td>
       </tr>
       <tr>
         <td><p>服务类型</p></td>
         <td><p>通过当前终端节点连接的服务类型。</p><p>请选择 <strong>私有服务</strong>。</p></td>
       </tr>
       <tr>
         <td><p>对端帐号类型</p></td>
         <td><p>Zilliz Cloud 帐户相关信息。</p><p>请选择 <strong>其它账户</strong>，并填写之前复制或记录的 <strong>Zilliz Cloud 腾讯云帐号 ID (UIN)</strong> 和 <strong>Zilliz 终端节点服务 ID。</strong></p></td>
       </tr>
    </table>

1. 单击**验证**并**确定**后，返回[终端节点](https://console.cloud.tencent.com/vpc/vpce)管理界面。复制 **ID/名称**列中的终端节点实例 ID。

    ![BnUnbZeoYohkeRxUNfzcIrutnJf](/img/BnUnbZeoYohkeRxUNfzcIrutnJf.png)

### 在 Zilliz Cloud 上接受连接请求{#accept-connection-request}

返回 Zilliz Cloud 控制台，将已创建的终端节点实例 ID 填入**创建私网连接**对话框中，并单击**创建**。

![create_private_link_tencent](/img/create_private_link_tencent.png)

稍等片刻，腾讯云控制台[终端节点](https://console.cloud.tencent.com/vpc/vpce)终端管理界面中终端节点的状态将由**待接受**变为**可用**。

![Zv2FbvP6PoRsCTxXhWjccyGXnSd](/img/Zv2FbvP6PoRsCTxXhWjccyGXnSd.png)

此时，您需要复制或记录

- 该终端节点的 **IP 地址**（示例值为 **172.21.0.4**）

- 您的 Zilliz Cloud 腾讯云集群私网连接地址 （示例值为 **in01-xxxxxxxxxxx-privatelink.tc-ap-xxxxxxx**）。

### 配置私有域解析{#configure-private-zone}

前往腾讯云[私有域解析](https://console.cloud.tencent.com/privatedns)管理页面。

1. 开通私有域解析服务。如已开通，可忽略此步骤。

    ![UX11bvnEJo9P6wxFHdicnVCIn6d](/img/UX11bvnEJo9P6wxFHdicnVCIn6d.png)

1. 进入**私有域列表**，单击**新建私有域**。

    ![O7iPbju0RoHKtnxHHjKcCarLnIh](/img/O7iPbju0RoHKtnxHHjKcCarLnIh.png)

1. 填写私有域解析相关信息。

    ![J25YbPFCYo8j5gxwk98cbjv0nkc](/img/J25YbPFCYo8j5gxwk98cbjv0nkc.png)

    <table>
       <tr>
         <th><p>参数名称</p></th>
         <th><p>参数说明</p></th>
       </tr>
       <tr>
         <td><p>域名</p></td>
         <td><p>Zilliz Cloud 腾讯云集群域名。</p><p>请输入您的 Zilliz Cloud 腾讯云集群所在云服务地域的私有域地址。</p><ul><li><code>vectordb.zilliz.com.cn</code></li></ul></td>
       </tr>
       <tr>
         <td><p>关联 VPC</p></td>
         <td><p>选择关联上述私有域名的 VPC。</p><p>请选择待接入 Zilliz Cloud 腾讯云集群的业务资源所在 VPC。并将其移动到<strong>已选择</strong>列表框中。</p></td>
       </tr>
    </table>

    其它参数保持默认即可。

1. 单击**确定**，即可查看已创建的私有域记录。

    ![IQepbWHV6o7BKixCms0cEQQ3n0O](/img/IQepbWHV6o7BKixCms0cEQQ3n0O.png)

1. 单击刚才创建的私有域记录**操作**列中的**解析**，并在解析记录列表中添加解析记录。

    ![B4uJbhlDOogfjrxkNjdcaT1fnZC](/img/B4uJbhlDOogfjrxkNjdcaT1fnZC.png)

    <table>
       <tr>
         <th><p>参数名称</p></th>
         <th><p>参数说明</p></th>
       </tr>
       <tr>
         <td><p>主机记录</p></td>
         <td><p>您的 Zilliz Cloud 腾讯云集群的私网连接域名前缀。</p><p>如果您的集群 ID 为 <strong>in01-xxxxxxxxxxx</strong>，云地域 ID 为 <strong>tc-ap-xxxxxxx</strong>，则该域名前缀为 <strong>in01-xxxxxxxxxxx-privatelink.tc-ap-xxxxxxx</strong>。例如：</p><ul><li><p><strong>in01-xxxxxxxxxxx-privatelink.tc-ap-beijing</strong> (北京)</p></li><li><p><strong>in01-xxxxxxxxxxx-privatelink.tc-ap-shanghai</strong> (上海)</p></li></ul></td>
       </tr>
       <tr>
         <td><p>记录类型</p></td>
         <td><p>当前解析记录的类型。</p><p>请选择创建 A 记录。</p></td>
       </tr>
       <tr>
         <td><p>记录值</p></td>
         <td><p>上述域名前缀完成解析后的 IP 地址。</p><p>请输入终端节点实例的 IP 地址。</p></td>
       </tr>
    </table>

    其它参数保持默认即可。添加完成后，单击**保存**。

## 后续操作{#next-steps}

在私网连接创建完成后，可按照集群详情页面右上角的连接指南使用私网连接进行连通性验证。

