---
title: "创建阿里云私网连接（Private Link） | Cloud"
slug: /setup-a-private-link-alicloud
sidebar_label: "创建阿里云私网连接（Private Link）"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "本小节主要介绍如何在您的阿里云 VPC 和您托管在阿里云上的 Zilliz Cloud 集群之间建立私网连接。 | Cloud"
type: origin
token: OZ5Ywbjm0idqAqkOdZrcQU3Wncb
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 私网
  - 阿里云

---

import Admonition from '@theme/Admonition';


# 创建阿里云私网连接（Private Link）

本小节主要介绍如何在您的阿里云 VPC 和您托管在阿里云上的 Zilliz Cloud 集群之间建立私网连接。

此功能仅适用于 Dedicated 集群。

您需要在项目层级创建 Private Link。创建完成后，Private Link 将适用于项目下所有与 Private Link 云服务提供商和地域相同的集群。

<Admonition type="info" icon="📘" title="提示">

<p>Zilliz Cloud 不会针对私网连接收费，但您的云服务提供商可能会<a href="https://help.aliyun.com/zh/privatelink/product-overview/billing-description">收取一定费用</a>。</p>

</Admonition>

## 配置思路{#configuration-roadmap}

如需启用访问 Zilliz Cloud 集群的私网连接，您需要：

- 通过阿里云控制台在您的 VPC 中创建一个终端节点，并为其选择安全组、可用区和交换机。

- 将上述信息提交给 Zilliz Cloud 注册私网连接。Zilliz Cloud 将根据提交的信息为您的集群分配一个域名前缀。

- 前往阿里云控制台，使用该域名前缀创建一条私网解析记录。

## 前提条件{#before-you-start}

- 您已经注册 Zilliz Cloud 并创建了 Zilliz Cloud 阿里云集群。

- 您在上述 Zilliz Cloud 阿里云集群所在云服务地域有一个 VPC。

## 创建 Private Endpoint{#create-private-endpoint}

本节将按照配置思路详细介绍如何为您的 Zilliz Cloud 阿里云集群创建私网连接。

登陆 Zilliz Cloud，选择合适的项目。在项目左侧导航栏中选择**网络 &gt; 私网连接**，并单击**创建 Private Endpoint**。

![zh-create-private-link](/img/zh-create-private-link.png)

### 选择云服务提供商和地域{#select-cloud-provider-and-region}

在云服务提供商下拉菜单中选择阿里云。在地域下拉菜单中选择与您目标集群相同的地域。

![zh-ali-create-private-link](/img/zh-ali-create-private-link.png)

### 创建终端服务{#create-endpoint-service}

登录阿里云控制台查找主帐号 ID。

- 如果您的阿里云帐号为主帐号，可登录阿里云控制台获取主帐号 ID。

- 如果您的阿里云帐号不是主帐号，请复制您所在组织的主帐号 ID。

![zh-ali-main-account-id](/img/zh-ali-main-account-id.png)

复制主账号 ID 后，返回 Zilliz Cloud 界面，在账号 ID 字段中黏贴主账号 ID。

![zh-ali-create-private-link-enter-account-id](/img/zh-ali-create-private-link-enter-account-id.png)

### 创建终端节点{#create-endpoint}

1. 进入[阿里云终端节点控制台](https://vpc.console.aliyun.com/endpoint)。

1. 根据步骤 1 中提供的地域，选择相同的地域。

    ![zh-ali-region](/img/zh-ali-region.png)

1. 进入**创建终端节点界面**，填写表格。以下为参数解释。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>节点名称</strong></p></td>
         <td><p>为该节点命名。</p></td>
       </tr>
       <tr>
         <td><p><strong>终端节点类型</strong></p></td>
         <td><p>选择<strong>接口终端节点</strong>。</p></td>
       </tr>
       <tr>
         <td><p><strong>终端节点服务</strong></p></td>
         <td><p>选择<strong>选择可用服务</strong>。</p><p>如果您在上一步中添加的阿里云主帐号通过验证后，可用服务列表中将展示该主帐号对应的 Zilliz Cloud 服务。</p></td>
       </tr>
    </table>

    ![zh-ali-create-endpoint](/img/zh-ali-create-endpoint.png)

1. 继续填写表格，配置**专有网络**、**安全组**、**可用区与交换机**。以下为参数解释。

    <table>
       <tr>
         <th><p><strong>专有网络</strong></p></th>
         <th><p>选择需要使用私网连接访问 Zilliz Cloud 集群的服务所在 VPC。</p></th>
       </tr>
       <tr>
         <td><p><strong>安全组</strong></p></td>
         <td><p>选择应用于该终端节点的安全组规则。如第一次使用，建议新建安全组，规划如下：</p><ul><li><p><strong>网络</strong></p><p>选择需要使用私网连接访问 Zilliz Cloud 集群的服务所在 VPC。</p></li><li><p><strong>访问规则</strong></p><p>添加一条<strong>协议类型</strong>为 <strong>TCP</strong>，<strong>端口范围</strong>为 Zilliz Cloud 集群暴露的端口，<strong>授权对象</strong>为 <strong>0.0.0.0/0</strong> 的访问规则。建议添加一条 ICMP 规则用于网络连通性排查。</p></li></ul></td>
       </tr>
       <tr>
         <td><p><strong>可用区与交换机</strong></p></td>
         <td><p>选择 Zilliz Cloud 集群所在可用区并创建默认交换机。</p><p>交换机配置无特殊要求，保持默认即可。</p><p>目前，Zilliz Cloud 集群可选可用区如下：</p><ul><li><p><strong>华东1（杭州）</strong></p><ul><li><p>杭州 可用区 H</p></li><li><p>杭州 可用区 J</p></li><li><p>杭州 可用区 K</p></li></ul></li><li><p><strong>华东2（上海）</strong></p><ul><li><p>上海 可用区L</p></li><li><p>上海 可用区M</p></li><li><p>上海 可用区N</p></li></ul></li><li><p><strong>华北2（北京）</strong></p><ul><li><p>北京 可用区 G</p></li><li><p>北京 可用区 H</p></li><li><p>北京 可用区 I</p></li></ul></li><li><p><strong>华南1（深圳）</strong></p><ul><li><p>深圳 可用区 D</p></li><li><p>深圳 可用区 E</p></li><li><p>深圳 可用区 F</p></li></ul></li><li><p><strong>美国（弗吉尼亚）</strong></p><ul><li><p>弗吉尼亚 可用区A</p></li><li><p>弗吉尼亚 可用区B</p></li></ul></li></ul></td>
       </tr>
    </table>

    <Admonition type="info" icon="📘" title="提示">

    <p>为了可用性，我们建议选 2 个以上<strong>可用区与交换机。</strong>但注意，阿里云会针对每个可用区额外收费，因此您需要考虑成本。</p>

    </Admonition>

    ![zh-ali-create-endpoint](/img/zh-ali-create-endpoint.png)

    安全组详情如下图所示：

    ![zh-ali-safety-group](/img/zh-ali-safety-group.png)

1. 表格填写完成后，点击创建。创建成功后的界面如下图所示。请务必保存以下信息以备后续使用：

    - **终端节点实例ID**

    - **默认服务域名**

    ![zh-ali-endpoint-details](/img/zh-ali-endpoint-details.png)

1. 等待终端节点**状态**变为**可用**。

    <Admonition type="info" icon="📘" title="提示">

    <p>终端节点<strong>连接状态</strong>此时是<strong>已断开</strong>。需要等待下一步连接。</p>

    </Admonition>

### 授权终端节点{#authorize-endpoint}

将您在阿里云界面上保存的**终端节点实例 ID** 输入到 Zilliz Cloud 界面的**终端节点 ID** 字段中。点击**创建**。

![zh-ali-create-private-link-authorize-endpoint](/img/zh-ali-create-private-link-authorize-endpoint.png)

此时 Zilliz Cloud 界面会出现如下提示：

![Y0e6bGUTEoY8WlxkRcGcbMBVnac](/img/Y0e6bGUTEoY8WlxkRcGcbMBVnac.png)

## 获取 Private Link{#obtain-a-private-link}

待私网连接创建成功后，Zilliz Cloud 界面如下：

![zh-ali-private-link-created](/img/zh-ali-private-link-created.png)

此时，切换至阿里云界面。可以观察到终端节点的**连接状态**变为**已连接**。

<Admonition type="info" icon="📘" title="说明">

<p>该 PrivateLink 适用于该项目下所有部署于该云服务和地域的 Dedicated 集群。如果在创建 PrivateLink 时，该项目下部分 Dedicated 集群正处于维护中或扩缩容过程中，在维护和扩缩容完成后，该 PrivateLink 会自动适用于这些 Dedicated 集群。</p>

</Admonition>

## 设置 DNS{#set-up-dns}

### 创建并设置私域解析{#add-private-zone-record}

1. 进入阿里云控制台[内网 DNS 解析（PrivateZone）](https://dns.console.aliyun.com/#/privateZone/list)。

    ![zh-ali-private-zone](/img/zh-ali-private-zone.png)

1. 选择**管理配置模式**。

    ![zh-ali-enter-endpoint-id](/img/zh-ali-enter-endpoint-id.png)

1. 在页面下方，点击**添加域名**。

    ![zh-ali-add-zone](/img/zh-ali-add-zone.png)

1. 填写**添加内置权威域名**表格。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>内置权威域名（Zone）</p></td>
         <td><p>请根据您的集群地域修改内置权威域名。以下为终端节点所在区域对应的 Zone 名称：</p><ul><li><p>杭州：<code>ali-cn-hangzhou.vectordb.zilliz.com.cn</code></p></li><li><p>北京：<code>ali-cn-beijing.vectordb.zilliz.com.cn</code></p></li><li><p>深圳：<code>ali-cn-shenzhen.vectordb.zilliz.com.cn</code></p></li><li><p>上海：<code>ali-cn-shanghai.vectordb.zilliz.com.cn</code></p></li></ul></td>
       </tr>
       <tr>
         <td><p>子域名递归解析代理</p></td>
         <td><p>为防止无法访问公共域名，我们建议您开启此项。</p></td>
       </tr>
    </table>

    ![zh-ali-add-zone-form](/img/zh-ali-add-zone-form.png)

1. 设置私域解析的生效范围。

    ![zh-ali-select-effect-range](/img/zh-ali-select-effect-range.png)

1. 选择需要使用私网连接的 VPC。点击确定。

    ![zh-ali-select-vpc](/img/zh-ali-select-vpc.png)

1. 在风险提示弹窗中，点击继续执行操作。

    ![zh-ali-continue-operation](/img/zh-ali-continue-operation.png)

1. 设置成功后，界面如下所示：

    ![zh-ali-zone-added](/img/zh-ali-zone-added.png)

1. 添加解析。在添加域名标签下，定位对应的内置权威域名，点击右侧操作栏中的**解析记录**。

    ![zh-ali-add-dns](/img/zh-ali-add-dns.png)

1. 点击**添加记录**。

    ![zh-ali-add-record](/img/zh-ali-add-record.png)

1. 填写表格并点击**确定**。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>记录类型</p></td>
         <td><p>请选择 <strong>CNAME</strong>。</p></td>
       </tr>
       <tr>
         <td><p>主机记录</p></td>
         <td><p>请替换为你的集群 ID-privatelink。 你可在集群详情页获取集群 ID。</p></td>
       </tr>
       <tr>
         <td><p>记录值</p></td>
         <td><p>请填写在步骤5.e. 中获取的<strong>默认服务域名</strong>。</p></td>
       </tr>
    </table>

    ![zh-ali-add-record-form](/img/zh-ali-add-record-form.png)

1. 在**解析变更确认**页面中，点击**确定**。

    ![zh-ali-dns-change-confirm](/img/zh-ali-dns-change-confirm.png)

1. 至此，内网 DNS 解析（PrivateZone）创建成功，界面如下所示：

    ![zh-ali-dns-successful](/img/zh-ali-dns-successful.png)

### 您已成功创建私网连接{#create-private-link-successful}

## 后续操作{#next-steps}

在完成私网连接创建和 DNS 设置后，可按照集群详情页面右上角的连接指南使用私网连接进行连通性验证。

## 管理集群公网访问{#manage-internet-access-to-your-clusters}

完成配置私网连接后，您可以选择关闭和限制集群的公网访问能力（Public Endpoint）。关闭后，您只可以使用私网连接访问该集群。

如需关闭公共 Endpoint，请按以下步骤操作：

1. 前往目标集群的**集群详情**页面。

1. 找到**连接信息**部分。

1. 点击集群公共 Endpoint 旁边的**设置图标**。

1. 阅读弹窗信息，然后点击**关闭**。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>私网连接仅影响<a href="/reference/restful/data-plane">数据面（Data Plane）</a>的操作。<a href="/reference/restful/control-plane">控制面（Control Plane）</a>的操作仍然可以通过公网进行。</p></li>
<li><p>重新启用公共 Endpoint 后，请您耐心等待。本地 DNS 缓存过期后公网访问才可生效。</p></li>
</ul>

</Admonition>

![disable_public_endpoint_cn](/img/disable_public_endpoint_cn.png)

## 常见问题{#faq}

**能否为已有集群创建 Private Endpoint？**
可以。当您创建 Private Endpoint 后，它将自动适用于同一项目下且部署在同一个云服务地域的所有 Dedicated 集群。您只需为不同的集群添加对应的 DNS 记录即可。